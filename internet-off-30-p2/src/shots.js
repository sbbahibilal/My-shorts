// WHAT IF THE INTERNET WENT OFF? — PART 2: THE RULES
// Line map: L0 day31 whisper · L1 tall questions · L2 cold kitchen · L3 beat · L4 buzzed · L5 Glitch rules ·
// L6 nobody there · L7 footsteps · L8 beat · L9-L11 WATER · L12-L13 CASH · L14-L15 SHIFTS · L16-L18 MARKS ·
// L19 beat · L20 changed mind · L21 Glitch noon · L22 we laughed · L23 pipes sing · L24 song stops · L25 beat ·
// L26 tap nothing · L27 ceiling knock · L28 Neighbor · L29 two phones · L30 rulebook watch · L31 beat ·
// L32 Glitch tower · L33 leash · L34 four blocks · L35 beat · L36 bags · L37 stairwell question · L38 what else.
import { W, H, PIC, PORTRAIT, PAL, clamp, lerp, eo, eio, eback, rr, circ, rgrad, poly, hash, mixc } from './core/lib.js';
import { wd, ln, cut, T } from './core/timing.js';
import { makeView } from './core/view.js';
import { figure, walk } from './core/fig.js';
import { FLOOR, living, hallway, kitchen, wallFloor } from './sets/rooms.js';
import { facade, phone, cans, MSG, stove } from './sets/more.js';
import { street, rain, stairwell } from './sets/worlds.js';
import { U, pop, pill, stamp, goldText, navyBg } from './core/gfx.js';

const HH = 400;
const LAMP = { col: '#f2b266', w: 5, dx: 1, dy: -0.4 };
const MOON = { col: '#8fb0e8', w: 4.5, dx: 1, dy: -0.5 };
const fit = (c, text, size, maxW) => { c.font = `700 ${size}px Fredoka`; const w = c.measureText(text).width * 1.06; return w > maxW ? size * maxW / w : size; };

function hero(c, o) { return figure(c, { kind: 'hero', h: HH, y: FLOOR, ...o }); }
function pal(c, o) { return figure(c, { kind: 'plain', h: (o.h ?? HH), ...o }); }
function sitting(x, h = HH, o = {}) {
  const d = o.dir ?? -1;
  const hipY = FLOOR - 136, hipX = x + d * h * 0.2;
  const feet = [[x + d * h * 0.17, FLOOR], [x + d * h * 0.24, FLOOR]];
  const kx = x + d * 4;
  return { x: hipX, dir: d, hipY, feet, hands: o.hands || [[kx, hipY - 6], [kx + d * 10, hipY - 2]], h, lean: 0.05 };
}

const MSG2 = "New rules. You'll want to break them.";
const MSG3 = 'Good. Water stops at noon. All of it.';
const MSG4 = 'The tower on Fourth still has water. For now.';

export function buildShots() {
  const S = [];
  const add = (o) => { S.push(o); return o; };
  const L = (i) => ln(i);

  function stepCard(li, num, label) {
    S.push({ id: 'C' + num, at: ln(li).start - 0.1, card: true, note: `step ${num} card`,
      draw(c, V, lt) {
        navyBg(c, lt);
        goldText(c, num, W / 2, H / 2 - 30 * U, 240 * U * lerp(0.86, 1, eback(clamp(lt / (3 / 24)))));
        pill(c, label, W / 2, H / 2 + 130 * U, pop(lt, 0.12), { size: 38 });
      }, cues: [[ln(li).start - 0.1, 'whoosh'], [ln(li).start + 0.02, 'blip']] });
  }

  // ---- COLD OPEN: the morning after ----
  add({ id: 'S01', at: 0, note: 'day 31, dead street at dawn', cam: { x: 960, y: 470, w: 1920, push: 0.03, pushDur: 2.4, px: 960, pw: 1050 },
    draw(c, V, lt, t) {
      street(V, { dark: 1, carShape: [340, 1240], arrows: [[900, 700, -0.4]] });
      rain(V, t, { a: 0.8 });
      V.chars(1, 0, MOON, (k) => { const w1 = walk(t, 760, 46, 1, 430, FLOOR); hero(k, { x: w1.x, dir: 1, h: 430, feet: w1.feet, bob: w1.bob, face: { expr: 'calm', t, seed: 1, look: 0.5 } }); });
    },
    over(c, lt, t) { stamp(c, 'DAY 31 · 9:03 A.M.', pop(lt, 0.3, 4)); },
    cues: [[0, 'night', { dur: 2.0 }], [0.4, 'step'], [1.1, 'step'], [1.8, 'step']] });

  add({ id: 'S02', at: cut(1), note: 'buildings like unanswered questions', cam: { x: 960, y: 420, w: 1920, push: 0.035, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt) { facade(V, { dark: 1 }); },
    cues: [[cut(1), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S03', at: cut(2), note: 'cold kitchen, dead phone', cam: { x: 960, y: 470, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      kitchen(V, { dark: 1, dof: 4 });
      V.layer(1, 0, (k) => {
        k.fillStyle = '#16181f'; rr(k, 900, 560, 130, 240, 18); k.fill();
        k.fillStyle = '#0d0f14'; rr(k, 908, 568, 114, 224, 12); k.fill();
      });
    },
    cues: [[cut(2), 'hum', { dur: 1.6, gain: 0.5 }]] });

  add({ id: 'S04', at: cut(3), note: 'beat: the phone, dark', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt) { phone(V, { time: '9:03', glow: 0.03, notif: 0 }); },
    cues: [[cut(3), 'night', { dur: 1.0, gain: 0.6 }]] });

  const buzzT = wd(4, 2).s;
  add({ id: 'S05', at: cut(4), note: 'it buzzed', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '9:04', glow: 1, notif: clamp((t - buzzT) / 0.25, 0, 1), from: 'UNKNOWN', typed: 0, msg: MSG2 });
    },
    cues: [[buzzT, 'buzz'], [buzzT + 0.3, 'blip']] });

  const m2 = T.words.filter((w) => w.line === 5);
  add({ id: 'S06', at: cut(5), note: 'the message types itself', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      let n = 0; const parts = MSG2.split(' '); let acc = 0;
      m2.forEach((w, i) => { acc += (parts[i] || '').length + 1; if (t >= w.s) n = Math.min(MSG2.length, Math.round(acc - 1 - (1 - clamp((t - w.s) / Math.max(0.05, w.e - w.s))) * (parts[i] || '').length)); });
      phone(V, { time: '9:04', glow: 1, notif: 1, from: 'UNKNOWN', typed: n, msg: MSG2 });
    },
    cues: m2.map((w) => [w.s, 'type']) });

  add({ id: 'S07', at: cut(6), note: 'nobody was typing. nobody was there', cam: { x: 960, y: 480, w: 1920, push: 0.04, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 1, dof: 6 });
      V.layer(1, 0, (k) => { k.fillStyle = rgrad(k, 1500, 520, 30, 420, [[0, 'rgba(140,180,255,0.3)'], [1, 'rgba(140,180,255,0)']]); k.fillRect(1100, 100, 900, 900); });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(6), 'swell', { dur: 1.8, gain: 0.6 }]] });

  add({ id: 'S08', at: cut(7), note: 'rules like footsteps on stairs', cam: { x: 960, y: 420, w: 1920, push: 0.045, pushDur: 2.6, px: 930, pw: 1000 },
    draw(c, V, lt, t) { stairwell(V, { dark: 1, lantern: [960, 560] }); },
    over(c, lt, t) {
      for (let i = 0; i < 3; i++) pill(c, ['RULE 1', 'RULE 2', 'RULE 3'][i], W / 2 + (PORTRAIT ? 0 : (i - 1) * 330 * U), PIC.y + PIC.h * (PORTRAIT ? 0.14 + i * 0.07 : 0.16 + (i % 2) * 0.05), pop(t, wd(7, 2).s + i * 0.5), { bg: i === 1 ? PAL.red : undefined, size: 30 });
    },
    cues: [[wd(7, 2).s, 'step'], [wd(7, 2).s + 0.5, 'step'], [wd(7, 2).s + 1.0, 'step']] });

  add({ id: 'S09', at: L(8).start, note: 'beat: stairwell dark', card: true,
    draw(c, V, lt) { stairwell(V, { dark: 1 }); },
    cues: [[L(8).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  // ---- THE FOUR RULES ----
  stepCard(9, '1', 'WATER');
  add({ id: 'S10', at: cut(10), note: 'two buckets, boiled', cam: { x: 960, y: 470, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) { stove(V, { boil: clamp((t - wd(10, 2).s) / 1.2) }); },
    cues: [[wd(10, 4).s, 'boil']] });

  add({ id: 'S11', at: cut(11), note: 'water becomes money', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 1 });
      V.layer(1, 0, (k) => {
        const e = eio(clamp((t - wd(11, 3).s) / 0.5));
        k.fillStyle = '#8d94a0'; poly(k, [760, 700 - 120 * e, 940, 700 - 120 * e, 930, 820, 770, 820]); k.fill();
        k.fillStyle = '#4f9fcb'; k.fillRect(772, 692 - 110 * e, 156, 20);
        for (let i = 0; i < 6 * e; i++) { k.fillStyle = '#d9b56a'; circ(k, 1050 + (i % 3) * 46, 760 - Math.floor(i / 3) * 40, 22); k.fill(); k.strokeStyle = '#9a8a68'; k.lineWidth = 4; circ(k, 1050 + (i % 3) * 46, 760 - Math.floor(i / 3) * 40, 22); k.stroke(); }
      });
    },
    cues: [[wd(11, 3).s, 'can', { gain: 0.5 }], [wd(11, 5).s, 'blip']] });

  stepCard(12, '2', 'CASH');
  add({ id: 'S13', at: cut(13), note: 'cash for bread', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      V.layer(1, 0, (k) => { k.fillStyle = '#7b5a3e'; k.fillRect(-1400, 620, 4720, 1400); k.fillStyle = '#6a4c33'; k.fillRect(-1400, 620, 4720, 16); cans(k, 960, 300, 0.8, 6); });
      V.chars(1.2, 4, LAMP, (k) => { k.fillStyle = '#e3d8c6'; rr(k, 880, 580, 200, 40, 8); k.fill(); k.strokeStyle = '#9a8a68'; k.lineWidth = 4; rr(k, 880, 580, 200, 40, 8); k.stroke(); k.fillStyle = '#5c5142'; rr(k, 940, 590, 80, 22, 5); k.fill(); });
    },
    cues: [[cut(13), 'shuffle', { gain: 0.5 }]] });

  stepCard(14, '3', 'SHIFTS');
  add({ id: 'S15', at: cut(15), note: 'someone watches the stairwell', cam: { x: 960, y: 430, w: 1920, push: 0.03, pushDur: 2.2, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      stairwell(V, { dark: 1, lantern: [700, 560], marks: [[420, 640, 'OK'], [1420, 560, 'OK']] });
      V.chars(1, 0, { col: '#ffd9a0', w: 5, dx: 1, dy: -0.3 }, (k) => hero(k, { ...sitting(1240), hand: 'mitten', face: { expr: 'calm', t, seed: 3, look: -1 } }));
    },
    look: () => ({ tint: '#203050', tintA: 0.25 }),
    cues: [[cut(15), 'night', { dur: 1.6, gain: 0.5 }]] });

  stepCard(16, '4', 'MARKS');
  add({ id: 'S17', at: cut(17), note: 'chalk X on the door', cam: { x: 960, y: 470, w: 1500, push: 0.04, pushDur: 2.0, px: 900, pw: 850 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 1, dof: 4 });
      V.layer(1, 0, (k) => {
        const e = eio(clamp((t - wd(17, 1).s) / 0.5));
        k.strokeStyle = 'rgba(238,235,220,0.95)'; k.lineWidth = 12; k.lineCap = 'round';
        k.beginPath(); k.moveTo(300, 420); k.lineTo(300 + 110 * e, 420 + 120 * e); k.moveTo(300 + 110 * (e - 0.34), 420); k.lineTo(300 + 110 * e, 420 + 120 * e); k.stroke();
      });
    },
    cues: [[wd(17, 1).s, 'scrape', { gain: 0.7 }]] });

  add({ id: 'S18', at: cut(18), note: 'a quiet country of chalk marks', cam: { x: 960, y: 480, w: 1920, push: 0.035, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 1, dof: 8 });
      V.layer(1, 0, (k) => { k.lineCap = 'round'; k.strokeStyle = 'rgba(238,235,220,0.9)'; k.lineWidth = 10; [[240, 470], [700, 500], [1180, 455], [1620, 486]].forEach(([mx, my], i) => { const e = eio(clamp((t - wd(18, 1).s - i * 0.25) / 0.35)); if (e <= 0) return; k.beginPath(); k.moveTo(mx, my); k.lineTo(mx + 26 * e, my + 30 * e); k.moveTo(mx + 26 * e, my); k.lineTo(mx, my + 30 * e); k.stroke(); }); });
    },
    cues: [[wd(18, 1).s, 'scrape', { gain: 0.4 }]] });

  // ---- NOON ----
  add({ id: 'S19', at: L(19).start, note: 'beat: phone dark on the table', card: true,
    draw(c, V, lt) { living(V, { dark: 1, dof: 9 }); },
    cues: [[L(19).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  add({ id: 'S20', at: cut(20), note: 'rules ticking in', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '9:07', glow: 1, notif: 1, from: 'UNKNOWN', typed: MSG2.length, msg: MSG2 }); },
    over(c, lt, t) { pill(c, 'TICK · TICK', W / 2, PIC.y + PIC.h * (PORTRAIT ? 0.14 : 0.1), pop(t, wd(20, 3).s), { bg: PAL.red, size: 30 }); },
    cues: [[wd(20, 3).s, 'type'], [wd(20, 4).s, 'type']] });

  add({ id: 'S21', at: cut(21), note: 'water stops at noon', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '9:11', glow: 1, notif: 1, from: 'UNKNOWN', typed: 0, msg: MSG3 });
    }, cues: [[cut(21), 'buzz']] });

  const m3 = T.words.filter((w) => w.line === 21);
  add({ id: 'S22', at: L(21).start + 0.3, note: 'the noon message types itself', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      let n = 0; const parts = MSG3.split(' '); let acc = 0;
      m3.forEach((w, i) => { acc += (parts[i] || '').length + 1; if (t >= w.s) n = Math.min(MSG3.length, Math.round(acc - 1 - (1 - clamp((t - w.s) / Math.max(0.05, w.e - w.s))) * (parts[i] || '').length)); });
      phone(V, { time: '9:11', glow: 1, notif: 1, from: 'UNKNOWN', typed: n, msg: MSG3 });
    },
    cues: m3.map((w) => [w.s, 'type']) });

  add({ id: 'S23', at: cut(22), note: 'we laughed. water is pipes', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      kitchen(V, { dark: 0.85, dof: 4 });
      V.layer(1, 0, (k) => faucet(k, V, { on: 1 }));
    },
    cues: [[cut(22), 'water', { dur: 1.6, gain: 0.6 }]] });

  add({ id: 'S24', at: cut(23), note: 'the pipes sing', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      kitchen(V, { dark: 1, dof: 4 });
      const jig = t > wd(23, 5).s ? Math.sin(t * 34) * 3 : 0;
      V.layer(1, 0, (k) => faucet(k, V, { on: 1, jig }));
    },
    look: () => ({ tint: '#203050', tintA: 0.3 }),
    cues: [[wd(23, 5).s, 'water', { dur: 1.2, gain: 0.7 }], [wd(23, 5).s, 'buzz', { gain: 0.4 }]] });

  const noonT = wd(24, -1).e;
  add({ id: 'S25', at: cut(24), note: 'the song stops at noon', cam: { x: 960, y: 460, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      kitchen(V, { dark: 1, dof: 4 });
      V.layer(1, 0, (k) => faucet(k, V, { on: t < noonT ? 1 : 0, drip: t > noonT }));
    },
    over(c, lt, t) { goldText(c, '11:59 → 12:00', W / 2, PIC.y + PIC.h * (PORTRAIT ? 0.14 : 0.1), 56 * U * (0.9 + 0.1 * pop(t, noonT)), { pop2: 0 }); },
    cues: [[noonT, 'pumpstop'], [noonT + 0.3, 'drops', { gain: 0.5 }]] });

  add({ id: 'S26', at: L(25).start, note: 'beat: the silence after', card: true,
    draw(c, V, lt) { kitchen(V, { dark: 1, dof: 9 }); },
    cues: [[L(25).start, 'night', { dur: 1.4 }]] });

  add({ id: 'S27', at: cut(26), note: 'nothing, not water, not air', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      kitchen(V, { dark: 1, dof: 4 });
      V.layer(1, 0, (k) => faucet(k, V, { on: 0, drip: false }));
    },
    over(c, lt, t) { const e = pop(t, wd(26, 3).s); c.save(); c.translate(W / 2, PIC.y + PIC.h * (PORTRAIT ? 0.16 : 0.12)); c.strokeStyle = PAL.red; c.lineWidth = 14 * U; c.lineCap = 'round'; c.globalAlpha = e; const s = 46 * U; c.beginPath(); c.moveTo(-s, -s); c.lineTo(s, s); c.moveTo(s, -s); c.lineTo(-s, s); c.stroke(); c.restore(); },
    cues: [[wd(26, 3).s, 'pumpstop']] });

  // ---- THE CEILING KNOCKS ----
  const knock1 = wd(27, 2).s, knock2 = knock1 + 0.42;
  add({ id: 'S28', at: cut(27), note: 'the ceiling knocks. twice.', cam: { x: 960, y: 420, w: 1500, pw: 850 },
    draw(c, V, lt, t) {
      const jig = (t > knock1 ? Math.max(0, Math.sin((t - knock1) * 26)) * Math.exp(-(t - knock1) * 4) : 0) + (t > knock2 ? Math.max(0, Math.sin((t - knock2) * 26)) * Math.exp(-(t - knock2) * 4) : 0);
      living(V, { dark: 1, dof: 6, doorShake: jig * 0.5 });
    },
    look: () => ({ tint: '#203050', tintA: 0.3 }),
    cues: [[knock1, 'knock', { gain: 0.9 }], [knock2, 'knock', { gain: 0.7 }]] });

  add({ id: 'S29', at: cut(28), note: 'the neighbor upstairs', cam: { x: 960, y: 470, w: 1920, push: 0.03, pushDur: 1.8, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 1, dof: 5 });
      V.chars(1, 0, LAMP, (k) => pal(k, { x: 1240, dir: -1, h: 380, face: { expr: 'worried', t, seed: 9, look: -1 }, lean: 0.06 }));
    },
    cues: [[cut(28), 'blip', { gain: 0.4 }]] });

  const twoT = wd(29, 2).s;
  add({ id: 'S30', at: cut(29), note: 'two phones, one message', cam: { x: 960, y: 470, w: 1920, push: 0.035, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 1 });
      V.layer(1, 0, (k) => {
        const e = eo(clamp((t - twoT) / 0.5));
        for (const dx of [-190, 190]) {
          k.save(); k.translate(960 + dx, 560); k.rotate(dx / 2200); k.scale(0.62 + 0.1 * e, 0.62 + 0.1 * e);
          k.fillStyle = '#16181f'; rr(k, -95, -180, 190, 360, 28); k.fill();
          k.fillStyle = mixc('#0d0f14', '#25406e', e); rr(k, -84, -168, 168, 336, 20); k.fill();
          if (e > 0.85) {
            k.fillStyle = 'rgba(236,240,250,0.95)'; rr(k, -64, -120, 128, 84, 12); k.fill();
            k.fillStyle = '#c8372d'; rr(k, -50, -104, 20, 20, 6); k.fill();
            k.fillStyle = '#1b2234'; k.font = '700 15px Nunito'; k.textAlign = 'left'; k.fillText('UNKNOWN', -24, -90);
            if (t > twoT + 0.8) { k.fillStyle = '#20263a'; k.font = '700 11px Nunito'; k.textAlign = 'left'; k.fillText('WATER STOPS', -50, -66); }
          }
          k.restore();
        }
      });
    },
    over(c, lt, t) { pill(c, 'SAME SECOND', W / 2, PIC.y + PIC.h * (PORTRAIT ? 0.14 : 0.1), pop(t, twoT + 0.8), { size: 30, bg: PAL.red }); },
    cues: [[twoT, 'buzz'], [twoT + 0.42, 'buzz'], [twoT + 0.8, 'blip']] });

  add({ id: 'S31', at: cut(30), note: 'its author watches us read', cam: { x: 960, y: 470, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 1, dof: 7 });
      V.chars(1, 0, LAMP, (k) => hero(k, { x: 700, dir: 1, h: 400, face: { expr: 'worried', t, seed: 2, look: 1 }, lean: 0.04 }));
      V.layer(1, 0, (k) => { k.fillStyle = rgrad(k, 1400, 540, 20, 300, [[0, 'rgba(140,180,255,0.3)'], [1, 'rgba(140,180,255,0)']]); k.fillRect(1100, 200, 700, 700); });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(30), 'swell', { dur: 1.6, gain: 0.5 }]] });

  add({ id: 'S32', at: L(31).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1, dof: 9 }); },
    cues: [[L(31).start, 'night', { dur: 0.7, gain: 0.6 }]] });

  const m4 = T.words.filter((w) => w.line === 32);
  add({ id: 'S33', at: cut(32), note: 'the tower message', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      let n = 0; const parts = MSG4.split(' '); let acc = 0;
      m4.forEach((w, i) => { acc += (parts[i] || '').length + 1; if (t >= w.s) n = Math.min(MSG4.length, Math.round(acc - 1 - (1 - clamp((t - w.s) / Math.max(0.05, w.e - w.s))) * (parts[i] || '').length)); });
      phone(V, { time: '12:47', glow: 1, notif: 1, from: 'UNKNOWN', typed: n, msg: MSG4 });
    },
    cues: m4.map((w) => [w.s, 'type']) });

  add({ id: 'S34', at: cut(33), note: 'not a hint — a leash', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      living(V, { dark: 1, dof: 6 });
      V.layer(1, 0, (k) => {
        const e = eio(clamp((t - wd(33, 5).s) / 0.6));
        k.strokeStyle = PAL.red; k.lineWidth = 12; k.lineCap = 'round';
        k.beginPath(); k.moveTo(640, 500); k.bezierCurveTo(400, 380 * (1 - e) + 560 * e, 300, 640, 240 + 140 * e, 700); k.stroke();
        const ph = 0.5 + 0.5 * Math.sin(t * 6); k.fillStyle = `rgba(224,85,69,${0.5 + 0.4 * ph})`; circ(k, 240 + 140 * e, 700, 26); k.fill();
      });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[wd(33, 5).s, 'swell', { dur: 1.2, gain: 0.7 }]] });

  add({ id: 'S35', at: cut(34), note: 'four blocks, no power', cam: { x: 960, y: 420, w: 1920, push: 0.03, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 1, carShape: [340], arrows: [[900, 700, -0.4], [1120, 690, -0.35]] });
      rain(V, t, { a: 0.5 });
      V.chars(1, 0, MOON, (k) => { const w1 = walk(t, 780, 60, 1, 420, FLOOR); hero(k, { x: w1.x, dir: 1, h: 420, feet: w1.feet, bob: w1.bob, face: { expr: 'determined', t, seed: 4, look: 1 } }); });
    },
    cues: [[cut(34), 'step'], [cut(34) + 0.3, 'step']] });

  add({ id: 'S36', at: L(35).start, note: 'beat', card: true,
    draw(c, V, lt) { stairwell(V, { dark: 1 }); },
    cues: [[L(35).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S37', at: cut(36), note: 'packed before deciding', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      living(V, { dark: 1, dof: 5 });
      V.layer(1, 0, (k) => {
        const e = eo(clamp((t - wd(36, 1).s) / 0.5));
        k.fillStyle = '#5c4a2e'; rr(k, 770, 560 + 40 * (1 - e), 380, 220 - 40 * e, 36); k.fill();
        k.fillStyle = '#4a3b24'; rr(k, 770, 560, 380, 60, 26); k.fill();
        k.fillStyle = '#8d744a'; circ(k, 905 + 110 * e, 480, 30 * e + 6); k.fill();
      });
    },
    cues: [[wd(36, 1).s, 'cloth', { gain: 0.6 }]] });

  add({ id: 'S38', at: cut(37), note: 'down into the question', cam: { x: 960, y: 430, w: 1920, push: 0.045, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      stairwell(V, { dark: 1, lantern: [960, 560] });
      V.chars(1, 0, MOON, (k) => { const w1 = walk(t, 860, 55, 1, 420, FLOOR); hero(k, { x: w1.x, dir: 1, h: 420, feet: w1.feet, bob: w1.bob, face: { expr: 'worried', t, seed: 5, look: 1 } }); });
    },
    look: () => ({ tint: '#203050', tintA: 0.3 }),
    cues: [[cut(37), 'step'], [cut(37) + 0.42, 'step'], [cut(37) + 0.84, 'step']] });

  add({ id: 'S39', at: cut(38), note: 'what else does it know?', cam: { x: 960, y: 420, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      facade(V, { dark: 1 });
      V.layer(1, 0, (k) => { k.fillStyle = rgrad(k, 960, 560, 60, 700, [[0, 'rgba(140,180,255,0.18)'], [1, 'rgba(140,180,255,0)']]); k.fillRect(500, 0, 1000, 900); k.fillStyle = 'rgba(140,180,255,0.85)'; k.font = `300 ${180 * U}px Nunito`; k.textAlign = 'center'; k.globalAlpha = 0.5 + 0.4 * Math.sin(t * 2); k.fillText('?', 960, 640); k.globalAlpha = 1; });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(38), 'swell', { dur: 1.8, gain: 0.7 }]] });

  // ---- END CARD ----
  const endT = L(38).end + 0.4;
  add({ id: 'END', at: endT, card: true, note: 'end card', end: endT + 3.6,
    draw(c, V, lt) {
      navyBg(c, lt, { cy: 0.62 });
      const k = eo(lt / 0.4);
      c.save(); c.globalAlpha = k;
      const s1 = fit(c, "WHO'S WRITING THE RULES?", 62 * U, W * 0.84);
      goldText(c, "WHO'S WRITING THE RULES?", W / 2, H * (PORTRAIT ? 0.36 : 0.30), s1, { col: '#f3ecdf', glow: 'rgba(255,255,255,0.25)', ls: 0.05 });
      goldText(c, 'PART 3', W / 2, H * (PORTRAIT ? 0.44 : 0.46), 110 * U * (0.9 + 0.1 * eback(clamp((lt - 0.4) / 0.3))));
      c.globalAlpha = k * 0.25; c.fillStyle = '#efe6d6'; c.font = `300 ${26 * U}px Nunito`; c.textAlign = 'center';
      c.fillText('WHAT IF THE INTERNET WENT OFF? · PART 2 OF 8', W / 2, H * (PORTRAIT ? 0.12 : 0.14));
      c.globalAlpha = k;
      c.fillStyle = '#7fd17a'; c.save(); c.shadowColor = '#7fd17a'; c.shadowBlur = 24 * U; circ(c, W / 2, H * (PORTRAIT ? 0.28 : 0.24), 9 * U * (0.6 + 0.4 * hash(Math.floor(lt * 6) + 99))); c.fill(); c.restore();
      c.restore();
    },
    cues: [[endT, 'whoosh'], [endT + 0.4, 'land']] });

  return S;
}

// ---------- custom props ----------

/** kitchen faucet close-up with running/drip water + optional pipe-shake */
function faucet(k, V, o = {}) {
  const t = V.lt;
  k.fillStyle = '#b9bcc2'; rr(k, 880, 420, 60, 240, 18); k.fill();
  k.save(); k.translate(910, 420); k.rotate(-0.5 + (o.jig || 0) * 0.02); k.fillStyle = '#b9bcc2'; rr(k, -14, -190, 130, 34, 17); k.fill();
  k.fillStyle = '#8d94a0'; rr(k, 96, -210, 34, 70, 14); k.fill(); k.restore();
  k.fillStyle = '#e6e2d8'; circ(k, 910, 436, 16); k.fill();
  k.fillStyle = '#9aa3ad'; rr(k, 700, 640, 560, 60, 12); k.fill();
  k.fillStyle = '#16181f'; rr(k, 500, 640, 220, 180, 14); k.fill(); rr(k, 1220, 640, 220, 180, 14); k.fill();
  if (o.on) {
    k.strokeStyle = 'rgba(95,176,214,0.85)'; k.lineWidth = 16; k.lineCap = 'round';
    k.beginPath(); k.moveTo(1040, 470); k.quadraticCurveTo(1046, 540, 1038, 640); k.stroke();
    k.fillStyle = 'rgba(95,176,214,0.7)'; k.fillRect(920, 618, 260, 24);
  }
  if (o.drip) for (let i = 0; i < 2; i++) { const ph = ((t * 1.4 + i / 2) % 1); if (ph > 0.85) continue; k.fillStyle = 'rgba(95,176,214,0.85)'; circ(k, 1038, 470 + ph * 170, 7); k.fill(); }
  if (o.jig) { k.strokeStyle = 'rgba(220,230,245,0.5)'; k.lineWidth = 5; for (let i = 0; i < 3; i++) { k.beginPath(); k.arc(910, 400, 60 + i * 40 + ((t * 90) % 40), -0.8, 0.2); k.stroke(); } }
}
