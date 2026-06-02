import { useState, useEffect } from "react";
import logo from "/images/logo.png";
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=Rajdhani:wght@300;400;500;600;700&family=Exo+2:ital,wght@0,200;0,400;0,600;1,400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #f0a800;
    --gold-light: #ffc933;
    --gold-dark: #c17f00;
    --teal: #00e5c0;
    --teal-dark: #00a88a;
    --bg-deep: #020509;
    --bg-dark: #040c14;
    --bg-card: rgba(4, 18, 32, 0.85);
    --bg-card-border: rgba(0, 229, 192, 0.18);
    --text-bright: #ffffff;
    --text-muted: #8aabb8;
    --silver: #b0c4d4;
  }

  body { background: var(--bg-deep); font-family: 'Rajdhani', sans-serif; color: var(--text-bright); overflow-x: hidden; }

  /* ——— SCROLLBAR ——— */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: #020509; }
  ::-webkit-scrollbar-thumb { background: var(--teal-dark); border-radius: 3px; }

  /* ——— HERO ——— */
  .hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;
    padding: 100px 20px 60px;
  }

  .hero-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,229,192,0.13) 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 80% 100%, rgba(240,168,0,0.10) 0%, transparent 55%),
      radial-gradient(ellipse 100% 100% at 50% 50%, #040c14 60%, #020509 100%);
  }

  .circuit-lines {
    position: absolute; inset: 0; pointer-events: none; overflow: hidden;
  }

  .grid-overlay {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(0,229,192,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,229,192,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridDrift 20s linear infinite;
  }
  @keyframes gridDrift { 0% { transform: translateY(0); } 100% { transform: translateY(60px); } }

  .particle { position: absolute; border-radius: 50%; pointer-events: none; animation: floatUp linear infinite; }
  @keyframes floatUp {
    0% { transform: translateY(100vh) scale(0); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 0.6; }
    100% { transform: translateY(-10vh) scale(1); opacity: 0; }
  }

  .hero-logo { position: relative; margin-bottom: 20px; animation: logoReveal 1.2s cubic-bezier(0.23, 1, 0.32, 1) both; }
  @keyframes logoReveal {
    from { opacity: 0; transform: scale(0.7) translateY(30px); }
    to { opacity: 1; transform: scale(1) translateY(0); }
  }

  .logo-hex {
     position: relative; margin: 0 auto 20px;
    filter: drop-shadow(0 0 40px rgba(240,168,0,0.6)) drop-shadow(0 0 80px rgba(0,229,192,0.3));
  }
  .logo-hex svg { width: 100%; height: 100%; }

  .logo-glow-ring {
    position: absolute; inset: -20px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(240,168,0,0.15) 0%, transparent 70%);
    animation: pulse 2.5s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100% { transform: scale(1); opacity: 0.7; } 50% { transform: scale(1.15); opacity: 1; } }

  .brand-name {
    font-family: 'Orbitron', monospace;
    font-size: clamp(3.5rem, 10vw, 7rem);
    font-weight: 900;
    letter-spacing: 0.08em;
    line-height: 1;
    background: linear-gradient(135deg, #ffffff 0%, #d0e8f0 40%, var(--teal) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fadeSlideUp 1s 0.3s both;
    position: relative;
  }
  .brand-name span.pro { background: linear-gradient(135deg, var(--gold-light), var(--gold)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

  .tagline {
    font-family: 'Orbitron', monospace;
    font-size: clamp(0.6rem, 1.5vw, 0.85rem);
    letter-spacing: 0.35em;
    color: var(--gold);
    margin-top: 6px;
    animation: fadeSlideUp 1s 0.5s both;
  }
  .tagline-dividers { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 4px; }
  .tdiv { width: 60px; height: 1px; background: linear-gradient(90deg, transparent, var(--gold), transparent); }

  .hero-subtitle {
    max-width: 680px;
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    font-weight: 400;
    color: var(--silver);
    line-height: 1.7;
    margin: 30px auto 0;
    animation: fadeSlideUp 1s 0.7s both;
  }
  .hero-subtitle strong { color: var(--teal); font-weight: 600; }

  .hero-cta-group {
    display: flex; gap: 16px; flex-wrap: wrap; justify-content: center;
    margin-top: 40px;
    animation: fadeSlideUp 1s 0.9s both;
  }

  .btn-primary {
    font-family: 'Orbitron', monospace;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    padding: 16px 18px;
    border: none;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    background: linear-gradient(135deg, var(--gold-dark), var(--gold), var(--gold-light));
    color: #000;
    clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
    transition: all 0.3s ease;
    text-transform: uppercase;
  }
  .btn-primary:hover { transform: translateY(-3px); filter: brightness(1.15) drop-shadow(0 8px 24px rgba(240,168,0,0.5)); }
  .btn-primary::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%); transform: translateX(-100%); transition: 0.4s; }
  .btn-primary:hover::after { transform: translateX(100%); }

  .btn-outline {
    font-family: 'Orbitron', monospace;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    padding: 15px 38px;
    border: 1px solid var(--teal);
    background: transparent;
    color: var(--teal);
    cursor: pointer;
    clip-path: polygon(12px 0%, 100% 0%, calc(100% - 12px) 100%, 0% 100%);
    transition: all 0.3s ease;
    text-transform: uppercase;
  }
  .btn-outline:hover { background: rgba(0,229,192,0.1); transform: translateY(-3px); box-shadow: 0 0 30px rgba(0,229,192,0.3); }

  @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

  /* ——— STATS BAR ——— */
  .stats-bar {
    background: linear-gradient(90deg, rgba(0,229,192,0.06), rgba(240,168,0,0.06));
    border-top: 1px solid rgba(0,229,192,0.2);
    border-bottom: 1px solid rgba(240,168,0,0.15);
    padding: 28px 40px;
    display: flex;
    justify-content: center;
    gap: 0;
    flex-wrap: wrap;
    position: relative;
    z-index: 2;
  }
  .stat-item {
    flex: 1; min-width: 160px; max-width: 220px;
    text-align: center;
    padding: 12px 24px;
    border-right: 1px solid rgba(255,255,255,0.07);
  }
  .stat-item:last-child { border-right: none; }
  .stat-num {
    font-family: 'Orbitron', monospace;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    font-weight: 900;
    background: linear-gradient(135deg, var(--gold-light), var(--teal));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .stat-label { font-size: 0.78rem; color: var(--text-muted); letter-spacing: 0.12em; text-transform: uppercase; margin-top: 4px; }

  /* ——— SECTION SHARED ——— */
  .section { padding: 100px 20px; position: relative; }
  .section-inner { max-width: 1160px; margin: 0 auto; }
  .section-tag {
    font-family: 'Orbitron', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.4em;
    color: var(--teal);
    text-transform: uppercase;
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 12px;
    justify-content: center;
  }
  .section-tag::before, .section-tag::after { content: ''; flex: 0 0 40px; height: 1px; background: var(--teal); opacity: 0.5; }
  .section-title {
    font-family: 'Orbitron', monospace;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 700;
    text-align: center;
    margin-bottom: 50px;
    background: linear-gradient(135deg, #fff 0%, var(--silver) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    line-height: 1.2;
  }
  .section-title .highlight-gold { background: linear-gradient(135deg, var(--gold-light), var(--gold)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .section-title .highlight-teal { background: linear-gradient(135deg, var(--teal), var(--teal-dark)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

  /* ——— WHAT IS SECTION ——— */
  .what-bg { background: radial-gradient(ellipse 70% 60% at 20% 50%, rgba(0,229,192,0.07) 0%, transparent 60%); }

  .what-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
  @media (max-width: 768px) { .what-grid { grid-template-columns: 1fr; } }

  .what-visual {
    position: relative;
    display: flex; align-items: center; justify-content: center;
  }
  .what-glow-box {
    position: relative;
    padding: 3px;
    border-radius: 4px;
  }
  .what-glow-inner {
   background: rgb(0 0 0 / 34%);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 0 12px 6px rgba(255, 255, 255, 0.4);
    padding: 40px 36px;
  }
  .what-icon { font-size: 3.5rem; margin-bottom: 16px; }
  .what-heading {
    font-family: 'Orbitron', monospace;
    font-size: 1.4rem; font-weight: 700;
    color: var(--gold-light);
    margin-bottom: 14px;
  }
  .what-text { font-size: 1rem; line-height: 1.8; color: var(--silver); }
  .what-text strong { color: var(--teal); }

  .what-info { display: flex; flex-direction: column; gap: 22px; }
  .info-card {
    background: rgb(0 0 0 / 16%);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 0 12px 6px rgba(255, 255, 255, 0.4);
    display: flex;
    gap: 18px;
    align-items: flex-start;
    padding: 20px 22px;
    /* background: rgb(251 251 251 / 15%); */
    border: 1px solid var(--bg-card-border);
    border-left: 3px solid var(--teal);
    /* border-radius: 2px; */
    transition: border-color 0.3s, transform 0.3s;
  }
  .info-card:hover { border-left-color: var(--gold); transform: translateX(6px); }
  .info-card-icon { font-size: 1.6rem; flex-shrink: 0; }
  .info-card-title { font-family: 'Orbitron', monospace; font-size: 0.85rem; font-weight: 700; color: var(--gold-light); margin-bottom: 5px; }
  .info-card-text { font-size: 0.92rem; color: var(--text-muted); line-height: 1.6; }

  /* ——— HOW IT WORKS ——— */
  .how-bg {
    background:
      radial-gradient(ellipse 80% 60% at 80% 50%, rgba(240,168,0,0.07) 0%, transparent 55%),
      linear-gradient(180deg, var(--bg-deep), #030a12, var(--bg-deep));
  }

  .steps-flow {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0;
    position: relative;
    margin-bottom: 60px;
  }
  @media (max-width: 900px) { .steps-flow { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 500px) { .steps-flow { grid-template-columns: 1fr; } }

  .steps-flow::before {
    content: '';
    position: absolute;
    top: 54px; left: 12.5%; right: 12.5%;
    height: 2px;
    background: linear-gradient(90deg, var(--teal), var(--gold), var(--teal));
    z-index: 0;
  }
  @media (max-width: 900px) { .steps-flow::before { display: none; } }

  .step-card {
    display: flex; flex-direction: column; align-items: center; text-align: center;
    padding: 36px 20px 28px;
    position: relative; z-index: 1;
    transition: transform 0.3s;
  }
  .step-card:hover { transform: translateY(-8px); }

  .step-num-ring {
    width: 72px; height: 72px;
    border-radius: 50%;
        background: rgb(0 0 0 / 16%);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 0 12px 6px rgba(255, 255, 255, 0.4);
    display: flex;
    gap: 18px;
    align-items: flex-start;
    padding: 20px 22px;
    transition: border-color 0.3s, transform 0.3s;
    width: 72px;
    height: 72px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  
    margin-bottom: 20px;
    font-size: 1.6rem;
  }
  .step-num-ring .step-number {
    position: absolute; top: -10px; right: -10px;
    width: 24px; height: 24px;
    background: var(--gold);
    color: #000;
    font-family: 'Orbitron', monospace;
    font-size: 0.65rem;
    font-weight: 900;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }
  .step-title { font-family: 'Orbitron', monospace; font-size: 0.85rem; font-weight: 700; color: var(--gold-light); margin-bottom: 10px; letter-spacing: 0.05em; }
  .step-desc { font-size: 0.88rem; color: var(--text-muted); line-height: 1.6; }

  .how-detail {
    background: rgb(0 0 0 / 16%);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 0 12px 6px rgba(255, 255, 255, 0.4);
    
    padding: 36px 40px;
    border-radius: 2px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
  }
  @media (max-width: 700px) { .how-detail { grid-template-columns: 1fr; gap: 24px; } }

  .how-detail-text { font-size: 1rem; line-height: 1.85; color: var(--silver); }
  .how-detail-text strong { color: var(--teal); }
  .how-detail-text .gold { color: var(--gold-light); font-weight: 700; }

  .how-mini-steps { display: flex; flex-direction: column; gap: 12px; }
  .mini-step {
    display: flex; align-items: center; gap: 14px;
    padding: 14px 18px;
   background: rgb(0 0 0 / 16%);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 0 12px 6px rgba(255, 255, 255, 0.4);
    border-radius: 10px;
    font-size: 0.9rem; color: var(--silver);
    transition: background 0.3s;
  }
  .mini-step:hover { background: rgba(0,229,192,0.1); }
  .mini-step-icon { font-size: 1.2rem; flex-shrink: 0; }
  .mini-step strong { font-family: 'Orbitron', monospace; font-size: 0.75rem; color: var(--gold); margin-right: 6px; }

  /* ——— ABOUT US ——— */
  .about-bg {
    background:
      radial-gradient(ellipse 70% 70% at 30% 50%, rgba(0,229,192,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 50% 50% at 70% 80%, rgba(240,168,0,0.07) 0%, transparent 55%);
  }

  .about-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
  @media (max-width: 900px) { .about-grid { grid-template-columns: 1fr; } }

  .about-card {
    padding: 36px 28px;
    background: rgb(0 0 0 / 16%);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 0 12px 6px rgba(255, 255, 255, 0.4);
   
    border-top: 3px solid transparent;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s, border-top-color 0.3s;
  }
  .about-card::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,229,192,0.04) 0%, transparent 60%); pointer-events: none; }
  .about-card:hover { transform: translateY(-6px); border-top-color: var(--teal); }
  .about-card.gold-top:hover { border-top-color: var(--gold); }
  .about-card-icon { font-size: 2.4rem; margin-bottom: 16px; }
  .about-card-title { font-family: 'Orbitron', monospace; font-size: 0.95rem; font-weight: 700; color: var(--gold-light); margin-bottom: 12px; }
  .about-card-text { font-size: 0.92rem; color: var(--text-muted); line-height: 1.75; }
  .about-card-text strong { color: var(--teal); }

  /* ——— VISION ——— */
  .vision-section {
    position: relative; overflow: hidden;
    padding: 120px 20px;
  }
  .vision-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,229,192,0.08) 0%, transparent 60%),
      linear-gradient(180deg, var(--bg-deep) 0%, #030d18 50%, var(--bg-deep) 100%);
  }
  .vision-content { position: relative; z-index: 1; max-width: 900px; margin: 0 auto; text-align: center; }
  .vision-headline {
    font-family: 'Orbitron', monospace;
    font-size: clamp(1.6rem, 4vw, 2.8rem);
    font-weight: 900;
    line-height: 1.25;
    margin-bottom: 24px;
    background: linear-gradient(135deg, #fff 0%, var(--teal) 50%, var(--gold-light) 100%);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  }
  .vision-subtext { font-size: 1.05rem; color: var(--silver); line-height: 1.8; max-width: 680px; margin: 0 auto 40px; }
  .vision-motto {
    font-family: 'Orbitron', monospace;
    font-size: clamp(1rem, 2.5vw, 1.4rem);
    font-weight: 700;
    letter-spacing: 0.05em;
    display: inline-flex; gap: 14px;
    padding: 18px 48px;
    border: 1px solid rgba(240,168,0,0.4);
    background: rgba(240,168,0,0.06);
    clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%);
  }
  .vision-motto .vm-1 { color: var(--gold-light); }
  .vision-motto .vm-dot { color: var(--text-muted); }
  .vision-motto .vm-2 { color: var(--teal); }

  /* ——— AI MINING ——— */
  .ai-bg { background: radial-gradient(ellipse 80% 60% at 70% 40%, rgba(0,229,192,0.06) 0%, transparent 55%); }

  .ai-compare {
    display: grid;
    grid-template-columns: 1fr 80px 1fr;
    gap: 0;
    align-items: stretch;
    margin-bottom: 60px;
  }
  @media (max-width: 700px) { .ai-compare { grid-template-columns: 1fr; gap: 20px; } .ai-vs { display: none; } }

  .ai-panel {
    padding: 36px 30px;
    border-radius: 2px;
    border: 1px solid;
  }
  .ai-panel.normal {
    background: rgba(255,80,60,0.04);
    border-color: rgba(255,80,60,0.2);
    border-right: none;
  }
  .ai-panel.ai {
    background: rgba(0,229,192,0.04);
    border-color: rgba(0,229,192,0.25);
    border-left: none;
  }
  .ai-panel-label {
    font-family: 'Orbitron', monospace;
    font-size: 0.7rem; font-weight: 700;
    letter-spacing: 0.25em;
    margin-bottom: 18px;
  }
  .ai-panel.normal .ai-panel-label { color: #ff7060; }
  .ai-panel.ai .ai-panel-label { color: var(--teal); }
  .ai-panel-title { font-family: 'Orbitron', monospace; font-size: 1.4rem; font-weight: 900; margin-bottom: 16px; }
  .ai-panel.normal .ai-panel-title { color: #ff8070; }
  .ai-panel.ai .ai-panel-title { color: var(--teal); }
  .ai-panel-text { font-size: 0.95rem; color: var(--silver); line-height: 1.75; }
  .ai-panel-text strong { color: var(--gold); }

  .ai-vs {
    display: flex; align-items: center; justify-content: center;
    background: linear-gradient(180deg, rgba(240,168,0,0.08), rgba(0,229,192,0.08));
    border-top: 1px solid rgba(255,255,255,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .ai-vs-text {
    font-family: 'Orbitron', monospace;
    font-size: 0.85rem; font-weight: 900;
    background: linear-gradient(180deg, var(--gold-light), var(--teal));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
    letter-spacing: 0.1em;
    writing-mode: vertical-lr;
  }

  .ai-advantages {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  @media (max-width: 900px) { .ai-advantages { grid-template-columns: 1fr; } }

  .adv-card {
    padding: 28px 24px;
     background: rgb(0 0 0 / 16%);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.1), inset 0 0 12px 6px rgba(255, 255, 255, 0.4);
    
    border-radius: 12px;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .adv-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px rgba(0,229,192,0.12); }
  .adv-card-icon { font-size: 2rem; margin-bottom: 14px; }
  .adv-card-title { font-family: 'Orbitron', monospace; font-size: 0.85rem; font-weight: 700; color: var(--gold-light); margin-bottom: 10px; }
  .adv-card-text { font-size: 0.88rem; color: var(--text-muted); line-height: 1.7; }
  .adv-tag { display: inline-block; margin-top: 14px; font-family: 'Orbitron', monospace; font-size: 0.62rem; letter-spacing: 0.12em; color: var(--teal); border: 1px solid rgba(0,229,192,0.3); padding: 4px 12px; }

  /* ——— BOTTOM BAR ——— */
  .footer-strip {
    background: linear-gradient(90deg, rgba(0,229,192,0.06), rgba(240,168,0,0.06), rgba(0,229,192,0.06));
    border-top: 1px solid rgba(0,229,192,0.15);
    padding: 20px 40px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .footer-brand { font-family: 'Orbitron', monospace; font-size: 1rem; font-weight: 700; color: var(--teal); }
  .footer-brand span { color: var(--gold); }
  .footer-url { font-size: 0.8rem; color: var(--text-muted); }
  .footer-motto { font-family: 'Orbitron', monospace; font-size: 0.6rem; letter-spacing: 0.3em; color: var(--text-muted); }

  /* ——— NAV ——— */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 48px;
    background: rgba(2, 5, 9, 0.85);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(0,229,192,0.1);
    transition: all 0.3s;
  }
  @media (max-width: 768px) { .nav { padding: 14px 20px; } }

  .nav-logo { font-family: 'Orbitron', monospace; font-size: 1.2rem; font-weight: 900; }
  .nav-logo .pro { color: var(--gold-light); }
  .nav-logo .hash { color: var(--teal); }

  .nav-links { display: flex; gap: 32px; align-items: center; }
  @media (max-width: 768px) { .nav-links { display: none; } }

  .nav-link { font-family: 'Orbitron', monospace; font-size: 0.62rem; letter-spacing: 0.2em; color: var(--text-muted); text-decoration: none; transition: color 0.2s; text-transform: uppercase; cursor: pointer; }
  .nav-link:hover { color: var(--teal); }

  .nav-btn {
    font-family: 'Orbitron', monospace;
    font-size: 0.62rem; font-weight: 700;
    letter-spacing: 0.18em;
    padding: 10px 24px;
    border: 1px solid var(--gold);
    background: transparent;
    color: var(--gold);
    cursor: pointer;
    transition: all 0.3s;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  }
  .nav-btn:hover { background: var(--gold); color: #000; }
`;

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 12,
  duration: Math.random() * 10 + 12,
  color: i % 3 === 0 ? "#f0a800" : i % 3 === 1 ? "#00e5c0" : "#ffffff",
  opacity: Math.random() * 0.5 + 0.2,
}));

export default function ProHashHome() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav className="nav" style={scrolled ? { padding: "12px 48px", background: "rgba(2,5,9,0.97)" } : {}}>
        <div className="nav-logo">
          <span className="pro"><img src={logo} width={100} alt="ProHash Logo" /></span>
        </div>
        <div className="nav-links">
          {["What is ProHash", "How It Works", "About", "AI Mining", "Vision"].map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(" ", "-").replace(" ", "-")}`} className="nav-link">{l}</a>
          ))}
        </div>
        <a href="/signin" className="nav-btn">Start Mining</a>
      </nav>

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-bg" />
        <div className="grid-overlay" />
        <div className="circuit-lines">
          {particles.map(p => (
            <div key={p.id} className="particle" style={{
              width: p.size, height: p.size,
              left: `${p.left}%`,
              background: p.color,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }} />
          ))}
        </div>

        <div className="hero-logo">
          <div className="logo-hex">
            <div className="logo-glow-ring" />
            <img src={logo} width={400} alt="ProHash Logo" />
          
          </div>
        </div>

        {/* <div className="brand-name">
          <span className="pro">PRO</span>HASH
        </div> */}
        <div className="tagline-dividers">
          <div className="tdiv"/>
          <div className="tagline">Building Wealth · Powering Future</div>
          <div className="tdiv"/>
        </div>

        <p className="hero-subtitle">
          The <strong>100% decentralized</strong> cryptocurrency mining pool and service provider where users actively participate,
          hash rate collaborate, and grow within a <strong>unified mining ecosystem</strong>.
        </p>

        <div className="hero-cta-group">
          <a href="/signin" className="btn-primary">Start Mining Now</a>
          <a href="/signup" className="btn-outline">Learn More</a>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="stats-bar">
        {[
          { num: "100%", label: "Decentralized" },
          { num: "24/7", label: "Auto Mining" },
          { num: "0", label: "Hardware Needed" },
          { num: "Daily", label: "Rewards Paid" },
          { num: "AI", label: "Powered Optimization" },
        ].map(s => (
          <div className="stat-item" key={s.label}>
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* WHAT IS PROHASH */}
      <section className="section what-bg" id="what-is-prohash">
        <div className="section-inner">
          <div className="section-tag">What is ProHash Mining</div>
          <h2 className="section-title">Mine Crypto Without <span className="highlight-gold">Hardware</span> or Complexity</h2>
          <div className="what-grid">
            <div className="what-visual">
              <div className="what-glow-box">
                <div className="what-glow-inner">
                  <div className="what-icon">⛏️</div>
                  <div className="what-heading">PROHASH Mining</div>
                  <p className="what-text">
                    A simple way to mine cryptocurrency without buying <strong>NO HARDWARE</strong> or managing hardware.
                    Users rent mining power <strong>(HASHRATE)</strong> from professional mining data centers and <strong>EARN REWARDS</strong>.
                  </p>
                </div>
              </div>
            </div>
            <div className="what-info">
              {[
                { icon: "💻", title: "No Hardware Required", text: "Mine crypto without expensive machines or hardware management. Everything runs remotely." },
                { icon: "⚡", title: "Rent Hashrate", text: "Simply rent computing power from professional mining farms. No technical setup needed." },
                { icon: "💰", title: "Daily Rewards", text: "Earn passive income automatically. Rewards are distributed daily to your mining wallet." },
                { icon: "🔒", title: "Secure & Transparent", text: "Built on blockchain transparency with low fees, trusted by miners worldwide." },
              ].map(c => (
                <div className="info-card" key={c.title}>
                  <div className="info-card-icon">{c.icon}</div>
                  <div>
                    <div className="info-card-title">{c.title}</div>
                    <div className="info-card-text">{c.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how-bg" id="how-it-works">
        <div className="section-inner">
          <div className="section-tag">How It Works</div>
          <h2 className="section-title">ProHash Mining in <span className="highlight-teal">4 Simple Steps</span></h2>

          <div className="steps-flow">
            {[
              { icon: "📦", num: 1, title: "Purchase Package", desc: "Select and purchase a hashrate package that fits your investment goals." },
              { icon: "⚡", num: 2, title: "Power Assigned", desc: "The mining farm assigns your dedicated computing power immediately." },
              { icon: "🔗", num: 3, title: "Block Mined", desc: "Your hashrate solves complex calculations on the blockchain network." },
              { icon: "💵", num: 4, title: "Rewards Distributed", desc: "Daily rewards are sent directly to your mining wallet automatically." },
            ].map(s => (
              <div className="step-card" key={s.num}>
                <div className="step-num-ring">
                  {s.icon}
                  <span className="step-number">{s.num}</span>
                </div>
                <div className="step-title">{s.title}</div>
                <div className="step-desc">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="how-detail">
            <div>
              <p className="how-detail-text">
                Users rent <strong>HASHRATE</strong> (computing power) from professional mining farms that run powerful machines to solve complex calculations on the blockchain network and generate rewards.
                <br/><br/>
                All mining runs <span className="gold">AUTOMATICALLY</span> in remote data centers, with <span className="gold">DAILY REWARDS</span> sent to your mining wallet.
              </p>
            </div>
            <div className="how-mini-steps">
              {[
                { icon: "🖥️", label: "Step 1", text: "User selects and purchases a hashrate package" },
                { icon: "⚡", label: "Step 2", text: "Mining farm assigns computing power" },
                { icon: "🔗", label: "Step 3", text: "Block is solved on blockchain network" },
                { icon: "💰", label: "Step 4", text: "Daily rewards sent to mining wallet" },
              ].map(m => (
                <div className="mini-step" key={m.label}>
                  <span className="mini-step-icon">{m.icon}</span>
                  <span><strong>{m.label}:</strong> {m.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US */}
      <section className="section about-bg" id="about">
        <div className="section-inner">
          <div className="section-tag">About Us</div>
          <h2 className="section-title">Simple, Secure &amp; <span className="highlight-gold">Highly Profitable</span><br/>Crypto Mining Experience</h2>
          <div className="about-grid">
            {[
              { icon: "🏢", title: "U.S.-Based Trusted Pool", text: "ProHashing is a trusted U.S.-based cryptocurrency mining pool that delivers a simple, secure, and highly profitable mining experience.", gold: false },
              { icon: "🔄", title: "Multi-Algorithm Support", text: "We support MULTIPLE ALGORITHMS and automatically switch to the most profitable coins, giving miners flexibility to receive payouts in crypto or fiat.", gold: true },
              { icon: "🌐", title: "Worldwide Trust", text: "Built on transparency, reliability, and low fees — ProHashing is trusted by both individual miners and large-scale operations worldwide.", gold: false },
            ].map(c => (
              <div className={`about-card${c.gold ? " gold-top" : ""}`} key={c.title}>
                <div className="about-card-icon">{c.icon}</div>
                <div className="about-card-title">{c.title}</div>
                <p className="about-card-text">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI MINING */}
      <section className="section ai-bg" id="ai-mining">
        <div className="section-inner">
          <div className="section-tag">ProHash Mining With AI</div>
          <h2 className="section-title">Normal Mining <span className="highlight-gold">vs</span> <span className="highlight-teal">AI Mining</span></h2>

          <div className="ai-compare">
            <div className="ai-panel normal">
              <div className="ai-panel-label">⚙ Without AI</div>
              <div className="ai-panel-title">NORMAL</div>
              <p className="ai-panel-text">
                Mining runs at <strong>fixed settings</strong>, requires constant manual adjustments, and lacks real-time optimization. Efficiency suffers during market changes.
              </p>
            </div>
            <div className="ai-vs">
              <span className="ai-vs-text">VS</span>
            </div>
            <div className="ai-panel ai">
              <div className="ai-panel-label">🤖 WITH AI</div>
              <div className="ai-panel-title">WITH AI</div>
              <p className="ai-panel-text">
                Systems <strong>automatically adjust</strong> performance, analyze data, and optimize mining in <strong>real-time</strong>, adapting to market conditions for maximum returns.
              </p>
            </div>
          </div>

          <div className="ai-advantages">
            {[
              { icon: "⚡", title: "Smart Power Optimization", text: "AI adjusts electricity usage to reduce costs during low-profit times, maximizing energy efficiency.", tag: "Electricity Usage · Cost Reduction" },
              { icon: "📊", title: "Profit-Based Decisions", text: "AI tracks price and mining difficulty, switching strategies to maximize returns dynamically.", tag: "Tracks Price · Maximize Returns" },
              { icon: "❄️", title: "Cooling & Hardware Efficiency", text: "AI controls temperature and cooling systems, preventing damage and extending hardware lifespan.", tag: "Temperature Control · Hardware Life" },
            ].map(a => (
              <div className="adv-card" key={a.title}>
                <div className="adv-card-icon">{a.icon}</div>
                <div className="adv-card-title">{a.title}</div>
                <div className="adv-card-text">{a.text}</div>
                <div className="adv-tag">{a.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section className="vision-section" id="vision">
        <div className="vision-bg" />
        <div className="vision-content">
          <div className="section-tag">Our Vision</div>
          <h2 className="vision-headline">
            To make cryptocurrency mining<br/>
            accessible, efficient, and<br/>
            profitable for everyone.
          </h2>
          <p className="vision-subtext">
            We aim to become the most intelligent and miner-friendly platform by removing complexity and maximizing returns through advanced technology and unwavering transparency.
          </p>
          <div className="vision-motto">
            <span className="vm-1">Mine Smarter.</span>
            <span className="vm-dot">·</span>
            <span className="vm-2">Get Paid Better.</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-strip">
        <div className="footer-brand"><span>PRO</span>HASH</div>
        <div className="footer-motto">Building Wealth · Powering Future</div>
        <div className="footer-url">www.prohash.ai</div>
      </footer>
    </>
  );
}