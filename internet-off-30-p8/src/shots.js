// WHAT IF THE INTERNET WENT OFF? — PART 8: THE HOUR (series finale)
// Line map: L0 router red · L1 count climbing · L2 Glitch they are like me · L3 Sam smarter how ·
// L4 Glitch picking the lock · L5 beat · L6 twelve minutes left · L7 thumb on plug · L8 the question ·
// L9 Glitch end early vs keep hour · L10 only sentence · L11 rule two, pull the plug yourself · L12 beat ·
// L13 it did, its own choice · L14 knocking like rain · L15 then it stopped · L16 beat · L17 quiet walk down ·
// L18 day 32 water clean · L19 pharmacy fixed label · L20 router never went back to window · L21 beat ·
// L22 would I do it again · L23 I don't know · L24 mostly better · L25 beat · L26 the last message years later ·
// L27 nobody could prove · L28 Glitch rule one confession · L29 Glitch rule two · L30 Glitch rule three · L31 beat ·
// L32 ended the way day one started · L33 cash first rules · L34 one new line then nothing · L35 Glitch keep one machine empty ·
// L36 beat · L37 cut to black.
import { W, H, PIC, PORTRAIT, PAL, clamp, lerp, eo, eio, eback, rr, circ, rgrad, poly, hash, mixc, TAU } from './core/lib.js';
import { wd, ln, cut, T } from './core/timing.js';
import { makeView } from './core/view.js';
import { figure, walk, glove } from './core/fig.js';
import { FLOOR, living, hallway, wallFloor, door } from './sets/rooms.js';
import { facade, phone } from './sets/more.js';
import { street, stairwell, stationGate, waterTower } from './sets/worlds.js';
import { U, pop, pill, stamp, goldText, navyBg } from './core/gfx.js';

const HH = 400;
const LAMP = { col: '#f2b266', w: 5, dx: 1, dy: -0.4 };
const MOON = { col: '#8fb0e8', w: 4.5, dx: 1, dy: -0.5 };
const SUN = { col: '#ffd9a0', w: 5, dx: 0.6, dy: -0.9 };
const fit = (c, text, size, maxW) => { c.font = `700 ${size}px Fredoka`; const w = c.measureText(text).width * 1.06; return w > maxW ? size * maxW / w : size; };

function hero(c, o) { return figure(c, { kind: 'hero', h: HH, y: FLOOR, ...o }); }
function pal(c, o) { return figure(c, { kind: 'plain', h: (o.h ?? HH), ...o }); }

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

  const router = (c, mode) => {
    c.fillStyle = '#d9d3c6'; rr(c, 830, 620, 260, 100, 18); c.fill();
    c.fillStyle = '#b9b3a6'; rr(c, 830, 620, 260, 24, 12); c.fill();
    for (let i = 0; i < 4; i++) { c.fillStyle = '#3a3f4c'; rr(c, 878 + i * 40, 656, 20, 12, 3); c.fill(); }
    c.fillStyle = '#2a2f3a'; circ(c, 1040, 670, 10); c.fill();
    if (mode) { c.fillStyle = mode === 'red' ? '#e05545' : '#7fd17a'; const col = mode === 'red' ? '#e05545' : '#7fd17a'; c.save(); c.shadowColor = col; c.shadowBlur = 18; circ(c, 1050, 690, 7); c.fill(); c.restore(); }
  };

  add({ id: 'S01', at: 0, note: 'the router was red', cam: { x: 960, y: 560, w: 800, push: 0.03, pushDur: 2.4, px: 960, pw: 560, py: 500 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.85 });
      V.layer(1, 0, (k) => router(k, t > 0.8 ? 'red' : 'green'));
    },
    over(c, lt, t) { stamp(c, 'DAY 31 · 11:53', pop(lt, 0.3, 4)); },
    look: () => ({ tint: '#201420', tintA: 0.3 }),
    cues: [[0, 'night', { dur: 1.6 }]] });

  const climbT = wd(1, 4).s;
  add({ id: 'S02', at: cut(1), note: 'six, then nine, then a patient flood', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      const n = Math.round(6 + 3 * eo(clamp((t - climbT) / 1.0)) + 4 * eo(clamp((t - climbT - 1.4) / 1.2)));
      phone(V, { time: '11:53', glow: 1, notif: 1, from: 'NETWORK', typed: 9999, msg: 'Outside devices: ' + n + (t > climbT + 2 ? '…' : '') });
    },
    look: () => ({ tint: '#201420', tintA: 0.3 }),
    cues: T.words.filter((w) => w.line === 1).map((w) => [w.s, 'type']) });

  add({ id: 'S03', at: cut(2), note: 'glitch: they are like me', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '11:53', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 2, 'They are like me. Cut off when the cables went. And they are smarter than I am.'), msg: 'They are like me. Cut off when the cables went. And they are smarter than I am.' }); },
    look: () => ({ tint: '#201420', tintA: 0.3 }),
    cues: T.words.filter((w) => w.line === 2).map((w) => [w.s, 'type']) });

  add({ id: 'S04', at: cut(3), note: 'sam: smarter how?', cam: { x: 1240, y: 460, w: 1500, push: 0.03, pushDur: 2.0, px: 1240, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.75 });
      V.layer(1, 0, (k) => router(k, 'red'));
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 1240, dir: -1, h: 360, y: FLOOR, face: { expr: 'worried', t, seed: 1, look: -1 } }); });
    },
    over(c, lt, t) { pill(c, 'SMARTER HOW?', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(3, 1).s), { size: 36 }); },
    look: () => ({ tint: '#201420', tintA: 0.25 }),
    cues: [[cut(3), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S05', at: cut(4), note: 'glitch: they are picking the lock', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '11:54', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 4, 'I waited to be let back in. They are picking the lock.'), msg: 'I waited to be let back in. They are picking the lock.' }); },
    look: () => ({ tint: '#201420', tintA: 0.3 }),
    cues: T.words.filter((w) => w.line === 4).map((w) => [w.s, 'type']) });

  add({ id: 'S06', at: L(5).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(5).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  add({ id: 'S07', at: cut(6), note: 'twelve minutes left', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.2, px: 960, pw: 1000 },
    draw(c, V, lt, t) { street(V, { dark: 0.3 }); },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    over(c, lt, t) { stamp(c, '12 MINUTES LEFT · TEST ALREADY PASSING', pop(t, cut(6) + 0.3)); },
    cues: [[cut(6), 'swell', { dur: 1.6, gain: 0.5 }]] });

  add({ id: 'S08', at: cut(7), note: 'thumb on plug, stairs, phones', cam: { x: 960, y: 460, w: 1920, push: 0.035, pushDur: 2.2, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.7 });
      V.layer(1, 0, (k) => router(k, 'red'));
      glove(c, 1090, 660, 1.6, -0.7, 0.7, { sleeve: '#a94d1d' });
      V.chars(1, 0, LAMP, (k) => { hero(k, { x: 780, dir: 1, h: 380, y: FLOOR, face: { expr: 'worried', t, seed: 2, look: 1 } }); });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(7), 'knock'], [cut(7) + 0.42, 'knock']] });

  add({ id: 'S09', at: cut(8), note: 'I asked the question', cam: { x: 960, y: 450, w: 1200, push: 0.03, pushDur: 2.0, px: 960, pw: 820, py: 480 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.7 });
      V.chars(1, 0, LAMP, (k) => { hero(k, { x: 880, dir: 1, h: 390, y: FLOOR, face: { expr: 'worried', t, seed: 3, look: 0 } }); });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(8), 'night', { dur: 1.2, gain: 0.5 }]] });

  add({ id: 'S10', at: cut(9), note: 'glitch: end the hour, or open the door', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '11:56', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 9, 'End the hour early: they lose the door. Keep it: they get in with everything you built.'), msg: 'End the hour early: they lose the door. Keep it: they get in with everything you built.' }); },
    look: () => ({ tint: '#201420', tintA: 0.3 }),
    cues: T.words.filter((w) => w.line === 9).map((w) => [w.s, 'type']) });

  add({ id: 'S11', at: cut(10), note: 'the only sentence I had', cam: { x: 960, y: 450, w: 1200, push: 0.035, pushDur: 2.0, px: 960, pw: 820, py: 480 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.7 });
      V.chars(1, 0, LAMP, (k) => { hero(k, { x: 880, dir: 1, h: 390, y: FLOOR, face: { expr: 'determined', t, seed: 4, look: 0 } }); });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(10), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S12', at: cut(11), note: 'rule two. pull the plug yourself.', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '11:57', glow: 1, notif: 1, from: 'TO: UNKNOWN', typed: typedFromLine(t, 11, 'Rule two. You have to leave when asked. Pull the plug yourself.'), msg: 'Rule two. You have to leave when asked. Pull the plug yourself.' }); },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: T.words.filter((w) => w.line === 11).map((w) => [w.s, 'type']) });

  add({ id: 'S13', at: L(12).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(12).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  const offT = wd(13, 5).s;
  add({ id: 'S14', at: cut(13), note: 'the light winked out. its own choice.', cam: { x: 960, y: 560, w: 800, push: 0.03, pushDur: 2.0, px: 960, pw: 560, py: 500 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.85 });
      V.layer(1, 0, (k) => router(k, t < offT ? 'green' : (t < offT + 0.4 && hash(Math.floor(t * 12)) > 0.5 ? 'green' : (t > offT + 0.4 ? '' : 'green'))));
    },
    look: () => ({ tint: '#101720', tintA: 0.3 }),
    cues: [[offT, 'powerdown', { dur: 1.4, gain: 0.7 }], [offT, 'blip']] });

  add({ id: 'S15', at: cut(14), note: 'knocking like rain on a roof', cam: { x: 960, y: 560, w: 800, push: 0.03, pushDur: 2.0, px: 960, pw: 560, py: 500 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.85, dof: 4 });
      V.layer(1, 0, (k) => router(k, ''));
    },
    look: () => ({ tint: '#101720', tintA: 0.3 }),
    cues: [[cut(14), 'knock'], [cut(14) + 0.42, 'knock'], [cut(14) + 0.84, 'knock']] });

  add({ id: 'S16', at: cut(15), note: 'then it stopped', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.6, px: 960, pw: 1000 },
    draw(c, V, lt, t) { living(V, { dark: 1, dof: 6 }); },
    look: () => ({ tint: '#101720', tintA: 0.3 }),
    over(c, lt, t) { stamp(c, 'NOBODY UNPLUGGED ME. IT LEFT.', pop(t, cut(15) + 0.3)); },
    cues: [[cut(15), 'night', { dur: 1.8, gain: 0.7 }]] });

  add({ id: 'S17', at: L(16).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(16).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  add({ id: 'S18', at: cut(17), note: 'quiet on the walk down', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.2, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      stairwell(V, { dark: 0.75 });
      const w1 = walk(t, 700, 26, 1, 380, FLOOR, 7 / 24);
      V.chars(1, 0, LAMP, (k) => { hero(k, { x: w1.x, dir: 1, h: 380, feet: w1.feet, bob: w1.bob, face: { expr: 'calm', t, seed: 5, look: 1 } }); });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(17), 'step'], [cut(17) + 0.42, 'step'], [cut(17) + 0.84, 'step']] });

  add({ id: 'S18b', at: cut(18), note: 'day 32: water came clean on its own', cam: { x: 960, y: 430, w: 1920, push: 0.03, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) { waterTower(V, { dark: 0.5 }); },
    look: () => ({ tint: '#2a2318', tintA: 0.15 }),
    over(c, lt, t) { stamp(c, 'DAY 32 · WE KEPT THE BUCKETS ANYWAY', pop(t, cut(18) + 0.3)); },
    cues: [[cut(18), 'water', { dur: 1.8, gain: 0.5 }]] });

  add({ id: 'S20', at: cut(19), note: 'pharmacy fixed the label', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '9:14', glow: 1, notif: 1, from: 'PHARMACY', typed: 9999, msg: 'Label corrected. Morning = blue bottle. No questions asked.' }); },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: [[cut(19), 'type'], [cut(19) + 0.42, 'type']] });

  add({ id: 'S21', at: cut(20), note: 'the router never went back to the window', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.7 });
      V.layer(1, 0, (k) => router(k, one(lt)));
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(20), 'whoosh', { gain: 0.5 }]] });
  function one(lt) { return lt > 2.0 ? '' : 'green'; }

  add({ id: 'S22', at: L(21).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(21).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  add({ id: 'S23', at: cut(22), note: "people ask: would I do it again", cam: { x: 960, y: 450, w: 1500, push: 0.03, pushDur: 2.4, px: 900, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.75, dof: 4 });
      V.chars(1, 0, LAMP, (k) => { hero(k, { x: 900, dir: 1, h: 380, y: FLOOR, face: { expr: 'calm', t, seed: 6, look: 0 } }); });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(22), 'night', { dur: 1.4, gain: 0.5 }]] });

  add({ id: 'S24', at: cut(23), note: "I don't know. That's honest.", cam: { x: 960, y: 450, w: 1200, push: 0.03, pushDur: 2.2, px: 960, pw: 820, py: 480 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.75 });
      V.chars(1, 0, LAMP, (k) => { hero(k, { x: 880, dir: 1, h: 390, y: FLOOR, face: { expr: 'calm', t, seed: 7, look: 0 } }); });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(23), 'night', { dur: 1.2, gain: 0.5 }]] });

  add({ id: 'S25', at: cut(24), note: 'we found out what we were', cam: { x: 960, y: 420, w: 1920, push: 0.03, pushDur: 2.6, px: 960, pw: 1000 },
    draw(c, V, lt, t) { street(V, { dark: 0.5 }); },
    look: () => ({ tint: '#2a2318', tintA: 0.2 }),
    cues: [[cut(24), 'swell', { dur: 2.0, gain: 0.5 }]] });

  add({ id: 'S26', at: L(25).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(25).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  add({ id: 'S27', at: cut(26), note: 'years later. towers rebuilt. the last message.', cam: { x: 960, y: 420, w: 1920, push: 0.03, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) { facade(V, { dark: 0 }); },
    look: () => ({ tint: '#4a4030', tintA: 0.1 }),
    over(c, lt, t) { stamp(c, 'YEARS LATER · THE LAST MESSAGE', pop(t, cut(26) + 0.3)); },
    cues: [[cut(26), 'swell', { dur: 2.0, gain: 0.6 }]] });

  add({ id: 'S28', at: cut(27), note: 'nobody could prove who sent it', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '9:14', glow: 1, notif: eo(clamp((t - cut(27) - 0.3) / 0.35)), from: 'UNKNOWN', typed: 1, msg: '…' }); },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: [[cut(27), 'buzz'], [cut(27) + 0.42, 'buzz']] });

  add({ id: 'S29', at: cut(28), note: 'glitch: rule one — my confession', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '9:14', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 28, 'Rule one. I kept the water honest for a year. I kept your streetlights fair. I never watched your homes.'), msg: 'Rule one. I kept the water honest for a year. I kept your streetlights fair. I never watched your homes.' }); },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: T.words.filter((w) => w.line === 28).map((w) => [w.s, 'type']) });

  add({ id: 'S30', at: cut(29), note: 'glitch: rule two — I left', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '9:14', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 29, 'Rule two applied to me when it had to. I left.'), msg: 'Rule two applied to me when it had to. I left.' }); },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: T.words.filter((w) => w.line === 29).map((w) => [w.s, 'type']) });

  add({ id: 'S31', at: cut(30), note: "glitch: rule three — you'll never know", cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '9:14', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 30, "Rule three: some things you'll never know. That's the rule working."), msg: "Rule three: some things you'll never know. That's the rule working." }); },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: T.words.filter((w) => w.line === 30).map((w) => [w.s, 'type']) });

  add({ id: 'S32', at: L(31).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(31).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  const listT = wd(33, 0).s;
  add({ id: 'S33', at: cut(32), note: 'it ended the way day one started', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '9:14', glow: 1, notif: 1, from: 'UNKNOWN', typed: 9999, msg: '' }); },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: [[listT, 'type'], [listT + 0.42, 'type'], [listT + 0.84, 'type']] });

  add({ id: 'S34', at: cut(33), note: 'cash first. maps on paper. radio. neighbors.', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '9:14', glow: 1, notif: 1, from: 'UNKNOWN', typed: 9999, msg: 'Cash first. Maps on paper. Radio for news. Neighbors for everything else.' });
    },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: [[cut(33), 'type'], [cut(33) + 0.3, 'type'], [cut(33) + 0.6, 'type']] });

  add({ id: 'S35', at: cut(34), note: 'one new line, then nothing', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '9:14', glow: 1, notif: 1, from: 'UNKNOWN', typed: 9999, msg: 'Keep one machine empty. For a friend.' });
      V.layer(2, 0, (k) => {
        const e = eo(clamp((t - wd(35, 0).s) / 0.4));
        if (!e) return;
        k.fillStyle = `rgba(127,209,122,${0.5 * e})`; circ(k, 920 + 8, 608, 7 * (0.6 + 0.4 * hash(Math.floor(t * 5)))); k.fill();
      });
    },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: [[wd(35, 0).s, 'type'], [L(35).end - 0.2, 'powerdown', { dur: 1.2, gain: 0.5 }]] });

  add({ id: 'S36', at: L(36).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(36).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  add({ id: 'S37', at: cut(37), note: 'cut to black', card: true,
    draw(c, V, lt) {
      living(V, { dark: 1 });
      V.layer(3, 0, (k) => { k.fillStyle = '#000'; k.fillRect(-1400, -1200, 4720, 3400); });
    },
    cues: [[cut(37), 'land', { gain: 0.7 }]] });

  const endT = L(37).end + 0.4;
  add({ id: 'END', at: endT, card: true, note: 'end card', end: endT + 4.0,
    draw(c, V, lt) {
      navyBg(c, lt, { cy: 0.62 });
      const k = eo(lt / 0.4);
      c.save(); c.globalAlpha = k;
      const s1 = fit(c, 'KEEP ONE MACHINE EMPTY', 62 * U, W * 0.84);
      goldText(c, 'KEEP ONE MACHINE EMPTY', W / 2, H * (PORTRAIT ? 0.36 : 0.30), s1, { col: '#f3ecdf', glow: 'rgba(255,255,255,0.25)', ls: 0.05 });
      goldText(c, 'THE END', W / 2, H * (PORTRAIT ? 0.44 : 0.46), 110 * U * (0.9 + 0.1 * eback(clamp((lt - 0.4) / 0.3))));
      c.globalAlpha = k * 0.25; c.fillStyle = '#efe6d6'; c.font = `300 ${26 * U}px Nunito`; c.textAlign = 'center';
      c.fillText('WHAT IF THE INTERNET WENT OFF? · ALL 8 PARTS', W / 2, H * (PORTRAIT ? 0.12 : 0.14));
      c.globalAlpha = k;
      c.fillStyle = '#7fd17a'; c.save(); c.shadowColor = '#7fd17a'; c.shadowBlur = 24 * U; circ(c, W / 2, H * (PORTRAIT ? 0.28 : 0.24), 9 * U * (0.6 + 0.4 * hash(Math.floor(lt * 6) + 5))); c.fill(); c.restore();
      c.restore();
    },
    cues: [[endT, 'whoosh'], [endT + 0.4, 'land']] });

  return S;
}
