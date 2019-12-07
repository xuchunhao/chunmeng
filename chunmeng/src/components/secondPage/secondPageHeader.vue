<template>
  <div class="second-page-header">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14">
        <el-row type="flex" justify="space-between">
          <el-menu
            :default-active="activeIndex"
            class="second-page-menu-left"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">
              <router-link class to="/">
                <img class="register-header-logo" src="@/assets/img/logo_2.png" alt />
              </router-link>
            </el-menu-item>
            <el-submenu index="2">
              <template slot="title">信息发布</template>
              <el-menu-item index="lost">
                <router-link to="/lost" tag="div">失物招领</router-link>
              </el-menu-item>
              <el-menu-item index="find">
                <router-link to="/find" tag="div">寻物启事</router-link>
              </el-menu-item>
              <!-- <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>-->
            </el-submenu>
            <el-menu-item index="3">
              <router-link to="/shop" tag="div">小市场</router-link>
            </el-menu-item>
            <!-- <el-menu-item index="4">
              <a href="/index" target="_blank">订单管理</a>
            </el-menu-item> -->
          </el-menu>
          <el-menu
            :default-active="activeIndex2"
            class="second-page-menu-right"
            mode="horizontal"
            @select="handleSelect"
          >
            <el-menu-item index="1">
              <router-link to="/userinfo">
                <img
                  class="register-header-logo"
                  :src="'https://www.zustservice.cn/api/external/get/portrait/' + id"
                  alt
                />
                个人中心
              </router-link>
            </el-menu-item>
            <!-- <el-submenu trigger="click" index="2">
              <template slot="title">我的工作台</template>
              <el-menu-item index="2-1">选项1</el-menu-item>
              <el-menu-item index="2-2">选项2</el-menu-item>
              <el-menu-item index="2-3">选项3</el-menu-item>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项1</el-menu-item>
                <el-menu-item index="2-4-2">选项2</el-menu-item>
                <el-menu-item index="2-4-3">选项3</el-menu-item>
              </el-submenu>
            </el-submenu> -->
          </el-menu>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api/index.js";

export default {
  data() {
    return {
      activeIndex: "lost",
      activeIndex2: "2",
      id: ""
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  mounted() {
    api.getUserInfo({}).then(res => {
      this.id = res.data.data.id;
    });
  }
};
</script>

<style lang="sass">
  @import '@/assets/css/secondPageHeader.scss'
</style>