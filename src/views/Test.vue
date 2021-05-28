<!--
 * @Author: your name
 * @Date: 2021-05-19 20:58:44
 * @LastEditTime: 2021-05-28 15:23:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /vue3-study/src/views/test.vue
-->
<template>
  <div>
    <!-- 计数器：{{ refData.count.value }}
    <br />
    double:{{ refData.doubleCount.value }}
    <br />
    <button @click="refData.increase.value">➕➕</button> -->
    计数器：{{ count }}
    <br />
    double:{{ doubleCount }}
    <br />
    <button @click="increase">➕➕</button>
    <button @click="updateTitle">➕➕title</button>
    <br />
    计数器：{{ data.count }}
    <br />
    double:{{ data.doubleCount }}
    <br />
    <button @click="data.increase">➕➕</button>
    <br />
    X:{{ x }}
    <br />
    Y:{{ y }}
    <br />
    <!-- <div v-if="loading">loading....</div> -->
    <!-- <img v-if="loaded" :src="result.message" alt="" srcset="" /> -->
    <!-- <div>{{ _dogData }}</div>
    <div v-if="_dogData.loading">loading....</div>
    <img
      v-if="_dogData.loaded"
      :src="_dogData.data.value?.message"
      alt=""
      srcset=""
    />
    <div v-if="_catData.loading">loading....</div>
    <div v-if="_catData.loaded">
      <img v-for="cat in _catData.data" :key="cat.id" :src="cat.url" />
    </div> -->
    <div>{{ catData }}</div>
    <div v-if="catData.loading">loading....</div>
    <div v-if="catData.loaded">
      <img v-for="cat in catData.data.value" :key="cat.id" :src="cat.url" />
    </div>
    <button @click="catResult">点击获取一个猫猫</button>
  </div>
</template>

<script lang="ts">
import getDataLoader from "@/hooks/getDataLoader";
import { computed, defineComponent, reactive, toRefs, ref, watch } from "vue";
//
import useMousePosition from "./../hooks/useMousePosition";
interface dataProps {
  count: number;
  increase: () => void;
  doubleCount: number;
}
// interface dogResult {
//   message: string;
//   status: string;
// }
interface catResult {
  id: string;
  url: string;
  width: string;
  height: string;
}
interface catData {
  data: catResult[] | null;
  loading: boolean;
  loaded: boolean;
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
    const count = ref(0);
    const increase = () => {
      count.value++;
    };
    // computed 计算属性
    const doubleCount = computed(() => {
      return count.value * 2;
    });
    const data = reactive({
      count,
      increase,
      doubleCount,
    });
    const _data: dataProps = reactive({
      count: 0,
      increase: () => {
        _data.count++;
      },
      doubleCount: computed(() => _data.count * 2), // computed中使用 data.count ，会造成类型推断的循环
    });
    // data.count ==> (property) dataProps.count: number 丧失响应性
    const refData = toRefs(_data); //保持对象具有响应性
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
    // 自定义hooks 组件跟逻辑分离
    const { x, y } = useMousePosition();

    // function _dogResult() {
    //   const { result, loading, loaded } = getDataLoader<dogResult>(
    //     "https://dog.ceo/api/breeds/image/random"
    //   );

    //   return reactive({
    //     data: result,
    //     loading,
    //     loaded,
    //   });
    // }
    // const _dogData = toRefs(_dogResult());
    // function _catResult() {
    //   const { result, loading, loaded } = getDataLoader<catResult[]>(
    //     "https://api.thecatapi.com/v1/images/search?limit=1"
    //   );

    //   return reactive({
    //     data: result,
    //     loading,
    //     loaded,
    //   });
    // }
    // const _catData = toRefs(_catResult());
    // console.log(_catData.data.value);

    // let _catData = ref<null | catResult>(null);
    let _catData: catData = reactive({
      data: [],
      loading: true,
      loaded: false,
    });
    const catData = toRefs(_catData);
    async function catResult() {
      // 如果catResult和getDataLoader函数不是async 就获取不到值，只会返回null
      const { result, loading, loaded } = await getDataLoader<catResult[]>(
        "https://api.thecatapi.com/v1/images/search"
      );
      console.log("已经点击", result.value);

      // _catData = { result, loaded, loading };
      // this.
      // _catData = {
      //   data: result.value,
      //   loaded: loaded.value,
      //   loading: loading.value,
      // };
      catData.data.value = result.value;
      catData.loaded.value = loaded.value;
      catData.loading.value = loading.value;
    }
    // const catData = toRefs(_catData);
    // console.log(catData.data.value);

    return {
      // reactive
      ...refData,
      // ...refData,
      // ...data
      data,

      // watch
      updateTitle,
      //hooks
      x,
      y,
      // result,
      // loading,
      // loaded,
      // error,
      // _dogData,
      // _catData,
      catData,
      catResult,
    };
  },
});
</script>

<style></style>
