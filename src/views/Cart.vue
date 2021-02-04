<template>
  <div class="about">
    <h1>This is an cart {{ count }} page</h1>
    <button @click="setCount(2)">+</button>
    <button @click="decreaseCount(1)">-</button>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "cart",
  computed: {
    ...mapGetters({
      count: "login/getCount"
    })
  },
  methods: {
    ...mapMutations({
      setCount: "login/setCount",
      decreaseCount: "login/decreaseCount"
    })
  }
};
</script>
