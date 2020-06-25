import Vue from "vue";
import VueRouter from "vue-router";
import InputForm from "../views/InputForm.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "InputForm",
    component: InputForm
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
