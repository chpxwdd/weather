const initialState = { header: { title: 'Weather', lead: 'homepage' } }
const SET_HEADER = 'page/SET_HEADER'

function setHeader(payload) {
  return { type: SET_HEADER, payload }
}

function dispatchHeader(title, lead) {
  return function(dispatch) {
    dispatch(setHeader({ title, lead }))
  }
}

// ------------------------------------------------------------------------
// duck exports
// ------------------------------------------------------------------------
export const actionCreators = {
  dispatchHeader,
}

export const actionTypes = {
  SET_HEADER,
}

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_HEADER:
      return { ...state, header: payload }

    default:
      return state
  }
}
