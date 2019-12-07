<template>
  <div class="purchase">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14">
        <h1>订单详情</h1>
        <div class="purchase-box">
          <el-row>
            <el-col :span="3">商品图片</el-col>
            <el-col :span="6">商品名称</el-col>
            <el-col :span="5">单价</el-col>
            <el-col :span="5">数量</el-col>
            <el-col :span="5">总价</el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <img :src="productDetailed.pic_url" style="width:100px;height:100px" alt />
            </el-col>
            <el-col :span="6">{{productDetailed.product_name}}</el-col>
            <el-col :span="5">{{purchaseDetailed.product_unitprice}}</el-col>
            <el-col :span="5">{{purchaseDetailed.product_num}}</el-col>
            <el-col :span="5">{{purchaseDetailed.product_totalprice}}</el-col>
          </el-row>
        </div>
        <el-row type="flex" justify="center" class="button-group">
          <el-button @click="deletePurchase">取消订单</el-button>
          <el-button @click="payPurchase">确认支付</el-button>
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
      purchaseDetailed: {},
      productDetailed: {}
    };
  },
  methods: {
    payPurchase() {
      api
        .addPurchase({
          id: 1,
          status: 0,
          type: "purchase",
          subtype: "pay",
          data: {
            purchase_id: this.purchaseDetailed.purchase_id,
            method: "wallet"
          }
        })
        .then(res => {
          this.$message.success("支付成功");
          this.$router.push({
            name: "productDetailed",
            params: {
              productname: this.productDetailed.product_name,
              item: this.productDetailed
            }
          });
        });
    },
    deletePurchase() {
      api
        .addPurchase({
          id: 1,
          status: 0,
          type: "purchase",
          subtype: "cancel",
          data: {
            purchase_id: this.purchaseDetailed.purchase_id
          }
        })
        .then(res => {
          this.$router.push({
            name: "productDetailed",
            params: {
              productname: this.productDetailed.product_name,
              item: this.productDetailed
            }
          });
        });
    }
  },
  mounted() {
    api
      .addPurchase({
        id: 1,
        status: 0,
        type: "purchase",
        subtype: "info",
        data: {
          purchase_id: this.$route.params.purchase_id
        }
      })
      .then(res => {
        this.purchaseDetailed = res.data.data;
        console.log(res);
        return api.getProduct({
          id: 1,
          status: 0,
          type: "product",
          subtype: "info",
          data: {
            product_id: res.data.data.product_id
          }
        });
      })
      .then(res => {
        console.log(res);
        this.productDetailed = res.data.data;
      });
    // console.log(this.$route);
    // console.log(this.$route.params.purchase_id);
  }
};
</script>

<style lang="sass">
  @import '@/assets/css/purchase.scss'
</style>