<template>
  <div class="profit">
    <mt-header class="profitHead" title="差价利润">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
export default {
  name: 'profitPage'
}
</script>
<style lang="scss">
.profit {
  display: flex;
  flex-direction: column;
  .profitHead{
    background-color: #ff9f11;
    height: 60px;
    font-size: 18px;
  }
}
</style>
