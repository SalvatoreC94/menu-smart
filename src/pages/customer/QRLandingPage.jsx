import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import { restaurant, menus } from '../../data'

const langs = [
  { id: 'it', label: 'Italiano', flag: 'IT' },
  { id: 'en', label: 'English',  flag: 'EN' },
  { id: 'fr', label: 'Français', flag: 'FR' },
  { id: 'de', label: 'Deutsch',  flag: 'DE' },
]

export default function QRLandingPage() {
  const { palette, lang, setLang } = useApp()
  const navigate = useNavigate()
  const [selectedLang, setSelectedLang] = useState(lang)

  const handleLangPick = (id) => {
    setSelectedLang(id)
    setLang(id)
  }

  const handleMenuPick = (menuId) => {
    navigate(`/menu/${menuId}?lang=${selectedLang}&variant=classic`)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: palette.bg,
      display: 'flex',
      justifyContent: 'center',
    }}>
      <div style={{
        width: '100%',
        maxWidth: 480,
        background: palette.bg,
        color: palette.ink,
        fontFamily: '"Geist", system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        padding: '64px 28px 30px',
        minHeight: '100vh',
      }}>
        {/* Top stamp */}
        <div style={{ textAlign: 'center', marginBottom: 6 }}>
          <div style={{
            fontFamily: '"Geist Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.22em',
            color: palette.muted,
            textTransform: 'uppercase',
          }}>
            Benvenuto · Welcome
          </div>
        </div>

        {/* Restaurant name & table */}
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <div style={{
            fontFamily: '"Instrument Serif", serif',
            fontSize: 40,
            fontStyle: 'italic',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            fontWeight: 400,
          }}>{restaurant.name}</div>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 14,
            padding: '6px 14px',
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            fontFamily: '"Geist Mono", monospace',
            fontSize: 11,
            letterSpacing: '0.1em',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: palette.accent }} />
            TAVOLO 07
          </div>
        </div>

        {/* Language picker */}
        <div style={{ marginTop: 30 }}>
          <div style={{
            fontFamily: '"Geist Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.22em',
            color: palette.muted,
            textTransform: 'uppercase',
            marginBottom: 10,
          }}>
            Lingua · Language
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {langs.map((l) => {
              const active = selectedLang === l.id
              return (
                <button
                  key={l.id}
                  onClick={() => handleLangPick(l.id)}
                  style={{
                    padding: '14px 14px',
                    cursor: 'pointer',
                    background: active ? palette.ink : palette.surface,
                    color: active ? palette.bg : palette.ink,
                    border: `1px solid ${active ? palette.ink : palette.border}`,
                    fontFamily: 'inherit',
                    fontSize: 13,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    justifyContent: 'flex-start',
                    textAlign: 'left',
                    transition: 'all .15s',
                  }}
                >
                  <span style={{
                    fontFamily: '"Geist Mono", monospace',
                    fontSize: 10,
                    letterSpacing: '0.1em',
                    padding: '2px 5px',
                    border: `1px solid ${active ? palette.bg : palette.border}`,
                    opacity: 0.7,
                  }}>{l.flag}</span>
                  <span style={{
                    fontFamily: '"Instrument Serif", serif',
                    fontStyle: 'italic',
                    fontSize: 16,
                  }}>{l.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Menu picker */}
        <div style={{ marginTop: 30, flex: 1 }}>
          <div style={{
            fontFamily: '"Geist Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.22em',
            color: palette.muted,
            textTransform: 'uppercase',
            marginBottom: 10,
          }}>
            Scegli un menu
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {menus.filter((m) => m.active).map((m, i) => (
              <button
                key={m.id}
                onClick={() => handleMenuPick(m.id)}
                style={{
                  background: i === 0 ? palette.ink : palette.surface,
                  color: i === 0 ? palette.bg : palette.ink,
                  border: `1px solid ${i === 0 ? palette.ink : palette.border}`,
                  padding: '14px 16px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 10,
                }}
              >
                <div>
                  <div style={{
                    fontFamily: '"Instrument Serif", serif',
                    fontStyle: 'italic',
                    fontSize: 19,
                    lineHeight: 1.1,
                  }}>{m.name}</div>
                  <div style={{
                    fontSize: 10.5,
                    opacity: 0.65,
                    marginTop: 2,
                    letterSpacing: '0.04em',
                  }}>{m.subtitle}</div>
                </div>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: 24,
          paddingTop: 16,
          borderTop: `1px solid ${palette.border}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: '"Geist Mono", monospace',
          fontSize: 9,
          letterSpacing: '0.15em',
          color: palette.muted,
          textTransform: 'uppercase',
        }}>
          <button
            onClick={() => navigate('/admin/accedi')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: '"Geist Mono", monospace',
              fontSize: 9,
              letterSpacing: '0.15em',
              color: palette.muted,
              textTransform: 'uppercase',
              padding: 0,
            }}
          >MenuSmart · v 1.0</button>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: palette.accent }} />
            {restaurant.hours}
          </span>
        </div>
      </div>
    </div>
  )
}
