<template >
    <div>
        <camera device-position="back" flash="off" binderror="error" style="width: 100%; height: 85vh;"></camera>
        <van-row class="btn-wrap">
          <van-button 
          type="primary"  
          icon="photograph" 
          round block
          @click="takePhoto" 
          color="linear-gradient(to right, #1c1c1c, #101010)">拍照</van-button>
        </van-row>
    </div>
</template>

<script>
import globalStore from '../../store/store'

export default {

  onShow () {
    let photoUrl = globalStore.photoUrl
    if (photoUrl) {
      console.log('全局变量', photoUrl)
    } else {
      console.log('初始化全部变量成功', photoUrl)
    }
  },

  methods: {
    takePhoto () {
      console.log('camera opended')
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          globalStore.state.photoUrl = res.tempImagePath
          const url = '/pages/newDoc/main'
          setTimeout(() => {
            wx.redirectTo({url})
          }, 500)
        }
      })
    },
    error (e) {
      console.log(e.detail)
    }
  }

}
</script>
<style scoped>
.btn-wrap {
  display:flex;
  justify-content:center;
  margin: 15px;
}
</style>