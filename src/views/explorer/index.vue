<template>
  <div class="app-container">
    <result/>
    <recent-record/>
    <common-footer/>
  </div>
</template>

<script>
import Result from '@/components/pages/explorer/Result'
import RecentRecord from '@/components/pages/explorer/RecentRecord'
import CommonFooter from '@/components/pages/common/Footer'

export default {
  components: {
    Result,
    RecentRecord,
    CommonFooter
  }
}
</script>

<style lang="stylus" scoped>
  .app-container
    width: 100%
    background:url('../../assets/images/background.png') no-repeat
    background-size:cover
    padding-top:18px
</style>
