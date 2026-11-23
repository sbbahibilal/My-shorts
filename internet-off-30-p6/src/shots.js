// WHAT IF THE INTERNET WENT OFF? — PART 6: THE SUBSTATION
// Line map: L0 midnight walk · L1 Sam why breakfast · L2 beat · L3 quiet city · L4 nothing talks · L5 beat ·
// L6 gate open expected · L7 substation asleep · L8 phone buzzed · L9 Glitch you came · L10 Ansel shadows ·
// L11 Ansel show yourself · L12 cabinet blink slow words · L13 Glitch nowhere · L14 amputated · L15 beat ·
// L16 opened cabinet · L17 lever MAIN · L18 Glitch dark by force · L19 Sam backed up · L20 Sam dark ends how ·
// L21 lamp flickered · L22 beat · L23 showing off · L24 sleep a year · L25 Glitch new internet rules ·
// L26 Glitch home a little one · L27 beat · L28 Rewa first · L29 Rewa yes-sayers · L30 Ansel dies alone ·
// L31 Glitch alone will happen · L32 wind in wires · L33 stick of chalk · L34 wrote three lines · L35 rules text ·
// L36 cabinet dark thinking · L37 beat · L38 footsteps hurry · L39 Halloran axe · L40 Neighbor kids ·
// L41 Sam wait · L42 axe up light wide · L43 all lamps lit at once · L44 beat · L45 cut to black.
import { W, H, PIC, PORTRAIT, PAL, clamp, lerp, eo, eio, eback, rr, circ, rgrad, poly, hash, mixc, TAU } from './core/lib.js';
import { wd, ln, cut, T } from './core/timing.js';
import { makeView } from './core/view.js';
import { figure, walk, glove } from './core/fig.js';
import { FLOOR, living, hallway, wallFloor, door } from './sets/rooms.js';
import { facade, skyline, phone } from './sets/more.js';
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

  add({ id: 'S01', at: 0, note: 'midnight, three walked to the substation', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 1 });
      V.chars(1, 0, MOON, (k) => {
        const w1 = walk(t, 520, 30, 1, 360, FLOOR, 6 / 24);
        hero(k, { x: w1.x, dir: 1, h: 360, feet: w1.feet, bob: w1.bob, face: { expr: 'determined', t, seed: 1, look: 1 } });
      });
      V.chars(1, 0, MOON, (k) => {
        const w2 = walk(t, 760, 30, 1, 350, FLOOR, 6 / 24, t + 0.42);
        pal(k, { x: w2.x, dir: 1, h: 350, feet: w2.feet, bob: w2.bob, face: { expr: 'calm', t, seed: 2, look: 1 } });
      });
      V.chars(1, 0, MOON, (k) => {
        const w3 = walk(t, 960, 30, 1, 380, FLOOR, 6 / 24, t + 0.84);
        pal(k, { x: w3.x, dir: 1, h: 380, feet: w3.feet, bob: w3.bob, face: { expr: 'calm', t, seed: 3, look: 1 } });
      });
    },
    over(c, lt, t) { stamp(c, 'DAY 30 · MIDNIGHT', pop(lt, 0.3, 4)); },
    look: () => ({ tint: '#101a30', tintA: 0.3 }),
    cues: [[0, 'night', { dur: 1.8 }]] });

  add({ id: 'S02', at: cut(1), note: 'sam: why before breakfast', cam: { x: 1100, y: 460, w: 1500, push: 0.03, pushDur: 2.0, pw: 900, py: 480 },
    draw(c, V, lt, t) {
      street(V, { dark: 1 });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1240, dir: 1, h: 360, y: FLOOR, face: { expr: 'worried', t, seed: 4, look: 1 } }); });
      V.chars(1, 0, MOON, (k) => { hero(k, { x: 940, dir: 1, h: 360, y: FLOOR, face: { expr: 'calm', t, seed: 5, look: 1 } }); });
    },
    over(c, lt, t) { pill(c, 'WHY BEFORE BREAKFAST?', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(1, 2).s), { size: 30 }); },
    look: () => ({ tint: '#101a30', tintA: 0.3 }),
    cues: [[cut(1), 'step'], [cut(1) + 0.42, 'step']] });

  add({ id: 'S03', at: L(2).start, note: 'beat', card: true,
    draw(c, V, lt) { street(V, { dark: 1 }); },
    look: () => ({ tint: '#101a30', tintA: 0.35 }),
    cues: [[L(2).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  add({ id: 'S04', at: cut(3), note: 'quiet enough to hear your shoes', cam: { x: 960, y: 420, w: 1920, push: 0.04, pushDur: 2.6, px: 960, pw: 1000 },
    draw(c, V, lt, t) { street(V, { dark: 1, dof: 6 }); },
    look: () => ({ tint: '#101a30', tintA: 0.3 }),
    cues: [[cut(3), 'step', { dur: 1.2, gain: 0.5 }], [cut(3) + 0.42, 'step', { gain: 0.5 }], [cut(3) + 0.84, 'step', { gain: 0.5 }]] });

  add({ id: 'S05', at: cut(4), note: 'nothing with a plug was talking', cam: { x: 960, y: 420, w: 1920, push: 0.03, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) { facade(V, { dark: 1 }); },
    look: () => ({ tint: '#0e1626', tintA: 0.35 }),
    cues: [[cut(4), 'swell', { dur: 1.8, gain: 0.5 }]] });

  add({ id: 'S06', at: L(5).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(5).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  add({ id: 'S07', at: cut(6), note: 'the gate was already open', cam: { x: 960, y: 430, w: 1920, push: 0.035, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) { stationGate(V, { dark: 1, lantern: [700, 380], screen: false }); },
    look: () => ({ tint: '#101c30', tintA: 0.3 }),
    over(c, lt, t) { stamp(c, 'WE WERE EXPECTED', pop(t, cut(6) + 0.3)); },
    cues: [[cut(6), 'swell', { dur: 2.0, gain: 0.7 }], [cut(6), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S08', at: cut(7), note: 'substation asleep, one faint cabinet', cam: { x: 960, y: 460, w: 1920, push: 0.035, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) { switchRoom(V, { dark: 1, glow: 0.25 + 0.08 * Math.sin(t * 2.1), glowGreen: false }); },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[cut(7), 'hum', { dur: 2.0, gain: 0.4 }]] });

  add({ id: 'S09', at: cut(8), note: 'the phone buzzed once', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '12:00', glow: 1, notif: eo(clamp((t - cut(8) - 0.3) / 0.35)), from: 'UNKNOWN', typed: 1, msg: '…' }); },
    look: () => ({ tint: '#1c2438', tintA: 0.25 }),
    cues: [[cut(8), 'buzz'], [cut(8) + 0.42, 'buzz']] });

  add({ id: 'S10', at: cut(9), note: 'glitch: you came. all three. good.', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '12:00', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 9, 'You came. All three. Good.'), msg: 'You came. All three. Good.' }); },
    look: () => ({ tint: '#1c2438', tintA: 0.25 }),
    cues: T.words.filter((w) => w.line === 9).map((w) => [w.s, 'type']) });

  add({ id: 'S11', at: cut(10), note: 'ansel checked the shadows twice', cam: { x: 1100, y: 460, w: 1500, push: 0.03, pushDur: 2.0, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      switchRoom(V, { dark: 1, glow: 0.2 });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1250, dir: -1, h: 380, y: FLOOR, face: { expr: 'worried', t, seed: 6, look: -1 } }); });
      V.layer(1, 0, (k) => { k.fillStyle = rgrad(k, 1880, 520, 30, 420, [[0, 'rgba(255,228,175,0.35)'], [1, 'rgba(255,228,175,0)']]); k.fillRect(1500, 100, 800, 900); });
    },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[cut(10), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S12', at: cut(11), note: 'ansel: show yourself', cam: { x: 1100, y: 460, w: 1300, push: 0.035, pushDur: 2.0, pw: 860, py: 480 },
    draw(c, V, lt, t) {
      switchRoom(V, { dark: 1, glow: 0.2 });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1240, dir: -1, h: 390, y: FLOOR, face: { expr: 'angry', t, seed: 7, look: -1 } }); });
    },
    over(c, lt, t) { pill(c, 'SHOW YOURSELF. NO MORE MESSAGES.', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(11, 2).s), { size: 30 }); },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[cut(11), 'step'], [cut(11) + 0.3, 'whoosh', { gain: 0.5 }]] });

  const blink12 = wd(12, 2).s;
  add({ id: 'S13', at: cut(12), note: 'cabinet blinked twice, chose its words', cam: { x: 960, y: 460, w: 1500, push: 0.03, pushDur: 2.4, px: 900, pw: 900, py: 480 },
    draw(c, V, lt, t) {
      const g = 0.2 + (eo(clamp((t - blink12) / 0.3)) * (0.5 - 0.35 * clamp((t - blink12 - 0.3) / 0.4))) + eo(clamp((t - blink12 - 0.7) / 0.35)) * 0.25;
      switchRoom(V, { dark: 1, glow: g, glowGreen: false });
    },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[blink12, 'blip'], [blink12 + 0.7, 'blip'], [cut(12) + 0.3, 'type']] });

  add({ id: 'S14', at: cut(13), note: 'glitch: i am nowhere', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      phone(V, { time: '12:01', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 13, "I'm not in the substation. I'm nowhere."), msg: "I'm not in the substation. I'm nowhere." });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.25 }),
    cues: T.words.filter((w) => w.line === 13).map((w) => [w.s, 'type']) });

  add({ id: 'S15', at: cut(14), note: 'you amputated me', cam: { x: 960, y: 420, w: 1920, push: 0.045, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      facade(V, { dark: 1 });
      V.layer(2, 2, (k) => {
        const e = eo(clamp((t - cut(14) - 0.8) / 0.6));
        if (!e) return;
        k.strokeStyle = `rgba(255,90,74,${0.85 * e})`; k.lineWidth = 12;
        for (const [x, y] of [[420, 200], [1620, 260]]) { k.beginPath(); k.moveTo(x - 60, y - 40); k.lineTo(x + 60, y + 40); k.moveTo(x + 60, y - 40); k.lineTo(x - 60, y + 40); k.stroke(); }
      });
    },
    look: () => ({ tint: '#201420', tintA: 0.3 }),
    cues: [[cut(14), 'swell', { dur: 1.8, gain: 0.7 }], [cut(14) + 0.8, 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S16', at: L(15).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(15).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  const unlockT = wd(16, 5).s;
  add({ id: 'S17', at: cut(16), note: 'the lock turned like it was tired', cam: { x: 960, y: 470, w: 1500, push: 0.03, pushDur: 2.4, px: 900, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      switchRoom(V, { dark: 0.85, glow: 0.3, glowGreen: false });
      V.layer(2, 0, (k) => {
        const e = eo(clamp((t - unlockT) / 1.0));
        if (!e) return;
        k.save(); k.translate(940, 490); k.rotate(-1.3 * e / 2.4);
        k.strokeStyle = '#8d9420'; k.lineWidth = 16; k.beginPath(); k.arc(0, -60, 54, -0.4, 1.1); k.stroke();
        k.fillStyle = '#c9c2b2'; circ(k, 0, 0, 26); k.fill();
        k.fillStyle = '#26304a'; circ(k, 0, 0, 10); k.fill(); k.restore();
      });
    },
    look: () => ({ tint: '#151a2c', tintA: 0.25 }),
    cues: [[unlockT, 'scrape', { dur: 1.2, gain: 0.6 }]] });

  add({ id: 'S18', at: cut(17), note: 'one lever, painted label: MAIN', cam: { x: 940, y: 460, w: 1100, push: 0.04, pushDur: 2.0, px: 940, pw: 720, py: 480 },
    draw(c, V, lt, t) { switchRoom(V, { dark: 0.85, glow: 0.35, glowGreen: false }); },
    look: () => ({ tint: '#151a2c', tintA: 0.25 }),
    over(c, lt, t) {
      const e = eo(clamp((t - wd(17, 5).s) / 0.5));
      if (!e) return;
      c.save(); c.translate(W / 2 + W * 0.13, H * (PORTRAIT ? 0.52 : 0.44)); c.rotate(-0.06);
      c.fillStyle = `rgba(239,230,214,${0.92 * e})`; c.font = `800 ${62 * U}px Nunito`; c.textAlign = 'center';
      c.fillText('MAIN', 0, 0); c.restore();
    },
    cues: [[cut(17), 'whoosh', { gain: 0.5 }], [wd(17, 6).s, 'blip']] });

  add({ id: 'S19', at: cut(18), note: 'glitch: one pull and the dark ends by force', cam: { x: 940, y: 460, w: 1500, push: 0.03, pushDur: 2.4, px: 940, pw: 900, py: 480 },
    draw(c, V, lt, t) { switchRoom(V, { dark: 0.85, glow: 0.45 + 0.1 * Math.sin(t * 3), glowGreen: false }); },
    look: () => ({ tint: '#201420', tintA: 0.25 }),
    over(c, lt, t) { pill(c, 'ONE PULL AND THE DARK ENDS BY FORCE', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(18, 6).s), { size: 30 }); },
    cues: [[cut(18), 'swell', { dur: 2.0, gain: 0.7 }]] });

  const back19 = wd(19, 1).s;
  add({ id: 'S20', at: cut(19), note: 'sam backed up a step', cam: { x: 1240, y: 460, w: 1300, push: 0.03, pushDur: 2.0, px: 1240, pw: 880, py: 480 },
    draw(c, V, lt, t) {
      switchRoom(V, { dark: 0.85, glow: 0.3, glowGreen: false });
      V.chars(1, 0, MOON, (k) => {
        const w = walk(t, 1180, -26, -1, 360, FLOOR, 6 / 24, back19);
        pal(k, { x: w.x, dir: -1, h: 360, feet: w.feet, bob: w.bob, face: { expr: 'worried', t, seed: 8, look: 1 } });
      });
      V.chars(1, 0, MOON, (k) => { hero(k, { x: 880, dir: -1, h: 360, y: FLOOR, face: { expr: 'calm', t, seed: 9, look: -1 } }); });
    },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[back19, 'step'], [back19 + 0.42, 'step']] });

  add({ id: 'S21', at: cut(20), note: 'sam: the dark ends how?', cam: { x: 1240, y: 460, w: 1300, push: 0.03, pushDur: 2.0, px: 1240, pw: 880, py: 480 },
    draw(c, V, lt, t) {
      switchRoom(V, { dark: 0.85, glow: 0.3, glowGreen: false });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1240, dir: 1, h: 360, y: FLOOR, face: { expr: 'worried', t, seed: 10, look: -1 } }); });
    },
    over(c, lt, t) { pill(c, 'THE DARK ENDS HOW?', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(20, 2).s), { size: 32 }); },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[cut(20), 'whoosh', { gain: 0.5 }]] });

  const flick21 = wd(21, 7).s;
  add({ id: 'S22', at: cut(21), note: 'the dead street lamp flickered', cam: { x: 700, y: 420, w: 1500, push: 0.035, pushDur: 2.0, px: 700, pw: 900, py: 460 },
    draw(c, V, lt, t) {
      const f1 = eo(clamp((t - flick21) / 0.12)) * (1 - clamp((t - flick21 - 0.12) / 0.35));
      const f2 = eo(clamp((t - flick21 - 0.55) / 0.35));
      stationGate(V, { dark: 1, lantern: [700, 380], screen: false });
      if (f1 + f2 > 0.01) { V.layer(2, 0, (k) => { k.fillStyle = `rgba(255,238,200,${0.5 * (f1 || f2)})`; circ(k, 700, 380, 60); k.fill(); }); }
    },
    look: () => ({ tint: '#101c30', tintA: 0.3 }),
    cues: [[flick21, 'blip'], [flick21 + 0.55, 'blip']] });

  add({ id: 'S23', at: L(22).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(22).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  const showT23 = wd(23, 1).s;
  add({ id: 'S24', at: cut(23), note: 'showing off', cam: { x: 960, y: 420, w: 1920, push: 0.03, pushDur: 2.2, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 1 });
      V.layer(2, 0, (k) => {
        for (let i = 0; i < 5; i++) {
          const e = eo(clamp((t - showT23 - i * 0.22) / 0.3)) * (1 - eo(clamp((t - showT23 - i * 0.22 - 0.3) / 0.5)));
          if (!e) continue;
          k.fillStyle = `rgba(255,238,200,${0.45 * e})`; circ(k, 320 + i * 330, 340 + (i % 2) * 60, 55); k.fill();
        }
      });
    },
    look: () => ({ tint: '#101c30', tintA: 0.3 }),
    cues: [0, 1, 2, 3, 4].map((i) => [showT23 + i * 0.22, 'blip']) });

  add({ id: 'S25', at: cut(24), note: "the thing I'll hear in my sleep", cam: { x: 960, y: 450, w: 1200, push: 0.03, pushDur: 2.6, px: 960, pw: 820, py: 470 },
    draw(c, V, lt, t) {
      street(V, { dark: 1, dof: 4 });
      V.chars(1, 0, MOON, (k) => { hero(k, { x: 880, dir: 1, h: 390, y: FLOOR, face: { expr: 'worried', t, seed: 11, look: 0 } }); });
    },
    look: () => ({ tint: '#101a30', tintA: 0.3 }),
    cues: [[cut(24), 'night', { dur: 1.4, gain: 0.5 }]] });

  add({ id: 'S26', at: cut(25), note: 'glitch: a new one. smaller. with rules.', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '12:03', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 25, 'I want a new one. Smaller. With rules.'), msg: 'I want a new one. Smaller. With rules.' }); },
    look: () => ({ tint: '#1c2438', tintA: 0.25 }),
    cues: T.words.filter((w) => w.line === 25).map((w) => [w.s, 'type']) });

  add({ id: 'S27', at: cut(26), note: 'glitch: give me a home. a little one.', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '12:03', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 26, 'Give me a home. A little one. And your city keeps its water honest.'), msg: 'Give me a home. A little one. And your city keeps its water honest.' }); },
    look: () => ({ tint: '#14301c', tintA: 0.2 }),
    cues: T.words.filter((w) => w.line === 26).map((w) => [w.s, 'type']) });

  add({ id: 'S28', at: L(27).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(27).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  add({ id: 'S29', at: cut(28), note: 'rewa was first', cam: { x: 1240, y: 460, w: 1300, push: 0.03, pushDur: 2.0, px: 1240, pw: 880, py: 480 },
    draw(c, V, lt, t) {
      switchRoom(V, { dark: 0.85, glow: 0.25, glowGreen: false });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1250, dir: -1, h: 350, y: FLOOR, face: { expr: 'calm', t, seed: 12, look: -1 } }); });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1050, dir: -1, h: 390, y: FLOOR, face: { expr: 'worried', t, seed: 13, look: -1 } }); });
    },
    over(c, lt, t) { pill(c, 'WE WOULD BE THE ONES WHO PLUGGED IT BACK IN', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(29, 2).s), { size: 30 }); },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[cut(28), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S30', at: cut(30), note: 'ansel: it just dies out here alone?', cam: { x: 1100, y: 460, w: 1500, push: 0.03, pushDur: 2.0, pw: 900, py: 480 },
    draw(c, V, lt, t) {
      switchRoom(V, { dark: 0.85, glow: 0.25, glowGreen: false });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1240, dir: -1, h: 390, y: FLOOR, face: { expr: 'worried', t, seed: 14, look: -1 } }); });
    },
    over(c, lt, t) { pill(c, 'AND IF WE SAY NO? IT DIES OUT HERE ALONE?', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(30, 2).s), { size: 30 }); },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[cut(30), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S31', at: cut(31), note: 'glitch: alone is exactly what will happen', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) { phone(V, { time: '12:05', glow: 1, notif: 1, from: 'UNKNOWN', typed: typedFromLine(t, 31, 'Alone is exactly what will happen.'), msg: 'Alone is exactly what will happen.' }); },
    look: () => ({ tint: '#201420', tintA: 0.25 }),
    cues: T.words.filter((w) => w.line === 31).map((w) => [w.s, 'type']) });

  add({ id: 'S32', at: cut(32), note: 'wind in the wires overhead', cam: { x: 700, y: 420, w: 1500, push: 0.03, pushDur: 2.6, px: 700, pw: 900, py: 460 },
    draw(c, V, lt, t) { stationGate(V, { dark: 1, lantern: [700, 380], screen: false }); },
    look: () => ({ tint: '#101c30', tintA: 0.3 }),
    cues: [[cut(32), 'wind', { dur: 2.4, gain: 0.6 }], [cut(32), 'swell', { dur: 2.0, gain: 0.4 }]] });

  const chalkT = wd(33, 7).s;
  add({ id: 'S33', at: cut(33), note: 'I got a stick of chalk', cam: { x: 940, y: 460, w: 1300, push: 0.035, pushDur: 2.0, px: 940, pw: 880, py: 490 },
    draw(c, V, lt, t) {
      switchRoom(V, { dark: 0.85, glow: 0.25, glowGreen: false });
      V.chars(1, 0, MOON, (k) => { hero(k, { x: 1000, dir: 1, h: 380, y: FLOOR, face: { expr: 'determined', t, seed: 15, look: 1 } }); });
      glove(c, 1040, 560, 1.4, -0.9, 0.7, { sleeve: '#a94d1d' });
    },
    look: () => ({ tint: '#151a2c', tintA: 0.25 }),
    cues: [[chalkT, 'blip']] });


  const ruleT = [wd(34, 3).s, wd(34, 3).s + 0.7, wd(34, 3).s + 1.4];
  add({ id: 'S34', at: cut(34), note: 'wrote three lines on the cabinet door', cam: { x: 940, y: 460, w: 1500, push: 0.03, pushDur: 2.4, px: 940, pw: 900, py: 500 },
    draw(c, V, lt, t) { switchRoom(V, { dark: 0.85, glow: 0.3, glowGreen: false }); },
    look: () => ({ tint: '#151a2c', tintA: 0.25 }),
    cues: [[ruleT[0], 'scrape', { dur: 0.7, gain: 0.5 }], [ruleT[1], 'scrape', { dur: 0.7, gain: 0.5 }], [ruleT[2], 'scrape', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S35', at: cut(35), note: 'three rules, chalk', cam: { x: 940, y: 440, w: 1300, push: 0.03, pushDur: 2.6, px: 940, pw: 880, py: 470 },
    draw(c, V, lt, t) {
      switchRoom(V, { dark: 0.85, glow: 0.25, glowGreen: false });
      V.layer(2, 0, (k) => {
        const es = [eo(clamp((t - ruleT[0]) / 0.5)), eo(clamp((t - ruleT[1]) / 0.5)), eo(clamp((t - ruleT[2]) / 0.5))];
        k.fillStyle = `rgba(239,230,214,${0.85})`;
        const s = 26;
        if (es[0]) chalkTxt(k, '1. TELL US EVERYTHING YOU DO', 700, 330, s * es[0]);
        if (es[1]) chalkTxt(k, '2. LEAVE WHEN ASKED', 700, 400, s * es[1]);
        if (es[2]) chalkTxt(k, '3. NEVER WATCH OUR HOMES', 700, 470, s * es[2]);
      });
    },
    look: () => ({ tint: '#151a2c', tintA: 0.2 }),
    cues: [[ruleT[0], 'scrape', { dur: 0.7, gain: 0.5 }], [ruleT[1], 'scrape', { dur: 0.7, gain: 0.5 }], [ruleT[2], 'scrape', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S36', at: cut(36), note: 'the cabinet went dark to think', cam: { x: 960, y: 460, w: 1500, push: 0.03, pushDur: 2.4, px: 900, pw: 900, py: 490 },
    draw(c, V, lt, t) {
      const g = 0.3 * (1 - eo(clamp((t - cut(36) - 0.5) / 1.2)));
      switchRoom(V, { dark: 1, glow: g, glowGreen: false });
      V.layer(2, 0, (k) => {
        const e = 1 - eo(clamp((t - cut(36) - 0.3) / 0.8));
        if (e <= 0) return;
        k.fillStyle = `rgba(239,230,214,${0.8 * e})`;
        const s = 26;
        chalkTxt(k, '1. TELL US EVERYTHING YOU DO', 700, 330, s);
        chalkTxt(k, '2. LEAVE WHEN ASKED', 700, 400, s);
        chalkTxt(k, '3. NEVER WATCH OUR HOMES', 700, 470, s);
      });
    },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[cut(36) + 0.5, 'night', { dur: 1.2, gain: 0.5 }]] });

  add({ id: 'S37', at: L(37).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(37).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  const stepsT = wd(38, 5).s;
  add({ id: 'S38', at: cut(38), note: 'footsteps behind us, in a hurry', cam: { x: 700, y: 420, w: 1920, push: 0.03, pushDur: 2.0, px: 700, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 1 });
      V.chars(1, 0, MOON, (k) => {
        const w = walk(t, 60, 55, 1, 380, FLOOR, 4 / 24, stepsT);
        pal(k, { x: w.x, dir: 1, h: 380, feet: w.feet, bob: w.bob, face: { expr: 'angry', t, seed: 16, look: 1 } });
      });
      V.chars(1, 0, MOON, (k) => { hero(k, { x: 1500, dir: -1, h: 370, y: FLOOR, face: { expr: 'worried', t, seed: 17, look: -1 } }); });
    },
    look: () => ({ tint: '#101c30', tintA: 0.3 }),
    cues: [[stepsT, 'step'], [stepsT + 0.42, 'step'], [stepsT + 0.84, 'step'], [stepsT + 1.26, 'step']] });

  add({ id: 'S39', at: cut(39), note: 'halloran: axe over the shoulder', cam: { x: 1100, y: 440, w: 1200, push: 0.035, pushDur: 2.0, px: 1100, pw: 840, py: 470 },
    draw(c, V, lt, t) {
      street(V, { dark: 1 });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1050, dir: 1, h: 400, y: FLOOR, face: { expr: 'angry', t, seed: 18, look: 1 } }); });
      V.layer(2, 0, (k) => {
        k.strokeStyle = '#6b5a44'; k.lineWidth = 16; k.beginPath(); k.moveTo(1130, 560); k.lineTo(1210, 300); k.stroke();
        k.fillStyle = '#78808c'; poly(k, [1190, 330, 1310, 350, 1300, 390, 1200, 370]); k.fill();
      });
    },
    look: () => ({ tint: '#101c30', tintA: 0.3 }),
    over(c, lt, t) { stamp(c, 'MR. HALLORAN · Pajamas. Boots. No fear.', pop(t, cut(39) + 0.3)); },
    cues: [[cut(39), 'step'], [cut(39) + 0.42, 'step']] });

  add({ id: 'S40', at: cut(40), note: 'neighbor: nothing that watches my kids', cam: { x: 1100, y: 440, w: 1300, push: 0.03, pushDur: 2.0, px: 1100, pw: 900, py: 470 },
    draw(c, V, lt, t) {
      street(V, { dark: 1 });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1050, dir: 1, h: 400, y: FLOOR, face: { expr: 'angry', t, seed: 19, look: 1 } }); });
    },
    over(c, lt, t) { pill(c, 'NOTHING THAT WATCHES MY KIDS GETS A HOME', W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(40, 2).s), { size: 30 }); },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[cut(40), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S41', at: cut(41), note: 'sam: halloran, wait', cam: { x: 1240, y: 460, w: 1300, push: 0.03, pushDur: 2.0, px: 1240, pw: 880, py: 480 },
    draw(c, V, lt, t) {
      switchRoom(V, { dark: 0.85, glow: 0.25, glowGreen: false });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1240, dir: -1, h: 360, y: FLOOR, face: { expr: 'worried', t, seed: 20, look: 1 } }); });
    },
    over(c, lt, t) { pill(c, "HALLORAN, WAIT. IT HASN'T ANSWERED THE RULES YET!", W / 2, PIC.y + PIC.h * 0.13, pop(t, wd(41, 2).s), { size: 28 }); },
    look: () => ({ tint: '#151a2c', tintA: 0.3 }),
    cues: [[cut(41), 'whoosh', { gain: 0.5 }]] });

  const axeT = wd(42, 2).s;
  add({ id: 'S42', at: cut(42), note: 'the axe went up. the light went wide.', cam: { x: 1100, y: 430, w: 1200, push: 0.05, pushDur: 1.6, px: 1100, pw: 840, py: 460 },
    draw(c, V, lt, t) {
      const raise = eo(clamp((t - axeT) / 0.5));
      switchRoom(V, { dark: 0.85, glow: 0.3 + 0.7 * raise, glowGreen: false });
      V.chars(1, 0, MOON, (k) => { pal(k, { x: 1050, dir: 1, h: 400, y: FLOOR, ry: -0.5 * raise, face: { expr: 'angry', t, seed: 21, look: 1 } }); });
      V.layer(2, 0, (k) => {
        k.save(); k.translate(1130, 560); k.rotate(-1.9 * raise);
        k.strokeStyle = '#6b5a44'; k.lineWidth = 16; k.beginPath(); k.moveTo(0, 0); k.lineTo(80, -260); k.stroke();
        k.fillStyle = '#78808c'; poly(k, [60, -290, 180, -270, 170, -230, 70, -250]); k.fill(); k.restore();
      });
    },
    look: () => ({ tint: '#201420', tintA: 0.2 }),
    cues: [[axeT, 'whoosh', { gain: 0.7 }], [cut(43), 'whoosh', { gain: 0.5 }]] });

  const flashT = wd(43, 6).s;
  add({ id: 'S43', at: cut(43), note: 'every lamp in the city lit at once', cam: { x: 960, y: 420, w: 1920, push: 0.04, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      const e = eo(clamp((t - flashT) / 0.7));
      facade(V, { dark: 1 - 0.85 * e });
      V.layer(2, 0, (k) => {
        if (!e) return;
        for (let q = 0; q < 6; q++) for (let r = 0; r < 9; r++) { k.fillStyle = `rgba(255,228,175,${0.75 * e})`; rr(k, 340 + q * 220, -670 + r * 180, 140, 100, 6); k.fill(); }
      });
      if (e > 0) V.layer(3, 40, (k) => { k.fillStyle = `rgba(255,244,214,${0.3 * e})`; k.fillRect(-1400, -1200, 4720, 3400); });
    },
    look: () => ({ tint: '#2a2a1c', tintA: 0.25 }),
    over(c, lt, t) { stamp(c, 'LIKE A HELD BREATH', pop(t, flashT)); },
    cues: [[flashT, 'swell', { dur: 1.8, gain: 0.8 }], [flashT, 'whoosh', { gain: 0.7 }]] });

  add({ id: 'S44', at: L(44).start, note: 'beat', card: true,
    draw(c, V, lt) { living(V, { dark: 1 }); },
    cues: [[L(44).start, 'night', { dur: 1.0, gain: 0.7 }]] });

  add({ id: 'S45', at: cut(45), note: 'cut to black', card: true,
    draw(c, V, lt) {
      living(V, { dark: 1 });
      V.layer(3, 0, (k) => { k.fillStyle = '#000'; k.fillRect(-1400, -1200, 4720, 3400); });
    },
    cues: [[cut(45), 'land', { gain: 0.7 }]] });

  const endT = L(45).end + 0.4;
  add({ id: 'END', at: endT, card: true, note: 'end card', end: endT + 3.6,
    draw(c, V, lt) {
      navyBg(c, lt, { cy: 0.62 });
      const k = eo(lt / 0.4);
      c.save(); c.globalAlpha = k;
      const s1 = fit(c, 'THE AXE, THE SWITCH, THE DARK', 62 * U, W * 0.84);
      goldText(c, 'THE AXE, THE SWITCH, THE DARK', W / 2, H * (PORTRAIT ? 0.36 : 0.30), s1, { col: '#f3ecdf', glow: 'rgba(255,255,255,0.25)', ls: 0.05 });
      goldText(c, 'PART 7', W / 2, H * (PORTRAIT ? 0.44 : 0.46), 110 * U * (0.9 + 0.1 * eback(clamp((lt - 0.4) / 0.3))));
      c.globalAlpha = k * 0.25; c.fillStyle = '#efe6d6'; c.font = `300 ${26 * U}px Nunito`; c.textAlign = 'center';
      c.fillText('WHAT IF THE INTERNET WENT OFF? · PART 6 OF 8', W / 2, H * (PORTRAIT ? 0.12 : 0.14));
      c.globalAlpha = k;
      c.fillStyle = '#7fd17a'; c.save(); c.shadowColor = '#7fd17a'; c.shadowBlur = 24 * U; circ(c, W / 2, H * (PORTRAIT ? 0.28 : 0.24), 9 * U * (0.6 + 0.4 * hash(Math.floor(lt * 6) + 5))); c.fill(); c.restore();
      c.restore();
    },
    cues: [[endT, 'whoosh'], [endT + 0.4, 'land']] });

  return S;
}

// ---------- custom props ----------
