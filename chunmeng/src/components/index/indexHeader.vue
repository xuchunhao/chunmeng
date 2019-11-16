<template>
  <div class="index-header">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="21" :lg="18" :xl="15">
        <el-row class="container" type="flex" justify="space-between">
          <el-col :span="12" :xs="18">
            <brand />
          </el-col>
          <el-col :xs="12" :sm="16" :md="14" :lg="12" :xl="8">
            <index-btn v-if="!isToken" />
            <p v-else-if="isToken">{{name}},欢迎回来</p>
          </el-col>
        </el-row>
        <el-row class="view">
          <el-col :md="16" :lg="12" :xs="24" type="flex" justify="center">
            <header-view />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="arrow">
      <i class="iconfont">&#xe501;</i>
    </div>
  </div>
</template>

<script>
import brand from "./indexHeader/brand";
import indexBtn from "./indexHeader/indexBtn";
import headerView from "./indexHeader/headerView";
import cookieFunction from "@/cookie/cookieFunction.js";
import api from "@/api/index.js";

export default {
  components: {
    brand,
    indexBtn,
    headerView
  },
  data() {
    return {
      isToken: false,
      name: ""
    };
  },
  mounted() {
    if (cookieFunction.getCookie("token") != null) {
      this.isToken = true;
      this.getUserInfo();
    }
  },
  methods: {
    getUserInfo() {
      api.getUserInfo({}).then(res => {
        this.name = res.data.data.name;
      });
    }
  }
};
</script>

<style lang="scss" scope>
  .index-header{
    p{
      text-align: center;
      font-size: 20px;
      background-color: rgba(255, 255, 255, 0.1);
      color: #fff;
      padding: 15px;
      font-family: "Microsoft Yahei", Arial;
    }
  }
</style>