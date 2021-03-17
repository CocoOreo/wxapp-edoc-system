<template>
    <div>
        <swiper :indicator-dots='true'
              :duration='200' style="height:85vh">
            <div v-for="(item,index) of [1,2,3,4]" :key="index">
                <swiper-item>
                        <van-image src='/static/images/1.png' width='100%' height="100%" fit="contain"></van-image>
                </swiper-item>
            </div>
        </swiper>
        <div class="btn-wrap">
            <van-button class="btn-pop" color="linear-gradient(to right, #2D2D2D, #2E2E2E)" round custom-style="box-shadow:0px 2px 2px #3C3C3C; font-size:12px; padding: 4px 20vw"
            @click="handleShowPop">查看文章详情</van-button>
        </div>
        <van-popup
            :show="showPop"
            round
            position="bottom"
            custom-style="height: 50%"
            @close="handleShowPop"
        >
            <van-row class="pop-wrap">
                <p class="doc-title">这里放标题</p>
                <p class="doc-desc">这里放描述这里放描述这里放描述这里放描述这里放描述这里放描述这里放描述这里放描述这里放描述这里放描述这里放描述这里放描述这里放描述</p>
                <div class="btn-wrap">
                    <van-button 
                        @click="handleSave"
                        color="linear-gradient(to right, #2D2D2D, #2E2E2E)" 
                        round 
                        custom-style="box-shadow:0px 2px 2px #3C3C3C; font-size:12px; padding: 4px 20vw">
                        保存文档为PDF
                    </van-button>
                </div>
            </van-row>
        </van-popup>
    </div>
</template>

<script>
import { getDetail } from '@/api/doc'
export default {
  data () {
    return {
      showPop: false
    }
  },
  onLoad () {
    // 这里不使用onShow,防止回退后重新进入，重复加载信息
    this._getDetail()
  },
  methods: {
    _getDetail () {
      // 从路由id中获取参数，查询对应文档的内容信息
      getDetail(this.$mp.query.id).then((res) => {
        if (res.code === 200) {
          console.log(res.data)
        }
      })
    },
    handleShowPop () {
      console.log('变化前 -》', this.showPop)
      this.showPop ? this.showPop = false : this.showPop = true
      console.log('变化后 -》', this.showPop)
    },
    handleSave () {
      console.log('保存为PDF')
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
    justify-content: center;
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
  padding: 10vh 10vw 2vh 10vw;
  color: #101010;
  font-size: 15px;
}
.doc-desc {
  padding: 2px 10vw;
  color:#3c3c3c;
  font-size: 12px;
  margin-bottom: 16px;
}
</style>