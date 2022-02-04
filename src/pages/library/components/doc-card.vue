<template>
  <div class="container-wrap">
        <van-row gutter="10" class="doc-container">
          <van-col offset="1" span="10" v-for="(item,index) of finalList" :key="index" 
          @click="showDocDetail(item._id)">
            <van-row gutter="10">
              <van-col offset="1">
                <van-image :src='item.poster_list[0]' image-class="doc-image" fit="fill" width="18vw" height="20vh" />
                <van-image :src='item.poster_list[1]' image-class="doc-image" fit="fill" width="18vw" height="20vh" />
              </van-col>
            </van-row>
            <van-row>
              <van-col offset="1">
                <van-image :src='item.poster_list[2]' image-class="doc-image" fit="fill" width="18vw" height="20vh" />
                <van-image :src='item.poster_list[3]' image-class="doc-image" fit="fill" width="18vw" height="20vh" />
              </van-col>
            </van-row>
            <van-row style="margin-top:20px">
              <van-col offset="1">
                <p class="doc-title">{{item.title || '共享快乐'}}</p>
                <p class="doc-desc">{{item.content || '我想要的2021'}}</p>
              </van-col>
            </van-row>
          </van-col>
        </van-row>
  </div>
</template>

<script>
import config from '@/config/index'

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    offsetTop: {
      type: Number,
      default: 0
    },
    isEnd: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isActive: 1
    }
  },
  computed: {
    finalList () {
      return this.list.map((item) => {
        // let date = item.created
        // if (dayjs(date).isBefore(dayjs().subtract(7, 'days'))) {
        //   date = dayjs(date).format('YYYY-MM-DD')
        // } else {
        //   // 1小前，xx小时前，X天前
        //   date = dayjs(date)
        //     .locale('zh-cn')
        //     .from(dayjs())
        // }
        // item.created = date
        let imgList
        if (item.img_list) {
          imgList = item.img_list.map((imgUrl) => {
            if (imgUrl && !imgUrl.startsWith('http')) {
              const baseUrl =
                process.env.NODE_ENV === 'development'
                  ? config.baseUrl.dev
                  : config.baseUrl.pro
              imgUrl = baseUrl + imgUrl
              return imgUrl
            }
          })
        }
        item.img_list = imgList
        item.poster_list = imgList
        // 判断文档够不够填满四张封面图片
        if (item.poster_list.length < 4) {
          // 不足四张，查看还需要填充几张
          const num = 4 - item.img_list.length
          for (let i = 0; i < num; i++) {
            item.poster_list.push(item.poster_list[i])
          }
        }
        return item
      })
    }
  },

  methods: {
    async showDocDetail (id) {
      wx.navigateTo({
        url: '/pages/doc/main?id=' + id
      })
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
  margin: 2px !important;
}
.doc-title {
  color: #101010;
  font-size: 15px;
}
.doc-desc {
  color:#3c3c3c;
  font-size: 12px;
  margin-bottom: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 200rpx;
}
.container-wrap {
  padding-top: 120px;
}

</style>