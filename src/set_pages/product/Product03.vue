<template>
	<div 
		class="productType" 
		ref="site06" 
		:class="[phoneClass, modelInfo.bgClass, {masking: modelInfo.maskingToggle}]" 
		:style="{ backgroundImage: 'url(' + modelInfo.bgImg + ')', padding: modelInfo.updownspace }"
	>
		<fn-assembly
			:zLetter="zLetter"
			:zLayout="zLayout"
			:btnChoice="btnChoice"
			:zBg="zBg"
			:bgColorNum="bgColorNum"
			:updownSpace="modelInfo.updownspace"
			:maskingToggle="modelInfo.maskingToggle"
			@getDataLayout="getDataLayout"
			@getDataBg="getDataBg"
			@getUpdownspace="getUpdownspace"
			@getMasking="getMasking"
			v-if="allEditToggle"
		></fn-assembly>
		<div class="container" :class="[{ width96: allEditToggle }, modelInfo.layoutClass]">
			<div class="title" v-if="allEditToggle">
				<div class="title-inner">
					<h2 @click="getIndex('t')" :style="{ opacity: opacityNum }">
						<fn-editor :content="modelInfo.modularName" :type1="3" :type2="1" :lmid="pid"></fn-editor>
					</h2>
					<p @click="getIndex('c')" :style="{ opacity: opacityNum }">
						<fn-editor :content="modelInfo.modularNameLetter" :type1="3" :type2="2" :lmid="pid"></fn-editor>
					</p>
					<div v-if="modelInfo.btnToggle" class="btnWrap" :style="{ opacity: opacityNum }">
						<el-button type="warning" round @click="topages">{{ modelInfo.btnInfo.text }}</el-button>
						<btn-editor
							v-if="allEditToggle"
							:content="modelInfo.btnInfo"
							@getContent="getContent"
						></btn-editor>
					</div>
					<span class="addBtn" v-else @click="handleaddbtn">添加按钮</span>
				</div>
			</div>
			<div class="title" v-else>
				<div class="title-inner">
					<h2 v-if="modelInfo.modularName" v-html="modelInfo.modularName" :class="{animated: isanimated1, fadeInUp: isfade1}"></h2>
					<p v-if="modelInfo.modularNameLetter" v-html="modelInfo.modularNameLetter" :class="{animated: isanimated1, fadeInUp: isfade1}"></p>
					<div v-if="modelInfo.btnToggle" class="btnWrap" :class="{animated: isanimated1, fadeInUp: isfade1}">
						<el-button  type="warning" round @click="topages">{{ modelInfo.btnInfo.text }}</el-button>
					</div>
					
				</div>
			</div>
			<div class="row" :class="{animated: isanimated2, fadeInRight: isfade2}" :style="{ opacity: opacityNum }">
				<draggable v-model="modelInfo.productList" :options="{animation: 300, handle: '.list-complete-item'}" v-if="allEditToggle">
					<transition-group name="list-complete" tag="ul">
						<li 
							class="list list-complete-item"
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
						</li>
					</transition-group>
				</draggable>
				<div v-else>
				<ul>
					<li 
						class="list"
						v-for="(item, index) in modelInfo.productList"
						:key="index"
					>
						<div class="img"><img :src="item.picurl"></div>
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
			phoneClass: '',
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
			btnChoice: 5,
			zLayout: [{
				"letter": "A",
				"name": "layout1"
			}, {
				"letter": "B",
				"name": "layout2"
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
			this.phoneClass = 'phoneClass'
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
					type: 3,
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
					type: 3,
					module: this.modelInfo
				}
			}).then((res)=> {
				if(res.data.code == '404') {
					alert(res.data.msg)
				}
			})
		},
		topages() {
			let pageindex = ''
			let pagename = ''
			for(let i=0; i<this.columnList2.length; i++) {
				if(this.columnList2[i].id == 332) {
					pageindex = i
					pagename = this.columnList2[i].name
				}
			}
			// this.$store.state.sonPagetoggle = true
			// this.phonenavToggle = false
			this.$store.commit('pageIndexHandel', pageindex)
			this.$store.commit('pageNameHandel', pagename)
  		for(let i=0; i<this.columnList2.length; i++) {
  			this.columnList2[i].checked = false
  		}
  		this.columnList2[pageindex].checked = true
		},
		getContent(val) {
			console.log(val)
			if(val == 'false') {
				this.btnEditorToggle2 = false
			}else if(val == 'delete') {
				this.modelInfo.btnToggle = false
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.siteId,
  					lmid: this.pid,
  					type: 3,
  					module: this.modelInfo
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}else {
				this.modelInfo.btnInfo.link = val.link
				this.modelInfo.btnInfo.text = val.text
				if(val.onOff) {
					this.modelInfo.btnInfo.target = "_blank"
				}else {
					this.modelInfo.btnInfo.target = "_self"
				}
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.siteId,
  					lmid: this.pid,
  					type: 5,
  					module: this.modelInfo
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}
		},
		handleaddbtn() {
			this.modelInfo.btnToggle = true
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
		editbtnHandel(index) {
			this.modelInfo.productList[index].maskToggle = true
		},
		todetailHandel(data) {
			this.$store.state.sonPagetoggle = false
			this.$store.state.sonPagetext = data
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
				title: "",
				nameFn: "",
				past: "",
				picurl: "/static/images/product/shows/pro17.jpg"
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
								title: "",
								nameFn: "",
								past: "",
								picurl: '/static/images/product/shows/pro17.jpg'
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

					if(data[0] == '0') {
						this.modelInfo.bgImg = ''
						this.modelInfo.bgClass = data[1]
	          this.$axios({
	            method: 'post',
	            url: '/api/Senior/savemodule',
	            data: {
	              site_id: this.siteId,
	              lmid: this.pid,
	              type: 3,
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
						  				type: 3,
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
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.productType
	position: relative
	transition: all 0.5s
	padding: 50px 0
	background-position: top
	&:hover
		.addList
			opacity: 1
	.title
		width: 30%
		flex: 1
		display: flex
		flex-direction: column
		justify-content: center
		.title-inner
			width: 80%
			margin: 0 auto
		h2
			margin: 0 0 40px
			opacity: 0
			font-size: 30px
			line-height: 1.62
			color: rgb(255, 102, 55)
			>>> .ql-editor
				padding: 1px 3px
				font-size: 30px
		p
			opacity: 0
			font-size: 14px
			line-height: 1.92
			color: rgb(140, 140, 140)
			>>> .ql-editor
				padding: 1px 3px
				font-size: 14px
				line-height: 1.92
				color: rgb(140, 140, 140)
		.btnWrap
			position: relative
			display: inline-block
			margin-top: 25px
			opacity: 0
		.addBtn
			display: inline-block
			margin-top: 25px
			background: $addbtnbg
			padding: $addbtnpadding
			border-radius: $addbtnradius
			color: $addbtncolor
			font-size: $addbtnfontsize
			cursor: pointer
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
		display: flex
		margin-top: 25px
		.row
			width: 70%
			opacity: 0
			flex: 1
			flex-grow: 1.5
		.list
			width: 47%
			display: inline-block
			position: relative
			vertical-align: top
			margin: 0 15px 15px 0
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
				img
					width: 100%
			.text
				width: 80%
				float: left
				transition: all 0.3s
				padding: 0 10px 0 25px
				h3
					margin: 0 0 8px
					font-size: 16px
					line-height: 1.6
					color: rgb(255, 255, 255)
					>>> .ql-editor
						padding: 0
						font-size: 16px
						color: rgb(255, 255, 255)
				p
					font-size: 13px
					color: rgb(143, 143, 143)
					line-height: 1.6
					>>> .ql-editor
						padding: 0
						font-size: 13px
						color: rgb(143, 143, 143)
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
		.animated
			opacity: 1
	.layout2
		flex-direction: row-reverse
	.width96
		width: 96%
		max-width: 1170px
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
					>>> .ql-editor
						color: #fff
.bgThree
	background-color: $modelBg01	
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
.phoneClass
	.container
		display: block
		.title
			width 100%
		.row
			width 100%
			margin 20px 0 0
			.list
				width 100%
</style>