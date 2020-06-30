<template>
    <!-- <h1>{{$route.params.src}}</h1> -->
    <!-- <h1>{{$route.params.idx}}</h1> -->
    <!-- <h1>{{imgSrc}}</h1> -->
    <div @tap="callback" @click="$router.go(-1)" class="img" :style="{background:'url('+imgSrc+') no-repeat center/contain #000'}">
        
    </div>
</template>

<script>
    export default {
        data(){
            return{
                imgSrc:''
            }
        },
        created(){
            this.imgSrc = this.$store.state.photoList[this.$route.params.idx].src;
        }
    }
</script>

<style lang="scss" scoped>
.img{
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
}
</style>