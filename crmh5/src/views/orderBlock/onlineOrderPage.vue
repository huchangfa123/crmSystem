<template>
  <div class="onlineOrder">
    <mt-header class="onlineOrderHead" title="在线下单">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
export default {
  name: 'onlineOrderPage'
}
</script>
<style lang="scss">
.onlineOrder {
  display: flex;
  flex-direction: column;
  .onlineOrderHead{
    background-color: #378ade;
    height: 60px;
    font-size: 18px;
  }
}
</style>
