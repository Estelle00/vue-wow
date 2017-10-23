<template>
  <div :style="style" :class="className">
    <slot></slot>
  </div>
</template>
<script>
  import {isVisible, on, off} from 'utils/dom'
  import mixins from 'mixins/index'
  export default {
    mixins: [mixins],
    name: 'UAnimate',
    props: {
      duration: {
        type: String,
        default: '1s'
      },
      delay: {
        type: String,
        default: '0s'
      },
      iteration: {
        type: Number,
        default: 1
      },
      name: {
        type: String,
        default: ''
      },
      offset: {
        type: Number,
        default: 0
      },
      animateClass: {
        type: String,
        default: 'animated'
      },
      // 是否立即执行 忽略屏幕位置计算
      begin: {
        type: Boolean,
        default: false
      },
      scrollListen: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        style: {
          visibility: 'hidden'
        },
        className: {
        },
        end: false,
        status: false
      }
    },
    created () {
      if (!this.$isServer) {
        const {disabled} = this
        if (disabled) {
          this.style.visibility = 'visible'
        } else {
          this.applyStyle(true)
        }
        this.parent.setVM(this)
      }
    },
    mounted () {
      this.start()
    },
    methods: {
      animate (callback) {
        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(callback)
        } else {
          callback()
        }
      },
      applyStyle (hidden = false) {
        this.animate(() => {
          this.customStyle(hidden)
        })
      },
      customStyle (hidden) {
        const {duration, delay, iteration, style, name, animateClass} = this
        this.className = {
          [name]: name && !hidden,
          [animateClass]: animateClass && !hidden
        }
        this.style = {
          ...style,
          visibility: hidden ? 'hidden' : 'visible',
          animationDuration: duration,
          animationDelay: delay,
          animationIterationCount: iteration
        }
      },
      resetAnimation (event) {
        this.parent.removeVM(this)
        const {animateClass} = this
        if (event.type.toLowerCase().indexOf('animationend') >= 0) {
          this.className = {}
          this.style = {}
          this.end = true
          this.status = false
          this.$emit('end', this)
        }
      },
      show () {
        const {status, end} = this
        if (status || end) return ''
        this.status = true
        this.$emit('start', this)
        this.applyStyle()
        /*
        this.className = {
          ...className,
          [animateClass]: true
        }
        */
        // this.emitEvent(box, this.wowEvent);
        const elem = this.$el
        const eventArr = ['animationend', 'oanimationend', 'webkitAnimationEnd', 'MSAnimationEnd']
        eventArr.forEach(event => {
          on(elem, event, this.resetAnimation)
        })
      },
      start () {
        // 执行运动校验
        console.log(1)
        const {begin} = this
        if (begin || this.isVisible()) {
          this.show()
          return false
        } else {
          return true
        }
      },
      isVisible () {
        const {scrollListen, offset} = this
        if (!scrollListen) return false
        return isVisible(this.$el, offset)
      }
    },
    computed: {
    }
  }
</script>
