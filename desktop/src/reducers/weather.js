import { GET_ERRORS, SET_REQUEST } from '../constants/weather'

const initialState = {
  request: {},
  errors: {},
}

export default function weather(state = initialState, { type, payload }) {
  switch (type) {
    case SET_REQUEST:
      return {
        ...state,
        request: payload,
      }

    case GET_ERRORS:
      return {
        ...state,
        errors: payload,
      }

    default:
      return state
  }
}
