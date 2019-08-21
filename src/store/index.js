import Vue from 'vue'
import Vuex from 'vuex'
import common from './common'
import blocks from './blocks'
import addModel from './addModel'
import stepPages from './stepPages'
import content from './content'
import industry from './industry'
import provinces from './provinces'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		common,
		blocks,
		addModel,
		stepPages,
		content,
		industry,
		provinces
	},
	state: {
		dialogVisibleBtn: false,         // 高级按钮编辑弹框开关
		dialogVisibleBtnData: {},        // 高级按钮编辑弹框内容
		dialogImgup: false,           // 高级模式图片上传弹框
		workToggle: 'b01',            // 个人中心页工单切换
		rechargepayToggle: true,      // 充值与支付页切换
		paynum: '',                   // 充值金额
		tooltipType: '',              // 高级操作面板弹框显示哪个
		tooltipIndex: '',             // 高级操作面板点击获取当前索引
		tooltipOption: '',            // 高级操作面板点击获取当前栏目参数
		tooltipToggle: false,         // 高级操作面板弹框显示与隐藏
		tooltipTop: '200',            // 高级操作面板弹框top值
		passToggle: false,           // 所有文字修改接口开关控制
		headlayout: 'A',             // 高级导航布局字母
		userbalance: '',            // 当前用户余额
		mobileright: '0',           // PC和移动端切换时导航定位right值
		phoneToggle: true,          // 高级的手机与电脑切换开关
		headfontcolor: '#444',           // 高级模式导航字体颜色
		passwordorphoneToggle: true,  // 个人中心的修改密码与修改手机号开关
		nickName: '',                 // 当前用户名
		userType: '',                 // 代理级别数字
		userName: '',                  // 代理级别文字
		userPhone: '',                  // 代理账号手机
		userId: '',                   // 用户Id
		userToggle: 'A',            // 产品中心页中各页面显示隐藏开关
		perType: 'A',               // 个人中心选项卡切换
		buyToggle: false,            // 产品中心价格列表抢购按钮隐藏
		browserToggle: true,         // pc或移动端判断
		jumpToggle: true,
		modelId: '',                 //高级模式选中模板的id值
		pageToggle: true,            //单页与多页开关（默认单页）
		pageToggle2: '',             //布尔转数字（后台专用）
		pageOnoff: true,             //单页与多页开关显示与隐藏
		sonPagetoggle: true,         //多页与详情页开关
		sonPagetext: {               //详情页内容
			lmid: '',
			type: '',
			id: ''
		}, 
		sonInterfaceToggle: true,    // 详情页是否走接口判断                          
		pageIndex: 1,                //多页面跳转索引
		pageName: '首页',            //多页下选中页面的name值
		homeHash: 1,                 //高级模式hash值
		isNavToggle: true,           //高级模式左侧导航默认收回
		addmodelToggle: false,       //新模块添加开关
		allEditToggle: true,         //高级模式编辑开关
		reloadToggle: true,          //高级添加新模块后刷新成功
		tabPreview: true,
		loginOnoff: true,
		toLoginType: 'A',            // 产品中心导航切换开关
		headerType: '',
		navigationOnoff: true,        //面包屑开关（navigation1以此为开关）
		navigation1: '',
		navigation2: '',
		navigation3: '',
		navigation4: '',
		moneyRecordToggle: false,
		productUpEdition: '',
		funcType: 'A',                   //产品中心进入content页面索引
		accountType: 0,                  //账户信息子级页面索引
		newsiteNum: 0,                   //网站建设子级页面索引
		priceListToggle: 'A',           //产品中心的价格列表、代理资源切换
		workNum: 0,                      //工单管理子级页面索引
		detailToggle: true,              //工单详情返回开关
		honorEditToggle: false,          //内容管理中荣誉展示弹框显示隐藏开关
		honorImg: '',                    //内容管理中荣誉展示获取图片
		honorText: '',                   //内容管理中荣誉展示获取简介
		companyNewsToggle: false,        //内容管理中企业动态弹框开关
		companyNewsList: [],             //内容管理文章列表存储
		companyEditToggle: true,         //内容管理中增加与编辑开关
		payid: '',                       //下订单后返回订单ID
		dlToggle:false,					         //代理登陆判断依据
		bannerIndex: 0,                  //banner索引
		columnList1234: [],

		threeStep: {
				seoTitle: '',                     // 优化标题
				keywords: '',                     // 关键词
				description: '',						      // 站点描述
				siteId: '',                    // 站点ID
				classifyName: '',                 // 细分城市或全国市场
				companyName: '',                  // 公司名称
				defaultName: '网站名称',             // 默认网站名称（名称留空时）
				siteName: '',                     // 网站名称
				provinceId: '1,北京市',                     // 省份ID
				cityId: '2,北京城区',                         // 城市ID
				countyId: '3,东城区',                       // 区县ID
				companyType: '',                  //公司性质
				companyType2: '',                 //公司性质2
				yhid: '13,22,23',                         //行业ID
				wechatUrl: '',                    // 上传微信二维码链接
				columnText: [],
				columnList123: '',

			  columnList: [{
			  	pid: '110',
					name: '导航',
					type: 'header',
					typeName: '系统栏目（导航）',
					pageType: '0',
					editOnoff: true,
					onOff: true,
					operation: false,
					plus: false,
					inputOnoff: true,
					section: ['header1', 'header2', 'header3', 'header4', 'header5', 'header6', 'header7'],
					indexes: '0'
				}, {
					isguan: 1,
					pid: '220',
					name: '头部 BANNER',
					type: 'banner',
					typeName: '系统栏目（广告位）',
					pageType: '5',
					editOnoff: false,            //第二步栏目icon图标
					onOff: true,                
					operation: false,            //第二步删除按钮
					plus: true,                 //模块显示隐藏（针对导航）
					inputOnoff: true,			      //第二步文字编辑
					checked: true,             //高级模式下导航高亮开关
					editOnoff1: true,           //高级模式下编辑模式开关
					section: ['banner1', 'banner2', 'banner3', 'broadcast', 'broadcast02'],
					indexes: '0'
				}, {
					isguan: 1,
					pid: '330',
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
					indexes: '0'
				}, {
					isguan: 1,
					pid: '440',
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
					indexes: '0'
				}, {
					isguan: 1,
					pid: '550',
					name: '团队介绍',
					type: 'team',
					typeName: '单页',
					pageType: '1',
					editOnoff: true,
					onOff: true,
					operation: true,
					plus: true,
					inputOnoff: true,
					checked: false,
					editOnoff1: true,
					section: ['team', 'team2', 'team3', 'team4', 'team5', 'team6', 'team7'],
					indexes: '0'
				}, {
					isguan: 1,
					pid: '660',
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
					indexes: 0
				}, {
					isguan: 1,
					pid: '991',
					name: '联系我们',
					type: 'contact',
					typeName: '系统栏目（留言板）',
					pageType: '7',
					editOnoff: false,
					onOff: true,
					operation: false,
					plus: true,
					inputOnoff: true,
					checked: false,
					editOnoff1: true,
					section: ['contact', 'contact2'],
					indexes: '1'
				}, {
					pid: '120',
					name: '底部导航',
					type: 'footer',
					editOnoff: true,
					onOff: false,
					operation: false,
					plus: false,
					section: ['support'],
					indexes: 0
				}],
				columnList2: [{
					id: 110,
					name: '导航',
					type: 'header',
					typeName: '系统栏目（导航）',
					editOnoff: true,
					onOff: true,
					operation: false,
					plus: false,
					inputOnoff: true,
					section: ['header1', 'header2', 'header3', 'header4', 'header5', 'header6', 'header7'],
					indexes: 0
				}, {
					id: 1,
					name: '首页',
					type: 'homepage',
					pageType: '0',
					typeName: '系统页面',
					editOnoff: false,
					onOff: true,
					operation: false,
					plus: true,
					inputOnoff: true,
					checked: false,
					editOnoff1: true,
					sonColumn: [{
						pid: '222',
						name: '头部 BANNER',
						type: 'banner',
						typeName: '系统栏目（广告位）',
						pageType: '5',
						editOnoff: false,            //第二步栏目icon图标
						onOff: true,                
						operation: false,            //第二步删除按钮
						plus: true,                 //模块显示隐藏（针对导航）
						inputOnoff: true,			      //第二步文字编辑
						checked: true,             //高级模式下导航高亮开关
						editOnoff1: true,           //高级模式下编辑模式开关
						section: ['banner1', 'banner2', 'broadcast', 'broadcast02'],
						indexes: 2
					}, {
						pid: '330',
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
						indexes: 0
					}, {
						pid: '440',
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
						indexes: 0
					}, {
						pid: '991',
						name: '联系我们',
						type: 'contact',
						pageType: '7',
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
				}, {
					id: 331,
					isguan: 1,
					name: '产品推荐',
					type: 'productpage',
					typeName: '产品页',
					pageType: '3',
					editOnoff: true,
					onOff: true,
					operation: true,
					plus: true,
					inputOnoff: true,
					checked: false,
					editOnoff1: true,
					sonColumn: [{
						pid: '220',
						name: '头部 BANNER',
						isguan: 1,
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
						moreopretionToggle: false,   
						section: ['banner1', 'banner2', 'banner3', 'broadcast', 'broadcast02'],
						indexes: 0
					}, {
						pid: '331',
						name: '产品介绍',
						isguan: 1,
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
						moreopretionToggle: false, 
						section: ['product1', 'product-type' ,'product2', 'introduce', 'product3', 'product6', 'product7'],
						indexes: '1'
					}]
				}, {
					id: 441,
					isguan: 1,
					name: '新闻动态',
					type: 'newpage',
					typeName: '文章页',
					pageType: '2',
					editOnoff: true,
					onOff: true,
					operation: true,
					plus: true,
					inputOnoff: true,
					checked: false,
					editOnoff1: true,	
					sonColumn: [{
						pid: '221',
						name: '头部 BANNER',
						isguan: 1,
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
						moreopretionToggle: false, 
						section: ['banner1', 'banner2', 'banner3', 'broadcast', 'broadcast02'],
						indexes: 1
					}, {
						pid: '441',
						name: '新闻中心',
						isguan: 1,
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
						moreopretionToggle: false, 
						section: ['news', 'news2', 'news3', 'news4', 'news5', 'news6', 'news7'],
						indexes: '1'
					}]			
				}, {
					id: '660',
					isguan: 1,
					name: '诚聘英才',
					type: 'recruitpage',
					typeName: '招聘页',
					pageType: '4',
					editOnoff: true,
					onOff: true,
					operation: true,
					plus: true,
					inputOnoff: true,
					checked: false,
					editOnoff1: true,
					sonColumn: [{
						pid: '2212',
						name: '头部 BANNER',
						isguan: 1,
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
						moreopretionToggle: false, 
						section: ['banner1', 'banner2', 'banner3', 'broadcast', 'broadcast02'],
						indexes: 2
					}, {
						pid: '660',
						name: '招聘职位',
						isguan: 1,
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
						moreopretionToggle: false, 
						section: ['recruit1', 'recruit2', 'recruit3', 'recruit4', 'recruit5', 'recruit6', 'recruit7'],
						indexes: '0'
					}]
				}, {
					id: 550,
					isguan: 1,
					name: '关于我们',
					type: 'contactpage',
					typeName: '单页',
					pageType: '1',
					editOnoff: false,
					onOff: true,
					operation: false,
					plus: true,
					inputOnoff: true,
					checked: false,
					editOnoff1: true,	
					sonColumn: [{
						pid: '550',
						isguan: 1,
						name: '团队介绍',
						type: 'team',
						typeName: '单页',
						pageType: '1',
						editOnoff: false,
						onOff: true,
						operation: false,
						plus: true,
						inputOnoff: true,
						checked: false,
						editOnoff1: true,
						moreopretionToggle: false, 
						section: ['team', 'team2', 'team3', 'team4', 'team5', 'team6', 'team7'],
						indexes: 0
					}]
				}, {
					id: '181121',
					isguan: 0,
					name: '详情页',
					type: 'details',
					editOnoff: true,
					onOff: false,
					operation: false,
					plus: false,
					indexes: 0,
					sonColumn: [{
						pid: '2212',
						name: '头部 BANNER',
						type: 'banner',
						pageType: '5',
						detailType: 'detail',
						typeName: '系统栏目（广告位）',
						onOff: true,                
						operation: false,           
						plus: true,                 
						inputOnoff: true,			     
						checked: true,           
						editOnoff1: true,           
					  section: ['banner3'],
						moreopretionToggle: false, 
						indexes: 0
					}, {
						pid: '181121',
						name: '详情页',
						type: 'team',
						detailType: 'detail',
						typeName: '系统栏目',
						pageType: '8',
						onOff: true,                
						operation: false,           
						plus: true,                 
						inputOnoff: true,			     
						checked: false,           
						editOnoff1: true,           
						section: ['detail'],
						moreopretionToggle: false, 
						indexes: 0
					}]
				}, {
					id: '110000',
					pageid: '120',
					name: '底部导航',
					type: 'footer',
					editOnoff: true,
					onOff: false,
					operation: false,
					plus: false,
					section: ['support'],
					indexes: 0
				}]
		},
		allClass: {
			bgclassList: ['bgOne', 'bgThree'],
			imgClass: ['imgOne', 'imgTwo', 'imgThree'],
			bgColorClass: ['bgTwo', 'imgOne', 'imgTwo', 'imgThree'],
			bgColorClassNum: parseInt(Math.random()*6)
		}
	},
	mutations: {
		handleSiteId(state, val) {
			state.threeStep.siteId = val
		},
		dialogVisibleBtnDataHandle(state, val) {
			state.dialogVisibleBtnData = val
		},
		dialogVisibleHandle(state, val) {
			state.dialogVisibleBtn = val
		},
		sonInterfaceHandle(state, val) {
			state.sonInterfaceToggle = val
		},
		sonPageHandle(state, val) {
			state.sonPagetext = val
		},
		dialogImgupHandle(state, val) {
			state.dialogImgup = val
		},
		addmodeltoggleHandle(state, val) {
			state.addmodelToggle = val
		},
		tooltiptypeHandle(state, val) {
			state.tooltipType = val
		},
		tooltipindexHandle(state, val) {
			state.tooltipIndex = val
		},
		tooltipoptionHandle(state, val) {
			state.tooltipOption = val
		},
		tooltiptoggleHandle(state, val) {
			state.tooltipToggle = val
		},
		tooltiptopHandle(state, val) {
			state.tooltipTop = val
		},
		passtoggleHandle(state, val) {
			state.passToggle = val
		},
		headlayoutHandel(state, val) {
			state.headlayout = val
		},
		userbalanceHandel(state, val) {
			state.userbalance = val
		},
		usernicknameHandel(state, val) {
			state.nickName = val
		},
		useridHandel(state, val) {
			state.userId = val
		},
		phonetoggleHandle(state, val) {
			state.phoneToggle = val
		},
		headfontcolorHandel(state, val) {
			state.headfontcolor = val
		},
		userNameHandel(state, val) {
			state.userName = val
		},
		userTypeHandel(state, val) {
			state.userType = val
		},
		userPhoneHandel(state, val) {
			state.userPhone = val
		},
		userToggleHandel(state, val) {
			state.userToggle = val
		},
		pricelistHandel(state, val) {
				state.priceListToggle = val
		},
		buyHandel(state, val) {
			state.buyToggle = val
		},
		siteidHandel(state, val) {
			state.threeStep.siteId = val
		},
		browserHandel(state, val) {
			state.browserToggle = val
		},
		columnListHandel2(state, val) {
			state.threeStep.columnList2 = val
		},
		columnListHandel(state, val) {
			state.threeStep.columnList = val
		},
		reloadToggleHandel(state, val) {
			state.reloadToggle = val
		},
		pageOnoffHandel(state, val) {
			state.pageOnoff = val
		},
		pageIndexHandel(state, val) {
			state.pageIndex = val
		},
		detailToggleHandel(state, val) {
			state.detailToggle = val
		},
		pageNameHandel(state, val) {
			state.pageName = val
		},
		pageIndexHandel(state, val) {
			state.pageIndex = val
		},
		pageToggleHandel(state, val) {
			state.pageToggle = val
		},
		editTitle(state, val) {
			state.demo2[0].title = val
		},
		allEditOpen(state, val) {
			state.allEditToggle = val
		},
		jumpHandle(state, val) {
			state.jumpToggle = val
		}
	}
})