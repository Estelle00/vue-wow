# vue-wow
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
import {UAnimateContainer, UAnimate} from 'vue'

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

