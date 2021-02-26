<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration) {
        this.message = message;
        this.isShow = true;

        setTimeout(() => {
          this.message = ''
          this.isShow = false
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    color: #fff;

    transform: translate(-50%, -50%);

    padding: 8px 10px;
    background: rgba(0, 0, 0, .8);

    z-index: 999;
  }
</style>