<template>
  <swiper 
  	:options="swiperOption" 
  	class="swiper swiper-container"
  >
    <swiper-slide 
    	v-for="item in modelInfo.broadcastImg" 
    	class="swiper-list"
    	:class="{ active:isActive }"
    	:key="item.id"
    >
    	<img :src="item.picurl" />
    </swiper-slide>
    
    <div class="swiper-pagination"  slot="pagination"></div>
    <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
  </swiper>
</template>

<script>
export default {
	props: ['pid'],
	data() {
		return {
			modelInfo: '',
			screenWidth: document.body.clientWidth,
			isActive: '',
			swiperOption: {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				loop: true,
				prevButton:'.swiper-button-prev',
				nextButton:'.swiper-button-next',
				observer:true,
				observeParents:true,
			}
		}
	},
	mounted () {
		this.getInfo()
		this.$nextTick(function(){
			var mySwiper = new Swiper('.swiper-container',{
				observer:true,
				observeParents:true,
			})
		})
	},
	methods: {
		getInfo() {
			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
					this.modelInfo = this.$store.state.stepPages.banner[i]
				}
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import 'swiper/dist/css/swiper.css'
	.swiper >>> .swiper-pagination-bullet
		background: #000
		opacity: 0.8
	.swiper >>> .swiper-pagination-bullet-active
		background: $bgColor
	.swiper
		min-height: 203px
		z-index: 0
		.swiper-list
			overflow: hidden
			transition: all 0.3s
			img
				height: auto
				width: 100%
		.active
			// width:100% !important
</style>