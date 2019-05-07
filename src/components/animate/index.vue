<template>
  <component :is="el" :style="style" :class="className">
    <slot></slot>
  </component>
</template>
<script>
  import {isVisible, on, off} from 'utils/dom'
  import mixins from 'mixins/index'
  export default {
    mixins: [mixins],
    name: 'UAnimate',
    props: {
      el: {
        type: String,
        default: 'div'
      },
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
      animateClass: {
        type: String,
        default: 'animated'
      }
    },
    data () {
      return {
        style: {
          visibility: 'hidden'
        },
        className: {
        }
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
      }
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
        try {
          this.removeVM(this)
        } catch (e) {
        }
        if (event.type.toLowerCase().indexOf('animationend') >= 0) {
          this.className = {}
          this.style = {}
          this.endCallback()
        }
      },
      show () {
        this.applyStyle()
        const elem = this.$el
        const eventArr = ['animationend', 'oanimationend', 'webkitAnimationEnd', 'MSAnimationEnd']
        eventArr.forEach(event => {
          on(elem, event, this.resetAnimation)
        })
      }
    },
    computed: {
    }
  }
</script>
