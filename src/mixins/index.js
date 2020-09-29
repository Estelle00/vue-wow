/**
 * Created by liubingwen on 2017/10/23.
 */
import { isVisible } from "@/utils/dom";
export default {
  props: {
    offset: {
      type: Number,
      default: 0,
    },
    // 是否立即执行
    begin: {
      type: Boolean,
      default: false,
    },
    // 禁用滚动计算
    scrollListen: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      end: false,
      status: false,
    };
  },
  created() {
    this.setVM(this);
  },
  mounted() {
    this.start();
  },
  emits: ["start", "end"],
  inject: ["setVM", "removeVM", "disabled", "target"],
  methods: {
    start() {
      // 执行运动校验
      const { begin } = this;
      if (begin || this.isVisible()) {
        const { status, end } = this;
        if (status || end) return "";
        this.status = true;
        this.$emit("start", this);
        this.show();
        return false;
      } else {
        return true;
      }
    },
    endCallback() {
      this.end = true;
      this.status = false;
      this.$emit("end", this);
    },
    isVisible() {
      const { scrollListen, offset } = this;
      if (!scrollListen) return false;
      return false;
      // return isVisible(this.$el, offset, this.target());
    },
  },
};
