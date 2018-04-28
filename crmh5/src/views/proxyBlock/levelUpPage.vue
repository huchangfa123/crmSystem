<template>
  <div class="levelUp">
    <mt-header class="levelUpHead" title="等级提升">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="level-up-content">
      <span>升级等级:</span>
      <mt-button  @click="setPopUp" type="default">{{defaultName}}</mt-button>
    </div>
    <mt-popup v-if="popupVisible" class="level-bottom" v-model="popupVisible" position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
    <div class="bottom">
      <mt-button class="bottom-btn" type="primary">提交申请</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'levelUpPage',
  data () {
    return {
      popupVisible: false,
      defaultName: '选择申请等级',
      buttonName: '',
      slots: [
        {
          values: ['黄金等级', '白金等级', '钻石等级', '企业等级', '执行董事等级'],
          textAlign: 'center',
          className: 'slot1',
          flex: 1
        }
      ]
    }
  },
  methods: {
    setPopUp () {
      this.popupVisible = true
    },
    onValuesChange (picker, values) {
      this.defaultName = values[0]
    }
  }
}
</script>
<style lang="scss">
.levelUp {
  display: flex;
  flex-direction: column;
  .levelUpHead{
    background-color: #ee3737;
    height: 60px;
    font-size: 18px;
  }
  .level-up-content {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    span {
      font-size: 18px;
      margin: 5px;
    }
    button {
      margin: 5px;
    }
  }
  .level-bottom {
    width: 100%;
  }
  .bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    .bottom-btn {
      margin: 10px 0;
      width: 90%;
      background-color: #ee3737
    }
  }
}
</style>
