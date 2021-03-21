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
        <!-- 文档分享列表 -->
        <van-cell center title="更改分享列表"  is-link="true"  @click="handleShowPop" />
        <van-popup
            :show="showPop"
            round
            position="bottom"
            custom-style="height: 90%"
            @close="handleShowPop"
        >
            <van-row class="pop-wrap">
                <van-swipe-cell 
                  v-for="(item,index) of fileList"
                  v-if="item.isShared" 
                  :key="item.url" 
                  right-width="64"
                  async-close
                  @close="handleDeleteShared($event,index)"
                  >
                  <div class="card-wrap">
                    <van-card
                      custom-class="shared-card"
                      title="分享内容"
                      desc="左滑更改分享列表"
                      :thumb="item.url"
                    >
                    </van-card>
                  </div>
                  <div slot="right" class="swipe-cell">删除</div>
                </van-swipe-cell>
                <div class="btn-wrap">
                    <van-button 
                        @click="handleResetShared"
                        color="linear-gradient(to right, #3C3C3C, #3E3E3E)" 
                        round 
                        custom-style="box-shadow:0px 2px 2px #3C3C3C; font-size:12px; padding: 4px 20vw">
                        重置分享列表
                    </van-button>
                </div>
            </van-row>
        </van-popup>
        <!-- 文档类型 -->
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
        <van-field placeholder="请输入电子文档描述" :value="docDesc" @input="docDesc=$event.mp.detail" type="textarea" class="edit-content"></van-field>
        <!-- 按钮组 -->
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
      // 文件对象
      fileList: [],
      // 服务器返回的字符串
      imgList: [],
      sharedImgList: [],
      block: ['请选择', '工作', '生活', '学习', '计划'],
      blockValue: ['default', 'work', 'life', 'study', 'plan'],
      blockIndex: 0,
      favs: [20, 30, 50, 60, 80],
      favsIndex: '',
      isLoading: false,
      showPop: false
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
          // 初始情况下，每个图片都可被分享
          file.isShared = true
          this.fileList.push(file)
          this.imgList.push(res.data)
          this.sharedImgList.push(res.data)
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
        catalog: this.blockValue[this.blockIndex],
        content: this.docDesc || '每个人都有需要记录的故事',
        img_list: this.imgList,
        shared_img_list: this.sharedImgList
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
          }, 500)
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
      this.sharedImgList.splice(e.mp.detail.index, 1)
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
      this.sharedImgList.splice(0, this.imgList.length)
      this.docDesc = ''
      this.blockIndex = 0
    },
    handleShowPop () {
      this.showPop ? this.showPop = false : this.showPop = true
    },
    handleResetShared () {
      try {
        this.sharedImgList = this.imgList
        this.fileList.forEach(file => {
          if (!file.isShared) {
            file.isShared = true
          }
        })
        wx.showToast({
          title: '分享列表重置成功'}
        )
      } catch (error) {
        wx.showToast({
          title: '分享列表重置失败'}
        )
      }
    },
    handleDeleteShared (e, index) {
      const { position, instance } = e.target
      switch (position) {
        case 'left':
          instance.close()
          break
        case 'cell':
          instance.close()
          break
        case 'right':
          instance.close()
          this.fileList[index].isShared = false
          this.sharedImgList.splice(index, 1)
          break
      }
      // 初始情况下，所有图片都可被分享，这一部分允许用户删除照片
    }
  }
}
</script>

<style scoped>
.container {
  padding-top:28px;
  padding-bottom: 2vh;
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
    margin-bottom: 20px;
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
  z-index: 1000;
}
.pop-wrap {
    padding: 20px 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
}
.card-wrap {
  width: 85vw;
  height: 20vh;
}
.swipe-cell {
  display: inline-block;
  height: 20vh;
  width: 64px;
  font-size: 16px;
  line-height: 20vh;
  color: #fff;
  text-align: center;
  background-color: #f44;
}
</style>