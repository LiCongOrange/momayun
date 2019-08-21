<template>
	<div 
		class="titleWrap" 
		ref="site01" 
		:class="modelInfo.bgClass" 
		:style="{backgroundImage: 'url(' + modelInfo.bgImg + ')', padding: modelInfo.updownspace }"
	>
		<div :class="{ masking: modelInfo.maskingToggle }"></div>
		<fn-assembly
			v-if="allEditToggle"
			:btnChoice="btnChoice"
			:zBg="zBg"
			:zImg="this.zImg"
			:postbg="modelInfo.bgClass"
			:postImg="modelInfo.bgImg"
			:updownSpace="modelInfo.updownspace"
			:maskingToggle="modelInfo.maskingToggle"
			:widthNum="widthNum1"
			:heightNum="heightNum1"
			@getDataBg="getDataBg"
			@getUpdownspace="getUpdownspace"
			@getMasking="getMasking"
		></fn-assembly>
		<div class="content container" :class="{ width96: allEditToggle }">
			<div class="addImg" v-if="allEditToggle">
				<div class="img" v-if="modelInfo.picToggle">
					<img :src="modelInfo.picurl" :style="{ opacity: opacityNum }">
					<div class="mask" v-if="allEditToggle">
						<button @click="piceditHandel('01')">编辑</button>
						<button @click="piceditHandel('02')">删除</button>
					</div>
				</div>
				<div v-else class="btn">
					<button v-if="allEditToggle" @click="upImgHandel">添加图片</button>
				</div>
			</div>
			<div class="addImg" v-else>
				<div class="img" v-if="modelInfo.picToggle">
					<img :src="modelInfo.picurl" :class="{animated: isanimated1, fadeInUp: isfade1}">
				</div>
			</div>
			<div class="text" v-if="allEditToggle">
				<h3 @click="getIndex('t1')" :style="{ opacity: opacityNum }">
					<fn-editor :content="modelInfo.title" :type1="5" :type2="1" :lmid="pid"></fn-editor>
				</h3>
				<h6 @click="getIndex('t2')" :style="{ opacity: opacityNum }">
					<fn-editor :content="modelInfo.titleFn" :type1="5" :type2="2" :lmid="pid"></fn-editor>
				</h6>
			</div>
			<div class="text" v-else>
				<h3 v-if="modelInfo.title" v-html="modelInfo.title" :class="{animated: isanimated2, fadeInLeft: isfade2}"></h3>
				<h6 v-if="modelInfo.titleFn" v-html="modelInfo.titleFn" :class="{animated: isanimated2, fadeInRight: isfade2}"></h6>
			</div>
			<!-- <div class="addBtn">
				<button>添加按钮</button>
			</div> -->
		</div>
		<img-layer
			v-if="imgReplaceToggle" 
			:widthNum="widthNum"
			:heightNum="heightNum"
			:imgTu="postImg"
			@getImg="getImg"
			@onoff="onoff"
		></img-layer>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import upImg from '@/common/UpImg'
import imgLayer from '@/common/Imglayer'
import fnAssembly from '@/common/Assembly'
import FnEditor from '@/common/Editor'
export default {
	props: ['pid'],
	components: {
		fnAssembly,
		upImg,
		imgLayer,
		FnEditor
	},
	data() {
		return {
			isanimated1: false,
			isfade1: false,
			isanimated2: false,
			isfade2: false,
			opacityNum: 0,
			opacityToggle: false,
			imgList: [],
			indexes: '',
			modelInfo: '',
			// widthNum: '1000',
			// heightNum: '200',
			widthNum1: '1600',
			heightNum1: '900',
			imgReplaceToggle: false,
			imgToggle: false,
			classBg: 'bgOne',
			btnChoice: 4,
			postImg: '',
			zBg: ["bgOne", "bgTwo", "bgThree"]
		}
	},
	mounted() {
		if(!this.pid) {
			for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
				if(this.$store.state.blocks.modeltextList[i].lmid == 'add00') {
					this.modelInfo = this.$store.state.blocks.modeltextList[i]
				}
			}
		}else {
			for(let i=0; i<this.stepPages.banner.length; i++) {
				if(this.stepPages.banner[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.banner[i]
					this.classBg = this.stepPages.banner[i].bgClass
				}
			}
		}
		if(this.allEditToggle) {
	     this.isanimated1 = true
	     this.isfade1 = true
		}
		if(this.modelInfo.bgImg) {
			this.imgToggle = true
		}else {
			this.imgToggle = false
		}
		if(!this.browserToggle) {
			this.modelInfo.updownspace = '100px 0'
		}
    this.$nextTick(function(){
      this.handleScroll()
    })
    window.addEventListener('scroll', this.handleScroll)
	},
	watch: {
		classBg(val) {
			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
					this.$store.state.stepPages.banner[i].bgClass = val
				}
			}
		},
		pid(val) {
			for(let i=0; i<this.stepPages.banner.length; i++) {
				if(this.stepPages.banner[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.banner[i]
					this.classBg = this.stepPages.banner[i].bgClass
				}
			}
		}
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			zImg: state => state.stepPages.bannerList,
			browserToggle: state => state.browserToggle,
			siteId: state => state.threeStep.siteId,
			stepPages: state => state.stepPages
		})
	},
	methods: {
		getMasking(data) {
			if(data) {
				this.modelInfo.maskingToggle = true
			}else {
				this.modelInfo.maskingToggle = false
			}
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemodule',
				data: {
					site_id: this.siteId,
					lmid: this.pid,
					type: 5,
					module: this.modelInfo
				}
			}).then((res)=> {
				if(res.data.code == '404') {
					alert(res.data.msg)
				}
			})
		},
		getUpdownspace(data) {
			if(data == '无') {
				this.modelInfo.updownspace = ''
			}else if(data == '小') {
				this.modelInfo.updownspace = '100px 0'
			}else if(data == '中') {
				this.modelInfo.updownspace = '180px 0'
			}else if(data == '大') {
				this.modelInfo.updownspace = '250px 0'
			}
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemodule',
				data: {
					site_id: this.siteId,
					lmid: this.pid,
					type: 5,
					module: this.modelInfo
				}
			}).then((res)=> {
				if(res.data.code == '404') {
					alert(res.data.msg)
				}
			})
		},
    handleScroll() {
      if(this.allEditToggle) {
      	this.opacityNum = 1
      }else {
      	let htmlT = this.$refs.site01.getBoundingClientRect().top
	      if(htmlT <= 500) {
	      	this.isanimated1 = true
	      	this.isfade1 = true
	      }
	      if(htmlT <= 450) {
	      	this.isanimated2 = true
	      	this.isfade2 = true
	      }
      }
    },
		piceditHandel(type) {
			if(type == '01') {
				this.postImg = this.modelInfo.picurl
				this.imgReplaceToggle = true
			}else if(type == '02') {
				this.modelInfo.picToggle = false
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.siteId,
						lmid: this.pid,
						type: 5,
						module: this.modelInfo
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}
		},
		getIndex(index) {
			this.indexes = index
		},
		getImg(val) {
			if(!val) {
				this.imgToggle = false
				this.modelInfo.picurl = ''
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.siteId,
							lmid: this.pid,
							type: 5,
							module: this.modelInfo
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}else {
				this.imgToggle = true
				this.imgList = []
				let obj = {
					url: val
				}
				this.imgList.push(obj)
				this.modelInfo.picurl = val
				this.$axios({
					method: 'post',
					url: '/api/upload/imgsUpload',
					data: this.imgList
				}).then((res)=> {
					if(res.data.code == '200') {
						this.modelInfo.picurl = res.data.data[0].url
							this.$axios({
							method: 'post',
							url: '/api/Senior/savemessage',
							data: {
								id: this.modelInfo.bid,
								text: {
									picurl: res.data.data[0].url
								},
								type: 5
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
		},
		onoff(val) {
				this.imgReplaceToggle = false
		},
		upImgHandel() {
				this.modelInfo.picToggle = true 
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.siteId,
						lmid: this.pid,
						type: 5,
						module: this.modelInfo
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
		},
		getDataBg(data) {
			// this.classBg = data
  		if(data[0] == '1') {
				this.modelInfo.bgClass = ''
				this.modelInfo.bgImg = data[1]
				if(data[1].indexOf('data:image')>-1) {
					this.imgList = []
					let obj = {
						url: data[1]
					}
					this.imgList.push(obj)
					this.$axios({
						method: 'post',
						url: '/api/upload/imgsUpload',
						data: this.imgList
					}).then((res)=> {
						if(res.data.code == '200') {
							this.modelInfo.bgImg = res.data.data[0].url
							this.$axios({
								method: 'post',
								url: '/api/Senior/savemessage',
								data: {
									id: this.modelInfo.bid,
									text: {
										bgImg: this.modelInfo.bgImg
									},
									type: 5
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
				}else {
					this.$axios({
						method: 'post',
						url: '/api/Senior/savemessage',
						data: {
							id: this.modelInfo.bid,
							text: {
								bgImg: this.modelInfo.bgImg
							},
							type: 5
						}
					}).then((res)=> {
						if(res.data.code == '404') {
							alert(res.data.msg)
						}
					})
				}
  		}else {
				this.modelInfo.bgImg = ''
				this.modelInfo.bgClass = data[1]
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.siteId,
						lmid: this.pid,
						type: 5,
						module: this.modelInfo
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
  		}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.titleWrap
	position: relative
	padding: 40px 0 75px
	transition: all .3s
	// background-size: cover
	background-attachment: fixed
	&:hover
		.content
			.addImg
				.btn
					opacity: 1
	>>> .layout-btn
		z-index: 100
	.masking
		position: absolute
		left: 0
		top: 0
		right: 0
		bottom: 0
		background: rgba(0, 0, 0, 0.39)
		z-index: 0
	.content
		position: relative
		z-index: 10
		.text
			h3
				margin: 0 0 15px
				font-size: $fontsize6
				opacity: 0
				// line-height: 50px
				line-height: 1.4
				>>> .ql-editor
					padding: 0 2px
					font-size: $fontsize6
			h6
				margin: 0
				font-size: $fontsize7
				opacity: 0
				line-height: 28px
				>>> .ql-editor
					padding: 2px 
					font-size: $fontsize7
			.animated
				opacity: 1
		.addImg
			width: 80%
			margin: 0 auto $picurlb
			text-align: center
			&:before
				content: ''
				display: block
			&:hover
				.mask
					opacity: 1
			.btn
				height: 30px
				opacity: 0
				transition: all .3s
				padding: 0
			.img
				position: relative
			button
				background: $addbtnbg
				border: none
				border-radius: $addbtnradius
				color: #fff
				padding: $addbtnpadding
				font-size: $addbtnfontsize
			img
				// height: 200px
				width: auto
				min-height: 80px
				max-width: 100%
				opacity: 0
			.mask
				position: absolute
				left: 0
				top: 0
				width: 100%
				height: 100%
				background: $maskbg
				border: $maskborder
				border-radius: $maskradius
				display: flex
				align-items: center
				justify-content: center
				opacity: 0
				transition: all .3s
				button
					margin: 0 5px
		.addBtn
			button
				background: $bgColor
				border: none
				border-radius: 5px
				color: #fff
				padding: 5px 15px
	.width96
		width: 96%
		max-width: 1170px
.bgOne
	background: $modelBg02
.bgTwo
	background: $modelBg03
	.content
		.text
			h3
				color: #fff
				.ql-editor
					color: #fff
			h6
				color: #fff
				.ql-editor
					color: #fff
	// .content
	// 	h3
	// 		color: #fff
	// 	h6
	// 		color: #fff
.bgThree
	background: $modelBg01
</style>