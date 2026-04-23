import { useRef, useState } from 'react';
import { C, serif, sans, mono } from '../tokens.js';
import { Reveal, SectionLabel, GeoBorder } from './ui.jsx';
import { LIFE_DATA, LIFE_EVENTS } from '../data.js';

// SVG viewport constants
const VW = 1000, VH = 320;
const ML = 52, MR = 20, MT = 16, MB = 60;
const CW = VW - ML - MR;   // 928
const CH = VH - MT - MB;   // 244
const MAX_AGE = 27;

const r  = (n) => +n.toFixed(2);
const ax = (age) => r(ML + (age / MAX_AGE) * CW);
const ay = (pct) => r(MT + CH - (pct / 100) * CH);

// Bands rendered bottom → top
const BANDS = [
  { key: 'civic',    label: 'Civic',    color: C.indigoLight },
  { key: 'work',     label: 'Work',     color: C.ochre },
  { key: 'making',   label: 'Making',   color: C.terracottaLight },
  { key: 'learning', label: 'Learning', color: C.forestLight },
  { key: 'play',     label: 'Play',     color: C.ochreLight },
];

function cumTop(d, bandKey) {
  let sum = 0;
  for (const b of BANDS) { sum += d[b.key]; if (b.key === bandKey) break; }
  return sum;
}

function crPath(pts) {
  if (pts.length < 2) return `M ${pts[0][0]} ${pts[0][1]}`;
  const d = [`M ${pts[0][0]} ${pts[0][1]}`];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    d.push(
      `C ${r(p1[0] + (p2[0] - p0[0]) / 6)} ${r(p1[1] + (p2[1] - p0[1]) / 6)},` +
      `${r(p2[0] - (p3[0] - p1[0]) / 6)} ${r(p2[1] - (p3[1] - p1[1]) / 6)},` +
      `${r(p2[0])} ${r(p2[1])}`
    );
  }
  return d.join(' ');
}

function areaPath(topPts, botPts) {
  const rev = [...botPts].reverse();
  const topD = crPath(topPts);
  const botCurves = [];
  for (let i = 0; i < rev.length - 1; i++) {
    const p0 = rev[Math.max(0, i - 1)];
    const p1 = rev[i];
    const p2 = rev[i + 1];
    const p3 = rev[Math.min(rev.length - 1, i + 2)];
    botCurves.push(
      `C ${r(p1[0] + (p2[0] - p0[0]) / 6)} ${r(p1[1] + (p2[1] - p0[1]) / 6)},` +
      `${r(p2[0] - (p3[0] - p1[0]) / 6)} ${r(p2[1] - (p3[1] - p1[1]) / 6)},` +
      `${r(p2[0])} ${r(p2[1])}`
    );
  }
  return `${topD} L ${rev[0][0]} ${rev[0][1]} ${botCurves.join(' ')} Z`;
}

// Precompute all band paths
const PATHS = BANDS.map((band, bi) => {
  const topPts = LIFE_DATA.map((d) => [ax(d.age), ay(cumTop(d, band.key))]);
  const botPts = bi === 0
    ? LIFE_DATA.map((d) => [ax(d.age), ay(0)])
    : LIFE_DATA.map((d) => [ax(d.age), ay(cumTop(d, BANDS[bi - 1].key))]);
  return { ...band, path: areaPath(topPts, botPts) };
});

// Linear interpolation for hover tooltip
function interp(age) {
  const data = LIFE_DATA;
  if (age <= data[0].age) return data[0];
  if (age >= data[data.length - 1].age) return data[data.length - 1];
  for (let i = 0; i < data.length - 1; i++) {
    if (age >= data[i].age && age <= data[i + 1].age) {
      const t = (age - data[i].age) / (data[i + 1].age - data[i].age);
      return Object.fromEntries(
        BANDS.map((b) => [b.key, Math.round(data[i][b.key] + t * (data[i + 1][b.key] - data[i][b.key]))])
      );
    }
  }
}

function nearestEvent(age) {
  let best = null, bestDist = 1.8;
  LIFE_EVENTS.forEach((e) => {
    const d = Math.abs(e.age - age);
    if (d < bestDist) { bestDist = d; best = e; }
  });
  return best;
}

const AGE_TICKS = [0, 5, 10, 15, 20, 25, 27];

export default function LifeChart() {
  const containerRef = useRef(null);
  const [hover, setHover] = useState(null);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const pxX = e.clientX - rect.left;
    const vbX = pxX * (VW / rect.width);
    const age = Math.max(0, Math.min(MAX_AGE, (vbX - ML) / CW * MAX_AGE));
    const event = nearestEvent(age);
    const vals = interp(age);
    setHover({ age: Math.round(age * 10) / 10, pxX, event, vals });
  };

  return (
    <section id="life" style={{ padding: '72px 24px 80px', background: C.bgDeep }}>
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        <Reveal>
          <SectionLabel color={C.ochre}>How I've spent my time</SectionLabel>
          <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(28px, 3.5vw, 40px)', color: C.ink, lineHeight: 1.1, marginBottom: 6 }}>
            Life in Time
          </h2>
          <p style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 14, color: C.inkLight, marginBottom: 36 }}>
            Age 0 → 27 · born 13 July 1998 · hover to explore
          </p>
        </Reveal>

        {/* Chart */}
        <Reveal delay={0.1}>
          <div
            ref={containerRef}
            style={{ position: 'relative', cursor: 'crosshair' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHover(null)}
          >
            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              width="100%"
              style={{ display: 'block', overflow: 'visible' }}
            >
              {/* Grid lines */}
              {[25, 50, 75].map((pct) => (
                <line key={pct} x1={ML} y1={ay(pct)} x2={ML + CW} y2={ay(pct)}
                  stroke={C.cream} strokeWidth="1" strokeDasharray="3 5" />
              ))}

              {/* Bands */}
              {PATHS.map((b) => (
                <path key={b.key} d={b.path} fill={b.color} opacity="0.82" />
              ))}

              {/* Band outlines (top edges) */}
              {PATHS.map((b, bi) => {
                const topPts = LIFE_DATA.map((d) => [ax(d.age), ay(cumTop(d, b.key))]);
                return <path key={`line-${b.key}`} d={crPath(topPts)} fill="none" stroke={C.paper} strokeWidth="0.8" opacity="0.6" />;
              })}

              {/* X axis */}
              <line x1={ML} y1={ay(0)} x2={ML + CW} y2={ay(0)} stroke={C.inkFaint} strokeWidth="1" />

              {/* Age ticks + labels */}
              {AGE_TICKS.map((age) => (
                <g key={age}>
                  <line x1={ax(age)} y1={ay(0)} x2={ax(age)} y2={ay(0) + 5} stroke={C.inkFaint} strokeWidth="1" />
                  <text x={ax(age)} y={ay(0) + 18}
                    textAnchor="middle" fontFamily={mono} fontSize="9" fill={C.inkFaint} letterSpacing="1">
                    {age === MAX_AGE ? 'Now' : age}
                  </text>
                </g>
              ))}

              {/* Life event dots */}
              {LIFE_EVENTS.map((ev) => (
                <circle key={ev.age} cx={ax(ev.age)} cy={ay(0) + 28}
                  r="3" fill={C.ochre} opacity="0.55" />
              ))}

              {/* Hover line */}
              {hover && (
                <line
                  x1={ax(hover.age)} y1={ay(100)}
                  x2={ax(hover.age)} y2={ay(0)}
                  stroke={C.ink} strokeWidth="1" strokeDasharray="3 3" opacity="0.5"
                />
              )}

              {/* Now marker */}
              <g>
                <circle cx={ax(MAX_AGE)} cy={ay(44)} r="4" fill={C.terracotta} opacity="0.8" />
                <text x={ax(MAX_AGE) - 7} y={ay(44) - 10}
                  fontFamily={mono} fontSize="8" fill={C.terracotta} letterSpacing="1" textAnchor="middle" opacity="0.8">
                  2026
                </text>
              </g>
            </svg>

            {/* Hover tooltip */}
            {hover && (
              <div style={{
                position: 'absolute',
                top: 12,
                left: Math.min(hover.pxX + 14, containerRef.current?.offsetWidth - 200),
                background: C.ink,
                padding: '12px 16px',
                minWidth: 180,
                pointerEvents: 'none',
                animation: 'fadeUp 0.15s ease-out',
              }}>
                <div style={{ fontFamily: serif, fontWeight: 700, fontSize: 13, color: C.paper, marginBottom: 6 }}>
                  Age {Math.floor(hover.age)}
                  {hover.age % 1 >= 0.5 ? '½' : ''}
                </div>
                {hover.event && (
                  <div style={{ fontFamily: sans, fontSize: 11, color: C.ochreLight, lineHeight: 1.5, marginBottom: 8 }}>
                    {hover.event.label}
                  </div>
                )}
                {hover.vals && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {BANDS.slice().reverse().map((b) => (
                      <div key={b.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <div style={{ width: 8, height: 8, background: b.color, flexShrink: 0 }} />
                        <span style={{ fontFamily: mono, fontSize: 8, letterSpacing: '1px', textTransform: 'uppercase', color: C.inkFaint }}>
                          {b.label}
                        </span>
                        <span style={{ fontFamily: mono, fontSize: 8, color: C.paper, marginLeft: 'auto' }}>
                          {hover.vals[b.key]}%
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginTop: 24 }}>
            {BANDS.slice().reverse().map((b) => (
              <div key={b.key} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div style={{ width: 12, height: 12, background: b.color, border: `1px solid ${C.cream}` }} />
                <span style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '2px', textTransform: 'uppercase', color: C.inkMid }}>
                  {b.label}
                </span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.ochre, opacity: 0.55 }} />
              <span style={{ fontFamily: mono, fontSize: 8.5, letterSpacing: '2px', textTransform: 'uppercase', color: C.inkFaint }}>
                Key moments
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
