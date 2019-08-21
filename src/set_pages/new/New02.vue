<template>
	<div 
			class="schedule paddingT" 
			ref="news2" 
			:class="[modelInfo.bgClass, { masking: modelInfo.maskingToggle }]" 
			:style="{backgroundImage: 'url(' + modelInfo.bgImg + ')', padding: modelInfo.updownspace }"
		>
		<fn-assembly
			:btnChoice="btnChoice"
			:zLetter="zLetter"
			:zLayout="zLayout"
			:zBg="zBg"
			:zImg="zImg"
			:postbg="modelInfo.bgClass"
			:postImg="modelInfo.bgImg"
			:widthNum="widthNum"
			:heightNum="heightNum"
			:updownSpace="modelInfo.updownspace"
			:maskingToggle="modelInfo.maskingToggle"
			@getDataLayout="getDataLayout"
			@getDataBg="getDataBg"
			@getUpdownspace="getUpdownspace"
			@getMasking="getMasking"
			v-if="allEditToggle"
		></fn-assembly>
		<div class="container">
			<div class="title" v-if="allEditToggle">
				<div class="title-inner" v-if="modelInfo.titleToggle">
					<h2 @click="getIndex('t')" :style="{ opacity: opacityNum }">
						<fn-editor :content="modelInfo.modularName" :type1="2" :type2="1" :lmid="pid"></fn-editor>
					</h2>
					<p @click="getIndex('c')" :style="{ opacity: opacityNum }">
						<fn-editor :content="modelInfo.modularNameLetter" :type1="2" :type2="2" :lmid="pid"></fn-editor>
					</p>
					<div class="iconfont" @click="titleHandle('01')">&#xe6e9;</div>
				</div>
				<div class="addbtn" v-else>
					<span @click="titleHandle('02')">添加标题</span>
				</div>
			</div>
			<div class="title" v-else>
				<div class="titleToggle" v-if="modelInfo.titleToggle">
						<h2 v-html="modelInfo.modularName" :class="{animated: isanimated1, bounceInLeft: isfade1}"></h2>
						<p v-html="modelInfo.modularNameLetter" :class="{animated: isanimated1, bounceInRight: isfade1}"></p>
					</div>
			</div>
			<div class="row">

				<draggable v-model="modelInfo.newList" :options="{animation: 300, handle: '.list-complete-item'}" v-if="allEditToggle">
					<transition-group name="list-complete" tag="ul">
						<li 
							class="col-xs-12 col-sm-6 col-md-4 list"
							v-for="(item, index) in modelInfo.newList"
							:key="item.nid" 
							:class="modelInfo.layoutClass"
						>
							<div class="inner">
							<div class="btnList">
								<button title="删除？" class="iconfont btn btn-default" @click="deleteLi(index, ite.nid)">&#xe6e9;</button>
								<button title="排序请拖动" class="iconfont btn btn-default list-complete-item">&#xe653;</button>
							</div>
							<div class="order" v-html="item.timer" :style="{ opacity: opacityNum }"></div>
							<div class="text" :style="{ opacity: opacityNum }">
								<h3 @click="getIndex(index, 'c1', item.nid)" class="color minititle">
									<fn-editor :content="item.title" :type1="2" :type2="3" :lmid="pid" :sonid="item.nid"></fn-editor>
								</h3>
								<p @click="getIndex(index, 'p1', item.nid)">
									<fn-editor :content="item.past" :type1="2" :type2="5" :lmid="pid" :sonid="item.nid"></fn-editor>
								</p>
								<!-- <p v-if="item.btnToggle">
									<button class="btn btn-default">查看详情</button>
								</p> -->
							</div>
							</div>
						</li>
					</transition-group>
				</draggable>

				<ul v-else>
					<li 
						class="col-xs-12 col-sm-6 col-md-4 list"
						v-for="(item, index) in modelInfo.newList"
						:key="item.id" 
						:class="modelInfo.layoutClass"
					>
						<div class="inner">
						<div class="order" v-html="item.timer" :class="{ animated: isanimated2, bounceInLeft: isfade2 }"></div>
						<div class="text" :class="{ animated: isanimated2, bounceInRight: isfade2 }">
							<h3 class="color" v-html="item.title" @click="todetailHandel(item)"></h3>
							<p v-html="item.past"></p>
						</div>
						</div>
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
	props:['pid'],
	data () {
		return {
			isanimated1: false,
			isfade1: false,
			isanimated2: false,
			isfade2: false,
			widthNum: '1920',
			heightNum: '1080',
			opacityNum: 0,
			nid: '',
			indexes: '',
			indexes2: '',
			btnChoice: 5,
			section: '',
			modelInfo: '',
			zBg: ["bgOne", "bgTwo", "bgThree"],
			classLayout: '',
			classBg: '',
			zLetter: 'A',
			znum: null,
			znum1: null,
			zLayout: [{
				"letter": "A",
				"name": "layout1"
			}, {
				"letter": "B",
				"name": "layout2"
			}, {
				"letter": "C",
				"name": "layout3"
			}]
		}
	},
	components: {
		FnAssembly,
		FnEditor,
		draggable
	},
	computed: {
		...mapState({
			zImg: state => state.stepPages.bannerList,
			allEditToggle: state => state.allEditToggle,
			browserToggle: state => state.browserToggle,
			stepPages: state => state.stepPages,
      siteId: state => state.threeStep.siteId,
      columnList2: state => state.threeStep.columnList2,
		})
	},
	mounted() {
    this.$nextTick(function(){
      if(!this.browserToggle) {
        this.modelInfo.layoutClass = ''
      }
      this.handleScroll()
    })
		if(!this.pid) {
			for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
				if(this.$store.state.blocks.modeltextList[i].lmid == 'add11') {
					this.modelInfo = this.$store.state.blocks.modeltextList[i]
					this.classLayout = this.$store.state.blocks.modeltextList[i].layoutClass
				}
			}
		}else {
			for(let i=0; i<this.stepPages.article.length; i++) {
				if(this.stepPages.article[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.article[i]
					this.classLayout = this.stepPages.article[i].layoutClass
					for(let i=0; i<this.modelInfo.newList.length; i++) {
						let obj = this.modelInfo.newList[i].timer.split(' ')
						if(obj.length === 2) {
							let obj1 = obj[0].split('-')
							this.modelInfo.newList[i].timer = '<strong>'+ obj1[2] +'</strong><span>'+ obj1[0] + '/' + obj1[1] +'</span>'
						}
					}
				}
			}
		}
		for(let i=0; i<this.modelInfo.newList.length; i++) {
			if(this.modelInfo.newList[i].past.length>150) {
				this.modelInfo.newList[i].past = this.modelInfo.newList[i].past.substring(0, 150) + '...'
			}else {
				this.modelInfo.newList[i].btnToggle = false
			}
		}
		// this.modelInfo.newList = this.modelInfo.newList.slice(0, 4)
    window.addEventListener('scroll', this.handleScroll)
	},
	watch: {
		classLayout(val) {
			if(val == "layout1") {
				this.zLetter = "A"
			}else if(val == "layout2") {
				this.zLetter = "B"
			}else if(val == "layout3") {
				this.zLetter = "C"
			}
		}
	},
	methods: {
		todetailHandel(data) {
			let obj = {
				lmid: this.pid,
				type: '2',
				id: data.nid
			}
			this.$store.state.sonPagetoggle = false
			// this.$store.state.sonPagetext = data
			// this.$store.state.sonPagetext = obj
			this.$store.commit('sonPageHandle', obj)
			this.$store.commit('pageIndexHandel', this.columnList2.length-2)
		},
		titleHandle(type) {
			if(type == '01') {
				this.modelInfo.titleToggle = false
			}else {
				this.modelInfo.titleToggle = true
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
      	let htmlT = this.$refs.news2.getBoundingClientRect().top
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
				time: '2018-12-04 14:01:41',
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
                time: '2018-12-04 14:01:41',
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
		quZhi(nid) {
			this.nid = nid
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
		getIndex(index, index2, nid) {
			this.indexes = index
			this.indexes2 = index2
			this.nid = nid
		},
		fnEdit(val) {
					if(this.indexes == 't') {
						this.modelInfo.modularName = val
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
					}else if(this.indexes == 'c') {
						this.modelInfo.modularNameLetter = val
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
					}else if(this.indexes2 == 't1') {
						this.modelInfo.newList[this.indexes].time = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemessage',
              data: {
                id: this.nid,
                type: 2,
                text: {
                  title: this.modelInfo.newList[this.indexes].title,
                  content: this.modelInfo.newList[this.indexes].past,
                  time: this.modelInfo.newList[this.indexes].time,
                  picurl: this.modelInfo.newList[this.indexes].picurl,
                }
              }
            }).then((res)=> {
              if(res.data.code == '404') {
                alert(res.data.msg)
              }
            })
					}else if(this.indexes2 == 'c1') {
						this.modelInfo.newList[this.indexes].title = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemessage',
              data: {
                id: this.nid,
                type: 2,
                text: {
                  title: this.modelInfo.newList[this.indexes].title,
                  content: this.modelInfo.newList[this.indexes].past,
                  time: this.modelInfo.newList[this.indexes].time,
                  picurl: this.modelInfo.newList[this.indexes].picurl,
                }
              }
            }).then((res)=> {
              if(res.data.code == '404') {
                alert(res.data.msg)
              }
            })
					}else if(this.indexes2 == 'p1') {
						this.modelInfo.newList[this.indexes].past = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemessage',
              data: {
                id: this.nid,
                type: 2,
                text: {
                  title: this.modelInfo.newList[this.indexes].title,
                  content: this.modelInfo.newList[this.indexes].past,
                  time: this.modelInfo.newList[this.indexes].time,
                  picurl: this.modelInfo.newList[this.indexes].picurl,
                }
              }
            }).then((res)=> {
              if(res.data.code == '404') {
                alert(res.data.msg)
              }
            })
					}
		},
		getDataLayout(data) {
			// console.log(data)
			this.classLayout = data[0]
			this.zLetter = data[1]
					this.modelInfo.layoutClass = data[0]
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
		getDataBg(data) {
			this.classBg = data
					if(data[0] == '0') {
						this.modelInfo.bgImg = ''
						this.modelInfo.bgClass = data[1]
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
					}else {
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
  							}else {
  								alert(res.data.msg)
  							}
  						})
						}else {
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
						}
					}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public.styl'
.schedule
	position: relative	
	transition: all 0.3s
	background-size: cover
	background-attachment: fixed
	&:hover
		.addList
			opacity: 1
		.title
			.iconfont
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
		// margin-bottom: $marginb
		position: relative
		.addbtn
			text-align: center
			span
				background: $addbtnbg
				padding: $addbtnpadding
				border-radius: $addbtnradius
				font-size: $addbtnfontsize
				color: $addbtncolor
				cursor: pointer
		.iconfont
			position: absolute
			right: 10px
			top: 5px
			width: $iconwidth
			height: $iconheight
			border-radius: $iconradius
			background: $iconbg
			color: $iconcolor
			font-size: $iconfontsize
			text-align: center
			cursor: pointer
			opacity: 0
			transition: all .3s
		h2
			// color: $textColor
			font-size: $fontsize1
			opacity: 0
			>>> .ql-editor
				padding: 0
				font-size: $fontsize1
		p
			// color: $textColor
			opacity: 0
			font-size: $fontsize2
			>>> .ql-editor
				padding: 0
				font-size: $fontsize2
		.animated
			opacity: 1
	.container
		position: relative
		z-index: 10
		ul
			margin-top: $marginb
		.list
			width: 100%
			height: auto
			margin: 0 auto 20px
			min-height: 170px
			float: none
			transition: all .3s
			margin-top:10px
			position: relative
			&:hover
				.btnList
					opacity: 1
			.inner
				display: flex
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
			.order
				display: flex
				flex-direction: column
				justify-content: center
				background: #f2f2f2
				float: left
				height: 84px
				width: 84px
				text-align: center
				margin-right: 15px
				opacity: 0
				>>> strong
					font-size: 25px
					font-weight: 500
				>>> span
					font-size: 14px
			.text
				float: left	
				flex: 9
				height:auto
				opacity: 0
				h3
					margin-top: 5px
					display: inline-block
					margin: 0
					font-size: 18px
					font-weight: 500
					cursor: pointer
					&:hover
						color: #ff6637
					>>> .ql-editor
						padding: 0
						font-weight: 500
						font-size: 18px
						color: #666
				h4
					// color: $textColor
					font-size: $fontsize4
					>>> .ql-editor
						padding: 0
						font-size: $fontsize4
				p
					margin-top: 4px
					margin-bottom: 0
					font-size: 14px
					color: #737373
					line-height: 24px
					>>> .ql-editor
						padding: 0
						font-size: 14px
						color: inherit
						line-height: inherit
			.animated
				opacity: 1
		.layout1
			width: 47%
			display: inline-block
		.layout2
			width: 33.333333%
			display: inline-block
		.layout4
			width: 50%
			float: left
			padding: 0 30px
			min-height: 190px
			&:nth-child(2n)
				border-left: 2px solid #ccc
			.order
				display: none
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
		h2
			color: $fontColor
		p
			color: $fontColor
	.container
		.list
			.text
				h3
					color: $fontColor
				h4
					color: $fontColor
				p
					color: $fontColor
.bgTwo
	background-color: $modelBg03
	.title
		color: $textColor
		h2
			color: $textColor
	.container
		color: $textColor
		.order
			border-color: $textColor !important
		.text
			color: $textColor
			h4
				color: $textColor
			p
				color: $textColor
.bgThree
	background-color: $modelBg01	
	.title
		h2
			color: $fontColor
		p
			color: $fontColor	
</style>