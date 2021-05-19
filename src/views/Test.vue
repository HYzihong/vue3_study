<!--
 * @Author: your name
 * @Date: 2021-05-19 20:58:44
 * @LastEditTime: 2021-05-19 21:12:51
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
export default defineComponent({
  name: "Test",
  setup() {
    const count = ref(0);
    const increase = () => {
      count.value++;
    };
    const doubleCount = computed(() => {
      return count.value * 2;
    });

    return {
      count,
      increase,
      doubleCount,
    };
  },
});
</script>

<style></style>
