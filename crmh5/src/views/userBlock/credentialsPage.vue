<template>
  <div class="credentials">
    <mt-header class="credentialsHead" title="授权证书">
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
export default {
  name: 'credentialsPage'
}
</script>
<style lang="scss">
.credentials {
  display: flex;
  flex-direction: column;
  .credentialsHead{
    background-color: green;
    height: 60px;
    font-size: 18px;
  }
}
</style>
