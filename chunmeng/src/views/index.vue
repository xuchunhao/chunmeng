<template>
  <div class="index">
    <index-header />
    <index-main />
    <index-footer />
  </div>
</template>

<script>
import indexHeader from '@/components/index/indexHeader'
import indexMain from '@/components/index/indexMain'
import indexFooter from '@/components/index/indexFooter'

export default {
  name: 'index',
  components: {
    indexHeader,
    indexMain,
    indexFooter
  }
}
</script>

<style lang="sass">
  @import '@/assets/css/index.scss'
</style>