<template>
    <div class="moviedetail">
        <h1>{{detail.title}}</h1>
        <p>{{detail.summary}}</p>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data(){
            return{
                detail:{}
            }
        },
        created(){
            let url=`/json/movies/${this.$route.params.movieId}.json`
            //let url =`https://www.easy-mock.com/mock/5ef451b3a3825c676e5f3152/movies/${this.$route.params.movieId}`;
            axios.get(url).then(res=>{
                // console.log(res);
                this.detail = res.data.Data;
                // console.log(this.detail)
            })
        }
        
    }
</script>

<style lang="scss" scoped>
.moviedetail{
    text-align:center;
    padding:0 1rem;
}
</style>