export default {
	state: {
		headText: [],
		bannerText: [],
		productText: [],
		newText: [],
		teamText: [],
		recruitText: [],
		contactText: [],
		footText: [],
		bannerList: [],
		// bannerList: ['/static/images/banner/shows/show11.jpg', '/static/images/banner/shows/show14.jpg', '/static/images/banner/shows/show18.png'],
		bannerList2: [],
		beijingList: [],
		
		head: [{
			lmid: '110',
			bgColor: '',
			paddingNum: '0 15px',
			fontSize: '15px',
			fontColor: '',
			bgClass: '',
			wsname: "",
			picurl: '/static/images/head/clogo3.png',
			bgImg: '',
			phoneIcon: '',
			telephone: '400-123-00000',
			btnToggle: true,
			btnInfo: {
				text: 'Submit',
				link: 'https://www.baidu.com',
				target: '_blank',
			}
		}],
		banner: [{
			lmid: '220',
			updownspace: '180px 0px',
			maskingToggle: true,
			bgClass: '',
			bgImg: '',
			bid: '',
			btnToggle: false,
			btnInfo: {
				text: '跳转',
				link: '',
				target: '_blank'
			},
			picurl: '',
			picToggle: false,
			title: '帮助每个客户做专业的决策!',
			titleFn: '我们分享最新思想，并讨论领先组织面临的挑战!',
			broadcastImg: []
		}, {
			lmid: '221',
			updownspace: '180px 0px',
			maskingToggle: true,
			bgImg: '',
			bgClass: '',
			bid: '',
			title: '不断尝试，去实现那些不可能',
			btnToggle: true,
			btnInfo: {
				text: '按钮',
				link: '',
				target: '_blank',
			},
			picurl: '',
			picToggle: false,
			broadcastImg: []
		}, {
			lmid: '2212',
			bgImg: '',
			bgClass: '',
			updownspace: '250px 0px',
			maskingToggle: true,
			bid: '',
			title: '帮助每个客户做专业的决策!',
			btnToggle: true,
			btnInfo: {
				text: '按钮',
				link: '',
				target: '_blank',
			},
			picurl: '',
			picToggle: false,
			broadcastImg: []
		}, {
			lmid: '222',
			noText: true,
      broadcastImg: [{
      	bid: '',
      	spanOnoff: true,
      	picslurl: '/static/images/banner/hides/bro01.png',
        picurl: '/static/images/banner/broadcast/broadcast01.png'
      }, {
      	bid: '',
      	spanOnoff: false,
      	picslurl: '/static/images/banner/hides/bro02.png',
        picurl: '/static/images/banner/broadcast/broadcast02.png'
      }, {
      	bid: '',
      	spanOnoff: false,
      	listToggle: true,
      	picslurl: '/static/images/banner/hides/bro03.png',
        picurl: '/static/images/banner/broadcast/broadcast03.png'
      }]
		}, {
			lmid: '223',
			broadcastImg: [{
      	bid: '',
      	spanOnoff: true,
				title: '标题文本1',
				content: '内容文本，简述你的公司项目或产品，展示你的公司文化等等。内容文本，简述你的公司项目或产品，展示你的公司文化等等。',
      	picslurl: '/static/images/banner/hides/bro01.png',
				picurl: '/static/images/banner/broadcast/broadcast01.png'
			}, {
      	bid: '',
      	spanOnoff: false,
				title: '标题文本2',
				content: '内容文本，简述你的公司项目或产品，展示你的公司文化等等。',
      	picslurl: '/static/images/banner/hides/bro02.png',
				picurl: '/static/images/banner/broadcast/broadcast02.png'
			}]
		}],
		product: [{
			lmid: "330",
			bgClass: "",
			layoutClass: "layout1",
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>产品介绍</span></p>",
			productList: []
		}, {
			lmid: "331",
			bgClass: "",
			layoutClass: "",
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>产品介绍</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif'>Product introduction</span></p>",
			productList: []
		}, {
			lmid: "332",
			bgClass: "",
			layoutClass: "",
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>产品介绍</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif'>Product introduction</span></p>",
			productList: []
		}, {
			lmid: "333",
			bgClass: "",
			layoutClass: "",
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>产品介绍</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif'>Product introduction</span></p>",
			productList: []
		}, {
			lmid: "334",
			bgClass: "",
			layoutClass: "",
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>产品介绍</span></p>",
			productList: []
		}, {
			lmid: "335",
			bgClass: "",
			layoutClass: "",
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>产品介绍</span></p>",
			productList: []
		}, {
			lmid: "336",
			bgClass: "",
			layoutClass: "layout1",
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>产品介绍</span></p>",
			productList: []
		}],
		article: [{
			lmid: '440',
			bgClass: "",
			bgImg: "",
			layoutClass: "",
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>新闻中心</span></p>",
			newList: []
		}, {
			lmid: '441',
			bgClass: "",
			bgImg: "",
			layoutClass: "",
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>新闻中心</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif'>News Center</span></p>",
			newList: []
		}, {
			lmid: "442",
			bgClass: "bgTwo",
			bgImg: "",
			layoutClass: "",
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>新闻中心</span></p>",
			newList: []
		}, {
			lmid: "443",
			bgClass: "",
			bgImg: "",
			layoutClass: "",
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>新闻中心</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif'>News Center</span></p>",
			newList: []
		}, {
			lmid: "444",
			bgClass: "",
			bgImg: "",
			layoutClass: "",
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>新闻中心</span></p>",
			newList: []
		}, {
			lmid: "445",
			bgClass: "",
			bgImg: "",
			layoutClass: "",
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>新闻中心</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif'>News Center</span></p>",
			newList: []
		}, {
			lmid: "446",
			bgClass: "",
			bgImg: "",
			layoutClass: "",
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>新闻中心</span></p>",
			newList: []
		}],
		single: [{
			lmid: '550',
			updownspace: '',
			maskingToggle: false,
			bgClass: "",
			bgImg: "",
			layoutClass: "",
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>团队介绍</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif'>ABOUT US BRAND OF DESIGN</span></p>",
			picurl: "/static/images/team/shows/show01.png",
			content: '',
			btnToggle: false,
			btnInfo: {
				text: '了解详情',
				link: '',
				defaultLink: 'javascript:;',
				target: '_self'
			}
		}, {
			picToggle: true,
			updownspace: '100px 0',
			maskingToggle: true,
			lmid: '551',
			bgClass: "",
			bgImg: "/static/images/banner/shows/hide03.png",
			layoutClass: "",
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>团队介绍</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif'>Team Introduction</span></p>",
			content: '',
			picurl: "/static/images/team/shows/show01.png",
			btnToggle: true,
			btnInfo: {
				text: '了解详情',
				link: '',
				defaultLink: 'javascript:;',
				target: '_self'
			}
		}, {
			lmid: '552',
			updownspace: '',
			maskingToggle: false,
			bgClass: "",
			bgImg: "",
			layoutClass: "",
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>团队介绍</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif'>Team Introduction</span></p>",
			picurl: "/static/images/team/shows/show01.png",
			content: ''
		}, {
			picToggle: true,
			updownspace: '100px 0',
			maskingToggle: true,
			lmid: '553',
			bgClass: "",
			bgImg: "/static/images/banner/shows/hide03.png",
			layoutClass: "",
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>团队介绍</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif'>Team Introduction</span></p>",
			content: '',
			picurl: "/static/images/team/shows/show01.png",
			btnToggle: true,
			btnInfo: {
				text: '了解详情',
				link: '',
				defaultLink: 'javascript:;',
				target: '_self'
			}
		}, {
			lmid: '554',
			updownspace: '',
			maskingToggle: false,
			bgClass: "",
			bgImg: "",
			layoutClass: "",
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>团队介绍</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif'>Team Introduction</span></p>",
			picurl: "/static/images/team/shows/show04.png",
			content: ''
		}, {
			picToggle: true,
			updownspace: '100px 0',
			maskingToggle: true,
			lmid: '555',
			bgClass: "",
			bgImg: "/static/images/banner/shows/hide03.png",
			layoutClass: "",
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>团队介绍</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif'>Team Introduction</span></p>",
			content: '',
			picurl: "/static/images/team/shows/show01.png",
			btnToggle: true,
			btnInfo: {
				text: '了解详情',
				link: '',
				defaultLink: 'javascript:;',
				target: '_self'
			}
		}, {
			lmid: '556',
			updownspace: '',
			maskingToggle: false,
			bgClass: "",
			bgImg: "",
			layoutClass: "",
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>团队介绍</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif'>Team Introduction</span></p>",
			picurl: "/static/images/team/shows/show06.png",
			content: ''
		}],
		recruit: [{
			lmid: '660',
			bgClass: "imgTwo",
			bgImg: "",
			layoutClass: 'layout1',
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>职位招聘</span></p>",
			recruitList: []
		}, {
			lmid: '661',
			bgClass: "bgTwo",
			bgImg: "",
			layoutClass: 'layout3',
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>职位招聘</span></p>",
			recruitList: []
		}, {
			lmid: '662',
			bgClass: "bgTwo",
			bgImg: "",
			layoutClass: 'layout3',
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>职位招聘</span></p>",
			recruitList: []
		}, {
			lmid: '663',
			bgClass: "bgTwo",
			bgImg: "",
			layoutClass: 'layout3',
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>职位招聘</span></p>",
			recruitList: []
		}, {
			lmid: '664',
			bgClass: "bgTwo",
			bgImg: "",
			layoutClass: 'layout3',
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>职位招聘</span></p>",
			recruitList: []
		}, {
			lmid: '665',
			bgClass: "bgTwo",
			bgImg: "",
			layoutClass: 'layout3',
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>职位招聘</span></p>",
			recruitList: []
		}, {
			lmid: '666',
			bgClass: "bgTwo",
			bgImg: "",
			layoutClass: 'layout3',
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>职位招聘</span></p>",
			recruitList: []
		}],
		contact: [{
			addUserToggle: true,
			lmid: '990',
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>联系我们</span></p>",
			modularNameFu: "<p class='ql-align-center'><span class='ql-font-serif'>可以电话联系我们，也可提交邮箱</span></p>",
			bgClass: '',
			bgImg: '',
			websites: {
				address: '',
				telephone: '',
				email: '',
				penguin: '',
				wechat: ''
			},
			userList: [{
				bindName: '请填写姓名',
				name: '姓名',
				onoff: true
			}, {
				bindName: '请填写邮箱',
				name: '邮箱',
				onoff: false
			}, {
				bindName: '请填写电话',
				name: '电话',
				onoff: true
			}, {
				bindName: '请留言',
				name: '留言',
				onoff: true
			}, {
				bindName: '提交',
				name: '提交',
				onoff: true
			}],
			classList: [{
				icon: '&#xe621;',
				name: '地址',
				val: '',
				onoff: true
			}, {
				icon: '&#xe7e0;',
				name: '电话',
				val: '',
				onoff: true
			}, {
				icon: '&#xe636;',
				name: '邮箱',
				val: '',
				onoff: true
			}, {
				icon: '&#xe620;',
				name: 'QQ',
				val: '',
				onoff: true
			}, {
				icon: '&#xe60f;',
				name: '微信',
				val: '',
				onoff: true
			}]
		}, {
			addUserToggle: true,
			lmid: '991',
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>联系我们</span></p>",
			modularNameFu: "<p class='ql-align-center'><span class='ql-font-serif'>Contact Us</span></p>",
			bgClass: '',
			bgImg: '',
			websites: {
				address: '',
				telephone: '',
				email: '',
				penguin: '',
				wechat: ''
			},
			userList: [{
				bindName: '请填写姓名',
				name: '姓名',
				onoff: true
			}, {
				bindName: '请填写邮箱',
				name: '邮箱',
				onoff: true
			}, {
				bindName: '请填写电话',
				name: '电话',
				onoff: true
			}, {
				bindName: '请留言',
				name: '留言',
				onoff: true
			}, {
				bindName: '提交',
				name: '提交',
				onoff: true
			}],
			classList: [{
				icon: '&#xe621;',
				name: '地址',
				val: '',
				onoff: true
			}, {
				icon: '&#xe7e0;',
				name: '电话',
				val: '',
				onoff: true
			}, {
				icon: '&#xe636;',
				name: '邮箱',
				val: '',
				onoff: true
			}, {
				icon: '&#xe620;',
				name: 'QQ',
				val: '',
				onoff: true
			}, {
				icon: '&#xe60f;',
				name: '微信',
				val: '',
				onoff: true
			}]
		}],
		atlas: [{
			lmid: '770',
			bgClass: '',
			bgImg: '',
			title: '相册',
      broadcastImg: [{
      	id: '',
        picurl: '/static/images/banner/shows/show01.png'
      }, {
      	id: '',
        picurl: '/static/images/banner/shows/show02.png'
      }, {
      	id: '',
        picurl: '/static/images/banner/shows/show03.png'
      }]
		}],
		foot: [{
			lmid: '120',
			bgClass: 'bgTwo',
			bgImg: '',
			layoutClass: 'layout1',
			updownspace: '40px 0',
			maskingToggle: false,
			wechatcodeToggle: true,
			wechatcode: '/static/images/indexImg/code11.png',
			title: '©2019 网站样板-互联网 版权所有',
			telephone: '15012345678',
			classList: [{
				name: '地址',
				val: 'xxxx市xxxx区xxxx街xxxx路xxxx'
			}, {
				name: '电话',
				val: '010-88888888'
			}, {
				name: '邮箱',
				val: 'xxxxxxxxx@126.com'
			}],
			partnerlist: [{
				picurl: '/static/images/login/record01.png'
			}, {
				picurl: '/static/images/login/record02.png'
			}, {
				picurl: '/static/images/login/record03.png'
			}, {
				picurl: '/static/images/login/record04.png'
			}],
			friendlink: [{
				name: '百度',
				link: 'https://www.baidu.com'
			}, {
				name: '新浪',
				link: 'https://www.sina.com.cn/'
			}, {
				name: '微博',
				link: 'https://weibo.com/'
			}]
		}]
	},
	mutations: {
		All_Head(state, val) {
			state.head = val
		},
		All_Banner(state, val) {
			state.banner = val
		},
		All_Product(state, val) {
			state.product = val
		},
		All_Article(state, val) {
			state.article = val
		},
		All_Single(state, val) {
			state.single = val
		},
		All_Recruit(state, val) {
			state.recruit = val
		},
		All_Atlas(state, val) {
			state.atlas = val
		},
		All_Contact(state, val) {
			state.contact = val
		},
		All_Footer(state, val) {
			state.foot = val
		}
	}
}