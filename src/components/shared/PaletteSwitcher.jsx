import React, { useState, useEffect, useRef } from 'react'
import { useApp, PALETTES } from '../../contexts/AppContext'

export default function PaletteSwitcher() {
  const { palette, paletteName, setPaletteName } = useApp()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
      }}
    >
      {open && (
        <div style={{
          background: palette.surface,
          border: `1px solid ${palette.border}`,
          borderRadius: 8,
          padding: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
          minWidth: 200,
        }}>
          <div style={{
            fontFamily: '"Geist Mono", monospace',
            fontSize: 9,
            letterSpacing: '0.22em',
            color: palette.muted,
            textTransform: 'uppercase',
            marginBottom: 4,
          }}>Palette</div>
          {Object.entries(PALETTES).map(([key, p]) => {
            const active = key === paletteName
            return (
              <button
                key={key}
                onClick={() => { setPaletteName(key); setOpen(false) }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  background: active ? palette.bg : 'transparent',
                  border: `1px solid ${active ? palette.accent : 'transparent'}`,
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  textAlign: 'left',
                  color: palette.ink,
                  transition: 'all .15s',
                }}
              >
                <div style={{ display: 'flex', gap: 3 }}>
                  {[p.ink, p.accent, p.surface, p.border].map((c, i) => (
                    <span key={i} style={{
                      width: 10,
                      height: 10,
                      borderRadius: 2,
                      background: c,
                      border: '1px solid rgba(0,0,0,0.1)',
                    }} />
                  ))}
                </div>
                <span style={{ fontSize: 12 }}>{p.name}</span>
              </button>
            )
          })}
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          padding: '8px 14px',
          background: palette.ink,
          color: palette.bg,
          border: 'none',
          borderRadius: 999,
          fontFamily: '"Geist", sans-serif',
          fontSize: 11,
          fontWeight: 500,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
          letterSpacing: '0.03em',
        }}
      >
        <span style={{
          display: 'flex',
          gap: 3,
        }}>
          {[palette.accent, palette.ink, palette.bg].map((c, i) => (
            <span key={i} style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: c,
              border: '1px solid rgba(255,255,255,0.2)',
            }} />
          ))}
        </span>
        {palette.name}
      </button>
    </div>
  )
}
