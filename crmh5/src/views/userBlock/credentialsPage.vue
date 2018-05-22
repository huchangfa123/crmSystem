<template>
  <div class="credentials">
    <mt-header class="credentialsHead" title="授权证书">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="img-content">
      <span class="realName">{{userData.realName}}</span>
      <span class="phoneNumber">{{userData.phoneNumber}}</span>
      <span class="agent">{{userData.agent}}</span>
      <span class="fromYear">{{new Date(userData.createAt).getFullYear()}}</span>
      <span class="fromMonth">{{new Date(userData.createAt).getMonth() + 1}}</span>
      <span class="fromDay">{{new Date(userData.createAt).getDate()}}</span>
      <span class="toYear">{{new Date(userData.expiredAt).getFullYear()}}</span>
      <span class="toMonth">{{new Date(userData.expiredAt).getMonth() + 1}}</span>
      <span class="toDay">{{new Date(userData.expiredAt).getDate()}}</span>
      <span class="authorizationCode">{{userData.authorizationCode}}</span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'credentialsPage',
  computed: {
    ...mapGetters(['userData'])
  },
  created () {
    console.log(this.userData)
  }
}
</script>
<style lang="scss">
.credentials {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-size: 0px;
  .credentialsHead{
    background-color: green;
    height: 60px;
    font-size: 18px;
  }
  .img-content {
    flex: 1;
    width: 100%;
    height: auto;
    background-image: url('pic/credentials.jpg');
    background-repeat:no-repeat;
    background-size:100% 100%;
    position: relative;
    span {
      font-family:"微软雅黑";
      font-size: 14px;
    }
    .realName {
      position: absolute;
      top: 46%;
      left: 32%;
    }
    .fromYear {
      position: absolute;
      bottom: 30%;
      left: 20%;
    }
    .fromMonth {
      position: absolute;
      bottom: 30%;
      left: 34%;
    }
    .fromDay {
      position: absolute;
      bottom: 30%;
      left: 39%;
    }
    .toYear {
      position: absolute;
      bottom: 30%;
      left: 47%;
    }
    .toMonth {
      position: absolute;
      bottom: 30%;
      left: 59%;
    }
    .toDay {
      position: absolute;
      bottom: 30%;
      left: 64%;
    }
    .phoneNumber {
      position: absolute;
      top: 46%;
      left: 60%;
    }
    .agent {
      position: absolute;
      top: 50%;
      left: 45%;
    }
    .authorizationCode {
      position: absolute;
      bottom: 27%;
      left: 52%;
    }
  }
}
</style>
