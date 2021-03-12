<template>
  <div>
    <van-tabs :active="isActive" @change="handleChange($event)">
      <van-tab title="置顶">
        <van-row gutter="10" class="doc-container">
          <van-col offset="1" span="10" v-for="(item,index) of [1,2]" :key="index" @click="handleClickDoc($event)">
            <van-row>
              <van-col offset="1">
                <van-image src="/static/images/library.png" image-class="doc-image" fit="widthFix" width="18vw" />
                <van-image src="/static/images/logo.png" image-class="doc-image" fit="widthFix" width="18vw" />
              </van-col>
            </van-row>
            <van-row>
              <van-col offset="1">
                <van-image src="/static/images/camera.png" image-class="doc-image" fit="widthFix" width="18vw" />
                <van-image src="/static/images/library.png" image-class="doc-image" fit="widthFix" width="18vw" />
              </van-col>
            </van-row>
            <van-row gutter="10" style="margin-top:20px">
              <van-col offset="1">
                <p class="doc-title">hello</p>
                <p class="doc-desc">world</p>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </van-tab>
      <van-tab title="标签 2">内容 2</van-tab>
      <van-tab title="标签 3">内容 3</van-tab>
      <van-tab title="标签 4">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: 1
    }
  },

  onShow () {
    this.isActive = 0
  },

  methods: {
    handleChange (e) {
      console.log(e)
    },
    handleClickDoc (e) {
      console.log('点击文档', e)
    }
  }

}
</script>

<style>
.doc-container {
  padding: 10px;
}
.doc-image {
  border-radius: 10px !important;
}
.doc-title {
  color: #101010;
  font-size: 18px;
}
.doc-desc {
  color:#3c3c3c;
  font-size: 14px;
}
</style>