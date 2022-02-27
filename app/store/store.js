import Vue from 'nativescript-vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    email: '',
  },
  mutations: {
    setEmail(state, value) {
      state.email = value;
    },
  },
  actions: {},
});
