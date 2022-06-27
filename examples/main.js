import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import ElementVTooltip from '../src/index'

Vue.use(ElementVTooltip)

new Vue({
  render: h => h(App),
}).$mount('#app')
