<template>
  <div class="product-detailed">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14">
        <el-row type="flex" justify="end">
          <router-link tag="el-button" :to="{name:'shopDetailed',params:{ shopname:shopID }}">返回商店</router-link>
        </el-row>
        <el-row class="product-detailed-content">
          <el-col :md="12">
            <img style="width:100%" :src="productDetailed.pic_url" alt />
          </el-col>
          <el-col :md="12" class="product-detailed-box">
            <h1>{{productDetailed.product_name}}</h1>
            <el-input-number v-model="num" :min="1" :max="10" label="购买数量"></el-input-number>
            <h3>单价:￥{{productDetailed.product_price}}</h3>
            <el-button @click="goPurchase">立即购买</el-button>
          </el-col>
        </el-row>
        <h1>商品介绍:</h1>
        <div v-html="productDetailed.product_content"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api/index.js";

export default {
  data() {
    return {
      productDetailed: {},
      shopID: "",
      num: 1
    };
  },
  methods: {
    goPurchase() {
      console.log(this.num * this.productDetailed.product_price);
      api.addPurchase({
        id: 1,
        status: 0,
        type: "purchase",
        subtype: "apply",
        data: {
          product_id: this.productDetailed.product_id,
          product_num: this.num,
          product_unitprice: this.productDetailed.product_price,
          product_totalprice: (this.num * this.productDetailed.product_price)
        }
      }).then(res => this.$router.push({ name: "purchase", params:{purchase_id:res.data.data.purchase_id}}));
        
    }
  },
  mounted() {
    let product = this.$route.params.productname;
    let shopID = this.$route.params.item.shop_id;
    this.shopID = this.$route.params.item.shop_id;
    console.log(this.shopID);
    api
      .getProduct({
        id: 1,
        status: 0,
        type: "product",
        subtype: "list",
        data: {
          product_name: product,
          // product_key: "",
          // order: "",
          shop_id: this.shopID,
          type: "all"
        }
      })
      .then(res => {
        console.log(res);
        this.productDetailed = res.data.data[0];
      });
  }
};
</script>

<style lang="sass" scope="scope">
  @import '@/assets/css/productDetailed.scss'
</style>