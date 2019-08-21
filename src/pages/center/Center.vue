<template>
<div class="productCenter">
	<index-header></index-header>
	<div class="wrap" v-if="userToggle == 'A'">
		<div class="banner">
			<div class="container">
				<img src="../../../static/images/productCenter/banner.jpg" />
			</div>
			<!-- <p>魔码云智能应用平台</p> -->
		</div>
		<div class="tabNav" v-if="tabnavToggle">
			<ul class="container" v-if="userType == 1 || userType == 5">
				<li 
					v-for="(item, index) in list" 
					v-if="item.id != '003'"
					@mouseover="sonListHandle(index)" 
					@mouseout="sonListHandleHide(index)"
					@click="navHandle(index, item.id)"
					:key="item.id"
				>
					<h2 :class="{ active: item.isActive }">
						<strong v-html="item.name"></strong>
						<i class="iconfont">&#xe62f;</i>
					</h2>
					<ul v-if="item.sonToggle">
						<li v-for="(itemr, index) in item.sonList">
							<h3 v-text="itemr" @click="accountSon(index, itemr)"></h3>
						</li>
					</ul>
				</li>
			</ul>
			<ul class="container" v-else>
				<li 
					v-for="(item, index) in list" 
					@mouseover="sonListHandle(index)" 
					@mouseout="sonListHandleHide(index)"
					@click="navHandle(index, item.id)"
					:key="item.id"
				>
					<h2 :class="{ active: item.isActive }">
						<strong v-html="item.name"></strong>
						<i class="iconfont">&#xe62f;</i>
					</h2>
					<ul v-if="item.sonToggle">
						<li v-for="(itemr, index) in item.sonList">
							<h3 v-text="itemr" @click="accountSon(index, itemr)"></h3>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<keep-alive>
			<div>
				
				<div class="box-content">

					<div v-if="priceListToggle == 'A'">
						<div class="container user-title" v-if="userType==2||userType==3||userType==4||userType==7||userType==9">
							<div class="dlbox">
								<div class="dlbox-left">
									<div class="leftimg"><img src="../../../static/images/productCenter/tou.png"></div>
									<div class="rightname">
										<p>{{ userPhone }}</p>
										<div><span>{{ userName }}</span></div>
									</div>
									<div class="balance">
										<span>余额</span>
										<strong>{{ userbalance }}元</strong>
									</div>
								</div>
								<div class="dlbox-right">
									<!-- <button @click="topayHandle">去充值</button> -->
									<el-button type="primary" @click="topayHandle">去充值</el-button>
								</div>
								<!-- <div class="dlbox-right">
									<h4>已开通的产品数量</h4>
									<ul>
										<li>
											<h5>网站建设</h5>
											<p>1000</p>
										</li>
										<li>
											<h5>网站建设</h5>
											<p>1000</p>
										</li>
										<li>
											<h5>网站建设</h5>
											<p>1000</p>
										</li>
									</ul>
								</div> -->
							</div>
						</div>

						<div class="center-box container">
							<!-- <h2>产品中心</h2> -->
							<ul>
								<li v-for="(item, index) in contentList" :key="item.id">
									<div class="liWrap">
										<div class="img"><img :src="item.imgUrl"><span v-text="item.title"></span></div>
										<!-- <div class="title"><span v-text="item.title"></span></div> -->
										<div class="text"><p v-html="item.text"></p></div>
										<button @click="toFunc(item.id)">{{ item.button }}</button>
									</div>
								</li>
							</ul>
						</div>
					</div>

					<div v-if="priceListToggle == 'B'">
						<div class="agent-box container">
							<div class="agentinner">
								<!-- <h2>代理资源</h2> -->
								<ul>
									<li v-for="item of agentlist" class="col-md-3" :key="item.id">
										<div class="inner" @click="toagent(item.id)" :style="{ backgroundImage: 'url(' + item.imgurl + ')' }">
											<div class="img-wrap"></div>
											<div class="text-wrap">
												<p>{{ item.title }}</p>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<!-- <div class="bottomdata" v-if="userType==2||userType==3||userType==4||userType==7||userType==9">
					<div class="container">
						<div class="custom">
							<div class="title">
								<img src="../../../static/images/productCenter/custom.png">专属客服
							</div>
							<div class="table">
								<table border="1">
									<tr>
										<td>专属客服</td>
										<td>客服1</td>
										<td>客服2</td>
									</tr>
									<tr>
										<td>联系方式</td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td>说明</td>
										<td></td>
										<td></td>
									</tr>
								</table>
							</div>
						</div>
						<div class="custom">
							<div class="title"> 
								<img src="../../../static/images/productCenter/tongji.png">已开通产品数据统计  
							</div>
							<div class="table">
								<table border="1">
									<tr>
										<th>产品名称</th>
										<th>网站建设</th>
										<th>小程序</th>
										<th>微营销</th>
										<th>公众号</th>
									</tr>
									<tr>
										<td>创建次数</td>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div> -->

					<pricelist-index  v-if="priceListToggle == 'C'"></pricelist-index>
				</div>
				<!-- <pricelist-index v-else></pricelist-index> -->
				
			</div>
		</keep-alive>
	</div>
	<personal-center v-else-if="userToggle == 'B'"></personal-center>
	<materiel v-else-if="userToggle == 'C'"></materiel>
	<maketing v-else-if="userToggle == 'D'"></maketing>
	<online v-else-if="userToggle == 'E'"></online>
</div>
</template>

<script>
import { mapState } from 'vuex'
import IndexHeader from '@/common/Header'
import pricelistIndex from './components/Index'
import personalCenter from './components/PersonalCenter'
import materiel from './components/Materiel'
import maketing from './components/Maketing'
import online from './components/Online'
export default {
	components: {
		IndexHeader,
		pricelistIndex,
		personalCenter,
		materiel,
		online,
		maketing
	},
	data() {
		return {
			tabnavToggle: true,
			dlname:'未知',
			list: [{
				id: '001',
				name: '产品中心',
				isActive: true
			}, {
				id: '003',
				name: '代理资源',
				isActive: false
			}, {
				id: '002',
				name: '产品报价',
				isActive: false
			}],
			agentlist: [{
				id: '001',
				title: '在线教程查看',
				imgurl: '/static/images/productCenter/agent-1.png'
			}, {
				id: '002',
				title: '印刷物料下载',
				imgurl: '/static/images/productCenter/agent-2.png'
			}, {
				id: '003',
				title: '营销资源专区',
				imgurl: '/static/images/productCenter/agent-3.png'
			}, {
				id: '004',
				title: '在线技术支持',
				imgurl: '/static/images/productCenter/agent-4.png'
			}],
			// list: [{
			// 	name: '产品中心',
			// 	isActive: true
			// }, {
			// 	name: '账户信息',
			// 	sonList: ['订单信息', '充值中心','我的账户'],
			// 	sonToggle: false,
			// 	isActive: false
			// }, {
			// 	name: '工单管理',
			// 	sonList: ['发布工单', '我的工单'],
			// 	sonToggle: false,
			// 	isActive: false
			// }, {
			// 	name: '价格列表',
			// 	isActive: false
			// }],
			contentList: [{
				id: 'f01',
				imgUrl: '/static/images/productCenter/center1.png',
				title: '网站建设',
				text: '十分钟搭建个性化网站',
				button: '前往管理',
				onoff: true
			}, {
				id: 'f02',
				imgUrl: '/static/images/productCenter/center2.png',
				title: '微信小程序',
				text: '快速生成应用&nbsp让客户主动找到你',
				button: '前往管理',
				onoff: true
			}, {
				id: 'f04',
				imgUrl: '/static/images/productCenter/center3.png',
				title: '微传单',
				text: '最受欢迎的移动端营销工具',
				button: '前往管理',
				onoff: true
			}, {
				id: 'f03',
				imgUrl: '/static/images/productCenter/center4.png',
				title: '公众号管家',
				text: '多数娱乐插件&nbsp高效引流',
				button: '前往管理',
				onoff: true
			}, {
				id: 'f05',
				imgUrl: '/static/images/productCenter/center6.png',
				title: '备案',
				text: '提供高效&nbsp专业的备案服务',
				button: '前往管理',
				onoff: true
			}, {
				id: 'f07',
				imgUrl: '/static/images/productCenter/center7.png',
				title: '生成二维码',
				text: '即时输入&nbsp即时生成&nbsp快速编辑',
				button: '前往管理',
				onoff: true
			}, {
				id: 'f06',
				imgUrl: '/static/images/productCenter/center5.png',
				title: '域名购买',
				text: '建网站&nbsp从喜欢的域名开始',
				button: '前往管理',
				onoff: true
			}, {
				id: 'f06',
				imgUrl: '/static/images/productCenter/center7.png',
				title: '',
				text: '即时输入&nbsp即时生成&nbsp快速编辑',
				button: '前往管理',
				onoff: true
			}]
		}
	},
	computed: {
		...mapState({
			priceListToggle: state => state.priceListToggle,
			userToggle: state => state.userToggle,
			userType: state => state.userType,
			userPhone: state => state.userPhone,
			userName: state => state.userName,
			userbalance: state => state.userbalance,
		})
	},
	methods: {
		topayHandle() {
			this.$store.state.userToggle = 'B'
			this.$store.state.perType = 'C'
		},
		toagent(id) {
			if(id == '001') {
				window.open('https://www.momayun.cn/portal/article/index/id/37.html')
			}else if(id == '002') {
				this.$store.commit('userToggleHandel', 'C')
			}else if(id == '003') {
				this.$store.commit('userToggleHandel', 'D')
			}else if(id == '004') {
				this.$store.commit('userToggleHandel', 'E')
			}
		},
		navHandle(val, id) {
			if(id == '001') {
				this.$store.state.priceListToggle = 'A'
			}else if(id == '002') {
				this.$store.state.priceListToggle = 'C'
			}else if(id == '003') {
				this.$store.state.priceListToggle = 'B'
			}
			for(let i=0; i<this.list.length; i++) {
				this.list[i].isActive = false
			}
			this.list[val].isActive = true
		},
		accountSon(val, name) {
			if(val == '0' && name == '订单信息') {
				window.location.href = '/index/index/account'
				// this.$store.state.navigation1 = '账户信息'
				// this.$store.state.navigation2 = '订单信息'
			}else if(val == '1' && name == '充值中心') {
				window.location.href = '/index/index/recharge'
				// this.$store.state.accountType = val
				// this.$store.state.navigation1 = '账户信息'
				// this.$store.state.navigation2 = '充值中心'
			}else if(val == '2' && name == '我的账户') {
				window.location.href = '/index/index/myacount'
				// this.$store.state.navigation1 = '账户信息'
				// this.$store.state.navigation2 = '我的账户'
			}else if(val == '0' && name == '发布工单') {
				window.location.href = '/index/index/work'
				// this.$store.state.navigation1 = '工单管理'
				// this.$store.state.navigation2 = '发布工单'
			}else if(val == '1' && name == '我的工单') {
				window.location.href = '/index/index/mywork'
				// this.$store.state.navigation1 = '工单管理'
				// this.$store.state.navigation2 = '我的工单'
			}else {
				this.$store.state.toLoginType = 'E'
				alert('空选项')
			}
			for(let i=0; i<this.list.length; i++) {
				this.list[i].sonToggle = false
			}
		},
		toFunc(val) {
			if(val == 'f04') {
				window.open('http://h5.momayun.cn/#/main')
				// window.location.href = 'http://h5.momayun.cn/#/main'
			}else if(val == 'f01') {
				window.open('/index/index/site')
				// window.location.href = '/index/index/site'
			}else if(val == 'f02') {
				window.open('https://xcx.momayun.cn/index/applet/index.html')
				// window.location.href = 'https://xcx.momayun.cn/index/applet/index.html'
			}else if(val == 'f03') {
				window.open('https://wx.momayun.cn/mp/mp/')
				// window.location.href = 'https://wx.momayun.cn'
			}else if(val == 'f05') {
				window.open('/home/ymrecord/index')
			}else if(val == 'f06') {
				window.open('/home/xinnet/index')
			}else if(val == 'f07') {
				window.open('http://qrcode.momayun.cn/')
			}
		},
		sonListHandle(val) {
			this.list[val].sonToggle = true
		},
		sonListHandleHide(val) {
			this.list[val].sonToggle = false
		},
		xianshi(){
			// console.log(this.$store.state.dlToggle)
		}
	},
	mounted(){
		this.$nextTick(()=> {
			// var div = document.getElementById('homePage').scrollHeight
			if(this.userType == '5' || this.userType == '6') {
				window.location.href = '/index/index/site'
			}
			var urlSearch = window.location.search
			let sitename = urlSearch.split("=")[1]
			if(sitename == 'user') {
				this.$store.commit('userToggleHandel', 'B')
			}else if(sitename == 'cen') {
				this.$store.commit('userToggleHandel', 'A')
			}else {
				if(sitename) {
					this.$store.state.threeStep.siteId = sitename
					this.$store.commit('buyHandel', true)
					this.$store.commit('pricelistHandel', 'C')
					for(let i=0; i<this.list.length; i++) {
						this.list[i].isActive = false
					}
					this.list[2].isActive = true
					// $('#homePage').animate({scrollTop:div},500)
				}else {
					this.$store.commit('buyHandel', false)
				}
			}
		})
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.productCenter
	width: 100%
.wrap
	&:after
		clear: both
		content: ''
		display: block
	.banner
		// background: url('/static/images/productCenter/productcenter.jpg')
		position: relative
		width: 100%
		background: #fff
		padding-top: 20px
		.container
			img 
				width: 100%
				height: auto
		p
			z-index: 10000
			display: flex
			justify-content: center
			// align-items: center
			color: #fff
			font-weight: 500
			font-size: 42px
			letter-spacing: 3px
			line-height: 200px
	.tabNav
		padding-top: 30px
		box-shadow: 0 2px 1px #d0d0d0
		position: relative
		background: #fff
		z-index: 10
		ul
			display: flex
			justify-content: center
			li 
				float: left
				position: relative
				h2
					margin: 0 24px
					font-size: 15px
					cursor: pointer
					line-height: 50px
					transition: all 0.3s
					border-bottom: 2px solid #f1f1f1
					font-family: "Arial", "Microsoft YaHei", sans-serif !important
					color: #999
					&:hover
						color: #000
					.iconfont
						font-size: 14px
						display: none
				.active
					border-bottom: 2px solid #000
					color: #000
				ul
					display: block
					position: absolute
					top: 60px
					width: 80%
					margin-left: 15px
					background: #fff
					border-radius: 10px
					box-shadow: 0 5px 5px #d0d0d0
					text-align: center
					li
						float: none
						display: block
						h3
							font-size: 16px
							cursor: pointer
	.dlbox
		margin: 0 auto
		padding: 10px 20px
		overflow: hidden
		background: white
		display: flex
		align-items: center
		justify-content: space-between
		box-shadow: $boxshadow
		.dlbox-left
			float: left
			display: flex
			// align-items: center
		.leftimg
			float:left
			width:65px
			height:65px
			border-radius:50%
			img
				max-width:100%
		.rightname
			display: flex
			// align-items: center
			margin: 0 25px
			justify-content: center
			flex-direction: column
			p
				font-size:15px
			div
				line-height: 30px
				span
					font-size:18px
					font-weight:bold
		.balance
			display: flex
			border-left: 1px solid #ccc
			padding-left: 25px
			justify-content: center
			flex-direction: column
			span
				font-size: 15px
			strong
				font-size: 22px
		.dlbox-right
			float: right
			text-align: center
			h4
				font-size: 18px
			ul
				li
					padding: 0 45px
					border-right: 1px solid #dedede
					&:last-child
						border: none
						padding-right: 0
					h5
						font-size: 16px
					p
						font-size: 26px
	.box-content
		padding: 36px 0 20px
		li
			padding: 10px 15px
			float: left
			vertical-align: top
			margin-bottom: 15px
			&:hover
				.liWrap
					transform: translateY(-5px)
					box-shadow: 0 1px 15px #a9a7a7
					position: relative
					z-index: 1000000
			.liWrap
				// width: 248px
				margin: 0 auto
				padding-bottom: 15px 
				text-align: center
				box-shadow: 0 1px 15px #d0d0d0
				transition: all .3s
				background: #fff
				max-width: 234px
				border-radius: 3px
				overflow: hidden
				.img
					min-height: 170px
					display: flex
					justify-content: center
					align-items: center
					flex-direction: column
					img
						// height: 180px
						// width: 100%
						max-width:100%
						vertical-align: middle
					span
						margin-top: 10px
						font-size: 15px
				.text
					p
						white-space: nowrap
						color: #999
				button
					margin-top: 10px
					border: none
					background: linear-gradient(to right, #2bc2fa, #6458e6)
					border-radius: $borderradius
					padding: 5px 24px
					color: #fff
					transition: all 0.3s
					font-size: 14px
					&:hover
						background: $bgColor
				.closeDown
					background: #fff
					border: 1px solid $bgColor
					color: $bgColor
					&:hover
						background: $bgColor
						color: #fff
						opacity: 1
	.bottomdata
		width:100%
		background:white
		padding:50px 0
		.title
			width:97%
			margin:20px auto
			font-size:20px
			font-weight:bold
			img
				margin-right:10px
		.table
			width:95%
			margin:0 auto
			table
				width:50%
				text-align:center
				margin-left:50px
				th
					text-align:center
				tr
					height:30px
					td
						width:30px
	.user-title
		margin-bottom: 25px
	.center-box
		padding: 0
		h2
			border-left: 3px solid $bgColor
			margin: 0 15px
			font-size: 22px
			text-indent: 22px
		ul
			margin-top: 20px
			display: flex
			justify-content: space-between
			flex-wrap: wrap
			li
				&:last-child
					visibility: hidden
	.agent-box
		margin-bottom: 45px
		.agentinner
			// background: #fff
			display: flex
			padding: 20px
			flex-direction: column
			// box-shadow: $boxshadow
		h2
			margin: 0
			border-left: 3px solid $bgColor
			text-indent: 22px
			line-height: 22px
			font-size: 22px
		ul
			margin: 20px 0 0
			li
				text-align: center
				cursor: pointer
				background-size: 100% 100%
				.inner
					padding: 10px 0
					transition: all .3s
					position: relative
					cursor: pointer
					text-align: center
					background-size: inherit
					border-radius: 3px
					overflow: hidden
					min-height: 150px
					display: flex
					align-items: center
					justify-content: center
					&:before
						content: ''
						display: block
						position: absolute 
						left: 0
						top: 0
						width: 100%
						height: 100%
						background: rgba(0, 0, 0, .3)
					&:hover
						transform: translateY(-5px)
						box-shadow: 0 1px 15px #a9a7a7
				.img-wrap
					padding: 10px 0
					width: 70px
					height: 70px
					display: none
				.text-wrap
					padding-top: 10px
					margin: 0 15px
					position: relative
					p
						line-height: 32px
						font-size: 18px
						color: #fff
						font-weight: bold
.personal-center
	margin-top: 30px
	.per-left
		float: left
		background: #fff
		width: 211px		
		.left-title
			margin-top: 15px
			border-bottom: 1px solid #e5e5e5
			text-align: center
			h3
				line-height: 40px
				font-size: 20px
		.left-user
			border-bottom: 1px solid #e5e5e5
			text-align: center
			.portrait
				margin: 10px 0
			img
				width: 44px
				height: auto
			ul
				padding: 0 20px
				li
					line-height: 32px
					text-align: left
					span
						min-width: 60px
						display: inline-block
						text-align: right
					p
						display: inline-block
						margin-bottom: 0
		.left-discount
			padding-top: 20px
			li
				line-height: 42px
				text-align: center
				cursor: pointer
				span
					font-size: 16px
					color: #333
			.action
				border-left: 2px solid $bgColor
	.per-right
		width: 80%
		float: right
		.right-banner
			img
				width: 100%
		.right-voncher
			overflow: hidden
			clear: both
			h3
				font-size: 18px
				line-height: 34px
			.list-title
				border-bottom: 1px solid #c9c9c9
				line-height: 26px
				span
					margin-right: 20px
					display: inline-block
					color: #656565
					cursor: pointer
				.action
					border-bottom: 1px solid $bgColor
					color: #000
			.list-ul
				min-height: 300px
				padding-top: 20px
				ul
					li
						margin-bottom: 10px
						text-align: center
						.img
							background: url('/static/images/personal/per01.png')
							background-size: 100% 100%
							overflow: hidden
							min-height: 89px
							.img-left
								float: left
								padding: 10px 0 0 22px
								font-size: 18px
								color: #ffd889
								strong
									font-size: 52px
									font-weight: 500
									letter-spacing: -4px
							.img-right
								float: right
								text-align: right
								padding: 24px 23px 0 0
								p
									font-size: 24px
									color: #ffd889
									letter-spacing: 1px
									&:nth-of-type(2)
										font-size: 14px
										line-height: 24px
						.img2
							background: url('/static/images/personal/per03.png')
							background-size: 100% 100%
						img
							width: 100%
							height: auto
						p
							margin: 0
							line-height: 24px
							white-space: nowrap
		.right-setup
			li
				border-bottom: 1px solid #e8e8e8
				&:after
					content: ''
					display: block
					clear: both
				.li-left
					float: left
					line-height: 80px
					h5
						margin: 0
						display: inline-block
						color: #333
						font-weight: 700
					p
						margin: 0
						margin-left: 40px
						display: inline-block
						color: #666465
						span
							margin: 0 5px
							color: $bgColor
				.li-right
					float: right
					margin-top: 25px
					a
						padding: 0 15px
						color: $bgColor
						&:nth-of-type(2)
							border-left: 1px solid #ccc
							color: #f29d78
</style>