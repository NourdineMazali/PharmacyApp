import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'

let dateFormat = require('dateformat');

import './../../dist/electron/app'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));


Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
window.Vue = Vue;

Vue.prototype.$meds = [
    {'id' : 1,'name':'Diazepam'},
    {'id': 2, 'name':'Drug2'},
];
Vue.prototype.$medsTypes = [
    {'id': 1,'name':'Hypnotics and sedatives'},
    {'id': 2, 'name':'Antidepressants'},
    {'id': 3, 'name':'Opioid analgesics'},
    {'id': 4, 'name':'Psychostimulants'},
    {'id': 5, 'name':'Anxiolytics'}
];

Vue.prototype.$schedules = [
    {'id': 1, 'name':'Daily'},
    {'id': 2, 'name':'Weekly'},
    {'id': 3, 'name':'Fortnightly'},
    {'id': 4, 'name':'Monthly'},
    {'id': 5, 'name':'Custom'}
];


Vue.prototype.$apiHost = 'http://localhost:3001';

Vue.prototype.$global = new Vue({
    data() {
        return {
            patient: {},
            prescription: {},
            supply: {}
        }
    }
});
Vue.mixin({
    methods: {
        _formatToDate(date) {
            return dateFormat(date, "dddd, mmmm dS, yyyy");
        },
        _formatToTime(date) {
            return dateFormat(date, "h:MM:ss TT");
        }
    }
});
//Vee-Validate
Vue.use(VeeValidate, {errorBagName: 'vErrors', fieldsBagName: 'formFields'});
//global
/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
