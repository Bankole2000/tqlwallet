export default {
  login: async (email, password) => {
    return fetch(`${process.env.VUE_APP_API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
  },
  signup: async (email, password) => {
    return fetch(`${process.env.VUE_APP_API_BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
  },
  updateProfile: async (data, token) => {
    return fetch(`${process.env.VUE_APP_API_BASE_URL}/update-profile`, {
      method: 'POST',
      headers: {
        "content-type": 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
  },
  getActivity: async (data, token) => {
    let queryString;
    if (data) {
      data.from = new Date(data.from).toISOString()
      if (data.to) {
        data.to = new Date(data.to).toISOString()
      }
      queryString = `${data ? '?' : ''}${data.from ? 'from=' : ''}${data.from}${data.from && data.to ? '&to=' : ''}${data.to}`
    } else {
      queryString = ''
    }
    return fetch(`${process.env.VUE_APP_API_BASE_URL}/activity${queryString}`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },
  verifyToken: async (token) => {
    // const token = localStorage.getItem('tqlWalletAppToken')
    return fetch(`${process.env.VUE_APP_API_BASE_URL}/verify-token`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }
}