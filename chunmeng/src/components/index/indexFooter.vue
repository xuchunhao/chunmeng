<template>
  <div class="index-footer">
    <el-row type="flex" justify="center">
      <el-col class="index-footer-content" :xs="24" :sm="24" :md="20" :lg="18" :xl="14">
        <img class="footer-img" src="@/assets/img/logo.png" alt />
        <div>©界面主题 - Design By：许淳皓</div>
        <div>
          <a target="_blank" href="http://beian.miit.gov.cn">浙ICP备19007544号</a>
        </div>
        <div>
          <img src="@/assets/img/beian.png" alt />
          <a
            target="_blank"
            href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33030302000773"
          >浙公网安备 33030302000773号</a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass">
  @import '@/assets/css/indexfooter.scss'
</style>