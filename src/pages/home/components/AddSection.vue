<template>
	<div class="addSection" :class="{ activer: addmodelToggle }">
		<div class="title">
			<h3>添加新版块</h3>
			<i class="iconfont" @click="closeAddSection">&#xe739;</i>
		</div>
		<div class="list add-list">
			<ul @mouseout="closeMaskHandel">
				<li 
					v-for="(item, index) in modelList" 
					@mouseover="maskHandel(index)"
				>
					<h6><i class="iconfont">&#xe659;</i>{{ item.title }}</h6>
					<div class="modularWrap">
						<div class="nei">
							<component :is="item.section[item.indexes]" :type="item.pageType"></component>
						</div>
						<div 
							class="mask" 
							:class="{ maskShow : item.maskOnoff }"
							@click="addModule(index, item.type, item.pageType, item.name, item.pid, item.isindex, item)"
						>{{ item.content }}</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import Site01 from '../blocks/Site01'
import Site02 from '../blocks/Site02'
import Site03 from '../blocks/Site03'
import Site04 from '../blocks/Site04'
import Site05 from '../blocks/Site05'
import Site06 from '../blocks/Site06'
import Site07 from '../blocks/Site07'
import Site08 from '../blocks/Site08'
import Site09 from '../blocks/Site09'
import Site10 from '../blocks/Site10'
import Site11 from '../blocks/Site11'
import Site12 from '../blocks/Site12'

export default {
	components: {
	  	'site1': Site01,
	  	'site2': Site02,
	  	'site3': Site03,
	  	'site4': Site04,
	  	'site5': Site05,
	  	'site6': Site06,
	  	'site7': Site07,
	  	'site8': Site08,
	  	'site9': Site09,
	  	'site10': Site10,
	  	'site11': Site11,
	  	'site12': Site12
	},
	data() {
		return {
			maxlength: '',
			addType: '',
			isActiver: false,
			modellmId: '',
			modelct: '',
			modellm: '',
			isindex: 0,
			nowId: '',
			modelList2: [],
			time: '',
			ceshi: [],
		}
	},
	mounted() {
		this.$store.commit('allEditOpen', false)
		for(let i=0; i<this.modelList.length; i++) {
			let obj = this.modelList[i]
			this.modelList2.push(obj)
		}
		$('.add-list').animate({scrollTop:'0'},500)
		if(this.pageToggle) {
			this.maxlength = this.columnList.length
		}else {
			this.maxlength = this.columnList2[this.pageIndex].sonColumn.length
		}
	},
	computed:{
		...mapState({
			addmodelToggle: state => state.addmodelToggle,
			pageToggle: state => state.pageToggle,
			modelList: state => state.addModel.modelList,
			pageIndex: state => state.pageIndex,
			siteId: state => state.threeStep.siteId,
			columnList: state => state.threeStep.columnList,
			columnList2: state => state.threeStep.columnList2,
			atlas: state => state.stepPages.atlas,
			homeHash: state => state.homeHash,
			blocks: state => state.blocks.modeltextList,
			columnList1234: state => state.columnList1234,
			stepPages: state => state.stepPages
		})
	},
	watch: {
		columnList(val) {
			this.maxlength = this.columnList.length
		},
		pageIndex(val) {
			// this.maxlength = this.columnList2[val].sonColumn.length
		},
		columnList2(val) {
			// console.log(val)
			this.maxlength = this.columnList2[this.pageIndex].sonColumn.length
			// console.log(this.maxlength)
			// this.maxlength = val[this.pageIndex].sonColumn.length
		},
	},
	methods: {
		addModule(index, type, pagetype, pagename, pagePid, isindex, item) {
      this.$store.commit('passtoggleHandle', false)
  		this.$store.commit('addmodeltoggleHandle', false)
      this.modellmId = pagePid
			this.addType = type
			this.modellm = item
			if(this.pageToggle) {
				this.isindex = 0
				this.$store.state.addModel.modelList[index].isguan = '1'
			}else {
				this.maxlength = this.columnList2[this.pageIndex].sonColumn.length
				if(this.pageIndex == '1') {
					this.isindex = 1
					this.$store.state.addModel.modelList[index].isindex = '1'
				}else {
					this.isindex = 0
				}
			}
			this.modelct = this.blocks[index]
			if(this.homeHash == '0') {
				this.$store.state.homeHash = '1'
			}
			if(this.pageToggle) {
				if(this.maxlength <= 22) {
					this.$axios({
						// method: 'get',
						// url: '/api/addmodellm.json',
						method: 'post',
						url: '/api/Senior/addmodellm',
						data: {
							modelct: this.modelct,
							modellm: item,
							site_id: this.siteId,
							k: this.homeHash,
							k2: ''
						}
					}).then(this.addModulesucc)
				}else {
					alert('最多只能创建 20 个栏目，请删除无用栏目，再继续添加。')
				}
			}else {
				if(this.maxlength < 20) {
					this.$axios({
						// method: 'get',
						// url: '/api/addmodellm2.json',
						method: 'post',
						url: '/api/Senior/addmodellm',
						data: {
							modelct: this.modelct,
							modellm: item,
							site_id: this.siteId,
							k: this.pageIndex,
							k2: this.homeHash
						}
					}).then(this.addModulesucc)
				}else {
					alert('最多只能创建 20 个栏目，请删除无用栏目，再继续添加。')
				}
			}
		},
		addModulesucc2(res) {
			if(res.data.code == '200') {
				if(this.pageToggle) {
					for(let i=0; i<this.columnList.length; i++) {
						this.columnList[i].checked = false
					}
					this.columnList.splice(this.homeHash, 0, this.modellm)
					for(let i=0; i<this.columnList.length; i++) {
						if(this.columnList[i].pid == this.modellmId) {
							this.columnList[i].pid = res.data.data.lmid
						}
					}
				}else {
					this.columnList2[this.pageIndex].splice(this.homeHash, 0, this.modellm)
					for(let i=0; i<this.columnList2[this.pageIndex].sonColumn.length; i++) {
						this.columnList2[this.pageIndex].sonColumn[i].checked = false
						if(this.columnList2[this.pageIndex].sonColumn[i].pid == this.modellmId) {
							this.columnList2[this.pageIndex].sonColumn[i].pid = res.data.data.lmid
						}
					}
				}
				if(this.addType == 'banner') {
					this.$store.state.stepPages.banner.push(res.data.data.modelct)
				}else if(this.addType == 'product') {
					this.$store.state.stepPages.product.push(res.data.data.modelct)
				}else if(this.addType == 'new') {
					this.$store.state.stepPages.article.push(res.data.data.modelct)
				}else if(this.addType == 'team') {
					this.$store.state.stepPages.single.push(res.data.data.modelct)
				}else if(this.addType == 'contact') {
					this.$store.state.stepPages.contact.push(res.data.data.modelct)
				}else if(this.addType == 'recruit') {
					this.$store.state.stepPages.recruit.push(res.data.data.modelct)
				}else if(this.addType == 'atlas') {
					this.$store.state.stepPages.atlas.push(res.data.data.modelct)
				}
				if(this.addType == 'atlas') {
					for(let i=0; i<this.$store.state.stepPages.atlas.length; i++) {
						if(this.$store.state.stepPages.atlas[i].lmid == res.data.data.lmid) {
							for(let j=0; j<this.$store.state.stepPages.atlas[i].broadcastImg.length; j++) {
								this.$store.state.stepPages.atlas[i].broadcastImg[j].bid = res.data.data.idlist[j].id
							}
						}
					}
				}else if(this.addType == 'product') {
					for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
						if(this.$store.state.stepPages.product[i].lmid == res.data.data.lmid) {
							for(let j=0; j<this.$store.state.stepPages.product[i].productList.length; j++) {
								this.$store.state.stepPages.product[i].productList[j].pid = res.data.data.idlist[j].id
							}
						}
					}		
				}else if(this.addType == 'banner') {
					for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
						if(this.$store.state.stepPages.banner[i].lmid == res.data.data.lmid) {
							this.$store.state.stepPages.banner[i].bid = res.data.data.idlist[0].id
							if(this.$store.state.stepPages.banner[i].broadcastImg) {
  							for(let j=0; j<this.$store.state.stepPages.banner[i].broadcastImg.length; j++) {
  								this.$store.state.stepPages.banner[i].broadcastImg[j].bid = res.data.data.idlist[j].id
  							}
							}
						}
					}
				}else if(this.addType == 'recruit') {
					for(let i=0; i<this.$store.state.stepPages.recruit.length; i++) {
						if(this.$store.state.stepPages.recruit[i].lmid == res.data.data.lmid) {
							for(let j=0; j<this.$store.state.stepPages.recruit[i].recruitList.length; j++) {
								this.$store.state.stepPages.recruit[i].recruitList[j].jid = res.data.data.idlist[j].id
							}
						}
					}
				}else if(this.addType == 'team') {
					for(let i=0; i<this.$store.state.stepPages.single.length; i++) {
						if(this.$store.state.stepPages.single[i].lmid == res.data.data.lmid) {
							this.$store.state.stepPages.single[i].pagid = res.data.data.idlist[0].id
						}
					}
				}else if(this.addType == 'new') {
					for(let i=0; i<this.$store.state.stepPages.article.length; i++) {
						if(this.$store.state.stepPages.article[i].lmid == res.data.data.lmid) {
							for(let j=0; j<this.$store.state.stepPages.article[i].newList.length; j++) {
								this.$store.state.stepPages.article[i].newList[j].bid = res.data.data.idlist[j].id
							}
						}
					}
				}
	      this.modellmId = ''
				this.addType = ''
				this.modellm = ''


			}else {
				alert(res.data.msg)
			}
		},
		addModulesucc(res) {
			if(res.data.code == '200') {

						if(this.pageToggle) {
		          let obj = res.data.data.columnList
		          for(let i=0; i<obj.length; i++) {
		            obj[i].checked = false
		          }
		          obj[this.homeHash].checked = true
		          this.$store.commit('columnListHandel', obj)
						}else {
		          // let obj = res.data.data.columnList
		          // for(let i=0; i<obj[this.pageIndex].sonColumn.length; i++) {
		          //   obj[this.pageIndex].sonColumn[i].checked = false
		          // }
		          // obj[this.pageIndex].sonColumn[this.homeHash].checked = true
		          this.$store.commit('columnListHandel2', res.data.data.columnList)
						}
						
						if(this.addType == 'banner') {
							this.$store.state.stepPages.banner.push(res.data.data.modelct)
						}else if(this.addType == 'product') {
							this.$store.state.stepPages.product.push(res.data.data.modelct)
						}else if(this.addType == 'new') {
							this.$store.state.stepPages.article.push(res.data.data.modelct)
						}else if(this.addType == 'team') {
							this.$store.state.stepPages.single.push(res.data.data.modelct)
						}else if(this.addType == 'contact') {
							this.$store.state.stepPages.contact.push(res.data.data.modelct)
						}else if(this.addType == 'recruit') {
							this.$store.state.stepPages.recruit.push(res.data.data.modelct)
						}else if(this.addType == 'atlas') {
							this.$store.state.stepPages.atlas.push(res.data.data.modelct)
						}
	  				if(this.addType == 'atlas') {
	  					for(let i=0; i<this.$store.state.stepPages.atlas.length; i++) {
	  						if(this.$store.state.stepPages.atlas[i].lmid == res.data.data.lmid) {
	  							for(let j=0; j<this.$store.state.stepPages.atlas[i].broadcastImg.length; j++) {
	  								this.$store.state.stepPages.atlas[i].broadcastImg[j].bid = res.data.data.idlist[j].id
	  							}
	  						}
	  					}
	  				}else if(this.addType == 'product') {
	  					for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
	  						if(this.$store.state.stepPages.product[i].lmid == res.data.data.lmid) {
	  							for(let j=0; j<this.$store.state.stepPages.product[i].productList.length; j++) {
	  								this.$store.state.stepPages.product[i].productList[j].pid = res.data.data.idlist[j].id
	  							}
	  						}
	  					}		
	  				}else if(this.addType == 'banner') {
	  					for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
	  						if(this.$store.state.stepPages.banner[i].lmid == res.data.data.lmid) {
	  							this.$store.state.stepPages.banner[i].bid = res.data.data.idlist[0].id
	  							if(this.$store.state.stepPages.banner[i].broadcastImg) {
		  							for(let j=0; j<this.$store.state.stepPages.banner[i].broadcastImg.length; j++) {
		  								this.$store.state.stepPages.banner[i].broadcastImg[j].bid = res.data.data.idlist[j].id
		  							}
	  							}
	  						}
	  					}
	  				}else if(this.addType == 'recruit') {
	  					for(let i=0; i<this.$store.state.stepPages.recruit.length; i++) {
	  						if(this.$store.state.stepPages.recruit[i].lmid == res.data.data.lmid) {
	  							for(let j=0; j<this.$store.state.stepPages.recruit[i].recruitList.length; j++) {
	  								this.$store.state.stepPages.recruit[i].recruitList[j].jid = res.data.data.idlist[j].id
	  							}
	  						}
	  					}
	  				}else if(this.addType == 'team') {
	  					for(let i=0; i<this.$store.state.stepPages.single.length; i++) {
	  						if(this.$store.state.stepPages.single[i].lmid == res.data.data.lmid) {
	  							this.$store.state.stepPages.single[i].pagid = res.data.data.idlist[0].id
	  						}
	  					}
	  				}else if(this.addType == 'new') {
	  					for(let i=0; i<this.$store.state.stepPages.article.length; i++) {
	  						if(this.$store.state.stepPages.article[i].lmid == res.data.data.lmid) {
	  							for(let j=0; j<this.$store.state.stepPages.article[i].newList.length; j++) {
	  								this.$store.state.stepPages.article[i].newList[j].nid = res.data.data.idlist[j].id
	  							}
	  						}
	  					}
	  				}
	  				const jumpItem = document.querySelectorAll('.jump')
						let jumpTop = jumpItem[this.homeHash].offsetTop - 50 + 'px'
						$("html,body").animate({ scrollTop: jumpTop}, 1200, 'swing')



	  				// this.$store.commit('reloadToggleHandel', false)
	  				// setTimeout(()=> {
	  				// 	this.$store.commit('reloadToggleHandel', true)
       //  			this.$store.commit('passtoggleHandle', false)
	  				// }, 100)
			}else {
				alert(res.data.msg)
			}
		},
		closeMaskHandel() {
			for(let i=0; i<this.modelList.length; i++) {
				this.$store.state.addModel.modelList[i].maskOnoff = false
			}
		},
		maskHandel(index) {
			for(let i=0; i<this.modelList.length; i++) {
				this.$store.state.addModel.modelList[i].maskOnoff = false
			}
			this.$store.state.addModel.modelList[index].maskOnoff = true
		},
		closeAddSection() {
			this.$store.commit('addmodeltoggleHandle', false)
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.addSection
	width: 300px
	height: 100%
	position: absolute
	top: 0px
	left: 0px
	transform: translateX(-80px)
	background: #e5e5e5
	padding: 0 0 15px
	z-index: 0
	transition: all 0.3s
	.title
		text-align: center
		h3
			margin: 0
			line-height: 44px
			font-size: 18px
			color: #4b5056
		i
			position: absolute
			top: 5px
			right: 10px
			font-size: 20px
			cursor: pointer
	.list
		overflow: auto
		height: 100%
		ul
			padding-bottom: 30px
		li
			padding: 0 20px
			margin-bottom: 15px
			h6
				margin-bottom: 0
				line-height: 24px
				font-size: 13px
				color: #62418d
				font-weight: 600
				i
					margin-right: 10px
			.modularWrap
				height: 140px
				overflow: hidden
				background: #fff
				position: relative
				background: #fff
				box-shadow: 0 1px 5px #ccc
				.nei
					transform: scale(.5)
					transform-origin: top left
					width: 200%
					height: 200%
					>>> .schedule
						padding:0 !important
						.title
							display: none
						.container
							.list
								min-height: auto
								.text
									h4
										display: none
									p
										font-size: 12px
										.ql-editor
											font-size: 12px
									h3
										font-size: 16px
										.ql-editor
											font-size: 16px
											p
												font-size: 16px



					>>> .container
						width: auto
					>>> .layout-btn
						display: none
					>>> .product
						padding: 0
					>>> .titleWrap
						padding: 85px 0
						.addImg
							display: none
						.addBtn
							display: none
					>>> .down-btn
						padding: 10px 0
						.btnEditor
							display: none
					>>> .albumPhoto
						padding: 10px 0
						.title
							margin: 5px auto
						.imgList
							ul
								li
									img
										height: 80px
										min-height: 80px
										min-width: 80px
					>>> .purt-text
						padding: 0
						.title
							margin: 0 !important
						.container
							width: 80%
							li
								h3
									margin: 5px 0
								h6
									margin: 0
					>>> .contact
						padding-top: 0
						.title
							margin-bottom: 10px
							h3
								.ql-editor
									font-size: 24px
							h6
								.ql-editor
									padding: 3px
									font-size: 12px
						.user
							input
								height: 24px
								font-size: 12px
							textarea
								height: 50px
							.inner
								li
									&:nth-of-type(3)
										display: none
									button
										padding: 10px 20px
						.addUser
							margin-left: 15px
							li
								height: 24px
								line-height: 24px
								i
									font-size: 20px
					>>> .productType
						padding: 10px
						.container
							transform-origin: top center
							transform: scale(0.8, 0.7)
							width: 100%
							max-width: 100%
							padding: 8px 0 0
							.title
								display: none
							.list
								padding: 7px 0 0
								.img
									img
										padding: 0
								.text
									padding: 0 15px
								h3
									margin: 0
								.btnWrap
									display: none
					>>> .grid
						padding-top: 18px
						.container
							transform: scale(0.8, 0.7)
							transform-origin: top center
							padding: 3px 0 0
							.title
								display: none
					>>> .broadWrap
						.swiper
							.swiper-list
								img
									height: 100%
									width: 200%
									transform: translateX(-25%)
								button
									display: none
						.swiper-button-prev
							transform: translateX(0)
							opacity: 1
							height: 82%
						.swiper-button-next
							transform: translateX(0)
							opacity: 1
							height: 82%
						.addList
							display: none
					>>> .boradWrap2
						.swiper-wrapper
							.swiper-slide
								padding: 20px 0
								.editImg
									display: none
								.img
									padding-top: 30px
									img
										width: 60%
								.text
									h3
										font-size: 24px
										.ql-editor
											font-size: 24px
									p
										.ql-editor
											font-size: 14px
									.btnEdit
										a
											padding: 7px 12px	
						.swiper-button-prev
							top: 28%
						.swiper-button-next
							top: 28%
						.addList
							display: none
					>>> #site01
						.content
							.text
								h3
									font-size: 40px
									.ql-editor
										font-size: 40px
					>>> .column-wrap
						padding: 0
						.titleWrap
							padding: 0
							display: none
						.gridList
							.layout01
								padding: 5px !important
								max-height: 140px !important
								min-height: auto !important
								.btnWrap
									display: none
					>>> .team-wrap
						max-height: 250px
						min-height: 280px
						.inner
							padding-top: 15px !important
							position: absolute
							.nei
								padding: 0 24px
								width: 68%
							h2
								font-size: 16px
								.ql-editor
									font-size: 16px
									p
										font-size: 16px
							h5
								margin: 5px 0
							p
								font-size: 14px
								line-height: 24px
								.ql-editor
									font-size: 14px
							.btn-wrap
								a
									padding: 6px 12px
				.mask
					position: absolute
					top: 0
					right: 0
					bottom: 0
					left: 0
					background: rgba(0, 0, 0, 0.7)
					text-align: center
					// padding: 40px
					color: #fff
					transition: all .3s
					opacity: 0
					cursor: pointer
					display: flex
					justify-content: center
					align-items: center
					padding: 0 20px
				.maskShow
					opacity: 1
.activer
	transform: translateX(220px)
	box-shadow: 3px 1px 16px #333
</style>