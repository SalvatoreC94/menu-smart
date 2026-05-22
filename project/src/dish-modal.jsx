// Dish detail modal — opened from admin editor rows, shows photo + name +
// price + description + ingredients + allergens + wine pairing.

function DishDetailModal({ palette, dish, onClose }) {
  const { allergens, tags } = window.MENU_DATA;
  if (!dish) return null;

  return (
    <div
      style={{
        position: 'absolute', inset: 0, zIndex: 50,
        background: 'rgba(15, 18, 28, 0.55)', backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 32, animation: 'dmFade .18s ease-out',
      }}
      onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%', maxWidth: 820, maxHeight: '100%',
          background: palette.bg, color: palette.ink,
          borderRadius: 6, overflow: 'hidden',
          boxShadow: '0 30px 80px rgba(0,0,0,0.45)',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          animation: 'dmPop .22s cubic-bezier(.2,.7,.3,1)',
        }}>
        {/* Left — photo + tags */}
        <div style={{
          background: `url("${dish.img}") center/cover`,
          position: 'relative', minHeight: 480,
        }}>
          {/* top chips */}
          <div style={{
            position: 'absolute', top: 16, left: 16, right: 16,
            display: 'flex', justifyContent: 'space-between',
          }}>
            <div style={{
              padding: '4px 10px', borderRadius: 999, fontSize: 10.5,
              background: 'rgba(255,255,255,0.92)', color: palette.ink,
              fontFamily: '"Geist Mono", monospace', letterSpacing: '0.1em',
            }}>{dish.id.toUpperCase()} · ANTEPRIMA</div>
            {dish.tags.includes('chef') && (
              <div style={{
                padding: '4px 10px', borderRadius: 999, fontSize: 10.5,
                background: palette.accent, color: palette.bg,
                fontFamily: '"Geist Mono", monospace', letterSpacing: '0.1em',
              }}>★ SCELTA CHEF</div>
            )}
          </div>
          {/* photo footer */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            padding: '36px 18px 16px',
            background: 'linear-gradient(to top, rgba(0,0,0,.55), transparent)',
            color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          }}>
            <div style={{ fontSize: 11, letterSpacing: '0.1em', fontFamily: '"Geist Mono", monospace' }}>
              FOTO · 1/3
            </div>
            <div style={{ display: 'flex', gap: 4 }}>
              {[1, 0, 0].map((on, i) => (
                <span key={i} style={{ width: 16, height: 2, background: on ? '#fff' : 'rgba(255,255,255,.4)' }}/>
              ))}
            </div>
          </div>
        </div>

        {/* Right — info */}
        <div style={{ padding: '20px 26px 22px', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div>
              <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 9.5, letterSpacing: '0.22em', color: palette.muted, textTransform: 'uppercase' }}>
                {dish.section}
              </div>
              <h2 style={{
                fontFamily: '"Instrument Serif", serif', fontStyle: 'italic',
                fontSize: 30, lineHeight: 1.0, margin: '4px 0 0', fontWeight: 400,
                letterSpacing: '-0.015em', textWrap: 'balance',
              }}>{dish.name}</h2>
            </div>
            <button onClick={onClose} style={{
              width: 28, height: 28, borderRadius: '50%', border: 'none',
              background: palette.surface, color: palette.muted, cursor: 'pointer',
              border: `1px solid ${palette.border}`, fontSize: 16, lineHeight: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>×</button>
          </div>

          {/* price */}
          <div style={{
            marginTop: 14, paddingBottom: 14, borderBottom: `1px solid ${palette.border}`,
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          }}>
            <div style={{
              fontFamily: '"Instrument Serif", serif', fontSize: 36,
              fontVariantNumeric: 'tabular-nums', color: palette.accent, lineHeight: 1,
            }}>
              {dish.price.toFixed(2).replace('.', ',')}
              <span style={{ fontSize: 18, marginLeft: 2 }}>€</span>
            </div>
            <div style={{ display: 'flex', gap: 5 }}>
              {dish.tags.map((k) => (
                <span key={k} style={{
                  fontSize: 9.5, padding: '3px 8px', letterSpacing: '0.1em',
                  textTransform: 'uppercase', color: palette.muted,
                  border: `1px solid ${palette.border}`, borderRadius: 2,
                }}>{tags[k].it}</span>
              ))}
            </div>
          </div>

          {/* description */}
          <div style={{ marginTop: 14 }}>
            <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 9.5, letterSpacing: '0.22em', color: palette.muted, textTransform: 'uppercase', marginBottom: 6 }}>
              Descrizione
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, textWrap: 'pretty' }}>
              {dish.desc}
            </p>
          </div>

          {/* ingredients */}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 9.5, letterSpacing: '0.22em', color: palette.muted, textTransform: 'uppercase', marginBottom: 8 }}>
              Ingredienti
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 14px',
            }}>
              {(dish.ingredients || []).map((ing, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  fontSize: 12, lineHeight: 1.5,
                }}>
                  <span style={{
                    width: 4, height: 4, borderRadius: '50%',
                    background: palette.accent, flexShrink: 0,
                  }}/>
                  {ing}
                </div>
              ))}
            </div>
          </div>

          {/* allergens + wine */}
          <div style={{ marginTop: 18, paddingTop: 14, borderTop: `1px solid ${palette.border}` }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 9.5, letterSpacing: '0.22em', color: palette.muted, textTransform: 'uppercase', marginBottom: 6 }}>
                  Allergeni
                </div>
                {dish.allergens.length === 0 ? (
                  <div style={{ fontSize: 12, color: palette.muted, fontStyle: 'italic' }}>Nessun allergene</div>
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {dish.allergens.map((a) => (
                      <span key={a} style={{
                        fontSize: 10.5, padding: '3px 7px', borderRadius: 2,
                        background: palette.surface, border: `1px solid ${palette.border}`,
                      }}>
                        {allergens[a].it}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 9.5, letterSpacing: '0.22em', color: palette.muted, textTransform: 'uppercase', marginBottom: 6 }}>
                  Abbinamento
                </div>
                <div style={{
                  fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 14.5,
                  lineHeight: 1.25,
                }}>{dish.wine}</div>
              </div>
            </div>
          </div>

          {/* footer actions */}
          <div style={{
            marginTop: 'auto', paddingTop: 18,
            display: 'flex', gap: 8,
          }}>
            <button style={{
              flex: 1, padding: '10px 14px', fontSize: 12.5, cursor: 'pointer',
              background: palette.ink, color: palette.bg, border: 'none', borderRadius: 3,
              fontFamily: 'inherit', fontWeight: 500,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 2h7v4l3 1v6H2z M5 2v3h3"/></svg>
              Modifica piatto
            </button>
            <button style={{
              padding: '10px 14px', fontSize: 12.5, cursor: 'pointer',
              background: palette.surface, color: palette.ink,
              border: `1px solid ${palette.border}`, borderRadius: 3, fontFamily: 'inherit',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="6" cy="6" r="4.5"/><path d="M2 6h8M6 2c1.4 1.2 2 2.7 2 4s-.6 2.8-2 4M6 2C4.6 3.2 4 4.7 4 6s.6 2.8 2 4"/></svg>
              Anteprima cliente
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dmFade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes dmPop  { from { opacity: 0; transform: scale(.96) } to { opacity: 1; transform: scale(1) } }
      `}</style>
    </div>
  );
}

window.DishDetailModal = DishDetailModal;
