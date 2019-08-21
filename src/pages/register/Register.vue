<template>
<div class="registerWrap">
	<!-- <index-header></index-header> -->
	<div class="register">
		<div class="container">
			<div class="content">
				<div class="content-wrap">
					<div class="title">
						<h3><span>欢迎注册魔码云</span></h3>
						<p>
							<span>已有账号，</span>
							<a href="/index/index/dllogin">立即登录</a>
							<!-- <router-link to="/login">立即登录</router-link> -->
						</p>
					</div>
					<ul>
						<li>
							<el-input
								placeholder="请输入手机号"
								v-model="regPhone"
								maxlength="11"
								:input="regPhoneHandle(regPhone)"
								:class="{'isDanger': warn }"
								clearable
							></el-input>
						</li>
						<li>
							<el-input
								type="password"
								placeholder="请设置你的登录密码"
								v-model="passwrod"
								max-length="30"
								:input="inputHandle2(passwrod)"
								show-password
							></el-input>
						</li>
						<li>
							<el-input
								type="password"
								v-model="passwrod2"
								placeholder="请再次输入你的登录密码"
								:input="checkPasswrod(passwrod2)"
								:class="[ active ]"
								show-password
							></el-input>
						</li>

<!-- 						<li>
							<input 
								type="text" 
								name="registerUsername" 
								v-model="registerUsername"
								placeholder="请设置登录名"
								maxlength="20"
								minlength="6" 
								:class="{inputBorder1: isInputBorder1, inputBorder2: isInputBorder2}"
								:input="inputHandle1(registerUsername)"
							>
							<i v-if="this.succsesIcon" class="iconfont">&#xe72d;</i>
						</li> -->
						<!-- <li>
							<input 
								type="text" 
								name="regPhone" 
								v-model="regPhone"
								maxlength="11" 
								placeholder="请输入手机号"
								:class="{'isDanger': warn }"
								:input="regPhoneHandle(regPhone)"
							>
							<i v-if="this.succsesIcon3" class="iconfont">&#xe72d;</i>
						</li> -->
						<!-- <li>
							<input 
								type="password" 
								:name="passwrod" 
								v-model="passwrod"
								maxlength="20" 
								minlength="6" 
								placeholder="请设置你的登录密码"
								:class="{inputBorder1: isInputBorder3, inputBorder2: isInputBorder4}"
								:input="inputHandle2(passwrod)"
							>
							<i v-if="this.succsesIcon1" class="iconfont">&#xe72d;</i>
						</li> -->
						<!-- <li>
							<input 
								type="password" 
								name="passwrod2" 
								v-model="passwrod2"
								maxlength="20" 
								minlength="6" 
								placeholder="请再次输入你的登录密码"
								:input="checkPasswrod(passwrod2)"
								:class="[ active ]"
							>
							<i v-if="this.succsesIcon2" class="iconfont">&#xe72d;</i>
						</li> -->
						<li class="sendSms">
							<!-- <input 
								type="text" 
								name="sendcodeNum"
								v-model="sendcodeNum"
								maxlength="6"
								minlength="4" 
								placeholder="请输入验证码"
								:class="{ isDanger: isActive }"
								:input="sendcodeNumHandle(sendcodeNum)"
							> -->
							<el-input
								v-model="sendcodeNum"
								maxlength="6"
								placeholder="请输入验证码"
								:class="{ isDanger: isActive }"
								:input="sendcodeNumHandle(sendcodeNum)"
							></el-input>
							<!-- <button v-if="codeType11 == 'A'" @click="sendCode">获取验证码</button> -->
							<el-button type="primary" v-if="codeType11 == 'A'" @click="sendCode">获取验证码</el-button>
							<p v-if="codeType11 == 'B'">
								<i class="iconfont">&#xe72d;</i>
								已发送验证码到手机，<b>{{count}}</b>s后重新发送
							</p>
							<el-botton type="primary" v-if="codeType11 == 'C'" @click="retrunSendCode"></el-botton>
							<!-- <button v-if="codeType11 == 'C'" @click="retrunSendCode">重新获取验证码</button> -->
						</li>
						<li class="btn-wrap">
							<!-- <h6 v-if="registerToggle">立即注册</h6> -->
							<!-- <button @click="toRegister">立即注册</button> -->
							<el-button type="info" disabled v-if="registerToggle">立即注册</el-button>
							<el-button type="primary" @click="toRegister" v-else>立即注册</el-button>
						</li>
						<li>
							<!-- <label @click.self="fnToggle"><input type="checkbox">我已阅读条款并<span>立即注册</span></label> -->
							<el-checkbox v-model="checkToggle">我已阅读条款并<span>立即注册</span></el-checkbox>
						</li>
						<li v-if="false">
							<input type="text" name="" v-model="ordinaryType">
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="footer" v-if="footToggle">
			<div class="container">
				<p>
					<a href="javascript:;" v-for="item in footList" v-text="item"></a>
				</p>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import IndexHeader from '@/common/Header'
export default {
	components: {
		IndexHeader
	},
	data() {
		return {
			footToggle: false,
			registerToggle: true,
			warn: false,
			zongOnoff: false,
			ordinaryType: '1',
			isActive: false,
			sendcodeNum: '',
			codeType11: 'A',
			registerUsername: '',
			isInputBorder1: false,
			isInputBorder2: false,
			isInputBorder3: false,
			isInputBorder4: false,
			succsesIcon: false,
			succsesIcon1: false,
			succsesIcon2: false,
			succsesIcon3: false,
			passwrod: '',
			passwrod2: '',
			regPhone: '',
			active: '',
			count: '',
			checkToggle: false,
			footList: ['关于我们', '法律声明及隐私权政策', '廉政举报', '联系我们', '加入魔码云']
		}
	},
	watch: {
		// succsesIcon(val) {
		// 	if(val) {
		// 		if(this.succsesIcon1 && this.succsesIcon2 && this.succsesIcon3 && this.sendcodeNum && this.checkToggle) {
		// 			this.registerToggle = false
		// 		}
		// 	}else {
		// 		this.registerToggle = true
		// 	}
		// },
		succsesIcon1(val) {
			if(val) {
				if( this.succsesIcon2 && this.succsesIcon3 && this.sendcodeNum && this.checkToggle) {
					this.registerToggle = false
				}
			}else {
				this.registerToggle = true
			}
		},
		succsesIcon2(val) {
			if(val) {
				if( this.succsesIcon1 && this.succsesIcon3 && this.sendcodeNum && this.checkToggle) {
					this.registerToggle = false
				}
			}else {
				this.registerToggle = true
			}
		},
		succsesIcon3(val) {
			if(val) {
				if( this.succsesIcon1 && this.succsesIcon2 && this.sendcodeNum && this.checkToggle) {
					this.registerToggle = false
				}
			}else {
				this.registerToggle = true
			}
		},
		sendcodeNum(val) {
			let reg = /^\d{6}$/
			if(val) {
				if(reg.test(val)) {
					if( this.succsesIcon1 && this.succsesIcon2 && this.succsesIcon3 && this.checkToggle) {
						this.registerToggle = false
					}
				}
			}else {
				this.registerToggle = true
			}
		},
		checkToggle(val) {
			if(val) {
				if(this.succsesIcon1 && this.succsesIcon2 && this.succsesIcon3 && this.sendcodeNum) {
					this.registerToggle = false
				}
			}else {
				this.registerToggle = true
			}
		}
	},
	methods: {
		toRegister() {
				this.$axios({
					method: 'post',
					url: '/home/passport/register',
					data: {
						mobile: this.regPhone,
						password: this.passwrod,
						password2: this.passwrod2,
						type: this.ordinaryType,
						code: this.sendcodeNum
					}
				}).then((res) => {
					if(res.data.code == '200') {
						alert('注册成功！')
						window.location.href = '/index/index/dllogin?islogin=' + 'a'
						// this.$store.state.toLoginType = 'A'
					}
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
		},
		sendcodeNumHandle(val) {
			// let reg = /^\d{4,10}$/
			let reg = /^\d{6}$/
			if(this.sendcodeNum) {
				if(!reg.test(val)) {
					this.isActive = true
				}else {
					this.isActive = false
				}
			}
		},
		sendCode() {
			if(this.regPhone) {
				this.$axios({
					method: 'post', 
					url: '/home/passport/sendSms',
					data: {
						mobile: this.regPhone
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.codeType11 = 'B'
						const time_count = 60
						if(!this.timer) {
							this.count = time_count
							this.timer = setInterval(()=> {
								if(this.count > 0) {
									this.count --
								}else {
									this.codeType11 = 'C'
									clearInterval(this.timer)
									this.timer = null
								}
							}, 1000)
						}
					}
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}else {
				alert('请输入您的手机号，再进行验证')
			}
		},
		retrunSendCode() {
			if(this.regPhone) {
				this.$axios({
					method: 'post', 
					url: '/home/passport/sendSms',
					data: {
						mobile: this.regPhone
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.codeType11 = 'B'
						const time_count = 60
						if(!this.timer) {
							this.count = time_count
							this.timer = setInterval(()=> {
								if(this.count > 0) {
									this.count --
								}else {
									this.codeType11 = 'C'
									clearInterval(this.timer)
									this.timer = null
								}
							}, 1000)
						}
					}
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}
		},
		regPhoneHandle(val) {
			var reg = /^((13|14|15|17|18|19|16)[0-9]{1}\d{8})$/
			let reg2 = /[^0-9-]+/

			if(reg2.test(val)) {
				this.regPhone = ''
			}else {
				if(this.regPhone) {
					if(!reg.test(val)) {
						this.warn = true
						this.succsesIcon3 = false
					}else {
						this.warn = false
						this.succsesIcon3 = true
					}
				}
			}
		},
		inputHandle1(val) {
			let reg = /^[a-zA-Z0-9_-]{4,16}$/
			// let reg = /^(\-)*(\d+)\.(\d\d).*$/
			if(this.registerUsername) {
				if(!reg.test(val)) {
					this.isInputBorder1 = true
					this.succsesIcon = false
				}else {
					this.isInputBorder1 = false
					this.succsesIcon = true
				}
			}
		},
		fnToggle() {
			this.checkToggle = !this.checkToggle
			// if(this.succsesIcon && this.succsesIcon1 && this.succsesIcon2 && this.succsesIcon3 && this.sendcodeNum) {
			// 	this.checkToggle = false
			// }else {
			// 	this.checkToggle = true
			// }
		},
		inputHandle2(val) {
			let reg =  /^[a-zA-Z0-9_-]{6,20}$/
			if(this.passwrod) {
				if(!reg.test(val)) {
					this.isInputBorder3 = true
					this.succsesIcon1 = false
				}else {
					this.isInputBorder3 = false
					this.succsesIcon1 = true
				}
			}
		},
		checkPasswrod(val) {
			if(this.passwrod) {
				if(val == this.passwrod) {
					this.active = ''
						this.succsesIcon2 = true
				}else{
					this.active = 'isDanger'
						this.succsesIcon2 = false
				}
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.register
	position: absolute
	left: 50%
	top: 50%
	transform: translate(-50%, -50%)
	.container
		padding: 40px
		.content
			padding: 20px 0
			background: #fff	
			.content-wrap
				max-width: 500px
				margin: 0 auto
				.title
					text-align: center
					h3
						span
							border-bottom: 2px solid $bgColor
							line-height: 30px
					p
						text-align: right
				ul
					margin-top: 30px
					li
						margin-top: 20px
						position: relative
						i
							position: absolute
							right: 5px
							top: 10px
							font-size: 20px
							color: #36CA40
						h6
							display: block
							background: #ccc
							text-align: center
							color: #fff
							border-radius: 15px
							line-height: 40px
							font-size: 18px
						input[type=text]
							width: 100%
							height: 46px
							border: 1px solid #b5b5b5
							text-indent: 12px
							color: #b5b5b5
							font-size: 14px
						input[type=password]
							width: 100%
							height: 46px
							border: 1px solid #b5b5b5
							text-indent: 12px
							color: #b5b5b5
							font-size: 14px
						.isDanger
							border-color: red !important
						.inputBorder1
							border-color: red !important
						.inputBorder2
							border-color: $bgColor !important
						label
							position: relative
							font-size: 12px
							color: $fontColor
							font-weight: normal
							line-height: 22px
							&:after
								content: ''
								display: block
								position: absolute
								left: 0
								top: 0
								right: 0
								bottom: 0
								background: rgba(255, 255, 255, 0.15)
							input
								vertical-align: text-bottom
								margin-right: 5px
							span
								color: $bgColor
						>>>.isDanger
							input
								border-color: red
					.btn-wrap
						button
							width: 100%
					.sendSms
						.el-input
							width: 30%
						&:after
							display: block
							clear: both
							content: ''
						input
							width: 30% !important
							float: left
						button
							float: right
						p
							float: right
							line-height: 38px
							i
								position: static
								vertical-align: middle
	.footer
		background: #5e5f61		
		position: fixed
		left: 0
		right: 0
		bottom: 0
		min-height: 150px		
		p
			border-top: 2px solid #c4c5c7
			a
				margin-right: 20px
				line-height: 50px	
				color: #c4c5c7	
</style>