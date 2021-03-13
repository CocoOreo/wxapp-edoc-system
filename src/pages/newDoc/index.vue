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
        <!-- 电子文档描述 -->
        <van-field placeholder="请输入电子文档描述" :value="docDesc" type="textarea" class="edit-content"></van-field>
        <div class="btn-wrap">
          <van-button class="btn-add" color="#2D2D2D" round 
          @click="handleTakePhoto">+继续拍照</van-button>
          <van-button class="btn-submit" color="#101010" round 
          @click="submit()">发布</van-button>
        </div>
        <!-- 遮罩层以及加载 -->
        <van-overlay :show="isLoading">
          <div class="load-wrap">
             <van-loading color="#1989fa" vertical>加载中</van-loading>
          </div>
        </van-overlay>
    </div>
</template>

<script>
import { uploadImg } from '@/utils/upload'
import { addNewDoc } from '@/api/doc'
import globalStore from '../../store/store'

export default {
  name: 'photo',
  data () {
    return {
      docDesc: '',
      fileList: [],
      imgList: [],
      block: ['请选择', '工作', '生活', '学习', '计划'],
      blockValue: ['', 'work', 'life', 'study', 'plan'],
      blockIndex: 0,
      favs: [20, 30, 50, 60, 80],
      favsIndex: '',
      isLoading: false
    }
  },
  onShow () {
    // 从照相机拍照结束后，返回相册页面进行的操作
    this.handleCameraImg()
  },
  onUnload () {
    // 页面卸载时清空已有的所有文件等
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
        const file = {'url': globalStore.state.photoUrl, 'isPhoto': true}
        this.handleUpload(file)
        globalStore.state.photoUrl = ''
      }
    },

    async handleUpload (file) {
      this.isLoading = true
      uploadImg(file).then((res) => {
        this.isLoading = false
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
      this.handleUpload(file)
    },
    async submit () {
      this.isLoading = true
      addNewDoc({
        title: this.title || '我的文档',
        catalog: this.block[this.blockIndex],
        content: this.docDesc || '每个人都有需要记录的故事',
        img_list: this.imgList
      }).then((res) => {
        this.isLoading = false
        if (res.code === 200) {
          this.handleClear()
          wx.showToast({
            title: '文档保存成功',
            icon: 'none',
            duration: 2000
          })
          // 清空已经发布的内容
          setTimeout(() => {
            const url = '/pages/index/main'
            wx.switchTab({ url })
          }, 2000)
        } else {
          wx.showToast({
            title: '文档上传失败，原因：' + res.errmsg,
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
    },
    handleClear () {
      this.fileList.splice(0, this.fileList.length)
      this.imgList.splice(0, this.imgList.length)
      this.docDesc = ''
      this.blockIndex = 0
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
  --field-text-area-min-height: 20vh;
}

.load-wrap {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>