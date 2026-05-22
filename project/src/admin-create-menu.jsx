// Admin — Create Menu Wizard (modal overlaid on dashboard)
// Shows two steps side-by-side in a single artboard for design review.

function AdminCreateMenu({ palette }) {
  return (
    <div style={{
      height: '100%', background: palette.bg, color: palette.ink,
      fontFamily: '"Geist", system-ui, sans-serif',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Dimmed background of the dashboard */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.35,
        filter: 'blur(2px) grayscale(.4)', pointerEvents: 'none',
      }}>
        <AdminDashboard palette={palette}/>
      </div>
      <div style={{
        position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)',
      }}/>

      {/* The modal */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 'calc(100% - 80px)', maxWidth: 980, height: 'calc(100% - 80px)', maxHeight: 700,
        background: palette.bg, color: palette.ink,
        borderRadius: 8, overflow: 'hidden',
        boxShadow: '0 30px 80px rgba(0,0,0,0.4)',
        display: 'grid', gridTemplateColumns: '240px 1fr',
      }}>
        {/* Sidebar — steps */}
        <aside style={{
          background: palette.surface, borderRight: `1px solid ${palette.border}`,
          padding: '24px 22px',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 9.5, letterSpacing: '0.22em', color: palette.muted, textTransform: 'uppercase' }}>
            Nuovo menu
          </div>
          <div style={{
            fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 24,
            marginTop: 6, lineHeight: 1.05,
          }}>Crea il tuo menu</div>
          <div style={{ fontSize: 11, color: palette.muted, marginTop: 4, lineHeight: 1.5 }}>
            Tre passi, qualche minuto.
          </div>

          <ol style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { i: 1, label: 'Dettagli', desc: 'Nome, tipo, orari', state: 'done' },
              { i: 2, label: 'Sezioni & piatti', desc: 'Cosa servi', state: 'current' },
              { i: 3, label: 'Pubblica', desc: 'Anteprima e QR', state: 'todo' },
            ].map((s) => (
              <li key={s.i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{
                  width: 22, height: 22, flexShrink: 0,
                  background: s.state === 'todo' ? palette.bg : palette.ink,
                  border: `1px solid ${s.state === 'todo' ? palette.border : palette.ink}`,
                  color: s.state === 'todo' ? palette.muted : palette.bg,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: '"Geist Mono", monospace', fontSize: 10, fontWeight: 500,
                }}>
                  {s.state === 'done' ? (
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 4.5L3.5 7 8 1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  ) : s.i}
                </span>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: s.state === 'current' ? 500 : 400, color: s.state === 'todo' ? palette.muted : palette.ink, lineHeight: 1.2 }}>
                    {s.label}
                  </div>
                  <div style={{ fontSize: 10.5, color: palette.muted, marginTop: 2 }}>{s.desc}</div>
                </div>
              </li>
            ))}
          </ol>

          <div style={{ flex: 1 }}/>
          <button style={{
            padding: '8px 12px', fontSize: 12, cursor: 'pointer',
            background: 'transparent', color: palette.muted,
            border: 'none', textAlign: 'left', fontFamily: 'inherit',
          }}>
            ← Salva e chiudi
          </button>
        </aside>

        {/* Main step — Step 2: sections & dishes */}
        <main style={{ overflow: 'auto', padding: 0, display: 'flex', flexDirection: 'column' }}>
          <header style={{
            padding: '22px 28px 16px', borderBottom: `1px solid ${palette.border}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
          }}>
            <div>
              <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, letterSpacing: '0.22em', color: palette.muted, textTransform: 'uppercase' }}>
                Passo 2 di 3
              </div>
              <h1 style={{
                fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 26,
                margin: '6px 0 0', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.1,
              }}>Sezioni & primi piatti</h1>
              <div style={{ fontSize: 12, color: palette.muted, marginTop: 4 }}>
                Aggiungi le sezioni e i piatti che fanno da spina dorsale. Potrai modificarli dopo.
              </div>
            </div>
            <button style={{
              width: 28, height: 28, borderRadius: '50%', border: 'none',
              background: palette.surface, color: palette.muted, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: `1px solid ${palette.border}`,
            }}>×</button>
          </header>

          <div style={{ flex: 1, overflow: 'auto', padding: '20px 28px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {/* Template chooser */}
            <div>
              <div style={{ fontSize: 11, color: palette.muted, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
                Parti da un template
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {[
                  { id: 'classic',     label: 'Classico IT', desc: '4 sezioni',  active: true },
                  { id: 'tasting',     label: 'Degustazione', desc: '7 portate' },
                  { id: 'lunch',       label: 'Pranzo veloce', desc: '3 sezioni' },
                  { id: 'blank',       label: 'Vuoto', desc: 'Parti da zero' },
                ].map((t) => (
                  <button key={t.id} style={{
                    padding: '10px 12px', textAlign: 'left', cursor: 'pointer',
                    background: t.active ? palette.surface : palette.bg,
                    border: `1px solid ${t.active ? palette.accent : palette.border}`,
                    borderRadius: 4, fontFamily: 'inherit',
                  }}>
                    <div style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 14 }}>{t.label}</div>
                    <div style={{ fontSize: 10.5, color: palette.muted, marginTop: 2 }}>{t.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sections list with inline dish counts */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <div style={{ fontSize: 11, color: palette.muted, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Sezioni · 4
                </div>
                <button style={{
                  padding: '4px 10px', fontSize: 11, cursor: 'pointer',
                  background: 'transparent', color: palette.accent,
                  border: `1px dashed ${palette.accent}`, borderRadius: 3, fontFamily: 'inherit',
                }}>+ Aggiungi sezione</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { name: 'Antipasti', n: 3 },
                  { name: 'Primi piatti', n: 3 },
                  { name: 'Secondi', n: 3 },
                  { name: 'Dolci', n: 3 },
                ].map((s, i) => (
                  <div key={s.name} style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 12px',
                    background: palette.surface, border: `1px solid ${palette.border}`,
                    borderRadius: 3,
                  }}>
                    <span style={{ color: palette.muted, cursor: 'grab' }}>
                      <svg width="10" height="14" viewBox="0 0 10 14" fill="currentColor"><circle cx="2" cy="2" r="1.1"/><circle cx="8" cy="2" r="1.1"/><circle cx="2" cy="7" r="1.1"/><circle cx="8" cy="7" r="1.1"/><circle cx="2" cy="12" r="1.1"/><circle cx="8" cy="12" r="1.1"/></svg>
                    </span>
                    <div style={{
                      width: 26, height: 26, borderRadius: 3, background: palette.bg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: '"Geist Mono", monospace', fontSize: 11, color: palette.muted,
                    }}>0{i + 1}</div>
                    <div style={{ flex: 1, fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 16 }}>
                      {s.name}
                    </div>
                    <div style={{ fontSize: 11, color: palette.muted }}>{s.n} piatti</div>
                    <button style={{
                      padding: '4px 10px', fontSize: 11, cursor: 'pointer',
                      background: palette.bg, color: palette.ink,
                      border: `1px solid ${palette.border}`, borderRadius: 3, fontFamily: 'inherit',
                    }}>+ Piatto</button>
                  </div>
                ))}
              </div>
            </div>

            {/* AI quick-add */}
            <div style={{
              padding: '14px 16px',
              background: palette.surface, border: `1px solid ${palette.border}`,
              borderRadius: 4, display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%', background: palette.accent,
                color: palette.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 2v3M9 13v3M2 9h3M13 9h3M4 4l2 2M12 12l2 2M14 4l-2 2M6 12l-2 2"/><circle cx="9" cy="9" r="2"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 17 }}>
                  Importa il menu da una foto
                </div>
                <div style={{ fontSize: 11.5, color: palette.muted, marginTop: 2 }}>
                  Scatta una foto del menu attuale o carica un PDF: estraiamo piatti, prezzi e allergeni.
                </div>
              </div>
              <button style={primary(palette)}>Carica</button>
            </div>
          </div>

          <footer style={{
            padding: '14px 28px', borderTop: `1px solid ${palette.border}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            background: palette.surface,
          }}>
            <button style={ghost(palette)}>← Dettagli</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 11, color: palette.muted }}>Bozza salvata automaticamente</span>
              <button style={primary(palette)}>
                Pubblica
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 7h8M7 3l4 4-4 4" strokeLinecap="round"/></svg>
              </button>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

window.AdminCreateMenu = AdminCreateMenu;
