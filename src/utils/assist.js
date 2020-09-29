/**
 * Created by liubingwen on 2017/10/23.
 */
// 判断是否为手机
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  );
};
