<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <!-- <img src="@/assets/images/2.jpg" alt="" /> -->
      <div>count: {{ count }}</div>
      <button @click="setCount(1)">新增1</button>
      <button @click="decreaseCount(1)">减去1</button>
      <br />
      <button @click="asyncSetCount(1)">异步新增1</button>
    </div>
    <router-view />
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "app_vue",
  computed: {
    // mapState三种获取方式
    // ...mapState('login', ['count']),
    ...mapState({
      count: state => state.login.count
    }),
    // count(){
    //   return this.$store.state.login.count
    // },
    // mapGetters映射
    ...mapGetters({
      count1: "login/getCount"
    })
  },
  created() {
    console.log(process.env);
    console.log(this.count, this.count1);
    console.log(this.setCount);
    this.$http.module_1.getIpAdr().then(res => {
      console.log(res);
    });
  },
  methods: {
    // mapMutations、mapActions映射方式(arr、obj)
    // ...mapMutations({
    //   setCount: "login/setCount",
    //   decreaseCount: "login/decreaseCount"
    // }),
    ...mapMutations("login", [
      "setCount", // 将 `this.setCount()` 映射为 `this.$store.commit('login/setCount')`
      "decreaseCount"
    ]),
    // ...mapActions({
    //   asyncSetCount: "login/asyncSetCount"
    // })
    ...mapActions("login", ["asyncSetCount"])
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
