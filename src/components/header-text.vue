<template>
    <div class="container">
        <van-row class="title">
          <van-col offset="1">
            {{title}}
          </van-col>
        </van-row>
        <van-row class="desc">
           <van-col offset="1">
            {{desc}}
          </van-col>
        </van-row>
    </div>
</template>

<script>

export default {
  props: {
    title: '',
    desc: ''
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.container {
  padding-top:28px;
  padding-bottom: 10px;
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
