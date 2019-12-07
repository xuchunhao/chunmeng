<template>
  <div class="msg-deposit">
    <div class="info-box">
      <label>充值金额:</label>
      <input type="text" v-model="wealth" />
    </div>
    <div class="info-box">
      <el-button @click="deposit">我要充值</el-button>
    </div>
  </div>
</template>

<script>
import api from "@/api/index.js";

export default {
  data() {
    return {
      wealth:""
    }
  },
  methods: {
    deposit() {
      api.deposit({
        wealth: this.wealth
      }).then(res => this.$message.success("充值成功"));
    }
  },
}
</script>

<style lang="sass">
  @import '@/assets/css/msgDeposit.scss'
</style>