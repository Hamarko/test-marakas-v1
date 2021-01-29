const TOKEN_STORAGE_KEY = 'token'

let token = {
  set (token) {
    console.log("Tocen",token)
    let expirationMS = 60 * 60 * 1000
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify({
      'token': token,
      'timestamp': new Date().getTime() + expirationMS
    }))
  },
  get () {
    console.log(localStorage.getItem(TOKEN_STORAGE_KEY))
    let tokenData = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (tokenData) {
      tokenData = JSON.parse(tokenData)
      return tokenData.token
    } else {
      return false
    }
  },
  clear () {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
  },
  validate () {
    if (localStorage.getItem(TOKEN_STORAGE_KEY)) {
      let tokenData = JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEY))
      return new Date().getTime() < tokenData.timestamp
    }

    return false
  }
}

export default token
