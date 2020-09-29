import { getCurrentInstance, onMounted, ref, reactive } from "vue";
import { inBrowser } from "@/utils";
import { useEventListener } from "@/use/useEventListener";
import throttle from "lodash/throttle";
function isElement(node) {
  const ELEMENT_NODE_TYPE = 1;
  return node.tagName !== "HTML" && node.nodeType === ELEMENT_NODE_TYPE;
}
const overflowScrollRex = /scroll|auto/i;
export function getScroller(el, root = window) {
  let node = el;
  while (node && node !== root && isElement(node)) {
    const { overflowY } = window.getComputedStyle(node);
    if (overflowScrollRex.test(overflowY)) {
      if (node.tagName !== "BODY") {
        return node;
      } else {
        // 初始 body与html同时设置为滚动问题； 不推荐设置
        const { overflowY } = window.getComputedStyle(node.parentNode);
        if (overflowScrollRex.test(overflowY)) {
          return node;
        }
      }
    } else {
      node = node.parentNode;
    }
  }
  return root;
}

export function useScroller() {
  const scrollParent = ref(null);
  const currentInstance = getCurrentInstance();
  onMounted(() => {
    const { el } = currentInstance.vnode;
    if (el) {
      scrollParent.value = getScroller(el);
    }
  });
  return scrollParent;
}

export function getScrollTop(el) {
  const top = "scrollTop" in el ? el.scrollTop : el.pageYOffset;
  return Math.max(top, 0);
}
export function getElementTop(el, scroller = window) {
  if (!inBrowser) return;
  return el.getBoundingClientRect().top + getScrollTop(scroller);
}
export function useListenerScrollTop(elRef, defaultOpen = true) {
  const top = ref(0);
  const fn = reactive([]);
  function setTop() {
    top.value = getScrollTop(elRef.value);
  }
  function on() {
    ["scroll", "resize", "touchmove"].forEach((item) => {
      const remove = useEventListener(item, throttle(setTop, 50), {
        target: elRef,
      });
      fn.push(remove());
    });
  }
  function off() {
    fn.forEach((item) => item());
  }
  if (defaultOpen) {
    on();
  }
  return {
    top,
    on,
    off,
  };
}
