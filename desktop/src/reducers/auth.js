import { AUTH_GET_ERRORS, AUTH_SET_CURRENT } from '../constants/auth'

const initialState = {
  current: null,
  errors: {},
}

export default function auth(state = initialState, { type, payload }) {
  switch (type) {
    case AUTH_SET_CURRENT:
      return {
        ...state,
        current: payload,
      }

    case AUTH_GET_ERRORS:
      return {
        ...state,
        errors: payload,
      }

    default:
      return state
  }
}
