<template>
  <div class="container">
    <van-field placeholder="请输入帖子标题" clearable :value="title"></van-field>
    <van-field placeholder="请输入帖子内容" :value="content" type="textarea" class="edit-content"></van-field>
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
    <picker @change="changeFavs" :value="favs[favsIndex]" :range="favs" class="picker">
      <van-field
        disabled
        label="奖励积分"
        inputAlign="right"
        placeholder="请选择"
        isLink
        :value="favs[favsIndex]"
      ></van-field>
    </picker>
    <div class="btn-wrap">
      <van-button  size="large" type="primary" @click="submit()">发布</van-button>
    </div>
  </div>
</template>

<script>
import { uploadImg } from '@/utils/upload'
import { addNewDoc } from '@/api/doc'
export default {
  name: 'newPost',
  data () {
    return {
      title: '',
      content: '',
      fileList: [],
      imgList: [],
      block: ['请选择', '工作', '生活', '学习', '计划'],
      blockValue: ['', 'work', 'life', 'study', 'plan'],
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

    async submit () {
      // 文章内容是否为空的判断
      // if (this.title.trim() === '') {
      //   wx.showToast({
      //     title: '上传失败，原因：' + res.errmsg,
      //     icon: 'none',
      //     duration: 2000
      //   })
      //   return
      // }
      // 添加新的文章
      console.log('参数如下', {
        title: this.title,
        catalog: this.block[this.blockIndex].value,
        content: this.content,
        img_list: this.imgList
      })
      addNewDoc({
        title: this.title,
        catalog: this.block[this.blockIndex].value,
        content: this.content,
        img_list: this.imgList
      }).then((res) => {
        if (res.code === 200) {
          wx.showToast({
            title: '文档保存成功',
            icon: 'none',
            duration: 2000
          })
          // 清空已经发布的内容
          setTimeout(() => {
            const url = '/pages/index/main'
            wx.redirectTo({ url })
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
    }
  }
}
</script>

<style lang="scss" >
.upload-img {
  padding: 30px;
}
.edit-content {
  --field-text-area-min-height: 350px;
}
.btn-wrap {
  width: 75%;
  padding: 30px;
  margin-top: 20px;
  --button-primary-background-color: #02d199;
}
</style>