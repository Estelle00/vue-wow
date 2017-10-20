/**
 * Created by liubingwen on 2017/10/18.
 */
import UAnimateContainer from './index.vue'
import UAnimate from './animate.vue'
export {
  UAnimateContainer,
  UAnimate
}
function install (Vue) {
  Vue.components(UAnimateContainer.name, UAnimateContainer)
  Vue.components(UAnimate.name, UAnimate)
}
export default install
