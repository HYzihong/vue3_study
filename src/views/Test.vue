<!--
 * @Author: your name
 * @Date: 2021-05-19 20:58:44
 * @LastEditTime: 2021-05-25 23:25:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-study/src/views/test.vue
-->
<template>
  <div>
    计数器：{{ count }}
    <br />
    double:{{ doubleCount }}
    <br />
    <button @click="increase">➕➕</button>
    <button @click="updateTitle">➕➕title</button>
    <br />
    X:{{ x }}
    <br />
    Y:{{ y }}
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, ref, watch } from "vue";
//
import useMousePosition from "./../hooks/useMousePosition";
interface dataProps {
  count: number;
  increase: () => void;
  doubleCount: number;
}
export default defineComponent({
  name: "Test",
  setup() {
    // ref
    // const count = ref(0);
    // const increase = () => {
    //   count.value++;
    // };
    // const doubleCount = computed(() => {
    //   return count.value * 2;
    // });
    // return {
    //   count,
    //   increase,
    //   doubleCount,
    // };
    //
    //
    // reactive 接受的参数是一个对象，可以把参数统一在一个对象中
    const data: dataProps = reactive({
      count: 0,
      increase: () => {
        data.count++;
      },
      doubleCount: computed(() => data.count * 2), // computed中使用 data.count ，会造成类型推断的循环
    });
    // data.count ==> (property) dataProps.count: number 丧失响应性
    const refData = toRefs(data); //保持对象具有响应性
    // refData.count ==> vscode 提示变成响应式的ref对象了 (property) count: Ref<number>

    //
    // watch
    // watch单个值
    // const title = ref(1);
    // const updateTitle = () => {
    //   title.value++;
    // };
    // watch(title, (newVal, oldVal) => {
    //   console.log(oldVal);
    //   console.log(newVal);
    //   document.title = `update ${title.value} s`;
    // });
    // watch多个值
    // const title = ref(1);
    // const updateTitle = () => {
    //   title.value++;
    // };
    // watch([title, data], (newVal, oldVal) => {
    //   console.log("oldVal ==>", oldVal);
    //   console.log("newVal ==>", newVal);
    /*
      [3, Proxy]
      0: 3
      // 这里console出来的data是一个proxy对象
      1: Proxy {count: 1, doubleCount: ComputedRefImpl, increase: ƒ}
      */
    //   document.title = `data count is ${data.count} update ${title.value} s`;
    // });
    //
    // watch 一个对象里面的属性的值 () => data.count可以有效的保持获取响应式的data.count的值
    const title = ref(1);
    const updateTitle = () => {
      title.value++;
    };
    watch([title, () => data.count], (newVal, oldVal) => {
      console.log("oldVal ==>", oldVal);
      console.log("newVal ==>", newVal);
      document.title = `data count is ${data.count} update ${title.value} s`;
    });
    // hooks 组件跟逻辑分离
    const { x, y } = useMousePosition();
    return {
      // reactive
      ...refData,
      // ...data

      // watch
      updateTitle,
      //
      x,
      y,
    };
  },
});
</script>

<style></style>
