export interface FifaTeam {
  id: string;
  name: string;
  league: string;
  badge: string; // URL or empty string
}

// flagcdn.com provides reliable flag PNGs: https://flagcdn.com/w40/{code}.png
const flag = (code: string) => `https://flagcdn.com/w40/${code}.png`;

// Wikipedia Special:Redirect/file resolves the correct URL without needing the MD5 hash.
// ?width=80 returns a PNG thumbnail rasterized from the SVG.
const wiki = (file: string) =>
  `https://en.wikipedia.org/wiki/Special:Redirect/file/${encodeURIComponent(file)}?width=80`;

export const POPULAR_TEAMS: FifaTeam[] = [
  // ── Selecciones ──────────────────────────────────────────────────────────
  { id: 'arg',  name: 'Argentina',      league: 'Selección Nacional', badge: flag('ar') },
  { id: 'bra',  name: 'Brasil',         league: 'Selección Nacional', badge: flag('br') },
  { id: 'fra',  name: 'Francia',        league: 'Selección Nacional', badge: flag('fr') },
  { id: 'ger',  name: 'Alemania',       league: 'Selección Nacional', badge: flag('de') },
  { id: 'esp',  name: 'España',         league: 'Selección Nacional', badge: flag('es') },
  { id: 'por',  name: 'Portugal',       league: 'Selección Nacional', badge: flag('pt') },
  { id: 'eng',  name: 'Inglaterra',     league: 'Selección Nacional', badge: flag('gb-eng') },
  { id: 'ita',  name: 'Italia',         league: 'Selección Nacional', badge: flag('it') },
  { id: 'ned',  name: 'Países Bajos',   league: 'Selección Nacional', badge: flag('nl') },
  { id: 'bel',  name: 'Bélgica',        league: 'Selección Nacional', badge: flag('be') },
  { id: 'cro',  name: 'Croacia',        league: 'Selección Nacional', badge: flag('hr') },
  { id: 'uru',  name: 'Uruguay',        league: 'Selección Nacional', badge: flag('uy') },
  { id: 'col',  name: 'Colombia',       league: 'Selección Nacional', badge: flag('co') },
  { id: 'mex',  name: 'México',         league: 'Selección Nacional', badge: flag('mx') },
  { id: 'usa',  name: 'Estados Unidos', league: 'Selección Nacional', badge: flag('us') },
  { id: 'jpn',  name: 'Japón',          league: 'Selección Nacional', badge: flag('jp') },
  { id: 'kor',  name: 'Corea del Sur',  league: 'Selección Nacional', badge: flag('kr') },
  { id: 'sen',  name: 'Senegal',        league: 'Selección Nacional', badge: flag('sn') },
  { id: 'mar',  name: 'Marruecos',      league: 'Selección Nacional', badge: flag('ma') },
  { id: 'chi',  name: 'Chile',          league: 'Selección Nacional', badge: flag('cl') },
  { id: 'ecu',  name: 'Ecuador',        league: 'Selección Nacional', badge: flag('ec') },
  { id: 'per',  name: 'Perú',           league: 'Selección Nacional', badge: flag('pe') },
  { id: 'pol',  name: 'Polonia',        league: 'Selección Nacional', badge: flag('pl') },
  { id: 'sui',  name: 'Suiza',          league: 'Selección Nacional', badge: flag('ch') },
  { id: 'den',  name: 'Dinamarca',      league: 'Selección Nacional', badge: flag('dk') },
  { id: 'swe',  name: 'Suecia',         league: 'Selección Nacional', badge: flag('se') },
  { id: 'aus',  name: 'Australia',      league: 'Selección Nacional', badge: flag('au') },
  { id: 'ngr',  name: 'Nigeria',        league: 'Selección Nacional', badge: flag('ng') },
  { id: 'cmr',  name: 'Camerún',        league: 'Selección Nacional', badge: flag('cm') },
  { id: 'gha',  name: 'Ghana',          league: 'Selección Nacional', badge: flag('gh') },
  { id: 'ven',  name: 'Venezuela',      league: 'Selección Nacional', badge: flag('ve') },
  { id: 'par',  name: 'Paraguay',       league: 'Selección Nacional', badge: flag('py') },
  { id: 'bol',  name: 'Bolivia',        league: 'Selección Nacional', badge: flag('bo') },
  { id: 'scot', name: 'Escocia',        league: 'Selección Nacional', badge: flag('gb-sct') },
  { id: 'tur',  name: 'Turquía',        league: 'Selección Nacional', badge: flag('tr') },

  // ── La Liga ──────────────────────────────────────────────────────────────
  { id: 'rma', name: 'Real Madrid',     league: 'La Liga', badge: wiki('Real_Madrid_CF.svg') },
  { id: 'bar', name: 'FC Barcelona',    league: 'La Liga', badge: wiki('FC_Barcelona_(crest).svg') },
  { id: 'atm', name: 'Atlético Madrid', league: 'La Liga', badge: wiki('Atletico_Madrid_2017_logo.svg') },
  { id: 'sev', name: 'Sevilla FC',      league: 'La Liga', badge: wiki('Sevilla_FC_logo.svg') },
  { id: 'val', name: 'Valencia CF',     league: 'La Liga', badge: wiki('Valenciacf.svg') },
  { id: 'bet', name: 'Real Betis',      league: 'La Liga', badge: wiki('Real_betis_logo.svg') },
  { id: 'vil', name: 'Villarreal CF',   league: 'La Liga', badge: wiki('Villarreal_CF_logo-en.svg') },

  // ── Premier League ────────────────────────────────────────────────────────
  { id: 'mci', name: 'Manchester City',   league: 'Premier League', badge: wiki('Manchester_City_FC_badge.svg') },
  { id: 'mun', name: 'Manchester United', league: 'Premier League', badge: wiki('Manchester_United_FC_crest.svg') },
  { id: 'liv', name: 'Liverpool',         league: 'Premier League', badge: wiki('Liverpool_FC.svg') },
  { id: 'che', name: 'Chelsea',           league: 'Premier League', badge: wiki('Chelsea_FC.svg') },
  { id: 'ars', name: 'Arsenal',           league: 'Premier League', badge: wiki('Arsenal_FC.svg') },
  { id: 'tot', name: 'Tottenham Hotspur', league: 'Premier League', badge: wiki('Tottenham_Hotspur.svg') },
  { id: 'new', name: 'Newcastle United',  league: 'Premier League', badge: wiki('Newcastle_United_Logo.svg') },
  { id: 'avl', name: 'Aston Villa',       league: 'Premier League', badge: wiki('Aston_Villa_FC_crest_(2016).svg') },

  // ── Bundesliga ────────────────────────────────────────────────────────────
  { id: 'bay', name: 'Bayern Munich',     league: 'Bundesliga', badge: wiki('FC_Bayern_München_logo_(2002–2017).svg') },
  { id: 'bvb', name: 'Borussia Dortmund', league: 'Bundesliga', badge: wiki('Borussia_Dortmund_logo.svg') },
  { id: 'b04', name: 'Bayer Leverkusen',  league: 'Bundesliga', badge: wiki('Bayer_04_Leverkusen_logo.svg') },
  { id: 'rbl', name: 'RB Leipzig',        league: 'Bundesliga', badge: wiki('RB_Leipzig_2014_logo.svg') },

  // ── Ligue 1 ───────────────────────────────────────────────────────────────
  { id: 'psg',  name: 'Paris Saint-Germain',    league: 'Ligue 1', badge: wiki('Paris_Saint-Germain_F.C..svg') },
  { id: 'mar2', name: 'Olympique de Marseille', league: 'Ligue 1', badge: wiki('Olympique_Marseille_logo.svg') },
  { id: 'mon',  name: 'AS Monaco',              league: 'Ligue 1', badge: wiki('AS_Monaco_FC.svg') },

  // ── Serie A ───────────────────────────────────────────────────────────────
  { id: 'juv', name: 'Juventus', league: 'Serie A', badge: wiki('Juventus_FC_2017_icon_(black).svg') },
  { id: 'mil', name: 'AC Milan', league: 'Serie A', badge: wiki('Logo_of_AC_Milan.svg') },
  { id: 'int', name: 'Inter',    league: 'Serie A', badge: wiki('FC_Internazionale_Milano_2021.svg') },
  { id: 'nap', name: 'Napoli',   league: 'Serie A', badge: wiki('SSC_Napoli_logo.svg') },
  { id: 'rom', name: 'AS Roma',  league: 'Serie A', badge: wiki('AS_Roma_logo_(2013).svg') },
  { id: 'laz', name: 'Lazio',    league: 'Serie A', badge: wiki('SS_Lazio_Badge.svg') },

  // ── Eredivisie ────────────────────────────────────────────────────────────
  { id: 'ajx', name: 'Ajax',          league: 'Eredivisie', badge: wiki('Ajax_Amsterdam.svg') },
  { id: 'psv', name: 'PSV Eindhoven', league: 'Eredivisie', badge: wiki('PSV_Eindhoven_Crest.svg') },
  { id: 'fen', name: 'Feyenoord',     league: 'Eredivisie', badge: wiki('Feyenoord_logo.svg') },

  // ── Portugal ─────────────────────────────────────────────────────────────
  { id: 'por2', name: 'FC Porto',    league: 'Primeira Liga', badge: wiki('FC_Porto.svg') },
  { id: 'ben',  name: 'Benfica',     league: 'Primeira Liga', badge: wiki('SL_Benfica_logo.svg') },
  { id: 'scp',  name: 'Sporting CP', league: 'Primeira Liga', badge: wiki('Sporting_CP_–_Badge,_2021.svg') },

  // ── Argentina ─────────────────────────────────────────────────────────────
  { id: 'riv', name: 'River Plate',      league: 'Liga Profesional', badge: wiki('Escudo_del_Club_Atlético_River_Plate.svg') },
  { id: 'boc', name: 'Boca Juniors',     league: 'Liga Profesional', badge: wiki('Escudo_del_Club_Atlético_Boca_Juniors.svg') },
  { id: 'ind', name: 'Independiente',    league: 'Liga Profesional', badge: wiki('Escudo_Independiente.svg') },
  { id: 'rac', name: 'Racing Club',      league: 'Liga Profesional', badge: wiki('Racing_Club_de_Avellaneda.svg') },
  { id: 'san', name: 'San Lorenzo',      league: 'Liga Profesional', badge: wiki('San_Lorenzo_de_Almagro_logo.svg') },
  { id: 'est', name: 'Estudiantes',      league: 'Liga Profesional', badge: wiki('Estudiantes_de_La_Plata_logo.svg') },
  { id: 'hir', name: 'Huracán',          league: 'Liga Profesional', badge: '' },
  { id: 'tuc', name: 'Atlético Tucumán', league: 'Liga Profesional', badge: '' },
  { id: 'lan', name: 'Lanús',            league: 'Liga Profesional', badge: wiki('Club_Atletico_Lanus.svg') },
  { id: 'tal', name: 'Talleres',         league: 'Liga Profesional', badge: '' },

  // ── Brasil ────────────────────────────────────────────────────────────────
  { id: 'fla',  name: 'Flamengo',         league: 'Brasileirão', badge: wiki('Flamengo_braz_logo.svg') },
  { id: 'pal',  name: 'Palmeiras',        league: 'Brasileirão', badge: wiki('Palmeiras_logo.svg') },
  { id: 'cor',  name: 'Corinthians',      league: 'Brasileirão', badge: wiki('Sport_Club_Corinthians_Paulista.svg') },
  { id: 'sao',  name: 'São Paulo',        league: 'Brasileirão', badge: wiki('São_Paulo_FC.svg') },
  { id: 'san2', name: 'Santos',           league: 'Brasileirão', badge: wiki('Santos_Logo.svg') },
  { id: 'int2', name: 'Internacional',    league: 'Brasileirão', badge: wiki('Escudo_do_Sport_Club_Internacional.svg') },
  { id: 'gre',  name: 'Grêmio',          league: 'Brasileirão', badge: wiki('Gremio_fbpa.svg') },
  { id: 'caf',  name: 'Atlético Mineiro', league: 'Brasileirão', badge: wiki('Atletico_mineiro_galo.svg') },
  { id: 'flu',  name: 'Fluminense',       league: 'Brasileirão', badge: wiki('Fluminense_FC_logo.svg') },
  { id: 'vas',  name: 'Vasco da Gama',    league: 'Brasileirão', badge: wiki('Vasco_da_Gama_Logo.svg') },
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
