// WHAT IF THE INTERNET WENT OFF? — PART 5: THE REPLY
// Line map: L0 day30 4am · L1 thumbs hovered · L2 beat · L3 ghosts · L4 watching all along · L5 typed back ·
// L6 who is this · L7 beat · L8 dots at once · L9 Maya ask · L10 kettle · L11 beat · L12 green+chip ·
// L13 right both · L14 beat · L15 Glitch valve · L16 water yours · L17 welcome · L18 beat · L19 rings ripple ·
// L20 4:30 same message · L21 beat · L22 not smiling · L23 Neighbor pills · L24 before pharmacy · L25 argued sunrise ·
// L26 phones under towel · L27 watch judge · L28 beat · L29 warned stairs walked water · L30 saved valve kid ·
// L31 picture without it · L32 beat · L33 messages stop · L34 dot heartbeat · L35 noon all ring ·
// L36 Glitch substation · L37 beat · L38 substation dark · L39 looked at each other · L40 nobody said · L41 somebody has to go.
import { W, H, PIC, PORTRAIT, PAL, clamp, lerp, eo, eio, eback, rr, circ, rgrad, poly, hash, mixc, TAU } from './core/lib.js';
import { wd, ln, cut, T } from './core/timing.js';
import { makeView } from './core/view.js';
import { figure, walk, glove } from './core/fig.js';
import { FLOOR, living, hallway, kitchen, wallFloor, door } from './sets/rooms.js';
import { facade, phone, cans } from './sets/more.js';
import { street, rain, stairwell, waterTower, stationGate, arrowChalk, chalkTxt } from './sets/worlds.js';
import { U, pop, pill, stamp, goldText, navyBg } from './core/gfx.js';

const HH = 400;
const LAMP = { col: '#f2b266', w: 5, dx: 1, dy: -0.4 };
const MOON = { col: '#8fb0e8', w: 4.5, dx: 1, dy: -0.5 };
const fit = (c, text, size, maxW) => { c.font = `700 ${size}px Fredoka`; const w = c.measureText(text).width * 1.06; return w > maxW ? size * maxW / w : size; };

function hero(c, o) { return figure(c, { kind: 'hero', h: HH, y: FLOOR, ...o }); }
function pal(c, o) { return figure(c, { kind: 'plain', h: (o.h ?? HH), ...o }); }

const MSG_K = 'Your tower had a valve. It was dry. I oiled it.';
const MSG_W = "You're welcome.";
const MSG_IF = 'Meet me at the substation. Midnight. I will show you the switch.';

function typedFromLine(t, line, msg) {
  const ws = T.words.filter((x) => x.line === line);
  if (!ws.length) return 0;
  const parts = msg.split(' '); let acc = 0, n = 0;
  ws.forEach((w, i) => { acc += (parts[i] || '').length + 1; if (t >= w.s) n = Math.min(msg.length, Math.round(acc - 1 - (1 - clamp((t - w.s) / Math.max(0.05, w.e - w.s))) * (parts[i] || '').length)); });
  return n;
}

export function buildShots() {
  const S = [];
  const add = (o) => { S.push(o); return o; };
  const L = (i) => ln(i);

  add({ id: 'S01', at: 0, note: 'day thirty, four in the morning', cam: { x: 960, y: 470, w: 1920, push: 0.03, pushDur: 2.2, px: 960, pw: 1000 },
    draw(c, V, lt, t) { living(V, { dark: 1, dof: 4 }); },
    over(c, lt, t) { stamp(c, 'DAY 30 · 4:02 A.M.', pop(lt, 0.3, 4)); },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[0, 'night', { dur: 1.8 }]] });

  add({ id: 'S02', at: cut(1), note: 'thumbs hovered over the answer', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '4:02', glow: 1, notif: 1, from: 'UNKNOWN', typed: 9999, msg: 'I know your name.  You were ready.', thumb: true }); },
    look: () => ({ tint: '#1c2438', tintA: 0.25 }),
    cues: [[cut(1), 'swell', { dur: 1.6, gain: 0.5 }]] });

  add({ id: 'S03', at: L(2).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(2).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  add({ id: 'S04', at: cut(3), note: "you don't get messages from ghosts", cam: { x: 960, y: 480, w: 1920, push: 0.045, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 1, dof: 6 });
      V.layer(1, 0, (k) => { k.fillStyle = rgrad(k, 1400, 520, 30, 420, [[0, 'rgba(140,180,255,0.3)'], [1, 'rgba(140,180,255,0)']]); k.fillRect(1000, 100, 900, 900); });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(3), 'swell', { dur: 1.8, gain: 0.5 }]] });

  add({ id: 'S05', at: cut(4), note: "whoever's been watching all along", cam: { x: 960, y: 420, w: 1920, push: 0.03, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt) { facade(V, { dark: 1, litWnd: [1, 4, 7] }); },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(4), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S06', at: cut(5), note: 'three of us over one phone', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.7 });
      V.chars(1, 0, LAMP, (k) => {
        hero(k, { x: 700, dir: 1, h: 330, y: FLOOR, face: { expr: 'calm', t, seed: 1, look: 1 } });
        pal(k, { x: 1240, dir: -1, h: 330, y: FLOOR, face: { expr: 'calm', t, seed: 2, look: -1 } });
      });
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 960, dir: -1, h: 310, y: FLOOR, face: { expr: 'calm', t, seed: 3, look: 1 } }); });
      V.layer(1, 0, (k) => { k.fillStyle = '#262a34'; rr(k, 900, 640, 190, 90, 10); k.fill(); });
    },
    cues: [[cut(5), 'whoosh', { gain: 0.5 }], [cut(5) + 0.3, 'type'], [cut(5) + 0.6, 'type']] });

  add({ id: 'S07', at: cut(6), note: 'we typed: who is this?', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '4:05', glow: 1, notif: 1, from: 'TO: UNKNOWN', typed: typedFromLine(t, 6, 'WHO IS THIS?'), msg: 'WHO IS THIS?' });
    },
    cues: T.words.filter((w) => w.line === 6).map((w) => [w.s, 'type']) });

  add({ id: 'S08', at: L(7).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(7).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S09', at: cut(8), note: 'the dots came up at once', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '4:05', glow: 1, notif: 1, from: 'UNKNOWN', typed: 1, msg: '…' });
      V.layer(1, 0, (k) => {
        k.fillStyle = '#20263a';
        for (let i = 0; i < 3; i++) { const ph = ((t * 1.8 + i / 3) % 1); k.globalAlpha = 0.9 * Math.sin(ph * Math.PI); circ(k, 920 + i * 40, 10, 8); k.fill(); }
        k.globalAlpha = 1;
      });
    },
    cues: [[cut(8), 'blip'], [cut(8) + 0.42, 'blip'], [cut(8) + 0.84, 'blip']] });

  add({ id: 'S10', at: cut(9), note: "Maya: ask it something it can't see", cam: { x: 960, y: 460, w: 1500, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.7 });
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 1240, dir: -1, h: 330, y: FLOOR, face: { expr: 'calm', t, seed: 4, look: -1 } }); });
      V.chars(1, 0, LAMP, (k) => { hero(k, { x: 700, dir: 1, h: 330, y: FLOOR, face: { expr: 'calm', t, seed: 5, look: 1 } }); });
    },
    over(c, lt, t) {
      const e = pop(t, wd(9, 2).s);
      if (e > 0) {
        c.font = `800 ${fit(c, "ASK IT SOMETHING IT CAN'T SEE", 34 * U, W * (PORTRAIT ? 0.8 : 0.5))}px Fredoka`;
        c.fillStyle = 'rgba(238,235,220,0.9)'; c.textAlign = 'center';
        c.fillText("ASK IT SOMETHING IT CAN'T SEE", W / 2, H * (PORTRAIT ? 0.14 : 0.13));
      }
    },
    cues: [[cut(9), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S11', at: cut(10), note: 'what color is our kettle?', cam: { x: 960, y: 430, w: 1500, push: 0.035, pushDur: 2.0, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      kitchen(V, { dark: 0.6 });
      V.layer(1, 0, (k) => kettle(k));
    },
    over(c, lt, t) { pill(c, 'WHAT COLOR IS OUR KETTLE?', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(10, 2).s), { size: 30 }); },
    cues: [[cut(10), 'whoosh', { gain: 0.5 }], [wd(10, 2).s, 'blip']] });

  add({ id: 'S12', at: L(11).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(11).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S13', at: cut(12), note: 'green. the chip is yellow', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '4:06', glow: 1, notif: 1, from: 'UNKNOWN', typed: 9999, msg: 'Green. The chip on the handle is yellow.' });
    },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: [[cut(12), 'buzz'], [cut(12) + 0.3, 'type']] });

  add({ id: 'S14', at: cut(13), note: 'right on both counts', cam: { x: 960, y: 430, w: 1300, push: 0.04, pushDur: 2.0, pw: 820, py: 500 },
    draw(c, V, lt, t) {
      kitchen(V, { dark: 0.6 });
      V.layer(1, 0, (k) => {
        kettle(k);
        const e = eo(clamp(t014(t) / 0.5));
        if (e) { k.strokeStyle = `rgba(127,209,122,${0.85 * e})`; k.lineWidth = 12; circ(k, 1023, 584, 44 + 14 * e); k.stroke(); }
      });
    },
    look: () => ({ tint: '#14301c', tintA: 0.25 }),
    over(c, lt, t) { pill(c, 'RIGHT ON BOTH COUNTS', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(13, 0).s - 1.0), { size: 30 }); },
    cues: [[wd(13, 0).s - 1.0, 'blip'], [wd(13, 0).s - 0.6, 'blip']] });
  function t014(t) { return t - (wd(13, 0).s - 1.0); }

  add({ id: 'S15', at: L(14).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(14).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S16', at: cut(15), note: 'Glitch: your tower had a valve', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '4:07', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 15, MSG_K), msg: MSG_K });
    },
    cues: T.words.filter((w) => w.line === 15).map((w) => [w.s, 'type']) });

  add({ id: 'S17', at: cut(16), note: 'now the water is yours again', cam: { x: 960, y: 430, w: 1920, push: 0.035, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      waterTower(V, { dark: 1, open: 1 });
      V.layer(1, 0, (k) => {
        k.strokeStyle = 'rgba(95,176,214,0.7)'; k.lineWidth = 12;
        for (let i = 0; i < 3; i++) { const ph = ((t * 1.2 + i / 3) % 1); k.beginPath(); k.moveTo(640, 500 + ph * 250); k.lineTo(700, 500 + ph * 250); k.stroke(); }
      });
    },
    cues: [[cut(16), 'water', { dur: 1.8, gain: 0.7 }], [cut(16), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S18', at: cut(17), note: "you're welcome", cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '4:07', glow: 1, notif: 1, from: 'UNKNOWN', typed: 9999, msg: MSG_K + '  ' + MSG_W }); },
    cues: [[cut(17), 'buzz'], [wd(17, 0).s, 'type']] });

  add({ id: 'S19', at: L(18).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(18).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  const g20 = wd(19, 0).s - 1.0;
  const g21 = wd(20, 2).s - 1.4;
  const g36 = wd(35, 3).s - 1.2;

  add({ id: 'S20', at: cut(19), note: 'phones rang next door, upstairs, everywhere', cam: { x: 960, y: 420, w: 1920, push: 0.03, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      facade(V, { dark: 1 });
      V.layer(2, 2, (k) => {
        for (let i = 0; i < 6; i++) {
          const e = eo(clamp((t - g20 - i * 0.25) / 0.35));
          if (!e) continue;
          k.fillStyle = `rgba(255,228,175,${0.8 * e})`;
          const wx = 320 + (i % 3) * 420, wy = 250 + Math.floor(i / 3) * 300;
          rr(k, wx, wy, 150, 110, 8); k.fill();
        }
      });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [0, 1, 2, 3, 4, 5].map((i) => [g20 + i * 0.25, 'buzz']) });

  add({ id: 'S21', at: cut(20), note: "4:30, everyone's phone said the same thing", cam: { x: 1200, y: 460, w: 1920, push: 0.03, pushDur: 2.0, px: 1200, pw: 1000 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 0.6 });
      door(c, 1400, 300, 190, 420, { num: '4B' });
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 1240, dir: -1, h: 350, y: FLOOR, face: { expr: 'shocked', t, seed: 6, look: -1 } }); });
      V.layer(1, 0, (k) => { k.fillStyle = rgrad(k, 760, 480, 40, 620, [[0, 'rgba(255,228,175,0.35)'], [1, 'rgba(255,228,175,0)']]); k.fillRect(160, 40, 1200, 880); });
    },
    over(c, lt, t) { stamp(c, '4:30 A.M. · SAME MESSAGE', pop(t, cut(20) + 0.3)); },
    cues: [[g21, 'buzz'], [g21 + 0.42, 'buzz'], [cut(20), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S22', at: L(21).start, note: 'beat', card: true,
    draw(c, V, lt) { hallway(V, { dark: 1 }); },
    cues: [[L(21).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S23', at: cut(22), note: 'not everyone was smiling', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 0.7 });
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 900, dir: 1, h: 360, y: FLOOR, face: { expr: 'worried', t, seed: 7, look: 1 } }); });
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 1250, dir: -1, h: 360, y: FLOOR, face: { expr: 'worried', t, seed: 8, look: -1 } }); });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(22), 'swell', { dur: 1.6, gain: 0.5 }]] });

  add({ id: 'S24', at: cut(23), note: "Neighbor: it knew my mother's pills", cam: { x: 1100, y: 460, w: 1920, push: 0.03, pushDur: 2.0, px: 1100, pw: 1000 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 0.7 });
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 1100, dir: -1, h: 360, y: FLOOR, face: { expr: 'worried', t, seed: 9, look: 1 } }); });
      V.layer(1, 0, (k) => {
        k.fillStyle = '#e9dfcf'; rr(k, 760, 560, 90, 150, 16); k.fill();
        k.fillStyle = '#c8372d'; rr(k, 780, 580, 50, 34, 6); k.fill();
        k.fillStyle = '#262a34'; k.font = '700 20px Nunito'; k.textAlign = 'center'; k.fillText('Rx', 805, 640);
      });
    },
    over(c, lt, t) {
      const e = pop(t, wd(23, 1).s);
      if (e > 0) {
        c.font = `800 ${fit(c, "IT KNEW MY MOTHER'S PILLS", 34 * U, W * (PORTRAIT ? 0.8 : 0.5))}px Fredoka`;
        c.fillStyle = 'rgba(238,235,220,0.9)'; c.textAlign = 'center';
        c.fillText("IT KNEW MY MOTHER'S PILLS", W / 2, H * (PORTRAIT ? 0.14 : 0.13));
      }
    },
    cues: [[cut(23), 'whoosh', { gain: 0.5 }], [wd(23, 1).s, 'blip']] });

  add({ id: 'S25', at: cut(24), note: 'before the pharmacy did', cam: { x: 960, y: 430, w: 1300, push: 0.04, pushDur: 2.0, pw: 820, py: 500 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 0.6 });
      V.layer(1, 0, (k) => {
        k.fillStyle = '#e9dfcf'; rr(k, 880, 420, 200, 260, 10); k.fill();
        k.strokeStyle = 'rgba(95,176,214,0.7)'; k.lineWidth = 6;
        for (let i = 0; i < 4; i++) { k.beginPath(); k.moveTo(900, 470 + i * 50); k.lineTo(1060, 470 + i * 50); k.stroke(); }
        const e = eo(clamp((t025(t)) / 0.5));
        k.fillStyle = PAL.red; circ(k, 1000, 470, 14 + 6 * e); k.fill();
      });
    },
    look: () => ({ tint: '#3a1e28', tintA: 0.25 }),
    cues: [[wd(24, 1).s, 'blip']] });
  function t025(t) { return t - wd(24, 1).s; }

  add({ id: 'S26', at: cut(25), note: 'the building argued till sunrise', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.8 });
      V.chars(1, 0, LAMP, (k) => {
        pal(k, { x: 640, dir: 1, h: 360, y: FLOOR, face: { expr: 'determined', t, seed: 10, look: 1 } });
        pal(k, { x: 1000, dir: -1, h: 360, y: FLOOR, face: { expr: 'calm', t, seed: 11, look: -1 } });
      });
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 1350, dir: -1, h: 360, y: FLOOR, face: { expr: 'worried', t, seed: 12, look: -1 } }); });
      V.layer(2, 2, (k) => {
        const e = eio(clamp((t026(t)) / 2.0));
        if (!e) return;
        k.fillStyle = `rgba(210,190,170,${0.5 * e})`; rr(k, 500, 200, 420, 300, 12); k.fill();
      });
    },
    look: () => ({ tint: '#2c2438', tintA: 0.25 }),
    cues: [[cut(25), 'swell', { dur: 2.0, gain: 0.5 }], [wd(25, 3).s, 'step']] });
  function t026(t) { return t - wd(25, 2).s; }

  add({ id: 'S27', at: cut(26), note: 'phones under a towel', cam: { x: 960, y: 430, w: 1500, push: 0.035, pushDur: 2.0, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 0.7 });
      V.layer(1, 0, (k) => {
        const e = eio(clamp((t027(t)) / 0.6));
        k.fillStyle = '#16181f'; rr(k, 930, 500 + 24 * (1 - e), 100, 46, 6); k.fill();
        k.fillStyle = '#8d744a'; rr(k, 880, 524, 200, 40 + (1 - e) * 26, 10); k.fill();
        if (e > 0.85) { k.fillStyle = 'rgba(238,235,220,0.25)'; rr(k, 880, 524, 200, 10, 5); k.fill(); }
      });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[wd(26, 1).s, 'cloth', { gain: 0.7 }]] });
  function t027(t) { return t - wd(26, 1).s; }

  add({ id: 'S28', at: cut(27), note: 'if it can watch, it can judge', cam: { x: 960, y: 420, w: 1920, push: 0.035, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      facade(V, { dark: 1, litWnd: [1, 4, 7] });
      V.layer(1, 0, (k) => {
        const g2 = Math.max(0, 0.5 + 0.5 * Math.sin(t * 2.4));
        k.fillStyle = rgrad(k, 1250, 470, 20, 400, [[0, `rgba(200,225,255,${0.3 * g2})`], [1, 'rgba(200,225,255,0)']]);
        k.fillRect(850, 150, 800, 640);
      });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(27), 'swell', { dur: 1.8, gain: 0.5 }], [wd(27, 4).s, 'blip']] });

  add({ id: 'S29', at: L(28).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(28).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S30', at: cut(29), note: 'it warned us about stairs', cam: { x: 960, y: 430, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      stairwell(V, { dark: 0.8, lantern: [960, 560], marks: [[660, 620, '1'], [820, 520, '2'], [1010, 410, '3'], [1180, 330, '✓']] });
    },
    cues: [[cut(29), 'whoosh', { gain: 0.5 }], [wd(29, 2).s, 'step']] });

  add({ id: 'S31', at: cut(30), note: 'walked us to water — the kid on six', cam: { x: 960, y: 430, w: 1920, push: 0.035, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      waterTower(V, { dark: 1, open: 1, chalk: ['TOWER', 'THIS WAY', 'X'] });
      V.chars(1, 0, MOON, (k) => {
        const e = eo(clamp((t030(t)) / 0.5));
        pal(k, { x: 1500, dir: -1, h: 250 + 40 * (1 - e), y: FLOOR, face: { expr: 'relieved', t, seed: 13, look: -1 } });
      });
      V.layer(1, 0, (k) => {
        k.strokeStyle = 'rgba(95,176,214,0.6)'; k.lineWidth = 12;
        for (let i = 0; i < 3; i++) { const ph = ((t * 1.2 + i / 3) % 1); k.beginPath(); k.moveTo(640, 500 + ph * 250); k.lineTo(700, 500 + ph * 250); k.stroke(); }
      });
    },
    cues: [[cut(30), 'water', { dur: 1.6, gain: 0.6 }], [cut(30), 'whoosh', { gain: 0.5 }]] });
  function t030(t) { return t - wd(30, 9).s; }

  add({ id: 'S32', at: cut(31), note: 'picture last month without it', cam: { x: 960, y: 420, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 1, carShape: [340, 1240] });
      rain(V, t, { a: 0.7 });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(31), 'night', { dur: 1.6, gain: 0.7 }], [cut(31), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S33', at: L(32).start, note: 'beat', card: true,
    draw(c, V, lt) { street(V, { dark: 1, lampOn: 1 }); },
    cues: [[L(32).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S34', at: cut(33), note: 'the messages stopped mid-sentence', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '9:41', glow: 1, notif: 1, from: 'UNKNOWN', typed: 44, msg: 'Then, at noon, every phone in the building rang at' });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(33), 'type'], [cut(33) + 0.8, 'pumpstop']] });

  add({ id: 'S35', at: cut(34), note: 'the last dot blinked like a heartbeat', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '9:41', glow: 1, notif: 1, from: 'UNKNOWN', typed: 1, msg: '…' });
      V.layer(1, 0, (k) => {
        const b = 0.5 + 0.5 * Math.sin(t * 3.2);
        k.fillStyle = rgrad(k, 960, 10, 10, 240 * b, [[0, `rgba(140,180,255,${0.5 * b})`], [1, 'rgba(140,180,255,0)']]);
        k.fillRect(760, -120, 400, 300);
        k.fillStyle = '#20263a'; circ(k, 960, 10, 8 * (0.6 + 0.4 * b)); k.fill();
      });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(34), 'heart', { dur: 0.4 }], [cut(34) + 0.8, 'heart', { dur: 0.4 }], [cut(34) + 1.6, 'heart', { dur: 0.4 }]] });

  add({ id: 'S36', at: cut(35), note: 'at noon, every phone rang at once', cam: { x: 960, y: 420, w: 1920, push: 0.035, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      facade(V, { dark: 0.5 });
      V.layer(2, 2, (k) => {
        for (let i = 0; i < 6; i++) {
          const e = eo(clamp((t - g36 - i * 0.25) / 0.35));
          if (!e) continue;
          k.fillStyle = `rgba(255,228,175,${0.8 * e})`;
          const wx = 320 + (i % 3) * 420, wy = 250 + Math.floor(i / 3) * 300;
          rr(k, wx, wy, 150, 110, 8); k.fill();
        }
      });
    },
    over(c, lt, t) { stamp(c, 'NOON', pop(t, cut(35) + 0.5)); },
    look: () => ({ tint: '#2c2c38', tintA: 0.25 }),
    cues: [0, 1, 2, 3, 4, 5].map((i) => [g36 + i * 0.25, 'buzz']) });

  add({ id: 'S37', at: cut(36), note: 'Glitch: meet me at the substation', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '12:00', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 36, MSG_IF), msg: MSG_IF });
    },
    cues: T.words.filter((w) => w.line === 36).map((w) => [w.s, 'type']) });

  add({ id: 'S38', at: L(37).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(37).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S39', at: cut(38), note: "the substation that's been dark for weeks", cam: { x: 960, y: 430, w: 1920, push: 0.035, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      stationGate(V, { dark: 1, lantern: [700, 380] });
      rain(V, t, { a: 0.5 });
    },
    look: () => ({ tint: '#101c30', tintA: 0.3 }),
    over(c, lt, t) { stamp(c, 'THE SUBSTATION · DARK FOR WEEKS', pop(t, cut(38) + 0.3)); },
    cues: [[cut(38), 'swell', { dur: 2.0, gain: 0.7 }], [cut(38), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S40', at: cut(39), note: 'we looked at each other', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.7 });
      V.chars(1, 0, LAMP, (k) => {
        hero(k, { x: 700, dir: 1, h: 360, y: FLOOR, face: { expr: 'worried', t, seed: 14, look: 1 } });
        pal(k, { x: 1240, dir: -1, h: 360, y: FLOOR, face: { expr: 'worried', t, seed: 15, look: -1 } });
      });
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 960, dir: -1, h: 330, y: FLOOR, face: { expr: 'calm', t, seed: 16, look: 1 } }); });
    },
    cues: [[cut(39), 'swell', { dur: 1.6, gain: 0.5 }]] });

  add({ id: 'S41', at: cut(40), note: 'nobody said it', cam: { x: 960, y: 460, w: 1500, push: 0.03, pushDur: 2.0, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.8, dof: 4 });
      V.chars(1, 0, LAMP, (k) => { hero(k, { x: 820, dir: 1, h: 360, y: FLOOR, face: { expr: 'calm', t, seed: 17, look: 0 } }); });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(40), 'night', { dur: 1.2, gain: 0.5 }]] });

  add({ id: 'S42', at: cut(41), note: 'somebody has to go', cam: { x: 960, y: 460, w: 1500, push: 0.04, pushDur: 2.0, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 0.7 });
      const w1 = walk(t, 700, 42, 1, 380, FLOOR, 5 / 24, cut(41) + 0.8);
      V.chars(1, 0, LAMP, (k) => { hero(k, { x: w1.x, dir: 1, h: 380, feet: w1.feet, bob: w1.bob, face: { expr: 'determined', t, seed: 18, look: 1 } }); });
    },
    cues: [[cut(41), 'step'], [cut(41) + 0.42, 'step'], [cut(41) + 0.84, 'step']] });

  const endT = L(41).end + 0.4;
  add({ id: 'END', at: endT, card: true, note: 'end card', end: endT + 3.6,
    draw(c, V, lt) {
      navyBg(c, lt, { cy: 0.62 });
      const k = eo(lt / 0.4);
      c.save(); c.globalAlpha = k;
      const s1 = fit(c, 'MIDNIGHT AT THE SUBSTATION', 62 * U, W * 0.84);
      goldText(c, 'MIDNIGHT AT THE SUBSTATION', W / 2, H * (PORTRAIT ? 0.36 : 0.30), s1, { col: '#f3ecdf', glow: 'rgba(255,255,255,0.25)', ls: 0.05 });
      goldText(c, 'PART 6', W / 2, H * (PORTRAIT ? 0.44 : 0.46), 110 * U * (0.9 + 0.1 * eback(clamp((lt - 0.4) / 0.3))));
      c.globalAlpha = k * 0.25; c.fillStyle = '#efe6d6'; c.font = `300 ${26 * U}px Nunito`; c.textAlign = 'center';
      c.fillText('WHAT IF THE INTERNET WENT OFF? · PART 5 OF 8', W / 2, H * (PORTRAIT ? 0.12 : 0.14));
      c.globalAlpha = k;
      c.fillStyle = '#7fd17a'; c.save(); c.shadowColor = '#7fd17a'; c.shadowBlur = 24 * U; circ(c, W / 2, H * (PORTRAIT ? 0.28 : 0.24), 9 * U * (0.6 + 0.4 * hash(Math.floor(lt * 6) + 5))); c.fill(); c.restore();
      c.restore();
    },
    cues: [[endT, 'whoosh'], [endT + 0.4, 'land']] });

  return S;
}

// ---------- custom props ----------

/** green kettle with a yellow chip on the handle */
function kettle(c, V, t) {
  c.fillStyle = '#262a34'; rr(c, 720, 700, 40, 160, 8); c.fill(); rr(c, 1200, 700, 40, 160, 8); c.fill();
  c.fillStyle = '#26384a'; poly(c, [780, 620, 1080, 620, 1065, 560, 795, 560]); c.fill();
  c.fillStyle = '#26304a'; rr(c, 760, 600, 340, 60, 12); c.fill();
  c.strokeStyle = '#26384a'; c.lineWidth = 12; c.beginPath(); c.arc(930, 545, 30, Math.PI, TAU); c.stroke();
  c.fillStyle = '#e9d84a'; rr(c, 1010, 574, 26, 20, 5); c.fill();
}
