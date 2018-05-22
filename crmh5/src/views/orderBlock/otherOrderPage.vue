<template>
  <div class="otherOrder">
    <mt-header class="otherOrderHead" title="我的订单">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="choice-time">
      <span>开始:</span>
      <mt-button @click="setFromTime" class="time-btn" type="default">{{from}}</mt-button>
      <span>-</span>
      <span>结束:</span>
      <mt-button @click="setEndTime" class="time-btn" type="default">{{end}}</mt-button>
    </div>
    <div class="choice-state">
      <span>下单状态:</span>
      <mt-button @click="setOrderState" class="time-btn">{{orderState}}</mt-button>
      <mt-button @click="search" class="time-btn btn3" type="default">确定</mt-button>
    </div>
    <div class="order-body" :infinite-scroll-disabled="isOver" v-infinite-scroll="loadMore" infinite-scroll-distance="0" infinite-scroll-immediate-check="false">
      <div class="order-item" v-for="(item, index1) in myOrderList" :key="index1" >
        <div class="order-header">
         <h3>{{orderTitle[item.state - 1]}}</h3>
         <p>{{item.createAt}}</p>
        </div>
        <div class="order-content">
          <div class="goods-item" v-for="(good, index2) in item.goods" :key="index2">
            <div class="itemDes">
              <img :src="good.picture" >
              <h3>{{good.name}}</h3>
              <p>{{good.des}}</p>
            </div>
            <div class="itemPrice">
              <p>x{{good.num}}</p>
              <p>￥{{good.num * good.price}}</p>
            </div>
          </div>
        </div>
        <div class="order-sum">
          <span>总价:￥{{item.sumPrice}}</span>
        </div>
        <div class="order-bottom">
          <mt-button @click="handClick1(index1)" class="bottom-btn" v-if="buttonTitle1[item.state - 1]">{{buttonTitle1[item.state - 1]}}</mt-button>
          <mt-button @click="handClick2(index1)" class="bottom-btn" v-if="buttonTitle2[item.state - 1]">{{buttonTitle2[item.state - 1]}}</mt-button>
        </div>
      </div>
    </div>
    <mt-datetime-picker
      ref="picker1"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      v-model="pickerValue1"
      @confirm="handleConfirm1"
    >
    </mt-datetime-picker>
    <mt-datetime-picker
      ref="picker2"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      v-model="pickerValue2"
      @confirm="handleConfirm2"
    >
    </mt-datetime-picker>
    <mt-popup
      class="bottom"
      v-model="popupVisible"
      position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import { getTime } from '../../utils/format'
import { Toast, MessageBox } from 'mint-ui'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'
export default {
  name: 'otherOrderPage',
  computed: {
    ...mapGetters(['myOrderList'])
  },
  data () {
    return {
      orderId: '',
      from: getTime(),
      end: getTime(),
      pickerValue1: '',
      pickerValue2: '',
      selected: '',
      orderState: '已下单',
      orderTitle: ['待接单', '已接单', '已拒绝', '已出货', '交易已确认', '正在申请取消', '已取消'],
      buttonTitle1: ['确认接单', '确定发货', '', '', '', '同意取消', ''],
      buttonTitle2: ['拒绝接单', '', '', '', '', '拒绝取消', ''],
      slots: [
        {
          flex: 1,
          values: ['待接单', '已接单', '已拒绝', '已出货', '交易已确认', '申请取消', '已取消'],
          textAlign: 'center'
        }
      ],
      popupVisible: false,
      curPage: 1,
      isOver: false
    }
  },
  async created () {
    await this.getMyOrderList({
      page: this.curPage,
      limit: 5,
      conditions: {
        state: 1
      }
    })
    this.format()
  },
  methods: {
    ...mapActions(['getMyOrderList', 'getMoreMyOrderList', 'updateOrderState']),
    setFromTime () {
      this.$refs.picker1.open()
    },
    setEndTime () {
      this.$refs.picker2.open()
    },
    format () {
      if (this.myOrderList.length === 0) return
      for (let item of this.myOrderList) {
        item.createAt = moment(item.createAt).format('MM-DD HH:mm')
      }
    },
    handleConfirm1 () {
      if (new Date(this.pickerValue1) > new Date(this.end)) {
        return Toast('开始时间不能晚于结束时间')
      }
      this.from = getTime(this.pickerValue1)
    },
    handleConfirm2 () {
      if (new Date(this.pickerValue2) < new Date(this.from)) {
        return Toast('结束时间不能早于开始时间')
      }
      this.end = getTime(this.pickerValue2)
    },
    onValuesChange (picker, values) {
      this.orderState = values[0]
    },
    setOrderState () {
      this.popupVisible = true
    },
    async loadMore () {
      console.log(this.isOver)
      if (!this.isOver) {
        this.curPage += 1
        let result = await this.getMoreMyOrderList({
          page: this.curPage,
          limit: 5,
          conditions: {
            state: this.slots[0].values.indexOf(this.orderState)
          }
        })
        if (result) {
          if (result.data.data.length === 0) {
            this.isOver = true
          }
        }
      }
    },
    async search () {
      this.curPage = 1
      this.isOver = false
      let conditions = {}
      if (this.pickerValue1) {
        conditions.beginDate = this.pickerValue1
      }
      if (this.pickerValue2) {
        conditions.endDate = this.pickerValue2
      }
      conditions.state = this.slots[0].values.indexOf(this.orderState) + 1
      await this.getMyOrderList({
        page: this.curPage,
        limit: 5,
        conditions
      })
      this.format()
    },
    async handClick1 (index) {
      let { id, state } = this.myOrderList[index]
      switch (state) {
        case 1: {
          let result = await this.updateOrderState({
            id,
            state: 2,
            index
          })
          console.log(result)
          break
        }
        case 2: {
          MessageBox.prompt('请输入快递单号').then(async ({ value, action }) => {
            if (!value) {
              return Toast({
                message: '快递单号不能为空'
              })
            }
            if (action === 'confirm') {
              let result = await this.updateOrderState({
                id,
                state: 4,
                trackingNumber: value,
                index
              })
              console.log(result)
            }
          }).catch(err => {
            console.log(err)
            Toast({
              message: '已取消'
            })
          })
          break
        }
        case 6: {
          let result = await this.updateOrderState({
            id,
            state: 7,
            index
          })
          console.log(result)
          break
        }
        default:
          break
      }
    },
    async handClick2 (index) {
      let { id, state } = this.myOrderList[index]
      switch (state) {
        case 1: {
          let result = await this.updateOrderState({
            id,
            state: 3,
            index
          })
          console.log(result)
          break
        }
        case 6: {
          let result = await this.updateOrderState({
            id,
            state: 2,
            index
          })
          console.log(result)
          break
        }
        default:
          break
      }
    }
  }
}
</script>
<style lang="scss">
.otherOrder {
  display: flex;
  flex-direction: column;
  height: 100%;
  .otherOrderHead{
    background-color: #378ade;
    height: 60px;
    font-size: 18px;
  }
  .choice-time {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 10px 10px;
    span {
      margin: 0 5px;
      font-size: 14px;
    }
    .time-btn {
      font-size: 14px;
      width: 120px;
    }
  }
  .choice-state {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 10px;
    span {
      font-size: 14px;
    }
    .time-btn {
      margin-left: 10px;
      font-size: 14px;
      width: 120px;
    }
    .btn3 {
      background-color: #378ade;
      color: white;
    }
  }
  .order-body {
    margin-top: 5px;
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    .order-item {
      border-top: 1px solid #e3e3e3;
      border-bottom: 1px solid #e3e3e3;
      .order-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        margin-left: 10px;
        p {
          color:#7e7373;
          margin-right: 20px;
        }
      }
      .order-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f5eaea;
        .goods-item {
          height: 40px;
          min-height: 40px;
          width: 100%;
          display: flex;
          flex-direction: row;
          margin: 5px;
          .itemDes {
            width: 60%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #7e7373;
            padding-left: 10px;
            img {
              width: 35px;
              height: 35px;
              margin-left: 5px;
              margin-right: 20px;
            }
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
            p:nth-child(2) {
              width: 60px;
              text-align: left;
            }
          }
        }
      }
      .order-sum {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        span {
          margin: 5px 20px 0 0;
        }
      }
      .order-bottom {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        .bottom-btn {
          background-color: #378ade;
          color: white;
          font-size: 14px;
          height: 35px;
          margin: 10px;
          margin-right: 20px;
        }
      }
    }
  }
  .bottom {
    width: 100%;
  }
}
</style>
