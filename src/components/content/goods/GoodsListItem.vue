<template>
  <div class="goods-list-item" @click="itemClick">
    <img v-lazy="goodsItemImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      goodsItemImage() {
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
    methods: {
      imageLoad() {
        // 事件总线
        this.$bus.$emit('itemImageLoad')

        // 处理不同页面数据加载刷新
        // if(this.$route.path.indexOf('/home')) {
        //   this.$bus.$emit('homeItemImageLoad')
        // }else if(this.$route.path.indexOf('/detail')) {
        //   this.$bus.$emit('detailItemImageLoad')
        // }
        
      },
      itemClick() {
        // 跳转到详情页
        this.$router.push('/detail/' + this.goodsItem.iid)
        // console.log(this.goodsItem.iid)
      }
    }
  }
</script>

<style scoped>
  .goods-list-item {
    position: relative;
    width: 48%;

    padding-bottom: 40px;
  }

  .goods-list-item img {
    border-radius: 5px;
    width: 100%;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 2px;
  }

  .goods-info .price {
    color: var(--color-tint);
    font-size: 16px;
  }

  .goods-info .collect {
    position: relative;
    margin-left: 40px;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>