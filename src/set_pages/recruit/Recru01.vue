<template>
	<div 
		class="recruit" 
		ref="recruit1" 
		:class="[phoneClass, modelInfo.bgClass, { masking: modelInfo.maskingToggle }]" 
		:style="{ backgroundImage: 'url(' + modelInfo.bgImg + ')', padding: modelInfo.updownspace }"
	>
		<fn-assembly
			v-if="allEditToggle"
			:btnChoice="btnChoice"
			:zBg="zBg"
			:zImg="zImg"
			:postImg="modelInfo.bgImg"
			:widthNum="widthNum"
			:heightNum="heightNum"
			:updownSpace="modelInfo.updownspace"
			:maskingToggle="modelInfo.maskingToggle"
			@getDataBg="getDataBg"
			@getUpdownspace="getUpdownspace"
			@getMasking="getMasking"
		></fn-assembly>
		<div class="container" :class="{ width96: allEditToggle }">
			<div class="title">
				<h3 v-if="allEditToggle" :style="{ opacity: opacityNum }">
					<fn-editor :content="modelInfo.modularName" :type1="4" :type2="1" :lmid="pid"></fn-editor>
				</h3>
				<h3 v-else v-html="modelInfo.modularName" :class="{animated: isanimated1, flipInY: isfade1}"></h3>
			</div>
			<div class="content">
<!-- 				<draggable 
					v-model="modelInfo.recruitList" 
					:options="{animation: 300, handle: '.list-complete-item'}" 
					:move="handelIng" @end="handelEnd"
					v-if="allEditToggle"
				>
					<transition-group name="list-complete">
						<div 
							v-for="(ite, index) in modelInfo.recruitList" 
							:key="ite.jid" 
							class="list-complete-item" 
							:class="modelInfo.layoutClass"
							:style="{ opacity: opacityNum }"
						>
							<div class="inner">
								<h5 v-text="ite.title"></h5>
								<h4 v-text="ite.titleFn"></h4>
								<div class="describe" v-html="ite.past"></div>
							</div>
							<div class="mask" v-if="allEditToggle">
								<span @click="toTexteditorHandel('01', ite, index, ite.jid)">编辑</span>
								<span title="删除？" class="del iconfont" @click="toTexteditorHandel('02', ite, index, ite.jid)">&#xe6e9;</span>
							</div>
						</div>
					</transition-group>
				</draggable> -->
				<div class="content-inner" v-if="allEditToggle">
					<div 
						v-for="(item, index) in modelInfo.recruitList" 
						:key="item.jid"
						class="list-complete-item" 
						:class="[{ animated: isanimated2, bounceInUp: isfade2 } ,modelInfo.layoutClass]"
						:style="{ opacity: allEditToggle ? 1 : '' }"
					>
						<div class="btnWrap">
      				<i class="iconfont" title="删除？" @click="deleteLi(0, index, item.jid)">&#xe6e9;</i>
      				<i class="iconfont move" title="排序请拖动">&#xe653;</i>
      			</div>
						<div class="inner">
							<h5>
								<fn-editor :content="item.title" :type1="4" :type2="3" :lmid="pid" :sonid="item.jid"></fn-editor>
							</h5>
							<h4 v-if="item.titleFn">
								<fn-editor :content="item.titleFn" :type1="4" :type2="4" :lmid="pid" :sonid="item.jid"></fn-editor>
							</h4>
							<el-divider></el-divider>
							<div class="describe">
								<fn-editor :content="item.past" :type1="4" :type2="5" :lmid="pid" :sonid="item.jid"></fn-editor>
							</div>
						</div>
					</div>
				</div>
				<div class="content-inner" v-else>
					<div 
						v-for="(item, index) in modelInfo.recruitList" 
						:key="item.jid"
						class="list-complete-item" 
						:class="[{ animated: isanimated2, bounceInUp: isfade2 } ,modelInfo.layoutClass]"
						:style="{ opacity: allEditToggle ? 1 : '' }"
					>
						<div class="inner">
							<h5 v-html="item.title"></h5>
							<h4 v-if="item.titleFn" v-html="item.titleFn"></h4>
							<el-divider></el-divider>
							<div class="describe" v-html="item.past"></div>
						</div>
					</div>
				</div>

			</div>
		</div>
		<fn-texteditor
			v-if="texteditorToggle"
			:content="content"
			@callback="texteditorHandel"
		></fn-texteditor>
    <div class="addList" v-if="allEditToggle">
      <span @click="addListHandel">添加职位</span>
      <!-- <button @click='add' class="zoomInUp">点点击点击点击点击点击击</button> -->
    </div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import FnAssembly from '@/common/Assembly'
import FnEditor from '@/common/Editor'
import FnTexteditor from '@/common/TextEditor'
import draggable from 'vuedraggable'
export default {
	props: ['pid'],
	components: {
		FnAssembly,
		FnEditor,
		FnTexteditor,
		draggable
	},
	data() {
		return {
			phoneClass: '',
			isanimated1: false,
			isfade1: false,
			isanimated2: false,
			isfade2: false,
			widthNum: '1920',
			heightNum: '800',
			opacityNum: 0,
			imgList: [],
			jid: '',
			indexes: '',
			content: '',
			texteditorToggle: false,
			btnChoice: 4,
			modelInfo: '',
			classLayout: 'layout1',
			classBg: 'imgTwo',
			zLetter: 'C',
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
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			zImg: state => state.stepPages.bannerList,
			browserToggle: state => state.browserToggle,
      siteId: state => state.threeStep.siteId
		})
	},
	mounted() {
		for(let i=0; i<this.$store.state.stepPages.recruit.length; i++) {
			if(this.$store.state.stepPages.recruit[i].lmid == this.pid) {
				this.modelInfo = this.$store.state.stepPages.recruit[i]
			}
		}
    if(!this.browserToggle) {
      this.modelInfo.layoutClass = ''
      this.phoneClass = 'phoneClass'
    }
    this.$nextTick(function(){
      this.handleScroll()
    })
    window.addEventListener('scroll', this.handleScroll)
	},
	methods: {
		deleteLi(val, index, jid) {
      this.$axios({
        method: 'post',
        url: '/api/Senior/delmessage',
        data: {
          id: jid,
          type: 4
        }
      }).then((res)=> {
      	if(res.data.code == '200') {
      		this.modelInfo.recruitList.splice(index, 1)
      		this.$message({
      			type: 'success',
      			message: res.data.msg
      		})
      	}else {
      		this.$message({
      			type: 'error',
      			message: res.data.msg
      		})
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
					type: 4,
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
					type: 4,
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
      	let htmlT = this.$refs.recruit1.getBoundingClientRect().top
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
		handelIng() {   // 拖拽中
			// alert(1)
		},
		handelEnd() {   // 拖拽结束
			// this.$axios({
			// 	method: 'post',
			// 	url: '/api/Senior/savemodule',
			// 	data: {
			// 		site_id: this.$store.state.threeStep.siteId,
			// 		lmid: this.pid,
			// 		type: 4,
			// 		module: this.modelInfo
			// 	}
			// }).then((res)=> {
			// 	if(res.data.code == '404') {
			// 		alert(res.data.msg)
			// 	}
			// })
		},
		addListHandel() {
			let obj = {
				title: '行政运营',
				titleFn: '客服（成都）',
				jobyaoqiu: [
					'做过工作流相关项目',
					'涉及spring、dubbo，金融项目经验',
					'有财务、税务相关经验',
					'电商项目经验丰富',
					'学历统本，学信可查'
				]
			}
			this.$axios({
				method: 'post',
				url: '/api/Senior/newcmessage',
				data: {
					wid: this.siteId,
          type: 4,
          text: obj,
          lmid: this.pid
				}
			}).then((res)=> {
				if(res.data.code == '200') {
					let obj = {
						jid: res.data.data,
						title: '行政运营',
						titleFn: '客服（成都）',
						past: [
							'做过工作流相关项目',
							'涉及spring、dubbo，金融项目经验',
							'有财务、税务相关经验',
							'电商项目经验丰富',
							'学历统本，学信可查'
						]
					}
					this.modelInfo.recruitList.push(obj)
					this.$message({
						type: 'success',
						message: res.data.msg
					})
				}else {
					this.$message({
						type: 'error',
						message: res.data.msg
					})
				}
			})
		},
		texteditorHandel(val) {
			if(val[0] == '0') {
				this.texteditorToggle = false
			}else if(val[0] == '1') {
				this.texteditorToggle = false
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemessage',
					data: {
						id: this.jid,
						type: 4,
						text: {
							jid: this.content.jid,
							jobyaoqiu: this.content.past,
							title: this.content.title,
							titleFn: this.content.titleFn
						}
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}
		},
		toTexteditorHandel(type, val, index, id) {
			this.jid = id
			if(type == '01') {
				this.indexes = index
				this.content = val
				this.texteditorToggle = true
			}else if(type == '02') {
				for(let i=0; i<this.$store.state.stepPages.recruit.length; i++) {
					if(this.$store.state.stepPages.recruit[i].lmid == this.pid) {
						for(let j=0; j<this.$store.state.stepPages.recruit[i].recruitList.length; j++) {
							if(this.$store.state.stepPages.recruit[i].recruitList[j].jid == id) {
								this.$axios({
									method: 'post',
									url: '/api/Senior/delmessage',
									data: {
										id: id,
										type: 4
									}
								}).then((res)=> {
									if(res.data.code == '200') {
										this.$store.state.stepPages.recruit[i].recruitList.splice(j, 1)
									}else {
										alert(res.data.msg)
									}
								})
							}
						}
					}
				}
			}
		},
		fnEdit(val) {
			this.modelInfo.modularName = val
					this.$axios({
						method: 'post',
						url: '/api/Senior/savemodule',
						data: {
							site_id: this.siteId,
              lmid: this.pid,
              type: 4,
              module: this.modelInfo
						}
					}).then((res)=> {
						if(res.data.code == '404') {
							alert(res.data.msg)
						}
					})
		},
		getDataLayout(val) {
			// this.classLayout = val
			for(let i=0; i<this.$store.state.stepPages.recruit.length; i++) {
				if(this.$store.state.stepPages.recruit[i].lmid == this.pid) {
					this.zLetter = val[1]
					this.$store.state.stepPages.recruit[i].layoutClass = val[0]
          this.$axios({
            method: 'post',
            url: '/api/Senior/savemodule',
            data: {
              site_id: this.siteId,
              lmid: this.pid,
              type: 4,
              module: this.modelInfo
            }
          }).then((res)=> {
          	if(res.data.code == '200') {
          		this.$store.state.stepPages.recruit[i].layoutClass = val[0]
          	}else {
          		alert(res.data.msg)
          	}
          })
				}
			}
		},
		getDataBg(data) {
			// console.log(data)
			this.classBg = data
			for(let i=0; i<this.$store.state.stepPages.recruit.length; i++) {
				if(this.$store.state.stepPages.recruit[i].lmid == this.pid) {
					if(data[0] == '0') {
						this.$store.state.stepPages.recruit[i].bgImg = ''
						this.$store.state.stepPages.recruit[i].bgClass = data[1]
  					this.$axios({
  						method: 'post',
  						url: '/api/Senior/savemodule',
  						data: {
  							site_id: this.siteId,
  							lmid: this.pid,
  							type: 4,
  							module: this.modelInfo
  						}
  					}).then((res)=> {
  						if(res.data.code == '200') {
  							this.$store.state.stepPages.recruit[i].bgClass = data[1]
  						}else {
  							alert(res.data.msg)
  						}
  					})
					}else {
						this.$store.state.stepPages.recruit[i].bgImg = data[1]
						this.$store.state.stepPages.recruit[i].bgClass = ''
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
  								this.$store.state.stepPages.banner[i].bgImg = res.data.data[0].url
  								this.$axios({
  									method: 'post',
  									url: '/api/Senior/savemodule',
  									data: {
  										site_id: this.siteId,
			  							lmid: this.pid,
			  							type: 4,
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
		  							type: 4,
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
.recruit
	position: relative
	padding: 40px 0
	transition: all .3s
	background-attachment: fixed !important
	background-size: cover
	&:hover
		.addList
			opacity: 1
	>>> .el-divider--horizontal
		margin: 14px 0
	.addList
		padding: 5px 0
		opacity: 0
		text-align: center
		transition: all .3s
		position: relative
		z-index: 1000
		span
			background: $addbtnbg
			padding: $addbtnpadding
			border-radius:$addbtnradius
			font-size:$addbtnfontsize
			color: #fff
			cursor: pointer
	.title
		margin-bottom: $marginb	
		h3
			font-size: $fontsize1
			color: $modelTitlecolor
			margin:0
			opacity: 0
			>>> .ql-editor
				padding: 5px
				font-size: $fontsize1
		.animated
			opacity: 1
	.content
		.content-inner
			column-count: 3
			column-gap: 0
		.list-complete-item
			width: 100%
			padding: 7px
			position: relative
			transition: all .3s
			opacity: 0
			display: inline-block
			&:hover
				.btnWrap
					opacity: 1
				.mask
					opacity: 1
			.inner
				background: rgba(255, 255, 255, 1)
				border: 1px solid #ccc
				padding: 3px 10px
				h5
					color: #2b2b2b
					font-size: 15px
					>>> .ql-editor
						font-size: 15px
						padding: 1px 3px
						color: #2b2b2b
				h4
					color: $modelTitlecolor
					font-size: 24px
					>>> .ql-editor
						padding: 1px 3px
				div.describe
					font-size: 12px
					color: rgb(102, 102, 102)
					>>> p
						margin-bottom: 10px
						line-height: 24px
					>>> .ql-editor
						padding: 1px 3px
						font-size: 12px
						p
							margin-bottom: 10px
							line-height: 24px
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
			.mask
				position: absolute
				left: 0
				top: 0
				width: 100%
				height: 100%
				background: $maskbg
				border: $maskborder
				border-radius: $maskradius
				text-align: center
				opacity: 0
				transition: all .3s
				// cursor: move
				span
					position: absolute
					top: 50%
					left: 50%
					background: $addbtnbg
					padding: $addbtnpadding
					border-radius: $addbtnradius
					color: $iconcolor
					transform: translate(-50%, -50%)
					cursor: pointer
					font-size: $addbtnfontsize
				.del
					background:$iconbg
					width: $iconwidth
					height: $iconheight
					right: 0
					top: 0 
					left: auto
					transform: inherit
					padding: 0
					border-radius: $iconradius
					font-size: $iconfontsize
		// .layout1
		// 	width: 50%
		// 	float: left
		// .layout2
		// 	width: 33.333%
		// 	float: left
		// .layout3
		// 	width: 25%
		// 	float: left
		.animated
			opacity: 1
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
	background: $modelBg02
.bgTwo
	background: $modelBg03
	.title
		h3
			color: #fff
.bgThree
	background: $modelBg01	

.list-complete-item 
	transition: all 1s
.list-complete-enter, list-complete-active 
	opacity: 0
	height: 0
	margin-top: 0
	padding: 0
	border: solid 0px
.list-complete-sortable-chosen,.list-complete-sortable-ghost
	opacity: 0
	height: 0
	margin-top: 0
	padding: 0
	border: solid 0
.phoneClass
	.content
		.content-inner
			column-count: 1
</style>