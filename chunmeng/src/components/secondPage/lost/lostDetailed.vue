<template>
  <div class="lost-detailed">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14">
        <div class="lost-detailed-content">
          <h1>失物详情</h1>
          <el-row class="lost-detailed-box">
            <el-col :md="8">
              <p>【失物招领】:</p>
              <p>详情介绍:</p>
              <p>捡到者姓名:</p>
              <p>联系方式:</p>
            </el-col>
            <el-col :md="16">
              <p>{{item.title}}</p>
              <p>{{item.content}}</p>
              <p>{{item.user_name}}</p>
              <p>{{item.user_phone}}</p>
            </el-col>
          </el-row>
          <el-carousel v-if="isPic" arrow="always" class="carousel">
            <el-carousel-item v-for="(item,index) in picList" :key="index">
              <img :src="item" alt />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
  </div>
</template>



<script>
import axios from "axios";
import cookieFunction from "@/cookie/cookieFunction.js";

export default {
  data() {
    return {
      item: {},
      isPic: false,
      picList:[]
    };
  },
  mounted() {
    let id = this.$route.params.lostname;
    let token = cookieFunction.getCookie("token");
    axios
      .get(
        "/api/external/get/property?token=" + token + "&type=2" + "&id=" + id
      )
      .then(res => {
        this.item = res.data.data[0];
        switch (this.item.pic_num) {
          case 1:
            this.isPic = true;
            this.picList.push(this.item.pic_url1);
            break;
          case 2:
            this.isPic = true;
            this.picList.push(this.item.pic_url1,this.item.pic_url2);
            break;
          case 3:
            this.isPic = true;
            this.picList.push(this.item.pic_url1,this.item.pic_url2,this.item.pic_url3);
            break;
        }
      });
  }
};
</script>

<style lang="sass">
  @import '@/assets/css/lostDetailed.scss'
</style>