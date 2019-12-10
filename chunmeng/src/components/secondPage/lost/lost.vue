<template>
  <div class="lost">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14">
        <h1>失物招领</h1>
        <el-row type="flex" justify="space-between">
          <div class="tag">
            <span @click="changeTag('all')" :class="{active: indexTag == 'all'}">全部</span>
            <span @click="changeTag('card')" :class="{active: indexTag == 'card'}">卡类</span>
            <span @click="changeTag('electronic')" :class="{active: indexTag == 'electronic'}">电子产品</span>
            <span @click="changeTag('book')" :class="{active: indexTag == 'book'}">书籍</span>
            <span @click="changeTag('daily')" :class="{active: indexTag == 'daily'}">日用品</span>
            <span @click="changeTag('else')" :class="{active: indexTag == 'else'}">其他</span>
          </div>
          <router-link to="/lostSubmit" tag="el-button">发布失物招领</router-link>
        </el-row>
        <div class="lost-content">
          <router-link :to="{name:'lostDetailed',params:{ lostname:item.id ,item:item}}" tag="div" class="lost-content-group-tpl" v-for="(item, index) in lostArray" :key="index">
            <img :src="'https://www.zustservice.cn' + item.pic_url1" alt />
            <div>
              <h3>{{"【失物招领】" + item.title}}</h3>
              <p>{{"详情介绍:" + item.content}}</p>
              <p>{{"捡到者姓名 :" + item.user_name}}</p>
              <p>{{"联系方式:" + item.user_phone}}</p>
            </div>
          </router-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from "@/api/index.js";
import axios from "axios";
import cookieFunction from "@/cookie/cookieFunction.js";

export default {
  data() {
    return {
      indexTag: "all",
      lostArray: []
    };
  },
  methods: {
    changeTag(tag) {
      this.indexTag = tag;
      let token = cookieFunction.getCookie("token");
      if(tag != "all"){
        axios
        .get(
          "/api/external/get/property?token=" +
            token +
            "&type=2" +
            "&lab=" +
            tag
        )
        .then(res => this.lostArray = res.data.data);
      }else if(tag == "all"){
        api.getLostProperty({}).then(res => this.lostArray = res.data.data);
      }
      
    }
  },
  mounted() {
    api.getLostProperty({}).then(res => this.lostArray = res.data.data );
  }
};
</script>

<style lang="sass">
  @import '@/assets/css/lost.scss'
</style>