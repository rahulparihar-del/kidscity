/**
 * KidsCityMap – Beautiful interactive map using MapLibre GL
 * Inspired by mapcn.dev (https://mapcn.dev) – built on MapLibre GL
 * Uses Carto + Stadia free basemap tiles (no API key required)
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Navigation, Phone, MapPin, Clock, Copy, CheckCircle2 } from 'lucide-react';

// Kids City coordinates – Wakad, Pune
const KIDS_CITY_LNG = 73.7744;
const KIDS_CITY_LAT = 18.5975;

// All available free themes (no API key needed) — all show street & place labels
const MAP_THEMES = [
  {
    id: 'voyager',
    label: 'Voyager',
    emoji: '🗺️',
    description: 'Warm & clean',
    url: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
    accent: '#e85d04',
    bg: '#f5f0e8',
  },
  {
    id: 'dark',
    label: 'Dark',
    emoji: '🌙',
    description: 'Sleek night',
    url: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    accent: '#818cf8',
    bg: '#1e1e2e',
  },
  {
    id: 'positron',
    label: 'Minimal',
    emoji: '⬜',
    description: 'Ultra clean white',
    url: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
    accent: '#64748b',
    bg: '#f8f9fa',
  },
  {
    id: 'toner',
    label: 'Toner',
    emoji: '🖤',
    description: 'High contrast B&W',
    url: 'https://tiles.stadiamaps.com/styles/stamen_toner.json',
    accent: '#000',
    bg: '#fff',
  },
  {
    id: 'terrain',
    label: 'Terrain',
    emoji: '🏔️',
    description: 'Topographic',
    url: 'https://tiles.stadiamaps.com/styles/stamen_terrain.json',
    accent: '#3a7d44',
    bg: '#d4e8c2',
  },
];

const DEFAULT_THEME = MAP_THEMES[0]; // Voyager

const INFO_CARDS = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Shop No 12, Mahalaxmi Complex, Chatrapati Chowk Rd, Wakad, Pune 411057',
    color: '#e85d04',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon–Sat: 10am–8pm  •  Sun: 10am–6pm',
    color: '#2563eb',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 78916 72762',
    color: '#16a34a',
  },
];

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handle}
      aria-label="Copy address"
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '2px 4px',
        borderRadius: 4,
        display: 'inline-flex',
        alignItems: 'center',
        color: copied ? '#16a34a' : '#64748b',
        transition: 'color 0.2s',
      }}
    >
      {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
    </button>
  );
}

export default function KidsCityMap() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const popupRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTheme, setActiveTheme] = useState(DEFAULT_THEME);
  const [isChangingTheme, setIsChangingTheme] = useState(false);

  // ── Initialize Map ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: DEFAULT_THEME.url,
      center: [KIDS_CITY_LNG, KIDS_CITY_LAT],
      zoom: 16,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
      fadeDuration: 400,
    });

    mapRef.current = map;

    // ── Custom animated marker ──────────────────────────────────────────────
    const el = document.createElement('div');
    el.className = 'kc-map-marker';
    el.innerHTML = `
      <div class="kc-marker-pin">
        <div class="kc-marker-icon">🏪</div>
      </div>
      <div class="kc-marker-pulse"></div>
    `;

    const popup = new maplibregl.Popup({
      offset: [0, -54],
      closeButton: false,
      maxWidth: '260px',
      className: 'kc-map-popup',
    }).setHTML(`
      <div style="
        font-family: system-ui, sans-serif;
        padding: 12px 14px;
        min-width: 220px;
      ">
        <div style="
          font-size: 15px;
          font-weight: 700;
          color: #1a1a2e;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          gap: 6px;
        ">
          🏪 Kids City Wakad
        </div>
        <div style="font-size: 12px; color: #e85d04; font-weight: 600; margin-bottom: 6px;">
          Premium Kids Wear Store
        </div>
        <div style="font-size: 12px; color: #555; line-height: 1.5; margin-bottom: 10px;">
          Shop No 12, Mahalaxmi Complex,<br>
          Chatrapati Chowk Rd, Wakad, Pune
        </div>
        <a
          href="https://www.google.com/maps/dir//Kids+City+Wakad"
          target="_blank"
          rel="noopener noreferrer"
          style="
            display: inline-flex;
            align-items: center;
            gap: 5px;
            background: #e85d04;
            color: white;
            font-size: 11.5px;
            font-weight: 600;
            padding: 5px 11px;
            border-radius: 20px;
            text-decoration: none;
          "
        >
          ↗ Get Directions
        </a>
      </div>
    `);

    popupRef.current = popup;

    markerRef.current = new maplibregl.Marker({ element: el, anchor: 'bottom' })
      .setLngLat([KIDS_CITY_LNG, KIDS_CITY_LAT])
      .setPopup(popup)
      .addTo(map);

    map.on('load', () => {
      setIsLoaded(true);
      markerRef.current?.togglePopup();
      map.easeTo({
        center: [KIDS_CITY_LNG, KIDS_CITY_LAT],
        zoom: 17,
        pitch: 0,
        bearing: 0,
        duration: 1800,
        easing: (t) => t * (2 - t),
      });
    });

    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      'bottom-right'
    );

    return () => {
      markerRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ── Theme Switcher ───────────────────────────────────────────────────────────
  const switchTheme = useCallback((theme) => {
    if (!mapRef.current || theme.id === activeTheme.id) return;
    setIsChangingTheme(true);

    mapRef.current.setStyle(theme.url);

    mapRef.current.once('styledata', () => {
      setActiveTheme(theme);
      setIsChangingTheme(false);
      // Re-open popup after style change
      setTimeout(() => {
        if (!markerRef.current?.getPopup().isOpen()) {
          markerRef.current?.togglePopup();
        }
      }, 300);
    });
  }, [activeTheme]);

  // ── Zoom Controls ──────────────────────────────────────────────────────────
  const handleZoomIn = () => mapRef.current?.zoomIn({ duration: 300 });
  const handleZoomOut = () => mapRef.current?.zoomOut({ duration: 300 });
  const handleReset = () => {
    mapRef.current?.easeTo({
      center: [KIDS_CITY_LNG, KIDS_CITY_LAT],
      zoom: 17,
      pitch: 0,
      bearing: 0,
      duration: 700,
    });
  };
  const handleFullscreen = () => {
    const el = mapContainer.current?.parentElement?.parentElement;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  const isDark = activeTheme.id === 'dark';

  return (
    <>
      <style>{`
        /* ── Marker ─────────────────────────────────────────────────────── */
        .kc-map-marker {
          position: relative;
          width: 52px;
          height: 66px;
          cursor: pointer;
        }
        .kc-marker-pin {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 48px;
          height: 58px;
          background: linear-gradient(145deg, #e85d04, #c94a02);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(232, 93, 4, 0.55),
                      0 0 0 3px rgba(255, 255, 255, 0.9);
          transition: transform 0.2s ease;
        }
        .kc-map-marker:hover .kc-marker-pin {
          transform: translateX(-50%) scale(1.1) translateY(-4px);
        }
        .kc-marker-icon {
          font-size: 22px;
          filter: drop-shadow(0 1px 1px rgba(0,0,0,0.3));
          margin-top: -4px;
        }
        .kc-marker-pulse {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 8px;
          background: rgba(232, 93, 4, 0.35);
          border-radius: 50%;
          animation: kc-pulse 2s ease-in-out infinite;
        }
        @keyframes kc-pulse {
          0%, 100% { opacity: 0.3; transform: translateX(-50%) scale(0.8); }
          50% { opacity: 0.7; transform: translateX(-50%) scale(1.2); }
        }

        /* ── Popup ──────────────────────────────────────────────────────── */
        .kc-map-popup .maplibregl-popup-content {
          border-radius: 14px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.05);
          padding: 0;
          overflow: hidden;
          border: none;
        }
        .kc-map-popup .maplibregl-popup-tip {
          border-top-color: white;
        }

        /* ── Canvas ─────────────────────────────────────────────────────── */
        .kc-map-canvas {
          width: 100%;
          height: 100%;
          border-radius: inherit;
        }
        .kc-map-canvas .maplibregl-canvas {
          border-radius: inherit;
        }

        /* ── Attribution — collapse to tiny icon only ────────────────────── */
        .maplibregl-ctrl-attrib {
          background: rgba(255,255,255,0.75) !important;
          backdrop-filter: blur(6px) !important;
          border-radius: 8px !important;
          padding: 0 !important;
          margin: 0 8px 8px 0 !important;
          box-shadow: none !important;
          border: none !important;
        }
        /* Hide the text by default, show only the ℹ button */
        .maplibregl-ctrl-attrib-inner {
          display: none !important;
        }
        .maplibregl-ctrl-attrib-button {
          width: 22px !important;
          height: 22px !important;
          border-radius: 50% !important;
          background: rgba(255,255,255,0.85) !important;
          border: 1px solid rgba(0,0,0,0.1) !important;
          cursor: pointer !important;
          opacity: 0.7 !important;
          transition: opacity 0.2s !important;
        }
        .maplibregl-ctrl-attrib-button:hover {
          opacity: 1 !important;
        }
        /* Show text when toggled open */
        .maplibregl-ctrl-attrib.maplibregl-compact-show .maplibregl-ctrl-attrib-inner {
          display: block !important;
          font-size: 10px !important;
          padding: 4px 8px !important;
          color: #555 !important;
          white-space: nowrap !important;
        }
        .maplibregl-ctrl-attrib.maplibregl-compact-show {
          padding-right: 6px !important;
        }

        /* ── Control btn ────────────────────────────────────────────────── */
        .kc-ctrl-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.25);
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #374151;
          font-size: 18px;
          font-weight: 700;
          box-shadow: 0 2px 8px rgba(0,0,0,0.12);
          transition: background 0.15s, transform 0.15s, box-shadow 0.15s;
          outline: none;
          line-height: 1;
        }
        .kc-ctrl-btn:hover {
          background: white;
          transform: scale(1.08);
          box-shadow: 0 4px 16px rgba(0,0,0,0.18);
        }
        .kc-ctrl-btn:active { transform: scale(0.97); }

        /* ── Theme switcher pill ─────────────────────────────────────────── */
        .kc-theme-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 11px 5px 8px;
          border-radius: 30px;
          border: 1.5px solid rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.12);
          backdrop-filter: blur(10px);
          cursor: pointer;
          transition: all 0.18s;
          font-size: 11.5px;
          font-weight: 600;
          color: inherit;
          white-space: nowrap;
          outline: none;
        }
        .kc-theme-pill:hover {
          background: rgba(255,255,255,0.22);
          transform: translateY(-1px);
        }
        .kc-theme-pill.active {
          border-color: rgba(255,255,255,0.7);
          background: rgba(255,255,255,0.28);
          box-shadow: 0 2px 10px rgba(0,0,0,0.12);
        }
        .kc-theme-transition {
          animation: kc-fade-in 0.35s ease;
        }
        @keyframes kc-fade-in {
          from { opacity: 0.4; }
          to   { opacity: 1; }
        }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* ── Map Container ──────────────────────────────────────────────── */}
        <div
          style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            height: '430px',
            boxShadow: '0 8px 40px rgba(61,64,91,0.18), 0 0 0 1px rgba(61,64,91,0.08)',
            transition: 'box-shadow 0.3s',
          }}
        >
          {/* Loading overlay */}
          {(!isLoaded || isChangingTheme) && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: activeTheme.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                borderRadius: 'inherit',
                transition: 'background 0.3s',
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    border: `3px solid ${activeTheme.accent}`,
                    borderTopColor: 'transparent',
                    animation: 'spin 0.8s linear infinite',
                    margin: '0 auto 10px',
                  }}
                />
                <p style={{ color: isDark ? '#aaa' : '#64748b', fontSize: 12.5, fontWeight: 500 }}>
                  {isChangingTheme ? `Switching to ${activeTheme.label}…` : 'Loading map…'}
                </p>
              </div>
            </div>
          )}

          {/* MapLibre GL canvas */}
          <div ref={mapContainer} className={`kc-map-canvas${isLoaded ? ' kc-theme-transition' : ''}`} />

          {/* ── Theme Switcher bar (top-left) ────────────────────────────── */}
          <div
            style={{
              position: 'absolute',
              top: 14,
              left: 14,
              zIndex: 5,
              display: 'flex',
              gap: 5,
              flexWrap: 'wrap',
              maxWidth: 'calc(100% - 80px)',
            }}
          >
            {MAP_THEMES.map((theme) => {
              const isActive = activeTheme.id === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => switchTheme(theme)}
                  className={`kc-theme-pill${isActive ? ' active' : ''}`}
                  style={{
                    color: isDark ? '#e2e8f0' : '#1e293b',
                    background: isActive
                      ? isDark
                        ? 'rgba(255,255,255,0.2)'
                        : 'rgba(255,255,255,0.95)'
                      : isDark
                        ? 'rgba(255,255,255,0.08)'
                        : 'rgba(255,255,255,0.75)',
                    boxShadow: isActive
                      ? '0 2px 12px rgba(0,0,0,0.15)'
                      : 'none',
                  }}
                  title={theme.description}
                  aria-pressed={isActive}
                >
                  <span style={{ fontSize: 13 }}>{theme.emoji}</span>
                  <span>{theme.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── Zoom + fullscreen Controls (right) ───────────────────────── */}
          <div
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              zIndex: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <button className="kc-ctrl-btn" onClick={handleZoomIn} title="Zoom In">+</button>
            <button className="kc-ctrl-btn" onClick={handleZoomOut} title="Zoom Out">−</button>
            <div style={{ height: 1, background: 'rgba(0,0,0,0.1)', margin: '1px 0' }} />
            <button className="kc-ctrl-btn" onClick={handleReset} title="Reset" style={{ fontSize: 14 }}>⌖</button>
            <button className="kc-ctrl-btn" onClick={handleFullscreen} title="Fullscreen" style={{ fontSize: 13 }}>⛶</button>
          </div>

          {/* ── Bottom-left badge ───────────────────────────────────────── */}
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              left: 14,
              zIndex: 5,
              background: isDark ? 'rgba(30,30,46,0.9)' : 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(8px)',
              borderRadius: 10,
              padding: '5px 10px',
              fontSize: 11,
              fontWeight: 600,
              color: isDark ? '#e2e8f0' : '#374151',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.5)'}`,
              transition: 'all 0.3s',
            }}
          >
            <MapPin size={12} color="#e85d04" />
            Kids City · Wakad, Pune
          </div>
        </div>

        {/* ── Info Cards ─────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 12,
          }}
        >
          {INFO_CARDS.map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10,
                background: 'white',
                borderRadius: 14,
                padding: '12px 14px',
                boxShadow: '0 2px 12px rgba(61,64,91,0.07)',
                border: '1px solid rgba(61,64,91,0.07)',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: `${color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Icon size={16} color={color} />
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>
                  {label}
                </div>
                <div style={{ fontSize: 12.5, color: '#374151', lineHeight: 1.45, fontWeight: 500, display: 'flex', alignItems: 'flex-start', gap: 4 }}>
                  <span>{value}</span>
                  {label === 'Address' && <CopyButton text={value} />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA Buttons ────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a
            href="https://www.google.com/maps/dir//Kids+City+Wakad"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              background: 'linear-gradient(135deg, #e85d04, #c94a02)',
              color: 'white',
              fontWeight: 700,
              fontSize: 14,
              padding: '11px 22px',
              borderRadius: 30,
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(232,93,4,0.35)',
              transition: 'transform 0.18s, box-shadow 0.18s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(232,93,4,0.45)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(232,93,4,0.35)';
            }}
          >
            <Navigation size={15} /> Get Directions
          </a>
          <a
            href="tel:+917891672762"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              background: 'white',
              color: '#1a1a2e',
              fontWeight: 700,
              fontSize: 14,
              padding: '11px 22px',
              borderRadius: 30,
              textDecoration: 'none',
              boxShadow: '0 2px 12px rgba(61,64,91,0.12)',
              border: '1.5px solid rgba(61,64,91,0.12)',
              transition: 'transform 0.18s, box-shadow 0.18s',
            }}
            onMouseOver={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(61,64,91,0.16)';
            }}
            onMouseOut={e => {
              e.currentTarget.style.transform = '';
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(61,64,91,0.12)';
            }}
          >
            <Phone size={15} /> +91 78916 72762
          </a>
        </div>
      </div>
    </>
  );
}
