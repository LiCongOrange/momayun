<template>
<div class="loginWrap">
	<div class="login">
		<div class="container">
			<div class="login-box">
				<div class="login_box_left">
					<img src="@/assets/images/login/userlogin.png">
				</div>
				<div class="login_box_right">
					<div class="login-title">
					</div>
					<div class="center">
						<ul  v-if="this.codeOnoff">
							<li class="login_title"><span>登录</span></li>
							<li class="li_title">手机号：</li>
							<li>
								<input 
									type="text" 
									name="mobile" 
									v-model="mobile"
									maxlength="11" 
									:class="{'isDanger': warn1 }"
									:input="getMobile(mobile)"
								>
							</li>
							<li class="li_title" style="margin-top:30px">密码：</li>
							<li>
								<input 
									type="password" 
									name="password" 
									v-model="password"
									maxlength="20" 
									minlength="6" 
									:class="{'isDanger': warn2 }"
									:input="getPassword(password)"
									@keyup.enter="toLogin"
								>
							</li>
							<li>
								<el-button type="primary" @click="toLogin">登录</el-button>
								<!-- <button @click="toLogin">登录</button> -->
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

export default {
	components: {

	},
	data() {
		return {
			codeOnoff: true,
			mobile: '',
			password: '',
			warn1: false,
			warn2: false,
			loginSucc: true
		}
	},
	methods: {
		toLogin() {
			this.$axios({
				method: 'post',
				url: '/home/passport/dlendlogin',
				data: {
					mobile: this.mobile,
					password: this.password
				}
			}).then((res) => {
				if(res.data.code == 200) {
					window.location.href = '/index/index/site'
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
	z-index: 2
	font-family:"微软雅黑"
	.center
		// height: 200px
		overflow: hidden
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
			background: #fff
			padding:0px 25px 0px 0
			box-sizing: border-box
			overflow: hidden
			transform: translateY(50%)
			.login_box_left
				float:left
				width:40%
				min-height:300px
				p
					text-align:left
					font-size:24px
					color:#303030
				img
					display:block
					margin:0 
					width:100%
			.login_box_right
				float:right
				width:45%
				padding-top:25px
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
				.login_title
					text-align:center
					line-height:30px
					font-size:24px
					color:$bgColor
					margin-bottom:40px
					span
						border-bottom:1px solid $bgColor
				.li_title
					line-height:30px
					font-size:18px
					color:#ABABAB
				li
					// margin-top: 15px
					input
						width: 100%
						line-height: 30px 
						border:none  
						border-bottom: 1px solid #b5b5b5
						text-indent: 12px
						font-size: 16px
						color: #b5b5b5
					.isDanger
						border-color: red
					button
						width: 80%
						margin: 30px auto 0
						font-size: 18px
						display:block
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