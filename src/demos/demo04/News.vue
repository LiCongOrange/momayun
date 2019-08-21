<template>
	<div 
		class="news paddingT" 
		ref="news1" 
		:class="[modelInfo.bgClass, { masking: modelInfo.maskingToggle }]" 
		:style="{backgroundImage: 'url(' + modelInfo.bgImg + ')', padding: modelInfo.updownspace }"
	>
		<fn-assembly
			:zBg="zBg"
			:zImg="this.zImg"
			:btnChoice="btnChoice"
			:widthNum="widthNum"
			:heightNum="heightNum"
			:postbg="modelInfo.bgClass"
			:postImg="modelInfo.bgImg"
			:updownSpace="modelInfo.updownspace"
			:maskingToggle="modelInfo.maskingToggle"
			@getDataBg="getDataBg"
			@getUpdownspace="getUpdownspace"
			@getMasking="getMasking"
			v-if="allEditToggle"
		></fn-assembly>
		<div class="container">
			<div class="title">
				<h3 v-if="allEditToggle" @click="getIndex('t')" :style="{ opacity: opacityNum }">
					<fn-editor :content="modelInfo.modularName" :type1="2" :type2="1" :lmid="pid"></fn-editor>
				</h3>
				<h3 v-else v-html="modelInfo.modularName" :class="{animated: isanimated1, flipInY: isfade1}"></h3>
			</div>
			<div class="row">

				<draggable v-model="modelInfo.newList" :options="{animation: 300, handle: '.list-complete-item'}" v-if="allEditToggle">
					<transition-group name="list-complete" tag="ul">
						<li 
							v-for="(ite, index) in modelInfo.newList"
							:key="ite.nid" 
							@mouseover="quZhi(ite.nid)"
							:style="{ opacity: opacityNum }"
						>
							<div class="btnList">
								<button title="删除？" class="iconfont btn btn-default" @click="deleteLi(index, ite.nid)">&#xe6e9;</button>
								<button title="排序请拖动" class="iconfont btn btn-default list-complete-item">&#xe653;</button>
							</div>
							<h3 @click="getIndex(index, 't1')">
								<fn-editor :content="ite.title" :type1="2" :type2="3" :lmid="pid" :sonid="ite.nid"></fn-editor>
							</h3>
							<p @click="getIndex(index, 'c1')" max-length="180">
								<fn-editor :content="ite.past" :type1="2" :type2="5" :lmid="pid" :sonid="ite.nid"></fn-editor>
							</p>
							<!-- <p v-if="ite.btnToggle">
								<button class="btn btn-default">查看详情</button>
							</p> -->
						</li>
					</transition-group>
				</draggable>

				<ul v-else>
					<li v-for="item in modelInfo.newList" :class="{ phoneclass: phoneToggle, animated: isanimated2, bounceInRight: isfade2 }">
						<h3 v-html="item.title"></h3>
						<p v-html="item.past"></p>
						<!-- <p v-if="item.btnToggle">
							<button class="btn btn-default">查看详情</button>
						</p> -->
					</li>
				</ul>
			</div>
			<div class="addList" v-if="allEditToggle">
				<span @click="addlistHandel">添加新闻</span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import FnAssembly from '@/common/Assembly'
import FnEditor from '@/common/Editor'
import draggable from 'vuedraggable'
export default {
	props: ['pid'],
	data() {
		return {
			btnChoice: 4,
			isanimated1: false,
			isfade1: false,
			isanimated2: false,
			isfade2: false,
			phoneToggle: false,
			widthNum: '1920',
			heightNum: '800',
			opacityNum: 0,
			imgList: [],
			nid: '',
			indexes: '',
			indexes2: '',
			modelInfo: '',
			section: '',
			zLayout: '',
			zBg: ["bgOne", "bgTwo", "bgThree"],
			classBg: '',
			bgNum: '',
			isPhoneClass: false
		}
	},
	components: {
		FnAssembly,
		FnEditor,
		draggable
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
		this.cutOut()
    this.$nextTick(function(){
      if(!this.browserToggle) {
        this.phoneToggle = true
      }
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
					type: 2,
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
					type: 2,
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
      	let htmlT = this.$refs.news1.getBoundingClientRect().top
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
		quZhi(nid) {
			this.nid = nid
		},
		addlistHandel() {
			let obj = {
				time: '',
				title: '微信朋友圈推广的技巧',
				content: '微信推广现在非常普遍，但是并不是所有人都可以成功推广其产品，失败的原因是定位不够准确。',
				btnToggle: true
			}
			for(let i=0; i<this.$store.state.stepPages.article.length; i++) {
				if(this.$store.state.stepPages.article[i].lmid == this.pid) {
					// this.$store.state.stepPages.article[i].newList.push(obj)
          this.$axios({
            method: 'post',
            url: '/api/Senior/newcmessage',
            data: {
              wid: this.$store.state.threeStep.siteId,
              type: 2,
              text: obj,
              lmid: this.pid
            }
          }).then((res)=> {
            if(res.data.code == '200') {
              let obj = {
                nid: res.data.data,
                time: '',
                title: '微信朋友圈推广的技巧',
                past: '微信推广现在非常普遍，但是并不是所有人都可以成功推广其产品，失败的原因是定位不够准确。',
                btnToggle: true
              }
              this.$store.state.stepPages.article[i].newList.push(obj)
            }
            if(res.data.code == '404') {
              alert(res.data.msg)
            }
          })
				}
			}
		},
		deleteLi(index, nid) {
			for(let i=0; i<this.$store.state.stepPages.article.length; i++) {
				if(this.$store.state.stepPages.article[i].lmid == this.pid) {
					this.$store.state.stepPages.article[i].newList.splice(index, 1)
          this.$axios({
            method: 'post',
            url: '/api/Senior/delmessage',
            data: {
              id: nid,
              type: 2
            }
          }).then((res)=> {
            if(res.data.code == '404') {
              alert(res.data.msg)
            }
          })
				}
			}
		},
		cutOut() {
			for(let i=0; i<this.$store.state.stepPages.article.length; i++) {
				if(this.$store.state.stepPages.article[i].lmid == this.pid) {
					this.modelInfo = this.$store.state.stepPages.article[i]
					this.modularName = this.$store.state.stepPages.article[i].modularName
					this.classBg = this.$store.state.stepPages.article[i].bgClass
				}
			}
			for(let i=0; i<this.modelInfo.newList.length; i++) {
				if(this.modelInfo.newList[i].past.length>150) {
					this.modelInfo.newList[i].past = this.modelInfo.newList[i].past.substring(0, 150) + '...'
				}else {
					this.modelInfo.newList[i].btnToggle = false
				}
			}
			this.modelInfo.newList = this.modelInfo.newList.slice(0, 4)
		},
		getIndex(index, index2) {
			this.indexes = index
			this.indexes2 = index2
		},
		fnEdit(val) {
			for(let i=0; i<this.$store.state.stepPages.article.length; i++) {
				if(this.$store.state.stepPages.article[i].lmid == this.pid) {
					if(this.indexes == 't') {
						this.$store.state.stepPages.article[i].modularName = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemodule',
              data: {
                site_id: this.$store.state.threeStep.siteId,
                lmid: this.pid,
                type: 2,
                module: this.modelInfo
              }
            }).then((res)=> {
              if(res.data.code == '404') {
                alert(res.data.msg)
              }
            })
					}else if(this.indexes2 == 't1') {
						this.$store.state.stepPages.article[i].newList[this.indexes].title = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemessage',
              data: {
                id: this.nid,
                type: 2,
                text: {
                  title: this.$store.state.stepPages.article[i].newList[this.indexes].title,
                  content: this.$store.state.stepPages.article[i].newList[this.indexes].past,
                  time: this.$store.state.stepPages.article[i].newList[this.indexes].time,
                  picurl: this.$store.state.stepPages.article[i].newList[this.indexes].picurl,
                }
              }
            }).then((res)=> {
              if(res.data.code == '404') {
                alert(res.data.msg)
              }
            })
					}else if(this.indexes2 == 'c1') {
						this.$store.state.stepPages.article[i].newList[this.indexes].past = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemessage',
              data: {
                id: this.nid,
                type: 2,
                text: {
                  title: this.$store.state.stepPages.article[i].newList[this.indexes].title,
                  content: this.$store.state.stepPages.article[i].newList[this.indexes].past,
                  time: this.$store.state.stepPages.article[i].newList[this.indexes].time,
                  picurl: this.$store.state.stepPages.article[i].newList[this.indexes].picurl,
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
		},
		getDataBg(data) {
			// this.classBg = data
			for(let i=0; i<this.$store.state.stepPages.article.length; i++) {
				if(this.$store.state.stepPages.article[i].lmid == this.pid) {
					// this.$store.state.stepPages.article[i].bgClass = data
					if(data[0] == '0') {
						this.$store.state.stepPages.article[i].bgImg = ''
						this.$store.state.stepPages.article[i].bgClass = data[1]
			          this.$axios({
			            method: 'post',
			            url: '/api/Senior/savemodule',
			            data: {
			              site_id: this.$store.state.threeStep.siteId,
			              lmid: this.pid,
			              type: 2,
			              module: this.modelInfo
			            }
			          }).then((res)=> {
			            if(res.data.code == '404') {
			              alert(res.data.msg)
			            }
			          })
					}else {
						this.$store.state.stepPages.article[i].bgClass = ''
						this.$store.state.stepPages.article[i].bgImg = data[1]
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
  								this.$store.state.stepPages.article[i].bgImg = res.data.data[0].url
  								this.$axios({
  									method: 'post',
  									url: '/api/Senior/savemodule',
  									data: {
  										site_id: this.$store.state.threeStep.siteId,
						  				lmid: this.pid,
						  				type: 2,
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
						  				type: 2,
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
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.news
	position: relative
	transition: all 0.3s
	padding:40px 0
	background-size: cover
	background-attachment: fixed
	&:hover
		.addList
			opacity: 1
	.addList
		padding: 5px 0
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
	.title
		margin-bottom: $marginb
		h3
			font-size: $fontsize1
			margin:0
			opacity: 0
			color: $textColor
			>>> .ql-editor
				padding: 0
				font-size: $fontsize1
		.animated
			opacity: 1
	.container
		position: relative
		z-index: 10
		ul
			padding: 20px 0
			li
				width: 50%
				float: left
				padding: 0px 30px
				min-height: 240px
				position: relative
				opacity: 0
				&:nth-child(even)
					border-left: 2px solid #ccc
				&:hover
					.btnList
						opacity: 1
				.btnList
					position: absolute
					right: 0
					top: 0
					z-index: 10
					opacity: 0
					transition: all .3s
					button
						display: block
						margin-bottom: 5px
						background: $iconbg
						padding: 0
						width: $iconwidth
						height: $iconheight
						border: none
						border-radius: $iconradius
						color: $iconcolor
						font-size: $iconfontsize
						&:nth-of-type(2)
							cursor: move
							display: $display
				h3
					color: $textColor
					font-weight: 500
					font-size: $fontsize3
					margin-top:0
					>>> .ql-editor
						padding: 0
						font-size: $fontsize3
				p
					color: $textColor
					font-size: $fontsize5
					>>> .ql-editor
						padding: 0
						font-size: $fontsize5
			.phoneclass
				width: auto
			.animated
				opacity: 1
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
	.title
		h3
			color: $fontColor
	.container
		ul
			li
				h3
					color: $fontColor
				p
					color: $fontColor
.bgTwo
	background-color: $modelBg03
	.title
		h3
			color: $textColor
	.container
		ul
			color: $textColor
			li
				h3
					color: $textColor
				p
					color: $textColor
.bgThree
	background-color: $modelBg01	
	.title
		h3
			color: $fontColor
	.container
		ul
			color: $fontColor
			li
				h3
					color: $fontColor
				p
					color: $fontColor
		
</style>