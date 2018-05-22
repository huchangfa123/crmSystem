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
      <div class="address-content">
        <div class="content-header">
          <h4>{{curOrderData.curAddress.receivePeople}}</h4>
          <h4 class="phone">{{curOrderData.curAddress.receivePhone}}</h4>
        </div>
        <div class="content-address">
          收货地址: {{curOrderData.curAddress.address}}
        </div>
      </div>
    </div>
    <div class="order-list">
      <div class="orderItem" v-for="(item, index) in curOrderData.orderList" :key='index'>
        <div class="itemDes">
          <h3>{{item.name}}</h3>
          <p>{{item.des}}</p>
        </div>
        <div class="itemPrice">
          <p>x{{item.num}}</p>
          <p>￥{{item.num * item.price}}</p>
        </div>
      </div>
    </div>
    <div class="order-pic">
      <uploadFile
        title='付款截图'
        v-on:curPicUrl="setOrderPic"
      ></uploadFile>
    </div>
    <div class="bottom">
      <div class="bottom-pic">
        <i class="iconfont whitefont">&#xe601;</i>
        <div v-if="curOrderData.count > 0" class="bottom-count">{{curOrderData.count}}</div>
      </div>
      <div class="bottom-content">
        <h3 v-if="curOrderData.totalPrice!==0">￥{{curOrderData.totalPrice}}</h3>
      </div>
      <div @click="ensureOrder" class="bottom-btn">
        订单确定
      </div>
    </div>
  </div>
</template>
<script>
import uploadFile from '../../components/upload-file'
import { mapGetters, mapActions } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  name: 'ensureOrderPage',
  components: {
    uploadFile
  },
  computed: {
    ...mapGetters(['curOrderData'])
  },
  data () {
    return {
      uploadPic: ''
    }
  },
  created () {
    console.log('curOrderData', this.curOrderData)
  },
  methods: {
    ...mapActions(['createOrder']),
    setOrderPic (data) {
      this.uploadPic = data.imgUrl
    },
    async ensureOrder () {
      if (!this.uploadPic) {
        return Toast({
          message: '付款截图未提交'
        })
      }
      let { curAddress, orderList } = this.curOrderData
      console.log('curAddress', curAddress)
      let conditions = {
        goods: [],
        screenshots: this.uploadPic,
        address: curAddress.address,
        receivePeople: curAddress.receivePeople,
        postalCode: curAddress.postalCode,
        receivePhone: curAddress.receivePhone
      }
      for (let item of orderList) {
        conditions.goods.push({
          name: item.name,
          price: item.price,
          picture: item.pictures[0],
          num: item.num
        })
      }
      console.log(conditions)
      let result = await this.createOrder(conditions)
      if (result.data.code === 200) {
        Toast({
          message: '订单成功生成'
        })
        return this.$router.replace('/myOrder')
      }
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
        .phone {
          margin-right: 30px;
        }
      }
      .content-address {
        padding: 10px;
        color: #7e7373;
        word-break: break-all;
      }
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
        width: 60%;
        padding: 5px 5px;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        line-height: 22px;
        h3 {
          font-size: 16px;
        }
        p {
          width: 90%;
          font-size: 14px;
          color: #7e7373;
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
