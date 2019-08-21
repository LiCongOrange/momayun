<template>
	<div class="boradWrap" ref="broadcast2" :class="{ phoneClass: phoneToggle }">
		<swiper :options="swiperOption" class="swiper-no-swiping">
			<swiper-slide 
				v-for="(item, index) in modelInfo.broadcastImg" 
				:key="index" 
			>
	    	<button 
	    		v-if="allEditToggle"
	    		@click="upImgHandel(index, item.picurl, item.bid)"
	    	>图片编辑</button>
				<div class="img">
					<img :src="item.picurl">
				</div>

				<div class="text" v-if="allEditToggle">
					<div class="inner container" :class="{ width96: allEditToggle }">
						<h3 @click="getIndex(index, 't')" :style="{ opacity: opacityNum }">
							<fn-editor :content="item.title" :type1="5" :type2="11" :lmid="pid" :sonid="item.bid"></fn-editor>
						</h3>
						<p @click="getIndex(index, 'c')" :style="{ opacity: opacityNum }">
							<fn-editor :content="item.content" :type1="5" :type2="3" :lmid="pid" :sonid="item.bid"></fn-editor>
						</p>
					</div>
				</div>

				<div class="text" v-else>
					<div class="inner container">
						<h3 v-html="item.title" :class="{animated: isanimated1, bounceInDown: isfade1}"></h3>
						<p v-html="item.content" :class="{animated: isanimated1, bounceInUp: isfade1}"></p>
					</div>
				</div>

			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
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
			isanimated1: false,
			isfade1: false,
			phoneToggle: false,
				opacityNum: 0,
				bid: '',
				imgList: [],
				activeToggle: false,
				imgReplaceToggle: false,
				postImg: '',
				indexes: '',
				indexes2: '',
				widthNum: '1920',
				heightNum: '1080',
				modelInfo: '',
				swiperOption: {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					loop: true,
					prevButton:'.swiper-button-prev',
					nextButton:'.swiper-button-next',
					observer:true,
					observeParents:true,
					initialSlide: 1,
					mousewheel: true,
					loop:true
				}
		}
	},
	mounted() {
		for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
			if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
				this.modelInfo = this.$store.state.stepPages.banner[i]
				this.$store.state.stepPages.banner[i].broadcastImg[0].spanOnoff = true
			}
		}
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
				let htmlT = this.$refs.broadcast2.getBoundingClientRect().top
	  		if(htmlT <= 450) {
	  			this.isanimated1 = true
	  			this.isfade1 = true
	  		}
			}
		},
		addList() {
			let obj = {
				spanOnoff: true,
				title: '新标题文本',
				content: '内容文本，简述你的公司项目或产品，展示你的公司文化等等。内容文本，简述你的公司项目或产品，展示你的公司文化等等。',
      			picslurl: '/static/images/banner/hides/bro01.png',
				picurl: '/static/images/banner/broadcast/broadcast01.png'
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
						url: '',
						data: {
							wid: this.siteId,
							type: 5,
							text: obj,
							lmid: this.pid 
						}
					}).then((res)=> {
						if(res.data.code == '200') {
							obj = {
								bid: res.data.data,
								spanOnoff: true,
								title: '新标题文本',
								content: '内容文本，简述你的公司项目或产品，展示你的公司文化等等。',
		      					picslurl: '/static/images/banner/hides/bro01.png',
								picurl: '/static/images/banner/broadcast/broadcast01.png'
							}
							this.$store.state.stepPages.banner[i].broadcastImg.push(obj)
						}else {
							alert(res.data.msg)
						}
					})
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
		upImgHandel(index, val, bid) {
			this.bid = bid
			this.indexes = index
			this.postImg = val
			this.imgReplaceToggle = true
		},
		getImg(val) {
			this.imgList = []
			let obj = {
				url: val
			}
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
		getIndex(index, index2) {
			this.indexes = index
			this.indexes2 = index2
		},
		fnEdit(val) {
			if(this.indexes2 == 't') {
				for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
					if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
						this.$store.state.stepPages.banner[i].broadcastImg[this.indexes].title = val
					}
				}
			}else {
				for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
					if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
						this.$store.state.stepPages.banner[i].broadcastImg[this.indexes].content = val
					}
				}
			}
			console.log(this.$store.state.stepPages.banner)
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
	>>> .swiper-pagination-bullet-active
		background: $bgColor	
	.addList
		position: absolute
		right: 10px
		top: 10px
		z-index: 10
		button
			width: $asswidth
			background: $assbg
			border: $assborder
			border-radius: $assradius
			padding: 5px 30px
			color: #fff
		.dropdown-menu
			width: $asswidth
			min-width: inherit
			border: $assborder
			border-radius: $assradius
			background: $assbg
			margin-top: -2px
			padding: 7px
			display: block
			li
				margin-bottom: 5px
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
					// border-radius: 5px
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
		height:100%
	.swiper >>> .swiper-pagination-bullet-active
		background: $bgColor
	.swiper-slide
		padding: 190px 0
		position: relative
		min-height: 550px
		&:before
			content: ''
			display: block
			position: absolute
			top: 0
			left: 0
			width: 100%
			height: 100%
			background: $allmasking
			z-index: 1
		.text
			position: relative
			text-align: center
			z-index: 100
			.inner
				width: 80%
				margin: 0 auto
			.width96
				width: 96%
				max-width: 1170px
			h3
				font-size: $fontsize6
				color: #fff
				opacity: 0
				>>> .ql-editor
					padding: 0
					text-align: center
					font-size: $fontsize6
					color: #fff
				>>> .ql-tooltip
					left: 0 !important
					.ql-tooltip-arrow
						display: none
			p
				font-size: $fontsize7
				color: #fff
				opacity: 0
				>>> .ql-editor
					padding: 3px
					font-size: $fontsize7
					text-align: center
					color: #fff
				>>> .ql-tooltip
					left: 0 !important
					.ql-tooltip-arrow
						display: none
			.animated
				opacity: 1
		.img
			position: absolute
			left: 0
			top: 0
			right: 0
			bottom: 0
			z-index: 0
			img
				filter: blur(2px)
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
			z-index: 10
			&:hover
				background: $assbghover
	.swiper-button-next
		opacity: 0
		width: 2.5em
		height: 4.5em
	.swiper-button-prev
		opacity: 0
		width: 2.5em
		height: 4.5em
	.animated
		opacity: 1 !important
.phoneClass
	.swiper-slide
		max-height: 300px
		min-height: auto
		padding: 90px 0
		.text
			width: 80%
			margin: 0 auto
			h3
				font-size: 30px
			p
				font-size: 16px
	.swiper-button-next
		display: block
	.swiper-button-prev
		display: block
</style>