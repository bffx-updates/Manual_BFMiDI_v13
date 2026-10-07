// PEDAL SIMULADO pra captura dos prints do manual.
//
// É o dispositivo virtual do próprio editor (webApp/offline_device.js — o
// MODO OFFLINE) rodando no Node e servido por HTTP, como se fosse uma
// BFMiDi de verdade na rede. O editor abre com `?api=http://127.0.0.1:8932`
// e não sabe a diferença: carrega presets, salva, troca de modo, mostra os
// aparelhos USB. Nada encosta em pedal nenhum.
//
// Por cima do dispositivo virtual vão três coisas:
//   . a IDENTIDADE de uma unidade online (/ping, /version, /wifi/status), com
//     valores neutros — o manual é público, então nada de rede de casa real;
//   . a SEMENTE de demonstração: o pacote de fábrica (production/
//     backup_padrao.json) com canal e CC nos footswitches — o de fábrica vem
//     com canal OFF, e SW sem canal não aparece na tela do pedal;
//   . os APARELHOS USB e os editores de preset (mock_devices.mjs): GP-5,
//     TONEX ONE, Nano Cortex e Kemper Player simulados.
//
// Uso isolado (pra abrir o editor na mão e olhar as telas):
//     node tools/mock_pedal.mjs
//     → http://127.0.0.1:8932   (abra o editor com ?api=http://127.0.0.1:8932)
// O tools/capture_shots.mjs importa startMockPedal() e faz isso sozinho.

import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..', '..');

// ── semente de demonstração ──────────────────────────────────────────
// CCs da Valeton GP-5 (o pedal escolhido no Modo Amigável da semente), pra
// os campos mostrarem nome em vez de número.
const DEMO_SW = [
  { num: 50, start: 1, color: 0 },  // ON/OFF Distortion
  { num: 55, start: 0, color: 4 },  // ON/OFF Modulation
  { num: 56, start: 1, color: 2 },  // ON/OFF Delay
  { num: 57, start: 1, color: 5 },  // ON/OFF Reverb
  { num: 49, start: 0, color: 3 },  // ON/OFF PRE
  { num: 48, start: 0, color: 1 },  // ON/OFF Noise Gate
];
export function buildDemoSeed(seedPath = path.join(REPO, 'production', 'backup_padrao.json')) {
  const b = JSON.parse(fs.readFileSync(seedPath, 'utf8'));
  for (const tag of Object.keys(b.sw_params || {})) {
    let s = b.sw_params[tag];
    DEMO_SW.forEach((p, i) => {
      const n = i + 1;
      s = s.replace(new RegExp(`(sw${n}\\.fx1:)num=\\d+\\|ch=\\d+\\|(custom=\\d+\\|on=\\d+\\|off=\\d+\\|)start=\\d+(\\|at_preset=\\d+\\|)color=\\d+`),
        `$1num=${p.num}|ch=1|$2start=${p.start}$3color=${p.color}`);
    });
    b.sw_params[tag] = s;
  }
  const gc = b.global_config || (b.global_config = {});
  gc.match_mode = '6';            // Valeton GP-5 no Modo Amigável
  // alguns combos e o início automático, pra tela de BANCOS não sair vazia
  Object.assign(gc, {
    combo_1_2_tap: '11',          // SW_LIVE
    combo_2_3_tap: '10',          // LIGAR/DESLIGAR WI-FI
    combo_4_5_tap: '5',           // DESCER BANCO
    combo_5_6_tap: '4',           // SUBIR BANCO
    auto_start_enabled: '1',
    exp_enabled: '1', exp_cc: '7', exp_channel: '1',
  });
  return b;
}

// ── shims de navegador pro offline_device ────────────────────────────
function installShims(seed) {
  const mem = new Map();
  globalThis.localStorage = {
    get length() { return mem.size; },
    key(i) { return [...mem.keys()][i] ?? null; },
    getItem(k) { return mem.has(k) ? mem.get(k) : null; },
    setItem(k, v) { mem.set(k, String(v)); },
    removeItem(k) { mem.delete(k); },
    clear() { mem.clear(); },
  };
  const realFetch = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    if (String(url).includes('offline_seed.json')) {
      return new Response(JSON.stringify(seed), { status: 200, headers: { 'content-type': 'application/json' } });
    }
    return realFetch(url, init);
  };
}

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'Content-Type, X-BFMIDI-Token',
  'access-control-max-age': '600',
  'cache-control': 'no-store',
};

export async function startMockPedal({ port = 8932, seedPath, quiet = false } = {}) {
  installShims(buildDemoSeed(seedPath));
  const off = await import(pathToFileURL(path.join(REPO, 'webApp', 'offline_device.js')).href);
  let mock = null;
  try { mock = await import(pathToFileURL(path.join(HERE, 'mock_devices.mjs')).href); }
  catch (e) { if (!quiet) console.log('mock_devices.mjs ausente — sem aparelhos USB simulados'); }
  const mockState = mock ? mock.createMockDevices() : null;

  // valores de demonstração que o dispositivo virtual não tem
  const live = { bpm: 120, pedalName: '' };
  const identity = {
    '/ping': () => ({ ok: true, product: 'BFMIDI', device_id: 'A1B2C3', mdns: 'bfmidi.local',
      mdns_short: 'bfmidi.local', via_ap: false }),
    '/version': () => ({ fw: '14.5', webapp: '14.5', chip: 's3', board: 'BFMIDI-S3 8SW+',
      ota: true, usb_ota: true, usb_fs_write: true, running: 'ota_0', ota_max: 3670016,
      fs_total: 5242880, fs_used: 1182000 }),
    '/wifi/status': () => ({ product: 'BFMIDI', device_id: 'A1B2C3', mdns: 'bfmidi.local',
      mdns_short: 'bfmidi.local', ap_ssid: 'BFMIDI_WIFI', ap_ip: '192.168.4.1', sta_connected: true,
      sta_ssid: 'MINHA REDE', sta_ip: '192.168.0.100', rssi: -54, status_code: 3, reason: 0,
      saved: true, sta_state: 'connected', attempt: 1, legacy: false }),
    '/wifi/scan': () => ({ scanning: false, networks: [
      { ssid: 'MINHA REDE', rssi: -54, secure: true, enc: 3 },
      { ssid: 'ESTUDIO 2.4G', rssi: -68, secure: true, enc: 3 },
      { ssid: 'VIZINHO', rssi: -80, secure: true, enc: 4 }] }),
    '/exp/live': () => ({ enabled: 1, raw: 2240, value: 70, out: 70 }),
  };

  const readBody = (req) => new Promise((ok) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => ok(Buffer.concat(chunks)));
  });

  const server = http.createServer(async (req, res) => {
    if (req.method === 'OPTIONS') { res.writeHead(204, CORS).end(); return; }
    const u = new URL(req.url, 'http://127.0.0.1');
    const raw = await readBody(req);
    const ctype = String(req.headers['content-type'] || '');
    const bodyText = raw.length ? raw.toString('utf8') : '';
    let bodyObj = {};
    try {
      if (ctype.includes('json')) bodyObj = JSON.parse(bodyText || '{}');
      else if (!ctype.includes('multipart')) bodyObj = Object.fromEntries(new URLSearchParams(bodyText));
    } catch { bodyObj = {}; }
    const send = (status, obj) => {
      res.writeHead(status, { ...CORS, 'content-type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(obj));
    };
    try {
      // ── controle da captura (não existe no pedal) ──
      if (u.pathname === '/__mock/scenario') {
        if (mock) mock.setScenario(mockState, u.searchParams.get('name') || 'default');
        return send(200, { ok: true, scenario: u.searchParams.get('name') });
      }
      if (u.pathname === '/__mock/set') {
        if (u.searchParams.has('bpm')) live.bpm = +u.searchParams.get('bpm') || 120;
        if (u.searchParams.has('pedal_name')) live.pedalName = u.searchParams.get('pedal_name');
        return send(200, { ok: true });
      }
      if (u.pathname === '/__mock/global') {
        const p = new URLSearchParams(u.search);
        return send(200, await off.offlineRoute('POST', '/config/global', p));
      }
      if (u.pathname === '/__mock/reset') {
        await off.offlineResetToSeed();
        if (mock) mock.setScenario(mockState, 'default');
        return send(200, { ok: true });
      }

      if (mock) {
        const r = mock.handleMock(mockState, req.method, u.pathname, u.searchParams,
          { ...Object.fromEntries(u.searchParams), ...bodyObj });
        if (r != null) return send((mock.MOCK_STATUS && r[mock.MOCK_STATUS]) || 200, r);
      }
      if (identity[u.pathname]) return send(200, identity[u.pathname]());
      if (u.pathname === '/log') {
        res.writeHead(200, { ...CORS, 'content-type': 'text/plain' }).end('');
        return;
      }

      const init = { method: req.method };
      if (raw.length && !ctype.includes('multipart')) init.body = bodyText;
      const r = await off.offlineFetch(u.pathname + u.search, init);
      const ct = r.headers.get('content-type') || '';
      if (ct.includes('json')) {
        const j = await r.json();
        if (j && typeof j === 'object' && !Array.isArray(j)) {
          delete j.offline;   // o editor trataria a resposta como "sem pedal"
          if (u.pathname === '/bank/live' || u.pathname === '/bank/current') {
            j.tap_bpm = live.bpm; j.tap_ms = Math.round(60000 / live.bpm);
            if (live.pedalName) j.pedal_name = live.pedalName;
          }
        }
        return send(r.status, j);
      }
      const buf = Buffer.from(await r.arrayBuffer());
      res.writeHead(r.status, { ...CORS, 'content-type': ct || 'application/octet-stream' });
      res.end(buf);
    } catch (e) {
      send(e.status || 500, { error: String(e.message || e) });
    }
  });
  await new Promise((ok) => server.listen(port, '127.0.0.1', ok));
  if (!quiet) console.log(`pedal simulado em http://127.0.0.1:${port}` + (mock ? ' (com aparelhos USB)' : ''));
  return { server, base: `http://127.0.0.1:${port}`, close: () => server.close() };
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  startMockPedal({ port: Number(process.env.PORT) || 8932 });
}
