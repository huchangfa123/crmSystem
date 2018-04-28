<template>
  <div class="proxyStructure">
    <mt-header class="proxyStructureHead" title="团队结构图">
      <router-link to="/main" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
  </div>
</template>
<script>
export default {
  name: 'proxyStructurePage'
}
</script>
<style lang="scss">
.proxyStructure {
  display: flex;
  flex-direction: column;
  .proxyStructureHead{
    background-color: #ee3737;
    height: 60px;
    font-size: 18px;
  }
}
</style>
