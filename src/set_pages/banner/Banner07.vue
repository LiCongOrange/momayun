<template>
	<div 
		class="broadWrap" 
		ref="site08" 
		:class="{ phoneClass: phoneToggle }"
		:style="{ backgroundImage: 'url(' + modelInfo.bgImg + ')' }"
	>
		<div class="container" @mouseenter="handleEnter" @mouseleave="handleLeave">
		  <swiper :options="swiperOption" ref="myswiper">
		      <swiper-slide v-for="item in modelInfo.broadcastImg" :key="item.bid">
		      	<img :src="item.picurl">
		      	<span>{{ item.title }}</span>
		      </swiper-slide>
		      <div class="swiper-pagination" slot="pagination"></div>
			</swiper>
			<div class="masking-edit" v-if="allEditToggle">
				<span @click="handleWheelClick">编辑</span>
			</div>
		</div>

		<el-dialog
		  title="编辑模块（轮播多图）"
		  :visible.sync="dialogVisible"
		  :close-on-click-moda="true"
		  width="80%"
		  :before-close="handleClose">
		  <wheel-planting
		  	:pid="this.pid"
		  	:pageType="5"
		  	:content="modelInfo.broadcastImg"
		  ></wheel-planting>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">关 闭</el-button>
		  </span>
		</el-dialog>


	</div>
</template>

<script>
import { mapState } from 'vuex'
import imgLayer from '@/common/Imglayer'
import wheelPlanting from '@/common/WheelPlanting'
export default {
	props: ['pid'],
	components: {
		imgLayer,
		wheelPlanting
	},
	data() {
		return {
			dialogVisible: false,
			phoneToggle: false,
			modelInfo: '',
			isActive: '',
		 	swiperOption: {
		 		speed: 8000,
		 		autoplay: true,
		 		loop: true,
        slidesPerView: 5,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        }
      }
		}
	},
	computed: {
		mySwiper() {
			return this.$refs.myswiper.swiper
		},
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
			if(!this.browserToggle) {
				this.phoneToggle = true
			}
			this.handleScroll()
		})
		if(!this.browserToggle) {
			this.swiperOption.slidesPerView = 3
		}
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
		handleWheelClick() {
			this.dialogVisible = true
		},
		handleClose() {
			this.dialogVisible = false
		},
		handleEnter() {
			// this.$refs.mySwiper.stop()
		},
		handleLeave() {
			// this.$refs.mySwiper.start()
		},
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
@import '~styles/public'
.broadWrap
	padding: 20px 0
	.container
		position: relative
		&:hover
			.masking-edit
				opacity: 1
	.masking-edit
		position: absolute
		left: 0
		top: 0
		width: 100%
		height: 100%
		z-index: 10
		background-color: $maskbg
		border: $maskborder
		border-radius: $maskradius
		display: flex
		align-items: center
		justify-content: center
		opacity: 0
		transition: all .3s
		span
			border-radius: $addbtnradius
			padding: $addbtnpadding
			background-color: $addbtnbg
			font-size: $addbtnfontsize
			color: $addbtncolor
			cursor: pointer
	>>> .swiper-slide
		margin-right: 20px
		background-color: #fff
		text-align: center
		&:hover
			span
				transform: translateY(0)
		span
			position: absolute
			bottom: 0
			left: 0
			right: 0
			overflow: hidden
			background-color: rgba(0, 0, 0, .5)
			line-height: 28px
			color: #fff
			transform: translateY(100%)
			transition: all .3s
			font-size: 0.8em
		img
			height: 180px
			width: 100%
</style>