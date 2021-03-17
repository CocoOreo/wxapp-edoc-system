<template>
  <div>
    <div class="fixed">
      <HeaderText :title="title" :desc="desc"/>
      <Tabs :active='0'></Tabs>
    </div>
    <DocCard :list='list' />
  </div>
</template>

<script>
import HeaderText from '@/components/header-text'
import Tabs from '@/components/tabs'
import store from '@/store/store'
import { getList } from '@/api/doc'

import DocCard from './components/doc-card'

export default {
  data () {
    return {
      title: '倾听它的事',
      desc: '每个人都有需要记录的故事',
      list: [],
      limit: 10,
      isEnd: false,
      isRepeat: false,
      testList: [ 1, 2, 3, 4, 5, 6, 7, 8 ]
    }
  },
  watch: {
    // 3. catalog -> getList
    catalog (newval, oldval) {
      if (newval !== oldval) {
        this.init()
        this._getList()
      }
    }
  },
  computed: {
    // 2. nav -> 标签 -> catalog
    catalog () {
      return store.state.catalog
    }
  },
  async onShow () {
    store.commit('setCatalog', getApp().globalData.tab || '')
    await this._getList()
    // this.isLogin = await checkAuth()
  },
  methods: {
    _getList () {
      if (this.isRepeat) return
      if (this.isEnd) return
      getList({
        catalog: this.catalog,
        page: this.page,
        limit: this.limit,
        sort: 'created'
      })
        .then((res) => {
          wx.stopPullDownRefresh()
          // 加入一个请求锁，防止用户多次点击，等待数据返回后，再打开
          this.isRepeat = false
          // 对于异常的判断，res.code 非200，我们给用户一个提示
          // 判断是否list长度为0，如果为零即可以直接赋值
          // 当List长度不为0，后面请求的数据，加入到List里面来
          if (res.code === 200) {
            // 判断res.data的长度，如果小于20条，则是最后页
            if (res.data.length < this.limit) {
              this.isEnd = true
            }
            if (this.page === 0) {
              this.list = res.data
            } else {
              this.list = this.list.concat(res.data)
            }
          }
          console.log('list -> ', this.list)
          console.log('testlist -> ', this.testList)
          // if (typeof this.handle === 'function') {
          //   // this.handle()
          // }
          // this.initHeight()
        })
        .catch((err) => {
          wx.stopPullDownRefresh()
          this.isRepeat = false
          if (err) {
          }
        })
    },
    init () {
      this.page = 0
      this.list = []
      this.isEnd = false
      this.isRepeat = false
    }
  },
  components: {
    DocCard,
    HeaderText,
    Tabs
  }
}
</script>

<style>
.fixed {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
}
</style>