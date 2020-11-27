<!--
 * @Author: your name
 * @Date: 2020-11-09 23:35:57
 * @LastEditTime: 2020-11-18 20:50:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mk_study/vue3_study/zhihu_column/src/components/ColumnList.vue
-->
<template>
  <div class="row">
    <div v-for="column in columnList" :key="column.id" class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            class="rounded-circle border border-ligth w-25 my-3"
            :src="column.avatar"
            :alt="column.title"
          />
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text">{{ column.description }}</p>
          <a href="#" class="btn btn-outline-primary">进入专栏</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export default defineComponent({
  name: "ColumnList",
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
    // required: true,
    //Array as ColumnProps[] ，无法把Array（数组的构造函数）断言成ColumnProps[]
    //  PropType（Vue2提出） 接受一个泛型，将Array的构造函数返回传入的泛型类型
  },
  setup(props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        if (!column.avatar) {
          column.avatar = require("@/assets/logo.png");
        }
        return column;
      });
    });
    console.log(columnList);
    return {
      columnList
    };
  }
});
</script>

<style scoped>
/* .card-body img {
  width: 50px;
  height: 50px;
} */
</style>
