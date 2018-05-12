<template>
  <div class="profit">
    <mt-header class="profitHead" title="差价利润">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="goods-list">
      <div class="goods-item" v-for="(item, index) in this.profitList" :key='index'>
        <div class="goods-pic">
          <img :src='item.picture'>
        </div>
        <div class="goods-content" v-if="profitList.length > 0">
          <div class="goods-name">
            <h3>{{item.name}}</h3>
            <span>当前等级: {{item.profit[0].agent}}</span>
          </div>
          <div class="goods-bottom">
            <div class="goods-des">{{item.des}}</div>
            <span>单价利润: <h3>￥{{item.profit[0].profit}}</h3></span>
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
  },
  methods: {
    ...mapActions(['getProfitList'])
  }
}
</script>
<style lang="scss">
.profit {
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
          height: auto;
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
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          span {
            margin-right: 30px;
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
          .goods-des {
            width: 55%;
            color: #7e7373;
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
