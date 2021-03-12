<template>
  <div>
    <HeaderText :title="title" :desc="desc" />
    <DocCard />
  </div>
</template>

<script>
import HeaderText from '../../components/header-text'
import DocCard from './components/doc-card'
export default {
  data () {
    return {
      title: '倾听它的事',
      desc: '每个人都有需要记录的故事'
    }
  },
  components: {
    DocCard,
    HeaderText
  }
}
</script>

<style>

</style>