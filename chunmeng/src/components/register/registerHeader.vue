<template>
  <div class="register-header">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14">
        <el-row class="register-header-content" type="flex" justify="space-between">
          <router-link class="register-header-logo" to="/">
            <img src="@/assets/img/logo_2.png" alt />
          </router-link>
          <router-link class="register-header-btn" to="/">
            <el-button>
              <i class="iconfont">&#xe62c;</i>
              <span class="m-l">首页</span>
            </el-button>
          </router-link>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass">
  @import '@/assets/css/registerHeader.scss'
</style>