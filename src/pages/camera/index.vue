<template >
    <div>
        <camera device-position="back" flash="off" binderror="error" style="width: 100%; height: 300px;"></camera>
        <button type="primary" @click="takePhoto">拍照</button>
        <div>预览</div>
        <image mode="widthFix"></image>
    </div>
</template>

<script>
export default {
  data () {
    return {
      imgSrc: ''
    }
  },

  method: {
    takePhoto () {
      const ctx = wx.createCameraContext()
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          this.imgSrc = res.tempImagePath
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
    
</style>