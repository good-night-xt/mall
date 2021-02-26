<template>
  <div class="detail-swiper" >
    <Swiper class="de-swiper">
      <SwiperItem v-for="(item, index) in topImages" :key="index" class="item-img">
        <img :src="item" alt="">
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperItem } from 'components/common/swiper'

  export default {
    name: 'DetailSwiper',
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImages: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .de-swiper {
    height: 300px;
  }
  .item-img {
    height: 300px;
    overflow: hidden;
  }
</style>