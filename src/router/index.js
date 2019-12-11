import Vue from "vue";
import Router from "vue-router";
import * as Cookies from "js-cookie";
import Routers from "./routers";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [...Routers],

});

router.beforeEach((to, from, next) => {
  if (
    Cookies.get("@Auth:user") != "true" &&
    (to.name.split("-")[0] == "user" || to.name.split("-")[0] == "client")
  ) {
    next({
      path: "/"
    });
    document.body.style.overflow = "auto";
  } else {
    next();
  }
});

export default router;