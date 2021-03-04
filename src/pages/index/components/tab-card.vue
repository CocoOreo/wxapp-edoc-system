<template>
  <div @click="clickHandle" class="container">
    <van-grid direction="horizontal" column-num="1" gutter="10">
      <van-grid-item icon="photo-o" text="拍照" @click="takePhoto" />
      <van-grid-item icon="photo-o" text="文字" @click="confirmAuth"/>
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
    <van-dialog id="van-dialog" />
  </div>
</template>

<script>
import { confirmAuth } from '@/utils/checkAuth'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      },
      res: {}
    }
  },

  components: {
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    takePhoto () {
      const url = '../document/main'
      console.log('taking photo')
      mpvue.navigateTo({url})
      // const ctx = wx.createCameraContext()
      // ctx.takePhoto({
      //   quality: 'high',
      //   success: (res) => {
      //     this.res = res
      //     console.log(this.res)
      //   }
      // })
    },
    confirmAuth () {
      console.log('hello')
      confirmAuth()
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.container {
  padding-top:2vh;
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
