<!--
 * @Author: your name
 * @Date: 2020-11-18 22:31:18
 * @LastEditTime: 2020-11-19 20:53:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zhihu_column/src/components/GlobalHeader.vue
-->
<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a href="#" class="navbar-brand">者也专栏</a>
    <ul v-if="!user.isLogin" class="list-inline mb-0">
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">登陆</a>
      </li>
      <li class="list-inline-item">
        <a href="#" class="btn btn-outline-light my-2">注册</a>
      </li>
    </ul>
    <ul v-else class="list-inline mb-0">
      <li class="list-inline-item">
        <!-- <a href="#" class="btn btn-outline-light my-2">你好{{ user.name }}</a> -->
        <dropdown :title="`你好 ${user.name}`">
          <dropdown-item>
            <!-- <router-link to="/create" class="dropdown-item"> -->
            <a href="#" class="dropdown-item">
              新建文章
            </a>
            <!-- </router-link> -->
          </dropdown-item>
          <dropdown-item>
            <!-- <router-link :to="`/column/${user.column}`" class="dropdown-item"> -->
            <a href="#" class="dropdown-item">
              我的专栏
            </a>
            <!-- </router-link> -->
          </dropdown-item>
          <dropdown-item disabled>
            <a href="#" class="dropdown-item">编辑资料</a>
          </dropdown-item>
          <dropdown-item>
            <a href="#" class="dropdown-item">退出登陆</a>
          </dropdown-item>
        </dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";
export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}
export default defineComponent({
  name: "GlobalHeader",
  components: {
    Dropdown,
    DropdownItem
  },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
});
</script>

<style lang="sass" scoped></style>
