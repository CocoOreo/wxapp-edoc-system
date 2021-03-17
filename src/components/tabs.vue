<template>
  <div>
    <van-tabs ref="tabs" class="custom-tab" :active="activeTab" v-on:change="onTabChange">
      <van-tab :title="tab.value" v-for="(tab, index) in tabs" :key="index" title-style="font-size:12px"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
import store from '@/store/store'

export default {
  name: 'tabs',
  data () {
    return {
      activeTab: 0,
      tabs: [
        {
          key: '',
          value: '全部'
        },
        {
          key: 'work',
          value: '工作'
        },
        {
          key: 'life',
          value: '生活'
        },
        {
          key: 'study',
          value: '学习'
        },
        {
          key: 'plan',
          value: '计划'
        },
        {
          key: 'shared',
          value: '分享'
        }
      ]
    }
  },
  computed: {
    catalog () {
      // 通过全局state通信
      return store.state.catalog
    }
  },
  watch: {
    catalog (newval, oldval) {
      if (newval !== oldval) {
        this.tabs.map((item, index) => {
          if (item.key === newval) {
            this.activeTab = index
          }
        })
      }
    }
  },
  methods: {
    onTabChange (event) {
      this.activeTab = event.mp.detail.index
      store.commit('setCatalog', this.tabs[this.activeTab].key)
      // wx.showToast({
      //   title: `切换到第${event.mp.detail.index}个标签 ${event.mp.detail.name}`,
      //   icon: 'none'
      // })
    }
  }
}
</script>

<style scoped>
.custom-tab {
  --tabs-default-color: #101010;
  --tabs-bottom-bar-color: #101010;
  --tab-active-text-color: #101010;
  --tab-text-color: #666666;
}
</style>