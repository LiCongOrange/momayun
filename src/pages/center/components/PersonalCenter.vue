<template>
<div class="personalCenter">

	<el-container>
		<el-aside width="210px">
			<div class="aside-title">
				<img src="../../../../static/images/productCenter/tou.png">
				<p>
					<span v-html="userName"></span>
					<span v-html="userPhone"></span>
				</p>
			</div>
			<div class="aside-menu">
				<el-menu
		      default-active="1"
		      class="el-menu-vertical-demo"
		      background-color="#545c64"
		      text-color="#fff"
		      active-text-color="#ffd04b">
		      <el-menu-item index="1" v-if="userType != '5'" @click="perHandel('001')">
		        <i class="el-icon-tickets"></i>
		        <span slot="title">我的订单</span>
		      </el-menu-item>
		      <el-menu-item index="2" @click="perHandel('002')">
		        <i class="el-icon-document"></i>
		        <span slot="title">我的工单</span>
		      </el-menu-item>
		      <el-menu-item index="3" v-if="userType != '5'" @click="perHandel('003')">
		        <i class="iconfont">&#xe602;</i>
		        <span slot="title">充值中心</span>
		      </el-menu-item>
		      <el-menu-item index="4" @click="perHandel('004')">
		        <i class="el-icon-setting"></i>
		        <span slot="title">设置</span>
		      </el-menu-item>
		    </el-menu>
			</div>
		</el-aside>
		<el-main>
			<div class="right-content" v-if="perType == 'A'">
				<div class="title-tab">
					<p>
						<span 
							v-for="(item, index) of alist" 
							:class="{ action: item.isActive }"
							@click="aclickhandle(item.id, index)"
						>{{ item.name }}</span>
					</p>
					<p>
						<el-button type="info" icon="el-icon-arrow-left" @click="tocenter">返回控制面板</el-button>
					</p>
				</div>
				<div class="account-wrap" v-if="atype == 'a01'">
					<account></account>
				</div>
				<div class="right-voncher" v-else>
					<div class="voncher-list">
						<div class="list-title">
							<el-radio v-model="radioTyper" label="1">可使用</el-radio>
							<el-radio v-model="radioTyper" label="2">已失效</el-radio>
						</div>
						<div class="list-ul">
							<ul v-if="voncherToggle">
								<li class="col-md-4 col-xs-6" v-for="item in voncherList1">
									<!-- <img src="../../../static/images/personal/per01.png"> -->
									<div class="img">
										<div class="img-left">
											￥<strong>{{ item.money }}</strong>
										</div>
										<div class="img-right">
											<p>代金券</p>
											<p>{{item.title}}</p>
										</div>
									</div>
									<p>生效时间：{{item.start_time}}</p>
									<p>失效时间：{{ item.end_time }}</p>
								</li>
							</ul>
							<ul v-else>
								<li class="col-md-4 col-xs-6" v-for="item in voncherList2">
									<!-- <img src="../../../static/images/personal/per01.png"> -->
									<div class="img img2">
										<div class="img-left">
											￥<strong>{{ item.money }}</strong>
										</div>
										<div class="img-right">
											<p>代金券</p>
											<p>{{ item.title }}</p>
										</div>
									</div>
									<p>生效时间：{{ item.start_time }}</p>
									<p>失效时间：{{ item.end_time }}</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="right-content" v-else-if="perType == 'B'">
				<mywork></mywork>
			</div>
			<div class="right-content" v-else-if="perType == 'C'">
				<recharge></recharge>
			</div>
			<div class="right-content" v-else-if="perType == 'D'">
				<setup></setup>
			</div>
		</el-main>
	</el-container>

	<div class="personal-center" v-if="defaultToggle">
		<div class="per-left">
			<div class="left-title">
				<h3>个人中心</h3>
			</div>
			<div class="left-user">
				<div class="portrait">
					<img src="../../../../static/images/productCenter/tou.png">
				</div>
				<ul>
					<li>
						<span>名称：</span>
						<p v-html="nickName"></p>
					</li>
					<li v-if="userType !='5'">
						<span>级别：</span>
						<p v-html="userName"></p>
					</li>
					<li>
						<span>账号：</span>
						<p v-html="userPhone"></p>
					</li>
				</ul>
			</div>
			<div class="left-discount">
				<ul v-if="userType == '5'">
					<li v-for="(item, index) in perlist" v-if="item.id != '001' && item.id != '003'">
						<p :class="{activer: item.isActive}">
							<span @click="perHandel(item.id, index)">{{ item.name }}</span>
						</p>
					</li>
					<li>
						<button @click="tosite">返回</button>
					</li>
				</ul>
				<ul v-else>
					<li v-for="(item, index) in perlist">
						<p :class="{activer: item.isActive}">
							<span @click="perHandel(item.id, index)">{{ item.name }}</span>
						</p>
					</li>
					<li v-if="userType == '6'">
						<button @click="tosite">返回</button>
					</li>
					<li v-else>
						<button @click="tocenter">返回</button>
					</li>
				</ul>
			</div>
		</div>
		<div class="per-right">
			<div class="right-banner" v-if="userType != '5'">
				<img src="../../../../static/images/personal/per02.png">
			</div>
			<div class="right-content" v-if="perType == 'A'">
				<div class="title-tab">
					<p>
						<button 
							v-for="(item, index) in alist" 
							:class="{ action: item.isActive }" 
							@click="aclickhandle(item.id, index)"
						>{{ item.name }}</button>
					</p>
				</div>
				<div v-if="atype == 'a01'">
					<account></account>
				</div>
				<div class="right-voncher" v-else>
					<div class="voncher-list">
						<div class="list-title">
							<span 
								v-for="(item, index) in vonchertitleList" 
								v-text="item.name" 
								:class="{ action: item.isAction }"
								@click="voncherHandel(index)"
							></span>
						</div>
						<div class="list-ul">
							<ul v-if="voncherToggle">
								<li class="col-md-4 col-xs-6" v-for="item in voncherList1">
									<!-- <img src="../../../static/images/personal/per01.png"> -->
									<div class="img">
										<div class="img-left">
											￥<strong>{{ item.money }}</strong>
										</div>
										<div class="img-right">
											<p>代金券</p>
											<p>{{item.title}}</p>
										</div>
									</div>
									<p>生效时间：{{item.start_time}}</p>
									<p>失效时间：{{ item.end_time }}</p>
								</li>
							</ul>
							<ul v-else>
								<li class="col-md-4 col-xs-6" v-for="item in voncherList2">
									<!-- <img src="../../../static/images/personal/per01.png"> -->
									<div class="img img2">
										<div class="img-left">
											￥<strong>{{ item.money }}</strong>
										</div>
										<div class="img-right">
											<p>代金券</p>
											<p>{{ item.title }}</p>
										</div>
									</div>
									<p>生效时间：{{ item.start_time }}</p>
									<p>失效时间：{{ item.end_time }}</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="right-content" v-else-if="perType == 'B'">
				<!-- <div class="title-tab">
					<p>
						<button 
							v-for="(item, index) in blist" 
							:class="{ action: item.isActive }"
							@click="bclickhandle(item.id, index)"
						>{{ item.name }}</button>
					</p>
				</div> -->
				<!-- <release v-if="workToggle == 'b01'"></release> -->
				<mywork></mywork>
			</div>
			<div class="right-content" v-else-if="perType == 'C'">
				<recharge></recharge>
			</div>
			<div class="right-content" v-else-if="perType == 'D'">
				<setup></setup>
			</div>
		</div>
	</div>

</div>
</template>

<script>
import { mapState } from 'vuex'
import account from '@/pages/account/components/Order'
import release from '@/pages/work/components/Release'
import mywork from '@/pages/work/components/Mywork'
import recharge from '@/pages/account/recharge/Recharge'
import setup from './Setup'
export default {
	components: {
		account,
		release,
		mywork,
		recharge,
		setup
	},
	data() {
		return {
			radioTyper: '1',
			defaultToggle: false,
			atype: 'a01',
			perlist: [{
				id: '001',
				icon: '',
				name: '我的订单',
				isActive: true
			}, {
				id: '002',
				icon: '',
				name: '我的工单',
				isActive: false
			}, {
				id: '003',
				icon: '',
				name: '充值中心',
				isActive: false
			}, {
				id: '004',
				icon: '',
				name: '设置',
				isActive: false
			}],
			alist: [{
				id: 'a01',
				name: '订单',
				isActive: true
			}, {
				id: 'a02',
				name: '代金券',
				isActive: false
			}],
			blist: [{
				id: 'b01',
				name: '发布工单',
				isActive: true
			}, {
				id: 'b02',
				name: '工单列表',
				isActive: false
			}],
			modifyToggle: true,   // 与修改页开关
			voncherList1: [],     // 代金卷可使用
			voncherList2: [],     // 代金卷已失效
			voncherToggle: true,  // 代金券tab开关
			vonchertitleList: [{
				name: '可使用',
				isAction: true
			}, {
				name: '已失效',
				isAction: false
			}],
			username: '',
			userList: [{
				name: '级别:',
				content: 'XXX'
			}, {
				name: '手机:',
				content: '13333333333'
			}]
		}
	},
	computed: {
		...mapState({
			userType: state => state.userType,
			userName: state => state.userName,
			userPhone: state => state.userPhone,
			priceListToggle: state => state.priceListToggle,
			userToggle: state => state.userToggle,
			nickName: state => state.nickName,
			userbalance: state => state.userbalance,
			workToggle: state => state.workToggle,
			rechargepayToggle: state => state.rechargepayToggle,
			perType: state => state.perType
		})
	},
	watch: {
		radioTyper(val) {
			if(val === '1') {
				this.voncherToggle = true
			}else {
				this.voncherToggle = false
			}
		},
		perType(val) {

		},
		workToggle(val) {
			if(val == 'b01') {
				for(let i=0; i<this.blist.length; i++) {
					this.blist[i].isActive = false
				}
				this.blist[0].isActive = true
			}else {
				for(let i=0; i<this.blist.length; i++) {
					this.blist[i].isActive = false
				}
				this.blist[1].isActive = true
			}
		},
		userType(val) {
			if(val == '5') {
				this.modifyToggle = false
				this.$store.state.perType = 'B'
			}
		}
	},
	mounted() {
		this.$nextTick(()=> {

			if(this.perType == 'A') {
				for(let i=0; i<this.perlist.length; i++) {
					this.perlist[i].isActive = false
					if(this.perlist[i].id == '001') {
						this.perlist[i].isActive = true
					}
				}
			}else if(this.perType == 'B') {
				for(let i=0; i<this.perlist.length; i++) {
					this.perlist[i].isActive = false
					if(this.perlist[i].id == '002') {
						this.perlist[i].isActive = true
					}
				}
			}else if(this.perType == 'C') {
				for(let i=0; i<this.perlist.length; i++) {
					this.perlist[i].isActive = false
					if(this.perlist[i].id == '003') {
						this.perlist[i].isActive = true
					}
				}
			}else if(this.perType == 'D') {
				for(let i=0; i<this.perlist.length; i++) {
					this.perlist[i].isActive = false
					if(this.perlist[i].id == '004') {
						this.perlist[i].isActive = true
					}
				}
			}

		})


		this.$axios({
			method: 'get',
			url: '/home/Content/couponstrue'
		}).then((res)=> {
			if(res.data.code == '200') {
				this.$axios({
					method: 'post',
					url: '/home/Content/couponslist'
					// method: 'get',
					// url: '/api/couponslist.json'
				}).then((res)=> {
					if(res.data.code == '200') {
						for(let i=0; i<res.data.data.length; i++) {
							if(res.data.data[i].state == '2') {
								this.voncherList2.push(res.data.data[i])
							}else {
								this.voncherList1.push(res.data.data[i])
							}
						}
					}else {
						alert(res.data.msg)
					}
				})
			}
		})
	},
	methods: {
		bclickhandle(id, index) {
			for(let i=0; i<this.blist.length; i++) {
				this.blist[i].isActive = false
			}
			this.blist[index].isActive = true
			this.$store.state.workToggle = id
		},
		aclickhandle(id, index) {
			for(let i=0; i<this.alist.length; i++) {
				this.alist[i].isActive = false
			}
			this.alist[index].isActive = true
			this.atype = id
		},
		perHandel(perId, index) {
			// console.log(perId)
			if(perId == '001') {
				this.$store.state.perType = 'A'
			}else if(perId == '002') {
				this.$store.state.perType = 'B'
				this.$store.state.workToggle = 'b01'
				this.$store.commit('detailToggleHandel', true)
			}else if(perId == '003') {
				this.$store.state.perType = 'C'
				this.$store.state.rechargepayToggle = true
			}else if(perId == '004') {
				this.$store.state.perType = 'D'
			}else if(perId == '005') {
				window.location.href = '/index/index/mywork'
			}else if(perId == '006') {
				this.$store.state.perType = 'B'
			}
			// for(let i=0; i<this.perlist.length; i++) {
			// 	this.perlist[i].isActive = false
			// }
			// this.perlist[index].isActive = true
		},
		tocenter() {
			window.location.href = '/index/index/center?site=' + 'cen'
			// this.$store.commit('userToggleHandel', true)
		},
		tosite() {
			window.location.href = '/index/index/site'
		},
		voncherHandel(index) {
			for(let i=0; i<this.vonchertitleList.length; i++) {
				this.vonchertitleList[i].isAction = false
			}
			this.vonchertitleList[index].isAction = true
			if(index == '0') {
				this.voncherToggle = true
			}else {
				this.voncherToggle = false
			}
		},
		navHandle(val) {
			if(val == '0') {
				this.$store.state.priceListToggle = true
			}else if(val == '3') {
				this.$store.state.priceListToggle = false
			}
			for(let i=0; i<this.list.length; i++) {
				this.list[i].isActive = false
			}
			this.list[val].isActive = true
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.el-container
	position: absolute
	left: 0
	top: 50px
	right: 0
	bottom: 0
	.el-aside
		background: rgb(84, 92, 100)
		.aside-title
			margin-top: 30px
			text-align: center
			img
				width: 50px
				height: auto
			p
				display: flex
				flex-direction: column
				padding-top: 10px
				span
					line-height: 22px
					color: #fff
		.aside-menu
			margin-top: 30px
			.el-menu
				border: none
			.el-menu-item
				font-size: 20px
				span
					font-size: 16px
				.iconfont
					display: inline-block
					margin-right: 5px
					width: 24px
					text-align: center
					font-size: 18px
	.el-main
		padding: 0
		.title-tab
			display: flex
			justify-content: space-between
			background: #fff
			box-shadow: 0 5px 5px #ccc
			padding: 0 20px
			p
				span
					display: inline-block
					margin: 0 20px 0 10px
					line-height: 50px
					cursor: pointer
				.action
					border-bottom: 2px solid $bgColor
				button
					margin: 10px 0
					padding: 8px 10px
					font-size: 13px
		.account-wrap
			padding: 20px
.personal-center
	display: flex
	justify-content: space-between
	.per-left
		background: #fff
		width: 210px	
		box-shadow: 0 1px 15px #ccc	
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
			.balace-wrap
				p
					margin-bottom: 0
					line-height: 24px
					strong
						font-size: 28px
		.left-discount
			padding-top: 20px
			li
				margin-bottom: 20px
				text-align: center
				// cursor: pointer
				p
					margin: 0
					line-height: 26px
				span
					font-size: 16px
					color: #333
					cursor: pointer
				button
					border: none
					background: none
					font-size: 16px
					&:hover
						color: $bgColor
				.activer
					border-left: 5px solid $bgColor
			.action
				border-left: 2px solid $bgColor
	.per-right
		width: 76%
		.right-banner
			img
				width: 100%
		.right-content
			.title-tab
				margin: 25px 0
				button
					background: #f6f6f6
					border: 1px solid #ccc
					border-radius: 3px
					padding: 5px 19px
					margin-right: 35px
					font-size: 18px
					color: #333
				.action
					background: $bgColor
					border-color: $bgColor
					color: #fff
			



.right-voncher
	overflow: hidden
	clear: both
	padding: 20px 35px
	h3
		font-size: 18px
		line-height: 34px
	.list-title
		line-height: 26px
		span
			margin-right: 20px
			display: inline-block
			color: #656565
			cursor: pointer
			font-size: 16px
		.action
			border-bottom: 2px solid #f29b76
			color: #000
	.list-ul
		margin-top: 10px
		background: #fff
		padding: 30px 10px
		overflow: hidden
		ul
			li
				max-width: 350px
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
</style>