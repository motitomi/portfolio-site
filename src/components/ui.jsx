import { useEffect, useRef, useState } from 'react';
import { C, serif, sans, mono } from '../tokens.js';

export function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setV(true); },
      { threshold: 0.06, rootMargin: '0px 0px -16px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: v ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.65s cubic-bezier(.22,1,.36,1) ${delay}s, transform 0.65s cubic-bezier(.22,1,.36,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

export function GeoBorder({ color = C.ochre, height = 28, style: sx = {} }) {
  const id = `geo-${color.replace('#', '')}-${height}`;
  return (
    <div style={{ width: '100%', overflow: 'hidden', ...sx }}>
      <svg width="100%" height={height} viewBox={`0 0 480 ${height}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          <pattern id={id} x="0" y="0" width="60" height={height} patternUnits="userSpaceOnUse">
            <path d={`M30 ${height*0.15} L42 ${height*0.5} L30 ${height*0.85} L18 ${height*0.5} Z`} fill="none" stroke={color} strokeWidth="1.5" opacity="0.55" />
            <line x1="42" y1={height*0.5} x2="60" y2={height*0.5} stroke={color} strokeWidth="1" opacity="0.25" />
            <line x1="0"  y1={height*0.5} x2="18" y2={height*0.5} stroke={color} strokeWidth="1" opacity="0.25" />
            <circle cx="30" cy={height*0.5} r="1.8" fill={color} opacity="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height={height} fill={`url(#${id})`} />
      </svg>
    </div>
  );
}

export function HandUnderline({ color = C.ochre, width = 200 }) {
  return (
    <svg width={width} height="10" viewBox={`0 0 ${width} 10`} style={{ display: 'block', marginTop: 4, overflow: 'visible' }}>
      <path
        d={`M0 7 Q${width*0.15} 1,${width*0.3} 6 T${width*0.6} 4 T${width} 7`}
        fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.45"
        style={{ strokeDasharray: width*1.5, strokeDashoffset: width*1.5, animation: 'drawLine 1.1s 0.4s ease-out forwards' }}
      />
    </svg>
  );
}

export function EditorialRule({ color = C.ochre }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '52px 0', opacity: 0.45 }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, transparent, ${color})` }} />
      <svg width="8" height="8" viewBox="0 0 8 8"><rect x="0.5" y="0.5" width="7" height="7" fill="none" stroke={color} strokeWidth="1" transform="rotate(45 4 4)" /></svg>
      <svg width="5" height="5" viewBox="0 0 5 5"><circle cx="2.5" cy="2.5" r="2" fill={color} /></svg>
      <svg width="8" height="8" viewBox="0 0 8 8"><rect x="0.5" y="0.5" width="7" height="7" fill="none" stroke={color} strokeWidth="1" transform="rotate(45 4 4)" /></svg>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to left, transparent, ${color})` }} />
    </div>
  );
}

export function Tag({ label, color = C.ochre }) {
  const [h, setH] = useState(false);
  return (
    <span
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: 'inline-block', padding: '3px 9px',
        fontFamily: mono, fontSize: 9, letterSpacing: '1.6px', textTransform: 'uppercase',
        color, border: `1px solid ${color}28`, background: h ? `${color}12` : `${color}06`,
        marginRight: 6, marginBottom: 6, cursor: 'default',
        transition: 'background 0.2s ease',
      }}
    >
      {label}
    </span>
  );
}

export function TickerTape() {
  const text = 'Build · Gather · Advocate     ◇ Lagos, Nigeria ◇     Operations · Community · Poetry     ◆ Est. 2016 ◆     Systems Thinker · Space Maker     ◇ Motitomi ◇     Made with intention     ◆ Portfolio & Practice ◆     ';
  return (
    <div style={{ background: C.indigo, overflow: 'hidden', padding: '9px 0' }}>
      <div style={{ display: 'flex', animation: 'tickerScroll 40s linear infinite', whiteSpace: 'nowrap' }}>
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ fontFamily: mono, fontSize: 9, letterSpacing: '3.5px', textTransform: 'uppercase', color: C.ochreLight, paddingRight: 60, flexShrink: 0 }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SectionLabel({ children, color = C.ochre }) {
  return (
    <div style={{ fontFamily: mono, fontSize: 9, letterSpacing: '5px', textTransform: 'uppercase', color, marginBottom: 14 }}>
      {children}
    </div>
  );
}
