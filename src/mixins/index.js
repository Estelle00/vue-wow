/**
 * Created by liubingwen on 2017/10/23.
 */
import {isMobile} from 'utils/assist'
export default {
  computed: {
    parent () {
      let parent = this.$parent
      while (parent.$options.name !== 'UAnimateContainer') {
        parent = parent.$parent
      }
      return parent
    },
    // 判断是否为手机
    disabled () {
      return isMobile()
    }
  }
}
