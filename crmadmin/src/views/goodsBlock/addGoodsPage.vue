<template>
  <div class="contain">
    <el-form :model="goodsForm" :rules="rules" ref="ruleForm" label-width="100px" class="goodsForm">
      <el-form-item label="商品名称:" prop="name">
        <el-input class="goodsInput" placeholder="商品名称" v-model="goodsForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品描述:" prop="des">
        <el-input class="goodsInput" placeholder="商品描述" v-model="goodsForm.des"></el-input>
      </el-form-item>
      <el-form-item label="商品图片:" prop="picUrl">
        <el-input class="goodsInput" placeholder="图片url" v-model="goodsForm.picUrl"></el-input>
      </el-form-item>
      <el-form-item label="价格规则:">
        <el-table class="form-table" border :data="goodsForm.rules">
          <el-table-column align="center" prop="agent" label="代理等级" width="100"></el-table-column>
          <el-table-column align="center" prop="price" label="对应价格" width="100">
            <template slot-scope="scope">
              <el-input placeholder="元" v-model="goodsForm.rules[scope.$index].price"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      goodsForm: {
        id: '',
        name: '',
        des: '',
        picUrl: '',
        rules: [
          {agent: '企业合伙人', price: '', value: 2},
          {agent: '执行董事', price: '', value: 3},
          {agent: '钻石', price: '', value: 4},
          {agent: '白金', price: '', value: 5},
          {agent: '黄金', price: '', value: 6}
        ]
      },
      rules: {
        name: { required: true, message: '请输入名称', trigger: 'blur' },
        des: { required: true, message: '请输入描述', trigger: 'blur' },
        picUrl: { required: true, message: '请输入地址', trigger: 'blur' }
      }
    }
  },
  computed: {
    ...mapGetters(['goodsList'])
  },
  created () {
    if (this.$route.query.edit) {
      this.goodsForm.id = this.$route.query.id
      for (let item of this.goodsList) {
        if (item.id === this.$route.query.id) {
          this.goodsForm.name = item.name
          this.goodsForm.des = item.des
          this.goodsForm.picUrl = item.pictures[0]
          for (let key of item.strategies) {
            for (let rule of this.goodsForm.rules) {
              if (rule.value === key.agent) {
                rule.price = key.price
                break
              }
            }
          }
        }
      }
    }
  },
  methods: {
    ...mapActions(['addGoods', 'editGoods']),
    formatData () {
      let result = {
        name: this.goodsForm.name,
        des: this.goodsForm.des,
        pictures: [this.goodsForm.picUrl],
        id: this.goodsForm.id
      }
      let strategies = []
      for (let item of this.goodsForm.rules) {
        strategies.push({
          agent: Number(item.value),
          price: Number(item.price)
        })
      }
      result.strategies = strategies
      return result
    },
    cheakData () {
      for (let item of this.goodsForm.rules) {
        if (!item.price) {
          return true
        }
      }
      return false
    },
    onSubmit () {
      if (this.cheakData()) {
        return this.$message({
          showClose: true,
          message: '价格不能留空',
          type: 'warning'
        })
      }
      this.$refs['ruleForm'].validate(async (valid) => {
        if (valid) {
          if (!this.$route.query.edit) {
            await this.addGoods(this.formatData())
          } else {
            await this.editGoods(this.formatData())
          }
          this.$router.replace('/goodsList')
        } else {
          return this.$message({
            showClose: true,
            message: '信息不能留空',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
  .contain {
    width: 100%;
    height: 60vh;
    overflow: auto;
    padding: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 56px;
    .goodsForm {
      height: 100%;
      .goodsInput {
        width: 300px;
        height: 50px;
      }
      .form-table {
        width: 200px;
        margin: 0 auto;
      }
    }
  }
</style>
