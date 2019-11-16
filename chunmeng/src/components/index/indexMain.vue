<template>
  <div class="main">
    <four-rows/>
    <about />
    <introduce />
  </div>
</template>

<script>
import fourRows from './indexMain/fourRows'
import about from './indexMain/about'
import introduce from './indexMain/introduce'

export default {
  components:{
    fourRows,
    about,
    introduce
  }
}
</script>