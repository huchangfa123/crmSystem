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
        <el-upload
          class="upload-demo"
          action="http://api.youshuangruomei.com/api/auth/upload"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          :headers="myHeaders"
          :limit="1"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
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
        des: { required: true, message: '请输入描述', trigger: 'blur' }
      },
      postData: {
        token: 'your token'
      },
      fileList: [],
      fileName: '',
      myHeaders: {Authorization: `Bearer ${sessionStorage.getItem('actoken')}`}
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
          this.fileList.push({
            uid: item.id,
            name: item.pictures[0].split('/')[3],
            url: item.pictures[0]
          })
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
    beforeAvatarUpload (file) {
      console.log(file)
      this.fileName = file.name
    },
    handleAvatarSuccess (res) {
      this.fileList.push({
        url: res.imgUrl,
        name: this.fileName
      })
      this.goodsForm.picUrl = res.imgUrl
    },
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
          let result = {}
          if (!this.$route.query.edit) {
            result = await this.addGoods(this.formatData())
          } else {
            result = await this.editGoods(this.formatData())
          }
          if (result.data.code === 200) {
            this.$router.replace('/goodsList')
          } else {
            return this.$message({
              showClose: true,
              message: result.data.error,
              type: 'warning'
            })
          }
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
    height: 80vh;
    overflow: auto;
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
