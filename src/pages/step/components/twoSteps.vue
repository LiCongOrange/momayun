<template>
	<div class="twoSteps">
		<div class="content">
			<div class="title" :class="titleClass">
				<span>{{ columnName }}</span>
				<!-- <button>关闭</button> -->
				<div class="title-right">
					<div class="addColumn" v-if="pageToggle">
						<el-button @click="addCloumn" type="primary" size="small">添加栏目</el-button>
						<el-button v-if="pageOnoff" @click="pageHandle('01')" type="primary" size="small">开启多页面</el-button>
						<!-- <button class="btn btn-default" @click="addCloumn">添加栏目</button> -->
						<!-- <button v-if="pageOnoff" class="btn btn-default" @click="pageHandle('01')">开启多页面</button> -->
					</div>
					<div class="addColumn" v-else>
						<el-button @click="addPage" type="primary" size="small">页面添加</el-button>
						<el-button v-if="pageOnoff" @click="pageHandle('02')" type="primary" size="small">开启单页面</el-button>
						<!-- <button class="btn btn-default" @click="addPage">页面添加</button> -->
						<!-- <button v-if="pageOnoff" class="btn btn-default" @click="pageHandle('02')">开启单页面</button> -->
					</div>
				</div>
			</div>
			<ul class="tableList" v-if="pageToggle">
				<li class="li-title">
					<span>栏目名称</span>
					<span>栏目类型</span>
					<span>开启栏目</span>
					<span>操作</span>
					<span>顺序调整</span>
					<!-- <span>添加子栏目</span> -->
				</li>
				<li 
						v-for="(item, index) in columnList" 
						v-if="item.plus"
				>
					<div class="inner">
						<span v-text="item.name" v-if="item.inputOnoff"></span>
						<div class="input" v-else>
							<el-input 
								v-model="item.name"
								@input="inputFunc('01', item.name, index)"
								clearable
							></el-input>
							<!-- <input 
								type="text" 
								v-model="item.name" 
								autofocus="autofocus" 
								v-on:blur="changeCount(index)"
								v-on:input="inputFunc('01', item.name, index)"
							> -->
						</div>
						<span v-text="item.typeName" v-if="item.inputOnoff"></span>
						<el-select v-model="selected" v-else>
					    <el-option
					      v-for="item in options"
					      :key="item.value"
					      :label="item.label"
					      :value="item.value">
					    </el-option>
					  </el-select>
						<!-- <select 
							v-else 
							v-model="selected"
							@change="getVal('01', selected, index, item.type, item.pid)"
						>
							<option selected>请选择</option>
							<option>单页</option>
							<option>文章页</option>
							<option>产品页</option>
							<option>招聘页</option>
						</select> -->
						<span v-if="item.editOnoff" class="iconfont color">开启</span>
						<span v-else class="iconfont color red">关闭</span>
						<span v-if="item.editOnoff">
							<a href="javascript:;" @click="editClick('01', index, item.typeName)">编辑</a>
							<a href="javascript:;" v-if="item.operation" @click="deleter('01', index, item.pid, item.pageType)">删除</a>
						</span>
						<span v-else>
							<i>编辑</i>
							<i v-if="item.operation">删除</i>
						</span>
						<span class="moveicon">
							<i class="iconfont down" @click="upHandel('01', '1', index)">&#xe671;</i>
							<i class="iconfont up" @click="upHandel('01', '2', index)">&#xe66f;</i>
						</span>
						<!-- <span class="iconfont">&#xe6df;</span> -->
					</div>
				</li>
			</ul>
			<ul class="tableList" v-else>
				<li class="li-title">
					<span>页面名称</span>
					<span>页面类型</span>
					<span>开启栏目</span>
					<span>操作</span>
					<span>顺序调整</span>
					<!-- <span>添加子栏目</span> -->
				</li>
				<li 
						v-for="(item, index) in columnList2" 
						v-if="item.plus"
						@mouseover="getSuoyin(index)"
				>
					<div class="inner">
						<span v-text="item.name" v-if="item.inputOnoff"></span>
						<div class="input" v-else>
							<input 
								type="text" 
								v-model="item.name" 
								autofocus="autofocus" 
								v-on:blur="changeCount(index)"
								v-on:input="inputFunc('02', item.name, index)"
							>
						</div>
						<span v-text="item.typeName" v-if="item.inputOnoff"></span>
						<select 
							v-else 
							v-model="selected"
							@change="getVal('02', selected, index, item.type, item.pid)"
						>
							<option selected>请选择</option>
							<option>单页</option>
							<option>文章页</option>
							<option>产品页</option>
							<option>招聘页</option>
						</select>
						<span v-if="item.editOnoff" class="iconfont color">开启</span>
						<span v-else class="iconfont color red">关闭</span>
						<span v-if="item.editOnoff">
							<a href="javascript:;" @click="editClick('02', index, item.typeName)">编辑</a>
							<a href="javascript:;" v-if="item.operation" @click="deleter('02', index, item.id, item.pageType)">删除</a>
						</span>
						<span v-else>
							<i>编辑</i>
							<i v-if="item.operation">删除</i>
						</span>
						<span class="moveicon">
							<i class="iconfont down" @click="upHandel('02', '1', index)">&#xe671;</i>
							<i class="iconfont up" @click="upHandel('02', '2', index)">&#xe66f;</i>
						</span>
						<!-- <span class="iconfont" @click="addSoncolumn(index, item.type, item.sonColumn, item.id)">&#xe6df;</span> -->
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			titleClass: 'title',
			columnName: '单页面',
			pagesNum: 5,
			suoyin: '',
			selected: '请选择',
			index: '',
			allNum: 3,     //栏目总数
			danNum: 0,     //单页数量
			wenNum: 0,     //文章数量
			chanNum: 0,    //产品数量
			zhaoNum: 0,    //招聘数量
			danNum2: 1,     //单页面数量
			wenNum2: 1,     //文章页面数量
			chanNum2: 1,    //产品页面数量
			zhaoNum2: 1,    //招聘页面数量

			currentTypename: '',
			currentTypename2: '',
			danSection: ['team', 'team2', 'team3', 'team4', 'team5', 'team6', 'team7'],
			wenSection: ['news', 'news2', 'news3', 'news4', 'news5', 'news6', 'news7'],
			chanSection: ['product1', 'product-type' ,'product2', 'introduce', 'product3', 'product6', 'product7'],
			zhaoSection: ['recruit1', 'recruit2', 'recruit3', 'recruit4', 'recruit5', 'recruit6', 'recruit7'],
			page1Num: 5, page2Num: 0, page3Num: 0, page4Num: 0, page5Num: 0, page6Num: 0,
			page7Num: 0, page8Num: 0,
			currentNum: 0,
			options: [{
				value: '0001',
				label: '单页'
			}, {
				value: '0002',
				label: '文章页'
			}, {
				value: '0003',
				label: '产品页'
			}, {
				value: '0004',
				label: '招聘页'
			}]
		}
	},
	computed: {
		pageToggle() {
			return this.$store.state.pageToggle
		},
		columnList() {
			return this.$store.state.threeStep.columnList
		},
		columnList2() {
			return this.$store.state.threeStep.columnList2
		},
		recruitText() {
			return this.$store.state.stepPages.recruit
		},
		pageOnoff() {
			return this.$store.state.pageOnoff
		}
	},
	methods: {
		upHandel(pagetoggle, type, index) {
			if(pagetoggle == '01') {
				if(type == '1') {
					let obj = this.columnList[index]
					this.columnList.splice(index, 1)
					this.columnList.splice(index+1, 0, obj)
				}else {
					let obj = this.columnList[index]
					this.columnList.splice(index, 1)
					this.columnList.splice(index-1, 0, obj)
				}
			}else {
				if(type == '1') {
					let obj = this.columnList2[index]
					this.columnList2.splice(index, 1)
					this.columnList2.splice(index+1, 0, obj)
				}else {
					let obj = this.columnList2[index]
					this.columnList2.splice(index, 1)
					this.columnList2.splice(index-1, 0, obj)
				}
			}
		},
		addPage() {
			this.pagesNum++
			let obj = {
				id: '33' + this.chanNum2,
				isguan: 1,
				name: '页面' + this.pagesNum,
				type: 'homepage',
				typeName: '自定义页面',
				editOnoff: true,
				onOff: true,
				operation: true,
				plus: true,
				inputOnoff: true,
				checked: false,
				editOnoff1: false,
				sonColumn: [{
						pid: '220',
						name: '广告位',
						isguan: 0,
						type: 'banner',
						typeName: '系统栏目（广告位）',
						pageType: '5',
						editOnoff: false, 
						onOff: true,                
						operation: false,  
						plus: true,         
						inputOnoff: true,
						checked: true,        
						editOnoff1: true,     
						section: ['banner1', 'banner2', 'broadcast', 'broadcast02'],
						indexes: 0
					}, {
						pid: '33' + this.chanNum2,
						isguan: 1,
						name: '产品介绍',
						type: 'product',
						typeName: '产品页',
						pageType: '3',
						editOnoff: true,
						onOff: true,
						operation: true,
						plus: true,
						inputOnoff: true,
						checked: false,
						editOnoff1: true,
						section: ['product1', 'product-type' ,'product2', 'introduce', 'product3', 'product6', 'product7'],
						indexes: this.chanNum2
					}]
			}
			if(this.columnList2.length<9) {
				// this.$store.state.threeStep.columnList2.push(obj)
				this.$store.state.threeStep.columnList2.splice(this.columnList2.length-1, 0 ,obj)
			}else {
				this.pagesNum = 8
				alert('不可继续添加页面')
			}
		},
		pageHandle(type) {
			if(type == '01') {
				this.columnName = '多页面'
				this.titleClass = 'title2'
				this.$store.commit('pageToggleHandel', false)
			}else {
				this.columnName = '单页面'
				this.titleClass = 'title'
				this.$store.commit('pageToggleHandel', true)
			}
		},
		getSuoyin(index) {
			this.suoyin = index
		},
		addSoncolumn(index, type, soncolumn, ider) {
			// console.log(ider)
			if(index == 0) {
				this.currentNum = this.page1Num
			}else if(index == 1) {
				this.currentNum = this.page2Num
			}else if(index == 2) {
				this.currentNum = this.page3Num
			}else if(index == 3) {
				this.currentNum = this.page4Num
			}else if(index == 4) {
				this.currentNum = this.page5Num
			}else if(index == 5) {
				this.currentNum = this.page6Num
			}else if(index == 6) {
				this.currentNum = this.page7Num
			}else if(index == 7) {
				this.currentNum = this.page8Num
			}
			// this.currentNum = ider +""+ this.currentNum
			let obj = {
				  pid: ider +""+ this.currentNum,
					name: '名称定义',
					type: 'new',
					typeName: '文章页',
					pageType: '2',
					editOnoff: true,
					onOff: true,
					operation: true,
					plus: true,
					inputOnoff: true,
					checked: false,
					editOnoff1: true,
					section: ['news', 'news2', 'news3', 'news4', 'news5', 'news6', 'news7'],
					indexes: '0'
			}
			let objText = {
				lmid: ider +""+ this.currentNum,
				bgClass: "",
				layoutClass: "",
				modularName: '新闻中心',
				newList: [{
					"title": "腾讯推《绝地求生》Lite版 照顾低配设备“吃鸡”",
					"past": "8月10日消息腾讯和PUBG官方推出的绝地求生系列手游在国内外都有着不错的流行程度。但是该系列游戏配置要求不低，可谓是把一些中低端的手机挡在了大门之外。但是近期腾讯游戏给这些手机带来了一个好消息。据外媒DroidGamers消息，腾讯推出的Lite版“吃鸡”手游PUBGMobileLite安卓版已经正式上架GooglePlay商店。据了解，这款游戏和原版手机游戏差别不大，但是游戏地图将被缩小，通常玩家数量也从100名减少到40名。游戏仍然是通过虚幻4引擎开发，但对低内存设备进行了优化，因此对低配设备更为友好。不过如其名字PUBGMobileLite所表示的，这款游戏对应的是绝地求生手游的国际服。在国服方面，腾讯官方暂未公布相关动态。来自IT之家找优秀程序员，就在博客园收藏标签绝地求生",
					"btnToggle": true
				}, {
					"title": "H5小游戏霸屏了？",
					"past": "想必大家都有过被H5游戏刷屏的经历，大家也一定好奇过，为什么H5游戏可以造成刷屏的效果呢？",
					"btnToggle": true
				}, {
					"title": "前端三大主流框架是啥？",
					"past": "三大主流前端框架分别是React、Vue、Angular,因为它响应速度快、跨浏览器兼容，模块化，单向数据流操作",
					"btnToggle": true
				}, {
					"title": "使用互动营销的新手需要注意的事项",
					"past": "许多互动营销新手在使用互动营销时往往会忽略很多重要的因素，而这些因素很大程度上会决定了互动营销是否成功有效。这几个因素包括了时间、人员、技术、物资等等方面。本文给大...",
					"btnToggle": true
				}]
			}

			if(soncolumn.length<4) {
				this.$store.state.threeStep.columnList2[index].sonColumn.push(obj)
				this.$store.state.stepPages.article.push(objText)
			}else {
				alert('不可继续添加栏目')
			}
			if(index == 0) {
				this.page1Num++
			}else if(index == 1) {
				this.page2Num++
			}else if(index == 2) {
				this.page3Num++
			}else if(index == 3) {
				this.page4Num++
			}else if(index == 4) {
				this.page5Num++
			}else if(index == 5) {
				this.page6Num++
			}else if(index == 6) {
				this.page7Num++
			}else if(index == 7) {
				this.page8Num++
			}
			// console.log(this.$store.state.content.article)
			// console.log(this.$store.state.threeStep.columnList2)
		},
		addCloumn() {
			this.allNum++
			let obj = {
					isguan: 1,
					pid: "33" + this.allNum,
					name: '名称定义',
					type: 'product',
					typeName: '产品页',
					pageType: '3',
					editOnoff: true,
					onOff: true,
					operation: true,
					plus: true,
					inputOnoff: true,
					checked: false,
					editOnoff1: true,
					section: ['product1', 'product-type' ,'product2', 'introduce', 'product3', 'product6', 'product7'],
					indexes: this.chanNum
				}
			let objText = {
					lmid: "33" + this.allNum,
					bgClass: "",
					layoutClass: "",
					modularName: '产品介绍',
					productList: [{
						title: "码云互动",
						past: "这是一家科技型企业，并与北京XX集团（XX上市公司）强强联合打造中国新兴能源企业。远弘能源，KPG公司全程参与和策划了其销售运营过程。",
						picurl: "/static/images/product/shows/pro01.jpg"
					}, {
						title: "码云传单",
						past: "XXXX是典型出口转内销的企业，当时寻求品牌策划帮助时，其企业面临全国十大经销商挟制，年销额也只有2000多万，其企业发展前途处于风雨飘摇之中。由于企业决策者及时寻助专业品牌营销策划机构壹串通，当年销售额就增长速度超过150%。",
						picurl: "/static/images/product/shows/pro02.jpg"
					}, {
						title: "码云助手",
						past: "虽然这个词本身已经成为我们现代社会和常识的一部分，但到目前为止还不到1%的地球人口使用它。为什么？因为到目前为止，电子产品、个人电脑、智能手机以及最重要的VR眼镜的数量不足以提供",
						"picurl": "/static/images/product/shows/pro03.jpg"
					}, {
						title: "码云互动",
						past: "虽然这个词本身已经成为我们现代社会和常识的一部分，但到目前为止还不到1%的地球人口使用它。为什么？因为到目前为止，电子产品、个人电脑、智能手机以及最重要的VR眼镜的数量不足以提供",
						picurl: "/static/images/product/shows/pro04.png"
					}]
			}
			if(this.allNum <= 7) {
				this.chanNum++
				this.$store.state.threeStep.columnList.splice(this.$store.state.threeStep.columnList.length-1, 0, obj)
				this.$store.state.stepPages.product.push(objText)
			}else {
				this.allNum = 7
				alert('只能添加4个自定义栏目')
			}
			// console.log(this.$store.state.threeStep.columnList)
			// console.log(this.$store.state.stepPages.product)
		},
		deleteText(id) {
			if(this.currentTypename2 == '单页') {
				for(let i=0; i<this.$store.state.stepPages.single.length; i++) {
					if(this.$store.state.stepPages.single[i].lmid == pid) {
						this.$store.state.stepPages.single.splice(i, 1)
					}
				}
			}else if(this.currentTypename2 == '产品页') {
				for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
					if(this.$store.state.stepPages.product[i].lmid == pid) {
						this.$store.state.stepPages.product.splice(i, 1)
					}
				}
			}else if(this.currentTypename2 == '文章页') {
				for(let i=0; i<this.$store.state.stepPages.article.length; i++) {
					if(this.$store.state.stepPages.article[i].lmid == pid) {
						this.$store.state.stepPages.article.splice(i, 1)
					}
				}
			}else if(this.currentTypename2 == '招聘页') {
				for(let i=0; i<this.$store.state.stepPages.recruit.length; i++) {
					if(this.$store.state.stepPages.recruit[i].lmid == pid) {
						this.$store.state.stepPages.recruit.splice(i, 1)
					}
				}
			}
		},
		addText(val, index) {
			if(val == '单页') {
				let obj = [{
						pid: '220',
						name: '广告位',
						type: 'banner',
						typeName: '系统栏目（广告位）',
						editOnoff: false,
						onOff: true,
						operation: false,
						plus: true,
						inputOnoff: true,
						checked: true,
						editOnoff1: true,
						section: ['banner1', 'banner2', 'broadcast', 'briefing', 'broadcast02'],
						indexes: 0
					}, {
						pid: '55' + this.danNum2,
						isguan: 0,
						name: '团队介绍',
						type: 'team',
						typeName: '单页',
						editOnoff: false,
						onOff: true,
						operation: false,
						plus: true,
						inputOnoff: true,
						checked: false,
						editOnoff1: true,
						section: ['team', 'team2', 'team3', 'team4', 'team5', 'team6', 'team7'],
						indexes: this.danNum2
					}, {
						pid: '991',
						name: '联系我们',
						type: 'contact',
						typeName: '系统栏目（留言板）',
						editOnoff: false,
						onOff: true,
						operation: false,
						plus: true,
						inputOnoff: true,
						checked: false,
						editOnoff1: true,
						section: ['contact', 'contact2'],
						indexes: 1
					}]
				this.$store.state.threeStep.columnList2[index].sonColumn = obj
				this.$store.state.threeStep.columnList2[index].id = '55' + this.danNum2
			}else if(val == '文章页') {
				let obj = [{
						pid: '220',
						name: '广告位',
						type: 'banner',
						typeName: '系统栏目（广告位）',
						editOnoff: false,
						onOff: true,
						operation: false,
						plus: true,
						inputOnoff: true,
						checked: true,
						editOnoff1: true,
						section: ['banner1', 'banner2', 'broadcast', 'broadcast02'],
						indexes: 0
					}, {
						pid: '44' + this.wenNum2, 
						isguan: 0,
						name: '新闻中心',
						type: 'new',
						typeName: '文章页',
						pageType: '2',
						editOnoff: true,
						onOff: true,
						operation: true,
						plus: true,
						inputOnoff: true,
						checked: false,
						editOnoff1: true,
						section: ['news', 'news2', 'news3', 'news4', 'news5', 'news6', 'news7'],
						indexes: this.wenNum2
					}]
				this.$store.state.threeStep.columnList2[index].sonColumn = obj	
				this.$store.state.threeStep.columnList2[index].id = '44' + this.wenNum2
			}else if(val == '产品页') {
				let obj = [{
						pid: '220',
						name: '广告位',
						type: 'banner',
						typeName: '系统栏目（广告位）',
						editOnoff: false,
						onOff: true,
						operation: false,
						plus: true,
						inputOnoff: true,
						checked: true,
						editOnoff1: true,
						section: ['banner1', 'banner2', 'broadcast', 'briefing', 'broadcast02'],
						indexes: 0
					}, {
						pid: '33' + this.chanNum2,
						isguan: 0,
						name: '产品介绍',
						type: 'product',
						typeName: '产品页',
						pageType: '3',
						editOnoff: true,
						onOff: true,
						operation: true,
						plus: true,
						inputOnoff: true,
						checked: false,
						editOnoff1: true,
						section: ['product1', 'product-type' ,'product2', 'introduce', 'product3', 'product6', 'product7'],
						indexes: this.chanNum2
					}]
				this.$store.state.threeStep.columnList2[index].sonColumn = obj	
				this.$store.state.threeStep.columnList2[index].id = '33' + this.chanNum2		
			}else if(val == '招聘页') {
				let obj = [{
						pid: '220',
						name: '广告位',
						type: 'banner',
						typeName: '系统栏目（广告位）',
						editOnoff: false,
						onOff: true,
						operation: false,
						plus: true,
						inputOnoff: true,
						checked: true,
						editOnoff1: true,
						section: ['banner1', 'banner2', 'broadcast', 'briefing', 'broadcast02'],
						indexes: 0
					}, {
						pid: '66' + this.zhaoNum2,
						isguan: 0,
						name: '招聘职位',
						type: 'recruit',
						typeName: '招聘页',
						pageType: '4',
						editOnoff: true,
						onOff: true,
						operation: true,
						plus: true,
						inputOnoff: true,
						checked: false,
						editOnoff1: true,
						section: ['recruit1', 'recruit2', 'recruit3', 'recruit4', 'recruit5', 'recruit6', 'recruit7'],
						indexes: this.zhaoNum2
					}]
				this.$store.state.threeStep.columnList2[index].sonColumn = obj	
				this.$store.state.threeStep.columnList2[index].id = '66' + this.zhaoNum2	
			}
		},
		deleteText2(pid) {
			if(this.currentTypename == '单页') {
				for(let i=0; i<this.$store.state.stepPages.single.length; i++) {
					if(this.$store.state.stepPages.single[i].lmid = pid) {
						this.$store.state.stepPages.single.splice(i, 1)
					}
				}
			}else if(this.currentTypename == '产品页') {
				for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
					if(this.$store.state.stepPages.product[i].lmid == pid) {
						this.$store.state.stepPages.product.splice(i, 1)
					}
				}
			}else if(this.currentTypename == '文章页') {
				for(let i=0; i<this.$store.state.stepPages.article.length; i++) {
					if(this.$store.state.stepPages.article[i].lmid == pid) {
						this.$store.state.stepPages.article.splice(i, 1)
					}
				}
			}else if(this.currentTypename == '招聘页') {
				for(let i=0; i<this.$store.state.stepPages.recruit.length; i++) {
					if(this.$store.state.stepPages.recruit[i].lmid == pid) {
						this.$store.state.stepPages.recruit.splice(i, 1)
					}
				}
			}
		},
		addText2(val, pid) {
			if(val == '单页') {
				let obj = {
					lmid: pid,
					bgClass: "",
					layoutClass: "",
					modularName: '团队介绍',
					modularNameLetter: 'Team Introduction',
					bgImg: "/static/images/team/shows/show02.png",
					textList: [
						"帮助每个客户做专业的决策",
						"我们分享最新思想，并讨论领先组织面临的挑战",
						"帮助每个客户做专业的决策",
						"我们分享最新思想，并讨论领先组织面临的挑战"
					]
				}
				this.$store.state.stepPages.single.push(obj)
			}else if(val == '文章页') {
				let obj = {
						lmid: pid,
						bgClass: "",
						layoutClass: "",
						modularName: '新闻中心',
						newList: [{
							"title": "腾讯推《绝地求生》Lite版 照顾低配设备“吃鸡”",
							"past": "8月10日消息腾讯和PUBG官方推出的绝地求生系列手游在国内外都有着不错的流行程度。但是该系列游戏配置要求不低，可谓是把一些中低端的手机挡在了大门之外。但是近期腾讯游戏给这些手机带来了一个好消息。据外媒DroidGamers消息，腾讯推出的Lite版“吃鸡”手游PUBGMobileLite安卓版已经正式上架GooglePlay商店。据了解，这款游戏和原版手机游戏差别不大，但是游戏地图将被缩小，通常玩家数量也从100名减少到40名。游戏仍然是通过虚幻4引擎开发，但对低内存设备进行了优化，因此对低配设备更为友好。不过如其名字PUBGMobileLite所表示的，这款游戏对应的是绝地求生手游的国际服。在国服方面，腾讯官方暂未公布相关动态。来自IT之家找优秀程序员，就在博客园收藏标签绝地求生",
							"btnToggle": true
						}, {
							"title": "H5小游戏霸屏了？",
							"past": "想必大家都有过被H5游戏刷屏的经历，大家也一定好奇过，为什么H5游戏可以造成刷屏的效果呢？",
							"btnToggle": true
						}, {
							"title": "前端三大主流框架是啥？",
							"past": "三大主流前端框架分别是React、Vue、Angular,因为它响应速度快、跨浏览器兼容，模块化，单向数据流操作",
							"btnToggle": true
						}, {
							"title": "使用互动营销的新手需要注意的事项",
							"past": "许多互动营销新手在使用互动营销时往往会忽略很多重要的因素，而这些因素很大程度上会决定了互动营销是否成功有效。这几个因素包括了时间、人员、技术、物资等等方面。本文给大...",
							"btnToggle": true
						}]
				}
				this.$store.state.stepPages.article.push(obj)
			}else if(val == '产品页') {
				let obj = {
						lmid: pid,
						bgClass: "",
						layoutClass: "",
						modularName: '产品介绍',
						modularNameLetter: 'Product introduction',
						productList: [{
							"title": "码云互动",
							"titleFn": "超过1400万用户的信赖选择",
							"past": "这是一家科技型企业，并与北京XX集团（XX上市公司）强强联合打造中国新兴能源企业。远弘能源，KPG公司全程参与和策划了其销售运营过程。",
							"picurl": "/static/images/product/shows/pro01.jpg"
						}, {
							"title": "码云传单",
							"titleFn": "极具市场竞争力无需技术",
							"past": "XXXX是典型出口转内销的企业，当时寻求品牌策划帮助时，其企业面临全国十大经销商挟制，年销额也只有2000多万，其企业发展前途处于风雨飘摇之中。由于企业决策者及时寻助专业品牌营销策划机构壹串通，当年销售额就增长速度超过150%。等高校作学术讲座多次",
							"picurl": "/static/images/product/shows/pro02.jpg"
						}, {
							"title": "码云助手",
							"titleFn": "全方位一站式业务扶持，后顾无忧",
							"past": "虽然这个词本身已经成为我们现代社会和常识的一部分，但到目前为止还不到1%的地球人口使用它。为什么？因为到目前为止，电子产品、个人电脑、智能手机以及最重要的VR眼镜的数量不足以提供",
							"picurl": "/static/images/product/shows/pro03.jpg"
						}]
				}
				this.$store.state.stepPages.product.push(obj)
			}else if(val == '招聘页') {
				let obj = {
					lmid: pid,
					bgClass: "",
					layoutClass: '',
					modularName: '职位招聘',
					recruitList: [{
						title: '行政运营',
						titleFn: '客服（成都）',
						past: [
							'做过工作流相关项目',
							'涉及spring、dubbo，金融项目经验',
							'有财务、税务相关经验',
							'电商项目经验丰富',
							'学历统本，学信可查'
						]
					}, {
						title: '人事',
						titleFn: '招聘主管',
						past: [
							'做过工作流相关项目',
							'涉及spring、dubbo，金融项目经验',
							'有财务、税务相关经验',
							'电商项目经验丰富',
							'学历统本，学信可查'
						]
					}, {
						title: '产品',
						titleFn: '产品经理',
						past: [
							'做过工作流相关项目',
							'涉及spring、dubbo，金融项目经验',
							'有财务、税务相关经验',
							'电商项目经验丰富',
							'学历统本，学信可查'
						]
					}, {
						title: '市场/运营',
						titleFn: '市场运营',
						past: [
							'做过工作流相关项目',
							'涉及spring、dubbo，金融项目经验',
							'有财务、税务相关经验',
							'电商项目经验丰富',
							'学历统本，学信可查'
						]
					}]
				}
				this.$store.state.stepPages.recruit.push(obj)
			}
		},
		getVal(typetoggle, val, index, typer, pid) {
			if(typetoggle == '01') {
				this.deleteText2(pid)
				this.addText2(val, pid)
				if(val == '单页') {
					this.danNum++
					this.$store.state.threeStep.columnList[index].pageType = 1
					this.$store.state.threeStep.columnList[index].typeName = val
					this.$store.state.threeStep.columnList[index].type = 'team'
					this.$store.state.threeStep.columnList[index].section = this.danSection
					this.$store.state.threeStep.columnList[index].indexes = this.danNum
				}else if(val == '文章页') {
					this.wenNum++
					this.$store.state.threeStep.columnList[index].pageType = 2
					this.$store.state.threeStep.columnList[index].typeName = val
					this.$store.state.threeStep.columnList[index].type = 'new'
					this.$store.state.threeStep.columnList[index].section = this.wenSection
					this.$store.state.threeStep.columnList[index].indexes = this.wenNum
				}else if(val == "产品页") {
					this.chanNum++
					this.$store.state.threeStep.columnList[index].pageType = 3
					this.$store.state.threeStep.columnList[index].typeName = val
					this.$store.state.threeStep.columnList[index].type = 'product'
					this.$store.state.threeStep.columnList[index].section = this.chanSection
					this.$store.state.threeStep.columnList[index].indexes = this.chanNum
				}else if(val == '招聘页') {
					this.zhaoNum++
					this.$store.state.threeStep.columnList[index].pageType = 4
					this.$store.state.threeStep.columnList[index].typeName = val
					this.$store.state.threeStep.columnList[index].type = 'recruit'
					this.$store.state.threeStep.columnList[index].section = this.zhaoSection
					this.$store.state.threeStep.columnList[index].indexes = this.zhaoNum
				}
			}else if(typetoggle == '02') {
				// this.deleteText(id)
				if(val == '单页') {
					this.danNum2++
					this.$store.state.threeStep.columnList2[index].pageType = 1
					this.$store.state.threeStep.columnList2[index].typeName = val
					this.$store.state.threeStep.columnList2[index].type = 'contactpage'
				}else if(val == '文章页') {
					this.wenNum2++
					this.$store.state.threeStep.columnList2[index].pageType = 2
					this.$store.state.threeStep.columnList2[index].typeName = val
					this.$store.state.threeStep.columnList2[index].type = 'newpage'
				}else if(val == '产品页') {
					this.chanNum2++
					this.$store.state.threeStep.columnList2[index].pageType = 3
					this.$store.state.threeStep.columnList2[index].typeName = val
					this.$store.state.threeStep.columnList2[index].type = 'productpage'
				}else if(val == '招聘页') {
					this.zhaoNum2++
					this.$store.state.threeStep.columnList2[index].pageType = 4
					this.$store.state.threeStep.columnList2[index].typeName = val
					this.$store.state.threeStep.columnList2[index].type = 'recruitpage'
				}
				this.addText(val, index)
			}
			this.filterType(typetoggle, this.currentTypename)
		},
		filterType(typetoggle, val) {
			if(typetoggle == '01') {
				if(val == '单页') {
					this.danNum--
				}else if(val == '文章页') {
					this.wenNum--
				}else if(val == "产品页") {
					this.chanNum--
				}else if(val == '招聘页') {
					this.zhaoNum--
				}
			}else {
				if(val == '单页') {
					this.danNum2--
				}else if(val == '文章页') {
					this.wenNum2--
				}else if(val == "产品页") {
					this.chanNum2--
				}else if(val == '招聘页') {
					this.zhaoNum2--
				}
			}
		},
		inputFunc(type, val, index) {
			if(type == '01') {
				this.$store.state.threeStep.columnList[index].name = val
			}else if(type == '02') {
				this.$store.state.threeStep.columnList2[index].name = val
			}else if(type == '03') {
				this.$store.state.threeStep.columnList2[this.suoyin].sonColumn[index].name = val
			}
		},
		changeCount(index) {
			// this.$store.state.threeStep.columnList[index].inputOnoff = true
		},
		editClick(type, index, typename) {
			if(type == '01') {
				this.currentTypename = typename
				for(let i=0; i<this.$store.state.threeStep.columnList.length; i++) {
					this.$store.state.threeStep.columnList[i].inputOnoff = true
				}
				this.$store.state.threeStep.columnList[index].inputOnoff = false
				this.selected = typename
			}else if(type == '02') {
				this.currentTypename = typename
				this.currentTypename2 = typename
				for(let i=0; i<this.$store.state.threeStep.columnList2.length; i++) {
					this.$store.state.threeStep.columnList2[i].inputOnoff = true
					if(this.$store.state.threeStep.columnList2[i].sonColumn) {
						for(let j=0; j<this.$store.state.threeStep.columnList2[i].sonColumn.length; j++) {
							this.$store.state.threeStep.columnList2[i].sonColumn[j].inputOnoff = true
						}
					}
				}
				this.$store.state.threeStep.columnList2[index].inputOnoff = false
				this.selected = typename
			}
		},
		deleter(type, index, pid, pageType) {
			if(type == '01') {
				this.allNum--
				this.$store.state.threeStep.columnList.splice(index, 1)
				if(pageType == 1) {
					for(let i=0; this.$store.state.stepPages.single.length; i++) {
						if(this.$store.state.stepPages.single[i].lmid == pid) {
							this.$store.state.stepPages.single.splice(i, 1)
						}
					}
				}else if(pageType == 2) {
					for(let i=0; this.$store.state.stepPages.article.length; i++) {
						if(this.$store.state.stepPages.article[i].lmid == pid) {
							this.$store.state.stepPages.article.splice(i, 1)
						}
					}
				}else if(pageType == 3) {
					for(let i=0; this.$store.state.stepPages.product.length; i++) {
						if(this.$store.state.stepPages.product[i].lmid == pid) {
							this.$store.state.stepPages.product.splice(i, 1)
						}
					}
				}else if(pageType == 4) {
					for(let i=0; this.$store.state.stepPages.recruit.length; i++) {
						if(this.$store.state.stepPages.recruit[i].lmid == pid) {
							this.$store.state.stepPages.recruit.splice(i, 1)
						}
					}
				}
			}else if(type == '02') {
				this.$store.state.threeStep.columnList2.splice(index, 1)
				this.pagesNum--
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.twoSteps
	box-sizing: border-box
	min-height: 650px
	position: relative
	.content
		position: absolute
		left: 0
		top: 0
		width: 100%
		height: 100%
		background: #fff
		.title
			padding: 0 15px
			line-height: 60px
			transition: all .3s
			box-shadow: 0 0 5px #ccc inset
			&:after
				clear: both
				display: block
				content: ''
			span
				float: left
				font-size: 18px
				font-weight: bold
			.title-right
				display: inline-block
				float: right
		// .title2
		// 	background: $bgColor2
		.addColumn
			display: flex
			height: 60px
			justify-content: center
			align-items: center
		.tableList
			position: absolute
			top: 60px
			left: 0
			bottom: 0
			width: 100%
			overflow: auto
			li
				height: 50px
				line-height: 50px
				transition: all .3s
				.inner
					display: flex
					padding: 0 15px
					height: 50px
					line-height: 50px
					transition: all .3s
					border-bottom: 1px solid #dedede
					&:hover
						background: #f1f2f1
						transform: scale(0.98)
					.el-select
						>>> .el-input
							width 96%
							.el-input__inner
								height 36px
								line-height 36px
					.input
						flex: 1
						.el-input
							width 96%
							>>> .el-input__inner
								height 36px
								line-height 36px
						input
							border: none
							box-shadow: 0 0 2px inset
							text-align: center
							height: 30px
							width: 80%
					span
						flex: 1
						height: 30px
						padding-left: 20px
						a
							margin: 0 10px
							color: $fontColor
							&:nth-of-type(1)
								color: #f29a76
						i
							margin: 0 10px
							font-style: normal
							&:nth-of-type(1)
								color: #f29a76
					.moveicon
						i
							cursor: pointer
					select
						height: 30px
						flex: 1
						padding: 0 
						margin: 10px 0 0
						border: none
						box-shadow: inset 0 0 2px
						option
							text-align: center
					.iconfont
						font-size: 14px
					.color
						color: $bgColor
						cursor: context-menu
					.font-Small
						font-size: 14px
						font-weight: normal
						cursor: pointer
						i
							font-size: 22px
							font-style: normal
							vertical-align: middle
					.red
						color: red
						font-size: 14px
				&:nth-of-type(2)
					.inner
						.moveicon
							.up
								visibility: hidden
				&:last-child
					.inner
						.moveicon
							.down
								visibility: hidden
			.li-title
				display: flex
				box-shadow: 0 2px 4px #ccc
				span
					flex: 1
					padding-left: 20px
					font-size: 16px
					font-weight: bold
			.sonList
				width: 100%
				li
					display: flex
					background: #f1f1f1
					span:first-child
						text-align: right
					span
						flex: 1
					select
						flex: 1
						padding: 0 
						margin: 0
						border: none
						box-shadow: inset 0 0 2px
						height: 22px
						margin-top: 4px
					.iconfont
						color: $bgColor
						font-size: 20px
						font-weight: 800
					.input
						flex: 1
						text-align: right
						input
							height: 22px
							width: 70%
							margin-top: 2px
							border: none
							box-shadow: 0 0 2px inset
							text-align: center
					.red
						color: red
						font-size: 20px
					i
						font-size: 14px
						font-style: normal
						vertical-align: middle
.slide-enter-active
	transition: all .3s ease
.slide-leave-active
	transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
.slide-enter, .slide-leave-to
	transfrom: translateX(10px)
	opacity: 0
</style>