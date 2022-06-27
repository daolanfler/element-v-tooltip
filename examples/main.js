import Vue from 'vue'
import App from './App.vue'
import './main.css'
import 'highlight.js/styles/atom-one-dark.css';
import vuePlugin from "@highlightjs/vue-plugin";
Vue.use(vuePlugin);

Vue.config.productionTip = false

import ElementVTooltip from '../src/index'

Vue.use(ElementVTooltip)

new Vue({
  render: h => h(App),
}).$mount('#app')
