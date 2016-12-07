
import { Api } from '../utils'

const PENDING = 'PENDING'
const SUCCESS = 'SUCCESS'
// Actions
const loadInitData = (
  url,
  type,
  dispatch,
  status = PENDING,
  nextState = {}
) => {
  switch (status) {
    case PENDING:
      const api = new Api()
      api.get(url, (nextState) => {
        dispatch(loadInitData(null, type, null, SUCCESS, {
            ...nextState,
        }))
      })
      break;
  }
  return {
    type: type,
    payload: {
      status: status,
      nextState: nextState,
    }
  }
}

const patchData = (
  url,
  payload,
  type,
  dispatch,
  status = PENDING,
  nextState = {}
) => {
  switch (status) {
    case PENDING:
      const api = new Api()
      api.post(url, payload, (nextState) => {
        dispatch(patchData(null, null, type, null, SUCCESS, {}))
      })
      break;
  }
  return {
    type: type,
    payload: {
      status: status,
      nextState: nextState,
    }
  }
}


export {
  loadInitData,
  patchData,

  PENDING,
  SUCCESS,
}
