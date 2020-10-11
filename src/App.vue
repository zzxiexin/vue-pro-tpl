<template>
  <div id="app">
    <!-- <div id="nav"> -->
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    <!-- <img src="@/assets/images/2.jpg" alt="" /> -->
    <!-- <div>count: {{ count }}</div>
      <button @click="setCount(1)">新增1</button>
      <button @click="decreaseCount(1)">减去1</button>
      <br />
      <button @click="asyncSetCount(1)">异步新增1</button> -->
    <!-- </div> -->
    <NavBar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right> <Icon name="search" size="18" /> </template
    ></NavBar>
    <router-view />
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item icon="home-o" badge="20">首页</van-tabbar-item>
      <van-tabbar-item icon="like-o">收藏</van-tabbar-item>
      <van-tabbar-item icon="cart-o">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
// import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import { NavBar, Toast, Icon, Tabbar, TabbarItem } from "vant";
export default {
  name: "app_vue",
  components: {
    NavBar,
    Icon,
    "van-tabbar": Tabbar,
    "van-tabbar-item": TabbarItem
  },
  data() {
    return {
      active: 1
    };
  },
  computed: {
    // mapState三种获取方式
    // ...mapState('login', ['count']),
    // ...mapState({
    //   count: state => state.login.count
    // }),
    // count(){
    //   return this.$store.state.login.count
    // },
    // mapGetters映射
    // ...mapGetters({
    //   count1: "login/getCount"
    // })
  },
  mounted() {
    // console.log(process.env);
    // console.log(this.count, this.count1);
    // console.log(this.setCount);
    // this.$http.module_1.getIpAdr().then(res => {
    //   console.log(res);
    // });
  },
  methods: {
    onClickLeft() {
      Toast("返回");
    },
    onClickRight() {
      Toast("按钮");
    },
    onChange(index) {
      let jump_page = null;
      switch (index) {
        case 0:
          jump_page = "Home";
          break;
        case 1:
          jump_page = "Collection";
          break;
        case 2:
          jump_page = "Cart";
          break;
        default:
          jump_page = "Settings";
      }
      this.$router.push(jump_page);
    }
    // mapMutations、mapActions映射方式(arr、obj)
    // ...mapMutations({
    //   setCount: "login/setCount",
    //   decreaseCount: "login/decreaseCount"
    // }),
    // ...mapMutations("login", [
    // "setCount", // 将 `this.setCount()` 映射为 `this.$store.commit('login/setCount')`
    // "decreaseCount"
    // ]),
    // ...mapActions({
    //   asyncSetCount: "login/asyncSetCount"
    // })
    // ...mapActions("login", ["asyncSetCount"])
  }
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1 {
  background: $bg;
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
