<template>
  <div class="cart-bottom-bar">
    <div class="check-button">
      <check-button :class="{'cart-bottom-bar-button': true, 'button-active': selectAll}"
        @click.native="checkButtonClick"></check-button>
      <span>全选</span>
    </div>
    <div class="total-price">总计: {{totalPrice}}</div>
    <div class="total-length">去结算: {{totalLength}}</div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, currentValue) => {
          return preValue + currentValue.price * currentValue.count
        }, 0)
      },
      totalLength() {
        return this.$store.state.cartList.length
      },
      selectAll() {
        return this.$store.state.isSelectAll
      }
      // isSelectAll() {
      //   return this.$store.state.cartList.every((item) => {
      //     return item.checked == true
      //   })
      // }
    },
    methods: {
      checkButtonClick() {
        this.$store.state.isSelectAll = !this.$store.state.isSelectAll
        const list = this.$store.state.cartList
        if (this.$store.state.isSelectAll) {
          for (let i in list) {
            list[i].checked = true
          }
        }else {
          for (let i in list) {
            list[i].checked = false
          }
        }

      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    width: 100%;
    height: 40px;
    position: absolute;
    display: flex;
    bottom: 50px;
    left: 0;
    padding-top: 14px;
    font-size: 14px;
  }

  .check-button {
    flex: 1;
  }

  .cart-bottom-bar-button {
    display: inline-block;
    margin-left: 10px;
    margin-right: 5px;
  }

  .total-price {
    flex: 1;
    text-align: center;
  }

  .total-length {
    flex: 1;
    text-align: center;
  }

  .button-active {
    background-color: var(--color-tint);
  }
</style>