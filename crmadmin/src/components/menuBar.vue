<template>
  <div class='manage_page fillcontain'>
    <el-row style="width: 100%; height: 100%;">
      <el-col style="width: 100%; min-height: 100%; background-color: #324057;">
        <el-menu style="min-height: 100%; width: 100%;" background-color="#324057" text-color="#fff" :unique-opened='true' router>
          <el-menu-item index="main"><i class="el-icon-menu"></i>首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-message"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="userMessage">用户信息</el-menu-item>
            <el-menu-item index="addUser">添加用户</el-menu-item>
            <el-menu-item index="upgradeReview">用户升级审核</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="orderMessage">订单信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-star-on"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="addGoods">添加商品</el-menu-item>
              <el-menu-item index="goodsList">商品信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>
              <span>公共信息管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="yunAddress">云盘地址</el-menu-item>
              <el-menu-item index="adSetting">公告编写</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-printer"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="ownData">个人盈利</el-menu-item>
              <el-menu-item index="companyData">平台盈利</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
}
</script>
<style lang='less'>
  @import '../assets/common';
  .manage_page {
    width: 220px;
  }
</style>
