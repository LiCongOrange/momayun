<template>
	<div class="grid column-wrap" ref="site10" :class="{ phoneClass: phoneToggle }">
		<fn-assembly
			v-if="allEditToggle"
			:btnChoice="btnChoice"
			:gridlayoutClass="modelInfo.layoutClass"
			:heightNumber11="modelInfo.heightNumber"
			:paddingNumber11="modelInfo.paddingNumber"
			:widthNumber11="modelInfo.widthNumber"
			@getDataLayout="getDataLayout"
			@getAuxiliary="getAuxiliary"
		></fn-assembly>
		<div class="titleWrap">
			<div class="title container" v-if="modelInfo.titleToggle" :class="{ width96: allEditToggle }">
				<div class="inner" v-if="allEditToggle">
					<span class="deleteTitle iconfont" @click="deleteTitle">&#xe6e9;</span>
					<h2 @click="getIndex('t')" :style="{ opacity: opacityNum }">
						<fn-editor :content="modelInfo.title" :type1="6" :type2="1" :lmid="pid"></fn-editor>
					</h2>
					<p @click="getIndex('c')" :style="{ opacity: opacityNum }">
						<fn-editor :content="modelInfo.titleFn" :type1="6" :type2="2" :lmid="pid"></fn-editor>
					</p>
				</div>
				<div class="inner container" v-else>
					<h2 v-html="modelInfo.title" :class="{animated: isanimated1, fadeInLeft: isfade1}"></h2>
					<p v-html="modelInfo.titleFn" :class="{animated: isanimated1, fadeInRight: isfade1}"></p>
				</div>
			</div>
			<div class="title" v-else>
				<span v-if="allEditToggle" @click="addTitle" class="addTitle">添加标题</span>
			</div>
		</div>

		<div class="gridList" :class="[modelInfo.widthNumber, {width96: allEditToggle}]">

			<ul v-if="ullistToggle" :class="{animated: isanimated2, fadeInUp: isfade2}" :style="{ opacity: opacityNum }">
				<li 
					v-for="(item, index) in modelInfo.broadcastImg" 
					class="col-xs-12 col-md-6" 
					:class="[{layout001: layout001Toggle, layout002: layout002Toggle, layout003: layout003Toggle, layout004: layout004Toggle} ,modelInfo.layoutClass]" 
					:style="{padding: modelInfo.paddingNumber, minHeight: modelInfo.heightNumber}"
				>
					<div class="img" :style="{backgroundImage: 'url(' + item.picurl + ')'}">
						<!-- <img :src="item.picurl"> -->
	    			<div class="btnWrap" v-if="allEditToggle">
	    				<button class="btn" @click="editpic(index, item.bid, item.picurl)">&gt&nbsp图片切换</button>
	    			</div>
						<div class="inner" v-if="allEditToggle">
							<h3 @click="getIndex(index, 't1', item.bid, 'layouttype00')">
								<fn-editor :content="item.title" :type1="6" :type2="3" :lmid="pid" :sonid="item.bid"></fn-editor>
							</h3>
							<p @click="getIndex(index, 'c1', item.bid, 'layouttype00')">
								<fn-editor :content="item.content" :type1="6" :type2="4" :lmid="pid" :sonid="item.bid"></fn-editor>
							</p>
						</div>
						<div class="inner" v-else>
							<h3 v-html="item.title"></h3>
							<p v-html="item.content"></p>
						</div>
					</div>
				</li>
			</ul>

			<ul v-else :class="{animated: isanimated2, fadeInUp: isfade2}">
				<li 
					class="col-xs-12 col-md-6" 
					:class="modelInfo.layoutClass"
				>
					<div class="img left">
						<div 
							class="imginner" 
							v-for="(item, index) in imgarr1" 
							:style="{padding: modelInfo.paddingNumber, minHeight: modelInfo.heightNumber}"
						>
							<div 
								class="leftinner" 
								:style="{backgroundImage: 'url(' + item.picurl + ')'}"
							>
			    			<div class="btnWrap" v-if="allEditToggle">
			    				<button class="btn" @click="editpic(index, item.bid, item.picurl, 'smallPic')">&gt&nbsp图片切换</button>
			    			</div>
								<div class="inner" v-if="allEditToggle">
									<h3 @click="getIndex(index, 't1', item.bid, 'layouttype01')">
										<fn-editor :content="item.title" :type1="6" :type2="3" :lmid="pid" :sonid="item.bid"></fn-editor>
									</h3>
									<p @click="getIndex(index, 'c1', item.bid, 'layouttype01')">
										<fn-editor :content="item.content" :type1="6" :type2="4" :lmid="pid" :sonid="item.bid"></fn-editor>
									</p>
								</div>
								<div class="inner" v-else>
									<h3 v-html="item.title"></h3>
									<p v-html="item.content"></p>
								</div>
							</div>
						</div>
					</div>
					<div class="img right">
						<div 
							class="imginner" 
							v-for="(item, index) in imgarr2" 
							:style="{padding: modelInfo.paddingNumber, minHeight: modelInfo.heightNumber}"
						>
							<div 
								class="rightinner" 
								:style="{backgroundImage: 'url(' + item.picurl + ')'}"
							>
			    			<div class="btnWrap" v-if="allEditToggle">
			    				<button class="btn" @click="editpic(index, item.bid, item.picurl, 'bigPic')">&gt&nbsp图片切换</button>
			    			</div>
								<div class="inner" v-if="allEditToggle">
									<h3 @click="getIndex(index, 't1', item.bid, 'layouttype02')">
										<fn-editor :content="item.title" :type1="6" :type2="3" :lmid="pid" :sonid="item.bid"></fn-editor>
									</h3>
									<p @click="getIndex(index, 'c1', item.bid, 'layouttype02')">
										<fn-editor :content="item.content" :type1="6" :type2="4" :lmid="pid" :sonid="item.bid"></fn-editor>
									</p>
								</div>
								<div class="inner" v-else>
									<h3 v-html="item.title"></h3>
									<p v-html="item.content"></p>
								</div>
							</div>
						</div>
					</div>
				</li>
			</ul>
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
import FnAssembly from '@/common/Assembly'
import FnEditor from '@/common/Editor'
import ImgLayer from '@/common/Imglayer'
export default {
	props: ['pid'],
	data() {
		return {
			layout001Toggle: false,
			layout002Toggle: false,
			layout003Toggle: false,
			layout004Toggle: false,
			phoneToggle: false,
			layouttype: '',
			isanimated1: false,
			isfade1: false,
			isanimated2: false,
			isfade2: false,
			opacityNum: 0,
			speIndex: '',
			imgList: [],
			imgReplaceToggle: false,
			widthNum: '',
			heightNum: '',
			postImg: '',
			modelInfo: '',
			indexes: '',
			indexes2: '',
			btnChoice: '3',
			ullistToggle: true,
			imgarr1: [],
			imgarr2: [],
			bid: ''
		}
	},
	components: {
		FnEditor,
		FnAssembly,
		ImgLayer
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			siteId: state => state.threeStep.siteId,
			browserToggle: state => state.browserToggle,
			stepPages: state => state.stepPages,
		})
	},
	mounted() {
		if(!this.pid) {
			for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
				if(this.$store.state.blocks.modeltextList[i].lmid == 'add09') {
					this.modelInfo = this.$store.state.blocks.modeltextList[i]
				}
			}
		}else {
			for(let i=0; i<this.stepPages.atlas.length; i++) {
				if(this.stepPages.atlas[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.atlas[i]
				}
			}
		}
		if(this.modelInfo.layoutClass == 'layout01') {
			this.modelInfo.broadcastImg = this.modelInfo.broadcastImg.slice(0, 4)
		}else if(this.modelInfo.layoutClass == 'layout02') {
			this.modelInfo.broadcastImg = this.modelInfo.broadcastImg.slice(0, 5)
		}else if(this.modelInfo.layoutClass == 'layout03') {
			this.ullistToggle = false
		}else if(this.modelInfo.layoutClass == 'layout04') {
			this.ullistToggle = false
		}
  	window.addEventListener('scroll', this.handleScroll)
  	this.$nextTick(function() {
  		this.handleScroll()
			if(!this.browserToggle) {
				this.phoneToggle = true
				if(this.modelInfo.layoutClass == 'layout01') {
					this.layout001Toggle = true
					this.layout002Toggle = false
					this.layout003Toggle = false
					this.layout004Toggle = false
				}else if(this.modelInfo.layoutClass == 'layout02') {
					this.layout001Toggle = false
					this.layout002Toggle = true
					this.layout003Toggle = false
					this.layout004Toggle = false
				}else if(this.modelInfo.layoutClass == 'layout03') {
					this.layout001Toggle = false
					this.layout002Toggle = false
					this.layout003Toggle = true
					this.layout004Toggle = false
				}else if(this.modelInfo.layoutClass == 'layout04') {
					this.layout001Toggle = false
					this.layout002Toggle = false
					this.layout003Toggle = false
					this.layout004Toggle = true
				}
			}
  	})
		for(let i=0; i<this.modelInfo.broadcastImg.length; i++) {
			if(i < 2 ) {
				this.imgarr1.push(this.modelInfo.broadcastImg[i])
			}
		}
		this.imgarr2.push(this.modelInfo.broadcastImg[2])
	},
	watch: {
		pid(val) {
			for(let i=0; i<this.stepPages.atlas.length; i++) {
				if(this.stepPages.atlas[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.atlas[i]
				}
			}
		}
	},
	methods: {
		handleScroll() {
			if(this.allEditToggle) {
				this.opacityNum = 1
			}else {
				let htmlT = this.$refs.site10.getBoundingClientRect().top
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
		onoff(val) {
			this.imgReplaceToggle = false
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
					if(this.speIndex == 'bigPic') {
						this.imgarr2[0].picurl = res.data.data[0].url
						this.modelInfo.broadcastImg[2].picurl = res.data.data[0].url
		        this.$axios({
		          method: 'post',
		          url: '/api/Senior/savemessage',
		          data: {
		            id: this.bid,
		            type: 6,
		            text: this.imgarr2[0]
		          }
		        }).then((res)=> {
		          if(res.data.code == '404') {
		            alert(res.data.msg)
		          }
		        })
					}else if(this.speIndex == 'smallPic') {
						this.imgarr1[this.indexes].picurl = res.data.data[0].url
						this.modelInfo.broadcastImg[this.indexes].picurl = res.data.data[0].url
		        this.$axios({
		          method: 'post',
		          url: '/api/Senior/savemessage',
		          data: {
		            id: this.bid,
		            type: 6,
		            text: this.imgarr1[this.indexes]
		          }
		        }).then((res)=> {
		          if(res.data.code == '404') {
		            alert(res.data.msg)
		          }
		        })
					}else {
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
					}
				}else {
					alert(res.data.msg)
				}
			})
		},
		editpic(index, id, url, specialPic) {
			this.indexes = index
			this.bid = id
			this.postImg = url
			this.imgReplaceToggle = true
			this.speIndex = specialPic
		},
		getAuxiliary(data) {
			if(data[0] == '01') {
				this.modelInfo.heightNumber = data[1]
			}else if(data[0] == '02') {
				this.modelInfo.paddingNumber = data[1]
			}else if(data[0] == '03') {
				this.modelInfo.widthNumber = data[1]
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
			if(data == '01') {
				this.ullistToggle = true
				this.modelInfo.layoutClass = 'layout01'
				this.modelInfo.broadcastImg = this.modelInfo.broadcastImg.slice(0, 4)
			}else if(data == '02') {
				this.ullistToggle = true
				this.modelInfo.layoutClass = 'layout02'
				let obj = {
	      	title: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(255, 255, 255)'>新添加</span></p>",
	      	content: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(255, 255, 255)'>添加描述</span></p>",
	        picurl: '/static/images/atlas/shows/show08.jpg'
				}
				if(this.modelInfo.broadcastImg.length < 5) {
					// this.modelInfo.broadcastImg.push(obj)
					this.$axios({
						method: 'post',
						url: '/api/Senior/newcmessage',
						data: {
							wid: this.siteId,
							type: 6,
							text: obj,
							lmid: this.pid
						}
					}).then((res)=> {
						if(res.data.code == '200') {
		          let obj = {
				      	bid: res.data.data,
				      	title: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(255, 255, 255)'>新添加</span></p>",
				      	content: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(255, 255, 255)'>添加描述</span></p>",
				        picurl: '/static/images/atlas/shows/show08.jpg'
		          }
		          this.modelInfo.broadcastImg.push(obj)
						}else {
							alert(res.data.msg)
						}
					})
				}
			}else if(data == '03') {
				this.ullistToggle = false
				this.modelInfo.layoutClass = 'layout03'
			}else if(data == '04') {
				this.ullistToggle = false
				this.modelInfo.layoutClass = 'layout04'
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
		deleteTitle() {
			this.modelInfo.titleToggle = false
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
		addTitle() {
			this.modelInfo.titleToggle = true
			$('.grid').find('div.title').find('h2').addClass('animated')
			$('.grid').find('div.title').find('p').addClass('animated')
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
		getIndex(index, index2, bid, layoutType) {
			this.indexes = index
			this.indexes2 = index2
			this.bid = bid
			this.layouttype = layoutType
		},
		fnEdit(val) {
			if(this.indexes == 't') {
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
			}else if(this.indexes == 'c') {
				this.modelInfo.titleFn = val
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
			}else if(this.indexes2 == 't1') {
				if(this.layouttype == 'layouttype00' || this.layouttype == 'layouttype01') {
        	this.modelInfo.broadcastImg[this.indexes].title = val
	        this.$axios({
	          method: 'post',
	          url: '/api/Senior/savemessage',
	          data: {
	            id: this.bid,
	            type: 6,
	            text: {
	              title: this.modelInfo.broadcastImg[this.indexes].title,
	              content: this.modelInfo.broadcastImg[this.indexes].content,
	              picurl: this.modelInfo.broadcastImg[this.indexes].picurl
	            }
	          }
	        }).then((res)=> {
	          if(res.data.code == '404') {
	            alert(res.data.msg)
	          }
	        })
				}else if(this.layouttype == 'layouttype02') {
        	this.modelInfo.broadcastImg[2].title = val
	        this.$axios({
	          method: 'post',
	          url: '/api/Senior/savemessage',
	          data: {
	            id: this.bid,
	            type: 6,
	            text: {
	              title: this.modelInfo.broadcastImg[2].title,
	              content: this.modelInfo.broadcastImg[2].content,
	              picurl: this.modelInfo.broadcastImg[2].picurl
	            }
	          }
	        }).then((res)=> {
	          if(res.data.code == '404') {
	            alert(res.data.msg)
	          }
	        })
				}
			}else if(this.indexes2 == 'c1') {
				if(this.layouttype == 'layouttype00' || this.layouttype == 'layouttype01') {
	        this.modelInfo.broadcastImg[this.indexes].content = val
	        this.$axios({
	          method: 'post',
	          url: '/api/Senior/savemessage',
	          data: {
	            id: this.bid,
	            type: 6,
	            text: {
	              title: this.modelInfo.broadcastImg[this.indexes].title,
	              content: this.modelInfo.broadcastImg[this.indexes].content,
	              picurl: this.modelInfo.broadcastImg[this.indexes].picurl
	            }
	          }
	        }).then((res)=> {
	          if(res.data.code == '404') {
	            alert(res.data.msg)
	          }
	        })
				}else if(this.layouttype == 'layouttype02') {
	        this.modelInfo.broadcastImg[2].content = val
	        this.$axios({
	          method: 'post',
	          url: '/api/Senior/savemessage',
	          data: {
	            id: this.bid,
	            type: 6,
	            text: {
	              title: this.modelInfo.broadcastImg[2].title,
	              content: this.modelInfo.broadcastImg[2].content,
	              picurl: this.modelInfo.broadcastImg[2].picurl
	            }
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
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.grid
	border-left: 5px solid #FFCC22
	border-right: 5px solid #FFCC22
	position: relative
	padding: 40px 0
	&:hover
		.titleWrap
			.title
				.addTitle
					opacity: 1
	.titleWrap
		margin-bottom: $marginb
		.title
			position: relative
			text-align: center
			transition: all .3s
			.inner
				padding-top: 20px
				margin: 0 auto
			.deleteTitle
				position: absolute
				right: 0
				top: 0
				width: $iconwidth
				height: $iconheight
				border-radius: $iconradius
				background: $iconbg
				font-size: $iconfontsize
				cursor: pointer
				color: $iconcolor
			h2
				margin-top: 0
				font-size: $fontsize1
				text-align: center
				opacity: 0
				>>> .ql-editor
					font-size: $fontsize1
					text-align: center
					padding: 1px 3px
			p
				font-size: $fontsize2
				text-align: center
				opacity: 0
				>>> .ql-editor
					text-align: center
					font-size: $fontsize2
					padding: 1px 3px
			.animated
				opacity: 1
			.addTitle
				margin-bottom: 20px
				line-height: 34px
				background: $addbtnbg
				padding: $addbtnpadding
				border-radius: $addbtnradius
				font-size: $addbtnfontsize
				color: #fff
				cursor: pointer
				opacity: 0
				transition: all .3s
		.width96
			width: 96%
			max-width: 1170px
	.gridList
		ul
			display: flex
			flex-wrap: wrap
		li
				min-height: 150px
				margin-bottom: 15px
				.btnWrap
					position: absolute
					top: 5px
					right: 5px
					z-index: 1
					button
						background: $assbg
						padding: 2px 15px
						width: 100%
						color: #fff
						opacity: 0
						transition: all .3s
				.img
					display: flex
					align-items: center
					justify-content: center
					height: 100%
					&:before
						content: ''
						display: block
						position: absolute
						left: 0
						top: 0
						right: 0
						bottom: 0
						background: rgba(27, 62, 62, .035)
					.imginner
						width: 100%
					.inner
						text-align: center
						width: 100%
						padding: 0 20px
						h3
							font-size: 18px
							>>> .ql-editor
								font-size: 18px
								padding: 1px 3px
						p
							font-size: 14px
							>>> .ql-editor
								font-size: 14px
								padding: 1px 3px
		.layout01
			display: flex
			min-height: 350px
			width: 37.5%
			padding: 0
			margin-bottom: 0
			&:first-child
				width: 62.5%
			&:last-child
				width: 62.5%
			.img
				width: 100%
				background-size: cover
				position: relative
				&:hover
					.btnWrap
						button
							opacity: 1
				&:before
					content: ''
					display: block
					position: absolute
					left: 0
					top: 0
					right: 0
					bottom: 0
					background: rgba(27, 62, 62, 0.35)
				.inner
					padding: 30px 25px
					position: relative
					>>> .active
						border-color: #fff
					h3
						font-size: 24px
						>>> .ql-editor
							font-size: 24px
					p
						font-size: 18px
						>>> .ql-editor
							font-size: 18px
		.layout02
			display: flex
			min-height: 350px
			width: 33.333%
			padding: 0
			margin-bottom: 0
			&:hover
				.btnWrap
					button
						opacity: 1
			&:first-child
				width: 50%
			&:nth-of-type(2)
				width: 50%
			.img
				width: 100%
				background-size: cover
				position: relative
				display: flex
				justify-content: center
				align-items: center
				&:before
					content: ''
					display: block
					position: absolute
					left: 0
					top: 0
					right: 0
					bottom: 0
					background: rgba(27, 62, 62, 0.35)
				.inner
					padding: 30px 25px
					position: relative
					>>> .active
						border-color: #fff
					h3
						font-size: 24px
						>>> .ql-editor
							font-size: 24px
					p
						font-size: 18px
						>>> .ql-editor
							font-size: 18px							
		.layout03
			width: 100%
			padding: 0
			margin-bottom: 0
			.left
				width: 37.5%
				float: left
				display: flex
				flex-direction: column
				.imginner
					display: flex
					flex: 1
					&:hover
						.btnWrap
							button
								opacity: 1
				.leftinner
					background-size: cover
					display: flex
					justify-content: center
					align-items: center
					position: relative
					flex: 1
					&:before
						position: absolute
						content: ''
						display: block
						background: rgba(27, 62, 62, 0.35)
						left: 0
						top: 0
						right: 0
						bottom: 0
			.right
				width: 62.5%
				float: left
				display: flex
				flex-direction: column
				.imginner
					display: flex
					flex: 1
				.rightinner
					background-size: cover
					display: flex
					flex-grow: 1
					position: relative
					justify-content: center
					align-items: center
					&:hover
						.btnWrap
							button
								opacity: 1
					&:before
						content: ''
						display: block
						position: absolute
						background: rgba(27, 62, 62, 0.35)
						left: 0
						top: 0
						right: 0
						bottom: 0
			.img
				background-size: cover
				position: relative
				.inner
					padding: 30px 25px
					position: relative
					>>> .active
						border-color: #fff
					h3
						font-size: 24px
						>>> .ql-editor
							font-size: 24px
					p
						font-size: 18px
						>>> .ql-editor
							font-size: 18px	
		.layout04
			width: 100%
			padding: 0
			margin-bottom: 0
			.left
				width: 37.5%
				float: right
				display: flex
				flex-direction: column
				.imginner
					display: flex
					flex: 1
					&:hover
						.btnWrap
							button
								opacity: 1
				.leftinner
					position: relative
					background-size: cover
					display: flex
					flex: 1
					align-items: center
					&:before
						content: ''
						display: block
						position: absolute
						background: rgba(27, 62, 62, 0.35)
						left: 0
						top: 0
						right: 0
						bottom: 0
			.right
				width: 62.5%
				float: left
				display: flex
				flex-direction: column
				.imginner
					display: flex
					flex: 1
				.rightinner
					position: relative
					flex: 1
					background-size: cover
					display: flex
					justify-content: center
					align-items: center
					&:hover
						.btnWrap
							button
								opacity: 1
					&:before
						content: ''
						display: block
						position: absolute
						background: rgba(27, 62, 62, 0.35)
						left: 0
						top: 0
						right: 0
						bottom: 0
			.img
				background-size: cover
				position: relative
				.inner
					padding: 30px 25px
					position: relative
					>>> .active
						border-color: #fff
					h3
						font-size: 24px
						>>> .ql-editor
							font-size: 24px
					p
						font-size: 18px
						>>> .ql-editor
							font-size: 18px	
		.layout001
			width: 50% !important
			padding: 5px !important
		.layout002
			&:nth-of-type(1)
				width: 100% !important
				padding: 5px !important
			&:nth-of-type(2)
				width: 50% !important
				padding: 5px !important
			&:nth-of-type(3)
				width: 50% !important
				padding: 5px !important
			&:nth-of-type(4)
				width: 50% !important
				padding: 5px !important
				min-height: 250px !important
			&:nth-of-type(5)
				width: 50% !important
				padding: 5px !important
				min-height: 250px !important
		.layout003
			.left
				width: 100%
				float: none
				display: block
				height: auto
				.imginner
					width: 50%
					padding: 5px !important
					float: left
			.right
				width: 100%
				display: block
				.imginner
					padding: 5px !important
					max-height: 168px
		.layout004
			display: flex
			flex-direction: column
			.left
				order: 10
				width: 100%
				float: none
				display: block
				height: auto
				.imginner
					width: 50%
					padding: 5px !important
					float: left
			.right
				order: 2
				width: 100%
				display: block
				.imginner
					padding: 5px !important
					max-height: 168px
.paddingT
	padding: 60px 0 40px
	&:hover
		.title
			.addTitle
				opacity: 1
	.title
		h2
			opacity: 1
		p
			opacity: 1
.phoneClass
	overflow: hidden
</style>