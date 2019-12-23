import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import user from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
  },
  plugins: [
    createPersistedState({
      key: "@Barber:user",
      paths: ["user.userStore", "user.barber", 'user.getbarber']
    })
  ],
  state: {},
  mutations: {},
  actions: {}
});