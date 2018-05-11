<template>
  <div class="goodsBlock">
    <div class="goods-head">
      <div class="lbar"></div>
      <span>出货管理</span>
    </div>
    <div class="goods-choice-blank">
      <div class="row">
        <div @click="goToProfigPage">
          <i class="iconfont goodsfont">&#xe637;</i>
          <span>差价利润</span>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    goToProfigPage () {
      this.$router.replace('/profit')
    }
  }
}
</script>
<style lang='scss'>
  .goodsBlock {
    margin: 10px 0;
    .goods-head {
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 30px;
      line-height: 30px;
      font-size: 16px;
      background-color: #e8dfdf;
      .lbar {
        height: 60%;
        width: 5px;
        background-color: #ff9f11;
        margin: 0 8px;
        border-radius: 25%;
      }
    }
    .goods-choice-blank {
      display: flex;
      flex-direction: column;
      .row {
        display: flex;
        flex-direction: row;
        height: 120px;
        width: 100%;
        div {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            border: 1px solid #e8dfdf;
            span {
              margin: 5px 0;
              font-size: 14px;
            }
        }
      }
    }
  }
</style>
