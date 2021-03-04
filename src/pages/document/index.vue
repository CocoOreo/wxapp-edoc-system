<template>
    <div>
        <van-row>
            image
        </van-row>
        <van-row>
        </van-row>
        <van-row gutter="4" v-for="(item,index) in photoList" :key="index">
          <van-col span="4">
            <van-image 
              width="2rem"
              height="2rem"
              fit="cover"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
          <van-col span="12">
            <span>猫咪图片</span>
          </van-col>
        </van-row>
    </div>
</template>

<script>
export default {
  name: 'photo',
  data () {
    return {
      photoList: [{
        id: 1
      }, {
        id: 2
      }, {
        id: 3
      } ]
    }
  }

}
</script>

<style scoped>
    
</style>