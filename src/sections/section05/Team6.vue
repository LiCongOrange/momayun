<template>
	<div 
		class="team" 
		ref="team2" 
		:class="[{ phoneClass: phoneToggle }, modelInfo.bgClass]" 
		:style="{backgroundImage: 'url(' + modelInfo.bgImg + ')', minHeight: heightnum}"
	>
		<div 
			class="container223" 
			:class="modelInfo.layoutClass"
		>
			<div 
				class="inner" 
				:style="{padding: modelInfo.updownspace}"
				:class="{ masking:modelInfo.maskingToggle }" 
			>
				<div class="nei">
					<h2 v-if="modelInfo.modularName" v-html="modelInfo.modularName"></h2>
					<h5 
						v-if="modelInfo.modularNameLetter" 
						v-html="modelInfo.modularNameLetter" 
					></h5>
					<p v-if="modelInfo.content" v-html="modelInfo.content"></p><br />
					<div class="btn-wrap">
						<a 
							class="btn btn-default" 
							:href="modelInfo.btnInfo.link" 
							:target="modelInfo.btnInfo.target"
						>{{ modelInfo.btnInfo.text }}</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	props: ['pid'],
	data() {
		return {
			phoneToggle: false,
			classBg: '',
			zBg: ["bgOne", "bgTwo", "bgThree"],
			modelInfo: '',
			zLayout: [{
				letter: 'A',
				name: ''
			}, {
				letter: 'B',
				name: 'layout1'
			}, {
				letter: 'C',
				name: 'layout2'
			}]
		}
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			zImg: state => state.stepPages.bannerList,
			stepPages: state => state.stepPages,
			browserToggle: state => state.browserToggle,
			stepPages: state => state.stepPages
		})
	},
	mounted() {
		for(let i=0; i<this.stepPages.single.length; i++) {
			if(this.stepPages.single[i].lmid == this.pid) {
				this.modelInfo = this.stepPages.single[i]
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
	watch: {
		pid(val) {
				for(let i=0; i<this.stepPages.single.length; i++) {
					if(this.stepPages.single[i].lmid == this.pid) {
						this.modelInfo = this.stepPages.single[i]
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
	.container223
		padding: 0
		// position: absolute
		// height: 100%
		// display: flex
	.place
		flex-grow: 1
	.inner
		// background: rgba(5, 23, 61, 0.8)
		padding-top: 30px
		margin-left: 0
		height: 100%
		// position: absolute
		width: 65%
		.nei
			margin: 0 auto
			width: 65%
			// position: absolute
			// right: 0
			padding-right: 40px
		h2
			font-size: $fontsize8
		h5
			margin: 15px 0
			font-size: $fontsize9
		p
			font-size: $fontsize10
			line-height: 32px
		.animated
			opacity: 1
		.addBtn
			span
				background: #fff
				padding: 5px
				color: #666
				cursor: pointer
		.btn-wrap
			position: absolute
			padding: 5px
			>>> .btnEditor
				left: 0
				transform: translateX(0)
				.editorWrap
					transform: translate(-23%, -10%)
				.editor-btn
					text-align: center
			&:hover
				.mask
					opacity: 1
			.mask
				position: absolute
				left: 0
				top: 0
				width: 100%
				height: 100%
				background: rgba(0, 0, 0, .3)
				line-height: 50px
				transition: all .3s
				text-align: center
				opacity: 0
				cursor: pointer
				span
					background: #000
					padding: 5px
					color: #fff
			a
				background: $allbtnbg
				border: $allbtnborder2
				border-radius: $allbtnradius
				padding: $allbtnpadding
				font-size: $allbtnfontsize
				color: $allbtnfontcolor2
				transition: all .3s
				// &:hover
				// 	background: $allbtnbghover2
				// 	border-color: $allbtnborderhover2
				// 	color: $allbtnfontcolorhover2
			.animated
				opacity: 1
	.layout1
		display: flex
		justify-content: flex-end
		// flex-direction: row-reverse
		.inner
			// left: auto
			// right: 0
			.nei
				// left: 0
				// right: inherit
				padding-left: 40px
	.layout2
		.inner
			width: 100%
			padding: 50px
			.nei
				width: 80%
				padding: 0
				position: inherit
				right: inherit
			p
				line-height: 28px
			.btn-wrap
				position: relative
				max-width: 240px
				margin: 0 auto
				text-align: center
	.masking
		background: rgba(241, 242, 243, 0.56)
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
				h2
					font-size: 34px
				p
					line-height: 30px
		.place
			display: none
</style>