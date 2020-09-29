import { inBrowser } from "@/utils";
import { unref, onMounted, onActivated, onUnmounted, onDeactivated } from "vue";
let supportsPassive = false;
if (inBrowser) {
  try {
    const opts = {};
    Object.defineProperty(opts, "passive", {
      get() {
        supportsPassive = true;
      },
    });
    window.addEventListener("test-passive", null, opts);
  } catch (e) {}
}

export function useEventListener(type, listener, options) {
  if (!inBrowser) {
    return;
  }
  const { target = window, passive = false, capture = false } = options;

  let attached = false;

  const add = () => {
    const element = unref(target);
    if (element && !attached) {
      element.addEventListener(
        type,
        listener,
        supportsPassive ? { capture, passive } : capture
      );
      attached = true;
    }
  };

  const remove = () => {
    const element = unref(target);

    if (element && attached) {
      element.removeEventListener(type, listener, capture);
      attached = false;
    }
  };

  onMounted(add);
  onActivated(add);
  onUnmounted(remove);
  onDeactivated(remove);
  return remove;
}
