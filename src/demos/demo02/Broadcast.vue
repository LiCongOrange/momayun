<template>
<div class="broadWrap" :class="{ phoneClass: phoneToggle }" ref="broadcast1">
  <swiper 
  	:options="swiperOption" 
  	class="swiper swiper-container"
  >
    <swiper-slide 
    	v-for="(item, index) in modelInfo.broadcastImg"
    	class="swiper-list"
    	:class="{ active:isActive }"
    	:key="index"
    >
    	<img :src="item.picurl" />
    	<button 
    		v-if="allEditToggle"
    		@click="upImgHandel(index, item.picurl, item.bid)"
    	>图片编辑</button>
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
    <div 
    	class="swiper-button-prev swiper-button-white" 
    	slot="button-prev" 
    	:style="{ opacity: opacityNum }"
    	:class="{animated: isanimated1, bounceInLeft: isfade1}"
    ></div>
    <div 
    	class="swiper-button-next swiper-button-white" 
    	slot="button-next" 
    	:style="{ opacity: opacityNum }"
    	:class="{animated: isanimated1, bounceInRight: isfade1}"
    ></div>
  </swiper>
  <img-layer
  	v-if="imgReplaceToggle" 
		:imgTu="postImg"
		:widthNum="widthNum"
		:heightNum="heightNum"
		@getImg="getImg"
		@onoff="onoff"
  ></img-layer>
  <div class="addList dropdown" v-if="allEditToggle">
		<button type="button" class="btn dropdown-toggle" @click="dropHandel">
			滑块
			<span class="iconfont">&#xe6fb;</span>
		</button>
		<ul class="dropdown-menu" v-if="activeToggle">
			<li 
				v-for="(item, index) in modelInfo.broadcastImg" 
				:class="{ active: item.spanOnoff }"
				@click="handelClick(index, item.bid)"
				:id="index"
			>
				<img :src="item.picslurl">
				<span><i class="iconfont" @click="deleteList(index)">&#xe6e9;</i></span>
			</li>
			<li>
				<button @click="addList"><i class="iconfont">&#xe6df;</i>添加滑块</button>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import imgLayer from '@/common/Imglayer'
export default {
	props: ['pid'],
	components: {
		imgLayer
	},
	data() {
		return {
			isanimated1: false,
			isfade1: false,
			phoneToggle: false,
			opacityNum: 0,
			imgList: [],
			bid: '',
			activeToggle: false,
			widthNum: '1920',
			heightNum: '1080',
			imgTu: '',
			indexes: '',
			postImg: '',
			imgReplaceToggle: false,
			modularName: '轮播',
			section: '',
			modelInfo: '',
			screenWidth: document.body.clientWidth,
			isActive: '',
			swiperOption: {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				loop: false,
				prevButton:'.swiper-button-prev',
				nextButton:'.swiper-button-next',
				observer:true,
				observeParents:true,
				initialSlide: 1,
				loop:true,
				// effect: 'fade'
			}
		}
	},
	mounted () {
  	for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
  		if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
  			this.modelInfo = this.$store.state.stepPages.banner[i]
				this.$store.state.stepPages.banner[i].broadcastImg[0].spanOnoff = true
  		}
  	}
		this.$nextTick(function(){
			var mySwiper = new Swiper('.swiper-container',{
				observer:true,
				observeParents:true,
			})
		})
  	if(!this.browserToggle) {
  		this.phoneToggle = true
  	}
  	window.addEventListener('scroll', this.handleScroll)
  	this.$nextTick(function() {
  		this.handleScroll()
  	})
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			siteId: state => state.threeStep.siteId,
			browserToggle: state => state.browserToggle
		})
	},
	methods: {
		handleScroll() {
			if(this.allEditToggle) {
				this.opacityNum = 1
			}else {
				let htmlT = this.$refs.broadcast1.getBoundingClientRect().top
	  		if(htmlT <= 450) {
	  			this.isanimated1 = true
	  			this.isfade1 = true
	  		}
			}
		},
		deleteList(index) {
			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
					this.$store.state.stepPages.banner[i].broadcastImg.splice(index, 1)
					this.$axios({
						method: 'post',
						url: '/api/Senior/delmessage',
						data: {
							id: this.bid,
							type: 5
						}
					}).then((res)=> {
						if(res.data.code == '404') {
							alert(res.data.msg)
						}
					})
				}
			}
		},
		addList() {
			let obj = {
				spanOnoff: true,
      	title: '',
      	content: '',
      	picslurl: '/static/images/banner/hides/bro03.png',
				picurl: '/static/images/banner/broadcast/broadcast03.png'
			}
			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
					for(let j=0; j<this.$store.state.stepPages.banner[i].broadcastImg.length; j++) {
						this.$store.state.stepPages.banner[i].broadcastImg[j].spanOnoff = false
					}
				}
			}
			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
					this.$axios({
						method: 'post',
						url: '/api/Senior/newcmessage',
						data: {
							wid: this.siteId,
							type: 5,
							text: obj,
							lmid: this.pid
						}
					}).then((res)=> {
						if(res.data.code == '200') {
							let obj = {
								bid: res.data.data,
								spanOnoff: true,
				      	title: '',
				      	content: '',
				      	picslurl: '/static/images/banner/hides/bro03.png',
								picurl: '/static/images/banner/broadcast/broadcast03.png'
							}
							this.$store.state.stepPages.banner[i].broadcastImg.push(obj)
						}
						if(res.data.code == '404') {
							alert(res.data.msg)
						}
					})
				}
			}
		},
		handelClick(index, bid) {
			this.bid = bid
			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
					for(let j=0; j<this.$store.state.stepPages.banner[i].broadcastImg.length; j++) {
						this.$store.state.stepPages.banner[i].broadcastImg[j].spanOnoff = false
					}
					this.$store.state.stepPages.banner[i].broadcastImg[index].spanOnoff = true
				}
			}
		},
		dropHandel() {
			this.activeToggle = !this.activeToggle
		},
		onoff(val) {
			this.imgReplaceToggle = false
		},
		getImg(val) {
			this.imgList = []
			let obj = {
				url: val
			}
			this.imgList.push(obj)
			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
					// this.$store.state.stepPages.banner[i].broadcastImg[this.indexes].picslurl = val
					// this.$store.state.stepPages.banner[i].broadcastImg[this.indexes].picurl = val
					this.$axios({
						method: 'post',
						url: '/api/upload/imgsUpload',
						data: this.imgList
					}).then((res)=> {
						if(res.data.code == '200') {
							this.$store.state.stepPages.banner[i].broadcastImg[this.indexes].picurl = res.data.data[0].url
							this.$store.state.stepPages.banner[i].broadcastImg[this.indexes].picslurl = res.data.data[0].url
							this.$axios({
								method: 'post',
								url: '/api/Senior/savemessage',
								data: {
									id: this.bid,
									type: 5,
									text: this.$store.state.stepPages.banner[i].broadcastImg[this.indexes]
								}
							}).then((res)=> {
								if(res.data.code == '404') {
									alert(res.data.msg)
								}
							})
						}else {
							alert(res.data.msg)
						}
					})
				}
			}
		},
		upImgHandel(index, val, bid) {
			this.indexes = index
			this.postImg = val
			this.imgReplaceToggle = true
			this.bid = bid
		}
	}
}
</script>

<style lang="stylus" scoped>
@import 'swiper/dist/css/swiper.css'
@import '~styles/public'
.broadWrap
	position: relative
	.addList
		position: absolute
		right: 10px
		top: 10px
		button
			width: $asswidth
			background: $assbg
			border: $assborder
			border-radius: $assradius
			padding: 5px 30px
			color: #fff
			&:hover
				background: $assbghover
		.dropdown-menu
			width: 100%
			min-width: inherit
			border: $assborder
			background: $assbg
			margin-top: -2px
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
					height: 27px
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
	.swiper-container
		width:100%
		min-height:400px
	.swiper >>> .swiper-pagination-bullet
		background: #000
		opacity: 0.8
	.swiper >>> .swiper-pagination-bullet-active
		background: $bgColor
	.swiper
		min-height: 400px
		z-index: 0
		.swiper-button-next
			opacity: 0
		.swiper-button-prev
			opacity: 0
		.animated
			opacity: 1 !important
		.swiper-list
			overflow: hidden
			transition: all 0.3s
			position: relative
			img
				height: 100%
				width: 100%
			button
				width: $asswidth
				position: absolute
				top: 10px
				right: 148px
				border: $assborder
				border-radius: $assradius
				background: $assbg
				padding: 6px 25px
				color: #fff
				&:hover
					background: $assbghover
		.active
			// width:100% !important
.phoneClass
	max-height: 300px
	.swiper
		max-height: 300px
		min-height: 300px
		.swiper-slide
			img
				width: auto
				transform: translateX(-40%)
</style>