<template>
    <div class="movie_body">
        <Scroller :handleToScroll="handleToScroll" :handleToTouchEnd="handleToTouchEnd">
            <ul>
                <!-- <li v-for="it in movieList" :key='it.id'>
                    <div class="pic_show">
                        <img :src="it.img | setWH('128.180')">
                    </div>
                    <div class="info_list">
                        <h2>{{it.nm}}<img v-if="it.version" src="@/assets/max.png"></h2>
                        <p>观众评 <span class="grade">{{it.sc}}</span></p>
                        <p>主演: {{it.star}}</p>
                        <p>{{it.showInfo}}</p>
                    </div>
                    <div class="btn_mall">
                        购票
                    </div>
                </li> -->
                <li class="pullDown">{{pullDownMsg}}</li>
                <li v-for="it in comingList" :key='it.id'>
                    <div class="pic_show">
                        <img :src="it.img | setWH('128.180')">
                    </div>
                    <div class="info_list">
                        <h2>{{it.nm}}<img v-if="it.version" src="@/assets/max.png"></h2>
                        <p><span class="person">{{it.wish}}</span> 人想看</p>
                        <p>主演: {{it.star}}</p>
                        <p>{{it.rt}}上映</p>
                    </div>
                    <div class="btn_pre">
                        预售
                    </div>
                </li>
            </ul>
        </Scroller> 
    </div>
</template>
<script>
export default {
    name: 'ComingSoon',
    data(){
        return {
            comingList : [],
            pullDownMsg :'',
            prevCiId:-1
        }
    },
    activated(){
        var cId = this.$store.state.city.id;
        if(this.prevCiId === -1 || this.prevCiId !== cId){
            this.axios.get('/api/movieComingList?cityId='+cId).then(
                (res)=>{
                    var msg = res.data.msg
                    if (msg === 'ok'){
                        this.prevCiId = cId;
                        this.comingList = res.data.data.comingList;
                    }
                }
            );
        }
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
                this.axios.get('/api/movieComingList?cityId=10').then(
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
#content .movie_body{ flex:1; overflow:auto;}
.movie_body ul{ margin:0 12px; overflow: hidden;}
.movie_body ul li{ margin-top:12px; display: flex; align-items:center; border-bottom: 1px #e6e6e6 solid; padding-bottom: 10px;}
.movie_body .pic_show{ width:64px; height: 90px;}
.movie_body .pic_show img{ width:100%;}
.movie_body .info_list { margin-left: 10px; flex:1; position: relative;}
.movie_body .info_list h2{ font-size: 17px; line-height: 24px; width:150px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list p{ font-size: 13px; color:#666; line-height: 22px; width:200px; overflow: hidden; white-space: nowrap; text-overflow:ellipsis;}
.movie_body .info_list .grade{ font-weight: 700; color: #faaf00; font-size: 15px;}
.movie_body .info_list img{ width:36px; position: absolute; right:10px; top: 5px;}
.movie_body .btn_mall , .movie_body .btn_pre{ width:47px; height:27px; line-height: 28px; text-align: center; background-color: #f03d37; color: #fff; border-radius: 4px; font-size: 12px; cursor: pointer;}
.movie_body .btn_pre{ background-color: #3c9fe6;}
.movie_body .pullDown{
    margin: 0;
    padding: 0;
    border: none;
}
</style>