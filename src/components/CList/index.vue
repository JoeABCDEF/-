<template>
    <div class="cinema_body">
        <ul>
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
    </div>
</template>
<script>
export default {
    name: 'CList',
    data(){
        return {
            ciList : []
        }
    },
    mounted(){
        this.axios.get('/api/cinemaList?cityId=10').then((res)=>{
            var msg = res.data.msg;
            if(msg==='ok'){
                this.ciList = res.data.data.cinemas;
            }
        });
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
</style>