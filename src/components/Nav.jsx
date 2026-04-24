import { useState, useEffect } from 'react';
import { C, serif, mono } from '../tokens.js';
import { BOOKING_URL } from '../config.js';

const LINKS = [
  { id: 'about',   symbol: '◎', label: 'About'   },
  { id: 'work',    symbol: '◆', label: 'Work'    },
  { id: 'stories', symbol: '△', label: 'Stories' },
  { id: 'gallery', symbol: '◈', label: 'Gallery' },
];

export default function Nav() {
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState('');
  const [tooltip, setTooltip]     = useState(null);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [pressed, setPressed]     = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
      let cur = '';
      LINKS.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 90) cur = id;
      });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const navBg = scrolled
    ? `${C.paper}EE`
    : menuOpen ? C.paper : 'transparent';

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: navBg,
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.cream}` : '1px solid transparent',
        transition: 'background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease',
      }}>
        <div style={{
          maxWidth: 1060, margin: '0 auto', padding: '0 24px',
          height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>

          {/* Wordmark */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onMouseEnter={e => e.currentTarget.querySelector('.ta-stamp').style.borderColor = C.terracotta}
            onMouseLeave={e => e.currentTarget.querySelector('.ta-stamp').style.borderColor = C.ochre}
            style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: 10, padding: 0, cursor: 'pointer' }}
          >
            {/* Monogram stamp */}
            <div className="ta-stamp" style={{
              width: 28, height: 28,
              border: `1px solid ${C.ochre}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              transition: 'border-color 0.2s ease',
            }}>
              <span style={{ fontFamily: mono, fontSize: 8, letterSpacing: '1px', color: C.ochre, lineHeight: 1 }}>T·A</span>
            </div>
            {/* Name */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
              <span style={{ fontFamily: serif, fontWeight: 700, fontSize: 18, color: C.ink, lineHeight: 1 }}>Tomi</span>
              <span style={{ fontFamily: mono, fontSize: 8, letterSpacing: '2.5px', textTransform: 'uppercase', color: C.inkFaint }}>Adesina</span>
            </div>
          </button>

          {/* Desktop links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="nav-desktop">
            {LINKS.map((l) => {
              const isActive = active === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => scrollTo(l.id)}
                  onMouseDown={() => setPressed(l.id)}
                  onMouseUp={() => setPressed(null)}
                  onMouseLeave={e => { setPressed(null); if (!isActive) e.currentTarget.style.color = C.inkMid; }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = C.ink; }}
                  style={{
                    background: 'none', border: 'none',
                    borderBottom: isActive ? `2px solid ${C.ochre}` : '2px solid transparent',
                    padding: '0 14px', height: 56,
                    display: 'flex', alignItems: 'center', gap: 6,
                    color: isActive ? C.ochre : C.inkMid,
                    transform: pressed === l.id ? 'translateY(1px) scale(0.97)' : 'none',
                    transition: 'color 0.2s ease, border-color 0.2s ease, transform 0.1s ease',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{ fontFamily: mono, fontSize: 12, lineHeight: 1, opacity: isActive ? 1 : 0.55 }}>
                    {l.symbol}
                  </span>
                  <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '2.5px', textTransform: 'uppercase', lineHeight: 1 }}>
                    {l.label}
                  </span>
                </button>
              );
            })}

            {/* Booking — hidden in plain sight */}
            <div style={{ position: 'relative', marginLeft: 8 }}>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setTooltip('booking')}
                onMouseLeave={() => setTooltip(null)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 32, height: 32,
                  fontFamily: mono, fontSize: 13, color: C.inkFaint, textDecoration: 'none',
                  border: `1px solid ${C.cream}`, transition: 'all 0.2s ease',
                }}
                onMouseOver={e => { e.currentTarget.style.color = C.terracotta; e.currentTarget.style.borderColor = C.terracotta; }}
                onMouseOut={e => { e.currentTarget.style.color = C.inkFaint; e.currentTarget.style.borderColor = C.cream; }}
              >
                ◷
              </a>
              {tooltip === 'booking' && (
                <div style={{
                  position: 'absolute', top: 'calc(100% + 6px)', right: 0,
                  background: C.ink, color: C.paper, fontFamily: mono, fontSize: 8,
                  letterSpacing: '2px', textTransform: 'uppercase', padding: '4px 10px',
                  whiteSpace: 'nowrap', pointerEvents: 'none', animation: 'slideDown 0.15s ease-out',
                }}>
                  15 min · no agenda · talk to me
                </div>
              )}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="nav-mobile"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none', border: 'none', padding: '8px',
              fontFamily: mono, fontSize: 16, color: C.ink, lineHeight: 1,
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 190, background: C.paper,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 32,
          animation: 'fadeUp 0.2s ease-out',
        }}>
          {LINKS.map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{
              background: 'none', border: 'none', padding: '4px 0',
              fontFamily: mono, fontSize: 11, letterSpacing: '4px', textTransform: 'uppercase',
              color: active === l.id ? C.ochre : C.ink,
            }}>
              <span style={{ marginRight: 10, opacity: 0.5 }}>{l.symbol}</span>{l.label}
            </button>
          ))}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: mono, fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase',
              color: C.terracotta, textDecoration: 'none', marginTop: 8,
              border: `1px solid ${C.terracotta}40`, padding: '8px 20px',
            }}>
            ◷ 15 min · no agenda
          </a>
        </div>
      )}

      <style>{`
        .nav-mobile { display: none; }
        @media (max-width: 640px) {
          .nav-desktop { display: none !important; }
          .nav-mobile  { display: block !important; }
        }
      `}</style>
    </>
  );
}
