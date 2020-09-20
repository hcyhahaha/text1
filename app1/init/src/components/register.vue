<template>
  <div class="log-regbox">
    <div>
      <span>请注册一个账号！</span>
      <button @click="send()">确认</button>
    </div>
    <p v-if="showyzm" style="color:red">验证码输入错误！</p>
    <p v-if="showuname" style="color:red">此账号已被注册！</p>
    <div class="acc-padbox">
      <div>
        <span>上传头像：</span>
        <input type="file" @change="filechange($event)" />
      </div>
      <div>
        <span>注册账号：</span>
        <input v-model="username" type="text" placeholder="请注册您的账号！" />
      </div>
      <div>
        <span>新密码：</span>
        <input v-model="pwd1" type="text" placeholder="请设置您的密码！" />
      </div>
      <div>
        <span>确认密码：</span>
        <input v-model="pwd2" type="text" placeholder="请确认您的密码！" />
      </div>
      <div>
        <span>验证码：</span>
        <input v-model="yanzgengma" type="text" placeholder="请输入您的验证码！" />
        <span v-html="svg" @click="changeyzm"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      pwd1: "",
      pwd2: "",
      yanzgengma: "",
      file1: "",
      svg: "",
      showyzm: false,
      showuname: false,
    };
  },
  mounted() {
    //页面一挂载就去请求验证码
    this.$axios.get("/yanzhengma").then((res) => {
      // console.log(res.data);
      this.svg = res.data.data;
    });
  },
  components: {},
  methods: {
    filechange(e) {
      //e.target.files[0]获取图片信息
      //把他设置到file1里面，然后我们就可以在send()里面用这个信息
      this.file1 = e.target.files[0];
    },
    //获取用户交互结构，发给后端
    async send() {
      //创建form表单格式数据包，打包数据
      var f = new FormData();
      f.append("file1", this.file1);
      f.append("username", this.username);
      f.append("pwd1", this.pwd1);
      f.append("yanzgengma", this.yanzgengma);
      // f.append("svg", this.svg);
      var res = await this.$axios.post("/p1", f, {
        header: { "content-Tyoe": "application/x-www-form-urlencoded" },
      });
      // .then((res) => {
      // console.log(res.data);
      //code: 4001, info: '验证码错误！'
      //code: 4002, info: '此账号已被注册！'
      //code: 4003, info: '注册成功！'
      // });
      // console.log(res.data);
      if (res.data.code == 4001) {
        this.showyzm = true;
      } else if (res.data.code == 4002) {
        this.showuname = true;
      } else {
        // console.log(res);
        this.$router.push("/p4");
      }
    },
    //用户点击验证码，再去做网络请求，从而刷新验证码
    //{ params: {} }, { withCredentials: true }
    changeyzm() {
      this.$axios.get("/yanzhengma").then((res) => {
        this.svg = res.data.data;
      });
    },
  },
};
</script>
<style>
</style>
