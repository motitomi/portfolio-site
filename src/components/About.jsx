import { useState } from 'react';
import { C, serif, sans, mono } from '../tokens.js';
import { Reveal, GeoBorder, HandUnderline, SectionLabel } from './ui.jsx';
import { SOCIALS, BOOKING_URL } from '../config.js';

const STATS = [
  { value: '1000+', label: 'sessions ·\nfacilitated'           },
  { value: '100+',  label: 'reflections ·\npublished'          },
  { value: '10+',   label: 'years · building\ncomplex systems' },
  { value: '5',     label: 'markets ·\noperational footprint'  },
];

const ICONS = {
  linkedin: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  tiktok: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.95a8.2 8.2 0 004.79 1.53V7.01a4.85 4.85 0 01-1.02-.32z"/>
    </svg>
  ),
  notion: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4h16v2L8 18h12v2H4v-2L16 6H4z"/>
    </svg>
  ),
};

export default function About() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="about" style={{ padding: '80px 24px 0', scrollMarginTop: 56 }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        <GeoBorder color={C.terracotta} height={22} style={{ marginBottom: 56 }} />

        <div className="about-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 320px) 1fr',
          gap: '48px 60px',
          alignItems: 'start',
        }}>

          {/* Portrait */}
          <Reveal>
            <div className="about-portrait" style={{ position: 'sticky', top: 76 }}>
              <div style={{
                aspectRatio: '3/4', overflow: 'hidden',
                border: `1px solid ${C.cream}`,
                boxShadow: '0 4px 24px rgba(30,27,22,0.07)',
                transform: 'rotate(-1.2deg)',
              }}>
                <img
                  src="https://picsum.photos/seed/tomi-portrait/600/800"
                  alt="Tomi Adesina"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'sepia(0.1) saturate(0.92)' }}
                />
              </div>
              <div style={{
                marginTop: 16, fontFamily: mono, fontSize: 7.5, letterSpacing: '2.5px',
                textTransform: 'uppercase', color: C.inkFaint, textAlign: 'center',
              }}>
                Lagos, Nigeria · 2026
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <div>
            <Reveal>
              <SectionLabel color={C.terracotta}>About</SectionLabel>
              <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(32px, 4vw, 48px)', color: C.ink, lineHeight: 1.05, margin: '0 0 6px' }}>
                Building things
              </h2>
              <h2 style={{ fontFamily: serif, fontWeight: 400, fontStyle: 'italic', fontSize: 'clamp(22px, 3vw, 34px)', color: C.inkMid, lineHeight: 1, margin: '0 0 24px' }}>
                that endure.
              </h2>
              <HandUnderline color={C.terracotta} width={160} />
            </Reveal>

            <Reveal delay={0.08}>
              <p style={{ fontFamily: serif, fontSize: 'clamp(14px, 1.8vw, 17px)', lineHeight: 1.85, color: C.inkMid, margin: '24px 0 16px' }}>
                Lagos teaches you to build for uncertainty. I've been doing that professionally and personally for nearly a decade.
              </p>
              <p style={{ fontFamily: serif, fontSize: 'clamp(14px, 1.8vw, 17px)', lineHeight: 1.85, color: C.inkMid, marginBottom: 16 }}>
                At Paystack I've built invisible systems that keep complex organisations running — from treasury infrastructure across five African markets to launching a Microfinance bank from scratch. Through Motitomi I've built the spaces where people in this city can think, gather, and make things together.
              </p>
              <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(13px, 1.6vw, 16px)', lineHeight: 1.85, color: C.inkLight, marginBottom: 32 }}>
                I'm an artist, organiser, and obsessive learner who believes the best systems — financial or human — are designed with care for the people inside them. That's why a compliance framework and a community gathering get the same attention from me. The through-line is always intentionality.
              </p>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.12}>
              <div className="about-stats" style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 20, borderTop: `1px solid ${C.cream}`,
                borderBottom: `1px solid ${C.cream}`, padding: '24px 0', marginBottom: 32,
              }}>
                {STATS.map((s) => (
                  <div key={s.value}>
                    <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(22px, 3vw, 30px)', color: C.ochre, lineHeight: 1, marginBottom: 6 }}>
                      {s.value}
                    </div>
                    <div style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.inkFaint, lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Socials + Booking */}
            <Reveal delay={0.16}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                {SOCIALS.map((s) => (
                  <div key={s.key} style={{ position: 'relative' }}
                    onMouseEnter={() => setHovered(s.key)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={s.label}
                      style={{
                        width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: `1px solid ${C.cream}`, textDecoration: 'none',
                        color: C.inkMid, transition: 'all 0.2s ease',
                      }}
                      onMouseOver={e => { e.currentTarget.style.borderColor = C.ochre; e.currentTarget.style.color = C.ochre; }}
                      onMouseOut={e => { e.currentTarget.style.borderColor = C.cream; e.currentTarget.style.color = C.inkMid; }}
                    >
                      {ICONS[s.key]}
                    </a>
                    {hovered === s.key && (
                      <div style={{
                        position: 'absolute', bottom: 'calc(100% + 6px)', left: '50%',
                        transform: 'translateX(-50%)',
                        background: C.ink, color: C.paper,
                        fontFamily: mono, fontSize: 8, letterSpacing: '2px',
                        textTransform: 'uppercase', padding: '4px 10px',
                        whiteSpace: 'nowrap', pointerEvents: 'none',
                        animation: 'fadeUp 0.15s ease-out',
                        zIndex: 10,
                      }}>
                        {s.label}
                      </div>
                    )}
                  </div>
                ))}
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
                  style={{
                    marginLeft: 8, fontFamily: mono, fontSize: 8.5, letterSpacing: '2px',
                    textTransform: 'uppercase', color: C.inkFaint, textDecoration: 'none',
                    display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'color 0.2s ease',
                  }}
                  onMouseOver={e => { e.currentTarget.style.color = C.terracotta; }}
                  onMouseOut={e => { e.currentTarget.style.color = C.inkFaint; }}
                >
                  <span style={{ fontSize: 14 }}>◷</span>
                  <span>Let's find time</span>
                </a>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Motitomi origin block */}
        <Reveal delay={0.1}>
          <div style={{
            margin: '72px auto 0', maxWidth: 640, textAlign: 'center',
            padding: '48px 32px', borderTop: `1px solid ${C.cream}`,
          }}>
            <div style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '4px', textTransform: 'uppercase', color: C.terracotta, marginBottom: 14 }}>
              Origin
            </div>
            <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(28px, 4vw, 40px)', color: C.ink, marginBottom: 4 }}>
              Motitomi
            </h3>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <HandUnderline color={C.ochre} width={100} />
            </div>
            <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.8, color: C.inkMid }}>
              In Yoruba, <strong style={{ color: C.ink }}>Tomi</strong> means "enough for me."
              <br /><strong style={{ color: C.terracotta }}>Motitomi</strong> — "I have become enough for myself."
            </p>
            <p style={{ fontFamily: sans, fontSize: 14, lineHeight: 1.85, color: C.inkLight, maxWidth: 420, margin: '16px auto 0' }}>
              This practice is rooted in the belief that self-sufficiency isn't isolation — it's the foundation from which real generosity and collaboration become possible.
            </p>
          </div>
        </Reveal>

        <style>{`
          @media (max-width: 640px) {
            .about-grid     { grid-template-columns: 1fr !important; }
            .about-portrait { position: static !important; }
            .about-stats    { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
