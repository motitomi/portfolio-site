import { C, serif, sans, mono } from '../tokens.js';
import { GeoBorder, TickerTape } from './ui.jsx';
import { SOCIALS, EMAIL, BOOKING_URL } from '../config.js';

const SOCIAL_SYMBOLS = {
  linkedin:  'in',
  instagram: '◉',
  tiktok:    'tt',
  notion:    '◇',
};

export default function Footer() {
  return (
    <footer style={{ paddingTop: 0 }}>
      <GeoBorder color={C.indigo} height={22} />

      <div style={{ background: C.bgDeep, padding: '64px 24px 0' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto' }}>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 40,
            paddingBottom: 48,
            borderBottom: `1px solid ${C.cream}`,
          }}>

            {/* Wordmark + tagline */}
            <div>
              <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 28, color: C.ink, lineHeight: 1, marginBottom: 6 }}>
                Tomi
              </div>
              <div style={{ fontFamily: serif, fontWeight: 400, fontStyle: 'italic', fontSize: 18, color: C.inkMid, marginBottom: 16 }}>
                Adesina.
              </div>
              <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 12.5, lineHeight: 1.8, color: C.inkLight, maxWidth: 220 }}>
                Build · Gather · Advocate
                <br />Lagos, Nigeria · Est. 2016
              </p>
            </div>

            {/* Quick links */}
            <div>
              <div style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '3px', textTransform: 'uppercase', color: C.inkFaint, marginBottom: 18 }}>
                Navigate
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {['about', 'work', 'stories', 'gallery'].map((id) => (
                  <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })} style={{
                    background: 'none', border: 'none', padding: 0, textAlign: 'left',
                    fontFamily: mono, fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase',
                    color: C.inkLight, cursor: 'pointer', transition: 'color 0.2s ease',
                    width: 'fit-content',
                  }}
                  onMouseOver={e => e.currentTarget.style.color = C.ochre}
                  onMouseOut={e => e.currentTarget.style.color = C.inkLight}
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact + socials */}
            <div>
              <div style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '3px', textTransform: 'uppercase', color: C.inkFaint, marginBottom: 18 }}>
                Connect
              </div>
              <a href={`mailto:${EMAIL}`} style={{
                display: 'block', marginBottom: 20,
                fontFamily: serif, fontStyle: 'italic', fontSize: 14, color: C.inkMid,
                textDecoration: 'none', transition: 'color 0.2s ease',
              }}
              onMouseOver={e => e.currentTarget.style.color = C.terracotta}
              onMouseOut={e => e.currentTarget.style.color = C.inkMid}
              >
                {EMAIL}
              </a>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                {SOCIALS.map((s) => (
                  <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
                    style={{
                      width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${C.cream}`, textDecoration: 'none',
                      fontFamily: mono, fontSize: 10, color: C.inkMid,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = C.ochre; e.currentTarget.style.color = C.ochre; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = C.cream; e.currentTarget.style.color = C.inkMid; }}
                  >
                    {SOCIAL_SYMBOLS[s.key] || s.label[0]}
                  </a>
                ))}
              </div>

              {/* Booking — hidden in plain sight */}
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: mono, fontSize: 8, letterSpacing: '2px',
                textTransform: 'uppercase', color: C.inkFaint,
                textDecoration: 'none', transition: 'color 0.2s ease',
              }}
              onMouseOver={e => e.currentTarget.style.color = C.terracotta}
              onMouseOut={e => e.currentTarget.style.color = C.inkFaint}
              >
                <span style={{ fontSize: 12 }}>◷</span>
                <span>15 min · no agenda</span>
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '20px 0',
            fontFamily: mono, fontSize: 8, letterSpacing: '1.5px',
            textTransform: 'uppercase', color: C.inkFaint, flexWrap: 'wrap', gap: 8,
          }}>
            <span>© 2026 Olaoluwatomi Adesina · Motitomi</span>
            <span>Made with intention</span>
          </div>
        </div>
      </div>

      <TickerTape />
    </footer>
  );
}
