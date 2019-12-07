<template>
  <div class="shop-detailed">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14">
        <h1>{{item.shop_name}}</h1>
        <el-row type="flex" justify="end" class="buttons">
          <el-button @click="goProductSubmit">添加商品</el-button>
          <router-link to="/shop" tag="el-button">返回搜索页</router-link>
        </el-row>
        <el-row class="product-box">
          <el-col class="product-every" v-for="(item,index) in productList" :key="index" :span="7">
            <router-link
              class="product-every-link"
              :to="{name:'productDetailed',params:{ productname:item.product_name ,item:item}}"
              tag="div"
            >
              <img :src="item.pic_url" alt />
              <h3>{{item.product_name}}</h3>
              <p>￥{{item.product_price}}</p>
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
      item: {},
      productList: [],
      shopID: ""
    };
  },
  methods: {
    goProductSubmit() {
      api.getUserInfo({}).then(res => {
        if(res.data.data.id == this.item.user_id){
          this.$router.push({name:"productSubmit",params:{shop_id: this.shopID}})
        }else{
          this.$message.error("只有店主才能添加商品哦");
        }
      });
    }
  },
  mounted() {
    let shopID = this.$route.path.substr(1);
    this.shopID = shopID;
    api
      .getShop({
        id: 1,
        status: 0,
        type: "shop",
        subtype: "info",
        data: {
          shop_id: shopID
        }
      })
      .then(res => {
        this.item = res.data.data;
        api
          .getProduct({
            id: 1,
            status: 0,
            type: "product",
            subtype: "list",
            data: {
              // product_name: "",
              // product_key: "",
              // order: "",
              shop_id: this.item.shop_id,
              type: "all"
            }
          })
          .then(res => {
            this.productList = res.data.data;
            console.log(res);
          });
      });
  }
};
</script>

<style lang="sass" scope="scope">
  @import '@/assets/css/shopDetailed.scss'
</style>