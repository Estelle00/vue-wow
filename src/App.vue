<template>
  <div class="demo">
    <UAnimateContainer class="dowebok" :target="getTarget">
      <h1>vue-wow.js - 让页面滚动更有趣</h1>
      <p class="txt">vue-wow.js 能让页面滚动时显示动画，使页面更有趣。</p>
      <div class="dowebok">
        <div class="row">
          <UAnimate name="rollIn" class="wow bg-blue"></UAnimate>
          <UAnimate name="bounceInDown" class="wow bg-green"
            >vue-wow.js</UAnimate
          >
          <UAnimate name="lightSpeedIn" class="wow bg-purple"></UAnimate>
        </div>

        <div class="row">
          <UAnimate name="rollIn" class="wow bg-yellow" delay="0.5s"
            >简单易用</UAnimate
          >
          <UAnimate
            name="pulse"
            class="wow bg-red"
            :iteration="5"
            duration="0.15s"
          ></UAnimate>
          <UAnimate name="bounceInRight" class="wow bg-blue">轻量级</UAnimate>
        </div>

        <div class="row">
          <UAnimate name="bounceInLeft" class="wow bg-green"></UAnimate>
          <UAnimate name="flipInX" class="wow bg-purple">vue-wow.js</UAnimate>
          <UAnimate name="bounceInRight" class="wow bg-yellow"></UAnimate>
        </div>

        <div class="row">
          <UAnimate name="rollIn" class="wow bg-blue">无需 第三方组件</UAnimate>
          <UAnimate
            name="shake"
            class="wow bg-red"
            :iteration="5"
            duration="0.15s"
          ></UAnimate>
          <UAnimate name="swing" class="wow bg-purple" :iteration="2"
            >纯vue组件</UAnimate
          >
        </div>

        <div class="row">
          <UAnimate name="rollIn" class="wow bg-red"></UAnimate>
          <UAnimate name="bounceInU" class="wow bg-yellow" delay="0.5s"
            >vue-wow.js</UAnimate
          >
          <UAnimate
            name="lightSpeedIn"
            class="wow bg-green"
            delay="0.5s"
            duration="0.15s"
          ></UAnimate>
        </div>

        <div class="row">
          <UAnimate name="bounceInLeft" class="wow bg-purple"
            >推荐使用</UAnimate
          >
          <UAnimate
            name="pulse"
            class="wow bg-blue"
            :iteration="5"
            duration="0.25s"
            >animate.css</UAnimate
          >
          <UAnimate name="lightSpeedIn" class="wow bg-yellow"
            >多种动画</UAnimate
          >
        </div>

        <div class="row">
          <UAnimate
            name="bounce"
            class="wow bg-green"
            :iteration="5"
            duration="0.15s"
          ></UAnimate>
          <UAnimate name="bounceInUp" class="wow bg-red">vue-wow.js</UAnimate>
          <UAnimate name="bounceInRight" class="wow bg-purple"></UAnimate>
        </div>

        <div class="row">
          <UAnimate name="rollIn" class="wow bg-red" delay="0.5s"
            >无需 第三方组件！？</UAnimate
          >
          <UAnimate
            name="bounceInDown"
            class="wow bg-green"
            delay="1s"
          ></UAnimate>
          <UAnimate name="bounceInRight" class="wow bg-yellow" delay="1.5s"
            >谢谢</UAnimate
          >
        </div>
      </div>
    </UAnimateContainer>
  </div>
</template>
<style lang="less">
@import "./animate";
* {
  margin: 0;
  padding: 0;
}
.demo {
  max-height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
}
body h1 {
  width: 100%;
  margin: 80px 0;
  font-size: 50px;
  font-weight: 500;
  text-align: center;
}
body .txt {
  margin: 80px 0;
  font-size: 16px;
  text-align: center;
}
.dowebok {
  margin: 0 auto;
}
.dowebok ul {
  list-style-type: none;
}
.dowebok .row {
  font-size: 0;
  text-align: center;
}
.dowebok .wow {
  display: inline-block;
  width: 280px;
  height: 280px;
  margin: 30px 15px 0;
  border-radius: 50%;
  font: 30px/280px "Microsoft Yahei";
  vertical-align: top;
  *display: inline;
  zoom: 1;
}
.bg-green {
  background: #5bd5a0;
}
.bg-blue {
  background: #1daee9;
}
.bg-purple {
  background: #c843a5;
}
.bg-red {
  background: #eb3980;
}
.bg-yellow {
  background: #ffcc35;
}
</style>
<script>
import { UAnimateContainer, UAnimate } from "@/components/index";
export default {
  name: "App",
  components: {
    UAnimateContainer,
    UAnimate
  },
  data() {
    return {};
  },
  methods: {
    getTarget() {
      return this.$el;
    }
  }
};
</script>
