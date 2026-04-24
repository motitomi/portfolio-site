import { useState, useEffect } from 'react';
import { C, serif, sans, mono } from '../tokens.js';
import { GeoBorder, TickerTape } from './ui.jsx';

const GREETINGS = [
  { text: 'Ẹ káàbọ̀',  lang: 'Yoruba',     dir: 'ltr', script: 'latin'  },
  { text: 'Ẹ kúlé',    lang: 'Yoruba',     dir: 'ltr', script: 'latin'  },
  { text: 'Welcome',   lang: 'English',    dir: 'ltr', script: 'latin'  },
  { text: 'Hello',     lang: 'English',    dir: 'ltr', script: 'latin'  },
  { text: '你好',       lang: 'Mandarin',   dir: 'ltr', script: 'cjk'    },
  { text: 'Bonjour',   lang: 'French',     dir: 'ltr', script: 'latin'  },
  { text: 'Karibu',    lang: 'Swahili',    dir: 'ltr', script: 'latin'  },
  { text: 'أهلاً',     lang: 'Arabic',     dir: 'rtl', script: 'arabic' },
  { text: 'Hola',      lang: 'Spanish',    dir: 'ltr', script: 'latin'  },
  { text: 'Olá',       lang: 'Portuguese', dir: 'ltr', script: 'latin'  },
  { text: 'Ciao',      lang: 'Italian',    dir: 'ltr', script: 'latin'  },
];

export default function Hero() {
  const [idx, setIdx]   = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const iv = setInterval(() => {
      setFade(false);
      setTimeout(() => { setIdx(i => (i + 1) % GREETINGS.length); setFade(true); }, 400);
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
          {(() => {
            const g = GREETINGS[idx];
            const fontFamily = g.script === 'cjk'    ? "'Noto Serif SC', system-ui, serif"
                             : g.script === 'arabic' ? "system-ui, serif"
                             : serif;
            return (
              <div style={{ marginBottom: 16, animation: 'fadeUp 0.7s 0.05s ease-out both' }}>
                <span style={{
                  fontFamily,
                  fontStyle: g.script === 'latin' ? 'italic' : 'normal',
                  fontSize: g.script === 'cjk' ? 'clamp(16px, 2.4vw, 20px)' : 'clamp(14px, 2vw, 17px)',
                  color: C.terracotta,
                  opacity: fade ? 1 : 0,
                  transform: fade ? 'translateY(0)' : 'translateY(-5px)',
                  transition: 'opacity 0.38s ease, transform 0.38s ease',
                  display: 'block',
                }}>
                  {g.text}
                </span>
              </div>
            );
          })()}

          {/* Name display */}
          <h1 style={{
            fontFamily: serif, fontWeight: 700,
            fontSize: 'clamp(48px, 8vw, 88px)',
            lineHeight: 0.92, letterSpacing: '-2px',
            color: C.ink, margin: '0 0 32px',
            animation: 'fadeUp 0.8s 0.2s ease-out both',
          }}>
            Tomi Adesina.
          </h1>

          {/* Tagline */}
          <p style={{
            fontFamily: serif, fontStyle: 'italic',
            fontSize: 'clamp(15px, 2.2vw, 20px)', lineHeight: 1.7,
            color: C.inkMid, maxWidth: 480,
            animation: 'fadeUp 0.8s 0.38s ease-out both',
          }}>
            Systems thinker. Culture keeper. Convener of good things — making things work and making them mean{' '}
            <em style={{ color: C.terracotta, fontStyle: 'normal', fontWeight: 600 }}>something beautiful.</em>
          </p>

          {/* Scroll hint */}
          <div style={{
            marginTop: 52, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6,
            animation: 'fadeUp 0.8s 0.55s ease-out both',
          }}>
            <span style={{
              fontFamily: mono, fontSize: 9, letterSpacing: '3px',
              textTransform: 'uppercase', color: C.inkFaint,
            }}>Scroll to explore</span>
            <span style={{
              fontSize: 18, color: C.ochre,
              animation: 'bounceY 1.8s ease-in-out infinite',
              display: 'block', lineHeight: 1,
            }}>↓</span>
          </div>

          <style>{`
            @keyframes bounceY {
              0%, 100% { transform: translateY(0);    opacity: 1;   }
              50%       { transform: translateY(6px); opacity: 0.6; }
            }
          `}</style>
        </div>
      </section>
    </div>
  );
}
