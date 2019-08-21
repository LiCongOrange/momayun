<template>
<div class="loginWrap">
	<!-- <index-header></index-header> -->
	<div class="login">
		<div class="container">
			<div class="login-box">
				<div class="login-logo">
					<img src="/static/images/login/logo.png">
				</div>
				<div class="login_box_right">
					<div class="login-title">
					</div>
					<div class="center">
						<ul  v-if="this.codeOnoff">
							<li class="li_title">手机号</li>
							<li>
								<el-input
									placeholder="请输入账号"
									v-model="mobile"
									maxlength="11"
									:input="getMobile(mobile)"
									clearable
								></el-input>
								<!-- <input 
									type="text" 
									name="mobile" 
									v-model="mobile"
									maxlength="11" 
									:class="{'isDanger': warn1 }"
									:input="getMobile(mobile)"
								> -->
							</li>
							<li class="li_title" style="margin-top:15px">密码</li>
							<li>
								<el-input
									type="password"
									placeholder="请输入密码"
									v-model="password"
									maxlength="30"
									:input="getPassword(password)"
									show-password
									@keyup.enter.native="toLogin"
								></el-input>
								<!-- <input 
									type="password" 
									name="password" 
									v-model="password"
									maxlength="20" 
									minlength="6" 
									:class="{'isDanger': warn2 }"
									:input="getPassword(password)"
									@keyup.enter="toLogin"
								> -->
							</li>
							<li>
								<el-checkbox v-model="istypeToggle">使用员工账号登录</el-checkbox>
							</li>
							<li>
								<el-button type="primary" @click="toLogin">登录</el-button>
							</li>
							<li class="register" v-if="!istypeToggle">
								<a href="/index/index/register">免费注册</a>
								<a href="javascript:;" @click="toPassword">找回密码</a>
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
			istypeId: '1',
			codeOnoff: true,
			mobile: '',
			password: '',
			warn1: false,
			warn2: false,
			loginSucc: true,
			gender:'创业用户',
			dlGrade:'6'
		}
	},
	mounted() {
		this.$nextTick(()=> {

			this.$axios({
				method: 'get',
				url: '/home/passport/islogin'
			}).then((res) => {
				if(res.data.code == '200') {
					if(res.data.data == '6' || res.data.data == '5') {
						window.location.href = '/index/index/site'
					}else {
						window.location.href = '/index/index/center'
					}
				}
			})



			// let hostname = window.location.hostname
			// this.ishosttype = hostname.split(".")[2]
			// console.log(this.ishosttype)

			// let urlSearch = window.location.search
   //    let allurl = urlSearch.split("?")[1]
   //    let parameter = allurl.split("=")[1]
   //    if(parameter != 'a') {
			// 	this.$axios({
			// 		method: 'get',
			// 		url: '/home/passport/islogin'
			// 	}).then((res) => {
			// 		if(res.data.code == '200') {
			// 			if(res.data.data == '6') {
			// 				window.location.href = '/index/index/site'
			// 			}else {
			// 				window.location.href = '/index/index/center'
			// 			}
			// 		}
			// 	})
   //    }

		})
	},
	methods: {
		fnToggle() {
			this.istypeToggle = !this.istypeToggle
		},
		toPassword() {
			window.location.href = '/index/index/password?' + 2
		},
		toLogin() {
			let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
			if(!reg.test(this.mobile)) {
				this.$notify.error({
					title: '错误',
					message: '账号或密码错误！'
				})
			}else {
				if(this.password) {
					if(!this.istypeToggle) {
						this.istypeId = 1
						this.$axios({
							method: 'post',
							url: '/home/passport/dllogin',
							data: {
								mobile: this.mobile,
								password: this.password,
								istype: this.istypeId
							}
						}).then((res) => {
							if(res.data.code == 200) {
								if(res.data.data.type == '6') {
									window.location.href = '/index/index/site'
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
					}else {
						this.istypeId = 2
						this.$axios({
							method: 'post',
							url: '/home/passport/dllogin',
							data: {
								mobile: this.mobile,
								password: this.password,
								istype: this.istypeId
							}
						}).then((res)=> {
							if(res.data.code == 200) {
								window.location.href = '/index/index/site'
							}else {
								this.$message({
									type: 'error',
									message: res.data.msg
								})
							}
						})
					}
				}else {
					this.$notify.error({
						title: '错误',
						message: '密码不能为空！'
					})
				}
			}
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
	background: rgba(86, 115, 217, 0.7) url('/static/images/login/bg1.png')
	width:100%
	overflow:hidden
	position:absolute
	top:0
	bottom:0
	z-index: 2
	font-family:"微软雅黑"
	background-size: cover
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
			position: absolute
			width: 600px
			top: 50%
			left: 50%
			transform: translate(-50%, -50%)
			background: #fff
			padding: 25px 25px 40px
			box-sizing: border-box
			border-radius: 20px
			.login-logo
				position: absolute
				left: 50%
				top: -17%
				transform: translateX(-50%)
				width: 150px
				height: 150px
				background: #fff
				padding: 20px
				text-align: center
				border-radius: 80px
				img
					width: 78%
					height: auto
			.login_box_right
				margin: 40px auto 0
				max-width: 357px
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
					line-height: 36px
					font-size: 17px
					color: #5e5e5e
				li
					// margin-top: 15px
					label
						min-width: 100px
						text-align: left
						position: relative
						line-height: 32px
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
						display: inline-block
						width: 100%
						height: 42px
						line-height: 42px 
						border: 1px solid #b5b5b5
						border-radius: 5px
						font-size: 16px
						color: #b5b5b5
						text-indent: 12px
						&:focus
							border-color: $bgColor
					.isDanger
						border-color: red
					#yg
						width:auto
						margin-top:30px
					#dl
						width:auto
						margin-top:30px
					#dl2
						width:auto
						margin-top:30px
					#dl3
						width:auto
						margin-top:30px
					#dl4
						width:auto
						margin-top:30px
					button
						width: 100%
						font-size: 18px
						// border: none
						// background: $bgColor
						// line-height: 44px
						// color: #fff
						// border-radius: 5px
						// font-size: 18px
						// display:block
						// box-shadow: 0 5px 10px #86DEBE
						// &:hover
						// 	box-shadow: none
						// 	background: $btnhoverbg
						// 	transform: scale(0.99)
						// margin-top:20px
				.register
					margin-top: 20px
					a
						float: left
						color: #666
						font-weight: 700
						font-size: 14px
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