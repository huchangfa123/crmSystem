<template>
    <div class="header_container">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/main' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-dropdown @command="handleCommand" menu-align='start'>
        <div class="avator"></div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="home">首页</el-dropdown-item>
          <el-dropdown-item command="singout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>
<script>
export default {
  methods: {
    async handleCommand (command) {
      if (command === 'home') {
        this.$router.push('/main')
      }
    }
  }
}
</script>
<style lang="less">
  @import '../assets/mixin';
  .header_container{
    background-color: #EFF2F7;
    height: 56px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 15px;
  }
  .avator{
    .wh(36px, 36px);
    border-radius: 50%;
    margin-right: 37px;
    background-color: #000;
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
</style>
