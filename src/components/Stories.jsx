import { useState } from 'react';
import { C, serif, sans, mono } from '../tokens.js';
import { Reveal, EditorialRule, Tag, SectionLabel } from './ui.jsx';
import { STORIES } from '../data.js';

const REC_TYPES = [
  { key: 'book',    icon: '◎', label: 'Book'    },
  { key: 'song',    icon: '♩', label: 'Song'    },
  { key: 'film',    icon: '◻', label: 'Film'    },
  { key: 'place',   icon: '◈', label: 'Place'   },
  { key: 'article', icon: '▸', label: 'Article' },
];

function recValue(rec, key) {
  const r = rec[key];
  if (!r) return null;
  if (key === 'book')    return `${r.title} — ${r.author}`;
  if (key === 'song')    return `${r.title} — ${r.artist}`;
  if (key === 'film')    return `${r.title} — ${r.director}`;
  if (key === 'place')   return `${r.name}, ${r.city}`;
  if (key === 'article') return `"${r.title}" · ${r.publication}`;
  return null;
}

function StoryCard({ story, index }) {
  const [open, setOpen] = useState(false);
  const date = new Date(story.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' });

  return (
    <Reveal delay={0.07 * index}>
      <article style={{
        background: C.white,
        border: `1px solid ${C.cream}`,
        display: 'flex', flexDirection: 'column',
        transition: 'box-shadow 0.25s ease',
      }}>
        {/* Card body */}
        <div style={{ padding: '28px 28px 20px' }}>
          <div style={{
            fontFamily: mono, fontSize: 8.5, letterSpacing: '2.5px',
            textTransform: 'uppercase', color: C.inkFaint, marginBottom: 12,
          }}>
            {date}
          </div>
          <h3 style={{
            fontFamily: serif, fontWeight: 700,
            fontSize: 'clamp(16px, 2vw, 20px)', color: C.ink,
            lineHeight: 1.3, margin: '0 0 12px',
          }}>
            {story.title}
          </h3>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 13.5, lineHeight: 1.8, color: C.inkLight, margin: '0 0 16px' }}>
            {story.excerpt}
          </p>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 16 }}>
            {story.tags.map((t) => <Tag key={t} label={t} color={C.ochre} />)}
          </div>
        </div>

        {/* Footer row */}
        <div style={{
          padding: '12px 28px', borderTop: `1px solid ${C.cream}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: 'auto',
        }}>
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: 'none', border: 'none',
              fontFamily: mono, fontSize: 8.5, letterSpacing: '2px',
              textTransform: 'uppercase', color: C.ochre,
              display: 'flex', alignItems: 'center', gap: 6,
              transition: 'opacity 0.2s ease',
            }}
          >
            <span>Recommendations</span>
            <span style={{ transition: 'transform 0.25s ease', transform: open ? 'rotate(90deg)' : 'none', display: 'inline-block' }}>▸</span>
          </button>
          <a
            href={story.notionUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: mono, fontSize: 8.5, letterSpacing: '2px',
              textTransform: 'uppercase', color: C.inkFaint,
              textDecoration: 'none', transition: 'color 0.2s ease',
            }}
            onMouseOver={e => e.currentTarget.style.color = C.indigo}
            onMouseOut={e => e.currentTarget.style.color = C.inkFaint}
          >
            Read in Notion →
          </a>
        </div>

        {/* Recommendations shelf */}
        <div style={{
          maxHeight: open ? '360px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(.22,1,.36,1)',
        }}>
          <div style={{ padding: '20px 28px 24px', background: C.bgDeep, borderTop: `1px solid ${C.cream}` }}>
            <div style={{ fontFamily: mono, fontSize: 7.5, letterSpacing: '3px', textTransform: 'uppercase', color: C.inkFaint, marginBottom: 14 }}>
              What accompanied this piece
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {REC_TYPES.map(({ key, icon, label }) => {
                const val = recValue(story.recommendations, key);
                if (!val) return null;
                return (
                  <div key={key} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                    <span style={{ fontFamily: mono, fontSize: 10, color: C.ochre, flexShrink: 0, width: 14 }}>{icon}</span>
                    <span style={{ fontFamily: mono, fontSize: 8, letterSpacing: '2px', textTransform: 'uppercase', color: C.inkFaint, flexShrink: 0, width: 44 }}>{label}</span>
                    <span style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 13, color: C.inkMid, lineHeight: 1.4 }}>{val}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function Stories() {
  return (
    <section id="stories" style={{ padding: '80px 0', background: C.bgDeep, scrollMarginTop: 56 }}>
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 24px' }}>
        <EditorialRule color={C.terracotta} />

        <Reveal>
          <SectionLabel color={C.terracotta}>Stories</SectionLabel>
          <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(32px, 4vw, 48px)', color: C.ink, lineHeight: 1.05, marginBottom: 8 }}>
            Writing it down.
          </h2>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 14, color: C.inkLight, marginBottom: 40, maxWidth: 480 }}>
            Essays, reflections, and documented thinking — each with a shelf of what I was reading, watching, and listening to while writing.
          </p>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 440px), 1fr))', gap: 16 }}>
          {STORIES.map((s, i) => <StoryCard key={s.id} story={s} index={i} />)}
        </div>

        <Reveal delay={0.2}>
          <div style={{ marginTop: 40, textAlign: 'center' }}>
            <a
              href="https://substack.com/@olaoluwatomiadesina"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: mono, fontSize: 9, letterSpacing: '3px',
                textTransform: 'uppercase', color: C.inkFaint,
                textDecoration: 'none', padding: '10px 24px',
                border: `1px solid ${C.cream}`,
                transition: 'all 0.25s ease',
                display: 'inline-block',
              }}
              onMouseOver={e => { e.currentTarget.style.color = C.terracotta; e.currentTarget.style.borderColor = C.terracotta; }}
              onMouseOut={e => { e.currentTarget.style.color = C.inkFaint; e.currentTarget.style.borderColor = C.cream; }}
            >
              All stories on Substack →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
