<template>
  <img :src="defaultImg" :alt="alt"/>
</template>
<script>
  import mixins from 'mixins/index'
  export default {
    name: 'ULazyImg',
    mixins: [mixins],
    props: {
      src: {
        type: String,
        required: true
      },
      defaultImg: {
        type: String,
        default () {
          return ''
        }
      },
      alt: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        url: '',
        imgObj: null,
        i: 0
      }
    },
    methods: {
      show () {
        const {src, i} = this
        if (src) {
          this.imgObj = document.createElement('img')
          console.log(this.src)
          this.imgObj.onload = () => {
            this.url = this.src
            this.imgObj = null
            this.$emit('onload', this)
          }
          this.imgObj.onerror = () => {
            this.imgObj = null
            if (i < 5) {
              this.show()
              this.i++
            } else {
              this.$emit('onerror', this)
            }
          }
          this.imgObj.src = this.src
        }
      }
    }
  }
</script>
