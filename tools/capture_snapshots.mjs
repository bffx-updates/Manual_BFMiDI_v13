// Captura os SNAPSHOTS de markup real do editor v13 e grava js/snapshots.js.
//
//     node tools/capture_snapshots.mjs            (usa o pedal em bfmidi.local)
//     node tools/capture_snapshots.mjs --offline  (so o build local, sem pedal)
//
// COMO FUNCIONA
// Sobe um servidor estatico sobre ../../data (o build atual do editor), abre o
// Chrome headless via DevTools Protocol, percorre as telas e extrai o outerHTML
// de cada regiao. O manual injeta esse HTML dentro da casca .bf-screen e usa
// css/app.css (copia do mesmo build) — ou seja, a "previa" do manual E a tela
// do editor, nao um desenho parecido com ela. Quando a UI mudar, rode isto de
// novo em vez de redesenhar mockup a mao.
//
// SEGURANCA — o editor acha o pedal real na rede (bfmidi.local) e as telas
// ficam bem mais ricas com um aparelho configurado de verdade. Por isso a
// primeira coisa injetada e um GUARD que transforma todo request != GET num
// no-op: navegar pelos modos de footswitch mexe no estado do editor, e sem o
// guard isso viraria escrita no pedal do usuario (inclusive pelo salvamento
// automatico). Nenhuma captura pode alterar preset alheio.
//
// Requisitos: Chrome (ou Edge) instalado e o build do editor em ../../data.
//
// LIMITACAO CONHECIDA — a etapa [MODOS DE FOOTSWITCH] depende de o painel do
// modo LIVE montar no headless, e isso se mostrou instavel: as vezes o editor
// nao entra em LIVE (o .bf-sw-card nunca aparece) e os 10 modos saem faltando.
// Todo o resto (PRESET, assistente, seletor de modos e os 13 destinos do menu)
// e confiavel. Se os sw-* faltarem, capture-os com o editor aberto num
// navegador de verdade: instale os helpers deste arquivo no console, use
// __mnPickMode(<MODO>) + __mnCapture('.bf-sw-card') e funda o resultado em
// snapshots.json. Foi assim que os sw-* atuais foram feitos.

import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.resolve(ROOT, '..', 'data');
const PORT = 8931;
const DEBUG_PORT = 9333;
const OFFLINE = process.argv.includes('--offline');

const CHROME_CANDIDATES = [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
];

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.svg': 'image/svg+xml', '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function serve() {
  const srv = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    const file = path.join(DATA, url === '/' ? 'index.html' : url);
    if (!file.startsWith(DATA) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      res.writeHead(404, { 'content-type': 'application/json' }).end('{}');
      return;
    }
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((ok) => srv.listen(PORT, '127.0.0.1', () => ok(srv)));
}

class CDP {
  constructor(ws) { this.ws = ws; this.id = 0; this.waiting = new Map(); }
  static async attach(wsUrl) {
    const ws = new WebSocket(wsUrl);
    await new Promise((ok, err) => { ws.onopen = ok; ws.onerror = err; });
    const cdp = new CDP(ws);
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      const w = cdp.waiting.get(msg.id);
      if (w) { cdp.waiting.delete(msg.id); msg.error ? w.err(new Error(JSON.stringify(msg.error))) : w.ok(msg.result); }
    };
    return cdp;
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((ok, err) => this.waiting.set(id, { ok, err }));
  }
  async eval(expression) {
    const r = await this.send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) {
      throw new Error('JS: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
    }
    return r.result.value;
  }
}

// ─── injetado na pagina ───────────────────────────────────────────
const GUARD = `(function(){
  if (window.__mnGuardOn) return 'ja';
  var of = window.fetch; window.__mnBlocked = [];
  window.fetch = function(u, o){
    var m = ((o && o.method) || 'GET').toUpperCase();
    if (m !== 'GET'){
      window.__mnBlocked.push(m + ' ' + String(u).slice(0,90));
      return Promise.resolve(new Response('{"ok":true,"persisted":true}',
        {status:200, headers:{'content-type':'application/json'}}));
    }
    return of.apply(this, arguments);
  };
  var OX = window.XMLHttpRequest;
  window.XMLHttpRequest = function(){
    var x = new OX(), op = x.open, sn = x.send;
    var blocked = false;
    x.open = function(m,u){ blocked = String(m).toUpperCase() !== 'GET';
      if (blocked) window.__mnBlocked.push(m + ' ' + String(u).slice(0,90));
      return op.apply(x, arguments); };
    x.send = function(){ if (blocked) return; return sn.apply(x, arguments); };
    return x;
  };
  window.__mnGuardOn = true; return 'on';
})()`;

const HELPERS = `(function(){
  window.__mnShrink = function(src, maxW){
    return new Promise(function(res){
      var im=new Image(); im.crossOrigin='anonymous';
      im.onload=function(){
        var s=Math.min(1, maxW/im.naturalWidth);
        var c=document.createElement('canvas');
        c.width=Math.max(1,Math.round(im.naturalWidth*s));
        c.height=Math.max(1,Math.round(im.naturalHeight*s));
        c.getContext('2d').drawImage(im,0,0,c.width,c.height);
        var png=/\\.png|image\\/png/i.test(src);
        try{ res(c.toDataURL(png?'image/png':'image/jpeg', png?undefined:0.7)); }catch(e){ res(''); }
      };
      im.onerror=function(){ res(''); }; im.src=src;
    });
  };
  window.__mnCapture = async function(sel, maxW){
    var el=document.querySelector(sel); if(!el) return null;
    var clone=el.cloneNode(true);
    var cs=[].slice.call(clone.querySelectorAll('img')), ls=[].slice.call(el.querySelectorAll('img'));
    for(var i=0;i<cs.length;i++){
      var d = ls[i] ? await window.__mnShrink(ls[i].currentSrc||ls[i].src, maxW||200) : '';
      if(d) cs[i].setAttribute('src',d); else cs[i].removeAttribute('src');
    }
    [].slice.call(clone.querySelectorAll('[id]')).forEach(function(n){n.removeAttribute('id');});
    clone.removeAttribute && clone.removeAttribute('id');
    [].slice.call(clone.querySelectorAll('input,button,select,textarea,a')).forEach(function(n){
      n.setAttribute('tabindex','-1');
    });
    // Largura/altura REAIS no app. Sem isso o manual tem que chutar a largura,
    // o layout responsivo reflui noutra medida e a tela sai esticada.
    var r = el.getBoundingClientRect();
    return { html: clone.outerHTML, w: Math.round(r.width), h: Math.round(r.height) };
  };
  window.__mnCaptureClosest = async function(childSel, ancestorSel, maxW){
    var c=document.querySelector(childSel); if(!c) return null;
    var a=c.closest(ancestorSel); if(!a) return null;
    var tmp='__mn'+Math.floor(performance.now());
    a.setAttribute('data-mn-tmp', tmp);
    var cap=await window.__mnCapture('[data-mn-tmp="'+tmp+'"]', maxW);
    a.removeAttribute('data-mn-tmp');
    if(!cap) return null;
    cap.html = cap.html.replace(/ data-mn-tmp="[^"]*"/,'');
    return cap;
  };
  window.__mnWaitFor = async function(sel, maxMs){
    var t0=Date.now();
    while(Date.now()-t0 < (maxMs||10000)){
      if(document.querySelector(sel)) return true;
      await new Promise(function(r){setTimeout(r,250);});
    }
    return false;
  };
  window.__mnClickText = function(sel, txt){
    var want=String(txt).replace(/\\s+/g,' ').trim().toUpperCase();
    var el=[].slice.call(document.querySelectorAll(sel)).find(function(b){
      return b.innerText.replace(/\\s+/g,' ').trim().toUpperCase()===want;
    });
    if(el){ el.click(); return true; } return false;
  };
  // Espera os dados do pedal CHEGAREM, nao so o DOM parar de mudar: o editor
  // renderiza vazio em ~1 s e so depois responde o /bank/current. Parar na
  // primeira estabilidade congelava a captura na tela em branco.
  window.__mnStable = async function(sel, minMs, maxMs){
    var t0=Date.now(), last=null, same=0, got=false;
    while(Date.now()-t0 < (maxMs||30000)){
      if(!got){
        // O editor busca o nome de CADA preset do banco separadamente
        // (bank/preset?bank=A1..A6). Esperar so o /bank/current congelava a
        // captura com o console ainda sem nomes.
        var res = performance.getEntriesByType('resource').map(function(e){return e.name;});
        var vistos = {};
        res.forEach(function(n){
          var m = n.match(/bank\\/preset\\?bank=([A-J][1-6])/);
          if (m) vistos[m[1]] = 1;
        });
        // presets DISTINTOS: o editor repete o A1 varias vezes, entao contar
        // ocorrencias dava o gate por satisfeito com so o primeiro nome pronto
        got = Object.keys(vistos).length >= 6
          && res.some(function(n){ return /config\\/global/.test(n); });
      }
      var e=document.querySelector(sel);
      var t=e?e.innerText.length:0;
      if(t===last){ same++; } else { same=0; last=t; }
      // exige: resposta do pedal + DOM parado + piso de tempo
      if(got && same>=4 && Date.now()-t0 >= (minMs||6000)) return 'dados+estavel:'+t;
      await new Promise(function(r){setTimeout(r,350);});
    }
    return 'timeout(len='+last+')';
  };
  return 'ok';
})()`;

const SETTINGS = ['MODO AMIGÁVEL', 'FOOTSWITCHES', 'BANCOS', 'TELA', 'LEDS', 'IMAGENS',
  'HARDWARE', 'WIFI', 'HOST', 'EDITOR', 'ATUALIZAR', 'BACKUP', 'TESTES'];
const SLUG = {
  'MODO AMIGÁVEL': 'cfg-amigavel', FOOTSWITCHES: 'cfg-footswitches', BANCOS: 'cfg-bancos',
  TELA: 'cfg-tela', LEDS: 'cfg-leds', IMAGENS: 'cfg-imagens', HARDWARE: 'cfg-hardware',
  WIFI: 'cfg-wifi', HOST: 'cfg-host', EDITOR: 'cfg-editor', ATUALIZAR: 'cfg-atualizar',
  BACKUP: 'cfg-backup', TESTES: 'cfg-testes',
};
// MUTE por ULTIMO: ele nao tem editor, entao o painel central fica vazio e o
// seletor de modo some junto — capturando-o no meio, todos os modos seguintes
// falhavam por nao ter mais de onde reabrir o picker.
const MODES = ['STOMP', 'SPIN', 'RAMP', 'MOMENT', 'MACROS', 'TAP TEMPO',
  'SINGLE', 'STEPS', 'CONTROL', 'MUTE'];
const MODE_SLUG = {
  MUTE: 'sw-mute', STOMP: 'sw-stomp', SPIN: 'sw-spin', RAMP: 'sw-ramp',
  MOMENT: 'sw-momentary', MACROS: 'sw-macros', 'TAP TEMPO': 'sw-tap',
  SINGLE: 'sw-single', STEPS: 'sw-steps', CONTROL: 'sw-control',
};

async function main() {
  if (!fs.existsSync(path.join(DATA, 'app.js'))) {
    console.error('ERRO: build do editor nao encontrado em ' + DATA
      + '\nRode antes:  cd webApp && BF_NO_GZIP=1 npm run build');
    process.exit(1);
  }
  const chrome = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
  if (!chrome) { console.error('ERRO: Chrome/Edge nao encontrado.'); process.exit(1); }

  const srv = await serve();
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'bfmidi-shots-'));
  const args = ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--mute-audio',
    '--remote-debugging-port=' + DEBUG_PORT, '--user-data-dir=' + profile,
    '--window-size=1280,900', 'about:blank'];
  if (OFFLINE) args.unshift('--host-resolver-rules=MAP bfmidi.local 127.0.0.2');
  const proc = spawn(chrome, args, { stdio: 'ignore' });

  let target = null;
  for (let i = 0; i < 60 && !target; i++) {
    await sleep(250);
    try {
      const list = await (await fetch('http://127.0.0.1:' + DEBUG_PORT + '/json/list')).json();
      target = list.find((t) => t.type === 'page');
    } catch { /* subindo */ }
  }
  if (!target) { console.error('ERRO: Chrome nao respondeu no DevTools.'); process.exit(1); }

  const cdp = await CDP.attach(target.webSocketDebuggerUrl);
  await cdp.send('Runtime.enable');
  await cdp.send('Page.enable');
  await cdp.send('Emulation.setDeviceMetricsOverride',
    { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });

  // guard ANTES de qualquer render: nenhuma escrita pode vazar pro pedal
  await cdp.send('Page.addScriptToEvaluateOnNewDocument', { source: GUARD });
  await cdp.send('Page.navigate', { url: 'http://127.0.0.1:' + PORT + '/index.html' });
  await sleep(2500);
  await cdp.eval(HELPERS);
  const guard = await cdp.eval(`window.__mnGuardOn ? 'ON' : 'OFF'`);
  if (guard !== 'ON') { console.error('ERRO: guard de escrita nao ativou — abortando.'); process.exit(1); }
  console.log('guard de escrita: ON');
  const st = await cdp.eval(`window.__mnStable('.bf-content-bank', 7000, 35000)`);
  console.log('carga do pedal  : ' + st + (OFFLINE ? '  (offline)' : '  (bfmidi.local)'));

  const shots = {};
  const grab = async (id, sel) => {
    const cap = await cdp.eval(`window.__mnCapture(${JSON.stringify(sel)},200)`);
    if (cap && cap.html) {
      shots[id] = cap;
      console.log('  + ' + id + ' (' + (cap.html.length / 1024).toFixed(1) + ' KB, '
        + cap.w + '×' + cap.h + ')');
    } else console.log('  ! ' + id + ' — sem match: ' + sel);
  };
  const click = (sel, txt) => cdp.eval(`window.__mnClickText(${JSON.stringify(sel)},${JSON.stringify(txt)})`);

  // ── PRESET ──────────────────────────────────────────────────────
  console.log('\n[PRESET]');
  for (const [id, sel] of Object.entries({
    'preset-tela': '.bf-content-bank', 'preset-header': '.bf-header',
    'preset-console': '.bf-bank-console', 'preset-modo': '.bf-studio-toggle-row',
    'preset-principal': '.bf-bank-center-stack', 'preset-display': '.bf-bank-slot-display',
    'preset-tabbar': '.bf-tabbar',
  })) await grab(id, sel);

  // sub-paineis do card PRINCIPAL
  for (const [txt, id] of [['LAYER 2', 'preset-layer2'], ['DISPLAY', 'preset-displaybtn'], ['EXTRAS', 'preset-extras']]) {
    if (await click('.bf-studio-np-act', txt)) {
      await sleep(500); await grab(id, '.bf-bank-center-stack');
      await click('.bf-studio-np-act', txt); await sleep(300);
    }
  }

  // ── ASSISTENTE ──────────────────────────────────────────────────
  console.log('\n[ASSISTENTE]');
  if (await cdp.eval(`(function(){var b=document.querySelector('.bf-studio-np-wizard'); if(b){b.click();return true;} return false;})()`)) {
    await sleep(900);
    await grab('wizard', '.bf-wiz-backdrop');
    await cdp.eval(`(function(){var x=document.querySelector('.bf-wiz-close,.bf-wiz-backdrop button'); if(x)x.click(); return 1;})()`);
    await sleep(500);
  } else console.log('  ! botao ASSISTENTE nao encontrado');

  // ── LIVE + modos de footswitch ──────────────────────────────────
  console.log('\n[LIVE]');
  await click('.bf-studio-toggle-btn', 'MODO LIVE');
  // o editor do SW so monta depois do painel LIVE renderizar; esperar por
  // tempo fixo dava captura vazia quando o pedal respondia mais devagar
  let liveOk = await cdp.eval(`window.__mnWaitFor('.bf-sw-mode-field:not(.bf-studio-np-wizard)', 12000)`);
  if (!liveOk) {
    // alguns modelos entram no LIVE sem SW selecionado: escolhe o primeiro
    await cdp.eval(`(function(){var t=document.querySelector('.bf-live-sw, .bf-bank-tile'); if(t) t.click(); return 1;})()`);
    liveOk = await cdp.eval(`window.__mnWaitFor('.bf-sw-mode-field:not(.bf-studio-np-wizard)', 8000)`);
  }
  console.log('  painel do SW: ' + (liveOk ? 'pronto' : 'NAO montou'));
  await sleep(500);
  for (const [id, sel] of Object.entries({
    'live-tela': '.bf-content-bank', 'live-grade': '.bf-bank-col-1',
    'live-painel': '.bf-bank-slot-center',
  })) await grab(id, sel);

  console.log('\n[MODOS DE FOOTSWITCH]');

  // Abre o seletor de modos e espera o MODAL existir de fato. O picker vive em
  // .bf-modal.bf-sw-mode-modal, pendurado no <body> — nao dentro do painel —,
  // e os itens sao .bf-sw-mode. Esperar por tempo fixo falhava no headless.
  const abrirPicker = async () => {
    if (await cdp.eval(`!!document.querySelector('.bf-sw-mode-modal')`)) return true;
    const temCampo = await cdp.eval(`(function(){
      var f = document.querySelector('.bf-sw-mode-field:not(.bf-studio-np-wizard)');
      if (f) { f.click(); return true; } return false; })()`);
    if (!temCampo) {
      // painel sem editor (ex.: MUTE): reseleciona um footswitch e tenta de novo
      await cdp.eval(`(function(){var t=document.querySelector('.bf-live-sw, .bf-bank-tile'); if(t) t.click(); return 1;})()`);
      await sleep(700);
      await cdp.eval(`(function(){
        var f=document.querySelector('.bf-sw-mode-field:not(.bf-studio-np-wizard)'); if(f) f.click(); return 1; })()`);
    }
    return cdp.eval(`window.__mnWaitFor('.bf-sw-mode-modal', 6000)`);
  };

  if (await abrirPicker()) {
    await grab('sw-picker', '.bf-sw-mode-modal');           // o seletor tambem e uma tela
    const nomes = await cdp.eval(`JSON.stringify([].slice.call(
      document.querySelectorAll('.bf-sw-mode')).map(function(b){
        return b.innerText.replace(/\\s+/g,' ').trim(); }).slice(0,12))`);
    console.log('  modos no seletor: ' + nomes);
  }

  for (const mode of MODES) {
    let ok = false;
    for (let tent = 0; tent < 3 && !ok; tent++) {
      if (!await abrirPicker()) { await sleep(500); continue; }
      // o item traz titulo + subtitulo ("STOMP" / "CLICK / LONG / RECLICK"),
      // entao casa pelo PRIMEIRO pedaco do texto, nao pelo texto inteiro
      ok = await cdp.eval(`(function(){
        var want = ${JSON.stringify(mode)};
        var el = [].slice.call(document.querySelectorAll('.bf-sw-mode')).find(function(b){
          var first = b.innerText.replace(/\\s+/g,' ').trim().toUpperCase();
          return first === want || first.indexOf(want + ' ') === 0;
        });
        if (el) { el.click(); return true; } return false; })()`);
      if (!ok) await sleep(500);
    }
    if (!ok) { console.log('  ! modo nao encontrado: ' + mode); continue; }
    // escolher o modo fecha o editor do SW: reabre antes de capturar
    let pronto = await cdp.eval(`window.__mnWaitFor('.bf-sw-mode-field:not(.bf-studio-np-wizard)', 5000)`);
    if (!pronto) {
      await cdp.eval(`(function(){var t=document.querySelector('.bf-live-sw, .bf-bank-tile'); if(t) t.click(); return 1;})()`);
      pronto = await cdp.eval(`window.__mnWaitFor('.bf-sw-mode-field:not(.bf-studio-np-wizard)', 5000)`);
    }
    await sleep(700);
    const id = MODE_SLUG[mode];
    const cap = await cdp.eval(`window.__mnCapture('.bf-sw-card', 200)`);
    if (cap && cap.html) {
      shots[id] = cap;
      console.log('  + ' + id + ' (' + (cap.html.length/1024).toFixed(1) + ' KB, ' + cap.w + '×' + cap.h + ')');
    } else console.log('  ! ' + id + ' — painel do modo nao capturado');
  }

  // ── CONFIGURACOES ───────────────────────────────────────────────
  console.log('\n[CONFIGURACOES]');
  await click('.bf-studio-toggle-row button, .bf-studio-toggle', 'MODO PRESET');
  await sleep(500);
  await cdp.eval(`(function(){var s=document.querySelector('.bf-nav-settings'); if(s)s.click(); return 1;})()`);
  await sleep(600);
  await grab('cfg-menu', '.bf-settings-backdrop');

  for (const name of SETTINGS) {
    await cdp.eval(`(function(){
      if(!document.querySelector('.bf-settings-backdrop')){
        var s=document.querySelector('.bf-nav-settings'); if(s)s.click();
      } return 1;})()`);
    await sleep(400);
    if (!await click('.bf-settings-option', name)) { console.log('  ! opcao ausente: ' + name); continue; }
    await sleep(1100);
    await grab(SLUG[name], '.bf-content');
    await cdp.eval(`(function(){
      var b=document.querySelector('.bf-settings-close,.bf-back,.bf-header-back');
      if(b){b.click();return 'back';}
      var h=document.querySelector('.bf-nav-home'); if(h){h.click();return 'home';}
      return 'nada';})()`);
    await sleep(600);
  }

  const blocked = await cdp.eval(`(window.__mnBlocked||[]).length`);
  console.log('\nescritas bloqueadas pelo guard: ' + blocked + ' (nenhuma chegou no pedal)');

  // ── ANONIMIZACAO ────────────────────────────────────────────────
  // O manual e publicado num site publico. A captura roda contra um pedal
  // REAL, e a tela de WIFI mostra o SSID de casa e o IP da LAN de quem
  // capturou — isso nao pode ir pro ar. Troca por exemplos neutros.
  // (Rode com --offline pra capturar sem pedal nenhum, se preferir.)
  let ssid = '';
  try {
    const c = new AbortController(); setTimeout(() => c.abort(), 4000);
    const st = await (await fetch('http://bfmidi.local/wifi/status', { signal: c.signal })).json();
    ssid = st.ssid || st.sta_ssid || '';
  } catch { /* sem pedal: nada a anonimizar */ }
  let scrubbed = 0;
  const SCRUB = [
    [/(\b(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/g, '192.168.0.100'],
    [/\b([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}\b/g, 'A1:B2:C3:D4:E5:F6'],
  ];
  for (const k of Object.keys(shots)) {
    let v = shots[k].html, before = v;
    for (const [re, rep] of SCRUB) v = v.replace(re, rep);
    if (ssid) v = v.split(ssid).join('MINHA REDE');
    if (v !== before) { shots[k].html = v; scrubbed++; }
  }
  console.log('snapshots anonimizados: ' + scrubbed);

  fs.writeFileSync(path.join(ROOT, 'snapshots.json'), JSON.stringify(shots, null, 1), 'utf8');
  fs.writeFileSync(path.join(ROOT, 'js', 'snapshots.js'),
    '/* BFMiDi · Manual — snapshots de markup REAL do editor v13.\n'
    + '   Gerado por tools/capture_snapshots.mjs. NAO editar a mao:\n'
    + '   quando a tela do editor mudar, rode a captura de novo. */\n'
    + '/* eslint-disable */\n"use strict";\n\nconst MN_SHOTS = '
    + JSON.stringify(shots, null, 1) + ';\n', 'utf8');

  const kb = Object.values(shots).reduce((n, v) => n + v.html.length, 0) / 1024;
  console.log('js/snapshots.js — ' + Object.keys(shots).length + ' snapshots, ' + kb.toFixed(0) + ' KB');

  proc.kill(); srv.close(); process.exit(0);
}

main().catch((e) => { console.error(e); process.exit(1); });
