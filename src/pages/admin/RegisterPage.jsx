import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../contexts/AppContext'
import { inp, ghost, primary } from '../../styles/utils'

function FormField({ label, palette, children }) {
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
      </div>
      {children}
    </div>
  )
}

function StepHeader({ palette, eyebrow, title, sub }) {
  return (
    <div>
      <div style={{
        fontFamily: '"Geist Mono", monospace',
        fontSize: 10,
        letterSpacing: '0.22em',
        color: palette.muted,
        textTransform: 'uppercase',
      }}>{eyebrow}</div>
      <h2 style={{
        fontFamily: '"Instrument Serif", serif',
        fontStyle: 'italic',
        fontSize: 30,
        fontWeight: 400,
        margin: '6px 0 4px',
        letterSpacing: '-0.01em',
        lineHeight: 1.05,
      }}>{title}</h2>
      <p style={{
        fontSize: 12.5,
        color: palette.muted,
        margin: 0,
        lineHeight: 1.5,
      }}>{sub}</p>
    </div>
  )
}

function RegStep0({ palette }) {
  return (
    <div>
      <StepHeader
        palette={palette}
        eyebrow="01 · Iniziamo"
        title="Crea il tuo account"
        sub="Userai questo indirizzo per accedere al pannello del ristorante."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <FormField label="Nome" palette={palette}>
            <input style={inp(palette)} defaultValue="Marco" />
          </FormField>
          <FormField label="Cognome" palette={palette}>
            <input style={inp(palette)} defaultValue="Rossi" />
          </FormField>
        </div>
        <FormField label="Email di lavoro" palette={palette}>
          <input style={inp(palette)} defaultValue="marco@osteriadelborgo.it" />
        </FormField>
        <FormField label="Password" palette={palette}>
          <input type="password" style={inp(palette)} defaultValue="••••••••••" />
          <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
            {[1, 1, 1, 0].map((on, i) => (
              <span key={i} style={{
                flex: 1,
                height: 3,
                background: on ? palette.accent : palette.border,
                borderRadius: 2,
              }} />
            ))}
          </div>
          <div style={{ fontSize: 10.5, color: palette.muted, marginTop: 5 }}>
            Sicurezza: buona. Aggiungi un simbolo per renderla forte.
          </div>
        </FormField>
      </div>
    </div>
  )
}

function RegStep1({ palette }) {
  return (
    <div>
      <StepHeader
        palette={palette}
        eyebrow="02 · Locale"
        title="Il tuo ristorante"
        sub="Alcune informazioni sul locale per impostare il pannello."
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24 }}>
        <FormField label="Nome del ristorante" palette={palette}>
          <input style={inp(palette)} defaultValue="Osteria del Borgo" />
        </FormField>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
          <FormField label="Indirizzo" palette={palette}>
            <input style={inp(palette)} defaultValue="Via dei Tessitori 14" />
          </FormField>
          <FormField label="Città" palette={palette}>
            <input style={inp(palette)} defaultValue="Bologna" />
          </FormField>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <FormField label="Telefono" palette={palette}>
            <input style={inp(palette)} defaultValue="+39 051 270 814" />
          </FormField>
          <FormField label="Coperti per servizio" palette={palette}>
            <input style={inp(palette)} defaultValue="42" />
          </FormField>
        </div>
      </div>
    </div>
  )
}

function RegStep2({ palette }) {
  const [activeType, setActiveType] = useState('trattoria')
  const types = [
    { id: 'trattoria',  label: 'Trattoria',   desc: 'Cucina casalinga, tradizione' },
    { id: 'pizzeria',   label: 'Pizzeria',     desc: 'Pizze e impasti' },
    { id: 'bistrot',    label: 'Bistrot',      desc: 'Cucina contemporanea' },
    { id: 'fine_dining',label: 'Fine dining',  desc: 'Alta cucina, stellata' },
    { id: 'gastropub',  label: 'Gastropub',    desc: 'Birra e cucina di mercato' },
    { id: 'ethnic',     label: 'Etnico',       desc: 'Cucine del mondo' },
    { id: 'cafe',       label: 'Caffetteria',  desc: 'Colazioni, brunch' },
    { id: 'other',      label: 'Altro',        desc: 'Lo definiamo dopo' },
  ]
  return (
    <div>
      <StepHeader
        palette={palette}
        eyebrow="03 · Identità"
        title="Che tipo di locale?"
        sub="Useremo questa scelta per suggerirti template di menu adatti al tuo stile."
      />
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8,
        marginTop: 24,
      }}>
        {types.map((t) => {
          const active = activeType === t.id
          return (
            <button
              key={t.id}
              onClick={() => setActiveType(t.id)}
              style={{
                padding: '14px 16px',
                textAlign: 'left',
                cursor: 'pointer',
                background: active ? palette.surface : palette.bg,
                border: `1px solid ${active ? palette.accent : palette.border}`,
                borderRadius: 4,
                fontFamily: 'inherit',
                boxShadow: active ? `0 0 0 1px ${palette.accent}` : 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                color: palette.ink,
              }}
            >
              <span style={{
                fontFamily: '"Instrument Serif", serif',
                fontStyle: 'italic',
                fontSize: 17,
              }}>{t.label}</span>
              <span style={{ fontSize: 11, color: palette.muted }}>{t.desc}</span>
            </button>
          )
        })}
      </div>

      <div style={{
        marginTop: 18,
        padding: 14,
        background: palette.surface,
        border: `1px dashed ${palette.border}`,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10,
      }}>
        <div style={{
          width: 28,
          height: 28,
          borderRadius: '50%',
          background: palette.accent,
          color: palette.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: '"Instrument Serif", serif',
          fontStyle: 'italic',
          flexShrink: 0,
        }}>i</div>
        <div style={{ fontSize: 11.5, color: palette.muted, lineHeight: 1.5 }}>
          In base alla tua scelta ti proporremo template di menu (es. "Carta della trattoria", "Antipasti / Primi / Secondi / Dolci") che puoi modificare in qualsiasi momento.
        </div>
      </div>
    </div>
  )
}

function RegStep3({ palette }) {
  return (
    <div style={{ textAlign: 'center', paddingTop: 20 }}>
      <div style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        background: palette.accent,
        color: palette.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 18px',
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M5 14l6 6L23 8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div style={{
        fontFamily: '"Geist Mono", monospace',
        fontSize: 10,
        letterSpacing: '0.22em',
        color: palette.muted,
        textTransform: 'uppercase',
      }}>04 · Tutto pronto</div>
      <h2 style={{
        fontFamily: '"Instrument Serif", serif',
        fontStyle: 'italic',
        fontSize: 38,
        margin: '8px 0 8px',
        fontWeight: 400,
        letterSpacing: '-0.01em',
      }}>Benvenuto su MenuSmart, Marco.</h2>
      <p style={{
        fontSize: 13,
        color: palette.muted,
        maxWidth: 380,
        margin: '0 auto',
        lineHeight: 1.6,
      }}>
        Abbiamo creato il workspace per{' '}
        <strong style={{ color: palette.ink }}>Osteria del Borgo</strong>.
        Pronto a creare il tuo primo menu?
      </p>

      <div style={{
        marginTop: 28,
        display: 'flex',
        gap: 8,
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}>
        {['✓ Workspace creato', '✓ 5 lingue attivate', '✓ QR generato'].map((c) => (
          <div key={c} style={{
            fontSize: 11,
            padding: '6px 10px',
            background: palette.surface,
            border: `1px solid ${palette.border}`,
            borderRadius: 999,
            color: palette.muted,
          }}>{c}</div>
        ))}
      </div>
    </div>
  )
}

const stepNames = ['Account', 'Ristorante', 'Tipo di cucina', 'Pronti!']
const totalSteps = 4

export default function RegisterPage() {
  const { palette } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)

  const handleContinue = () => {
    if (step === totalSteps - 1) {
      navigate('/admin/dashboard')
    } else {
      setStep((s) => Math.min(totalSteps - 1, s + 1))
    }
  }

  return (
    <div style={{
      height: '100vh',
      background: palette.bg,
      color: palette.ink,
      fontFamily: '"Geist", system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Top progress bar */}
      <header style={{
        padding: '20px 36px',
        borderBottom: `1px solid ${palette.border}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{
          fontFamily: '"Instrument Serif", serif',
          fontStyle: 'italic',
          fontSize: 20,
        }}>MenuSmart</div>
        <div style={{ flex: 1, padding: '0 60px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 6,
          }}>
            {Array.from({ length: totalSteps }).map((_, i) => {
              const done = i < step
              const current = i === step
              return (
                <React.Fragment key={i}>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                    <div style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: done || current ? palette.ink : palette.surface,
                      border: `1px solid ${done || current ? palette.ink : palette.border}`,
                      color: done || current ? palette.bg : palette.muted,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: '"Geist Mono", monospace',
                      fontSize: 11,
                      fontWeight: 500,
                    }}>
                      {done
                        ? <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 5.5L4 8.5 10 2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        : i + 1
                      }
                    </div>
                    <div style={{
                      fontSize: 10.5,
                      color: current ? palette.ink : palette.muted,
                      letterSpacing: '0.05em',
                    }}>{stepNames[i]}</div>
                  </div>
                  {i < totalSteps - 1 && (
                    <div style={{
                      flex: 1,
                      height: 1,
                      background: done ? palette.ink : palette.border,
                      marginBottom: 22,
                    }} />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
        <button style={ghost(palette)}>Esci</button>
      </header>

      {/* Body */}
      <div style={{ flex: 1, overflow: 'auto', padding: '40px 36px 24px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          {step === 0 && <RegStep0 palette={palette} />}
          {step === 1 && <RegStep1 palette={palette} />}
          {step === 2 && <RegStep2 palette={palette} />}
          {step === 3 && <RegStep3 palette={palette} />}
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        padding: '16px 36px',
        borderTop: `1px solid ${palette.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: palette.surface,
      }}>
        <button
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          style={{
            ...ghost(palette),
            opacity: step === 0 ? 0.4 : 1,
            cursor: step === 0 ? 'default' : 'pointer',
          }}
        >
          ← Indietro
        </button>
        <div style={{
          fontFamily: '"Geist Mono", monospace',
          fontSize: 10.5,
          color: palette.muted,
          letterSpacing: '0.1em',
        }}>
          PASSO {step + 1} / {totalSteps}
        </div>
        <button onClick={handleContinue} style={primary(palette)}>
          {step === totalSteps - 1 ? 'Vai al pannello' : 'Continua'}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round" />
          </svg>
        </button>
      </footer>
    </div>
  )
}
