<template>
    <div id="detail" :class="{slide1:anm,slide2:!anm}">
        <Header id="header" title="影片详情">
            <i class="iconfont icon-right" @touchstart="backLast"></i>
        </Header>
		<div id="content" class="contentDetail">
			<div class="detail_list">
				<div class="detail_list_bg"></div>
				<div class="detail_list_filter"></div>
				<div class="detail_list_content">
					<div class="detail_list_img">
						<img :src="desc.img | setWH('108.150')" alt="">
					</div>
					<div class="detail_list_info">
						<h2>{{desc.nm}}</h2>
						<p>{{desc.enm}}</p>
						<p>{{desc.sc}}</p>
						<p>{{desc.cat}}</p>
						<p>{{desc.src}}/{{desc.dur}}分钟</p>
						<p>{{desc.pubDesc}}</p>
					</div>
				</div>
			</div>
			<div class="detail_intro">
				<p>{{desc.dra}}</p>
			</div>
			<div class="detail_player swiper-container" ref="detail_player">
				<ul class="swiper-wrapper">
					<li class="swiper-slide" v-for="(it,i) in desc.photos" :key = "i">
						<div>
							<img :src="it | setWH('147.127')" alt="">
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import Header from '@/components/Header'
export default {
	name: 'detail',
	props:['id'],
	data(){
		return{
			desc:{},
			anm:true,
		};
	},
    components:{
        Header
	},
	mounted(){
		var that = this;
		this.axios.get('/api/detailmovie?movieId='+this.id).then((res)=>{
			if(res.data.msg === 'ok' ){
				that.desc = res.data.data.detailMovie;
				this.$nextTick(()=>{
					new Swiper(this.$refs.detail_player,{
						slidesPerView : 'auto',
						freeMode : true,//自由拖拽
						freeModeSticky : true//自由对其
					})
				});
			}
		});
	},
	methods:{
		backLast(){
			this.$router.back();
			this.anm = false;
		}
	}
}
</script>
<style scoped>
#detail{
    position: absolute;
    left:0;
    top:0;
    z-index: 100;
    width: 100%;
    min-height: 100%;
    background-color: aliceblue;
}
.slide1{animation:.4s slideto};
.slide2{animation:.4s slideleave};
@keyframes slideto {
	0%{transform: translateX(100%)}
	100%{transform: translateX(0)}
}
#detail{animation:.4s slideto};
@keyframes slideleave {
	100%{transform: translateX(100%)}
	0%{transform: translateX(0)}
}
#content.contentDetail{ display: block; margin-bottom:0;}
#content .detail_list{ height:200px; width:100%; position: relative; overflow: hidden;}
.detail_list .detail_list_bg{ width:100%; height:100%; background: url() 0 40%; filter: blur(20px); background-size:cover; position: absolute; left: 0; top: 0;}
.detail_list .detail_list_filter{ width:100%; height:100%; position: absolute;background-color: #40454d;opacity: .55; position: absolute; left: 0; top: 0; z-index: 1;}
.detail_list .detail_list_content{ display: flex; width:100%; height:100%; position: absolute; left: 0; top: 0; z-index: 2;}
.detail_list .detail_list_img{ width:108px; height: 150px; border: solid 1px #f0f2f3; margin:20px;}
.detail_list .detail_list_img img{ height: 100%;}
.detail_list .detail_list_info{ margin-top: 20px;}
.detail_list .detail_list_info h2{ font-size: 20px; color:white; font-weight: normal; line-height: 40px;}
.detail_list .detail_list_info p{ color:white; line-height: 20px; font-size: 14px; color:#ccc;}
#content .detail_intro{ padding: 10px;}
#content .detail_player{ margin:20px;}
.detail_player .swiper-slide{ width:70px; margin-right: 20px; text-align: center; font-size: 14px;}
.detail_player .swiper-slide img{ width:100%; margin-bottom: 5px;}
.detail_player .swiper-slide p:nth-of-type(2){ color:#999;}
</style>