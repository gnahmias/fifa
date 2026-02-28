export interface FifaTeam {
  id: string;
  name: string;
  league: string;
  badge: string; // URL or empty string
}

// flagcdn.com provides reliable flag PNGs: https://flagcdn.com/w40/{code}.png
const flag = (code: string) => `https://flagcdn.com/w40/${code}.png`;

export const POPULAR_TEAMS: FifaTeam[] = [
  // ── Selecciones ──────────────────────────────────────────────────────────
  { id: 'arg', name: 'Argentina',      league: 'Selección Nacional', badge: flag('ar') },
  { id: 'bra', name: 'Brasil',         league: 'Selección Nacional', badge: flag('br') },
  { id: 'fra', name: 'Francia',        league: 'Selección Nacional', badge: flag('fr') },
  { id: 'ger', name: 'Alemania',       league: 'Selección Nacional', badge: flag('de') },
  { id: 'esp', name: 'España',         league: 'Selección Nacional', badge: flag('es') },
  { id: 'por', name: 'Portugal',       league: 'Selección Nacional', badge: flag('pt') },
  { id: 'eng', name: 'Inglaterra',     league: 'Selección Nacional', badge: flag('gb-eng') },
  { id: 'ita', name: 'Italia',         league: 'Selección Nacional', badge: flag('it') },
  { id: 'ned', name: 'Países Bajos',   league: 'Selección Nacional', badge: flag('nl') },
  { id: 'bel', name: 'Bélgica',        league: 'Selección Nacional', badge: flag('be') },
  { id: 'cro', name: 'Croacia',        league: 'Selección Nacional', badge: flag('hr') },
  { id: 'uru', name: 'Uruguay',        league: 'Selección Nacional', badge: flag('uy') },
  { id: 'col', name: 'Colombia',       league: 'Selección Nacional', badge: flag('co') },
  { id: 'mex', name: 'México',         league: 'Selección Nacional', badge: flag('mx') },
  { id: 'usa', name: 'Estados Unidos', league: 'Selección Nacional', badge: flag('us') },
  { id: 'jpn', name: 'Japón',          league: 'Selección Nacional', badge: flag('jp') },
  { id: 'kor', name: 'Corea del Sur',  league: 'Selección Nacional', badge: flag('kr') },
  { id: 'sen', name: 'Senegal',        league: 'Selección Nacional', badge: flag('sn') },
  { id: 'mar', name: 'Marruecos',      league: 'Selección Nacional', badge: flag('ma') },
  { id: 'chi', name: 'Chile',          league: 'Selección Nacional', badge: flag('cl') },
  { id: 'ecu', name: 'Ecuador',        league: 'Selección Nacional', badge: flag('ec') },
  { id: 'per', name: 'Perú',           league: 'Selección Nacional', badge: flag('pe') },
  { id: 'pol', name: 'Polonia',        league: 'Selección Nacional', badge: flag('pl') },
  { id: 'sui', name: 'Suiza',          league: 'Selección Nacional', badge: flag('ch') },
  { id: 'den', name: 'Dinamarca',      league: 'Selección Nacional', badge: flag('dk') },
  { id: 'swe', name: 'Suecia',         league: 'Selección Nacional', badge: flag('se') },
  { id: 'aus', name: 'Australia',      league: 'Selección Nacional', badge: flag('au') },
  { id: 'mex2', name: 'México',        league: 'Selección Nacional', badge: flag('mx') },
  { id: 'ngr', name: 'Nigeria',        league: 'Selección Nacional', badge: flag('ng') },
  { id: 'cmr', name: 'Camerún',        league: 'Selección Nacional', badge: flag('cm') },
  { id: 'gha', name: 'Ghana',          league: 'Selección Nacional', badge: flag('gh') },
  { id: 'ven', name: 'Venezuela',      league: 'Selección Nacional', badge: flag('ve') },
  { id: 'par', name: 'Paraguay',       league: 'Selección Nacional', badge: flag('py') },
  { id: 'bol', name: 'Bolivia',        league: 'Selección Nacional', badge: flag('bo') },
  { id: 'scot', name: 'Escocia',       league: 'Selección Nacional', badge: flag('gb-sct') },
  { id: 'tur', name: 'Turquía',        league: 'Selección Nacional', badge: flag('tr') },

  // ── La Liga ──────────────────────────────────────────────────────────────
  { id: 'rma', name: 'Real Madrid',     league: 'La Liga', badge: '' },
  { id: 'bar', name: 'FC Barcelona',    league: 'La Liga', badge: '' },
  { id: 'atm', name: 'Atlético Madrid', league: 'La Liga', badge: '' },
  { id: 'sev', name: 'Sevilla FC',      league: 'La Liga', badge: '' },
  { id: 'val', name: 'Valencia CF',     league: 'La Liga', badge: '' },
  { id: 'bet', name: 'Real Betis',      league: 'La Liga', badge: '' },
  { id: 'vil', name: 'Villarreal CF',   league: 'La Liga', badge: '' },

  // ── Premier League ────────────────────────────────────────────────────────
  { id: 'mci', name: 'Manchester City',    league: 'Premier League', badge: '' },
  { id: 'mun', name: 'Manchester United',  league: 'Premier League', badge: '' },
  { id: 'liv', name: 'Liverpool',          league: 'Premier League', badge: '' },
  { id: 'che', name: 'Chelsea',            league: 'Premier League', badge: '' },
  { id: 'ars', name: 'Arsenal',            league: 'Premier League', badge: '' },
  { id: 'tot', name: 'Tottenham Hotspur',  league: 'Premier League', badge: '' },
  { id: 'new', name: 'Newcastle United',   league: 'Premier League', badge: '' },
  { id: 'avl', name: 'Aston Villa',        league: 'Premier League', badge: '' },

  // ── Bundesliga ────────────────────────────────────────────────────────────
  { id: 'bay', name: 'Bayern Munich',         league: 'Bundesliga', badge: '' },
  { id: 'bvb', name: 'Borussia Dortmund',     league: 'Bundesliga', badge: '' },
  { id: 'b04', name: 'Bayer Leverkusen',      league: 'Bundesliga', badge: '' },
  { id: 'rbl', name: 'RB Leipzig',            league: 'Bundesliga', badge: '' },

  // ── Ligue 1 ───────────────────────────────────────────────────────────────
  { id: 'psg', name: 'Paris Saint-Germain',   league: 'Ligue 1', badge: '' },
  { id: 'mar2', name: 'Olympique de Marseille', league: 'Ligue 1', badge: '' },
  { id: 'mon', name: 'AS Monaco',             league: 'Ligue 1', badge: '' },

  // ── Serie A ───────────────────────────────────────────────────────────────
  { id: 'juv', name: 'Juventus',   league: 'Serie A', badge: '' },
  { id: 'mil', name: 'AC Milan',   league: 'Serie A', badge: '' },
  { id: 'int', name: 'Inter',      league: 'Serie A', badge: '' },
  { id: 'nap', name: 'Napoli',     league: 'Serie A', badge: '' },
  { id: 'rom', name: 'AS Roma',    league: 'Serie A', badge: '' },
  { id: 'laz', name: 'Lazio',      league: 'Serie A', badge: '' },

  // ── Eredivisie ────────────────────────────────────────────────────────────
  { id: 'ajx', name: 'Ajax',          league: 'Eredivisie', badge: '' },
  { id: 'psv', name: 'PSV Eindhoven', league: 'Eredivisie', badge: '' },
  { id: 'fen', name: 'Feyenoord',     league: 'Eredivisie', badge: '' },

  // ── Portugal ─────────────────────────────────────────────────────────────
  { id: 'por2', name: 'FC Porto',  league: 'Primeira Liga', badge: '' },
  { id: 'ben', name: 'Benfica',    league: 'Primeira Liga', badge: '' },
  { id: 'scp', name: 'Sporting CP', league: 'Primeira Liga', badge: '' },

  // ── Argentina ─────────────────────────────────────────────────────────────
  { id: 'riv', name: 'River Plate',      league: 'Liga Profesional', badge: '' },
  { id: 'boc', name: 'Boca Juniors',     league: 'Liga Profesional', badge: '' },
  { id: 'ind', name: 'Independiente',    league: 'Liga Profesional', badge: '' },
  { id: 'rac', name: 'Racing Club',      league: 'Liga Profesional', badge: '' },
  { id: 'san', name: 'San Lorenzo',      league: 'Liga Profesional', badge: '' },
  { id: 'est', name: 'Estudiantes',      league: 'Liga Profesional', badge: '' },
  { id: 'hir', name: 'Huracán',          league: 'Liga Profesional', badge: '' },
  { id: 'tuc', name: 'Atlético Tucumán', league: 'Liga Profesional', badge: '' },
  { id: 'lan', name: 'Lanús',            league: 'Liga Profesional', badge: '' },
  { id: 'tal', name: 'Talleres',         league: 'Liga Profesional', badge: '' },

  // ── Brasil ────────────────────────────────────────────────────────────────
  { id: 'fla', name: 'Flamengo',           league: 'Brasileirão', badge: '' },
  { id: 'pal', name: 'Palmeiras',          league: 'Brasileirão', badge: '' },
  { id: 'cor', name: 'Corinthians',        league: 'Brasileirão', badge: '' },
  { id: 'sao', name: 'São Paulo',          league: 'Brasileirão', badge: '' },
  { id: 'san2', name: 'Santos',            league: 'Brasileirão', badge: '' },
  { id: 'int2', name: 'Internacional',     league: 'Brasileirão', badge: '' },
  { id: 'gre', name: 'Grêmio',            league: 'Brasileirão', badge: '' },
  { id: 'caf', name: 'Atlético Mineiro',   league: 'Brasileirão', badge: '' },
  { id: 'flu', name: 'Fluminense',         league: 'Brasileirão', badge: '' },
  { id: 'vas', name: 'Vasco da Gama',      league: 'Brasileirão', badge: '' },
];

export function searchTeams(query: string): FifaTeam[] {
  if (!query || query.trim().length < 1) return POPULAR_TEAMS.slice(0, 12);
  const q = query.toLowerCase().trim();
  return POPULAR_TEAMS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) ||
      t.league.toLowerCase().includes(q)
  ).slice(0, 12);
}
