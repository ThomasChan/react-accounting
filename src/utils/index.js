
import Request from 'superagent'
import { message } from 'antd'

class Api {

  constructor() {}

  get(url, callback) {
    return (async () => {
      let res = await Request.get(url)
      callback({
        ...res.body
      })
    })()
  }

  post(url, payload, callback) {
    return (async () => {
      let res = await Request.post(url).send(payload)
      callback()
    })()
  }

}

// const api = new Proxy(new Api(), {
//   get: function(target, propKey, receiver) {
//     try {
//       console.log(target, propKey, ...args)
//       return Reflect.get(target, propKey).apply(...args)
//     } catch (Exception) {
//       message.error(Exception)
//     }
//   }
// })
// window.a = api

function numberToMoney(num, isFloat) {
  const money = Number(num)
  if (money > 0) {
    var _num = money.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
    if (!isFloat) {
      return _num.split('.')[0]
    }
    return _num
  }
  if (isFloat) {
      return '0.00'
  }
  return '0'
}

export {Api, numberToMoney}
