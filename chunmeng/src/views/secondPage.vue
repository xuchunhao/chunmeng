<template>
  <div class="second-page">
    <second-page-header></second-page-header>
    <router-view></router-view>
  </div>
</template>

<script>
import cookieFunction from "@/cookie/cookieFunction.js";
import secondPageHeader from "@/components/secondPage/secondPageHeader";
import api from "@/api/index.js";

export default {
  data() {
    return {
      
    };
  },
  components:{
    secondPageHeader
  }
};
</script>

<style lang="sass">
</style>