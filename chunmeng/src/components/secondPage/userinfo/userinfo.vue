<template>
  <div class="userinfo">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14">
        <el-row class="userinfo-content">
          <el-col :md="6" class="userinfo-menu">
            <el-menu
              default-active="1-1"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>个人信息</span>
                </template>
                <!-- <el-menu-item-group>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                </el-menu-item-group>-->
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="changePage('info-basic')">基本信息</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="1-2" @click="changePage('info-portrait')">我的头像</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span slot="title">我的消息</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1" @click="changePage('msg-lost')">失物招领</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="2-2" @click="changePage('msg-find')">寻物启事</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                <i class="el-icon-setting"></i>
                <span slot="title">市场管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1" @click="changePage('msg-shop')">我的店铺</el-menu-item>
                  <!-- <el-menu-item index="1-3-1">选项1</el-menu-item> -->
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="3-2" @click="changePage('msg-purchase')">我的订单</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                  <el-menu-item index="3-3" @click="changePage('msg-deposit')">我要充值</el-menu-item>
                  <!-- <el-menu-item index="1-3-1">选项1</el-menu-item> -->
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
          <el-col :md="18">
            <el-row type="flex" justify="center">
              <info-basic v-if="activePage == 'info-basic'" />
            </el-row>
            <info-portrait v-if="activePage == 'info-portrait'" />
            <msg-lost v-if="activePage == 'msg-lost'" />
            <msg-find v-if="activePage == 'msg-find'" />
            <msg-shop v-if="activePage == 'msg-shop'" />
            <msg-purchase v-if="activePage == 'msg-purchase'" />
            <msg-deposit v-if="activePage == 'msg-deposit'" />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import infoBasic from '@/components/secondPage/userinfo/infoBasic';
import infoPortrait from '@/components/secondPage/userinfo/infoPortrait';
import msgLost from '@/components/secondPage/userinfo/msgLost';
import msgFind from '@/components/secondPage/userinfo/msgFind';
import msgShop from '@/components/secondPage/userinfo/msgShop';
import msgPurchase from '@/components/secondPage/userinfo/msgPurchase';
import msgDeposit from '@/components/secondPage/userinfo/msgDeposit';

export default {
  name: "userinfo",
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    changePage(page){
      this.activePage = page;
    }
  },
  data() {
    return {
      activePage:'info-basic'
    }
  },
  components:{
    infoBasic,
    infoPortrait,
    msgLost,
    msgFind,
    msgShop,
    msgPurchase,
    msgDeposit
  }
};
</script>

<style lang="sass">
  @import '@/assets/css/userinfo.scss'
</style>