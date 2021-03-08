<template>
    <div>
        <!-- 上方文字提示部分 -->
        <div class="container">
            <van-row class="title">
              <van-col offset="1">
                上传图片
              </van-col>
            </van-row>
            <van-row class="desc">
              <van-col offset="1">
                单次上传不能超过10张
              </van-col>
            </van-row>
        </div>
        <!-- 已拍摄的图片展示 -->
        <van-row gutter="4" v-for="(item,index) in photoList" :key="index">
          <van-col span="4">
            <van-image 
              width="2rem"
              height="2rem"
              fit="cover"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
          <van-col span="12">
            <span>猫咪图片</span>
          </van-col>
        </van-row>
        <!-- 上传文档选项 -->
        <div class="upload-img">
          <van-uploader @afterRead="afterRead" :fileList="fileList" @delete="deteleImg"></van-uploader>
        </div>
        <picker @change="changePostType" :value="block[blockIndex]" :range="block" class="picker">
          <van-field
            disabled
            label="文档类型"
            inputAlign="right"
            placeholder="请选择"
            isLink
            :value="block[blockIndex]"
          ></van-field>
        </picker>
        <div class="btn-wrap">
          <van-button class="btn-add" color="#2D2D2D" round 
          style="border-top-right-radius: 0;border-bottom-right-radius: 0" 
          @click="submit()">+继续拍照</van-button>
          <van-button class="btn-submit" color="#101010" round 
          style="border-top-left-radius: 0;border-bottom-left-radius: 0;" 
          @click="submit()">发布</van-button>
        </div>
    </div>
</template>

<script>
import { uploadImg } from '@/utils/upload'

export default {
  name: 'photo',
  data () {
    return {
      fileList: [],
      imgList: [],
      block: ['请选择', 'wen', '分享', '讨论', '建议'],
      blockValue: ['', 'ask', 'share', 'discuss', 'advise'],
      blockIndex: 0,
      favs: [20, 30, 50, 60, 80],
      favsIndex: ''
    }
  },
  methods: {
    async afterRead (e) {
      console.log('afterRead -> e.mp.detail', e.mp.detail)
      const file = e.mp.detail.file
      uploadImg(file).then((res) => {
        console.log('afterRead -> res', res)
        if (res.code === 200) {
          this.fileList.push(file)
          this.imgList.push(res.data)
          wx.showToast({
            title: '上传成功',
            icon: 'none',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '上传失败，原因：' + res.errmsg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    },
    deteleImg (e) {
      this.fileList.splice(e.mp.detail.index, 1)
      this.imgList.splice(e.mp.detail.index, 1)
    },
    changePostType (e) {
      this.blockIndex = e.target.value
    },
    changeFavs (e) {
      this.favsIndex = e.target.value
    }
  }
}
</script>

<style scoped>
.container {
  padding-top:28px;
  padding-bottom: 1vh;
  background-color:white;
  font-family: PingFangSC-bold;
}

.title {
  color:#101010;
  font-size: 18px;
}

.desc {
  color:#9B9A9A;
  font-size: 14px;
  margin: 4px 0;
}

.btn-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
}

.btn-add {
  margin-right: 10px;
}

.btn-submit {
  margin-left: 10px;
}
</style>