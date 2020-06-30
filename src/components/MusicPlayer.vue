<template>
    <div>
        <!-- 专辑信息 -->
        <div class="album">
            <div class="album-mask" :style="{background:'url(' + albumImg + ') no-repeat center/cover'} ">

            </div>
            <div class="album-img">
                <img :src="albumImg" alt="">
            </div>
            <div class="album-info">
                <p class="album-info-title">{{albumTitle}}</p>
                <p class="album-info-author">{{albumAuthor}}</p>
                <div class="album-info-control clearfix">
                    <div  class="album-info-control-icon">
                        <i class="icon iconfont iconleftbutton" @click="prev"></i>
                        <i class="icon iconfont iconsuspended" v-show="isPlay" @click="pauseMusic"></i>
                        <i class="icon iconfont iconplay" v-show="!isPlay" @click="playMusic"></i>
                        <i class="icon iconfont iconRightbutton" @click="next"></i>
                    </div>
                    <span @click="toggleList=!toggleList" class="album-info-control-menu">歌单</span>
                </div>
            </div>
        </div>
        <!-- 歌单 -->
        <transition name="slide">
            <ul class="music-list" v-show="toggleList">
                <li @click="selectMusic(index)" :class="['music-list-item',nowIndex == index?'selected':'']" v-for="(music,index) in musicList" :key="index">
                    <span class="music-list-item-title">{{music.title}}&nbsp;-&nbsp;</span>
                    <span class="music-list-item-author">{{music.author}}</span>
                </li>
            </ul>
        </transition>  
        <!-- 播放控件 -->
        <div class="audio">
            <audio ref="musicAudio" @play="isPlay=true" @pause="isPlay=false" class="audio-control" :src="albumSrc" autoPlay controls></audio>
        </div>   
        <!-- 歌词列表  -->
        <ul class="lrclist" ref="lrclist">
            <li :class="lrcIndex==index?'selected':''" v-for="(musiclrc,index) in lrcList" :key="musiclrc.time">
                {{musiclrc.lrc}}
            </li>
        </ul>
    </div>
</template>

<script>
    import '@/assets/font/iconfont.css';
    import axios from 'axios';
    export default {
        props:['musicList'],
        data(){
            return{
                nowIndex:-1,//当前选中歌曲的索引
                albumImg:'/img/albumImg.jpg',//专辑的封面
                albumTitle:'默认歌曲',//歌曲名称
                albumAuthor:'默认歌手',//歌曲歌手
                isPlay:false,//是否在播放
                toggleList:true,//歌单是否显示
                albumSrc:'',//歌曲的url
                lrcList:[],//歌词的数组
                lrcIndex:-1,
            }
        },     
        methods:{
            selectMusic(index){
                this.nowIndex = index;
            },
            // selectMusic(music,index){
            //     this.nowIndex = index;
            //     this.albumImg = music.musicImgSrc;
            //     this.albumTitle = music.title;
            //     this.albumAuthor = music.author;
            //     this.albumSrc = music.src;
            // },
            playMusic(){
                //获取真实dom,用ref
                // console.log(this.$refs.musicAudio)
                if(this.nowIndex != -1){
                    this.$refs.musicAudio.play();
                }   
            },
            pauseMusic(){
                this.$refs.musicAudio.pause();
            },
            prev(){
                this.nowIndex--;
                if(this.nowIndex == -1){
                    this.nowIndex = this.musicList.length-1;
                }
            },
            next(){
                this.nowIndex++;
                if(this.nowIndex == this.musicList.length){
                    this.nowIndex = 0;
                }
            },
            //解析歌词
            parseLrc(text){
                // console.log(text)
                //按照行分割
                let line = text.split('\n');//字符串转换数组
                // console.log(line)
                //时间和歌词分开
                line.forEach(elem =>{
                    // reg.exec(str)//正则表达式方法
                    // str.match(reg);//字符串方法
                    let time = elem.match(/\[\d{2}:\d{2}.\d{2}\]/);
                    
                    // console.log(time)
                    // console.log(elem.split(time))
                    if(time != null){
                        let times = time[0];
                        let lrc = elem.split(time)[1];
                        // console.log(times,lrc)                      
                        let timeReg = times.match(/(\d{2}):(\d{2}).(\d{2})/);
                        // console.log(timeReg)
                        //把时间转换成秒
                        let time2Seconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3])/1000;
                        // console.log(time2Seconds,lrc)
                        this.lrcList.push({
                            time:time2Seconds,
                            lrc:lrc
                        });
                    }   
                });
                //  console.log(this.lrcList)
            }
        },
        watch:{
            nowIndex(){
                // console.log(this.musicList)
                let nowMusic = this.musicList[this.nowIndex];
                // console.log(nowMusic)
                this.albumImg = nowMusic.musicImgSrc;
                this.albumTitle = nowMusic.title;
                this.albumAuthor = nowMusic.author;
                this.albumSrc = nowMusic.src; 
                this.lrcList = []; 
                this.lrcIndex = -1;
                //加载歌词
                // console.log(nowMusic.lrc)
                axios.get(nowMusic.lrc).then(res=>{
                    // console.log(res.data)
                    this.parseLrc(res.data);
                });
            }
        },
        mounted(){
            // oDiv.onclick = function(){};
            // oDiv.addEventListener('click',function(){},false);
            // this.$refs.musicAudio.ontimeupdate = function(){};
            let musicAudio = this.$refs.musicAudio;
            // musicAudio.addEventListener('timeupdate',function(){
            musicAudio.addEventListener('timeupdate',()=>{
                // console.log(musicAudio.currentTime)
                let currentTime = musicAudio.currentTime;
                // console.log(currentTime)
                this.lrcList.forEach((elem,index)=>{
                    // console.log(elem.time,currentTime)
                    if(Math.ceil(elem.time) >= currentTime && Math.floor(elem.time) < currentTime){
                        this.lrcIndex = index;
                        this.$refs.lrclist.scrollTop = this.lrcIndex * 25;
                    }
                });
                
            });
        }
    }
</script>

<style lang="scss" scoped>
.clearfix::after{
    content:'';
    display:block;
    clear:both;
}
.music-list{
    position:fixed;
    bottom:2rem;
    width:100%;
    background:#2a2929;
    height:4rem;
    overflow-y:scroll;
    &-item{
        color:#dcdbdb;
        border-bottom: 0.02rem solid #343433;
        padding: 0.2rem;
        &.selected{
            color:#299557;
        }
    }
    // &-item:hover{
    //     color:green;
    // }
}
.album{
    display:flex;
    text-align:center;
    position:relative;
    height: 2.2rem;
    &-mask{
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        filter:blur(20px);
        z-index:-1;
    }
    &-img{
        flex-grow:1;
        width:0;
        margin-left:0.2rem;
        img{
            width:100%;
        }
    }
    &-info{
        flex-grow:2;
        width:0;
        color:#fff;
        &-title{
            font-size:0.5rem;
        }
        &-control{
            position:relative;
            height:0.9rem;
            line-height: 0.9rem;
           &-icon{
               float:left;
               position:absolute;
               left:50%;
               transform:translateX(-50%);
               .icon{
                   font-size:0.5rem;
               }
           }
           &-menu{
               float:right;
               margin-right:0.4rem;
               color:#02642c;
           }
        }
    }
}
.slide{
    &-enter{
        transform:translateY(100%);
        &-to{
            transform:translateY(0);
        }  
        &-active{
            transition:transform 1s ease;
        }
    }
    &-leave{
        transform:translateY(0);
        &-to{
            transform:translateY(100%);
        }  
        &-active{
            transition:transform 1s ease;
        }
    }
}
.audio{
    background:#ccc;
    height:1rem;
    position:fixed;
    bottom:1rem;
    width:100%;
    display:flex;
    align-items:center;
    &-control{
        width:100%;
    }
}
.lrclist{
    text-align:center;
    position:fixed;
    left:0;
    right:0;
    bottom:2rem;
    top:3.2rem;
    overflow-y:scroll;
    z-index:-1;
    padding-top:2rem;
    .selected{
        color:#299557;   
        font-size: 120%;
    }
}

</style>