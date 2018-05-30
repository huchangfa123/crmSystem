<template>
  <div class="profit">
    <mt-header class="profitHead" title="差价利润">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="goods-list">
      <div v-for="(good, index) in this.profitList" :key='index'>
        <div class="goods-item" v-for="(item, index2) in good.profit" :key='index2'>
          <div class="goods-pic">
            <img :src='good.picture'>
          </div>
          <div class="goods-content" v-if="profitList.length > 0">
            <div class="goods-name">
              <h4>{{good.name}}</h4>
              <span>{{item.agent}}</span>
            </div>
            <div class="goods-bottom">
              <div class="goods-des">{{good.des}}</div>
              <span>利润: <h3>￥{{item.profit.toFixed(2)}}</h3></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'profitPage',
  computed: {
    ...mapGetters(['profitList'])
  },
  async created () {
    await this.getProfitList()
    console.log(this.profitList)
  },
  methods: {
    ...mapActions(['getProfitList'])
  }
}
</script>
<style lang="scss">
.profit {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .profitHead{
    background-color: #ff9f11;
    height: 60px;
    font-size: 18px;
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
          padding-left: 5px;
          padding-top: 10px;
          height: 20px;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          h4 {
            width: 70%;
            font-size: 16px;
          }
          span {
            margin-right: 20px;
            color: #7e7373;
            font-size: 14px;
          }
        }
        .goods-bottom {
          flex: 1;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          padding-bottom: 10px;
          padding-left: 10px;
          word-break: break-all;
          // .goods-des {
          //   width: 55%;
          //   color: #7e7373;
          //   overflow : hidden;
          //   text-overflow: ellipsis;
          //   display: -webkit-box;
          //   -webkit-line-clamp: 1;
          //   -webkit-box-orient: vertical;
          // }
          .goods-des {
            color: #7e7373;
            width: 55%;
            position: relative;
            word-wrap:break-word;         /* 英文字符换行 */
            line-height: 20px;
            max-height: 40px;
            overflow: hidden;
            margin: 0 5px;
          }
          .goods-des::after{
            content: "...";
            position: absolute;
            bottom: 0;
            right: 0;
            padding-left: 40px;
            background: -webkit-linear-gradient(left, transparent, #fff 55%);
            background: -o-linear-gradient(right, transparent, #fff 55%);
            background: -moz-linear-gradient(right, transparent, #fff 55%);
            background: linear-gradient(to right, transparent, #fff 55%);
          }
          span {
            font-size: 14px;
            display: flex;
            flex-direction: row;
            align-items: center;
            h3 {
              color: rgb(235, 38, 38);
            }
          }
        }
      }
    }
  }
}
</style>
