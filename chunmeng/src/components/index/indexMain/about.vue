<template>
  <div class="about">
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="14">
        <el-row>
          <el-col :span="24">
            <div class="wow">
              <h1>项目简介</h1>
              <p>“校园自主与互助服务平台”是由浙江科技学院蓝色空间「码三秃」团队主持开发并运维的一项面向校园师生的开放型平台， 该项目目前正在参加校春萌项目</p>
            </div>
          </el-col>
        </el-row>
        <el-row class="about-content">
          <el-col class="about-content-every" :md="8">
            <i class="iconfont icon-yellow">&#xe6e5;</i>
            <h3>发展</h3>
            <p>从零基础入门到现在小有成果，团队三人历经 一个月的学习摸索，做出了这个项目的雏形。</p>
          </el-col>
          <el-col class="about-content-every" :md="8">
            <i class="iconfont icon-blue">&#xe64e;</i>
            <h3>沟通</h3>
            <p>团队通过GitHub进行团队项目开发，并利用Telegram进行团队间交流，利用TG插件关注项目进度。</p>
          </el-col>
          <el-col class="about-content-every" :md="8">
            <i class="iconfont icon-red">&#xe77c;</i>
            <h3>团队</h3>
            <p>「码三秃」团队由三位志同道合的有“痣”青年组成。想当初组队时的一时上头，真不敢相信我们做出来了。</p>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  
}
</script>

<style lang="sass" scope>
  @import '@/assets/css/about.scss'
</style>