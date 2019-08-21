<template>
	<div class="banner_box">
		<div class="swiper-container">
			<div class="swiper-wrapper">
		    <div class="swiper-slide" v-for="item of imglist"><img :src="item"></div>
		  </div>
			  <!-- 如果需要分页器 -->
	    <div class="swiper-pagination"></div>
	    
	    <!-- 如果需要导航按钮 -->
	    <div class="swiper-button-prev"></div>
	    <div class="swiper-button-next"></div>
		</div>
	</div>
</template>
<script>
	import Swiper from 'swiper'
	export default{
		name:"Banner",
		data () {
		    return {
		    	imglist:[
		    		'../../../../static/images/bann_03.png',
		    		'../../../../static/images/bann_03.png',
		    		'../../../../static/images/bann_03.png'
		    	],
		    }
		},
		 mounted(){
		     new Swiper ('.swiper-container', {
			    loop: true,
			    autoplay:3000,
			    speed:1000,
			    // 如果需要分页器
			    pagination: '.swiper-pagination',
			    // 如果需要前进后退按钮
			    nextButton: '.swiper-button-next',
			    prevButton: '.swiper-button-prev',
			  })        
		}
	}
</script>
<style lang="stylus" scoped>
.swiper-container
  width:100%
  // height:500px
  margin:20px auto
  .swiper-wrapper
  	.swiper-slide
  		img
  			width:100%
    
</style>