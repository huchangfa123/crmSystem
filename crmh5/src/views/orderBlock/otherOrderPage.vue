<template>
  <div class="otherOrder">
    <mt-header class="otherOrderHead" title="我的订单">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mt-search
      v-model="orderId"
      cancel-text="取消"
      placeholder="订单号">
    </mt-search>
    <div class="choice-time">
      <span>开始:</span>
      <mt-button @click="setFromTime" class="time-btn" type="default">{{from}}</mt-button>
      <span>-</span>
      <span>结束:</span>
      <mt-button @click="setEndTime" class="time-btn" type="default">{{end}}</mt-button>
      <mt-button class="time-btn btn3" type="default">确定</mt-button>
    </div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">待出货</mt-tab-item>
      <mt-tab-item id="2">已出货</mt-tab-item>
      <mt-tab-item id="3">已完成</mt-tab-item>
    </mt-navbar>
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
  </div>
</template>
<script>
import { getTime } from '../../utils/format'
import { Toast } from 'mint-ui'
export default {
  name: 'otherOrderPage',
  data () {
    return {
      orderId: '',
      from: getTime(),
      end: getTime(),
      pickerValue1: '',
      pickerValue2: '',
      selected: ''
    }
  },
  methods: {
    setFromTime () {
      this.$refs.picker1.open()
    },
    setEndTime () {
      this.$refs.picker2.open()
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
  .mint-search {
    height: 50px;
    .mint-searchbar-core {
      margin-left: 15px;
    }
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
    }
    .btn3 {
      margin-left: 5px;
      background-color: #378ade;
      color: white;
    }
  }
}
</style>
