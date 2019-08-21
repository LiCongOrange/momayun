<template>
	<div class="productType" ref="site06" :class="modelInfo.bgClass" >
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
				<h2 v-if="modelInfo.modularName" v-html="modelInfo.modularName" :class="{animated: isanimated1, fadeInUp: isfade1}"></h2>
				<p v-if="modelInfo.modularNameLetter" v-html="modelInfo.modularNameLetter" :class="{animated: isanimated1, fadeInUp: isfade1}"></p>
			</div>
			<div class="row" :class="{animated: isanimated2, fadeInRight: isfade2}" :style="{ opacity: opacityNum }">
				<draggable v-model="modelInfo.productList" :options="{animation: 300, handle: '.list-complete-item'}" v-if="allEditToggle">
					<transition-group name="list-complete" tag="ul">
						<li 
							class="list list-complete-item"
							:class="modelInfo.layoutClass"
							v-for="(item, index) in modelInfo.productList"
							:key="index"
							@click="quTu(index, item.picurl, item.pid)"
						>
							<div class="btnWrap">
								<i class="iconfont" @click="deleteLi(index, item.pid)">&#xe6e9;</i>
								<i class="iconfont move list-complete-item">&#xe653;</i>
							</div>
							<div class="img">
								<img :src="item.picurl">
								<up-img
									v-if="allEditToggle"
												:postImg="textImg"
												@getImg="getImg"
								></up-img>
							</div>
						  <div class="text">
								<h3 @click="getIndex(index, 't1')">
									<fn-editor :content="item.title" :type1="3" :type2="3" :lmid="pid" :sonid="item.pid"></fn-editor>
								</h3>
								<h6 @click="getIndex(index, 'c1')">
									<fn-editor :content="item.nameFn" :type1="3" :type2="4" :lmid="pid" :sonid="item.pid"></fn-editor>
								</h6>
								<p @click="getIndex(index, 'p1')">
									<fn-editor :content="item.past" :type1="3" :type2="5" :lmid="pid" :sonid="item.pid"></fn-editor>
								</p>
								<div v-if="item.btnToggle" class="p-btn2">
									<button class="btn btn-default">{{item.btnInfo.text}}</button>
									<!-- <div class="mask"><span @click="editbtnHandel(index)">编辑</span></div> -->
									<btn-editor
										v-if="allEditToggle"
										:content="item.btnInfo"
										@getContent="getContent"
									></btn-editor>
								</div>
								<div v-else class="p-btn">
									<div v-if="!pageToggle">
										<span v-if="allEditToggle" @click="addbtnHandel(index, item.pid)">添加按钮</span>
									</div>
								</div>
						  </div>
						</li>
					</transition-group>
				</draggable>
				<div v-else>
				<ul>
					<li 
						class="list"
						:class="modelInfo.layoutClass"
						v-for="(item, index) in modelInfo.productList"
						:key="index"
					>
						<div class="img"><img :src="item.picurl"></div>
					  <div class="text">
							<h3 v-if="item.title" v-html="item.title"></h3>
							<h6 v-if="item.nameFn" v-html="item.nameFn"></h6>
							<p v-if="item.past" v-html="item.past"></p>
							<div class="p-btn2" v-if="item.btnToggle">
								<button class="btn btn-default" @click="todetailHandel(item)">{{item.btnInfo.text}}</button>
							</div>
					  </div>
					</li>
				</ul>
				</div>
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
	data() {
		return {
			btnEditorToggle2: false,
			isanimated1: false,
			isfade1: false,
			isanimated2: false,
			isfade2: false,
			opacityNum: 0,
			opacityToggle: false,
			imgList: [],
			ppid: '',
			widthNum: '420',
			heightNum: '300',
			textImg: '',
			suoyin: '',
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
			}, {
				"letter": "D",
				"name": "layout4"
			}],
			zBg: ["bgOne", "bgTwo", "bgThree"],
			section: '',
			classLayout: 'layout2',
			zLetter: 'A',
			layoutNum: '',
			bgColorNum: '',
			classBg: ''
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
	watch: {
		classLayout(val) {
			if(val == "layout1") {
				this.zLetter = "A"
			}else if(val == "layout2") {
				this.zLetter = "B"
			}else if(val == "layout3") {
				this.zLetter = "C"
			}else if(val == "layout4") {
				this.zLetter = "D"
			}
		},
		pid(val) {
			if(!this.pid) {
				for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
					if(this.$store.state.blocks.modeltextList[i].lmid == 'add05') {
						this.modelInfo = this.$store.state.blocks.modeltextList[i]
						this.classLayout = this.$store.state.blocks.modeltextList[i].layoutClass
					}
				}
			}else {
				for(let i=0; i<this.stepPages.product.length; i++) {
					if(this.stepPages.product[i].lmid == this.pid) {
						this.modelInfo = this.stepPages.product[i]
						this.classBg = this.stepPages.product[i].bgClass
						this.classLayout = this.stepPages.product[i].layoutClass
					}
				}
			}
		}
	},
	mounted() {
		if(!this.pid) {
			for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
				if(this.$store.state.blocks.modeltextList[i].lmid == 'add05') {
					this.modelInfo = this.$store.state.blocks.modeltextList[i]
					this.classLayout = this.$store.state.blocks.modeltextList[i].layoutClass
				}
			}
		}else {
			for(let i=0; i<this.stepPages.product.length; i++) {
				if(this.stepPages.product[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.product[i]
					this.classBg = this.stepPages.product[i].bgClass
					this.classLayout = this.stepPages.product[i].layoutClass
				}
			}
		}
		if(!this.browserToggle) {
			this.modelInfo.layoutClass = 'layout5'
		}
		this.$nextTick(function(){
		  this.handleScroll()
		})
		window.addEventListener('scroll', this.handleScroll)
	},
	methods: {
		editbtnHandel(index) {
			this.modelInfo.productList[index].maskingToggle = true
		},
		todetailHandel(data) {
			this.$store.state.sonPagetoggle = false
			this.$store.state.sonPagetext = data
			this.$store.commit('pageIndexHandel', this.columnList2.length-2)
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
		handleScroll() {
		  if(this.allEditToggle) {
				this.opacityNum = 1
		  }else {
		  	let htmlT = this.$refs.site06.getBoundingClientRect().top
			  if(htmlT <= 660) {
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
				picurl: "/static/images/product/shows/pro01.jpg"
			}
			for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
				if(this.$store.state.stepPages.product[i].lmid == this.pid) {
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
								picurl: '/static/images/product/shows/pro01.jpg'
						  }
						  this.$store.state.stepPages.product[i].productList.push(obj)
						}else {
							alert(res.data.msg)
						}
				  })
				}
			}
		},
		deleteLi(index, ppid) {
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
@import '~styles/public'
.productType
	position: relative
	transition: all 0.5s
	padding: 50px 0
	&:hover
		.addList
			opacity: 1
	.title
		margin-bottom: 30px
		h2
			margin: 0
			opacity: 0
			font-size: $fontsize1
			line-height: 1.42
			>>> .ql-editor
				padding: 1px 3px
				font-size: $fontsize1
		p
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
			opacity: 0
		.list
			position: relative
			&:after
				clear: both
				content: ''
				display: block
			&:hover
				.btnWrap
					opacity: 1
				.text
					.p-btn
						opacity: 1
			img
				width: 40%
				padding: 7px
				transition: all 0.3s
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
					font-size: $iconfontsize
					color: $iconcolor
					cursor: pointer
					text-align: center
				.move
					cursor: move
					display: $display
			.img
				position: relative
				float: left
				width: 40%
				img
					width: 100%
			.text
				width: 60%
				padding: 15px
				transition: all 0.3s
				h3
					font-size: $fontsize3
					line-height: 1.6
					>>> .ql-editor
						padding: 0
						font-size: $fontsize3
						color: $fontBlack
				h6
					font-size: $fontsize4
					>>> .ql-editor
						padding: 0
						font-size: $fontsize4
				p
					font-size: $fontsize5
					color: $fontColor
					line-height: 1.6
					>>> .ql-editor
						padding: 0
						font-size: $fontsize5
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
		.layout0
			text-align: center
			img
				width: 80%
			.text
				margin: 0 auto
		.layout1
			width: 100%
			float: none
			margin-bottom: 30px
			&:last-child
				margin-bottom: 0
			.img
				float: left
			.text
				float: left
		.layout2
			float: none
			width: 100%
			margin-bottom: 30px
			&:last-child
				margin-bottom: 0
			.img
				float: right
			.text
				float: right
		.layout3
			float: none
			width: 100%
			margin-bottom: 30px
			&:last-child
				margin-bottom: 0
			&:nth-child(even)
				.img
					float: left
				.text
					float: left
			&:nth-child(odd)
				.img
					float: right
				.text
					float: right	
		.layout4
			float: none
			width: 50%
			display: inline-block
			.img
				img
					padding: 10px
			.text
				float: right
				h3
					margin-top: 0
		.layout5
			width: 100%
			float: none
			padding: 0 15px
			.img
				width: 100%
				display: inline-block
				vertical-align: top
				text-align: center
				img
					padding: 5px
			.text
				width: 100%
				display: inline-block
				vertical-align: top
				padding: 5px
				text-align: center
				h3
					margin: 5px 0
				h6
					margin: 5px 0
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
	border: solid 0px
.list-complete-sortable-chosen, .list-complete-sortable-ghost
	opacity: 0
	height: 0
	margin-top: 0
	padding: 0
	border: solid 0
</style>