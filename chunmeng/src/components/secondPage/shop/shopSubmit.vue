<template>
  <div class="shop-submit">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14" class="shop-submit-content-box">
        <h1>店铺信息</h1>
        <div class="shop-submit-content">
          <div class="info-box">
            <label>店铺名称:</label>
            <input v-model="shop_name" type="text" />
          </div>
          <div class="info-box">
            <label>店铺内容:</label>
            <input v-model="shop_content" type="text" />
          </div>
          <div class="file">
            选择图片
            <input @change="uploadPhoto($event)" type="file" class="kyc-passin" />
          </div>

          <div>
            <el-button type="primary" @click="addShop">创建店铺</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api/index.js";
import { setTimeout } from "timers";

export default {
  data() {
    return {
      shop_name: "",
      shop_content: "",
      pic_url: "",
      id: "",
      shop_id: ""
    };
  },
  methods: {
    addShop() {
      api
        .addShop({
          id: 1,
          status: 0,
          type: "shop",
          subtype: "creat",
          data: {
            shop_name: this.shop_name,
            shop_content: this.shop_content,
            user_id: this.id
          }
        })
        .then(res => {
          console.log(res);
          let shop_id = res.data.data.shop_id;
          let pic_url = this.pic_url;
          let shop_content = this.shop_content;
          console.log(res.data.data.shop_id);
          setTimeout(function() {
            api.addShop({
              id: 1,
              status: 0,
              type: "shop",
              subtype: "update",
              data: {
                pic_url: pic_url,
                shop_content: shop_content,
                shop_id: shop_id
              }
            }).then(res => console.log(res));
          }, 1000);
        })
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
  },
  mounted() {
    api.getUserInfo({}).then(res => {
      this.id = res.data.data.id;
    });
  }
};
</script>

<style lang="sass" scope="scope">
  @import '@/assets/css/shopSubmit.scss'
</style>