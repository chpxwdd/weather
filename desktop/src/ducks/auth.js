import * as AUTH from '../constants/auth'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { setAuthToken } from '../utils/auth'

const initialState = { current: null, errors: {} }

const GET_ERRORS = 'auth/GET_ERRORS'
const SET_CURRENT = 'auth/SET_CURRENT'

/**
 * action for GET_ERRORS
 *
 * @return Object
 */
function getErrors(payload) {
  return { type: GET_ERRORS, payload }
}

/**
 * action for SET_CURRENT
 *
 * @return {Object}
 */
function setCurrent(payload) {
  return { type: SET_CURRENT, payload }
}

/**
 *
 * Sending auth data to server and responce esult
 *
 * @return {Function}
 */
function dispatchLogin(user) {
  return function(dispatch) {
    axios
      .post(AUTH.API_LOGIN, user)
      .then(response => {
        const { token } = response.data
        localStorage.setItem(AUTH.JWT_TOKEN, token) // This variable has been checked with a page reboot
        setAuthToken(token)
        const decoded = jwt_decode(token)
        // dispatch action
        dispatch(setCurrent(decoded))
      })
      .catch(error => {
        // dispatch action
        dispatch(getErrors(error.response.data))
      })
  }
}

/**
 *
 * Sending user data to server for register new user
 *
 * @return {Function}
 */
function dispatchRegister(user) {
  return function(dispatch) {
    axios
      .post(AUTH.API_REGISTER, user)
      // .then(res => {
      //   // console.log(res)
      //   this.props.history.push(AUTH_ROUTE_LOGIN)
      // })
      .catch(error => {
        dispatch(getErrors(error.response.data))
      })
  }
}

/**
 *
 * Sending user data to server for register new user
 *
 * @return {Function}
 */
function dispatchLogout() {
  return function(dispatch) {
    localStorage.removeItem(AUTH.JWT_TOKEN)
    setAuthToken(false)
    dispatch(setCurrent(null))
  }
}

/**
 *
 * Check expired tome for auth JWToken
 */
function dispatchExpToken() {
  return function(dispatch) {
    const token = localStorage.getItem(AUTH.JWT_TOKEN)
    if (token) {
      setAuthToken(token)
      const decoded = jwt_decode(token)
      const now = Date.now() / 1000

      if (decoded.exp < now) {
        dispatchLogout()
      }

      dispatch(setCurrent(decoded))
    }
  }
}

// ------------------------------------------------------------------------
// duck exports
// ------------------------------------------------------------------------
export const actionCreators = {
  dispatchLogin,
  dispatchRegister,
  dispatchLogout,
  dispatchExpToken,
}

export const actionTypes = {
  SET_CURRENT,
  GET_ERRORS,
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_CURRENT:
      return { ...state, current: payload }

    case GET_ERRORS:
      return { ...state, errors: payload }

    default:
      return state
  }
}
