export function btnGhost(p) {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 7,
    padding: '7px 14px', fontSize: 12,
    background: p.surface, color: p.ink,
    border: `1px solid ${p.border}`, borderRadius: 4,
    cursor: 'pointer', fontFamily: '"Geist", sans-serif',
  };
}

export function btnPrimary(p) {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 7,
    padding: '7px 14px', fontSize: 12,
    background: p.ink, color: p.bg,
    border: `1px solid ${p.ink}`, borderRadius: 4,
    cursor: 'pointer', fontFamily: '"Geist", sans-serif', fontWeight: 500,
  };
}

export function inp(p) {
  return {
    width: '100%', padding: '10px 12px',
    background: p.surface, border: `1px solid ${p.border}`, borderRadius: 4,
    fontFamily: '"Geist", sans-serif', fontSize: 13, color: p.ink, outline: 'none',
    boxSizing: 'border-box',
  };
}

export function ssoBtn(p) {
  return {
    padding: '10px 14px', background: p.surface, color: p.ink,
    border: `1px solid ${p.border}`, borderRadius: 4,
    fontFamily: 'inherit', fontSize: 12.5, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
  };
}

export function ghost(p) {
  return {
    padding: '8px 14px', fontSize: 12, cursor: 'pointer',
    background: 'transparent', color: p.ink,
    border: `1px solid ${p.border}`, borderRadius: 4, fontFamily: 'inherit',
  };
}

export function primary(p) {
  return {
    padding: '9px 16px', fontSize: 12.5, cursor: 'pointer',
    background: p.ink, color: p.bg,
    border: 'none', borderRadius: 4, fontFamily: 'inherit', fontWeight: 500,
    display: 'inline-flex', alignItems: 'center', gap: 8,
  };
}
