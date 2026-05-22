import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import { inp, ssoBtn } from '../../styles/utils'

function FormField({ label, palette, right, children }) {
  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
      }}>
        <span style={{
          fontSize: 10.5,
          color: palette.muted,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}>{label}</span>
        {right}
      </div>
      {children}
    </div>
  )
}

export default function LoginPage() {
  const { palette } = useApp()
  const navigate = useNavigate()
  const [email, setEmail] = useState('marco@osteriadelborgo.it')
  const [pwd, setPwd] = useState('')
  const [showPwd, setShowPwd] = useState(false)

  return (
    <div style={{
      height: '100vh',
      background: palette.bg,
      color: palette.ink,
      fontFamily: '"Geist", system-ui, sans-serif',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      overflow: 'hidden',
    }}>
      {/* Left — branding */}
      <aside style={{
        background: palette.ink,
        color: palette.bg,
        padding: '48px 56px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          pointerEvents: 'none',
          background: `radial-gradient(circle at 25% 80%, ${palette.accent} 0%, transparent 50%)`,
        }} />
        <div style={{ position: 'relative' }}>
          <div style={{
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontSize: 26,
            fontWeight: 400,
          }}>MenuSmart</div>
          <div style={{
            fontSize: 11,
            opacity: 0.55,
            letterSpacing: '0.06em',
            marginTop: 4,
          }}>Pannello ristoratore</div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{
            fontFamily: '"Geist Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.22em',
            opacity: 0.6,
          }}>— In numeri —</div>
          <blockquote style={{
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontSize: 32,
            lineHeight: 1.15,
            margin: '14px 0 18px',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}>
            "Da quando usiamo MenuSmart abbiamo dimezzato il tempo di aggiornamento del menu."
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: palette.accent,
            }} />
            <div>
              <div style={{ fontSize: 12 }}>Chiara Bellini</div>
              <div style={{ fontSize: 10, opacity: 0.6 }}>Trattoria Le Murge · Milano</div>
            </div>
          </div>
        </div>

        <div style={{
          position: 'relative',
          display: 'flex',
          gap: 30,
          fontSize: 10.5,
          opacity: 0.7,
          letterSpacing: '0.04em',
        }}>
          <div>
            <div style={{
              fontFamily: '"Instrument Serif", serif',
              fontStyle: 'italic',
              fontSize: 24,
              opacity: 1,
            }}>2.400+</div>
            <div style={{ marginTop: 2 }}>Ristoranti</div>
          </div>
          <div>
            <div style={{
              fontFamily: '"Instrument Serif", serif',
              fontStyle: 'italic',
              fontSize: 24,
              opacity: 1,
            }}>48</div>
            <div style={{ marginTop: 2 }}>Paesi</div>
          </div>
          <div>
            <div style={{
              fontFamily: '"Instrument Serif", serif',
              fontStyle: 'italic',
              fontSize: 24,
              opacity: 1,
            }}>12 lingue</div>
            <div style={{ marginTop: 2 }}>Traduzioni automatiche</div>
          </div>
        </div>
      </aside>

      {/* Right — form */}
      <main style={{
        padding: '64px 64px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>
        <div style={{ maxWidth: 360, width: '100%', margin: '0 auto' }}>
          <div style={{
            fontFamily: '"Geist Mono", monospace',
            fontSize: 10,
            letterSpacing: '0.22em',
            color: palette.muted,
            textTransform: 'uppercase',
          }}>Bentornato</div>
          <h1 style={{
            fontFamily: '"Instrument Serif", serif',
            fontStyle: 'italic',
            fontSize: 38,
            fontWeight: 400,
            margin: '8px 0 6px',
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}>Accedi al tuo locale</h1>
          <div style={{ fontSize: 12, color: palette.muted }}>
            Non hai ancora un account?{' '}
            <Link to="/admin/registrati" style={{
              color: palette.accent,
              fontWeight: 500,
              textDecoration: 'none',
            }}>Registra il tuo ristorante →</Link>
          </div>

          <form
            style={{
              marginTop: 32,
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
            }}
            onSubmit={(e) => e.preventDefault()}
          >
            <FormField label="Email" palette={palette}>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inp(palette)}
                placeholder="nome@ristorante.it"
              />
            </FormField>

            <FormField
              label="Password"
              palette={palette}
              right={
                <a href="#" style={{ fontSize: 10.5, color: palette.accent }}>
                  Dimenticata?
                </a>
              }
            >
              <div style={{ position: 'relative' }}>
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  style={{ ...inp(palette), paddingRight: 36 }}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  style={{
                    position: 'absolute',
                    right: 8,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 4,
                    color: palette.muted,
                  }}
                >
                  {showPwd
                    ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 1l12 12M3 3.5C1.5 5 1 7 1 7s2 5 6 5c1.4 0 2.5-.4 3.5-.9M11 11C12.5 9.5 13 7 13 7s-2-5-6-5c-.7 0-1.3.1-1.9.3" strokeLinecap="round" /></svg>
                    : <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 7s2-5 6-5 6 5 6 5-2 5-6 5-6-5-6-5z M7 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" strokeLinejoin="round" /></svg>
                  }
                </button>
              </div>
            </FormField>

            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 12,
              color: palette.muted,
              marginTop: 4,
              cursor: 'pointer',
            }}>
              <span style={{
                width: 14,
                height: 14,
                border: `1px solid ${palette.border}`,
                borderRadius: 2,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: palette.surface,
              }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke={palette.accent} strokeWidth="1.6">
                  <path d="M1 4.5L3.5 7 8 1.5" strokeLinecap="round" />
                </svg>
              </span>
              Ricordami su questo dispositivo
            </label>

            <button
              type="button"
              onClick={() => navigate('/admin/dashboard')}
              style={{
                marginTop: 8,
                padding: '12px 16px',
                background: palette.ink,
                color: palette.bg,
                border: 'none',
                borderRadius: 4,
                fontFamily: 'inherit',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
              }}
            >
              Accedi
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" />
              </svg>
            </button>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              margin: '8px 0',
              color: palette.muted,
              fontSize: 11,
            }}>
              <span style={{ flex: 1, height: 1, background: palette.border }} />
              oppure
              <span style={{ flex: 1, height: 1, background: palette.border }} />
            </div>

            <button type="button" style={ssoBtn(palette)}>
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.9-1.7 3-4.3 3-7.1z" />
                <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.4c-.9.6-2 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1H3.1v2.5C4.7 19.9 8.1 22 12 22z" />
                <path fill="#FBBC05" d="M6.4 14.1c-.2-.6-.3-1.3-.3-2.1s.1-1.4.3-2.1V7.4H3.1C2.4 8.8 2 10.4 2 12s.4 3.2 1.1 4.6l3.3-2.5z" />
                <path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 3.1 14.7 2 12 2 8.1 2 4.7 4.1 3.1 7.4l3.3 2.5C7.2 7.7 9.4 6 12 6z" />
              </svg>
              Continua con Google
            </button>
            <button type="button" style={ssoBtn(palette)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={palette.ink}>
                <path d="M16.4 12.6c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.8 2.2 1.1 0 1.5-.7 2.9-.7 1.3 0 1.7.7 2.9.7 1.2 0 2-1.1 2.7-2.2.8-1.3 1.1-2.5 1.2-2.5-.1-.1-2.2-.9-2.2-3.7zM14.2 5.9c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.6-1 2.6 1 .1 2-.5 2.7-1.2z" />
              </svg>
              Continua con Apple
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
