<template>
  <div class="recommend-item">
    <div v-for="(item, index) in recommends" :key="index" class="re-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RecommendView',
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend-item {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;

    padding: 15px 0 20px;
    border-bottom: 8px solid #eee;

  }

  .re-item {
    flex: 1;
  }

  .re-item img {
    width: 65px;
    height: 65px;
  }
</style>