import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    name: "Home",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "首页"
    }
  },
  {
    path: "/collection",
    name: "Collection",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Collection.vue"),
    meta: {
      title: "收藏"
    }
  },
  {
    path: "/cart",
    name: "Cart",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/Cart.vue"),
    meta: {
      title: "购物车"
    }
  },
  {
    path: "/settings",
    name: "Settings",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/Settings.vue"),
    meta: {
      title: "设置"
    }
  }
];
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  const no_auth_page = ["Home", "Collection", "Cart", "Settings"];
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  console.log(to);
  if (!localStorage.getItem("token") && no_auth_page.indexOf(to.name)) {
    router.push({ name: "Home" });
  }
  next();
});
export default router;
