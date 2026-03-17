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
    yes:    '✓\u00a0Dibo, in sha Allah',
    no:     '✕\u00a0Uh... na',
    infoTag:'bKash',
    copy:   'Copy Number',
    copied: 'Copied ✓',
    duaTxt: 'JazakAllahu Khayran 🤲 — may this Eid bring you immeasurable joy. Ameen.',
    clbl:   'Eid Card',
    dl:     '↓ Download',
    gen:    'Generate Eid Card',
    lgLabel:'EN',
    noMsgs: [
      'Oh... okay 😶',
      'Na thak, kono problem nei... 🙂',
      'Seriously kichhu na, sad na ami 😌',
      'Haha... okay okay 😅',
      'Thik ache bhai, Allah malik 🙏',
      'Ektu awkward hocche kintu... 😶‍🌫️',
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
    yes:    "✓\u00a0Yes, inshallah",
    no:     "✕\u00a0Uh... no",
    infoTag:'bKash',
    copy:   'Copy Number',
    copied: 'Copied ✓',
    duaTxt: 'JazakAllahu Khayran 🤲 — may this Eid bring you immeasurable joy. Ameen.',
    clbl:   'Eid Card',
    dl:     '↓ Download',
    gen:    'Generate Eid Card',
    lgLabel:'বাংলিশ',
    noMsgs: [
      'Oh... okay 😶',
      "No worries, it's fine 🙂",
      "Not sad at all, promise 😌",
      'Haha okay okay 😅',
      'All good, Allah malik 🙏',
      'A little awkward but... fine 😶‍🌫️',
      "Could've asked again but nah 🌸",
      "You're probably busy, I get it 😌",
      "Won't ask next Eid either inshallah 😅",
      'Take care, keeping you in duas 🤲'
    ]
  }
};
const tx = () => TX[lang];

function applyLang() {
  const t = tx();
  document.getElementById('lbl').textContent      = t.lbl;
  document.getElementById('ttl').textContent      = t.ttl;
  document.getElementById('dua').textContent      = t.dua;
  document.getElementById('ask').innerHTML        = t.ask;
  document.getElementById('asub').textContent     = t.asub;
  if (!currentNudge) document.getElementById('nudge').textContent = t.nudge;
  document.getElementById('yesBtn').textContent   = t.yes;
  document.getElementById('noBtn').textContent    = t.no;
  document.getElementById('infoTag').textContent  = t.infoTag;
  document.getElementById('cpBtn').textContent    = t.copy;
  document.getElementById('duaTxt').textContent   = t.duaTxt;
  document.getElementById('clbl').textContent     = t.clbl;
  document.getElementById('dlBtn').textContent    = t.dl;
  document.getElementById('genBtn').textContent   = t.gen;
  document.getElementById('lgLabel').textContent  = t.lgLabel;
}
function toggleL() { lang = lang === 'bn' ? 'en' : 'bn'; applyLang(); }

/* ── BACKGROUND CANVAS ── */
const cv  = document.getElementById('bg');
const ctx = cv.getContext('2d');
let pts = [], raf = null;

function rsz() { cv.width = innerWidth; cv.height = innerHeight; initPts(); }
function initPts() {
  pts = [];
  for (let i = 0; i < 48; i++) pts.push({
    x:   Math.random() * cv.width,
    y:   Math.random() * cv.height,
    r:   Math.random() * 1.6 + 0.3,
    vy:  Math.random() * 0.06 + 0.006,
    ph:  Math.random() * Math.PI * 2,
    spd: Math.random() * 0.01 + 0.003
  });
}
function drawBg() {
  if (raf) cancelAnimationFrame(raf);
  function frame() {
    const W = cv.width, H = cv.height;
    ctx.fillStyle = '#eff1ee'; ctx.fillRect(0, 0, W, H);
    pts.forEach(p => {
      p.ph += p.spd; p.y += p.vy;
      if (p.y > H + 8) { p.y = -8; p.x = Math.random() * W; }
      const a = 0.03 + Math.sin(p.ph) * 0.04;
      ctx.fillStyle = `rgba(90,140,110,${Math.max(0, a)})`;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
    });
    raf = requestAnimationFrame(frame);
  }
  frame();
}
window.addEventListener('resize', rsz);
rsz(); drawBg();

/* ── NO BUTTON — spring bounce flee ── */
let nCount = 0, ySize = 14, currentNudge = '';

function flee(e) {
  if (e) { e.preventDefault(); e.stopPropagation(); }

  const btn = document.getElementById('noBtn');
  const bw  = btn.offsetWidth  || 132;
  const bh  = btn.offsetHeight || 44;

  /* Step 1: pin to current spot as fixed, no transition yet */
  const rect = btn.getBoundingClientRect();
  btn.style.transition = 'none';
  btn.classList.add('floating');
  btn.style.left   = rect.left + 'px';
  btn.style.top    = rect.top  + 'px';
  btn.style.right  = 'auto';
  btn.style.bottom = 'auto';

  /* Step 2: two frames later — restore transition, move to random spot */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      btn.style.transition = '';
      btn.style.left = Math.max(10, Math.random() * (innerWidth  - bw - 10)) + 'px';
      btn.style.top  = Math.max(62, Math.random() * (innerHeight - bh - 10)) + 'px';
    });
  });

  nCount++;
  if (ySize < 22) { ySize += 0.9; document.getElementById('yesBtn').style.fontSize = ySize + 'px'; }
  currentNudge = tx().noMsgs[Math.min(nCount - 1, tx().noMsgs.length - 1)];
  document.getElementById('nudge').textContent = currentNudge;

  if (nCount >= 10) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      btn.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
      btn.style.opacity    = '0';
      btn.style.transform  = 'scale(0.05)';
      btn.style.pointerEvents = 'none';
      setTimeout(() => btn.style.display = 'none', 650);
    }));
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

/* ── CONFETTI ── */
function burst() {
  const cols  = ['#8aaa98','#b8d0c0','#6a9278','#3a6e50','#c8e0d0','#a0c4b0'];
  const chars = ['✿','·','◦','○','✦','◇','❀','*'];
  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'cp';
      el.textContent = chars[Math.floor(Math.random() * chars.length)];
      el.style.left              = Math.random() * 100 + 'vw';
      el.style.color             = cols[Math.floor(Math.random() * cols.length)];
      el.style.fontSize          = (7 + Math.random() * 11) + 'px';
      el.style.animationDuration = (1.8 + Math.random() * 2.6) + 's';
      el.style.animationDelay    = Math.random() * 0.4 + 's';
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 5200);
    }, i * 15);
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

  const g = x.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, '#eff1ee'); g.addColorStop(1, '#e4e8e2');
  x.fillStyle = g; x.fillRect(0, 0, W, H);

  x.strokeStyle = '#6a927855'; x.lineWidth = 0.8;
  x.strokeRect(12, 12, W - 24, H - 24);

  x.font = '13px serif'; x.textAlign = 'center'; x.textBaseline = 'middle';
  x.fillStyle = '#6a927899';
  [[22,22],[W-22,22],[22,H-22],[W-22,H-22]].forEach(([cx2,cy2]) => x.fillText('✿', cx2, cy2));

  x.font = '28px serif'; x.fillText('🌙', W/2 - 18, 50);
  x.font = '14px serif'; x.fillStyle = '#6a9278'; x.fillText('✦', W/2 + 18, 50);

  x.fillStyle = '#6a9278';
  x.font = 'italic 600 31px "Lora",serif';
  x.shadowColor = '#6a927855'; x.shadowBlur = 10;
  x.fillText('Eid Mubarak', W/2, 96);
  x.shadowBlur = 0;

  x.fillStyle = '#9aaa9e'; x.font = 'italic 13px "Lora",serif';
  x.fillText('Taqabbalallahu Minna Wa Minkum', W/2, 120);

  x.strokeStyle = '#6a927830'; x.lineWidth = 0.6;
  x.beginPath(); x.moveTo(70, 136); x.lineTo(W-70, 136); x.stroke();

  x.fillStyle = '#8aaa98'; x.font = '300 13.5px "DM Sans",sans-serif';
  x.fillText("With warmest wishes and du'a,", W/2, 158);
  x.fillStyle = '#2c3a34'; x.font = '600 20px "Lora",serif';
  x.fillText('Shaon', W/2, 185);
  x.fillStyle = '#9aaa9e'; x.font = '300 11.5px "DM Sans",sans-serif';
  x.fillText('EID UL FITR  ' + new Date().getFullYear(), W/2, 208);

  x.fillStyle = '#6a927812'; x.fillRect(0, H-30, W, 30);
  x.fillStyle = '#9aaa9e'; x.font = '11px "DM Sans",sans-serif';
  x.fillText('May Allah accept from us and from you  ·  Ameen', W/2, H-12);
}

function dlCard() {
  const a = document.createElement('a');
  a.download = 'EidCard-Shaon.png';
  a.href = document.getElementById('ec').toDataURL();
  a.click();
}

/* ── INIT ── */
applyLang();
