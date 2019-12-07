<template>
  <div class="msg-lost">
    <div class="lost-content">
      <router-link
        :to="{name:'lostDetailed',params:{ lostname:item.id ,item:item}}"
        tag="div"
        class="lost-content-group-tpl"
        v-for="(item, index) in lostArray"
        :key="index"
      >
        <img :src="'https://www.zustservice.cn' + item.pic_url1" alt />
        <div>
          <h3>{{"【失物招领】" + item.title}}</h3>
          <p>{{"详情介绍:" + item.content}}</p>
          <p>{{"捡到者姓名 :" + item.user_name}}</p>
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
      lostArray: []
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
            "&type=2" +
            "&user_id=" +
            res.data.data.id
        );
      })
      .then(res => {
        this.lostArray = res.data.data;
      });
  }
};
</script>

<style lang="sass" scoped>
  @import '@/assets/css/msgLost.scss'
</style>

