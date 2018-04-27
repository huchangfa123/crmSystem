<template>
  <div class='mainPage'>
    <menuBar></menuBar>
    <div class='page-right'>
      <myHeader></myHeader>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import myHeader from '../components/myHeader'
import menuBar from '../components/menuBar'
export default {
  components: {
    myHeader,
    menuBar
  }
}
</script>
<style lang='less'>
  .mainPage {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    .page-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      .content {
        flex: 1;
      }
    }
  }
</style>
