<template>
    <div class="city_body">
        <div class="city_list">
            <Scroller>
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li  v-for="it in hotcities" :key="it.id" @tap="changeCity(it.nm,it.id)">{{it.nm}}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref="case_">
                        <div v-for="it in cities" :key='it.index' >
                            <h2>{{it.index}}</h2>
                            <ul>
                                <li v-for="itc in it.list" :key='itc.id' @tap="changeCity(itc.nm,itc.id)">{{itc.nm}}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Scroller>
        </div>
        <div class="city_index">
            <ul>
                <!-- //touchstart取消了 click 事件延迟 -->
                <li @touchstart="handleToI(i)" v-for="(it,i) in cities" :key="it.index">{{it.index}}</li>
                <!--touchstar 移动端触摸事件  -->
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'City',
    data(){
        return{
            cities:[],
            hotcities:[]
        }
    },
    components:{
    },
    mounted(){
        var cities = window.localStorage.getItem('cities');
        var hotcities = window.localStorage.getItem('hotcities');
        if(cities && hotcities){
            this.cities = JSON.parse(cities);
            this.hotcities = JSON.parse(hotcities);
        }else{
            this.axios.get('/api/cityList').then((res)=>{
                let c = res.data.msg;
                if(c === 'ok'){
                    var data = res.data.data.cities;
                    var { cities, hotcities} = this.getcities(data);
                    this.cities = cities;
                    this.hotcities = hotcities;
                    //变化不大数据进行本地储存 本地存储是字符串方式  所以用json转换 不会损失格式
                    window.localStorage.setItem('cities',JSON.stringify(cities));
                    window.localStorage.setItem('hotcities',JSON.stringify(hotcities));
                }
            });
        }
    },
    methods:{
        getcities(city){
            var cities =[];
            var hotcities =[];
            city.forEach(( it, i) => {
                var firstCase = it.py.slice(0,1).toUpperCase();
                if(it.isHot === 1){
                    hotcities.push(it);
                }
                if(pu(firstCase)){
                    cities.push({index:firstCase,list:[{nm:it.nm,id:it.id}]});
                }else{
                    cities.forEach(( itc, i) => {
                        if(itc.index === firstCase){
                            cities[i].list.push({nm:it.nm,id:it.id});
                        }
                    });
                }
            });
            function pu(firstCase){
                for(var i = 0; i < cities.length;i++){
                    if(cities[i].index === firstCase){
                        return false;
                    }
                }
                return true
            }           
            cities.sort((n1,n2)=>{
                if(n1.index>n2.index){
                    return 1;
                }else if(n1.index<n2.index){
                    return -1;
                }else{
                    return 0;
                }
            }); 
            return{
                cities,
                hotcities
            }
        },
        handleToI(i){
            var h2 = this.$refs.case_.getElementsByTagName('h2');
            this.$refs.case_.parentNode.parentNode.parentNode.scrollTop = h2[i].offsetTop;
        },
        changeCity(nm,id){
            this.$store.commit('city/CITY_INFO',{nm, id});
            window.localStorage.setItem('nowNM',nm);
            window.localStorage.setItem('nowID',id);
            this.$router.push('/movie/nowplaying');
        }
    }
}
</script>
<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul{}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort{}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>