import { useState, useEffect } from 'react';
import { C, serif, sans, mono } from '../tokens.js';
import { GeoBorder, TickerTape } from './ui.jsx';

const GREETINGS = ['Ẹ kú àbọ̀', 'Welcome', 'Kú ilé', 'Hello'];

export default function Hero() {
  const [idx, setIdx]   = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(i => (i + 1) % GREETINGS.length); setFade(true); }, 380);
    }, 3000);
    return () => clearInterval(iv);
  }, []);

  return (
    <div>
      <TickerTape />
      <GeoBorder color={C.ochre} height={26} />

      <section style={{ padding: '72px 24px 80px', maxWidth: 1060, margin: '0 auto' }}>
        <div style={{ maxWidth: 640 }}>

          {/* Greeting */}
          <div style={{ marginBottom: 16, animation: 'fadeUp 0.7s 0.05s ease-out both' }}>
            <span style={{
              fontFamily: serif, fontStyle: 'italic',
              fontSize: 'clamp(14px, 2vw, 17px)', color: C.terracotta,
              opacity: fade ? 1 : 0,
              transform: fade ? 'translateY(0)' : 'translateY(-5px)',
              transition: 'opacity 0.38s ease, transform 0.38s ease',
              display: 'inline-block',
            }}>
              {GREETINGS[idx]}
            </span>
          </div>

          {/* Full name — small */}
          <div style={{
            fontFamily: mono, fontSize: 9.5, letterSpacing: '5px',
            textTransform: 'uppercase', color: C.inkFaint, marginBottom: 14,
            animation: 'fadeUp 0.7s 0.12s ease-out both',
          }}>
            Olaoluwatomi Adesina
          </div>

          {/* Name display */}
          <h1 style={{
            fontFamily: serif, fontWeight: 700,
            fontSize: 'clamp(56px, 10vw, 104px)',
            lineHeight: 0.88, letterSpacing: '-3px',
            color: C.ink, margin: 0,
            animation: 'fadeUp 0.8s 0.2s ease-out both',
          }}>
            Tomi
          </h1>
          <h1 style={{
            fontFamily: serif, fontWeight: 400, fontStyle: 'italic',
            fontSize: 'clamp(28px, 5vw, 56px)',
            color: C.inkMid, lineHeight: 1, margin: '6px 0 32px',
            animation: 'fadeUp 0.8s 0.28s ease-out both',
          }}>
            Adesina.
          </h1>

          {/* Tagline */}
          <p style={{
            fontFamily: serif, fontStyle: 'italic',
            fontSize: 'clamp(15px, 2.2vw, 20px)', lineHeight: 1.7,
            color: C.inkLight, maxWidth: 480,
            animation: 'fadeUp 0.8s 0.38s ease-out both',
          }}>
            Operations executive. Community architect.
            <br />Poet & civic organizer — building systems
            <br />for how things work{' '}
            <em style={{ color: C.terracotta, fontStyle: 'normal', fontWeight: 600 }}>and why they matter.</em>
          </p>

          {/* Scroll hint */}
          <div style={{
            marginTop: 52, fontFamily: mono, fontSize: 9, letterSpacing: '3px',
            textTransform: 'uppercase', color: C.inkFaint,
            display: 'flex', alignItems: 'center', gap: 10,
            animation: 'fadeUp 0.8s 0.55s ease-out both',
          }}>
            <span style={{ animation: 'pulse 2.5s ease-in-out infinite' }}>◇</span>
            <span>Scroll to explore</span>
          </div>
        </div>
      </section>
    </div>
  );
}
