<template>
  <div class="orderBlock">
    <div class="order-head">
      <div class="lbar"></div>
      <span>订单管理</span>
    </div>
    <div class="order-choice-blank">
      <div class="row">
        <div @click="goToMyOrderPage">
          <i class="iconfont orderfont">&#xe621;</i>
          <span>我的下单</span>
        </div>
        <div class="myOrder" @click="goToOtherOrderPage">
          <i class="iconfont orderfont">&#xe602;</i>
          <span>我的订单</span>
          <div class="num" v-if="this.userData.undeelOrdersNum">{{this.userData.undeelOrdersNum}}</div>
        </div>
        <div @click="goToOnlineOrderPage">
          <i class="iconfont orderfont">&#xe731;</i>
          <span>在线下单</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['userData'])
  },
  methods: {
    goToMyOrderPage () {
      this.$router.replace('/myOrder')
    },
    goToOtherOrderPage () {
      this.$router.replace('/otherOrder')
    },
    goToOnlineOrderPage () {
      this.$router.replace('/onlineOrder')
    }
  }
}
</script>
<style lang='scss'>
  .orderBlock {
    margin: 10px 0;
    .order-head {
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
        background-color: #378ade;
        margin: 0 8px;
        border-radius: 25%;
      }
    }
    .order-choice-blank {
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
        .myOrder {
          position: relative;
          .num {
            position: absolute;
            top: 0;
            right: 0;
            width: 20px;
            height: 20px;
            line-height: 20px;
            color: white;
            text-align: center;
            border-radius: 50%;
            background-color: red;
          }
        }
      }
    }
  }
</style>
