export default {
	state: {
		modeltextList: [{
			lmid: 'add00',
			updownspace: '',
			maskingToggle: false,
			picurl: '',
			picToggle: false,
			bgImg: '',
			title: "<p class='ql-align-center'><span class='ql-font-serif'>文本标题</span></p>",
			titleFn: "<p class='ql-align-center'><span class='ql-font-serif'>添加副标题</span></p>",
			bgClass: 'bgThree',
			bid: '',
			btnToggle: true,
			btnInfo: {
				text: '',
				link: '',
				target: ''
			}
		}, {
			lmid: 'add01',
			updownspace: '',
			maskingToggle: false,
			picurl: '',
			picToggle: false,
			bid: '',
			title: "<p class='ql-align-center'><span class='ql-font-serif'>立即下载</span></p>",
			titleFn: "<p class='ql-align-center'><span class='ql-font-serif'>你可以在按钮上添加任何有效链接</span><p>",
			bgClass: 'bgThree',
			bgImg: '',
			btnToggle: true,
			btnInfo: {
				text: '下载',
				link: '',
				defaultLink: 'javascript:;',
				target: '_self'
			}
		}, {
			lmid: 'add02',
			updownspace: '',
			maskingToggle: false,
			bgClass: '',
			bgImg: '',
			layoutClass: 'layout1',
			title: "<p class='ql-align-center'><span class='ql-font-serif'>相册</span></p>",
      broadcastImg: [{
      	bid: '1',
        picurl: '/static/images/atlas/shows/show09.png'
      }, {
      	bid: '2',
        picurl: '/static/images/atlas/shows/show10.png'
      }, {
      	bid: '3',
        picurl: '/static/images/atlas/shows/show11.png'
      }, {
      	bid: '4',
        picurl: '/static/images/atlas/shows/show12.png'
      }, {
      	bid: '5',
        picurl: '/static/images/atlas/shows/show13.png'
      }, {
      	bid: '6',
        picurl: '/static/images/atlas/shows/show14.png'
      }, {
      	bid: '7',
        picurl: '/static/images/atlas/shows/show15.png'
      }]
		}, {
			lmid: 'add03',
			updownspace: '',
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>添加标题</span></p>",
			modularNameLetter: "<p class='ql-align-center'><sapn class='ql-font-serif'>添加副标题<span></p>",
			titleToggle: true,
			bgClass: '',
			bgImg: '',
			layoutClass: 'layout2',
			recruitList: [{
				jid: '1',
				title: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>两百万元</span></p>",
				titleFn: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>投资金额</span></p>",
				past: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>未考虑前期的其他投入、资金的时间效应。不能解决多套投资的现金分析问题。且由于其固有的片面性，不能作为理想的投资分析工具</span></p>"
			}, {
				jid: '2',
				title: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>一千万元</span></p>",
				titleFn: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>融资金额</span></p>",
				past: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>未考虑前期的其他投入、资金的时间效应。不能解决多套投资的现金分析问题。且由于其固有的片面性，不能作为理想的投资分析工具</span></p>"
			}, {
				jid: '3',
				title: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>五千万元</span></p>",
				titleFn: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>融资金额</span></p>",
				past: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>未考虑前期的其他投入、资金的时间效应。不能解决多套投资的现金分析问题。且由于其固有的片面性，不能作为理想的投资分析工具</span></p>"
			}, {
				jid: '4',
				title: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>六千万元</span></p>",
				titleFn: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>融资金额</span></p>",
				past: "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(102, 119, 136)'>未考虑前期的其他投入、资金的时间效应。不能解决多套投资的现金分析问题。且由于其固有的片面性，不能作为理想的投资分析工具</span></p>"
			}]
		}, {
			addUserToggle: false,
			lmid: 'add04',
			bgClass: 'bgThree',
			bgImg: '',
			updownspace: "",
			maskingToggle: false,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>联系我们</span></p>",
			modularNameFu: "<p class='ql-align-center'><span class='ql-font-serif'>可以电话联系我们，也可提交邮箱</span></p>",
			userList: [{
				name: '姓名',
				onoff: true,
				bindName: '姓名'
			}, {
				name: '邮箱',
				onoff: true,
				bindName: '邮箱'
			}, {
				name: '电话',
				onoff: true,
				bindName: '电话'
			}, {
				name: '留言',
				onoff: true,
				bindName: '留言'
			}, {
				name: '提交',
				onoff: true,
				bindName: '提交'
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
			lmid: 'add05',
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>我们在做的</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(168, 127, 86)'>向客户展示你的项目或功能</span></p>",
			bgClass: '',
			layoutClass: 'layout1',
			productList: [{
				"pid": "1",
				"btnToggle": false,
				"btnInfo": {
					"text": '了解详情',
					"link": '',
					"target": '_self'
				},
				"maskingToggle": false,
				"title": "<p class='ql-align-left'><span class='ql-font-serif'>标题文本</span></p>",
				"nameFn": "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(168, 127, 86)'>副文本标语</span></p>",
				"past": "<p class='ql-align-left'><span class='ql-font-serif'>若我白发苍苍，容颜迟暮，你会不会，依旧如此，牵我双手，倾世温柔。</span></p>",
				"picurl": "/static/images/product/shows/pro15.jpg"
			}, {
				"pid": "2",
				"btnToggle": false,
				"btnInfo": {
					"text": '了解详情',
					"link": '',
					"target": '_self'
				},
				"maskingToggle": false,
				"title": "<p class='ql-align-left'><span class='ql-font-serif'>标题文本</span></p>",
				"nameFn": "<p class='ql-align-left'><span class='ql-font-serif' style='color: rgb(168, 127, 86)'>副文本标语</span></p>",
				"past": "<p class='ql-align-left'><span class='ql-font-serif'>若君为我赠玉簪，我便为君绾长发。洗尽铅华，从此以后，日暮天涯。</span></p>",
				"picurl": "/static/images/product/shows/pro16.jpg"
			}]
		}, {
			lmid: 'add06',
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>个人资料</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(168, 127, 86)'>我们拥有最顶级的团队</span></p>",
			bgClass: '',
			layoutClass: '',
			productList: [{
				"pid": "1",
				"btnToggle": false,
				"btnInfo": {
					"text": '了解详情',
					"link": '',
					"target": '_self'
				},
				"maskingToggle": false,
				"title": "<p class='ql-align-center'><span class='ql-font-serif'>标题文本</span></p>",
				"nameFn": "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(168, 127, 86)'>副文本标语</span></p>",
				"past": "<p class='ql-align-center'><span class='ql-font-serif'>若我白发苍苍，容颜迟暮，你会不会，依旧如此，牵我双手，倾世温柔。</span></p>",
				"picurl": "/static/images/product/shows/pro15.jpg"
			}, {
				"pid": "2",
				"btnToggle": false,
				"btnInfo": {
					"text": '了解详情',
					"link": '',
					"target": '_self'
				},
				"maskingToggle": false,
				"title": "<p class='ql-align-center'><span class='ql-font-serif'>标题文本</span></p>",
				"nameFn": "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(168, 127, 86)'>副文本标语</span></p>",
				"past": "<p class='ql-align-center'><span class='ql-font-serif'>若君为我赠玉簪，我便为君绾长发。洗尽铅华，从此以后，日暮天涯。</span></p>",
				"picurl": "/static/images/product/shows/pro16.jpg"
			}]
		}, {
			lmid: 'add07',
      broadcastImg: [{
      	bid: '1',
      	title: '',
      	content: '',
      	spanOnoff: true,
      	listToggle: true,
      	picslurl: '/static/images/banner/hides/broadcast10.jpg',
        picurl: '/static/images/banner/broadcast/broadcast12.jpg'
      }, {
      	bid: '2',
      	title: '',
      	content: '',
      	spanOnoff: false,
      	listToggle: true,
      	picslurl: '/static/images/banner/hides/broadcast11.jpg',
        picurl: '/static/images/banner/broadcast/broadcast13.jpg'
      }]
		}, {
			lmid: 'add08',
			zLayout: [{
				letter: 'A',
				name: 'layout1'
			}, {
				letter: 'B',
				name: 'layout2'
			}, {
				letter: 'C',
				name: 'layout3'
			}],
			broadcastImg: [{
      	bid: '1',
      	spanOnoff: 'true',
				title: "<p class='ql-align-left'><span class='ql-font-serif ql-size-large'>标题文本1</span></p>",
				layoutClass: 'layout1',
				imgToggle: '1',
				btnToggle: '1',
				maskingToggle: true,
				content: "<p class='ql-align-left'><span class='ql-font-serif'>内容文本，简述你的公司项目或产品，展示你的公司文化等等。</span></p>",
				picurl: '/static/images/banner/icon/tb01.png',
				bgImg: '/static/images/banner/shows/show18.png',
				bgClass: '',
				bgColorNum: '',
				btnInfo: {
					text: '立即购买',
					link: '',
					target: '_blank'
				},
				zLayout: [{
					letter: 'A',
					name: 'layout1'
				}, {
					letter: 'B',
					name: 'layout2'
				}, {
					letter: 'C',
					name: 'layout3'
				}],
				zLetter: 'A'
			}, {
      	bid: '2',
      	spanOnoff: 'false',
				title: "<p class='ql-align-left'><span class='ql-font-serif ql-size-large'>标题文本2</span></p>",
				layoutClass: 'layout1',
				imgToggle: '1',
				btnToggle: '1',
				maskingToggle: true,
				content: "<p class='ql-align-left'><span class='ql-font-serif'>内容文本，简述你的公司项目或产品，展示你的公司文化等等。</span></p>",
				picurl: '/static/images/banner/icon/tb02.png',
				bgImg: '/static/images/banner/shows/show18.png',
				bgClass: '',
				bgColorNum: '',
				btnInfo: {
					text: '立即购买',
					link: '',
					target: '_blank'
				},
				zLayout: [{
					letter: 'A',
					name: 'layout1'
				}, {
					letter: 'B',
					name: 'layout2'
				}, {
					letter: 'C',
					name: 'layout3'
				}],
				zLetter: 'A'
			}]
		}, {
			lmid: 'add09',
			title: "<p class='ql-align-center'><span class='ql-font-serif ql-size-large'>添加标题</span></p>",
			titleFn: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(168, 127, 86)'>添加副标题</span></p>",
			titleToggle: false,
			layoutClass: 'layout01',
			paddingNumber: '15px',
			heightNumber: '168px',
			widthNumber: '',
      broadcastImg: [{
      	bid: '1',
      	title: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(255, 255, 255)'>春</span></p>",
      	content: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(255, 255, 255)'>添加描述</span></p>",
        picurl: '/static/images/atlas/shows/show05.jpg'
      }, {
      	bid: '2',
      	title: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(255, 255, 255)'>夏</span></p>",
      	content: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(255, 255, 255)'>添加描述</span></p>",
        picurl: '/static/images/atlas/shows/show06.jpg'
      }, {
      	bid: '3',
      	title: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(255, 255, 255)'>秋</span></p>",
      	content: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(255, 255, 255)'>添加描述</span></p>",
        picurl: '/static/images/atlas/shows/show07.jpg'
      }, {
      	bid: '4',
      	title: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(255, 255, 255)'>冬</span></p>",
      	content: "<p class='ql-align-center'><span class='ql-font-serif' style='color: rgb(255, 255, 255)'>添加描述</span></p>",
        picurl: '/static/images/atlas/shows/show08.jpg'
      }]
		}, {
			lmid: 'add10',
			updownspace: '100px 0',
			maskingToggle: true,
			pagid: "",
			bgClass: "",
			bgImg: "/static/images/team/hides/hide05.jpg",
			layoutClass: "",
			modularName: "<p class='ql-align-left'><span class='ql-font-serif ql-size-large'>标题</span></p>",
			modularNameLetter: "<p class='ql-align-left'><span class='ql-font-serif'>副标题</span></p>",
			picurl: "",
			btnToggle: true,
			btnInfo: {
				text: '了解详情',
				link: '',
				target: '_blank',
			},
			content: "<p class='ql-align-left'><span class='ql-font-serif'>与厂商、总代、客户无缝链接，免去中间环节直接采购；长期优选的供应商，不断优化的供应链管理，保证从价格、质量、物流等方面的</span></p>"
		}, {
			lmid: 'add11',
			bgClass: "bgThree",
			bgImg: "",
			layoutClass: "layout3",
			updownspace: '',
			maskingToggle: false,
			titleToggle: true,
			modularName: "<p class='ql-align-center'><span class='ql-font-serif'>添加标题</span></p>",
			modularNameLetter: "<p class='ql-align-center'><span class='ql-font-serif'>添加副标题</span></p>",
			newList: [{
				"nid": 1,
				"timer": "2018-12-04 14:01:41",
				"title": "<p class='ql-align-left'><span class='ql-align-center'>春风<\/span><\/p>",
				"btnToggle": "true",
				"past": "小风“沙沙沙”地响，远处烟风霏霏，悄然润物，我听到春芽破土的声音。“轰隆隆”，第一声春雷响彻云天，唤醒了田野里的麦苗，蜇伏的小精灵，万物复苏了。呢喃的燕子，也加入了百鸟大合唱，到处莺歌燕舞，演奏一曲春天的交响。"
			}, {
				"nid": 2,
				"timer": "2018-12-04 14:01:41",
				"title": "<p class='ql-align-left'><span class='ql-align-center'>夏天<\/span><\/p>",
				"btnToggle": "true",
				"past": "走进早晨夏天的乡村，几声鸡鸣打破了小村的宁静，天空中的一抹明亮的鱼肚白便从天际一点点扩散开，天亮了。我好奇地看着这个小村，随后映入眼帘的就是那一眼望不到边，连绵不断的秀丽的山峰。还时不时会发出几声鸟叫，形成了一曲曲悦耳动听的歌曲。"
			}]
		}]
	}
}