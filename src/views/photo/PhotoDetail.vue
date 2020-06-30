<template>
    <!-- <h1>{{$route.params.src}}</h1> -->
    <!-- <h1>{{$route.params.idx}}</h1> -->
    <!-- <h1>{{imgSrc}}</h1> -->
    <router-link to="/photo">
        <v-touch @swipeleft="swipeleft" @swiperight="swiperight" class="img" :style="{background:'url('+imgSrc+') no-repeat center/contain #000'}">
        </v-touch>
    </router-link>
   
</template>

<script>
    export default {
        data(){
            return{
                imgSrc:'',
                nowIndex:-1
            }
        },
        watch:{
            nowIndex(){
                let nowImg = this.$store.state.photoList[this.nowIndex];
                if(nowImg){
                    this.imgSrc = nowImg.src;
                }
            }
        },
        created(){
            this.nowIndex = this.$route.params.idx;
            // let nowImg = this.$store.state.photoList[this.nowIndex];
            // if(nowImg){
            //     this.imgSrc = this.$store.state.photoList[this.nowIndex].src;
            // }
        },
        methods:{
            swiperight(){
                // console.log('向右')
                this.nowIndex--;
                if(this.nowIndex == -1){
                    this.nowIndex = this.$store.state.photoList.length;
                }
            },
            swipeleft(){
                // console.log('向左')
                this.nowIndex++;
                if(this.nowIndex == this.$store.state.photoList.length){
                    this.nowIndex = 0;
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
.img{
    position:absolute;
    top:1rem;
    bottom:1rem;
    left:0;
    right:0;
}
</style>