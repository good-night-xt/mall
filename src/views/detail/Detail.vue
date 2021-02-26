<template>
  <div id="detail">
    <detail-item @titleClick="titleClick" ref="detailNav"></detail-item>
    <scroll class="detail-content" ref="scroll" @scroll="scrollContent" :probeType='3'>
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-button-bar @addToCart="addToCart"/>
    <back-top @click.native="backClick" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import DetailItem from './childComs/DetailItem'
  import DetailSwiper from './childComs/DetailSwiper'
  import DetailBaseInfo from './childComs/DetailBaseInfo'
  import DetailShopInfo from './childComs/DetailShopInfo'
  import DetailGoodsInfo from './childComs/DetailGoodsInfo'
  import DetailParamInfo from './childComs/DetailParamInfo'
  import DetailCommentInfo from './childComs/DetailCommentInfo'
  import DetailButtonBar from './childComs/DetailButtonBar'

  import { getDetail, Goods, Shop, GoodsParam, getRecommend } from 'network/detail'
  import { debounce } from 'common/utils'
  import { backTopMixin } from 'common/mixin'

  export default {
    name: 'Detail',
    components: {
      DetailItem,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailButtonBar
    },
    mixins: [backTopMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImgListener: null,
        offsetTopY: [],
        positionY: null,
        currentIndex: 0
      }
    },
    created() {
      // 保存传入的iid
      this.iid = this.$route.params.iid

      // 根据iid请求详情数据
      getDetail(this.iid).then((res) => {

        // 获取轮播图片数据
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // console.log(res)

        // 获取有关商品全部信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)

        // 获取商品信息
        this.detailInfo = data.detailInfo

        // 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        // 取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
          // console.log(this.commentInfo)
        }

        // 请求推荐数据
        getRecommend().then(res => {
          // console.log(res)
          this.recommends = res.data.list
        })

      })
    },
    mounted() {
      /*
       * 页面加载数据刷新(加入防抖函数)
       */
      let newRefresh = debounce(this.$refs.scroll.refresh, 100)
      // 刷新
      this.itemImgListener = () => {
        newRefresh()
      }
      // 事件总线 发出
      this.$bus.$on('itemImgListener', this.itemImgListener)

    },
    destroyed() {
      // 避免多个页面事件冲突  离开此页面时关闭
      this.$bus.$off('itemImgListener', this.itemImgListener)
    },

    methods: {
      imageLoad() {
        // 图片加载完成页面刷新渲染高度
        this.$refs.scroll.refresh()

        // 保存商品信息对应的四个位置
        this.offsetTopY.push(0);
        this.offsetTopY.push(this.$refs.params.$el.offsetTop - 44)
        this.offsetTopY.push(this.$refs.comment.$el.offsetTop)
        this.offsetTopY.push(this.$refs.recommend.$el.offsetTop - 44)
      },
      /**
        * 返回头部点击事件
        */
      backClick() {
        this.backTopClick()   // 混入
      },
      
      // 商品信息四个位置的点击滚动
      titleClick(index) {
        // 点击标题，页面切换
        this.$refs.scroll.scroll.scrollTo(0, -this.offsetTopY[index], 100);

      },
      // 商品信息中滚动距离变化切换四个信息高亮
      scrollContent(position) {
        /**
        * 回到顶部图片的显示与隐藏
        */
        this.listenShowBackTop(position)
        // 页面滚动，标题切换
        this.positionY = -position.y
        if (this.currentIndex != 0 && this.positionY >= (this.offsetTopY[0]) && this.positionY < (this.offsetTopY[1])) {
          this.currentIndex = 0
        } else if (this.currentIndex != 1 && this.positionY >= (this.offsetTopY[1]) && this.positionY < (this.offsetTopY[2])) {
          this.currentIndex = 1
        } else if (this.currentIndex != 2 && this.positionY >= (this.offsetTopY[2]) && this.positionY < (this.offsetTopY[3])) {
          this.currentIndex = 2
        } else if (this.currentIndex != 3 && this.positionY >= (this.offsetTopY[3])) {
          this.currentIndex = 3
        }

        this.$refs.detailNav.currentIndex = this.currentIndex
      },
      // 加入购物车
      addToCart() {
        // console.log('---')
        // 获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid

        // 将商品添加到购物车里
        // this.$store.commit('addCart', product) 提交给mutations
        // 提交给actions
        this.$store.dispatch('addCart', product).then(res => {
          this.$toast.show(res, 1000)
        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 99;
    background-color: #fff;
    height: 100vh;
  }

  .detail-content {
    height: calc(100% - 44px - 58px);
  }
</style>