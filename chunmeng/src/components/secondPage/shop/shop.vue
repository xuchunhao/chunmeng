<template>
  <div class="shop">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14">
        <h1>搜索店铺</h1>
        <el-input placeholder="请输入店铺名" v-model="shop" class="search">
          <el-button slot="append" icon="el-icon-search" @click="searchShop"></el-button>
        </el-input>
        <el-row type="flex" justify="end">
          <router-link to="/shopSubmit" tag="el-button" class="addshop">我要开店</router-link>
        </el-row>
        <el-row class="shop-box">
          <el-col class="shop-every" v-for="(item,index) in shopList" :key="index" :span="7">
            <router-link
              class="shop-every-link"
              :to="{name:'shopDetailed',params:{ shopname:item.shop_id ,item:item}}"
              tag="div"
            >
              <img :src="item.pic_url" alt />
              <h3>{{item.shop_name}}</h3>
              <p>店主:{{item.user_name}}</p>
            </router-link>
          </el-col>
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
      shop: "",
      shopList: []
    };
  },
  mounted() {
    api
      .getShop({
        id: 1,
        status: 0,
        type: "shop",
        subtype: "list",
        data: {
          shop_name: ""
        }
      })
      .then(res => {this.shopList = res.data.data 
      console.log(res)});
  },
  methods: {
    searchShop() {
      api
        .getShop({
          id: 1,
          status: 0,
          type: "shop",
          subtype: "list",
          data: {
            shop_name: this.shop
          }
        })
        .then(res => (this.shopList = res.data.data));
    }
  }
};
</script>

<style lang="sass" scope="scope">
  @import '@/assets/css/shop.scss'
</style>