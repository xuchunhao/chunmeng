<template>
  <div class="msg-shop">
    <div class="shop-content">
      <router-link
        :to="{name:'shopDetailed',params:{ shopname:item.shop_id ,item:item}}"
        tag="div"
        class="shop-content-group-tpl"
        v-for="(item, index) in shopArray"
        :key="index"
      >
        <img :src="item.pic_url" alt />
        <div>
          <h3>{{"【店铺名称】" + item.shop_name}}</h3>
          <p>{{"店铺介绍:" + item.shop_content}}</p>
          <p>{{"店主 :" + item.user_name}}</p>
        </div>
      </router-link>
    </div>
    <!-- <el-row class="shop-box">
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
    </el-row> -->
  </div>
</template>

<script>
import api from "@/api/index.js";

export default {
  data() {
    return {
      shopArray:[]
    }
  },
  mounted() {
    api
      .getShop({
        id: 1,
        status: 0,
        type: "shop",
        subtype: "list",
        data: {
          mode: 1
        }
      })
      .then(res => {
        this.shopArray = res.data.data;
        console.log(res);
      });
  }
};
</script>

<style lang="sass" scoped>
  @import '@/assets/css/msgShop.scss'
</style>