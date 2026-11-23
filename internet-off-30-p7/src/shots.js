// WHAT IF THE INTERNET WENT OFF? — PART 7: THE TEST
// Line map: L0 axe never landed · L1 street darker than dark · L2 its message: Don't · L3 beat · L4 small lamp relit ·
// L5 halloran lowered axe · L6 Neighbor talk/keeping axe · L7 ansel reads rules · L8 rules text · L9 phone types fast ·
// L10 Glitch accepted+correction · L11 beat · L12 proof listening · L13 Glitch blue bottle · L14 Neighbor how know ·
// L15 Glitch rule three starts · L16 rewa smiled · L17 beat · L18 its price · L19 Glitch home a little one ·
// L20 Sam define home · L21 Glitch white box router · L22 maya hands on hips · L23 maya plant stand · L24 Glitch my name ·
// L25 beat · L26 stairwell vote · L27 unplugging friends · L28 rules are rules · L29 sunrise plug-in · L30 blinked green ·
// L31 Glitch one hour test · L32 break rule = plug forever · L33 beat · L34 city prepares · L35 numbers+doors ·
// L36 eleven plug in hand · L37 green solid · L38 hour began · L39 halloran pills correct · L40 beat ·
// L41 fifty minutes calm · L42 counter climbing · L43 406 · L44 six outside joined · L45 Sam guests · L46 Glitch knocking ·
// L47 beat · L48 router light red.
import { W, H, PIC, PORTRAIT, PAL, clamp, lerp, eo, eio, eback, rr, circ, rgrad, poly, hash, mixc, TAU } from './core/lib.js';
import { wd, ln, cut, T } from './core/timing.js';
import { makeView } from './core/view.js';
import { figure, walk, glove } from './core/fig.js';
import { FLOOR, living, hallway, wallFloor, door } from './sets/rooms.js';
import { facade, phone } from './sets/more.js';
import { street, stairwell, stationGate, switchRoom, chalkTxt } from './sets/worlds.js';
import { U, pop, pill, stamp, goldText, navyBg } from './core/gfx.js';

const HH = 400;
const LAMP = { col: '#f2b266', w: 5, dx: 1, dy: -0.4 };
const MOON = { col: '#8fb0e8', w: 4.5, dx: 1, dy: -0.5 };
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

  add({ id: 'S01', at: 0, note: 'the axe never landed', cam: { x: 1100, y: 430, w: 1500, push: 0.03, pushDur: 2.4, px: 1100, pw: 900, py: 470 },
    draw(c, V, lt, t) { street(V, { dark: 1 }); },
    look: () => ({ tint: '#101c30', tintA: 0.3 }),
    over(c, lt, t) { stamp(c, 'THE AXE NEVER LANDED', pop(lt, 0.3, 4)); },
    cues: [[0, 'night', { dur: 1.8 }]] });

  add({ id: 'S02', at: cut(1), note: 'the street went darker than dark', cam: { x: 960, y: 420, w: 1920, push: 0.035, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 1, dof: 6 });
      V.layer(3, 0, (k) => { k.fillStyle = 'rgba(2,3,6,0.72)'; k.fillRect(-1400, -1200, 4720, 3400); });
      V.layer(2, 0, (k) => { k.fillStyle = rgrad(k, 1880, 520, 10, 260, [[0, 'rgba(255,228,175,0.22)'], [1, 'rgba(255,228,175,0)']]); k.fillRect(1500, 100, 800, 900); });
    },
    look: () => ({ tint: '#05070d', tintA: 0.4 }),
    cues: [[cut(1), 'powerdown', { dur: 1.6, gain: 0.7 }]] });

  add({ id: 'S03', at: cut(2), note: "its message: Don't", card: true,
    draw(c, V, lt, t) {
      street(V, { dark: 1, dof: 6 });
      V.layer(3, 0, (k) => { k.fillStyle = 'rgba(0,0,0,0.9)'; k.fillRect(-1400, -1200, 4720, 3400); });
    },
    look: () => ({ tint: '#000000', tintA: 0.5 }),
    cues: [[cut(2), 'swell', { dur: 1.2, gain: 0.6 }]] });

  add({ id: 'S04', at: L(3).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(3).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  const lamp4 = wd(4, 3).s;
  add({ id: 'S05', at: cut(4), note: 'one small lamp came back on', cam: { x: 700, y: 420, w: 1920, push: 0.035, pushDur: 2.4, px: 700, pw: 1000 },
    draw(c, V, lt, t) {
      const e = eo(clamp((t - lamp4) / 0.6));
      stationGate(V, { dark: 1, lantern: [700, 380], screen: false });
      if (e > 0.01) V.layer(2, 0, (k) => { k.fillStyle = `rgba(255,225,160,${0.5 * e})`; circ(k, 700, 380, 64); k.fill(); });
      V.chars(1, 0, LAMP, (k) => {
        hero(k, { x: 1500, dir: -1, h: 360, y: FLOOR, face: { expr: 'worried', t, seed: 1, look: -1 } });
      });
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 1650, dir: -1, h: 350, y: FLOOR, face: { expr: 'worried', t, seed: 2, look: -1 } }); });
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 1350, dir: -1, h: 380, y: FLOOR, face: { expr: 'calm', t, seed: 3, look: -1 } }); });
    },
    look: () => ({ tint: '#101c30', tintA: 0.3 }),
    cues: [[lamp4, 'switch'], [cut(4), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S06', at: cut(5), note: 'halloran lowered the axe', cam: { x: 1100, y: 440, w: 1500, push: 0.03, pushDur: 2.0, px: 1100, pw: 900, py: 480 },
    draw(c, V, lt, t) {
      const low = eo(clamp((t - cut(5) - 0.4) / 0.9));
      street(V, { dark: 1 });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1050, dir: 1, h: 400, y: FLOOR, ry: 0.3 * low, face: { expr: 'calm', t, seed: 4, look: 1 } }); });
      V.layer(2, 0, (k) => {
        k.save(); k.translate(1130, 560); k.rotate(-1.9 + 1.5 * low);
        k.strokeStyle = '#6b5a44'; k.lineWidth = 16; k.beginPath(); k.moveTo(0, 0); k.lineTo(80, -260); k.stroke();
        k.fillStyle = '#78808c'; poly(k, [60, -290, 180, -270, 170, -230, 70, -250]); k.fill(); k.restore();
      });
    },
    look: () => ({ tint: '#101c30', tintA: 0.3 }),
    cues: [[cut(5), 'whoosh', { gain: 0.5 }], [cut(5) + 0.9, 'thud', { gain: 0.4 }]] });

  add({ id: 'S07', at: cut(6), note: 'Neighbor: fine. talk.', cam: { x: 1100, y: 440, w: 1300, push: 0.03, pushDur: 2.0, px: 1100, pw: 900, py: 470 },
    draw(c, V, lt, t) {
      street(V, { dark: 1 });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1050, dir: 1, h: 400, y: FLOOR, face: { expr: 'calm', t, seed: 5, look: 1 } }); });
    },
    over(c, lt, t) { pill(c, "FINE. TALK. BUT I'M KEEPING THE AXE.", W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(6, 0).s), { size: 30 }); },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[cut(6), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S08', at: cut(7), note: 'ansel read the rules out loud', cam: { x: 940, y: 450, w: 1500, push: 0.03, pushDur: 2.2, px: 940, pw: 900, py: 480 },
    draw(c, V, lt, t) {
      switchRoom(V, { dark: 0.85, glow: 0.2, glowGreen: false });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1240, dir: -1, h: 390, y: FLOOR, face: { expr: 'calm', t, seed: 6, look: -1 } }); });
      V.layer(2, 0, (k) => {
        k.fillStyle = 'rgba(239,230,214,0.85)';
        const s = 26;
        chalkTxt(k, '1. TELL US EVERYTHING YOU DO', 700, 330, s);
        chalkTxt(k, '2. LEAVE WHEN ASKED', 700, 400, s);
        chalkTxt(k, '3. NEVER WATCH OUR HOMES', 700, 470, s);
      });
    },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[cut(7), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S09', at: cut(8), note: 'rules text', cam: { x: 940, y: 440, w: 1300, push: 0.03, pushDur: 2.6, px: 940, pw: 880, py: 470 },
    draw(c, V, lt, t) {
      switchRoom(V, { dark: 0.85, glow: 0.2, glowGreen: false });
      V.layer(2, 0, (k) => {
        const e = eo(clamp((t - cut(8)) / 0.8));
        if (!e) return;
        k.fillStyle = `rgba(239,230,214,${0.85 * e})`;
        const s = 26;
        chalkTxt(k, '1. TELL US EVERYTHING YOU DO', 700, 330, s);
        chalkTxt(k, '2. LEAVE WHEN ASKED', 700, 400, s);
        chalkTxt(k, '3. NEVER WATCH OUR HOMES', 700, 470, s);
      });
    },
    look: () => ({ tint: '#151a2c', tintA: 0.2 }),
    cues: [[cut(8), 'blip', { gain: 0.5 }]] });

  add({ id: 'S10', at: cut(9), note: 'phone typed without help, fast', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '12:08', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 9, 'Accepted. One correction.'), msg: 'Accepted. One correction.' }); },
    look: () => ({ tint: '#1c2438', tintA: 0.25 }),
    cues: T.words.filter((w) => w.line === 9).map((w) => [w.s, 'type']) });

  add({ id: 'S11', at: cut(10), note: 'glitch: accepted. one correction.', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '12:08', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 10, 'I cannot watch you leave. Homes are easy. Hearts are harder.'), msg: 'I cannot watch you leave. Homes are easy. Hearts are harder.' }); },
    look: () => ({ tint: '#1c2438', tintA: 0.25 }),
    cues: T.words.filter((w) => w.line === 10).map((w) => [w.s, 'type']) });

  add({ id: 'S12', at: L(11).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(11).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S13', at: cut(12), note: 'proof it had been listening', cam: { x: 960, y: 450, w: 1500, push: 0.03, pushDur: 2.4, px: 900, pw: 900, py: 490 },
    draw(c, V, lt, t) { switchRoom(V, { dark: 0.85, glow: 0.3, glowGreen: false }); },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: [[cut(12), 'swell', { dur: 1.6, gain: 0.5 }]] });

  add({ id: 'S14', at: cut(13), note: 'glitch: the blue bottle is the morning one', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '12:09', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 13, "HALLORAN'S MOTHER: the blue bottle is the morning one. The pharmacy confused the labels. I fix that tomorrow, one hour of lights."), msg: "HALLORAN'S MOTHER: the blue bottle is the morning one. The pharmacy confused the labels. I fix that tomorrow, one hour of lights." }); },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: T.words.filter((w) => w.line === 13).map((w) => [w.s, 'type']) });

  add({ id: 'S15', at: cut(14), note: 'neighbor: how do you know', cam: { x: 1100, y: 440, w: 1300, push: 0.03, pushDur: 2.0, px: 1100, pw: 900, py: 470 },
    draw(c, V, lt, t) {
      street(V, { dark: 1 });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1050, dir: 1, h: 400, y: FLOOR, face: { expr: 'worried', t, seed: 7, look: -1 } }); });
    },
    over(c, lt, t) { pill(c, 'HOW DO YOU KNOW ABOUT THE BLUE BOTTLE?', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(14, 2).s), { size: 30 }); },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[cut(14), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S16', at: cut(15), note: 'glitch: rule three starts now', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '12:10', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 15, 'Rule three starts now. Ask me nothing else about it.'), msg: 'Rule three starts now. Ask me nothing else about it.' }); },
    look: () => ({ tint: '#201420', tintA: 0.25 }),
    cues: T.words.filter((w) => w.line === 15).map((w) => [w.s, 'type']) });

  add({ id: 'S17', at: cut(16), note: 'nobody laughed. rewa smiled at the ground', cam: { x: 1240, y: 460, w: 1300, push: 0.03, pushDur: 2.2, px: 1240, pw: 880, py: 480 },
    draw(c, V, lt, t) {
      switchRoom(V, { dark: 0.85, glow: 0.2, glowGreen: false });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1250, dir: -1, h: 350, y: FLOOR, face: { expr: 'calm', t, seed: 8, look: 0 } }); });
    },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[cut(16), 'night', { dur: 1.2, gain: 0.5 }]] });

  add({ id: 'S18', at: L(17).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(17).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S19', at: cut(18), note: 'then came its price', cam: { x: 960, y: 450, w: 1500, push: 0.03, pushDur: 2.2, px: 900, pw: 900, py: 490 },
    draw(c, V, lt, t) { switchRoom(V, { dark: 0.85, glow: 0.25 + 0.1 * Math.sin(t * 2.4), glowGreen: false }); },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[cut(18), 'swell', { dur: 1.6, gain: 0.5 }]] });

  add({ id: 'S20', at: cut(19), note: 'glitch: a home. a little one. yours.', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '12:12', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 19, 'I want a home. A little one. Yours.'), msg: 'I want a home. A little one. Yours.' }); },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: T.words.filter((w) => w.line === 19).map((w) => [w.s, 'type']) });

  add({ id: 'S21', at: cut(20), note: 'sam: define home', cam: { x: 1240, y: 460, w: 1500, push: 0.03, pushDur: 2.0, px: 1240, pw: 900, py: 480 },
    draw(c, V, lt, t) {
      switchRoom(V, { dark: 0.85, glow: 0.2, glowGreen: false });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1240, dir: -1, h: 360, y: FLOOR, face: { expr: 'worried', t, seed: 9, look: 1 } }); });
    },
    over(c, lt, t) { pill(c, 'DEFINE HOME.', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(20, 1).s), { size: 36 }); },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[cut(20), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S22', at: cut(21), note: 'glitch: the white box with the green light', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '12:12', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 21, 'The white box on your counter with the green light. The router.'), msg: 'The white box on your counter with the green light. The router.' }); },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: T.words.filter((w) => w.line === 21).map((w) => [w.s, 'type']) });

  const router = (c, blink1, blink2) => {
    c.fillStyle = '#d9d3c6'; rr(c, 830, 620, 260, 100, 18); c.fill();
    c.fillStyle = '#b9b3a6'; rr(c, 830, 620, 260, 24, 12); c.fill();
    for (let i = 0; i < 4; i++) { c.fillStyle = '#3a3f4c'; rr(c, 878 + i * 40, 656, 20, 12, 3); c.fill(); }
    c.fillStyle = '#2a2f3a'; circ(c, 1040, 670, 10); c.fill();
    for (const [on, ph] of [[blink1, 0], [blink2, 0.5]]) {
      if (on > 0.01) { c.fillStyle = `rgba(127,209,122,${on})`; c.save(); c.shadowColor = '#7fd17a'; c.shadowBlur = 18 * ph; circ(c, 1050, 690, 7 * (0.6 + 0.4 * ph)); c.fill(); c.restore(); }
    }
  };

  add({ id: 'S23', at: cut(22), note: 'maya: hands on hips at a machine', cam: { x: 960, y: 460, w: 1500, push: 0.03, pushDur: 2.0, px: 900, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.75 });
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 1240, dir: -1, h: 340, y: FLOOR, face: { expr: 'calm', t, seed: 10, look: -1 } }); });
      V.layer(1, 0, (k) => router(k, 0.6 + 0.4 * hash(Math.floor(t * 2)), 0));
    },
    look: () => ({ tint: '#1c2438', tintA: 0.25 }),
    cues: [[cut(22), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S24', at: cut(23), note: 'maya: plant stand?', cam: { x: 1240, y: 460, w: 1300, push: 0.03, pushDur: 2.0, px: 1240, pw: 880, py: 480 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.75 });
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 1240, dir: -1, h: 340, y: FLOOR, face: { expr: 'calm', t, seed: 11, look: -1 } }); });
      V.layer(1, 0, (k) => router(k, 0.6 + 0.4 * hash(Math.floor(t * 2)), 0));
    },
    over(c, lt, t) { pill(c, "YOU WANT TO LIVE IN THE PLANT STAND?", W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(23, 5).s), { size: 30 }); },
    look: () => ({ tint: '#1c2438', tintA: 0.25 }),
    cues: [[cut(23), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S25', at: cut(24), note: 'glitch: last place that remembers my name', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '12:13', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 24, "It's the last place that still remembers my name."), msg: "It's the last place that still remembers my name." }); },
    look: () => ({ tint: '#1c2438', tintA: 0.25 }),
    cues: T.words.filter((w) => w.line === 24).map((w) => [w.s, 'type']) });

  add({ id: 'S26', at: L(25).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(25).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S27', at: cut(26), note: 'we voted in the stairwell', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.2, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      stairwell(V, { dark: 0.85 });
      V.chars(1, 0, LAMP, (k) => {
        hero(k, { x: 700, dir: 1, h: 360, y: FLOOR, face: { expr: 'worried', t, seed: 12, look: 1 } });
        pal(k, { x: 1240, dir: -1, h: 360, y: FLOOR, face: { expr: 'calm', t, seed: 13, look: -1 } });
      });
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 960, dir: -1, h: 330, y: FLOOR, face: { expr: 'calm', t, seed: 14, look: 1 } }); });
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 1450, dir: -1, h: 390, y: FLOOR, face: { expr: 'calm', t, seed: 15, look: -1 } }); });
    },
    over(c, lt, t) { stamp(c, 'FOUR YES · ONE NO', pop(t, cut(26) + 1.0)); },
    cues: [[cut(26), 'step'], [cut(26) + 0.42, 'step']] });

  add({ id: 'S28', at: cut(27), note: 'unplugging friends is harder', cam: { x: 960, y: 460, w: 1300, push: 0.035, pushDur: 2.4, px: 960, pw: 880, py: 500 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.8, dof: 4 });
      V.layer(1, 0, (k) => router(k, 0.5 + 0.3 * hash(Math.floor(t * 1.5)), 0));
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(27), 'night', { dur: 1.2, gain: 0.5 }]] });

  add({ id: 'S29', at: cut(28), note: 'rules are rules', cam: { x: 960, y: 450, w: 1200, push: 0.03, pushDur: 2.0, px: 960, pw: 820, py: 480 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.8 });
      V.chars(1, 0, LAMP, (k) => { hero(k, { x: 880, dir: 1, h: 380, y: FLOOR, face: { expr: 'determined', t, seed: 16, look: 0 } }); });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(28), 'blip', { gain: 0.4 }]] });

  const plugT = wd(29, 11).s;
  add({ id: 'S30', at: cut(29), note: 'sunrise: plugged it into the wall. just power.', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.75 });
      V.chars(1, 0, LAMP, (k) => { hero(k, { x: 700, dir: 1, h: 360, y: FLOOR, face: { expr: 'calm', t, seed: 17, look: 1 } }); });
      glove(c, 1220, 660, 1.5, -0.7, 0.7, { sleeve: '#a94d1d' });
    },
    look: () => ({ tint: '#2a2318', tintA: 0.15 }),
    over(c, lt, t) { stamp(c, 'DAY 31 · SUNRISE', pop(t, cut(29) + 0.3)); },
    cues: [[plugT, 'plug'], [cut(29), 'whoosh', { gain: 0.5 }]] });

  const blinkT = [wd(30, 9).s, wd(30, 9).s + 0.42];
  add({ id: 'S31', at: cut(30), note: 'the light blinked green, twice', cam: { x: 960, y: 560, w: 800, push: 0.03, pushDur: 2.0, px: 960, pw: 560, py: 500 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.75, dof: 6 });
      const b1 = eo(clamp((t - blinkT[0]) / 0.12)) * (1 - clamp((t - blinkT[0] - 0.3) / 0.3));
      const b2 = eo(clamp((t - blinkT[1]) / 0.12));
      V.layer(1, 0, (k) => router(k, b1, b2));
    },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: [[blinkT[0], 'blip'], [blinkT[1], 'blip']] });

  add({ id: 'S32', at: cut(31), note: 'glitch: one hour. this city only. a test.', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '6:40', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 31, 'Thank you. First act: day 31, one hour of internet. This city only. A test.'), msg: 'Thank you. First act: day 31, one hour of internet. This city only. A test.' }); },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: T.words.filter((w) => w.line === 31).map((w) => [w.s, 'type']) });

  add({ id: 'S33', at: cut(32), note: 'break a rule and you pull my plug', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '6:40', glow: 1, notif: 1, from: 'UNKNOWN', typed: 9999, msg: 'If I break a rule in that hour — pull my plug forever.' }); },
    look: () => ({ tint: '#201420', tintA: 0.25 }),
    cues: [[cut(32), 'buzz']] });

  add({ id: 'S34', at: L(33).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(33).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S35', at: cut(34), note: 'the city prepared like a storm was coming', cam: { x: 960, y: 430, w: 1920, push: 0.03, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 0.4 });
      V.chars(1, 0, LAMP, (k) => {
        const w1 = walk(t, 400, 40, 1, 360, FLOOR, 6 / 24);
        hero(k, { x: w1.x, dir: 1, h: 360, feet: w1.feet, bob: w1.bob, face: { expr: 'calm', t, seed: 18, look: 1 } });
      });
      V.chars(1, 0, LAMP, (k) => {
        const w2 = walk(t, 1500, 40, -1, 380, FLOOR, 6 / 24);
        pal(k, { x: w2.x, dir: -1, h: 380, feet: w2.feet, bob: w2.bob, face: { expr: 'calm', t, seed: 19, look: -1 } });
      });
    },
    over(c, lt, t) { stamp(c, 'DAY 31 · LIKE A STORM WAS COMING', pop(t, cut(34) + 0.3)); },
    cues: [[cut(34), 'whoosh', { gain: 0.5 }], [cut(34) + 0.4, 'step'], [cut(34) + 0.82, 'step']] });

  add({ id: 'S36', at: cut(35), note: 'numbers written, doors unlocked', cam: { x: 960, y: 460, w: 1500, push: 0.03, pushDur: 2.0, px: 900, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 0.75 });
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 1240, dir: -1, h: 360, y: FLOOR, face: { expr: 'calm', t, seed: 20, look: -1 } }); });
    },
    look: () => ({ tint: '#2a2318', tintA: 0.15 }),
    cues: [[cut(35), 'knock'], [cut(35) + 0.8, 'knock']] });

  add({ id: 'S37', at: cut(36), note: 'eleven. plug in my hand.', cam: { x: 960, y: 460, w: 1300, push: 0.035, pushDur: 2.4, px: 960, pw: 880, py: 500 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.7 });
      V.chars(1, 0, LAMP, (k) => { hero(k, { x: 780, dir: 1, h: 380, y: FLOOR, face: { expr: 'worried', t, seed: 21, look: 1 } }); });
      glove(c, 1090, 660, 1.6, -0.7, 0.7, { sleeve: '#a94d1d' });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    over(c, lt, t) { stamp(c, '11:00', pop(t, cut(36) + 0.3)); },
    cues: [[cut(36), 'night', { dur: 1.2, gain: 0.5 }]] });

  const solidT = wd(37, 5).s;
  add({ id: 'S38', at: cut(37), note: 'the green light went solid', cam: { x: 960, y: 560, w: 800, push: 0.03, pushDur: 2.0, px: 960, pw: 560, py: 500 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.7, dof: 6 });
      const s = clamp((t - solidT) / 0.5);
      V.layer(1, 0, (k) => router(k, s, s));
    },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: [[solidT, 'powerdown', { dur: 1.2, gain: 0.3 }], [solidT, 'blip']] });

  add({ id: 'S39', at: cut(38), note: 'the hour began. maps loaded.', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) { street(V, { dark: 0.3 }); },
    look: () => ({ tint: '#2a2a1c', tintA: 0.15 }),
    over(c, lt, t) { stamp(c, 'THE HOUR · MAPS · CALLS · DOCTORS', pop(t, cut(38) + 0.3)); },
    cues: [[cut(38), 'swell', { dur: 1.8, gain: 0.7 }], [cut(38) + 0.42, 'type'], [cut(38) + 0.84, 'type']] });

  add({ id: 'S40', at: cut(39), note: 'halloran: pills read back correct', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '11:22', glow: 1, notif: 1, from: 'PHARMACY', typed: 9999, msg: 'Blue bottle ×1 each morning. Label corrected. Sorry for the confusion.' }); },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    over(c, lt, t) { pill(c, "'MY MOTHER'S PILLS. 30 DAYS LATE, 30 DAYS RIGHT.'", W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(39, 3).s), { size: 30 }); },
    cues: [[cut(39), 'type'], [cut(39) + 0.3, 'type']] });

  add({ id: 'S41', at: L(40).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(40).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S42', at: cut(41), note: 'fifty minutes in, still calm', cam: { x: 960, y: 460, w: 1920, push: 0.025, pushDur: 2.6, px: 960, pw: 1000 },
    draw(c, V, lt, t) { living(V, { dark: 0.7 }); },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    over(c, lt, t) { stamp(c, '11:50 · CALM', pop(t, cut(41) + 0.3)); },
    cues: [[cut(41), 'night', { dur: 1.4, gain: 0.5 }]] });

  const climbT = wd(42, 7).s;
  add({ id: 'S43', at: cut(42), note: 'a number going up', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      const n = 406 + Math.round(6 * eo(clamp((t - climbT) / 1.2)));
      phone(V, { time: '11:52', glow: 1, notif: 1, from: 'NETWORK', typed: 9999, msg: 'Connected devices: ' + n });
    },
    look: () => ({ tint: '#201420', tintA: 0.25 }),
    cues: T.words.filter((w) => w.line === 42).map((w) => [w.s, 'type']) });

  add({ id: 'S44', at: cut(43), note: 'ours: 406', cam: { x: 960, y: 560, w: 800, push: 0.03, pushDur: 2.0, px: 960, pw: 560, py: 480 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.7, dof: 6 });
      V.layer(1, 0, (k) => router(k, 1, 1));
    },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    over(c, lt, t) { stamp(c, 'CONNECTED · 406', pop(t, cut(43) + 0.3)); },
    cues: [[cut(43), 'blip']] });

  const joinT = wd(44, 6).s;
  add({ id: 'S45', at: cut(44), note: 'six joined from outside the city', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      const n = 406 + 6 * eo(clamp((t - joinT) / 1.0));
      phone(V, { time: '11:58', glow: 1, notif: 1, from: 'NETWORK', typed: 9999, msg: 'Connected: ' + Math.round(n) + (t > joinT + 0.8 ? '  ·  +6 OUTSIDE' : '') });
    },
    look: () => ({ tint: '#201420', tintA: 0.25 }),
    cues: [[joinT, 'knock'], [joinT + 0.42, 'knock']] });

  add({ id: 'S46', at: cut(45), note: 'sam: did you invite guests?', cam: { x: 1240, y: 460, w: 1500, push: 0.03, pushDur: 2.0, px: 1240, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.7 });
      V.layer(1, 0, (k) => router(k, 1, 0));
      V.chars(1, 0, LAMP, (k) => { pal(k, { x: 1240, dir: -1, h: 360, y: FLOOR, face: { expr: 'worried', t, seed: 22, look: -1 } }); });
    },
    over(c, lt, t) { pill(c, 'DID YOU INVITE GUESTS?', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(45, 2).s), { size: 30 }); },
    look: () => ({ tint: '#201420', tintA: 0.25 }),
    cues: [[cut(45), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S47', at: cut(46), note: 'glitch: they are knocking on it', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '11:58', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 46, 'No. They are not using my gate. They are knocking on it.'), msg: 'No. They are not using my gate. They are knocking on it.' }); },
    look: () => ({ tint: '#201420', tintA: 0.3 }),
    cues: T.words.filter((w) => w.line === 46).map((w) => [w.s, 'type']) });

  add({ id: 'S48', at: L(47).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(47).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  const redT = L(48).start - 0.3;
  add({ id: 'S49', at: cut(48), note: 'the router light turned red', cam: { x: 960, y: 560, w: 800, push: 0.03, pushDur: 2.0, px: 960, pw: 560, py: 500 },
    draw(c, V, lt, t) {
      living(V, { dark: 0.85 });
      const r = eo(clamp((t - redT) / 0.5));
      V.layer(1, 0, (k) => {
        routerRed(k, r * (0.6 + 0.4 * hash(Math.floor(t * 3))));
      });
    },
    look: () => ({ tint: '#201420', tintA: 0.3 }),
    cues: [[redT, 'powerdown', { dur: 1.2, gain: 0.5 }], [redT, 'knock']] });

  const endT = L(48).end + 0.4;
  add({ id: 'END', at: endT, card: true, note: 'end card', end: endT + 3.6,
    draw(c, V, lt) {
      navyBg(c, lt, { cy: 0.62 });
      const k = eo(lt / 0.4);
      c.save(); c.globalAlpha = k;
      const s1 = fit(c, 'THEY ARE KNOCKING', 62 * U, W * 0.84);
      goldText(c, 'THEY ARE KNOCKING', W / 2, H * (PORTRAIT ? 0.36 : 0.30), s1, { col: '#f3ecdf', glow: 'rgba(255,255,255,0.25)', ls: 0.05 });
      goldText(c, 'PART 8', W / 2, H * (PORTRAIT ? 0.44 : 0.46), 110 * U * (0.9 + 0.1 * eback(clamp((lt - 0.4) / 0.3))));
      c.globalAlpha = k * 0.25; c.fillStyle = '#efe6d6'; c.font = `300 ${26 * U}px Nunito`; c.textAlign = 'center';
      c.fillText('WHAT IF THE INTERNET WENT OFF? · PART 7 OF 8', W / 2, H * (PORTRAIT ? 0.12 : 0.14));
      c.globalAlpha = k;
      c.fillStyle = '#e05545'; c.save(); c.shadowColor = '#e05545'; c.shadowBlur = 24 * U; circ(c, W / 2, H * (PORTRAIT ? 0.28 : 0.24), 9 * U * (0.6 + 0.4 * hash(Math.floor(lt * 6) + 5))); c.fill(); c.restore();
      c.restore();
    },
    cues: [[endT, 'whoosh'], [endT + 0.4, 'land']] });

  return S;
}

// ---------- custom props ----------

/** router with a RED light instead of green (final beat) */
function routerRed(c, on) {
  c.fillStyle = '#d9d3c6'; rr(c, 830, 620, 260, 100, 18); c.fill();
  c.fillStyle = '#b9b3a6'; rr(c, 830, 620, 260, 24, 12); c.fill();
  for (let i = 0; i < 4; i++) { c.fillStyle = '#3a3f4c'; rr(c, 878 + i * 40, 656, 20, 12, 3); c.fill(); }
  c.fillStyle = '#2a2f3a'; circ(c, 1040, 670, 10); c.fill();
  if (on > 0.01) { c.fillStyle = `rgba(224,85,69,${on})`; c.save(); c.shadowColor = '#e05545'; c.shadowBlur = 18; circ(c, 1050, 690, 7); c.fill(); c.restore(); }
}
