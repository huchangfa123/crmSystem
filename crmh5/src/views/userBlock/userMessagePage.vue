<template>
  <div class="userMessage">
    <mt-header class="useMsgHead" title="用户信息">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="userhead">
      <uploadFile
        title=""
        picStyle='circle'
        :defaultImg='this.userData.avatar'
        v-on:curPicUrl="setUserPic"
      ></uploadFile>
    </div>
    <mt-field label="真实姓名" disabled placeholder="请输入用户名" v-model="userName"></mt-field>
    <mt-field label="等级" disabled v-model="level"></mt-field>
    <mt-field label="手机号" disabled placeholder="请输入手机号" type="phone" v-model="num"></mt-field>
    <mt-field label="用户上级" type="text" disabled v-model="boss"></mt-field>
    <mt-field label="身份证" type="text" disabled v-model="idCard"></mt-field>
    <div class="bottom">
      <mt-button @click="saveEdited" class="button" type="primary">保存修改</mt-button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import uploadFile from '../../components/upload-file'
export default {
  name: 'userMessagePage',
  computed: {
    ...mapGetters(['userData'])
  },
  components: {
    uploadFile
  },
  data () {
    return {
      userName: '',
      num: '',
      boss: '',
      level: '',
      idCard: '',
      userPic: ''
    }
  },
  created () {
    this.userName = this.userData.realName
    this.num = this.userData.phoneNumber
    this.idCard = this.userData.idCard
    this.level = this.userData.agent
    this.boss = this.userData.manager || ''
    this.userPic = this.userData.avatar
  },
  methods: {
    ...mapActions(['editUserMessage']),
    setUserPic (data) {
      this.userPic = data.imgUrl
    },
    async saveEdited () {
      let result = await this.editUserMessage({
        id: this.userData.id,
        avatar: this.userPic
      })
      console.log(result)
    }
  }
}
</script>
<style lang='scss'>
.userMessage {
  display: flex;
  flex-direction: column;
  .useMsgHead {
    background-color: green;
    height: 60px;
    font-size: 18px;
  }
  .userhead {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .bottom {
    margin: 10px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    .button {
      background-color: green;
      font-size: 16px;
    }
  }
}
</style>
