<template>
    <div @click="itemClick" class="tab-bar-item">
        <div v-if="!isActive">
            <slot name="item-img"></slot>
        </div>
        <div v-else>
            <slot name="active-item-img"></slot>
        </div>
        <div :class="{active: isActive}">
            <slot name="item-text"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TabBarItem',
        props: {
            path: {
                type: String,
                default: '/home'
            }
        },
        computed: {
            isActive() {
                return this.$route.path.indexOf(this.path) != -1
            }
        },
        methods: {
            itemClick() {
                this.$router.replace(this.path)
            }
        }
    }
</script>

<style scoped>
    .active {
        color: red;
    }

    .tab-bar-item {
        flex: 1;
        text-align: center;
    }
</style>