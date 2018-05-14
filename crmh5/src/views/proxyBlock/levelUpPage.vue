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
    <div class="level-up-pic">
      <uploadFile
        title="付款截图"
        v-on:curPicUrl="setOrderPic"
      >
      </uploadFile>
    </div>
    <div class="bottom">
      <mt-button @click="handleApply" class="bottom-btn" type="primary">提交申请</mt-button>
    </div>
    <mt-popup v-if="popupVisible" class="level-bottom" v-model="popupVisible" position="bottom">
      <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import uploadFile from '../../components/upload-file'
import { Toast } from 'mint-ui'
export default {
  name: 'levelUpPage',
  components: {
    uploadFile
  },
  data () {
    return {
      popupVisible: false,
      defaultName: '选择申请等级',
      buttonName: '',
      slots: [
        {
          values: ['黄金', '白金', '钻石', '执行董事', '企业合伙人'],
          textAlign: 'center',
          className: 'slot1',
          flex: 1
        }
      ],
      uploadPic: ''
    }
  },
  methods: {
    ...mapActions(['applyLevel', 'applyActive']),
    setPopUp () {
      this.popupVisible = true
    },
    onValuesChange (picker, values) {
      this.defaultName = values[0]
    },
    setOrderPic (data) {
      this.uploadPic = data.imgUrl
    },
    async handleApply () {
      if (!this.uploadPic) {
        return Toast({
          message: '截图未上传'
        })
      }
      let levelValue = ['管理员', '企业合伙人', '执行董事', '钻石', '白金', '黄金']
      let value = levelValue.indexOf(this.defaultName) + 1
      if (value === -1) {
        return Toast({
          message: '请选择升级等级'
        })
      }
      if (sessionStorage.getItem('isActived') === 'true') {
        let result = await this.applyLevel({
          level: value,
          screenshots: this.uploadPic
        })
        if (result.data.code !== 200) {
          return Toast({
            message: result.data.error
          })
        } else {
          Toast({
            message: '申请成功'
          })
          this.$router.replace('/reviewProxy')
        }
      } else {
        let result2 = await this.applyActive({
          level: value,
          screenshots: this.uploadPic
        })
        if (result2.data.code !== 200) {
          return Toast({
            message: result2.data.error
          })
        } else {
          Toast({
            message: '申请成功'
          })
          this.$router.replace('/reviewProxy')
        }
      }
    }
  }
}
</script>
<style lang="scss">
.levelUp {
  display: flex;
  position: relative;
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
  .level-up-pic {
    width: 100%;
    display: flex;
    justify-content: center;
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
