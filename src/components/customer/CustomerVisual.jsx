import React, { useState, useEffect } from 'react'
import { restaurant, sections, dishes, allergens, tags, i18n } from '../../data'

function DishCard({ dish, palette, lang, height, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        breakInside: 'avoid',
        marginBottom: 10,
        cursor: 'pointer',
        background: palette.surface,
        borderRadius: 4,
        overflow: 'hidden',
        border: `1px solid ${palette.border}`,
        transition: 'transform .2s',
      }}
    >
      <div style={{
        width: '100%',
        height,
        background: `url("${dish.img}") center/cover`,
        position: 'relative',
      }}>
        {dish.tags.includes('chef') && (
          <div style={{
            position: 'absolute',
            top: 8,
            left: 8,
            background: palette.accent,
            color: palette.bg,
            fontSize: 8.5,
            padding: '3px 7px',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            borderRadius: 2,
          }}>★</div>
        )}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,.55), transparent)',
          padding: '20px 10px 8px',
          color: '#fff',
        }}>
          <div style={{
            fontFamily: '"Geist Mono", monospace',
            fontSize: 11,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {dish.price.toFixed(2)} €
          </div>
        </div>
      </div>
      <div style={{ padding: '10px 12px 12px' }}>
        <div style={{
          fontFamily: '"Instrument Serif", serif',
          fontSize: 16,
          lineHeight: 1.15,
          fontWeight: 400,
          color: palette.ink,
        }}>{dish.name}</div>
        <div style={{ display: 'flex', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
          {dish.tags.filter((k) => k !== 'chef').map((k) => (
            <span key={k} style={{
              fontSize: 8.5,
              padding: '2px 5px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: palette.muted,
              border: `1px solid ${palette.border}`,
              borderRadius: 2,
            }}>{tags[k][lang]}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function DetailSheet({ dish, palette, lang, onClose }) {
  const t = i18n[lang] || i18n.it

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 30,
        background: 'rgba(20,15,10,.45)',
        backdropFilter: 'blur(2px)',
        display: 'flex',
        alignItems: 'flex-end',
        animation: 'fadeIn .2s',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: palette.bg,
          width: '100%',
          maxHeight: '88%',
          borderRadius: '20px 20px 0 0',
          padding: '12px 22px 30px',
          overflowY: 'auto',
          animation: 'slideUp .25s cubic-bezier(.2,.7,.3,1)',
        }}
      >
        {/* drag handle */}
        <div style={{
          width: 40,
          height: 4,
          background: palette.border,
          borderRadius: 2,
          margin: '0 auto 14px',
        }} />
        <div style={{
          width: '100%',
          height: 200,
          borderRadius: 4,
          marginBottom: 16,
          background: `url("${dish.img}") center/cover`,
        }} />
        <div style={{
          fontFamily: '"Geist Mono", monospace',
          fontSize: 9.5,
          letterSpacing: '0.22em',
          color: palette.muted,
          textTransform: 'uppercase',
        }}>
          {dish.tags.includes('chef') ? t.recommended : t.menu}
        </div>
        <h2 style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: 'italic',
          fontSize: 30,
          lineHeight: 1.05,
          margin: '6px 0 0',
          fontWeight: 400,
          letterSpacing: '-0.01em',
        }}>{dish.name}</h2>
        <div style={{
          fontFamily: '"Geist Mono", monospace',
          fontSize: 14,
          fontVariantNumeric: 'tabular-nums',
          marginTop: 8,
          color: palette.accent,
        }}>{dish.price.toFixed(2)} €</div>
        <p style={{
          fontSize: 13,
          lineHeight: 1.6,
          marginTop: 14,
          color: palette.ink,
        }}>{dish.desc}</p>

        <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
          {dish.tags.map((k) => (
            <span key={k} style={{
              fontSize: 10,
              padding: '4px 8px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: palette.muted,
              border: `1px solid ${palette.border}`,
              borderRadius: 2,
            }}>{tags[k][lang]}</span>
          ))}
        </div>

        <div style={{
          marginTop: 18,
          padding: 12,
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 4,
        }}>
          <div style={{
            fontSize: 9.5,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: palette.muted,
            marginBottom: 4,
          }}>{t.wine}</div>
          <div style={{
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontSize: 16,
          }}>{dish.wine}</div>
        </div>

        {dish.allergens.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <div style={{
              fontSize: 9.5,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: palette.muted,
              marginBottom: 6,
            }}>{t.allergens}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {dish.allergens.map((a) => (
                <span key={a} style={{
                  fontSize: 11,
                  padding: '4px 9px',
                  background: palette.surface,
                  border: `1px solid ${palette.border}`,
                  borderRadius: 999,
                }}>
                  {allergens[a][lang]}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { transform:translateY(20%); opacity:0 } to { transform:translateY(0); opacity:1 } }
      `}</style>
    </div>
  )
}

export default function CustomerVisual({ palette, lang = 'it' }) {
  const t = i18n[lang] || i18n.it
  const [openDish, setOpenDish] = useState(null)
  const [activeSection, setActiveSection] = useState('all')

  const visible = activeSection === 'all'
    ? dishes
    : dishes.filter((d) => d.section === activeSection)

  const heights = [220, 260, 200, 240, 210, 250]

  const allFilter = { id: 'all', it: 'Tutto', en: 'All', fr: 'Tout', de: 'Alle' }

  return (
    <div style={{
      height: '100%',
      background: palette.bg,
      color: palette.ink,
      fontFamily: '"Geist", system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* Header */}
      <header style={{ padding: '64px 20px 16px', flexShrink: 0 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{
              fontFamily: '"Instrument Serif", serif',
              fontSize: 24,
              fontStyle: 'italic',
              lineHeight: 1,
            }}>{restaurant.name}</div>
            <div style={{ fontSize: 11, color: palette.muted, marginTop: 4 }}>
              {t.menu} · Cena
            </div>
          </div>
          <button style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: `1px solid ${palette.border}`,
            background: palette.surface,
            color: palette.ink,
            fontSize: 11,
            fontFamily: '"Geist Mono", monospace',
            cursor: 'pointer',
          }}>{lang.toUpperCase()}</button>
        </div>
      </header>

      {/* Filter chips */}
      <div style={{
        padding: '4px 20px 14px',
        display: 'flex',
        gap: 6,
        overflowX: 'auto',
        flexShrink: 0,
      }}>
        {[allFilter, ...sections].map((s) => {
          const active = activeSection === s.id
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              style={{
                padding: '7px 14px',
                borderRadius: 999,
                fontSize: 12,
                fontFamily: 'inherit',
                cursor: 'pointer',
                flexShrink: 0,
                background: active ? palette.ink : 'transparent',
                color: active ? palette.bg : palette.muted,
                border: `1px solid ${active ? palette.ink : palette.border}`,
                transition: 'all .15s',
              }}
            >{s[lang] || s.it}</button>
          )
        })}
      </div>

      {/* Masonry grid */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 14px 80px' }}>
        <div style={{ columns: 2, columnGap: 10 }}>
          {visible.map((d, i) => (
            <DishCard
              key={d.id}
              dish={d}
              palette={palette}
              lang={lang}
              height={heights[i % heights.length]}
              onClick={() => setOpenDish(d)}
            />
          ))}
        </div>
      </div>

      {/* Detail sheet */}
      {openDish && (
        <DetailSheet
          dish={openDish}
          palette={palette}
          lang={lang}
          onClose={() => setOpenDish(null)}
        />
      )}
    </div>
  )
}
