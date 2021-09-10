import API from '@/api';

export default {
  setTransactionAmount: async ({ commit }, amount) => {
    commit('SET_TXN_AMOUNT', amount)
  },
  setTransactionDescription: async ({ commit }, desc) => {
    commit('SET_TXN_DESC', desc)
  },
  getStatementByPeriod: async ({ commit, rootState }, period = { start: "", end: "" }) => {
    console.log({ commit, period });
    const authToken = localStorage.getItem('tqlWalletAppToken');

    const res = await API.Transactions.getStatementByPeriod(period, authToken || rootState.user.token);
    const { data, error, message } = await res.json();
    console.log({ data, error });
    return { data, error, message }
    // if (!error) {
    //   commit('SET_TRANSACTIONS', data);
    // }
    // return { data, error };
  },
  getUserTransactions: async ({ commit, rootState }) => {
    const authToken = localStorage.getItem('tqlWalletAppToken');
    console.log({ authToken, rootState });
    const res = await API.Transactions.getTransactions(authToken || rootState.user.token);
    const { data, error, message } = await res.json();
    if (!error) {
      commit('SET_TRANSACTIONS', data);
    }
    return { data, error, message };
  }
}