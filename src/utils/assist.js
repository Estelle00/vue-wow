/**
 * Created by liubingwen on 2017/10/23.
 */
import Vue from 'vue'
const isServer = Vue.prototype.$isServer
// 判断是否为手机
export const isMobile = () => {
  if (!isServer) {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)
  }
}
