<template>
  <div @click="clickHandle" class="container">
    <HeaderText/>
    <TabCard/>
  </div>
</template>

<script>
import card from '@/components/card'
// import {  } from '@/api/'
// 对应接口封装在api文件夹，未来开发直接解构引用
import TabCard from './components/tab-card'
import HeaderText from './components/header-text'
import { checkAuth, confirmAuth } from '@/utils/checkAuth'
import { StoreToken } from '@/utils/wxstore'
import { addShareWith } from '@/api/share'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },

  async onLoad () {
    this.isLogin = await checkAuth()
    // 判断用户是否已经登录，登录之后才能使用拍照功能
    if (!this.isLogin) {
      confirmAuth()
    }
  },

  async onShow (options) {
    // eslint-disable-next-line no-undef
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1] // 当前页面
    const { tid } = currentPage.options
    const token = await StoreToken.get()
    if (tid && token) {
      const options = {tid}
      const res = await addShareWith(options)
      if (res.code === 200) {
        // 增加分享成功
        wx.showToast({
          title: '您已成功成为文档的分享者',
          icon: 'none',
          duration: 2000
        })
        const url = '/pages/index/main'
        wx.reLaunch({url})
      } else {
        wx.showToast({
          title: '文档分享失败，请重试',
          icon: 'none',
          duration: 2000
        })
      }
    }
  },
  components: {
    card,
    TabCard,
    HeaderText
  },
  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.container {
  background-color:#EFEFEF;
  min-height:100vh;
}

.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
</style>
