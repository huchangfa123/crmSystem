<template>
  <div class='mainPage' ref='scroll' @click="handleClick">
    <appHeader></appHeader>
    <userBlock></userBlock>
    <proxyBlock></proxyBlock>
    <orderBlock></orderBlock>
    <goodsBlock></goodsBlock>
  </div>
</template>
<script>
import appHeader from '../components/header'
import proxyBlock from '../components/proxyBlock'
import orderBlock from '../components/orderBlock'
import userBlock from '../components/userBlock'
import goodsBlock from '../components/goodsBlock'
import { mapGetters, mapActions } from 'vuex'
import { Toast } from 'mint-ui'

export default {
  name: 'mainPage',
  beforeRouteLeave (to, from, next) {
    this.deactivated()
    next()
  },
  async created () {
    await this.getUserData()
  },
  mounted () {
    this.activated()
  },
  computed: {
    ...mapGetters(['mainPageTop'])
  },
  methods: {
    ...mapActions(['setMainPageTop', 'getUserData']),
    recordScrollPosition (e) {
      this.setMainPageTop({mainPageTop: e.target.scrollTop})
    },
    activated () {
      this.$refs.scroll.scrollTop = this.mainPageTop
      this.$refs.scroll.addEventListener('scroll', this.recordScrollPosition)
    },
    deactivated () {
      this.$refs.scroll.removeEventListener('scroll', this.recordScrollPosition)
    },
    handleClick () {
      if (this.$route.query.isActived === false) {
        Toast({
          message: '请到等级提升,激活帐号'
        })
      }
    }
  },
  components: {
    appHeader,
    proxyBlock,
    orderBlock,
    userBlock,
    goodsBlock
  }
}
</script>
<style lang='scss'>
.mainPage {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
</style>
