<template>
	<div 
		class="banner" 
		:style="{backgroundImage: 'url(' + modelInfo.bgImg + ')', padding: modelInfo.updownspace }" 
		:class="modelInfo.bgClass"
	>
		<div :class="{ masking: modelInfo.maskingToggle }"></div>
		<div class="bannerNei">
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
		</div>
		<div class="bottom_jiao">
			<div class="jiao1"></div>
			<div class="jiao2"></div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import FnAssembly from '@/common/Assembly'
import FnEditor from '@/common/Editor'
import BtnEditor from '@/common/BtnEditor'
export default {
	props: ['pid'],
	data() {
		return {
			imgList: [],
			widthNum: '1920',
			heightNum: '1080',
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
		BtnEditor
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			zImg: state => state.stepPages.bannerList,
			browserToggle: state => state.browserToggle
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
    })
  	if(!this.browserToggle) {
  		this.modelInfo.bgClass = 'phoneClass'
  		this.modelInfo.updownspace = '100px 0'
  	}
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
		getContent(val) {
			if(val == 'false') {
				this.btnEditorToggle = false
			}else if(val == 'delete') {
				this.btnEditorToggle = false
				this.btnEditorToggle2 = false
  			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
  				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
  					this.$store.state.stepPages.banner[i].btnToggle = false
  				}
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
			}else {
				this.btnEditorToggle = false

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
			}
		},
		toEditor() {
			this.btnEditorToggle = true
		},
		addbtnClick() {
			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
					this.$store.state.stepPages.banner[i].btnToggle = true
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
				}
			}
			this.btnEditorToggle2 = true
		},
		fnEdit(val) {
			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
					this.$store.state.stepPages.banner[i].title = val
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
				}
			}
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
										bgImg: data[1]
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
		filter: blur(2px)	
		background-size: cover
	.bannerNei
		position: absolute
		left: 0
		right: 0
		top: 0
		bottom: 0
		padding-top: 100px
		transition: all 0.3s

		.title
			margin: 0 20px
			margin-bottom: 30px
			color: #fff
			font-size: 38px
			font-size: 28px
			line-height: 40px
			text-align: center
			margin-top:100px
			>>> .ql-editor
				margin: 0 20px
				text-align: center
				font-size: 30px
				color: #fff
		.addBtn
			text-align: center
			opacity: 0
			transition: all .3s
			span
				background: #000
				padding: 5px
				color: #fff
				cursor: pointer
		.btnList
			position: absolute
			left: 50%
			transform: translateX(-50%)
			text-align: center
			&:hover
				.mask
					opacity: 1
			a
				background: #F2F2F2
				padding: 10px 55px
				font-size: 24px
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
	.bottom_jiao
		position:absolute
		bottom:0
		height:25px
		width:100%
		left:0
		z-index:100
		.jiao1
			position:absolute
			width:50%
			height:0
			border-sizing:border-box
			border-width:25px 25px 25px
			border-style:none solid solid
			border-color:white white white
			border-image:initial
			border-top:none
			left:0
			border-right-color:transparent !important
		.jiao2
			position:absolute
			width:50%
			height:0
			border-sizing:border-box
			border-width:25px 25px 25px
			border-style:none solid solid
			border-color:white white white
			border-image:initial
			border-top:none
			right:0
			border-left-color:transparent !important
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
	background-position: inherit
	background-size: 100% 45%
</style>