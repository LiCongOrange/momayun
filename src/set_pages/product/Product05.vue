<template>
	<div class="grid" ref="site07" :class="modelInfo.bgClass">
		<fn-assembly
			:btnChoice="btnChoice"
			:zLayout="zLayout"
			:zLetter="zLetter"
			:zBg="zBg"
			:bgColorNum="bgColorNum"
			@getDataLayout="getDataLayout"
			@getDataBg="getDataBg"
			v-if="allEditToggle"
		></fn-assembly>
		<div class="container" :class="{ width96: allEditToggle }">
			<div v-if="allEditToggle" class="title">
				<h2 @click="getIndex('t')" :style="{ opacity: opacityNum }">
					<fn-editor :content="modelInfo.modularName" :type1="3" :type2="1" :lmid="pid"></fn-editor>
				</h2>
				<p @click="getIndex('c')" :style="{ opacity: opacityNum }">
					<fn-editor :content="modelInfo.modularNameLetter" :type1="3" :type2="2" :lmid="pid"></fn-editor>
				</p>
			</div>
			<div class="title" v-else>
				<h2 v-if="modelInfo.modularName" v-html="modelInfo.modularName" :class="{animated: isanimated1, fadeInLeft: isfade1}"></h2>
				<p v-if="modelInfo.modularNameLetter" v-html="modelInfo.modularNameLetter" :class="{animated: isanimated1, fadeInRight: isfade1}"></p>
			</div>
			<div class="row" :class="{animated: isanimated2, fadeInUp: isfade2}" :style="{ opacity: opacityNum }">
				<draggable v-model="modelInfo.productList" :options="{animation: 300, handle: '.list-complete-item'}" v-if="allEditToggle">
					<transition-group name="list-complete" tag="ul">
						<li 
							class="rowList"
							v-for="(ite, index) in modelInfo.productList"
							:class="modelInfo.layoutClass"
							@click="quTu(index, ite.picurl, ite.pid)"
							:key="index"
						>
							<div class="btnWrap">
        				<i class="iconfont" title="删除？" @click="deleteLi(0, index, ite.pid)">&#xe6e9;</i>
        				<i class="iconfont move" title="排序请拖动">&#xe653;</i>
        			</div>
							<div class="img">
								<img :src="ite.picurl" />
								<up-img
	            		v-if="allEditToggle"
									:postImg="textImg"
									@getImg="getImg"
	            	></up-img>
							</div>
							<div class="text">
								<h4 @click="getIndex(index, 't1')">
									<fn-editor :content="ite.title" :type1="3" :type2="3" :lmid="pid" :sonid="ite.pid"></fn-editor>
								</h4>
								<h6 class="color" @click="getIndex(index, 'c1')">
									<fn-editor :content="ite.nameFn" :type1="3" :type2="4" :lmid="pid" :sonid="ite.pid"></fn-editor>
								</h6>
								<p class="version" @click="getIndex(index, 'p1')">
									<fn-editor :content="ite.past" :type1="3" :type2="5" :lmid="pid" :sonid="ite.pid"></fn-editor>
								</p>
							</div>
						</li>
					</transition-group>
				</draggable>
				<ul v-else>
					<li 
						class="rowList"
						v-for="item in modelInfo.productList" 
						:class="modelInfo.layoutClass"
					>
						<div class="img"><img :src="item.picurl" /></div>
						<div class="text">
							<h4 v-if="item.title" v-html="item.title" @click="todetailHandel(item)"></h4>
							<h6 v-if="item.nameFn" v-html="item.nameFn"></h6>
							<p class="version" v-if="item.past" v-html="item.past"></p>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="addList" v-if="allEditToggle">
        	<span @click="addList">添加项目</span>
        </div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import upImg from '@/common/UpImg'	
import FnAssembly from '@/common/Assembly'
import FnEditor from '@/common/Editor'
import draggable from 'vuedraggable'
import BtnEditor from '@/common/BtnEditor'
export default {
	props: ['pid'],
	data () {
		return {
			isanimated1: false,
			isfade1: false,
			isanimated2: false,
			isfade2: false,
			opacityNum: 0,
			imgList: [],
			ppid: '',
			widthNum: '420',
			heightNum: '300',
			indexes: '',
			indexes2: '',
			suoyin: '',
			textImg: '',
			modelInfo: '',
			btnChoice: 0,
			isActive: false,
			section: '',
			zBg: ["bgOne", "bgTwo", "bgThree"],
			classLayout: '',
			classBg: '',
			zLetter: 'A',
			znum: null,
			bgColorNum: '',
			zLayout: [{
				"letter": "A",
				"name": ""
			}, {
				"letter": "B",
				"name": "tabLayout1"
			}, {
				"letter": "C",
				"name": "tabLayout2"
			}, {
				"letter": "D",
				"name": "tabLayout3"
			}, {
				"letter": "E",
				"name": "tabLayout4"
			}, {
				"letter": "F",
				"name": "tabLayout5"
			}]
		}
	},
	components: {
		FnAssembly,
		FnEditor,
		upImg,
		draggable,
		BtnEditor
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
      pageToggle: state => state.pageToggle,
			browserToggle: state => state.browserToggle,
      columnList2: state => state.threeStep.columnList2,
      siteId: state => state.threeStep.siteId,
			stepPages: state => state.stepPages,
		})
	},
	mounted() {
		if(!this.pid) {
			for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
				if(this.$store.state.blocks.modeltextList[i].lmid == 'add06') {
					this.modelInfo = this.$store.state.blocks.modeltextList[i]
					this.classLayout = this.$store.state.blocks.modeltextList[i].layoutClass
				}
			}
		}else {
			for(let i=0; i<this.stepPages.product.length; i++) {
				if(this.stepPages.product[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.product[i]
					this.classLayout = this.stepPages.product[i].layoutClass
				}
			}
		}
		if(!this.browserToggle) {
			this.modelInfo.layoutClass = 'tabLayout6'
		}
    this.$nextTick(function(){
      this.handleScroll()
    })
    window.addEventListener('scroll', this.handleScroll)
	},
	watch: {
		classLayout(val) {
			if(val == "") {
				this.zLetter = "A"
			}else if(val == "tabLayout1") {
				this.zLetter = "B"
			}else if(val == "tabLayout2") {
				this.zLetter = "C"
			}else if(val == "tabLayout3") {
				this.zLetter = "D"
			}else if(val == "tabLayout4") {
				this.zLetter = "E"
			}else if(val == "tabLayout5") {
				this.zLetter = "F"
			}
		},
		pid(val) {
			if(!this.pid) {
				for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
					if(this.$store.state.blocks.modeltextList[i].lmid == 'add06') {
						this.modelInfo = this.$store.state.blocks.modeltextList[i]
						this.classLayout = this.$store.state.blocks.modeltextList[i].layoutClass
					}
				}
			}else {
				for(let i=0; i<this.stepPages.product.length; i++) {
					if(this.stepPages.product[i].lmid == this.pid) {
						this.modelInfo = this.stepPages.product[i]
						this.classLayout = this.stepPages.product[i].layoutClass
					}
				}
			}
		}
	},
	methods: {
		todetailHandel(data) {
			let obj = {
				lmid: this.pid,
				type: '3',
				id: data.pid
			}
			this.$store.state.sonPagetoggle = false
			// this.$store.state.sonPagetext = data
			// this.$store.state.sonPagetext = obj
			this.$store.commit('sonPageHandle', obj)
			this.$store.commit('pageIndexHandel', this.columnList2.length-2)
		},
		addbtnHandel(index, ppid) {
		  this.modelInfo.productList[index].btnToggle = true
		  this.$axios({
				method: 'post',
				url: '/api/Senior/savemessage',
				data: {
				  id: ppid,
				  type: 3,
				  text: this.modelInfo.productList[index]
				}
		  }).then((res)=> {
				if(res.data.code == '404') {
				  alert(res.data.msg)
				}
		  })	
		},
		editbtnHandel(index) {
			this.modelInfo.productList[index].maskToggle = true
		},
		getContent(val) {
			if(val == 'false') {
				this.btnEditorToggle2 = false
			}else if(val == 'delete') {
				this.btnEditorToggle2 = false
				this.modelInfo.productList[this.suoyin].btnToggle = false
			  this.$axios({
					method: 'post',
					url: '/api/Senior/savemessage',
					data: {
					  id: this.ppid,
					  type: 3,
					  text: this.modelInfo.productList[this.suoyin]
					}
			  }).then((res)=> {
					if(res.data.code == '404') {
					  alert(res.data.msg)
					}
			  })	
			}else {
				this.btnEditorToggle2 = false
				this.modelInfo.productList[this.suoyin].btnInfo.text = val.text
				this.modelInfo.productList[this.suoyin].btnInfo.link = val.link
			  this.$axios({
					method: 'post',
					url: '/api/Senior/savemessage',
					data: {
					  id: this.ppid,
					  type: 3,
					  text: this.modelInfo.productList[this.suoyin]
					}
			  }).then((res)=> {
					if(res.data.code == '404') {
					  alert(res.data.msg)
					}
			  })
			}
		},
    handleScroll() {
      if(this.allEditToggle) {
      	this.opacityNum = 1
      }else {
      	let htmlT = this.$refs.site07.getBoundingClientRect().top
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
				btnToggle: false,
				btnInfo: {
					text: '了解详情',
					link: '',
					target: '_self'
				},
				title: "<p class='ql-align-center'><span class='ql-font-serif'>新加产品</span></p>",
				nameFn: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(168, 127, 86)'>副文本标语</span></p>",
				past: "<p class='ql-align-center'><span class='ql-font-serif'>我们的使命是解决各种行业的重要问题以及建立社会信任。</span></p>",
				picurl: "/static/images/product/shows/pro02.jpg"
			}
			for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
				if(this.$store.state.stepPages.product[i].lmid == this.pid) {
					// this.$store.state.stepPages.product[i].productList.push(obj)
          this.$axios({
            method: 'post',
            url: '/api/Senior/newcmessage',
            data: {
              wid: this.$store.state.threeStep.siteId,
              type: 3,
              text: obj,
              lmid: this.pid
            }
          }).then((res)=> {
            if(res.data.code == '200') {
              let obj = {
                pid: res.data.data,
								btnToggle: false,
								btnInfo: {
									text: '了解详情',
									link: '',
									target: '_self'
								},
                title: "<p class='ql-align-center'><span class='ql-font-serif'>新加产品</span></p>",
                nameFn: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(168, 127, 86)'>副文本标语</span></p>",
                past: "<p class='ql-align-center'><span class='ql-font-serif'>我们的使命是解决各种行业的重要问题以及建立社会信任。</span></p>",
                picurl: '/static/images/product/shows/pro02.jpg'
              }
              this.$store.state.stepPages.product[i].productList.push(obj)
            }
            if(res.data.code == '404') {
              alert(res.data.msg)
            }
          })
				}
			}
		},
		deleteLi(val, index, ppid) {
      this.$axios({
        method: 'post',
        url: '/api/Senior/delmessage',
        data: {
          id: ppid,
          type: 3
        }
      }).then((res)=> {
      	if(res.data.code == '200') {
      		this.modelInfo.productList.splice(index, 1)
      	}else {
      		alert(res.data.msg)
      	}
      })
		},
		quTu(index, img, id) {
			this.suoyin = index
			this.textImg = img
			this.ppid = id
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
          this.modelInfo.productList[this.suoyin].picurl = res.data.data[0].url
          this.$axios({
            method: 'post',
            url: '/api/Senior/savemessage',
            data: {
              id: this.ppid,
              type: 3,
              text: this.modelInfo.productList[this.suoyin]
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
		getIndex(index, index2) {
			this.indexes = index
			this.indexes2 = index2
		},
		fnEdit(val) {
			for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
				if(this.$store.state.stepPages.product[i].lmid == this.pid) {
					if(this.indexes == 't') {
						this.$store.state.stepPages.product[i].modularName = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemodule',
              data: {
                site_id: this.$store.state.threeStep.siteId,
                lmid: this.pid,
                type: 3,
                module: this.modelInfo
              }
            }).then((res)=> {
              if(res.data.code == '404') {
                alert(res.data.msg)
              }
            })
					}else if(this.indexes == 'c') {
						this.$store.state.stepPages.product[i].modularNameLetter = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemodule',
              data: {
                site_id: this.$store.state.threeStep.siteId,
                lmid: this.pid,
                type: 3,
                module: this.modelInfo
              }
            }).then((res)=> {
              if(res.data.code == '404') {
                alert(res.data.msg)
              }
            })
					}else if(this.indexes2 == 't1') {
						this.$store.state.stepPages.product[i].productList[this.indexes].title = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemessage',
              data: {
                id: this.ppid,
                type: 3,
                text: {
                  title: this.$store.state.stepPages.product[i].productList[this.indexes].title,
                  past: this.$store.state.stepPages.product[i].productList[this.indexes].past,
                  nameFn: this.$store.state.stepPages.product[i].productList[this.indexes].nameFn,
                  picurl: this.$store.state.stepPages.product[i].productList[this.indexes].picurl,
                }
              }
            }).then((res)=> {
              if(res.data.code == '404') {
                alert(res.data.msg)
              }
            })
					}else if(this.indexes2 == 'c1') {
						this.$store.state.stepPages.product[i].productList[this.indexes].nameFn = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemessage',
              data: {
                id: this.ppid,
                type: 3,
                text: {
                  title: this.$store.state.stepPages.product[i].productList[this.indexes].title,
                  past: this.$store.state.stepPages.product[i].productList[this.indexes].past,
                  nameFn: this.$store.state.stepPages.product[i].productList[this.indexes].nameFn,
                  picurl: this.$store.state.stepPages.product[i].productList[this.indexes].picurl,
                }
              }
            }).then((res)=> {
              if(res.data.code == '404') {
                alert(res.data.msg)
              }
            })
					}else if(this.indexes2 == 'p1') {
						this.$store.state.stepPages.product[i].productList[this.indexes].past = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemessage',
              data: {
                id: this.ppid,
                type: 3,
                text: {
                  title: this.$store.state.stepPages.product[i].productList[this.indexes].title,
                  past: this.$store.state.stepPages.product[i].productList[this.indexes].past,
                  nameFn: this.$store.state.stepPages.product[i].productList[this.indexes].nameFn,
                  picurl: this.$store.state.stepPages.product[i].productList[this.indexes].picurl,
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
		getDataLayout(data) {
			this.modelInfo.layoutClass = data[0]
			this.zLetter = data[1]
      this.$axios({
        method: 'post',
        url: '/api/Senior/savemodule',
        data: {
          site_id: this.$store.state.threeStep.siteId,
          lmid: this.pid,
          type: 3,
          module: this.modelInfo
        }
      }).then((res)=> {
        if(res.data.code == '404') {
          // alert(res.data.msg)
        }
      }) 
		},
		getDataBg(data) {
			this.modelInfo.bgClass = data
      this.$axios({
        method: 'post',
        url: '/api/Senior/savemodule',
        data: {
          site_id: this.$store.state.threeStep.siteId,
          lmid: this.pid,
          type: 3,
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
@import '~styles/public.styl'
.grid
	position: relative
	transition: all .3s
	padding: 50px 0
	&:hover
		.addList
			opacity: 1
	.title
		h2
			margin: 0
			opacity: 0
			font-size: $fontsize1
			line-height: 1.42
			>>> .ql-editor
				padding: 1px 3px
				font-size: $fontsize1
		p
			margin: 0
			opacity: 0
			font-size: $fontsize2
			line-height: 1.42
			>>> .ql-editor
				padding: 1px 3px
				font-size: $fontsize2
		.animated
			opacity: 1
	.addList
		padding: 5px
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
	.container
		.row
			margin-top: 15px
			opacity: 0
			ul
				justify-content: center
		.rowList
			width: 50%
			transition: all .3s
			float: none
			display: inline-block
			vertical-align: top
			position: relative
			padding: 0 15px
			&:after
				content: '.'
				display: block
				clear: both
				width: 0
				height: 0
				visibility: hidden
			&:hover
				.btnWrap
					opacity: 1
				.text
					.p-btn
						opacity: 1
			.mask
				position: absolute
				left: 0
				top: 0
				width: 100%
				height: 100%
				background: rgba(0, 0, 0, 0.7)
				z-index: 100
				cursor: move
			.btnWrap
				position: absolute
				right: 5px
				top: 5px
				z-index: 100
				opacity: 0
				transition: all .3s
				i
					display: block
					background: $iconbg
					width: $iconwidth
					height: $iconheight
					margin-bottom: 5px
					border-radius: $iconradius
					color: $iconcolor
					cursor: pointer
					font-size: $iconfontsize
					text-align: center
				.move
					cursor: move
					display: $display
			.img
				width: 100%
				position: relative
				margin: 0 auto
				padding: 7px
				img
					width: 100%
			.text
				padding: 0 15px
				h4
					display: inline-block
					margin-top: 20px
					line-height: 1.6
					font-size: 16px
					cursor: pointer
					&:hover
						color: #ff6637
					>>> .ql-container
						font-weight: bold
						font-size: 16px
						.ql-editor
							padding: 0
							font-weight: normal
							color: #666
				h6
					font-size: $fontsize4
					>>> .ql-editor
						padding: 0
						font-size: $fontsize4
				p
					margin-bottom: 0
					line-height: 1.6
					font-size: 14px
					color: grey
					>>> .ql-editor
						padding: 0
						font-size: 14px
				.p-btn
					opacity: 0
					transition: all .3s
					span
						padding: 5px
						background: #000
						color: #fff
						cursor: pointer
				.p-btn2
					position: relative
					display: inline-block
					left: 50%
					transform: translateX(-50%)
					padding: 5px
					&:hover
						.mask
							opacity: 1
					.mask
						position: absolute
						left: 0
						top: 0
						width: 100%
						height: 100%
						background: rgba(0, 0, 0, 0.7)
						text-align: center
						line-height: 30px
						opacity: 0
						transition: all .3s
						span
							display: flex
							align-items: center
							justify-content: center
							color: #fff
							cursor: pointer		
		.tabLayout1
			width: 33.333%
		.tabLayout2
			width: 25%
			margin-bottom: 15px
		.tabLayout3
			width: 20%
		.tabLayout4
			width: 14.285%
		.tabLayout5
			width: 100%
			.img
				max-width: inherit
				text-align: center
				img
					max-height: 450px
					width: auto
					max-width: 100%
		.tabLayout6
			width: 100%
			padding: 0 15px
			.img
				max-width: inherit
				text-align: center
				img
					max-height: 450px		
		.col-xs-12
			padding: 20px
		.animated
			opacity: 1
	.width96
		width: 96%
		max-width: 1170px
.bgOne
	background: $modelBg02
.bgTwo
	background: $modelBg03
	.title
		h2
			color: #fff
			.ql-editor
				color: #fff
	.container
		.rowList
			.text
				h4
					color: #fff
					.ql-editor
						color: #fff
				p.version
					color: #fff
					.ql-editor
						color: #fff
.bgThree
	background: $modelBg01		
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