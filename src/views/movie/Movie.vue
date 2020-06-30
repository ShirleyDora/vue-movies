<template>
    <div>
        <ul>
            <li @click="gotoDetail(movie.id)" class="movie" v-for="(movie, index) in movieList" :key="index+movie"> 
                <!-- <router-link :to="'/moviedetail/' + movie.id "> -->
                    <div class="movie-img" >
                        <img v-bind:src="movie.images.large" alt="">
                    </div>
                    <div class="movie-info">
                        <div class="movie-info-title">
                            {{movie.title}}
                        </div>
                        <div>观众评分：<span class="movie-info-average">{{movie.rating.average}}</span></div>
                        <div class="movie-info-star"> 主演/导演：
                            <span v-for="item in movie.casts" :key="item.id">
                                {{item.name}}&nbsp;
                            </span>
                        </div>
                    </div>
                <!-- </router-link> -->
                
                
            </li>
        </ul>
        <div class="end" v-show="isEnd">
            <h3>数据到底了</h3>
        </div>
        <div class="loading" v-show="isLoading">
            <img src="/img/loading.gif" alt="">
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data(){
            return{
                movieList:[],
                isLoading:true,
                isEnd:false
            }
        },
        methods:{
            getData(){
                 let url='/json/movies.json';//本地自己写的
                //解决跨域，服务器代理https://bird.ioliu.cn/v2?url=或者直接，看接口写的咋样。后端如果有分页功能
                //let url ='https://www.easy-mock.com/mock/5ef451b3a3825c676e5f3152/movies?start=0&count=5';
                //let url ='https://www.easy-mock.com/mock/5ef451b3a3825c676e5f3152/movies';
                this.isLoading = true;
                axios.get(url).then(res=>{
                    // console.log(res.data.Data);
                    // this.movieList = res.data.Data;
                    //假设后端没写，接口不能用，做个假分页，那么自己开始截取分页
                    // this.movieList = res.data.Data.slice(0,5);
                    // console.log(res.data.Data.slice(this.movieList.length,this.movieList.length+5))
                    let getList=res.data.Data.slice(this.movieList.length,this.movieList.length+5);
                    // console.log(getList)截取数组
                    if(getList.length < 5){
                        this.isEnd = true;
                    }
                    this.movieList = this.movieList.concat(getList);
                    // console.log(this.movieList)
                    this.isLoading = false;

                })
            },
            gotoDetail(movieId){
                this.$router.push(`/moviedetail/${movieId}`);
            }
        },
        created(){
            this.$emit('switchTab','movie');
            this.getData();
        },
        mounted(){
            //监听滚动事件
            // window.onscroll = function(){
            //因为this指向不对，所以用箭头函数
            window.onscroll = ()=>{
                let scrollTop = document.documentElement.scrollTop;//滚动距离顶部的距离
                let scrollHeight = document.documentElement.scrollHeight;//滚动的总高度
                let clientHeight = document.documentElement.clientHeight;//可视区域的高度
                // console.log(scrollTop,scrollHeight,clientHeight);
                if(scrollHeight == scrollTop + clientHeight && !this.isEnd){
                    //请求数据
                    this.getData();
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '@/assets/scss/movie.scss'
</style>