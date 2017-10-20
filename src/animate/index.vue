<template>
  <div :style="style" :class="className">
    <slot></slot>
  </div>
</template>
<script>
  export default {
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

      offsetTop (element) {
        const offsetParent = element.offsetParent
        return element.offsetTop + (offsetParent ? this.offsetTop(offsetParent) : 0)
      },
      addEvent (event, fn) {
        const elem = this.$el
        if (elem.addEventListener != null) {
          elem.addEventListener(event, fn, false)
        } else if (elem.attachEvent != null) {
          elem.attachEvent('on' + event, fn)
        } else {
          elem[event] = fn
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
        this.addEvent('animationend', this.resetAnimation)
        this.addEvent('oanimationend', this.resetAnimation)
        this.addEvent('webkitAnimationEnd', this.resetAnimation)
        this.addEvent('MSAnimationEnd', this.resetAnimation)
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
        if (!this.$isServer) {
          const element = window.document.documentElement
          const {offset} = this
          const offsetTop = this.offsetTop(this.$el)
          const viewTop = window.pageYOffset
          const elClientHeight = this.$el.clientHeight
          const innerHeight = window.innerHeight || document.documentElement.clientHeight
          const viewBottom = viewTop + Math.min(element.clientHeight, innerHeight) - offset
          const bottom = offsetTop + elClientHeight
          return offsetTop <= viewBottom && bottom >= viewTop
        }
      }
    },
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
        if (!this.$isServer) {
          return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)
        }
      }
    }
  }
</script>
