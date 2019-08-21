<template>
	<div 
		class="albumPhoto" 
		ref="site03" 
		:class="[modelInfo.bgClass, { masking: modelInfo.maskingToggle }]" 
		:style="{backgroundImage: 'url(' + modelInfo.bgImg + ')', padding: modelInfo.updownspace }"
	>
		<input id="inputPppp" type="text" name="" v-model="addnum">
		<fn-assembly
			:zLetter="zLetter"
			:zLayout="zLayout"
			:bgColorNum="bgColorNum"
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
			@getDataLayout="getDataLayout"
			@getUpdownspace="getUpdownspace"
			@getMasking="getMasking"
			v-if="allEditToggle"
		></fn-assembly>
		<div class="container imgList" :class="{ width96: allEditToggle}">
			<div class="title" v-if="allEditToggle">
				<h3 :style="{ opacity: opacityNum }" >
					<fn-editor :content="modelInfo.title" :type1="6" :type2="1" :lmid="pid"></fn-editor>
				</h3>
			</div>
			<div class="title" v-else>
				<h3 v-if="modelInfo.title" v-html="modelInfo.title" :class="{animated: isanimated1, fadeInUp: isfade1}"></h3>
			</div>
			<div class="row" :class="{animated: isanimated2, fadeInUp: isfade2}" :style="{ opacity: opacityNum }">
				<!-- <draggable v-model="modelInfo.broadcastImg" :options="{animation: 300, handle: '.list-complete-item'}" v-if="allEditToggle">
					<transition-group name="list-complete" tag="ul" :class="{flexLayout: this.flexToggle, flexLayout2: this.flexToggle2}">
						<li 
							:class="modelInfo.layoutClass"
							class="list-complete-item" 
							v-for="(ite, index) in modelInfo.broadcastImg"
							@click="quTu(index, ite.picurl, ite.bid)"
							:key="index" 
						>
							<div class="btnWrap">
								<i class="iconfont" title="删除？" @click="deleteLi(index, ite.bid)">&#xe6e9;</i>
								<i class="iconfont" title="排序请拖动">&#xe653;</i>
							</div>
							<div class="img"><img :src="ite.picurl"></div>
							<up-img
								v-if="allEditToggle"
								:postImg="ite.picurl"
								@getImg="getImg"
							></up-img>
						</li>
					</transition-group>
				</draggable> -->

				<div v-if="allEditToggle">
					<ul :class="{flexLayout: this.flexToggle, flexLayout2: this.flexToggle2}">
						<li 
							:class="modelInfo.layoutClass"
							class="list-complete-item" 
							v-for="(ite, index) in modelInfo.broadcastImg"
							@click="quTu(index, ite.picurl, ite.bid)"
							:key="index" 
						>
							<div class="btnWrap">
								<i class="iconfont" title="删除？" @click="deleteLi(index, ite.bid)">&#xe6e9;</i>
								<i class="iconfont" title="排序请拖动">&#xe653;</i>
							</div>
							<div class="img"><img :src="ite.picurl"></div>
							<up-img
								v-if="allEditToggle"
								:postImg="ite.picurl"
								@getImg="getImg"
							></up-img>
						</li>
					</ul>
				</div>

				<div v-else>
					<ul :class="{flexLayout: this.flexToggle, flexLayout2: this.flexToggle2}" class="hover-active">
						<li
							:class="modelInfo.layoutClass"
							class="list-complete-item" 
							v-for="(item, index) in modelInfo.broadcastImg"
							:key="item.bid"
						>
							<div class="img"><img :src="item.picurl"></div>
						</li>
					</ul>
				</div>
			</div>
			<div class="addList" v-if="allEditToggle">
				<span @click="addList">添加图片</span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import upImg from '@/common/UpImg'
import FnAssembly from '@/common/Assembly'
import FnEditor from '@/common/Editor'
import draggable from 'vuedraggable'
export default {
	props: ['pid'],
	components: {
		FnAssembly,
		FnEditor,
		upImg,
		draggable
	},
	data() {
		return {
			flexToggle2: false,
			flexToggle: false,
			isanimated1: false,
			isfade1: false,
			isanimated2: false,
			isfade2: false,
			opacityNum: 0,
			opacityToggle: false,
			indexes: '',
			imgList: [],
			bid: '',
			addnum: 0,
			widthNum: '960',
			heightNum: '540',
			widthNum1: '1600',
			heightNum1: '900',
			postImg: '',
			modelInfo: '',
			classBg: '',
			btnChoice: 5,
			bgColorNum: '',
			zBg: ["bgOne", "bgTwo", "bgThree"],
			classLayout: '',
			zLetter: 'A',
			zLayout: [{
				"letter": "A",
				"name": "layout1"
			}, {
				"letter": "B",
				"name": "layout2"
			}, {
				"letter": "C",
				"name": "layout3"
			}, {
				"letter": "D",
				"name": "layout4"
			}, {
				"letter": "E",
				"name": "layout5"
			}]
		}
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			zImg: state => state.stepPages.bannerList,
			browserToggle: state => state.browserToggle,
			stepPages: state => state.stepPages
		})
	},
	watch: {
		classLayout(val) {
			if(val == 'layout1') {
				this.zLetter = 'A'
				this.flexToggle = false
				this.flexToggle2 = false
			}else if(val == 'layout2') {
				this.zLetter = 'B'
				this.flexToggle = false
				this.flexToggle2 = false
			}else if(val == 'layout3') {
				this.zLetter = 'C'
				this.flexToggle = false
				this.flexToggle2 = false
			}else if(val == 'layout4') {
				this.zLetter = 'D'
				this.flexToggle = true
				this.flexToggle2 = false
			}else if(val == 'layout5') {
				this.zLetter = 'E'
				this.flexToggle = false
				this.flexToggle2 = true
			}
		},
		pid(val) {
			if(!this.pid) {
				for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
					if(this.$store.state.blocks.modeltextList[i].lmid == 'add02') {
						this.modelInfo = this.$store.state.blocks.modeltextList[i]
						this.classLayout = this.$store.state.blocks.modeltextList[i].layoutClass
					}
				}
			}else {
				for(let i=0; i<this.stepPages.atlas.length; i++) {
					if(this.stepPages.atlas[i].lmid == this.pid) {
						this.modelInfo = this.stepPages.atlas[i]
						this.classLayout = this.stepPages.atlas[i].layoutClass
					}
				}
			}
		}
	},
	mounted() {
		if(!this.pid) {
			for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
				if(this.$store.state.blocks.modeltextList[i].lmid == 'add02') {
					this.modelInfo = this.$store.state.blocks.modeltextList[i]
					this.classLayout = this.$store.state.blocks.modeltextList[i].layoutClass
				}
			}
		}else {
			for(let i=0; i<this.stepPages.atlas.length; i++) {
				if(this.stepPages.atlas[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.atlas[i]
					this.classLayout = this.stepPages.atlas[i].layoutClass
				}
			}
		}
		if(!this.browserToggle) {
			this.modelInfo.layoutClass = 'layout6'
			this.flexToggle2 = false
			this.flexToggle = false
		}
		this.$nextTick(()=> {
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
					type: 6,
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
				this.modelInfo.updownspace = '40px 0'
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
					type: 6,
					module: this.modelInfo
				}
			}).then((res)=> {
				if(res.data.code == '404') {
					alert(res.data.msg)
				}
			})
		},
		getDataLayout(data) {
			this.modelInfo.layoutClass = data[0]
			this.classLayout = data[0]
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemodule',
				data: {
					site_id: this.$store.state.threeStep.siteId,
					lmid: this.pid,
					type: 6,
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
      	let htmlT = this.$refs.site03.getBoundingClientRect().top
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
		addList() {
			let obj = {
        picurl: '/static/images/product/shows/pro16.jpg'
			}
			this.$axios({
				method: 'post',
				url: '/api/Senior/newcmessage',
				data: {
					wid: this.$store.state.threeStep.siteId,
					type: 6,
					text: obj,
					lmid: this.pid
				}
			}).then((res)=> {
				if(res.data.code == '200') {
          let obj = {
            bid: res.data.data,
    				picurl: '/static/images/product/shows/pro16.jpg'
          }
          this.modelInfo.broadcastImg.push(obj)
				}else {
					alert(res.data.msg)
				}
			})
		},
		deleteLi(index, bid) {
			this.modelInfo.broadcastImg.splice(index, 1)
      this.$axios({
        method: 'post',
        url: '/api/Senior/delmessage',
        data: {
          id: bid,
          type: 6
        }
      }).then((res)=> {
        if(res.data.code == '404') {
          alert(res.data.msg)
        }
      })
		},
		quTu(index, img, id) {
			this.indexes = index
			this.postImg = img
			this.bid = id
		},
		getImg(val) {
			this.imgList = []
			let obj = {
				url: val
			}
			this.imgList.push(obj)
      this.$axios({
        method: 'post',
        url: '/api/upload/imgsUpload',
        data: this.imgList
      }).then((res)=> {
        if(res.data.code == '200') {
          this.modelInfo.broadcastImg[this.indexes].picurl = res.data.data[0].url
          this.$axios({
            method: 'post',
            url: '/api/Senior/savemessage',
            data: {
              id: this.bid,
              type: 6,
              text: this.modelInfo.broadcastImg[this.indexes]
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
			this.addnum++
		},
		fnEdit(val) {
			this.modelInfo.title = val
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemodule',
				data: {
						site_id: this.$store.state.threeStep.siteId,
						lmid: this.pid,
						type: 6,
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
								url: '/api/Senior/savemodule',
								data: {
									site_id: this.$store.state.threeStep.siteId,
									lmid: this.pid,
									type: 6,
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
							type: 6,
							module: this.modelInfo
						}
					}).then((res)=> {
						if(res.data.code == '404') {
							alert(res.data.msg)
						}
					})
				}
  		}else if(data[0] == '0') {
				this.modelInfo.bgImg = ''
				this.modelInfo.bgClass = data[1]
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.$store.state.threeStep.siteId,
						lmid: this.pid,
						type: 6,
						module: this.modelInfo
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
  		}else {
  			this.modelInfo.bgImg = ''
  			this.modelInfo.bgClass = ''
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.$store.state.threeStep.siteId,
						lmid: this.pid,
						type: 6,
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
#inputPppp
	width: 0px
	height: 0px
	margin-left: -100%
	overflow: hidden
	position: absolute
	// background-size: cover
	background-attachment: fixed
.albumPhoto
	overflow: hidden
	position: relative
	padding: 40px 0
	transition: all 0.3s
	background-size: cover
	&:hover
		.addList
			opacity: 1
	.width96
		width: 96%
		max-width: 1170px
	.addList
		opacity: 0
		text-align: center
		transition: all .3s
		padding: 5px 0
		position: relative
		z-index: 10000
		span
			background: $addbtnbg
			padding: $addbtnpadding
			border-radius: $addbtnradius
			font-size: $addbtnfontsize
			cursor: pointer
			color: #fff
	.title
		margin: 20px auto
		text-align: center
		h3
			max-width: 100%
			min-width: 90px
			margin: 0 auto
			font-size: $fontsize1
			text-align: center
			display: inline-block
			position: relative
			opacity: 0
			>>> .ql-editor
				text-align: center
				font-size: $fontsize1
			&::before
				display: inline-block
				height: 2px
				width: 80px
				background: #000
				content: ''
				position: absolute
				top: 50%
				right: 100%
				margin: 0 10px
			&::after
				height: 2px
				width: 80px
				background: #000
				content: ''
				position: absolute	
				top: 50%
				left: 100%	
		.animated
			opacity: 1
	.imgList
		.row
			opacity: 0
		.flexLayout
			width: 100%
			column-count: 3
			column-gap: 0
			overflow: hidden
		.flexLayout2
			width: 100%
			column-count: 5
			column-gap: 0
			overflow: hidden
		ul
			text-align: center
			li
				position: relative
				text-align: center
				transition: all 0.3s
				display: inline-flex
				&:hover
					.btnWrap
						opacity: 0.8
				.move
					position: absolute
					right: 0
					top: 0
					z-index: 100
				.img
					overflow: hidden
					img
						width: 100%
						height: auto
						// padding: 10px
						background: #fff
						transition: all .3s
						transform: scale(1.15)
				.btnWrap
					opacity: 0
					position: absolute
					top: 0
					right: 0
					z-index: 100
					transition: all .3s
					i
						background: $iconbg
						display: block
						border-radius: $iconradius
						margin-bottom: 3px
						width: $iconwidth
						height: $iconheight
						color: $iconcolor
						font-size: $iconfontsize
						line-height: 22px
						cursor: pointer
						&:nth-of-type(2)
							cursor: move
							display: $display
			.layout1
				width: 33.333%
				float: none
				padding: 5px
				.img
					border-radius: 5px
					img
						height: 250px
						max-height: 400px
						min-width: 250px
						min-height: 250px
			.layout2
				padding: 0
				width: 33.333%
				float: none
				margin-bottom: 0 !important
				img
					height: 250px
					min-height: 250px
					padding: 0
					border-radius: 0
			.layout3
				width: 20%
				padding: 0
				float: none
				margin-bottom: 0 !important
				img
					height: 200px
					min-width: 200px
					min-height: 200px
					background: none
					border-radius: 0
			.layout4
				width: 100%
				padding: 5px
				column-span: all
				margin-bottom: 0 !important
				img
					height: 250px
					min-height: 250px
					padding: 0
					border-radius: 0
			.layout5
				width: 100%
				padding: 0
				column-span: all
				margin-bottom: 0 !important
				img
					padding: 5px
					background: none
			.layout6
				width: 100%
				padding: 5px
				.img
					img
						width: 75%
						height: auto
			.animated
				opacity: 1
		.hover-active
			.layout1
				&:hover
					img
						transform: scale(1)
			.layout2
				&:hover
					img
						transform: scale(1.15) translateX(-20px)
			.layout3
				&:hover
					img
						transform: scale(1.15) translateX(-12px)
			.layout4
				&:hover
					img
						transform: scale(1.15) translateX(12px)
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
	background: $modelBg02
.bgTwo
	background: $modelBg03
	.title
		h3
			color: #fff
			.ql-editor
				color: #fff
			&::before
				background: #fff
			&::after
				background: #fff
	.imgList
		ul
			li
				border-radius: 5px
				margin: 0 auto
.bgThree
	background: $modelBg01
.albumPhoto
	.imgList
		ul
			.col-xs-12
				margin-bottom: 10px
.list-complete-item
	transition: all 1s
.list-complete-enter, .list-complete-active
	opacity: 0
	height: 0
	margin-top: 0
	padding: 0
	border: solid 0px
.list-complete-sortable-chosen, .list-complete-sortable-ghost
	opacity: 0
	height: 0
	margin-top: 0
	padding: 0
	border: solid 0
</style>