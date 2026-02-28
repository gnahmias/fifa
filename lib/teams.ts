export interface FifaTeam {
  id: string;
  name: string;
  league: string;
  badge: string; // URL or empty string
}

// flagcdn.com provides reliable flag PNGs
const flag = (code: string) => `https://flagcdn.com/w40/${code}.png`;

// Wikipedia Special:Redirect/file resolves the correct hash server-side — no MD5 guessing needed.
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

  // ── La Liga (20 equipos) ──────────────────────────────────────────────────
  { id: 'rma', name: 'Real Madrid',        league: 'La Liga', badge: wiki('Real_Madrid_CF.svg') },
  { id: 'bar', name: 'FC Barcelona',       league: 'La Liga', badge: wiki('FC_Barcelona_(crest).svg') },
  { id: 'atm', name: 'Atlético Madrid',    league: 'La Liga', badge: wiki('Atletico_Madrid_2017_logo.svg') },
  { id: 'ath', name: 'Athletic Club',      league: 'La Liga', badge: wiki('Athletic_Club_Crest.svg') },
  { id: 'rso', name: 'Real Sociedad',      league: 'La Liga', badge: wiki('Real_Sociedad_logo.svg') },
  { id: 'bet', name: 'Real Betis',         league: 'La Liga', badge: wiki('Real_betis_logo.svg') },
  { id: 'vil', name: 'Villarreal CF',      league: 'La Liga', badge: wiki('Villarreal_CF_logo-en.svg') },
  { id: 'val', name: 'Valencia CF',        league: 'La Liga', badge: wiki('Valenciacf.svg') },
  { id: 'cel', name: 'Celta de Vigo',      league: 'La Liga', badge: wiki('Celta_de_Vigo_logo.svg') },
  { id: 'gir', name: 'Girona FC',          league: 'La Liga', badge: wiki('Girona_FC.svg') },
  { id: 'ray', name: 'Rayo Vallecano',     league: 'La Liga', badge: wiki('Rayo_Vallecano_logo.svg') },
  { id: 'get', name: 'Getafe CF',          league: 'La Liga', badge: wiki('Getafe_CF_logo.svg') },
  { id: 'alv', name: 'Deportivo Alavés',   league: 'La Liga', badge: wiki('Deportivo_Alavés.svg') },
  { id: 'sev', name: 'Sevilla FC',         league: 'La Liga', badge: wiki('Sevilla_FC_logo.svg') },
  { id: 'osa', name: 'CA Osasuna',         league: 'La Liga', badge: wiki('CA_Osasuna_logo.svg') },
  { id: 'mal', name: 'RCD Mallorca',       league: 'La Liga', badge: wiki('RCD_Mallorca_logo.svg') },
  { id: 'lpa', name: 'UD Las Palmas',      league: 'La Liga', badge: wiki('UD_Las_Palmas_logo.svg') },
  { id: 'espy', name: 'Espanyol',           league: 'La Liga', badge: wiki('RCD_Espanyol_logo.svg') },
  { id: 'leg', name: 'CD Leganés',         league: 'La Liga', badge: wiki('CD_Leganés_logo.svg') },
  { id: 'vll', name: 'Valladolid',         league: 'La Liga', badge: wiki('Real_Valladolid_logo.svg') },

  // ── Premier League (20 equipos) ───────────────────────────────────────────
  { id: 'mci', name: 'Manchester City',        league: 'Premier League', badge: wiki('Manchester_City_FC_badge.svg') },
  { id: 'mun', name: 'Manchester United',      league: 'Premier League', badge: wiki('Manchester_United_FC_crest.svg') },
  { id: 'liv', name: 'Liverpool',              league: 'Premier League', badge: wiki('Liverpool_FC.svg') },
  { id: 'che', name: 'Chelsea',               league: 'Premier League', badge: wiki('Chelsea_FC.svg') },
  { id: 'ars', name: 'Arsenal',               league: 'Premier League', badge: wiki('Arsenal_FC.svg') },
  { id: 'tot', name: 'Tottenham Hotspur',      league: 'Premier League', badge: wiki('Tottenham_Hotspur.svg') },
  { id: 'new', name: 'Newcastle United',       league: 'Premier League', badge: wiki('Newcastle_United_Logo.svg') },
  { id: 'avl', name: 'Aston Villa',           league: 'Premier League', badge: wiki('Aston_Villa_FC_crest_(2016).svg') },
  { id: 'bha', name: 'Brighton & Hove Albion', league: 'Premier League', badge: wiki('Brighton_&_Hove_Albion_logo.svg') },
  { id: 'whu', name: 'West Ham United',        league: 'Premier League', badge: wiki('West_Ham_United_FC_logo.svg') },
  { id: 'bre', name: 'Brentford',             league: 'Premier League', badge: wiki('Brentford_FC_crest.svg') },
  { id: 'cpa', name: 'Crystal Palace',         league: 'Premier League', badge: wiki('Crystal_Palace_FC_logo.svg') },
  { id: 'ful', name: 'Fulham',                league: 'Premier League', badge: wiki('Fulham_FC_(shield).svg') },
  { id: 'wol', name: 'Wolverhampton Wanderers', league: 'Premier League', badge: wiki('Wolverhampton_Wanderers.svg') },
  { id: 'nfo', name: 'Nottingham Forest',      league: 'Premier League', badge: wiki('Nottingham_Forest_FC_logo.svg') },
  { id: 'bou', name: 'AFC Bournemouth',        league: 'Premier League', badge: wiki('AFC_Bournemouth_(2013).svg') },
  { id: 'eve', name: 'Everton',               league: 'Premier League', badge: wiki('Everton_FC_logo.svg') },
  { id: 'lei', name: 'Leicester City',         league: 'Premier League', badge: wiki('Leicester_City_crest.svg') },
  { id: 'ips', name: 'Ipswich Town',          league: 'Premier League', badge: wiki('Ipswich_Town.svg') },
  { id: 'sou', name: 'Southampton',           league: 'Premier League', badge: wiki('Southampton_FC.svg') },

  // ── Bundesliga (18 equipos) ───────────────────────────────────────────────
  { id: 'bay', name: 'Bayern Munich',          league: 'Bundesliga', badge: wiki('FC_Bayern_München_logo_(2002–2017).svg') },
  { id: 'bvb', name: 'Borussia Dortmund',      league: 'Bundesliga', badge: wiki('Borussia_Dortmund_logo.svg') },
  { id: 'b04', name: 'Bayer Leverkusen',       league: 'Bundesliga', badge: wiki('Bayer_04_Leverkusen_logo.svg') },
  { id: 'rbl', name: 'RB Leipzig',             league: 'Bundesliga', badge: wiki('RB_Leipzig_2014_logo.svg') },
  { id: 'vfb', name: 'VfB Stuttgart',          league: 'Bundesliga', badge: wiki('VfB_Stuttgart_1893_logo.svg') },
  { id: 'bmg', name: 'Borussia Mönchengladbach', league: 'Bundesliga', badge: wiki('Borussia_Mönchengladbach_logo.svg') },
  { id: 'sge', name: 'Eintracht Frankfurt',    league: 'Bundesliga', badge: wiki('Eintracht_Frankfurt_Logo.svg') },
  { id: 'svw', name: 'Werder Bremen',          league: 'Bundesliga', badge: wiki('Werder_Bremen_logo.svg') },
  { id: 'wob', name: 'VfL Wolfsburg',          league: 'Bundesliga', badge: wiki('VfL_Wolfsburg_logo.svg') },
  { id: 'scf', name: 'SC Freiburg',            league: 'Bundesliga', badge: wiki('Sport-Club_Freiburg_logo.svg') },
  { id: 'tsg', name: 'TSG Hoffenheim',         league: 'Bundesliga', badge: wiki('TSG_1899_Hoffenheim_logo.svg') },
  { id: 'fcb', name: 'Union Berlin',           league: 'Bundesliga', badge: wiki('1._FC_Union_Berlin_logo.svg') },
  { id: 'vbo', name: 'VfL Bochum',             league: 'Bundesliga', badge: wiki('VfL_Bochum_logo.svg') },
  { id: 'fca', name: 'FC Augsburg',            league: 'Bundesliga', badge: wiki('FC_Augsburg_logo.svg') },
  { id: 'm05', name: 'FSV Mainz 05',           league: 'Bundesliga', badge: wiki('1._FSV_Mainz_05_logo.svg') },
  { id: 'hei', name: 'FC Heidenheim',          league: 'Bundesliga', badge: wiki('FC_Heidenheim_logo.svg') },
  { id: 'ksk', name: 'Holstein Kiel',          league: 'Bundesliga', badge: wiki('Holstein_Kiel_Wappen.svg') },
  { id: 'stp', name: 'FC St. Pauli',           league: 'Bundesliga', badge: wiki('FC_St._Pauli_logo.svg') },

  // ── Ligue 1 (18 equipos) ─────────────────────────────────────────────────
  { id: 'psg',  name: 'Paris Saint-Germain',    league: 'Ligue 1', badge: wiki('Paris_Saint-Germain_F.C..svg') },
  { id: 'mar2', name: 'Olympique de Marseille', league: 'Ligue 1', badge: wiki('Olympique_Marseille_logo.svg') },
  { id: 'mon',  name: 'AS Monaco',             league: 'Ligue 1', badge: wiki('AS_Monaco_FC.svg') },
  { id: 'ol',   name: 'Olympique Lyonnais',    league: 'Ligue 1', badge: wiki('Olympique_Lyonnais.svg') },
  { id: 'lil',  name: 'LOSC Lille',            league: 'Ligue 1', badge: wiki('LOSC_Lille_logo.svg') },
  { id: 'ogc',  name: 'OGC Nice',              league: 'Ligue 1', badge: wiki('OGC_Nice_logo.svg') },
  { id: 'ren',  name: 'Stade Rennais',         league: 'Ligue 1', badge: wiki('Stade_Rennais_FC.svg') },
  { id: 'str',  name: 'RC Strasbourg',         league: 'Ligue 1', badge: wiki('RC_Strasbourg_logo.svg') },
  { id: 'rcl',  name: 'RC Lens',               league: 'Ligue 1', badge: wiki('RC_Lens_logo.svg') },
  { id: 'mhsc', name: 'Montpellier HSC',       league: 'Ligue 1', badge: wiki('Montpellier_HSC_logo.svg') },
  { id: 'tfc',  name: 'Toulouse FC',           league: 'Ligue 1', badge: wiki('Toulouse_FC_logo.svg') },
  { id: 'fcn',  name: 'FC Nantes',             league: 'Ligue 1', badge: wiki('FC_Nantes_logo.svg') },
  { id: 'sb29', name: 'Stade Brestois',        league: 'Ligue 1', badge: wiki('Stade_Brestois_29_logo.svg') },
  { id: 'hac',  name: 'Le Havre AC',           league: 'Ligue 1', badge: wiki('Le_Havre_AC_logo.svg') },
  { id: 'aja',  name: 'AJ Auxerre',            league: 'Ligue 1', badge: wiki('AJ_Auxerre_logo.svg') },
  { id: 'sco',  name: 'Angers SCO',            league: 'Ligue 1', badge: wiki('Angers_SCO_logo.svg') },
  { id: 'asse', name: 'AS Saint-Étienne',      league: 'Ligue 1', badge: wiki('AS_Saint-Étienne_logo.svg') },
  { id: 'sdr',  name: 'Stade de Reims',        league: 'Ligue 1', badge: wiki('Stade_de_Reims_logo.svg') },

  // ── Serie A (20 equipos) ──────────────────────────────────────────────────
  { id: 'int', name: 'Inter',          league: 'Serie A', badge: wiki('FC_Internazionale_Milano_2021.svg') },
  { id: 'mil', name: 'AC Milan',       league: 'Serie A', badge: wiki('Logo_of_AC_Milan.svg') },
  { id: 'juv', name: 'Juventus',       league: 'Serie A', badge: wiki('Juventus_FC_2017_icon_(black).svg') },
  { id: 'nap', name: 'Napoli',         league: 'Serie A', badge: wiki('SSC_Napoli_logo.svg') },
  { id: 'rom', name: 'AS Roma',        league: 'Serie A', badge: wiki('AS_Roma_logo_(2013).svg') },
  { id: 'laz', name: 'Lazio',          league: 'Serie A', badge: wiki('SS_Lazio_Badge.svg') },
  { id: 'ata', name: 'Atalanta',       league: 'Serie A', badge: wiki('Atalanta_BC_logo.svg') },
  { id: 'fio', name: 'Fiorentina',     league: 'Serie A', badge: wiki('ACF_Fiorentina.svg') },
  { id: 'tor', name: 'Torino FC',      league: 'Serie A', badge: wiki('Torino_FC_Logo.svg') },
  { id: 'bolo', name: 'Bologna FC',     league: 'Serie A', badge: wiki('Bologna_FC_logo.svg') },
  { id: 'udi', name: 'Udinese',        league: 'Serie A', badge: wiki('Udinese_Calcio_logo.svg') },
  { id: 'gen', name: 'Genoa CFC',      league: 'Serie A', badge: wiki('Genoa_CFC_logo.svg') },
  { id: 'ver', name: 'Hellas Verona',  league: 'Serie A', badge: wiki('Hellas_Verona_FC_logo.svg') },
  { id: 'lec', name: 'US Lecce',       league: 'Serie A', badge: wiki('US_Lecce_logo.svg') },
  { id: 'cag', name: 'Cagliari',       league: 'Serie A', badge: wiki('Cagliari_Calcio_logo.svg') },
  { id: 'emp', name: 'Empoli FC',      league: 'Serie A', badge: wiki('Empoli_FC_logo.svg') },
  { id: 'mza', name: 'AC Monza',       league: 'Serie A', badge: wiki('AC_Monza_logo.svg') },
  { id: 'prm', name: 'Parma',          league: 'Serie A', badge: wiki('Parma_Calcio_1913.svg') },
  { id: 'com', name: 'Como 1907',      league: 'Serie A', badge: wiki('Como_1907_logo.svg') },
  { id: 'ven', name: 'Venezia FC',     league: 'Serie A', badge: wiki('Venezia_FC_logo.svg') },

  // ── Liga Profesional Argentina (26 equipos) ───────────────────────────────
  { id: 'riv', name: 'River Plate',         league: 'Liga Profesional', badge: wiki('Escudo_del_Club_Atlético_River_Plate.svg') },
  { id: 'boc', name: 'Boca Juniors',        league: 'Liga Profesional', badge: wiki('Escudo_del_Club_Atlético_Boca_Juniors.svg') },
  { id: 'rac', name: 'Racing Club',         league: 'Liga Profesional', badge: wiki('Racing_Club_de_Avellaneda.svg') },
  { id: 'ind', name: 'Independiente',       league: 'Liga Profesional', badge: wiki('Escudo_Independiente.svg') },
  { id: 'san', name: 'San Lorenzo',         league: 'Liga Profesional', badge: wiki('San_Lorenzo_de_Almagro_logo.svg') },
  { id: 'vel', name: 'Vélez Sársfield',     league: 'Liga Profesional', badge: wiki('Club_Atletico_Velez_Sarsfield.svg') },
  { id: 'ros', name: 'Rosario Central',     league: 'Liga Profesional', badge: wiki('Rosario_Central_logo.svg') },
  { id: 'nob', name: "Newell's Old Boys",   league: 'Liga Profesional', badge: wiki("Newell's_Old_Boys_logo.svg") },
  { id: 'est', name: 'Estudiantes',         league: 'Liga Profesional', badge: wiki('Estudiantes_de_La_Plata_logo.svg') },
  { id: 'tal', name: 'Talleres',            league: 'Liga Profesional', badge: wiki('Talleres_de_Córdoba_logo.svg') },
  { id: 'bel', name: 'Belgrano',            league: 'Liga Profesional', badge: wiki('Club_Atletico_Belgrano_logo.svg') },
  { id: 'hir', name: 'Huracán',             league: 'Liga Profesional', badge: wiki('Club_Atletico_Huracan.svg') },
  { id: 'lan', name: 'Lanús',               league: 'Liga Profesional', badge: wiki('Club_Atletico_Lanus.svg') },
  { id: 'arj', name: 'Argentinos Juniors',  league: 'Liga Profesional', badge: wiki('Argentinos_Juniors_logo.svg') },
  { id: 'ban', name: 'Banfield',            league: 'Liga Profesional', badge: wiki('Club_Atletico_Banfield.svg') },
  { id: 'gdj', name: 'Defensa y Justicia', league: 'Liga Profesional', badge: wiki('Defensa_y_Justicia_logo.svg') },
  { id: 'gco', name: 'Godoy Cruz',          league: 'Liga Profesional', badge: wiki('Godoy_Cruz_Antonio_Tomba_logo.svg') },
  { id: 'gym', name: 'Gimnasia La Plata',   league: 'Liga Profesional', badge: wiki('Club_de_Gimnasia_y_Esgrima_La_Plata.svg') },
  { id: 'pla', name: 'Platense',            league: 'Liga Profesional', badge: wiki('Club_Atletico_Platense_logo.svg') },
  { id: 'tuc', name: 'Atlético Tucumán',   league: 'Liga Profesional', badge: wiki('Club_Atletico_Tucuman_logo.svg') },
  { id: 'sar', name: 'Sarmiento',           league: 'Liga Profesional', badge: '' },
  { id: 'tig', name: 'Tigre',               league: 'Liga Profesional', badge: wiki('Club_Atletico_Tigre_logo.svg') },
  { id: 'uni', name: 'Unión Santa Fe',      league: 'Liga Profesional', badge: wiki('Union_de_Santa_Fe_logo.svg') },
  { id: 'ins', name: 'Instituto',           league: 'Liga Profesional', badge: '' },
  { id: 'bca', name: 'Barracas Central',    league: 'Liga Profesional', badge: '' },
  { id: 'cco', name: 'Central Córdoba',     league: 'Liga Profesional', badge: '' },

  // ── Eredivisie ────────────────────────────────────────────────────────────
  { id: 'ajx', name: 'Ajax',          league: 'Eredivisie', badge: wiki('Ajax_Amsterdam.svg') },
  { id: 'psv', name: 'PSV Eindhoven', league: 'Eredivisie', badge: wiki('PSV_Eindhoven_Crest.svg') },
  { id: 'fen', name: 'Feyenoord',     league: 'Eredivisie', badge: wiki('Feyenoord_logo.svg') },

  // ── Primeira Liga ─────────────────────────────────────────────────────────
  { id: 'por2', name: 'FC Porto',    league: 'Primeira Liga', badge: wiki('FC_Porto.svg') },
  { id: 'ben',  name: 'Benfica',     league: 'Primeira Liga', badge: wiki('SL_Benfica_logo.svg') },
  { id: 'scp',  name: 'Sporting CP', league: 'Primeira Liga', badge: wiki('Sporting_CP_–_Badge,_2021.svg') },

  // ── Brasileirão ───────────────────────────────────────────────────────────
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
