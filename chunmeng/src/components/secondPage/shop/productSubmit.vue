<template>
  <div class="product-submit">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14" class="product-submit-content-box">
        <h1>商品信息</h1>
        <div class="product-submit-content">
          <div class="info-box">
            <label>商品名称:</label>
            <input v-model="product_name" type="text" />
          </div>
          <div class="info-box">
            <label>商品价格(￥):</label>
            <input v-model="product_price" type="number" />
          </div>
          <div class="info-box">
            <label>商品内容:</label>
            <wangediter :catchData="catchData" />
          </div>
          <div class="file">
            选择图片
            <input @change="uploadPhoto($event)" type="file" class="kyc-passin" />
          </div>

          <div>
            <el-button type="primary" @click="addProduct">创建商品</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api/index.js";
import wangediter from "@/components/secondPage/shop/wangediter.vue";

export default {
  data() {
    return {
      product_name: "",
      product_content: "",
      product_price: 0,
      pic_url: "",
      shop_id: 0
    };
  },
  components: {
    wangediter
  },
  mounted() {
    console.log(this.$route);
    this.shop_id = this.$route.params.shop_id;
  },
  methods: {
    catchData(e) {
      this.product_content = e;
    },
    addProduct() {
      console.log(this.shop_id, parseInt(this.shop_id));
      api
        .addProduct({
          id: 1,
          status: 0,
          type: "product",
          subtype: "creat",
          data: {
            product_name: this.product_name,
            product_content: this.product_content,
            product_price: parseFloat(this.product_price),
            shop_id: parseInt(this.shop_id),
            product_status: 1
          }
        })
        .then(res => {
          console.log(res);
          let product_id = res.data.data.product_id;
          let shop_id = this.shop_id;
          let pic_url = this.pic_url;
          let product_name = this.product_name;
          let product_price = this.product_price;
          let product_content = this.product_content;
          // console.log(res.data.data.shop_id);
          setTimeout(function() {
            api
              .addProduct({
                id: 1,
                status: 0,
                type: "product",
                subtype: "update",
                data: {
                  shop_id: parseInt(shop_id),
                  pic_url: pic_url,
                  product_content: product_content,
                  product_name: product_name,
                  product_id: product_id,
                  product_status: 1,
                  product_price: parseFloat(product_price)
                }
              })
              .then(res => console.log(res));
          }, 1000);
        });
    },
    uploadPhoto(e) {
      // 利用fileReader对象获取file
      var file = e.target.files[0];
      var filesize = file.size;
      var filename = file.name;
      var that = this;
      //var filetype = file.type;
      // 2,621,440   2M
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$message.error("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }

      if (filesize > 2101440) {
        // 图片大于2MB
        this.$message.error("您选择的图片太大，请选择小于2M的图片");
        return false;
      }
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        // 读取到的图片base64 数据编码 将此编码字符串传给后台即可

        var imgcode = e.target.result;
        this.img = imgcode;
        api
          .uploadImg({
            id: 1,
            status: 0,
            type: "pic",
            subtype: "upload",
            data: {
              from: "shop",
              base64: imgcode
            }
          })
          .then(res => {
            that.pic_url = res.data.data.url;
            // let obj = {};
            // obj.filename = filename;
            // obj.fileURL = res.data.data.url;
            // that.fileList.push(obj);
            // that.fileNum++;
          });
      };
    }
  }
};
</script>

<style lang="sass" scope="scope">
  @import '@/assets/css/productSubmit.scss'
</style>