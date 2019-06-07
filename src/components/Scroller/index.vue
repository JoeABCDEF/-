<template>
    <div class ='wrapper' ref="wrapper">
        <slot></slot>
    </div>
</template>
<script>
 import BScroll from 'better-scroll';
export default {
    name: 'SCroller',
    props:{
        handleToScroll:{
            type:Function,
            default:function(){}
        },
        handleToTouchEnd:{
            type:Function,
            default:function(){}
        }
    },
    mounted(){
        var scroll = new BScroll(this.$refs.wrapper,{
            tap:true, //可以使用 tap 点击事件   就是在滑动不触发
            probeType:1
        });
        scroll.on('scroll',(pos)=>{//滑动的事件
            this.handleToScroll(pos);
        });
        scroll.on('touchEnd',(pos)=>{//拖拽结束的事件
            this.handleToTouchEnd(pos);
        });
    }
}
</script>
<style scoped>
.wrapper{
    height: 100%;
}
</style>