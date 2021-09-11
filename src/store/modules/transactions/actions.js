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
  generateStatementPDF: async ({ rootState }, statement) => {
    statement.forEach(txn => {
      if (txn.amount < 0) {
        txn.amount *= -1
      }
      txn.createdAt = new Date(txn.createdAt).toLocaleString(['en-US'], {
        month: "short",
        day: "2-digit",
        weekday: "short",
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    });
    const res = await API.Transactions.generateStatementPDF(statement, rootState.user.token);
    const { error } = await res.json();
    if (error) {
      console.log({ error });
      return false;
    } else {
      const pdfRes = await API.Transactions.getStatementPDF(rootState.user.token)
      console.log({ pdfRes });
      const data = await pdfRes.blob();
      const pdfBlob = new Blob([data], { type: 'application/pdf' })
      console.log({ pdfBlob });
      // pdfRes.data;
      const pdfURL = URL.createObjectURL(pdfBlob);
      return pdfURL;
    }
  },
  getStatementPDF: async ({ rootState }) => {
    console.log({ token: rootState.user.token })
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