<template>
  <div class="introduce">
    <el-row type="flex" justify="center">
      <el-col class="introduce-content" :xs="24" :sm="24" :md="20" :lg="18" :xl="14">
        <h1>项目特色</h1>
        <el-row>
          <el-col class="introduce-pic" :lg="14" :xl="12">
            <img src="@/assets/img/pic1.png" alt />
          </el-col>
          <el-col :lg="10" :xl="12">
            <el-row class="introduce-content-box">
              <el-col class="introduce-content-img" :span="2">
                <img src="@/assets/img/one.png" alt />
              </el-col>
              <el-col class="introduce-content-txt" :span="20">
                <div>信息发布</div>
                <p>在里面可以快速发布、浏览失物招领&寻物启事信息，闲置物品交易， 班级校级等通知类消息及时推送。</p>
              </el-col>
            </el-row>
            <el-row class="introduce-content-box">
              <el-col class="introduce-content-img" :span="2">
                <img src="@/assets/img/two.png" alt />
              </el-col>
              <el-col class="introduce-content-txt" :span="20">
                <div>校园订购</div>
                <p>懒得出门？校园订购帮你解决校园快捷订水，食堂订餐以及其他一些 我们支持的校园内服务。</p>
              </el-col>
            </el-row>
            <el-row class="introduce-content-box">
              <el-col class="introduce-content-img" :span="2">
                <img src="@/assets/img/three.png" alt />
              </el-col>
              <el-col class="introduce-content-txt" :span="20">
                <div>校园代领</div>
                <p>与校园订购服务紧密联系，为在平台上订购物品的同学提供快速的代领 配送服务，同时也加入了快递&信件代领等一些其他的配送服务。</p>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <hr />
        <el-row>
          <el-col :lg="10" :xl="12">
            <el-row class="introduce-content-box">
              <el-col class="introduce-content-img" :span="2">
                <img src="@/assets/img/four.png" alt />
              </el-col>
              <el-col class="introduce-content-txt" :span="20">
                <div>学生自主加盟</div>
                <p>平台创新型模式，为在校学生搭建平台，学生们可以在平台上开设属于自己的服务，例如自主打印服务，技术维修服务，手工产品售卖等等。</p>
              </el-col>
            </el-row>
            <el-row class="introduce-content-box">
              <el-col class="introduce-content-img" :span="2">
                <img src="@/assets/img/five.png" alt />
              </el-col>
              <el-col class="introduce-content-txt" :span="20">
                <div>更多服务敬请期待</div>
                <p>物品租赁、资源共享……未来还有许多值得我们努力的方向</p>
              </el-col>
            </el-row>
          </el-col>
          <el-col class="introduce-pic" :lg="14" :xl="12">
            <img src="@/assets/img/pic2.png" alt />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style lang="sass" scope>
  @import '@/assets/css/introduce.scss'
</style>