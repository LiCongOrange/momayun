<template>
	<div 
		class="banner" 
		ref="banner2" 
		:style="{backgroundImage: 'url(' + modelInfo.bgImg + ')', padding: modelInfo.updownspace }" 
		:class="modelInfo.bgClass"
	>
		<fn-assembly
			:zBg="zBg"
			:zImg="this.zImg"
			:btnChoice="btnChoice"
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
		<div :class="{ masking: modelInfo.maskingToggle }"></div>
		<div class="bannerNei container" :class="{ width96: allEditToggle }">
			<div class="img-wrap">
				<div class="img" v-if="modelInfo.picToggle">
					<img :src="modelInfo.picurl" :class="{animated: isanimated1, bounceInDown: isfade1}">
					<div class="mask" v-if="allEditToggle">
						<button @click="addimgHandle('02')">编辑</button>
						<button @click="addimgHandle('03')">删除</button>
					</div>
				</div>
				<div class="addimg-btn" v-else>
					<span v-if="allEditToggle" @click="addimgHandle('01')">添加图片</span>
				</div>
			</div>
			<div class="title container" :class="{ width96: allEditToggle }" v-if="allEditToggle" :style="{ opacity: opacityNum }">
				<fn-editor :content="modelInfo.title" :type1="5" :type2="1" :lmid="pid"></fn-editor>
			</div>
			<div v-else class="title" v-html="modelInfo.title" :class="{animated: isanimated2, fadeInLeft: isfade2}"></div>
			<div class="btnList" v-if="modelInfo.btnToggle">
				<a 
					class="btn btn-default"
					:href="modelInfo.btnInfo.link" 
					:target="modelInfo.btnInfo.target"
					:style="{ opacity: opacityNum }"
					:class="{animated: isanimated2, fadeInRight: isfade2}"
				>
					{{ modelInfo.btnInfo.text }}
				</a>
				<!-- <div class="mask" v-if="allEditToggle"><span @click="toEditor">编辑</span></div> -->
				<btn-editor
					v-if="allEditToggle"
					:content="modelInfo.btnInfo.text"
					@getContent="getContent"
				></btn-editor>
			</div>

			<div class="addBtn" v-else>
				<span v-if="allEditToggle" @click="addbtnClick">添加按钮</span>
			</div>
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
			imgReplaceToggle: false,
			isanimated1: false,
			isfade1: false,
			isanimated2: false,
			isfade2: false,
			widthNum: '1920',
			heightNum: '1080',
			widthNum1: '1000',
			heightNum1: '200',
			opacityNum: 0,
			imgList: [],
			btnEditorToggle: false,
			btnEditorToggle2: true,
			btnChoice: 4,
			screenWidth: document.body.clientWidth,
			modelInfo: '',
			isActive: false,
			zBg: ["bgOne", "bgTwo", "bgThree"]
		}
	},
	components: {
		FnAssembly,
		FnEditor,
		BtnEditor,
		imgLayer
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			zImg: state => state.stepPages.bannerList,
			browserToggle: state => state.browserToggle,
			siteId: state => state.threeStep.siteId
		})
	},
  mounted() {
  	for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
  		if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
  			this.modelInfo = this.$store.state.stepPages.banner[i]
  		}
  	}
  	this.$nextTick(function(){
      window.addEventListener('scroll', this.onScroll);
      this.onScroll();
      this.handleScroll()
    })
  	window.addEventListener('scroll', this.handleScroll)
  	if(!this.browserToggle) {
  		this.modelInfo.bgClass = 'phoneClass'
  		this.modelInfo.updownspace = '100px 0'
  	}
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
				let htmlT = this.$refs.banner2.getBoundingClientRect().top
	  		if(htmlT <= 350) {
	  			this.isanimated2 = true
	  			this.isfade2 = true
	  			$('#banner2').find('div.title').addClass('animated bounceInDown')
	  			$('#banner2').find('div.btnList').find('a').addClass('animated bounceInUp')
	  		}
			}
		},
		getContent(val) {
			if(val == 'false') {
				this.btnEditorToggle = false
			}else if(val == 'delete') {
				this.btnEditorToggle = false
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
				this.btnEditorToggle = false

						this.modelInfo.btnInfo.link = val.link
						this.modelInfo.btnInfo.text = val.text
						if(val.onOff) {
							this.modelInfo.btnInfo.target = "_blank"
						}else {
							this.modelInfo.btnInfo.target = "_self"
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
		toEditor() {
			this.btnEditorToggle = true
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
			this.btnEditorToggle2 = true
		},
		fnEdit(val) {
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
		},
		getDataBg(data) {
			if(data[0] == '1') {
						this.modelInfo.bgClass = ''
						
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
							this.modelInfo.bgImg = data[1]
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
    },
    onScroll() {
			let scrollT = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset
			if(scrollT > 50) {
				this.isOpacity = true
			}else {
				this.isOpacity = false
			}
			$(".banner").css("background-position",'0 '+(-scrollT/5)+'px')
		}
  },
	updated() {
		window.screenWidth = document.body.clientWidth
		this.screenWidth = window.screenWidth
		if(this.screenWidth <= 768) {
			this.isActive = true
		}else {
			this.isActive = false
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.banner
	min-height: 300px
	width: 100%
	background-size: cover
	position: relative
	transition: all 0.3s
	background-attachment:fixed !important
	&:hover
		.bannerNei
			.img-wrap
				.addimg-btn
					span
						opacity: 1
			.addBtn
				opacity: 1
	.bgThree
		>>> .ql-editor
			color: #333 !important
	.masking
		position: absolute
		top: 0
		bottom: 0
		left: 0
		right: 0
		content: ''
		background: rgba(0, 0, 0, 0.4)
		content: ''
		display: block
	.bannerNei
		transition: all 0.3s
		display: flex
		justify-content: center
		align-items: center
		flex-direction: column
		z-index: 100
		position: relative
		.img-wrap
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
						border: none
						background: #000
						padding: 2px 5px
						color: #fff
						margin: 0 5px
			.addimg-btn
				span
					background: $addbtnbg
					padding: $addbtnpadding
					font-size: $addbtnfontsize
					border-radius: $addbtnradius
					color: #fff
					cursor: pointer
					opacity: 0
					transition: all .3s
		.title
			margin: 10px 0
			color: #fff
			line-height: 1.42
			opacity: 0
			font-size: $fontsize6
			>>> .ql-editor
				padding: 0
				color: #fff
				font-size: $fontsize6
		.width96
			width: 96%
			max-width: 1170px
		.addBtn
			text-align: center
			opacity: 0
			transition: all .3s
			span
				background: $addbtnbg
				padding: $addbtnpadding
				border-radius: $addbtnradius
				font-size: $addbtnfontsize
				color: #fff
				cursor: pointer
		.btnList
			position: relative
			padding: 5px
			text-align: center
			&:hover
				.mask
					opacity: 1
			>>> .btnEditor
				.editorWrap
					transform: translate(-30%, -10%)
			a
				border: $allbtnborder
				border-radius: $allbtnradius
				background: $allbtnbg
				padding: $allbtnpadding
				font-size: $allbtnfontsize
				color: $allbtnfontcolor
				opacity: 0
				font-weight: $allbtnfontweight
				transition: all .3s
				&:hover
					background: $allbtnbghover
					border-color: $allbtnborderhover
					color: $allbtnfontcolorhover
			.animated
				opacity: 1 !important
			.mask
				position: absolute
				left: 0
				top: 0
				width: 100%
				height: 100%
				background: rgba(0, 0, 0, 0.3)
				line-height: 60px
				opacity: 0
				transition: all .3s
				span
					background: #000
					padding: 5px
					color: #fff
					cursor: pointer
		.animated
			opacity: 1
	.width96
		width: 96%
		max-width: 1170px
.banner
.bgOne
	background: $modelBg02
	.title
		color: $fontColor
		>>> .ql-editor
			color: $fontColor
.bgTwo
	background: $modelBg03
.bgThree
	background: $modelBg01
	li
		color: #000
		>>> .ql-editor
			color: #000
.phoneClass
	min-height: 300px
	.bannerNei
		padding-top: 0
</style>