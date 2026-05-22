import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import { restaurant, menus } from '../../data'
import { btnGhost, btnPrimary } from '../../styles/utils'

const stats = [
  { label: 'Visite oggi',           value: '342',                    delta: '+12%',          positive: true },
  { label: 'Piatto più visto',      value: 'Tagliolini al tartufo',  delta: '48 viste',      positive: true, soft: true },
  { label: 'Lingue richieste',      value: '4',                      delta: 'IT · EN · FR · DE', soft: true },
  { label: 'Tempo medio sul menu',  value: '2m 14s',                 delta: '+18s',          positive: true },
]

const days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
const visits = [180, 220, 240, 290, 380, 460, 410]
const max = Math.max(...visits)

const topDishes = [
  { name: 'Tagliolini al tartufo', section: 'Primi',    views: 482, change: '+24%' },
  { name: 'Costata di fassona',    section: 'Secondi',  views: 391, change: '+11%' },
  { name: 'Vitello tonnato',       section: 'Antipasti',views: 348, change: '+8%' },
  { name: 'Tiramisù della casa',   section: 'Dolci',    views: 312, change: '+19%' },
  { name: 'Branzino in crosta',    section: 'Secondi',  views: 287, change: '− 4%' },
]

const navItems = [
  { id: 'overview',  label: 'Panoramica',    icon: 'M2 4h12M2 8h12M2 12h12',                                                                route: '/admin/dashboard' },
  { id: 'menus',     label: 'Menu',          icon: 'M3 3h10v10H3z M3 6h10 M6 3v10',                                                         route: '/admin/menu/cena/edit' },
  { id: 'dishes',    label: 'Piatti',        icon: 'M8 2a6 6 0 100 12 6 6 0 000-12z M5 8h6',                                                route: '/admin/dashboard' },
  { id: 'qr',        label: 'QR Code',       icon: 'M2 2h5v5H2z M9 2h5v5H9z M2 9h5v5H2z M9 9h2M11 9v2 M13 11h1v3 M9 13h2',                route: '/admin/menu/cena/edit?tab=qr' },
  { id: 'analytics', label: 'Analytics',     icon: 'M2 13l4-5 3 3 5-7',                                                                     route: '/admin/dashboard' },
  { id: 'settings',  label: 'Impostazioni',  icon: 'M8 5a3 3 0 100 6 3 3 0 000-6z M8 1v2 M8 13v2 M14 8h-2 M4 8H2 M12 4l-1.4 1.4 M5.4 10.6L4 12 M12 12l-1.4-1.4 M5.4 5.4L4 4', route: '/admin/accedi' },
]

export default function DashboardPage() {
  const { palette } = useApp()
  const navigate = useNavigate()
  const location = useLocation()
  const [selectedMenu, setSelectedMenu] = useState('cena')

  return (
    <div style={{
      height: '100vh',
      background: palette.bg,
      color: palette.ink,
      fontFamily: '"Geist", system-ui, sans-serif',
      display: 'grid',
      gridTemplateColumns: '220px 1fr',
      overflow: 'hidden',
    }}>
      {/* Sidebar */}
      <aside style={{
        background: palette.surface,
        borderRight: `1px solid ${palette.border}`,
        padding: '24px 0',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ padding: '0 22px 26px' }}>
          <div style={{
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontSize: 22,
            lineHeight: 1,
          }}>MenuSmart</div>
          <div style={{
            fontSize: 10,
            color: palette.muted,
            marginTop: 4,
            letterSpacing: '0.05em',
          }}>Workspace</div>
        </div>

        {/* Restaurant switcher */}
        <div style={{ padding: '0 14px 18px' }}>
          <div style={{
            padding: '10px 12px',
            background: palette.bg,
            border: `1px solid ${palette.border}`,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
          }}>
            <div style={{
              width: 28,
              height: 28,
              background: palette.accent,
              color: palette.bg,
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Instrument Serif", serif',
              fontStyle: 'italic',
              fontSize: 16,
            }}>O</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontSize: 12,
                fontWeight: 500,
                lineHeight: 1.2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>{restaurant.name}</div>
              <div style={{ fontSize: 10, color: palette.muted, marginTop: 1 }}>Bologna</div>
            </div>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke={palette.muted} strokeWidth="1.4">
              <path d="M2 4l3 3 3-3M2 8l3-3 3 3" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Nav */}
        <nav style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: '0 8px',
        }}>
          {navItems.map((n) => {
            const active = location.pathname === n.route || (n.id === 'overview' && location.pathname === '/admin/dashboard')
            return (
              <button
                key={n.id}
                onClick={() => navigate(n.route)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 11,
                  padding: '8px 12px',
                  background: active ? palette.bg : 'transparent',
                  color: active ? palette.ink : palette.muted,
                  border: 'none',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontSize: 13,
                  fontFamily: 'inherit',
                  fontWeight: active ? 500 : 400,
                  textAlign: 'left',
                }}
              >
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d={n.icon} />
                </svg>
                {n.label}
              </button>
            )
          })}
        </nav>

        <div style={{
          padding: '14px 18px 0',
          borderTop: `1px solid ${palette.border}`,
          marginTop: 12,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: palette.border,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 500,
            }}>MR</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, lineHeight: 1.1 }}>Marco Rossi</div>
              <div style={{ fontSize: 10, color: palette.muted }}>Proprietario</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ overflow: 'auto', padding: '28px 36px 36px' }}>
        {/* Topbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 28,
        }}>
          <div>
            <div style={{
              fontFamily: '"Geist Mono", monospace',
              fontSize: 10,
              letterSpacing: '0.22em',
              color: palette.muted,
              textTransform: 'uppercase',
            }}>
              Panoramica · Mer 22 Mag 2026
            </div>
            <h1 style={{
              fontFamily: '"Instrument Serif", serif',
              fontStyle: 'italic',
              fontSize: 36,
              margin: '6px 0 0',
              lineHeight: 1,
              fontWeight: 400,
              letterSpacing: '-0.01em',
            }}>Buongiorno, Marco.</h1>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={btnGhost(palette)}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M3 5h8M3 9h8M3 1h8v12H3z" />
              </svg>
              Esporta
            </button>
            <button
              style={btnPrimary(palette)}
              onClick={() => navigate('/admin/menu/nuovo')}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M7 2v10M2 7h10" strokeLinecap="round" />
              </svg>
              Nuovo menu
            </button>
          </div>
        </div>

        {/* Stat row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          marginBottom: 24,
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{
              background: palette.surface,
              border: `1px solid ${palette.border}`,
              padding: '16px 18px',
              borderRadius: 4,
            }}>
              <div style={{
                fontSize: 10.5,
                color: palette.muted,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>{s.label}</div>
              <div style={{
                fontFamily: s.soft && isNaN(parseInt(s.value)) ? '"Instrument Serif", serif' : '"Geist", sans-serif',
                fontStyle: s.soft && isNaN(parseInt(s.value)) ? 'italic' : 'normal',
                fontSize: s.soft && isNaN(parseInt(s.value)) ? 22 : 30,
                fontWeight: 500,
                marginTop: 8,
                lineHeight: 1,
                letterSpacing: '-0.01em',
                fontVariantNumeric: 'tabular-nums',
              }}>{s.value}</div>
              <div style={{
                fontSize: 10.5,
                color: s.positive ? palette.accent : palette.muted,
                marginTop: 6,
              }}>{s.delta}</div>
            </div>
          ))}
        </div>

        {/* Chart + menu list */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr',
          gap: 12,
          marginBottom: 24,
        }}>
          {/* Visits chart */}
          <div style={{
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: 4,
            padding: 20,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}>
              <div>
                <div style={{
                  fontSize: 10.5,
                  color: palette.muted,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>Visite ultimi 7 giorni</div>
                <div style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontStyle: 'italic',
                  fontSize: 22,
                  marginTop: 4,
                }}>2.180 visite totali</div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                {['7g', '30g', '90g'].map((p, i) => (
                  <button key={p} style={{
                    padding: '4px 10px',
                    fontSize: 11,
                    background: i === 0 ? palette.ink : 'transparent',
                    color: i === 0 ? palette.bg : palette.muted,
                    border: `1px solid ${i === 0 ? palette.ink : palette.border}`,
                    borderRadius: 2,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}>{p}</button>
                ))}
              </div>
            </div>
            {/* Bar chart */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 14,
              height: 150,
              padding: '0 4px',
            }}>
              {visits.map((v, i) => (
                <div key={i} style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <div style={{
                    fontSize: 10,
                    color: palette.muted,
                    fontVariantNumeric: 'tabular-nums',
                  }}>{v}</div>
                  <div style={{
                    width: '100%',
                    height: `${(v / max) * 110}px`,
                    background: i === 5 ? palette.accent : palette.ink,
                    borderRadius: 1,
                    opacity: i === 5 ? 1 : 0.85,
                  }} />
                  <div style={{
                    fontSize: 10.5,
                    color: palette.muted,
                    letterSpacing: '0.05em',
                  }}>{days[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Menus list */}
          <div style={{
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: 4,
            padding: 20,
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 14,
            }}>
              <div>
                <div style={{
                  fontSize: 10.5,
                  color: palette.muted,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>I tuoi menu</div>
                <div style={{
                  fontFamily: '"Instrument Serif", serif',
                  fontStyle: 'italic',
                  fontSize: 18,
                  marginTop: 4,
                }}>5 menu attivi</div>
              </div>
              <button style={{ ...btnGhost(palette), fontSize: 11, padding: '5px 10px' }}>
                Gestisci
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {menus.map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    setSelectedMenu(m.id)
                    navigate(`/admin/menu/${m.id}/edit`)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '10px 12px',
                    background: m.id === selectedMenu ? palette.bg : 'transparent',
                    border: `1px solid ${m.id === selectedMenu ? palette.border : 'transparent'}`,
                    borderRadius: 3,
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: m.active ? palette.accent : palette.muted,
                  }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: 13,
                      fontWeight: 500,
                      lineHeight: 1.1,
                    }}>{m.name}</div>
                    <div style={{
                      fontSize: 10,
                      color: palette.muted,
                      marginTop: 2,
                    }}>{m.subtitle}</div>
                  </div>
                  <div style={{
                    fontFamily: '"Geist Mono", monospace',
                    fontSize: 11,
                    color: palette.muted,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {m.views.toLocaleString('it-IT')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top dishes table */}
        <div style={{
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 4,
          padding: 20,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
          }}>
            <div>
              <div style={{
                fontSize: 10.5,
                color: palette.muted,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>Piatti più visualizzati</div>
              <div style={{
                fontFamily: '"Instrument Serif", serif',
                fontStyle: 'italic',
                fontSize: 18,
                marginTop: 4,
              }}>Top 5 questa settimana</div>
            </div>
            <button style={{ ...btnGhost(palette), fontSize: 11, padding: '5px 10px' }}>
              Vedi tutti
            </button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
            <thead>
              <tr style={{
                color: palette.muted,
                fontSize: 10.5,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                <th style={{
                  textAlign: 'left',
                  padding: '8px 0',
                  fontWeight: 500,
                  borderBottom: `1px solid ${palette.border}`,
                }}>Piatto</th>
                <th style={{
                  textAlign: 'left',
                  padding: '8px 0',
                  fontWeight: 500,
                  borderBottom: `1px solid ${palette.border}`,
                }}>Sezione</th>
                <th style={{
                  textAlign: 'right',
                  padding: '8px 0',
                  fontWeight: 500,
                  borderBottom: `1px solid ${palette.border}`,
                }}>Visite</th>
                <th style={{
                  textAlign: 'right',
                  padding: '8px 0',
                  fontWeight: 500,
                  borderBottom: `1px solid ${palette.border}`,
                }}>Variazione</th>
              </tr>
            </thead>
            <tbody>
              {topDishes.map((d, i) => (
                <tr key={i}>
                  <td style={{
                    padding: '11px 0',
                    borderBottom: i < topDishes.length - 1 ? `1px solid ${palette.border}` : 'none',
                    fontFamily: '"Instrument Serif", serif',
                    fontStyle: 'italic',
                    fontSize: 15,
                  }}>
                    <span style={{
                      color: palette.muted,
                      marginRight: 10,
                      fontFamily: '"Geist Mono", monospace',
                      fontStyle: 'normal',
                      fontSize: 11,
                    }}>0{i + 1}</span>
                    {d.name}
                  </td>
                  <td style={{
                    padding: '11px 0',
                    borderBottom: i < topDishes.length - 1 ? `1px solid ${palette.border}` : 'none',
                    color: palette.muted,
                  }}>{d.section}</td>
                  <td style={{
                    padding: '11px 0',
                    borderBottom: i < topDishes.length - 1 ? `1px solid ${palette.border}` : 'none',
                    textAlign: 'right',
                    fontFamily: '"Geist Mono", monospace',
                    fontVariantNumeric: 'tabular-nums',
                  }}>{d.views}</td>
                  <td style={{
                    padding: '11px 0',
                    borderBottom: i < topDishes.length - 1 ? `1px solid ${palette.border}` : 'none',
                    textAlign: 'right',
                    color: d.change.startsWith('+') ? palette.accent : palette.muted,
                    fontFamily: '"Geist Mono", monospace',
                  }}>{d.change}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
