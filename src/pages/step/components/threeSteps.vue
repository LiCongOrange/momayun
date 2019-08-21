<template>
	<div class="threeSteps">
		<div class="overlay" v-if="overlayToggle">
			<div class="overlay-title" :class="{topBottom:isTopBottom}">
				<!-- <button @click="toEidt">开始编辑</button> -->
				<button class="iconfont" @click="closeOverlay">&#xe625;</button>
			</div>
			<div class="wrap-preview" :class="{topBottom:isTopBottom}">
				<preview-section></preview-section>
				<!-- <iframe frameborder="0" scrolling="auto" :src="iframeUrl" style="width: 100%;height: 100%"></iframe> -->
			</div>
		</div>
		<div class="content">
			<ul class="col-md-12" style="position: static !important">
				<li class="col-md-6" style="position: static !important">
					<div class="thumbnail-wrap" :class="{ choiced: choiceToggle1 }">
						<div class="thumbnail">
							<random-section></random-section>
						</div>
					</div>
					<el-button-group>
					  <el-button type="primary" size="small" @click="dialogVisible = true">预览</el-button>
					  <el-button type="primary" size="small" @click="handleChoice('01')">选择</el-button>
					  <el-button type="success" size="small" @click="handleRandomClick">换一换</el-button>
					</el-button-group>
				</li>
				<li class="col-md-6" style="position: static !important">
					<div class="thumbnail-wrap" :class="{ choiced: choiceToggle2 }">
						<div class="thumbnail">
							<iframe v-if="iframe_url" frameborder="0" scrolling="yes" :src="iframe_url"></iframe>
						</div>
					</div>
					<el-button-group>
					  <el-button type="primary" size="small" @click="dialogVisible2 = true">预览</el-button>
					  <el-button type="primary" size="small" @click="handleChoice('02')">选择</el-button>
					  <el-button type="success" size="small" @click="handleRandomSite">换一换</el-button>
					</el-button-group>
				</li>
			</ul>
			<!-- <div class="func col-md-2" v-if="pageToggle">
				<el-button @click="handleRandomClick" type="success" icon="el-icon-refresh">换一批看看</el-button>
				<button @click="handleRandomClick"><i class="iconfont">&#xe660;</i>换一批看看</button>
				<button @click="overlayShow">预览</button>
			</div> -->
		</div>


	<el-dialog
	  title="预览模式"
	  :visible.sync="dialogVisible"
	  width="90%"
	  top="3vh"
	  :before-close="handleClose">
	  <random-section></random-section>
	</el-dialog>
	<el-dialog
		class="dialog-modal-two"
	  title="预览模式"
	  :visible.sync="dialogVisible2"
	  width="90%"
	  top="3vh"
	  :before-close="handleClose2">
	  <iframe frameborder="0" scrolling="auto" :src="iframe_url" style="width: 100%;height: 100%"></iframe>
	</el-dialog>

	</div>
</template>

<script>
import { mapState } from 'vuex'
import previewSection from './PreviewSection'
import randomSection from './RandomSection.vue'
import Preview from '@/pages/home/preview/Pre'
export default {
	props: {
		list: Array
	},
	components: {
		'preview-section': previewSection,
		'random-section': randomSection,
	},
	data() {
		return {
			iframe_url: '',
			randow_site_id: '',
			site_add_number: 0,
			choiceToggle1: false,
			choiceToggle2: false,
			dialogVisible: false,
			dialogVisible2: false,
			overlayToggle: false,
			isTopBottom: false
		}
	},
	computed: {
		...mapState({
			pageToggle: state => state.pageToggle,
			siteId: state => state.threeStep.siteId,
			recruitText: state => state.stepPages.recruit,
			columnList2: state => state.threeStep.columnList2,
			stepPages: state => state.stepPages
		})
	},
	activated() {
		this.randow_site_id = this.list[0].moban_id
		this.$store.commit('handleSiteId', this.list[0].moban_id)
		this.iframe_url = '/index/index/pre?' + this.randow_site_id
	},
	watch: {
		site_add_number(num) {
			this.randow_site_id = this.list[this.site_add_number].moban_id
			this.$store.commit('handleSiteId', this.randow_site_id)
			this.iframe_url = '/index/index/pre?' + this.randow_site_id
		}
	},
	methods: {
		handleRandomSite() {
			if(this.list.length > 1) {
				this.site_add_number ++
				this.site_add_number %= this.list.length
			}else {
				this.$message({
					type: 'warning',
					message: '模板不足，努力创新中...'
				})
			}

		},
		handleChoice(type) {
			if(type === '01') {
				this.choiceToggle1 = true
				this.choiceToggle2 = false
			}else {
				this.choiceToggle1 = false
				this.choiceToggle2 = true
			}
			this.$emit('handleChoice', type)
		},
		handleClose2() {
			this.dialogVisible2 = false
		},
		handleClose() {
			this.dialogVisible = false
		},
		toEidt() {
			this.$axios({
				method: 'post',
				url: '/api/Ctstation/thirdstep',
				data: this.$store.state,
				transformRequest: [function(data) {
					let ret = {}
					if(data.pageToggle) {
						ret = {
							bannerPid: data.threeStep.columnList[1].pid,
							site_id: data.threeStep.siteId,
							columnList: data.threeStep.columnList,
							bannerText: data.stepPages.banner,
							productText: data.stepPages.product,
							newText: data.stepPages.article,
							teamText: data.stepPages.single,
							recruitText: data.stepPages.recruit
						}
					}else {
						ret = {
							site_id: data.threeStep.siteId,
							columnList: data.threeStep.columnList2,
							bannerText: data.stepPages.banner,
							productText: data.stepPages.product,
							newText: data.stepPages.article,
							teamText: data.stepPages.single,
							recruitText: data.stepPages.recruit
						}
					}
					return JSON.stringify(ret)
				}],
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				},
			}).then((res) => {
				if(res.data.code == '200') {
					// console.log('跳转至站点页')
					// window.location.href = '/index/index/home?'+this.siteId
					window.open('/index/index/home?'+this.siteId)
					// this.$store.state.isNavToggle = false
					// this.$store.state.allEditToggle = true
				}
				if(res.data.code == '404') {
					alert(1)
					alert(res.data.msg)
				}
			})
		},
		closeOverlay() {
			// this.iframeUrl = 'https://site.momayun.cn/index/index/pre?'
			this.overlayToggle = false
			this.isTopBottom = false
		},
		handleRandomClick() {
			for(let i=0; i<this.$store.state.threeStep.columnList.length; i++) {
				if(this.$store.state.threeStep.columnList[i].type == 'header') {
					this.$store.state.threeStep.columnList[i].indexes = parseInt(Math.random()*3)
				}else if(this.$store.state.threeStep.columnList[i].type == 'banner') {
					this.$store.state.threeStep.columnList[i].indexes = parseInt(Math.random()*5)
					this.$store.state.bannerIndex = this.$store.state.threeStep.columnList[i].indexes
				}else if(this.$store.state.threeStep.columnList[i].type == 'product') {
					this.$store.state.threeStep.columnList[i].indexes = parseInt(Math.random()*7)
				}else if(this.$store.state.threeStep.columnList[i].type == 'new') {
					this.$store.state.threeStep.columnList[i].indexes = parseInt(Math.random()*7)
				}else if(this.$store.state.threeStep.columnList[i].type == 'team') {
					this.$store.state.threeStep.columnList[i].indexes = parseInt(Math.random()*7)
					if(this.$store.state.threeStep.columnList[i].indexes == '1' || this.$store.state.threeStep.columnList[i].indexes == '3' || this.$store.state.threeStep.columnList[i].indexes == '5') {
						this.stepPages.single[0].bgImg = '/static/images/banner/shows/hide03.png'
						this.stepPages.single[0].maskingToggle = true
						this.stepPages.single[0].btnToggle = true
						this.stepPages.single[0].updownspace = '100px 0'
					}else {
						this.stepPages.single[0].bgImg = ''
						this.stepPages.single[0].maskingToggle = false
						this.stepPages.single[0].btnToggle = false
						this.stepPages.single[0].updownspace = ''
					}
				}else if(this.$store.state.threeStep.columnList[i].type == 'recruit') {
					this.$store.state.threeStep.columnList[i].indexes = parseInt(Math.random()*6)
				}else if(this.$store.state.threeStep.columnList[i].type == 'contact') {
					this.$store.state.threeStep.columnList[i].indexes = parseInt(Math.random()*2)
				}
			}
			for(let i=0; i<this.$store.state.threeStep.columnList.length; i++) {
				if(this.$store.state.threeStep.columnList[i].type == 'header') {
					this.$store.state.threeStep.columnList[i].pid = 11 +""+ this.$store.state.threeStep.columnList[i].indexes
				}else if(this.$store.state.threeStep.columnList[i].type == 'contact') {
					// this.$store.state.threeStep.columnList[i].pid = 99 +""+ this.$store.state.threeStep.columnList[i].indexes
				}
			}
			this.$store.state.allClass.bgColorClassNum = parseInt(Math.random()*6)
			$('.thumbnail-wrap').animate({scrollTop:'0'},500);
		},
		toBackstage() {
	  		this.$store.state.storage.header.section = this.$store.state.threeStep.columnList[0].section[this.$store.state.storage.header.index]
	  		this.$store.state.storage.banner.section = this.$store.state.threeStep.columnList[1].section[this.$store.state.storage.banner.index]
	  		this.$store.state.storage.product.section = this.$store.state.threeStep.columnList[2].section[this.$store.state.storage.product.index]
	  		this.$store.state.storage.newTeam.section = this.$store.state.threeStep.columnList[3].section[this.$store.state.storage.new.index]
	  		this.$store.state.storage.newTeam.section = this.$store.state.threeStep.columnList[4].section[this.$store.state.storage.team.index]
	  		this.$store.state.storage.contact.section = this.$store.state.threeStep.columnList[5].section[this.$store.state.storage.contact.index]
		},
		overlayShow() {
			this.iframe_url += this.pageToggle
			// this.$store.state.tabPreview = true
			this.overlayToggle = true
			this.isTopBottom = true
		}
	},
	mounted() {
		// this.handleRandomClick()
		this.$store.state.isNavToggle = true
		this.$store.state.allEditToggle = false
	},
	updated() {
		let documentH = document.body.clientHeight || document.documentElement.clientHeight
		$('.el-dialog__body').height(documentH - 30 - 54 - 10 - 70 + 'px')
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.threeSteps
	box-sizing: border-box
	min-height: 650px
	position: relative
	>>> .el-dialog__wrapper
		.el-dialog__body
			overflow-y auto
			overflow-x hidden
		.el-dialog
			margin-bottom 0
	
	>>> .dialog-modal-two
		.el-dialog__body
			overflow hidden
	.overlay
		position: fixed
		top: 0
		right: 0
		bottom: 0
		left: 0
		background: rgba(40, 40, 40, 0.7)
		z-index: 10
		.overlay-title
			padding: 30px 50px 0
			transition: all 2s
			button
				float: left
				background: #f39b77
				width: 110px
				height: 44px
				border: none
				border-radius: 10px
				outline: 0
				color: #fff
				font-size: 18px
				a
					color: #fff
			.iconfont
				width: auto
				float: right
				background: none
				border: none
				font-size: 34px
		.wrap-preview
			position: absolute
			top: 80px
			left: 50px
			right: 50px
			bottom: 30px
			width: auto
			height: auto
			transition: all 2s
			background: #fff
			overflow: auto
			>>> #header01
				right: 50px
				left: 50px
	.content
		position: absolute
		left: 0
		top: 0
		width: 100%
		bottom: 0
		overflow: hidden
		background: #fff
		box-sizing: border-box
		.func
			padding-top: 50px
			display: flex
			justify-content: center
			flex-direction: column
			select
				margin-top: 15px
				border: none
		ul
			padding: 15px 0
			li
				.el-button-group
					display flex
					justify-content center
					margin-top 5px
				.thumbnail-wrap
					border: 1px solid #ddd
					// min-width 1200px
					// transform scale(.37)
					// transform-origin 0 0
					height 590px
					overflow-y: hidden
					overflow-x hidden
					position relative
					&:after
						content ''
						display block
						position absolute
						left 0
						right 0
						top 0
						bottom 0
						background rgba(255, 255, 255, .1)
					.thumbnail
						border: none
						transform scale(.45)
						transform-origin 0 0
						min-width 1200px
						height 100%
						padding 0
						margin-bottom 0
						iframe
							width 1220px
							height 300%
							overflow hidden
				.btn-agg
					position: absolute
					bottom: 0
					left: 200px
					padding: 15px 0
					text-align: center
					button
						background: none
						padding: 5px 15px
						border-radius: 15px
						outline: 0
						&:hover
							background: $bgColor
				.choiced
					position relative
					&:before
						content '选中'
						height 60px
						display flex
						align-items center
						justify-content center
						position absolute
						left 0
						right 0
						top inherit
						bottom 0
						background linear-gradient(rgba(153, 153, 153, .5), rgba(10, 10, 10, .9))
						color #fff
						font-size 24px
						z-index 1000
</style>