<template>
<div class="passwordWrap">
	<!-- <index-header></index-header> -->
	<div class="retrieve">
		<div class="container">
			<div class="title">
				<h3>身份验证<span>找回密码</span></h3>
				<a href="/index/index/register">立即注册</a>
			</div>
			<div class="titleTab">
				<ul>
					<li v-for="(item, index) in titleTab" :class="{ active: item.isActive }">
						<div class="borders"></div>
						<div class="number" v-text="index+1"></div>
						<div class="text" v-text="item.name"></div>
					</li>
				</ul>
			</div>
			<div class="sanSteps">
				<div class="firstStep">
					<ul v-if="typeStep == 'A'">
						<li>
							<div class="label"><span>手机/魔码云账号：</span></div>
							<div class="input">
								<el-input
									placeholder="请输入已验证的手机号"
									v-model="phoneNum"
									:input="shuInput(phoneNum)"
									:class="{ isDanger: isDangerActive2 }"
									maxlength="11"
									@focus="getFocus" 
								></el-input>
								<!-- <input 
									type="text" 
									name="phoneNum"
									v-model="phoneNum" 
									@focus="getFocus" 
									@blur="onBlur"
									maxlength="11" 
									:class="{ isDanger: isDangerActive2 }"
									:input="shuInput(phoneNum)"
								> -->
								<i class="iconfont" v-if="this.duigou">&#xe72d;</i>
							</div>
							<div class="warning">
								<p v-if="this.warnToggle"><i class="iconfont">&#xe64f;</i>请输入已验证的手机号/魔码云账号</p>
							</div>
						</li>
						<li>
							<div class="label"><span>验证码：</span></div>
							<div class="input">
								<!-- <input 
									type="text" 
									name="sendcodeNum" 
									minlength="4"
									maxlength="10" 
									v-model="sendcodeNum"
									class="inputTwo"
									@focus="onFocusCode"
									@blur="onBlurCode"
									:class="{ isDanger: isDangerActive }"
									:input="sendcodeHandle(sendcodeNum)"
								> -->
								<el-input
									maxlength="6"
									v-model="sendcodeNum"
									:class="[{ isDanger: isDangerActive }, 'inputTwo']"
									:input="sendcodeHandle(sendcodeNum)"
								></el-input>
							</div>
							<div class="warning">
								<p>
									<!-- <button v-if="type == 'A'" @click="toTime">获取验证码</button> -->
									<!-- <button v-else @click="backTotime">重新获取验证码</button> -->
									<el-button type="primary" v-if="type == 'A'" @click="toTime">获取验证码</el-button>
									<span v-else-if="type == 'B'"><i class="iconfont">&#xe72d;</i>已发送验证码到手机，<b>{{count}}</b>后重新发送</span>
									<el-button type="primary" v-else @click="backTotime">重新获取验证码</el-button>
								</p>
							</div>
						</li>
						<li>
							<div class="label"><span>&nbsp</span></div>
							<div class="input">
								<!-- <button @click="toSecondStep">下一步</button> -->
								<el-button type="primary" @click="toSecondStep">下一步</el-button>
							</div>
							<div class="warning">&nbsp</div>
						</li>
					</ul>
					<ul v-else-if="typeStep == 'B'">
						<li>
							<div class="label"><span>新密码：</span></div>
							<div class="input">
								<el-input
									placeholder="请输入新密码"
									v-model="passwrodNum"
									maxlength="30" 
									@focus="getFocus1" 
									:input="regPasswrod(passwrodNum)"
									:class="{ inputActive1: isInputActive1, inputErrors: isErrors}"
									show-password
								></el-input>
								<!-- <input 
									type="password" 
									name="passwrodNum"
									v-model="passwrodNum" 
									@focus="getFocus1" 
									@blur="onBlur1"
									maxlength="20" 
									minlength="6" 
									:class="{ inputActive1: isInputActive1, inputErrors: isErrors}"
									v-validate=" 'required|alpha_dash' "
									:input="regPasswrod(passwrodNum)"
								> -->
								<!-- <i class="iconfont" v-if="this.duigou1">&#xe72d;</i> -->
							</div>
							<div class="warning warningAdd">
								<p v-if="this.warnToggle1" style="width: 115px"><i class="iconfont">&#xe64f;</i>不能为空</p>
								<p style="margin: 0;line-height: 24px">
									<span>1. 为保证您的安全，新密码不能与旧密码相同。</span><br />
									<span>2. 密码为6-20位字符，可带有（数字、字母、下划线、减号）</span>
								</p>
							</div>
						</li>
						<li>
							<div class="label"><span>确认新密码：</span></div>
							<div class="input">
								<el-input
									placeholder="请再次输入密码"
									v-model="newPassword"
									@focus="getFocus2" 
									:class="{ inputActive2: isInputActive2, inputErrors2: isErrors2 }"
									:input="contrastPassword(newPassword)"
									show-password
								></el-input>
								<!-- <input 
									type="password" 
									name="newPassword"
									v-model="newPassword"
									@focus="getFocus2" 
									@blur="onBlur2"
									:class="{ inputActive2: isInputActive2, inputErrors2: isErrors2 }"
									:input="contrastPassword(newPassword)"
								> -->
								<!-- <i class="iconfont" v-if="this.duigou2">&#xe72d;</i> -->
							</div>
							<div class="warning">
								<p v-if="this.warnToggle2"><i class="iconfont">&#xe64f;</i>不能为空</p>
							</div>
						</li>
						<li class="btn-wrap">
							<div class="label"><span>&nbsp</span></div>
							<!-- <div class="input"><button @click="toPreThird">下一步</button></div> -->
							<el-button type="primary" @click="toPreThird">下一步</el-button>
							<div class="warning">&nbsp</div>
						</li>
					</ul>
					<ul class="thirdStep" v-else>
						<li><i class="iconfont">&#xe637;</i>您的密码已重置成功</li>
						<li>
							<!-- <button @click="toLogin">登录</button> -->
							<el-button @click="toLogin" type="primary">登录</el-button>
						</li>
					</ul>
					<div class="footer">
						<p>北京瑞森时代信息技术有限公司</p>
					</div>
				</div>
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
			usertype: '',
			comeToggle:'',
			codeActive: false,
			isDangerActive: false,
			isDangerActive2: false,
			sendcodeNum: '',
			isErrors: false,
			isErrors2: '',
			typeStep: 'A',
			phoneNum: '',
			passwrodNum: '',
			newPassword: '',
			isInputActive: false,
			isInputActive1: false,
			isInputActive2: false,
			duigou: false,
			duigou1: false,
			duigou2: false,
			warnToggle: false,
			warnToggle1: false,
			warnToggle2: false,
			timer: null,
			count: '',
			type: 'A',
			titleTab: [{
				name: '身份验证',
				isActive: true,
			}, {
				name: '重置密码',
				isActive: false,
			}, {
				name: '完成',
				isActive: false,
			}]
		}
	},
	mounted(){
		let urlSearch = window.location.search
    this.usertype = urlSearch.split("?")[1]
		this.comeTogglehandle()
	},
	methods: {
		toLogin() {
			if(this.comeToggle == 2){
				window.location.href = '/index/index/dllogin'
			}else{
				window.location.href = '/index/index/dllogin'
			}
		},
		onFocusCode() {
			this.codeActive = true
		},
		onBlurCode() {
			this.codeActive = false
		},
		sendcodeHandle(val) {
			if(this.codeActive) {
				let reg = /^\d{4,10}$/
				if(!reg.test(val)) {
					this.isDangerActive = true
				}else {
					this.isDangerActive = false
				}
			}
		},
		toSecondStep() {
			if(this.duigou && this.sendcodeNum) {
				this.$axios({
					method: 'post',
					url: '/home/passport/findyzm',
					data: {
						mobile: this.phoneNum,
						code: this.sendcodeNum
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.typeStep = 'B'
						for(let i=0; i<this.titleTab.length; i++) {
							this.titleTab[i].isActive = false
						}
						this.titleTab[1].isActive = true
					}
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}
		},
		toPreThird() {
			if(this.duigou1 && this.duigou2) {
				this.$axios({
					method: 'post',
					url: '/home/passport/findpwd',
					data: {
						mobile: this.phoneNum,
						password: this.passwrodNum,
						password2: this.newPassword,
						istype: this.usertype 
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.typeStep = 'C'
						for(let i=0; i<this.titleTab.length; i++) {
							this.titleTab[i].isActive = false
						}
						this.titleTab[1].isActive = true
					}
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}
		},
		contrastPassword(val) {
			if(this.isInputActive2 && this.passwrodNum) {
				if(val == this.passwrodNum) {
					this.isErrors2 = false
					this.duigou2 = true
				}else {
					this.isErrors2 = true
					this.duigou2 = false
				}
			}
		},
		regPasswrod(val) {
			if(this.isInputActive1) {
				var regPasswrod = /^[a-zA-Z0-9_-]{6,20}$/
				if(!regPasswrod.test(val)) {
					this.duigou1 = false
					this.isErrors = true
					//this.warnToggle1 = true
				}else {
					this.duigou1 = true
					this.isErrors = false
					//this.warnToggle1 = false
				}
			}
		},
		shuInput(val) {
			if(this.isInputActive) {
				var regPhone = /^[1][3,4,5,7,8][0-9]{9}$/
				if(!regPhone.test(val)) {
					this.duigou = false
					this.warnToggle = true
					this.isDangerActive2 = true
				}else {
					this.duigou = true
					this.warnToggle = false
					this.isDangerActive2 = false
				}
			}
		},
		getFocus() {
			this.isInputActive = true
		},
		getFocus1() {
			this.isInputActive1 = true
		},
		getFocus2() {
			this.isInputActive2 = true
			if(!this.newPassword) {
				this.isErrors2 = true
			}
		},
		// onBlur() {
		// 	this.isInputActive = false
		// 		this.warnToggle = false
		// },
		// onBlur1() {
		// 	this.isInputActive1 = false
		// 		this.warnToggle = false
		// },
		// onBlur2() {
		// 	this.isInputActive2 = false
		// 		this.warnToggle = false
		// },
		toTime() {
			if(this.duigou) {
				if(this.comeToggle == 2){
					this.$axios({
						method: 'post',
						url: '/home/passport/forgetpass',
						data: {
							mobile: this.phoneNum
						}
					}).then((res) => {
						if(res.data.code == '200') {
							this.$axios({
							method: 'post',
							url: '/home/passport/sendSms',
							data: {
								mobile: this.phoneNum
							}
							}).then((res) => {
								if(res.data.code == '200') {
									this.type = 'B'
									let time_count = 60
									if(!this.timer) {
										this.count = time_count
										this.timer = setInterval(()=> {
											if(this.count > 0) {
												this.count --
											}else {
												this.type = 'C';
												clearInterval(this.timer);
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
						if(res.data.code == '404') {
							alert(res.data.msg)
						}
					})
				}else{
					this.$axios({
						method: 'post',
						url: '/home/passport/sendSms',
						data: {
							mobile: this.phoneNum
						}
					}).then((res) => {
						if(res.data.code == '200') {
							this.type = 'B'
							let time_count = 60
							if(!this.timer) {
								this.count = time_count
								this.timer = setInterval(()=> {
									if(this.count > 0) {
										this.count --
									}else {
										this.type = 'C';
										clearInterval(this.timer);
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
			}else {
				alert('请输入正确的手机号')
			}
		},
		backTotime() {
			if(this.duigou) {
				this.$axios({
					method: 'post',
					url: '/home/passport/sendSms',
					data: {
						mobile: this.phoneNum
					}
				}).then((res) => {
					if(res.data.code == '200') {
						this.type = 'B'
						const time_count = 60
						if(!this.timer) {
							this.count = time_count
							this.timer = setInterval(()=> {
								if(this.count > 0) {
									this.count --
								}else {
									this.type = 'C';
									clearInterval(this.timer);
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
		comeTogglehandle(){
			var urlSearch = window.location.search
			this.comeToggle = urlSearch.split("?")[1]
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.retrieve
	.title
		margin-top: 50px
		line-height: 50px
		h3
			float: left
			margin: 0
			line-height: 50px
			span
				margin-left: 15px
				color: #ccc
				font-size: 16px
		a
			float: right
		&:after
			display: block
			content: ''
			clear: both
	.titleTab
		margin-top: 30px
		overflow: hidden
		ul
			display: flex
			li
				padding: 20px 0
				flex: 1
				float: left
				text-align: center
				.borders
					height: 10px
					background: #ccc
				.number
					display: inline-block
					background: #ccc
					padding: 2px 12px
					border-radius: 50px
					transform: translateY(-70%)
					font-size: 22px
				&:nth-of-type(1)
					.borders
						border-radius: 5px 0 0 5px
				&:nth-of-type(3)
					.borders
						border-radius: 0 5px 5px 0
			.active
				.borders
					background: $bgColor
				.number
					background: $bgColor
					color: #fff
				.text
					color: $bgColor
	.sanSteps
		.firstStep
			li
				display: flex
				margin-top: 15px
				.label
					flex: 1
					text-align: right
					line-height: 44px
					span
						color: $fontColor
						font-size: 16px
						font-weight: normal
				.input
					flex: 1
					position: relative
					input
						border: 1px solid #b5b5b5
						width: 100%
						height: 44px
						text-indent: 14px
					>>> .isDanger
						input
							border-color: red
					.inputTwo
						width: 60%
					i
						position: absolute
						right: 5px
						top: 5px
						color: #3fc83d
						font-size: 24px
					.inputActive
						border-color: #297638
					.inputActive1
						border-color: #297638
					.inputActive2
						border-color: #297638
					>>> .inputErrors
						input
							border-color: red
					>>> .inputErrors2
						input
							border-color: red
					button
						width: 100%
				.warning
					flex: 1
					line-height: 38px
					padding-left: 15px
					p
						color: #ef1717
						span
							color: $fontColor
							i
								color: #3fc83d
								font-size: 20px
								vertical-align: bottom
							b
								color: red
				.warningAdd
					display: flex
					flex-wrap: nowrap
					p
						float: left
						span
							font-size: 12px
							line-height: 24px
			.btn-wrap
				button
					display: inline-block
					height: 40px
					flex: 1
					padding: 0
		.footer
			margin-top: 50px
			text-align: center
.sanSteps
	.firstStep		
		justify-content: center
		.thirdStep
			li
				margin-top: 50px
				display: block
				text-align: center
				color: #5BD259
				font-size: 26px
				line-height: 50px
				i
					color: #3CC843
					font-size: 30px
				button
					width: 50%
					font-size: 17px
</style>