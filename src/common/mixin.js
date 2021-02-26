import BackTop from 'components/content/backtop/BackTop'

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBack: false,
    }
  },
  methods: {
    /**
      * 返回头部点击事件
      */
    backTopClick() {
      this.$refs.scroll.scroll.scrollTo(0, 0, 1000);
    },
    /**
      * 回到顶部图片的显示与隐藏
      */
    listenShowBackTop(position) {
      // 判断BackTop是否显示
      this.isShowBack = (-position.y > 1000)

      // 决定tabControl是否吸顶（position: fixed）
      this.isShowTab = (-position.y + 44) > this.tabOffsetTop //顶部不属于滚动部分
    }
  }
}