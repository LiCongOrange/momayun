<template>
	<div class="boradWrap2" ref="site09" :class="{ phoneClass: phoneToggle }">
		<swiper :options="swiperOption" class="swiper-no-swiping">
			<swiper-slide 
				v-for="(item, index) in modelInfo.broadcastImg" 
				:key="index" 
				:style="{backgroundImage: 'url('+ item.bgImg + ')', minHeight: slideminheight}"
				:class="[item.bgClass, { masking: item.maskingToggle }]"
			>
				<div @mouseenter="fn(index, item.bid)" class="funcbtn">
					<fn-assembly
						v-if="allEditToggle"
						:btnChoice="btnChoice"
						:zLayout="item.zLayout"
						:zLetter="item.zLetter"
						:zBg="zBg"
						:zImg="zImg"
						:postbg="item.bgClass"
						:bgColorNum="item.bgColorNum"
						:postImg="item.bgImg"
						:maskingToggle="item.maskingToggle"
						@getDataLayout="getDataLayout"
						@getDataBg="getDataBg"
						@getDataBg2="getDataBg2"
						@getMasking="getMasking"
					></fn-assembly>
				</div>
				<div class="contentinner container" :class="[item.layoutClass, { width96: allEditToggle }]" v-if="allEditToggle">
					<div class="text">
						<div class="inner">
							<div class="bgimg-wrap" :style="{ opacity: opacityNum }">
								<h3 @click="getIndex(index, 't', item.bid)">
									<fn-editor :content="item.title" :type1="5" :type2="11" :lmid="pid" :sonid="item.bid"></fn-editor>
								</h3>
								<h5>
									<fn-editor :content="item.nameFn" :type1="5" :type2="4" :lmid="pid" :sonid="item.bid"></fn-editor>
								</h5>
							</div>
							<p class="version" @click="getIndex(index, 'c', item.bid)" :style="{ opacity: opacityNum }">
								<fn-editor :content="item.content" :type1="5" :type2="3" :lmid="pid" :sonid="item.bid"></fn-editor>
							</p>
						</div>
					</div>
					<div class="img">
						<div class="imgInner" v-if="item.picurl">
							<img :src="item.picurl" :style="{ opacity: opacityNum }" :class="{animated: isanimated1, fadeInLeft: isfade1}">
	            <div class="mask" v-if="allEditToggle">
	            	<p>
	            		<span @click="editHandel('01', item.picurl, index, item.bid)">编辑</span>
	            		<span @click="editHandel('02', item.picurl, index, item.bid)">删除</span>
	            	</p>
	            </div>
						</div>
						<div class="addImg" v-else>
							<span @click="editHandel('03', item.picurl, index, item.bid)">添加图片</span>
						</div>
					</div>
				</div>

				<div class="contentinner container" :class="item.layoutClass" v-else>
					<div class="text">
						<div class="inner">
							<div class="bgimg-wrap" :class="{animated: isanimated1, fadeInRight: isfade1}">
								<h3 v-html="item.title"></h3>
								<h5 v-html="item.nameFn"></h5>
							</div>
							<p class="version" v-html="item.content" :class="{animated: isanimated1, fadeInRight: isfade1}"></p>
						</div>
					</div>
					<div class="img">
						<div class="imgInner">
							<img :src="item.picurl" :class="{animated: isanimated1, fadeInLeft: isfade1}" v-if="item.picurl">
						</div>
					</div>
				</div>


			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
			<div class="swiper-button-prev swiper-button-blue iconfont" slot="button-prev">&#xe720;</div>
    	<div class="swiper-button-next swiper-button-blue iconfont" slot="button-next">&#xe6f9;</div>
		</swiper>
	  <div class="addList dropdown" v-if="allEditToggle">
			<button type="button" class="btn dropdown-toggle" @click="dropHandel">
				滑块
				<span class="iconfont">&#xe6fb;</span>
			</button>
			<ul class="dropdown-menu" v-if="activeToggle">
				<li 
					v-for="(item, index) in modelInfo.broadcastImg" 
					:class="{ active: item.spanOnoff == 'true' }"
					@click="handelClick(index, item.bid)"
					:id="index"
				>
					<!-- <img :src="item.picslurl"> -->
					<!-- <font v-html="item.title"></font> -->
					<font>滑块{{ index + 1 }}</font>
					<span v-if="item.spanOnoff == 'true'"><i class="iconfont" @click="deleteList(index, item.bid)">&#xe6e9;</i></span>
				</li>
				<li>
					<button @click="addList"><i class="iconfont">&#xe6df;</i>添加滑块</button>
				</li>
			</ul>
		</div>
	  <img-layer
	  	v-if="imgReplaceToggle" 
			:imgTu="postImg"
			:widthNum="widthNum1"
			:heightNum="heightNum1"
			:lunbo="123"
			@getImg="getImg"
			@onoff="onoff"
	  ></img-layer>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import FnAssembly from '@/common/Assembly'
import FnEditor from '@/common/Editor'
import imgLayer from '@/common/Imglayer'
import BtnEditor from '@/common/BtnEditor'
export default {
	props: ['pid'],
	components: {
		FnAssembly,
		imgLayer,
		FnEditor,
		BtnEditor
	},
	data() {
		return {
			slideminheight: '',
			phoneToggle: false,
			bgorimgtoggle: true,
			isanimated1: false,
			isfade1: false,
			opacityNum: 0,
			opacityToggle: false,
		  nowLayoutclass: '',
		  slideIndex: '',
		  slideId: '',
			zLetter: 'A',
			btnChoice: 5,
			imgList: [],
			activeToggle: false,
			imgReplaceToggle: false,
			postImg: '',
			indexes: '',
			indexes2: '',
			widthNum1: '1600',
			heightNum1: '900',
			modelInfo: '',
			swiperOption: {
				// autoplay: true,
				// speed: 3000,
				// loop: true,
				pagination: '.swiper-pagination',
				paginationClickable: true,
				prevButton: '.swiper-button-prev',
				nextButton: '.swiper-button-next',
				// observer: true,
				// observeParents: true,
				// mousewheel: true,
				// loop: true,
				// preventLinksPropagation: false,
				initialSlide: 0
			},
			zBg: ['bgOne', 'bgTwo', 'bgThree'],
			zLayout: [{
				letter: 'A',
				name: 'layout1'
			}, {
				letter: 'B',
				name: 'layout2'
			}, {
				letter: 'C',
				name: 'layout3'
			}]
		}
	},
	mounted() {

		if(!this.pid) {
			for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
				if(this.$store.state.blocks.modeltextList[i].lmid == 'add08') {
					this.modelInfo = this.$store.state.blocks.modeltextList[i]
				}
			}
		}else {
			for(let i=0; i<this.stepPages.banner.length; i++) {
				if(this.stepPages.banner[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.banner[i]
				}
			}
		}
  	window.addEventListener('scroll', this.handleScroll)
  	this.$nextTick(function() {
  		this.handleScroll()
  		if(this.pid) {
  			// this.slideminheight = this.$refs.site09.getBoundingClientRect().height
  		}
  	})
		if(!this.browserToggle) {
			this.phoneToggle = true
		}
		if(this.allEditToggle) {
			this.swiperOption.loop = false
			this.swiperOption.autoplay = false
		}
	},
	watch: {
		pid(val) {
			for(let i=0; i<this.stepPages.banner.length; i++) {
				if(this.stepPages.banner[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.banner[i]
				}
			}
		}
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			siteId: state => state.threeStep.siteId,
			zImg: state => state.stepPages.bannerList,
			browserToggle: state => state.browserToggle,
			stepPages: state => state.stepPages,
		})
	},
	methods: {
		getMasking(data) {
			if(data) {
				this.modelInfo.broadcastImg[this.slideIndex].maskingToggle = true
	      this.$axios({
	        method: 'post',
	        url: '/api/Senior/savemessage',
	        data: {
	          id: this.slideId,
	          type: 5,
	          text: this.modelInfo.broadcastImg[this.slideIndex]
	        }
	      }).then((res)=> {
	        if(res.data.code == '404') {
	          alert(res.data.msg)
	        }
	      })
			}else {
				this.modelInfo.broadcastImg[this.slideIndex].maskingToggle = false
	      this.$axios({
	        method: 'post',
	        url: '/api/Senior/savemessage',
	        data: {
	          id: this.slideId,
	          type: 5,
	          text: this.modelInfo.broadcastImg[this.slideIndex]
	        }
	      }).then((res)=> {
	        if(res.data.code == '404') {
	          alert(res.data.msg)
	        }
	      })
			}
		},
		getDataBg2(data) {
			if(data == '0') {
				this.bgorimgtoggle = false
				this.imgReplaceToggle = true
				this.postImg = this.modelInfo.broadcastImg[this.slideIndex].bgImg
				this.widthNum = '1440'
				this.heightNum = '400'
			}
		},
		handleScroll() {
			if(this.allEditToggle) {
				this.opacityNum = 1
			}else {                         
				let htmlT = this.$refs.site09.getBoundingClientRect().top
	  		if(htmlT <= 450) {
		  			this.isanimated1 = true
		  			this.isfade1 = true
	  		}
			}
		},
		fn(index, bid) {
				this.slideIndex = index
				this.slideId = bid
		},
		addBtnlist(index) {
			this.modelInfo.broadcastImg[index].btnToggle = '1'
      this.$axios({
          method: 'post',
          url: '/api/Senior/savemessage',
          data: {
            id: this.slideId,
            type: 5,
            text: this.modelInfo.broadcastImg[index]
          }
        }).then((res)=> {
          if(res.data.code == '404') {
            alert(res.data.msg)
          }
        })
		},
		getContent(data) {
			if(data == 'delete') {
				this.modelInfo.broadcastImg[this.indexes].btnToggle = ''
        this.$axios({
            method: 'post',
            url: '/api/Senior/savemessage',
            data: {
              id: this.slideId,
              type: 5,
              text: this.modelInfo.broadcastImg[this.indexes]
            }
          }).then((res)=> {
            if(res.data.code == '404') {
              alert(res.data.msg)
            }
          })
			}else {
				this.modelInfo.broadcastImg[this.indexes].btnInfo.link = data.link
				this.modelInfo.broadcastImg[this.indexes].btnInfo.text = data.text
				if(data.onOff) {
					this.modelInfo.broadcastImg[this.indexes].btnInfo.target = "_blank"
				}else {
					this.modelInfo.broadcastImg[this.indexes].btnInfo.target = "_self"
				}
        this.$axios({
          method: 'post',
          url: '/api/Senior/savemessage',
          data: {
            id: this.slideId,
            type: 5,
            text: this.modelInfo.broadcastImg[this.indexes]
          }
        }).then((res)=> {
          if(res.data.code == '404') {
            alert(res.data.msg)
          }
        })
			}
		},
		getIndex(index, index2, bid) {
			this.indexes = index
			this.indexes2 = index2
			this.slideId = bid
		},
		editHandel(type, url, index, bid) {
			if(type == '01') {
				this.bgorimgtoggle = true
				this.postImg = url
				this.slideIndex = index
				this.slideId = bid
				this.imgReplaceToggle = true
			}else if(type == '02') {
				this.modelInfo.broadcastImg[index].picurl = ''
        this.$axios({
          method: 'post',
          url: '/api/Senior/savemessage',
          data: {
            id: bid,
            type: 5,
            text: this.modelInfo.broadcastImg[index]
          }
        }).then((res)=> {
          if(res.data.code == '404') {
            alert(res.data.msg)
          }
        })
			}else {
				this.modelInfo.broadcastImg[index].picurl = '/static/images/banner/icon/tb01.png'
        this.$axios({
          method: 'post',
          url: '/api/Senior/savemessage',
          data: {
            id: bid,
            type: 5,
            text: this.modelInfo.broadcastImg[index]
          }
        }).then((res)=> {
          if(res.data.code == '404') {
            alert(res.data.msg)
          }
        })	
      }
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
        	if(this.bgorimgtoggle) {
        		 this.modelInfo.broadcastImg[this.slideIndex].picurl = res.data.data[0].url
        	}else {
        		 this.modelInfo.broadcastImg[this.slideIndex].bgImg = res.data.data[0].url
        	}
          this.$axios({
            method: 'post',
            url: '/api/Senior/savemessage',
            data: {
              id: this.slideId,
              type: 5,
              text: this.modelInfo.broadcastImg[this.slideIndex]
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
		},
		getDataLayout(data) {
			this.modelInfo.broadcastImg[this.slideIndex].zLetter = data[1]
			this.modelInfo.broadcastImg[this.slideIndex].layoutClass = data[0]
      this.$axios({
        method: 'post',
        url: '/api/Senior/savemessage',
        data: {
          id: this.slideId,
          type: 5,
          text: this.modelInfo.broadcastImg[this.slideIndex]
        }
      }).then((res)=> {
        if(res.data.code == '404') {
          alert(res.data.msg)
        }
      })
		},
		getDataBg(data) {
			if(data[0] == '0') {
				this.modelInfo.broadcastImg[this.slideIndex].bgImg = ''
				this.modelInfo.broadcastImg[this.slideIndex].bgClass = data[1]
	      this.$axios({
	        method: 'post',
	        url: '/api/Senior/savemessage',
	        data: {
	          id: this.slideId,
	          type: 5,
	          text: this.modelInfo.broadcastImg[this.slideIndex]
	        }
	      }).then((res)=> {
	        if(res.data.code == '404') {
	          alert(res.data.msg)
	        }
	      })
			}else if(data[0] == '1') {
				this.modelInfo.broadcastImg[this.slideIndex].bgClass = ''
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
							this.modelInfo.broadcastImg[this.slideIndex].bgImg = res.data.data[0].url
				      this.$axios({
				        method: 'post',
				        url: '/api/Senior/savemessage',
				        data: {
				          id: this.slideId,
				          type: 5,
				          text: this.modelInfo.broadcastImg[this.slideIndex]
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
					this.modelInfo.broadcastImg[this.slideIndex].bgImg = data[1]
					this.$axios({
						method: 'post',
						url: '/api/Senior/savemessage',
						data: {
				          id: this.slideId,
				          type: 5,
				          text: this.modelInfo.broadcastImg[this.slideIndex]
						}
					}).then((res)=> {
						if(res.data.code == '404') {
							alert(res.data.msg)
						}
					})
				}
			}else {
				this.modelInfo.broadcastImg[this.slideIndex].bgImg = ''
				this.modelInfo.broadcastImg[this.slideIndex].bgClass = ''
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemessage',
					data: {
				          id: this.slideId,
				          type: 5,
				          text: this.modelInfo.broadcastImg[this.slideIndex]
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}
		},
		addList() {
			let obj = {
      	spanOnoff: 'true',
				title: "<p class='ql-align-left'><span class='ql-font-serif ql-size-large' style='color: rgb(255, 255, 255)'>新标题文本</span></p>",
				layoutClass: 'layout1',
				imgToggle: '1',
				btnToggle: '1',
				content: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(255, 255, 255)'>内容文本，简述你的公司项目或产品，展示你的公司文化等等。</span></p>",
				picurl: '/static/images/banner/icon/tb01.png',
				bgImg: '/static/images/banner/shows/show19.jpg',
				bgClass: '',
				bgColorNum: '',
				btnInfo: {
					text: '立即购买',
					link: '',
					target: '_blank'
				},
				zLayout: [{
					letter: 'A',
					name: 'layout1'
				}, {
					letter: 'B',
					name: 'layout2'
				}, {
					letter: 'C',
					name: 'layout3'
				}],
				zLetter: 'A'
			}
			this.$axios({
				method: 'post',
				url: '/api/Senior/newcmessage',
				data: {
					wid: this.siteId,
					type: 5,
					text: obj,
					lmid: this.pid 
				}
			}).then((res)=> {
				if(res.data.code == '200') {
					for(let i=0; i<this.modelInfo.broadcastImg.length; i++) {
						this.modelInfo.broadcastImg[i].spanOnoff = false
					}
					let obj = {
						bid: res.data.data,
		      	spanOnoff: 'true',
						title: "<p class='ql-align-left'><span class='ql-font-serif ql-size-large' style='color: rgb(255, 255, 255)'>新标题文本</span></p>",
						layoutClass: 'layout1',
						imgToggle: '1',
						btnToggle: '1',
						content: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(255, 255, 255)'>内容文本，简述你的公司项目或产品，展示你的公司文化等等。</span></p>",
						picurl: '/static/images/banner/icon/tb01.png',
						bgImg: '/static/images/banner/shows/show19.jpg',
						bgClass: '',
						bgColorNum: '',
						btnInfo: {
							text: '立即购买',
							link: '',
							target: '_blank'
						},
						zLayout: [{
							letter: 'A',
							name: 'layout1'
						}, {
							letter: 'B',
							name: 'layout2'
						}, {
							letter: 'C',
							name: 'layout3'
						}],
						zLetter: 'A'
					}
					this.modelInfo.broadcastImg.push(obj)
				}else {
					alert(res.data.msg)
				}
			})
		},
		deleteList(index, bid) {
			this.$axios({
				method: 'post',
				url: '/api/Senior/delmessage',
				data: {
					id: bid,
					type: 5
				}
			}).then((res)=> {
				if(res.data.code == '200') {
					this.modelInfo.broadcastImg.splice(index, 1)
				}else {
					alert(res.data.msg)
				}
			})
		},
		handelClick(index, bid) {
			this.slideId = bid
			for(let j=0; j<this.modelInfo.broadcastImg.length; j++) {
				this.modelInfo.broadcastImg[j].spanOnoff = 'false'
			}
			this.modelInfo.broadcastImg[index].spanOnoff = 'true'
		},
		dropHandel() {
			this.activeToggle = !this.activeToggle
		},
		onoff(val) {
			this.imgReplaceToggle = false
		},
		upImgHandel(index, val, bid) {
			this.slideId = bid
			this.indexes = index
			this.postImg = val
			this.imgReplaceToggle = true
		},
		fnEdit(val) {
			if(this.indexes2 == 't') {
				this.modelInfo.broadcastImg[this.indexes].title = val
        this.$axios({
          method: 'post',
          url: '/api/Senior/savemessage',
          data: {
            id: this.slideId,
            type: 5,
            text: this.modelInfo.broadcastImg[this.indexes]
          }
        }).then((res)=> {
          if(res.data.code == '404') {
            alert(res.data.msg)
          }
        })
			}else {
				this.modelInfo.broadcastImg[this.indexes].content = val
        this.$axios({
          method: 'post',
          url: '/api/Senior/savemessage',
          data: {
            id: this.slideId,
            type: 5,
            text: this.modelInfo.broadcastImg[this.indexes]
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
.boradWrap2
	position: relative
	>>> .swiper-container
		z-index: 0 !important
		.swiper-slide
			.layout-btn
				.btn-layout
					display: none
		.swiper-button-prev, .swiper-button-next
			background: none
			width: 65px
			font-size: 60px
			color: rgb(0, 0, 0, .7)
			text-align: center
			line-height: normal
		.swiper-button-prev
			background: rgba(255, 255, 255, .3)
		.swiper-button-next
			background: rgba(255, 255, 255, .3)
	>>> .swiper-pagination-bullet-active
		background: #333	
	&:hover
		.swiper-slide
			.img
				.addImg
					opacity: 1
	.addList
		position: absolute
		right: 10px
		top: 10px
		z-index: 10
		button
			width: $asswidth
			background: $assbg
			border: $assborder
			border-radius: $assradius
			padding: 5px 30px
			color: #fff
			line-height: 22px
			&:hover
				background: $assbghover
		.dropdown-menu
			width: 100%
			min-width: inherit
			border: none
			border-radius:$assradius
			background: $assbg
			margin-top: -2px
			padding: 7px
			display: block
			li
				margin-top: 5px
				position: relative
				background: rgba(0, 0, 0, 0.9)
				border-radius: 2px
				cursor: pointer
				line-height: 26px
				transition: all .3s
				&:hover
					overflow: hidden
				&:nth-last-child(1)
					background: none
				font
					display: inline-block
					text-indent: 8px
					font-size: 14px
					color: #fff
				p
					overflow: hidden
					margin: 0
				button
					background: #666
					padding: 0
					width: 100%
					opacity: 0.8
					&:hover
						opacity: 1
				span
					position: absolute
					left: 0 
					right: 0
					top: 0
					bottom: 0
					border: 1px solid #fc0
					text-align: right
					transition: all .3s
					cursor: pointer
					i
						position: relative
						top: -1px
						right: 5px
						color: #fff
						font-size: 14px
						font-weight: bold
			.active
				img
					opacity: 1			
	.swiper-container
		width:100%
		height:100%
	.swiper >>> .swiper-pagination-bullet-active
		background: $bgColor
	.swiper-slide
		position: relative
		// min-height: 516px
		background-size: cover
		height: auto
		display: flex
		align-items: center
		&:hover
			.text
				.addBtn
					span
						opacity: 1
		.container
			display: flex
			padding-top: 150px
		.width96
			width: 96%
			max-width: 1170px
		.layout-btn
			right: 148px
			>>> .space-bg
				ul
					.li-space
						display: none
			>>> .laybox
				display: none !important
		.text
			position: relative
			z-index: 100
			transition: all .3s
			flex: 1
			display: flex
			align-items: center
			.bgimg-wrap
				padding-top: 25px
				margin-bottom: 35px
				background: url('/static/images/banner/icon/tb03.png') no-repeat
				opacity: 0
			.inner
				width: 80%
				margin: 0 auto
			.animated
				opacity: 1
			h5
				margin: 0
				padding-left: 25%
				font-size: 13px
				color: rgb(164, 164, 164)
				line-height: inherit
				>>> .active
					border-color: #fff
				>>> .ql-editor
					font-size: 13px
					line-height: inherit
					color: rgb(164, 164, 164)
					padding: 1px 3px
			h3
				margin: 0
				padding-left: 25%
				font-size: 24px
				color: rgb(230, 230, 230)
				line-height: inherit
				>>> .active
					border-color: #fff
				>>> .ql-editor
					padding: 1px 3px
					line-height: inherit
					font-size: 24px
					color: rgb(230, 230, 230)
				>>> .ql-tooltip
					left: 0 !important
			p
				font-size: 13px
				line-height: 24px
				color: rgb(164, 164, 164)
				opacity: 0
				>>> .active
					border-color: #fff
				>>> .ql-editor
					padding: 1px 3px
					line-height: 24px
					font-size: 13px
					color: rgb(164, 164, 164)
				>>> .ql-tooltip
					left: 0 !important
			.btnEdit
				margin-top: 15px
				position: relative
				display: inline-flex
				padding: 5px
				a
					border: $allbtnborder2
					border-radius: $allbtnradius
					padding: $allbtnpadding
					background: $allbtnbg
					color: $allbtnfontcolor2
					font-size: $allbtnfontsize
					opacity: 0
					font-weight: bold
					transition: all .3s
					text-decoration: none
					&:hover
						background: $allbtnbghover2
						border-color: $allbtnborderhover2
						color: $allbtnfontcolorhover2
				.animated
					opacity: 1
			.addBtn
				span
					background: #000
					padding: 5px
					color: #fff
					cursor: pointer
					opacity: 0
					transition: all .3s
		.img
			position: relative
			text-align: center
			transition: all .3s
			flex: 1
			padding: 7px
			&:hover
				.mask
					opacity: 1
			.imgInner
				min-height: 278px
			img
				max-width: 100%
				max-height: 100%
				opacity: 0
			.animated
				opacity: 1
			.mask
				position: absolute
				width: 100%
				height: 100%
				left: 0
				top: 0
				background: $maskbg
				border: $maskborder
				border-radius: $maskradius
				opacity: 0
				transition: all .3s
				p
					position: absolute
					left: 50%
					top: 50%
					transform:  translate(-50%, -50%)
					span
						background: $addbtnbg
						padding: $addbtnpadding
						border-radius: $addbtnradius
						font-size: $addbtnfontsize
						color: #fff
						cursor: pointer
			.addImg
				display: inline-flex
				opacity: 0
				transition: all .3s
				span
					position: absolute
					left: 50%
					top: 100%
					transform: translate(-50%, -50%)
					background: #000
					padding: 5px
					color: #fff
					cursor: pointer
		.layout1
			display: flex
			justify-content: between
			.text
				width: 50%
			.img
				width: 50%
		.layout2
			flex-direction: row-reverse
			.text
				float: left
				width: 50%
			.img
				float: right
				width: 50%
		.layout3
			.img
				display: none
			.text
				.btnEdit
					left: 50%
					transform: translateX(-50%)
					>>> .btnEditor
						.editorWrap
							transform: translateX(-30%)
	.masking
		&:before
			content: ''
			display: block
			position: absolute
			left: 0
			top: 0
			width: 100%
			height: 100%
			background: rgba(126,65,39,0.35)
	.swiper-button-next, .swiper-button-prev
		width: 40px
		height: 65px
		background-size: cover
	.bgOne
		background: $modelBg02
	.bgTwo
		background: $modelBg03
		.text
			.btnEdit
				a
					border: $allbtnborder
					color: $allbtnfontcolor
					&:hover
						border: $allbtnborderhover
						background: $allbtnbghover
						color: $allbtnfontcolorhover
		.text
			h3
				color: #fff
				.ql-editor
					color: #fff
			p.version
				color: #fff
				.ql-editor
					color: #fff
	.bgThree
		background: $modelBg01				
.phoneClass
	margin: 0
	.swiper-slide
		padding: 20px 0
		min-height: 450px
		.container
			padding-top 30px
			display: block
		.img
			margin-top 15px
			float: none !important
			width: 100% !important
			img
				width: 80%
				max-width: 200px
		.text
			float: none !important
			width: 100% !important
			text-align: center !important
			h3
				padding-left 37%
				font-size: 36px
			h5
				padding-left 37%
			p
				font-size: 16px
			.btnEdit
				a
					padding: 10px 20px
</style>