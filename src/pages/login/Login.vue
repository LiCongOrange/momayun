<template>
<div class="loginWrap" v-if="this.nonono">
	<index-header></index-header>
	<div class="login">
		<div class="bg"></div>
		<div class="container">
			<h1>MOMAYUN</h1>
			<h2>智能应用搭建平台</h2>
			<div class="login-box">
				<div class="login-title">
					<span v-if="this.codeOnoff">密码登录</span>
					<!-- <div class="code" @mouseover="codeShow" @mouseout="codeHide">
						<span></span>
					</div> -->
				</div>
				<div class="center">
					<ul  v-if="this.codeOnoff">
						<li>
							<input 
								type="text" 
								name="mobile" 
								v-model="mobile"
								maxlength="11" 
								placeholder="请输入手机号"
								:class="{'isDanger': warn1 }"
								:input="getMobile(mobile)"
							>
						</li>
						<li>
							<input 
								type="password" 
								name="password" 
								v-model="password"
								maxlength="20" 
								minlength="6" 
								placeholder="请输入密码"
								:class="{'isDanger': warn2 }"
								:input="getPassword(password)"
							>
						</li>
						<li>
							<button @click="toLogin">登录</button>
							<!-- <router-link to="/center">登录测试</router-link> -->
						</li>
						<li class="register">
							<a href="/index/index/register">免费注册</a>
							<a href="javascript:;" @click="toPassword">找回密码</a>
							<!-- <router-link to="/register">/注册测试</router-link>
							<router-link to="/password">/找回测试</router-link> -->
						</li>
					</ul>
					<div class="code-preview" v-else>
						<img src="../../../static/images/indexImg/code.png">
					</div>
				</div>
				<!-- <div class="other">
					<h5>其他登录方式</h5>
					<p>
						<i class="iconfont wechat">&#xe654;</i>
						<i class="iconfont penguin">&#xe658;</i>
						<i class="iconfont alipay">&#xe65f;</i>
					</p>
				</div> -->
			</div>
			<div class="foot">
				<p>瑞森时代互联网有限公司瑞森时代互联网有限公司瑞森时代互联网有限公司瑞森时代互联网有限公司</p>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import navBus from '@/assets/js/navBus'
import IndexHeader from '@/common/Header'
export default {
	components: {
		IndexHeader
	},
	data() {
		return {
			nonono: false,
			codeOnoff: true,
			mobile: '',
			password: '',
			warn1: false,
			warn2: false,
			loginSucc: true
		}
	},
	mounted() {
			window.location.href = 'http://www.momayun.cn/'
	},
	methods: {
		toPassword() {
			window.location.href = '/index/index/password?' + '1'
		},
		toLogin() {
			this.$axios({
				method: 'post',
				url: '/home/passport/login',
				// url: '/api/login.json',
				data: {
					mobile: this.mobile,
					password: this.password,
					type: '1'
				}
			}).then((res) => {
				if(res.data.code == '200') {
					window.location.href = 'https://xcx.momayun.cn/index/login/api_dologin?username=' + res.data.data.mobile
					this.loginSucc = false
					navBus.$emit('setLoginsucc', this.loginSucc)
				}
				if(res.data.code == '404') {
					alert(res.data.msg)
					this.loginSucc = true
					navBus.$emit('setLoginsucc', this.loginSucc)
				}
			})
		},
		getPassword(val) {
			if(this.password) {
				let reg = /^(\w){6,20}$/
				if(!reg.test(val)) {
					this.warn2 = true
				}else {
					this.warn2 = false
				}
			}
		},
		getMobile(val) {
			if(this.mobile) {
				let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
				if(!reg.test(val)) {
					this.warn1 = true
				}else {
					this.warn1 = false
				}
			}
		},
		codeShow() {
			this.codeOnoff = false
		},
		codeHide() {
			this.codeOnoff = true
		},
		toRegister() {
			this.$store.state.toLoginType = 'B'
		},
		toGetPassword() {
			this.$store.state.toLoginType = 'C'
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.login
	position: relative
	.center
		height: 200px
		overflow: hidden
	.bg
		background: $bgColor
		min-height: 450px	
		border-radius: 0 0 50% 50%/ 0 0 100% 100%
	.code-preview
		text-align: center
		transition: all 0.5s
		img
			width: 180px
			margin: 0 auto
	.container
		position: absolute
		top: 50px
		left: 50%
		margin-left: -225px
		width: 450px
		.foot
			padding: 40px
			text-align: center
			font-size: 14px
			color: $fontColor
		h1
			text-align: center
			color: #fff
			font-size: 50px
		h2
			text-align: center
			color: #fff
			font-size: 40px
		.login-box
			margin-top: 40px
			background: #fff
			padding: 25px 45px 10px
			box-sizing: border-box
			overflow: hidden
			box-shadow: 0 5px 25px #8bd89a
			.login-title
				overflow: hidden
				line-height: 40px
				span
					float: left
					font-size: 22px
				.code
					float: right
					height: 56px
					img
						width: 56px
					span
						height: 56px
						width: 180px
						background: url('../../../static/images/indexImg/code-preview.png')
			ul
				margin: 0
				li
					margin-top: 15px
					input
						width: 100%
						height: 46px
						border: 1px solid #b5b5b5
						text-indent: 12px
						font-size: 16px
						color: #b5b5b5
					.isDanger
						border-color: red
					button
						width: 100%
						border: none
						background: $bgColor
						line-height: 34px
						color: #fff
						border-radius: 15px
						font-size: 18px
				.register
					margin-top: 5px
					a
						float: left
						color: $fontColor
						&:nth-of-type(2)
							float: right
							color: $bgColor
					&:after
						clear: both
						content: ''
						display: block
			.other
					margin-top: 10px
				h5
					position: relative
					text-align: center
					font-size: 16px
					&:before
						height: 2px
						width: 40px
						background: $bgColor
						content: ''
						position: absolute
						top: 50%
						left: 20%
					&:after
						height: 2px
						width: 40px
						background: $bgColor
						content: ''
						position: absolute
						top: 50%
						right: 20%
				p
					text-align: center
					i
						margin: 0 10px
						font-size: 42px
					.wechat
						font-size: 42px
						color: #1ad404
					.penguin
						font-size: 38px
						color: #00addc
					.alipay
						font-size: 36px
						color: #06a0e0
</style>