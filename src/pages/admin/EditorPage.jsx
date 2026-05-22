import React, { useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import { sections, dishes as initialDishes, allergens, tags } from '../../data'
import { btnGhost, btnPrimary } from '../../styles/utils'
import DishDetailModal from '../../components/admin/DishDetailModal'

function Pill({ text, palette, solid }) {
  return (
    <span style={{
      fontSize: 9,
      padding: '2px 6px',
      letterSpacing: '0.08em',
      fontFamily: '"Geist Mono", monospace',
      color: solid ? palette.bg : palette.muted,
      background: solid ? palette.accent : 'transparent',
      border: `1px solid ${solid ? palette.accent : palette.border}`,
      borderRadius: 2,
    }}>{text}</span>
  )
}

function EditorRow({
  dish, palette, selected, dragging, dropAbove,
  onSelect, onDragStart, onDragEnter, onDragEnd,
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={(e) => { e.preventDefault(); onDragEnter && onDragEnter() }}
      onDragEnd={onDragEnd}
      onClick={onSelect}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 12px',
        borderRadius: 3,
        cursor: 'pointer',
        background: selected ? palette.bg : 'transparent',
        border: `1px solid ${selected ? palette.border : 'transparent'}`,
        opacity: dragging ? 0.4 : 1,
        boxShadow: dropAbove ? `0 -2px 0 ${palette.accent}` : 'none',
        transition: 'background .12s, border .12s',
      }}
    >
      <span style={{ color: palette.muted, cursor: 'grab', padding: '0 2px' }}>
        <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor">
          <circle cx="2" cy="2" r="1.1" /><circle cx="8" cy="2" r="1.1" />
          <circle cx="2" cy="7" r="1.1" /><circle cx="8" cy="7" r="1.1" />
          <circle cx="2" cy="12" r="1.1" /><circle cx="8" cy="12" r="1.1" />
        </svg>
      </span>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: 3,
        background: `url("${dish.img}") center/cover`,
        flexShrink: 0,
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: 'italic',
          fontSize: 15,
          lineHeight: 1.1,
        }}>{dish.name}</div>
        <div style={{
          fontSize: 10.5,
          color: palette.muted,
          marginTop: 3,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>{dish.desc}</div>
      </div>
      <div style={{ display: 'flex', gap: 4 }}>
        {dish.tags.includes('chef')  && <Pill text="★"   palette={palette} solid />}
        {dish.tags.includes('veg')   && <Pill text="VEG" palette={palette} />}
        {dish.tags.includes('vegan') && <Pill text="VG"  palette={palette} />}
        {dish.tags.includes('gf')    && <Pill text="GF"  palette={palette} />}
        {dish.tags.includes('spicy') && <Pill text="🌶"  palette={palette} />}
      </div>
      <div style={{
        fontFamily: '"Geist Mono", monospace',
        fontSize: 13,
        fontVariantNumeric: 'tabular-nums',
        color: palette.ink,
        fontWeight: 500,
        width: 56,
        textAlign: 'right',
      }}>{dish.price.toFixed(2)} €</div>
      <button
        style={{
          width: 22,
          height: 22,
          border: 'none',
          background: 'transparent',
          color: palette.muted,
          cursor: 'pointer',
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
          <circle cx="2.5" cy="6" r="1.1" />
          <circle cx="6" cy="6" r="1.1" />
          <circle cx="9.5" cy="6" r="1.1" />
        </svg>
      </button>
    </div>
  )
}

function Field({ label, palette, children }) {
  return (
    <div>
      <div style={{
        fontSize: 10.5,
        color: palette.muted,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        marginBottom: 6,
      }}>{label}</div>
      {children}
    </div>
  )
}

function inputStyle(p) {
  return {
    padding: '8px 10px',
    border: `1px solid ${p.border}`,
    background: p.bg,
    borderRadius: 3,
    fontFamily: '"Geist", sans-serif',
    fontSize: 12.5,
    color: p.ink,
  }
}

function DishInspector({ palette, dish }) {
  return (
    <div style={{
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
    }}>
      <div style={{
        fontFamily: '"Geist Mono", monospace',
        fontSize: 10,
        letterSpacing: '0.22em',
        color: palette.muted,
        textTransform: 'uppercase',
      }}>Dettaglio piatto</div>

      {/* Photo */}
      <div style={{
        width: '100%',
        height: 160,
        borderRadius: 4,
        background: `url("${dish.img}") center/cover`,
        position: 'relative',
        border: `1px solid ${palette.border}`,
      }}>
        <button style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
          padding: '5px 9px',
          fontSize: 10.5,
          background: palette.bg,
          border: `1px solid ${palette.border}`,
          borderRadius: 3,
          cursor: 'pointer',
        }}>Sostituisci</button>
      </div>

      <Field label="Nome del piatto" palette={palette}>
        <div style={inputStyle(palette)}>
          <span style={{
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontSize: 16,
          }}>{dish.name}</span>
        </div>
      </Field>

      <Field label="Descrizione" palette={palette}>
        <div style={{
          ...inputStyle(palette),
          minHeight: 56,
          lineHeight: 1.5,
          fontSize: 12.5,
        }}>
          {dish.desc}
        </div>
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr', gap: 12 }}>
        <Field label="Prezzo" palette={palette}>
          <div style={{
            ...inputStyle(palette),
            fontFamily: '"Geist Mono", monospace',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {dish.price.toFixed(2)} €
          </div>
        </Field>
        <Field label="Tag" palette={palette}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {Object.keys(tags).map((k) => {
              const active = dish.tags.includes(k)
              return (
                <span key={k} style={{
                  fontSize: 10.5,
                  padding: '4px 8px',
                  cursor: 'pointer',
                  background: active ? palette.ink : palette.bg,
                  color: active ? palette.bg : palette.muted,
                  border: `1px solid ${active ? palette.ink : palette.border}`,
                  borderRadius: 2,
                }}>{tags[k].it}</span>
              )
            })}
          </div>
        </Field>
      </div>

      <Field label="Allergeni" palette={palette}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {Object.keys(allergens).map((k) => {
            const active = dish.allergens.includes(k)
            return (
              <span key={k} style={{
                fontSize: 10.5,
                padding: '4px 8px',
                cursor: 'pointer',
                background: active ? palette.accent : palette.bg,
                color: active ? palette.bg : palette.muted,
                border: `1px solid ${active ? palette.accent : palette.border}`,
                borderRadius: 2,
              }}>{allergens[k].it}</span>
            )
          })}
        </div>
      </Field>

      <Field label="Abbinamento vino" palette={palette}>
        <div style={inputStyle(palette)}>
          <span style={{
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontSize: 14,
          }}>{dish.wine}</span>
        </div>
      </Field>

      <div style={{
        padding: 12,
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        borderRadius: 3,
      }}>
        <div style={{
          fontSize: 10.5,
          color: palette.muted,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}>Traduzioni</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['IT', 'EN', 'FR', 'DE'].map((l, i) => (
            <span key={l} style={{
              padding: '3px 8px',
              fontSize: 10,
              borderRadius: 2,
              border: `1px solid ${palette.border}`,
              background: i < 3 ? palette.surface : 'transparent',
              color: i < 3 ? palette.ink : palette.muted,
              fontFamily: '"Geist Mono", monospace',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}>
              {i < 3 && <span style={{ color: palette.accent }}>✓</span>}
              {l}
            </span>
          ))}
          <button style={{
            padding: '3px 8px',
            fontSize: 10,
            borderRadius: 2,
            border: `1px dashed ${palette.border}`,
            background: 'transparent',
            color: palette.muted,
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}>+ Lingua</button>
        </div>
      </div>
    </div>
  )
}

function FakeQR({ palette, size = 200 }) {
  const cells = 21
  const cellSize = size / cells
  const isFinder = (x, y) => (
    (x < 7 && y < 7) || (x >= cells - 7 && y < 7) || (x < 7 && y >= cells - 7)
  )
  const rng = (x, y) => ((x * 7919 + y * 2731 + x * y) % 100) / 100
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ background: palette.surface }}>
      {Array.from({ length: cells }).map((_, y) =>
        Array.from({ length: cells }).map((_, x) => {
          if (isFinder(x, y)) return null
          const filled = rng(x, y) > 0.55
          if (!filled) return null
          return (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              fill={palette.ink}
            />
          )
        })
      )}
      {[[0, 0], [cells - 7, 0], [0, cells - 7]].map(([x, y], i) => (
        <g key={i} transform={`translate(${x * cellSize}, ${y * cellSize})`}>
          <rect width={cellSize * 7} height={cellSize * 7} fill={palette.ink} />
          <rect x={cellSize} y={cellSize} width={cellSize * 5} height={cellSize * 5} fill={palette.surface} />
          <rect x={cellSize * 2} y={cellSize * 2} width={cellSize * 3} height={cellSize * 3} fill={palette.ink} />
        </g>
      ))}
      <rect x={size / 2 - 18} y={size / 2 - 18} width={36} height={36} fill={palette.surface} />
      <text x={size / 2} y={size / 2 + 7} textAnchor="middle"
        style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: 'italic',
          fontSize: 22,
          fill: palette.accent,
        }}>M</text>
    </svg>
  )
}

function QRPanel({ palette }) {
  return (
    <div style={{
      padding: 32,
      flex: 1,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 32,
    }}>
      <div>
        <div style={{
          fontFamily: '"Geist Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.22em',
          color: palette.muted,
          textTransform: 'uppercase',
        }}>QR per il tavolo</div>
        <h2 style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: 'italic',
          fontSize: 26,
          margin: '8px 0 18px',
          fontWeight: 400,
        }}>Genera codici QR</h2>

        <Field label="Url di destinazione" palette={palette}>
          <div style={inputStyle(palette)}>menusmart.app/borgo/cena</div>
        </Field>

        <div style={{ marginTop: 18 }}>
          <Field label="Tavoli" palette={palette}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
              {Array.from({ length: 14 }, (_, i) => (
                <span key={i} style={{
                  width: 30,
                  height: 30,
                  fontSize: 11,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: i === 6 ? palette.ink : palette.bg,
                  color: i === 6 ? palette.bg : palette.ink,
                  border: `1px solid ${i === 6 ? palette.ink : palette.border}`,
                  borderRadius: 3,
                  fontFamily: '"Geist Mono", monospace',
                  cursor: 'pointer',
                }}>{String(i + 1).padStart(2, '0')}</span>
              ))}
            </div>
          </Field>
        </div>

        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Field label="Stile" palette={palette}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['Quadrato', 'Arrotondato', 'Punti'].map((s, i) => (
                <span key={s} style={{
                  padding: '6px 12px',
                  fontSize: 11,
                  cursor: 'pointer',
                  background: i === 0 ? palette.ink : palette.bg,
                  color: i === 0 ? palette.bg : palette.ink,
                  border: `1px solid ${i === 0 ? palette.ink : palette.border}`,
                  borderRadius: 3,
                }}>{s}</span>
              ))}
            </div>
          </Field>
          <Field label="Colore" palette={palette}>
            <div style={{ display: 'flex', gap: 6 }}>
              {[palette.ink, palette.accent, '#1d3a8a', '#7a3a1a'].map((c, i) => (
                <span key={i} style={{
                  width: 30,
                  height: 30,
                  background: c,
                  borderRadius: 3,
                  cursor: 'pointer',
                  border: i === 0 ? `2px solid ${palette.accent}` : `1px solid ${palette.border}`,
                  boxShadow: i === 0 ? `0 0 0 2px ${palette.bg}` : 'none',
                }} />
              ))}
            </div>
          </Field>
        </div>

        <div style={{ marginTop: 22, display: 'flex', gap: 8 }}>
          <button style={btnPrimary(palette)}>Scarica PDF · 14 QR</button>
          <button style={btnGhost(palette)}>Scarica PNG</button>
        </div>
      </div>

      {/* QR preview */}
      <div style={{
        background: palette.surface,
        border: `1px solid ${palette.border}`,
        borderRadius: 4,
        padding: 28,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          fontFamily: '"Geist Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.22em',
          color: palette.muted,
          textTransform: 'uppercase',
        }}>Anteprima · Tavolo 07</div>
        <div style={{ marginTop: 18 }}>
          <FakeQR palette={palette} size={210} />
        </div>
        <div style={{
          marginTop: 14,
          fontFamily: '"Instrument Serif", serif',
          fontStyle: 'italic',
          fontSize: 20,
        }}>Osteria del Borgo</div>
        <div style={{
          fontSize: 10.5,
          color: palette.muted,
          marginTop: 2,
          letterSpacing: '0.05em',
        }}>Inquadra per il menu · Scan for menu</div>
        <div style={{
          marginTop: 22,
          paddingTop: 18,
          borderTop: `1px solid ${palette.border}`,
          width: '100%',
        }}>
          <div style={{
            fontSize: 10.5,
            color: palette.muted,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 8,
          }}>Statistiche scansioni</div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 12,
          }}>
            <span>Oggi</span>
            <span style={{ fontFamily: '"Geist Mono", monospace' }}>27</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 12,
            marginTop: 4,
            color: palette.muted,
          }}>
            <span>Questa settimana</span>
            <span style={{ fontFamily: '"Geist Mono", monospace' }}>184</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function LivePreview({ palette }) {
  return (
    <div style={{
      padding: 22,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      <div style={{
        fontFamily: '"Geist Mono", monospace',
        fontSize: 10,
        letterSpacing: '0.22em',
        color: palette.muted,
        textTransform: 'uppercase',
      }}>Anteprima cliente</div>
      <div style={{
        background: palette.bg,
        border: `1px solid ${palette.border}`,
        borderRadius: 4,
        padding: 16,
      }}>
        <div style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: 'italic',
          fontSize: 20,
          textAlign: 'center',
        }}>Osteria del Borgo</div>
        <div style={{
          fontSize: 10,
          color: palette.muted,
          textAlign: 'center',
          marginTop: 4,
        }}>Carta della sera</div>
        <div style={{
          marginTop: 14,
          padding: '8px 0',
          borderTop: `1px solid ${palette.border}`,
          fontSize: 11,
          lineHeight: 1.5,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{
              fontFamily: '"Instrument Serif", serif',
              fontStyle: 'italic',
              fontSize: 13,
            }}>Vitello tonnato</span>
            <span style={{ fontFamily: '"Geist Mono", monospace' }}>16,00 €</span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 4,
          }}>
            <span style={{
              fontFamily: '"Instrument Serif", serif',
              fontStyle: 'italic',
              fontSize: 13,
            }}>Burrata e fichi</span>
            <span style={{ fontFamily: '"Geist Mono", monospace' }}>14,00 €</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function tabBtn(p, active) {
  return {
    padding: '6px 14px',
    fontSize: 12,
    cursor: 'pointer',
    background: active ? p.ink : 'transparent',
    color: active ? p.bg : p.muted,
    border: 'none',
    borderRadius: 3,
    fontFamily: 'inherit',
    fontWeight: 500,
  }
}

export default function EditorPage() {
  const { menuId } = useParams()
  const [searchParams] = useSearchParams()
  const { palette } = useApp()
  const navigate = useNavigate()

  const [dishes, setDishes] = useState(initialDishes)
  const [selectedDish, setSelectedDish] = useState(initialDishes[3])
  const [draggingId, setDraggingId] = useState(null)
  const [dropTarget, setDropTarget] = useState(null)
  const [activeTab, setActiveTab] = useState('content')

  const dishIdParam = searchParams.get('dish')
  const [modalDish, setModalDish] = useState(
    dishIdParam ? initialDishes.find((d) => d.id === dishIdParam) || null : null
  )

  const onDragStart = (id) => setDraggingId(id)
  const onDragEnter = (targetId) => setDropTarget(targetId)
  const onDragEnd = () => {
    if (!draggingId || !dropTarget || draggingId === dropTarget) {
      setDraggingId(null); setDropTarget(null); return
    }
    setDishes((ds) => {
      const next = [...ds]
      const fromIdx = next.findIndex((d) => d.id === draggingId)
      const toIdx = next.findIndex((d) => d.id === dropTarget)
      if (fromIdx < 0 || toIdx < 0) return ds
      const [item] = next.splice(fromIdx, 1)
      item.section = next[toIdx > 0 ? toIdx - 1 : 0]?.section || item.section
      next.splice(toIdx, 0, item)
      return next
    })
    setDraggingId(null); setDropTarget(null)
  }

  return (
    <div style={{
      height: '100vh',
      background: palette.bg,
      color: palette.ink,
      fontFamily: '"Geist", system-ui, sans-serif',
      display: 'grid',
      gridTemplateColumns: '64px 1fr 380px',
      overflow: 'hidden',
    }}>
      {/* Mini sidebar */}
      <aside style={{
        background: palette.surface,
        borderRight: `1px solid ${palette.border}`,
        padding: '20px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
      }}>
        <button
          onClick={() => navigate('/admin/dashboard')}
          title="Dashboard"
          style={{
            width: 36,
            height: 36,
            background: palette.accent,
            color: palette.bg,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontSize: 18,
            marginBottom: 12,
            border: 'none',
            cursor: 'pointer',
          }}>M</button>
        {[
          { c: 'M', title: 'Menu',        action: () => navigate('/admin/dashboard') },
          { c: 'P', title: 'Piatti',      action: () => {} },
          { c: 'D', title: 'Dashboard',   action: () => navigate('/admin/dashboard') },
          { c: 'Q', title: 'QR Code',     action: () => setActiveTab('qr') },
          { c: 'A', title: 'Analytics',   action: () => navigate('/admin/dashboard') },
          { c: 'S', title: 'Impostazioni',action: () => navigate('/admin/accedi') },
        ].map(({ c, title, action }, i) => (
          <button key={i} onClick={action} title={title} style={{
            width: 36,
            height: 36,
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            background: i === 1 ? palette.bg : 'transparent',
            color: i === 1 ? palette.ink : palette.muted,
            fontFamily: '"Geist Mono", monospace',
            fontSize: 12,
            fontWeight: 500,
          }}>{c}</button>
        ))}
      </aside>

      {/* Middle: editor */}
      <main style={{ overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header style={{
          padding: '18px 28px',
          borderBottom: `1px solid ${palette.border}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: palette.bg,
          position: 'sticky',
          top: 0,
          zIndex: 5,
        }}>
          <div>
            <div
              onClick={() => navigate('/admin/dashboard')}
              style={{
                fontFamily: '"Geist Mono", monospace',
                fontSize: 10,
                letterSpacing: '0.18em',
                color: palette.muted,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M6 2L3 5l3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              MENU / {(menuId || 'CENA').toUpperCase()} / MODIFICA
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 10,
              marginTop: 4,
            }}>
              <h1 style={{
                fontFamily: '"Instrument Serif", serif',
                fontStyle: 'italic',
                fontSize: 26,
                margin: 0,
                lineHeight: 1,
                fontWeight: 400,
              }}>Cena</h1>
              <div style={{ fontSize: 11, color: palette.muted }}>
                · Carta della sera · 12 piatti
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              display: 'flex',
              border: `1px solid ${palette.border}`,
              borderRadius: 4,
              background: palette.surface,
            }}>
              <button
                onClick={() => setActiveTab('content')}
                style={tabBtn(palette, activeTab === 'content')}
              >Contenuto</button>
              <button
                onClick={() => setActiveTab('qr')}
                style={tabBtn(palette, activeTab === 'qr')}
              >QR</button>
            </div>
            <div style={{
              width: 1,
              height: 24,
              background: palette.border,
              margin: '0 4px',
            }} />
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11,
              color: palette.muted,
            }}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: palette.accent,
              }} />
              Salvato 2s fa
            </span>
            <button style={btnPrimary(palette)}>Pubblica</button>
          </div>
        </header>

        {/* Body */}
        {activeTab === 'content' ? (
          <div style={{ padding: 28, flex: 1 }}>
            {sections.map((sec) => {
              const sectionDishes = dishes.filter((d) => d.section === sec.id)
              return (
                <section key={sec.id} style={{ marginBottom: 28 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 10,
                    paddingBottom: 8,
                    borderBottom: `1px solid ${palette.border}`,
                  }}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke={palette.muted} strokeWidth="1.4">
                      <path d="M3 4l2.5 2.5L8 4" strokeLinecap="round" />
                    </svg>
                    <div style={{
                      fontFamily: '"Instrument Serif", serif',
                      fontStyle: 'italic',
                      fontSize: 20,
                    }}>{sec.it}</div>
                    <span style={{ fontSize: 11, color: palette.muted }}>
                      {sectionDishes.length} piatti
                    </span>
                    <span style={{ flex: 1 }} />
                    <button style={{ ...btnGhost(palette), fontSize: 11, padding: '4px 10px' }}>
                      + Aggiungi piatto
                    </button>
                  </div>

                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                  }}>
                    {sectionDishes.map((d) => (
                      <EditorRow
                        key={d.id}
                        dish={d}
                        palette={palette}
                        selected={selectedDish && selectedDish.id === d.id}
                        dragging={draggingId === d.id}
                        dropAbove={dropTarget === d.id && draggingId !== d.id}
                        onSelect={() => {
                          setSelectedDish(d)
                          setModalDish(d)
                        }}
                        onDragStart={() => onDragStart(d.id)}
                        onDragEnter={() => onDragEnter(d.id)}
                        onDragEnd={onDragEnd}
                      />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        ) : (
          <QRPanel palette={palette} />
        )}
      </main>

      {/* Right: inspector */}
      <aside style={{
        borderLeft: `1px solid ${palette.border}`,
        background: palette.surface,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {selectedDish && activeTab === 'content' ? (
          <DishInspector palette={palette} dish={selectedDish} />
        ) : (
          <LivePreview palette={palette} />
        )}
      </aside>

      {modalDish && (
        <DishDetailModal
          palette={palette}
          dish={modalDish}
          onClose={() => setModalDish(null)}
        />
      )}
    </div>
  )
}
