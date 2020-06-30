<template>
    <header class="header" :style="{background:selectMenu.bgColor}">
        <!-- @click="$router.push(`/`)"  -->
        <span class="header-home" @click="gotoMovie()">首页</span>
        <h3 class="header-title">{{selectMenu.title}}</h3>
    </header>
</template>

<script>
    export default {
        props:['selectMenu'],
        methods:{
            gotoMovie(){
                this.$router.push(`/`);
            }
        }
    };
</script>

<style lang="scss" scoped>
.header{  
    height:1rem;
    color:#fff;
    background:#e54847;
    line-height:1rem;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    &-title{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
    }
    &-home{
        margin-left:0.2rem;
    }
}
</style>