import { C, serif, sans, mono } from '../tokens.js';
import { Reveal, GeoBorder, HandUnderline, SectionLabel } from './ui.jsx';
import { SOCIALS, BOOKING_URL } from '../config.js';

const STATS = [
  { value: '7+',   label: 'years · financial\ninfrastructure' },
  { value: '4',    label: 'markets · treasury\noperations' },
  { value: '60+',  label: 'people\ncoordinated' },
  { value: '2016', label: 'est. ·\nMotitomi' },
];

const SOCIAL_SYMBOLS = {
  linkedin:  'in',
  instagram: '◉',
  tiktok:    'tt',
  notion:    '◇',
};

export default function About() {
  return (
    <section id="about" style={{ padding: '80px 24px 0', scrollMarginTop: 56 }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        <GeoBorder color={C.terracotta} height={22} style={{ marginBottom: 56 }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(240px, 320px) 1fr',
          gap: '48px 60px',
          alignItems: 'start',
        }}>

          {/* Portrait */}
          <Reveal>
            <div style={{ position: 'sticky', top: 76 }}>
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
                I'm Tomi — operations executive, community architect, poet and civic organizer based in Lagos, Nigeria. For nearly a decade, I've built the systems that keep complex organizations running: from treasury operations across four African markets to the infrastructure of Paystack's Project Management Office.
              </p>
              <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 'clamp(13px, 1.6vw, 16px)', lineHeight: 1.85, color: C.inkLight, marginBottom: 32 }}>
                I care deeply about how things are made, who gets to make them, and what gets built when people have enough room to think. That's why I build financial systems and community spaces with the same rigour — because the through-line is always intentionality.
              </p>
            </Reveal>

            {/* Stats */}
            <Reveal delay={0.12}>
              <div style={{
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
                  <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer"
                    title={s.label}
                    style={{
                      width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: `1px solid ${C.cream}`, textDecoration: 'none',
                      fontFamily: mono, fontSize: 10, letterSpacing: '1px', color: C.inkMid,
                      transition: 'all 0.2s ease',
                    }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = C.ochre; e.currentTarget.style.color = C.ochre; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = C.cream; e.currentTarget.style.color = C.inkMid; }}
                  >
                    {SOCIAL_SYMBOLS[s.key] || s.label[0]}
                  </a>
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
      </div>
    </section>
  );
}
