export default {
  showToast(context, { show, sclass = "", message = "", timeout = 1000 }) {
    return new Promise(resolve => {
      context.commit("showToast", { show, sclass, message, timeout });
      resolve(timeout);
    });
  },
  showGlobalLoader(context, { show, color = "primary", message = "Loading" }) {
    return new Promise(resolve => {
      context.commit("showGlobalLoader", { show, color, message });
      resolve();
    });
  },
  showGlobalAlert(context, { show, sclass, action = "", message = "", link = "", closable = false, }) {
    return new Promise(resolve => {
      context.commit("showGlobalAlert", { show, sclass, action, message, link, closable });
      resolve();
    });
  },
  togglePageNav(context, show) {
    context.commit('togglePageNav', show);
    // console.log({ showPageNav: show });
  },

}