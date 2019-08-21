<template>
	<div class="introduce" ref="introduce" :class="modelInfo.bgClass">
		<fn-assembly 
			:btnChoice="btnChoice"
			:zLetter="zLetter" 
			:zLayout="zLayout"
			:zBg="zBg"
			:bgColorNum="bgColorNum"
			@getDataBg="getDataBg"
			@getDataLayout="getDataLayout"
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
				<h2 v-html="modelInfo.modularName" :class="{animated: isanimated1, bounceInUp: isfade1}"></h2>
				<p v-html="modelInfo.modularNameLetter" :class="{animated: isanimated1, bounceInUp: isfade1}"></p>
			</div>

        <draggable v-model="modelInfo.productList" :options="{animation: 300, handle: '.list-complete-item'}" v-if="allEditToggle">
        	<transition-group name="list-complete" tag="ul">
						<li 
							class="col-xs-12 list" 
							:class="modelInfo.layoutClass" 
							v-for="(item, index) in modelInfo.productList"
							@click="quTu(index, item.picurl, item.pid)"
							:key="item.pid"
						>
							<div class="btnList">
								<button title="删除？" class="iconfont btn btn-default" @click="deleteLi(index, item.pid)">&#xe6e9;</button>
								<button title="排序请拖动" class="iconfont btn btn-default list-complete-item">&#xe653;</button>
							</div>
							<div class="listText" :style="{ opacity: opacityNum }">
								<div>
									<h3 @click="getIndex(index, 't1')">
										<fn-editor :content="item.title" :type1="3" :type2="3" :lmid="pid" :sonid="item.pid"></fn-editor>
									</h3>
									<p @click="getIndex(index, 'c1')">
										<fn-editor :content="item.past" :type1="3" :type2="5" :lmid="pid" :sonid="item.pid"></fn-editor>
									</p>
								</div>
							</div>
							<div class="listImg" :style="{ opacity: opacityNum }">
								<img :src="item.picurl">
								<up-img
		        			v-if="allEditToggle"
									:postImg="textImg"
									:widthNum="widthNum"
									:heightNum="heightNum"
									@getImg="getImg"
		        		></up-img>
							</div>
						</li>
        	</transition-group>
        </draggable>

			<ul v-else>
				<li 
					class="col-xs-12 list" 
					:class="modelInfo.layoutClass" 
					v-for="item in modelInfo.productList"
				>
					<div class="listText" :class="{animated: isanimated2, bounceInRight: isfade2}">
						<h3 v-html="item.title"></h3>
          	<p v-html="item.past"></p>
					</div>
					<div class="listImg" :class="{animated: isanimated2, bounceInLeft: isfade2}">
						<img :src="item.picurl">
					</div>
				</li>
			</ul>
		</div>
		<div class="addList" v-if="allEditToggle">
			<span @click="addlistHandel">添加产品</span>
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
			cid: '',
			imgList: [],
			widthNum: '420',
			heightNum: '300',
			btnChoice: 0,
			indexes: '',
			indexes2: '',
			suoyin: '',
			textImg: '',
			screenWidth: document.body.clientWidth,
			modelInfo: '',
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
			bgColorNum: '',
			section: '',
			classBg: '',
			zLetter: 'A',
			layoutNum: '',
			classLayout: '',
			bgNum: '',
			zBg: ["bgOne", "bgTwo", "bgThree"]
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
		for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
			if(this.$store.state.stepPages.product[i].lmid == this.pid) {
				this.modelInfo = this.$store.state.stepPages.product[i]
        this.classLayout = this.$store.state.stepPages.product[i].layoutClass
			}
		}
		this.$nextTick(function(){
	    if(!this.browserToggle) {
	      this.modelInfo.layoutClass = 'layout0'
	    }
	    this.handleScroll()
		})
		window.addEventListener('scroll', this.handleScroll)
	},
	methods: {
    handleScroll() {
      if(this.allEditToggle) {
      	this.opacityNum = 1
      }else {
      	let htmlT = this.$refs.introduce.getBoundingClientRect().top
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
		        "nameFn": "",
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
			                nameFn: '',
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
					if(this.indexes2 == 't1') {
						this.$store.state.stepPages.product[i].productList[this.indexes].title = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemessage',
              data: {
                id: this.cid,
                type: 3,
                text: {
                  title: this.$store.state.stepPages.product[i].productList[this.indexes].title,
                  past: this.$store.state.stepPages.product[i].productList[this.indexes].past,
                  nameFn: '',
                  picurl: this.$store.state.stepPages.product[i].productList[this.indexes].picurl,
                }
              }
            }).then((res)=> {
              if(res.data.code == '404') {
                alert(res.data.msg)
              }
            })
					}else if(this.indexes2 == 'c1') {
						this.$store.state.stepPages.product[i].productList[this.indexes].past = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemessage',
              data: {
                id: this.cid,
                type: 3,
                text: {
                  title: this.$store.state.stepPages.product[i].productList[this.indexes].title,
                  past: this.$store.state.stepPages.product[i].productList[this.indexes].past,
                  nameFn: '',
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
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.introduce
	position: relative
	transition: all 0.5s
	padding-top: 50px
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
	.sumBtn
		position: absolute
		right: 10px
		top: 10px
		div
			position: static
			float: left
			.dropdown-menu
				width: 120px
				float: right
				left: auto
	.container
		.title
			margin-bottom: $marginb
			h2
				font-size: $fontsize1
				color: $fontColor
				border: 1px solid rgba(255, 255, 255, 0)
				transition: all 0.3s
				margin-bottom:0
				opacity: 0
				>>> .ql-editor
					font-size: $fontsize1
					color: $fontColor
					padding: 0
			p
				font-size: $fontsize2
				color: 	$gridColor
				line-height:30px
				opacity: 0
				>>> .ql-editor
					padding: 0
					font-size: $fontsize2
			.animated
				opacity: 1
		.list
			transition: all .3s
			margin-bottom:30px
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
					width: $iconwidth
					height: $iconheight
					display: block
					padding: 0
					border: none
					border-radius: $iconradius
					background: $iconbg
					margin-bottom: 5px
					color: $iconcolor
					font-size: $iconfontsize
					&:nth-of-type(2)
						cursor: move
						display: $display
			.listText
				width: 60%
				float: left
				padding: 2% 50px 0
				position:absolute
				opacity: 0
 				h3
					color: $fontColor
					font-size: $fontsize3
					>>> .ql-editor
						padding: 0
						font-size: $fontsize3
						color: $fontColor
				p
					font-size: $fontsize5
					>>> .ql-editor
						padding: 0
						font-size: $fontsize5
			.listImg
				position: relative
				width: 50%
				float: right
				margin-bottom: 10px
				text-align: center
				height:260px
				opacity: 0
				img
					width: 100%
					height: 100%
					opacity:.5
		.phoneclass
			.listText
				width: 100% !important
				float: none !important
				position: initial !important
				text-align: center
			.listImg
				width: 100%
				position: initial !important
				float: none
		.layout0
			.listText
				width: auto !important
				float: none !important
			.listImg
				width: auto
				float: none
		.animated
			opacity: 1 !important
	.width96
		width: 96%
		max-width: 1170px
.introduce
	.container
		.layout1
			margin-bottom: 15px
			&:nth-child(even)
				.listText
					float: right
					right:0
					text-align:right
					>>> .ql-editor
						text-align:right
				.listImg
					float: left
					margin-bottom: 0px
			&:nth-child(odd)
				.listText
					float: right
				.listImg
					float: right
					margin-bottom: 0px
		.layout2
			&:nth-child(even)
				.listText
					float: right
				.listImg
					float: right
			&:nth-child(odd)
				.listText
					float: right
				.listImg
					float: right
		.layout3
			&:nth-child(even)
				.listText
					float: right
					right:0
				.listImg
					float: left
			&:nth-child(odd)
				.listText
					float: right
					right:0
				.listImg
					float: left						
.bgOne
	background: $modelBg02
.bgTwo
	background: $modelBg03
	.list
		.listText
			h3
				color: $textColor
				>>> .ql-editor
					color: #fff
	.container
		color: $textColor
		.row
			color: #fff
			.text
				color: $textColor
				h3
					color: $textColor
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