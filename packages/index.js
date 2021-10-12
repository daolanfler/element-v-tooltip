import 'element-ui/lib/theme-chalk/tooltip.css'
import VTooltip from './directive/tooltip'

const install =function(Vue) {
  Vue.directive('tooltip', VTooltip)
}

export default {
  install,
  ElementVTooltip: VTooltip
}