import { PAGE_SET_HEADER } from '../constants/page'

const setHeader = data => {
  return {
    type: PAGE_SET_HEADER,
    payload: data,
  }
}

const page = { setHeader }
export default page
