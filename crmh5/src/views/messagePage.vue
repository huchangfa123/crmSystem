<template>
  <div class="message">
    <mt-header class="messageHead" title="系统信息">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
export default {
  name: 'messagePage'
}
</script>
<style lang="scss">
.message {
  display: flex;
  flex-direction: column;
  .messageHead{
    background-color: #378ade;
    height: 60px;
    font-size: 18px;
  }
}
</style>
