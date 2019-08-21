<template>
	<div 
		class="purt-text" 
		ref="site04" 
		:class="modelInfo.bgClass" 
		:style="{backgroundImage: 'url(' + modelInfo.bgImg + ')', padding: modelInfo.updownspace }"
	>
		<div :class="{ masking: modelInfo.maskingToggle }"></div>
    <fn-assembly 
      :btnChoice="btnChoice"
      :zLetter="zLetter" 
      :zLayout="zLayout"
      :zBg="zBg"
      :zImg="this.zImg"
			:updownSpace="modelInfo.updownspace"
			:maskingToggle="modelInfo.maskingToggle"
			:postbg="modelInfo.bgClass"
			:postImg="modelInfo.bgImg"
			:widthNum="widthNum1"
			:heightNum="heightNum1"
      @getDataBg="getDataBg"
      @getDataLayout="getDataLayout"
			@getMasking="getMasking"
			@getUpdownspace="getUpdownspace"
      v-if="allEditToggle"
    ></fn-assembly>
		<div class="title">
			<p class="addBtn" v-if="modelInfo.titleToggle"><span v-if="allEditToggle" @click="titleClick(0)">添加标题</span></p>
			<div class="titleWrap" v-else>
				<div v-if="allEditToggle" class="container" :class="{ width96: allEditToggle }">
					<i v-if="allEditToggle" class="iconfont" @click="titleClick(1)">&#xe6e9;</i>
					<h3 @click="getIndex('t')" :style="{ opacity: opacityNum }">
						<fn-editor :content="modelInfo.modularName" :type1="4" :type2="1" :lmid="pid"></fn-editor>
					</h3>
					<h6 @click="getIndex('c')" :style="{ opacity: opacityNum }">
						<fn-editor :content="modelInfo.modularNameLetter" :type1="4" :type2="2" :lmid="pid"></fn-editor>
					</h6>
				</div>
				<div v-else>
					<h3 v-if="modelInfo.modularName" v-html="modelInfo.modularName" :class="{animated: isanimated1, fadeInLeft: isfade1}"></h3>
					<h6 v-if="modelInfo.modularNameLetter" v-html="modelInfo.modularNameLetter" :class="{animated: isanimated1, fadeInRight: isfade1}"></h6>
				</div>
			</div>
		</div>
		<div class="container" :class="{ width96: allEditToggle}">
			<div class="row" :class="{animated: isanimated2, fadeInUp: isfade2}" :style="{ opacity: opacityNum }">
				<draggable v-if="allEditToggle" v-model="modelInfo.recruitList" :options="{animation: 300, handle: '.list-complete-item'}">
					<transition-group name="list-complete" tag="ul">
						<li 
							:class="modelInfo.layoutClass"
							class="col-md-4 col-sm-6 col-xs-12 list-complete-item" 
							v-for="(ite, index) in modelInfo.recruitList"
							:key="ite.jid"
							@click="getId(ite.jid)"
						>
							<div class="inner">
								<div class="btnWrap">
									<i class="iconfont" title="删除？" @click="listHandle(0, index, ite.jid)">&#xe6e9;</i>
									<i class="iconfont" title="排序请拖动">&#xe653;</i>
								</div>
								<h3 @click="getIndex(index, 't1')">
									<fn-editor :content="ite.title" :type1="4" :type2="3" :lmid="pid" :sonid="ite.jid"></fn-editor>
								</h3>
								<h6 @click="getIndex(index, 'c1')">
									<fn-editor :content="ite.titleFn" :type1="4" :type2="4" :lmid="pid" :sonid="ite.jid"></fn-editor>
								</h6>
								<p class="list-content" @click="getIndex(index, 'p1')">
									<fn-editor :content="ite.past" :type1="4" :type2="5" :lmid="pid" :sonid="ite.jid"></fn-editor>
								</p>
							</div>
						</li>
					</transition-group>
				</draggable>
				<ul v-else>
					<li 
						:class="modelInfo.layoutClass"
						class="col-md-4 col-sm-6 col-xs-12" 
						v-for="(ite, index) in modelInfo.recruitList"
						:key="ite.jid"
					>
						<div class="inner">
							<h3 v-if="ite.title" v-html="ite.title"></h3>
							<h6 v-if="ite.titleFn" v-html="ite.titleFn"></h6>
							<p v-if="ite.past" class="list-content" v-html="ite.past"></p>
						</div>
					</li>
				</ul>
			</div>
			<div class="addList" v-if="allEditToggle">
				<span @click="listHandle(1)">添加项目</span>
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
	components: {
		FnEditor,
		FnAssembly,
		draggable
	},
	data() {
		return {
			isanimated1: false,
			isfade1: false,
			isanimated2: false,
			isfade2: false,
			opacityNum: 0,
			opacityToggle: false,
			jid: '',
			btnChoice: 5,
			modelInfo: '',
			indexes: '',
			indexes2: '',
			classBg: '',
			zLetter: 'B',
			widthNum1: '1600',
			heightNum1: '900',
			classLayout: 'layout2',
			zBg: ["bgOne", "bgTwo", "bgThree"],
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
      }, {
        "letter": "E",
        "name": "layout5"
      }, {
        "letter": "F",
        "name": "layout6"
      }]
		}
	},
	mounted() {
		if(!this.pid) {
			for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
				if(this.$store.state.blocks.modeltextList[i].lmid == 'add03') {
					this.modelInfo = this.$store.state.blocks.modeltextList[i]
				}
			}
		}else {
			for(let i=0; i<this.stepPages.recruit.length; i++) {
				if(this.stepPages.recruit[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.recruit[i]
					this.classBg = this.stepPages.recruit[i].bgClass
					this.classLayout = this.stepPages.recruit[i].layoutClass
				}
			}
		}
		if(!this.browserToggle) {
			this.modelInfo.layoutClass = 'layout1'
			this.modelInfo.updownspace = '0'
		}
    this.$nextTick(function(){
      this.handleScroll()
    })
    window.addEventListener('scroll', this.handleScroll)

	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			zImg: state => state.stepPages.bannerList,
			browserToggle: state => state.browserToggle,
			stepPages: state => state.stepPages
		})
	},
	watch: {
		classLayout(val) {
			if(val == 'layout1') {
				this.zLetter = 'A'
			}else if(val == 'layout2') {
				this.zLetter = 'B'
			}else if(val == 'layout3') {
				this.zLetter = 'C'
			}else if(val == 'layout4') {
				this.zLetter = 'D'
			}else if(val == 'layout5') {
				this.zLetter = 'E'
			}else if(val == 'layout6') {
				this.zLetter = 'F'
			}
		},
		pid(val) {
			if(!this.pid) {
				for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
					if(this.$store.state.blocks.modeltextList[i].lmid == 'add03') {
						this.modelInfo = this.$store.state.blocks.modeltextList[i]
					}
				}
			}else {
				for(let i=0; i<this.stepPages.recruit.length; i++) {
					if(this.stepPages.recruit[i].lmid == this.pid) {
						this.modelInfo = this.stepPages.recruit[i]
						this.classBg = this.stepPages.recruit[i].bgClass
						this.classLayout = this.stepPages.recruit[i].layoutClass
					}
				}
			}
		}
	},
	methods: {
		getUpdownspace(data) {
			if(data == '无') {
				this.modelInfo.updownspace = '10px 0'
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
					site_id: this.$store.state.threeStep.siteId,
					lmid: this.pid,
					type: 5,
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
					site_id: this.$store.state.threeStep.siteId,
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
      	let htmlT = this.$refs.site04.getBoundingClientRect().top
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
		getDataBg(data) {
			this.classBg = data
  		if(data[0] == '1') {
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
									site_id: this.$store.state.threeStep.siteId,
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
							site_id: this.$store.state.threeStep.siteId,
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
  		}else {
				this.modelInfo.bgImg = ''
				this.modelInfo.bgClass = data[1]
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.$store.state.threeStep.siteId,
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
		},
		getDataLayout(val) {
			this.classLayout = val[0]
			this.modelInfo.layoutClass = val[0]
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemodule',
				data: {
					site_id: this.$store.state.threeStep.siteId,
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
		getId(id) {
			this.jid = id
		},
		getIndex(index, index2) {
			this.indexes = index
			this.indexes2 = index2
		},
		fnEdit(val) {
			if(this.indexes == 't') {
				this.modelInfo.modularName = val
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.$store.state.threeStep.siteId,
						lmid: this.pid,
						type: 4,
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
						site_id: this.$store.state.threeStep.siteId,
						lmid: this.pid,
						type: 4,
						module: this.modelInfo
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}else if(this.indexes2 == 't1') {
				this.modelInfo.recruitList[this.indexes].title = val
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemessage',
					data: {
						id: this.jid,
						type: 4,
						text: this.modelInfo.recruitList[this.indexes]
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}else if(this.indexes2 == 'c1') {
				this.modelInfo.recruitList[this.indexes].titleFn = val
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemessage',
					data: {
						id: this.jid,
						type: 4,
						text: this.modelInfo.recruitList[this.indexes]
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}else if(this.indexes2 == 'p1') {
				this.modelInfo.recruitList[this.indexes].past = val
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemessage',
					data: {
						id: this.jid,
						type: 4,
						text: this.modelInfo.recruitList[this.indexes]
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}
		},
		listHandle(val, index, jid) {
			if(val) {
				let obj = {
					title: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>新加项目</span></p>",
					titleFn: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>投资金额</span></p>",
					jobyaoqiu: "<p class='ql-align-left'><span class='ql-font-serif'>未考虑前期的其他投入、资金的时间效应。不能解决多套投资的现金分析问题。且由于其固有的片面性，不能作为理想的投资分析工具</span></p>"
				}
        this.$axios({
          method: 'post',
          url: '/api/Senior/newcmessage',
          data: {
            wid: this.$store.state.threeStep.siteId,
            type: 4,
            text: obj,
            lmid: this.pid
          }
        }).then((res)=> {
          if(res.data.code == '200') {
            let obj = {
              jid: res.data.data,
							title: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>新加项目</span></p>",
							titleFn: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>投资金额</span></p>",
							jobyaoqiu: "<p class='ql-align-left'><span class='ql-font-serif'>未考虑前期的其他投入、资金的时间效应。不能解决多套投资的现金分析问题。且由于其固有的片面性，不能作为理想的投资分析工具</span></p>"
            }
            this.modelInfo.recruitList.push(obj)
          }
          if(res.data.code == '404') {
            alert(res.data.msg)
          }
        })  
			}else {
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
        	}else {
        		alert(res.data.msg)
        	}
        })
			}
		},
		titleClick(val) {
			if(val == '0') {
				this.modelInfo.titleToggle = false
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.$store.state.threeStep.siteId,
            lmid: this.pid,
            type: 4,
            module: this.modelInfo
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						this.modelInfo.titleToggle = true
						alert(res.data.msg)
					}
				})
			}else {
				this.modelInfo.titleToggle = true
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.$store.state.threeStep.siteId,
            lmid: this.pid,
            type: 4,
            module: this.modelInfo
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						this.modelInfo.titleToggle = false
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
.purt-text
	position: relative
	padding: 50px 0
	transition: all .3s
	background-size: cover
	&:hover
		.title
			p
				opacity: 1
		.container
			.addList
				opacity: 1
	.masking
		position: absolute
		left: 0
		top: 0
		right: 0
		bottom: 0
		background: $allmasking
		z-index: 0
	.title
		margin: 0 auto $marginb
		position: relative
		text-align: center
		p
			opacity: 0
			height: 30px
			line-height: 30px
			transition: all .3s
			span
				background: $addbtnbg
				padding: $addbtnpadding
				border-radius: $addbtnradius
				font-size: $addbtnfontsize
				color: #fff
				cursor: pointer
		.titleWrap
			&:hover
				i
					opacity: 1
			i
				position: absolute
				right: 5px
				top: 5px
				background: #000
				color: #fff
				width: 25px
				height: 25px
				border-radius: 5px
				cursor: pointer
				z-index: 10
				opacity: 0
			h3
				font-size: $fontsize1
				opacity: 0
				>>> .ql-editor
					padding: 5px
					font-size: $fontsize1
			h6
				font-size: $fontsize2
				opacity: 0
				>>> .ql-editor
					padding: 5px 
					font-size: $fontsize2
	.container
		position: relative
		z-index: 10
		.row
			opacity: 0
		li
			position: relative
			border: 1px solid #ced3c4
			border-radius: 5px
			background: rgba(255, 255, 255, 0.9)
			float: none
			display: inline-block
			vertical-align: top
			padding: 20px
			&:hover
				.btnWrap
					opacity: 1
			.btnWrap
				position: absolute
				top: 0
				right: 0
				opacity: 0
				transition: all .3s
				z-index: 1000
				i
					background: $iconbg
					display: block
					border-radius: $iconradius
					margin-bottom: 3px
					width: $iconwidth
					height: $iconheight
					color: $iconcolor
					font-size: $iconfontsize
					line-height: 22px
					cursor: pointer
					text-align: center
					&:nth-of-type(2)
						cursor: move
						display: $display
			h3
				margin: 0 0 10px
				line-height: 34px
				font-size: 18px
				font-weight: normal
				>>> .ql-editor
					padding: 1px 3px
					font-size: 18px
			h6
				margin: 0
				font-size: 15px
				>>> .ql-editor
					padding: 0px
					font-size: 15px
			.list-content
				display: none
				line-height: 1.6
				>>> .ql-editor
					padding: 0px
					line-height: 1.6
		.layout1
			width: 100%
			margin-bottom: 20px
		.layout2
			width: 47%
			margin: 0 1.0444% 1.8%
		.layout3
			width: 30.333%
			margin: 0 1.0044% 1.8%
		.layout4
			width: 23%
			margin: 0 1.0044% 1.8%
			&:last-child
				margin-right: 0
		.layout5
			width: 33.333%
			border: none
			padding: 0 10px 20px
			background: none
			.inner
				padding: 5px
				background: #fff
				border: 1px solid #ccc
				min-height: 250px
			.list-content
				display: block
		.layout6
			width: 50%
			border-width: 0
			padding: 20px
			&:nth-of-type(1)
				background: url('/static/images/recruit/hides/hide01.png') no-repeat
				background-position: left bottom
				&:before
					content: ''
					display: block
					position: absolute
					left: 0
					top: 0
					width: 100%
					height: 100%
					background: url('/static/images/recruit/hides/hide02.png') no-repeat
					background-position: right top
			&:nth-of-type(2)
				background: none
				
			&:nth-of-type(3)
				background: url('/static/images/recruit/hides/hide02.png') no-repeat
				background-position: right bottom
			&:nth-of-type(4)
				background: url('/static/images/recruit/hides/hide03.png') no-repeat
				background-position: right top
			&:nth-of-type(5)
				background: url('/static/images/recruit/hides/hide01.png') no-repeat
				background-position: left bottom
				&:before
					content: ''
					display: block
					position: absolute
					left: 0
					top: 0
					width: 100%
					height: 100%
					background: url('/static/images/recruit/hides/hide02.png') no-repeat
					background-position: right top
			&:nth-of-type(6)
				background: none
				
			&:nth-of-type(7)
				background: url('/static/images/recruit/hides/hide02.png') no-repeat
				background-position: right bottom
			&:nth-of-type(8)
				background: url('/static/images/recruit/hides/hide03.png') no-repeat
				background-position: right top
			&:nth-of-type(9)
				background: url('/static/images/recruit/hides/hide01.png') no-repeat
				background-position: left bottom
				&:before
					content: ''
					display: block
					position: absolute
					left: 0
					top: 0
					width: 100%
					height: 100%
					background: url('/static/images/recruit/hides/hide02.png') no-repeat
					background-position: right top
			&:nth-of-type(10)
				background: none
				
			&:nth-of-type(11)
				background: url('/static/images/recruit/hides/hide02.png') no-repeat
				background-position: right bottom
			&:nth-of-type(12)
				background: url('/static/images/recruit/hides/hide03.png') no-repeat
				background-position: right top
		.addList
			// height: 30px
			// line-height: 30px
			// overflow: hidden
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
	.width96
		width: 96%
		max-width: 1170px
.bgOne
	background: $modelBg02
.bgTwo
	background: $modelBg03
	.title
		.titleWrap
			h3
				color: #fff
				.ql-editor
					color: #fff
			h6
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
	border: solid 0px
</style>