export const VERSION = '2.5'
export const APIKEY = 'c15053e7a024be38ee66e8c9cc995324'
export const PATH = 'https://api.openweathermap.org/data'

export const UNITS = {
  DEFAULT: 'standart',
  AVAILABLE: {
    METRIC: 'metric',
    STANDART: 'standart',
    IMPERIAL: 'imperial',
  },
}

export const MODE = {
  DEFAULT: 'json',
  AVAILABLE: {
    XML: 'xml',
    JSON: 'json',
    HTML: 'html',
  },
}

export const LANG = {
  DEFAULT: 'en',
  AVAILABLE: {
    AR: 'ar', // 'Arabic'
    BG: 'bg', // 'Bulgarian'
    CA: 'ca', // 'Catalan'
    CZ: 'cz', // 'Czech'
    DE: 'de', // 'German'
    EL: 'el', // 'Greek'
    EN: 'en', // 'English'
    FA: 'fa', // 'Persian (Farsi)'
    FI: 'fi', // 'Finnish'
    FR: 'fr', // 'French'
    GL: 'gl', // 'Galician'
    HR: 'hr', // 'Croatian'
    HU: 'hu', // 'Hungarian'
    IT: 'it', // 'Italian'
    JA: 'ja', // 'Japanese'
    KR: 'kr', // 'Korean'
    LA: 'la', // 'Latvian'
    LT: 'lt', // 'Lithuanian'
    MK: 'mk', // 'Macedonian'
    NL: 'nl', // 'Dutch'
    PL: 'pl', // 'Polish'
    PT: 'pt', // 'Portuguese'
    RO: 'ro', // 'Romanian'
    RU: 'ru', // 'Russian'
    SE: 'se', // 'Swedish'
    SK: 'sk', // 'Slovak'
    SL: 'sl', // 'Slovenian'
    ES: 'es', // 'Spanish'
    TR: 'tr', // 'Turkish'
    UA: 'ua', // 'Ukrainian'
    VI: 'vi', // 'Vietnamese'
    ZH_CN: 'zh_cn', // 'Chinese Simplified'
    ZH_TW: 'zh_tw', // 'Chinese Traditional'
  },
}

function setMode(mode) {
  if (!mode || mode === MODE.DEFAULT || !MODE.AVAILABLE[mode]) {
    return String()
  }

  return String()
    .concat('&mode=')
    .concat(mode)
}
function setLang(lang) {
  if (!lang || lang === LANG.DEFAULT || !LANG.AVAILABLE[lang]) {
    return String()
  }

  return String()
    .concat('&lang=')
    .concat(lang)
}

function setUnits(units) {
  if (!units || units === UNITS.DEFAULT || !UNITS.AVAILABLE[units]) {
    return String()
  }

  return String()
    .concat('&units=')
    .concat(units)
}
// ------------------------------------------------------------------------
// exports
// ------------------------------------------------------------------------
export default function openWeaterMapRequest(requestAPI, values, params) {
  return String()
    .concat(PATH)
    .concat('/')
    .concat(VERSION)
    .concat('/')
    .concat(requestAPI)
    .concat('?')
    .concat('q=')
    .concat(values)
    .concat(setMode(params.mode))
    .concat(setLang(params.lang))
    .concat(setUnits(params.units))
    .concat('&appid=')
    .concat(APIKEY)
}

openWeaterMapRequest.currentWeather = function currentWeather(
  cityName,
  countryCode
) {
  return openWeaterMapRequest(
    'weather',
    String()
      .concat(cityName)
      .concat(',')
      .concat(countryCode)
  )
}
openWeaterMapRequest.forecast = function currentWeather(cityName, countryCode) {
  return openWeaterMapRequest(
    'forecast',
    String()
      .concat(cityName)
      .concat(',')
      .concat(countryCode)
  )
}
