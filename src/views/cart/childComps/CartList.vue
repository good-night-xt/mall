<template>
  <div class="cart-list">
    <scroll class="cart-list-content" ref="cartListScroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index" :product="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'

  import CartListItem from './CartListItem'

  import { mapGetters } from 'vuex'

  export default {
    name: 'CartList',
    computed: {
      ...mapGetters(['cartList'])
    },
    components: {
      Scroll,
      CartListItem
    },
    activated() {
      this.$refs.cartListScroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: 100vh;
  }
  .cart-list-content {
    height: calc(100% - 102px);
  }
</style>