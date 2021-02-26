<template>
  <div class="cart-list-item">
    <div class="item-selector">
      <check-button :isChecked="product.checked" @click.native="buttonClick"></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" >
    </div>
    <div class="item-info">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="info-bottom">
        <div class="item-price left">￥{{product.price}}</div>
        <div class="item-count right">x{{product.count}}</div>
      </div>
    </div>
  </div>
</template>

<script>

  import CheckButton from 'components/content/checkButton/CheckButton'

  export default {
    name: 'CartListItem',
    components: {
      CheckButton
    },
    props: {
      product: {}
    },
    methods: {
      buttonClick() {
        this.product.checked = !this.product.checked
        if(!this.product.checked) {
          this.$store.state.isSelectAll = false
        }
      }
    }
  }
</script>

<style scoped>
   .cart-list-item {
    width: 100%;
    display: flex;
    padding: 5px;
    border-bottom: 1px solid #ccc;
    background-color: #fff;
  } 

  .item-selector {
    /* width: 20px; */
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item-img {
    flex: 3;
  }

  .item-img img {
    width: 70px;
    border-radius: 3px;
  }

  .item-info {
    position: relative;
    flex: 8;
    overflow: hidden;
  }

  .item-title {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    color: #000;
  }

  .item-desc {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    font-size: 14px;
    font-weight: 500;
    color: #444;

    padding-top: 15px;
  }

  .info-bottom {
    width: 100%;
    margin-top: 10px;
    padding-right: 10px;
    position: absolute;
    bottom: 20px;
    right: 0px;
  }

  .item-price {
    color: orangered;
  }
</style>