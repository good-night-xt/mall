<template>
  <div id="home">
    <nav-bar class="navBar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick" v-show="isShowTab"
      ref="tabControl1"></tab-control>
    <scroll class="content" ref="scroll" :probeType='3' @scroll="scroll" :pullUpLoad="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature />
      <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick="tabClick" ref="tabControl2"
        v-show="!isShowTab"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBack"></back-top>

  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import Feature from './childComps/Feature'

  import { getHomeMultidata, getHomeGoods } from "network/home"
  import { debounce } from "common/utils"
  import { backTopMixin } from 'common/mixin'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      Feature,
      TabControl,
      GoodsList,
      Scroll,
    },
    mixins: [backTopMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': { page: 0, list: [] },
          'new': { page: 0, list: [] },
          'sell': { page: 0, list: [] },
        },
        currentType: 'pop',
        isShowTab: false,
        tabOffsetTop: 0,
        saveY: 0,
        nowIndex: 0,
        itemImgListener: null,
        typePosition: { //记录各个页面离开时的位置
          'pop': 0,
          'new': 0,
          'sell': 0
        },
        leaveY: 0
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      // 3.监听item中图片加载完成
      const reFresh = debounce(this.$refs.scroll.refresh, 200)

      // 保存事件监听函数
      this.itemImgListener = () => { reFresh() }
      // 事件总线
      this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
    /**
      * 处理来回切换而不用回到顶部
      */
    activated() {
      // this.$refs.scroll.scroll.scrollTo(0, this.saveY)   如果放在refresh的前面  会导致滚动过后刷新  回到头部
      this.$refs.scroll.refresh()

      //页面回来时  滚动到离开的位置
      if(this.leaveY) {
        this.$refs.scroll.scroll.scrollTo(0, this.leaveY)
        return ;
      }
      this.$refs.scroll.scroll.scrollTo(0, this.typePosition[this.currentType])

    },
    deactivated() {

      // 取消全局事件监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
      this.leaveY = this.saveY
    },
    // destroyed() {
    //   console.log('1')
    // },

    methods: {
      /**
       *  事件监听相关
       */
      // 三个小标题的切换['流行', '新款', '精选']
      tabClick(index) {
        this.nowIndex = index
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;

        // 切换时滚到相应位置
        this.$refs.scroll.scroll.scrollTo(0, this.typePosition[this.currentType])
      },
      /**
       *  网络请求相关
       */
      // 请求数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res)
          // 请求轮播图和推荐数据
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        // 请求相关页数据
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })

      },
      /**
        * 返回头部点击事件
        */
      backClick() {
        this.backTopClick()   // 混入
      },
      /**
        * 回到顶部图片的显示与隐藏
        */
      scroll(position) {
        this.listenShowBackTop(position)    // 混入

        //记录三个页面的实时位置
        this.saveY = this.$refs.scroll.scroll.y
        this.typePosition[this.currentType] = this.saveY
        // console.log(this.typePosition)
      },
      /**
        * 上拉加载更多
        */
      loadMore() {
        this.getHomeGoods(this.currentType)

        /**重新计算可滚动区域高度（如果网速慢，图片加载慢，
          *better-scroll就会出现bug -> 计算可滚动区域变小，
          *从而导致可滚动区域卡住）网速快就不会出现
          */
        this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad() {
        // 确保轮播图加载完（一般其他图片也加载完了）然后计算tabControl2的高度（需滚动到的位置）
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop

        // 初始化3个小页面切换时的初始位置
        this.typePosition.pop = -this.tabOffsetTop
        this.typePosition.new = -this.tabOffsetTop
        this.typePosition.sell = -this.tabOffsetTop
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
  }

  .navBar {
    background-color: var(--color-tint);
    color: #fff;

    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100% - 50px);
    overflow: hidden;
  }

  .active {
    color: var(--color-high-text);

  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>