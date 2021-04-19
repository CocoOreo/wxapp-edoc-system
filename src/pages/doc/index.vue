<template>
  <div>
    <swiper
      :indicator-dots='true'
      :duration='200'
      style="height:85vh"
    >
      <div
        v-for="(item,index) of finalImgList"
        :key="index"
      >
        <swiper-item>
          <van-image
            :src='item'
            width='100%'
            height="100%"
            fit="contain"
          ></van-image>
        </swiper-item>
      </div>
    </swiper>
    <div class="btn-wrap">
      <van-button
        class="btn-pop"
        color="linear-gradient(to right, #2D2D2D, #2E2E2E)"
        custom-style="box-shadow:0px 2px 2px #3C3C3C; font-size:12px; padding: 2px 16vw"
        @click="handleShowPop"
      >查看文章详情</van-button>
    </div>
    <!-- 详情页 -->
    <van-popup
      :show="showPop"
      round
      position="bottom"
      custom-style="height: 50%"
      @close="handleShowPop"
    >
      <van-row class="pop-wrap">
        <p class="doc-title">{{doc.title}}</p>
        <p class="doc-desc">{{doc.content}}</p>
      </van-row>
      <div class="btn-wrap">
          <van-button
            @click="handleEdit"
            color="linear-gradient(to right, #2D2D2D, #2E2E2E)"
            round
            custom-style="box-shadow:0px 2px 2px #3C3C3C; font-size:12px; padding: 2px 4vw"
            v-if='this.doc.'
          >
            编辑文档
          </van-button>
          <van-button
            @click="handleSave"
            color="linear-gradient(to right, #2D2D2D, #2E2E2E)"
            round
            custom-style="box-shadow:0px 2px 2px #3C3C3C; font-size:12px; padding: 2px 12vw"
          >
            保存文档为PDF
          </van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getDetail, downloadPDF } from '@/api/doc'
import config from '@/config/index'
export default {
  data () {
    return {
      isLogin: false,
      doc: {},
      finalImgList: [],
      showPop: false
    }
  },
  async onLoad () {
    await this._getDetail()
  },

  onShareAppMessage: function () {
    return {
      title: this.doc.title || '我的文档',
      desc: '分享给你我的电子文档',
      // 将文档的tid作为参数分享
      path: `/pages/index/main?tid=${this.doc._id}`
    }
  },
  methods: {
    _getDetail () {
      // 从路由id中获取参数，查询对应文档的内容信息
      getDetail(this.$mp.query.id).then(res => {
        if (res.code === 200) {
          this.doc = res.data
          if (this.doc && this.doc.img_list) {
            this.finalImgList = this.doc.img_list.map((imgUrl) => {
              if (!imgUrl.startsWith('http')) {
                const baseUrl =
                process.env.NODE_ENV === 'development'
                  ? config.baseUrl.dev
                  : config.baseUrl.pro
                imgUrl = baseUrl + imgUrl
                return imgUrl
              }
            })
          }
        }
      })
    },
    handleShowPop () {
      this.showPop ? (this.showPop = false) : (this.showPop = true)
    },
    handleSave () {
      downloadPDF(this.$mp.query.id).then(res => {
        if (res.code === 200) {
          let pdfUrl = res.data
          if (!pdfUrl.startsWith('http')) {
            const baseUrl =
                process.env.NODE_ENV === 'development'
                  ? config.baseUrl.dev
                  : config.baseUrl.pro
            pdfUrl = baseUrl + pdfUrl
          }
          console.log('PDF文件的地址为', pdfUrl)
          wx.downloadFile({
            url: pdfUrl, // 仅为示例，并非真实的资源
            success (res) {
              // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
              if (res.statusCode === 200) {
                const tempFilePath = res.tempFilePath
                wx.saveFile({
                  tempFilePath,
                  success (res) {
                    const savedFilePath = res.savedFilePath
                    console.log('保存的地址', savedFilePath)
                    if (savedFilePath) {
                      wx.openDocument({
                        filePath: savedFilePath,
                        success: function (res) {
                          console.log('打开文档成功')
                        }
                      })
                    }
                  }
                })
              }
            }
          })
        }
      })
    },
    handleEdit () {
      const docId = this.$mp.query.id
      const url = `/pages/newDoc/main?tid=${docId}`
      wx.navigateTo({url})
    }
  }
}
</script>

<style scoped>
.btn-wrap {
  position: fixed;
  bottom: 0px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 20px 0px;
}
.btn-pop {
  font-size: 14px;
}
.pop-wrap {
  padding: 20px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.doc-title {
  padding: 3vh 10vw 2vh 10vw;
  text-align: center;
  color: #101010;
  font-size: 15px;
}
.doc-desc {
  padding: 2px 10vw;
  color: #3c3c3c;
  font-size: 12px;
  margin-bottom: 16px;
}
</style>