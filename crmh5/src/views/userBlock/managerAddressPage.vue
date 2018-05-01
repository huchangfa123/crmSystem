<template>
  <div class="address">
    <mt-header class="addressHead" title="地址管理">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button @click="goToAddarress" class="btn-add" slot="right">+</mt-button>
    </mt-header>
    <addressItem v-for='item in this.addressList'
      :key='item.id'
      :recivePeople="item.receivePeople"
      :address="item.address"
      :postalCode="item.postalCode"
      :phoneNumber="item.receivePhone"
      :id="item.id"
      :ref="item.id"
      v-on:getStyle="setOtherClose"
    >
    </addressItem>
  </div>
</template>
<script>
import addressItem from '../../components/addressItem'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'addressPage',
  components: {
    addressItem
  },
  computed: {
    ...mapGetters(['addressList'])
  },
  data () {
    return {
      selected: ''
    }
  },
  async created () {
    await this.getAddressList()
  },
  methods: {
    ...mapActions(['getAddressList']),
    setOtherClose (data) {
      if (data.style) {
        console.log(data)
        for (let item of this.addressList) {
          if (data.id !== item.id) {
            this.$refs[item.id][0].setDefault()
          }
        }
      }
    },
    goToAddarress (data) {
      this.$router.push('/addAddress')
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
    .btn-add {
      font-size: 30px;
      margin: 0 10px;
    }
  }
}
</style>
