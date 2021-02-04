<template>
  <div class="home">
    <h1>This is an home page</h1>
    <Button v-permit="'add'">增加</Button>
    <Button v-permit="'del'">删除</Button>
    <Button v-permit="'edit'">编辑</Button>
    <Button v-permit="'view'">查看</Button>
  </div>
</template>

<script>
// @ is an alias to /src
import { Button } from "vant";
export default {
  name: "Home",
  components: {
    Button
  }
};
</script>
