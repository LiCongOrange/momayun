<template>
	<div 
		class="down-btn" 
		ref="site02" 
		@mouseover="comeIn" 
		@mouseout="getOut" 
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
			:postImg="this.modelInfo.bgImg"
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
				<div class="btn" v-else>
					<button @click="upImgHandel">添加图片</button>
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
			<div class="btnWrap" v-if="modelInfo.btnToggle" @mouseover="btnEditorHandle(true)" @mouseout="btnEditorHandle(false)">
				<a 
					:style="{ opacity: opacityNum }" 
					:href="modelInfo.btnInfo.link || 'javascript:;'" 
					:target="modelInfo.btnInfo.target" 
					v-text="modelInfo.btnInfo.text"
					:class="{animated: isanimated2, fadeInUp: isfade2}"
				></a>
				<!-- <div v-if="allEditToggle">
					<div class="btn-overlay" v-if="btnEditorToggle">
						<span @click="toEditor">编辑</span>
					</div>
				</div> -->
				<btn-editor
					v-if="allEditToggle"
					:content="modelInfo.btnInfo"
					@getContent="getContent"
				></btn-editor>
			</div>
			<div v-else class="addBtn">
				<span v-if="allEditToggle" @click="addbtnClick">增加按钮</span>
			</div>
		</div>
		<img-layer
			v-if="imgReplaceToggle" 
			:imgTu="modelInfo.picurl"
			@getImg="getImg"
			@onoff="onoff"
		></img-layer>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import BtnEditor from '@/common/BtnEditor'
import upImg from '@/common/UpImg'
import FnEditor from '@/common/Editor'
import fnAssembly from '@/common/Assembly'
import imgLayer from '@/common/Imglayer'
export default {
	props: ['pid'],
	components: {
		fnAssembly,
		imgLayer,
		FnEditor,
		upImg,
		BtnEditor
	},
	data() {
		return {
			defaultClass: true,
			isanimated1: false,
			isfade1: false,
			isanimated2: false,
			isfade2: false,
			opacityNum: 0,
			opacityToggle: false,
			imgList: [],
			btnwrapToggle: true,
			btnEditorToggle: false,
			btnEditorToggle2: false,
			indexes: '',
			imgToggle: true,
			postImg: '',
			imgReplaceToggle: false,
			// widthNum: '1920',
			// heightNum: '800',
			widthNum1: '1600',
			heightNum1: '900',
			classBg: '',
			btnChoice: 4,
			zBg: ["bgOne", "bgTwo", "bgThree"],
			focusToggle: false,
			modelInfo: ''
		}
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			zImg: state => state.stepPages.bannerList,
			browserToggle: state => state.browserToggle,
			stepPages: state => state.stepPages,
			siteId: state => state.threeStep.siteId
		})
	},
	watch: {
		pid(val) {
			for(let i=0; i<this.stepPages.banner.length; i++) {
				if(this.stepPages.banner[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.banner[i]
					this.classBg = this.stepPages.banner[i].bgClass
				}
			}
		}
	},
	mounted() {
		if(!this.pid) {
			for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
				if(this.$store.state.blocks.modeltextList[i].lmid == 'add01') {
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
		if(this.modelInfo.picurl) {
			this.imgToggle = false
		}else {
			this.imgToggle = true
		}
    this.$nextTick(function(){
      this.handleScroll()
    })
		if(!this.browserToggle) {
			this.modelInfo.updownspace = '100px 0'
		}
    window.addEventListener('scroll', this.handleScroll)
	},
	methods: {
		editWH() {
			alert('1')
		},
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
				this.modelInfo.updownspace = '10px 0'
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
      	let htmlT = this.$refs.site02.getBoundingClientRect().top
	      if(htmlT <= 500) {
	      	this.isanimated2 = true
	      	this.isfade2 = true
	      }
	      if(htmlT <= 450) {
	      	this.isanimated1 = true
	      	this.isfade1 = true
	      }
      }
    },
		piceditHandel(type) {
			if(type == '01') {
				this.widthNum = 800
				this.heightNum = 200
				this.postImg = this.modelInfo.bgImg
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
		toEditor() {
			this.btnEditorToggle2 = true
		},
		getContent(val) {
			if(val == 'false') {
				this.btnEditorToggle2 = false
			}else if(val == 'delete') {
				// this.btnwrapToggle = false
				this.btnEditorToggle2 = false
				this.modelInfo.btnToggle = false
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
				this.btnEditorToggle2 = false
				for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
					if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
						this.$store.state.stepPages.banner[i].btnInfo.link = val.link
						this.$store.state.stepPages.banner[i].btnInfo.text = val.text
						if(val.onOff) {
							this.$store.state.stepPages.banner[i].btnInfo.target = "_blank"
						}else {
							this.$store.state.stepPages.banner[i].btnInfo.target = "_self"
						}
					}
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
			}
		},
		addbtnClick() {
			// this.btnwrapToggle = true
			this.modelInfo.btnToggle = true
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
		btnEditorHandle(val) {
			this.btnEditorToggle = val
		},
		getIndex(index) {
			this.indexes = index
		},
		onoff(val) {
			this.imgReplaceToggle = false
		},
		getImg(val) {
			if(!val) {
				this.imgToggle = true 
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
				this.imgToggle = false
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
						this.postImg = res.data.data[0].url
					}else {
						alert(res.data.msg)
					}
				})
			}
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
			this.classBg = data
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
		},
		comeIn() {
			this.focusToggle = true
		},
		getOut() {
			this.focusToggle = false
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.down-btn
	padding: 40px 0
	position: relative
	transition: all .3s
	// background-size: cover
	background-attachment: fixed
	min-height: 200px
	&:hover
		.content
			.btn
				opacity: 1
			.addBtn
				span
					opacity: 1
	>>> .layout-btn
		z-index: 100
	.masking
		position: absolute
		left: 0
		top: 0
		right: 0
		bottom: 0
		background: $allmasking
		z-index: 0
	.content
		position: relative
		z-index: 10
		.addImg
			margin-bottom: $picurlb
			text-align: center
		.img
			position: relative
			&:hover
				.mask
					opacity: 1
			img
				// max-height: 350px
				width: auto
				min-height: 80px
				max-width: 100%
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
				justify-content: center
				align-items: center
				opacity: 0
				transition: all .3s
				button
					margin: 0 5px
					background: $addbtnbg
					border: none
					border-radius: $addbtnradius
					padding: $addbtnpadding
					color: #fff
					font-size: $addbtnfontsize
		.btn
			height: 30px
			padding: 0
			opacity: 0
			transition: all .3s
			button
				background: $addbtnbg
				border: none
				border-radius: $addbtnradius
				color: #fff
				padding: $addbtnpadding
		.text
			margin-bottom: 15px
			h3
				margin: 0 0 15px
				font-size: $fontsize6
				opacity: 0
				// line-height: 50px
				line-height: 1.4
				>>> .ql-editor
					padding: 5px
					font-size: $fontsize6
			h6
				margin: 0
				line-height: 28px
				font-size: $fontsize7
				opacity: 0
				>>> .ql-editor
					padding: 5px
					text-align: center
					font-size: $fontsize7
			.animated
				opacity: 1
		.addBtn
			text-align: center
			span
				background: $addbtnbg
				padding: $addbtnpadding
				color: #fff
				cursor: pointer
				opacity: 0
				transition: all .3s
		.btnWrap
			width: max-content
			position: relative
			padding: 5px
			margin: 0 auto
			text-align: center
			>>> .btnEditor
				.editorWrap
					transform: translate(-30%, -10%)
			a
				border: $allbtnborder
				background: $allbtnbg
				border-radius: $allbtnradius
				padding: $allbtnpadding
				font-size: $allbtnfontsize
				font-weight: bold
				color: $allbtnfontcolor
				white-space: nowrap
				opacity: 0
				display: inline-block
				transition: all .3s
				text-decoration: none
				&:hover
					background: $allbtnbghover
					border-color: $allbtnborderhover
					color: $allbtnfontcolorhover
			.animated
				opacity: 1 !important
			.btn-overlay
				width: 100%
				height: 100%
				border: 1px solid #333
				background: rgba(0, 0, 0, 0.5)
				position: absolute
				top: 0
				left: 0
				line-height: 60px
				color: #fff
				font-size: 18px
				cursor: pointer
				span
					background: #000
					padding: 5px
	.width96
		width: 96%
		max-width: 1170px
.bgOne
	background: $modelBg02
	.content
		.btnWrap
			a
				border-color: #193c4c
				color: #193c4c
				&:hover
					background: #193c4c
					border-color: #193c4c
					color: #fff
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
.bgThree
	background: $modelBg01
	.content
		.btnWrap
			a
				border-color: #193c4c
				color: #193c4c
				&:hover
					background: #193c4c
					border-color: #193c4c
					color: #fff
</style>