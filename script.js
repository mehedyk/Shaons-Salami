'use strict';
document.getElementById('yr').textContent = new Date().getFullYear();

/* ── LANGUAGE ── */
let lang = 'bn';
const TX = {
  bn: {
    lbl:    'Eid ul Fitr',
    ttl:    'Eid Mubarak',
    dua:    'তাকাব্বালাল্লাহু মিন্না ওয়া মিনকুম',
    ask:    'Aslm... Shaon bol-te bol-te jigges korte cha-icche — ektu salami deben? 🌸',
    asub:   'Na dile-o thik ache, really... bas jigges korlam 😶',
    nudge:  'Thik ache, no pressure... 😌',
    yes:    '✓&nbsp;Dibo, in sha Allah',
    no:     '✕&nbsp;Uh... na',
    infoTag:'bKash',
    copy:   'Copy Number',
    copied: 'Copied ✓',
    duaTxt: 'JazakAllahu Khayran 🤲 — may this Eid bring you immeasurable joy. Ameen.',
    clbl:   'Eid Card',
    dl:     '↓ Download',
    gen:    'Generate Eid Card',
    lgBtn:  'EN',
    noMsgs: [
      'Oh... okay 😶',
      'Na thak, kono problem nei... 🙂',
      'Seriously kichhu na, sad na ami 😌',
      'Haha... okay okay 😅',
      'Thik ache bhai, Allah malik 🙏',
      'Ektu awkward hocche kintu괜찮아... 😶‍🌫️',
      'Aro ekbar jigges korte partam... kintu na thak 🌸',
      'Tumi busy thako, ami bujhi 😌',
      'Next Eid-e jigges korbo na inshallah 😅',
      'Thak, dua te rakhis 🤲'
    ]
  },
  en: {
    lbl:    'Eid ul Fitr',
    ttl:    'Eid Mubarak',
    dua:    'Taqabbalallahu Minna Wa Minkum',
    ask:    "Aslm... Shaon wanted to quietly ask — could you send a little salami? 🌸",
    asub:   "It's totally fine if not, really... just thought I'd ask 😶",
    nudge:  "No pressure at all, honestly 😌",
    yes:    '✓&nbsp;Yes, inshallah',
    no:     "✕&nbsp;Uh... no",
    infoTag:'bKash',
    copy:   'Copy Number',
    copied: 'Copied ✓',
    duaTxt: 'JazakAllahu Khayran 🤲 — may this Eid bring you immeasurable joy. Ameen.',
    clbl:   'Eid Card',
    dl:     '↓ Download',
    gen:    'Generate Eid Card',
    lgBtn:  'বাংলিশ',
    noMsgs: [
      'Oh... okay 😶',
      "No worries, it's fine 🙂",
      "Not sad at all, promise 😌",
      'Haha okay okay 😅',
      'All good, Allah malik 🙏',
      'A little awkward but... fine 😶‍🌫️',
      "Could've asked again but nah 🌸",
      'You're probably busy, I get it 😌',
      "Won't ask next Eid either inshallah 😅",
      'Take care, keeping you in duas 🤲'
    ]
  }
};
const tx = () => TX[lang];

function applyLang() {
  const t = tx();
  document.getElementById('lbl').textContent     = t.lbl;
  document.getElementById('ttl').textContent     = t.ttl;
  document.getElementById('dua').textContent     = t.dua;
  document.getElementById('ask').innerHTML       = t.ask;
  document.getElementById('asub').textContent    = t.asub;
  if (!currentNudge) document.getElementById('nudge').textContent = t.nudge;
  document.getElementById('yesBtn').innerHTML    = t.yes;
  document.getElementById('noBtn').innerHTML     = t.no;
  document.getElementById('infoTag').textContent = t.infoTag;
  document.getElementById('cpBtn').textContent   = t.copy;
  document.getElementById('duaTxt').textContent  = t.duaTxt;
  document.getElementById('clbl').textContent    = t.clbl;
  document.getElementById('dlBtn').textContent   = t.dl;
  document.getElementById('genBtn').textContent  = t.gen;
  document.getElementById('lgBtn').textContent   = t.lgBtn;
}
function toggleL() { lang = lang === 'bn' ? 'en' : 'bn'; applyLang(); }

/* ── THEME ── */
let theme = 'mist';
const THEMES = [
  { key: 'mist', label: '🌫️ Mist' },
  { key: 'rose', label: '🌸 Dusk Rose' }
];
let themeIdx = 0;
function cycleTheme() {
  themeIdx = (themeIdx + 1) % THEMES.length;
  const { key, label } = THEMES[themeIdx];
  theme = key;
  document.body.className = key;
  document.getElementById('tpLbl').textContent = label;
  initPts(); drawBg();
  if (cardMade) makeCard();
}

/* ── BACKGROUND CANVAS ── */
const cv  = document.getElementById('bg');
const ctx = cv.getContext('2d');
let pts = [], raf = null;

function rsz() { cv.width = innerWidth; cv.height = innerHeight; initPts(); }
function initPts() {
  pts = [];
  /* fewer, slower, rounder particles — matches the shy soft vibe */
  for (let i = 0; i < 55; i++) pts.push({
    x:   Math.random() * cv.width,
    y:   Math.random() * cv.height,
    r:   Math.random() * 1.8 + 0.4,
    vy:  Math.random() * 0.08 + 0.008,
    ph:  Math.random() * Math.PI * 2,
    spd: Math.random() * 0.012 + 0.003
  });
}

const BG = {
  mist: { base: '#eef0ed', pt: '100,150,125' },
  rose: { base: '#18100e', pt: '190,130,115' }
};

function drawBg() {
  if (raf) cancelAnimationFrame(raf);
  const col = BG[theme] || BG.mist;
  const isMist = theme === 'mist';

  function frame() {
    const W = cv.width, H = cv.height;
    ctx.fillStyle = col.base; ctx.fillRect(0, 0, W, H);

    pts.forEach(p => {
      p.ph += p.spd;
      p.y  += p.vy * 0.3;
      if (p.y > H + 8) { p.y = -8; p.x = Math.random() * W; }

      /* mist: very faint green-grey dots; rose: warm pinkish glow dots */
      const a = isMist
        ? 0.04 + Math.sin(p.ph) * 0.05
        : 0.06 + Math.sin(p.ph) * 0.12;

      ctx.fillStyle = `rgba(${col.pt},${Math.max(0, a)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (isMist ? 1 : 1.4), 0, Math.PI * 2);
      ctx.fill();
    });

    raf = requestAnimationFrame(frame);
  }
  frame();
}

window.addEventListener('resize', rsz);
rsz(); drawBg();

/* ── NO BUTTON — shy escalating, 10 tries then gone ── */
let nCount = 0, ySize = 14, currentNudge = '';

function flee(e) {
  if (e) e.stopPropagation();
  const btn = document.getElementById('noBtn');
  btn.classList.add('floating');
  const bw = btn.offsetWidth || 130, bh = btn.offsetHeight || 46;
  btn.style.left   = Math.max(10, Math.random() * (innerWidth  - bw - 10)) + 'px';
  btn.style.top    = Math.max(62, Math.random() * (innerHeight - bh - 10)) + 'px';
  btn.style.right  = 'auto';
  btn.style.bottom = 'auto';
  nCount++;
  if (ySize < 22) { ySize += 0.9; document.getElementById('yesBtn').style.fontSize = ySize + 'px'; }
  currentNudge = tx().noMsgs[Math.min(nCount - 1, tx().noMsgs.length - 1)];
  document.getElementById('nudge').textContent = currentNudge;
  if (nCount >= 10) {
    btn.style.transition = 'opacity 0.6s, transform 0.6s';
    btn.style.opacity    = '0';
    btn.style.transform  = 'scale(0.05)';
    btn.style.pointerEvents = 'none';
    setTimeout(() => btn.style.display = 'none', 700);
  }
}

/* ── YES ── */
function onYes() {
  document.getElementById('yesBtn').disabled = true;
  document.getElementById('noBtn').style.display = 'none';
  document.getElementById('info').classList.add('show');
  burst();
  makeCard();
}

/* ── COPY ── */
function doCopy() {
  navigator.clipboard.writeText('01946785328').catch(() => {});
  const b = document.getElementById('cpBtn');
  b.textContent = tx().copied;
  setTimeout(() => b.textContent = tx().copy, 2200);
}

/* ── CONFETTI — soft petals ── */
function burst() {
  const palettes = {
    mist: ['#8aaa98', '#b8d0c0', '#6a8878', '#3a6050', '#d0e8dc'],
    rose: ['#c09080', '#e8c8b8', '#b08878', '#f0ddd5', '#d4a898']
  };
  const cols  = palettes[theme];
  const chars = ['✿', '·', '◦', '○', '✦', '◇', '❀'];
  for (let i = 0; i < 65; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'cp';
      el.textContent = chars[Math.floor(Math.random() * chars.length)];
      el.style.left = Math.random() * 100 + 'vw';
      el.style.color = cols[Math.floor(Math.random() * cols.length)];
      el.style.fontSize = (7 + Math.random() * 12) + 'px';
      el.style.animationDuration = (1.6 + Math.random() * 2.8) + 's';
      el.style.animationDelay    = Math.random() * 0.5 + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5000);
    }, i * 14);
  }
}

/* ── EID CARD ── */
let cardMade = false;
function makeCard() {
  cardMade = true;
  document.getElementById('cardWrap').classList.add('show');
  document.getElementById('genWrap').style.display = 'none';
  drawCard();
}
function drawCard() {
  const c = document.getElementById('ec');
  const x = c.getContext('2d');
  const W = c.width, H = c.height;

  const P = {
    mist: { bg1:'#eef0ed', bg2:'#e4e8e3', acc:'#6a8878', sub:'#8aaa98', txt:'#2e3c38', muted:'#9aaa9e' },
    rose: { bg1:'#18100e', bg2:'#241614', acc:'#c09080', sub:'#a08070', txt:'#f0ddd5', muted:'#705048' }
  };
  const p = P[theme];

  const g = x.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, p.bg1); g.addColorStop(1, p.bg2);
  x.fillStyle = g; x.fillRect(0, 0, W, H);

  /* soft border */
  x.strokeStyle = p.acc + '55'; x.lineWidth = 0.8; x.strokeRect(12, 12, W - 24, H - 24);

  /* corner petals */
  x.font = '13px serif'; x.textBaseline = 'middle'; x.textAlign = 'center';
  [[22,22],[W-22,22],[22,H-22],[W-22,H-22]].forEach(([cx2,cy2]) => {
    x.fillStyle = p.acc + '99';
    x.fillText('✿', cx2, cy2);
  });

  /* crescent + star */
  x.font = '30px serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillText('🌙', W / 2 - 20, 50);
  x.font = '16px serif';
  x.fillText('✦', W / 2 + 20, 50);

  /* title */
  x.fillStyle = p.acc;
  x.font = 'italic 600 32px "Lora",serif';
  x.shadowColor = p.acc; x.shadowBlur = 10;
  x.fillText('Eid Mubarak', W / 2, 98);
  x.shadowBlur = 0;

  /* dua */
  x.fillStyle = p.muted; x.font = 'italic 13px "Lora",serif';
  x.fillText('Taqabbalallahu Minna Wa Minkum', W / 2, 122);

  /* divider */
  x.strokeStyle = p.acc + '35'; x.lineWidth = 0.6;
  x.beginPath(); x.moveTo(70, 138); x.lineTo(W - 70, 138); x.stroke();

  /* from */
  x.fillStyle = p.sub; x.font = '300 13.5px "DM Sans",sans-serif';
  x.fillText("With warmest wishes and du'a,", W / 2, 161);
  x.fillStyle = p.txt;
  x.font = '600 20px "Lora",serif';
  x.fillText('Shaon', W / 2, 188);
  x.fillStyle = p.muted; x.font = '300 11.5px "DM Sans",sans-serif';
  x.fillText('EID UL FITR  ' + new Date().getFullYear(), W / 2, 212);

  /* footer strip */
  x.fillStyle = p.acc + '12'; x.fillRect(0, H - 30, W, 30);
  x.fillStyle = p.muted; x.font = '11px "DM Sans",sans-serif';
  x.fillText('May Allah accept from us and from you  ·  Ameen', W / 2, H - 12);
}

function dlCard() {
  const a = document.createElement('a');
  a.download = `EidCard-Shaon-${theme}.png`;
  a.href = document.getElementById('ec').toDataURL();
  a.click();
}

/* ── INIT ── */
applyLang();
