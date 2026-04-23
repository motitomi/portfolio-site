import { useState } from 'react';
import { C, serif, sans, mono } from '../tokens.js';
import { Reveal, EditorialRule, HandUnderline, Tag, SectionLabel } from './ui.jsx';
import { WORK_WORLDS } from '../data.js';

function WorkCard({ item, accent, index }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={0.05 * index}>
      <div
        onMouseEnter={() => setH(true)}
        onMouseLeave={() => setH(false)}
        style={{
          background: C.white, padding: '24px 26px', position: 'relative',
          borderTop: `2px solid ${h ? accent : `${accent}30`}`,
          borderLeft: `1px solid ${C.cream}`, borderRight: `1px solid ${C.cream}`, borderBottom: `1px solid ${C.cream}`,
          boxShadow: h ? `0 8px 28px rgba(30,27,22,0.08)` : `0 1px 4px rgba(30,27,22,0.04)`,
          transition: 'all 0.3s cubic-bezier(.22,1,.36,1)',
          transform: h ? 'translateY(-3px)' : 'none',
        }}
      >
        {/* Active badge */}
        {item.active && (
          <div style={{
            position: 'absolute', top: 16, right: 16,
            fontFamily: mono, fontSize: 7.5, letterSpacing: '2px', textTransform: 'uppercase',
            color: C.forest, display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ fontSize: 8, animation: 'pulse 2s ease-in-out infinite' }}>●</span>
            Active
          </div>
        )}

        <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 15, color: C.ink, lineHeight: 1.35, margin: '0 0 8px', paddingRight: item.active ? 52 : 0 }}>
          {item.t}
        </h3>
        <p style={{ fontFamily: sans, fontSize: 13, lineHeight: 1.75, color: C.inkMid, margin: 0 }}>
          {item.d}
        </p>

        {/* Get Involved callout */}
        {item.callout && (
          <a
            href={item.callout.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              marginTop: 14, fontFamily: mono, fontSize: 8.5, letterSpacing: '2px',
              textTransform: 'uppercase', color: accent, textDecoration: 'none',
              borderBottom: `1px solid ${accent}40`,
              transition: 'border-color 0.2s ease',
            }}
            onMouseOver={e => e.currentTarget.style.borderColor = accent}
            onMouseOut={e => e.currentTarget.style.borderColor = `${accent}40`}
          >
            {item.callout.label} →
          </a>
        )}
      </div>
    </Reveal>
  );
}

export default function Work() {
  const [active, setActive] = useState(0);
  const world = WORK_WORLDS[active];

  return (
    <section id="work" style={{ padding: '80px 0 80px', scrollMarginTop: 56 }}>
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 24px' }}>
        <EditorialRule color={C.ochre} />

        <Reveal>
          <SectionLabel color={C.ochre}>Work</SectionLabel>
          <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(32px, 4vw, 48px)', color: C.ink, lineHeight: 1.05, marginBottom: 40 }}>
            Three ways of building.
          </h2>
        </Reveal>

        {/* Tab switcher */}
        <Reveal delay={0.06}>
          <div style={{
            display: 'flex', borderBottom: `1px solid ${C.cream}`,
            marginBottom: 40, gap: 0,
          }}>
            {WORK_WORLDS.map((w, i) => (
              <button
                key={w.eyebrow}
                onClick={() => setActive(i)}
                style={{
                  background: 'none', border: 'none', padding: '14px 28px 12px',
                  fontFamily: mono, fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase',
                  color: active === i ? w.color : C.inkFaint,
                  borderBottom: active === i ? `2px solid ${w.color}` : '2px solid transparent',
                  marginBottom: -1,
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  cursor: 'pointer',
                }}
              >
                <span style={{ marginRight: 8, opacity: 0.5, fontFamily: serif, fontSize: 12 }}>{w.num}</span>
                {w.eyebrow}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Active world content */}
        <div key={world.eyebrow}>
          {/* World header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr minmax(200px, 340px)',
            gap: 40, marginBottom: 40, alignItems: 'start',
          }}>
            <Reveal>
              <h3 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(24px, 3.5vw, 36px)', color: C.ink, lineHeight: 1.1, margin: '0 0 6px' }}>
                {world.title}
              </h3>
              <HandUnderline color={world.color} width={120} />
              <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 14, lineHeight: 1.8, color: C.inkLight, marginTop: 16, maxWidth: 480 }}>
                {world.subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <div style={{
                padding: '20px 24px',
                background: `${world.color}08`,
                border: `1px solid ${world.color}20`,
              }}>
                <div style={{ fontFamily: mono, fontSize: 8, letterSpacing: '2.5px', textTransform: 'uppercase', color: world.color, marginBottom: 10 }}>
                  Skills & methods
                </div>
                <div>
                  {world.tags.map((t) => <Tag key={t} label={t} color={world.color} />)}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Cards grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))', gap: 14 }}>
            {world.items.map((item, ii) => (
              <WorkCard key={ii} item={item} accent={world.color} index={ii} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
