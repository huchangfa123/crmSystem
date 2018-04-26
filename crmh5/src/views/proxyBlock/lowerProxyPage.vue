<template>
  <div class="lowerProxy">
    <mt-header class="lowerProxyHead" title="下级代理">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
export default {
  name: 'lowerProxyPage'
}
</script>
<style lang="scss">
.lowerProxy {
  display: flex;
  flex-direction: column;
  .lowerProxyHead{
    background-color: #ee3737;
    height: 60px;
    font-size: 18px;
  }
}
</style>
