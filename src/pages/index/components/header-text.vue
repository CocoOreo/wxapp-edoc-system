<template>
    <div class="container">
        <van-row class="title">
          <van-col offset="1">
            文档管理系统
          </van-col>
        </van-row>
        <van-row class="desc">
           <van-col offset="1">
            快速实现纸质文档电子化
          </van-col>
        </van-row>
    </div>
</template>

<script>

export default {
  data () {
    return {
    }
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    }
  },

  created () {
    // let app = getApp()
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
</style>
