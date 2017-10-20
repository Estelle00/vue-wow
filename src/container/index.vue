<template>
  <section>
    <slot></slot>
  </section>
</template>
<script>
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
      }
    },
    data () {
      return {
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
      addEvent (elem, event, fn) {
        if (elem.addEventListener != null) {
          elem.addEventListener(event, fn, false)
        } else if (elem.attachEvent != null) {
          elem.attachEvent('on' + event, fn)
        } else {
          elem[event] = fn
        }
      },
      removeEvent (elem, event, fn) {
        if (elem.removeEventListener !== null) {
          return elem.removeEventListener(event, fn, false)
        } else if (elem.detachEvent !== null) {
          return elem.detachEvent('on' + event, fn)
        } else {
          return delete elem[event]
        }
      },
      start () {
        const {vmArr} = this
        this.addEvent(window, 'scroll', this.scrollHandler)
        this.addEvent(window, 'resize', this.scrollHandler)
        this.interval = setInterval(this.scrollCallback, 50)
      },
      setVM (vm) {
        console.log(vm)
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
            const status = vm.start()
            if (!status) {
              this.removeVM(vm)
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
        this.removeEvent(window, 'scroll', this.scrollHandler)
        this.removeEvent(window, 'resize', this.scrollHandler)
        if (this.interval !== null) {
          clearInterval(this.interval)
        }
      }
    },
    destroyed () {
      this.stop()
    },
    computed: {
    }
  }
</script>
