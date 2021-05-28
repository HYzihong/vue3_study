import { onMounted, onUnmounted, Ref, ref } from "vue";

/*
 * @Author: your name
 * @Date: 2021-05-25 23:10:32
 * @LastEditTime: 2021-05-28 09:39:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-study/src/hooks/useMouse.ts
 */
interface mousePosition {
  x: Ref<number>;
  y: Ref<number>;
}
// 解决报错（没有返回值） warning  Missing return type on function  @typescript-eslint/explicit-module-boundary-types
function useMousePosition(): mousePosition {
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
