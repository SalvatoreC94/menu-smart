// Admin — Auth flows (Login + Register wizard)
// Two top-level components used in the design canvas.

function AdminLogin({ palette }) {
  const [step, setStep] = React.useState('email'); // email | password
  const [email, setEmail] = React.useState('marco@osteriadelborgo.it');
  const [pwd, setPwd] = React.useState('');
  const [showPwd, setShowPwd] = React.useState(false);

  return (
    <div style={{
      height: '100%', background: palette.bg, color: palette.ink,
      fontFamily: '"Geist", system-ui, sans-serif',
      display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden',
    }}>
      {/* Left — branding */}
      <aside style={{
        background: palette.ink, color: palette.bg, padding: '48px 56px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none',
          background: `radial-gradient(circle at 25% 80%, ${palette.accent} 0%, transparent 50%)`,
        }}/>
        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 26, fontWeight: 400 }}>
            MenuSmart
          </div>
          <div style={{ fontSize: 11, opacity: 0.55, letterSpacing: '0.06em', marginTop: 4 }}>
            Pannello ristoratore
          </div>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, letterSpacing: '0.22em', opacity: 0.6 }}>
            — In numeri —
          </div>
          <blockquote style={{
            fontFamily: '"Instrument Serif", serif', fontStyle: 'italic',
            fontSize: 32, lineHeight: 1.15, margin: '14px 0 18px', fontWeight: 400,
            letterSpacing: '-0.01em', textWrap: 'balance',
          }}>
            "Da quando usiamo MenuSmart abbiamo dimezzato il tempo di aggiornamento del menu."
          </blockquote>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: '50%', background: palette.accent }}/>
            <div>
              <div style={{ fontSize: 12 }}>Chiara Bellini</div>
              <div style={{ fontSize: 10, opacity: 0.6 }}>Trattoria Le Murge · Milano</div>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', display: 'flex', gap: 30, fontSize: 10.5, opacity: 0.7, letterSpacing: '0.04em' }}>
          <div>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 24, opacity: 1 }}>2.400+</div>
            <div style={{ marginTop: 2 }}>Ristoranti</div>
          </div>
          <div>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 24, opacity: 1 }}>48</div>
            <div style={{ marginTop: 2 }}>Paesi</div>
          </div>
          <div>
            <div style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 24, opacity: 1 }}>12 lingue</div>
            <div style={{ marginTop: 2 }}>Traduzioni automatiche</div>
          </div>
        </div>
      </aside>

      {/* Right — form */}
      <main style={{ padding: '64px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: 360, width: '100%', margin: '0 auto' }}>
          <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, letterSpacing: '0.22em', color: palette.muted, textTransform: 'uppercase' }}>
            Bentornato
          </div>
          <h1 style={{
            fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 38, fontWeight: 400,
            margin: '8px 0 6px', letterSpacing: '-0.01em', lineHeight: 1,
          }}>Accedi al tuo locale</h1>
          <div style={{ fontSize: 12, color: palette.muted }}>
            Non hai ancora un account?{' '}
            <a href="#" style={{ color: palette.accent, fontWeight: 500 }}>Registra il tuo ristorante →</a>
          </div>

          <form style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <FormField label="Email" palette={palette}>
              <input value={email} onChange={(e) => setEmail(e.target.value)}
                style={inp(palette)} placeholder="nome@ristorante.it"/>
            </FormField>

            <FormField label="Password" palette={palette}
              right={<a href="#" style={{ fontSize: 10.5, color: palette.accent }}>Dimenticata?</a>}>
              <div style={{ position: 'relative' }}>
                <input type={showPwd ? 'text' : 'password'} value={pwd} onChange={(e) => setPwd(e.target.value)}
                  style={{ ...inp(palette), paddingRight: 36 }} placeholder="••••••••"/>
                <button type="button" onClick={() => setShowPwd((s) => !s)}
                  style={{
                    position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                    background: 'transparent', border: 'none', cursor: 'pointer', padding: 4,
                    color: palette.muted,
                  }}>
                  {showPwd
                    ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 1l12 12M3 3.5C1.5 5 1 7 1 7s2 5 6 5c1.4 0 2.5-.4 3.5-.9M11 11C12.5 9.5 13 7 13 7s-2-5-6-5c-.7 0-1.3.1-1.9.3" strokeLinecap="round"/></svg>
                    : <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M1 7s2-5 6-5 6 5 6 5-2 5-6 5-6-5-6-5z M7 9.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" strokeLinejoin="round"/></svg>}
                </button>
              </div>
            </FormField>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: palette.muted, marginTop: 4, cursor: 'pointer' }}>
              <span style={{
                width: 14, height: 14, border: `1px solid ${palette.border}`, borderRadius: 2,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: palette.surface,
              }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke={palette.accent} strokeWidth="1.6"><path d="M1 4.5L3.5 7 8 1.5" strokeLinecap="round"/></svg>
              </span>
              Ricordami su questo dispositivo
            </label>

            <button type="button"
              style={{
                marginTop: 8, padding: '12px 16px',
                background: palette.ink, color: palette.bg, border: 'none', borderRadius: 4,
                fontFamily: 'inherit', fontSize: 13, fontWeight: 500, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}>
              Accedi
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round"/></svg>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '8px 0', color: palette.muted, fontSize: 11 }}>
              <span style={{ flex: 1, height: 1, background: palette.border }}/>
              oppure
              <span style={{ flex: 1, height: 1, background: palette.border }}/>
            </div>

            <button type="button" style={ssoBtn(palette)}>
              <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4c-.2 1.2-.9 2.2-2 2.9v2.4h3.2c1.9-1.7 3-4.3 3-7.1z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.4c-.9.6-2 1-3.4 1-2.6 0-4.8-1.7-5.6-4.1H3.1v2.5C4.7 19.9 8.1 22 12 22z"/><path fill="#FBBC05" d="M6.4 14.1c-.2-.6-.3-1.3-.3-2.1s.1-1.4.3-2.1V7.4H3.1C2.4 8.8 2 10.4 2 12s.4 3.2 1.1 4.6l3.3-2.5z"/><path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 3.1 14.7 2 12 2 8.1 2 4.7 4.1 3.1 7.4l3.3 2.5C7.2 7.7 9.4 6 12 6z"/></svg>
              Continua con Google
            </button>
            <button type="button" style={ssoBtn(palette)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill={palette.ink}><path d="M16.4 12.6c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.4.8-.7 0-1.8-.8-3-.8-1.5 0-2.9.9-3.7 2.3-1.6 2.7-.4 6.8 1.1 9 .7 1.1 1.6 2.3 2.8 2.2 1.1 0 1.5-.7 2.9-.7 1.3 0 1.7.7 2.9.7 1.2 0 2-1.1 2.7-2.2.8-1.3 1.1-2.5 1.2-2.5-.1-.1-2.2-.9-2.2-3.7zM14.2 5.9c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.6-1 2.6 1 .1 2-.5 2.7-1.2z"/></svg>
              Continua con Apple
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

function FormField({ label, palette, right, children }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        <span style={{ fontSize: 10.5, color: palette.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
        {right}
      </div>
      {children}
    </div>
  );
}

function inp(p) {
  return {
    width: '100%', padding: '10px 12px',
    background: p.surface, border: `1px solid ${p.border}`, borderRadius: 4,
    fontFamily: '"Geist", sans-serif', fontSize: 13, color: p.ink, outline: 'none',
    boxSizing: 'border-box',
  };
}

function ssoBtn(p) {
  return {
    padding: '10px 14px', background: p.surface, color: p.ink,
    border: `1px solid ${p.border}`, borderRadius: 4,
    fontFamily: 'inherit', fontSize: 12.5, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
  };
}

// ─────────────────────────────────────────────────────────────
// Registration wizard — 4 steps
// ─────────────────────────────────────────────────────────────
function AdminRegister({ palette }) {
  const [step, setStep] = React.useState(2); // showcase step 2 by default
  const totalSteps = 4;
  const stepNames = ['Account', 'Ristorante', 'Tipo di cucina', 'Pronti!'];

  return (
    <div style={{
      height: '100%', background: palette.bg, color: palette.ink,
      fontFamily: '"Geist", system-ui, sans-serif',
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Top progress bar */}
      <header style={{
        padding: '20px 36px', borderBottom: `1px solid ${palette.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 20 }}>
          MenuSmart
        </div>
        <div style={{ flex: 1, padding: '0 60px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6 }}>
            {Array.from({ length: totalSteps }).map((_, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <React.Fragment key={i}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: done || current ? palette.ink : palette.surface,
                      border: `1px solid ${done || current ? palette.ink : palette.border}`,
                      color: done || current ? palette.bg : palette.muted,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: '"Geist Mono", monospace', fontSize: 11, fontWeight: 500,
                    }}>
                      {done ? (
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 5.5L4 8.5 10 2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      ) : i + 1}
                    </div>
                    <div style={{
                      fontSize: 10.5, color: current ? palette.ink : palette.muted,
                      letterSpacing: '0.05em',
                    }}>{stepNames[i]}</div>
                  </div>
                  {i < totalSteps - 1 && (
                    <div style={{ flex: 1, height: 1, background: done ? palette.ink : palette.border, marginBottom: 22 }}/>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <button style={ghost(palette)}>Esci</button>
      </header>

      {/* Body — switch by step */}
      <div style={{ flex: 1, overflow: 'auto', padding: '40px 36px 24px' }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          {step === 0 && <RegStep0 palette={palette}/>}
          {step === 1 && <RegStep1 palette={palette}/>}
          {step === 2 && <RegStep2 palette={palette}/>}
          {step === 3 && <RegStep3 palette={palette}/>}
        </div>
      </div>

      {/* Footer with step controls */}
      <footer style={{
        padding: '16px 36px', borderTop: `1px solid ${palette.border}`,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: palette.surface,
      }}>
        <button onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          style={{ ...ghost(palette), opacity: step === 0 ? 0.4 : 1, cursor: step === 0 ? 'default' : 'pointer' }}>
          ← Indietro
        </button>
        <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10.5, color: palette.muted, letterSpacing: '0.1em' }}>
          PASSO {step + 1} / {totalSteps}
        </div>
        <button onClick={() => setStep(Math.min(totalSteps - 1, step + 1))}
          style={primary(palette)}>
          {step === totalSteps - 1 ? 'Vai al pannello' : 'Continua'}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round"/></svg>
        </button>
      </footer>
    </div>
  );
}

function RegStep0({ palette }) {
  return (
    <div>
      <StepHeader palette={palette} eyebrow="01 · Iniziamo" title="Crea il tuo account"
        sub="Userai questo indirizzo per accedere al pannello del ristorante."/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <FormField label="Nome" palette={palette}><input style={inp(palette)} defaultValue="Marco"/></FormField>
          <FormField label="Cognome" palette={palette}><input style={inp(palette)} defaultValue="Rossi"/></FormField>
        </div>
        <FormField label="Email di lavoro" palette={palette}>
          <input style={inp(palette)} defaultValue="marco@osteriadelborgo.it"/>
        </FormField>
        <FormField label="Password" palette={palette}>
          <input type="password" style={inp(palette)} defaultValue="••••••••••"/>
          <div style={{ display: 'flex', gap: 4, marginTop: 6 }}>
            {[1, 1, 1, 0].map((on, i) => (
              <span key={i} style={{ flex: 1, height: 3, background: on ? palette.accent : palette.border, borderRadius: 2 }}/>
            ))}
          </div>
          <div style={{ fontSize: 10.5, color: palette.muted, marginTop: 5 }}>
            Sicurezza: buona. Aggiungi un simbolo per renderla forte.
          </div>
        </FormField>
      </div>
    </div>
  );
}

function RegStep1({ palette }) {
  return (
    <div>
      <StepHeader palette={palette} eyebrow="02 · Locale" title="Il tuo ristorante"
        sub="Alcune informazioni sul locale per impostare il pannello."/>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 24 }}>
        <FormField label="Nome del ristorante" palette={palette}>
          <input style={inp(palette)} defaultValue="Osteria del Borgo"/>
        </FormField>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
          <FormField label="Indirizzo" palette={palette}>
            <input style={inp(palette)} defaultValue="Via dei Tessitori 14"/>
          </FormField>
          <FormField label="Città" palette={palette}>
            <input style={inp(palette)} defaultValue="Bologna"/>
          </FormField>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <FormField label="Telefono" palette={palette}>
            <input style={inp(palette)} defaultValue="+39 051 270 814"/>
          </FormField>
          <FormField label="Coperti per servizio" palette={palette}>
            <input style={inp(palette)} defaultValue="42"/>
          </FormField>
        </div>
      </div>
    </div>
  );
}

function RegStep2({ palette }) {
  const types = [
    { id: 'trattoria', label: 'Trattoria', desc: 'Cucina casalinga, tradizione', active: true },
    { id: 'pizzeria', label: 'Pizzeria', desc: 'Pizze e impasti' },
    { id: 'bistrot', label: 'Bistrot', desc: 'Cucina contemporanea' },
    { id: 'fine_dining', label: 'Fine dining', desc: 'Alta cucina, stellata' },
    { id: 'gastropub', label: 'Gastropub', desc: 'Birra e cucina di mercato' },
    { id: 'ethnic', label: 'Etnico', desc: 'Cucine del mondo' },
    { id: 'cafe', label: 'Caffetteria', desc: 'Colazioni, brunch' },
    { id: 'other', label: 'Altro', desc: 'Lo definiamo dopo' },
  ];
  return (
    <div>
      <StepHeader palette={palette} eyebrow="03 · Identità" title="Che tipo di locale?"
        sub="Useremo questa scelta per suggerirti template di menu adatti al tuo stile."/>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 24 }}>
        {types.map((t) => (
          <button key={t.id}
            style={{
              padding: '14px 16px', textAlign: 'left', cursor: 'pointer',
              background: t.active ? palette.surface : palette.bg,
              border: `1px solid ${t.active ? palette.accent : palette.border}`,
              borderRadius: 4, fontFamily: 'inherit',
              boxShadow: t.active ? `0 0 0 1px ${palette.accent}` : 'none',
              display: 'flex', flexDirection: 'column', gap: 4,
              color: palette.ink,
            }}>
            <span style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 17 }}>{t.label}</span>
            <span style={{ fontSize: 11, color: palette.muted }}>{t.desc}</span>
          </button>
        ))}
      </div>

      <div style={{
        marginTop: 18, padding: 14, background: palette.surface,
        border: `1px dashed ${palette.border}`, borderRadius: 4,
        display: 'flex', alignItems: 'flex-start', gap: 10,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%', background: palette.accent,
          color: palette.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', flexShrink: 0,
        }}>i</div>
        <div style={{ fontSize: 11.5, color: palette.muted, lineHeight: 1.5 }}>
          In base alla tua scelta ti proporremo template di menu (es. "Carta della trattoria", "Antipasti / Primi / Secondi / Dolci") che puoi modificare in qualsiasi momento.
        </div>
      </div>
    </div>
  );
}

function RegStep3({ palette }) {
  return (
    <div style={{ textAlign: 'center', paddingTop: 20 }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%', background: palette.accent,
        color: palette.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 18px',
      }}>
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 14l6 6L23 8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </div>
      <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, letterSpacing: '0.22em', color: palette.muted, textTransform: 'uppercase' }}>
        04 · Tutto pronto
      </div>
      <h2 style={{
        fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 38,
        margin: '8px 0 8px', fontWeight: 400, letterSpacing: '-0.01em',
      }}>Benvenuto su MenuSmart, Marco.</h2>
      <p style={{ fontSize: 13, color: palette.muted, maxWidth: 380, margin: '0 auto', lineHeight: 1.6 }}>
        Abbiamo creato il workspace per <strong style={{ color: palette.ink }}>Osteria del Borgo</strong>.
        Pronto a creare il tuo primo menu?
      </p>

      <div style={{ marginTop: 28, display: 'flex', gap: 8, justifyContent: 'center' }}>
        <div style={chip(palette)}>✓ Workspace creato</div>
        <div style={chip(palette)}>✓ 5 lingue attivate</div>
        <div style={chip(palette)}>✓ QR generato</div>
      </div>
    </div>
  );
}

function StepHeader({ palette, eyebrow, title, sub }) {
  return (
    <div>
      <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, letterSpacing: '0.22em', color: palette.muted, textTransform: 'uppercase' }}>{eyebrow}</div>
      <h2 style={{
        fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 30, fontWeight: 400,
        margin: '6px 0 4px', letterSpacing: '-0.01em', lineHeight: 1.05,
      }}>{title}</h2>
      <p style={{ fontSize: 12.5, color: palette.muted, margin: 0, lineHeight: 1.5 }}>{sub}</p>
    </div>
  );
}

function chip(p) {
  return {
    fontSize: 11, padding: '6px 10px',
    background: p.surface, border: `1px solid ${p.border}`, borderRadius: 999,
    color: p.muted, fontFamily: 'inherit',
  };
}

function ghost(p) {
  return {
    padding: '8px 14px', fontSize: 12, cursor: 'pointer',
    background: 'transparent', color: p.ink,
    border: `1px solid ${p.border}`, borderRadius: 4, fontFamily: 'inherit',
  };
}

function primary(p) {
  return {
    padding: '9px 16px', fontSize: 12.5, cursor: 'pointer',
    background: p.ink, color: p.bg,
    border: 'none', borderRadius: 4, fontFamily: 'inherit', fontWeight: 500,
    display: 'inline-flex', alignItems: 'center', gap: 8,
  };
}

window.AdminLogin = AdminLogin;
window.AdminRegister = AdminRegister;
