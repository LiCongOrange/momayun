<template>
    <div class="productType" ref="productType" :class="modelInfo.bgClass">
    	<fn-assembly
    		:zLetter="zLetter"
    		:zLayout="zLayout"
    		:btnChoice="btnChoice"
    		:zBg="zBg"
    		:bgColorNum="bgColorNum"
    		@getDataLayout="getDataLayout"
    		@getDataBg="getDataBg"
			v-if="allEditToggle"
    	></fn-assembly>
        <div class="container" :class="{ width96: allEditToggle }">
	    	<div class="title" v-if="allEditToggle">
	    		<h2 @click="getIndex('t')" :style="{ opacity: opacityNum }">
	    			<fn-editor :content="modelInfo.modularName" :type1="3" :type2="1" :lmid="pid"></fn-editor>
	    		</h2>
	    		<p @click="getIndex('c')" :style="{ opacity: opacityNum }">
	    			<fn-editor :content="modelInfo.modularNameLetter" :type1="3" :type2="2" :lmid="pid"></fn-editor>
	    		</p>
	    	</div>
	    	<div class="title" v-else>
	    		<h2 v-html="modelInfo.modularName" :class="{animated: isanimated1, fadeInLeft: isfade1}"></h2>
	    		<p v-html="modelInfo.modularNameLetter" :class="{animated: isanimated1, fadeInLeft: isfade1}"></p>
	    	</div>
            <div class="row">

            	<draggable v-model="modelInfo.productList" :options="{animation: 300, handle: '.list-complete-item'}" v-if="allEditToggle">
            		<transition-group name="list-complete" tag="ul">
	           			<li 
	            			class="col-xs-12 col-sm-6 col-md-4 list"
	            			:class="modelInfo.layoutClass"
	            			v-for="(ite, index) in modelInfo.productList"
	            			:key="ite.pid"
	            			@click="quTu(index, ite.picurl, ite.pid)"
	            		>
	            			<div class="mask" v-if="maskToggle"></div>
	            			<div class="btnList">
	            				<button 
	            					data-toggle="tooltip" 
	            					data-placement="auto left" 
	            					title="删除？" 
	            					class="iconfont btn btn-default"
	            					@click="deleteLi(index, ite.pid)"
	            				>&#xe6e9;</button>
	            				<button 
	            					class="iconfont btn btn-default list-complete-item"
	            					@mousedown="moveHandel('01')"
	            					@mouseup="moveHandel('02')"
	            					@mouseout="moveHandel('02')"
	            					title="排序请拖动" 
	            				>&#xe653;</button>
	            			</div>
	            			<div class="img" :style="{ opacity: opacityNum }">
	            				<img :src="ite.picurl">
	            				<up-img
	            					v-if="allEditToggle"
												:postImg="textImg"
												:widthNum="widthNum"
												:heightNum="heightNum"
												@getImg="getImg"
	            				></up-img>
	            			</div>
                    <div class="text" :style="{ opacity: opacityNum }">
                    	<h3 @click="getIndex(index, 't1')">
                    		<fn-editor :content="ite.title" :type1="3" :type2="3" :lmid="pid" :sonid="ite.pid"></fn-editor>
                    	</h3>
                    	<h6 @click="getIndex(index, 'c1')">
                    		<fn-editor :content="ite.nameFn" :type1="3" :type2="4" :lmid="pid" :sonid="ite.pid"></fn-editor>
                    	</h6>
                    	<p @click="getIndex(index, 'p1')">
                    		<fn-editor :content="ite.past" :type1="3" :type2="5" :lmid="pid" :sonid="ite.pid"></fn-editor>
                    	</p>
                    </div>
	            		</li>
            		</transition-group>
            	</draggable>

            	<ul v-else>
            		<li 
            			class="col-xs-12 col-sm-6 col-md-4 list"
            			:class="modelInfo.layoutClass"
            			v-for="item in modelInfo.productList"
            			:key="item.id"
            		>
            			<div class="img" :class="{animated: isanimated2, fadeInLeft: isfade2}">
            				<img :src="item.picurl">
            			</div>
                  <div class="text":class="{animated: isanimated2, fadeInRight: isfade2}">
                  	<h3 v-html="item.title"></h3>
                  	<h6 v-html="item.nameFn"></h6>
                  	<p v-html="item.past"></p>
                  </div>
            		</li>
            	</ul>
            </div>

        	<div class="addList" v-if="allEditToggle">
        		<span @click="addlistHandel">添加产品</span>
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
	data() {
		return {
      isanimated1: false,
      isfade1: false,
      isanimated2: false,
      isfade2: false,
			opacityNum: 0,
			imgList: [],
			maskToggle: false,
			widthNum: '420',
			heightNum: '300',
			textImg: '',
			suoyin: '',
			cid: '',
			indexes: '',
			indexes2: '',
			modelInfo: '',
			btnChoice: 0,
			zLayout: [{
				"letter": "A",
				"name": "layout1"
			}, {
				"letter": "B",
				"name": "layout2"
			}, {
				"letter": "C",
				"name": "layout3"
			}],
			zBg: ["bgOne", "bgTwo", "bgThree"],
			section: '',
			classLayout: 'layout2',
			zLetter: 'A',
			layoutNum: '',
			bgColorNum: '',
			classBg: '',
			screenWidth: document.body.clientWidth
		}
	},
	components: {
		FnAssembly,
		FnEditor,
		upImg,
		draggable
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			browserToggle: state => state.browserToggle
		})
	},
	mounted() {
		$(function() {$("[data-toggle='tooltip']").tooltip()})
    for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
      if(this.$store.state.stepPages.product[i].lmid == this.pid) {
        this.modelInfo = this.$store.state.stepPages.product[i]
        this.classLayout = this.$store.state.stepPages.product[i].layoutClass
      }
    }
    if(!this.browserToggle) {
      this.modelInfo.layoutClass = ''
    }
    window.addEventListener('scroll', this.handleScroll)
    this.$nextTick(function() {
      this.handleScroll()
    })
	},
	methods: {
    handleScroll() {
      if(this.allEditToggle) {
      	this.opacityNum = 1
      }else {
      	let htmlT = this.$refs.productType.getBoundingClientRect().top
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
				"title": "新加产品",
		        "past": "我们的使命是解决各种行业的重要问题以及建立社会信任。这是我们在提供专业服务及作出商业决定时的重中之重。",
		        "nameFn": "Facial Products",
		        "picurl": "/static/images/product/shows/pro01.jpg"
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
			                title: '新加产品',
			                nameFn: 'Facial Products',
			                past: '我们的使命是解决各种行业的重要问题以及建立社会信任。这是我们在提供专业服务及作出商业决定时的重中之重。',
			                picurl: '/static/images/product/shows/pro01.jpg'
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
		deleteLi(index, pid) {
      this.$axios({
        method: 'post',
        url: '/api/Senior/delmessage',
        data: {
          id: pid,
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
		moveHandel(type) {
			if(type == '01') {
				this.maskToggle = true
			}else {
				this.maskToggle = false
			}
		},
		quTu(index, img, pid) {
			this.suoyin = index
			this.textImg = img
			this.cid = pid
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
		                  id: this.cid,
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
			                id: this.cid,
			                type: 3,
			                text: {
			                  title: this.$store.state.stepPages.product[i].productList[this.indexes].title,
			                  nameFn: this.$store.state.stepPages.product[i].productList[this.indexes].nameFn,
			                  past: this.$store.state.stepPages.product[i].productList[this.indexes].past,
			                  picurl: this.$store.state.stepPages.product[i].productList[this.indexes].picurl
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
			                id: this.cid,
			                type: 3,
			                text: {
			                  title: this.$store.state.stepPages.product[i].productList[this.indexes].title,
			                  nameFn: this.$store.state.stepPages.product[i].productList[this.indexes].nameFn,
			                  past: this.$store.state.stepPages.product[i].productList[this.indexes].past,
			                  picurl: this.$store.state.stepPages.product[i].productList[this.indexes].picurl
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
			                id: this.cid,
			                type: 3,
			                text: {
			                  title: this.$store.state.stepPages.product[i].productList[this.indexes].title,
			                  nameFn: this.$store.state.stepPages.product[i].productList[this.indexes].nameFn,
			                  past: this.$store.state.stepPages.product[i].productList[this.indexes].past,
			                  picurl: this.$store.state.stepPages.product[i].productList[this.indexes].picurl
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
			this.zLetter = data[1]
					this.modelInfo.layoutClass = data[0]
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
	updated() {
		window.screenWidth = document.body.clientWidth
		this.screenWidth = window.screenWidth
		if(this.screenWidth <= 768) {
			this.classLayout = "layout0"
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.productType
	position: relative
	transition: all 0.5s
	padding: 50px 0
	&:hover
		.container
			.addList
				opacity: 1
	.title
		margin-bottom:$marginbottom
		h2
			font-size: $fontsize1
			color: $fontColor
			margin: 0
			margin-bottom:10px
			opacity: 0
			>>> .ql-editor
				padding: 0
				font-size: $fontsize1
		p
			font-size: $fontsize2
			color: $gridColor
			opacity: 0
			>>> .ql-editor
				padding: 0
				font-size: $fontsize2
		.animated
			opacity: 1
	.container
		.addList
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
		.list
			float: none
			display: inline-block
			&:after
				clear: both
				content: ''
				display: block
			&:hover
				.btnList
					opacity: 1
			.mask
				position: absolute
				left: 0
				top: 0
				width: 100%
				height: 100%
				background: rgba(255, 255, 255, 0)
				z-index: 10
			img
				width: 40%
				padding: 7px
				transition: all 0.3s
			.img
				position: relative
				width: 100%
				opacity: 0
				img
					width: 100%
			.text
				width: 100%
				padding: 0 15px
				transition: all 0.3s
				opacity: 0
				h3
					margin: 0
					line-height: 24px
					font-size: $fontsize3
					>>> .ql-editor
						padding: 0
						font-size: $fontsize3
						color: $fontBlack
				h6
					font-size: $fontsize4
					color: $gridColor
					>>> .ql-editor
						padding: 0
						font-size: $fontsize4
				p
					font-size: $fontsize5
					color: $textColor2
					line-height:25px
					>>> .ql-editor
						font-size: $fontsize5
						padding: 0
			.btnList
				position: absolute
				right: 0
				top: 0
				z-index: 10
				opacity: 0
				transition: all .3s
				button
					display: block
					padding: 0
					width: $iconwidth
					height: $iconheight
					background: $iconbg
					margin-bottom: 5px
					border: none
					border-radius: $iconradius
					color: $iconcolor
					font-size: $iconfontsize
					&:nth-of-type(2)
						cursor: move
						display: $display
		.layout0
			text-align: center
			img
				width: 80%
			.text
				margin: 0 auto
		.layout1
			width: 100%
			float: none
			.img
				width: 24%
				float: left
			.text
				width: 75%
				float: left
				h3
					margin-top: 22px
		.layout2
			float: none
			width: 100%
			.img
				width: 24%
				float: right
			.text
				width: 75%
				float: right
				margin-top: 22px
		.layout3
			float: none
			width: 100%
			&:nth-child(even)
				.img
					width: 24%
					float: left
				.text
					width: 70%
					float: left
					h3
						margin-top: 22px
			&:nth-child(odd)
				.img
					width: 24%
					float: right
				.text
					width: 70%
					float: right
					h3
						margin-top: 22px	
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
		color: $textColor
		h2
			color: $textColor
		p
			color: $textColor
	.container
		color: $textColor
		.row
			color: #fff
			.text
				color: $textColor
				h3
					color: $textColor
					transition: all .3s
					>>> .ql-editor
						color: #fff
				p
					color: $textColor
.bgThree
	background: $modelBg01	
.list-complete-item
	transition: all 1s
.list-complete-enter, .list-complete-active
	opacity: 0
	height: 0
	margin-top: 0
	padding: 0
	border: solid 0
.list-complete-sortable-chosen, .list-complete-sortable-ghost
	opacity: 0
	height: 0
	margin-top: 0
	padding: 0
	border: solid 0
</style>