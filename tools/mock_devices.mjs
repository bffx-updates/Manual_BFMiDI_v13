// mock_devices.mjs — simula, no Node, as rotas da controladora que o editor
// usa pra mostrar os APARELHOS DO USB HOST e os EDITORES DE PRESET (TONEX ONE,
// Valeton GP-5, Neural DSP Nano Cortex) e o EDITOR DO KEMPER PLAYER, sem
// hardware nenhum. Feito pra captura de telas do manual.
//
// Formatos copiados do firmware (nao inventados):
//   /usb_host/status          -> web_build_usb_host_status_json (WEB_API_USB_HOST.h)
//   /usb_host/editor/*        -> web_build_editor_params_json + handlers (idem)
//   /kemper/editor/*          -> kemperEdBuildParamsJson / kemperEdBuildRendersJson
//                                (KEMPER_EDITOR.h) + WEB_API_KEMPER.h
// Valores dos editores sao gerados a partir das PROPRIAS tabelas do webApp
// (device_editor_tables.js, gp5_models.js, nano_cortex_models.js,
// kemper_editor_tables.js — modulos ESM puros), entao todo valor cai dentro da
// faixa do controle que o desenha.
//
// API:
//   createMockDevices(opts?)            -> estado ({ editorsAlwaysLoaded })
//   setScenario(state, name)            -> 'default' | 'nano' | 'kemper' | 'none'
//                                          (tambem REINICIA os presets/rig)
//   handleMock(state, method, pathname, query, body) -> objeto JSON ou null
//   MOCK_STATUS (Symbol): o status HTTP que o firmware daria, quando nao e 200
//     (JSON.stringify ignora a chave Symbol).

import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// as tabelas sao as do PROPRIO editor (webApp/), dois niveis acima desta pasta
const WEBAPP = process.env.BFMIDI_WEBAPP_DIR
  || path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', 'webApp');
const imp = (f) => import(pathToFileURL(path.join(WEBAPP, f)).href);

const DT = await imp('device_editor_tables.js');
const GP5 = await imp('gp5_models.js');
const NCXM = await imp('nano_cortex_models.js');
const KT = await imp('kemper_editor_tables.js');

export const MOCK_STATUS = Symbol.for('bfmidi.mockStatus');
const withStatus = (status, obj) => { obj[MOCK_STATUS] = status; return obj; };

// ─── util ────────────────────────────────────────────────────────────────────
function hashFrac(seed) {
  let h = 2166136261;
  for (const c of String(seed)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return ((h >>> 0) % 10007) / 10007;
}
function decimalsOf(step) {
  if (!(step > 0) || step >= 1) return 0;
  const s = String(step);
  return s.includes('.') ? s.split('.')[1].length : 0;
}
function snap(v, min, max, step) {
  let x = Math.min(max, Math.max(min, v));
  if (step > 0) x = min + Math.round((x - min) / step) * step;
  x = Math.min(max, Math.max(min, x));
  return Number(x.toFixed(decimalsOf(step)));
}
// %.6g de um float32, como o firmware imprime.
function wire6(v) {
  const f = Math.fround(Number(v) || 0);
  return Number(f.toPrecision(6));
}
function argsOf(query, body) {
  const out = {};
  const add = (src) => {
    if (!src) return;
    if (typeof src === 'string') src = new URLSearchParams(src);
    if (src instanceof URLSearchParams) { for (const [k, v] of src) out[k] = v; return; }
    if (typeof src === 'object') for (const [k, v] of Object.entries(src)) out[k] = v;
  };
  add(query);
  add(body);
  return out;
}
const has = (a, k) => Object.prototype.hasOwnProperty.call(a, k) && a[k] !== undefined;
const toInt = (v) => { const n = parseInt(String(v), 10); return Number.isFinite(n) ? n : 0; };

// Fracao "musical" de um parametro pelo nome (0..1 da faixa).
function niceFrac(name, min, max, ctx, seed) {
  const n = String(name || '').toLowerCase();
  const c = String(ctx || '').toLowerCase();
  const span = (max - min) || 1;
  const bip = min < 0 && max > 0;
  const center = bip ? (0 - min) / span : 0.5;
  const isDly = /dly|delay|post2/.test(c);
  const isRvb = /rvb|reverb|post3/.test(c);
  const at = (target) => Math.min(1, Math.max(0, (target - min) / span));
  if (/makeup|output/.test(n) && bip) return center;
  if (/(high ?pass|low ?cut)/.test(n)) return max > 200 ? at(Math.max(min, 80)) : 0.08;
  if (/(low ?pass|high ?cut)/.test(n)) return max > 2000 ? at(Math.min(max, 7500)) : 0.72;
  if (/\bmix\b/.test(n)) return isDly ? 0.24 : isRvb ? 0.3 : /comp/.test(c) ? 1 : 0.5;
  if (/feedback|repeat/.test(n)) return 0.32;
  if (/pre ?delay/.test(n)) return max >= 100 ? at(Math.min(max, 25)) : 0.25;
  if (/time/.test(n) && !/decay/.test(n)) {
    if (max >= 500 && (/ms/.test(c) || max <= 5000)) return at(Math.min(max, Math.max(min, 420)));
    return 0.45;
  }
  if (/decay/.test(n)) return 0.42;
  if (/ratio/.test(n)) return at(Math.min(max, Math.max(min, 4)));
  if (/threshold/.test(n)) return bip || min < 0 ? 0.55 : 0.36;
  if (/gain|drive|overdrive/.test(n)) return 0.62;
  if (/volume|level/.test(n)) return bip ? center : 0.55;
  if (/presence/.test(n)) return 0.5;
  if (/bass/.test(n)) return 0.52;
  if (/mid/.test(n)) return 0.6;
  if (/treble/.test(n)) return 0.58;
  if (/tone/.test(n)) return 0.55;
  if (/rate|speed/.test(n)) return 0.28;
  if (/depth/.test(n)) return 0.42;
  if (/attack/.test(n)) return 0.3;
  if (/release/.test(n)) return 0.38;
  if (/sustain|comp/.test(n)) return 0.5;
  if (/width|spread/.test(n)) return 0.6;
  if (/hz/.test(n) && bip) return center + (hashFrac(seed) - 0.5) * 0.24;
  if (bip) return center + (hashFrac(seed) - 0.5) * 0.2;
  return 0.35 + 0.35 * hashFrac(seed);
}
function niceValue(name, min, max, step, ctx, seed) {
  return snap(min + niceFrac(name, min, max, ctx, seed) * (max - min), min, max, step);
}

// ─── TONEX ONE (kind 0) ──────────────────────────────────────────────────────
// idx = TONEX_PARAM_* (0..108); faixas do TONEX_EDITOR_SCHEMA.
function buildTonexValues(variant = 0) {
  const v = new Array(DT.TONEX_EDITOR_SCHEMA.count).fill(0);
  const set = (o) => { for (const [k, x] of Object.entries(o)) v[Number(k)] = x; };
  set({
    0: 0, 1: 1, 2: -62, 3: 40, 4: -55,            // NOISE GATE (on)
    5: 0, 6: 0, 7: -18, 8: 4, 9: 14,              // COMPRESSOR (off)
    10: 1, 11: 5.5, 12: 220, 13: 6.2, 14: 0.8, 15: 800, 16: 6.4, 17: 1900, // EQ (pos amp)
    18: 1, 20: 6.8, 21: 5.6, 22: 100,             // AMP
    24: 0, 25: 3, 26: 4.5, 33: 0, 34: 5.5, 35: 4.8, // CAB = TONE MODEL; presence/depth
    36: 0, 37: 1, 38: 4,                          // REVERB on, ROOM
    63: 0, 64: 0, 65: 0,                          // MOD off, CHORUS
    68: 1.2, 69: 40, 70: 5, 73: 4.5, 74: 5, 75: 50, 76: 5, 79: 0.8, 80: 45, 81: 5,
    84: 0.6, 85: 50, 86: 40, 87: 5, 90: 180, 91: 150, 92: 60, 93: 5,
    94: 1, 95: 1, 96: 0,                          // DELAY on, DIGITAL
    99: 380, 100: 28, 101: 0, 102: 20, 105: 420, 106: 32, 107: 0, 108: 24,
  });
  for (let m = 0; m < 6; m++) {                   // os 6 reverbs
    v[39 + m * 4] = Number((3 + m * 0.4).toFixed(1));
    v[40 + m * 4] = 15 + m * 5;
    v[41 + m * 4] = m === 4 ? 1 : 0;
    v[42 + m * 4] = 20 + m;
  }
  if (variant === 1) {                            // segunda TONEX (slot 1): outro timbre
    set({ 20: 8.4, 21: 6.1, 24: 1, 25: 6, 26: 5.2, 6: 1, 64: 1, 65: 2, 38: 5, 96: 1 });
  }
  return v.map(wire6);
}

// ─── VALETON GP-5 (kind 1) ───────────────────────────────────────────────────
// 0..9 liga/desliga, 10..19 modelo, 20 volume do patch, 21..30 ordem da
// cadeia (permutacao de 0..9), 31..113 parametros (bloco*8 + p; NS 103..113).
function gp5ParamIdx(block, p) { return block < 9 ? 31 + block * 8 + p : 31 + 72 + p; }
function buildGp5Values() {
  const v = new Array(DT.GP5_EDITOR_SCHEMA.count).fill(0);
  // [bloco, nome do modelo (ou indice), liga]
  const plan = {
    NR: ['Gate', 1], PRE: ['Comp', 0], DIST: ['Green OD', 1], AMP: ['UK 45', 1],
    CAB: ['UK Grn 2x12', 1], EQ: ['Guitar EQ1', 0], MOD: ['A-Chorus', 0],
    DLY: ['Analog', 1], RVB: ['Room', 1],
  };
  for (const b of GP5.GP5_MODEL_BLOCKS) {
    const [mname, on] = plan[b.key] || [b.models[0].name, 1];
    const model = b.models.find((m) => m.name === mname) || b.models[0];
    v[b.block] = on;
    v[10 + b.block] = model.index;
    // Todos os modelos do bloco ficam com valores validos (troca de modelo na
    // roda mostra sliders certos); o do modelo ativo por ultimo, vence.
    for (const m of [...b.models.filter((x) => x !== model), model]) {
      for (const p of m.params) {
        const idx = gp5ParamIdx(b.block, p.p);
        if (p.min === 0 && p.max === 1) v[idx] = /trail/i.test(p.name) ? 1 : 0;
        else v[idx] = niceValue(p.name, p.min, p.max, (p.max - p.min) <= 10 ? 0.1 : 1, b.key, `${b.key}.${m.index}.${p.p}`);
      }
    }
  }
  v[9] = 0;            // NS / SNAPTONE desligado
  v[19] = 3;           // SLOT 4
  v[20] = 72;          // volume do patch
  for (let s = 0; s < 10; s++) v[21 + s] = s;   // cadeia na ordem padrao
  return v.map(wire6);
}

// ─── NANO CORTEX (kind 2) ────────────────────────────────────────────────────
// Contrato 6.0 do PLANO_NANO_CORTEX.md: 0..4 amp (0..255), 5 volume da
// captura (0..255, 128 = 0 dB), 6 reducao do gate (0..100 %), 7 gate on,
// 8..12 FX on, 13..17 modelo, 18 captura (0 = bypass, 1..25), 19..22 reservado,
// 23 preset (so leitura), 24..109 parametros dos FX (fio 0..1).
const NCX_PLAN = [
  { slot: 0, id: 27, on: 1 },     // PRE FX 1: Green 808
  { slot: 1, id: 5007, on: 0 },   // PRE FX 2: Opto Comp (M), em bypass
  { slot: 2, id: 7022, on: 0 },   // POST FX 1: Dream Chorus, em bypass
  { slot: 3, id: 6010, on: 1 },   // POST FX 2: Analog Delay
  { slot: 4, id: 8003, on: 1 },   // POST FX 3: Hall
];
function ncxWireFor(p, ctx, seed) {
  if (p.type === 'switch' || p.type === 'enum') return 0;   // Off / 1a opcao
  const disp = niceValue(p.name, p.min, p.max, p.step, ctx + (p.unit === 'ms' ? ' ms' : ''), seed);
  const span = (p.max - p.min) || 1;
  return Math.min(1, Math.max(0, (disp - p.min) / span));
}
function buildNanoValues(presetIdx) {
  const v = new Array(DT.NANO_CORTEX_EDITOR_SCHEMA.count).fill(0);
  [6.5, 5.0, 5.5, 6.0, 6.2].forEach((d, i) => { v[i] = DT.nanoCortexAmpToWire(d); });
  v[5] = DT.nanoCortexCapVolumeToWire(0);   // 0 dB
  v[6] = 35;                                // reducao do gate (%)
  v[7] = 1;                                 // gate ligado
  v[18] = 3;                                // captura no SLOT 3
  v[23] = presetIdx;
  for (const pl of NCX_PLAN) {
    const lay = NCXM.NANO_CORTEX_SLOT_LAYOUT[pl.slot];
    const model = NCXM.NANO_CORTEX_MODELS.find((m) => m.id === pl.id && m.slots.includes(pl.slot));
    v[8 + pl.slot] = model ? pl.on : 0;
    v[13 + pl.slot] = model ? model.id : 0;
    if (!model) continue;
    for (const p of model.params) {
      if (p.p >= lay.cap) continue;
      v[lay.base + p.p] = ncxWireFor(p, `${lay.key} ${model.group}`, `${pl.id}.${p.p}`);
    }
  }
  return v.map(wire6);
}

// ─── cache do editor (UsbHostEditorSlot) ─────────────────────────────────────
const FLAG_READY = 0x01, FLAG_DIRTY = 0x02, FLAG_SAVE_FAIL = 0x04, FLAG_LOST = 0x08,
  FLAG_INDEX = 0x10, FLAG_TIMEOUT = 0x20, FLAG_BUSY = 0x40;
const EDITOR_DEFAULTS = {
  '0:0': () => ({ preset: 2, name: 'Plexi Crunch', values: buildTonexValues(0) }),
  '0:1': () => ({ preset: 7, name: 'Lead Boost', values: buildTonexValues(1) }),
  '1:0': () => ({ preset: 6, name: 'Blues Lead', values: buildGp5Values() }),
  '2:0': () => ({ preset: 2, name: 'Crunch', values: buildNanoValues(2) }),
};
function freshEditor(key) {
  const d = EDITOR_DEFAULTS[key]();
  const now = Date.now();
  return {
    key, preset: d.preset, name: d.name, values: d.values.slice(),
    savedValues: d.values.slice(), savedName: d.name,
    flags: FLAG_READY | FLAG_INDEX, dumps: 3, seq: 3, dumpMs: now - 1500, readMs: 0,
  };
}
const SAVE_NAME_MAX = { 1: 10, 2: 32 };

// ─── Kemper Player ───────────────────────────────────────────────────────────
// Secoes fixas: copia do KED_FIXED do kempereditor.jsx (so o que o mock usa).
const P = (n, name, extra) => ({ n, name, ...(extra || {}) });
const KED_FIXED_META = {
  0x04: [P(1, 'Rig Volume'), P(3, 'Panorama', { kind: 'bipolar' }),
    P(4, 'Transpose', { kind: 'enum', min: 28, max: 100, center: 64 })],
  0x09: [P(3, 'Noise Gate'), P(4, 'Clean Sens'), P(5, 'Distortion Sens')],
  0x0A: [P(4, 'Gain'), P(3, 'Volume'), P(15, 'Direct Mix'), P(6, 'Definition'), P(7, 'Clarity'),
    P(9, 'Pick', { kind: 'bipolar' }), P(5, 'Clean Comp'), P(10, 'Compressor'),
    P(8, 'Power Sagging'), P(11, 'Tube Shape'), P(12, 'Tube Bias')],
  0x0B: [P(4, 'Bass', { kind: 'bipolar' }), P(5, 'Middle', { kind: 'bipolar' }),
    P(6, 'Treble', { kind: 'bipolar' }), P(7, 'Presence', { kind: 'bipolar' }),
    P(8, 'Position', { kind: 'enum', max: 1, labels: ['PRE', 'POST'] })],
  0x0C: [P(4, 'High Shift', { kind: 'bipolar' }), P(5, 'Low Shift', { kind: 'bipolar' }),
    P(6, 'Character', { kind: 'bipolar' }), P(7, 'Pure Cabinet'), P(9, 'Low Cut'),
    P(10, 'High Cut'), P(11, 'Resonance Freq'), P(12, 'Resonance Intensity')],
  0x05: [P(1, 'Transpose', { kind: 'switch' }), P(6, 'Noise Gate', { kind: 'switch' }),
    P(7, 'Gate Threshold'), P(8, 'Gate Decay'), P(11, 'Compressor', { kind: 'switch' }),
    P(12, 'Comp Threshold'), P(16, 'Pure Booster', { kind: 'switch' }), P(17, 'Booster Volume'),
    P(21, 'Wah Wah', { kind: 'switch' }), P(22, 'Wah Pedal Mode', { kind: 'enum', min: 2, max: 5 }),
    P(26, 'Vintage Chorus', { kind: 'switch' }), P(27, 'Chorus Range'), P(28, 'Chorus Depth'),
    P(29, 'Chorus Mix'), P(36, 'Air Chorus', { kind: 'switch' }), P(37, 'Air Depth'),
    P(39, 'Air Mix'), P(41, 'Double Tracker', { kind: 'switch' }), P(42, 'Looseness'),
    P(44, 'Tracker Stereo', { kind: 'bipolar' })],
};
// Paginas que o firmware guarda (KED_PAGES), na ordem dele.
const KED_PAGES = [0x04, 0x05, 0x09, 0x0A, 0x0B, 0x0C, 0x32, 0x33, 0x34, 0x35, 0x38, 0x3A, 0x3C, 0x3D];
const KED_MODULE_PAGES = new Set([0x32, 0x33, 0x34, 0x35, 0x38, 0x3A, 0x3C, 0x3D]);
const KED_MODULE_CTX = { 0x32: 'stomp a', 0x33: 'stomp b', 0x34: 'stomp c', 0x35: 'stomp d',
  0x38: 'stomp x', 0x3A: 'mod', 0x3C: 'delay', 0x3D: 'reverb' };
// O rig: tipo e liga/desliga de cada modulo (IDs do Stomps.xml do Rig Manager).
const KED_RIG_PLAN = {
  0x32: { type: 49, on: 1 },    // A: Compressor
  0x33: { type: 33, on: 1 },    // B: Green Scream
  0x34: { type: 1, on: 0 },     // C: Wah Wah (bypass)
  0x35: { type: 97, on: 0 },    // D: Graphic Equalizer (bypass)
  0x38: { type: 115, on: 0 },   // X: Pure Booster (bypass)
  0x3A: { type: 65, on: 1 },    // MOD: Vintage Chorus
  0x3C: { type: 146, on: 1 },   // DLY: Single Delay
  0x3D: { type: 179, on: 1 },   // REV: Easy Reverb
};
const KED_FIXED_VALUES = {
  0x04: { 1: 8192, 3: 8192, 4: 64 },
  0x05: { 1: 0, 6: 1, 7: 5900, 8: 6500, 11: 0, 12: 7000, 16: 1, 17: 9800, 21: 0, 22: 2,
    26: 0, 27: 6000, 28: 8000, 29: 5500, 36: 0, 37: 7000, 39: 5000, 41: 0, 42: 6000, 44: 8192 },
  0x09: { 3: 5200, 4: 8192, 5: 8192 },
  0x0A: { 2: 1, 3: 8192, 4: 11500, 5: 6000, 6: 9000, 7: 4000, 8: 5000, 9: 8192, 10: 4500,
    11: 7000, 12: 8192, 15: 0 },
  0x0B: { 4: 8800, 5: 9300, 6: 8500, 7: 9000, 8: 1 },
  0x0C: { 2: 1, 4: 8192, 5: 8192, 6: 8700, 7: 3000, 9: 2500, 10: 11000, 11: 6000, 12: 7000 },
};
function kedParamValue(p, ctx, seed) {
  const kind = p.kind || 'cont';
  if (kind === 'switch') return 0;
  if (kind === 'enum') {
    if (/note value/i.test(p.name)) return Math.min(p.max ?? 127, 4);   // 4/16 (1/4)
    return p.min || 0;
  }
  if (kind === 'bipolar') {
    if (/stereo|ducking/i.test(p.name)) return 8192;
    return Math.round(8192 + (hashFrac(seed) - 0.5) * 2600);
  }
  const n = p.name.toLowerCase();
  let f;
  if (/^mix$|mix$/.test(n)) f = /delay/.test(ctx) ? 0.28 : /reverb/.test(ctx) ? 0.25 : 1;
  else if (/volume/.test(n)) f = 0.5;
  else if (/delay time/.test(n)) f = 0.18;
  else if (/decay time/.test(n)) f = 0.22;
  else if (/feedback/.test(n)) f = 0.3;
  else if (/low cut/.test(n)) f = 0.06;
  else if (/high cut/.test(n)) f = 0.78;
  else if (/reverse mix|input swell|smear|grit|flutter|chorus|modulation/.test(n)) f = 0;
  else f = niceFrac(p.name, 0, 16383, ctx, seed);
  return Math.max(0, Math.min(16383, Math.round(f * 16383)));
}
function kedModuleArray(page, type, on) {
  const arr = new Array(110).fill(0);
  arr[0] = type;
  arr[3] = on;
  for (const p of KT.kemperParamsForType(type)) {
    if (p.n === 0 || p.n === 3) continue;
    arr[p.n] = kedParamValue(p, KED_MODULE_CTX[page], `${page}.${type}.${p.n}`);
  }
  return arr;
}
function freshKemperRig() {
  const pages = {};
  for (const pg of KED_PAGES) {
    if (KED_MODULE_PAGES.has(pg)) {
      const r = KED_RIG_PLAN[pg];
      pages[pg] = kedModuleArray(pg, r.type, r.on);
    } else {
      const vals = KED_FIXED_VALUES[pg];
      const last = Math.max(...Object.keys(vals).map(Number));
      const arr = new Array(last + 1).fill(0);
      for (const [k, x] of Object.entries(vals)) arr[Number(k)] = x;
      pages[pg] = arr;
    }
  }
  return pages;
}
function kedParamMeta(pages, page, num) {
  if (KED_MODULE_PAGES.has(page)) {
    const type = (pages[page] || [])[0] || 0;
    return KT.kemperParamsForType(type).find((p) => p.n === num) || { n: num, name: 'Mix' };
  }
  return (KED_FIXED_META[page] || []).find((p) => p.n === num) || { n: num, name: '' };
}
const PEDAL_MODE_LABELS = ['Off', 'Touch', 'On', 'Bypass @ Stop', 'Bypass @ Heel', 'Bypass @ Toe'];
const f1 = (x) => x.toFixed(1);
const sgn1 = (x) => { const s = Math.abs(x) < 0.05 ? '0.0' : f1(x); return x >= 0.05 ? `+${s}` : s; };
const hzText = (hz) => (hz >= 1000 ? `${(hz / 1000).toFixed(hz >= 10000 ? 1 : 2)} kHz` : `${Math.round(hz)} Hz`);
// Texto do valor como o Kemper mostraria ($7C). Plausivel, nao exato.
function kedRenderText(pages, page, num, v) {
  const p = kedParamMeta(pages, page, num);
  const n = (p.name || '').toLowerCase();
  const kind = p.kind || 'cont';
  const fr = Math.max(0, Math.min(1, v / 16383));
  if (kind === 'enum') {
    if (p.center !== undefined) { const d = v - p.center; return d > 0 ? `+${d}` : String(d); }
    if (/pedal mode/.test(n)) return PEDAL_MODE_LABELS[v] || String(v);
    if (p.labels) return p.labels[v - (p.min || 0)] ?? String(v);
    return String(v);
  }
  if (kind === 'switch') return v ? 'On' : 'Off';
  if (kind === 'bipolar') {
    const b = (v - 8192) / 8192;
    if (/hz$/.test(n)) return `${sgn1(b * 12)} dB`;
    if (/stereo|panorama/.test(n)) return `${Math.round(b * 100)}%`;
    return sgn1(b * 5);
  }
  if (/rig volume|^volume$|booster volume/.test(n)) return v === 0 ? '-inf dB' : `${sgn1(fr * 24 - 12)} dB`;
  if (/sens/.test(n)) return `${sgn1(fr * 24 - 12)} dB`;
  if (/delay time/.test(n)) { const ms = 1 + fr * 1999; return ms >= 1000 ? `${(ms / 1000).toFixed(2)} s` : `${Math.round(ms)} ms`; }
  if (/decay time|decay$/.test(n)) return `${(0.2 + fr * 9.8).toFixed(1)} s`;
  if (/rate/.test(n)) return `${(0.05 + fr * 9.95).toFixed(2)} Hz`;
  if (/low cut/.test(n)) return hzText(20 * Math.pow(50, fr));
  if (/high cut/.test(n)) return hzText(1000 * Math.pow(20, fr));
  if (/resonance freq/.test(n)) return hzText(20 * Math.pow(100, fr));
  if (/mix|feedback|depth|range|swell|smear|grit|flutter|chorus$|modulation|reverse|ratio|direct/.test(n)) return `${Math.round(fr * 100)}%`;
  return f1(fr * 10);
}

// ─── cenarios ────────────────────────────────────────────────────────────────
const DEV_GP5 = { kind: 'midi', index: 0, port: 3, vid: '84EF', pid: '0184', ready: true, vendor: false,
  editor: true, manufacturer: 'Valeton', product: 'GP5', diag: '' };
const DEV_TONEX = { kind: 'tonex', index: 0, port: 4, vid: '1963', pid: '00D1', ready: true, vendor: false,
  editor: true, manufacturer: 'IK Multimedia', product: 'TONEX ONE', diag: '' };
const DEV_NANO = { kind: 'midi', index: 0, port: 0, vid: '152A', pid: '88E7', ready: true, vendor: false,
  editor: true, manufacturer: 'Neural DSP', product: 'Nano Cortex', diag: 'HID ok fw 2.2.1 #1' };
const SCENARIOS = {
  default: { devices: [DEV_GP5, DEV_TONEX], kemper: true },
  nano: { devices: [DEV_NANO], kemper: true },
  kemper: { devices: [], kemper: true },
  none: { devices: [], kemper: false },
};

export function createMockDevices(opts = {}) {
  const state = {
    editorsAlwaysLoaded: !!opts.editorsAlwaysLoaded,
    scenario: 'default',
    host: {
      online: true, protocol_ok: true, host_version: '3.0', status_seen: true,
      midi_filter_channel: 1, ble_enabled: false, ble_connected: false, ble_mode: 1,
      ble_filter_channel: 0, ble_filter_reported: true, ms3_translate: false, tx_only: false,
      last_ack: 0, restart: '', reqId: 10,
    },
    tonexFilters: [2, 0],
    devices: [],
    kemperPresent: true,
    editors: {},
    kemper: null,
  };
  setScenario(state, opts.scenario || 'default');
  return state;
}

export function setScenario(state, name) {
  const sc = SCENARIOS[name] ? name : 'default';
  state.scenario = sc;
  state.devices = SCENARIOS[sc].devices.map((d) => ({ ...d }));
  state.kemperPresent = SCENARIOS[sc].kemper;
  state.editors = {};
  for (const k of Object.keys(EDITOR_DEFAULTS)) state.editors[k] = freshEditor(k);
  const now = Date.now();
  state.kemper = {
    active: false, reason: '', openMs: 0, reads: 0, rigSeq: 0, pushSeq: 0,
    rig: 'Brit Lead', amp: 'Brit 800 Lead', cab: 'Brit 4x12 V30',
    pages: freshKemperRig(), renders: [], renderSeq: 0, lastRxMs: now,
  };
  return state;
}

// ─── /usb_host/status ────────────────────────────────────────────────────────
function devicesNow(state) {
  return state.devices.map((d) => {
    const out = { ...d };
    // GP-5 no MODO TRANSMISSAO nao tem editor (sem endpoint IN).
    if (d.vid === '84EF' && d.pid === '0184' && state.host.tx_only) out.editor = false;
    return out;
  });
}
function statusText(state) {
  const midi = state.devices.filter((d) => d.kind !== 'tonex').length;
  const tonex = state.devices.filter((d) => d.kind === 'tonex');
  const parts = [];
  if (midi > 0) parts.push(`USB MIDI: ${midi} ${midi === 1 ? 'conectado' : 'conectados'}`);
  if (tonex.length) {
    parts.push(`Tonex One ${tonex.length}/2`);
    for (let sl = 0; sl < 2; sl++) {
      const t = tonex.find((d) => d.index === sl);
      parts.push(t ? `${sl + 1}:porta ${t.port}` : `${sl + 1}:ausente`);
    }
  }
  let s = parts.length ? parts.join('; ') : 'Aguardando dispositivo; nenhum USB visto';
  if (state.host.ble_enabled && state.host.ble_mode === 2) s += ' | BT pedal: aguardando';
  return s;
}
function buildStatus(state) {
  const h = state.host;
  const devs = devicesNow(state);
  const midiDev = devs.find((d) => d.kind !== 'tonex');
  const tonexDev = devs.find((d) => d.kind === 'tonex');
  const anyDev = devs.length > 0;
  const tonex = [0, 1].map((sl) => {
    const t = devs.find((d) => d.kind === 'tonex' && d.index === sl);
    return { slot: sl + 1, connected: !!t, filter_channel: state.tonexFilters[sl] || 0,
      hub_port: t ? t.port : 0, pending_filter: -1 };
  });
  return {
    online: h.online, protocol_ok: h.protocol_ok, last_seen_ms: 700,
    mode: 3, mode_label: 'AUTOMATICO',
    connection: anyDev ? 1 : 0, status_code: anyDev ? 4 : 3, status_text: statusText(state),
    gp5_tap_diag: midiDev && midiDev.vid === '84EF' ? 'Aguardando CC119' : '',
    midi_filter_channel: h.midi_filter_channel,
    ble_enabled: h.ble_enabled, ble_connected: h.ble_connected, ble_mode: h.ble_mode,
    ble_filter_channel: h.ble_filter_channel, ble_filter_reported: h.ble_filter_reported,
    ms3_translate: h.ms3_translate, tx_only: h.tx_only,
    host_version: h.host_version, status_seen: h.status_seen, bridge_flash: true,
    bridge_runs: 0, bridge_up: 0, bridge_down: 0, bridge_ms: 0, bridge_why: '',
    manufacturer: midiDev ? midiDev.manufacturer : tonexDev ? 'IK Multimedia' : 'USB MIDI',
    product: midiDev ? midiDev.product : tonexDev ? 'TONEX ONE' : 'Aguardando dispositivo',
    last_ack: h.last_ack,
    pending_mode: -1, pending_filter: -1, pending_ble: -1, pending_ble_mode: -1,
    pending_ble_filter: -1, pending_ms3: -1, pending_tx_only: -1,
    pending_update: false, restart: h.restart,
    tonex_count: 2, tonex_reported: true, tonex,
    devices_reported: true,
    devices: devs.map((d) => ({ kind: d.kind, index: d.index, port: d.port, vid: d.vid, pid: d.pid,
      ready: d.ready, vendor: d.vendor, editor: d.editor, manufacturer: d.manufacturer,
      product: d.product, diag: d.diag })),
  };
}

// ─── /usb_host/editor/* ─────────────────────────────────────────────────────
function editorKey(a) {
  if (!has(a, 'kind') || !has(a, 'slot')) return { err: 'KIND/SLOT REQUIRED' };
  const kind = toInt(a.kind);
  const slot = toInt(a.slot);
  if ((kind === 0 && (slot === 0 || slot === 1)) || ((kind === 1 || kind === 2) && slot === 0)) {
    return { kind, slot, key: `${kind}:${slot}` };
  }
  return { err: 'INVALID KIND/SLOT' };
}
function editorSupported(state, kind, slot) {
  return devicesNow(state).some((d) => d.editor && (
    (kind === 0 && d.kind === 'tonex' && d.index === slot)
    || (kind === 1 && d.kind !== 'tonex' && d.vid === '84EF' && d.pid === '0184')
    || (kind === 2 && d.kind !== 'tonex' && d.vid === '152A' && d.pid === '88E7')));
}
function editorParamsJson(state, kind, slot) {
  const e = state.editors[`${kind}:${slot}`];
  const now = Date.now();
  const supported = editorSupported(state, kind, slot);
  const loaded = supported || state.editorsAlwaysLoaded;
  if (!loaded) {
    return { kind, slot, host_online: state.host.online, supported, has_dump: false, ready: false,
      seq: 0, dumps: 0, flags: 0, dirty: false, lost: false, save_fail: false, timeout: false,
      busy: false, preset: -1, name: '', age_ms: 0, read_age_ms: 0, values: [] };
  }
  const f = e.flags;
  return {
    kind, slot, host_online: state.host.online, supported,
    has_dump: true, ready: !!(f & FLAG_READY), seq: e.seq & 0x7F, dumps: e.dumps, flags: f,
    dirty: !!(f & FLAG_DIRTY), lost: !!(f & FLAG_LOST), save_fail: !!(f & FLAG_SAVE_FAIL),
    timeout: !!(f & FLAG_TIMEOUT), busy: !!(f & FLAG_BUSY),
    preset: (f & FLAG_INDEX) ? e.preset : -1, name: e.name,
    age_ms: e.dumpMs ? now - e.dumpMs : 0, read_age_ms: e.readMs ? now - e.readMs : 0,
    values: e.values.map(wire6),
  };
}
function editorDump(state, e) {
  e.dumps += 1;
  e.seq = (e.seq + 1) & 0x7F;
  e.dumpMs = Date.now();
}

// ─── /kemper/editor/* ───────────────────────────────────────────────────────
function kemperParamsJson(state) {
  const k = state.kemper;
  const now = Date.now();
  const present = state.kemperPresent;
  const pages = {};
  if (present && k.reads > 0) {
    for (const pg of KED_PAGES) if (k.pages[pg]) pages[String(pg)] = k.pages[pg].slice();
  }
  return {
    active: k.active, reason: k.reason, mounted: present,
    seen_ms: present ? 140 + Math.round(hashFrac(now >> 9) * 300) : -1,
    open_ms: k.active ? now - k.openMs : 0,
    reading: false, reads: present ? k.reads : 0, rig_seq: k.rigSeq, push_seq: k.pushSeq,
    render_seq: k.renderSeq, rq: 0, no_kemper: k.active && !present,
    rig: present ? k.rig : '', amp: present ? k.amp : '', cab: present ? k.cab : '',
    pages, missing: [], morph: [],
  };
}
function kemperQueueRenders(state, items) {
  const k = state.kemper;
  if (!k.active || !state.kemperPresent) return 0;
  let added = 0;
  for (const raw of String(items || '').split(',')) {
    const m = /^(\d+):(\d+):(\d+)(?::a)?$/.exec(raw.trim());
    if (!m) continue;
    const pg = +m[1], nr = +m[2], v = +m[3];
    if (pg > 127 || nr > 127 || v > 16383) continue;
    const t = kedRenderText(k.pages, pg, nr, v).slice(0, 20);
    k.renders = k.renders.filter((r) => !(r.p === pg && r.n === nr && r.v === v));
    k.renderSeq += 1;
    k.renders.push({ p: pg, n: nr, v, t, seq: k.renderSeq });
    added += 1;
  }
  if (k.renders.length > 256) k.renders = k.renders.slice(-256);   // KED_RENDER_CACHE
  return added;
}

// ─── roteador ────────────────────────────────────────────────────────────────
export function handleMock(state, method, pathname, query, body) {
  const M = String(method || 'GET').toUpperCase();
  let p = String(pathname || '').split('?')[0];
  if (p.length > 1) p = p.replace(/\/+$/, '');
  if (!p.startsWith('/usb_host/') && !p.startsWith('/kemper/editor/')) return null;
  if (M === 'OPTIONS') return {};
  const a = argsOf(query, body);
  const h = state.host;
  const reqId = () => { h.reqId = (h.reqId % 127) + 1; return h.reqId; };

  // ── USB host: status e acoes ──
  if (p === '/usb_host/status') return buildStatus(state);
  if (p === '/usb_host/refresh') return { sent: true, request_id: reqId() };
  if (p === '/usb_host/mode') {
    if (!has(a, 'mode')) return withStatus(400, { error: 'MODE REQUIRED' });
    return { sent: true, request_id: reqId(), mode: toInt(a.mode) };   // automatico: no-op
  }
  if (p === '/usb_host/ble' || p === '/usb_host/ms3' || p === '/usb_host/txonly') {
    if (!has(a, 'enabled')) return withStatus(400, { error: 'ENABLED REQUIRED' });
    const on = toInt(a.enabled) !== 0;
    if (p === '/usb_host/ble') h.ble_enabled = on;
    else if (p === '/usb_host/ms3') h.ms3_translate = on;
    else h.tx_only = on;
    return { sent: true, request_id: reqId(), enabled: on };
  }
  if (p === '/usb_host/ble_mode') {
    if (!has(a, 'mode')) return withStatus(400, { error: 'MODE REQUIRED' });
    const mode = toInt(a.mode);
    if (mode < 0 || mode > 2) return withStatus(400, { error: 'INVALID MODE' });
    h.ble_mode = mode;
    return { sent: true, request_id: reqId(), mode };
  }
  if (p === '/usb_host/filter' || p === '/usb_host/ble_filter') {
    if (!has(a, 'channel')) return withStatus(400, { error: 'CHANNEL REQUIRED' });
    const ch = toInt(a.channel);
    if (ch < 0 || ch > 16) return withStatus(400, { error: 'INVALID CHANNEL' });
    if (p === '/usb_host/filter') h.midi_filter_channel = ch; else h.ble_filter_channel = ch;
    return { sent: true, request_id: reqId(), channel: ch };
  }
  if (p === '/usb_host/tonex_filter') {
    if (!has(a, 'slot') || !has(a, 'channel')) return withStatus(400, { error: 'SLOT/CHANNEL REQUIRED' });
    const slot = toInt(a.slot), ch = toInt(a.channel);
    if (slot < 1 || slot > 2) return withStatus(400, { error: 'INVALID SLOT' });
    if (ch < 0 || ch > 16) return withStatus(400, { error: 'INVALID CHANNEL' });
    state.tonexFilters[slot - 1] = ch;
    return { sent: true, request_id: reqId(), slot, channel: ch };
  }
  if (p === '/usb_host/update_mode') return { sent: true, request_id: reqId() };
  if (p === '/usb_host/restart') { h.restart = 'done'; return { sent: true, request_id: reqId() }; }
  if (p === '/usb_host/passthrough') return withStatus(404, { error: 'so pelo USB CDC' });

  // ── USB host: editor de preset ──
  if (p.startsWith('/usb_host/editor/')) {
    const ks = editorKey(a);
    if (ks.err) return withStatus(400, { error: ks.err });
    const e = state.editors[ks.key];
    const loaded = editorSupported(state, ks.kind, ks.slot) || state.editorsAlwaysLoaded;
    if (p === '/usb_host/editor/params') return editorParamsJson(state, ks.kind, ks.slot);
    if (p === '/usb_host/editor/read') {
      const force = !has(a, 'force') || toInt(a.force) !== 0;
      if (force) {
        e.readMs = Date.now();
        if (loaded) editorDump(state, e);          // o host relê e manda o dump
      }
      return { sent: true };
    }
    if (p === '/usb_host/editor/param') {
      if (!has(a, 'idx') || !has(a, 'value')) return withStatus(400, { error: 'IDX/VALUE REQUIRED' });
      const idx = toInt(a.idx);
      const value = Number(a.value);
      if (idx < 0 || idx >= 120 || !Number.isFinite(value)) return withStatus(400, { error: 'INVALID PARAM' });
      if (idx < e.values.length) e.values[idx] = wire6(value);
      // GP-5 e Nano guardam a edicao ate o SALVAR (o host marca DIRTY);
      // a TONEX ONE grava sozinha.
      if (ks.kind !== 0) e.flags |= FLAG_DIRTY;
      return { sent: true };
    }
    if (p === '/usb_host/editor/action') {
      const action = String(a.action || '');
      if ((action !== 'save' && action !== 'discard') || ks.kind === 0) {
        return withStatus(400, { error: 'INVALID ACTION' });
      }
      if (action === 'save') {
        const nm = String(a.name ?? e.name).replace(/[^ -~]/g, ' ').slice(0, SAVE_NAME_MAX[ks.kind]);
        if (nm.trim()) e.name = nm;
        e.savedValues = e.values.slice();
        e.savedName = e.name;
      } else {
        e.values = e.savedValues.slice();
        e.name = e.savedName;
      }
      e.flags &= ~(FLAG_DIRTY | FLAG_LOST | FLAG_SAVE_FAIL);
      if (loaded) editorDump(state, e);            // releitura depois da acao
      return { sent: true };
    }
    return withStatus(404, { error: 'not found' });
  }

  // ── Kemper ──
  const k = state.kemper;
  if (p === '/kemper/editor/open') {
    if (!k.active) {
      k.active = true;
      k.reason = '';
      k.openMs = Date.now();
      if (state.kemperPresent) k.reads += 1;     // leitura completa (instantanea aqui)
    }
    return kemperParamsJson(state);
  }
  if (p === '/kemper/editor/close') {
    if (k.active) { k.active = false; k.reason = 'editor fechado'; }
    return { active: false };
  }
  if (p === '/kemper/editor/params') return kemperParamsJson(state);
  if (p === '/kemper/editor/read') {
    if (k.active && state.kemperPresent) k.reads += 1;
    return { sent: true };
  }
  if (p === '/kemper/editor/param') {
    const page = has(a, 'page') ? toInt(a.page) : -1;
    const num = has(a, 'num') ? toInt(a.num) : -1;
    const value = has(a, 'value') ? toInt(a.value) : -1;
    if (!k.active || page < 0 || page > 127 || num < 0 || num > 127 || value < 0 || value > 16383) {
      return withStatus(400, { error: 'invalid param' });
    }
    const arr = k.pages[page] || (k.pages[page] = []);
    while (arr.length <= num) arr.push(0);
    if (KED_MODULE_PAGES.has(page) && num === 0) {
      // troca de TIPO: o firmware rele o modulo; aqui os parametros do tipo
      // novo nascem com valores plausiveis, liga/desliga preservado.
      k.pages[page] = kedModuleArray(page, value, arr[3] >= 1 ? 1 : 0);
      k.renders = k.renders.filter((r) => r.p !== page);
    } else {
      arr[num] = value;
    }
    return { sent: true };
  }
  if (p === '/kemper/editor/render') return { queued: kemperQueueRenders(state, a.items) };
  if (p === '/kemper/editor/renders') {
    const since = has(a, 'since') ? Math.max(0, toInt(a.since)) : 0;
    return { seq: k.renderSeq,
      items: k.renders.filter((r) => r.seq > since).map(({ p: pg, n, v, t }) => ({ p: pg, n, v, t })) };
  }
  return withStatus(404, { error: 'not found' });
}
