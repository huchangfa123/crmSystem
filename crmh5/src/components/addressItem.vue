<template>
  <div class="address-item">
    <div class="item-content" @click="showPopup">
      <span>{{address}}</span>
      <span>邮编:{{postalCode}}</span>
      <span class="bottom-font">
        <p>{{recivePeople}}</p>
        <p>{{phoneNumber}}</p>
      </span>
    </div>
    <div class="item-btn">
      <div @click="setActive" class="pic">
        <div :class="style"></div>
      </div>
    </div>
    <mt-popup
      class="bottom"
      v-model="popupVisible"
      position="bottom">
      <div @click="goToEditPage">
        <mt-cell title="修改"></mt-cell>
      </div>
      <div @click="deleteAddress">
        <mt-cell title="删除"></mt-cell>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  props: {
    recivePeople: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    address: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    postalCode: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    phoneNumber: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    id: {
      type: String,
      required: true,
      default () {
        return ''
      }
    },
    isDefault: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      style: '',
      popupVisible: false
    }
  },
  created () {
    if (this.isDefault) {
      this.style = 'active'
    } else {
      this.style = ''
    }
  },
  methods: {
    ...mapActions(['delAddress']),
    setActive () {
      if (!this.style) {
        this.style = 'active'
        this.$emit('getStyle', {style: this.style, id: this.id})
      } else {
        this.style = ''
        this.$emit('getStyle', {style: this.style, id: this.id})
      }
    },
    setDefault () {
      this.style = ''
    },
    showPopup () {
      this.popupVisible = true
    },
    async deleteAddress () {
      let result = await this.delAddress({id: this.id})
      if (result.code === 200) {
        this.popupVisible = false
        Toast({
          message: '删除成功'
        })
      } else {
        Toast({
          message: '删除失败'
        })
      }
    },
    goToEditPage () {
      this.$router.push({path: '/addAddress', query: {edit: true, id: this.id}})
    }
  }
}
</script>
<style lang='scss'>
.address-item {
  display: flex;
  flex-direction: row;
  width: 100%;
  border-bottom: 1px solid #c9cfdc;
  .item-content {
    display: flex;
    flex-direction: column;
    height: 80px;
    width: 80%;
    padding: 15px;
    span {
      word-break: break-all;
      width: 80%;
      margin-bottom: 2px;
    }
    .bottom-font {
      margin-top: 5px;
      color: #72757d;
      display: flex;
      flex-direction: row;
      p {
        margin-right: 10px;
      }
    }
  }
  .item-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    .pic {
      width: 15px;
      height: 15px;
      border: 1px solid #72757d;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 10px;
        height: 10px;
      }
    }
  }
  .bottom {
    width: 100%;
    .mint-cell {
      text-align: center;
      .mint-cell-text {
        color: black;
      }
    }
  }
}
.active {
  background-color: green;
}
</style>
