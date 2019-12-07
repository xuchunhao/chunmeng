<template>
  <div class="register-form">
    <el-row type="flex" justify="center">
      <el-col class="form" :xl="5" :lg="6" :md="8" :sm="16" :xs="23">
        <h1>注册</h1>
        <div>
          <input type="text" placeholder="请输入学号" v-model="id" />
        </div>
        <div>
          <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
        <div>
          <input type="text" placeholder="请输入姓名" v-model="name" />
        </div>
        <div class="img-captcha">
          <img :src="imgsrc" @click="getImgCaptcha" />
          <input type="text" @blur="handleBlur" placeholder="请输入验证码" v-model="imgCaptcha" />&nbsp;
          <i
            v-if="imgCaptchaBlur"
            :class="{'el-icon-check':imgCaptchaCheck,'el-icon-close':!imgCaptchaCheck}"
          ></i>
        </div>
        <div>
          <input type="text" placeholder="请输入手机" v-model="phone" />
          <!-- <a href="javascript:;" style="display:block;padding:10px 0">获取手机验证码</a> -->
          <p @click="getPhoneCaptcha">获取手机验证码</p>
        </div>
        <div>
          <input type="text" placeholder="请输入手机验证码" v-model="phoneCaptcha" />
        </div>
        <div>
          <router-link to="/login">登录账号</router-link>
        </div>
        <div>
          <el-button @click="register" type="primary" round>确认</el-button>
          <!-- <button class="register-btn btn btn-primary btn-lg" type="submit">确认</button> -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api/index.js";
import cookieFunction from "@/cookie/cookieFunction.js";
import md5 from "js-md5";

export default {
  data() {
    return {
      id: "",
      name: "",
      phone: "",
      phoneCaptcha: "",
      phoneRand: "",
      imgCaptcha: "",
      imgsrc: "",
      imgRand: "",
      password: "",
      imgCaptchaBlur: false,
      imgCaptchaCheck: true
    };
  },
  methods: {
    getImgCaptcha() {
      api
        .Captcha({
          id: 1,
          status: 0,
          type: "img",
          subtype: "generate",
          data: {}
        })
        .then(res => {
          this.imgsrc = "data:image/png;base64," + res.data.data.imgdata;
          this.imgRand = res.data.data.rand;
        });
    },
    handleBlur() {
      api
        .Captcha({
          id: 1,
          status: 0,
          type: "img",
          subtype: "validate",
          data: {
            hash: md5(this.imgCaptcha.toLowerCase() + this.imgRand)
          }
        })
        .then(res => {
          if (res.data.status == 0) {
            this.imgCaptchaBlur = true;
            this.imgCaptchaCheck = true;
          } else {
            this.imgCaptchaBlur = true;
            this.imgCaptchaCheck = false;
          }
        });
    },
    getPhoneCaptcha() {
      api
        .Captcha({
          id: 1,
          status: 0,
          type: "sms",
          subtype: "generate",
          data: {
            phone: this.phone,
            hash: md5(this.imgCaptcha.toLowerCase() + this.imgRand)
          }
        })
        .then(res => {
          this.phoneRand = res.data.data.rand;
          alert("已发送验证码");
        });
    },
    register() {
      api
        .register({
          id: this.id,
          name: this.name,
          phone: this.phone,
          password: this.password,
          captchaImage: md5(this.imgCaptcha.toLowerCase() + this.imgRand),
          captchaSms: md5(this.phoneCaptcha + this.phoneRand)
        })
        .then(
          res => {
            alert("注册成功");
            api
              .login({
                credential: this.id,
                password: this.password
              })
              .then(
                res => {
                  if (res.data.status == "success") {
                    cookieFunction.setCookie("token", res.data.data.token, 10);
                    this.$message.success("欢迎您");
                    this.$router.push({ path: "/lost" });
                  } else {
                    this.$message.error("注册失败");
                  }
                },
                error => {
                  if (
                    error.response.data.status ==
                    "error_credential_or_password_incorrect"
                  ) {
                    this.$message.error("账号或密码错误");
                  } else {
                    this.$message.error("注册失败");
                  }
                }
              );
          },
          error => {
            let status = error.response.data.status;
            switch (status) {
              case "error_id_existed":
                this.$message.error("学号或者手机已被注册");
                break;
              case "error_invalid_image_captcha":
                this.$message.error("图片验证码不正确");
                break;
              case "error_invalid_sms_captcha":
                this.$message.error("短信验证码不正确");
                break;
              case "error_id_name_not_matches":
                this.$message.error("学号和名字不匹配");
                break;
            }
          }
        );
    }
  },
  mounted() {
    this.getImgCaptcha();
  }
};
</script>

<style lang="sass">
  @import '@/assets/css/registerForm.scss'
</style>