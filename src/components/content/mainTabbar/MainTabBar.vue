<template>
  <div class="tab">
    <tab-bar>
      <tab-bar-item class="tab-bar-item" path="/home">
        <img src="~assets/img/tabbar/home.svg" slot="item-img">
        <img src="~assets/img/tabbar/home_active.svg" slot="active-item-img">
        <span slot="item-text">首页</span>
      </tab-bar-item>
      <tab-bar-item class="tab-bar-item" path="/category">
        <img src="~assets/img/tabbar/category.svg" slot="item-img">
        <img src="~assets/img/tabbar/category_active.svg" slot="active-item-img">
        <span slot="item-text">分类</span>
      </tab-bar-item>
      <tab-bar-item class="tab-bar-item" path="/cart">
        <img src="~assets/img/tabbar/shopcart.svg" slot="item-img">
        <img src="~assets/img/tabbar/shopcart_active.svg" slot="active-item-img">
        <span slot="item-text">购物车</span>
      </tab-bar-item>
      <tab-bar-item class="tab-bar-item" path="/profile">
        <img src="~assets/img/tabbar/profile.svg" slot="item-img">
        <img src="~assets/img/tabbar/profile_active.svg" slot="active-item-img">
        <span slot="item-text">我的</span>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: 'MainTabBar',
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>
  .tab {
    height: 50px;
  }

  .tab-bar-item img {
    width: 26px;
  }
</style>