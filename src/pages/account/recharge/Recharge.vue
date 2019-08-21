<template>
<div class="recharge">
	<div class="money-center">
		<div class="mask" v-if="this.$store.state.moneyRecordToggle">
			<div class="maskNei">
				<recharge-record></recharge-record>
			</div>
		</div>
		<div class="title-h">
			<h2>充值中心</h2>
			<p>当前账户余额： <span>{{ userbalance }}元</span></p>
			<el-button type="info" icon="el-icon-arrow-left" @click="tocenter">返回控制面板</el-button>
		</div>
		<div class="re-main" v-if="rechargepayToggle">
			<div class="title">
				<div class="title-right">
					<i class="iconfont">&#xe604;</i>
					<a href="javascript:;" @click="moneyRecordToggle">充值记录</a>	
				</div>
			</div>
			<div class="content">
				<div class="choiceMoney">
					<h5>请选择充值金额：</h5>
					<p>
						<input 
							type="text" 
							v-model="monerNum" 
							:class="{ danger:isdanger }"
							maxlength="8" 
							@input="moneyHandel"
						>&nbsp元
					</p><br />
					<el-button type="primary" @click="toAccount">立即充值</el-button>
				</div>
			</div>
		</div>
		<pay v-else></pay>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import RechargeRecord from './RechargeRecord'
import pay from '@/pages/pay/Pay'
export default {
	components: {
		RechargeRecord,
		pay
	},
	data() {
		return {
			isdanger: false,
			monerNum: '',
			moneyList: [{
				name: '200',
				classActive: false
			}, {
				name: '500',
				classActive: false
			}, {
				name: '1000',
				classActive: false
			}, {
				name: '2000',
				classActive: false
			}, {
				name: '5000',
				classActive: false
			}, {
				name: '10000',
				classActive: false
			}, {
				name: '20000',
				classActive: false
			}]
		}
	},
	computed: {
		...mapState({
			userType: state => state.userType,
			userbalance: state => state.userbalance,
			rechargepayToggle: state => state.rechargepayToggle
		})
	},
	methods: {
		tocenter() {
			window.location.href = '/index/index/center?site=' + 'cen'
		},
		moneyHandel(e) {
			e.target.value = (e.target.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
			let firstNum = e.target.value.slice(0, 1)
			if(firstNum == '0' || firstNum == '.') {
				this.$notify.info({
					title: '消息',
					message: '金额不可小于一元',
					position: 'botton-right'
				})
				this.monerNum = ''
			}else {
				this.monerNum = e.target.value
			}
		},
		toAccount() {
			if(this.monerNum) {
				this.$store.state.rechargepayToggle = false
				this.$store.state.paynum = this.monerNum
			}else {
				this.$notify.info({
					title: '消息',
					message: '金额不可小于一元',
					position: 'botton-right'
				})
			}
			// window.location.href = '/index/index/pay?' + this.monerNum
		},
		moneyRecordToggle() {
			this.$store.state.moneyRecordToggle = true
		},
		getMoney(val, monerNun) {
			this.monerNum = monerNun
			for(let i=0; i<this.moneyList.length; i++) {
				this.moneyList[i].classActive = false
			}
			this.moneyList[val].classActive = true
		}
	},
	mounted() {
		if(this.userType == '5' || this.userType == '6') {
			window.location.href = '/index/index/site'
		}
		this.$store.state.navigation1 = '个人中心'
		this.$store.state.navigation2 = '充值'
	},
	updated() {
		this.$axios({
			method: 'post',
			url: '/api/Usersites/userint'
		}).then((res)=> {
			if(res.data.code == '200') {
				this.$store.commit('userbalanceHandel', res.data.data.money)
			}
		})
	},
	activated() {
		this.$axios({
			method: 'post',
			url: '/api/Usersites/userint'
		}).then((res)=> {
			if(res.data.code == '200') {
				this.$store.commit('userbalanceHandel', res.data.data.money)
			}
		})
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.recharge
	width: 100%
	height: 100%
	background: $bgColor1
.money-center
	.title-h
		overflow: hidden
		background: #fff
		padding: 0 35px
		line-height: 50px
		h2
			float: left
			margin: 0
			font-size: 14px
			line-height: 50px
		p
			float: left
			margin-left: 30px
			font-size: 14px
			span
				color: $bgColor2
				font-size: 15px
		button
			margin-top: 8px
			float: right
			padding: 8px 15px
	.re-main
		margin: 20px
		box-shadow: $boxshadow
	.mask
		position: fixed
		left: 0
		right: 0
		top: 0
		bottom: 0
		background: rgba(0, 0, 0, 0.7)
		z-index: 100
		.maskNei
			background: rgba(255, 255, 255, 1)
			position: fixed
			left: 12%
			right: 12%
			top: 100px
			bottom: 4%
	.title
		background: #fff
		padding: 0 15px
		overflow: hidden
		border-bottom: 1px solid #ccc
		line-height: 60px
		text-align: right
		.title-left
			float: left
			p
				font-size: 16px
				strong
					font-size: 20px
					color: $bgColor
		.title-right
			float: right
			a
				color: $bgColor2
				vertical-align: middle
			i
				margin-right: 5px
				color: #606060
				vertical-align: middle
				font-size: 18px
	.content
		display: flex
		align-items: center
		justify-content: center
		min-height: 400px
		background: #fff
		padding: 20px 20px 50px
		.balance
			overflow: hidden
			line-height: 60px
			strong
				font-size: 22px
		.choiceMoney
			text-align: center
			h5
				display: inline-block
				font-size: 22px
			p
				display: inline-block
				input
					background: #f6f6f6
					border: 1px solid #ccc
					border-radius: 3px
					line-height: 34px
					text-indent: 12px
					overflow: hidden
					&:focus
						border-color: $bgColor
				.danger
					border-color: red !important
			ul
				padding-left: 50px
				overflow: hidden
				margin: 20px 0
				li
					float: left
					margin: 0 42px 20px 0
					border: 1px solid #8f8f8f
					background: #eeeeee
					color: #5a5a5a
					padding: 5px 15px
					border-radius: 10px
					cursor: pointer
					transition: all 0.3s
					&:hover
						border-color: $bgColor
				.active
					background: $bgColor
					border-color: $bgColor
					color: #fff
			button
				margin-top: 50px
				width: 100%
</style>