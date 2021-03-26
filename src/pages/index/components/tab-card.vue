<template>
  <div @click="clickHandle">
    <van-row gutter="20" class="container">
      <van-col span="12" @click="navToPage('camera')">
        <van-row>
          <van-image
            width="36vw"
            fit="widthFix"
            src="/static/images/camera.png"
          />
        </van-row>
        <van-row class="func-desc">
          <p>拍照制作文档</p>
        </van-row>
      </van-col>
      <van-col span="12" @click="navToPage('newDoc')">
        <van-row>
           <van-image
            width="36vw"
            fit="widthFix"
            src="/static/images/graph.png"
            />
        </van-row>
        <van-row class="func-desc">
          从相册制作文档
        </van-row>
      </van-col>      
    </van-row>
    <van-row gutter="16" class="container">
      <van-col span="12" @click="navToLibrary">
        <van-row>
          <van-image
            width="36vw"
            fit="widthFix"
            src="/static/images/library.png"
            style="font-size:0"
          />
        </van-row>
        <van-row class="func-desc">
          <p>文档库</p>
        </van-row>
      </van-col>
      <van-col span="12" @click="navToPage('share')">
        <van-row>
           <van-image
            width="36vw"
            fit="widthFix"
            src="/static/images/camera.png"
            />
        </van-row>
        <van-row class="func-desc">
          分享
        </van-row>
      </van-col>      
    </van-row>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import { checkAuth, confirmAuth } from '@/utils/checkAuth'

export default {
  data () {
    return {
      isLogin: false,
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      res: {}
    }
  },

  methods: {
    async navToPage (option) {
      wx.showToast({title: '加载中', icon: 'loading', duration: 10000})
      this.isLogin = await checkAuth()
      wx.hideToast()
      // 判断用户是否已经登录，登录之后才能使用拍照功能
      if (!this.isLogin) {
        confirmAuth()
      } else {
        const url = `../${option}/main`
        mpvue.navigateTo({url})
      }
    },
    navToLibrary () {
      const url = '../library/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    }
  }
}
</script>

<style scoped>
.container {
  padding-top:3vh;
  padding-bottom: 2vh;
  display: flex;
  justify-content: center;
}

.func-desc {
  padding: 10px;
  display: flex;
  justify-content: center;
  background-color: #101010;
  font-size: 12px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  box-shadow:0px 4px 2px #aaa;
  color: #FFFFFF;
  margin-top: -10px;
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
