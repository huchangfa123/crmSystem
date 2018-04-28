<template>
  <div class="address">
    <mt-header class="addressHead" title="收货地址">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mt-field label="姓名" placeholder="姓名" type="email" v-model="name"></mt-field>
    <mt-field label="邮编" placeholder="邮编" type="email" v-model="mailcode"></mt-field>
    <mt-field label="手机" placeholder="手机" type="phone" v-model="phone"></mt-field>
    <mt-field label="收货地址" placeholder="收货地址" type="textarea" rows="4" v-model="address"></mt-field>
    <div class="bottom">
      <mt-button class="button" type="primary">保存修改</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'addressPage',
  data () {
    return {
      address: '关州市白云区萨达十大',
      name: '',
      phone: '',
      mailcode: ''
    }
  }
}
</script>
<style lang="scss">
.address {
  display: flex;
  flex-direction: column;
  .addressHead{
    background-color: green;
    height: 60px;
    font-size: 18px;
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
