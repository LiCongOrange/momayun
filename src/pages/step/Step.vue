<template>
<div>
	<index-header></index-header>
	<crumbs></crumbs>
	<div class="container">
		<div class="titleTab">
			<div class="tabText">
				<div class="inner">
					<div v-for="(item, index) in navItem" class="innerlist" :class="{active: item.switch}">
						<p>{{item.name}}</p>
					</div>
				</div>
			</div>
			<!-- <div class="line-bg">
				<div></div>
				<div></div>
			</div> -->
			<!-- <ul>
				<li 
					v-for="(item, index) in navItem" 
					:class="{ active: item.switch }"
				>{{item.name}}<i class="iconfont">&#xe72d;</i></li>
			</ul>
			<span ref="moveActive"></span> -->
		</div>
		<div class="conTab">
				<transition name="fade" mode="out-in">
					<keep-alive>
						<component 
							@handleChoice="handleChoiceClick" 
							:list="randomList"
							:is="stepList[stepIndex]"
						></component>
					</keep-alive>
				</transition>
		</div>
		<div class="content-btn">
			<div class="oneStep" v-if="stepIndex === 0">
				<el-button @click="nextStep(1)" type="primary">完成继续下一步</el-button>
			</div>
			<div class="twoStep" v-else-if="stepIndex === 1">
				<el-button @click="preStep(0)" type="primary">返回修改上一步</el-button>
				<el-button @click="nextStep(2)" type="primary">完成继续下一步</el-button>
			</div>
			<div class="threeStep" v-else>
				<el-button @click="preStep(1)" type="primary">返回修改上一步</el-button>
				<el-button @click="handleSiteFinish" type="primary">完成建站</el-button>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import IndexHeader from '@/common/Header'
import Crumbs from '@/common/Crumbs'
import oneSteps from './components/oneSteps'
import twoSteps from './components/twoSteps'
import threeSteps from './components/threeSteps'
export default {
	components: {
		IndexHeader,
		Crumbs,
		'one-step': oneSteps,
		'two-step': twoSteps,
		'three-step': threeSteps
	},
	data() {
		return {
			randomList: [],
			choiceType: '',
			stepList: ['one-step', 'two-step', 'three-step'],
			stepIndex: 0,
			navItem: [{
				name: '第一步：填写基本信息',
				switch: true
			}, {
				name: '第二步：栏目设置',
				switch: false
			}, {
				name: '第三步：生成模板',
				switch: false
			}]
		}
	},
	computed: {
		...mapState({
			siteId: state => state.threeStep.siteId,
			hyid: state => state.threeStep.yhid,
			pageToggle: state => state.pageToggle,
			columnList: state => state.threeStep.columnList,
			columnList2: state => state.threeStep.columnList2,
			stepPages: state => state.stepPages,
			columnText: state => state.threeStep.columnText,
			bannerIndex: state => state.bannerIndex,
			siteName: state => state.threeStep.siteName
		})
	},
	watch: {
		stepIndex(val) {
			if(val == '1') {
				this.navItem[0].switch = true
				this.navItem[1].switch = true
				this.navItem[2].switch = false
			}else if(val == '2') {
				this.navItem[0].switch = true
				this.navItem[1].switch = true
				this.navItem[2].switch = true
			}else {
				this.navItem[0].switch = true
				this.navItem[1].switch = false
				this.navItem[2].switch = false
			}
		}
	},
	mounted() {
		this.handleClick(this.stepIndex)
		this.$store.state.navigation1 = '产品中心'
		this.$store.state.navigation2 = '智能建站'
		this.$store.state.navigation3 = '新建站点'
	},
	methods: {
		handleChoiceClick(val) {
			this.choiceType = val
		},
		handleSiteFinish() {
			if(this.choiceType === '01') {
				this.complete()
			}else if(this.choiceType === '02') {
				this.$axios({
						method: 'post',
						url: '/api/Showsite/modeltwoinfo',
	     			data: { wid: this.siteId }
				}).then((res)=> {
					if(res.data.code == '200') {
						window.location.href = '/index/index/site'
					}else {
						this.$message({
							type: 'error',
							message: res.data.msg
						})
					}
				})
			}else {
				this.$message({
          message: '请选择其中一种模板样式',
          type: 'warning'
        });
			}
		},
		complete() {
			this.$store.state.stepPages.headText = []
			this.$store.state.stepPages.bannerText = []
			this.$store.state.stepPages.productText = []
			this.$store.state.stepPages.newText = []
			this.$store.state.stepPages.teamText = []
			this.$store.state.stepPages.recruitText = []
			this.$store.state.stepPages.contactText = []
			this.$store.state.stepPages.footText = []
			if(this.pageToggle) {
				for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
					if(this.bannerIndex == '0') {
						this.$store.state.stepPages.banner[i].broadcastImg = []
					}else if(this.bannerIndex == '1') {
						this.$store.state.stepPages.banner[i].broadcastImg = []
						this.$store.state.stepPages.banner[i].titleFn = ''
						this.$store.state.stepPages.banner[i].btnToggle = true
					}else if(this.bannerIndex == '2') {
						this.$store.state.stepPages.banner[i].broadcastImg = []
						this.$store.state.stepPages.banner[i].title = ''
						this.$store.state.stepPages.banner[i].titleFn = ''
						this.$store.state.stepPages.banner[i].btnToggle = false
						this.$store.state.stepPages.banner[i].maskingToggle = false
					}else if(this.bannerIndex == '3') {
						this.$store.state.stepPages.banner[i].title = ''
						this.$store.state.stepPages.banner[i].titleFn = ''
						for(let j=0; j<this.$store.state.stepPages.banner[i].broadcastImg.length; j++) {
							this.$store.state.stepPages.banner[i].broadcastImg[j].title = ''
							this.$store.state.stepPages.banner[i].broadcastImg[j].content = ''
						}
					}else if(this.bannerIndex == '4') {
						this.$store.state.stepPages.banner[i].title = ''
						this.$store.state.stepPages.banner[i].titleFn = ''
					}
				}
				// for(let i=0; i<this.stepPages.single.length; i++) {
				// 	this.$store.state.stepPages.single[i].content = ''
				// }
				for(let i=0; i<this.columnList.length; i++) {
					for(let j=0; j<this.stepPages.head.length; j++) {
						if(this.columnList[i].pid == this.stepPages.head[j].lmid) {
							this.$store.state.stepPages.headText.push(this.stepPages.head[j])
						}
					}
					for(let j=0; j<this.stepPages.banner.length; j++) {
						if(this.columnList[i].pid == this.stepPages.banner[j].lmid) {
							this.$store.state.stepPages.bannerText.push(this.stepPages.banner[j])
						}
					}
					for(let j=0; j<this.stepPages.product.length; j++) {
						if(this.columnList[i].pid == this.stepPages.product[j].lmid) {
							this.$store.state.stepPages.productText.push(this.stepPages.product[j])
						}
					}
					for(let j=0; j<this.stepPages.article.length; j++) {
						if(this.columnList[i].pid == this.stepPages.article[j].lmid) {
							this.$store.state.stepPages.newText.push(this.stepPages.article[j])
						}
					}
					for(let j=0; j<this.stepPages.single.length; j++) {
						if(this.columnList[i].pid == this.stepPages.single[j].lmid) {
							this.$store.state.stepPages.teamText.push(this.stepPages.single[j])
						}
					}
					for(let j=0; j<this.stepPages.recruit.length; j++) {
						if(this.columnList[i].pid == this.stepPages.recruit[j].lmid) {
							this.$store.state.stepPages.recruitText.push(this.stepPages.recruit[j])
						}
					}
					for(let j=0; j<this.stepPages.contact.length; j++) {
						if(this.columnList[i].pid == this.stepPages.contact[j].lmid) {
							this.$store.state.stepPages.contactText.push(this.stepPages.contact[j])
						}
					}
					for(let j=0; j<this.stepPages.foot.length; j++) {
						if(this.columnList[i].pid == this.stepPages.foot[j].lmid) {
							this.$store.state.stepPages.footText.push(this.stepPages.foot[j])
						}
					}
				}
				for(let i=0; i<this.$store.state.stepPages.productText.length; i++) {
					for(let j=1; j<this.$store.state.stepPages.productText.length; j++) {
						if(this.$store.state.stepPages.productText[i].lmid == this.$store.state.stepPages.productText[j].lmid) {
							this.$store.state.stepPages.productText.splice(j, 1)
						}
					}
				}
			}else {
				for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
					if(this.$store.state.stepPages.banner[i].title) {
						this.$store.state.stepPages.banner[i].broadcastImg = []
					}
					if(this.$store.state.stepPages.banner[i].noText) {
						for(let j=0; j<this.$store.state.stepPages.banner[i].broadcastImg.length; j++) {
							this.$store.state.stepPages.banner[i].broadcastImg[j].title = ''
							this.$store.state.stepPages.banner[i].broadcastImg[j].content = ''
						}
					}
				}
				for(let i=0; i<this.columnList2.length; i++) {
					for(let j=0; j<this.stepPages.head.length; j++) {
						if(this.columnList2[i].id == this.stepPages.head[j].lmid) {
							this.$store.state.stepPages.headText.push(this.stepPages.head[j])
						}
					}
					for(let j=0; j<this.stepPages.foot.length; j++) {
						if(this.columnList2[i].id == this.stepPages.foot[j].lmid) {
							this.$store.state.stepPages.footText.push(this.stepPages.foot[j])
						}
					}
					if(this.columnList2[i].sonColumn) {
						for(let j=0; j<this.columnList2[i].sonColumn.length; j++) {

							for(let n=0; n<this.stepPages.banner.length; n++) {
								if(this.columnList2[i].sonColumn[j].pid == this.stepPages.banner[n].lmid) {
									this.$store.state.stepPages.bannerText.push(this.stepPages.banner[n])
								}
							}
							for(let n=0; n<this.stepPages.product.length; n++) {
								if(this.columnList2[i].sonColumn[j].pid == this.stepPages.product[n].lmid) {
									this.$store.state.stepPages.productText.push(this.stepPages.product[n])
								}
							}
							for(let n=0; n<this.stepPages.article.length; n++) {
								if(this.columnList2[i].sonColumn[j].pid == this.stepPages.article[n].lmid) {
									this.$store.state.stepPages.newText.push(this.stepPages.article[n])
								}
							}
							for(let n=0; n<this.stepPages.single.length; n++) {
								if(this.columnList2[i].sonColumn[j].pid == this.stepPages.single[n].lmid) {
									this.$store.state.stepPages.teamText.push(this.stepPages.single[n])
								}
							}
							for(let n=0; n<this.stepPages.recruit.length; n++) {
								if(this.columnList2[i].sonColumn[j].pid == this.stepPages.recruit[n].lmid) {
									this.$store.state.stepPages.recruitText.push(this.stepPages.recruit[n])
								}
							}
							for(let n=0; n<this.stepPages.contact.length; n++) {
								if(this.columnList2[i].sonColumn[j].pid == this.stepPages.contact[n].lmid) {
									this.$store.state.stepPages.contactText.push(this.stepPages.contact[n])
								}
							}
						}
					}
				}
				for(let i=0; i<this.$store.state.stepPages.contactText.length; i++) {
					for(let j=1; j<this.$store.state.stepPages.contactText.length; j++) {
						if(this.$store.state.stepPages.contactText[i].lmid == this.$store.state.stepPages.contactText[j].lmid) {
							this.$store.state.stepPages.contactText.splice(j, 1)
						}
					}
				}
			}
			// 模块内容去重
			let hash = {}
			let bannerText2 = this.$store.state.stepPages.bannerText
			const newArr = bannerText2.reduceRight((item, next) => {
				hash[next.lmid] ? '' : hash[next.lmid] = true && item.push(next)
				return item
			}, [])
			this.$store.state.stepPages.bannerText = newArr

			this.$axios({
				method: 'post',
				url: '/api/Ctstation/thirdstep',
				data: this.$store.state,
				transformRequest: [function(data) {
					let ret = {}
					if(data.pageToggle) {
						ret = {
							site_id: data.threeStep.siteId,
							columnList: data.threeStep.columnList,
							headerText: data.stepPages.headText,
							newText: data.stepPages.newText,
							teamText: data.stepPages.teamText,
							recruitText: data.stepPages.recruitText,
							bannerText: data.stepPages.bannerText,
							productText: data.stepPages.productText,
							contactText: data.stepPages.contactText,
							footText: data.stepPages.footText
						}
					}else {
						ret = {
							site_id: data.threeStep.siteId,
							columnList: data.threeStep.columnList2,
							headerText: data.stepPages.headText,
							newText: data.stepPages.newText,
							teamText: data.stepPages.teamText,
							recruitText: data.stepPages.recruitText,
							bannerText: data.stepPages.bannerText,
							productText: data.stepPages.productText,
							contactText: data.stepPages.contactText,
							footText: data.stepPages.footText
						}
					}
					return JSON.stringify(ret)
				}],
				headers: {
					'Content-Type': 'application/json;charset=UTF-8'
				},
			}).then((res) => {
				if(res.data.code == '200') {
					window.location.href = '/index/index/site'
				}
				if(res.data.code == '404') {
					alert(res.data.msg)
				}
			})
		},
		addSteptext() {
			if(this.pageToggle) {
				for(let i=0; i<this.$store.state.threeStep.columnList; i++) {
					if(this.$store.state.threeStep.columnList[i].type == 'header') {

					}
				}
			}else {
				for(let i=0; i<this.$store.state.threeStep.columnList2.length; i++) {

				}
			}
		},
		handlePostId() {
			this.$axios({
				// method: 'get',
				// url: '/api/random.json'
				method: 'post',
				url: '/api/Ctstation/random',
				data: {
					yhid: this.hyid || '123',
					ispage: this.pageToggle
				}
			}).then((res)=> {
				if(res.data.code == '200') {
					this.randomList = res.data.data
				}else {
					this.$message({
						type: 'error',
						message: res.data.msg
					})
				}
			})
		},
		nextStep(val) {
			if(val == 1) {
				if(this.userType == '8') {
					if(this.siteName) {
						this.stepIndex = 1
						this.handleClick(val)
					}else {
						this.stepIndex = 0
						this.$message.error('网站名称不能为空')
					}
				}else {
					this.stepIndex = 1
					this.handleClick(val)
				}
			}else if(val == 2) {

				this.stepIndex = 2   // 测试用

				if(this.randomList.length === 0) {
					this.handlePostId()
				}
				this.$store.state.threeStep.columnText = []
				let obj = {}
				if(this.pageToggle) {
					for(let i=0; i<this.columnList.length; i++) {
						if(this.columnList[i].type != 'header' && this.columnList[i].type != 'footer') {
								obj = {
									lanmuid: this.columnList[i].pid,
									pid: 0,
									lmname: this.columnList[i].name,
									pagetype: this.columnList[i].pageType
								}
								this.$store.state.threeStep.columnText.push(obj)
						}
					}
				}else {
					for(let i=1; i<this.columnList2.length; i++) {
						if(this.columnList2[i].isguan == '1') {
							obj = {
								isguan: 1,
								lanmuid: this.columnList2[i].id,
								pid: 0,
								lmname: this.columnList2[i].name,
								pagetype: this.columnList2[i].pageType
							}
							this.$store.state.threeStep.columnText.push(obj)
							for(let j=0; j<this.columnList2[i].sonColumn.length; j++) {
								if(this.columnList2[i].sonColumn[j].isguan == '0') {

								}else {
									obj = {
										lanmuid: this.columnList2[i].sonColumn[j].pid,
										pid: 0,
										lmname: this.columnList2[i].sonColumn[j].name,
										pagetype: this.columnList2[i].sonColumn[j].pageType
									}
									this.$store.state.threeStep.columnText.push(obj)
								}
							}
						}else if(this.columnList2[i].type != 'footer' && this.columnList2[i].type != 'details') {
							for(let j=0; j<this.columnList2[i].sonColumn.length; j++) {
								obj = {
									isindex: 1,
									lanmuid: this.columnList2[i].sonColumn[j].pid,
									pid: 0,
									lmname: this.columnList2[i].sonColumn[j].name,				
									pagetype: this.columnList2[i].sonColumn[j].pageType	
								}
								this.$store.state.threeStep.columnText.push(obj)
							}
						}
					}
				}
				if(this.pageToggle) {
					this.$store.state.pageToggle2 = 1
					this.$store.state.threeStep.columnList123 = this.$store.state.threeStep.columnList
				}else {
					this.$store.state.pageToggle2 = 2
					this.$store.state.threeStep.columnList123 = this.$store.state.threeStep.columnList2
				}
				let hash = {}
				let columnText2 = this.$store.state.threeStep.columnText
				const newArr = columnText2.reduceRight((item, next) => {
					hash[next.lanmuid] ? '' : hash[next.lanmuid] = true && item.push(next)
					return item
				}, [])
				this.$store.state.threeStep.columnText = newArr
				this.$axios({
					// method: 'get',
					// url: '/api/secondstep.json',
					method: 'post',
					url: '/api/Ctstation/secondstep',
					data: this.$store.state,
					transformRequest: [function(data) {
						let obj = {
							companyName: data.threeStep.companyName,
							provid: data.threeStep.provinceId,
							cityid: data.threeStep.cityId,
							countyid: data.threeStep.countyId,
							classifyName: data.threeStep.classifyName,
							siteName: data.threeStep.siteName, 
							address: data.threeStep.address,
							telephone: data.threeStep.telephone,
							email: data.threeStep.email,
							penguin: data.threeStep.penguin,
							wechat: data.threeStep.wechat,
							seoTitle: data.threeStep.seoTitle, 
							keywords: data.threeStep.keywords, 
							description: data.threeStep.description, 
							lanmuList: data.threeStep.columnText,
							pageToggle: data.pageToggle2,
							hyid: data.threeStep.yhid,
							weixinpic: data.threeStep.wechatUrl
						}
						return JSON.stringify(obj)
					}],
					headers: {
						'Content-Type': 'application/json;charset=UTF-8'
					}
				}).then((res)=>{
					if(res.data.code == '200') {
						this.stepIndex = 2
						this.$store.state.threeStep.siteId = res.data.data.site_id
						this.$store.state.stepPages.beijingList = res.data.data.beijingimg
						for(let i=0; i<this.$store.state.stepPages.article.length; i++) {
							this.$store.state.stepPages.article[i].newList = res.data.data.newlist
						}
						for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
							if(this.$store.state.stepPages.banner[i].broadcastImg) {
								this.$store.state.stepPages.banner[i].broadcastImg = res.data.data.bannerList
							}
							if(this.$store.state.stepPages.banner[i].title) {
								this.$store.state.stepPages.banner[i].title = res.data.data.bannerList[0].title
								this.$store.state.stepPages.banner[i].bgImg = res.data.data.bannerList[0].picurl
								this.$store.state.stepPages.banner[i].bid = res.data.data.bannerList[0].imgid
							}
							if(this.$store.state.stepPages.banner[i].titleFn) {
								this.$store.state.stepPages.banner[i].titleFn = res.data.data.bannerList[0].content
							}
						}
						for(let i=0; i<res.data.data.bannerList.length; i++) {
							let obj = res.data.data.bannerList[i].picurl
							this.$store.state.stepPages.bannerList.push(obj)
						}
						for(let i=0; i<this.$store.state.stepPages.recruit.length; i++) {
							this.$store.state.stepPages.recruit[i].recruitList = res.data.data.joblist
						}
						for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
							this.$store.state.stepPages.product[i].productList = res.data.data.productList
						}
						for(let i=0; i<this.$store.state.stepPages.single.length; i++) {
							this.$store.state.stepPages.single[i].picurl = res.data.data.teamList[parseInt(Math.random()*res.data.data.teamList.length)].picurl
							this.$store.state.stepPages.single[i].modularName = res.data.data.teamList[parseInt(Math.random()*res.data.data.teamList.length)].title
							this.$store.state.stepPages.single[i].modularNameLetter = res.data.data.teamList[parseInt(Math.random()*res.data.data.teamList.length)].titleFn
							this.$store.state.stepPages.single[i].content = res.data.data.teamList[parseInt(Math.random()*res.data.data.teamList.length)].content
						}
						if(this.pageToggle) {
							for(let i=0; i<this.columnList.length; i++) {
								for(let j=0; j<res.data.data.lanmuList.length; j++) {
									if(this.columnList[i].pid == res.data.data.lanmuList[j].lmid) {
										this.$store.state.threeStep.columnList[i].pid = res.data.data.lanmuList[j].lanmuid
									}
								}	
							}
							for(let i=0; i<this.stepPages.banner.length; i++) {
								for(let j=0; j<res.data.data.lanmuList.length; j++) {
									if(this.stepPages.banner[i].lmid == res.data.data.lanmuList[j].lmid) {
										this.$store.state.stepPages.banner[i].lmid = res.data.data.lanmuList[j].lanmuid
									}
								}
							}
							for(let i=0; i<this.stepPages.product.length; i++) {
								for(let j=0; j<res.data.data.lanmuList.length; j++) {
									if(this.stepPages.product[i].lmid == res.data.data.lanmuList[j].lmid) {
										this.$store.state.stepPages.product[i].lmid = res.data.data.lanmuList[j].lanmuid
									}
								}
							}
							for(let i=0; i<this.stepPages.article.length; i++) {
								for(let j=0; j<res.data.data.lanmuList.length; j++) {
									if(this.stepPages.article[i].lmid == res.data.data.lanmuList[j].lmid) {
										this.$store.state.stepPages.article[i].lmid = res.data.data.lanmuList[j].lanmuid
									}
								}
							}
							for(let i=0; i<this.stepPages.single.length; i++) {
								for(let j=0; j<res.data.data.lanmuList.length; j++) {
									if(this.stepPages.single[i].lmid == res.data.data.lanmuList[j].lmid) {
										this.$store.state.stepPages.single[i].lmid = res.data.data.lanmuList[j].lanmuid
									}
								}
							}
							for(let i=0; i<this.stepPages.recruit.length; i++) {
								for(let j=0; j<res.data.data.lanmuList.length; j++) {
									if(this.stepPages.recruit[i].lmid == res.data.data.lanmuList[j].lmid) {
										this.$store.state.stepPages.recruit[i].lmid = res.data.data.lanmuList[j].lanmuid
									}
								}
							}
							for(let i=0; i<this.stepPages.contact.length; i++) {
								for(let j=0; j<res.data.data.lanmuList.length; j++) {
									if(this.stepPages.contact[i].lmid == res.data.data.lanmuList[j].lmid) {
										this.$store.state.stepPages.contact[i].lmid = res.data.data.lanmuList[j].lanmuid
									}
								}
							}
							// console.log(this.$store.state.stepPages.contact)
						}else {
							for(let i=0; i<this.columnList2.length; i++) {
								
								for(let n=0; n<res.data.data.lanmuList.length; n++) {
									if(this.columnList2[i].id == res.data.data.lanmuList[n].lmid) {
										this.$store.state.threeStep.columnList2[i].id = res.data.data.lanmuList[n].lanmuid
									}
								}
								
								if(this.columnList2[i].sonColumn) {
									for(let j=0; j<this.columnList2[i].sonColumn.length; j++) {
										for(let n=0; n<res.data.data.lanmuList.length; n++) {
											if(this.columnList2[i].sonColumn[j].pid == res.data.data.lanmuList[n].lmid) {
												this.$store.state.threeStep.columnList2[i].sonColumn[j].pid = res.data.data.lanmuList[n].lanmuid
											}
										}
									}
								}
							}
							for(let i=0; i<this.stepPages.banner.length; i++) {
								for(let j=0; j<res.data.data.lanmuList.length; j++) {
									if(this.stepPages.banner[i].lmid == res.data.data.lanmuList[j].lmid) {
										this.$store.state.stepPages.banner[i].lmid = res.data.data.lanmuList[j].lanmuid
									}
								}
							}							
							for(let i=0; i<this.stepPages.product.length; i++) {
								for(let j=0; j<res.data.data.lanmuList.length; j++) {
									if(this.stepPages.product[i].lmid == res.data.data.lanmuList[j].lmid) {
										this.$store.state.stepPages.product[i].lmid = res.data.data.lanmuList[j].lanmuid
									}
								}
							}
							for(let i=0; i<this.stepPages.article.length; i++) {
								for(let j=0; j<res.data.data.lanmuList.length; j++) {
									if(this.stepPages.article[i].lmid == res.data.data.lanmuList[j].lmid) {
										this.$store.state.stepPages.article[i].lmid = res.data.data.lanmuList[j].lanmuid
									}
								}
							}
							for(let i=0; i<this.stepPages.single.length; i++) {
								for(let j=0; j<res.data.data.lanmuList.length; j++) {
									if(this.stepPages.single[i].lmid == res.data.data.lanmuList[j].lmid) {
										this.$store.state.stepPages.single[i].lmid = res.data.data.lanmuList[j].lanmuid
									}
								}
							}
							for(let i=0; i<this.stepPages.recruit.length; i++) {
								for(let j=0; j<res.data.data.lanmuList.length; j++) {
									if(this.stepPages.recruit[i].lmid == res.data.data.lanmuList[j].lmid) {
										this.$store.state.stepPages.recruit[i].lmid = res.data.data.lanmuList[j].lanmuid
									}
								}
							}
							for(let i=0; i<this.stepPages.contact.length; i++) {
								for(let j=0; j<res.data.data.lanmuList.length; j++) {
									if(this.stepPages.contact[i].lmid == res.data.data.lanmuList[j].lmid) {
										this.$store.state.stepPages.contact[i].lmid = res.data.data.lanmuList[j].lanmuid
									}
								}
							}
						}
					}else {
						alert(res.data.msg)
					}
				})
				this.handleClick(val)
			}else{
				this.stepIndex = 0
				this.handleClick(val)
			}
		},
		preStep(val) {
			if(val == 0) {
				this.stepIndex = 0
			}else{
				this.stepIndex = 1
				this.$store.commit('pageOnoffHandel', false)
			}
			this.handleClick(val)
		},
		handleClick(index) {
			// for(let i=0; i<this.navItem.length; i++) {
			// 	this.navItem[i].switch = false
			// }
			// this.navItem[index].switch = true
			// if(index === 1) {
			// 	this.$refs.moveActive.style.transform = 'translateX(100%)'
			// }else if(index === 2) {
			// 	this.$refs.moveActive.style.transform = 'translateX(200%)'
			// }else{
			// 	this.$refs.moveActive.style.transform = 'translateX(0%)'
			// }
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
	.content-btn
		padding: 10px 0
		text-align: right
		.backBtn
			border: 1px solid #313131
			background: none
			color: #313131
	.titleTab
		position: relative
		margin: 0 auto
		.tabText
			.inner
				display: flex
				justify-content: space-between
			.innerlist
				min-width: 212px
				background: #fff
				padding: 0 25px
				border-left: 2px solid #ccc
				box-shadow: 0 5px 5px #ccc
				text-align: center
				transition: all .3s
				p
					margin: 0
					line-height: 62px
					font-size: 16px
			.active
				border-left: 2px solid
				border-image: linear-gradient(#0068cf, #19ffa7) 5 5  
				transform: translateY(10%)
		.line-bg
			height: 2px
			div
				float: left
				height: 2px
				width: 50%
				display: inline-block
				background: linear-gradient(left, #02ad69, blue)
		span
			position: absolute
			left: 0
			top: 1px
			width: 33.33333%
			height: 66px
			display: block
			background: $bgColor
			border-radius: 30px
			transform: translateX(0)
			transition: all 0.5s
		ul
			border: 1px solid #000
			border-radius: 30px
			display: flex
			position: relative
			z-index: 10
			li
				flex: 1
				border-radius: 30px
				text-align: center
				height: 66px
				line-height: 66 px
				font-size: 18px
				transition: all 0.3s
				i
					margin-left: 5px
					font-size: 20px
					color: $bgColor
			.active
				color: #fff
	.conTab
		margin-top: 20px
.fade-enter-active, .fade-leave-active
	transition: opacity .2s ease
.fade-enter, .fade-leave-to
	opacity: 0
</style>