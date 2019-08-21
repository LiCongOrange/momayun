<template>
<div class="loginWrap">
	<!-- <index-header></index-header> -->
	<div class="login">
		<div class="container">
			<div class="login-box">
				<div class="login_box_left">
					<p>欢迎登录</p>
					<img src="@/assets/images/login/loginimg.png">
				</div>
				<div class="login_box_right">
					<div class="login-title">
					</div>
					<div class="center">
						<ul  v-if="this.codeOnoff">
							<li class="li_title"></li>
							<li>
								<input 
									type="text" 
									name="mobile" 
									v-model="mobile"
									maxlength="11" 
									:class="{'isDanger': warn1 }"
									:input="getMobile(mobile)"
									placeholder="请输入手机号" 
								>
							</li>
							<li class="li_title" style="margin-top:30px"></li>
							<li>
								<input 
									type="password" 
									name="password" 
									v-model="password"
									maxlength="20" 
									minlength="6" 
									:class="{'isDanger': warn2 }"
									:input="getPassword(password)"
									placeholder="请输入密码" 
									@keyup.enter="toLogin"
								>
							</li>
							<li>
								<label @click.self="fnToggle('8')">
									<input type="radio" name="gender" id="a" checked="checked">
									<span>使用建站账号登录</span>
								</label>
							</li>
							<li>
								<label @click.self="fnToggle('9')">
									<input type="radio" name="gender" id="a" checked="checked">
									<span>使用推广账号登录</span>
								</label>
							</li>
							<li>
								<label @click.self="fnToggle('10')">
									<input type="radio" name="gender" id="b">
									<span>使用技术账号登录</span>
								</label>
							</li>
							<li>
								<el-button type="primary" @click="toLogin">登录</el-button>
								<!-- <button @click="toLogin">登录</button> -->
							</li>
							<li class="register">
								<a href="javascript:;" @click="toPassword">忘记密码</a>
							</li>
						</ul>
					</div>
				</div>
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
			ishosttype: '',
			istypeToggle: false,
			istypeId: '9',
			codeOnoff: true,
			mobile: '',
			password: '',
			warn1: false,
			warn2: false
		}
	},
	mounted() {
		let hostname = window.location.hostname
		this.ishosttype = hostname.split(".")[2]
		console.log(this.ishosttype)
	},
	methods: {
		fnToggle(type) {
			// this.istypeToggle = !this.istypeToggle
			this.istypeId = type
		},
		toPassword() {
			window.location.href = '/index/index/password?' + this.istypeId
		},
		toLogin() {
				this.$axios({
					method: 'post',
					url: '/home/passport/login',
					data: {
						mobile: this.mobile,
						password: this.password,
						type: this.istypeId
					}
				}).then((res) => {
					if(res.data.code == 200) {
						if(this.ishosttype == 'vip') {
							window.location.href = 'https://xcx.686868.vip/index/login/api_dologin?username=' + this.mobile
						}else {
							window.location.href = 'https://xcx.momayun.cn/index/login/api_dologin?username=' + this.mobile
						}
					}else {
						this.$message({
							type: 'error',
							message: res.data.msg
						})
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
	display:block
	padding:10px
	background:#EDF7FF
	width:100%
	overflow:hidden
	position:absolute
	top:0px
	bottom:0
	z-index:2
	font-family:"微软雅黑"
	.center
		// height: 200px
		overflow: hidden
		margin-top: 30px
	.bg
		background: $bgColor
		min-height: 450px	
		border-radius: 0 0 50% 50% 0 0 100% 100%
	.code-preview
		text-align: center
		transition: all 0.5s
		img
			width: 180px
			margin: 0 auto
	.container
		width: 950px
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
			// margin-top: 20%
			background: #fff
			padding: 25px 25px 40px
			box-sizing: border-box
			overflow: hidden
			position: fixed
			top: 50%
			left: 50%
			transform: translate(-50%, -50%)
			min-width: 700px
			.login_box_left
				float:left
				width:40%
				height:300px
				p
					text-align:left
					font-size:24px
					color:#303030
				img
					display:block
					margin:0 auto
					width:90%
					margin-top: 45px
			.login_box_right
				float:right
				width:45%
				.login-title
					overflow: hidden
					line-height: 40px
					text-align:center
					span
						font-size: 22px
						text-align:center
						color:#01AD6A
						border-bottom:3px solid #01AD6A
						padding-bottom:5px
					.code
						float: right
						height: 56px
			ul
				margin: 0
				.li_title
					line-height:30px
					font-size:18px
					color:#ABABAB
				li
					// margin-top: 15px
					label
						min-width: 100px
						text-align: left
						position: relative
						line-height: 32px
						margin-top: 10px
						&:before
							content: ''
							display: block
							position: absolute
							left: 0
							top: 0
							right: 0
							bottom: 0
							background: rgba(255, 255, 255, 0.1)
						input
							width: auto
							vertical-align: middle
						span
							vertical-align: middle
					input
						width: 100%
						height: 30px
						line-height: 30px 
						border:none  
						border-bottom: 1px solid #b5b5b5
						text-indent: 12px
						font-size: 16px
						color: #666
					.isDanger
						border-color: red
					#yg
						width:auto
						margin-left:60px
						margin-top:30px
					#dl
						width:auto
						margin-top:30px
						margin-left:20px
					#dl2
						width:auto
						margin-top:30px
						margin-left:20px
					#dl3
						width:auto
						margin-top:30px
						margin-left:20px
					#dl4
						width:auto
						margin-top:30px
						margin-left:20px
					button
						width: 100%
						font-size: 18px
						margin: 10px auto
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