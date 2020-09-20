<template>
  <div class="log-regbox">
    <div>
      <span>请登录您的账号！</span>
      <p v-if="showerr">账号或密码错误！</p>
      <button @click="lofin()">确认</button>
    </div>
    <div class="acc-padbox">
      <div>
        <span>账号：</span>
        <input v-model="username" type="text" placeholder="请输入您的账号！" />
      </div>
      <div>
        <span>密码：</span>
        <input v-model="pwd" type="text" placeholder="请输入您的密码！" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      pwd: "",
      showerr: false,
    };
  },
  methods: {
    async lofin() {
      var res = await this.$axios.post("/login", {
        username: this.username,
        pwd: this.pwd,
      });
      console.log(res);
      if (res.data.code == 2002) {
        //登录成功
        //先做缓存
        //1.前端做缓存---3种方式--LocalstoragesessionStorage Cookie
        //2.后端缓存---后端2种方式-前端1种(cookie)
        localStorage.setItem("isLogin", true);
        this.$router.push("/p4");
      } else if (res.data.code == 4004) {
        this.showerr = true;
      }
    },
  },
};
</script>

<style>
.log-regbox {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 400px;
  height: 200px;
  text-align: center;
  background-color: wheat;
}
.log-regbox .acc-padbox {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  width: 280px;
  height: 170px;
  background-color: rgb(153, 206, 188);
}
.log-regbox input {
  width: 150px;
  height: 25px;
  background: none;
  outline: none;
  padding-left: 5px;
  font-size: 13px;
  border-radius: 10px;
  border: 1px solid #64958f;
}
</style>