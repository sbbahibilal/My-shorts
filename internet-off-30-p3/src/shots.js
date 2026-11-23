// WHAT IF THE INTERNET WENT OFF? — PART 3: THE TOWER
// Line map: L0 tower rumor · L1 quiet blocks · L2 beat · L3 engines · L4 dogs/shutters/brooms · L5 chalk ·
// L6 arrows ivy · L7 beat · L8 walked before · L9 arrow names · L10 gate · L11 padlock+key · L12 beat ·
// L13 Glitch stair · L14 don't ask · L15 test third step · L16 fill buckets · L17 hands chain · L18 pennies ·
// L19 beat · L20 valve wheel · L21 fresh oil · L22 warm · L23 beat · L24 no machines · L25 pipes promise ·
// L26 chalk X · L27 Glitch welcome · L28 beat · L29 machine · L30 neighbor · L31 question · L32 turn us off ·
// L33 beat · L34 water on · L35 nobody said.
import { W, H, PIC, PORTRAIT, PAL, clamp, lerp, eo, eio, eback, rr, circ, rgrad, poly, hash, mixc } from './core/lib.js';
import { wd, ln, cut, T } from './core/timing.js';
import { makeView } from './core/view.js';
import { figure, walk, glove } from './core/fig.js';
import { FLOOR, hallway, wallFloor } from './sets/rooms.js';
import { phone, facade } from './sets/more.js';
import { street, rain, stairwell, waterTower, arrowChalk } from './sets/worlds.js';
import { U, pop, pill, stamp, goldText, navyBg } from './core/gfx.js';

const HH = 400;
const LAMP = { col: '#f2b266', w: 5, dx: 1, dy: -0.4 };
const MOON = { col: '#8fb0e8', w: 4.5, dx: 1, dy: -0.5 };
const fit = (c, text, size, maxW) => { c.font = `700 ${size}px Fredoka`; const w = c.measureText(text).width * 1.06; return w > maxW ? size * maxW / w : size; };

function hero(c, o) { return figure(c, { kind: 'hero', h: HH, y: FLOOR, ...o }); }
function pal(c, o) { return figure(c, { kind: 'plain', h: (o.h ?? HH), ...o }); }

const MSG5 = 'Third stair is loose. I fixed the rest.';
const MSG6 = "You're welcome.";

export function buildShots() {
  const S = [];
  const add = (o) => { S.push(o); return o; };
  const L = (i) => ln(i);

  // ---- COLD OPEN: the tower is a rumor ----
  add({ id: 'S01', at: 0, note: 'the tower on Fourth, from the street', cam: { x: 960, y: 430, w: 1920, push: 0.035, pushDur: 2.6, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      waterTower(V, { dark: 1, chalk: ['TOWER', 'THIS WAY', 'X'] });
      rain(V, t, { a: 0.7 });
    },
    over(c, lt, t) { stamp(c, 'DAY 31 · 4:00 P.M.', pop(lt, 0.3, 4)); },
    cues: [[0, 'night', { dur: 2.0 }], [wd(0, 2).s, 'step'], [wd(0, 4).s, 'step'], [wd(0, 6).s, 'step']] });

  add({ id: 'S02', at: cut(1), note: 'four blocks of quiet you could hear', cam: { x: 960, y: 440, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 1, carShape: [340, 1240] });
      rain(V, t, { a: 0.4 });
    },
    cues: [[cut(1), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S03', at: cut(2), note: 'beat', card: true,
    draw(c, V, lt) { street(V, { dark: 1, lampOn: 1 }); },
    cues: [[cut(2), 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S04', at: cut(3), note: 'a city without engines is loud in other ways', cam: { x: 960, y: 420, w: 1920, push: 0.045, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 1, lampOn: 1 });
      V.chars(1, 0, LAMP, (k) => { k.fillStyle = 'rgba(238,235,220,0.9)'; k.font = `300 ${140 * U}px Nunito`; k.textAlign = 'center'; k.globalAlpha = 0.35 + 0.2 * Math.sin(t * 2.2); k.fillText('...', 1400, 430); k.globalAlpha = 1; });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.25 }),
    cues: [[cut(3), 'swell', { dur: 1.8, gain: 0.5 }]] });

  add({ id: 'S05', at: cut(4), note: 'dogs. shutters. brooms', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.2, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      facade(V, { dark: 1 });
      V.chars(1, 0, LAMP, (k) => {
        const e = eo(clamp((t - wd(4, 3).s) / 0.6));
        k.fillStyle = 'rgba(238,235,220,0.85)';
        k.fillRect(300 - 90 * e, 430 + 8 * Math.sin(t * 3), 220, 46);
        k.strokeStyle = 'rgba(238,235,220,0.85)'; k.lineWidth = 10; k.lineCap = 'round';
        k.beginPath(); k.moveTo(300 + 150 * e, 430 + 8 * Math.sin(t * 3 + 1)); k.lineTo(240 + 150 * e, 560); k.stroke();
      });
      V.chars(1, 0, MOON, (k) => {
        const y = 640 + 14 * Math.sin(t * 6);
        k.fillStyle = '#20242e';
        rr(k, 1470, 620, 90, 40, 18); k.fill(); circ(k, 1560, 620, 22); k.fill();
        k.strokeStyle = '#20242e'; k.lineWidth = 10; k.lineCap = 'round';
        k.beginPath(); k.moveTo(1500, 660); k.lineTo(1500, 700); k.moveTo(1540, 660); k.lineTo(1540, 700); k.stroke();
      });
    },
    cues: [[wd(4, 0).s, 'step'], [wd(4, 3).s, 'shuffle', { gain: 0.5 }], [wd(4, 5).s, 'step']] });

  add({ id: 'S06', at: cut(5), note: 'we moved with the chalk', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 1, arrows: [[620, 700, -0.4], [1180, 690, -0.35]] });
      rain(V, t, { a: 0.5 });
      V.chars(1, 0, MOON, (k) => { const w1 = walk(t, 760, 52, 1, 380, FLOOR); hero(k, { x: w1.x, dir: 1, h: 380, feet: w1.feet, bob: w1.bob, face: { expr: 'determined', t, seed: 1, look: 1 } }); });
      V.chars(1, 0, MOON, (k) => { const w2 = walk(t, 640, 52, 1, 350, FLOOR); pal(k, { x: w2.x, dir: 1, h: 350, feet: w2.feet, bob: w2.bob, face: { expr: 'calm', t, seed: 2, look: 1 } }); });
    },
    cues: [[cut(5), 'step'], [cut(5) + 0.4, 'step'], [cut(5) + 0.8, 'step']] });

  add({ id: 'S07', at: cut(6), note: 'arrows climbed the walls like ivy', cam: { x: 960, y: 420, w: 1920, push: 0.04, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      facade(V, { dark: 1 });
      const g = wd(6, 0).s;
      V.layer(1, 0, (k) => {
        const e = eo(clamp((t - g) / 1.2));
        for (let i = 0; i < 5; i++) {
          const a = clamp(e * 3 - i * 0.6);
          k.globalAlpha = 0.9 * a;
          arrowChalk(k, 780 + i * 90 * Math.sin(i * 2.1), 700 - i * 110, -0.7 + i * 0.12);
          k.globalAlpha = 1;
        }
      });
      rain(V, t, { a: 0.3 });
    },
    cues: [[wd(6, 1).s, 'type', { gain: 0.4 }], [wd(6, 3).s, 'type', { gain: 0.4 }]] });

  add({ id: 'S08', at: L(7).start, note: 'beat: rain on the route', card: true,
    draw(c, V, lt, t) { street(V, { dark: 1, lampOn: 1 }); rain(V, t, { a: 0.7 }); },
    cues: [[L(7).start, 'night', { dur: 0.8, gain: 0.5 }]] });

  add({ id: 'S09', at: cut(8), note: 'somebody had walked this route before us', cam: { x: 960, y: 460, w: 1920, push: 0.035, pushDur: 2.4, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 1, arrows: [[520, 700, -0.4], [880, 695, -0.38], [1240, 700, -0.42]] });
      rain(V, t, { a: 0.4 });
    },
    over(c, lt, t) { pill(c, 'NOT THE FIRST', W / 2, PIC.y + PIC.h * 0.82, pop(t, wd(8, 2).s), { size: 30 }); },
    cues: [[cut(8), 'whoosh', { gain: 0.5 }]] });

  add({ id: 'S10', at: cut(9), note: 'the arrow knew our names', cam: { x: 960, y: 420, w: 1500, pw: 900, py: 400 },
    draw(c, V, lt, t) {
      facade(V, { dark: 1 });
      V.layer(1, 0, (k) => {
        const g2 = Math.max(0, 0.5 + 0.5 * Math.sin(t * 2.4));
        k.fillStyle = rgrad(k, 1250, 470, 20, 400, [[0, `rgba(200,225,255,${0.35 * g2})`], [1, 'rgba(200,225,255,0)']]);
        k.fillRect(850, 150, 800, 640);
      });
      V.layer(1, 0, (k) => arrowChalk(k, 1250, 470, -0.5));
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[wd(9, 2).s, 'blip'], [cut(9), 'swell', { dur: 1.6, gain: 0.5 }]] });

  // ---- THE GATE ----
  add({ id: 'S11', at: cut(10), note: 'the gate waited', cam: { x: 960, y: 500, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      waterTower(V, { dark: 1, open: 0 });
      rain(V, t, { a: 0.4 });
      V.chars(1, 0, MOON, (k) => { hero(k, { x: 700, dir: 1, h: 360, y: FLOOR, face: { expr: 'calm', t, seed: 3, look: 1 } }); });
    },
    cues: [[cut(10), 'step'], [cut(10) + 0.4, 'step']] });

  add({ id: 'S12', at: cut(11), note: 'a padlock, and a key balanced on top', cam: { x: 960, y: 470, w: 1300, pw: 820, py: 500 },
    draw(c, V, lt, t) {
      waterTower(V, { dark: 1, open: 0, dof: 7 });
      const g = wd(11, 0).s - 1.2;
      V.layer(1, 0, (k) => {
        const e = eo(clamp((t - g) / 0.5));
        k.fillStyle = '#8d94a0'; rr(k, 900, 540, 190, 150, 22); k.fill();
        k.fillStyle = '#0d0f14'; circ(k, 950, 570, 34); k.fill();
        k.strokeStyle = '#c9b04f'; k.lineWidth = 16; k.lineCap = 'round';
        k.beginPath(); k.moveTo(1005, 500 + 24 * (1 - e)); k.lineTo(1040, 470 + 24 * (1 - e)); k.stroke();
        circ(k, 1050, 466 + 24 * (1 - e), 15); k.fillStyle = '#c9b04f'; k.fill();
        if (e > 0.85) { k.globalAlpha = (e - 0.85) * 6; k.fillStyle = 'rgba(255,228,175,0.35)'; k.fillRect(920, 600, 150, 4); k.globalAlpha = 1; }
      });
    },
    cues: [[wd(11, 0).s, 'click'], [wd(11, 2).s, 'blip']] });

  add({ id: 'S13', at: L(12).start, note: 'beat: tower legs', card: true,
    draw(c, V, lt) { waterTower(V, { dark: 1, open: 1 }); },
    cues: [[L(12).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S14', at: cut(13), note: 'Glitch: third stair is loose', cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      let n = 0; const parts = MSG5.split(' '); let acc = 0;
      const m5 = T.words.filter((w) => w.line === 13);
      m5.forEach((w, i) => { acc += (parts[i] || '').length + 1; if (t >= w.s) n = Math.min(MSG5.length, Math.round(acc - 1 - (1 - clamp((t - w.s) / Math.max(0.05, w.e - w.s))) * (parts[i] || '').length)); });
      phone(V, { time: '4:07', glow: 1, notif: clamp((t - wd(13, 0).s) / 0.25, 0, 1), from: 'UNKNOWN', typed: n, msg: MSG5 });
    },
    cues: T.words.filter((w) => w.line === 13).map((w) => [w.s, 'type']) });

  add({ id: 'S15', at: cut(14), note: "don't ask a message how it knows", cam: { x: 960, y: 480, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 1, dof: 6 });
      V.layer(1, 0, (k) => { k.fillStyle = rgrad(k, 1500, 520, 30, 420, [[0, 'rgba(140,180,255,0.28)'], [1, 'rgba(140,180,255,0)']]); k.fillRect(1100, 100, 900, 900); });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(14), 'swell', { dur: 1.8, gain: 0.5 }]] });

  // ---- UP THE TOWER ----
  add({ id: 'S16', at: cut(15), note: 'you just test the third step', cam: { x: 960, y: 430, w: 1500, pw: 900, py: 430 },
    draw(c, V, lt, t) {
      stairwell(V, { dark: 1, lantern: [960, 520], marks: [[700, 640, '1'], [860, 520, '2'], [1040, 410, '3']] });
      const s = wd(15, 5).s;
      const jig = t > s ? Math.sin((t - s) * 26) * 7 * Math.exp(-(t - s) * 3) : 0;
      const step = clamp((t - s) / 0.6, 0, 1) * 40;
      V.chars(1, 0, MOON, (k) => {
        hero(k, { x: 980 + step * 0.5, dir: 1, h: 330, y: FLOOR - 40, bob: jig, feet: [[940, FLOOR - 40 - jig], [1000 + step, FLOOR - 58 - jig]], face: { expr: 'worried', t, seed: 4, look: 0 } });
      });
    },
    cues: [[wd(15, 4).s, 'squeak'], [wd(15, 5).s, 'step']] });

  add({ id: 'S17', at: cut(16), note: 'buckets filled like sleeping dogs', cam: { x: 960, y: 470, w: 1920, pw: 1000 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 1 });
      V.layer(1, 0, (k) => {
        for (let i = 0; i < 3; i++) {
          const e = eo(clamp((t - wd(16, 1).s - i * 0.35) / 0.5));
          const bx = 640 + i * 240, wgt = 150 - 40 * e;
          k.fillStyle = '#5c6472'; poly(k, [bx, 760 - wgt, bx + 200, 760 - wgt, bx + 176, 760, bx + 24, 760]); k.fill();
          k.fillStyle = `rgba(95,176,214,${0.85 * e})`; k.fillRect(bx + 22, 760 - 10 - 130 * e, 156, 10 + 130 * e);
          k.strokeStyle = '#6a7181'; k.lineWidth = 10; k.beginPath(); k.arc(bx + 100, 760 - 10 - 130 * e, 84, Math.PI, 0); k.stroke();
        }
      });
    },
    cues: [[wd(16, 1).s, 'water', { dur: 1.6 }], [wd(16, 1).s + 0.4, 'water', { dur: 1.4 }], [wd(16, 7).s, 'cloth', { gain: 0.5 }]] });

  add({ id: 'S18', at: cut(17), note: 'on the roof ladder, hands passed them down', cam: { x: 960, y: 420, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      waterTower(V, { dark: 1, open: 1, dof: 4 });
      V.layer(1, 0, (k) => {
        for (let i = 0; i < 3; i++) {
          const ph = clamp((t - wd(17, 4).s) * 1.1 - i / 3);
          if (ph <= 0 || ph >= 1) continue;
          const gx = 965 - 60 + 120 * Math.sin(i * 2.4), gy = 300 + ph * 400;
          glove(k, gx, gy, 1.3, Math.sin(i * 2.4) * 0.4, 0.5);
          k.fillStyle = 'rgba(95,176,214,0.7)'; rr(k, gx - 24, gy + 20, 48, 42, 8); k.fill();
        }
        k.strokeStyle = '#6a7181'; k.lineWidth = 10;
        k.beginPath(); k.moveTo(960, 220); k.lineTo(1030, 700); k.stroke();
        for (let y = 260; y < 700; y += 44) { k.beginPath(); k.moveTo(960, y); k.lineTo(1030, y); k.stroke(); }
      });
    },
    cues: [[wd(17, 4).s, 'step'], [wd(17, 6).s, 'step'], [wd(17, 6).s + 0.4, 'step']] });

  add({ id: 'S19', at: cut(18), note: 'pennies and winning', cam: { x: 960, y: 470, w: 1200, pw: 760, py: 480 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 1 });
      V.layer(1, 0, (k) => {
        k.fillStyle = '#eef2f8'; rr(k, 880, 480, 150, 290, 34); k.fill();
        k.fillStyle = 'rgba(95,176,214,0.85)';
        const e = eio(clamp((t - wd(18, 3).s) / 1.2));
        rr(k, 892, 800 - 300 * e, 126, 300 * e, 24); k.fill();
        k.fillStyle = 'rgba(190,215,255,0.5)'; rr(k, 902, 482, 18, 286, 12); k.fill();
        if (t > wd(18, 3).s + 0.8) { k.globalAlpha = 0.5 + 0.4 * Math.sin(t * 4); k.fillStyle = '#c9b04f'; circ(k, 950, 520 + 260 * e, 9); k.fill(); k.globalAlpha = 1; }
      });
    },
    cues: [[wd(18, 3).s, 'water', { dur: 1.2, gain: 0.8 }]] });

  add({ id: 'S20', at: L(19).start, note: 'beat', card: true,
    draw(c, V, lt) { waterTower(V, { dark: 1, open: 1 }); },
    cues: [[L(19).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  // ---- THE VALVE ----
  add({ id: 'S21', at: cut(20), note: 'then we saw the valve wheel', cam: { x: 960, y: 430, w: 1500, push: 0.045, pushDur: 2.0, px: 960, pw: 860, py: 500 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 1 });
      valveWheel(c, 960, 560, 0, 0, t);
      pill(c, 'THE VALVE', 1330, 300, pop(t, wd(20, 3).s), { size: 30, bg: PAL.red });
    },
    cues: [[wd(20, 3).s, 'whoosh', { gain: 0.7 }]] });

  add({ id: 'S22', at: cut(21), note: 'fresh oil on the threads', cam: { x: 880, y: 430, w: 1300, push: 0.04, pushDur: 2.0, pw: 800, py: 500 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 1 });
      valveWheel(c, 960, 560, 0, clamp((t - wd(21, 1).s) / 0.5), t);
      V.layer(1, 0, (k) => {
        if (t < wd(21, 1).s) return;
        for (let i = 0; i < 5; i++) {
          const a2 = -0.6 + i * 0.25, gx = 960 + Math.cos(a2) * 118, gy = 560 + Math.sin(a2) * 118;
          k.fillStyle = `rgba(255,228,140,${0.5 + 0.4 * Math.sin(t * 3 + i * 2)})`;
          circ(k, gx, gy, 5); k.fill();
        }
      });
    },
    cues: [[wd(21, 1).s, 'blip'], [wd(21, 3).s, 'type', { gain: 0.4 }]] });

  const g = wd(22, 2).s;
  add({ id: 'S23', at: cut(22), note: 'it was warm', cam: { x: 960, y: 430, w: 1500, pw: 900, py: 480 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 1 });
      valveWheel(c, 960, 560, 0, 1, t);
      V.chars(1, 0, LAMP, (k) => { glove(k, 1010, 548, 2.4, -0.9, 0.6); });
      const e = eo(clamp((t - g) / 0.5));
      if (e > 0) {
        V.layer(1, 0, (k) => {
          k.fillStyle = rgrad(k, 960, 560, 30, 420 * e, [[0, 'rgba(255,170,90,0.4)'], [1, 'rgba(255,170,90,0)']]);
          k.fillRect(560, 200, 800, 760);
        });
      }
      pill(c, 'WARM', 480, 340, pop(t, g), { size: 36, bg: PAL.red });
    },
    look: () => ({ tint: '#4a2c38', tintA: 0.3 }),
    cues: [[g, 'heart', { gain: 0.7 }], [g + 0.4, 'heart', { gain: 0.5 }]] });

  add({ id: 'S24', at: L(23).start, note: 'beat', card: true,
    draw(c, V, lt) { wallFloor(c, { dark: 1 }); valveWheel(c, 960, 560, 0, 1, lt); },
    look: () => ({ tint: '#4a2c38', tintA: 0.25 }),
    cues: [[L(23).start, 'night', { dur: 0.8, gain: 0.5 }]] });

  add({ id: 'S25', at: cut(24), note: 'warm on day 31 of no machines', cam: { x: 960, y: 420, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 1, carShape: [340] });
      rain(V, t, { a: 0.3 });
    },
    over(c, lt, t) { stamp(c, 'DAY 31 · NO MACHINES', pop(t, wd(24, 2).s)); },
    cues: [[cut(24), 'step'], [cut(24) + 0.4, 'step']] });

  add({ id: 'S26', at: cut(25), note: 'the pipes ran anyway', cam: { x: 960, y: 430, w: 1500, push: 0.035, pushDur: 2.2, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 1 });
      const g = wd(25, 2).s;
      const spin = t > g ? (t - g) * 1.6 : 0;
      valveWheel(c, 960, 560, spin, 1, t);
      V.layer(1, 0, (k) => {
        k.strokeStyle = 'rgba(190,215,255,0.5)'; k.lineWidth = 8;
        for (let i = 0; i < 3; i++) { const ph = ((t * 1.2 + i / 3) % 1); k.beginPath(); k.moveTo(640 + ph * 120, 470); k.lineTo(760 + ph * 120, 470); k.stroke(); }
      });
    },
    cues: [[wd(25, 2).s, 'hum', { dur: 2.0, gain: 0.7 }], [wd(25, 2).s, 'click']] });

  add({ id: 'S27', at: cut(26), note: 'our chalk X looked brighter', cam: { x: 960, y: 460, w: 1500, push: 0.03, pushDur: 2.0, pw: 900, py: 500 },
    draw(c, V, lt, t) {
      hallway(V, { dark: 1, dof: 4 });
      const g = wd(26, 4).s;
      V.layer(1, 0, (k) => {
        const b = 0.5 + 0.5 * clamp((t - g) / 1.0);
        k.strokeStyle = `rgba(255,228,175,${0.55 + 0.4 * b})`;
        k.lineWidth = 16 + 6 * b; k.lineCap = 'round'; k.shadowColor = 'rgba(255,228,175,0.6)'; k.shadowBlur = 30 * b;
        k.beginPath(); k.moveTo(880, 420); k.lineTo(1040, 580); k.moveTo(1040, 420); k.lineTo(880, 580); k.stroke();
        k.shadowBlur = 0;
      });
    },
    cues: [[wd(26, 4).s, 'blip'], [cut(26), 'swell', { dur: 1.6, gain: 0.5 }]] });

  add({ id: 'S28', at: cut(27), note: "Glitch: you're welcome", cam: { x: 960, y: 470, w: 900, pw: 640, py: 480 },
    draw(c, V, lt, t) {
      let n = 0; const m6 = T.words.filter((w) => w.line === 27);
      m6.forEach((w, i) => { if (t >= w.s) n = t < w.e ? Math.round(w.w.length * clamp((t - w.s) / Math.max(0.05, w.e - w.s))) : 9999; });
      phone(V, { time: '4:29', glow: 1, notif: clamp((t - wd(27, 0).s) / 0.25, 0, 1), from: 'UNKNOWN', typed: n, msg: MSG6 });
    },
    cues: [[wd(27, 0).s, 'buzz'], [wd(27, 1).s, 'type'], [wd(27, 1).s + 0.4, 'blip']] });

  add({ id: 'S29', at: L(28).start, note: 'beat', card: true,
    draw(c, V, lt) { hallway(V, { dark: 1 }); },
    cues: [[L(28).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  // ---- THE QUESTION ----
  add({ id: 'S30', at: cut(29), note: 'a machine that oils valves', cam: { x: 960, y: 420, w: 1920, push: 0.045, pushDur: 2.4, px: 930, pw: 1000 },
    draw(c, V, lt, t) {
      stairwell(V, { dark: 1, lantern: [960, 560] });
      V.layer(1, 0, (k) => {
        k.save(); k.translate(1400, 620); k.scale(-1, 1);
        k.fillStyle = 'rgba(13,15,20,0.92)';
        poly(k, [-120, 160, 120, 160, 150, -60, -150, -60]); k.fill();
        rr(k, -90, -140, 180, 80, 20); k.fill();
        k.strokeStyle = 'rgba(13,15,20,0.92)'; k.lineWidth = 22;
        circ(k, 0, -190, 46); k.stroke();
        for (let i = 0; i < 3; i++) { const a2 = -0.2 + i * 0.5 + t; k.beginPath(); k.moveTo(Math.cos(a2 + 0) * 46, -190 + Math.sin(a2) * 46); k.lineTo(Math.cos(a2 + 0.3) * 90, -190 + Math.sin(a2 + 0.3) * 90); k.stroke(); }
        k.restore();
      });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[wd(29, 2).s, 'click'], [cut(29), 'swell', { dur: 1.8, gain: 0.5 }]] });

  add({ id: 'S31', at: cut(30), note: 'or a neighbor with far too much love', cam: { x: 960, y: 460, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 1, lampOn: 1, carShape: [340] });
      V.chars(1, 0, LAMP, (k) => {
        pal(k, { x: 1240, dir: -1, h: 360, y: FLOOR, lean: -0.06, hands: [[1190, 560], [1235, 545]], face: { expr: 'calm', t, seed: 6, look: -1 } });
        k.fillStyle = '#8a7a5a'; rr(k, 1170, 585, 44, 60, 10); k.fill();
      });
      V.layer(1, 0, (k) => { k.fillStyle = rgrad(k, 1240, 600, 30, 420, [[0, 'rgba(255,228,160,0.4)'], [1, 'rgba(255,228,160,0)']]); k.fillRect(940, 300, 640, 620); });
    },
    cues: [[cut(30), 'whoosh', { gain: 0.5 }], [wd(30, 7).s, 'heart', { gain: 0.5 }]] });

  add({ id: 'S32', at: cut(31), note: 'the question climbed our stairs', cam: { x: 960, y: 430, w: 1500, push: 0.045, pushDur: 2.4, pw: 900, py: 430 },
    draw(c, V, lt, t) {
      stairwell(V, { dark: 1, lantern: [960, 560] });
      const g = wd(31, 1).s;
      V.chars(1, 0, MOON, (k) => { const w1 = walk(t, 700, 150, 1, 380, FLOOR); hero(k, { x: w1.x, dir: 1, h: 380, feet: w1.feet, bob: w1.bob, face: { expr: 'worried', t, seed: 7, look: 0 } }); });
    },
    cues: [[cut(31), 'step'], [cut(31) + 0.42, 'step'], [cut(31) + 0.84, 'step']] });

  add({ id: 'S33', at: cut(32), note: 'if it can turn the water off, it can turn us off', cam: { x: 960, y: 430, w: 1300, pw: 820, py: 500 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 1 });
      faucetMini(c, t);
      const g = wd(32, 7).s;
      V.chars(2, 0, MOON, (k) => {
        const e = eo(clamp((t - g) / 0.5));
        if (!e) return;
        k.strokeStyle = `rgba(210,70,60,${0.85 * e})`; k.lineWidth = 20; k.lineCap = 'round';
        k.beginPath(); k.moveTo(640 + 120 * (1 - e), 300 + 120 * (1 - e)); k.lineTo(880 - 120 * (1 - e), 540 - 120 * (1 - e)); k.stroke();
        k.beginPath(); k.moveTo(880 - 120 * (1 - e), 300 + 120 * (1 - e)); k.lineTo(640 + 120 * (1 - e), 540 - 120 * (1 - e)); k.stroke();
      });
    },
    look: () => ({ tint: '#3a1e28', tintA: 0.3 }),
    cues: [[wd(32, 5).s, 'pumpstop'], [wd(32, 7).s, 'pumpstop', { gain: 0.7 }]] });

  add({ id: 'S34', at: L(33).start, note: 'beat', card: true,
    draw(c, V, lt) { wallFloor(c, { dark: 1 }); faucetMini(c, lt); },
    look: () => ({ tint: '#3a1e28', tintA: 0.25 }),
    cues: [[L(33).start, 'night', { dur: 0.7, gain: 0.5 }]] });

  add({ id: 'S35', at: cut(34), note: 'but it also turned the water on', cam: { x: 960, y: 430, w: 1300, push: 0.04, pushDur: 2.0, pw: 820, py: 480 },
    draw(c, V, lt, t) {
      wallFloor(c, { dark: 1 });
      faucetMini(c, t, { on: t > wd(34, 5).s - 1.2 });
      V.chars(1, 0, MOON, (k) => {
        const e = eo(clamp((t - wd(34, 5).s) / 0.5));
        if (!e) return;
        k.fillStyle = rgrad(k, 1250, 480, 20, 380 * e, [[0, 'rgba(140,220,160,0.35)'], [1, 'rgba(140,220,160,0)']]);
        k.fillRect(950, 200, 640, 640);
      });
    },
    cues: [[wd(34, 5).s, 'water', { dur: 1.6, gain: 0.9 }]] });

  add({ id: 'S36', at: cut(35), note: "that's the part nobody said out loud", cam: { x: 960, y: 420, w: 1920, push: 0.03, pushDur: 2.0, px: 960, pw: 1000 },
    draw(c, V, lt, t) {
      street(V, { dark: 1, lampOn: 1, arrows: [[620, 700, -0.4]] });
      rain(V, t, { a: 0.5 });
      V.chars(1, 0, MOON, (k) => { hero(k, { x: 940, dir: -1, h: 360, y: FLOOR, face: { expr: 'calm', t, seed: 8, look: -1 } }); });
    },
    look: () => ({ tint: '#1c2438', tintA: 0.3 }),
    cues: [[cut(35), 'swell', { dur: 1.8, gain: 0.7 }]] });

  // ---- END CARD ----
  const endT = L(35).end + 0.4;
  add({ id: 'END', at: endT, card: true, note: 'end card', end: endT + 3.6,
    draw(c, V, lt) {
      navyBg(c, lt, { cy: 0.62 });
      const k = eo(lt / 0.4);
      c.save(); c.globalAlpha = k;
      const s1 = fit(c, 'WHO OILS THE VALVES?', 62 * U, W * 0.84);
      goldText(c, 'WHO OILS THE VALVES?', W / 2, H * (PORTRAIT ? 0.36 : 0.30), s1, { col: '#f3ecdf', glow: 'rgba(255,255,255,0.25)', ls: 0.05 });
      goldText(c, 'PART 4', W / 2, H * (PORTRAIT ? 0.44 : 0.46), 110 * U * (0.9 + 0.1 * eback(clamp((lt - 0.4) / 0.3))));
      c.globalAlpha = k * 0.25; c.fillStyle = '#efe6d6'; c.font = `300 ${26 * U}px Nunito`; c.textAlign = 'center';
      c.fillText('WHAT IF THE INTERNET WENT OFF? · PART 3 OF 8', W / 2, H * (PORTRAIT ? 0.12 : 0.14));
      c.globalAlpha = k;
      c.fillStyle = '#7fd17a'; c.save(); c.shadowColor = '#7fd17a'; c.shadowBlur = 24 * U; circ(c, W / 2, H * (PORTRAIT ? 0.28 : 0.24), 9 * U * (0.6 + 0.4 * hash(Math.floor(lt * 6) + 3))); c.fill(); c.restore();
      c.restore();
    },
    cues: [[endT, 'whoosh'], [endT + 0.4, 'land']] });

  return S;
}

// ---------- custom props ----------

/** valve wheel on pipe: spin (rad), oil 0..1 */
function valveWheel(k, x, y, spin, oil, t) {
  k.save(); k.translate(0, 0);
  k.fillStyle = '#4c515e'; rr(k, x - 40, y - 240, 80, 500, 18); k.fill();
  k.fillStyle = '#5a6472'; rr(k, x - 90, y - 40, 180, 200, 22); k.fill();
  k.save(); k.translate(x, y - 40); k.rotate(spin);
  k.strokeStyle = '#8d94a0'; k.lineWidth = 30; k.lineCap = 'round';
  circ(k, 0, 0, 118); k.stroke();
  for (let i = 0; i < 4; i++) {
    const a2 = i * Math.PI / 2 + Math.PI / 4;
    k.beginPath(); k.moveTo(0, 0); k.lineTo(Math.cos(a2) * 118, Math.sin(a2) * 118); k.stroke();
  }
  k.fillStyle = '#a7aeb9'; circ(k, 0, 0, 42); k.fill();
  k.fillStyle = '#6a7181'; circ(k, 0, 0, 18); k.fill();
  if (oil > 0) {
    k.globalAlpha = 0.7 * oil; k.fillStyle = '#e8b04a';
    k.beginPath(); k.arc(0, 0, 118, -2.5, -1.4); k.stroke();
    k.globalAlpha = 1;
  }
  k.restore(); k.restore();
}

/** kitchen faucet close-up with running/drip water */
function faucetMini(k, t, o = {}) {
  k.fillStyle = '#b9bcc2'; rr(k, 880, 420, 60, 240, 18); k.fill();
  k.save(); k.translate(910, 420); k.rotate(-0.5); k.fillStyle = '#b9bcc2'; rr(k, -14, -190, 130, 34, 17); k.fill();
  k.fillStyle = '#8d94a0'; rr(k, 96, -210, 34, 70, 14); k.fill(); k.restore();
  k.fillStyle = '#e6e2d8'; circ(k, 910, 436, 16); k.fill();
  k.fillStyle = '#9aa3ad'; rr(k, 700, 640, 560, 60, 12); k.fill();
  k.fillStyle = '#16181f'; rr(k, 500, 640, 220, 180, 14); k.fill(); rr(k, 1220, 640, 220, 180, 14); k.fill();
  k.fillStyle = '#0d0f14'; rr(k, 508, 648, 204, 164, 10); k.fill(); rr(k, 1228, 648, 204, 164, 10); k.fill();
  if (o.on) {
    k.strokeStyle = 'rgba(95,176,214,0.85)'; k.lineWidth = 16; k.lineCap = 'round';
    k.beginPath(); k.moveTo(1040, 470); k.quadraticCurveTo(1046, 540, 1038, 640); k.stroke();
    k.fillStyle = 'rgba(95,176,214,0.7)'; k.fillRect(920, 618, 260, 24);
  } else for (let i = 0; i < 2; i++) { const ph = ((t * 1.4 + i / 2) % 1); if (ph > 0.85) continue; k.fillStyle = 'rgba(95,176,214,0.85)'; circ(k, 1038, 470 + ph * 170, 7); k.fill(); }
}
