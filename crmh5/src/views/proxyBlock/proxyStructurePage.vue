<template>
  <div class="proxyStructure">
    <mt-header class="proxyStructureHead" title="团队结构图">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="lowerLevel-list">
      <div @click="getThisUserLowerProxy(index)" class="lowerLevel-item" v-for="(item, index) in lowerLevelList" :key="index">
        <div class="item-head">
          <h3>用户名:{{item.realName}}</h3>
          <p>{{item.createAt}}</p>
        </div>
        <div class="item-bottom">
          <div class="item-content">
            <span>当前用户等级: {{item.level}}</span>
            <span>电话: {{item.phoneNumber}}</span>
            <span>上级名: {{item.manager}}</span>
          </div>
          <div class="icon-btn">></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'proxyStructurePage',
  computed: {
    ...mapGetters(['lowerLevelList', 'userData'])
  },
  async created () {
    await this.getLowerLevelList({id: this.userData.id})
  },
  methods: {
    ...mapActions(['getLowerLevelList']),
    async getThisUserLowerProxy (index) {
      console.log(this.lowerLevelList[index].id)
      await this.getLowerLevelList({id: this.lowerLevelList[index].id})
    }
  }
}
</script>
<style lang="scss">
.proxyStructure {
  display: flex;
  flex-direction: column;
  .proxyStructureHead{
    background-color: #ee3737;
    height: 60px;
    font-size: 18px;
  }
  .lowerLevel-list {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: scroll;
    .lowerLevel-item {
      height: 100px;
      padding: 10px;
      border-bottom: 1px solid #e3e3e3;
      .item-head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        p {
          color: #9b9292;
          font-size: 15px;
        }
      }
      .item-bottom {
        display: flex;
        flex-direction: row;
        align-items: center;
        .item-content {
          width: 90%;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          span {
            color: #746e6e;
          }
        }
        .icon-btn {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #0a0a0a;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
