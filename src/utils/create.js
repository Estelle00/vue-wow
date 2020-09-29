const KEY_COMPONENT_NAME = "u";
export default function createComponent(sfc) {
  sfc.name = KEY_COMPONENT_NAME + sfc.name;
  return sfc;
}
