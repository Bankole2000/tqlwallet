import store from "@/store";
export default {
  state: "SIGNEDUP",
  value: 1,
  transitions: {
    SIGNEDUP: {
      start() {
        this.changeState('NEW', 2)
      }
    },
    NEW: {
      updateBio: async function (data) {
        console.log({ data });
        // const { firstname, lastname, gender } = data;
        // console.log({ firstname, lastname, gender, store });
        data.status = "BIOUPDATED"
        const { error, message } = await store.dispatch('user/updateUser', data);
        // console.log({ error, message });
        if (!error) {
          this.changeState('BIOUPDATED', 3);
        }
        return { error, message };
      },
      goBack: function () {
        this.changeState('SIGNEDUP', 1)
      }
    },
    BIOUPDATED: {
      updateLocation: async function (data) {
        // const { country, state, city, address, zipCode } = data;
        // console.log({ country, state, city, address, zipCode });
        data.status = "LOCATIONUPDATED"

        const { error, message } = await store.dispatch('user/updateUser', data);
        console.log({ error, message });
        if (!error) {
          this.changeState('LOCATIONUPDATED', 4);
        }
        return { error, message };
      },
      goBack: function () {
        this.changeState('NEW', 2)
      }
    },
    LOCATIONUPDATED: {
      updateBankDetails: async function (data) {
        // const { accountNo, bank, bvn } = data;
        // console.log({ accountNo, bank, bvn });
        data.status = "VERIFIED"
        const { error, message } = await store.dispatch('user/updateUser', data);
        // console.log({ error, message });
        if (!error) {
          this.changeState('VERIFIED', 5);
        }
        return { error, message };
      },
      goBack: function () {
        this.changeState('BIOUPDATED', 3)
      }
    },
    VERIFIED: {
      goBack: function () {
        this.changeState('LOCATIONUPDATED', 4)
      }
    },
  },
  dispatch(actionName, payload) {
    const actions = this.transitions[this.state];

    const action = actions[actionName];
    console.log({ actionName, payload });

    if (action) {
      action.call(this, payload);
    } else {
      console.log("No such action on state machine");
    }
  },
  changeState(newState, value) {
    localStorage.setItem('tqlWalletAppUserState', newState);
    this.state = newState;
    this.value = value
    console.log(`Profile State is - ${newState}`)
  },
  setState(state) {
    const value = Object.keys(this.transitions).indexOf(state) + 1;
    this.changeState(state, value)
  },
  test() {
    console.log(this);
  }
}