import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import store from './store'


library.add(faSearch)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueAxios,axios)
Vue.config.productionTip = false

export const eBus = new Vue();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
