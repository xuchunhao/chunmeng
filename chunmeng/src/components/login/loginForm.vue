<template>
  <div class="login-form">
    <el-row type="flex" justify="center">
      <el-col class="form" :xl="5" :lg="6" :md="8" :sm="16" :xs="23">
        <h1>登录</h1>
        <div>
          <input type="text" placeholder="请输入学号" v-model="id" />
        </div>
        <div>
          <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
        <div>
          <router-link to="/register">创建账号</router-link>
        </div>
        <div>
          <el-button @click="login" type="primary" round>确认</el-button>
          <!-- <button class="register-btn btn btn-primary btn-lg" type="submit">确认</button> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api/index.js";
import cookieFunction from "@/cookie/cookieFunction.js";

export default {
  data() {
    return {
      id: "",
      password: ""
    };
  },
  methods: {
    login() {
      api
        .login({
          credential: this.id,
          password: this.password
        })
        .then(
          res => {
            if (res.data.status == "success") {
              cookieFunction.setCookie("token", res.data.data.token, 30);
              this.$message.success("欢迎您");
              this.$router.push({ path: "/secondPage" });
            } else {
              this.$message.error("账号或密码错误");
            }
          },
          error => {
            if (
              error.response.data.status ==
              "error_credential_or_password_incorrect"
            ) {
              this.$message.error("账号或密码错误");
            } else {
              this.$message.error("登录失败");
            }
          }
        );
    }
  }
};
</script>

<style lang="sass">
  @import '@/assets/css/loginForm.scss'
</style>