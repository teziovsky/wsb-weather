import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import App from './components/App';
import store from './store/store';
import Theme from '@nativescript/theme';
import { firebase } from '@nativescript/firebase';
import RadSideDrawer from 'nativescript-ui-sidedrawer/vue';

Theme.setMode(Theme.Light);
Vue.use(Vuex);
Vue.use(RadSideDrawer);

Vue.config.silent = !__DEV__;

firebase.init({}).then(
  function () {
    console.log('firebase.init done');
  },
  function (error) {
    console.log('firebase.init error: ' + error);
  },
);

new Vue({
  render: h => h(App),
  store,
}).$start();
