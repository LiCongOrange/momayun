<template>
	<div 
		class="team team-wrap" 
		ref="site11" 
		:class="[{phoneClass: phoneToggle} ,modelInfo.bgClass]" 
		:style="{backgroundImage: 'url(' + modelInfo.bgImg + ')', minHeight: heightnum}"
	>
		<fn-assembly
			:btnChoice="btnChoice"
			:zBg="zBg"
			:zImg="this.zImg"
			:zLetter="this.zLetter"
			:zLayout="this.zLayout"
			:postbg="modelInfo.bgClass"
			:postImg="modelInfo.bgImg"
			:updownSpace="modelInfo.updownspace"
			:maskingToggle="modelInfo.maskingToggle"
			@getDataBg="getDataBg"
			@getDataLayout="getDataLayout"
			@getUpdownspace="getUpdownspace"
			@getMasking="getMasking"
			v-if="allEditToggle"
		></fn-assembly>
		<div 
			class="container223" 
			:class="modelInfo.layoutClass"
		>
			<div :class="{ masking:modelInfo.maskingToggle }"></div>
			<div 
				class="inner container" 
				:class="{ width96: allEditToggle }"
				v-if="allEditToggle" 
				:style="{padding: modelInfo.updownspace}"
			>
				<div class="nei">
					<div class="left">
						<h5 @click="getIndex('t2')" :style="{ opacity: opacityNum }">
							<fn-editor :content="modelInfo.modularNameLetter" :type1="1" :type2="2" :lmid="pid" :sonid="modelInfo.pagid"></fn-editor>
						</h5>
						<h2 @click="getIndex('t')" :style="{ opacity: opacityNum }">
							<fn-editor :content="modelInfo.modularName" :type1="1" :type2="1" :lmid="pid" :sonid="modelInfo.pagid"></fn-editor>
						</h2>
					</div>
					<div class="right">
						<p @click="getIndex('c')" :style="{ opacity: opacityNum }">
							<fn-editor :content="modelInfo.content" :type1="1" :type2="3" :lmid="pid" :sonid="modelInfo.pagid"></fn-editor>
						</p>
					</div>
				</div>
			</div>
			<div 
				class="inner container" 
				:style="{padding: modelInfo.updownspace}"
				v-else
			>
				<div class="nei">
					<div class="left">
						<h5 v-if="modelInfo.modularNameLetter" v-html="modelInfo.modularNameLetter" :class="{animated: isanimated1, fadeInUp: isfade1}"></h5>
						<h2 v-if="modelInfo.modularName" v-html="modelInfo.modularName" :class="{animated: isanimated1, fadeInUp: isfade1}"></h2>
					</div>
					<div class="right">
						<p v-if="modelInfo.content" v-html="modelInfo.content" :class="{animated: isanimated1, fadeInUp: isfade1}"></p><br />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import BtnEditor from '@/common/BtnEditor'
import FnAssembly from '@/common/Assembly'
import FnEditor from '@/common/Editor'
export default {
	props: ['pid'],
	components: {
		BtnEditor,
		FnAssembly,
		FnEditor
	},
	data() {
		return {
			phoneToggle: false,
			heightnum: '',
				isanimated1: false,
				isfade1: false,
			opacityNum: 0,
			indexes: '',
			imgList: [],
			classBg: '',
			btnChoice: 5,
			zBg: ["bgOne", "bgTwo", "bgThree"],
			btnEditorToggle: false,
			modelInfo: '',
			zLetter: 'A',
			zLayout: [{
				letter: 'A',
				name: ''
			}, {
				letter: 'B',
				name: 'layout1'
			}]
		}
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			zImg: state => state.stepPages.bannerList,
			stepPages: state => state.stepPages,
			browserToggle: state => state.browserToggle
		})
	},
	mounted() {
		if(!this.pid) {
			for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
				if(this.$store.state.blocks.modeltextList[i].lmid == 'add10') {
					this.modelInfo = this.$store.state.blocks.modeltextList[i]
				}
			}
		}else {
			for(let i=0; i<this.stepPages.single.length; i++) {
				if(this.stepPages.single[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.single[i]
				}
			}
		}
  	window.addEventListener('scroll', this.handleScroll)
  	this.$nextTick(function() {
  		this.handleScroll()
			if(!this.browserToggle) {
				this.phoneToggle = true
			}
  	})
	},
	watch: {
		pid(val) {
			if(!this.pid) {
				for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
					if(this.$store.state.blocks.modeltextList[i].lmid == 'add10') {
						this.modelInfo = this.$store.state.blocks.modeltextList[i]
					}
				}
			}else {
				for(let i=0; i<this.stepPages.single.length; i++) {
					if(this.stepPages.single[i].lmid == this.pid) {
						this.modelInfo = this.stepPages.single[i]
					}
				}
			}
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
					type: 1,
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
				this.modelInfo.updownspace = '100px 0'
				// this.heightnum = '500px'
			}else if(data == '小') {
				this.modelInfo.updownspace = '100px 0'
				// this.heightnum = '540px'
			}else if(data == '中') {
				this.modelInfo.updownspace = '180px 0'
				// this.heightnum = '685px'
			}else if(data == '大') {
				this.modelInfo.updownspace = '250px 0'
				// this.heightnum = '810px'
			}
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemodule',
				data: {
					site_id: this.$store.state.threeStep.siteId,
					lmid: this.pid,
					type: 1,
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
				let htmlT = this.$refs.site11.getBoundingClientRect().top
	  		if(htmlT <= 500) {
					this.isanimated1 = true
					this.isfade1 = true
	  		}
			}
		},
		toEdit(type) {
			if(type == '0') {
				this.btnEditorToggle = true
			}else {
				this.modelInfo.btnToggle = true
  			this.$axios({
  				method: 'post',
  				url: '/api/Senior/savemodule',
  				data: {
            site_id: this.$store.state.threeStep.siteId,
            lmid: this.pid,
            type: 1,
            module: this.modelInfo
  				}
  			}).then((res)=> {
  				if(res.data.code == '404') {
  					alert(res.data.msg)
  				}
  			})
			}	
		},
		getContent(val) {
  		if(val == 'delete') {
  			this.btnEditorToggle = false
  			this.modelInfo.btnToggle = false
  			this.$axios({
  				method: 'post',
  				url: '/api/Senior/savemodule',
  				data: {
            site_id: this.$store.state.threeStep.siteId,
            lmid: this.pid,
            type: 1,
            module: this.modelInfo
  				}
  			}).then((res)=> {
  				if(res.data.code == '404') {
  					alert(res.data.msg)
  				}
  			})
  		}else if(val == 'false') {
  			this.btnEditorToggle = false
  		}else {
  			this.btnEditorToggle = false
  			this.modelInfo.btnInfo.text = val.text
  			this.modelInfo.btnInfo.link = val.link
  			if(val.onOff) {
  				this.modelInfo.btnInfo.target = '_blank'
  			}else {
  				this.modelInfo.btnInfo.target = '_self'
  			}
  			this.$axios({
  				method: 'post',
  				url: '/api/Senior/savemodule',
  				data: {
            site_id: this.$store.state.threeStep.siteId,
            lmid: this.pid,
            type: 1,
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
		fnEdit(val) {
			if(this.indexes == 't') {
				this.modelInfo.modularName = val
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemessage',
					data: {
						id: this.modelInfo.pagid,
            type: 1,
            text: {
            	title: this.modelInfo.modularName
            }
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}else if(this.indexes == 't2') {
				this.modelInfo.modularNameLetter = val
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemessage',
					data: {
						id: this.modelInfo.pagid,
            type: 1,
            text: {
            	titleFn: this.modelInfo.modularNameLetter
            }
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}else if(this.indexes == 'c') {
				this.modelInfo.content = val
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemessage',
					data: {
						id: this.modelInfo.pagid,
            type: 1,
            text: {
            	content: this.modelInfo.content
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
			// this.classBg = data
			if(data[0] == '0') {
				this.modelInfo.bgImg = ''
				this.modelInfo.bgClass = data[1]
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.$store.state.threeStep.siteId,
						lmid: this.pid,
						type: 1,
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
					url: data[1]
				}
				this.imgList.push(obj)
				this.modelInfo.bgClass = ''
				this.modelInfo.bgImg = data[1]
				if(data[1].indexOf('data:image')>-1) {
					this.$axios({
						method: 'post',
						url: '/api/upload/imgsUpload',
						data: this.imgList
					}).then((res)=> {
						if(res.data.code == '200') {
							this.modelInfo.bgImg = res.data.data[0].url
							this.$axios({
								method: 'post',
								url: '/api/Senior/savemodule',
								data: {
	  							site_id: this.$store.state.threeStep.siteId,
	  							lmid: this.pid,
	  							type: 1,
	  							module: this.modelInfo
								}
							})
						}else {
							alert(res.data.msg)
						}
					})
				}else {
					this.$axios({
						method: 'post',
						url: '/api/Senior/savemodule',
						data: {
							site_id: this.$store.state.threeStep.siteId,
							lmid: this.pid,
							type: 1,
							module: this.modelInfo
						}
					}).then((res)=> {
						if(res.data.code == '404') {
							alert(res.data.msg)
						}
					})
				}
			}
		},
		getDataLayout(data) {
			this.modelInfo.layoutClass = data[0]
			this.zLetter = data[1]
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemodule',
				data: {
					site_id: this.$store.state.threeStep.siteId,
					lmid: this.pid,
					type: 1,
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
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.team
	position: relative
	min-height: 280px
	background-size: cover
	&:hover
		.inner
			.addBtn
				opacity: 1
	.container223
		padding: 0
	.place
		flex-grow: 1
	.inner
		padding-top: 30px
		height: 100%
		position: relative
		z-index: 10
		.nei
			display: flex
		.left
			flex: 1
			padding-top: 20px
		.right
			flex: 1.6
		h2
			margin: 0
			font-size: 26px
			opacity: 0
			>>> .ql-editor
				padding: 1px 3px
				font-size: 26px
		h5
			margin: 15px 0
			font-size: 18px
			color: rgb(143, 143, 143)
			opacity: 0
			>>> .ql-editor
				padding: 1px 3px
				font-size: 18px
				color: rgb(143, 143, 143)
		p
			font-size: 16px
			line-height: 32px
			color: rgb(143, 143, 143)
			opacity: 0
			>>> .ql-editor
				padding: 1px 3px
				font-size: 16px
				line-height: inherit
		.animated
			opacity: 1
		.addBtn
			padding: 10px 0
			opacity: 0
			transition: all .3s
			span
				background: $addbtnbg
				padding: $addbtnpadding
				border-radius: $addbtnradius
				color:  $addbtncolor
				font-size: $addbtnfontsize
				cursor: pointer
		.btn-wrap
			position: relative
			padding: 5px
			display: inline-block
			>>> .btnEditor
				left: 0
				transform: translateX(0)
				.editorWrap
					// transform: translate(-23%, -10%)
				// .editor-btn
				// 	text-align: center
			&:hover
				.mask
					opacity: 1
			.mask
				position: absolute
				left: 0
				top: 0
				width: 100%
				height: 100%
				background: rgba(255, 255, 255, .3)
				transition: all .3s
				text-align: center
				opacity: 0
				display: flex
				justify-content: center
				align-items: center
				span
					background: $addbtnbg
					padding: $addbtnpadding
					border-radius: $addbtnradius
					font-size: $addbtnfontsize
					color: #fff
					cursor: pointer
			a
				padding: $allbtnpadding
				font-size: $allbtnfontsize
				opacity: 0
				transition: all .3s
				background: $allbtnbg
				border: $allbtnborder2
				border-radius: $allbtnradius
				color: $allbtnfontcolor2
				&:hover
					border: $allbtnborderhover2
					color: $allbtnfontcolorhover2
					background: $allbtnbghover2
			.animated
				opacity: 1
	.layout1
		.inner
			.nei
				flex-direction: row-reverse
	.masking
		background: rgba(255, 255, 255, 0.7)
		width: 100%
		height: 100%
		position: absolute
	.width96
		width: 96%
		max-width: 1170px
.bgOne
	background: $modelBg02
.bgTwo
	background: $modelBg03
.bgThree
	background: $modelBg01
.phoneClass
	min-height: calc(51vh - 0px)
	.container223
		display: block
		.inner
			padding-top: 10%
			width: 100%
			.nei
				width: 90%
				margin: 0 auto
				right: inherit
				position: initial
				padding: 0
				display: block
				h2
					margin-bottom: 20px
					font-size: 1.7em
				p
					line-height: 30px
		.place
			display: none
</style>