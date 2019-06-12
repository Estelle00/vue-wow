/**
 * Created by liubingwen on 2017/10/18.
 */
import UAnimateContainer from "./container/index";
import UAnimate from "./animate/index";
function install(Vue) {
  Vue.component(UAnimateContainer.name, UAnimateContainer);
  Vue.component(UAnimate.name, UAnimate);
}
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}
export { UAnimate, UAnimateContainer };
export default install;
