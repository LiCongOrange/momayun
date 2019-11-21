<template>
	<div class="set">
		<index-header></index-header>
		<crumbs></crumbs>
		<div class="container">
			<h1>请选择一个模板</h1>
			<div class="modelxuan">
				<ul>
					<li v-for="(item, index) in modelxuan">
						<span :class="{ active: item.isActive }" @click="modelHandle(index, item.id)">{{ item.name }}</span>
					</li>
				</ul>
			</div>
			<div class="classify">
				<h2 @click="alllistHandel" :class="{ h2active: h2activeToggle }">全部</h2>
				<ul>
					<!-- <li>
						<a href="javascript:;" @click="alllistHandel">全部</a>
					</li> -->
					<li v-for="(item, index) in hangye" :class="{ active: item.active == '1' }">
						<a href="javascript:;" v-text="item.name" @click="getId(item.id)"></a>
					</li>
				</ul>
			</div>
			<div class="modulerList">
				<ul>
					<li v-for="(item, index) in showimglist">
						<div class="inner11">
							<div class="duojiao" v-if="item.ispage == '2'">
								<!-- <i class="iconfont">多</i> -->
							</div>
							<img :src="item.picurl">
							<div class="overlay">
								<div class="inner">
									<h3 v-text="item.title"></h3>
									<button @click="toEdit(item.moban_id, item.title, item.ismoban)">开始编辑</button>
									<button @click="overlayShow('01', item.moban_id, item.ismoban, item.title)">预览查看</button>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="pre-wrap" v-if="preToggle">
			<div class="wrap-title">
				<span><i @click="overlayShow('02')" class="iconfont">&#xe739;返回</i>  •  你可以在自己的网站中任意添加或删除网站版块</span>
				<!-- <h3 v-html="this.modelName2"></h3> -->
				<!-- <button class="btn" @click="toEdit2">开始编辑</button> -->
				<el-button type="primary" @click="toEdit2">开始编辑</el-button>
			</div>
			<div class="wrap-content">
				<!-- <div v-if="iframeToggle" class="william-inner"><preview-section></preview-section></div> -->
				<!-- <div v-if="iframeToggle" class="william-inner"><preview></preview></div> -->
				<iframe v-if="iframeToggle" frameborder="0" scrolling="yes" src="/pre" style="width: 100%;height: 100%"></iframe>
				<iframe v-else frameborder="0" scrolling="yes" :src="iframeUrl" style="width: 100%;height: 100%"></iframe>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import IndexHeader from '@/common/Header'
import Crumbs from '@/common/Crumbs'
import previewSection from '@/pages/step/components/PreviewSection'
import preview from '@/pages/home/preview/Pre'
export default {
	data() {
		return {
			h2activeToggle: true,
			modelType: '001',
			hangyeId: '',
			siteId2: '',
			ismoban2: '',
			modelName2: '',
			iframeToggle: true,
			iframeUrl: '',
			preToggle: false,
			columnlistCC: '',
			modelidListCC: [],
			headTextCC: [],
			bannerTextCC: [],
			productTextCC: [],
			newTextCC: [],
			teamTextCC: [],
			recruitTextCC: [],
			atlasTextCC: [],
			contactTextCC: [],
			footTextCC: [],
			showimglist: [],
			modelxuan: [{
				id: '001',
				name: '全部',
				isActive: true
			}, {
				id: '002',
				name: '单页',
				isActive: false
			}, {
				id: '003',
				name: '多页',
				isActive: false
			}]
		}
	},
	components: {
		IndexHeader,
		Crumbs,
		previewSection,
		preview
	},
	computed: {
		...mapState({
			modelList: state => state.content.modelList,
			dataList: state => state.content.datalist,
			modelText: state => state.common.modelList,
			hangye: state => state.industry.hangye,
			stepPages: state => state.stepPages,
			columnList: state => state.threeStep.columnList,
			columnList2: state => state.threeStep.columnList2
		})
	},
	mounted() {
		this.$store.state.navigation1 = '产品中心'
		this.$store.state.navigation2 = '智能建站'
		this.$store.state.navigation3 = '新建模板'
		this.getinfo()
		this.$axios({
			method: 'get',
			url: '/api/Ctstation/hangye'
			 //url: '/api/hangye.json'
		}).then((res)=> {
			if(res.data.code == '200') {
				this.$store.commit('hangyeHandel', res.data.data)
			}
		})
	},
	methods: {
		screenHandle() {
			if(this.modelType == '001' && !this.hangyeId) {
				this.showimglist = this.modelList
			}else if(this.modelType == '001' && this.hangyeId) {
				this.showimglist = []
				for(let i=0; i<this.modelList.length; i++) {
					if(this.modelList[i].hyid == this.hangyeId) {
						this.showimglist.push(this.modelList[i])
					}
				}
			}else if(this.modelType == '002' && !this.hangyeId) {
				this.showimglist = []
				for(let i=0; i<this.modelList.length; i++) {
					if(this.modelList[i].ispage == 1) {
						this.showimglist.push(this.modelList[i])
					}
				}
			}else if(this.modelType == '002' && this.hangyeId) {
				this.showimglist = []
				for(let i=0; i<this.modelList.length; i++) {
					if(this.modelList[i].hyid == this.hangyeId && this.modelList[i].ispage == 1) {
						this.showimglist.push(this.modelList[i])
					}
				}
			}else if(this.modelType == '003' && !this.hangyeId) {
				this.showimglist = []
				for(let i=0; i<this.modelList.length; i++) {
					if(this.modelList[i].ispage == 2) {
						this.showimglist.push(this.modelList[i])
					}
				}
			}else if(this.modelType == '003' && this.hangyeId) {
				this.showimglist = []
				for(let i=0; i<this.modelList.length; i++) {
					if(this.modelList[i].hyid == this.hangyeId && this.modelList[i].ispage == 2) {
						this.showimglist.push(this.modelList[i])
					}
				}
			}
		},
		modelHandle(index, id) {
			this.modelType = id
			for(let i=0; i<this.modelxuan.length; i++) {
				this.modelxuan[i].isActive = false
			}
			this.modelxuan[index].isActive = true
			this.screenHandle()
		},
		toEdit2() {
			this.toEdit(this.siteId2, '123', this.ismoban2)
		},
		alllistHandel() {
			this.hangyeId = ''
			this.h2activeToggle = true
			for(let i=0; i<this.hangye.length; i++) {
				this.hangye[i].active = 0
			}
			this.screenHandle()
		},
		overlayShow(type, mobanId, ismoban, mobanname) {
			this.siteId2 = mobanId
			this.ismoban2 = ismoban
			this.modelName2 = mobanname
			if(type == '01') {
				if(ismoban == '1') {
					this.iframeToggle = false
					this.iframeUrl = '/index/index/pre?' + mobanId + '&' + ismoban
				}else {
					this.iframeToggle = false
					this.iframeUrl = '/index/index/pre?' + mobanId
		      this.$axios({
		        method: 'get',
		        url: '/api/showsite/siteinfo',
		         //url: '/api/showsite2.json',
		        params: {
		          site_id: mobanId
		        }
		      }).then((res)=> {
		      	if(res.data.code == '200') {
			        this.$store.commit('pageToggleHandel', false)
			        this.$store.commit('columnListHandel2', res.data.data.columnList)

			        this.$store.state.threeStep.companyName = res.data.data.websites.companyName
			        this.$store.state.threeStep.siteName = res.data.data.websites.siteName
			        this.$store.state.threeStep.yhid = res.data.data.websites.yhid
			        if(res.data.data.headText) {
			          this.$store.commit('All_Head', res.data.data.headText)
			        }else {
			          for(let i=0; i<this.stepPages.head.length; i++) {
			            this.stepPages.head[i].text = res.data.data.websites.siteName
			          }
			        }
			        this.$store.commit('All_Banner', res.data.data.bannerText)
			        this.$store.commit('All_Product', res.data.data.productText)
			        this.$store.commit('All_Article', res.data.data.newText)
			        this.$store.commit('All_Single', res.data.data.teamText)
			        this.$store.commit('All_Recruit', res.data.data.recruitText)
			        this.$store.commit('All_Atlas', res.data.data.atlasText)
			        this.$store.commit('All_Contact', res.data.data.contactText)
			        this.$store.commit('All_Footer', res.data.data.footText)
		      	}else {
		      		alert(res.data.msg)
		      	}
		      })
				}
				this.preToggle = true
				this.$store.commit('allEditOpen', false)
				this.$store.commit('pageToggleHandel', false)
			}else {
				this.preToggle = false
			}
		},
		getId(id) {
			this.h2activeToggle = false
			this.hangyeId = id
			for(let i=0; i<this.hangye.length; i++) {
				this.hangye[i].active = 0
				if(this.hangye[i].id == id) {
					this.hangye[i].active = 1
				}
			}
			this.screenHandle()
		},
		getinfo() {
			this.$axios({
				method: 'post',
				url: '/api/Usersites/showimglist'
				 //method: 'get',
				 //url: '/api/showimglist.json'
			}).then((res)=> {
				if(res.data.code == '200') {
					let data = res.data.data
					for(let i=0; i<this.modelList.length; i++) {
						data.unshift(this.modelList[i])
					}
					this.$store.commit('modellistHandel', data)
					this.showimglist = data
				}
			})
		},
		toEdit(modelid, modelname, ismoban) {
			if(ismoban == '1') {
				for(let i=0; i<this.modelText.length; i++) {
					if(this.modelText[i].banner.length >= 0) {
						for(let j=0; j<this.modelText[i].banner.length; j++) {
							this.modelText[i].banner[j].bgImg = ''
							if(this.modelText[i].banner[j].title) {
								this.modelText[i].banner[j].title = ''
							}
							if(this.modelText[i].banner[j].titleFn) {
								this.modelText[i].banner[j].titleFn = ''
							}
						}
					}
					if(this.modelText[i].product.length >= 0) {
						for(let j=0; j<this.modelText[i].product.length; j++) {
							this.modelText[i].product[j].productList = []
						}
					}
					if(this.modelText[i].article.length >= 0) {
						for(let j=0; j<this.modelText[i].article.length; j++) {
							this.modelText[i].article[j].newList = []
						}
					}
					if(this.modelText[i].single.length >= 0) {
						for(let j=0; j<this.modelText[i].single.length; j++) {
							this.modelText[i].single[j].title = ''
							this.modelText[i].single[j].titleFn = ''
							this.modelText[i].single[j].content = ''
							this.modelText[i].single[j].picurl = ''
						}
					}
					if(this.modelText[i].atlas.length >= 0) {
						for(let j=0; j<this.modelText[i].atlas.length; j++) {
							this.modelText[i].atlas[j].broadcastImg = []
						}
					}
					if(this.modelText[i].recruit.length >= 0) {
						for(let j=0; j<this.modelText[i].recruit.length; j++) {
							this.modelText[i].recruit[j].recruitList = []
						}
					}
				}
				for(let i=0; i<this.dataList.length; i++) {
					if(this.dataList[i].id == modelid) {
						this.columnlistCC = this.dataList[i].columnlist
					}
				}
				for(let i=0; i<this.modelText.length; i++) {
					if(this.modelText[i].id == modelid) {
						this.headTextCC = this.modelText[i].head
						this.bannerTextCC = this.modelText[i].banner
						this.productTextCC = this.modelText[i].product
						this.teamTextCC = this.modelText[i].single
						this.atlasTextCC = this.modelText[i].atlas
						this.newTextCC = this.modelText[i].article
						this.contactTextCC = this.modelText[i].contact
						this.recruitTextCC = this.modelText[i].recruit
						this.footTextCC = this.modelText[i].foot
					}
				}
				this.$axios({
					method: 'post',
					url: '/api/Showsite/modelinfo',
					data: {
						mid: modelid,
						mobancont: {
							columnlist: this.columnlistCC,
							headText: this.headTextCC,
							bannerText: this.bannerTextCC,
							productText: this.productTextCC,
							teamText: this.teamTextCC,
							atlasText: this.atlasTextCC,
							newText: this.newTextCC,
							recruitText: this.recruitTextCC,
							contactText: this.contactTextCC,
							footText: this.footTextCC
						}
					}
				}).then((res)=> {
					if(res.data.code == '200') {
						window.open('/index/index/home?' + res.data.data)
						// window.location.href = '/index/index/home?' + res.data.data
					}else {
						this.$message({
							type: 'error',
							message: res.data.msg
						})
					}
				})
			}else {
				this.$axios({
						method: 'post',
						url: '/api/Showsite/modeltwoinfo',
	     			data: { wid: modelid }
				}).then((res)=> {
					if(res.data.code == '200') {
						window.location.href = '/index/index/home?' + res.data.data
					}else {
						this.$message({
							type: 'error',
							message: res.data.msg
						})
					}
				})
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.set
	background: #fff
.pre-wrap
	position: fixed
	left: 0
	top: 0
	right: 0
	bottom: 0
	background: rgba(0, 0, 0, 0.75)
	z-index: 10001
	.wrap-title
		display: flex
		justify-content: space-between
		padding: 30px 50px 0
		button
			font-size: 16px
		span
			font-size: 16px
			color: #fff
			line-height: 46px
			.iconfont
				cursor: pointer
		h3
			margin: 0
			margin-top: 10px
			vertical-align: top
			display: inline-block
			color: #fff
	.wrap-content
		position: fixed
		background: #fff
		left: 50px
		right: 50px
		bottom: 30px
		top: 80px
		.william-inner
			width: 100%
			height: 100%
			overflow: auto
			overflow-x: hidden
			>>> #header1
				left: 50px
.container
	h1
		margin: 40px auto 50px
		text-align: center
		font-size: 26px
	.classify
		border: 1px solid #6a6a6a
		border-radius: 5px
		padding: 20px 46px
		h2
			float: left
			margin: 0
			color: #666
			font-size: 26px
			line-height: 50px
			cursor: pointer
		.h2active
			color: $bgColor
		ul
			overflow: hidden
			margin: 0
			display: flex
			flex-wrap: wrap
			justify-content: space-between
			padding: 0 20px
			li
				float: left
				padding: 0 15px
				margin: 0 20px
				line-height: 34px
				border-radius: 5px
				a
					color: #666
					font-size: 16px
					font-weight: 500
					text-decoration: none
					&:hover
						color: $bgColor
			.active
				background: $bgColor
				a
					color: #fff
					&:hover
						color: #fff
	.modulerList
		margin-top: 10px
		ul
			// text-align: center
			li
				// padding: 20px
				width: 48%
				display: inline-block
				height: 365px
				float: left
				margin-top: 35px
				border: 1px solid #999
				// padding: 8px
				position: relative
				&:nth-of-type(even)
					float: right
				.inner11
					// position: relative
					height: 100%
					padding: 8px
				&:hover
					.overlay
						opacity: 1
				img
					width: 100%
					height: 100%
				.duojiao
					position: absolute
					top: 0
					left: 0
					width: 126px
					height: 125px
					background: url('/static/images/indexImg/modelduo.png')
					z-index: 150
					// width: 0
					// height: 0
					// border-left: 60px solid transparent
					// border-bottom: 60px solid $bgColor
					i
						position: relative
						left: -28px
						top: 32px
						color: #fff
						background: #fd9965
						border-radius: 5px
						padding: 5px 6px
						font-size: 14px
					// border-width: 0 0 30px 30px
					// border-style: solid 
					// border-color: transparent transparent transparent #6c6
				.overlay
					position: absolute
					left: 8px
					top: 8px
					right: 8px
					bottom: 8px
					background: rgba(0, 0, 0, 0.5)
					opacity: 0
					transition: all .3s
					z-index: 15
					.inner
						position: absolute
						top: 50%
						left: 50%
						transform: translate(-50%, -50%)
						text-align: center
						h3
							margin: 0 0 40px
							color: #fff
							font-size: 31px
							word-spacing: 2px
						button
							border: none
							border-radius: 3px
							padding: 13px 64px
							background: $bgColor
							display: block
							color: #fff
							font-size: 22px
							white-space: nowrap
							&:hover
								background: $btnhoverbg
							&:nth-of-type(2)
								margin-top: 10px
								background: rgba(0, 0, 0, 0)
								border: 1px solid #fff
								&:hover
									border-color: #666
									background: rgba(0, 0, 0, 0.5)
	.modelxuan
		display: flex
		padding: 15px 0
		ul
			margin: 0
			display: flex
			li
				margin: 0 10px
				line-height: 36px
				span
					padding: 5px 15px
					font-size: 16px
					color: #666
					cursor: pointer
				&:first-child
					margin: 0 46px
					span
						padding: 0
						font-size: 26px
					.active
						background: none
						color: $bgColor
				.active
					background: $bgColor
					color: #fff
					border-radius: 3px
</style>