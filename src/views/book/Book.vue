<template>
  <swipe class="my-swipe">
  <swipe-item class="slide1">轮播图1</swipe-item>
  <swipe-item class="slide2">轮播图2</swipe-item>
  <swipe-item class="slide3">轮播图3</swipe-item>
</swipe>
</template>

<script>
require('vue-swipe/dist/vue-swipe.css');
import { Swipe, SwipeItem } from 'vue-swipe';
export default {
    created(){
        this.$emit('switchTab','book');
    },
    components:{
         'swipe': Swipe,
        'swipe-item': SwipeItem
    }

    
}
</script>

<style lang="scss" scoped>
   @import '@/assets/scss/book.scss'
</style>