<template>
  <div class="find-submit">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14" class="find-submit-content-box">
        <h1>丢失物品详情</h1>
        <div class="find-submit-content">
          <div class="info-box">
            <label>简要说明:</label>
            <input v-model="title" type="text" />
          </div>
          <div class="info-box">
            <label>详情介绍:</label>
            <input v-model="content" type="text" />
          </div>
          <div class="info-box">
            <label>丢失者姓名:</label>
            <input v-model="user_name" type="text" />
          </div>
          <div class="info-box">
            <label>手机号:</label>
            <input v-model="user_phone" type="text" />
          </div>
          <div class="info-box">
            <label>QQ号:</label>
            <input v-model="user_qq" type="text" />
          </div>
          <div class="info-box">
            <label>种类:</label>
            <el-select v-model="value" placeholder="请选择分类">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="file">
            选择图片
            <input @change="uploadPhoto($event)" type="file" class="kyc-passin" />
          </div>
          <el-alert
            v-for="(item,index) in fileList"
            :key="index"
            :title="item.filename"
            @close="deleteURL(index)"
            type="success"
            show-icon
          ></el-alert>

          <div>
            <el-button type="primary" @click="addFind">发布失物</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api/index.js";

export default {
  data() {
    return {
      fileNum: 0,
      fileList: [],
      title: "",
      content: "",
      user_name: "",
      user_phone: "",
      user_qq: "",
      options: [
        {
          value: "card",
          label: "卡类"
        },
        {
          value: "electronic",
          label: "电子产品"
        },
        {
          value: "book",
          label: "书籍"
        },
        {
          value: "daily",
          label: "日用品"
        },
        {
          value: "else",
          label: "其他"
        }
      ],
      value: ""
    };
  },
  methods: {
    deleteURL(num) {
      this.fileList.splice(num, 1);
      this.fileNum--;
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

      if (this.fileNum >= 3) {
        this.$message.error("最多选择三张图片");
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
        // this.img = imgcode;
        api
          .uploadImg({
            id: 1,
            status: 0,
            type: "pic",
            subtype: "upload",
            data: {
              from: "property",
              base64: imgcode
            }
          })
          .then(res => {
            let obj = {};
            obj.filename = filename;
            obj.fileURL = res.data.data.url;
            that.fileList.push(obj);
            that.fileNum++;
          });
      };
    },
    addFind() {
      switch (this.fileNum) {
        case 0:
          api
            .addFindProperty({
              id: 1,
              status: 0,
              type: "property",
              subtype: "add",
              data: {
                type: 1,
                lab: this.value,
                title: this.title,
                content: this.content,
                occurrence_time: "",
                user_name: this.user_name,
                user_phone: this.user_phone,
                user_qq: this.user_qq,
                publish_time: "",
                pic_num: this.fileNum
              }
            })
            .then(
              res => {
                if(res.status == 200){
                  this.$message.success("发布成功");
                }
              },
              error => {
                this.$message.error("发布失败，请检查是否正确填写");
              }
            );
          break;
        case 1:
          api
            .addFindProperty({
              id: 1,
              status: 0,
              type: "property",
              subtype: "add",
              data: {
                type: 1,
                lab: this.value,
                title: this.title,
                content: this.content,
                occurrence_time: "",
                user_name: this.user_name,
                user_phone: this.user_phone,
                user_qq: this.user_qq,
                publish_time: "",
                pic_num: this.fileNum,
                pic_url1: this.fileList[0].fileURL
              }
            })
            .then(
              res => {
                if(res.status == 200){
                  this.$message.success("发布成功");
                }
              },
              error => {
                this.$message.error("发布失败，请检查是否正确填写");
              }
            );
          break;
        case 2:
          api
            .addFindProperty({
              id: 1,
              status: 0,
              type: "property",
              subtype: "add",
              data: {
                type: 1,
                lab: this.value,
                title: this.title,
                content: this.content,
                occurrence_time: "",
                user_name: this.user_name,
                user_phone: this.user_phone,
                user_qq: this.user_qq,
                publish_time: "",
                pic_num: this.fileNum,
                pic_url1: this.fileList[0].fileURL,
                pic_url2: this.fileList[1].fileURL
              }
            })
            .then(
              res => {
                if(res.status == 200){
                  this.$message.success("发布成功");
                }
              },
              error => {
                this.$message.error("发布失败，请检查是否正确填写");
              }
            );
          break;
        case 3:
          api
            .addFindProperty({
              id: 1,
              status: 0,
              type: "property",
              subtype: "add",
              data: {
                type: 1,
                lab: this.value,
                title: this.title,
                content: this.content,
                occurrence_time: "",
                user_name: this.user_name,
                user_phone: this.user_phone,
                user_qq: this.user_qq,
                publish_time: "",
                pic_num: this.fileNum,
                pic_url1: this.fileList[0].fileURL,
                pic_url2: this.fileList[1].fileURL,
                pic_url3: this.fileList[2].fileURL
              }
            })
            .then(
              res => {
                if(res.status == 200){
                  this.$message.success("发布成功");
                }
              },
              error => {
                this.$message.error("发布失败，请检查是否正确填写");
              }
            );
            break;
      }
    }
  }
};
</script>

<style lang="sass">
  @import '@/assets/css/findSubmit.scss'
</style>