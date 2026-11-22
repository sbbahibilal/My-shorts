// WHAT IF THE INTERNET WENT OFF FOR 30 DAYS? — one picture per clause; cuts land 3 frames before their word.
// Line map: L0 Tuesday · L1 gray · L2 power/internet · L3 570 cables · L4 beat/title · L5 day one · L6-L9 CASH ·
// L10-L13 MAPS · L14-L17 RADIO · L18-L21 PEOPLE · L22-L25 PAPER · L26 beat · L27-L29 DAY 7 · L30 beat ·
// L31-L34 DAY 30 · L35 beat · L36-L37 the message · L38 beat · L39 the question.
import { W, H, PIC, PORTRAIT, PAL, clamp, lerp, inv, eo, eio, eback, rr, circ, rgrad, vgrad, poly, hash, TAU, mixc } from './core/lib.js';
import { wd, ln, cut, T } from './core/timing.js';
import { makeView } from './core/view.js';
import { figure, glove } from './core/fig.js';
import { FLOOR, living, hallway } from './sets/rooms.js';
import { facade, skyline, phone, cans, MSG } from './sets/more.js';
import { U, pop, pill, stamp, goldText, navyBg } from './core/gfx.js';

const HH = 400;
const LAMP = { col: '#f2b266', w: 5, dx: 1, dy: -0.4 };
const MOON = { col: '#8fb0e8', w: 4.5, dx: 1, dy: -0.5 };
const fit = (c, text, size, maxW) => { c.font = `700 ${size}px Fredoka`; const w = c.measureText(text).width * 1.06; return w > maxW ? size * maxW / w : size; };

function hero(c, o) { return figure(c, { kind: 'hero', h: HH, y: FLOOR, ...o }); }
function pal(c, o) { return figure(c, { kind: 'plain', h: (o.h ?? HH), ...o }); }
function sitting(x, h = HH, o = {}) {
  const d = o.dir ?? -1, u = o.u || 0;
  const hipY = lerp(FLOOR - 136, FLOOR - h * 0.45, u), hipX = x + d * lerp(0, h * 0.2, u);
  const feet = [[x + d * lerp(h * 0.2, h * 0.17, u), FLOOR], [x + d * lerp(h * 0.27, h * 0.24, u), FLOOR]];
  const kx = x + d * h * 0.2 * (1 - u);
  return { x: hipX, dir: d, hipY, feet, hands: o.hands || [[kx + d * 4, hipY - 6 + u * 120], [kx + d * 14, hipY - 2 + u * 120]], h, lean: (o.lean || 0) + 0.05 };
}
function bigHead(c, hx, hy, h, o = {}) { const Y = hy + 0.86 * h; return figure(c, { kind: 'hero', h, x: hx, y: Y, view: 'front', feet: [[hx - 40, Y], [hx + 40, Y]], ...o }); }

export function buildShots() {
  const S = [];
  const add = (o) => { S.push(o); return o; };
  const L = (i) => ln(i);

  // ── COLD OPEN ─────────────────────────────────────────────────────────
  const grayT = wd(1, 6).s, netT = wd(2, 4).s;
  add({ id: 'S01', at: 0, note: 'Tuesday morning, you and your phone', cam: { x: 960, y: 470, w: 1920, push: 0.025, pushDur: 2.2, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      living(V, {});
      V.chars(1, 0, LAMP, (k) => hero(k, { ...sitting(1000), hand: 'mitten', face: { expr: 'calm', t, seed: 1, look: 0.5 } }));
    },
    over(c, lt) { stamp(c, 'TUESDAY · 9:14 A.M.', pop(lt, 0.3, 4)); },
    cues: [[0, 'hum', { dur: 2.6 }]] });
  add({ id: 'S02', at: cut(1), note: 'the phone in your hand goes gray', cam: { x: 960, y: 470, w: 900, pw: 640, py: 500 },
    draw(c, V, lt, t) { phone(V, { time: '9:14', glow: t < grayT ? 1 : 0.03, notif: 0 }); },
    cues: [[grayT, 'powerdown', { gain: 0.7 }]] });
  add({ id: 'S03', at: cut(2), note: 'not the power — the internet', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      skyline(V, { blackout: 0 });
      V.layer(1, 0, (k) => { k.fillStyle = 'rgba(6,7,10,0.25)'; k.fillRect(-1400, 240, 4720, 2600); router(k, 960, 560, { led: t > netT ? '#e05545' : '#7fd17a', blink: t > netT, t }); });
      V.layer(1.3, 6, (k) => { k.fillStyle = 'rgba(6,7,10,0.8)'; k.fillRect(180, 40, 560, 560); k.fillRect(1240, 40, 560, 560); });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    over(c, lt, t) { pill(c, 'POWER ON · NET OFF', W / 2, PIC.y + PIC.h * (PORTRAIT ? 0.18 : 0.12), pop(t, netT), { bg: PAL.red }); },
    cues: [[wd(2, 2).s, 'blip'], [netT, 'powerdown']] });
  const onceE = wd(3, -1).e;
  add({ id: 'S04', at: cut(3), card: true, note: '570 cables, all quiet',
    draw(c, V, lt, t) {
      navyBg(c, lt);
      const k = clamp((t - wd(3, 1).s) / (onceE - wd(3, 1).s));
      c.save(); c.font = `300 ${140 * U}px Nunito`; c.fillStyle = 'rgba(239,211,166,0.16)'; c.textAlign = 'center';
      for (let i = 0; i < 7; i++) { const yy = H / 2 - 120 * U + i * 46 * U, wob = Math.sin(t * 0.7 + i) * 26 * U; c.beginPath(); c.moveTo(-100, yy + wob); c.bezierCurveTo(W * 0.25, yy - 80 * U + wob, W * 0.75, yy + 80 * U - wob, W + 100, yy - wob); c.globalAlpha = 0.5; c.stroke(); }
      c.restore();
      goldText(c, `${Math.round(570 * eo(k))}`, W / 2, H / 2 - 40 * U, 230 * U, { ls: 0.02 });
      pill(c, 'SUBMARINE CABLES · ALL QUIET', W / 2, H / 2 + 130 * U, pop(t, wd(3, 3).s), { size: 38 });
    },
    cues: [[wd(3, 1).s, 'blip'], [onceE, 'land']] });
  add({ id: 'TITLE', at: L(4).start - 0.05, card: true, note: 'title card',
    draw(c, V, lt) {
      navyBg(c, lt);
      const k = eo(lt / 0.5), y = H / 2;
      c.save(); c.globalAlpha = k;
      const s1 = fit(c, 'WHAT IF THE INTERNET', 62 * U, W * 0.8), s2 = fit(c, 'WENT OFF FOR 30 DAYS?', 108 * U, W * 0.88);
      goldText(c, 'WHAT IF THE INTERNET', W / 2, y - 92 * U, s1, { col: '#efd3a6', ls: 0.08 });
      goldText(c, 'WENT OFF FOR 30 DAYS?', W / 2, y + 30 * U, s2 * (0.96 + 0.04 * k));
      c.restore();
    }, cues: [[L(4).start - 0.05, 'whoosh'], [L(4).start + 0.1, 'swell', { dur: 2.0 }]] });
  add({ id: 'S06', at: cut(5), note: 'day one — you get up', cam: { x: 880, y: 480, w: 1920, push: 0.03, pushDur: 1.7, px: 900, pw: 900 },
    draw(c, V, lt, t) {
      living(V, {});
      const u = eio((t - wd(5, 1).s) / 0.5);
      V.chars(1, 0, LAMP, (k) => hero(k, { ...sitting(1000, HH, { u, lean: Math.sin(u * Math.PI) * 0.3 }), face: { expr: u > 0.5 ? 'determined' : 'worried', t, seed: 1, look: -0.4 } }));
    },
    over(c, lt, t) { pill(c, 'DAY 1', W / 2, PIC.y + PIC.h * (PORTRAIT ? 0.2 : 0.13), pop(t, wd(5, 1).s)); },
    cues: [[wd(5, 1).s, 'cloth', { dur: 0.5, gain: 0.6 }], [wd(5, 1).s + 0.5, 'step', { gain: 0.7 }], [cut(5) + 0.1, 'blip', { gain: 0.6 }]] });

  // ── 1 · CASH ─────────────────────────────────────────────────────────
  function stepCard(S, li, num, label) {
    S.push({ id: 'C' + num, at: ln(li).start - 0.1, card: true, note: `step ${num} card`,
      draw(c, V, lt) {
        navyBg(c, lt);
        const k = clamp(lt / (3 / 24));
        goldText(c, num, W / 2, H / 2 - 30 * U, 300 * U * lerp(0.86, 1, eback(k)));
        pill(c, label, W / 2, H / 2 + 150 * U, pop(lt, 0.12), { size: 40 });
      }, cues: [[ln(li).start - 0.1, 'whoosh'], [ln(li).start + 0.02, 'blip']] });
  }
  stepCard(S, 6, '1', 'CASH');
  add({ id: 'S08', at: cut(7), note: 'the ATM still talks', cam: { x: 960, y: 470, w: 1500, pw: 900 },
    draw(c, V, lt, t) {
      V.layer(1, 0, (k) => {
        k.fillStyle = '#3d4d61'; k.fillRect(560, 60, 800, 760);
        k.fillStyle = '#4c5e73'; k.fillRect(584, 84, 752, 712);
        k.fillStyle = '#0d0f14'; rr(k, 700, 150, 520, 380, 26); k.fill();
        k.fillStyle = '#16324a'; rr(k, 730, 180, 460, 320, 16); k.fill();
        k.fillStyle = '#9fe2ff'; k.font = '700 34px Nunito'; k.textAlign = 'center'; k.fillText('CASH · WHILE IT LASTS', 960, 280);
        k.fillStyle = '#0d0f14'; rr(k, 790, 600, 340, 130, 20); k.fill();
        k.fillStyle = '#2b3550'; rr(k, 806, 614, 308, 56, 12); k.fill();
        if (t > wd(7, 2).e - 0.1) { for (let i = 0; i < 3; i++) { k.fillStyle = i % 2 ? '#e3d8c6' : '#d9cdb2'; rr(k, 870, 640 + i * 20 - eio(clamp((t - wd(7, 2).e + 0.1) / 0.6)) * 40, 180, 44, 8); k.fill(); } }
        for (let q = 0; q < 3; q++) for (let r = 0; r < 3; r++) { k.fillStyle = '#5b6070'; circ(k, 1240 + (r - 1) * 40, 640 + q * 44, 15); k.fill(); }
      });
    },
    over(c, lt, t) {
      if (t < wd(7, 2).e - 0.12) return;
      pill(c, 'CASH OUT', W / 2, PIC.y + PIC.h * (PORTRAIT ? 0.2 : 0.14), pop(t, wd(7, 2).e - 0.1));
    },
    cues: [[wd(7, 2).s, 'click', { gain: 0.7 }], [wd(7, 2).e, 'blip'], [wd(7, -1).e, 'can']] });
  add({ id: 'S09', at: cut(8), note: 'plastic promises vs what you hold', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      living(V, { dof: 6 });
      V.chars(1, 0, LAMP, (k) => {
        pal(k, { x: 620, dir: 1, hand: 'mitten', hands: [[700, 640], [716, 620]], face: { expr: 'calm', t, seed: 4, look: 1 } });
        hero(k, { x: 1300, dir: -1, hand: 'mitten', hands: [[1215, 630], [1240, 618]], face: { expr: 'determined', t, seed: 1, look: -1 } });
      });
      V.layer(1.01, 0, (k) => { k.fillStyle = '#e3d8c6'; rr(k, 1236, 620, 56, 34, 6); k.fill(); k.strokeStyle = '#9a8a68'; k.lineWidth = 3; k.strokeRect(1236, 620, 56, 34); k.fillStyle = '#5c5142'; rr(k, 1252, 626, 24, 22, 4); k.fill(); });
    },
    cues: [[wd(8, 0).s, 'step', { gain: 0.5 }]] });
  add({ id: 'S10', at: cut(9), note: 'the wallet does not need the network', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) { deskCash(V, { pop: clamp((t - wd(9, 2).s) / 0.35) }); },
    over(c, lt, t) { pill(c, 'WORKS OFFLINE', W / 2, PIC.y + PIC.h * (PORTRAIT ? 0.2 : 0.14), pop(t, wd(9, -1).s)); },
    cues: [[wd(9, 2).s, 'blip']] });

  // ── 2 · MAPS ─────────────────────────────────────────────────────────
  stepCard(S, 10, '2', 'MAPS');
  const mapLoad = wd(11, 2).s, mapDie = wd(12, 5).s;
  add({ id: 'S12', at: cut(11), note: 'save the city to the phone', cam: { x: 960, y: 470, w: 900, pw: 620, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '21:06', glow: 1, notif: 0 }); mapScreen(V, lt, false); },
    cues: [[mapLoad, 'type'], [mapLoad + 0.4, 'type']] });
  add({ id: 'S13', at: cut(12), note: 'the map goes quiet with the towers', cam: { x: 960, y: 470, w: 1500, pw: 900 },
    draw(c, V, lt, t) {
      phone(V, { time: '21:06', glow: 1, notif: 0 }); mapScreen(V, lt, t > mapDie);
      V.layer(1.15, 5, (k) => { k.fillStyle = 'rgba(6,7,10,0.5)'; k.fillRect(740, 60, 440, 480); });
      V.chars(1, 0, LAMP, (k) => hero(k, { x: 1500, dir: -1, hand: 'mitten', hands: [[1385, 560], [1405, 552]], face: { expr: t > mapDie ? 'worried' : 'calm', t, seed: 2, look: -1 } }));
    },
    look: () => ({ tint: '#203050', tintA: 0.2 }),
    cues: [[mapDie, 'powerdown', { gain: 0.5 }]] });
  add({ id: 'S14', at: cut(13), note: 'a paper map', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      deskPaper(V, { pop: clamp((t - wd(13, 2).s) / 0.35), isMap: true });
    },
    over(c, lt, t) { pill(c, 'NO PASSWORD', W / 2, PIC.y + PIC.h * (PORTRAIT ? 0.2 : 0.14), pop(t, wd(13, 7).s)); },
    cues: [[wd(13, 2).s, 'cloth', { dur: 0.4, gain: 0.5 }], [wd(13, 7).s, 'blip']] });

  // ── 3 · RADIO ────────────────────────────────────────────────────────
  stepCard(S, 14, '3', 'RADIO');
  add({ id: 'S16', at: cut(15), note: 'the radio still works', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      deskPaper(V, { pop: 1, isMap: false }); V.layer(1, 0, (k) => { k.fillStyle = 'rgba(6,7,10,0.35)'; k.fillRect(-1400, -1200, 4720, 3400); radioProp(k, 960, 560, lt, 1); });
      V.layer(1.3, 7, (k) => { k.fillStyle = 'rgba(6,7,10,0.8)'; k.fillRect(560, 60, 800, 420); });
    },
    over(c, lt, t) { pill(c, 'AM 610 · STILL LOUD', W / 2, PIC.y + PIC.h * (PORTRAIT ? 0.18 : 0.12), pop(t, wd(15, 4).s)); },
    cues: [[wd(15, 4).s, 'hum', { dur: 1.6, gain: 0.8 }]] });
  add({ id: 'S17', at: cut(16), note: 'batteries first', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      deskPaper(V, { pop: 1, isMap: false }); V.layer(1, 0, (k) => { k.fillStyle = 'rgba(6,7,10,0.5)'; k.fillRect(-1400, -1200, 4720, 3400);
        [720, 960, 1200].forEach((x, i) => { const p = clamp((t - wd(16, [0, 1, 4][i]).s) / 0.3); if (p <= 0) return; const s = 0.6 + 0.4 * eo(clamp(p * 1.3)) + Math.sin(clamp(p) * Math.PI) * 0.05;
          k.save(); k.translate(x, 620); k.scale(s, s); k.fillStyle = '#c8372d'; rr(k, -60, -110, 120, 220, 16); k.fill(); k.fillStyle = '#b8b2a4'; rr(k, -60, -110, 120, 44, 16); k.fill(); k.fillStyle = '#262a33'; rr(k, -24, 110, 48, 26, 6); k.fill(); k.restore(); });
        radioProp(k, 960, 560, lt, 0.2); });
      V.chars(1, 0, LAMP, (k) => hero(k, { x: 1650, dir: -1, lean: 0.3, hand: 'mitten', hands: [[1520, 610], [1470, 590]], face: { expr: 'determined', t, seed: 3 } }));
    },
    cues: [0, 1, 4].map((wi) => [wd(16, wi).s, 'can', { gain: 0.5 }]) });
  add({ id: 'S18', at: cut(17), note: 'one-way news is still news', cam: { x: 960, y: 470, w: 1500, push: 0.03, pushDur: 1.8, pw: 850 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.15, dof: 4 });
      V.layer(1.02, 0, (k) => { k.fillStyle = 'rgba(6,7,10,0.4)'; k.fillRect(180, 300, 560, 520); });
      V.chars(1, 0, LAMP, (k) => hero(k, { ...sitting(1000), dir: 1, hand: 'mitten', hands: [[1080, 520], [1105, 610]], face: { expr: 'calm', t, seed: 5, look: 1 } }));
      V.layer(1, 0, (k) => radioProp(k, 430, 560, t, 1));
    },
    look: () => ({ tint: '#203050', tintA: 0.15 }), cues: [[cut(17) + 0.1, 'hum', { dur: 2.4, gain: 0.7 }]] });

  // ── 4 · PEOPLE ───────────────────────────────────────────────────────
  stepCard(S, 18, '4', 'PEOPLE');
  add({ id: 'S20', at: cut(19), note: 'meet the neighbor in the hall', cam: { x: 1000, y: 490, w: 1920, pw: 1000, py: 500 },
    draw(c, V, lt, t) {
      hallway(V, {});
      const wv = t > wd(19, 1).s;
      V.chars(1, 0, { col: '#f2c98a', w: 4, dx: 0, dy: -0.5 }, (k) => {
        pal(k, { x: 1650, dir: -1, h: HH, y: FLOOR, hand: 'mitten', hands: wv ? [[1560, 520], [1660, 620]] : [[1585, 640], [1650, 630]], face: { expr: 'relieved', t, seed: 8, look: -1 } });
        hero(k, { x: 520, dir: 1, h: HH, y: FLOOR, hand: 'mitten', face: { expr: 'calm', t, seed: 1, look: 1 }, feet: [[520 - 40, FLOOR], [520 + 40, FLOOR]], hands: [[590, 610], [610, 620]] });
      });
    },
    cues: [[cut(19) + 0.2, 'step', { gain: 0.5 }]] });
  add({ id: 'S21', at: cut(20), note: 'the apps kept you apart', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      living(V, { dof: 6 });
      V.chars(1, 0, LAMP, (k) => {
        pal(k, { x: 640, dir: 1, h: HH, y: FLOOR, hand: 'mitten', face: { expr: 'calm', t, seed: 4, look: 1 }, feet: [[600, FLOOR], [680, FLOOR]] });
        hero(k, { x: 1280, dir: -1, h: HH, y: FLOOR, hand: 'mitten', face: { expr: 'worried', t, seed: 1, look: -1 }, feet: [[1240, FLOOR], [1320, FLOOR]] });
      });
      V.layer(1.02, 3, (k) => { k.fillStyle = '#0d0f14'; rr(k, 900, 560, 60, 100, 10); k.fill(); k.fillStyle = t > wd(20, 2).s ? '#2b3550' : '#0d0f14'; rr(k, 908, 570, 44, 80, 8); k.fill(); });
    },
    over(c, lt, t) { pill(c, 'NO APPS · NO EXCUSES', PIC.x + PIC.w * (PORTRAIT ? 0.5 : 0.3), PIC.y + PIC.h * (PORTRAIT ? 0.16 : 0.12), pop(t, wd(20, 2).s)); },
    cues: [[wd(20, 2).s, 'blip']] });
  add({ id: 'S22', at: cut(21), note: 'upstairs is the supply line', cam: { x: 960, y: 500, w: 1920, pw: 1000, py: 520 },
    draw(c, V, lt, t) {
      hallway(V, {});
      V.layer(1, 0, (k) => { k.fillStyle = '#5d7a77'; k.fillRect(760, 480, 420, 26); cans(k, 970, 470, 0.8, clamp((t - wd(21, 2).s) / 0.35)); });
      V.chars(1, 0, { col: '#f2c98a', w: 4, dx: 0, dy: -0.5 }, (k) => {
        pal(k, { x: 1240, dir: -1, h: HH, y: FLOOR, hand: 'mitten', face: { expr: 'calm', t, seed: 8, look: -1 }, feet: [[1200, FLOOR], [1280, FLOOR]] });
        hero(k, { x: 640, dir: 1, h: HH, y: FLOOR, lean: 0.15, hand: 'mitten', face: { expr: 'relieved', t, seed: 1, look: 1 }, feet: [[600, FLOOR], [680, FLOOR]] });
      });
    },
    over(c, lt, t) { pill(c, 'THE SUPPLY LINE', W / 2, PIC.y + PIC.h * (PORTRAIT ? 0.16 : 0.11), pop(t, wd(21, 2).s)); },
    cues: [[wd(21, 2).s, 'can', { gain: 0.6 }]] });

  // ── 5 · PAPER ────────────────────────────────────────────────────────
  stepCard(S, 22, '5', 'PAPER');
  const writeT = wd(23, 1).s;
  add({ id: 'S24', at: cut(23), note: 'write the numbers on paper', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      deskPaper(V, { pop: clamp((t - wd(23, 0).s) / 0.35), isMap: false, write: clamp((t - writeT + 0.1) / (wd(23, -1).e - writeT)) });
    },
    over(c, lt, t) { pill(c, 'NUMBERS · ON PAPER', W / 2, PIC.y + PIC.h * (PORTRAIT ? 0.2 : 0.14), pop(t, wd(23, 3).s)); },
    cues: [[writeT, 'type', { gain: 0.4 }]] });
  add({ id: 'S25', at: cut(24), note: 'every name lives on a stranger', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      phone(V, { time: '9:02', glow: 0.03, notif: 0 });
      V.layer(1.3, 8, (k) => { k.fillStyle = 'rgba(6,7,10,0.85)'; k.fillRect(740, 40, 440, 480); });
    },
    look: () => ({ tint: '#203050', tintA: 0.3 }), cues: [] });
  add({ id: 'S26', at: cut(25), card: true, note: 'their computer is off',
    draw(c, V, lt, t) {
      navyBg(c, lt);
      const k = eio(lt / 0.35);
      c.save(); c.globalAlpha = k * 0.25; c.translate(W / 2, H / 2);
      c.strokeStyle = '#efd3a6'; c.lineWidth = 3.5 * U; const R = 120 * U;
      c.beginPath(); c.arc(0, -10 * U, R, Math.PI * 0.25, Math.PI * 1.05); c.stroke();
      c.beginPath(); c.arc(0, -10 * U, R * 0.62, Math.PI * 0.35, Math.PI * 0.95); c.stroke();
      c.fillStyle = '#efd3a6'; circ(c, 0, 40 * U, 12 * U); c.fill();
      c.strokeStyle = '#c8372d'; c.lineWidth = 10 * U; c.beginPath(); c.moveTo(-R * 0.9, R * 0.75); c.lineTo(R * 0.9, -R * 0.75); c.stroke();
      c.restore();
      pill(c, 'THE CLOUD · OFFLINE TOO', W / 2, H * (PORTRAIT ? 0.68 : 0.62), pop(t, wd(25, 3).s), { bg: PAL.red, size: 36 });
    },
    cues: [[wd(25, 3).s, 'powerdown', { gain: 0.5 }]] });
  const beat1 = L(26).start;
  add({ id: 'S27', at: beat1 - 0.05, note: 'beat: your face', cam: { x: 960, y: 480, w: 1920, pw: 1080 },
    draw(c, V, lt, t) {
      const B = makeView(c, { x: 600, y: 470, w: 760, pw: 520 }, lt); living(B, { dark: 0.5, dof: 9 });
      V.chars(1, 0, { ...MOON, w: 3 }, (k) => bigHead(k, 1020, 500, 1900, { face: { expr: lt > 0.4 ? 'worried' : 'calm', t, seed: 6, look: eio((lt - 0.3) / 0.25) * -0.8 } }));
    }, look: () => ({ tint: '#203050' }), cues: [[beat1 + 0.2, 'heart', { n: 1 }]] });

  // ── DAY SEVEN ────────────────────────────────────────────────────────
  const q7 = L(27).start;
  add({ id: 'S29', at: cut(27), note: 'quiet streets', cam: { x: 960, y: 420, w: 1920, push: 0.03, pushDur: 2.0, pw: 1000, px: 1000, py: 500 },
    draw(c, V, lt, t) { facade(V, { lit: 0.15 }); skyline(V, { blackout: 0.75 }); },
    over(c, lt, t) { stamp(c, 'DAY 7 · 7:02 A.M.', pop(lt, 0.2, 4)); },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }), cues: [[q7, 'night', { dur: 4.6 }]] });
  add({ id: 'S30', at: cut(28), note: 'money you can hold', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      deskCash(V, { pop: clamp((t - wd(28, 2).s) / 0.35), coins: true });
    },
    over(c, lt, t) { pill(c, 'CASH ONLY', W / 2, PIC.y + PIC.h * (PORTRAIT ? 0.2 : 0.14), pop(t, wd(28, -1).s - 0.1), { bg: PAL.red }); },
    cues: [[wd(28, 2).s, 'can', { gain: 0.5 }], [wd(28, -1).s, 'blip']] });
  const knockT = wd(29, 9).s;
  add({ id: 'S31', at: cut(29), note: 'a knock on a real door', cam: { x: 820, y: 480, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      const jig = t > knockT - 0.05 ? Math.max(0, Math.sin((t - knockT) * 26)) * Math.exp(-(t - knockT) * 3) : 0;
      living(V, { doorShake: jig * 0.6, gap: 'rgba(255,224,170,0.9)' });
    },
    look: () => ({ tint: '#203050', tintA: 0.25 }),
    cues: [[knockT, 'knock', { gain: 0.8 }], [knockT + 0.42, 'knock', { gain: 0.6 }]] });
  const beat2 = L(30).start;
  add({ id: 'S32', at: beat2 - 0.05, note: 'beat: the quiet apartment', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) { living(V, { dark: 1, dof: 7 }); },
    look: () => ({ tint: '#203050' }), cues: [[beat2, 'night', { dur: 1.2 }]] });

  // ── DAY THIRTY ───────────────────────────────────────────────────────
  add({ id: 'S33', at: cut(31), note: '4 a.m., the dark apartment', cam: { x: 960, y: 470, w: 1920, push: 0.025, pushDur: 2.0, pw: 1000 },
    draw(c, V, lt, t) {
      living(V, { dark: 1 });
      V.chars(1, 0, MOON, (k) => hero(k, { ...sitting(1000), dir: 1, h: HH, y: FLOOR, face: { expr: 'worried', t, seed: 7, look: -1, eyeY: 0.15 } }));
    },
    over(c, lt) { stamp(c, 'DAY 30 · 4:02 A.M.', pop(lt, 0.2, 4)); },
    look: () => ({ tint: '#203050' }),
    cues: [[cut(31), 'hum', { dur: 2.0, gain: 0.7 }]] });
  const greenT = wd(32, 4).s;
  add({ id: 'S34', at: cut(32), note: 'the router light blinks green', cam: { x: 960, y: 470, w: 1500, pw: 850 },
    draw(c, V, lt, t) {
      living(V, { dark: 1, dof: 6 });
      V.layer(1, 0, (k) => router(k, 960, 560, { led: t > greenT ? '#7fd17a' : '#e05545', blink: t > greenT, t }));
      V.layer(1.3, 7, (k) => { k.fillStyle = 'rgba(6,7,10,0.8)'; k.fillRect(180, 40, 560, 560); k.fillRect(1240, 40, 560, 560); });
    },
    look: () => ({ tint: '#203050' }),
    over(c, lt, t) { pill(c, 'GREEN', W / 2, PIC.y + PIC.h * (PORTRAIT ? 0.18 : 0.12), pop(t, greenT), { bg: '#2e6b3f' }); },
    cues: [[greenT, 'blip'], [greenT + 0.42, 'blip']] });
  const lightT = wd(33, 3).s;
  add({ id: 'S35', at: cut(33), note: 'the phone lights your face', cam: { x: 980, y: 520, w: 1050, pw: 640 },
    draw(c, V, lt, t) {
      living(V, { dark: 1, dof: 5 });
      const g = t > lightT ? 1 : 0;
      V.chars(1, 0, g ? { col: '#9fc3ff', w: 6, dx: 0.4, dy: -1 } : MOON, (k) => {
        hero(k, { ...sitting(1000, HH, { hands: [[905, 560], [925, 552]] }), hand: 'mitten', face: { expr: g ? 'worried' : 'calm', t, seed: 5, look: -0.3, eyeY: 0.25, turn: 0.3 } });
        k.fillStyle = g ? '#cfe0ff' : '#0b0c10'; rr(k, 885, 510, 46, 76, 8); k.fill();
      });
      if (g) V.layer(1, 0, (k) => { k.fillStyle = rgrad(k, 910, 470, 10, 380, [[0, 'rgba(140,180,255,0.32)'], [1, 'rgba(140,180,255,0)']]); k.fillRect(500, 0, 1000, 1000); });
    },
    look: () => ({ tint: '#203050' }), cues: [[lightT, 'buzz']] });
  const notiT = wd(34, 2).s;
  add({ id: 'S36', at: cut(34), note: 'one message is waiting', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '4:02', glow: 1, notif: clamp((t - notiT) / 0.25, 0, 1), from: 'UNKNOWN', typed: 0 }); },
    cues: [[notiT, 'buzz'], [notiT + 0.3, 'blip']] });
  const msgW = T.words.filter((w) => w.line === 36 || w.line === 37);
  add({ id: 'S37', at: cut(36, 0), note: 'the message types itself', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      let n = 0; const parts = MSG.split(' '); let acc = 0;
      msgW.forEach((w, i) => { acc += (parts[i] || '').length + 1; if (t >= w.s) n = Math.min(MSG.length, Math.round(acc - 1 - (1 - clamp((t - w.s) / Math.max(0.05, w.e - w.s))) * (parts[i] || '').length)); });
      if (t > wd(37, -1).e + 0.4) n = Math.min(MSG.length, n + Math.floor((t - wd(37, -1).e) / 0.06) * ((parts[msgW.length] || '').length + 1));
      phone(V, { time: '4:02', glow: 1, notif: 1, from: 'UNKNOWN', typed: n });
    },
    cues: msgW.map((w) => [w.s, 'type']) });
  const beat3 = L(38).start;
  add({ id: 'S38', at: beat3 - 0.05, note: 'beat: your face', cam: { x: 960, y: 480, w: 1920, pw: 1080 },
    draw(c, V, lt, t) {
      const B = makeView(c, { x: 600, y: 470, w: 760, pw: 520 }, lt); living(B, { dark: 1, dof: 9 });
      const look = eio((lt - 0.3) / 0.25) * -1;
      V.chars(1, 0, { ...MOON, w: 3 }, (k) => bigHead(k, 1020, 500, 1900, { face: { expr: lt > 0.45 ? 'scared' : 'worried', t, seed: 6, look, turn: look * 0.2 } }));
    }, look: () => ({ tint: '#203050' }), cues: [[beat3 + 0.2, 'heart', { n: 2 }]] });
  const doorQ = wd(39, -1).s;
  add({ id: 'S39', at: cut(39), note: 'who sent the message?', cam: { x: 600, y: 520, w: 1500, push: 0.035, pushDur: 2.0, px: 470, pw: 820 },
    draw(c, V, lt, t) { living(V, { dark: 1, gap: 'rgba(170,200,255,0.85)' }); },
    look: () => ({ tint: '#203050' }), cues: [[doorQ + 0.02, 'knob']] });
  const endT = L(39).end + 0.3;
  add({ id: 'END', at: endT, card: true, note: 'end card', end: endT + 3.4,
    draw(c, V, lt) {
      navyBg(c, lt, { cy: 0.62 });
      const k = eo(lt / 0.4); c.save(); c.globalAlpha = k;
      const s1 = fit(c, 'WHO SENT THE MESSAGE?', 70 * U, W * 0.86);
      goldText(c, 'WHO SENT THE MESSAGE?', W / 2, H * (PORTRAIT ? 0.36 : 0.3), s1, { col: '#f3ecdf', glow: 'rgba(255,255,255,0.25)', ls: 0.05 });
      goldText(c, 'PART 2', W / 2, H * (PORTRAIT ? 0.44 : 0.46), 110 * U * (0.9 + 0.1 * eback(clamp((lt - 0.4) / 0.3))));
      c.restore();
      const V2 = makeView(c, { x: 560, y: 150, w: 2600, pw: 1500, py: 66 }, lt);
      V2.layer(1, 0, (q) => { q.globalAlpha = k; router(q, 300, 700, { led: '#7fd17a', blink: true, t: lt }); q.fillStyle = 'rgba(127,209,122,0.10)'; poly(q, [180, 780, 420, 780, 560, 900, 40, 900]); q.fill(); });
      V2.chars(1, 0, { col: '#a8dfff', w: 4, dx: -1, dy: 0 }, (q) => { q.globalAlpha = k; hero(q, { x: 760, dir: -1, h: HH, y: FLOOR, face: { expr: 'worried', t: lt, seed: 7, look: -1 }, feet: [[720, FLOOR], [800, FLOOR]] }); });
    }, cues: [[endT, 'whoosh'], [endT + 0.4, 'land']] });
  return S;
}

// ---------- custom props (data deps: none) ----------
function router(c, x, y, o = {}) {
  const bl = o.blink ? (hash(Math.floor(o.t * 6)) > 0.4 ? 1 : 0.15) : 1;
  c.fillStyle = '#e6e2d8'; rr(c, x - 110, y - 40, 220, 64, 18); c.fill();
  for (let i = 0; i < 3; i++) { c.fillStyle = '#9a958b'; rr(c, x - 92 + i * 64, y + 6, 40, 14, 5); c.fill(); }
  c.strokeStyle = '#3a3f4a'; c.lineWidth = 7; c.beginPath(); c.moveTo(x + 40, y - 40); c.lineTo(x + 78, y - 150); c.stroke();
  const led = o.led || '#7fd17a';
  c.fillStyle = led; c.shadowColor = led; c.shadowBlur = 26 * (o.blink ? bl : 1);
  circ(c, x - 92, y - 18, 9 * (o.blink ? Math.max(bl, 0.2) : 1) + 3); c.fill(); c.shadowBlur = 0;
}
function radioProp(c, x, y, t, on) {
  c.fillStyle = '#7b5a3e'; rr(c, x - 120, y - 40, 240, 80, 16); c.fill();
  c.fillStyle = '#5c3f2b'; rr(c, x - 104, y - 26, 208, 52, 10); c.fill();
  c.fillStyle = '#262a33'; rr(c, x - 92, y - 14, 92, 28, 6); c.fill();
  c.fillStyle = on > 0.5 ? '#e8c07a' : '#42424c'; rr(c, x - 86, y - 8, 80, 16, 4); c.fill();
  c.fillStyle = '#d9b56a'; circ(c, x + 66, y, 18); c.fill(); c.fillStyle = '#5c3f2b'; c.fillRect(x + 62, y - 2, 14, 4);
  c.strokeStyle = '#3a3f4a'; c.lineWidth = 6; c.beginPath(); c.moveTo(x + 80, y - 40); c.lineTo(x + 130, y - 160); c.stroke();
  if (on > 0.5) { c.fillStyle = '#7fd17a'; c.shadowColor = '#7fd17a'; c.shadowBlur = 18; circ(c, x - 92, y - 30, 6); c.fill(); c.shadowBlur = 0; }
}
/** banknotes (optionally coins) on the wood desk, top-down */
function deskCash(V, o = {}) {
  V.layer(1, 0, (c) => {
    c.fillStyle = '#7b5a3e'; c.fillRect(-1400, -1200, 4720, 3400);
    c.strokeStyle = '#6a4c33'; c.lineWidth = 4; for (let y = -1200; y < 2200; y += 120) { c.beginPath(); c.moveTo(-1400, y); c.lineTo(3320, y); c.stroke(); }
    c.fillStyle = 'rgba(6,7,10,0.4)'; c.fillRect(-1400, -1200, 4720, 3400);
    const p = o.pop ?? 1; if (p <= 0) return;
    const s = 0.6 + 0.4 * eo(p * 1.4) + Math.sin(clamp(p) * Math.PI) * 0.05;
    c.save(); c.translate(960, 560); c.scale(s, s);
    for (let i = 0; i < 5; i++) { c.save(); c.rotate(-0.12 + i * 0.06); c.fillStyle = i % 2 ? '#e3d8c6' : '#d9cdb2'; rr(c, -140, -90 + i * 22, 280, 150, 10); c.fill(); c.strokeStyle = '#9a8a68'; c.lineWidth = 3; c.strokeRect(-140, -90 + i * 22, 280, 150); c.fillStyle = '#5c5142'; rr(c, -30, -60 + i * 22, 60, 60, 6); c.fill(); c.restore(); }
    if (o.coins) for (let i = 0; i < 6; i++) { const a = i * 1.05, r = 210; c.fillStyle = '#d9b56a'; circ(c, Math.cos(a) * r, Math.sin(a) * r * 0.7 - 40, 34); c.fill(); c.strokeStyle = '#9a8a68'; c.lineWidth = 3; circ(c, Math.cos(a) * r, Math.sin(a) * r * 0.7 - 40, 34); c.stroke(); }
    c.restore();
  });
  V.layer(1.3, 6, (c) => { c.fillStyle = 'rgba(6,7,10,0.8)'; c.fillRect(-1400, -1200, 660, 3400); c.fillRect(1260, -1200, 2000, 3400); });
}
/** the map app: navy screen with a route; dead version grays it out */
function mapScreen(V, lt, dead) {
  V.layer(1.01, 0, (c) => {
    c.fillStyle = dead ? '#0d0f14' : '#12203a'; rr(c, 786, 126, 348, 728, 42); c.fill();
    if (dead) { c.fillStyle = '#2b3550'; c.textAlign = 'center'; c.font = '800 44px Nunito'; c.fillText('SERVICE', 960, 420); c.fillText('UNAVAILABLE', 960, 470); return; }
    c.strokeStyle = 'rgba(140,180,255,0.18)'; c.lineWidth = 3;
    for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(810, 200 + i * 110); c.lineTo(1110, 190 + i * 115); c.stroke(); c.beginPath(); c.moveTo(830 + i * 60, 160); c.lineTo(850 + i * 64, 810); c.stroke(); }
    c.strokeStyle = '#7fd17a'; c.lineWidth = 10; c.lineCap = 'round';
    c.beginPath(); c.moveTo(860, 730); c.bezierCurveTo(920, 560, 880, 420, 1010, 350); c.stroke();
    c.fillStyle = '#e8c07a'; circ(c, 1010, 350, 16); c.fill();
    c.fillStyle = '#e58b8b'; circ(c, 860, 730, 14); c.fill();
    c.fillStyle = 'rgba(18,24,40,0.92)'; rr(c, 830, 150, 260, 70, 18); c.fill();
    c.fillStyle = '#e8eefc'; c.font = '800 34px Nunito'; c.textAlign = 'center'; c.fillText('SAVING MAP…', 960, 196);
  });
}
function deskPaper(V, o = {}) {
  V.layer(1, 0, (c) => {
    c.fillStyle = '#7b5a3e'; c.fillRect(-1400, -1200, 4720, 3400);
    c.strokeStyle = '#6a4c33'; c.lineWidth = 4; for (let y = -1200; y < 2200; y += 120) { c.beginPath(); c.moveTo(-1400, y); c.lineTo(3320, y); c.stroke(); }
    c.fillStyle = 'rgba(6,7,10,0.4)'; c.fillRect(-1400, -1200, 4720, 3400);
    const p = o.pop ?? 1; if (p <= 0) return;
    const s = 0.6 + 0.4 * eo(p * 1.4) + Math.sin(clamp(p) * Math.PI) * 0.05;
    c.save(); c.translate(960, 560); c.scale(s, s);
    c.save(); c.rotate(o.isMap ? -0.06 : 0.02);
    c.shadowColor = 'rgba(0,0,0,0.5)'; c.shadowBlur = 24; c.shadowOffsetY = 10;
    c.fillStyle = '#efe6d6'; rr(c, -220, -260, 440, 520, 14); c.fill(); c.shadowBlur = 0; c.shadowOffsetY = 0;
    c.strokeStyle = '#9a8a68'; c.lineWidth = 3; c.strokeRect(-220, -260, 440, 520);
    if (o.isMap) {
      c.strokeStyle = 'rgba(90,110,150,0.5)'; c.lineWidth = 3;
      for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(-190, -180 + i * 90); c.lineTo(190, -185 + i * 92); c.stroke(); c.beginPath(); c.moveTo(-150 + i * 75, -230); c.lineTo(-145 + i * 78, 230); c.stroke(); }
      c.strokeStyle = '#c8372d'; c.lineWidth = 7; c.beginPath(); c.moveTo(-140, 160); c.bezierCurveTo(-40, 60, 40, -20, 150, -120); c.stroke();
      c.fillStyle = '#2b3550'; circ(c, 150, -120, 12); c.fill();
    } else {
      c.fillStyle = '#6b3b32'; c.font = '800 44px Nunito'; c.textAlign = 'left'; c.fillText('IF THE LINE GOES:', -180, -180);
      c.strokeStyle = 'rgba(40,40,40,0.55)'; c.lineWidth = 3.5;
      const rows = ['Mom — 555 0114', 'Sam — 555 0187', 'Work gate code', 'Meet: the bakery', 'Doc — 555 0142'];
      for (let i = 0; i < rows.length; i++) { const y = -110 + i * 64; c.fillText(rows[i], -180, y + 14); if (i + 1 < rows.length) { c.beginPath(); c.moveTo(-180, y + 40); c.lineTo(180, y + 40); c.stroke(); } }
    }
    c.restore();
    if (o.write != null && o.write > 0) { glove(c, 250 + Math.sin(o.write * 9) * 8, 60 + Math.cos(o.write * 7) * 8, 1.55, 0.5, 0.55, { sleeve: '#a94d1d' }); c.save(); c.rotate(o.isMap ? -0.06 : 0.02); c.strokeStyle = '#262a33'; c.lineWidth = 10; c.lineCap = 'round'; c.beginPath(); c.moveTo(60, 30 + Math.sin(o.write * 9) * 4); c.lineTo(150 + Math.sin(o.write * 9) * 8, 90 + Math.cos(o.write * 7) * 8); c.stroke(); c.restore(); }
    c.restore();
  });
  V.layer(1.3, 6, (c) => { c.fillStyle = 'rgba(6,7,10,0.8)'; c.fillRect(-1400, -1200, 660, 3400); c.fillRect(1260, -1200, 2000, 3400); });
}
