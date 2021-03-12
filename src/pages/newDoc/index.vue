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
        <!-- 电子文档描述 -->
        <van-field placeholder="请输入电子文档描述" :value="docDesc" type="textarea" class="edit-content"></van-field>
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
          @click="handleTakePhoto">+继续拍照</van-button>
          <van-button class="btn-submit" color="#101010" round 
          @click="submit()">发布</van-button>
        </div>
    </div>
</template>

<script>
import { uploadImg } from '@/utils/upload'
import globalStore from '../../store/store'

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
  onShow () {
    this.handleCameraImg()
  },
  onUnload () {
    this.handleClear()
  },
  methods: {
    async handleTakePhoto () {
      const url = '../camera/main'
      wx.navigateTo({url})
    },
    async handleCameraImg () {
      // 检查是否有拍照的照片
      if (globalStore.state.photoUrl) {
        // 照相机页面获取到了照片
        console.log('跨页面获取到了照片', globalStore.state.photoUrl)
        const file = {'url': globalStore.state.photoUrl, 'isPhoto': true}
        this.handleUpload(file)
        globalStore.state.photoUrl = ''
      }
    },

    async handleUpload (file) {
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
    async afterRead (e) {
      const file = e.mp.detail.file
      console.log('打印VANT的文件信息', file)
      this.handleUpload(file)
    },
    async submit () {
      const data = {
        img_list: this.imgList,
        doc_desc: this.docDesc
      }
      console.log('提交的内容data->', data)
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
    },
    handleClear () {
      console.log('执行了清空操作')
      this.fileList.splice(0, this.fileList.length)
      this.imgList.splice(0, this.imgList.length)
      this.docDesc = ''
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
  border-top-left-radius: 0px  !important;
  border-bottom-left-radius: 0px !important;
}

.btn-submit {
  margin-left: 10px;
  border-bottom-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}
.edit-content {
  --field-text-area-min-height: 350px;
}
</style>