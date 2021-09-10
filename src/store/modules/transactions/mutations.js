export default {
  SET_TXN_AMOUNT: (state, amount) => {
    state.newTransaction.amount = amount;
  },
  SET_TXN_DESC: (state, desc) => {
    state.newTransaction.description = desc;
  },
  SET_TRANSACTIONS: (state, transactions) => {
    state.transactions = transactions;
  }
}