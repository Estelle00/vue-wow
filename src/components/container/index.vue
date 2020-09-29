<template>
  <section>
    {{ top }}
    <slot></slot>
  </section>
</template>
<script>
import { reactive } from "vue";
import create from "@/utils/create";
import { useEmitter } from "@/use/emitter";
import { useScroller, useListenerScrollTop } from "@/use/scroller";
import { isMobile } from "@/utils/assist";
function useVM() {
  const vmArr = reactive([]);
  const { on } = useEmitter();
  on("animate.container.addVM", (vm) => {
    vmArr.push(vm);
  });
  on("animate.container.removeVM", (vm) => {
    vmArr.splice(vmArr.indexOf(vm), 1);
  });
  return {
    vmArr,
  };
}
export default create({
  name: "animate-container",
  provide() {
    return {
      setVM: this.setVM,
      removeVM: this.removeVM,
      disabled: this.disabled,
      target: this.target,
    };
  },
  inheritAttrs: false,
  props: {
    live: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    // 如未return的变量无法再下一步use中直接使用
    const { vmArr } = useVM();
    const scrollParent = useScroller();
    const { top, on, off } = useListenerScrollTop(scrollParent);
    console.log(top);
    return {
      vmArr,
      scrollParent,
      top,
      on,
      off,
    };
  },
  data() {
    return {
      conf: Object.assign(
        {},
        {
          mobile: true,
        },
        this.config
      ),
      all: [],
      vmArr: [],
      scrolled: false,
      // interval: null,
    };
  },
  computed: {
    disabled() {
      return isMobile();
    },
  },
  mounted() {
    console.log(this.scrollParent);
    // this.start();
  },
  unmounted() {
    this.stop();
  },
  watch: {
    top(val) {
      console.log(val);
    },
  },
  methods: {
    start() {
      // on(this.scrollParent.value, "scroll", this.scrollHandler);
      // on(window, "resize", this.scrollHandler);
      // this.interval = setInterval(this.scrollCallback, 50);
    },
    setVM(vm) {
      // const index = this.all.findIndex((item) => item.uid === vm.uid);
      // if (index < 0) {
      //   this.all.push(vm);
      //   this.vmArr.push(vm);
      // }
    },
    removeVM(vm) {
      // const index = this.vmArr.findIndex((item) => item._uid === vm._uid);
      // if (index > -1) {
      //   this.vmArr.splice(index, 1);
      // }
    },
    scrollHandler() {
      this.scrolled = true;
    },
    scrollCallback() {
      if (this.scrolled) {
        this.scrolled = false;
        this.vmArr.map((vm) => {
          try {
            const status = vm.start();
            if (!status) {
              this.removeVM(vm);
            }
          } catch (e) {
            console.error("子组件需start方法");
          }
        });
        if (this.vmArr.length < 1 && !this.live) {
          // 停止监听
          this.stop();
        }
      }
    },
    stop() {
      this.stopped = true;
      // off(this.scrollParent.value, "scroll", this.scrollHandler);
      // off(window, "resize", this.scrollHandler);
      // if (this.interval !== null) {
      //   clearInterval(this.interval);
      // }
    },
  },
});
</script>
