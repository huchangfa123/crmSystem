<template>
  <div class="ensureOrder">
    <mt-header class="ensureOrderHead" title="确定订单">
      <router-link to="/onlineOrder" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="goods-address">
      <div class="address-left">
        <i class="iconfont">&#xe60a;</i>
      </div>
      <div v-if="addressList.length > 0" class="address-content">
        <div class="content-header">
          <h4>{{defaultAddress.receivePeople}}</h4>
          <h4>{{defaultAddress.receivePhone}}</h4>
        </div>
        <div class="content-address">
          收货地址: {{defaultAddress.address}}
        </div>
      </div>
      <div v-if="addressList.length === 0" class="address-default">
        <span>请添加地址</span>
      </div>
      <div class="address-right">
        >
      </div>
    </div>
    <div class="order-list">
      <div class="orderItem">
        <div class="itemDes">
          <h3>正新鸡排</h3>
          <p>好吃就错吃点</p>
        </div>
        <div class="itemPrice">
          <p>x2</p>
          <p>￥26</p>
        </div>
      </div>
    </div>
    <div class="order-pic">
      <uploadFile
        title='付款截图'
      ></uploadFile>
    </div>
    <div class="bottom">
      <div class="bottom-pic">
        <i class="iconfont whitefont">&#xe601;</i>
        <div v-if="count > 0" class="bottom-count">{{count}}</div>
      </div>
      <div class="bottom-content">
        <h3 v-if="totalPrice!==0">￥{{totalPrice}}</h3>
      </div>
      <div class="bottom-btn">
        订单确定
      </div>
    </div>
  </div>
</template>
<script>
import uploadFile from '../../components/upload-file'
export default {
  name: 'ensureOrderPage',
  components: {
    uploadFile
  },
  data () {
    return {
      defaultAddress: {receivePeople: '1', receivePhone: '1', address: '1'},
      addressList: ['1'],
      count: 5,
      totalPrice: '123'
    }
  }
}
</script>
<style lang="scss">
.ensureOrder {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .ensureOrderHead{
    background-color: #378ade;
    height: 60px;
    font-size: 18px;
  }
  .goods-address {
    width: 100%;
    height: 100px;
    padding: 5px;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: flex-end;
    .address-left {
      width: 40px;
      height: 100%;
      font-size: 14px;
      color: black;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .address-content {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      .content-header {
        padding: 0 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .content-address {
        padding: 10px;
        color: #7e7373;
        word-break: break-all;
      }
    }
    .address-default {
      flex: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        color: #7e7373;
      }
    }
    .address-right {
      width: 40px;
      height: 100%;
      font-size: 20px;
      color: #7e7373;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .order-pic {
    width: 100%;
    height: 180px;
    border-top: 1px solid #e3e3e3;
  }
  .order-list {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .orderItem {
      height: 50px;
      min-height: 50px;
      width: 100%;
      display: flex;
      flex-direction: row;
      border-bottom: 1px solid #e3e3e3;
      .itemDes {
        width: 30%;
        padding: 5px 5px;
        h3 {
          font-size: 16px;
        }
        p {
          font-size: 14px;
          color: #7e7373
        }
      }
      .itemPrice {
        flex: 1;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        padding-right: 20px;
        p:nth-child(1) {
          font-size: 14px;
          padding-right: 20px;
        }
      }
    }
  }
  .bottom {
    height: 50px;
    width: 100%;
    display: flex;
    background-color: #378ade;
    flex-direction: row;
    .bottom-pic {
      position: relative;
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .bottom-count {
        top: 0;
        right: 0;
        position: absolute;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        color: white;
        background-color: red;
        line-height: 20px;
        text-align: center;
      }
    }
    .bottom-content {
      display: flex;
      flex: 1;
      align-items: center;
      margin-left: 10px;
      color: white;
    }
    .bottom-btn {
      width: 80px;
      background-color: #46e246;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
