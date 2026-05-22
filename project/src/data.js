// MenuSmart sample data — shared by all artboards.

window.MENU_DATA = (function () {
  const allergens = {
    glutine: { it: 'Glutine', en: 'Gluten', fr: 'Gluten', de: 'Gluten', label: 'GL' },
    lattosio: { it: 'Lattosio', en: 'Dairy', fr: 'Lactose', de: 'Laktose', label: 'LA' },
    uova: { it: 'Uova', en: 'Eggs', fr: 'Œufs', de: 'Eier', label: 'UO' },
    pesce: { it: 'Pesce', en: 'Fish', fr: 'Poisson', de: 'Fisch', label: 'PE' },
    crostacei: { it: 'Crostacei', en: 'Shellfish', fr: 'Crustacés', de: 'Krustentiere', label: 'CR' },
    frutta_secca: { it: 'Frutta a guscio', en: 'Tree nuts', fr: 'Fruits à coque', de: 'Nüsse', label: 'FS' },
    sedano: { it: 'Sedano', en: 'Celery', fr: 'Céleri', de: 'Sellerie', label: 'SE' },
    soia: { it: 'Soia', en: 'Soy', fr: 'Soja', de: 'Soja', label: 'SO' },
  };

  const tags = {
    veg:   { it: 'Vegetariano', en: 'Vegetarian', fr: 'Végétarien', de: 'Vegetarisch' },
    vegan: { it: 'Vegano',      en: 'Vegan',      fr: 'Végane',     de: 'Vegan' },
    spicy: { it: 'Piccante',    en: 'Spicy',      fr: 'Épicé',      de: 'Scharf' },
    gf:    { it: 'Senza glutine', en: 'Gluten free', fr: 'Sans gluten', de: 'Glutenfrei' },
    raw:   { it: 'Crudo',       en: 'Raw',        fr: 'Cru',        de: 'Roh' },
    chef:  { it: 'Scelta dello chef', en: "Chef's pick", fr: 'Choix du chef', de: 'Empfehlung' },
  };

  // Slightly painterly placeholder images via Unsplash-style hash (we render
  // SVG placeholders below — no network).
  const ph = (seed, label, hue = 30) =>
    `data:image/svg+xml;utf8,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>
        <defs>
          <linearGradient id='g${seed}' x1='0' y1='0' x2='1' y2='1'>
            <stop offset='0' stop-color='hsl(${hue},25%,82%)'/>
            <stop offset='1' stop-color='hsl(${hue + 20},35%,62%)'/>
          </linearGradient>
          <pattern id='p${seed}' width='8' height='8' patternUnits='userSpaceOnUse' patternTransform='rotate(35)'>
            <line x1='0' y1='0' x2='0' y2='8' stroke='hsla(${hue},30%,40%,.08)' stroke-width='1.2'/>
          </pattern>
        </defs>
        <rect width='400' height='300' fill='url(#g${seed})'/>
        <rect width='400' height='300' fill='url(#p${seed})'/>
        <text x='200' y='160' text-anchor='middle' font-family='ui-monospace, monospace' font-size='13' fill='hsla(${hue + 20},40%,25%,.55)'>${label}</text>
      </svg>`
    )}`;

  const dishes = [
    // Antipasti
    { id: 'd1',  section: 'antipasti', name: 'Vitello tonnato', name_en: 'Veal in tuna sauce',
      desc: 'Carne di vitello al rosa, salsa tonnata con capperi di Pantelleria, polvere di olive nere.',
      price: 16, tags: ['chef'], allergens: ['pesce', 'uova'], wine: 'Vermentino di Gallura DOCG',
      img: ph(1, 'PIATTO 01 · vitello', 30) },
    { id: 'd2',  section: 'antipasti', name: 'Burrata e fichi',
      desc: 'Burrata pugliese, fichi neri di Bursano, prosciutto crudo 24 mesi, miele al rosmarino.',
      price: 14, tags: ['veg'], allergens: ['lattosio'], wine: 'Franciacorta Brut',
      img: ph(2, 'PIATTO 02 · burrata', 50) },
    { id: 'd3',  section: 'antipasti', name: 'Tartare di manzo',
      desc: 'Battuta al coltello, tuorlo croccante, senape antica, scaglie di parmigiano stagionato.',
      price: 18, tags: ['raw'], allergens: ['uova', 'lattosio'], wine: 'Barbera d\u2019Asti',
      img: ph(3, 'PIATTO 03 · tartare', 10) },

    // Primi
    { id: 'd4',  section: 'primi', name: 'Tagliolini al tartufo',
      desc: 'Tagliolini all\u2019uovo tirati a mano, burro di malga, tartufo nero della Val di Susa.',
      price: 22, tags: ['veg', 'chef'], allergens: ['glutine', 'uova', 'lattosio'],
      wine: 'Barolo DOCG', img: ph(4, 'PIATTO 04 · tagliolini', 35) },
    { id: 'd5',  section: 'primi', name: 'Risotto al limone',
      desc: 'Carnaroli mantecato con limone di Amalfi, gambero rosso crudo, polvere di basilico.',
      price: 24, tags: ['gf'], allergens: ['crostacei', 'lattosio'],
      wine: 'Greco di Tufo', img: ph(5, 'PIATTO 05 · risotto', 60) },
    { id: 'd6',  section: 'primi', name: 'Spaghetti alle vongole',
      desc: 'Spaghettoni di Gragnano, vongole veraci, prezzemolo, peperoncino di Senise.',
      price: 19, tags: ['spicy'], allergens: ['glutine'],
      wine: 'Falanghina del Sannio', img: ph(6, 'PIATTO 06 · spaghetti', 45) },

    // Secondi
    { id: 'd7',  section: 'secondi', name: 'Branzino in crosta di sale',
      desc: 'Branzino selvaggio cotto in crosta, finocchio confit, salsa al limone bruciato.',
      price: 32, tags: ['gf'], allergens: ['pesce'],
      wine: 'Etna Bianco DOC', img: ph(7, 'PIATTO 07 · branzino', 200) },
    { id: 'd8',  section: 'secondi', name: 'Costata di fassona',
      desc: 'Fassona piemontese 800g per due, alla griglia, sale Maldon, riduzione al Barolo.',
      price: 58, tags: ['chef'], allergens: [],
      wine: 'Barolo Riserva', img: ph(8, 'PIATTO 08 · costata', 12) },
    { id: 'd9',  section: 'secondi', name: 'Carciofi alla giudia',
      desc: 'Carciofi romaneschi fritti due volte, fior di sale, scorza di limone.',
      price: 18, tags: ['vegan', 'gf'], allergens: [],
      wine: 'Frascati Superiore', img: ph(9, 'PIATTO 09 · carciofi', 90) },

    // Dolci
    { id: 'd10', section: 'dolci', name: 'Tiramis\u00f9 della casa',
      desc: 'Mascarpone montato, savoiardi inzuppati al caff\u00e8 di Trieste, cacao Valrhona.',
      price: 9, tags: ['chef'], allergens: ['glutine', 'uova', 'lattosio'],
      wine: 'Passito di Pantelleria', img: ph(10, 'PIATTO 10 · tiramisu', 25) },
    { id: 'd11', section: 'dolci', name: 'Sorbetto al bergamotto',
      desc: 'Bergamotto di Reggio Calabria, scorza candita, polvere di liquirizia.',
      price: 7, tags: ['vegan', 'gf'], allergens: [],
      wine: 'Moscato d\u2019Asti DOCG', img: ph(11, 'PIATTO 11 · sorbetto', 70) },
    { id: 'd12', section: 'dolci', name: 'Cioccolato 70%',
      desc: 'Tortino caldo al cioccolato monorigine Madagascar, cuore fondente, gelato al fior di latte.',
      price: 10, tags: ['veg'], allergens: ['glutine', 'uova', 'lattosio', 'frutta_secca'],
      wine: 'Recioto della Valpolicella', img: ph(12, 'PIATTO 12 · cioccolato', 20) },
  ];

  const sections = [
    { id: 'antipasti', it: 'Antipasti',   en: 'Starters',   fr: 'Entrées',     de: 'Vorspeisen',
      note: 'Per cominciare' },
    { id: 'primi',     it: 'Primi piatti', en: 'First courses', fr: 'Pâtes & riz', de: 'Erste Gänge',
      note: 'Paste e risotti' },
    { id: 'secondi',   it: 'Secondi',     en: 'Mains',      fr: 'Plats',       de: 'Hauptgerichte',
      note: 'Dal mare e dalla terra' },
    { id: 'dolci',     it: 'Dolci',       en: 'Desserts',   fr: 'Desserts',    de: 'Nachspeisen',
      note: 'Per concludere' },
  ];

  const restaurant = {
    name: 'Osteria del Borgo',
    tagline: 'Cucina di tradizione, ricerca contemporanea',
    address: 'Via dei Tessitori 14 · Bologna',
    phone: '+39 051 270 814',
    hours: 'Mar–Dom · 19:00 – 23:30',
  };

  const menus = [
    { id: 'cena',      name: 'Cena',           subtitle: 'Carta della sera',         active: true,  views: 4218 },
    { id: 'pranzo',    name: 'Pranzo',         subtitle: 'Menu del giorno',          active: true,  views: 2104 },
    { id: 'vini',      name: 'Carta dei vini', subtitle: '180 etichette',            active: true,  views: 891  },
    { id: 'degust',    name: 'Degustazione',   subtitle: '7 portate · 95€',          active: true,  views: 612  },
    { id: 'allergeni', name: 'Allergeni',      subtitle: 'Informazioni complete',    active: true,  views: 187  },
  ];

  // Translations for UI chrome
  const i18n = {
    it: { allergens: 'Allergeni', wine: 'Abbinamento', back: 'Indietro', menu: 'Menu', viewMore: 'Scopri di più', recommended: 'Consigliato dallo chef', filter: 'Filtra', search: 'Cerca un piatto…', tap_to_translate: 'Tocca per tradurre' },
    en: { allergens: 'Allergens', wine: 'Pairing',     back: 'Back',     menu: 'Menu', viewMore: 'View more',     recommended: "Chef's selection",     filter: 'Filter', search: 'Search a dish…',   tap_to_translate: 'Tap to translate' },
    fr: { allergens: 'Allergènes', wine: 'Accord',     back: 'Retour',   menu: 'Carte', viewMore: 'En savoir plus', recommended: 'Sélection du chef',    filter: 'Filtrer', search: 'Chercher un plat…', tap_to_translate: 'Touchez pour traduire' },
    de: { allergens: 'Allergene',  wine: 'Wein',       back: 'Zurück',   menu: 'Karte', viewMore: 'Mehr',           recommended: 'Empfehlung des Küchenchefs', filter: 'Filter', search: 'Gericht suchen…', tap_to_translate: 'Zum Übersetzen tippen' },
  };

  return { restaurant, menus, sections, dishes: dishes.map(addIngredients), allergens, tags, i18n };

  function addIngredients(d) {
    const map = {
      d1: ['Vitello scottato', 'Tonno in olio', 'Capperi di Pantelleria', 'Acciughe', 'Maionese', 'Olive nere taggiasche', 'Limone'],
      d2: ['Burrata pugliese', 'Fichi neri di Bursano', 'Prosciutto crudo 24 mesi', 'Miele di acacia', 'Rosmarino', 'Pepe nero'],
      d3: ['Filetto di fassona', 'Tuorlo d\u2019uovo', 'Senape antica', 'Capperi', 'Parmigiano 36 mesi', 'Olio EVO', 'Erba cipollina'],
      d4: ['Tagliolini all\u2019uovo', 'Burro di malga', 'Tartufo nero Val di Susa', 'Parmigiano Reggiano', 'Pepe nero'],
      d5: ['Riso Carnaroli', 'Limone di Amalfi', 'Gambero rosso di Mazara', 'Basilico', 'Burro', 'Brodo vegetale'],
      d6: ['Spaghettoni di Gragnano', 'Vongole veraci', 'Prezzemolo', 'Peperoncino di Senise', 'Aglio', 'Olio EVO', 'Vino bianco'],
      d7: ['Branzino selvaggio', 'Sale grosso', 'Finocchio', 'Limone', 'Timo', 'Olio EVO', 'Pepe rosa'],
      d8: ['Costata di fassona', 'Sale Maldon', 'Pepe nero', 'Riduzione di Barolo', 'Rosmarino', 'Burro'],
      d9: ['Carciofi romaneschi', 'Olio di semi', 'Sale fino', 'Pepe', 'Scorza di limone'],
      d10: ['Mascarpone', 'Uova fresche', 'Savoiardi', 'Caff\u00e8 di Trieste', 'Cacao Valrhona', 'Zucchero', 'Marsala'],
      d11: ['Bergamotto di Reggio Calabria', 'Zucchero', 'Acqua', 'Scorza candita', 'Polvere di liquirizia'],
      d12: ['Cioccolato Madagascar 70%', 'Burro', 'Uova', 'Zucchero', 'Farina', 'Gelato fior di latte', 'Nocciole'],
    };
    return { ...d, ingredients: map[d.id] || [] };
  }
})();
