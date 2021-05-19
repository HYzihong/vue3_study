/*
 * @Author: your name
 * @Date: 2021-05-19 20:36:49
 * @LastEditTime: 2021-05-19 21:07:02
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /vue3-study/src/router/index.ts
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/test",
    name: "Test",
    component: () => import(/* webpackChunkName: "test" */ "../views/Test.vue"),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
