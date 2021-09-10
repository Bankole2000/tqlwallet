export default {
  user: (state) => {
    return state.user
  },
  userIsVerified: (state) => {
    let { user } = state;
    if (!user.gender || !user.firstname || !user.lastname || !user.country || !user.state || !user.city || !user.address || !user.bvn || !user.bank || !user.accountNo) {
      return false
    } else {
      return true;
    }
  },
  activity: (state) => {
    return state.activity;
  }
}