<template>
	<div class="pay-content">
		<!-- <index-header></index-header> -->
		<!-- <crumbs></crumbs> -->

		<div class="">
			<div class="title">
				<!-- <h2>选择支付方式</h2> -->
				<ul>
					<li v-for="(item, index) in tablist" :class="{ activer: item.switch }">
							<p>{{ item.name }}</p>
					</li>
				</ul>
			</div>
			<div class="content-pay">


				<div class="paytype01" v-if="payType == 'A'">
					<div class="pay01-title">
						<div class="pay01-title-icon">
							<i class="iconfont">&#xe637;</i>
						</div>
						<div class="pay01-title-text">
							<h4>订单提交成功</h4>
							<p>您可以继续支付，我们将在30分钟内处理您的订单。</p>
						</div>
					</div>
					<div class="pay01-content">
						<div class="moneynum">
							<span>支付金额：</span>
							<font>{{ paynum }}</font>元
						</div>
						<div class="paymode">
							<span>选择支付方式：</span>
							<el-radio v-model="radioType" label="1" border>微信支付</el-radio>
    					<el-radio v-model="radioType" label="2" border>支付宝支付</el-radio>
							<!-- <ul>
								<li v-for="(item, index) in payList" :class="{ active: item.isActive }">
									<label @click="payMode(index)">
										<input type="radio" name="paymb" :id="item.name">
										<div>
											<i class="iconfont"></i>{{ item.name }}支付
										</div>
									</label>
								</li>
							</ul> -->
						</div>
						<div class="payBtn">
							<!-- <button @click="checkPay">确认付款</button>
							<button @click="toback">返回</button> -->
							<el-button type="primary" @click="checkPay">确认付款</el-button>
							<el-button type="primary" @click="toback">返回</el-button>
						</div>
					</div>
				</div>
				<div class="paytype02" v-else-if="payType == 'B'">
					<h2>
						<i class="iconfont">&#xe650;</i>微信支付
					</h2>
					<p>打开手机微信，扫一扫下方的二维码，即可完成支付</p>
					<div class="code-wrap">
						<img :src="codeUrl">
					</div>
					<div class="backbtn">
						<a href="javascript:;" @click="backHandel('01')">&lt;选择其他支付方式</a>
					</div>
				</div>
				<div class="paytype03" v-else-if="payType == 'C'">
					<div class="pay03-title">
						<div class="pay03-title-icon">
							<i class="iconfont">&#xe694;</i>
							<h3>支付成功</h3>
						</div>
						<div class="pay03-title-text">
							
							<h2>￥{{ paynum }}</h2>
							<p>
								<!-- <button @click="backHandel('02')">完成</button> -->
								<el-button @click="backHandel('02')" type="primary">完成</el-button>
							</p>
							<p>
								<font><strong>{{ countdown }}</strong>s</font>后，
								<!-- <a href="javascript:;">&lt;返回</a> -->
								返回充值页面，可查看支付订单
							</p>
						</div>
					</div>
				</div>
			</div>
			<dialog-bar
				v-if="dialogToggle"
				:dialog-option="dialogOption"
				@confirmHandle="dialogCallback"
			></dialog-bar>
		</div>

	</div>
</template>

<script>
import { mapState } from 'vuex'
import IndexHeader from '@/common/Header'
import Crumbs from '@/common/Crumbs'
import dialogBar from '@/common/Dialog'
export default {
	components: {
		IndexHeader,
		Crumbs,
		dialogBar
	},
	data() {
		return {
			radioType: '1',
			countdown: 5,
			moneyNum: 123,
			payType: 'A',
			timercount: 3,
			codeTitle: '请使用微信扫一扫',
			codeToggle: false,
			codeUrl: '',
			dialogToggle: false,
			dialogOption: {
				type: 1,
				content: ''
			},
			codeMode: '',
			codeMask: true,
			codeName: '',
			codeType: 'A',
			payList: [{
				name: '微信',
				isActive: false
			}, {
				name: '支付宝',
				isActive: false
			}],
			tablist: [{
				name: '订单提交',
				switch: true
			}, {
				name: '扫码支付',
				switch: false
			}, {
				name: '支付成功',
				switch: false
			}]
		}
	},
	computed: {
		...mapState({
			userType: state => state.userType,
			userId: state => state.userId,
			paynum: state => state.paynum
		})
	},
	methods: {
		toback() {
			this.$store.state.rechargepayToggle = true
		},
		backHandel(type) {
			if(type == '01') {
				this.payType = 'A'
				this.tablist[1].switch = false
			}else if(type == '02') {
				this.$store.state.rechargepayToggle = true
				// window.location.href = '/index/index/recharge'
			}
		},
		dialogCallback(data) {

		},
		payMode(index) {
			this.codeMode = index + 1
			for(let i=0; i<this.payList.length; i++) {
				this.payList[i].isActive = false
			}
			this.payList[index].isActive = true
		},
		checkPay() {

		  if(this.radioType == '1') {
		  	this.codeTitle = '请使用微信扫一扫'
		  	this.$axios({
		  		method: 'get',
		  		url: '/api/wxnativepay',
		  		params: {
		  			total_fee: this.paynum,
		  			uid: this.userId
		  		}
		  	}).then((res)=> {
		  		if(res.data.code == '200') {
		  			// this.codeToggle = true
		  			this.tablist[1].switch = true
		  			this.codeUrl = res.data.data.code_url
		  			this.payType = 'B'
		  			this.timer = setInterval(()=> {
		  				this.timercount --
		  				if(this.timercount <= 0) {
		  					this.codebackHandel(res.data.data.out_trade_no)
		  				}
		  			}, 1000)
		  		}else {
		  			alert(res.data.msg)
		  		}
		  	})
		  }else if(this.radioType == '2') {
		  	window.open('/api/alipay/pagepay?money=' + this.paynum)
		  }else {
		  	alert('请选择支付方式！')
		  }
		},
		codebackHandel(tradeId) {
			this.$axios({
				method: 'get',
				url: '/api/wxnativepay/orderstate',
				params: {
					out_trade_no: tradeId
				}
			}).then((res)=> {
				if(res.data.code == '200') {
					this.tablist[2].switch = true
					this.payType = 'C'
					clearInterval(this.timer)
					this.timer2 = setInterval(()=> {
						this.countdown --
						if(this.countdown <= 0) {
							// window.location.href = '/index/index/recharge'
							this.$store.state.rechargepayToggle = true
						}
					}, 1000)
				}
			})
		}
	},
	mounted() {
		if(this.userType == '5' || this.userType == '6') {
			window.location.href = '/index/index/site'
		}
		this.$store.state.navigation1 = '账户信息'
		this.$store.state.navigation2 = '充值中心'
		this.$store.state.navigation3 = '支付方式'
		// var urlSearch = window.location.search
		// this.moneyNum = urlSearch.split("?")[1]

		// this.$axios({
		// 	method: 'get',
		// 	url: '/home/passport/islogin'
		// }).then((res)=> {
		// 	if(res.data.code == '404') {
		// 		alert('未登录用户，请先登录')
  //       		window.location.href = '/index/index/login'
		// 	}
		// })
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.pay-content
	width: 100%
	height: 100%
	padding: 20px
	.title
		padding: 30px 0 20px
		ul
			display: flex
			justify-content: space-between
			padding: 0 !important
			margin: 0
			li
				width: 150px
				background: #fff
				padding: 0 25px
				box-shadow: 0 5px 5px #ccc
				border-left: 2px solid #ccc
				text-align: center
				margin: 0 !important
				line-height: 40px
				transition: all .3s
				p
					margin: 0
					font-size: 16px
			.activer
				border-left: 2px solid 
				border-image: linear-gradient(#0068cf, #19ffa7) 5 5 
				transform: translateY(13%)
	.content-pay
		background: #fff
		padding: 20px 0
		box-shadow: $boxshadow
		.paytype01
			.pay01-title
				margin-top: 20px
				display: flex
				justify-content: center
				.pay01-title-icon
					display: flex
					align-items: center
					i
						font-size: 30px
						color: $bgColor
				.pay01-title-text
					margin-left: 10px
					h4
						margin: 0
						line-height: 28px
						font-size: 22px
					p
						margin: 0
						line-height: 26px
			.pay01-content
				display: flex
				justify-content: center
				flex-direction: column
				max-width: 440px
				margin: 15px auto 0
				.moneynum
					margin-bottom: 10px
					line-height: 44px
					span
						width: 98px
						display: inline-block
						text-align: right
					font
						margin-left: 10px
						margin-right: 5px
						font-weight: bold
						font-size: 28px
				.paymode
					>>> label
						margin-right: 15px
						.iconfont
							font-size: 14px
		.paytype02
			h2
				text-align: center
				line-height: 40px
				i
					margin: 0 5px
					font-size: 36px
					color: $bgColor
			p
				text-align: center
				line-height: 26px
			.code-wrap
				padding: 20px
				text-align: center
				img
					max-width: 300px
					height: auto
					min-width: 250px
			.backbtn
				margin-left: 25px
				line-height: 26px		
				a
					color: $bgColor
					font-size: 16px
		.paytype03
				.pay03-title-icon
					text-align: center
					font-size: 32px
					i
						margin: 0 5px
						font-size: 126px
						color: $bgColor
					h3
						margin: 0
						font-size: 28px
				.pay03-title-text
					text-align: center
					p
						line-height: 34px
						font-size: 14px
						button
							min-width: 120px
							font-size: 20px
		ul
			padding: 20px
			li
				margin:  0 0 10px
				padding: 2px 5px
				label
					cursor: pointer
					input
						width: 15px
						height: 15px
						display: inline-block
					div
						margin: 0 10px
						display: inline-block
						border: 1px solid #d7d7d7
						min-width: 120px
						transition: all .3s
				i
					&:before
						content: '\e654'
					margin: 0 5px
					color: #0bc100
					font-size: 28px
					vertical-align: middle
				&:nth-of-type(2)
					i
						&:before
							content: '\e65f'
						color: #00a0d9
				&:nth-of-type(3)
					i
						&:before
							content: '\e6b3'
						color: #286fef
			.active
				div
					border-color: $bgColor
		.payBtn
			margin: 20px 0
.code-wrap
	z-index: 1000
	display: flex
	justify-content: center
	align-items: center
	flex-direction: column
	h5
		padding: 5px 35px
		background: rgba(77, 69, 69, 0.9)
		border-radius: 15px
		color: #f1f2f1
		font-size: 24px
</style>