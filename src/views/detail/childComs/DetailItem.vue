<template>
  <nav-bar class="nav-bar">
    <img src="~assets/img/common/back.svg" slot="left" class="back-img" @click="imgClick">
    <div  slot="center" class="center">
      <span v-for="(item, index) in titles" 
            :key="index" 
            :class="['span-item', {'active': currentIndex === index}]"
            @click="spanClick(index)">{{item}}</span>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'DetailItem',
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '详情', '参数', '推荐'],
        currentIndex: 0
      }
    },
    methods: {
      imgClick() {
        // 返回按钮点击
        this.$router.back()
      },
      spanClick(index) {
        // 切换样式
        this.currentIndex = index

        // 滚动到相应位置
        this.$emit('titleClick', index)
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    position: relative;
    z-index: 9;

    box-sizing: border-box;
    background-color: #fff;
    border: 1px solid #eee;
  }

  .back-img {
    margin-top: 12px;
  }

  .center {
    display: flex;
    font-size: 14px;
  }

  .span-item {
    flex: 1;
  }

  .active {
    color: var(--color-tint);
  }
</style>