import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/",
    name: "manage.list",
    component: () => import("../views/manage/List.vue"),
  },
  {
    path: "/class/:id",
    name: "manage.class",
    component: () => import("../views/manage/Class.vue"),
  },
  {
    path: "/class/create",
    name: "manage.form",
    component: () => import("../views/manage/ClassForm.vue"),
  },
  {
    path: "/class/edit/:id",
    name: "manage.edit",
    component: () => import("../views/manage/ClassForm.vue"),
  },
  {
    path: "/student/create",
    name: "manage.studentForm",
    component: () => import("../views/manage/StudentForm.vue"),
  },
  {
    path: "/student/edit/:id",
    name: "manage.studentEdit",
    component: () => import("../views/manage/StudentForm.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
