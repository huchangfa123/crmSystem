<template>
  <div class="address">
    <mt-header class="addressHead" title="地址管理">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
      <mt-button @click="goToAddarress" class="btn-add" slot="right">+</mt-button>
    </mt-header>
    <addressItem v-for='item in items'
      :key='item.id'
      :recivePeople="item.recivePeople"
      :address="item.address"
      :postalCode="item.postalCode"
      :phoneNumber="item.phoneNumber"
      :id="item.id"
      :ref="item.id"
      v-on:getStyle="setOtherClose"
    >
    </addressItem>
  </div>
</template>
<script>
import addressItem from '../../components/addressItem'
export default {
  name: 'addressPage',
  components: {
    addressItem
  },
  data () {
    return {
      selected: '',
      items: [
        {
          id: 'child1',
          address: 'asdasdasdasd',
          recivePeople: 'asdasda',
          postalCode: '123123',
          phoneNumber: '123123123'
        },
        {
          id: 'child2',
          address: 'asdasdasdasd',
          recivePeople: 'asdasda',
          postalCode: '123123',
          phoneNumber: '123123123'
        }
      ]
    }
  },
  methods: {
    setOtherClose (data) {
      if (data.style) {
        for (let item of this.items) {
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
