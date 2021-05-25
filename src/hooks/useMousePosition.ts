import { onMounted, onUnmounted, ref } from "vue";

/*
 * @Author: your name
 * @Date: 2021-05-25 23:10:32
 * @LastEditTime: 2021-05-25 23:21:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-study/src/hooks/useMouse.ts
 */
function useMousePosition() {
  const x = ref(0);
  const y = ref(0);
  const updateMouse = (e: MouseEvent) => {
    x.value = e.pageX;
    y.value = e.pageY;
  };
  onMounted(() => {
    document.addEventListener("click", updateMouse);
  });
  onUnmounted(() => {
    document.addEventListener("click", updateMouse);
  });
  return { x, y };
}
export default useMousePosition;
