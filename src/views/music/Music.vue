<template>
    <MusicPlayer :musicList="musicList"></MusicPlayer>
    <!-- 父传子组件 -->
</template>

<script>
    import MusicPlayer from '@/components/MusicPlayer.vue';
    import axios from 'axios';
    export default {
        data(){
            return{
               musicList:[]
            };
        },
        created(){
            //console.log("music");
            this.$emit('switchTab','music');
            axios.get('/json/musics.json').then(res=>{//绝对路径默认在public下找,直接/，而不是../../....
                // console.log(res.data.musicData);
                this.musicList = res.data.musicData;
            })
        },
        components:{
            MusicPlayer
        }
    }
</script>

<style lang="scss" scoped>

</style>