import { useState, useRef } from 'react';
import { C, serif, sans, mono } from '../tokens.js';
import { Reveal, EditorialRule, SectionLabel } from './ui.jsx';
import { GALLERY_ITEMS } from '../data.js';

const FILTERS = [
  { key: 'all',   label: 'All'    },
  { key: 'photo', label: 'Photos' },
  { key: 'video', label: 'Video'  },
  { key: 'audio', label: 'Audio'  },
];

// Deterministic waveform heights using sine
const waveH = (i) => Math.round(6 + 26 * (0.5 + 0.45 * Math.sin(i * 0.83 + 1.3) * Math.sin(i * 0.31 + 0.7)));

function PhotoItem({ item }) {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{ position: 'relative', overflow: 'hidden', background: C.cream }}
    >
      <img
        src={item.src}
        alt={item.caption}
        loading="lazy"
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          filter: 'sepia(0.1) saturate(0.9)',
          transform: h ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 0.5s cubic-bezier(.22,1,.36,1)',
        }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(30,27,22,0.55) 0%, transparent 50%)',
        opacity: h ? 1 : 0, transition: 'opacity 0.3s ease',
      }} />
      <div style={{
        position: 'absolute', bottom: 12, left: 14,
        fontFamily: mono, fontSize: 8, letterSpacing: '2px',
        textTransform: 'uppercase', color: '#FFFEF9',
        opacity: h ? 1 : 0, transition: 'opacity 0.3s ease',
      }}>
        {item.caption}
      </div>
    </div>
  );
}

function VideoItem({ item }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!item.src) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play(); setPlaying(true); }
  };

  return (
    <div style={{ position: 'relative', background: C.bgDeep, cursor: item.src ? 'pointer' : 'default' }} onClick={toggle}>
      {item.src
        ? <video ref={videoRef} src={item.src} poster={item.poster} style={{ width: '100%', display: 'block' }} />
        : item.poster
        ? <img src={item.poster} alt={item.caption} style={{ width: '100%', display: 'block', filter: 'sepia(0.15) saturate(0.8)' }} />
        : <div style={{ aspectRatio: '16/9', background: C.cream }} />
      }
      {/* Play overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'rgba(30,27,22,0.35)',
        opacity: playing ? 0 : 1, transition: 'opacity 0.3s ease',
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: '50%',
          border: `1.5px solid rgba(255,253,247,0.8)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#FFFEF9', fontSize: 14, paddingLeft: 3,
        }}>▶</div>
        {!item.src && (
          <div style={{ fontFamily: mono, fontSize: 7.5, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,253,247,0.6)', marginTop: 10 }}>
            Coming soon
          </div>
        )}
      </div>
      <div style={{
        position: 'absolute', bottom: 10, left: 12,
        fontFamily: mono, fontSize: 7.5, letterSpacing: '2px',
        textTransform: 'uppercase', color: 'rgba(255,253,247,0.8)',
      }}>
        {item.caption}
      </div>
    </div>
  );
}

function AudioItem({ item }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const bars = Array.from({ length: 52 }, (_, i) => waveH(i));

  const toggle = () => {
    if (!item.src) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  };

  return (
    <div style={{ padding: '20px 20px 16px', background: C.bgDeep, border: `1px solid ${C.cream}` }}>
      {item.src && (
        <audio ref={audioRef} src={item.src}
          onTimeUpdate={() => {
            const { currentTime, duration } = audioRef.current;
            setProgress(duration ? (currentTime / duration) * 100 : 0);
          }}
          onEnded={() => setPlaying(false)}
        />
      )}

      {/* Waveform */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 1.5, height: 44, marginBottom: 12, cursor: item.src ? 'pointer' : 'default' }} onClick={toggle}>
        {bars.map((h, i) => {
          const pct = (i / bars.length) * 100;
          const filled = pct <= progress;
          return (
            <div key={i} style={{
              width: 2.5, height: h, borderRadius: 2, flexShrink: 0,
              background: filled ? C.ochre : C.cream,
              opacity: playing && !filled ? 0.5 + 0.5 * Math.sin(i * 0.4 + Date.now() * 0.001) : filled ? 1 : 0.6,
              transition: 'background 0.1s ease',
            }} />
          );
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: mono, fontSize: 8, letterSpacing: '2px', textTransform: 'uppercase', color: C.inkFaint, marginBottom: 2 }}>
            Audio
          </div>
          <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: 12, color: C.inkMid }}>
            {item.caption}
          </div>
        </div>
        <button onClick={toggle} style={{
          background: item.src ? C.ochre : C.cream, border: 'none', borderRadius: '50%',
          width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: item.src ? C.white : C.inkFaint, fontSize: 10, cursor: item.src ? 'pointer' : 'default',
        }}>
          {playing ? '⏸' : '▶'}
        </button>
      </div>

      {!item.src && (
        <div style={{ fontFamily: mono, fontSize: 7.5, letterSpacing: '1.5px', textTransform: 'uppercase', color: C.inkFaint, marginTop: 8, opacity: 0.7 }}>
          File coming soon
        </div>
      )}
    </div>
  );
}

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.type === filter);

  return (
    <section id="gallery" style={{ padding: '80px 0', scrollMarginTop: 56 }}>
      <div style={{ maxWidth: 1060, margin: '0 auto', padding: '0 24px' }}>
        <EditorialRule color={C.forest} />

        <Reveal>
          <SectionLabel color={C.forest}>Gallery</SectionLabel>
          <h2 style={{ fontFamily: serif, fontWeight: 700, fontSize: 'clamp(32px, 4vw, 48px)', color: C.ink, lineHeight: 1.05, marginBottom: 32 }}>
            Life in practice.
          </h2>
        </Reveal>

        {/* Filter tabs */}
        <Reveal delay={0.05}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 28, flexWrap: 'wrap' }}>
            {FILTERS.map((f) => (
              <button key={f.key} onClick={() => setFilter(f.key)} style={{
                background: 'none', border: `1px solid ${filter === f.key ? C.forest : C.cream}`,
                padding: '6px 16px', fontFamily: mono, fontSize: 8.5, letterSpacing: '2px',
                textTransform: 'uppercase',
                color: filter === f.key ? C.forest : C.inkFaint,
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}>
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 12,
        }}>
          {visible.map((item, i) => (
            <Reveal key={item.id} delay={0.04 * i}>
              <div style={{ minHeight: item.type === 'audio' ? 'auto' : 220 }}>
                {item.type === 'photo' && <PhotoItem item={item} />}
                {item.type === 'video' && <VideoItem item={item} />}
                {item.type === 'audio' && <AudioItem item={item} />}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
