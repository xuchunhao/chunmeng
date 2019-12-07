<template>
  <div class="info-basic">
    <div class="info-box-disabled">
      <label>学号:</label>
      <input type="text" v-model="id" disabled />
    </div>
    <div class="info-box-disabled">
      <label>手机:</label>
      <input type="text" v-model="phone" disabled />
    </div>
    <div class="info-box">
      <label>姓名:</label>
      <input type="text" v-model="name" />
    </div>
    <div class="info-box">
      <label>昵称:</label>
      <input type="text" v-model="nickname" />
    </div>
    <div class="info-box">
      <label>邮箱:</label>
      <input type="text" v-model="email" />
    </div>
    <div class="info-box">
      <label for="">余额(￥):<i class="el-icon-coin"></i>{{parseInt(wealth)}}</label>
    </div>
    <div class="info-box">
      <el-button type="primary" plain @click="updateUserinfo()">更改信息</el-button>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";

export default {
  data() {
    return {
      id: "",
      phone: "",
      name: "",
      nickname: "",
      email: "",
      wealth: ""
    };
  },
  mounted() {
    api.getUserInfo({}).then(res => {
      this.id = res.data.data.id;
      this.phone = res.data.data.phone;
      this.name = res.data.data.name;
      this.nickname = res.data.data.nickname;
      this.email = res.data.data.email;
      this.wealth = res.data.data.wealth;
      console.log(res.data.data)
    });
  },
  methods: {
    updateUserinfo() {
      api
        .updateUserinfo({
          name: this.name,
          nickname: this.nickname,
          email: this.email
        })
        .then(res => alert('更改成功'), error => alert('请按照正确格式填写邮箱'));
    }
  }
};
</script>

<style lang="sass" scoped>
  @import '@/assets/css/infoBasic.scss'
</style>