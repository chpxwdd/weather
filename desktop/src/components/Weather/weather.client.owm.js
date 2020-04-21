import * as CONFIG from '../../constants/weather.client'

export default class ClientOWM {
  constructor() {
    this.mode = CONFIG.MODE
    this.units = CONFIG.UNITS
    this.lang = CONFIG.LANG
  }

  /**
   * build query options part
   *
   * @return {String}
   */
  options = () => {
    let options = String()

    if (this.getMode() !== CONFIG.MODE) {
      options = options.concat('&mode=').concat(this.getMode())
    }

    if (this.getLang() !== CONFIG.LANG) {
      options = options.concat('&lang=').concat(this.getLang())
    }

    if (this.getUnits() !== CONFIG.UNITS) {
      options = options.concat('&units=').concat(this.getUnits())
    }

    return options
  }

  /**
   * Build request URL for OpenWeaterMap Request
   * @return {Promise}
   */
  endpoint(type, params) {
    return String()
      .concat(CONFIG.PATH)
      .concat('/')
      .concat(CONFIG.VERSION)
      .concat('/')
      .concat(type)
      .concat('?q=')
      .concat(params)
      .concat(this.options())
      .concat('&appid=')
      .concat(CONFIG.APIKEY)
  }

  /**
   * Set units property
   *
   * @param {String} mode query param for responce units
   */
  setUnits(units) {
    switch (units) {
      case CONFIG.UNITS_STANDART:
        this.units = CONFIG.UNITS_STANDART
        break
      case CONFIG.UNITS_IMPERIAL:
        this.units = CONFIG.UNITS_IMPERIAL
        break
      case CONFIG.UNITS_METRIC:
        this.units = CONFIG.UNITS_METRIC
        break
      default:
        this.units = CONFIG.UNITS
        break
    }
    return this
  }

  /**
   * Get units property
   *
   * @return {String}
   */
  getUnits() {
    return this.units
  }

  /**
   * Set mode property
   *
   * @param {String} mode query param for responce format
   */
  setMode(mode) {
    switch (mode) {
      case CONFIG.MODE_HTML:
        this.mode = CONFIG.MODE_HTML
        break
      case CONFIG.MODE_JSON:
        this.mode = CONFIG.MODE_JSON
        break
      case CONFIG.MODE_XML:
        this.mode = CONFIG.MODE_XML
        break
      default:
        this.mode = CONFIG.MODE
        break
    }
    return this
  }

  /**
   * Get mode property
   *
   * @return {String}
   */
  getMode() {
    return this.mode
  }

  /**
   * Set lang property
   *
   * @param {String} lang
   */
  setLang(lang) {
    switch (lang) {
      case CONFIG.LANG_AR:
        this.lang = CONFIG.LANG_AR
        break
      case CONFIG.LANG_BG:
        this.lang = CONFIG.LANG_BG
        break
      case CONFIG.LANG_CA:
        this.lang = CONFIG.LANG_CA
        break
      case CONFIG.LANG_CZ:
        this.lang = CONFIG.LANG_CZ
        break
      case CONFIG.LANG_DE:
        this.lang = CONFIG.LANG_DE
        break
      case CONFIG.LANG_EL:
        this.lang = CONFIG.LANG_EL
        break
      case CONFIG.LANG_EN:
        this.lang = CONFIG.LANG_EN
        break
      case CONFIG.LANG_FA:
        this.lang = CONFIG.LANG_FA
        break
      case CONFIG.LANG_FI:
        this.lang = CONFIG.LANG_FI
        break
      case CONFIG.LANG_FR:
        this.lang = CONFIG.LANG_FR
        break
      case CONFIG.LANG_GL:
        this.lang = CONFIG.LANG_GL
        break
      case CONFIG.LANG_HR:
        this.lang = CONFIG.LANG_HR
        break
      case CONFIG.LANG_HU:
        this.lang = CONFIG.LANG_HU
        break
      case CONFIG.LANG_IT:
        this.lang = CONFIG.LANG_IT
        break
      case CONFIG.LANG_JA:
        this.lang = CONFIG.LANG_JA
        break
      case CONFIG.LANG_KR:
        this.lang = CONFIG.LANG_KR
        break
      case CONFIG.LANG_LA:
        this.lang = CONFIG.LANG_LA
        break
      case CONFIG.LANG_LT:
        this.lang = CONFIG.LANG_LT
        break
      case CONFIG.LANG_MK:
        this.lang = CONFIG.LANG_MK
        break
      case CONFIG.LANG_NL:
        this.lang = CONFIG.LANG_NL
        break
      case CONFIG.LANG_PL:
        this.lang = CONFIG.LANG_PL
        break
      case CONFIG.LANG_PT:
        this.lang = CONFIG.LANG_PT
        break
      case CONFIG.LANG_RO:
        this.lang = CONFIG.LANG_RO
        break
      case CONFIG.LANG_RU:
        this.lang = CONFIG.LANG_RU
        break
      case CONFIG.LANG_SE:
        this.lang = CONFIG.LANG_SE
        break
      case CONFIG.LANG_SK:
        this.lang = CONFIG.LANG_SK
        break
      case CONFIG.LANG_SL:
        this.lang = CONFIG.LANG_SL
        break
      case CONFIG.LANG_ES:
        this.lang = CONFIG.LANG_ES
        break
      case CONFIG.LANG_TR:
        this.lang = CONFIG.LANG_TR
        break
      case CONFIG.LANG_UA:
        this.lang = CONFIG.LANG_UA
        break
      case CONFIG.LANG_VI:
        this.lang = CONFIG.LANG_VI
        break
      case CONFIG.LANG_ZH_CN:
        this.lang = CONFIG.LANG_ZH_CN
        break
      case CONFIG.LANG_ZH_TW:
        this.lang = CONFIG.LANG_ZH_TW
        break
      default:
        this.lang = CONFIG.LANG
    }
    return this
  }

  /**
   * Get lang property
   *
   * @return {String}
   */
  getLang() {
    return this.lang ? this.lang : CONFIG.LANG
  }

  /**
   * Set apikey property
   *
   * @param {String} apikey query param for auth OpenWeatherMap webservice
   */
  setVersion(version) {
    this.version = version
    return this
  }

  /**
   * Get apikey property
   *
   * @return {String} apikey query param for auth OpenWeatherMap webservice
   */
  getVersion() {
    return this.version ? this.version : CONFIG.VERSION
  }
}
