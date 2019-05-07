# vue-wow
[![Build Status](https://travis-ci.org/Estelle00/vue-wow.svg?branch=master)](https://travis-ci.org/Estelle00/vue-wow)
[![codecov](https://codecov.io/gh/Estelle00/vue-wow/branch/master/graph/badge.svg)](https://codecov.io/gh/Estelle00/vue-wow)
[![vue-wow](https://img.shields.io/npm/v/vue-wow.svg?style=flat-square)](https://www.npmjs.org/package/vue-wow)
[![NPM downloads](http://img.shields.io/npm/dm/vue-wow.svg?style=flat-square)](https://npmjs.org/package/vue-wow)
[![NPM downloads](https://img.shields.io/npm/dt/vue-wow.svg?style=flat-square)](https://npmjs.org/package/vue-wow)
![JS gzip size](http://img.badgesize.io/https://unpkg.com/vue-wow/dist/vue-wow.min.js?compression=gzip&label=gzip%20size:%20JS&style=flat-square)

浏览器可视窗口加载 [DEMO地址](https://estelle00.github.io/vue-wow) 

### Use Setup for Webpack

### install vue-wow

```bash
npm install vue-wow --save
```

### Vue mount

```javascript
// import
import Vue from 'vue'
import VueWow from 'vue-wow'

// mount with global
Vue.use(VueWow)

// mount with component
import {UAnimateContainer, UAnimate} from 'vue-wow'

export default {
  components: {
    UAnimateContainer,
    UAnimate
  }
}
```

### Use in SPA
```vue
<template>
  <u-animate-container>
    <u-animate
      name="fadeIn"
      delay="0s"
      duration="1s"
      :iteration="1"
      :offset="0"
      animateClass="animated"
      :begin="false" 
    >
      测试
    </u-animate>
  </u-animate-container>
</template>
<script>
  export default {
    data () {
      return {
        
      }
    } 
  }
</script>
```

### Api

#### UAnimate

##### Properties
| Name            | Type    | Default | Description |
|-----------------|---------| ------- | ----------- |
| name            | String  | ''      | 组件动画的名称class（推荐填写animate.css，如fadeIn） |
| el            | String  | 'div'      | 组件渲染标签  |
| duration        | String  | 1s      | 动画持续时间  |
| delay           | String  | 0s      | 动画延迟时间  |
| iteration       | Number  | 1       | 动画运行次数  |
| offset          | Number  | 0       | 距离可视区域多少开始执行动画（begin参数必须为false时有效） |
| animateClass    | String  | 'animated' | 	animation.css 动画的 class |
| begin           | Boolean | false    | 是否立即执行 忽略屏幕位置计算 |

#### Events
| Name  | Parameters | Description |
| ----- | ---------- | ----------- |
| start | this       | 动画开始     |
| end   | this       | 动画结束     |

