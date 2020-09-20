<template>
  <div>
    <div>这是p4</div>
    <div>{{username}}</div>
    <img class="tximg" :src="tximg" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      tximg: "",
    };
  },
  components: {},
  mounted() {
    this.$axios.get("/userinfo").then((res) => {
      console.log(res.data);
      if (res.data[0]) {
        this.username = `用户名：${res.data[0].username}`;
        this.tximg = res.data[0].tximg;
      } else {
        this.username = "未登录！";
        this.tximg = require("@/assets/logo.png");
      }
    });
  },
  methods: {},
};
</script>

<style>
.tximg {
  width: 50px;
  height: 50px;
}
</style>
