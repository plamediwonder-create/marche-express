#!/usr/bin/env node
// Vérification anti-emoji : signale tout emoji / pictogramme décoratif dans les fichiers du projet.
// Utilisation :  node check-emojis.js        (code de sortie 1 s'il y en a, 0 sinon)
// Autorisés : les symboles de texte courants (c, r, tm, fleches, croix, puces, points de menu).
var fs = require('fs'), path = require('path');
var EXT = /\.(html|js|css|json|sql|md|txt|svg|webmanifest|yml|yaml)$/i;
var SKIP = /^(node_modules|\.git|\.vercel)$/;
var PICTO = /[\p{Extended_Pictographic}\u{1F1E6}-\u{1F1FF}\u{FE0F}\u{200D}\u{20E3}]/u;
var ALLOWED = /[©®™]/g;           // (c) (r) (tm)
function walk(dir, out) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(function (d) {
    if (SKIP.test(d.name)) return;
    var p = path.join(dir, d.name);
    if (d.isDirectory()) walk(p, out); else if (EXT.test(d.name)) out.push(p);
  });
  return out;
}
var root = process.argv[2] || __dirname, bad = 0;
walk(root, []).forEach(function (f) {
  if (path.basename(f) === 'check-emojis.js') return;
  fs.readFileSync(f, 'utf8').split('\n').forEach(function (line, i) {
    var clean = line.replace(ALLOWED, '');
    var m = clean.match(PICTO);
    if (m) {
      bad++;
      console.log('EMOJI  ' + path.relative(root, f) + ':' + (i + 1) + '  « ' + m[0] + ' »  ' + line.trim().slice(0, 80));
    }
  });
});
if (bad) { console.log('\n' + bad + ' emoji trouvé(s). Retirez-les puis relancez : node check-emojis.js'); process.exit(1); }
console.log('Aucun emoji dans le projet.');