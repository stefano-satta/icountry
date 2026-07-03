/*
export interface Country {
    name:         Name;
    tld:          string[];
    cca2:         string;
    ccn3:         string;
    cca3:         string;
    cioc:         string;
    independent:  boolean;
    status:       string;
    unMember:     boolean;
    currencies:   Currencies;
    idd:          Idd;
    capital:      string[];
    altSpellings: string[];
    region:       string;
    subregion:    string;
    languages:    Languages;
    translations: { [key: string]: Translation };
    latlng:       number[];
    landlocked:   boolean;
    borders:      string[];
    area:         number;
    demonyms:     Demonyms;
    flag:         string;
    maps:         Maps;
    population:   number;
    gini:         Gini;
    fifa:         string;
    car:          Car;
    timezones:    string[];
    continents:   string[];
    flags:        Flags;
    coatOfArms:   CoatOfArms;
    startOfWeek:  string;
    capitalInfo:  CapitalInfo;
    postalCode:   PostalCode;
}

export interface CapitalInfo {
    latlng: number[];
}

export interface Car {
    signs: string[];
    side:  string;
}

export interface CoatOfArms {
    png: string;
    svg: string;
}

export interface Currencies {
    [key: string]: TypeCurrency;
}

export interface TypeCurrency {
    name:   string;
    symbol: string;
}

export interface Demonyms {
    eng: Eng;
    fra: Eng;
}

export interface Eng {
    f: string;
    m: string;
}

export interface Flags {
    png: string;
    svg: string;
    alt: string;
}

export interface Gini {
    [key: string]: number;
}

export interface Idd {
    root:     string;
    suffixes: string[];
}

export interface Languages {
    [key:string]: string;
}

export interface Maps {
    googleMaps:     string;
    openStreetMaps: string;
}

export interface Name {
    common:     string;
    official:   string;
    nativeName: NativeName;
}

export interface NativeName {
    ita: Translation;
}

export interface Translation {
    official: string;
    common:   string;
}

export interface PostalCode {
    format: string;
    regex:  string;
}

*/

export interface CityWeather {
    name: string;
    state: string;
    country: string;
    lat?: number;
    lon?: number;
}

export interface Meteo {
    coord: Coord
    weather: Weather[]
    base: string
    main: MainWeather
    visibility: number
    wind: Wind
    clouds: Clouds
    dt: number
    sys: Time
    timezone: number
    id: number
    name: string
    cod: number
  }

  export interface Coord {
    lon: number
    lat: number
  }

  export interface Weather {
    id: number
    main: string
    description: string
    icon: string
  }

  export interface MainWeather {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level: number
    grnd_level: number
  }

  export interface Wind {
    speed: number
    deg: number
    gust: number
  }

  export interface Clouds {
    all: number
  }

  export interface Time {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }



export type Continent = 'europe' | 'america' | 'asia' | 'oceania' | 'africa';


export interface CountryResponse {
    data: Data
}

export interface Data {
    objects: Country[]
    meta: PaginationMeta
}

export interface Country {
    names: Names
    codes: Codes
    capitals: Capital[]
    flag: Flag
    region: string
    subregion: string
    area: Area
    assets: unknown[]
    borders: unknown[]
    calling_codes: string[]
    cars: Cars
    classification: Classification
    continents: string[]
    coordinates: Coordinates
    currencies: Currency[]
    date: CountryDate
    demonyms: Demonyms
    economy: Economy
    government_type: string
    landlocked: boolean
    languages: Language[]
    leaders: Leader[]
    links: Links
    memberships: Memberships
    number_format: NumberFormat
    parent: Parent
    population: number
    postal_code: PostalCode
    timezones: string[]
    tlds: string[]
    units: Units
    uuid: string
    _match: Match[]
    _meta: CountryMeta
}

export interface Names {
    alternates: string[]
    common: string
    native: Native
    official: string
    translations: Translations
}

export interface Translation {
    common: string
    official: string
}

// Codici lingua ISO 639-3 presenti nel dataset.
// Se l'API può aggiungere lingue non elencate qui, sostituisci con:
// export type Translations = Partial<Record<string, Translation>>
export type LanguageCode =
    | 'ara' | 'bre' | 'ces' | 'cym' | 'deu' | 'est' | 'fas' | 'fin'
    | 'fra' | 'hrv' | 'hun' | 'ind' | 'ita' | 'jpn' | 'kor' | 'nld'
    | 'pol' | 'por' | 'rus' | 'slk' | 'spa' | 'srp' | 'swe' | 'tur'
    | 'urd' | 'zho'

export type Translations = Record<LanguageCode, Translation>

// "native" ha chiavi dinamiche (dipende dalle lingue ufficiali del paese)
export interface Native {
    [key: string]: Translation
}

export interface Codes {
    alpha_2: string
    alpha_3: string
    ccn3: string
    cioc: string
    fifa: string
    fips: string
    gec: string
}

export interface Capital {
    attributes: Attributes
    coordinates: Coordinates
    name: string
}

export interface Attributes {
    administrative: boolean
    constitutional: boolean
    executive: boolean
    judicial: boolean
    legislative: boolean
    primary: boolean
}

export interface Coordinates {
    lat: number
    lng: number
}

export interface Flag {
    colors: Colors
    description: string
    emoji: string
    html_entity: string
    unicode: string
    url_png: string
    url_svg: string
}

export interface Colors {
    dominant: string
    palette: Palette[]
    prominent: string
    swatches: Swatches
}

export interface Palette {
    hex: string
    proportion: number
}

export interface Swatches {
    dark_muted: string | null
    dark_vibrant: string | null
    light_muted: string
    light_vibrant: string
    muted: string
    vibrant: string
}

export interface Area {
    kilometers: number
    miles: number
}

export interface Cars {
    driving_side: string
    signs: string[]
}

export interface Classification {
    dependency: boolean
    dependency_type: string
    disputed: boolean
    iso_status: string
    sovereign: boolean
    un_member: boolean
    un_observer: boolean
}

export interface Currency {
    code: string
    name: string
    symbol: string
}

export interface CountryDate {
    academic_year_start: AcademicYearStart
    fiscal_year_start: FiscalYearStart
    start_of_week: string
}

export interface AcademicYearStart {
    day: number
    month: number
}

export interface FiscalYearStart {
    corporate: Corporate
    government: Government
    personal: Personal
}

export interface Corporate {
    basis: string
    day: number
    month: number
}

export interface Government {
    day: number
    month: number
}

export interface Personal {
    day: number
    month: number
}

export interface Demonym {
    f: string
    m: string
}

export interface Demonyms {
    eng: Demonym
    fra: Demonym
}

export interface Economy {
    gini_coefficient: GiniCoefficient
}

// Chiavi anno dinamiche: evita di dover rigenerare il tipo ogni anno
export type GiniCoefficient = Record<string, number>

export interface Language {
    bcp47: string
    iso639_1: string
    iso639_2b: string
    iso639_2t: string
    iso639_3: string
    name: string
    native_name: string
}

export interface Leader {
    message: string
    sample: string
}

export interface Links {
    google_maps: string
    official: string
    open_street_maps: string
    wikipedia: string
}

export interface Memberships {
    african_union: boolean
    arab_league: boolean
    asean: boolean
    brics: boolean
    commonwealth: boolean
    eu: boolean
    eurozone: boolean
    g20: boolean
    g7: boolean
    nato: boolean
    oecd: boolean
    opec: boolean
    schengen: boolean
    un: boolean
}

export interface NumberFormat {
    decimal_separator: string
    thousands_separator: string
}

export interface Parent {
    alpha_2: string
    alpha_3: string
}

export interface PostalCode {
    format: string
    regex: string
}

export interface Units {
    measurement_system: string
    temperature_scale: string
}

export interface Match {
    path: string
    value: string
}

export interface CountryMeta {
    lastUpdatedTimestamp: number
}

export interface PaginationMeta {
    total: number
    count: number
    limit: number
    offset: number
    more: boolean
    request_id: string
    duration: number
}

// Tipo "leggero" utile se il frontend consuma solo un sottoinsieme dei campi,
// evitando di portarsi dietro l'intero schema in ogni componente.
export type CountrySummary = Pick<
    Country,
    'names' | 'flag' | 'population' | 'region' | 'subregion' | 'capitals'
>