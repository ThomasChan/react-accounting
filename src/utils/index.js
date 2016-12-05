
import Request from 'superagent'

export const getData = async (url, callback) => {
  let res = await Request.get(url)
  if (res.status === 200) {
    callback({
      isLoading: false,
      ...res.body
    })
  }
}

export const sendData = async (url, payload, callback) => {
  callback({ isLoading: true })
  let res = await Request.post(url).send(payload)
  if (res.status === 200) {
    callback({ isLoading: false })
  }
}
