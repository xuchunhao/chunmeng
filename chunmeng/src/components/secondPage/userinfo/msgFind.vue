<template>
  <div class="msg-find">
    <div class="find-content">
      <router-link
        :to="{name:'findDetailed',params:{ findname:item.id ,item:item}}"
        tag="div"
        class="find-content-group-tpl"
        v-for="(item, index) in findArray"
        :key="index"
      >
        <img :src="'https://www.zustservice.cn' + item.pic_url1" alt />
        <div>
          <h3>{{"【寻物启事】" + item.title}}</h3>
          <p>{{"详情介绍:" + item.content}}</p>
          <p>{{"丢失者姓名 :" + item.user_name}}</p>
          <p>{{"联系方式:" + item.user_phone}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";
import cookieFunction from "@/cookie/cookieFunction.js";

export default {
  data() {
    return {
      findArray: []
    };
  },
  mounted() {
    api
      .getUserInfo({})
      .then(res => {
        let token = cookieFunction.getCookie("token");
        return axios.get(
          "/api/external/get/property?token=" +
            token +
            "&type=1" +
            "&user_id=" +
            res.data.data.id
        );
      })
      .then(res => {
        this.findArray = res.data.data;
      });
  }
};
</script>

<style lang="sass" scoped>
  @import '@/assets/css/msgFind.scss'
</style>

