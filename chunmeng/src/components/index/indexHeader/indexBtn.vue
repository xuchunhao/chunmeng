<template>
  <div class="index-btn">
    <el-button class="active">
      <i class="iconfont">&#xe62c;</i>
      首页
    </el-button>
    <router-link to="/register">
      <el-button>
        <i class="iconfont">&#xe8ca;</i>
        注册
      </el-button>
    </router-link>
    <router-link to="/login">
      <el-button>
        <i class="iconfont">&#xe693;</i>
        登录
      </el-button>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>