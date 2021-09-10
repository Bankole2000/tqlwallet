export default {
  newTransaction: async (data, token) => {
    return fetch(`${process.env.VUE_APP_API_BASE_URL}/transactions`, {
      method: 'POST',
      headers: {
        "content-type": 'application/json',
        authorization: `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
  },
  getStatementByPeriod: async (period, token) => {
    return fetch(`${process.env.VUE_APP_API_BASE_URL}/statement?start=${period.start}&end=${period.end}`, {
      method: 'GET',
      headers: {
        "content-type": 'application/json',
        authorization: `Bearer ${token}`
      },
    })
  },
  getTransactions: async (token) => {
    return fetch(`${process.env.VUE_APP_API_BASE_URL}/transactions`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  },
  getBalance: async (token) => {
    return fetch(`${process.env.VUE_APP_API_BASE_URL}/balance`, {
      method: 'GET',
      headers: {
        "contentType": 'application/json',
        authorization: `Bearer ${token}`
      },
    })
  },
}