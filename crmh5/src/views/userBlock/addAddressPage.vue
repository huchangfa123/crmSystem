<template>
  <div class="addAddress">
    <mt-header class="addAddressHead" title="收货地址">
      <router-link to="/managerAddress" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <mt-field label="姓名" placeholder="姓名" type="text" v-model="name"></mt-field>
    <mt-field label="邮编" placeholder="邮编" type="number" v-model="postalCode"></mt-field>
    <mt-field label="手机" placeholder="手机" type="phone" v-model="phone"></mt-field>
    <mt-field label="收货地址" placeholder="收货地址" type="textarea" rows="4" v-model="address"></mt-field>
    <div class="bottom">
      <mt-button @click="ensureAddress" class="button" type="primary">确定</mt-button>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  name: 'addAddressPage',
  data () {
    return {
      id: '',
      address: '',
      name: '',
      phone: '',
      postalCode: ''
    }
  },
  computed: {
    ...mapGetters(['addressList'])
  },
  created () {
    if (this.$route.query.edit) {
      this.id = this.$route.query.id
      for (let item of this.addressList) {
        if (item.id === this.id) {
          this.address = item.address
          this.name = item.receivePeople
          this.phone = item.receivePhone
          this.postalCode = item.postalCode
        }
      }
    }
  },
  methods: {
    ...mapActions(['addAddress', 'editAddress']),
    checkData () {
      if (!(this.address && this.name && this.phone && this.postalCode)) {
        return Toast({
          message: '信息不能为空'
        })
      }
    },
    async ensureAddress () {
      let result = ''
      if (!this.$route.query.edit) {
        result = await this.addAddress({
          address: this.address,
          receivePeople: this.name,
          postalCode: this.postalCode,
          receivePhone: this.phone
        })
      } else {
        result = await this.editAddress({
          id: this.id,
          address: this.address,
          receivePeople: this.name,
          postalCode: this.postalCode,
          receivePhone: this.phone
        })
      }
      if (result.data.code !== 201 && result.data.code !== 200) {
        Toast({
          message: '上传失败'
        })
      } else {
        this.$router.push('/managerAddress')
      }
    }
  }
}
</script>
<style lang="scss">
.addAddress {
  display: flex;
  flex-direction: column;
  .addAddressHead{
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
