import React, { useState } from 'react'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import CustomerClassic from '../../components/customer/CustomerClassic'
import CustomerVisual from '../../components/customer/CustomerVisual'
import CustomerStory from '../../components/customer/CustomerStory'

const VARIANTS = [
  { id: 'classic', label: 'A' },
  { id: 'visual',  label: 'B' },
  { id: 'story',   label: 'C' },
]

const LANGS = [
  { id: 'it', flag: 'IT' },
  { id: 'en', flag: 'EN' },
  { id: 'fr', flag: 'FR' },
  { id: 'de', flag: 'DE' },
]

export default function MenuPage() {
  const { menuId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const { palette } = useApp()
  const navigate = useNavigate()
  const [langOpen, setLangOpen] = useState(false)

  const variant = searchParams.get('variant') || 'classic'
  const lang = searchParams.get('lang') || 'it'

  const setVariant = (v) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('variant', v)
      return next
    })
  }

  const setLang = (l) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('lang', l)
      return next
    })
    setLangOpen(false)
  }

  const pillBg = 'rgba(255,255,255,0.88)'

  return (
    <div style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Back button — top left */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          padding: '6px 12px',
          background: pillBg,
          backdropFilter: 'blur(8px)',
          border: `1px solid ${palette.border}`,
          borderRadius: 999,
          cursor: 'pointer',
          fontFamily: '"Geist Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.08em',
          color: palette.ink,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M8 2L4 6l4 4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        MENU
      </button>

      {/* Language picker + Variant toggle — top right */}
      <div style={{
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: 6,
      }}>
        {/* Language picker */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setLangOpen((o) => !o)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '4px 10px',
              background: pillBg,
              backdropFilter: 'blur(8px)',
              border: `1px solid ${palette.border}`,
              borderRadius: 999,
              cursor: 'pointer',
              fontFamily: '"Geist Mono", monospace',
              fontSize: 11,
              fontWeight: 600,
              color: palette.ink,
              height: 36,
            }}
          >
            {lang.toUpperCase()}
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M1 3l3 3 3-3" strokeLinecap="round" />
            </svg>
          </button>
          {langOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 6px)',
              right: 0,
              background: pillBg,
              backdropFilter: 'blur(8px)',
              border: `1px solid ${palette.border}`,
              borderRadius: 8,
              padding: 4,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              minWidth: 72,
            }}>
              {LANGS.map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLang(l.id)}
                  style={{
                    padding: '6px 10px',
                    background: lang === l.id ? palette.ink : 'transparent',
                    color: lang === l.id ? palette.bg : palette.ink,
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontFamily: '"Geist Mono", monospace',
                    fontSize: 11,
                    fontWeight: 600,
                    textAlign: 'center',
                  }}
                >{l.flag}</button>
              ))}
            </div>
          )}
        </div>

        {/* Variant A/B/C toggle */}
        <div style={{
          display: 'flex',
          gap: 4,
          background: pillBg,
          backdropFilter: 'blur(8px)',
          padding: '4px',
          borderRadius: 999,
          border: `1px solid ${palette.border}`,
        }}>
          {VARIANTS.map((v) => (
            <button
              key={v.id}
              onClick={() => setVariant(v.id)}
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                fontFamily: '"Geist Mono", monospace',
                fontSize: 11,
                fontWeight: 600,
                background: variant === v.id ? palette.ink : 'transparent',
                color: variant === v.id ? palette.bg : palette.muted,
                transition: 'all .15s',
              }}
            >{v.label}</button>
          ))}
        </div>
      </div>

      {variant === 'classic' && <CustomerClassic palette={palette} lang={lang} />}
      {variant === 'visual'  && <CustomerVisual  palette={palette} lang={lang} />}
      {variant === 'story'   && <CustomerStory   palette={palette} lang={lang} />}
    </div>
  )
}
