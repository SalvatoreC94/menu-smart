import React, { createContext, useContext, useState } from 'react';

const PALETTES = {
  cream: {
    name: 'Crema editoriale',
    bg: '#faf7f2', surface: '#ffffff', ink: '#1a1612', muted: '#7a6e5f',
    border: '#e8e0d3', accent: '#3d4a2e',
  },
  cinnabar: {
    name: 'Cinabro caldo',
    bg: '#f6efe6', surface: '#fbf6ed', ink: '#2a1a12', muted: '#7a5a4a',
    border: '#e6d8c5', accent: '#a8472b',
  },
  notte: {
    name: 'Notte',
    bg: '#171411', surface: '#221d18', ink: '#f5ede0', muted: '#a89884',
    border: '#3a3128', accent: '#d4a755',
  },
  sale: {
    name: 'Sale & cobalto',
    bg: '#f4f2ec', surface: '#ffffff', ink: '#0d1220', muted: '#6e7080',
    border: '#dcdbd2', accent: '#1f3a8a',
  },
};

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [paletteName, setPaletteNameState] = useState(() => {
    return localStorage.getItem('ms_palette') || 'sale';
  });
  const [lang, setLangState] = useState(() => {
    return localStorage.getItem('ms_lang') || 'it';
  });

  const setPaletteName = (name) => {
    setPaletteNameState(name);
    localStorage.setItem('ms_palette', name);
  };

  const setLang = (l) => {
    setLangState(l);
    localStorage.setItem('ms_lang', l);
  };

  const palette = PALETTES[paletteName] || PALETTES.sale;

  return (
    <AppContext.Provider value={{ palette, paletteName, setPaletteName, lang, setLang, PALETTES }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export { PALETTES };
