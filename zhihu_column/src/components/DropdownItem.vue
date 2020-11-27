<!--
 * @Author: your name
 * @Date: 2020-11-19 20:37:04
 * @LastEditTime: 2020-11-19 20:41:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /zhihu_column/src/components/DropdownItem.vue
-->
<template>
  <li class="dropdown-option" :class="{ ' is-disabled ': disabled }">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style>
.dropdown-option.is-disabled * {
  color: #6c757d;
  pointer-events: none;
  background-color: transparent;
}
</style>
