<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,  //点击事件能执行
        // probeType: 3   //0不监听 1不实时(滚出一定距离) 2监听手指在页面时滑动距离(实时) 3实时(包括惯性滑动的距离)
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad //用于上拉加载更多 当上拉加载数据加载完毕后，需要执行 finishPullUp 方法
      })

      // 监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }

      // 监听scroll滚动到底部
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }

      // // 上拉加载更多
      // this.scroll.on('pullingUp', () => {
      //   this.$emit('pullingUp')
      // })
    },
    methods: {
      finishPullUp() { //动态开启上拉加载功能
        this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>