<template>
	<div 
		class="banner" 
		ref="banner1"
		:style="{backgroundImage: 'url(' + modelInfo.bgImg + ')', padding: modelInfo.updownspace }" 
		:class="modelInfo.bgClass"
	>
		<div :class="{ masking: modelInfo.maskingToggle }"></div>
		<fn-assembly
			:btnChoice="btnChoice"
			:zBg="zBg"
			:zImg="this.zImg"
			:postbg="modelInfo.bgClass"
			:postImg="modelInfo.bgImg"
			:updownSpace="modelInfo.updownspace"
			:maskingToggle="modelInfo.maskingToggle"
			:widthNum="widthNum"
			:heightNum="heightNum"
			@getDataBg="getDataBg"
			@getUpdownspace="getUpdownspace"
			@getMasking="getMasking"
			v-if="allEditToggle"
		></fn-assembly>
		<div class="wrapper container" :class="{ width96: allEditToggle }">
			<div class="add-img">
				<div class="img" v-if="modelInfo.picToggle">
					<img :src="modelInfo.picurl" :class="{animated: isanimated1, bounceInDown: isfade1}">
					<div class="mask" v-if="allEditToggle">
						<button @click="addimgHandle('02')">编辑</button>
						<button @click="addimgHandle('03')">删除</button>
					</div>
				</div>
				<div class="addimg-btn" v-else>
					<span @click="addimgHandle('01')" v-if="allEditToggle">添加图片</span>
				</div>
			</div>
			<div class="text" v-if="allEditToggle">
				<h3 @click="getIndex('t')" :style="{ opacity: opacityNum }">
					<fn-editor :content="modelInfo.title" :type1="5" :type2="1" :lmid="pid"></fn-editor>
				</h3>
				<h3 @click="getIndex('c')" :style="{ opacity: opacityNum }">
					<fn-editor :content="modelInfo.titleFn" :type1="5" :type2="2" :lmid="pid"></fn-editor>
				</h3>
			</div>
			<div class="text" v-else>
				<h3 v-html="modelInfo.title" :class="{animated: isanimated2, fadeInLeft: isfade2}"></h3>
				<h3 v-html="modelInfo.titleFn" :class="{animated: isanimated2, fadeInRight: isfade2}"></h3>
			</div>
		</div>
		<div class="btnWrap" v-if="modelInfo.btnToggle">
			<div class="inner">
				<a 
						:href="modelInfo.btnInfo.link" 
						:target="modelInfo.btnInfo.target" 
						:style="{ opacity: opacityNum }"
				>
					{{ modelInfo.btnInfo.text }}
				</a>
				<!-- <div class="mask"><span @click="toEdit">编辑</span></div> -->
			</div>
			<btn-editor
				v-if="allEditToggle"
				:content="modelInfo.btnInfo.text"
				@getContent="getContent"
			></btn-editor>
		</div>
		<div class="addBtn" v-else>
			<span v-if="allEditToggle" @click="addbtnClick">增加按钮</span>
		</div>
		<img-layer
			v-if="imgReplaceToggle" 
			:widthNum="widthNum1"
			:heightNum="heightNum1"
			:imgTu="modelInfo.picurl"
			@getImg="getImg"
			@onoff="onoff"
		></img-layer>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import FnAssembly from '@/common/Assembly'
import FnEditor from '@/common/Editor'
import BtnEditor from '@/common/BtnEditor'
import imgLayer from '@/common/Imglayer'
export default {
	props: ['pid'],
	data() {
		return {
			isanimated1: false,
			isfade1: false,
			isanimated2: false,
			isfade2: false,
			imgReplaceToggle: false,
			widthNum: '1920',
			heightNum: '1080',
			widthNum1: '1000',
			heightNum1: '200',
			opacityNum: 0,
			imgList: [],
			btnEditorToggle: false,
			btnEditorToggle2: false,
			modelInfo: '',
			indexes: '',
			btnChoice: 4,
			modularName: '首页',
			section: '',
			isPhoneClass: false,
			zBg: ["bgOne", "bgTwo", "bgThree"],
			quillActiveToggle: false
		}
	},
	components: {
		FnAssembly,
		FnEditor,
		BtnEditor,
		imgLayer
	},
  mounted() {
  	for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
  		if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
  			this.modelInfo = this.$store.state.stepPages.banner[i]
  		}
  	}
  	if(!this.browserToggle) {
  		this.modelInfo.bgClass = 'phoneClass'
  	}
  	window.addEventListener('scroll', this.handleScroll)
  	this.$nextTick(function() {
  		this.handleScroll()
  	})
  	if(!this.browserToggle) {
  		$('#header3').find('div#example-navbar-collapse').addClass('ullist-bg')
  		$('#header3').find('div.navbar-header').css('display', 'block')
  		this.modelInfo.updownspace = '100px 0'
  	}
  },
  computed: {
  	...mapState({
  		allEditToggle: state => state.allEditToggle,
  		zImg: state => state.stepPages.bannerList,
  		browserToggle: state => state.browserToggle,
  		siteId: state => state.threeStep.siteId
  	})
  },
  methods: {
  	getImg(val) {
			if(!val) {
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
  	addimgHandle(type) {
  		if(type == '01') {
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
  		}else if(type == '02') {
  				this.imgReplaceToggle = true
  		}else if(type == '03') {
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
  	onoff(val) {
  			this.imgReplaceToggle = false
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
					site_id: this.$store.state.threeStep.siteId,
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
				let htmlT = this.$refs.banner1.getBoundingClientRect().top
				if(htmlT <= 450) {
	  				this.isanimated1 = true
	  				this.isfade1 = true
				}
	  		if(htmlT <= 350) {
	  				this.isanimated2 = true
	  				this.isfade2 = true
	  		}
			}
		},
  	getContent(val) {
  		if(val == 'delete') {
  			// this.btnEditorToggle = false
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
  		}else if(val == 'false') {
  			// this.btnEditorToggle = false
  		}else {
  					this.modelInfo.btnInfo.text = val.text
  					this.modelInfo.btnInfo.link = val.link
  					if(val.onOff) {
  						this.modelInfo.btnInfo.target = '_blank'
  					}else {
  						this.modelInfo.btnInfo.target = '_self'
  					}
  			this.btnEditorToggle = false
  			this.$axios({
  				method: 'post',
  				url:'/api/Senior/savemodule',
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
  	getIndex(index) {
  		this.indexes = index
  	},
  	fnEdit(val) {
  				if(this.indexes == 't') {
  					this.modelInfo.title = val
  					this.$axios({
  						method: 'post',
  						url: '/api/Senior/savemessage',
  						data: {
  							id: this.modelInfo.bid,
  							type: 5,
  							text: {
  								title: val
  							}
  						}
  					}).then((res)=> {
  						if(res.data.code == '404') {
  							alert(res.data.msg)
  						}
  					})
  				}else if(this.indexes == 'c') {
  					this.modelInfo.titleFn = val
  					this.$axios({
  						method: 'post',
  						url: '/api/Senior/savemessage',
  						data: {
  							id: this.modelInfo.bid,
  							type: 5,
  							text: {
  								titleFn: val
  							}
  						}
  					}).then((res)=> {
  						if(res.data.code == '404') {
  							alert(res.data.msg)
  						}
  					})
  				}
  	},
  	getDataBg(data) {
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
  										type: 5,
  										text: {
  											bgImg: res.data.data[0].url
  										}
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
	  							type: 5,
	  							text: {
	  								bgImg: this.modelInfo.bgImg
	  							}
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
    onEditorFocus(editor) {
    	this.quillActiveToggle = true
      // console.log('editor focus!')
    },
    onEditorBlur(editor) {
    	this.quillActiveToggle = false
    },
    onEditorChange({ editor, html, text }) {
      // console.log(html)
      // this.$store.commit('editTitle', html)
      // console.log(this.$store.state.demo2[0].title)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.banner
	position: relative
	background-size: cover
	background-attachment:fixed
	display: flex
	align-items: center
	flex-direction: column
	justify-content: center
	&:hover
		.wrapper
			.add-img
				span
					opacity: 1
		.addBtn
			opacity: 1
	.masking
		content: ''
		display: block
		position: absolute
		left: 0
		top: 0
		right: 0
		bottom: 0
		background: rgba(0, 0, 0, 0.3)
	.ullist-bg
		background: rgba(0, 0, 0, 0.35) !important
		ul
			li
				a
					color: #fff !important
	.addBtn
		padding: 5px 0
		text-align: center
		opacity: 0
		transition: all .3s
		z-index: 10
		span
			background: $addbtnbg
			padding: $addbtnpadding
			font-size: $addbtnfontsize
			border-radius: $addbtnradius
			color: #fff
			cursor: pointer
			transition: all .3s
	.wrapper
		height: 100%
		transition: all 0.3s
		z-index: 100
		.add-img
			.img
				position: relative
				padding: 5px
				&:hover
					.mask
						opacity: 1
				img
					width: 100%
					height: auto
				.mask
					position: absolute
					left: 0
					top: 0
					width: 100%
					height: 100%
					background: rgba(0, 0, 0, 0.55)
					display: flex
					justify-content: center
					align-items: center
					opacity: 0
					transition: all .3s
					button
						background: #000
						color: #fff
						padding: 2px 5px
						border: none
						margin: 0 5px
		.addimg-btn
			padding: 5px
			text-align: center
			span
				background: $addbtnbg
				color: #fff
				padding: $addbtnpadding
				border-radius: $addbtnradius
				cursor: pointer
				opacity: 0
				font-size: $addbtnfontsize
		h3
			margin: 0
			color: $textColor
			text-align: center
			font-size: $fontsize6
			opacity: 0
			line-height: 1.42
			>>> .ql-editor
				padding: 0
				font-size: $fontsize6
			>>> p
				margin: 0
		.animated
			opacity: 1
		li
			margin: 0 20px
			color: $fontColor
			font-size: 30px
			text-align: center
			>>> .ql-editor
				padding: 0
				text-align: center
				font-size: 30px
	.btnWrap
		position: relative
		text-align: center
		min-width: 180px
		margin: 45px auto 0
		>>> .btnEditor
			.editorWrap
				transform: translate(-33%, -33%)
		.inner
			position: relative
			display: inline-block
			padding: 5px
			&:hover
				.mask
					opacity: 1
			a
				background: $allbtnbg
				display: inline-block
				border: $allbtnborder
				border-radius: $allbtnradius
				padding: $allbtnpadding
				font-size: $allbtnfontsize
				font-weight: $allbtnfontweight
				color: $allbtnfontcolor
				opacity: 0
				&:hover
					background: $allbtnbghover
					border-color: $allbtnborderhover
					color: $allbtnfontcolorhover
			.animated
				opacity: 1 !important
			.mask
				position: absolute
				background: rgba(0, 0, 0, .3)
				left: 0
				top: 0
				width: 100%
				height: 100%
				opacity: 0
				transition: all .3s
				span
					position: absolute
					left: 50%
					top: 50%
					transform: translate(-50%, -50%)
					background: #000
					padding: 5px
					color: #fff
					cursor: pointer
	.width96
		width: 96%
		max-width: 1170px
.phoneClass
	min-height: 300px
	background-position: -250px -50px
	// background-size: 250% 150%
	.wrapper
		// padding-top: 100px
		h3
			font-size: 22px
.bgOne
	background: $modelBg02
	background-size: cover
	.btnWrap
		.inner
			a
				border-color: $allbtnborder2
				color: $allbtnfontcolor2
				&:hover
					background: $allbtnbghover2
					border-color: $allbtnborderhover2
					color: $allbtnfontcolorhover2
				
	li
		color: $fontColor
		>>> .ql-editor
			color: $fontColor
.bgTwo
	background: $modelBg03
	background-size: cover
	.wrapper
		li
			color: #fff
			>>> .ql-editor
				color: #fff
.bgThree
	background: $modelBg01
	background-size: cover
	.btnWrap
		.inner
			a
				border: $allbtnborder2
				color: $allbtnfontcolor2
				&:hover
					background: $allbtnbghover2
					border-color: $allbtnborderhover2
					color: $allbtnfontcolorhover2
	li
		color: #000
		>>> .ql-editor
			color: #000
</style>	