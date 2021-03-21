<template>
  <div class="flex">
    <div class="logo">
      <img src="/static/images/logo.png" mode="widthFix" />
    </div>
    <van-button
      size="large"
      color="#101010"
      class="btn"
      open-type="share"
    >
      <div class="row">
        <div class="icon">
          <van-icon name="share" size="22"/>
        </div>
        <div>分享小程序</div>
      </div>
    </van-button>
  </div>
</template>

<script>
import { StoreUser } from '@/utils/wxstore'

export default {
  name: 'share',
  data () {
    return {
      code: ''
    }
  },
  onLoad () {
    this.uid = this.getUid()
  },
  onShareAppMessage: function () {
    return {
      title: '电子文档',
      desc: '分享给你我的电子文档',
      path: '/pages/index/main'
    }
  },
  methods: {
    async getUid () {
      const user = await StoreUser.get()
      if (user) {
        const uid = user._id
        return uid
      }
    }
  }
}
</script>

<style scoped>
.flex {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 120px;
  left: 0;
}
.flex .logo {
  width: 240px;
  height: 240px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 100px;
}
.flex .logo img {
  width: 100%;
}
.flex .row {
  flex-flow: row nowrap;
  display: flex;
}
.flex .icon {
  margin-right: 20px;
}
.flex .btn {
  width: 90%;
  overflow: hidden;
  border-radius: 12px;
}
</style>