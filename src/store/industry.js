export default {
	state: {
		hangye: [{
			name: '互联网/硬件/电子业',
			id: 1,
			son: [{
				name: '软件工程师'
			}, {
				name: 'UI设计'
			}, {
				name: '产品经理'
			}]
		}, {
			name: '金融/信托业',
			id: 2,
			son: [{
				name: '投资经理'
			}, {
				name: '银行柜员'
			}, {
				name: '保险代理'
			}]
		}, {
			name: '服务业',
			id: 3,
			son: [{
				name: '酒店服务'
			}, {
				name: '社区服务'
			}, {
				name: '家政服务'
			}]
		}, {
			name: '教育/法律/咨询业',
			id: 4,
			son: [{
				name: '法务'
			}, {
				name: '律师'
			}, {
				name: '翻译'
			}]
		}, {
			name: '建筑/地产业',
			son: [{
				name: '建筑工程师'
			}, {
				name: '房地产中介'
			}]
		}, {
			name: '生产/制造/机械业',
			son: [{
				name: '生产经理'
			}, {
				name: '机械工程师'
			}]
		}, {
			name: '医疗/生物业',
			son: [{
				name: '其它'
			}]
		}, {
			name: '广告/传媒业',
			son: [{
				name: '广告创意'
			}, {
				name: '平面设计'
			}, {
				name: '会展'
			}]
		}, {
			name: '贸易/林牧业',
			son: [{
				name: '其它'
			}]
		}, {
			name: '影视/艺术/娱乐业',
			son: [{
				name: '其它'
			}]
		}, {
			name: '能源/化工业',
			son: [{
				name: '其它'
			}]
		}, {
			name: '其它'
		}]
	},
	mutations: {
		hangyeHandel(state, val) {
			state.hangye = val
		}
	}
}