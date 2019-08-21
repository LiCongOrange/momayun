<template>
	<div 
			class="team" 
			ref="team1" 
			:class="[modelInfo.bgClass, { masking: modelInfo.maskingToggle }]" 
			:style="{backgroundImage: 'url(' + modelInfo.bgImg + ')', padding: modelInfo.updownspace }"
		>
		<fn-assembly
			:btnChoice="btnChoice"
			:zBg="zBg"
			:zImg="this.zImg"
			:postbg="modelInfo.bgClass"
			:postImg="modelInfo.bgImg"
			:widthNum="widthNum1"
			:heightNum="heightNum1"
			:updownSpace="modelInfo.updownspace"
			:maskingToggle="modelInfo.maskingToggle"
			@getDataBg="getDataBg"
			@getUpdownspace="getUpdownspace"
			@getMasking="getMasking"
			v-if="allEditToggle"
		></fn-assembly>
		<div class="container" :class="{ width96: allEditToggle }">
			<div class="title" v-if="allEditToggle">
				<h3 @click="getIndex('t1')" :style="{ opacity: opacityNum }">
					<fn-editor :content="modelInfo.modularName" :type1="1" :type2="1" :lmid="pid" :sonid="modelInfo.pagid"></fn-editor>
				</h3>
				<h6 @click="getIndex('t2')" :style="{ opacity: opacityNum }">
					<fn-editor :content="modelInfo.modularNameLetter" :type1="1" :type2="2" :lmid="pid" :sonid="modelInfo.pagid"></fn-editor>
				</h6>
				<p @click="getIndex('c')" :style="{ opacity: opacityNum }">
					<fn-editor :content="modelInfo.content" :type1="1" :type2="3" :lmid="pid" :sonid="modelInfo.pagid"></fn-editor>
				</p>
			</div>
			<div class="title" v-else>
				<h3 v-html="modelInfo.modularName" :class="{animated: isanimated1, fadeInLeft: isfade1}"></h3>
				<h6 v-html="modelInfo.modularNameLetter" :class="{animated: isanimated1, fadeInRight: isfade1}"></h6>
				<p v-html="modelInfo.content" :class="{animated: isanimated1, bounceInUp: isfade1}"></p>
			</div>
			<div class="shouImg">
				<img :src="modelInfo.picurl" :style="{ opacity: opacityNum }" :class="{animated: isanimated2, flipInX: isfade2}">
				<up-img
					v-if="allEditToggle"
					:postImg="modelInfo.picurl"
					:widthNum="widthNum"
					:heightNum="heightNum"
					@getImg="getImg"
				></up-img>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import upImg from '@/common/UpImg'
import FnAssembly from '@/common/Assembly'
import FnEditor from '@/common/Editor'
export default {
	props: ['pid'],
	data() {
		return {
      isanimated1: false,
      isfade1: false,
      isanimated2: false,
      isfade2: false,
			widthNum1: '1920',
			heightNum1: '800',
			opacityNum: 0,
			postImg: '',
			imgList: [],
			classLayout: 'layout3',
			widthNum: '1200',
			heightNum: '460',
			indexes: '',
			textImg: '',
			modelInfo: '',
			btnChoice: 4,
			zBg: ["bgOne", "bgTwo", "bgThree"],
			classBg: ''
		}
	},
	components: {
		FnAssembly,
		FnEditor,
		upImg
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
		for(let i=0; i<this.$store.state.stepPages.single.length; i++) {
			if(this.$store.state.stepPages.single[i].lmid == this.pid) {
				this.modelInfo = this.$store.state.stepPages.single[i]
			}
		}
    this.$nextTick(function(){
      this.handleScroll()
    })
    window.addEventListener('scroll', this.handleScroll)
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
					type: 1,
					module: this.modelInfo
				}
			}).then((res)=> {
				if(res.data.code == '404') {
					alert(res.data.msg)
				}
			})
		},
		delText(index) {
			this.modelInfo.textList.splice(index, 1)
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
      	let htmlT = this.$refs.team1.getBoundingClientRect().top
	      if(htmlT <= 560) {
	        this.isanimated1 = true
	        this.isfade1 = true
	      }
	      if(htmlT <= 450) {
	        this.isanimated2 = true
	        this.isfade2 = true
	      }
      }
    },
		addlistHandel() {
			let obj = {
				text: '新添加文本介绍！'
			}
			this.modelInfo.textList.push(obj)
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
		getImg(val) {
			this.imgList = []
			let obj = {
				url: val
			}
			this.imgList.push(obj)
			for(let i=0; i<this.$store.state.stepPages.single.length; i++) {
				if(this.$store.state.stepPages.single[i].lmid == this.pid) {
					this.$store.state.stepPages.single[i].picurl = val
					this.$axios({
						method: 'post',
						url: '/api/upload/imgsUpload',
						data: this.imgList
					}).then((res)=> {
						if(res.data.code == '200') {
							this.$store.state.stepPages.single[i].picurl = res.data.data[0].url
							this.$axios({
								method: 'post',
								url: '/api/Senior/savemessage',
								data: {
									id: this.modelInfo.pagid,
                  type: 1,
                  text: {
                  	title: this.modelInfo.modularName,
                  	titleFn: this.modelInfo.modularNameLetter,
                  	picurl: res.data.data[0].url
                  }
								}
							}).then((res)=> {
								if(res.data.code == '404') {
									alert(res.data.msg)
								}
							})
						}
					})
				}
			}
		},
		getIndex(index) {
			this.indexes = index
		},
		fnEdit(val) {
					if(this.indexes == 't1') {
						this.modelInfo.modularName = val
						this.$axios({
							method: 'post',
							url: '/api/Senior/savemessage',
							data: {
								id: this.modelInfo.pagid,
                type: 1,
                text: {
                	title: val,
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
                	titleFn: val,
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
                	past: val,
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
				for(let i=0; i<this.$store.state.stepPages.single.length; i++) {
					if(this.$store.state.stepPages.single[i].lmid == this.pid) {
  					this.$store.state.stepPages.single[i].bgClass = ''
  					this.$store.state.stepPages.single[i].bgImg = data[1]
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
  								this.$store.state.stepPages.single[i].bgImg = res.data.data[0].url
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
				}
			}else {
				for(let i=0; i<this.$store.state.stepPages.single.length; i++) {
					if(this.$store.state.stepPages.single[i].lmid == this.pid) {
  					this.$store.state.stepPages.single[i].bgClass = data[1]
  					this.$store.state.stepPages.single[i].bgImg = ''
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
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.team
	// overflow: hidden
	position: relative
	transition: all 0.3s
	background-size: cover
	padding: 30px 0
	background-attachment: fixed
	&:hover
		.addList
			opacity: 1
	.addList
		text-align: center
		opacity: 0
		transition: all .3s
		span
			background: #000
			padding: 5px
			color: #fff
			cursor: pointer
	.title
		margin-bottom: $marginb
		h3
			font-size: $fontsize8
			color: $fontColor
			margin: 0 0 15px
			opacity: 0
			>>> .ql-editor
				padding: 0px
				font-size: $fontsize8
		h6
			margin: 0 0 15px
			font-size: $fontsize9
			color: $gridColor
			opacity: 0
			>>> .ql-editor
				padding: 0px
				font-size: $fontsize9
		p
			margin: 0 0 15px
			font-size: $fontsize10
			opacity: 0
			>>> .ql-editor
				padding: 0
				font-size: $fontsize10
		.animated
			opacity: 1
	.container
		// width: 60%
		margin: 0 auto
		padding: 20px 0
		.shouImg
			position: relative
			text-align: center
			img
				max-width: 100%
				opacity: 0
				max-height: 500px
				height: auto
			.animated
				opacity: 1 !important
			>>> .upImg
				.mask
					cursor: default
		.introduce
			width: 80%
			margin: 0 auto
			padding-top: 30px
			color: $fontColor
			text-align:center
			>>> .ql-editor
				padding: 0
				text-align:center
			li
				position: relative
				opacity: 0
				font-size: 18px
				>>> .ql-editor
					font-size: 18px
				&:hover
					i
						opacity: 1
				i
					position: absolute
					right: 3px 
					top: 0
					cursor: pointer
					opacity: 0
					transition: all .3s
			.animated
				opacity: 1
	.width96
		max-width: 1170px
		width: 96%
	.container2
		width: auto
		ul
			text-align: center
			li
				display: inline-block
				&:after
					display: block
					clear: both
					content: ''
				.imgWrap
					overflow: hidden
					img
						width: 100%
				.textWrap
					min-height: 110px
					overflow: hidden
			.layout1
				width: 50%
				padding: 20px
			.layout2
				width: 33.333%
				padding: 10px
			.layout3
				width: 25%
				padding: 10px
.masking
	&:before
		content: ''
		display: block
		position: absolute
		left: 0
		top: 0
		width: 100%
		height: 100%
		background: $allmasking			
.bgOne
	background-color: $modelBg02
.bgTwo
	background-color: $modelBg03
	.title
		h3
			color: #fff
			&::before
				background: #fff
			&::after
				background: #fff
		p
			color: #fff
	.container
		p
			color: #fff
		.introduce
			color: #fff
			>>>.ql-editor
				color: #fff
	.imgList
		li
			background: #fff
			border-radius: 5px
			margin: 0 2px
.bgThree
	background-color: $modelBg01
	h3
		color: #000

</style>