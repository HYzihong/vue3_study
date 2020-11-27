<!--
 * @Author: your name
 * @Date: 2020-11-09 22:02:35
 * @LastEditTime: 2020-11-26 08:11:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /mk_study/vue3_study/zhihu_column/src/App.vue
-->
<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
  <div class="container">
    <global-header :user="user"></global-header>
    <column-list :list="list"></column-list>
    <form>
      <div class="form-group">
        <label>Email address</label>
        <!-- ValidateInput -->
        <validate-input
          v-model="emailRef.val"
          :rules="emailRules"
        ></validate-input>
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input
          type="email"
          class="form-control"
          v-model="emailRef.val"
          @blur="vaildateEmail"
        />
        <small v-if="emailRef.error" class="form-text  text-danger">
          {{ emailRef.message }}
        </small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
        />
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
// import { Options, Vue } from "vue-class-component";
// import HelloWorld from "./components/HelloWorld.vue";

// @Options({
//   components: {
//     // HelloWorld,
//   },
// })
// export default class App extends Vue {}
import ColumnList, { ColumnProps } from "./components/ColumnList.vue";
import GlobalHeader, { UserProps } from "./components/GlobalHeader.vue";
import ValidateInput, { RulesProp } from "./components/ValidateInput.vue";

import "bootstrap/dist/css/bootstrap.min.css";
import { defineComponent, reactive } from "vue";
const testUser: UserProps = {
  isLogin: true,
  name: "zhangsan"
};
const testData: ColumnProps[] = [
  {
    id: 1,
    title: "专栏一",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_50,w_50",
    description: "11111"
  },
  {
    id: 2,
    title: "专栏二",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_50,w_50",
    description: "22222"
  },
  {
    id: 2,
    title: "专栏二",
    // avatar:
    // "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_50,w_50",
    description: "22222"
  }
];
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
export default defineComponent({
  name: "app",
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput
  },
  setup() {
    const emailRules: RulesProp = [
      { type: "required", message: "请输入邮箱地址" },
      { type: "email", message: "请输入正确的邮箱地址" }
    ];
    const emailRef = reactive({
      val: "",
      error: false,
      message: ""
    });
    const vaildateEmail = () => {
      if (emailRef.val.trim() === "") {
        emailRef.error = true;
        emailRef.message = "can not be empty";
      } else if (!emailReg.test(emailRef.val)) {
        emailRef.error = true;
        emailRef.message = "should be vaild email";
      }
    };
    return {
      list: testData,
      user: testUser,
      emailRef,
      vaildateEmail,
      emailRules
    };
  }
});
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
