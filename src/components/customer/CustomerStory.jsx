import React, { useState, useRef, useMemo } from 'react'
import { restaurant, sections, dishes, allergens, tags, i18n } from '../../data'

function CoverPage({ palette }) {
  return (
    <section style={{
      height: '100%',
      scrollSnapAlign: 'start',
      background: palette.ink,
      color: palette.bg,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '110px 28px 56px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.5,
        background: `radial-gradient(circle at 30% 20%, ${palette.accent} 0%, transparent 55%)`,
      }} />
      <div style={{ position: 'relative' }}>
        <div style={{
          fontFamily: '"Geist Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.22em',
          opacity: 0.6,
        }}>
          MENUSMART · BOLOGNA
        </div>
      </div>
      <div style={{ position: 'relative' }}>
        <div style={{
          fontFamily: '"Instrument Serif", serif',
          fontSize: 64,
          lineHeight: 0.92,
          fontStyle: 'italic',
          letterSpacing: '-0.02em',
          fontWeight: 400,
        }}>
          {restaurant.name.split(' ').map((w, i) => (
            <div key={i} style={{ display: 'block' }}>{w}</div>
          ))}
        </div>
        <div style={{
          marginTop: 24,
          fontSize: 12,
          opacity: 0.7,
          lineHeight: 1.5,
          maxWidth: 240,
        }}>{restaurant.tagline}</div>
      </div>
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}>
        <div style={{ height: 1, background: palette.bg, opacity: 0.2 }} />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          fontSize: 10,
          letterSpacing: '0.1em',
          opacity: 0.75,
        }}>
          <div>
            <div style={{
              opacity: 0.55,
              textTransform: 'uppercase',
              marginBottom: 4,
            }}>Stagione</div>
            <div style={{
              fontFamily: '"Instrument Serif", serif',
              fontStyle: 'italic',
              fontSize: 17,
              opacity: 1,
              letterSpacing: 0,
            }}>Autunno 2026</div>
          </div>
          <div style={{ animation: 'bounce 2s ease-in-out infinite' }}>
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none">
              <path d="M7 1v16M2 12l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
      <style>{`@keyframes bounce { 0%,100% { transform: translateY(0) } 50% { transform: translateY(4px) } }`}</style>
    </section>
  )
}

function SectionPage({ palette, section, lang }) {
  return (
    <section style={{
      height: '100%',
      scrollSnapAlign: 'start',
      background: palette.bg,
      color: palette.ink,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 28px',
      textAlign: 'center',
      position: 'relative',
    }}>
      <div style={{
        fontFamily: '"Geist Mono", monospace',
        fontSize: 10,
        letterSpacing: '0.22em',
        color: palette.muted,
        textTransform: 'uppercase',
      }}>
        — Capitolo —
      </div>
      <div style={{
        fontFamily: '"Instrument Serif", serif',
        fontStyle: 'italic',
        fontSize: 72,
        lineHeight: 0.95,
        fontWeight: 400,
        letterSpacing: '-0.02em',
        marginTop: 18,
        color: palette.accent,
      }}>{section[lang]}</div>
      <div style={{
        marginTop: 18,
        fontSize: 13,
        color: palette.muted,
        lineHeight: 1.5,
        maxWidth: 240,
      }}>
        {section.note}
      </div>
      <div style={{
        marginTop: 32,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{ width: 28, height: 1, background: palette.muted }} />
        <span style={{
          fontFamily: '"Geist Mono", monospace',
          fontSize: 10,
          color: palette.muted,
          letterSpacing: '0.2em',
        }}>
          {section.id.toUpperCase()}
        </span>
        <span style={{ width: 28, height: 1, background: palette.muted }} />
      </div>
    </section>
  )
}

function DishPage({ palette, dish, section, lang }) {
  const t = i18n[lang] || i18n.it
  return (
    <section style={{
      height: '100%',
      scrollSnapAlign: 'start',
      background: palette.bg,
      color: palette.ink,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* image hero */}
      <div style={{
        height: '50%',
        background: `url("${dish.img}") center/cover`,
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: 16,
          left: 20,
          fontFamily: '"Geist Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.2em',
          color: '#fff',
          background: 'rgba(0,0,0,0.4)',
          padding: '4px 8px',
          backdropFilter: 'blur(4px)',
        }}>{section[lang].toUpperCase()}</div>
        {dish.tags.includes('chef') && (
          <div style={{
            position: 'absolute',
            bottom: 16,
            right: 20,
            background: palette.bg,
            color: palette.ink,
            padding: '6px 12px',
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontSize: 12,
          }}>{t.recommended}</div>
        )}
      </div>

      {/* text half */}
      <div style={{
        flex: 1,
        padding: '24px 28px 70px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h2 style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: 'italic',
          fontSize: 36,
          lineHeight: 1.0,
          margin: 0,
          fontWeight: 400,
          letterSpacing: '-0.015em',
        }}>{dish.name}</h2>
        <p style={{
          fontSize: 13.5,
          lineHeight: 1.55,
          marginTop: 12,
          color: palette.muted,
          flex: 1,
        }}>{dish.desc}</p>

        {/* wine pairing card */}
        <div style={{
          marginTop: 14,
          padding: '10px 14px',
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          borderLeft: `3px solid ${palette.accent}`,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: '"Geist Mono", monospace',
              fontSize: 8.5,
              letterSpacing: '0.2em',
              color: palette.muted,
              textTransform: 'uppercase',
            }}>{t.wine}</div>
            <div style={{
              fontFamily: '"Instrument Serif", serif',
              fontStyle: 'italic',
              fontSize: 14,
              marginTop: 2,
            }}>{dish.wine}</div>
          </div>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke={palette.accent} strokeWidth="1.2">
            <path d="M5 1v6c0 2.2 1.8 4 4 4s4-1.8 4-4V1H5z" />
            <path d="M9 11v6M5 17h8" />
          </svg>
        </div>

        {/* price + tags */}
        <div style={{
          marginTop: 14,
          paddingTop: 12,
          borderTop: `1px solid ${palette.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
          <div>
            <div style={{
              fontFamily: '"Geist Mono", monospace',
              fontSize: 9,
              letterSpacing: '0.2em',
              color: palette.muted,
              textTransform: 'uppercase',
            }}>
              {dish.tags.filter((x) => x !== 'chef').map((x) => tags[x][lang]).join(' · ') || ' '}
            </div>
            {dish.allergens.length > 0 && (
              <div style={{
                fontFamily: '"Geist Mono", monospace',
                fontSize: 9,
                color: palette.muted,
                marginTop: 3,
                letterSpacing: '0.1em',
              }}>
                contiene: {dish.allergens.map((a) => allergens[a][lang]).join(', ')}
              </div>
            )}
          </div>
          <div style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: 28,
            fontVariantNumeric: 'tabular-nums',
            color: palette.accent,
            lineHeight: 1,
          }}>
            {dish.price}<span style={{ fontSize: 14, marginLeft: 1 }}>€</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function CustomerStory({ palette, lang = 'it' }) {
  const pages = useMemo(() => {
    const out = [{ kind: 'cover' }]
    for (const s of sections) {
      out.push({ kind: 'section', section: s })
      for (const d of dishes.filter((x) => x.section === s.id)) {
        out.push({ kind: 'dish', dish: d, section: s })
      }
    }
    return out
  }, [])

  const [activePage, setActivePage] = useState(0)
  const wrapRef = useRef(null)

  const onScroll = (e) => {
    const i = Math.round(e.currentTarget.scrollTop / e.currentTarget.clientHeight)
    if (i !== activePage) setActivePage(i)
  }

  const sectionDots = sections.map((s) => {
    const firstIdx = pages.findIndex((p) => p.kind === 'section' && p.section.id === s.id)
    const lastDish = pages
      .map((p, i) => (p.kind === 'dish' && p.section.id === s.id ? i : -1))
      .filter((x) => x >= 0)
    const lastIdx = lastDish.length ? lastDish[lastDish.length - 1] : firstIdx
    return { ...s, firstIdx, lastIdx }
  })

  const activeSection = sectionDots.find(
    (s) => activePage >= s.firstIdx && activePage <= s.lastIdx
  ) || sectionDots[0]

  const jumpTo = (idx) => {
    if (wrapRef.current) {
      wrapRef.current.scrollTo({
        top: idx * wrapRef.current.clientHeight,
        behavior: 'smooth',
      })
    }
  }

  const currentSectionLabel = activePage === 0
    ? restaurant.name
    : (activeSection ? activeSection[lang] : restaurant.name)

  return (
    <div style={{
      height: '100%',
      background: palette.bg,
      color: palette.ink,
      fontFamily: '"Geist", system-ui, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top fixed chrome */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        padding: '52px 20px 0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mixBlendMode: 'difference',
        color: '#fff',
      }}>
        <div style={{
          fontFamily: '"Geist Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
        }}>
          {currentSectionLabel}
        </div>
        <div style={{
          fontFamily: '"Geist Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.18em',
        }}>
          {String(activePage + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
        </div>
      </div>

      {/* Side rail */}
      <div style={{
        position: 'absolute',
        right: 12,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}>
        {sectionDots.map((s) => {
          const isActive = activeSection && s.id === activeSection.id
          return (
            <button
              key={s.id}
              onClick={() => jumpTo(s.firstIdx)}
              style={{
                width: 3,
                height: 24,
                padding: 0,
                border: 'none',
                background: isActive ? palette.ink : palette.muted,
                opacity: isActive ? 1 : 0.35,
                cursor: 'pointer',
                borderRadius: 2,
                mixBlendMode: 'difference',
                transition: 'all .25s',
              }}
            />
          )
        })}
      </div>

      {/* Snap-scroll pages */}
      <div
        ref={wrapRef}
        onScroll={onScroll}
        style={{
          height: '100%',
          overflowY: 'auto',
          scrollSnapType: 'y mandatory',
          scrollbarWidth: 'none',
        }}
      >
        {pages.map((p, i) => {
          if (p.kind === 'cover') return <CoverPage key={i} palette={palette} />
          if (p.kind === 'section') return (
            <SectionPage key={i} palette={palette} section={p.section} lang={lang} />
          )
          return (
            <DishPage
              key={i}
              palette={palette}
              dish={p.dish}
              section={p.section}
              lang={lang}
            />
          )
        })}
      </div>
    </div>
  )
}
