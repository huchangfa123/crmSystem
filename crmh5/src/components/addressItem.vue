<template>
  <div class="address-item">
    <div class="item-content">
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
  </div>
</template>
<script>
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
    }
  },
  data () {
    return {
      style: ''
    }
  },
  methods: {
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
}
.active {
  background-color: green;
}
</style>
