<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TabBar',
    components: {

    }
  }
</script>

<style scoped>
  .tab-bar {
    height: 50px;
    display: flex;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: #fff;
    padding-top: 2px;
    border-top: 2px solid #eee;
  }
</style>