<template>
    <div class="cinema_body">
        <Scroller :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <li class="pullDown">{{pullDownMsg}}</li>
                <li v-for='it in ciList' :key='it.id'>
                    <div>
                        <span>{{it.name}}</span>
                        <span class="q"><span class="price">{{it.sellPrice}}</span> 元起</span>
                    </div>
                    <div class="address">
                        <span>{{it.addr}}</span>
                        <span>{{it.distance}}</span>
                    </div>
                    <div class="card">
                        <div v-if="it.tag.snack">小吃</div>
                        <div v-if="it.tag.vipTag">折扣卡</div>
                    </div>
                </li>
            </ul>
        </Scroller> 
    </div>
</template>
<script>
export default {
    name: 'CList',
    data(){
        return {
            ciList : [],
            pullDownMsg :'',
            prevCiId:-1
        }
    },
    activated(){//activated 和 mounted区别  activated 有keep-alive 才有用
        var cId = this.$store.state.city.id;
        if(this.prevCiId === cId){return;}

        this.axios.get('/api/cinemaList?cityId='+cId).then((res)=>{
            var msg = res.data.msg;
            if(msg==='ok'){
                this.prevCiId = cId;
                this.ciList = res.data.data.cinemas;
            }
        });
    },
    methods:{
        // handleToDesc(){
        //     console.log('ass');
        // },
        handleToScroll(pos){
            //pos 有x y 值
            if(pos.y > 20){
                this.pullDownMsg = '正在更新中...';
            }
        },
        handleToTouchEnd(pos){
            console.log('21');
            if(pos.y > 20){
                this.axios.get('/api/cinemaList?cityId=10').then(
                    (res)=>{
                        this.$nextTick(()=>{
                            this.pullDownMsg = '更新成功';
                            this.pullDownMsg = '';
                        });
                });                                
            }
        }
    }
}
</script>
<style scoped>
#content .cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
.movie_body .pullDown{
    margin: 0;
    padding: 0;
    border: none;
}
</style>