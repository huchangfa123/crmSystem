<template>
  <div class="onlineOrder">
    <mt-header class="onlineOrderHead" title="在线下单">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="goods-address" @click="goToSetAddress">
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
    <div class="goods-list">
      <div class="goods-item" v-for="(item, index) in this.goodsList" :key='index'>
        <div class="goods-pic">
          <img :src='item.pictures[0]'>
        </div>
        <div class="goods-content" v-if="goodsList.length > 0">
          <div class="goods-name"><h3>{{item.name}}(￥{{item.price}})</h3></div>
          <div class="goods-bottom">
            <div class="goods-des">{{item.des}}</div>
            <div class="goods-btn">
              <mt-button @click="ensureCount(index)" type="primary">下单</mt-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div @click="setFloatBottom" class="bottom">
      <div class="bottom-pic">
        <i class="iconfont whitefont">&#xe601;</i>
        <div v-if="count > 0" class="bottom-count">{{count}}</div>
      </div>
      <div class="bottom-content">
        <h3 v-if="totalPrice!==0">￥{{totalPrice.toFixed(2)}}</h3>
      </div>
      <div @click="goToEnsure" class="bottom-btn">
        提交订单
      </div>
    </div>
    <div v-if="showFloatBottom" class="float-bottom">
      <div class="float-bottom-item" v-for="(item, index) in orderList" :key='index'>
        <h3>{{item.name}}</h3>
        <span class="price">￥{{item.price * item.num}}</span>
        <div class="end">
          <div @click="reduceCount(index)" class="pic-btn">-</div>
          <span>{{item.num}}</span>
          <div @click="addCount(index)" class="pic-btn">+</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { MessageBox, Toast } from 'mint-ui'
export default {
  name: 'onlineOrderPage',
  computed: {
    ...mapGetters(['goodsList', 'addressList'])
  },
  data () {
    return {
      defaultAddress: {},
      orderList: [],
      totalPrice: 0,
      count: 0,
      showFloatBottom: false
    }
  },
  async created () {
    let result = await this.getGoodsList()
    console.log('result', result)
    if (result.data.code === 200) {
      await this.getAddressList()
      this.getDefaultAddress()
    }
    this.cleanCurOrderData()
  },
  methods: {
    ...mapActions(['getGoodsList', 'getAddressList', 'setCurOrderData', 'cleanCurOrderData']),
    getDefaultAddress () {
      for (let item of this.addressList) {
        if (item.isDefault) {
          this.defaultAddress = item
          break
        }
      }
    },
    ensureCount (index) {
      MessageBox.prompt('请输入购买数量').then(({ value, action }) => {
        if (action === 'confirm') {
          value = parseFloat(value)
          if (typeof value === 'number' && value % 1 === 0 && value > 0) {
            let hasOrder = false
            for (let order of this.orderList) {
              if (order.id.toString() === this.goodsList[index].id.toString()) {
                this.count = this.count - order.num + value
                this.totalPrice = this.totalPrice - order.num * parseFloat(order.price).toFixed(2) + value * parseFloat(order.price).toFixed(2)
                order.num = value
                hasOrder = true
                break
              }
            }
            if (!hasOrder) {
              this.orderList.push(Object.assign(this.goodsList[index], {num: value}))
              this.count += value
              this.totalPrice += value * parseFloat(this.goodsList[index].price).toFixed(2)
            }
          } else {
            return Toast({
              message: '输入信息有误'
            })
          }
        }
      })
    },
    goToEnsure () {
      if (!this.defaultAddress.receivePeople) {
        return Toast({
          message: '请设置默认地址'
        })
      }
      if (this.orderList.length === 0) {
        return Toast({
          message: '购物车为空'
        })
      }
      this.setCurOrderData({
        curAddress: this.defaultAddress,
        orderList: this.orderList,
        totalPrice: this.totalPrice,
        count: this.count
      })
      this.$router.push('/ensureOrder')
    },
    goToSetAddress () {
      this.$router.push('/managerAddress')
    },
    setFloatBottom () {
      this.showFloatBottom = !this.showFloatBottom
    },
    reduceCount (index) {
      this.orderList[index].num -= 1
      this.count -= 1
      this.totalPrice -= parseFloat(this.orderList[index].price).toFixed(2)
      console.log(typeof this.totalPrice)
      if (this.orderList[index].num === 0) {
        this.orderList.splice(index, 1)
      }
    },
    addCount (index) {
      this.orderList[index].num += 1
      this.count += 1
      this.totalPrice = (parseFloat(this.totalPrice) + parseFloat(this.orderList[index].price)).toFixed(2)
    }
  }
}
</script>
<style lang="scss">
.onlineOrder {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .onlineOrderHead{
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
  .goods-list {
    flex: 1;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .goods-item {
      width: 100%;
      height: 120px;
      min-height: 120px;
      display: flex;
      flex-direction: row;
      border-top: 1px solid #e0e0e0;
      border-bottom: 1px solid #e0e0e0;
      .goods-pic {
        width: 120px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        img {
          width: 100px;
          height: 100px;
          border: 1px solid #e0e0e0;
        }
      }
      .goods-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        .goods-name {
          width: 100%;
          padding-left: 10px;
          padding-top: 10px;
          height: 20px;
        }
        .goods-bottom {
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          padding-bottom: 10px;
          padding-left: 10px;
          word-break: break-all;
          .goods-des {
            width: 70%;
            font-size: 14px;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            color: #7e7373;
          }
          .goods-btn {
            padding-right: 5px;
            button {
              font-size: 16px;
              width: 100%;
              height: 35px;
            }
          }
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
  .float-bottom {
    position: absolute;
    height: auto;
    max-height: 300px;
    overflow: scroll;
    display: flex;
    flex-direction: column;
    bottom: 50px;
    width: 100%;
    .float-bottom-item {
      width: 100%;
      min-height: 50px;
      height: 50px;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-top:1px solid #e3e3e3;
      position: relative;
      background-color: white;
      h3 {
        margin: 0 10px;
      }
      .price {
        position: absolute;
        right: 95px;
        color: red;
        font-size: 17px;
      }
      .end {
        position: absolute;
        width: 75px;
        right: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .pic-btn {
          border-radius: 50%;
          height: 20px;
          width: 20px;
          line-height: 20px;
          text-align: center;
          background-color: #378ade;
          color: white;
          font-size: 16px;
          margin: 5px;
        }
      }
    }
  }
}
</style>
