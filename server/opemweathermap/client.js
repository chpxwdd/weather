const DELIMITER = {
	ARGS: '/',
	QUERY: '?',
	PARAMS: '&',
}

const VERSION = '2.5'
const APIKEY = 'c15053e7a024be38ee66e8c9cc995324'
const PATH = 'https://api.openweathermap.org/data'

const requests = {
	weather: {
		callAPI: 'weather',
		params: {
			cityName: {
				mandatory: true,
				callbackCheck: null,
			},
			countryCode: {
				mandatory: true,
				callbackCheck: null,
			},
		},
		description: 'current weather data in once lovation',
	},
}
const UNITS = {
	DEFAULT: 'standart',
	AVAILABLE: {
		METRIC: 'metric',
		STANDART: 'standart',
		IMPERIAL: 'imperial',
	},
}
const MODE = {
	DEFAULT: 'json',
	AVAILABLE: {
		XML: 'xml',
		JSON: 'json',
		HTML: 'html',
	},
}
const LANG = {
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

/** */
function getURL(callAPI) {
	return String()
		.concat(PATH)
		.concat(DELIMITER.ARGS)
		.concat(VERSION)
		.concat(DELIMITER.ARGS)
		.concat(callAPI)
		.concat(DELIMITER.QUERY)
		.concat('appid=')
		.concat(APIKEY)
}

/**
 *
 * @param {String} call
 * @param {Object} params
 * @param {Obgect} options
 */
function openWeaterMapRequest(call, params, options = {}) {

	console.log("params ", params)
	console.log("options", options)
	console.log("call", call)
	let request = String()
		.concat(PATH)
		.concat(DELIMITER.ARGS)
		.concat(VERSION)
		.concat(DELIMITER.ARGS)
		.concat(call)
		.concat(DELIMITER.QUERY)
		.concat('appid=')
		.concat(APIKEY)

	for (param in params) {
		request = request
			.concat(DELIMITER.PARAMS)
			.concat(param)
			.concat('=')
			.concat(params[param])
	}

	// if (options.hasOwnProperty('mode') && options.mode !== MODE.DEFAULT && MODE.AVAILABLE.hasOwnProperty(options.mode.toUpperCase())) {
	if (options.hasOwnProperty('mode') && options.mode !== MODE.DEFAULT) {
		request = request
			.concat(DELIMITER.PARAMS)
			.concat('mode=')
			.concat(options.mode)
	}

	// if (options.hasOwnProperty('lang') && options.lang !== LANG.DEFAULT && LANG.AVAILABLE.hasOwnProperty(options.lang.toUpperCase())) {
	if (options.hasOwnProperty('lang') && options.lang !== LANG.DEFAULT) {
		request = request
			.concat(DELIMITER.PARAMS)
			.concat('lang=')
			.concat(options.lang)
	}

	// if (options.hasOwnProperty('units') && options.units !== UNITS.DEFAULT && UNITS.AVAILABLE.hasOwnProperty(options.units.toUpperCase())) {
	if (options.hasOwnProperty('units') && options.units !== UNITS.DEFAULT) {
		request = request
			.concat(DELIMITER.PARAMS)
			.concat('units=')
			.concat(options.units)
	}
console.log(request)
	return request
}

/** /weather?q={cityName},{countryCode}  */
openWeaterMapRequest.currentWeather = function currentWeather(cityName, countryCode, options = {}) {
	const params = {
		q: String()
			.concat(cityName)
			.concat(',')
			.concat(countryCode),
	}
	return openWeaterMapRequest('weather', params, options)
}

module.exports = openWeaterMapRequest
