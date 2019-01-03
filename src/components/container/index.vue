<template>
  <section>
    <slot></slot>
  </section>
</template>
<script>
  import {on, off} from 'utils/dom'
  import {isMobile} from 'utils/assist'
  export default {
    name: 'UAnimateContainer',
    props: {
      config: {
        type: Object,
        default () {
          return {
            mobile: true
          }
        }
      },
      live: {
        type: Boolean,
        default: true
      },
      target: {
        type: Function,
        default: () => window
      }
    },
    data () {
      return {
        conf: Object.assign({}, {
          mobile: true
        }, this.config),
        all: [],
        vmArr: [],
        scrolled: false,
        interval: null
      }
    },
    mounted () {
      this.start()
    },
    methods: {
      start () {
        if (!this.$isServer) {
          if (!this.disabled) {
            const targetNode = this.target();
            on(targetNode, 'scroll', this.scrollHandler)
            on(window, 'resize', this.scrollHandler)
            this.interval = setInterval(this.scrollCallback, 50)
          }
        }
      },
      setVM (vm) {
        const index = this.all.findIndex(item => item._uid === vm._uid)
        if (index < 0) {
          this.all.push(vm)
          this.vmArr.push(vm)
        }
      },
      removeVM (vm) {
        const index = this.vmArr.findIndex(item => item._uid === vm._uid)
        if (index > -1) {
          this.vmArr.splice(index, 1)
        }
      },
      scrollHandler () {
        this.scrolled = true
      },
      scrollCallback () {
        if (this.scrolled) {
          this.scrolled = false
          this.vmArr.map(vm => {
            try {
              const status = vm.start()
              if (!status) {
                this.removeVM(vm)
              }
            } catch (e) {
              console.error('子组件需start方法')
            }
          })
          if (this.vmArr.length < 1 && !this.config.live) {
            // 停止监听
            this.stop()
          }
        }
      },
      stop () {
        this.stopped = true
        const targetNode = this.target()
        off(targetNode, 'scroll', this.scrollHandler)
        off(window, 'resize', this.scrollHandler)
        if (this.interval !== null) {
          clearInterval(this.interval)
        }
      }
    },
    provide () {
      return {
        setVM: this.setVM,
        removeVM: this.removeVM,
        disabled: this.disabled,
        target: this.target
      }
    },
    destroyed () {
      this.stop()
    },
    computed: {
      disabled () {
        return !this.conf.mobile && isMobile()
      }
    }
  }
</script>
