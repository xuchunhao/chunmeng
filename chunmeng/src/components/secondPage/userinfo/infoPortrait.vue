<template>
  <div class="info-portrait">
    <h1>修改头像</h1>
    <el-row>
      <el-col :md="16">
        <!-- 裁剪 -->
        <vueCropper
          style="width:100%;height:300px"
          ref="cropper"
          :img="attach.customaryUrl"
          :autoCrop="options.autoCrop"
          :fixedBox="options.fixedBox"
          :canMoveBox="options.canMoveBox"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :centerBox="options.centerBox"
          :fixed="options.fixed"
          @realTime="realTime"
        ></vueCropper>
      </el-col>
      <el-col :md="8">
        <h2 align="center">头像预览</h2>
        <div class="show-preview">
          <div :style="previews.div" class="preview">
            <img :src="previews.url" :style="previews.img" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <input
        type="file"
        id="uploads"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event,1)"
        class="el-button"
        style="margin-bottom:15px"
      />
    </el-row>
    <el-row class="footerBtn" align="center">
      <el-button class="btn-content" type="primary" size="small" round @click="cut('blob')">确认</el-button>
    </el-row>
  </div>
</template>

<script>
//数据库里需要存两份图片地址，一张为原图地址，一张为裁剪后的头像地址
import { VueCropper } from "vue-cropper";
import api from "@/api/index.js";

export default {
  components: {
    VueCropper
  },
  data() {
    return {
      id: "",
      options: {
        autoCrop: true, //默认生成截图框
        fixedBox: false, //固定截图框大小
        canMoveBox: true, //截图框不能拖动
        autoCropWidth: 200, //截图框宽度
        autoCropHeight: 200, //截图框高度
        centerBox: false, //截图框被限制在图片里面
        fixed: true
      },
      previews: {}, //实时预览图数据
      attach: {
        //后端附件表
        id: "",
        userId: "",
        customaryUrl: "", //原图片路径
        laterUrl: "", //裁剪后图片路径  /static/logo.png
        attachType: "photo" //附件类型
      },
      fileName: "", //本机文件地址
      uploadImgRelaPath: "" //上传后图片地址
    };
  },
  methods: {
    //实时预览
    realTime(data) {
      this.previews = data;
    },
    //加载头像信息
    find() {
      this.userId = sessionStorage.getItem("userId");
      this.$axios.post("/api/attach/find", this.attach).then(res => {
        // console.log(res);
      });
    },
    //选择本地图片
    uploadImg(e, num) {
      var file = e.target.files[0];
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        this.$message.error("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
      }
      // console.log(e.target.result);
      //fileReader 接口，用于异步读取文件数据
      var reader = new FileReader();
      reader.readAsDataURL(file); //重要 以dataURL形式读取文件
      reader.onload = e => {
        // data = window.URL.createObjectURL(new Blob([e.target.result])) 转化为blob格式

        let data = e.target.result;

        this.attach.customaryUrl = data;
        // 转化为base64
        // reader.readAsDataURL(file)
        // 转化为blob
      };
    },
    //确认截图,上传
    cut(type) {
      this.$refs.cropper.getCropData(res => {
        //res是裁剪后图片的bolb对象
        api
          .changePortrait({
            id: 1,
            status: 0,
            type: "pic",
            subtype: "upload",
            data: {
              from: "portrait",
              base64: res,
              name: this.id
            }
          })
          .then(res => {
            // console.log(res)
            this.$router.go(0);
          });
      });
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
  @import '@/assets/css/infoPortrait.scss'
</style>