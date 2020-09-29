import { getCurrentInstance } from "vue";
import mitt from "mitt";
const DISPATCH = "dispatch";
const BROADCAST = "broadcast";
const wrapper = Symbol("wrapper");
const emitter = mitt();
export function useEmitter() {
  const currentComponentInstance = getCurrentInstance();
  function on(type, handler) {
    const handleWrapper = (e) => {
      const { value, type, emitComponentInstance } = e;
      if (type === BROADCAST) {
        // 往下触发
        if (isChildComponent(currentComponentInstance, emitComponentInstance)) {
          handler && handler(...value);
        }
      } else if (type === DISPATCH) {
        // 往上触发
        if (isChildComponent(emitComponentInstance, currentComponentInstance)) {
          handler && handler(...value);
        }
      } else {
        // 任意触发不区分上下
        handler && handler(...value);
      }
    };
    handler[wrapper] = handleWrapper;
    emitter.on(type, handleWrapper);
  }
  function broadcast(type, ...args) {
    emitter.emit(type, {
      type: BROADCAST,
      emitComponentInstance: currentComponentInstance,
      value: args,
    });
  }
  function dispatch(type, ...args) {
    emitter.emit(type, {
      type: DISPATCH,
      emitComponentInstance: currentComponentInstance,
      value: args,
    });
  }
  function off(type, handler) {
    emitter.off(type, handler[wrapper]);
  }
  function once(type, handler) {
    const handlerOn = (...args) => {
      handler && handler(...args);
      off(type, handlerOn);
    };
    on(type, handlerOn);
  }
  return {
    on,
    broadcast,
    dispatch,
    off,
    once,
  };
}

function isChildComponent(componentChild, componentParent) {
  const parentUId = componentParent.uid;

  while (componentChild && componentChild?.parent?.uid !== parentUId) {
    componentChild = componentChild.parent;
  }

  return Boolean(componentChild);
}
