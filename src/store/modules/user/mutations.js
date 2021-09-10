export default {
  SET_USER: (state, payload = null) => {
    state.user = payload
  },
  SET_TOKEN: (state, payload = null) => {
    state.token = payload
  },
  SET_ACTIVITY: (state, payload = null) => {
    state.activity = payload;
  },
  SET_USER_FIRSTNAME: (state, payload) => {
    state.user.firstname = payload
  },
  SET_USER_LASTNAME: (state, payload) => {
    state.user.lastname = payload
  },
  SET_USER_GENDER: (state, payload) => {
    state.user.gender = payload
  },
  SET_USER_COUNTRY: (state, payload) => {
    state.user.country = payload
  },
  SET_USER_STATE: (state, payload) => {
    state.user.state = payload
  },
  SET_USER_CITY: (state, payload) => {
    state.user.city = payload
  },
  SET_USER_ADDRESS: (state, payload) => {
    state.user.address = payload
  },
  SET_USER_ZIPCODE: (state, payload) => {
    state.user.zipCode = payload
  },
  SET_USER_BANK: (state, payload) => {
    state.user.bank = payload
  },
  SET_USER_BVN: (state, payload) => {
    state.user.bvn = payload
  },
  SET_USER_ACCOUNTNO: (state, payload) => {
    state.user.accountNo = payload
  },
}