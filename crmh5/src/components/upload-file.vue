<template>
  <div>
    <div style="padding:20px">
      <div :class='defaultStyle'>
        <div class="picture" :style="'backgroundImage:url('+headerImage+')'">{{defaultValue}}</div>
        <div v-if="picValue" class="close" @click="deletePic">x</div>
      </div>
      <div class="upload-btn" style="margin-top:10px" v-show="!this.picValue">
        <input type="file" id="upload" accept="image" @change="upload">
      </div>
    </div>
  </div>
</template>
<script>
import Exif from 'exif-js'
import { mapActions } from 'vuex'
export default {
  props: {
    picStyle: {
      type: String,
      default () {
        return ''
      }
    },
    title: {
      type: String,
      default () {
        return '+'
      }
    }
  },
  data () {
    return {
      headerImage: '',
      picValue: '',
      defaultValue: this.title,
      defaultStyle: 'show'
    }
  },
  created () {
    this.defaultStyle = this.defaultStyle + ' ' + this.picStyle
  },
  methods: {
    ...mapActions(['uploadPayPic']),
    deletePic () {
      this.picValue = ''
      this.headerImage = ''
      this.defaultValue = this.title
    },
    upload (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.picValue = files[0]
      this.imgPreview(this.picValue)
      this.defaultValue = ''
    },
    imgPreview (file) {
      let self = this
      let Orientation
      // 去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function () {
        Orientation = Exif.getTag(this, 'Orientation')
      })
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          // 判断图片是否大于100K, 是就直接上传，反之压缩图片
          if (this.result.length <= (100 * 1024)) {
            self.headerImage = this.result
            self.postImg()
          } else {
            img.onload = function () {
              let data = self.compressPic(img, Orientation)
              self.headerImage = data
              self.postImg()
            }
          }
        }
      }
    },
    async postImg () {
      // 这里写接口
    },
    rotateImg (img, direction, canvas) {
      // 最小与最大旋转方向，图片旋转4次后回到原方向
      const minStep = 0
      const maxStep = 3
      if (img === null) return
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = 2
      if (step === null) {
        step = minStep
      }
      if (direction === 'right') {
        step++
        // 旋转到原位置，即超过最大值
        step > maxStep && (step = minStep)
      } else {
        step--
        step < minStep && (step = maxStep)
      }
      // 旋转角度以弧度值为参数
      let degree = step * 90 * Math.PI / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
        case 0:
          canvas.width = width
          canvas.height = height
          ctx.drawImage(img, 0, 0)
          break
        case 1:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, 0, -height)
          break
        case 2:
          canvas.width = width
          canvas.height = height
          ctx.rotate(degree)
          ctx.drawImage(img, -width, -height)
          break
        case 3:
          canvas.width = height
          canvas.height = width
          ctx.rotate(degree)
          ctx.drawImage(img, -width, 0)
          break
      }
    },
    // 压缩图片
    compressPic (img, Orientation) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      // 瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      let width = img.width
      let height = img.height
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = width * height / 4000000) > 1) {
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // 如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = width * height / 1000000) > 1) {
        count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
        // 计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      // 修复ios上传图片的时候
      if (Orientation !== '' && Orientation !== 1) {
        switch (Orientation) {
          case 6:// 需要顺时针（向左）90度旋转
            this.rotateImg(img, 'left', canvas)
            break
          case 8:// 需要逆时针（向右）90度旋转
            this.rotateImg(img, 'right', canvas)
            break
          case 3:// 需要180度旋转
            this.rotateImg(img, 'right', canvas)// 转两次
            this.rotateImg(img, 'right', canvas)
            break
        }
      }
      // 进行最小压缩
      let ndata = canvas.toDataURL('image/jpeg', 0.1)
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return ndata
    }
  }
}
</script>
<style lang='scss'>
.show {
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
  border: 1px solid #d5d5d5;
  line-height: 100px;
  text-align: center;
  color: #352f2f;
  .close {
    width: 20px;
    height: 20px;
    background-color: rgb(241, 75, 75);
    line-height: 20px;
    text-align: center;
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: 0;
    color: white;
    font-size: 18px;
  }
}
.picture {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.upload-btn {
  margin-left: 15px;
  input[type="file"] {
    color: transparent;
  }
}
.circle {
  border-radius: 50%;
}
</style>
