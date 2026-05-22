// Customer — Variant A: Editorial classic
// A traditional sit-down menu, typographic, no photos, dotted leader lines.
// Mobile-first 390x844, in iOS frame.

function CustomerClassic({ palette, lang = 'it' }) {
  const t = window.MENU_DATA.i18n[lang];
  const { restaurant, sections, dishes, allergens, tags } = window.MENU_DATA;
  const [openId, setOpenId] = React.useState(null);
  const [activeSection, setActiveSection] = React.useState('antipasti');
  const sectionRefs = React.useRef({});

  // Sticky nav: highlight section as the user scrolls.
  const onScroll = (e) => {
    const top = e.currentTarget.scrollTop;
    let cur = sections[0].id;
    for (const s of sections) {
      const el = sectionRefs.current[s.id];
      if (el && el.offsetTop - 140 <= top) cur = s.id;
    }
    setActiveSection(cur);
  };

  const scrollTo = (sid) => {
    const wrap = sectionRefs.current.__scroll;
    const el = sectionRefs.current[sid];
    if (wrap && el) wrap.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
  };

  return (
    <div style={{
      height: '100%', background: palette.bg, color: palette.ink,
      fontFamily: '"Geist", system-ui, sans-serif',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Header — masthead */}
      <header style={{ padding: '70px 24px 14px', textAlign: 'center', flexShrink: 0 }}>
        <div style={{ fontFamily: '"Geist Mono", ui-monospace, monospace', fontSize: 10, letterSpacing: '0.22em', color: palette.muted, textTransform: 'uppercase' }}>
          № 04 · 2026
        </div>
        <div style={{ fontFamily: '"Instrument Serif", "Cormorant Garamond", serif', fontSize: 30, lineHeight: 1, marginTop: 10, fontWeight: 400, fontStyle: 'italic', letterSpacing: '-0.01em' }}>
          {restaurant.name}
        </div>
        <div style={{ fontSize: 11, color: palette.muted, marginTop: 8, letterSpacing: '0.04em' }}>
          {restaurant.tagline}
        </div>
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'center', gap: 6 }}>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: palette.accent }}/>
          <span style={{ width: 18, height: 1, background: palette.accent, alignSelf: 'center' }}/>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: palette.accent }}/>
        </div>
      </header>

      {/* Sticky section tabs */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 5,
        display: 'flex', gap: 0, padding: '10px 16px 12px',
        background: palette.bg, borderBottom: `1px solid ${palette.border}`,
        overflowX: 'auto', flexShrink: 0,
      }}>
        {sections.map((s) => (
          <button key={s.id} onClick={() => scrollTo(s.id)}
            style={{
              border: 'none', background: 'transparent', cursor: 'pointer',
              padding: '6px 14px', flexShrink: 0,
              fontFamily: '"Instrument Serif", serif', fontSize: 17,
              color: activeSection === s.id ? palette.ink : palette.muted,
              fontStyle: activeSection === s.id ? 'italic' : 'normal',
              borderBottom: activeSection === s.id ? `1px solid ${palette.ink}` : '1px solid transparent',
              transition: 'color .2s',
            }}>{s[lang]}</button>
        ))}
      </nav>

      {/* Scroll body */}
      <div ref={(el) => (sectionRefs.current.__scroll = el)} onScroll={onScroll}
        style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 80px' }}>
        {sections.map((sec) => (
          <section key={sec.id} ref={(el) => (sectionRefs.current[sec.id] = el)} style={{ marginBottom: 36 }}>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, letterSpacing: '0.22em', color: palette.muted, textTransform: 'uppercase' }}>
                {sec.id.padStart(2, '0').slice(-2)} · {sec.note}
              </div>
              <h2 style={{
                fontFamily: '"Instrument Serif", serif', fontSize: 32, fontStyle: 'italic',
                lineHeight: 1, margin: '6px 0 0', fontWeight: 400, letterSpacing: '-0.01em',
              }}>{sec[lang]}</h2>
            </div>
            {dishes.filter((d) => d.section === sec.id).map((d) => (
              <DishRow key={d.id} dish={d} palette={palette} t={t} lang={lang}
                tags={tags} allergens={allergens}
                open={openId === d.id} onToggle={() => setOpenId(openId === d.id ? null : d.id)} />
            ))}
          </section>
        ))}

        <footer style={{ borderTop: `1px solid ${palette.border}`, paddingTop: 18, marginTop: 24, textAlign: 'center' }}>
          <div style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 14, color: palette.muted, lineHeight: 1.5 }}>
            «Cucinare è far accadere qualcosa di buono.»
          </div>
          <div style={{ fontSize: 10, color: palette.muted, marginTop: 14, letterSpacing: '0.05em' }}>
            {restaurant.address} · {restaurant.phone}
          </div>
        </footer>
      </div>
    </div>
  );
}

function DishRow({ dish, palette, t, lang, tags, allergens, open, onToggle }) {
  const tagBadge = (key) => (
    <span key={key} style={{
      fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase',
      padding: '2px 6px', border: `1px solid ${palette.border}`,
      borderRadius: 2, color: palette.muted,
      background: key === 'chef' ? palette.accent : 'transparent',
      borderColor: key === 'chef' ? palette.accent : palette.border,
      color: key === 'chef' ? palette.bg : palette.muted,
    }}>{tags[key][lang]}</span>
  );

  return (
    <div onClick={onToggle} style={{ padding: '14px 0', borderBottom: `1px solid ${palette.border}`, cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{
          fontFamily: '"Instrument Serif", serif', fontSize: 19, fontWeight: 400,
          color: palette.ink, lineHeight: 1.2, whiteSpace: 'nowrap',
        }}>{dish.name}</span>
        <span style={{ flex: 1, borderBottom: `1px dotted ${palette.border}`, marginBottom: 4 }}/>
        <span style={{
          fontFamily: '"Geist Mono", monospace', fontSize: 13, fontVariantNumeric: 'tabular-nums',
          color: palette.ink, fontWeight: 500,
        }}>{dish.price.toFixed(2)}<span style={{ fontSize: 10, color: palette.muted, marginLeft: 2 }}>€</span></span>
      </div>
      <div style={{
        fontSize: 11.5, color: palette.muted, lineHeight: 1.55, marginTop: 6,
        maxWidth: '92%', textWrap: 'pretty',
      }}>{dish.desc}</div>

      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 8, alignItems: 'center' }}>
        {dish.tags.map(tagBadge)}
        {dish.allergens.length > 0 && (
          <span style={{ fontSize: 9.5, color: palette.muted, letterSpacing: '0.08em', marginLeft: 4 }}>
            · {dish.allergens.map((a) => allergens[a].label).join(' · ')}
          </span>
        )}
      </div>

      {open && (
        <div style={{
          marginTop: 12, padding: 12,
          background: palette.surface, border: `1px solid ${palette.border}`,
        }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: palette.muted, marginBottom: 4 }}>
                {t.wine}
              </div>
              <div style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontSize: 14, lineHeight: 1.3 }}>
                {dish.wine}
              </div>
            </div>
          </div>
          {dish.allergens.length > 0 && (
            <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${palette.border}` }}>
              <div style={{ fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: palette.muted, marginBottom: 6 }}>
                {t.allergens}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {dish.allergens.map((a) => (
                  <span key={a} style={{ fontSize: 10.5, padding: '3px 7px', background: palette.bg, border: `1px solid ${palette.border}` }}>
                    {allergens[a][lang]}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

window.CustomerClassic = CustomerClassic;
