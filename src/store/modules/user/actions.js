import API from "@/api";
export default {
  async login({ commit }, payload) {
    const res = await API.User.login(payload.email, payload.password);
    const { data, error, message } = await res.json();
    if (!error) {

      commit('SET_TOKEN', data.userToken)
      localStorage.setItem('tqlWalletAppUserState', data.status)
      // if (payload.rememberMe) {

      localStorage.setItem('tqlWalletAppToken', data.userToken);
      // }
      delete data.userToken;
      delete data.password;
      commit('SET_USER', data)
    }
    return { data, error, message };
  },
  async signup({ commit }, payload) {
    const res = await API.User.signup(payload.email, payload.password);
    const { data, error, message } = await res.json();
    console.log({ data, error, message, commit });
    return { data, error, message };
  },
  async logout({ commit, }) {
    commit('SET_ACTIVITY', null);
    commit('SET_USER', null);
    commit('SET_TOKEN', null);
    commit('transactions/SET_TRANSACTIONS', null, { root: true });
    localStorage.removeItem('tqlWalletAppToken');
    localStorage.removeItem('tqlWalletAppUserState');
  },
  async updateUser({ commit, state }, payload) {

    const res = await API.User.updateProfile(payload, state.token)
    const { data, error, message } = await res.json();
    if (!error) {
      delete data.password
      commit('SET_USER', data);
    }
    return { data, error, message }
  },
  async makeTransaction({ state }, payload) {
    const res = await API.Transactions.newTransaction(payload, state.token)
    const { data, error, message } = await res.json();
    return { data, error, message }
  },
  setUserField({ commit }, { field, value }) {
    commit(`SET_USER_${field.toUpperCase()}`, value);
  },
  async getUserActivity({ commit, state }, payload = null) {
    const res = await API.User.getActivity(payload, state.token)
    const { data, error, message } = await res.json();
    if (!error) {
      commit('SET_ACTIVITY', data);
    }
    console.log({ data, error, message });
    return { data, error, message };
  },
  async verifyToken({ commit, state }) {
    const res = await API.User.verifyToken(state.token)
    const { data, error, message } = await res.json();

    commit('SET_USER', data);

    return { data, error, message };
  }
}