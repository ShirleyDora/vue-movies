<template>
    <ul class="box clearfix">
        <li @click="gotoDetail(index)" class="photo" v-for="(photo,index) in $store.state.photoList" :key="photo.src">
            <img :src="photo.src" alt="">
        </li>
    </ul>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
            };
        },
        created(){
            this.$emit('switchTab','photo');
            axios.get("/json/photo.json").then(res=>{
                // console.log(res);
                // this.photoList = res.data.photoData;
                //运用vuex,修改store
                this.$store.commit('setPhotoList',res.data.photoData)
            })
        },
        methods:{
            gotoDetail(index){
                this.$router.push(`/photodetail/${index}`);
            }
        }
    }
</script>

<style lang="scss" scoped>
.clearfix::after{
    content:'';
    display:block;
    clear:both;
}
.box{
    margin: 1.1rem 0.1rem;
    column-count: 3;
    column-gap: 0.1rem;
    .photo{
        margin-bottom: 0.1rem;
        img{
            width: 100%;
            height:100%;
        }
    }
}

</style>