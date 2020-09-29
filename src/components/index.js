/**
 * Created by liubingwen on 2017/10/18.
 */
import UAnimateContainer from "./container/index";
import UAnimate from "./animate/index";
function install(app) {
  app.component(UAnimateContainer.name, UAnimateContainer);
  app.component(UAnimate.name, UAnimate);
}
export { UAnimate, UAnimateContainer };
export default {
  version: "3.0.0",
  install,
};
