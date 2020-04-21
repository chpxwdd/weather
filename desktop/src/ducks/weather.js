// import axios from 'axios'
import openWeaterMapRequest from '../services/openweathermap'
const initialState = {
  request: {},
  responce: null,
}

const SET_REQUEST = 'weather/SET_REQUEST'
const SET_RESPONCE = 'weather/GET_RESPONCE'

// actions
// function setResponce(payload) {
//   return { type: SET_RESPONCE, payload }
// }

// function setRequest(payload) {
//   return { type: SET_REQUEST, payload }
// }

/** Get current weather data from OpenWeatherMap */
function dispatchDoWeather(request) {
  return function(dispatch) {
    // OpenWeatherMap.weather()
  }
}

/** Get 5day/3hour weather data from OpenWeatherMap */
function dispatchDoForecast(request) {
  return function(dispatch) {
    openWeaterMapRequest.currentWeather()
  }
}

// ------------------------------------------------------------------------
// duck exports
// ------------------------------------------------------------------------
export const actionCreators = {
  dispatchDoWeather,
  dispatchDoForecast,
}

export const actionTypes = {
  SET_REQUEST,
  SET_RESPONCE,
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_REQUEST:
      return { ...state, request: payload }

    case SET_RESPONCE:
      return { ...state, responce: payload }

    default:
      return state
  }
}
