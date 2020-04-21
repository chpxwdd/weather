import { SET_REQUEST, GET_ERRORS } from '../constants/weather'

const getErrors = data => {
  return {
    type: GET_ERRORS,
    payload: data,
  }
}

const setRequest = data => {
  return {
    type: SET_REQUEST,
    payload: data,
  }
}

const weather = { setRequest, getErrors }
export default weather
