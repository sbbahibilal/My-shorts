// WHAT IF THE INTERNET WENT OFF? — PART 4: WHAT YOU DO
// Line map: L0 9:14 Tuesday · L1 screens gray · L2 not the power · L3 570 cables · L4 beat · L5 day one ·
// L6 One · L7 cash · L8 cards vs cash · L9 wallet · L10 Two · L11 save city · L12 towers quiet · L13 paper map ·
// L14 Three · L15 radio works · L16 batteries · L17 one-way news · L18 Four · L19 meet neighbors · L20 apps ·
// L21 supply line · L22 Five · L23 write numbers · L24 names in computer · L25 computer off · L26 beat ·
// L27 day seven · L28 money you hold · L29 knock on door · L30 beat · L31 day thirty 4am · L32 router green ·
// L33 phone buzzes · L34 one message · L35 beat · L36 knows your name · L37 knows you were ready · L38 beat · L39 who sent it.
import { W, H, PIC, PORTRAIT, PAL, clamp, lerp, eo, eio, eback, rr, circ, rgrad, poly, vgrad, hash, mixc } from './core/lib.js';
import { wd, ln, cut, T } from './core/timing.js';
import { makeView } from './core/view.js';
import { figure, walk, glove } from './core/fig.js';
import { FLOOR, living, hallway, wallFloor, door } from './sets/rooms.js';
import { facade, phone, cans } from './sets/more.js';
import { street, rain, stairwell, radioAttic } from './sets/worlds.js';
import { U, pop, pill, stamp, goldText, navyBg } from './core/gfx.js';

const HH = 400;
const LAMP = { col: '#f2b266', w: 5, dx: 1, dy: -0.4 };
const MOON = { col: '#8fb0e8', w: 4.5, dx: 1, dy: -0.5 };
const fit = (c, text, size, maxW) => { c.font = `700 ${size}px Fredoka`; const w = c.measureText(text).width * 1.06; return w > maxW ? size * maxW / w : size; };

function hero(c, o) { return figure(c, { kind: 'hero', h: HH, y: FLOOR, ...o }); }
function pal(c, o) { return figure(c, { kind: 'plain', h: (o.h ?? HH), ...o }); }

const MSG7 = 'I know your name.';
const MSG8 = 'You were ready.';

function typedFromLine(t, line, msg) {
  const ws = T.words.filter((x) => x.line === line);
  const parts = line === 37 ? MSG8.split(' ') : msg.split(' ');
  const base = line === 37 ? MSG7.length + 1 : 0;
  let acc = 0, n = 0;
  ws.forEach((w, i) => { acc += (parts[i] || '').length + 1; if (t >= w.s) n = base + Math.min((parts[i] || '').length, Math.round(acc - 1 - (1 - clamp((t - w.s) / Math.max(0.05, w.e - w.s))) * (parts[i] || '').length)); });
  return n;
}

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

  // ---- COLD OPEN: 9:14 Tuesday ----
  add({ id: 'S01', at: 0, note: 'nine fourteen, Tuesday, living room', cam: { x: 960, y: 470, w: 1920, push: 0.03, pushDur: 2.2, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      living(V, {});
      V.layer(2, 2, (k) => {
        const e = eio(clamp((t - wd(1, 2).s) / 0.7));
        if (!e) return;
        k.fillStyle = `rgba(120,126,138,${0.92 * e})`; rr(k, 500, 200, 420, 300, 12); k.fill();
        k.fillStyle = 'rgba(150,154,164,0.5)'; k.fillRect(560, 260, 100, 30);
      });
    },
    over(c, lt, t) { stamp(c, 'TUESDAY · 9:14 A.M.', pop(lt, 0.3, 4)); },
    cues: [[0, 'swell', { dur: 1.6 }], [wd(1, 2).s, 'pumpstop'], [wd(1, 2).s, 'buzz']] });

  add({ id: 'S02', at: cut(1), note: 'every screen in the world', cam: { x: 960, y: 420, w: 1920, push: 0.04, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      facade(V, { dark: 0.4 });
      V.layer(2, 3, (k) => {
        const e = eo(clamp((t - cut(1) + 0.3) / 0.8));
        if (!e) return;
        k.globalAlpha = 0.85 * e;
        k.fillStyle = '#6e727c'; rr(k, 500, 200, 420, 300, 10); k.fill();
        k.fillStyle = 'rgba(190,194,200,0.4)'; k.fillRect(560, 260, 100, 30); k.fillRect(700, 340, 60, 30);
        k.globalAlpha = 1;
      });
    },
    over(c, lt, t) {
      pill(c, 'PHONES', PORTRAIT ? W / 2 - 120 * U : W / 2 - 340 * U, PIC.y + PIC.h * 0.13, pop(t, wd(1, 2).s), { size: 28 });
      pill(c, 'TVS', PORTRAIT ? W / 2 + 120 * U : W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(1, 2).s + 0.3), { size: 28 });
      if (!PORTRAIT) pill(c, 'SHOPS', W / 2 + 340 * U, PIC.y + PIC.h * 0.13, pop(t, wd(1, 2).s + 0.6), { size: 28 });
    },
    cues: [[wd(1, 2).s, 'pumpstop'], [cut(1), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S03', at: cut(2), note: 'not the power — the internet', cam: { x: 960, y: 470, w: 1500, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.5 });
      V.layer(2, 2, (k) => { k.fillStyle = '#787e8a'; rr(k, 500, 200, 420, 300, 10); k.fill(); });
    },
    over(c, lt, t) {
      pill(c, 'NOT THE POWER', PORTRAIT ? W / 2 : W / 2 - 220 * U, PIC.y + PIC.h * 0.12, pop(t, wd(2, 0).s), { size: 30 });
      pill(c, 'THE INTERNET', PORTRAIT ? W / 2 : W / 2 + 220 * U, PIC.y + PIC.h * 0.25, pop(t, wd(2, 3).s), { bg: PAL.red, size: 30 });
    },
    cues: [[wd(2, 0).s, 'blip'], [wd(2, 3).s, 'blip']] });

  add({ id: 'S04', at: cut(3), note: 'five hundred underwater cables, all quiet', cam: { x: 960, y: 430, w: 1920, push: 0.035, pushDur: 2.6, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      V.layer(3, 4, (k) => {
        k.fillStyle = vgrad(k, 0, -800, 2600, [[0, '#0a1024'], [1, '#10233c']]); k.fillRect(-1400, -1200, 4720, 2800);
      });
      V.layer(1, 0, (k) => {
        const dead = eio(clamp((t - wd(3, 4).s) / 0.9));
        for (let i = 0; i < 5; i++) {
          const y = 240 + i * 130;
          k.strokeStyle = i % 2 ? '#3d8ca8' : '#2b3550'; k.lineWidth = 16 - i;
          k.beginPath(); k.moveTo(-200, y);
          for (let x = -200; x <= 2120; x += 80) k.lineTo(x, y + Math.sin(x * 0.004 + i * 2) * 46);
          k.stroke();
          if (dead > i / 5) {
            const bx = 300 + i * 260, by = y + Math.sin(300 * 0.004 + i * 2) * 46;
            k.strokeStyle = PAL.red; k.lineWidth = 12;
            k.beginPath(); k.moveTo(bx, by - 50); k.lineTo(bx + 40, by + 50); k.moveTo(bx + 40, by - 50); k.lineTo(bx, by + 50); k.stroke();
          }
        }
      });
    },
    over(c, lt, t) {
      goldText(c, '570', W / 2, H * (PORTRAIT ? 0.2 : 0.18), 120 * U * (0.8 + 0.2 * eback(clamp((t - wd(3, 1).s) / 0.4))));
      pill(c, 'CABLES · ALL QUIET AT ONCE', W / 2, PIC.y + PIC.h * (PORTRAIT ? 0.27 : 0.26), pop(t, wd(3, 4).s), { size: 28 });
    },
    look: () => ({ tint: '#10203a', tintA: 0.3 }),
    cues: [[cut(3), 'swell', { dur: 2.0, gain: 0.7 }], [wd(3, 4).s, 'pumpstop']] });

  add({ id: 'S05', at: L(4).start, note: 'beat: the sea floor', card: true,
    draw(c, V, lt) { V.layer(1, 0, (k) => { k.fillStyle = vgrad(k, 0, -800, 2600, [[0, '#0a1024'], [1, '#10233c']]); k.fillRect(-1400, -1200, 4720, 2800); }); },
    look: () => ({ tint: '#10203a', tintA: 0.3 }),
    cues: [[L(4).start, 'night', { dur: 1.2, gain: 0.7 }]] });

  add({ id: 'S06', at: cut(5), note: "here's day one", cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 0.5, arrows: [[620, 700, -0.4]] });
      rain(V, t, { a: 0.4 });
      V.chars(1, 0, MOON, (k) => { const w1 = walk(t, 760, 46, 1, 400, FLOOR); hero(k, { x: w1.x, dir: 1, h: 400, feet: w1.feet, bob: w1.bob, face: { expr: 'determined', t, seed: 1, look: 1 } }); });
    },
    over(c, lt, t) { stamp(c, 'DAY 1 · WHAT YOU DO', pop(lt, 0.2, 4)); },
    cues: [[cut(5), 'whoosh', { gain: 0.5 }], [cut(5) + 0.4, 'step'], [cut(5) + 0.8, 'step']] });

  // ---- ONE: CASH ----
  stepCard(6, '1', 'CASH');

  add({ id: 'S07', at: cut(7), note: 'get cash while the machines talk', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 0.5 });
      atm(c, V, t);
      V.chars(1, 0, MOON, (k) => { hero(k, { x: 700, dir: 1, h: 360, y: FLOOR, face: { expr: 'determined', t, seed: 2, look: 1 } }); });
    },
    cues: [[cut(7), 'step'], [cut(7) + 0.4, 'step'], [wd(7, 3).s, 'click']] });

  add({ id: 'S08', at: cut(8), note: 'cards are promises, cash you can hold', cam: { x: 960, y: 430, w: 1300, pw: 820, py: 500 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 0.5 });
      const g = wd(8, 5).s;
      V.layer(1, 0, (k) => {
        k.fillStyle = '#262a34'; rr(k, 760, 480, 200, 130, 12); k.fill();
        k.fillStyle = '#8a8f9a'; k.font = '800 26px Nunito'; k.textAlign = 'center'; k.fillText('•••• 4417', 860, 560);
        const e = eo(clamp((t - g) / 0.5));
        k.save(); k.translate(1105 + 10 * e, 540); k.rotate(-0.12);
        k.fillStyle = '#4c8a54'; rr(k, -90, -46, 180, 92, 8); k.fill();
        k.fillStyle = '#a5d99b'; circ(k, 52, 6, 16); k.fill();
        k.fillStyle = '#e9f4e4'; k.font = '800 34px Fredoka'; k.textAlign = 'center'; k.fillText('20', -20, 18);
        k.restore();
        k.fillStyle = '#787e8a'; k.font = '800 22px Nunito'; k.textAlign = 'center'; k.fillText('PROMISES', 860, 660);
      });
    },
    over(c, lt, t) {
      pill(c, 'PROMISE', PORTRAIT ? W / 2 - 130 * U : W / 2 - 320 * U, PIC.y + PIC.h * 0.25, pop(t, wd(8, 1).s), { size: 26 });
      pill(c, 'YOU CAN HOLD IT', PORTRAIT ? W / 2 + 130 * U : W / 2 + 320 * U, PIC.y + PIC.h * 0.25, pop(t, wd(8, 5).s), { size: 26 });
    },
    cues: [[wd(8, 1).s, 'blip'], [wd(8, 5).s, 'cloth', { gain: 0.5 }], [wd(8, 5).s + 0.3, 'click']] });

  add({ id: 'S09', at: cut(9), note: 'the network dies, the wallet does not', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 0.55 });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1240, dir: -1, h: 360, y: FLOOR, hands: [[1180, 560], [1225, 550]], face: { expr: 'calm', t, seed: 3, look: -1 } }); });
      V.chars(1, 0, MOON, (k) => { hero(k, { x: 700, dir: 1, h: 360, y: FLOOR, hands: [[830, 560], [870, 548]], face: { expr: 'calm', t, seed: 4, look: 1 } }); });
      V.layer(1, 0, (k) => { k.fillStyle = '#4c8a54'; poly(k, [950, 570, 1000, 555, 1012, 585, 964, 596]); k.fill(); });
    },
    cues: [[cut(9), 'whoosh', { gain: 0.5 }], [wd(9, 2).s, 'cloth', { gain: 0.6 }]] });

  // ---- TWO: MAP ----
  stepCard(10, '2', 'MAP');

  const g10 = wd(11, 2).s;
  add({ id: 'S10', at: cut(11), note: 'save the city to your phone tonight', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '10:12', glow: 1, notif: t > g10 ? 1 : 0, from: 'MAPS', typed: t > g10 ? 9999 : 0, msg: 'SAVE THIS CITY — 12 KM SAVED', thumb: t > wd(11, 2).s + 0.4 });
    },
    cues: [[g10, 'blip'], [g10 + 0.4, 'click']] });

  add({ id: 'S11', at: cut(12), note: 'when towers go quiet, the map goes quiet', cam: { x: 960, y: 430, w: 1920, push: 0.035, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 0.7 });
      V.chars(1, 0, MOON, (k) => { hero(k, { x: 880, dir: 1, h: 360, y: FLOOR, face: { expr: 'worried', t, seed: 5, look: 1 } }); });
      V.chars(1, 0, MOON, (k) => {
        const e = eio(clamp((t - wd(12, 2).s) / 0.7));
        if (!e) return;
        k.globalAlpha = e; k.fillStyle = 'rgba(140,180,255,0.85)'; k.font = '600 64px Fredoka'; k.textAlign = 'center';
        k.fillText('…', 1250, 400 + 10 * Math.sin(t * 2)); k.globalAlpha = 1;
      });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(12), 'swell', { dur: 1.8, gain: 0.5 }], [wd(12, 2).s, 'buzz']] });

  add({ id: 'S12', at: cut(13), note: 'paper is the only map with no password', cam: { x: 960, y: 430, w: 1300, push: 0.04, pushDur: 2.0, pw: 820, py: 500 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 0.5 });
      paperMap(c, t, wd(13, 0).s - 1.0);
    },
    cues: [[wd(13, 0).s - 1.0, 'cloth', { gain: 0.7 }], [wd(13, 2).s, 'blip']] });

  // ---- THREE: RADIO ----
  stepCard(14, '3', 'RADIO');

  add({ id: 'S15', at: cut(15), note: 'the radio still works', cam: { x: 960, y: 430, w: 1500, push: 0.035, pushDur: 2.2, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      radioAttic(V, { on: 1, hotIdx: 2, lantern: [700, 260] });
      V.chars(1, 0, LAMP, (k) => { hero(k, { x: 1250, dir: -1, h: 360, y: FLOOR, face: { expr: 'calm', t, seed: 6, look: -1 } }); });
    },
    cues: [[cut(15), 'whoosh', { gain: 0.5 }], [wd(15, 1).s, 'blip']] });

  add({ id: 'S16', at: cut(16), note: 'batteries first, weather radio', cam: { x: 960, y: 430, w: 1300, pw: 820, py: 500 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 0.5 });
      V.layer(1, 0, (k) => {
        for (let i = 0; i < 4; i++) {
          const e = eo(clamp((t - wd(16, 0).s - i * 0.25) / 0.35));
          if (!e) continue;
          k.save(); k.translate(820 + i * 90, 560); k.rotate(-0.12 + i * 0.25);
          k.globalAlpha = e;
          k.fillStyle = i === 2 ? '#c9b04f' : '#4c515e'; rr(k, -26, -60, 52, 120, 10); k.fill();
          k.fillStyle = '#8d94a0'; rr(k, -10, -74, 20, 16, 4); k.fill();
          k.fillStyle = '#e9dfcf'; k.font = '800 20px Nunito'; k.textAlign = 'center'; k.fillText('D', 0, 8);
          k.globalAlpha = 1; k.restore();
        }
      });
    },
    over(c, lt, t) { pill(c, 'BATTERIES FIRST', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(16, 0).s), { size: 30 }); },
    cues: [[wd(16, 0).s, 'blip'], [wd(16, 0).s + 0.3, 'blip'], [wd(16, 0).s + 0.6, 'blip'], [wd(16, 3).s, 'click']] });

  add({ id: 'S17', at: cut(17), note: 'one-way news is still news', cam: { x: 880, y: 400, w: 1300, pw: 820, py: 480 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 0.5 });
      radioBox(c, t, 1);
      V.layer(1, 0, (k) => {
        k.strokeStyle = 'rgba(140,180,255,0.5)'; k.lineWidth = 8;
        for (let i = 0; i < 3; i++) { const ph = ((t * 0.7 + i / 3) % 1); k.globalAlpha = Math.sin(ph * Math.PI); k.beginPath(); k.arc(1230, 500, 60 + ph * 300, -1.2, 1.2); k.stroke(); }
        k.globalAlpha = 1;
      });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.2 }),
    over(c, lt, t) {
      pill(c, 'IN', PORTRAIT ? W / 2 - 80 * U : 700, PIC.y + PIC.h * 0.13, pop(t, wd(17, 0).s), { size: 30 });
      pill(c, 'NEWS', PORTRAIT ? W / 2 + 80 * U : 1230, PIC.y + PIC.h * 0.25, pop(t, wd(17, 3).s), { size: 30, bg: PAL.red });
    },
    cues: [[wd(17, 0).s, 'buzz'], [wd(17, 3).s, 'blip']] });

  // ---- FOUR: PEOPLE ----
  stepCard(18, '4', 'PEOPLE');

  add({ id: 'S19', at: cut(19), note: 'meet your neighbors today', cam: { x: 1200, y: 460, w: 1920, push: 0.03, pushDur: 2.0, px: 1200, pw: 1000 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 0.5 });
      door(c, 1400, 300, 190, 420, { num: '4B' });
      V.chars(1, 0, LAMP, (k) => { hero(k, { x: 1000, dir: 1, h: 360, y: FLOOR, face: { expr: 'calm', t, seed: 7, look: 1 }, hands: [[1055, 500], [1080, 545]] }); });
      const g = wd(19, 1).s;
      V.chars(1, 0, LAMP, (k) => {
        const e = eo(clamp((t - g) / 0.5));
        pal(k, { x: 1500 + 60 * (1 - e), dir: -1, h: 350, y: FLOOR, face: { expr: 'calm', t, seed: 8, look: -1 } });
      });
    },
    cues: [[wd(19, 1).s, 'knock'], [wd(19, 1).s + 0.3, 'knock'], [wd(19, 1).s + 0.6, 'knock']] });

  add({ id: 'S20', at: cut(20), note: 'the apps were the only reason', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '—:—', glow: 0.03, notif: 0, typed: 0 });
      V.layer(1, 0, (k) => {
        const e = eio(clamp((t - wd(20, 2).s) / 0.8));
        k.globalAlpha = Math.max(0.25, e);
        k.fillStyle = '#787e8a';
        for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) { rr(k, 880 + j * 60, 560 + i * 60, 42, 42, 10); k.fill(); }
        k.globalAlpha = 1;
      });
    },
    over(c, lt, t) { pill(c, 'THE APPS WENT FIRST', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(20, 1).s), { size: 30 }); },
    look: () => ({ tint: '#1c2438', tintA: 0.25 }),
    cues: [[wd(20, 2).s, 'pumpstop']] });

  add({ id: 'S21', at: cut(21), note: 'the people upstairs are the supply line', cam: { x: 960, y: 430, w: 1500, push: 0.04, pushDur: 2.2, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      stairwell(V, { dark: 0.7, lantern: [960, 560] });
      const g = wd(21, 0).s;
      V.chars(1, 0, LAMP, (k) => {
        const w1 = walk(t, 760, 46, 1, 380, FLOOR, 5 / 24, g + 1.0);
        pal(k, { x: w1.x, dir: 1, h: 380, y: FLOOR, feet: w1.feet, bob: w1.bob, hands: [[w1.x + 40, 600], [w1.x + 90, 580]], face: { expr: 'calm', t, seed: 9, look: 1 } });
        k.fillStyle = '#5c4a2e'; rr(k, w1.x + 52, 620, 90, 60, 8); k.fill();
      });
      V.chars(1, 0, MOON, (k) => { hero(k, { x: 1250, dir: -1, h: 360, y: FLOOR, face: { expr: 'calm', t, seed: 10, look: -1 } }); });
    },
    cues: [[cut(21), 'step'], [cut(21) + 0.4, 'step'], [cut(21) + 0.8, 'step']] });

  // ---- FIVE: PAPER ----
  stepCard(22, '5', 'PAPER');

  add({ id: 'S23', at: cut(23), note: 'write your numbers on real paper', cam: { x: 960, y: 430, w: 1300, push: 0.04, pushDur: 2.0, pw: 820, py: 500 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 0.5 });
      notebook(c, t, 5);
      V.chars(1, 0, LAMP, (k) => { glove(k, 1010, 470, 1.55, 0.5, 0.55, { sleeve: '#a94d1d' }); });
    },
    cues: T.words.filter((w) => w.line === 23).map((w) => [w.s, 'type']) });

  add({ id: 'S24', at: cut(24), note: "every name lives in someone else's computer", cam: { x: 960, y: 420, w: 1920, push: 0.035, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      facade(V, { dark: 0.7 });
      V.chars(1, 0, MOON, (k) => {
        const e = eo(clamp((t - wd(24, 2).s) / 0.8));
        if (!e) return;
        k.globalAlpha = e * 0.8; k.fillStyle = 'rgba(140,180,255,0.8)'; k.font = '600 54px Fredoka'; k.textAlign = 'center';
        k.fillText('…somewhere else', 960, 220 + 8 * Math.sin(t * 1.6)); k.globalAlpha = 1;
      });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(24), 'swell', { dur: 1.8, gain: 0.5 }], [wd(24, 2).s, 'blip']] });

  add({ id: 'S25', at: cut(25), note: "and their computer is off", cam: { x: 1150, y: 470, w: 1500, px: 1100, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      deskSet(c, t, 0);
      const g = wd(25, 3).s;
      V.chars(1, 0, null, (k) => {
        const e = eo(clamp((t - g) / 0.35));
        if (!e) return;
        k.fillStyle = 'rgba(236,240,250,0.95)'; k.font = '800 54px Fredoka'; k.textAlign = 'center';
        k.globalAlpha = e; k.fillText('OFF', 1345, 560); k.globalAlpha = 1;
      });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[wd(25, 3).s, 'pumpstop'], [wd(25, 3).s, 'buzz']] });

  add({ id: 'S26', at: L(26).start, note: 'beat', card: true,
    draw(c, V, lt) { wallFloor(c, { dark: 1 }); },
    cues: [[L(26).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  // ---- DAY SEVEN ----
  add({ id: 'S27', at: cut(27), note: 'day seven, streets quiet in a new way', cam: { x: 960, y: 420, w: 1920, push: 0.03, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 0.5, carShape: [340], arrows: [[900, 700, -0.4]] });
      rain(V, t, { a: 0.3 });
      V.chars(1, 0, MOON, (k) => { const w1 = walk(t, 700, 26, 1, 400, FLOOR); hero(k, { x: w1.x, dir: 1, h: 400, feet: w1.feet, bob: w1.bob, face: { expr: 'neutral', t, seed: 11, look: 1 } }); });
    },
    over(c, lt, t) { stamp(c, 'DAY 7 · A NEW KIND OF QUIET', pop(lt, 0.3, 4)); },
    cues: [[cut(27), 'whoosh', { gain: 0.5 }], [cut(27) + 0.5, 'step'], [cut(27) + 1.0, 'step']] });

  add({ id: 'S28', at: cut(28), note: 'money is what you can hold', cam: { x: 960, y: 460, w: 1500, push: 0.03, pushDur: 2.0, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      street(V, { dark: 0.5 });
      streetBarter(c, t);
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1240, dir: -1, h: 360, y: FLOOR, face: { expr: 'calm', t, seed: 12, look: -1 } }); });
    },
    over(c, lt, t) { pill(c, 'MONEY YOU CAN HOLD', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(28, 2).s), { size: 30 }); },
    cues: [[wd(28, 2).s, 'cloth', { gain: 0.6 }], [cut(28), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S29', at: cut(29), note: 'the loudest thing left is a knock', cam: { x: 1200, y: 460, w: 1920, push: 0.045, pushDur: 2.4, px: 1200, pw: 1000 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 0.7 });
      door(c, 1400, 300, 190, 420, { num: '4B' });
      V.chars(1, 0, LAMP, (k) => { hero(k, { x: 1000, dir: 1, h: 360, y: FLOOR, face: { expr: 'calm', t, seed: 13, look: 1 } }); });
      const g = wd(29, 6).s;
      V.chars(2, 0, null, (k) => {
        const e = eo(clamp((t - g) / 0.3));
        if (!e) return;
        k.fillStyle = 'rgba(238,235,220,0.9)'; circ(k, 1435 + 12 * Math.sin((t - g) * 22), 470, 14 * e); k.fill();
      });
    },
    cues: [[wd(29, 6).s, 'knock'], [wd(29, 6).s + 0.35, 'knock'], [wd(29, 6).s + 0.7, 'knock']] });

  add({ id: 'S30', at: L(30).start, note: 'beat', card: true,
    draw(c, V, lt) { hallway(V, { dark: 1 }); },
    cues: [[L(30).start, 'night', { dur: 1.0, gain: 0.6 }]] });

  // ---- DAY THIRTY ----
  add({ id: 'S31', at: cut(31), note: 'day thirty, four in the morning', cam: { x: 960, y: 470, w: 1500, push: 0.03, pushDur: 2.0, px: 960, pw: 900 },
    draw(c, V, lt, t) { living(V, { dark: 1, dof: 4 }); },
    over(c, lt, t) { stamp(c, 'DAY 30 · 4:02 A.M.', pop(lt, 0.3, 4)); },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(31), 'night', { dur: 1.6, gain: 0.7 }]] });

  add({ id: 'S32', at: cut(32), note: 'the router light blinks green', cam: { x: 960, y: 430, w: 1300, push: 0.04, pushDur: 2.0, pw: 820, py: 500 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 1 });
      V.layer(1, 0, (k) => {
        k.fillStyle = '#262a34'; rr(k, 880, 540, 220, 70, 12); k.fill();
        k.strokeStyle = '#3a3f4a'; k.lineWidth = 5;
        for (let i = 0; i < 3; i++) { k.beginPath(); k.moveTo(1000 + i * 24, 560); k.lineTo(1000 + i * 24, 590); k.stroke(); }
        const on = (Math.floor(t * 2.4) % 2) === 0 && t > wd(32, 0).s - 1.0;
        k.fillStyle = on ? '#7fd17a' : '#243324'; circ(k, 930, 575, 10); k.fill();
        if (on) { k.fillStyle = rgrad(k, 930, 575, 10, 130, [[0, 'rgba(140,255,170,0.5)'], [1, 'rgba(140,255,170,0)']]); k.fillRect(800, 445, 260, 260); }
      });
    },
    look: () => ({ tint: '#14301c', tintA: 0.25 }),
    cues: [[wd(32, 0).s - 1.0, 'blip'], [wd(32, 0).s - 0.58, 'blip'], [wd(32, 0).s - 0.16, 'blip']] });

  const buzz = wd(33, 2).s;
  add({ id: 'S33', at: cut(33), note: 'your phone buzzes the way it used to', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '4:02', glow: t > buzz - 0.3 ? 1 : 0.03, notif: t > buzz ? 1 : 0, from: 'UNKNOWN', typed: 0, msg: '…' });
    },
    cues: [[buzz, 'buzz'], [buzz + 0.42, 'buzz'], [buzz + 0.84, 'blip']] });

  add({ id: 'S34', at: cut(34), note: 'one message is waiting', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '4:02', glow: 1, notif: 1, from: 'UNKNOWN', typed: 1, msg: '…' });
      V.layer(1, 0, (k) => {
        k.fillStyle = '#20263a';
        for (let i = 0; i < 3; i++) { const ph = ((t * 1.6 + i / 3) % 1); k.globalAlpha = 0.8 * Math.sin(ph * Math.PI); circ(k, 920 + i * 40, 10, 7); k.fill(); }
        k.globalAlpha = 1;
      });
    },
    cues: [[cut(34), 'blip'], [cut(34) + 0.4, 'blip']] });

  add({ id: 'S35', at: L(35).start, note: 'beat: the message, dark', card: true,
    draw(c, V, lt) { phone(V, { time: '4:02', glow: 0.15, notif: 1, from: 'UNKNOWN', typed: 1, msg: '…' }); },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[L(35).start, 'night', { dur: 0.9, gain: 0.6 }]] });

  add({ id: 'S36', at: cut(36), note: 'it knows your name', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '4:02', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 36, MSG7), msg: MSG7 });
    },
    cues: T.words.filter((w) => w.line === 36).map((w) => [w.s, 'type']) });

  add({ id: 'S37', at: cut(37), note: 'it knows you were ready', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '4:02', glow: 1, notif: 1, from: 'UNKNOWN', typed: 9999, msg: MSG7 + '  ' + MSG8 });
    },
    cues: T.words.filter((w) => w.line === 37).map((w) => [w.s, 'type']) });

  add({ id: 'S38', at: L(38).start, note: 'beat', card: true,
    draw(c, V, lt) { phone(V, { time: '4:02', glow: 0.1, notif: 1, from: 'UNKNOWN', typed: 9999, msg: MSG7 + '  ' + MSG8 }); },
    cues: [[L(38).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S39', at: cut(39), note: 'who sent the message?', cam: { x: 960, y: 420, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      facade(V, { dark: 1 });
      V.layer(1, 0, (k) => {
        k.fillStyle = rgrad(k, 960, 560, 60, 700, [[0, 'rgba(140,180,255,0.18)'], [1, 'rgba(140,180,255,0)']]); k.fillRect(500, 0, 1000, 900);
        k.fillStyle = 'rgba(140,180,255,0.85)'; k.font = `300 ${180 * U}px Nunito`; k.textAlign = 'center'; k.globalAlpha = 0.5 + 0.4 * Math.sin(t * 2); k.fillText('?', 960, 640); k.globalAlpha = 1;
      });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(39), 'swell', { dur: 1.8, gain: 0.7 }]] });

  // ---- END CARD ----
  const endT = L(39).end + 0.4;
  add({ id: 'END', at: endT, card: true, note: 'end card', end: endT + 3.6,
    draw(c, V, lt) {
      navyBg(c, lt, { cy: 0.62 });
      const k = eo(lt / 0.4);
      c.save(); c.globalAlpha = k;
      const s1 = fit(c, 'REPLY OR STAY OFFLINE?', 62 * U, W * 0.84);
      goldText(c, 'REPLY OR STAY OFFLINE?', W / 2, H * (PORTRAIT ? 0.36 : 0.30), s1, { col: '#f3ecdf', glow: 'rgba(255,255,255,0.25)', ls: 0.05 });
      goldText(c, 'PART 5', W / 2, H * (PORTRAIT ? 0.44 : 0.46), 110 * U * (0.9 + 0.1 * eback(clamp((lt - 0.4) / 0.3))));
      c.globalAlpha = k * 0.25; c.fillStyle = '#efe6d6'; c.font = `300 ${26 * U}px Nunito`; c.textAlign = 'center';
      c.fillText('WHAT IF THE INTERNET WENT OFF? · PART 4 OF 8', W / 2, H * (PORTRAIT ? 0.12 : 0.14));
      c.globalAlpha = k;
      c.fillStyle = '#7fd17a'; c.save(); c.shadowColor = '#7fd17a'; c.shadowBlur = 24 * U; circ(c, W / 2, H * (PORTRAIT ? 0.28 : 0.24), 9 * U * (0.6 + 0.4 * hash(Math.floor(lt * 6) + 4))); c.fill(); c.restore();
      c.restore();
    },
    cues: [[endT, 'whoosh'], [endT + 0.4, 'land']] });

  return S;
}

// ---------- custom props ----------

/** ATM into a wall of a dead shop */
function atm(c, V, t) {
  V.layer(1, 0, (k) => {
    k.fillStyle = '#3c4250'; rr(k, 1150, 260, 300, 640, 14); k.fill();
    k.fillStyle = '#262a34'; rr(k, 1180, 300, 240, 220, 12); k.fill();
    k.fillStyle = '#787e8a'; k.font = '800 30px Fredoka'; k.textAlign = 'center'; k.fillText('ATM', 1300, 380);
    k.fillStyle = '#16181f'; rr(k, 1200, 560, 200, 40, 8); k.fill();
    const e = eo(clamp((t - wd(7, 3).s) / 0.5));
    if (e) { k.fillStyle = '#4c8a54'; for (let i = 0; i < 3; i++) { const ph = clamp((t - wd(7, 3).s - i * 0.25) / 0.35); k.globalAlpha = 1 - ph; rr(k, 1200, 560 + ph * 120, 200, 40, 8); k.fill(); } k.globalAlpha = 1; }
  });
}

/** folded paper map that opens and shows a route + X */
function paperMap(k, t, t0) {
  const e = eio(clamp((t0 && t > t0 ? (t - t0) : 0) / 0.7));
  const w0 = 240 + 400 * e, h0 = 180 + 260 * e, x0 = 960, y0 = 500;
  k.fillStyle = '#e9e2d0'; rr(k, x0 - w0 / 2, y0 - h0 / 2, w0, h0, 8); k.fill();
  k.strokeStyle = 'rgba(190,194,200,0.4)'; k.lineWidth = 4;
  for (let i = 1; i < 4; i++) { k.beginPath(); k.moveTo(x0 - w0 / 2 + w0 * i / 4, y0 - h0 / 2); k.lineTo(x0 - w0 / 2 + w0 * i / 4, y0 + h0 / 2); k.stroke(); }
  if (e > 0.85) {
    k.strokeStyle = PAL.red; k.lineWidth = 12; k.lineCap = 'round';
    k.beginPath(); k.moveTo(x0 - 20, y0 + 50); k.lineTo(x0 + 50, y0 - 20); k.moveTo(x0 + 50, y0 + 50); k.lineTo(x0 - 20, y0 - 20); k.stroke();
    k.strokeStyle = 'rgba(95,176,214,0.7)'; k.lineWidth = 8; k.setLineDash([16, 12]);
    k.beginPath(); k.moveTo(x0 - w0 / 2 + 30, y0 + 60); k.quadraticCurveTo(x0, y0 - 20, x0 - 30, y0 - 30); k.stroke();
    k.setLineDash([]);
  }
}

/** street table: cans for coins */
function streetBarter(k, t) {
  k.fillStyle = '#7b5a3e'; rr(k, 900, 620, 240, 50, 10); k.fill();
  cans(k, 950, 590, 1, 2);
  const e = eo(clamp((t - wd(28, 2).s) / 0.5));
  k.save(); k.translate(1105 + 8 * e, 590); k.rotate(-0.1);
  k.fillStyle = '#4c8a54'; rr(k, -60, -30, 120, 60, 6); k.fill();
  k.fillStyle = '#e9f4e4'; k.font = '800 22px Fredoka'; k.textAlign = 'center'; k.fillText('20', 0, 8);
  k.restore();
}

/** desktop radio that waves */
function radioBox(k, t) {
  k.fillStyle = '#33363f'; rr(k, 1080, 400, 300, 150, 16); k.fill();
  for (let i = 0; i < 3; i++) { k.fillStyle = i === 0 ? '#7fd17a' : '#4a5060'; circ(k, 1130 + i * 46, 450, i ? 8 : 13); k.fill(); }
  k.fillStyle = '#e6e2d8'; k.font = '800 26px Nunito'; k.textAlign = 'left'; k.fillText('WXR · 162.400', 1140, 520);
  k.strokeStyle = '#8a90a0'; k.lineWidth = 12; k.beginPath(); k.moveTo(1340, 400); k.lineTo(1380, 260); k.stroke();
}

/** notebook page; lines appear one by one, n total */
function notebook(k, t, n) {
  k.fillStyle = '#e9e2d0'; rr(k, 780, 360, 380, 460, 12); k.fill();
  k.strokeStyle = 'rgba(95,176,214,0.7)'; k.lineWidth = 4;
  k.beginPath(); k.moveTo(820, 430); k.lineTo(1110, 430); k.stroke();
  k.fillStyle = '#262a34';
  for (let i = 0; i < n; i++) {
    const e = eo(clamp((t - wd(23, 0).s - i * 0.28) / 0.3));
    if (!e) break;
    k.globalAlpha = 0.85 * e;
    k.font = '700 28px Nunito'; k.textAlign = 'left';
    k.fillText(['Liv · 4B', 'Maya', 'Water desk', 'Sam · roof', 'Rewa'][i] || '—', 820, 480 + i * 60);
    k.globalAlpha = 1;
  }
}

/** desk with a dead laptop (screen lit in early parts, dead when off=0) */
function deskSet(k, t, on) {
  k.fillStyle = '#7b5a3e'; rr(k, 700, 640, 560, 60, 12); k.fill();
  k.fillStyle = '#5c432e'; rr(k, 720, 700, 40, 160, 8); k.fill(); rr(k, 1200, 700, 40, 160, 8); k.fill();
  k.fillStyle = '#262a34'; rr(k, 880, 460, 320, 200, 14); k.fill();
  k.fillStyle = on ? '#9db3d8' : '#0d0f14'; rr(k, 894, 474, 292, 172, 8); k.fill();
}
