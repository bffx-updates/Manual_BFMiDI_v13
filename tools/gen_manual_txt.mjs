// Gera Manual_BFMiDi_completo_por_topicos.txt a partir de js/content.js.
//
// O TXT e a versao "para ler de cabo a rabo" (e para busca offline) do mesmo
// conteudo que o site mostra em cards. Rode depois de mexer no content.js:
//
//     node tools/gen_manual_txt.mjs
//
// Idioma: PT por padrao. `--lang en` / `--lang es` geram as outras versoes.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argLang = (process.argv.find((a) => a.startsWith('--lang')) || '').split('=')[1]
  || (process.argv[process.argv.indexOf('--lang') + 1] !== '--lang'
      ? process.argv[process.argv.indexOf('--lang') + 1] : null);
const LANG = ['pt', 'en', 'es'].includes(argLang) ? argLang : 'pt';

const OUT = LANG === 'pt'
  ? 'Manual_BFMiDi_completo_por_topicos.txt'
  : `Manual_BFMiDi_completo_por_topicos_${LANG}.txt`;

// ─── carrega o MN_CONTENT sem navegador ───────────────────────────
const src = fs.readFileSync(path.join(ROOT, 'js', 'content.js'), 'utf8');
const CONTENT = new Function(`${src}; return MN_CONTENT;`)();

// ─── helpers ──────────────────────────────────────────────────────
const L = (v) => {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  return v[LANG] || v.pt || '';
};

// HTML -> texto puro, preservando a quebra dos paragrafos.
const strip = (html) => L(html)
  .replace(/<\/p>\s*<p>/gi, '\n')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<[^>]+>/g, '')
  .replace(/&nbsp;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/[ \t]+/g, ' ')
  .replace(/\n{3,}/g, '\n\n')
  .trim();

const WIDTH = 100;

// Quebra em linhas de <= WIDTH, indentando as continuacoes.
function wrap(text, indent = 0, firstIndent = null) {
  const pad = ' '.repeat(indent);
  const pad1 = ' '.repeat(firstIndent == null ? indent : firstIndent);
  const out = [];
  for (const para of String(text).split('\n')) {
    if (!para.trim()) { out.push(''); continue; }
    let line = '';
    let first = true;
    for (const word of para.trim().split(/\s+/)) {
      const prefix = first && out.length === 0 ? pad1 : pad;
      if (!line) {
        line = prefix + word;
      } else if ((line + ' ' + word).length <= WIDTH) {
        line += ' ' + word;
      } else {
        out.push(line);
        first = false;
        line = pad + word;
      }
    }
    if (line) out.push(line);
  }
  return out.join('\n');
}

const HEADERS = {
  pt: {
    title: 'BFMiDi - Manual do Usuário',
    sub: 'Versão TXT completa organizada por tópicos e itens',
    from: 'Gerado a partir de js/content.js',
    toc: 'SUMÁRIO', topic: 'TÓPICO', page: 'Página', summary: 'Resumo',
    intro: 'Introdução', mock: 'Tela/preview relacionado', goal: 'Objetivo',
    how: 'Como fazer', fields: 'Campos e itens', desc: 'Descrição',
    examples: 'Exemplos', notes: 'Observações', tabs: 'Abas desta página',
  },
  en: {
    title: 'BFMiDi - User Manual',
    sub: 'Full TXT version organized by topics and items',
    from: 'Generated from js/content.js',
    toc: 'CONTENTS', topic: 'TOPIC', page: 'Page', summary: 'Summary',
    intro: 'Introduction', mock: 'Related screen/preview', goal: 'Purpose',
    how: 'How to', fields: 'Fields and items', desc: 'Description',
    examples: 'Examples', notes: 'Notes', tabs: 'Tabs on this page',
  },
  es: {
    title: 'BFMiDi - Manual del Usuario',
    sub: 'Versión TXT completa organizada por temas e ítems',
    from: 'Generado a partir de js/content.js',
    toc: 'SUMARIO', topic: 'TEMA', page: 'Página', summary: 'Resumen',
    intro: 'Introducción', mock: 'Pantalla/vista relacionada', goal: 'Objetivo',
    how: 'Cómo hacerlo', fields: 'Campos e ítems', desc: 'Descripción',
    examples: 'Ejemplos', notes: 'Observaciones', tabs: 'Pestañas de esta página',
  },
}[LANG];

// ─── monta o documento ────────────────────────────────────────────
const out = [];
out.push(HEADERS.title, HEADERS.sub, HEADERS.from, '');

// Sumario
out.push(HEADERS.toc);
CONTENT.sections.forEach((sec, i) => {
  out.push(`${i + 1}. ${L(sec.title)}`);
  (sec.cards || []).forEach((card, j) => {
    out.push(`   ${i + 1}.${j + 1}. ${L(card.title)}`);
  });
});
out.push('', '='.repeat(88), '');

// Topicos
CONTENT.sections.forEach((sec, i) => {
  out.push(`${HEADERS.topic} ${i + 1} - ${L(sec.title).toUpperCase()}`);
  out.push('-'.repeat(88));
  if (sec.page) out.push(`${HEADERS.page}: ${sec.page}`);
  const summary = strip(sec.summary);
  if (summary) out.push(wrap(`${HEADERS.summary}: ${summary}`, 8, 0));
  const intro = strip(sec.intro);
  if (intro) out.push(wrap(`${HEADERS.intro}: ${intro}`, 8, 0));
  if (sec.tabs && sec.tabs.length) {
    out.push(`${HEADERS.tabs}: ${sec.tabs.map((t) => L(t.label)).join(' · ')}`);
  }
  out.push('');

  (sec.cards || []).forEach((card, j) => {
    const heading = `${i + 1}.${j + 1}. ${L(card.title)}`;
    out.push(heading);
    out.push('~'.repeat(Math.min(heading.length, WIDTH)));

    if (card.mockTitle) out.push(`${HEADERS.mock}: ${L(card.mockTitle)}`);
    const purpose = strip(card.purpose);
    if (purpose) out.push(wrap(`${HEADERS.goal}: ${purpose}`, 10, 0));

    if ((card.howto || []).length) {
      out.push(`${HEADERS.how}:`);
      card.howto.forEach((h, k) => out.push(wrap(`${k + 1}. ${strip(h)}`, 3, 0)));
    }

    if ((card.fields || []).length) {
      out.push(`${HEADERS.fields}:`);
      for (const f of card.fields) {
        const type = L(f.type);
        out.push(`- ${L(f.name)}${type ? ` (${type})` : ''}`);
        const d = strip(f.desc);
        if (d) out.push(wrap(`${HEADERS.desc}: ${d}`, 13, 2));
      }
    }

    if ((card.examples || []).length) {
      out.push(`${HEADERS.examples}:`);
      for (const e of card.examples) out.push(wrap(`- ${strip(e)}`, 3, 0));
    }

    if ((card.notes || []).length) {
      out.push(`${HEADERS.notes}:`);
      for (const n of card.notes) out.push(wrap(`- ${strip(n)}`, 3, 0));
    }
    out.push('');
  });
  out.push('='.repeat(88), '');
});

fs.writeFileSync(path.join(ROOT, OUT), out.join('\n'), 'utf8');
const stat = fs.statSync(path.join(ROOT, OUT));
console.log(`${OUT} gerado — ${CONTENT.sections.length} tópicos, `
  + `${CONTENT.sections.reduce((n, s) => n + (s.cards || []).length, 0)} itens, `
  + `${(stat.size / 1024).toFixed(0)} KB (idioma: ${LANG})`);
