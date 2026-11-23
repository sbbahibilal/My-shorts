// WORLDS (PARTS 2-8): outside locations + new rooms, one file, param-driven. Same flat rules as rooms.js:
// world 1920x960 at zoom 1, FLOOR = 780, overdraw far beyond the frame so 9:16 never sees an edge.
// Every painter takes V (view) + o options, and draws layers with depth; camera does the blocking.
import { PAL, rr, poly, circ, vgrad, rgrad, mixc, lerp, clamp, hash, TAU } from '../core/lib.js';
import { FLOOR } from '../sets/rooms.js';
const M = (a, b, k) => mixc(a, b, k);

/** STREET at dusk/night, dead. o: dark, rain, arrows (chalk), hearts (chalk), fridgeGlow, lampOn, traffic */
export function street(V, o = {}) {
  const k = clamp(o.dark ?? 1);
  V.layer(4, o.dof ?? 6, (c) => {
    c.fillStyle = vgrad(c, 0, -800, 1000, [[0, M('#101830', '#080d1c', k)], [0.7, M('#2b3a60', '#131c33', k)], [1, M('#3c4a76', '#1a2440', k)]]);
    c.fillRect(-1400, -1200, 4720, 2600);
    for (let i = 0; i < 16; i++) {
      const bw = 150 + hash(i) * 200, bx = -900 + i * 230 + hash(i + 2) * 50, bh = 300 + hash(i + 6) * 700, by = 760 - bh;
      c.fillStyle = i % 2 ? M('#141c33', '#0d1322', k) : M('#182142', '#0f1626', k);
      c.fillRect(bx, by, bw, bh + 800);
      c.fillStyle = 'rgba(190,205,240,0.10)';
      for (let r = 0; r < bh / 60; r++) for (let q = 0; q < bw / 44; q++) c.fillRect(bx + 16 + q * 44, by + 20 + r * 60, 22, 26);
      if (o.litWnd?.[i]) { c.fillStyle = 'rgba(255,205,120,0.8)'; c.fillRect(bx + 30, by + 40, 26, 20); c.fillRect(bx + bw - 60, by + 100, 26, 20); }
    }
  });
  V.layer(1, 0, (c) => {
    const road = 760;
    c.fillStyle = M('#23242c', '#141519', k); c.fillRect(-1400, road, 4720, 1400);
    c.fillStyle = M('#e6e2d8', '#3a3d47', k); for (let x = -1200; x < 3400; x += 260) c.fillRect(x, road + 190, 150, 10);
    c.fillStyle = M('#b9b2a2', '#2e3140', k); c.fillRect(-1400, road - 6, 4720, 6);
    // sidewalk + parked cars (silhouettes)
    c.fillStyle = M('#4a4c55', '#26282f', k); c.fillRect(-1400, road - 120, 4720, 120);
    (o.carShape ?? []).forEach((cx) => {
      c.fillStyle = M('#3b4252', '#1c1f28', k); rr(c, cx - 180, road - 210, 360, 130, 34); c.fill();
      c.fillStyle = M('#5a6478', '#252a36', k); rr(c, cx - 110, road - 300, 220, 110, 30); c.fill();
      c.fillStyle = M('#171b26', '#101320', k); circ(c, cx - 100, road - 74, 40); c.fill(); circ(c, cx + 100, road - 74, 40); c.fill();
    });
    if (o.fridgeGlow) {
      c.fillStyle = M('#2f5b3f', '#1d3a2a', k); c.fillRect(1560, 360, 260, 400);
      c.fillStyle = rgrad(c, 1690, 520, 30, 420, [[0, 'rgba(180,255,210,0.5)'], [1, 'rgba(180,255,210,0)']]); c.fillRect(1360, 200, 700, 700);
      c.fillStyle = 'rgba(210,255,225,0.9)'; c.fillRect(1596, 396, 190, 150);
    }
    if (o.lampOn) { c.fillStyle = rgrad(c, 700, 180, 20, 500, [[0, 'rgba(255,220,150,0.5)'], [1, 'rgba(255,220,150,0)']]); c.fillRect(300, 0, 800, 760); }
    if (o.arrows) for (const [ax, ay, ang] of o.arrows) arrowChalk(c, ax, ay, ang);
  });
}

/** RAIN overlay: slanted streaks + street shimmer. Separate layer so shots can switch it on. */
export function rain(V, t, o = {}) {
  const a = clamp(o.a ?? 1);
  V.layer(0.5, 0, (c) => {
    c.strokeStyle = `rgba(190,215,255,${0.35 * a})`; c.lineWidth = 3.5; c.lineCap = 'round';
    for (let i = 0; i < 26; i++) {
      const sp = 900 + hash(i) * 500, x = (hash(i * 3) * 3600 - 800 + ((t * sp) % 3400)) % 3400 - 500;
      const y = hash(i * 7) * 1100 + ((t * (900 + hash(i) * 500)) % 1300) - 200;
      c.beginPath(); c.moveTo(x, y); c.lineTo(x - 12, y + 64); c.stroke();
    }
    c.strokeStyle = `rgba(190,215,255,${0.10 * a})`; c.lineWidth = 6;
    for (let i = 0; i < 8; i++) { const px = 200 + i * 240 + Math.sin(t * 2 + i) * 30, py = 900 + hash(i) * 200; c.beginPath(); c.ellipse(px, py, 70, 10, 0, 0, TAU); c.stroke(); }
  });
}

/** STAIRWELL going up or down: concrete well, zigzag stringers, handrail, lantern pool. o: {up, dark, marks} */
export function stairwell(V, o = {}) {
  const k = clamp(o.dark ?? 1), up = clamp(o.up ?? 1);
  V.layer(3, o.dof ?? 5, (c) => {
    c.fillStyle = vgrad(c, 0, -1200, 1200, [[0, M('#232732', '#14161e', k)], [1, M('#3a404e', '#1d2129', k)]]);
    c.fillRect(-1400, -1200, 4720, 2800);
  });
  V.layer(1, 0, (c) => {
    const n = 7;
    for (let i = 0; i < n; i++) {
      const y = 1060 - i * 150 - up * 0;                    // landing stack, top small
      const w = 2200 - i * 240, x = 960 - w / 2;
      c.fillStyle = M(i % 2 ? '#3f4551' : '#484f5c', M('#262b34', '#15181f', k), i / n * 0.25);
      poly(c, [x, y, x + w, y, x + w - 160, y - 92, x + 160, y - 92]); c.fill();
      c.fillStyle = 'rgba(0,0,0,0.16)'; poly(c, [x + 160, y - 92, x + w - 160, y - 92, x + w - 210, y - 122, x + 210, y - 122]); c.fill();
    }
    // handrail (two flights)
    c.strokeStyle = M('#8c9199', '#565b66', k); c.lineWidth = 26; c.lineCap = 'round';
    c.beginPath(); c.moveTo(180, 300); c.quadraticCurveTo(500, 220, 760, 280); c.lineTo(1160, 240); c.stroke();
    c.lineWidth = 18; c.beginPath(); c.moveTo(400, 300); c.lineTo(410, 940); c.stroke();
    // landing door + chute of light
    c.fillStyle = M('#5b3d2d', '#2b2530', k); c.fillRect(60, 300, 190, 560);
    c.fillStyle = 'rgba(255,228,175,0.16)'; poly(c, [250, 320, 500, 560, 500, 880, 250, 860]); c.fill();
    if (o.marks) for (const [mx, my, ch] of o.marks) chalkTxt(c, ch, mx, my, 30);
    if (o.lantern) { const gx = o.lantern[0], gy = o.lantern[1]; c.fillStyle = rgrad(c, gx, gy, 20, 420, [[0, 'rgba(255,225,160,0.55)'], [1, 'rgba(255,225,160,0)']]); c.fillRect(gx - 500, gy - 500, 1000, 1000); }
  });
}

/** WATER TOWER on a roof, seen from the street below. o: {moon, open, bucketLine, chalk} */
export function waterTower(V, o = {}) {
  const k = clamp(o.dark ?? 1);
  V.layer(3, o.dof ?? 5, (c) => {
    c.fillStyle = vgrad(c, 0, -800, 1100, [[0, '#0a1024'], [1, '#233458']]); c.fillRect(-1400, -1200, 4720, 2800);
    c.fillStyle = 'rgba(235,240,255,0.9)'; circ(c, 400, 140, 40); c.fill();
    for (let i = 0; i < 10; i++) { const bx = -900 + i * 330, bh = 400 + hash(i + 4) * 500; c.fillStyle = M('#131a30', '#0d1220', k); c.fillRect(bx, 760 - bh, 200, bh + 800); }
  });
  V.layer(1, 0, (c) => {
    // roof slab + legs + tank
    c.fillStyle = M('#2b2f3a', '#191c25', k); c.fillRect(480, 700, 1000, 90);
    c.strokeStyle = M('#5a6072', '#3a4050', k); c.lineWidth = 26;
    c.beginPath(); c.moveTo(600, 700); c.lineTo(660, 330); c.moveTo(1340, 700); c.lineTo(1280, 330); c.moveTo(830, 700); c.lineTo(860, 335); c.moveTo(1120, 700); c.lineTo(1090, 335); c.stroke();
    c.lineWidth = 12; for (let i = 0; i < 3; i++) { const y = 380 + i * 110; c.beginPath(); c.moveTo(620 + i * 20, y); c.lineTo(1320 - i * 20, y); c.stroke(); }
    c.fillStyle = M('#7d8797', '#4a5162', k); rr(c, 640, 210, 680, 210, 60); c.fill();
    c.fillStyle = M('#98a3b3', '#5a6173', k); rr(c, 640, 210, 680, 60, 40); c.fill();
    c.fillStyle = 'rgba(95,176,214,0.85)'; rr(c, 700, 290, 560, 60, 26); c.fill();
    c.fillStyle = '#dfe6f2'; c.font = '800 34px Nunito'; c.textAlign = 'center'; c.fillText('WATER', 980, 336);
    // ladder
    c.strokeStyle = M('#b8bec9', '#6a7181', k); c.lineWidth = 10;
    c.beginPath(); c.moveTo(940, 220); c.lineTo(940, 700); c.moveTo(990, 220); c.lineTo(990, 700); c.stroke();
    for (let y = 260; y < 700; y += 44) { c.beginPath(); c.moveTo(940, y); c.lineTo(990, y); c.stroke(); }
    // walkway/door at street level
    c.fillStyle = M('#3c4250', '#232732', k); c.fillRect(560, 790, 220, 260); c.fillRect(575, 805, 190, 245);
    if (o.open) { c.fillStyle = 'rgba(255,228,175,0.5)'; c.fillRect(590, 820, 70, 215); }
    if (o.chalk) { c.strokeStyle = 'rgba(238,235,220,0.9)'; c.lineWidth = 7; for (let i = 0; i < 3; i++) chalkTxt(c, o.chalk[i], 1150, 850 + i * 60, 34); }
  });
}

/** DISPATCHER'S FLAT: breaker board wall, city maps, radio rig + dead laptop. o: {on, radioOn, wave, redLine} */
export function dispatcherFlat(V, o = {}) {
  const k = clamp(o.dark ?? 0.85);
  V.layer(1, 0, (c) => {
    c.fillStyle = vgrad(c, 0, -900, FLOOR, [[0, M('#2b3145', '#181d2c', k)], [1, M('#3c4254', '#20263a', k)]]); c.fillRect(-1400, -900, 4720, 2400);
    c.fillStyle = M('#6a4c35', '#2b2530', k); c.fillRect(-1400, FLOOR, 4720, 1200);
    // breaker board
    c.fillStyle = M('#c9c2b2', '#4d5364', k); rr(c, 380, 60, 700, 420, 22); c.fill();
    for (let r = 0; r < 4; r++) for (let q = 0; q < 6; q++) {
      const on = o.on && hash(r * 17 + q) > 0.35;
      c.fillStyle = on ? '#7fd17a' : '#3a3f4a'; rr(c, 420 + q * 105, 110 + r * 88, 52, 44, 9); c.fill();
      c.fillStyle = on ? '#e9d9b5' : '#8a8f9a'; c.fillRect(430 + q * 105, 124 + r * 88, 14, 16);
    }
    // map wall
    c.fillStyle = M('#ded6c2', '#565e70', k); rr(c, 1170, 90, 480, 320, 14); c.fill();
    c.strokeStyle = M('#8a8068', '#333a4a', k); c.lineWidth = 6;
    for (let i = 0; i < 5; i++) { c.beginPath(); c.moveTo(1200, 130 + i * 60); c.bezierCurveTo(1350, 110 + i * 60, 1500, 170 + i * 60, 1620, 120 + i * 60); c.stroke(); }
    (o.pins ?? [[1300, 250], [1420, 210], [1530, 280]]).forEach(([px, py], i) => { c.fillStyle = (o.litPin ?? 0) > i ? PAL.red : '#26304a'; circ(c, px, py, 16); c.fill(); });
    // desk, radio, laptop
    c.fillStyle = M('#7b5a3e', '#3a3140', k); c.fillRect(560, 560, 1000, 90); c.fillRect(620, 650, 60, 250); c.fillRect(1440, 650, 60, 250);
    c.fillStyle = M('#b7bec6', '#4e5566', k); rr(c, 640, 420, 420, 130, 16); c.fill();
    const scr = clamp(o.wave ?? 1);
    if (scr > 0.02) {
      c.fillStyle = '#0d1218'; rr(c, 656, 434, 388, 102, 8); c.fill();
      c.strokeStyle = scr > 0.5 ? '#7fd17a' : '#3d8ca8'; c.lineWidth = 4;
      c.beginPath(); for (let x = 0; x <= 360; x += 6) { const y = 485 + Math.sin(x * 0.05 + V.lt * 3) * 22 * Math.sin(x * 0.013 + 1); if (x === 0) c.moveTo(672 + x, y); else c.lineTo(672 + x, y); } c.stroke();
      if (o.redLine) { c.strokeStyle = PAL.red; c.beginPath(); c.moveTo(1028, 436); c.lineTo(1028, 534); c.stroke(); }
    }
    // radio rig on the right
    c.fillStyle = M('#33363f', '#232732', k); rr(c, 1170, 480, 320, 84, 12); c.fill();
    for (let i = 0; i < 3; i++) { c.fillStyle = (o.radioOn && i === 0) ? '#7fd17a' : '#5a6172'; circ(c, 1210 + i * 40, 522, i ? 7 : 11); c.fill(); }
    c.fillStyle = '#e6e2d8'; c.fillRect(1350, 500, 110, 10);
    if (o.radioOn) { c.fillStyle = rgrad(c, 1330, 520, 10, 260, [[0, 'rgba(255,225,160,0.25)'], [1, 'rgba(255,225,160,0)']]); c.fillRect(1050, 300, 640, 500); }
  });
}

/** HARBOR at dusk: crane silhouettes, container stacks, dead ship. o:{dusk} */
export function harbor(V, o = {}) {
  const k = clamp(o.dark ?? 1);
  V.layer(3, o.dof ?? 5, (c) => {
    c.fillStyle = vgrad(c, 0, -800, 900, [[0, '#131c38'], [0.6, '#3c3252'], [1, '#7a4a4a']]); c.fillRect(-1400, -1200, 4720, 2600);
    c.fillStyle = 'rgba(240,230,220,0.85)'; circ(c, 1430, 220, 54); c.fill();
    for (const [cx, ch] of [[300, 480], [900, 620], [1500, 420]]) {
      c.fillStyle = M('#171e33', '#0e1322', k); c.fillRect(cx, 700 - ch, 30, ch);
      c.fillRect(cx - 20, 700 - ch, 30, 26); c.fillRect(cx - 230, 700 - ch + 40, 240, 22);
      c.strokeStyle = M('#171e33', '#0e1322', k); c.lineWidth = 6; c.beginPath(); c.moveTo(cx - 210, 700 - ch + 62); c.lineTo(cx - 40, 700 - ch + 60); c.stroke();
    }
    c.fillStyle = M('#161c2f', '#0d1120', k);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3 - i; j++) { c.fillRect(1700 + i * 150, 660 - j * 60 - 50, 140, 60); }
    c.fillStyle = M('#1a2137', '#0f1425', k); poly(c, [2000, 990, 3300, 990, 3130, 700, 2260, 700]); c.fill();
    c.fillStyle = M('#232b45', '#141a2c', k); c.fillRect(2380, 610, 420, 90);
  });
  V.layer(1, 0, (c) => {
    c.fillStyle = M('#1b2a44', '#101828', k); c.fillRect(-1400, 760, 4720, 1400);
    c.strokeStyle = 'rgba(190,215,255,0.18)'; c.lineWidth = 6;
    for (let i = 0; i < 26; i++) { const wx = -1200 + i * 190 + Math.sin(V.lt * 1.2 + i) * 26; c.beginPath(); c.moveTo(wx, 810 + ((i * 37) % 60)); c.quadraticCurveTo(wx + 60, 786 + ((i * 23) % 40), wx + 130, 812 + ((i * 13) % 50)); c.stroke(); }
    c.fillStyle = M('#2d3242', '#1c202c', k); c.fillRect(-1400, 760, 4720, 26);
  });
}

/** OLD SUBSTATION GATE at night: chain-link, transformer, warning signs, one hanging screen. o: {n countdown, screenOn, lantern} */
export function stationGate(V, o = {}) {
  const k = clamp(o.dark ?? 1);
  V.layer(2, o.dof ?? 6, (c) => {
    c.fillStyle = vgrad(c, 0, -800, 1000, [[0, '#0a0e1e'], [1, '#1e2a4a']]); c.fillRect(-1400, -1200, 4720, 2600);
    c.fillStyle = M('#1c2233', '#131828', k); c.fillRect(1020, 300, 560, 470);
    c.fillStyle = M('#39404f', '#232837', k); c.fillRect(1020, 300, 560, 60);
    c.strokeStyle = M('#4c5468', '#2f3547', k); c.lineWidth = 10; c.beginPath(); c.moveTo(1120, 340); c.lineTo(1120, 770); c.moveTo(1480, 340); c.lineTo(1480, 770); c.stroke();
    c.fillStyle = M('#8d9420', '#4a4f2c', k); rr(c, 1180, 520, 140, 90, 10); c.fill();
    c.strokeStyle = '#26304a'; c.lineWidth = 8; c.beginPath(); c.moveTo(1188, 540); c.lineTo(1312, 540); c.closePath(); c.moveTo(1250, 548); c.lineTo(1250, 596); c.stroke();
    c.fillStyle = 'rgba(190,215,255,0.10)'; c.fillRect(1020, 80, 560, 60); c.fillRect(1020, 160, 560, 60);
  });
  V.layer(1, 0, (c) => {
    c.fillStyle = M('#2b2f38', '#191c25', k); c.fillRect(-1400, 760, 4720, 1400);
    // fence: diagonal chain-link
    c.strokeStyle = `rgba(150,160,180,${0.5 * k + 0.2})`; c.lineWidth = 3.4;
    for (let x = -1400; x < 3400; x += 46) { c.beginPath(); c.moveTo(x, 300); c.lineTo(x + 300, 760); c.stroke(); c.beginPath(); c.moveTo(x + 300, 300); c.lineTo(x, 760); c.stroke(); }
    c.fillStyle = M('#565c6a', '#333a48', k); c.fillRect(-1400, 288, 4720, 16); c.fillRect(-1400, 756, 4720, 16);
    for (let px = -1300; px < 3400; px += 470) { c.fillStyle = M('#565c6a', '#333a48', k); c.fillRect(px, 270, 22, 500); }
    // hanging screen (kept ~center-right, big enough to read)
    if (o.screenOn) {
      c.save(); const gx = 960 + 40, gy = 430 + Math.sin(V.lt * 1.3) * 6; c.translate(gx, gy); c.rotate(-0.02);
      c.strokeStyle = '#3c4250'; c.lineWidth = 10; c.beginPath(); c.moveTo(0, -120); c.lineTo(0, -10); c.stroke();
      c.fillStyle = '#101319'; rr(c, -220, -10, 440, 170, 16); c.fill();
      c.fillStyle = o.n != null ? '#ff5a4a' : '#7fd17a'; c.font = '800 74px Nunito'; c.textAlign = 'center'; c.fillText(o.n != null ? String(o.n).padStart(2, '0') : 'HELLO', 0, 78);
      c.restore();
    }
    if (o.lantern) { const [lx, ly] = o.lantern; c.fillStyle = rgrad(c, lx, ly, 16, 360, [[0, 'rgba(255,225,160,0.5)'], [1, 'rgba(255,255,210,0)']]); c.fillRect(lx - 420, ly - 420, 840, 840); }
  });
}

/** RADIO ATTIC (ham): beams, lantern, ancient rig + big wire map of the city. o: {on, pins} */
export function radioAttic(V, o = {}) {
  const k = clamp(o.dark ?? 0.9);
  V.layer(1, 0, (c) => {
    c.fillStyle = vgrad(c, 0, -1000, FLOOR, [[0, M('#1d2334', '#12162a', k)], [1, M('#2c3347', '#191f30', k)]]); c.fillRect(-1400, -1000, 4720, 2400);
    c.strokeStyle = M('#4a3f33', '#2a2520', k); c.lineWidth = 44;
    c.beginPath(); c.moveTo(-1400, -140); c.lineTo(3400, -20); c.stroke();
    c.lineWidth = 30; c.beginPath(); c.moveTo(500, -800); c.lineTo(560, -140); c.moveTo(1500, -800); c.lineTo(1460, -20); c.stroke();
    c.fillStyle = M('#6a4c35', '#332b28', k); c.fillRect(-1400, FLOOR, 4720, 1200);
    // wire network on the wall
    c.strokeStyle = `rgba(127,209,122,${0.5 + 0.4 * Math.sin(V.lt * 2) * 0})`; c.lineWidth = 4;
    const pts = [[480, 220], [700, 140], [960, 240], [1210, 150], [1420, 230], [700, 380], [960, 420], [1210, 380]];
    for (let i = 0; i < pts.length; i++) for (const j of (o.wire ?? [[0, 1], [1, 2], [2, 3], [3, 4], [1, 5], [2, 6], [3, 7], [5, 6], [6, 7], [0, 5], [4, 7]])) if (j[0] === i || j[1] === i) { if (j[0] !== i) continue; c.beginPath(); c.moveTo(pts[j[0]][0], pts[j[0]][1]); c.lineTo(pts[j[1]][0], pts[j[1]][1]); c.stroke(); }
    pts.forEach(([px, py], i) => { const hot = (o.hotIdx ?? -1) === i || o.on; c.fillStyle = hot && (hash(i * 9 + Math.floor(V.lt * 3)) > 0.25) ? '#7fd17a' : M('#3a4152', '#262c3a', k); circ(c, px, py, 22); c.fill(); });
    // rig table
    c.fillStyle = M('#6a4c33', '#33291f', k); c.fillRect(560, 560, 900, 80); c.fillRect(620, 640, 70, 180); c.fillRect(1320, 640, 70, 180);
    c.fillStyle = M('#2b2e36', '#1d2027', k); rr(c, 660, 430, 380, 130, 14); c.fill();
    for (let i = 0; i < 3; i++) { c.fillStyle = (o.on && i === 0) ? '#7fd17a' : '#4a5060'; circ(c, 720 + i * 46, 470, i ? 8 : 13); c.fill(); }
    c.fillStyle = '#e6e2d8'; c.font = '800 26px Nunito'; c.textAlign = 'left'; c.fillText('462.575', 870, 500);
    c.fillStyle = '#d9b56a'; rr(c, 900, 480, 110, 54, 10); c.fill();
    if (o.lantern) { const [lx, ly] = o.lantern; c.fillStyle = rgrad(c, lx, ly, 16, 400, [[0, 'rgba(255,225,160,0.5)'], [1, 'rgba(255,225,160,0)']]); c.fillRect(lx - 500, ly - 500, 1000, 1000); }
  });
}

/** ANSEL'S FLAT: warm one-lamp room, armchair, kettle, radio, dark windows. o:{light, tape, radioOn} */
export function anselFlat(V, o = {}) {
  V.layer(1, 0, (c) => {
    const k = clamp(o.dark ?? 0.55);
    c.fillStyle = vgrad(c, 0, -900, FLOOR, [[0, M('#4a4356', '#241f2c', k)], [1, M('#6a5a4e', '#2c2733', k)]]); c.fillRect(-1400, -900, 4720, 2400);
    c.fillStyle = M('#5a4030', '#2b2420', k); c.fillRect(-1400, FLOOR, 4720, 1200);
    c.fillStyle = M('#171c2e', '#0d1020', k); c.fillRect(1250, 160, 460, 330);
    c.fillStyle = '#e6e2d8'; c.fillRect(1250, 160, 460, 26); c.fillRect(1250, 160, 26, 330);
    for (let r = 0; r < 4; r++) c.fillRect(1250, 220 + r * 70, 460, 12);
    if (o.tape) { c.fillStyle = 'rgba(238,235,220,0.85)'; c.fillRect(-1400, 700, 4720, 14); }
    c.fillStyle = M('#7d5a3a', '#3a3143', k); rr(c, 380, 470, 420, 320, 40); c.fill();
    c.fillStyle = M('#8d6a45', '#453a50', k); rr(c, 420, 440, 130, 200, 40); c.fill(); rr(c, 630, 440, 130, 200, 40); c.fill();
    // kettle on stool
    c.fillStyle = M('#8d94a0', '#4a4f5c', k); poly(c, [1080, 620, 1180, 620, 1165, 560, 1095, 560]); c.fill(); rr(c, 1060, 600, 140, 60, 12); c.fill();
    c.strokeStyle = M('#8d94a0', '#4a4f5c', k); c.lineWidth = 10; c.beginPath(); c.arc(1130, 555, 26, Math.PI, TAU); c.stroke();
    if (o.steam) for (let i = 0; i < 3; i++) { const ph = ((V.lt * 0.5 + i / 3) % 1); c.strokeStyle = `rgba(240,240,240,${0.3 * Math.sin(ph * Math.PI) * (o.light ?? 1)})`; c.lineWidth = 10; c.beginPath(); c.moveTo(1090 + i * 30, 540); c.bezierCurveTo(1115, 460, 1075, 430, 1100, 350 - ph * 60); c.stroke(); }
    // shelf radio
    c.fillStyle = M('#33363f', '#232732', k); rr(c, 900, 250, 260, 130, 14); c.fill();
    for (let i = 0; i < 3; i++) { c.fillStyle = (o.radioOn && i === 0) ? '#7fd17a' : '#4a5060'; circ(c, 940 + i * 36, 292, i ? 6 : 10); c.fill(); }
    c.fillStyle = 'rgba(238,235,220,0.9)'; c.font = '800 20px Nunito'; c.textAlign = 'center'; c.fillText('462.575', 1040, 342);
    if (o.light) { c.fillStyle = rgrad(c, 760, 300, 30, 760, [[0, 'rgba(255,220,150,0.34)'], [1, 'rgba(255,220,150,0)']]); c.fillRect(0, -300, 1900, 1700); }
  });
}

/** SWITCH ROOM: concrete hall, giant breaker, cable tray. o:{handle 0..1, glow, screen} */
export function switchRoom(V, o = {}) {
  const k = clamp(o.dark ?? 0.8);
  V.layer(1, 0, (c) => {
    c.fillStyle = vgrad(c, 0, -1000, FLOOR + 60, [[0, M('#232838', '#151926', k)], [1, M('#3a4054', '#1e2334', k)]]); c.fillRect(-1400, -1000, 4720, 2500);
    c.fillStyle = M('#3f4250', '#232633', k); c.fillRect(-1400, FLOOR + 60, 4720, 1200);
    // breaker cabinet
    c.fillStyle = M('#8d9420', '#4a4f2c', k); rr(c, 620, 240, 640, 500, 24); c.fill();
    c.fillStyle = M('#a5ad2b', '#5a6034', k); rr(c, 660, 280, 560, 420, 16); c.fill();
    const hp = clamp(o.handle ?? 0);
    c.fillStyle = M('#c9c2b2', '#565c6a', k); rr(c, 880, 330, 60, 300, 22); c.fill();
    c.save(); c.translate(910, 480); c.rotate((hp - 0.5) * 1.5);
    c.fillStyle = hp > 0.5 ? '#7fd17a' : PAL.red; rr(c, -26, -160, 52, 320, 20); c.fill();
    c.fillStyle = 'rgba(0,0,0,0.3)'; rr(c, -26, -160, 14, 320, 8); c.fill(); c.restore();
    // cable tray over head
    c.strokeStyle = M('#565c6a', '#333a48', k); c.lineWidth = 14;
    c.beginPath(); c.moveTo(-1400, 160); c.quadraticCurveTo(400, 60, 1000, 90); c.quadraticCurveTo(1800, 130, 3400, 40); c.stroke();
    // screen on the wall
    if (o.screen) {
      c.fillStyle = '#0d1218'; rr(c, 1330, 300, 300, 150, 10); c.fill();
      c.fillStyle = o.onNow ? '#7fd17a' : '#f2b266'; c.font = '800 40px Nunito'; c.textAlign = 'center'; c.fillText(o.onNow ? 'ON LINE' : 'STAND BY', 1480, 392);
    }
    if (o.glow) { c.fillStyle = rgrad(c, 910, 480, 40, 640, [[0, `rgba(${o.glowGreen ? '140,255,170' : '255,150,140'},${0.30 * o.glow})`], [1, 'rgba(255,255,255,0)']]); c.fillRect(200, -100, 1500, 1400); }
  });
}

// ---------- helpers ----------

/** chalk text (rough, low alpha with dry baseline shift) */
export function chalkTxt(c, txt, x, y, s = 30) {
  c.save(); c.font = `700 ${s}px Nunito`; c.fillStyle = 'rgba(238,235,220,0.92)'; c.textAlign = 'center';
  c.translate(x, y); c.rotate(-0.03 + hash(Math.round(x + y)) * 0.06 - 0.03); c.fillText(txt, 0, 0); c.restore();
}

/** chalk arrow on a wall */
export function arrowChalk(c, x, y, ang = 0) {
  c.save(); c.translate(x, y); c.rotate(ang);
  c.strokeStyle = 'rgba(238,235,220,0.9)'; c.lineWidth = 10; c.lineCap = 'round';
  c.beginPath(); c.moveTo(-30, 20); c.lineTo(6, -20); c.stroke();
  c.lineWidth = 7; for (let i = 0; i < 3; i++) { c.beginPath(); c.moveTo(6, -20 - i * 5); c.lineTo(-10 + i * 8, -44 + i * 7); c.stroke(); }
  c.restore();
}
