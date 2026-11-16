import './style.css';
import { QUESTIONS } from './questions.js';


/* ===================== CẤU HÌNH ===================== */
const CONFIG = {
  TIME: 20, LIVES: 3, BASE: 100, BONUS: 50, BONUS_IF_OVER: 10,
  RADAR_PLUS: 10, DOG_ACCURACY: 0.8, TYPE_SPEED: 22, DLG_SPEED: 11,
  HI_KEY: 'cg_sea_route_hi', PREF_KEY: 'cg_sea_route_prefs'
};
const STAGES = {
  1: { label: 'CẢNG XUẤT PHÁT', phase: 'TRƯỚC THÔNG QUAN', port: 'XUẤT PHÁT', desc: 'Cẩu giàn bốc container, chứng từ B/L – Invoice – Packing List sẵn sàng. Khai báo đúng hạn trước khi nhổ neo!' },
  2: { label: 'CẢNG KIỂM HÓA', phase: 'TRONG THÔNG QUAN', port: 'KIỂM HÓA', desc: 'Máy soi container đã bật. Đèn phân luồng Xanh – Vàng – Đỏ đang chờ quyết định của bạn.' },
  3: { label: 'KHO NGOẠI QUAN', phase: 'SAU THÔNG QUAN', port: 'NGOẠI QUAN', desc: 'Xe nâng chạy giữa kệ pallet. Mở sổ sách, cầm kính lúp – kiểm tra sau thông quan bắt đầu.' },
  4: { label: 'VÙNG BIỂN ĐÊM', phase: 'BOSS · CHỐNG BUÔN LẬU', port: 'BIÊN GIỚI', desc: 'Radar phát hiện tàu lạ tắt đèn hành trình gần biên giới. Bật đèn pha, nạp pháo hiệu – chặn bắt tàu buôn lậu!' }
};
const RANKS = [ [3, 'Thủy thủ tập sự', '⚓'], [6, 'Sĩ quan boong', '🧭'], [8, 'Thuyền trưởng tuần tra', '🚢'], [10, 'Đô đốc Hải quan', '🎖️'] ];

/* ===================== STORAGE (an toàn) ===================== */
const Store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
};

/* ===================== PIXEL ART ===================== */
const rp = (c, n) => c.repeat(n);
function px(rows, pal) {
  const w = Math.max(...rows.map(r => r.length)), h = rows.length;
  let s = '';
  rows.forEach((row, y) => {
    row = row.padEnd(w, '.');
    let x = 0;
    while (x < w) {
      const ch = row[x]; let n = 1;
      while (x + n < w && row[x + n] === ch) n++;
      const p = pal[ch];
      if (ch !== '.' && p) {
        const fill = typeof p === 'string' ? p : p.c;
        const cls = typeof p === 'object' && p.cls ? ` class="${p.cls}"` : '';
        s += `<rect x="${x}" y="${y}" width="${n}" height="1" fill="${fill}"${cls}/>`;
      }
      x += n;
    }
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" class="px" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="--w:${w};--h:${h}" shape-rendering="crispEdges">${s}</svg>`;
}
function svgR(w, h, rects) {
  const s = rects.map(r => `<rect x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" fill="${r[4]}"${r[5] ? ` class="${r[5]}"` : ''}/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" class="px" viewBox="0 0 ${w} ${h}" style="--w:${w};--h:${h}" shape-rendering="crispEdges">${s}</svg>`;
}
const PAL = { K: '#0b1530', W: '#f5f5f5', G: '#b0bec5', g: '#78909c', N: '#0D47A1', B: '#1E88E5', C: '#4DD0E1', O: '#FF7043', Y: '#FBC02D', R: '#D32F2F', L: '#43A047', S: '#263238', b: '#6d4c41', w: '#a1887f', P: '#ffcc99', y: { c: '#FFEB3B', cls: 'blink' } };
const BOXC = ['#FF7043', '#1E88E5', '#43A047', '#FBC02D', '#D32F2F', '#4DD0E1', '#8E24AA'];

const SPR = {
  player: [
    rp('.', 14) + 'y', rp('.', 14) + 'K', rp('.', 14) + 'KRRRRR', rp('.', 14) + 'KRRYRR', rp('.', 14) + 'KRRRRR', rp('.', 14) + 'K',
    rp('.', 11) + rp('K', 9), rp('.', 11) + 'K' + rp('W', 7) + 'K', rp('.', 11) + 'KWCCWCCWK',
    rp('.', 5) + rp('K', 7) + rp('W', 7) + rp('K', 7),
    rp('.', 5) + 'K' + rp('N', 19) + 'K..KKK',
    rp('K', 32), 'K' + rp('W', 30) + 'K', 'K' + rp('W', 28) + 'K', 'K' + rp('R', 27) + 'K',
    '.K' + rp('N', 25) + 'K', '..K' + rp('N', 23) + 'K', '...' + rp('K', 23)
  ],
  boss: [
    rp('.', 28) + 'K', rp('.', 28) + 'KSSSSSS', rp('.', 28) + 'KSRSSRS', rp('.', 28) + 'KSSRRSS', rp('.', 28) + 'KSRSSRS', rp('.', 28) + 'KSSSSSS', rp('.', 28) + 'K',
    rp('.', 21) + rp('K', 14), rp('.', 21) + 'K' + rp('g', 12) + 'K',
    rp('.', 6) + rp('K', 13) + '..' + 'KgRRgRRgRRgggK',
    rp('.', 6) + 'KwbbKwbbKwbbK' + '..' + 'K' + rp('g', 12) + 'K',
    rp('.', 6) + 'KbbwKbbwKbbwK' + '..' + 'K' + rp('g', 12) + 'K',
    rp('K', 40), '.K' + rp('S', 37) + 'K', '..K' + rp('S', 36) + 'K', '...K' + rp('r', 35) + 'K', '....K' + rp('S', 34) + 'K', '.....' + rp('K', 35)
  ],
  officer: [
    '....KKKK', '...KNNNNK', '..KKKYYKKK', '...KPPPPK', '...KKPPKK', '...KPPPPK', '....KKKK',
    '..KNNYNNNK', '.KNNNNNNNNK', '.KNKNNNNKNK', '.KNKNNNNKNK', '.KPKNNNNKPK', '...KYYYYK', '...KNNNNK', '...KNKKNK', '...KNKKNK', '...KNKKNK', '..KKK..KKK'
  ],
  mag: ['..KKK...', '.KCCCK..', 'KCWCCCK.', 'KCCCCCK.', '.KCCCK..', '..KKKbb.', '......bb', '.......b'],
  forklift: [
    rp('.', 15) + 'K', '..' + rp('K', 7) + rp('.', 6) + 'K',
    '..K' + rp('.', 5) + 'K' + rp('.', 6) + 'K', '..K' + rp('.', 5) + 'K' + rp('.', 6) + 'K..KKKKK',
    '..K' + rp('.', 5) + 'K' + rp('.', 6) + 'K..KwbwK', '..K' + rp('.', 5) + 'K' + rp('.', 6) + 'K..KbwbK',
    '.K' + rp('Y', 12) + 'KK..KwbwK', '.K' + rp('Y', 12) + 'KK..KKKKK', '.K' + rp('Y', 12) + 'KK' + rp('b', 8), '.K' + rp('Y', 12) + 'KK',
    rp('K', 16), '..KKK' + rp('.', 6) + 'KKK', '.KgggK' + rp('.', 4) + 'KgggK', '..KKK' + rp('.', 6) + 'KKK'
  ],
  buoy: ['..KKKKK..', '.KWRRRWK.', 'KWRKKKRWK', 'KRK...KRK', 'KRK...KRK', 'KRK...KRK', 'KWRKKKRWK', '.KWRRRWK.', '..KKKKK..'],
  sun: ['....YYYY....', '..YYYYYYYY..', '.YYYYYYYYYY.', '.YYYYYYYYYY.', 'YYYYYYYYYYYY', 'YYYYYYYYYYYY', 'YYYYYYYYYYYY', '............', 'YYYYYYYYYYYY', '............', '..YYYYYYYY..', '............'],
  moon: ['...WWWW...', '..WWWWWW..', '.WWWWWWGW.', 'WWWGWWWWWW', 'WWWWWWWWWW', 'WWWWWWGWWW', 'WWGWWWWWWW', '.WWWWWWWW.', '..WWWWWW..', '...WWWW...'],
  cloud: ['.......WWWW', '....WWWWWWWWW..WWWW', '..WWWWWWWWWWWWWWWWWWW', '.WWWWWWWWWWWWWWWWWWWWW', 'WWWWWWWWWWWWWWWWWWWWWW', '.vvvvvvvvvvvvvvvvvvvv'],
  gull1: ['K.......K', '.K.....K.', '..KWWWK..', '....W....'],
  gull2: ['.........', '..KWWWK..', '.K..W..K.', 'K.......K'],
  wave: [
    rp('.', 12) + 'cccc',
    rp('.', 10) + 'ccffcccc',
    'cc' + rp('.', 6) + 'cc' + rp('B', 8) + 'cc' + rp('.', 12) + 'cc',
    'BBcc..cc' + rp('B', 12) + 'ccc....cccBB',
    'BBBBcc' + rp('B', 17) + 'cccc' + rp('B', 5),
    rp('B', 32)
  ]
};
const BOSS_PAL = { K: '#05070d', S: '#1f2a36', R: '#ff1744', r: '#b71c1c', g: '#4e5d6c', b: '#6d4c41', w: '#a1887f' };

function box(x, y, w, h, c) {
  const r = [[x, y, w, h, PAL.K], [x + 1, y + 1, w - 2, h - 2, c]];
  for (let i = x + 2; i < x + w - 1; i += 2) r.push([i, y + 1, 1, h - 2, 'rgba(0,0,0,.22)']);
  return r;
}
function containerShip() {
  const r = [];
  r.push([0, 14, 64, 1, PAL.K], [0, 15, 64, 4, '#263238'], [1, 15, 62, 1, '#37474f'], [0, 15, 1, 4, PAL.K]);
  r.push([1, 19, 62, 1, '#b71c1c'], [2, 20, 60, 1, '#b71c1c'], [4, 21, 56, 1, '#8e1b1b'], [6, 22, 52, 1, PAL.K]);
  r.push([62, 11, 2, 4, PAL.K], [63, 15, 1, 4, PAL.K], [8, 16, 14, 1, '#eceff1']);
  r.push([2, 4, 11, 10, PAL.K], [3, 5, 9, 9, '#eceff1']);
  for (let y = 6; y < 13; y += 3) r.push([4, y, 7, 1, '#4DD0E1']);
  r.push([5, 0, 4, 4, PAL.K], [6, 1, 2, 3, '#FF7043']);
  let k = 0;
  for (let tier = 0; tier < 2; tier++) for (let x = 15; x < 60; x += 6) {
    if (tier === 1 && x > 50) continue;
    r.push(...box(x, 10 - tier * 4, 6, 4, BOXC[(k++ * 3 + tier) % BOXC.length]));
  }
  return svgR(64, 23, r);
}
function crane() {
  const r = [], Y = '#FBC02D', D = '#b88a00';
  r.push([0, 8, 40, 4, PAL.K], [1, 9, 38, 2, Y]);
  for (let x = 2; x < 38; x += 4) r.push([x, 9, 1, 2, D]);
  r.push([27, 0, 3, 8, PAL.K], [28, 1, 1, 7, Y]);
  for (let i = 0; i < 14; i++) r.push([27 - i * 2, 1 + Math.floor(i / 2), 2, 1, PAL.K]);
  r.push([24, 12, 14, 6, PAL.K], [25, 13, 12, 4, '#eceff1'], [26, 14, 3, 2, '#4DD0E1']);
  r.push([25, 18, 3, 26, PAL.K], [26, 18, 1, 26, Y], [35, 18, 3, 26, PAL.K], [36, 18, 1, 26, Y]);
  r.push([25, 30, 13, 2, PAL.K], [26, 30, 11, 1, Y]);
  return svgR(40, 44, r);
}
function stacks(cols = [4, 3, 4, 2, 3, 4, 3]) {
  const r = []; let k = 1;
  cols.forEach((n, i) => { for (let j = 0; j < n; j++) r.push(...box(i * 7, 16 - (j + 1) * 4, 7, 4, BOXC[(k = (k * 5 + 3) % BOXC.length)])); });
  return svgR(cols.length * 7, 16, r);
}
function scanner() {
  return svgR(26, 30, [[0, 4, 4, 26, PAL.K], [1, 5, 2, 25, '#90a4ae'], [22, 4, 4, 26, PAL.K], [23, 5, 2, 25, '#90a4ae'], [0, 0, 26, 6, PAL.K], [1, 1, 24, 4, '#546e7a'], [11, 5, 4, 1, '#ff1744', 'blink']]);
}
function truck() {
  const r = [...box(0, 0, 24, 9, '#FF7043')];
  r.push([0, 9, 27, 2, PAL.K], [26, 2, 9, 9, PAL.K], [27, 3, 7, 7, '#D32F2F'], [30, 4, 4, 3, '#4DD0E1'], [24, 8, 3, 2, PAL.K]);
  [2, 7, 19, 29].forEach(x => r.push([x, 10, 4, 4, PAL.K], [x + 1, 11, 2, 2, '#90a4ae']));
  return svgR(36, 14, r);
}
function warehouse() {
  const r = [];
  for (let i = 0; i < 6; i++) for (let s = 0; s < 4; s++) r.push([i * 12, 4 - s, 12 - s * 3, 1, s === 0 ? '#37474f' : '#455a64']);
  r.push([0, 5, 72, 3, PAL.K], [0, 8, 72, 32, PAL.K], [1, 8, 70, 32, '#cfd8dc'], [1, 8, 70, 2, '#FF7043']);
  r.push([14, 11, 44, 6, PAL.K], [15, 12, 42, 4, '#0D47A1']);
  r.push([24, 19, 24, 21, PAL.K], [25, 20, 22, 20, '#78909c']);
  for (let y = 21; y < 40; y += 2) r.push([25, y, 22, 1, '#607d8b']);
  [[4, 20], [56, 20]].forEach(([x, y]) => r.push([x, y, 12, 8, PAL.K], [x + 1, y + 1, 10, 6, '#4DD0E1'], [x + 6, y + 1, 1, 6, PAL.K]));
  return svgR(72, 40, r);
}
function racks() {
  const r = [];
  [9, 18, 27].forEach((y, si) => {
    for (let x = 2; x < 26; x += 6) if ((x + si) % 4 !== 1) r.push([x, y - 5, 5, 5, PAL.K], [x + 1, y - 4, 3, 3, '#a1887f'], [x + 2, y - 4, 1, 3, '#6d4c41']);
    r.push([0, y, 30, 2, '#1E88E5'], [0, y + 1, 30, 1, PAL.K]);
  });
  [0, 14, 28].forEach(x => r.push([x, 0, 2, 30, '#FF7043']));
  return svgR(30, 30, r);
}
function waveURI(c, f, b) {
  return 'url("data:image/svg+xml,' + encodeURIComponent(px(SPR.wave, { c, f, B: b })) + '")';
}

/* ===================== ÂM THANH 8-BIT (Web Audio) ===================== */
const Sound = {
  ctx: null, master: null, on: true, waves: null, _nb: null,
  init() {
    if (this.ctx) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.on ? 0.6 : 0;
      this.master.connect(this.ctx.destination);
    } catch (e) { this.ctx = null; }
  },
  resume() { try { if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume(); } catch (e) {} },
  set(on) { this.on = on; if (this.master) this.master.gain.setTargetAtTime(on ? 0.6 : 0, this.ctx.currentTime, 0.05); },
  tone(f, d, o = {}) {
    if (!this.ctx || !this.on) return;
    const c = this.ctx, t = c.currentTime + (o.t || 0), os = c.createOscillator(), g = c.createGain(), v = o.vol ?? 0.15, a = o.a || 0.005;
    os.type = o.type || 'square';
    os.frequency.setValueAtTime(f, t);
    if (o.slide) os.frequency.exponentialRampToValueAtTime(o.slide, t + d);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + a);
    if (o.sus) g.gain.setValueAtTime(v, t + Math.max(a, d - 0.25));
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    let node = os;
    if (o.lp) { const lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = o.lp; os.connect(lp); node = lp; }
    node.connect(g); g.connect(this.master);
    os.start(t); os.stop(t + d + 0.05);
  },
  noiseBuf() {
    if (this._nb) return this._nb;
    const c = this.ctx, b = c.createBuffer(1, c.sampleRate * 2, c.sampleRate), d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return (this._nb = b);
  },
  noise(d, o = {}) {
    if (!this.ctx || !this.on) return;
    const c = this.ctx, t = c.currentTime + (o.t || 0), s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
    s.buffer = this.noiseBuf();
    f.type = o.ft || 'lowpass'; f.frequency.setValueAtTime(o.f || 1000, t);
    if (o.fslide) f.frequency.exponentialRampToValueAtTime(o.fslide, t + d);
    g.gain.setValueAtTime(o.vol ?? 0.2, t); g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    s.connect(f); f.connect(g); g.connect(this.master);
    s.start(t); s.stop(t + d + 0.05);
  },
  horn() { [98, 147].forEach(f => this.tone(f, 1.3, { type: 'sawtooth', vol: 0.13, a: 0.12, lp: 650, sus: 1 })); [98, 147].forEach(f => this.tone(f, 0.55, { type: 'sawtooth', vol: 0.11, a: 0.06, lp: 650, sus: 1, t: 1.5 })); },
  bell() { [0, 0.3].forEach(dt => { this.tone(1568, 0.9, { type: 'sine', vol: 0.2, t: dt }); this.tone(2637, 0.5, { type: 'sine', vol: 0.06, t: dt }); this.tone(784, 0.8, { type: 'triangle', vol: 0.08, t: dt }); }); },
  alarm() { for (let i = 0; i < 4; i++) this.tone(i % 2 ? 620 : 880, 0.14, { vol: 0.1, t: i * 0.15 }); this.noise(0.8, { f: 900, fslide: 150, vol: 0.18, t: 0.05 }); },
  win() { const n = [523, 659, 784, 1047, 784, 1047, 1319]; n.forEach((f, i) => { this.tone(f, i === n.length - 1 ? 0.7 : 0.14, { vol: 0.09, t: i * 0.13 }); this.tone(f / 2, 0.14, { type: 'triangle', vol: 0.09, t: i * 0.13 }); }); },
  lose() { [392, 370, 349, 330].forEach((f, i) => this.tone(f, 0.35, { type: 'sawtooth', vol: 0.08, t: i * 0.32, lp: 1500 })); this.tone(165, 0.9, { vol: 0.07, t: 1.3, slide: 70 }); this.noise(1.2, { f: 600, fslide: 100, vol: 0.12, t: 1.2 }); },
  click() { this.tone(660, 0.05, { vol: 0.06 }); this.tone(990, 0.05, { vol: 0.05, t: 0.04 }); },
  type() { this.tone(1300 + Math.random() * 300, 0.02, { vol: 0.018 }); },
  tick() { this.tone(1000, 0.04, { vol: 0.07 }); },
  power() { [523, 784, 1047, 1568].forEach((f, i) => this.tone(f, 0.08, { vol: 0.07, t: i * 0.06 })); },
  shot() { this.tone(260, 0.4, { vol: 0.08, slide: 1600 }); this.noise(0.3, { ft: 'highpass', f: 2500, vol: 0.08 }); },
  boom() { this.noise(0.8, { f: 1400, fslide: 70, vol: 0.32 }); this.tone(110, 0.5, { vol: 0.08, slide: 40 }); },
  startWaves() {
    if (!this.ctx || this.waves) return;
    try {
      const c = this.ctx, s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(), lfo = c.createOscillator(), lg = c.createGain();
      s.buffer = this.noiseBuf(); s.loop = true;
      f.type = 'lowpass'; f.frequency.value = 420;
      g.gain.value = 0.05; lfo.frequency.value = 0.13; lg.gain.value = 0.04;
      lfo.connect(lg); lg.connect(g.gain); s.connect(f); f.connect(g); g.connect(this.master);
      s.start(); lfo.start(); this.waves = { s, lfo };
    } catch (e) {}
  }
};

/* ===================== DOM ===================== */
const $ = id => document.getElementById(id);
const app = $('app'), scene = $('scene'), fx = $('fx'), player = $('player'), bossEl = $('boss');
const answersEl = $('answers'), qtext = $('qtext');

function paintSprites(root = document) {
  root.querySelectorAll('[data-sprite]').forEach(el => {
    if (el.dataset.done) return;
    const k = el.dataset.sprite;
    if (k === 'boss') el.innerHTML = px(SPR.boss, BOSS_PAL);
    else if (k === 'cship') el.innerHTML = containerShip();
    else if (k === 'sun') el.innerHTML = px(SPR.sun, { Y: '#ffe082' });
    else el.innerHTML = px(SPR[k], PAL);
    el.dataset.done = 1;
  });
}
function decorate(world) {
  const cl = world.querySelector('.clouds'), gl = world.querySelector('.gulls');
  const cpal = { W: 'rgba(255,243,238,.92)', v: 'rgba(255,205,195,.85)' };
  [[8, 46, 3], [16, 70, 2], [28, 34, 3], [22, 58, 2]].forEach(([top, dur, u], i) => {
    const d = document.createElement('div');
    d.className = 'cloud'; d.style.cssText = `top:${top}%;--u:${u}px;animation-duration:${dur}s;animation-delay:-${i * 13}s`;
    d.innerHTML = px(SPR.cloud, cpal); cl.appendChild(d);
  });
  [[18, 17, 0], [26, 23, 7]].forEach(([top, dur, dl]) => {
    const g = document.createElement('div');
    g.className = 'gull'; g.style.cssText = `top:${top}%;animation-duration:${dur}s;animation-delay:-${dl}s`;
    g.innerHTML = `<div class="f1">${px(SPR.gull1, PAL)}</div><div class="f2">${px(SPR.gull2, PAL)}</div>`;
    gl.appendChild(g);
  });
}
const PROPS = {
  1: () => `<div class="dock"></div>
    <div class="prop" style="left:30%;bottom:20%;z-index:5">${containerShip()}<div class="docs"><span class="doc" style="--d:0s">B/L</span><span class="doc" style="--d:1.3s;--x:28px">INVOICE</span><span class="doc" style="--d:2.6s;--x:62px">P/L</span></div></div>
    <div class="prop on-dock" style="left:45%">${crane()}<div class="hoist"><i></i><b></b></div></div>
    <div class="prop on-dock wide-only" style="left:82%">${stacks([3, 2, 3, 1])}</div>`,
  2: () => `<div class="dock"></div>
    <div class="prop on-dock" style="left:29%">${stacks()}</div>
    <div class="prop on-dock truck">${truck()}</div>
    <div class="prop on-dock" style="left:62%">${scanner()}<span class="xray pf">X-RAY</span><i class="scanbeam"></i></div>
    <div class="prop tlight cycle" id="tlight"><i class="r"></i><i class="y"></i><i class="g"></i></div>`,
  3: () => `<div class="dock"></div>
    <div class="prop on-dock p3w" style="left:30%">${warehouse()}<span class="wsign">KHO NGOẠI QUAN</span></div>
    <div class="prop on-dock wide-only" style="left:71%">${racks()}</div>
    <div class="prop on-dock fork">${px(SPR.forklift, PAL)}</div>
    <div class="prop on-dock officer" style="left:89%">${px(SPR.officer, PAL)}<span class="mag">${px(SPR.mag, PAL)}</span></div>`,
  4: () => `<div class="prop" style="right:14%;top:8%;--u:4px;z-index:1;filter:drop-shadow(0 0 14px rgba(255,248,225,.6))">${px(SPR.moon, { W: '#fff8e1', G: '#e0d6b0' })}</div>`
};

/* ===================== STATE ===================== */
const S = {
  list: [], i: 0, score: 0, shown: 0, lives: CONFIG.LIVES, streak: 0, best: 0, correct: 0,
  used: { scope: false, radar: false, dog: false }, remain: 0, maxT: 0, last: 0, lastSec: 99, timerId: null,
  phase: 'menu', typing: null, shuffle: false, bossHP: 0, bossMax: 0, routePos: 0, stageStart: {}, stageOrder: [], hi: 0, curStage: 0
};

/* ===================== ROUTE BAR ===================== */
function buildRoute(el) {
  const N = S.list.length || QUESTIONS.length;
  const order = S.stageOrder.length ? S.stageOrder : [...new Set(QUESTIONS.map(q => q.stage))].sort();
  let html = '<div class="track"><div class="line"></div><div class="done"></div>';
  order.forEach((st, oi) => {
    const pos = (S.stageStart[st] ?? 0) / N * 100;
    html += `<div class="marker${oi === 0 ? ' first' : ''}" data-at="${S.stageStart[st] ?? 0}" style="left:${pos}%"><span>${(STAGES[st] || {}).port || 'STAGE ' + st}</span></div>`;
  });
  html += `<div class="marker end" data-at="${N}" style="left:100%"><span>VỀ ĐÍCH</span></div>`;
  html += `<div class="rship" style="left:0%">${px(SPR.player, PAL)}</div></div>`;
  el.innerHTML = html;
}
function setRoute(el, pos, instant) {
  const N = S.list.length || 1, pct = Math.min(100, pos / N * 100);
  const ship = el.querySelector('.rship'), done = el.querySelector('.done');
  if (!ship) return;
  if (instant) { ship.style.transition = done.style.transition = 'none'; }
  ship.style.left = pct + '%'; done.style.width = pct + '%';
  el.querySelectorAll('.marker').forEach(m => m.classList.toggle('reached', +m.dataset.at <= pos));
  if (instant) { void ship.offsetWidth; ship.style.transition = done.style.transition = ''; }
}

/* ===================== HUD ===================== */
const pad = n => String(Math.max(0, Math.floor(n))).padStart(6, '0');
function renderLives() {
  const el = $('lives'); el.innerHTML = '';
  for (let k = 0; k < CONFIG.LIVES; k++) {
    const d = document.createElement('div');
    d.className = 'buoy' + (k >= S.lives ? ' lost' : '');
    d.innerHTML = px(SPR.buoy, PAL); el.appendChild(d);
  }
}
function loseLifeUI() {
  const b = $('lives').children[S.lives];
  if (b) b.classList.add('lost');
}
function animateScore() {
  const from = S.shown, to = S.score, t0 = performance.now();
  const step = now => {
    const k = Math.min(1, (now - t0) / 600);
    S.shown = Math.round(from + (to - from) * k);
    $('score').textContent = pad(S.shown);
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
function renderCombo() {
  const c = $('combo'), m = mult();
  c.classList.toggle('hidden', S.streak < 2);
  c.textContent = 'COMBO x' + m;
}
const mult = () => S.streak >= 3 ? 3 : S.streak >= 2 ? 2 : 1;
function renderHi() { $('hiHud').textContent = pad(S.hi); $('hiStart').textContent = pad(S.hi); }

/* ===================== TYPEWRITER ===================== */
function typeText(el, text, speed, done) {
  cancelType();
  let i = 0; el.textContent = ''; el.classList.add('typing');
  S.typing = {
    el, text, done, id: setInterval(() => {
      i++; el.textContent = text.slice(0, i);
      if (i % 3 === 0) Sound.type();
      if (i >= text.length) finishType();
    }, speed)
  };
}
function finishType() {
  if (!S.typing) return;
  const t = S.typing; S.typing = null;
  clearInterval(t.id); t.el.textContent = t.text; t.el.classList.remove('typing');
  t.done && t.done();
}
function cancelType() { if (S.typing) { clearInterval(S.typing.id); S.typing.el.classList.remove('typing'); S.typing = null; } }

/* ===================== FX ===================== */
function fxAdd(cls, style = '', html = '', life = 1200) {
  const d = document.createElement('div'); d.className = cls; d.style.cssText = style; d.innerHTML = html;
  fx.appendChild(d); setTimeout(() => d.remove(), life); return d;
}
const flash = c => fxAdd('flash', `background:${c}`, '', 600);
function shake() { app.classList.remove('shake'); void app.offsetWidth; app.classList.add('shake'); setTimeout(() => app.classList.remove('shake'), 500); }
function toast(msg) { fx.querySelectorAll('.toast').forEach(t => t.remove()); fxAdd('toast', '', msg, 2500); }
function relRect(el) {
  const s = scene.getBoundingClientRect(), r = el.getBoundingClientRect();
  return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
}
function sparkle() {
  const p = relRect(player.querySelector('.bob'));
  for (let k = 0; k < 8; k++) {
    const a = (Math.PI * 2 * k) / 8;
    fxAdd('spark', `left:${p.x + p.w / 2}px;top:${p.y + p.h / 3}px;--dx:${Math.cos(a) * 50}px;--dy:${Math.sin(a) * 40 - 20}px`, k % 2 ? '✦' : '★', 1000).style.color = k % 2 ? '#fff59d' : '#4DD0E1';
  }
}
function boost() { player.classList.add('boost'); setTimeout(() => player.classList.remove('boost'), 700); }
function bigWave() {
  fxAdd('bigwave', '', '', 1200);
  player.classList.remove('hit'); void player.offsetWidth; player.classList.add('hit');
  setTimeout(() => player.classList.remove('hit'), 950);
  const p = relRect(player.querySelector('.bob'));
  for (let k = 0; k < 10; k++) {
    const s = fxAdd('splash', `left:${p.x + Math.random() * p.w}px;top:${p.y + p.h * 0.6}px`, '', 900);
    s.animate([{ transform: 'translate(0,0)', opacity: 1 }, { transform: `translate(${(Math.random() - 0.5) * 90}px,${-40 - Math.random() * 50}px)`, opacity: 0 }], { duration: 800, easing: 'steps(8)' });
  }
}
function fireFlare(onHit) {
  const p = relRect(player.querySelector('.bob')), b = relRect(bossEl.querySelector('.bob'));
  const x0 = p.x + p.w * 0.9, y0 = p.y + p.h * 0.45, x1 = b.x + b.w * 0.45, y1 = b.y + b.h * 0.45;
  const f = fxAdd('flare', '', '', 900);
  Sound.shot();
  const anim = f.animate([
    { transform: `translate(${x0}px,${y0}px)` },
    { transform: `translate(${(x0 + x1) / 2}px,${Math.min(y0, y1) - 70}px)`, offset: 0.5 },
    { transform: `translate(${x1}px,${y1}px)` }
  ], { duration: 650, easing: 'linear', fill: 'forwards' });
  anim.onfinish = () => {
    f.remove();
    fxAdd('boom', `left:${x1}px;top:${y1}px`, '', 700);
    Sound.boom(); flash('rgba(255,235,59,.6)');
    bossEl.classList.remove('hurt'); void bossEl.offsetWidth; bossEl.classList.add('hurt');
    onHit && onHit();
  };
}
function banner(html, ms = 2600) { fxAdd('banner', '', html, ms); }

/* ===================== SCENE ===================== */
function setScene(stage) {
  scene.dataset.stage = stage;
  $('props').innerHTML = (PROPS[stage] || (() => ''))();
  const st = $('stars');
  st.innerHTML = '';
  if (stage === 4) for (let k = 0; k < 34; k++) {
    const i = document.createElement('i');
    i.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 52}%;animation-delay:-${Math.random() * 2}s;${Math.random() < .3 ? 'width:2px;height:2px' : ''}`;
    st.appendChild(i);
  }
  const isBoss = stage === Math.max(...S.stageOrder) && stage === 4;
  bossEl.classList.toggle('hidden', !isBoss);
  bossEl.getAnimations && bossEl.getAnimations().forEach(a => a.cancel());
  player.getAnimations && player.getAnimations().forEach(a => a.cancel());
  if (isBoss) { S.bossMax = S.list.filter(q => q.stage === stage).length; S.bossHP = S.bossMax; renderBoss(); }
  fitScene();
}
function renderBoss() {
  $('bossBar').innerHTML = Array.from({ length: S.bossMax }, (_, k) => `<i class="${k >= S.bossHP ? 'gone' : ''}"></i>`).join('');
}
function setLight(state) {
  const tl = document.getElementById('tlight'); if (!tl) return;
  tl.classList.remove('green', 'yellow', 'red', 'cycle');
  tl.classList.add(state);
}
function fitScene() {
  const u = (scene.clientHeight < 230 || scene.clientWidth < 600) ? 2 : 3;
  scene.style.setProperty('--u', u + 'px');
  player.style.setProperty('--u', u + 'px');
  bossEl.style.setProperty('--u', (u + 1) + 'px');
}

/* ===================== GAME FLOW ===================== */
function prepareList() {
  const src = QUESTIONS.map((q, n) => ({ q, n })).sort((a, b) => (a.q.stage - b.q.stage) || (a.n - b.n)).map(o => o.q);
  S.list = src.map(q => {
    const ansIdx = 'ABCD'.indexOf(String(q.answer).trim().toUpperCase());
    let opts = q.options.map((t, k) => ({ text: String(t).replace(/^\s*[A-Da-d]\s*[\.\):\-–]\s*/, ''), orig: k }));
    if (S.shuffle) for (let k = opts.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [opts[k], opts[j]] = [opts[j], opts[k]]; }
    return { ...q, opts, correctIdx: opts.findIndex(o => o.orig === ansIdx) };
  });
  S.stageStart = {}; S.stageOrder = [];
  S.list.forEach((q, k) => { if (!(q.stage in S.stageStart)) { S.stageStart[q.stage] = k; S.stageOrder.push(q.stage); } });
}
function startGame() {
  Sound.init(); Sound.resume(); Sound.startWaves();
  S.shuffle = $('chkShuffle').checked;
  Store.set(CONFIG.PREF_KEY, { sound: Sound.on, shuffle: S.shuffle });
  prepareList();
  Object.assign(S, { i: 0, score: 0, shown: 0, lives: CONFIG.LIVES, streak: 0, best: 0, correct: 0, routePos: 0, used: { scope: false, radar: false, dog: false }, curStage: 0 });
  $('score').textContent = pad(0); renderCombo(); renderLives(); renderHi();
  player.className = ''; fx.innerHTML = '';
  buildRoute($('route')); setRoute($('route'), 0, true);
  ['startScreen', 'end', 'howto'].forEach(id => $(id).classList.add('hidden'));
  stageIntro(S.list[0].stage);
}
function stageIntro(stage) {
  S.phase = 'intro'; S.curStage = stage;
  stopTimer(); cancelType();
  $('dialog').classList.add('hidden');
  setScene(stage);
  const meta = STAGES[stage] || { label: 'STAGE ' + stage, phase: '', desc: '' };
  const isBoss = stage === 4;
  const idx = S.stageOrder.indexOf(stage) + 1;
  $('introWarn').classList.toggle('hidden', !isBoss);
  $('introStage').textContent = isBoss ? `STAGE ${idx} - BOSS` : `STAGE ${idx}`;
  $('introName').textContent = meta.label;
  $('introPhase').textContent = meta.phase;
  $('introDesc').textContent = meta.desc;
  $('btnGo').textContent = isBoss ? '☠ XUẤT KÍCH ▶' : (idx === 1 ? '⚓ NHỔ NEO ▶' : 'VÀO CẢNG ▶');
  const r = $('introRoute'); buildRoute(r); setRoute(r, S.routePos, true);
  $('intro').classList.remove('hidden');
  S.routePos = S.stageStart[stage];
  setTimeout(() => { setRoute(r, S.routePos); setRoute($('route'), S.routePos); }, 250);
  Sound.horn();
}
function beginStage() {
  if (S.phase !== 'intro') return;
  Sound.click();
  $('intro').classList.add('hidden');
  askQuestion();
}
function askQuestion() {
  const q = S.list[S.i];
  S.phase = 'typing';
  const idx = S.stageOrder.indexOf(q.stage) + 1;
  $('stageTag').textContent = q.stage === 4 ? `STAGE ${idx} · BOSS` : `STAGE ${idx}`;
  $('stageName').textContent = q.stageName || (STAGES[q.stage] || {}).label || '';
  $('qnum').textContent = `> CÂU ${S.i + 1}/${S.list.length}  ·  ${pad(S.score)} TEU`;
  answersEl.innerHTML = '';
  $('panel').scrollTop = 0;
  q.opts.forEach((o, k) => {
    const b = document.createElement('button');
    b.className = 'ans pending'; b.dataset.k = k;
    b.innerHTML = `<span class="tag">${'ABCD'[k]}</span><span class="txt"></span><span class="lock"></span>`;
    b.querySelector('.txt').textContent = o.text;
    b.addEventListener('click', () => choose(k));
    answersEl.appendChild(b);
  });
  if (q.stage === 2) setLight(q.light || ['green', 'yellow', 'red'][(S.i - S.stageStart[2]) % 3]);
  S.remain = CONFIG.TIME * 1000; S.maxT = S.remain; renderTimer();
  updateLifelines();
  typeText(qtext, q.question, CONFIG.TYPE_SPEED, () => {
    answersEl.querySelectorAll('.ans').forEach((b, k) => { b.classList.remove('pending'); b.classList.add('drop'); b.style.animationDelay = (k * 70) + 'ms'; });
    S.phase = 'asking'; updateLifelines(); startTimer();
  });
}
function startTimer() {
  stopTimer();
  S.last = performance.now(); S.lastSec = 99;
  S.timerId = setInterval(() => {
    const now = performance.now();
    S.remain -= now - S.last; S.last = now;
    renderTimer();
    const sec = Math.ceil(S.remain / 1000);
    if (sec <= 5 && sec !== S.lastSec && sec > 0) Sound.tick();
    S.lastSec = sec;
    if (S.remain <= 0) onTimeout();
  }, 100);
}
function stopTimer() { if (S.timerId) clearInterval(S.timerId); S.timerId = null; }
function renderTimer() {
  const r = Math.max(0, S.remain), sec = Math.ceil(r / 1000), bar = $('tbar');
  $('tnum').textContent = sec;
  $('tnum').classList.toggle('low', sec <= 5);
  if (bar.children.length !== 20) bar.innerHTML = '<i></i>'.repeat(20);
  const on = Math.ceil(r / S.maxT * 20);
  [...bar.children].forEach((c, k) => c.classList.toggle('off', k >= on));
  bar.className = sec <= 5 ? 'low' : sec <= 10 ? 'mid' : '';
  $('compass').style.setProperty('--spin', sec <= 5 ? '.5s' : sec <= 10 ? '1.4s' : '3s');
}
function choose(k) {
  if (S.phase !== 'asking') return;
  const b = answersEl.children[k];
  if (!b || b.disabled) return;
  stopTimer(); S.phase = 'answered';
  resolve(k === S.list[S.i].correctIdx, k, false);
}
function onTimeout() {
  if (S.phase !== 'asking') return;
  stopTimer(); S.remain = 0; renderTimer(); S.phase = 'answered';
  resolve(false, -1, true);
}
function resolve(ok, k, timeout) {
  const q = S.list[S.i];
  [...answersEl.children].forEach((b, j) => {
    b.disabled = true;
    if (j === q.correctIdx) b.classList.add('correct');
    else if (j === k) b.classList.add('wrong');
    else b.classList.add('dim');
  });
  updateLifelines();
  let verdict = '', gained = 0, bonus = 0;
  if (ok) {
    S.streak++; S.best = Math.max(S.best, S.streak); S.correct++;
    bonus = S.remain > CONFIG.BONUS_IF_OVER * 1000 ? CONFIG.BONUS : 0;
    gained = (CONFIG.BASE + bonus) * mult();
    S.score += gained; animateScore(); renderCombo();
    Sound.bell(); flash('rgba(105,240,174,.45)'); sparkle(); boost();
    S.routePos = Math.min(S.routePos + 1, S.list.length); setRoute($('route'), S.routePos);
    if (q.stage === 2) setLight('green');
    if (!bossEl.classList.contains('hidden')) fireFlare(() => { S.bossHP = Math.max(0, S.bossHP - 1); renderBoss(); });
    verdict = `+${gained} TEU` + (bonus ? `  ·  ⚡ THƯỞNG TỐC ĐỘ +${CONFIG.BONUS}` : '') + (mult() > 1 ? `  ·  🔥 COMBO x${mult()}` : '');
  } else {
    S.streak = 0; renderCombo();
    S.lives = Math.max(0, S.lives - 1); loseLifeUI();
    Sound.alarm(); bigWave(); shake(); flash('rgba(211,47,47,.5)');
    if (q.stage === 2) setLight('red');
    const L = 'ABCD'[q.correctIdx];
    verdict = `Đáp án đúng: ${L}. ${q.opts[q.correctIdx].text}  ·  -1 🛟` + (S.lives === 0 ? '  ·  HẾT PHAO!' : '');
  }
  setTimeout(() => showDialog(ok, timeout, verdict, q), ok ? 750 : 950);
}
function showDialog(ok, timeout, verdict, q) {
  S.phase = 'review';
  const nm = $('dlgName');
  nm.className = 'dlg-name pf' + (ok ? '' : timeout ? ' time' : ' bad');
  nm.textContent = ok ? 'CHÍNH XÁC!' : timeout ? 'HẾT GIỜ!' : 'SAI RỒI!';
  $('dlgVerdict').textContent = verdict;
  const last = S.i >= S.list.length - 1;
  $('btnNext').textContent = S.lives <= 0 ? 'XEM KẾT QUẢ ▶' : last ? 'VỀ ĐÍCH ▶' : 'TIẾP ▶';
  $('dialog').classList.remove('hidden');
  typeText($('dlgText'), q.explain || '', CONFIG.DLG_SPEED);
}
function next() {
  if (S.phase !== 'review') return;
  if (S.typing) { finishType(); return; }
  Sound.click();
  $('dialog').classList.add('hidden');
  if (S.lives <= 0) return gameOver();
  S.i++;
  if (S.i >= S.list.length) return finishVoyage();
  if (S.list[S.i].stage !== S.list[S.i - 1].stage) stageIntro(S.list[S.i].stage);
  else askQuestion();
}
function finishVoyage() {
  S.phase = 'ending';
  S.routePos = S.list.length; setRoute($('route'), S.routePos);
  if (!bossEl.classList.contains('hidden')) {
    if (S.bossHP <= 0) {
      const p = relRect(player.querySelector('.bob')), b = relRect(bossEl);
      const dx = (p.x + p.w + 16) - b.x;
      bossEl.animate([{ transform: 'none' }, { transform: `translateX(${dx}px)` }], { duration: 1600, easing: 'steps(16)', fill: 'forwards' });
      banner('🚨 ĐÃ CHẶN BẮT TÀU BUÔN LẬU!<br>Áp giải về cảng...', 3200);
      Sound.power();
      setTimeout(() => {
        const out = { transform: `translateX(${scene.clientWidth}px)` };
        player.animate([{ transform: 'none' }, out], { duration: 1500, easing: 'steps(15)', fill: 'forwards' });
        bossEl.animate([{ transform: `translateX(${dx}px)` }, { transform: `translateX(${dx + scene.clientWidth}px)` }], { duration: 1500, easing: 'steps(15)', fill: 'forwards' });
      }, 1800);
      return setTimeout(() => endGame(true, true), 3500);
    }
    bossEl.animate([{ transform: 'none' }, { transform: `translateX(${scene.clientWidth}px)`, opacity: 0 }], { duration: 1800, easing: 'steps(18)', fill: 'forwards' });
    banner('💨 TÀU BUÔN LẬU ĐÃ TẨU THOÁT...', 2400);
    return setTimeout(() => endGame(true, false), 2300);
  }
  setTimeout(() => endGame(true, false), 400);
}
function gameOver() {
  S.phase = 'ending';
  player.classList.add('sink');
  banner('🌊 TÀU ĐÃ CHÌM!', 1800);
  Sound.lose();
  setTimeout(() => endGame(false, false), 1900);
}
function endGame(survived, captured) {
  S.phase = 'end'; stopTimer(); cancelType();
  const total = S.list.length;
  const n10 = Math.round(S.correct * 10 / total);
  const rank = RANKS.find(r => n10 <= r[0]) || RANKS[RANKS.length - 1];
  const isNew = S.score > S.hi;
  if (isNew) { S.hi = S.score; Store.set(CONFIG.HI_KEY, S.hi); }
  renderHi();
  const t = $('endTitle');
  t.className = 'pf end-title ' + (survived ? 'win' : 'lose');
  t.textContent = survived ? (captured ? 'MISSION COMPLETE!' : 'VOYAGE COMPLETE') : 'GAME OVER';
  $('endSub').textContent = survived
    ? (captured ? 'Hải trình hoàn tất – tàu buôn lậu đã bị chặn bắt và áp giải!' : (S.bossMax ? 'Lô hàng về đích an toàn, nhưng tàu buôn lậu đã tẩu thoát.' : 'Lô hàng đã về đích an toàn.'))
    : 'Hết phao cứu sinh – tàu tuần tra bị sóng nhấn chìm!';
  const art = $('endArt');
  art.innerHTML = survived
    ? `<div style="--u:3px" class="bobwrap">${px(SPR.player, PAL)}</div>${captured ? `<div style="--u:2px;margin-left:8px">${px(SPR.boss, BOSS_PAL)}</div>` : ''}`
    : `<div class="sinking" style="--u:3px">${px(SPR.player, PAL)}</div>` + [20, 45, 60, 75].map((l, k) => `<i class="bubble" style="left:${l}%;animation-delay:${k * .4}s"></i>`).join('');
  $('stScore').textContent = S.score.toLocaleString('vi-VN') + ' TEU';
  $('stCorrect').textContent = `${S.correct}/${total}`;
  $('stStreak').textContent = S.best;
  $('stHi').textContent = S.hi.toLocaleString('vi-VN') + ' TEU';
  $('newRec').classList.toggle('hidden', !isNew || S.score === 0);
  $('rankIco').textContent = rank[2];
  $('rankName').textContent = rank[1];
  $('chkShuffle2').checked = $('chkShuffle').checked;
  $('end').classList.remove('hidden');
  survived ? Sound.win() : null;
}

/* ===================== TRỢ GIÚP ===================== */
function updateLifelines() {
  document.querySelectorAll('.life').forEach(b => {
    const k = b.dataset.l;
    b.disabled = S.used[k] || S.phase !== 'asking';
    b.classList.toggle('used', S.used[k]);
    if (S.used[k]) b.querySelector('small').textContent = 'ĐÃ DÙNG';
    else b.querySelector('small').textContent = { scope: 'Loại 2 đáp án sai', radar: '+10 giây', dog: 'Đánh hơi đáp án' }[k];
  });
}
function useLife(k) {
  if (S.phase !== 'asking' || S.used[k]) return;
  const q = S.list[S.i], btns = [...answersEl.children];
  S.used[k] = true; Sound.power();
  if (k === 'scope') {
    const wrong = btns.map((b, j) => j).filter(j => j !== q.correctIdx && !btns[j].disabled);
    wrong.sort(() => Math.random() - 0.5).slice(0, 2).forEach(j => { btns[j].classList.add('elim'); btns[j].disabled = true; btns[j].classList.remove('sniff'); });
    toast('🔭 Ống nhòm: đã loại 2 đáp án sai!');
  } else if (k === 'radar') {
    S.remain += CONFIG.RADAR_PLUS * 1000; S.maxT = Math.max(S.maxT, S.remain); renderTimer();
    toast(`📡 Radar: +${CONFIG.RADAR_PLUS} giây!`);
  } else if (k === 'dog') {
    const live = btns.map((b, j) => j).filter(j => !btns[j].disabled);
    const others = live.filter(j => j !== q.correctIdx);
    const pick = (Math.random() < CONFIG.DOG_ACCURACY || !others.length) ? q.correctIdx : others[Math.floor(Math.random() * others.length)];
    btns.forEach(b => b.classList.remove('sniff'));
    btns[pick].classList.add('sniff');
    toast(`🐕 Gâu gâu! Đánh hơi thấy mùi ở container ${'ABCD'[pick]}...`);
  }
  updateLifelines();
}

/* ===================== ÂM THANH UI ===================== */
function renderSoundBtns() {
  $('btnSound').textContent = Sound.on ? '🔊' : '🔇';
  $('btnSnd2').textContent = Sound.on ? '🔊 ÂM THANH: BẬT' : '🔇 ÂM THANH: TẮT';
}
function toggleSound() {
  Sound.init(); Sound.resume();
  Sound.set(!Sound.on);
  if (Sound.on) { Sound.startWaves(); Sound.click(); }
  renderSoundBtns();
  Store.set(CONFIG.PREF_KEY, { sound: Sound.on, shuffle: $('chkShuffle').checked });
}

/* ===================== MENU ===================== */
function showMenu() {
  S.phase = 'menu'; stopTimer(); cancelType();
  ['end', 'intro', 'howto', 'dialog'].forEach(id => $(id).classList.add('hidden'));
  $('startScreen').classList.remove('hidden');
  renderHi();
}

/* ===================== INPUT ===================== */
$('btnStart').addEventListener('click', startGame);
$('btnHow').addEventListener('click', () => { Sound.init(); Sound.click(); $('howto').classList.remove('hidden'); });
$('btnHowClose').addEventListener('click', () => { Sound.click(); $('howto').classList.add('hidden'); });
$('btnSnd2').addEventListener('click', toggleSound);
$('btnSound').addEventListener('click', toggleSound);
$('btnGo').addEventListener('click', beginStage);
$('btnNext').addEventListener('click', next);
$('btnAgain').addEventListener('click', () => { $('chkShuffle').checked = $('chkShuffle2').checked; startGame(); });
$('btnMenu').addEventListener('click', () => { Sound.click(); $('chkShuffle').checked = $('chkShuffle2').checked; showMenu(); });
$('radar').addEventListener('click', () => { if (S.phase === 'typing') finishType(); });
$('dlgText').addEventListener('click', () => { if (S.typing) finishType(); });
document.querySelectorAll('.life').forEach(b => b.addEventListener('click', () => useLife(b.dataset.l)));
document.addEventListener('keydown', e => {
  if (e.repeat) return;
  const k = e.key.toLowerCase();
  if (k === 'm') return toggleSound();
  if (!$('howto').classList.contains('hidden')) { if (k === 'escape' || k === 'enter') $('howto').classList.add('hidden'); return; }
  const go = k === 'enter' || k === ' ';
  if (S.phase === 'menu') { if (k === 'enter') startGame(); return; }
  if (S.phase === 'intro') { if (go) { e.preventDefault(); beginStage(); } return; }
  if (S.phase === 'typing') { if (go || /^[abcd1-4]$/.test(k)) { e.preventDefault(); finishType(); } return; }
  if (S.phase === 'asking') { const map = { a: 0, b: 1, c: 2, d: 3, 1: 0, 2: 1, 3: 2, 4: 3 }; if (k in map) { e.preventDefault(); choose(map[k]); } return; }
  if (S.phase === 'review') { if (go || k === 'n') { e.preventDefault(); next(); } return; }
  if (S.phase === 'end') { if (k === 'enter') { $('chkShuffle').checked = $('chkShuffle2').checked; startGame(); } }
});
window.addEventListener('resize', fitScene);

/* ===================== KHỞI TẠO ===================== */
(function init() {
  const root = document.documentElement.style;
  root.setProperty('--wv1', waveURI('#4DD0E1', '#e0f7fa', '#1E88E5'));
  root.setProperty('--wv2', waveURI('#81d4fa', '#ffffff', '#1565c0'));
  root.setProperty('--wv3', waveURI('#4DD0E1', '#ffffff', '#0D47A1'));
  paintSprites();
  document.querySelectorAll('.world').forEach(decorate);
  const prefs = Store.get(CONFIG.PREF_KEY, {});
  Sound.on = prefs.sound !== false;
  $('chkShuffle').checked = !!prefs.shuffle;
  S.hi = +Store.get(CONFIG.HI_KEY, 0) || 0;
  renderSoundBtns(); renderHi(); renderLives(); renderTimer();
  prepareList(); buildRoute($('route')); setRoute($('route'), 0, true);
  setScene(1);
  $('stageName').textContent = 'Sẵn sàng ra khơi...';
})();
