<template>
  <div class="contain">
    <el-table :data="goodsList" style="width: 500px" class="goods-table" border>
      <el-table-column prop="name" label="商品名称" min-width="120"></el-table-column>
      <el-table-column  align="center" prop="des" label="商品描述" min-width="120"></el-table-column>
      <el-table-column align="center" label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button @click="deleteGoods(scope.$index)" type="text" size="mini">删除</el-button>
          <el-button @click="editGoods(scope.$index)" type="text" size="mini">编辑</el-button>
          <el-button @click="detailGoods(scope.$index)" type="text" size="mini">详细信息</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="详细信息" :visible.sync="dialogTableVisible">
      <span>规则表:</span>
      <el-table class="dialog-table" :data="selectedItem.strategies" border>
        <el-table-column property="agent" label="代理等级" width="150"></el-table-column>
        <el-table-column property="price" label="价格" width="200"></el-table-column>
      </el-table>
      <span>图片url:</span>
      <a :href="selectedItem.picUrl">{{selectedItem.picUrl}}</a>
    </el-dialog>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['goodsList'])
  },
  data () {
    return {
      selectedItem: [],
      dialogTableVisible: false
    }
  },
  async created () {
    let result = await this.getGoodsList()
    console.log(result)
  },
  methods: {
    ...mapActions(['getGoodsList', 'delGoods']),
    formatSelectedItem (index) {
      let result = JSON.parse(JSON.stringify(this.goodsList[index]))
      let agent = ['企业合伙人', '执行董事', '钻石', '白金', '黄金']
      let rules = []
      for (let item of result.strategies) {
        if (agent[item.agent - 2]) {
          rules.push({
            agent: agent[item.agent - 2],
            price: item.price
          })
        }
      }
      result.strategies = rules
      result.picUrl = result.pictures[0]
      this.selectedItem = result
    },
    async deleteGoods (index) {
      let result = await this.delGoods({id: this.goodsList[index].id})
      if (result.data.code === 200) {
        this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: '删除失败',
          type: 'error'
        })
      }
    },
    editGoods (index) {
      this.$router.push({path: '/addGoods', query: {edit: true, id: this.goodsList[index].id}})
    },
    detailGoods (index) {
      this.formatSelectedItem(index)
      this.dialogTableVisible = true
    }
  }
}
</script>
<style lang='less' scoped>
  .contain {
    width: 100%;
    height: 100%;
    overflow: auto;
    .goods-table {
      margin: 20px;
    }
    .dialog-table {
      width: 350px;
      margin-bottom: 10px;
    }
  }
</style>
