<template>
<div class="broadWrap" ref="site08" :class="{ phoneClass: phoneToggle }">
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
    <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
  </swiper>
  <img-layer
  	v-if="imgReplaceToggle" 
		:imgTu="postImg"
		:widthNum="widthNum"
		:heightNum="heightNum"
		:lunbo="123"
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
				@click="handelClick(index)"
				:id="index"
			>
				<img :src="item.picurl">
				<span><i class="iconfont" @click="deleteList(index, item.bid)">&#xe6e9;</i></span>
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
			phoneToggle: false,
			isanimated1: false,
			isfade1: false,
			opacityNum: 0,
			imgList: [],
			bid: '',
			activeToggle: false,
			widthNum: '1600',
			heightNum: '600',
			imgTu: '',
			indexes: '',
			postImg: '',
			imgReplaceToggle: false,
			modelInfo: '',
			screenWidth: document.body.clientWidth,
			isActive: '',
			swiperOption: {
				pagination: '.swiper-pagination',
				paginationClickable: true,
				// loop: false,
				prevButton:'.swiper-button-prev',
				nextButton:'.swiper-button-next',
				// observer:true,
				// observeParents:true,
				// initialSlide: 0,
				// effect: 'fade',
				// type: 'fraction'
			}
		}
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			browserToggle: state => state.browserToggle,
			stepPages: state => state.stepPages
		})
	},
	mounted () {
		if(!this.pid) {
			for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
				if(this.$store.state.blocks.modeltextList[i].lmid == 'add07') {
					this.modelInfo = this.$store.state.blocks.modeltextList[i]
				}
			}
		}else {
			for(let i=0; i<this.stepPages.banner.length; i++) {
				if(this.stepPages.banner[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.banner[i]
				}
			}
		}
		this.$nextTick(function(){
			var mySwiper = new Swiper('.swiper-container',{
				observer:true,
				observeParents:true,
			})
			if(!this.browserToggle) {
				this.phoneToggle = true
			}
			this.handleScroll()
		})
    window.addEventListener('scroll', this.handleScroll)
	},
	watch: {
		pid(val) {
			if(!this.pid) {
				for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
					if(this.$store.state.blocks.modeltextList[i].lmid == 'add07') {
						this.modelInfo = this.$store.state.blocks.modeltextList[i]
					}
				}
			}else {
				for(let i=0; i<this.stepPages.banner.length; i++) {
					if(this.stepPages.banner[i].lmid == this.pid) {
						this.modelInfo = this.stepPages.banner[i]
					}
				}
			}
		}
	},
	methods: {
    handleScroll() {
      if(this.allEditToggle) {
      	this.opacityNum = 1
      }else {
      	let htmlT = this.$refs.site08.getBoundingClientRect().top
	      if(htmlT <= 450) {
	      	this.isanimated1 = true
	        this.isfade1 = true
	      }
      }
    },
		deleteList(index, bid) {
			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
					if(this.$store.state.stepPages.banner[i].broadcastImg.length>0) {
						this.$store.state.stepPages.banner[i].broadcastImg.splice(index, 1)
						this.$axios({
							method: 'post',
							url: '/api/Senior/delmessage',
							data: {
								id: bid,
								type: 5
							}
						}).then((res)=> {
							if(res.data.code == '404') {
								alert(res.data.msg)
							}
						})
					}else {
						alert('这是最后一个了')
					}
				}
			}
		},
		addList() {
			let obj = {
		      	spanOnoff: true,
				    title: '',
				    content: '',
		      	picslurl: '/static/images/banner/hides/bro03.png',
		        picurl: '/static/images/banner/broadcast/broadcast12.jpg'
		      }
			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
					// this.$store.state.stepPages.banner[i].broadcastImg.push(obj)
					for(let j=0; j<this.$store.state.stepPages.banner[i].broadcastImg.length; j++) {
						this.$store.state.stepPages.banner[i].broadcastImg[j].spanOnoff = false
					}
					this.$axios({
						method: 'post',
						url: '/api/Senior/newcmessage',
						data: {
							wid: this.$store.state.threeStep.siteId,
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
								picurl: '/static/images/banner/broadcast/broadcast12.jpg'
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
		handelClick(index) {
			for(let i=0; i<this.modelInfo.broadcastImg.length; i++) {
				this.modelInfo.broadcastImg[i].spanOnoff = false
			}
			this.modelInfo.broadcastImg[index].spanOnoff = true
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
					this.$store.state.stepPages.banner[i].broadcastImg[this.indexes].picslurl = val
					this.$store.state.stepPages.banner[i].broadcastImg[this.indexes].picurl = val
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
		upImgHandel(index, val, id) {
			this.bid = id
			this.indexes = index
			this.postImg = val
			this.imgReplaceToggle = true
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
			border-radius: $backgroundborder1
			padding: 5px 30px
			color: #fff
			line-height: 22px
			&:hover
				background: $assbghover
		.dropdown-menu
			width: 100%
			min-width: inherit
			border: none
			border-radius: $backgroundborder2
			background: $assbg
			margin-top: -2px
			padding: 7px 7px 7px
			display: block
			li
				margin-top: 5px
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
					height: 30px
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
	.swiper-button-next
		width: 70px
		height: 100%
		margin-top: 0
		right: 0
		background-size: 26px 98px
		opacity: 0
		top: 0
		bottom: 0
		cursor: pointer
		transform: translateX(100%)
		transition: all .3s
		&:before
			content: ''
			display: block
			background: rgba(255, 255, 255, 0.25)
			width: 70px
			height: 100%
	.swiper-button-prev
		width: 70px
		height: 100%
		background-size: 26px 68px
		margin-top: 0
		opacity: 0
		left: 0
		top: 0
		cursor: pointer
		transform: translateX(-100%)
		transition: all .3s
		cursor: pointer
		&:before
			content: ''
			display: block
			background: rgba(255, 255, 255, 0.25)
			width: 70px
			height: 100%
	.animated
		opacity: 1 !important
	.swiper >>> .swiper-pagination-bullet
		background: #fff
		opacity: 1
		width: 30px
		border-radius: 25%
		height: 3px
	.swiper >>> .swiper-pagination-bullet-active
		background: #333
	.swiper
		min-height: 203px
		z-index: 0
		&:hover
			.swiper-button-prev, .swiper-button-next
				opacity: 1
				transform: translateX(0%)
		.swiper-list
			overflow: hidden
			transition: all 0.3s
			position: relative
			img
				height: auto
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
	min-height: 200px
	.swiper
		.swiper-list
			min-height: 200px
			img
				min-height: 200px
				// width: auto
				max-height: 230px
</style>