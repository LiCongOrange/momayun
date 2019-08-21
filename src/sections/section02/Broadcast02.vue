<template>
	<div class="boradWrap">
		<swiper :options="swiperOption" class="swiper-no-swiping">
			<swiper-slide v-for="(item, index) in modelInfo.broadcastImg" :key="index">
				<div class="img">
					<img :src="item.picurl">
				</div>

				<div class="text">
					<div class="inner">
						<h3 v-html="item.title"></h3>
						<p v-html="item.content"></p>
					</div>
				</div>

			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
			<div class="swiper-button-prev" slot="button-prev"></div>
    	<div class="swiper-button-next" slot="button-next"></div>
		</swiper>
	</div>
</template>

<script>
import FnEditor from '@/common/Editor'
import imgLayer from '@/common/Imglayer'
export default {
	props: ['pid'],
	components: {
		imgLayer,
		FnEditor,
	},
	data() {
		return {
				activeToggle: false,
				imgReplaceToggle: false,
				postImg: '',
				indexes: '',
				indexes2: '',
				widthNum: '',
				heightNum: '',
				modelInfo: '',
				swiperOption: {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					loop: false,
					prevButton:'.swiper-button-prev',
					nextButton:'.swiper-button-next',
					observer:true,
					observeParents:true,
					initialSlide: 0,
					mousewheel: true
				}
		}
	},
	computed: {
		allEditToggle() {
			this.$store.state.allEditToggle
		}
	},
	mounted() {
		this.getInfo()
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
@import '~styles/public'
.boradWrap
	position: relative
	>>> .swiper-container
		z-index: 0 !important
	.addList
		position: absolute
		right: 10px
		top: 10px
		z-index: 10
		button
			background: $bgColor
			border: none
			border-radius: 5px
			padding: 5px 30px
			color: #fff
			line-height: 22px
		.dropdown-menu
			width: 100%
			min-width: inherit
			border: none
			background: $bgColor
			top: 96%
			padding-bottom: 0
			display: block
			li
				margin: 0 5px 5px
				position: relative
				transition: all .3s
				&:hover
					overflow: hidden
					img
						opacity: 1
					span
						display: block
						i
							display: none
							cursor: pointer
				img
					width: 100%
					border-radius: 5px
					opacity: 0.8
				button
					background: #666
					padding: 0
					width: 100%
					opacity: 0.8
					&:hover
						opacity: 1
				span
					display: none
					position: absolute
					left: 0 
					right: 0
					top: 0
					bottom: 0
					border: 2px solid #fc2
					padding-right: 10px
					text-align: right
					transition: all .3s
					i
						color: #fff
						font-size: 18px
						font-weight: bold
			.active
				img
					opacity: 1			
				span
					display: block
					i
						display: inline-block !important
	.swiper-slide
		padding: 50px 0
		position: relative
		min-height: 403px
		&:before
			content: ''
			display: block
			position: absolute
			left: 0
			top: 0
			width: 100%
			height: 100%
			background: rgba(0, 0, 0, 0.2)
		.text
			position: relative
			text-align: center
			margin-top:110px
			.inner
				width: 80%
				margin: 0 auto
			h3
				font-size: $fontsize6
				color: #fff
			p
				font-size: $fontsize7
				line-height: 22px
				color: #fff
		.img
			position: absolute
			left: 0
			top: 0
			right: 0
			bottom: 0
			img
				filter: blur(4px)
				min-height: 403px
				width: 100%
		button
			position: absolute
			top: 10px
			right: 135px
			border: 1px solid $bgColor
			border-radius: 5px
			background: $bgColor
			padding: 5px 25px
			color: #fff	
			z-index: 10
</style>