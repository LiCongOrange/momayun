<template>
	<div class="modify">
		<div class="">
			<div class="title">
				<h2>修改登陆密码</h2>
				<el-button type="info" icon="el-icon-arrow-left" @click="tocenter">返回控制面板</el-button>
			</div>
			<div class="tab-box">
				<div class="tab-title">
					<ul>
						<li>
							<span>1</span>
							<font>验证身份</font>
						</li>
						<li>
							<span>2</span>
							<font>修改密码</font>
						</li>
						<li>
							<span>3</span>
							<font>完成</font>
						</li>
					</ul>
				</div>
				<div class="tab-content">

					<div class="tab-content-01" v-if="tabType == 'A'">
						<h3>为确认是你本人操作，请按步骤完成身份验证</h3>
						<ul>
							<li>
								<div class="li-left">
									<h5>通过手机验证码</h5>
									<p>如果你绑定的手机正常使用，请立即通过手机验证码验证身份。</p>
								</div>
								<div class="li-right">
									<!-- <button @click="tabHandel('01')">立即验证</button> -->
									<el-button type="primary" @click="tabHandel('01')">立即验证</el-button>
								</div>
							</li>
						</ul>
					</div>

					<div class="tab-content-02" v-else-if="tabType == 'B'">
						<div class="phone-code1" v-if="tab2Type">
							<h3>手机验证码验证，请完成以下认证</h3>
							<div class="code-list">
								<ul>
									<li>
										<span>手机号码：</span>
										<!-- <input disabled type="text" v-model="userPhone"> -->
										<el-input v-model="userPhone" :disabled="true"></el-input>
									</li>
									<li>
										<span>验证码：</span>
										<!-- <input 
											type="text" 
											placeholder="请输入验证码" 
											:input="sendcodeHandle(sendcode)" 
											v-model="sendcode"
											:class="{ danger: isdanger }"
											maxlength="6" 
										> -->
										<el-input 
											placeholder="请输入验证码" 
											v-model="sendcode" 
											show-password 
											maxlength="6"
										></el-input>
										<!-- <button v-if="codeType == '01'" @click="toTime">获取验证码</button> -->
										<el-button v-if="codeType == '01'" @click="toTime" type="warning">获取验证码</el-button>
										<p v-else-if="codeType == '02'"><i class="iconfont">&#xe72d;</i>已发送验证码到手机，<b>{{count}}</b>s后重新发送</p>
										<!-- <button v-else @click="toTime">重新获取验证码</button> -->
										<el-button type="warning" v-else @click="toTime">重新获取验证码</el-button>
									</li>
									<li>
										<!-- <a href="javascript:;" @click="tabHandel('02')">确定</a> -->
										<el-button class="define" type="primary" @click="tabHandel('02')">确定</el-button>
									</li>
								</ul>
							</div>
						</div>
						<div class="phone-code2" v-else>
							<h3>身份验证完成，请设置新的密码</h3>
							<div class="password-list">
								<ul>
									<li>
										<span>新的登陆密码：</span>
										<input type="text" v-if="eyesToggle" v-model="newpassword" :class="{ danger: isdanger1}">
										<input type="password" v-else v-model="newpassword" :class="{ danger: isdanger1}">
										<i class="iconfont" v-if="eyesToggle" @click="eyesHandle('1')">&#xe6dd;</i>
										<i class="iconfont" v-else @click="eyesHandle('0')">&#xe661;</i>
									</li>
									<li>
										<span>确认新的登陆密码：</span>
										<input type="text" v-if="eyesToggle" v-model="newpassword2" :class="{danger: isdanger2}">
										<input type="password" v-else v-model="newpassword2" :class="{danger: isdanger2}">
										<i>&nbsp</i>
									</li>
									<li>
										<p style="color: red">新密码不能与旧密码相同，密码为6-20位字符，可带有（数字、字母、下划线、减号）</p>
									</li>
									<li>
										<a href="javascript:;" @click="tabHandel('03')">确定</a>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div class="tab-content-03" v-else>
						<div class="succses-text">
							<div class="text-icon">
								<i class="iconfont">&#xe637;</i>
							</div>
							<div class="text-wenzi">
								<p>修改成功，请牢记新密码</p>
								<a href="/index/index/dllogin">立即登陆</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			eyesToggle: false,
			isdanger1: false,
			isdanger2: false,
			newpassword: '',
			newpassword2: '',
			isdanger: false,
			sendcode: '',
			timer: '',
			count: 60,
			codeType: '01',
			tabType: 'A',
			tab2Type: true,
			isType: ''
		}
	},
	mounted() {
		if(this.userType == '8') {
			this.isType = 8
		}else {
			this.isType = 2
		}
		// this.getuserInfo()
	},
	computed: {
		...mapState({
			userType: state => state.userType,
			userPhone: state => state.userPhone
		})
	},
	watch: {
		sendcode(val) {

		},
		newpassword(val) {
			let reg = /^[a-zA-Z0-9_-]{6,20}$/
			if(!reg.test(val)) {
				this.isdanger1 = true
			}else {
				this.isdanger1 = false
			}
			if(val != this.newpassword2) {
				this.isdanger2 = true
			}
		},
		newpassword2(val) {
			if(val == this.newpassword) {
				this.isdanger2 = false
			}else {
				this.isdanger2 = true
			}
		}
	},
	methods: {
		tocenter() {
			window.location.href = '/index/index/center?site=' + 'cen'
		},
		eyesHandle(type) {
			if(type == '0') {
				this.eyesToggle = true
			}else {
				this.eyesToggle = false
			}
		},
		sendcodeHandle(val) {
			let reg = /^\d{6}$/
			if(val) {
				if(!reg.test(val)) {
					this.isdanger = true
				}else {
					this.isdanger = false
				}
			}
		},
		toTime() {
			this.count = 60
					// this.codeType = '02'
					// this.timer = setInterval(()=> {
					// 	if(this.count > 0) {
					// 		this.count --
					// 	}else {
					// 		this.codeType = '03';
					// 		clearInterval(this.timer);
					// 		// this.timer = null
					// 	}
					// }, 100)


			this.$axios({
				method: 'post',
				url: '/home/passport/sendSms',
				data: {
					mobile: this.userPhone
				}
			}).then((res)=> {
				if(res.data.code == '200') {
					this.codeType = '02'
					this.timer = setInterval(()=> {
						if(this.count > 0) {
							this.count --
						}else {
							this.codeType = '03';
							clearInterval(this.timer);
							this.timer = null
						}
					}, 1000)
				}
			})
		},
		tabHandel(type) {
			if(type == '01') {
				this.tabType = 'B'
			}else if(type == '02') {
				// this.tab2Type = false
				if(this.sendcode) {
					this.$axios({
						method: 'post',
						url: '/home/passport/findyzm',
						data: {
							mobile: this.userPhone,
							code: this.sendcode
						}
					}).then((res)=> {
						if(res.data.code == '200') {
							this.tab2Type = false
						}else {
							alert(res.data.msg)
						}
					})
				}
			}else if(type == '03') {
				// this.tabType = 'C'
				if(this.isdanger2 == false && this.newpassword2) {
					this.$axios({
						method: 'post',
						url: '/home/passport/findpwd',
						data: {
							mobile: this.userPhone,
							password: this.newpassword,
							password2: this.newpassword2,
							istype: this.isType 
						}
					}).then((res) => {
						if(res.data.code == '200') {
							this.$message({
								type: 'success',
								message: '修改成功！'
							})
							this.tabType = 'C'
						}else {
							this.$message({
								type: 'error',
								message: '修改失败！'
							})
						}
					})
				}
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.modify
	.title
		padding: 0 20px
		background: #Fff
		overflow: hidden
		h2
			float: left
			margin: 0
			font-size: 15px
			line-height: 50px
		button
			float: right
			padding: 8px 15px
			margin-top: 8px
	.tab-box
		margin: 20px
		background: #fff
		padding: 40px
		box-shadow: $boxshadow
	.tab-title
		&:before
			content: ''
			display: block
			height: 2px
			width: 100%
			background: #ccc
			position: relative
			top: 33px
		ul
			position: relative
			display: flex
			justify-content: space-between
			z-index: 100
			li
				min-width: 60px
				text-align: center
				color: #676767
				font-size: 14px
				line-height: 40px
				span
					display: flex
					justify-content: center
					align-items: center
					height: 54px
					background: linear-gradient(top, #f08456, #cb4d51)
					background: -webkit-linear-gradient(top, #f08456, #cb4d51)
					border-radius: 50%
					color: #fff
					font-size: 24px
				&:nth-of-type(2)
					span
						background: linear-gradient(top, #5db6ba, #6fd8b7)
						background: -webkit-linear-gradient(top, #5db6ba, #6fd8b7)
				&:nth-of-type(3)
					span
						background: linear-gradient(top, #4ebee6, #4592ca)
						background: -webkit-linear-gradient(top, #4ebee6, #4592ca)
	.tab-content
		.tab-content-01
			h3
				margin: 30px 0
				font-size: 16px
				color: #343434
				font-weight: bold
			ul
				li
					border: 1px solid #ccc
					padding: 20px
					&:after
						content: ''
						display: block
						clear: both
					.li-left
						float: left
						h5
							font-size: 20px
							color: #333
						p
							font-size: 12px
							color: #999
					.li-right
						float: right
						margin: 20px 10px 0 0
		.tab-content-02
			overflow: hidden
			.phone-code1
				display: flex
				justify-content: center
				flex-direction: column
				align-items: center
				h3
					border-bottom: 1px solid #ccc
					padding: 0 50px
					line-height: 32px
					color: #747474
					font-size: 16px
				ul
					padding: 30px 0 0
					li
						display: flex
						justify-content: left
						margin-bottom: 15px
						.el-input--suffix
							max-width: 200px
						p
							margin-left: 10px
							line-height: 40px
							i
								font-size: 18px
								color: $bgColor
						span
							min-width: 70px
							line-height: 30px
							text-align: right
						input
							line-height: 26px
							text-indent: 5px
						.danger
							border-color: red
						button
							margin: 0 10px
						button.define
							margin: 0 auto
							padding: 12px 30px
						&:nth-of-type(2)
							input
								max-width: 84px
								font-size: 12px
			.phone-code2
				display: flex
				justify-content: center
				flex-direction: column
				align-items: center
				h3
					border-bottom: 1px solid #ccc
					padding: 0 50px
					line-height: 32px
					color: #747474
					font-size: 16px
				ul
					padding-top: 30px
					li
						display: flex
						// justify-content: center
						margin-bottom: 15px
						text-align: right
						&:first-child
							margin-left: 26px
						&:last-child
							justify-content: center
						span
							line-height: 30px
						input
							min-width: 250px
							border: 1px solid #ccc
							line-height: 26px
							text-indent: 12px
							&:focus
								border-color: $bgColor
						.danger
							border-color: red !important
						a
							padding: 7px 35px
							border-radius: 5px
							background: $bgColor
							color: #fff
							text-decoration: none
							transition: all .3s
							&:hover
								background: $btnhoverbg
						i
							margin-left: 20px
							font-size: 25px
							cursor: pointer
		.tab-content-03
			.succses-text
				border: 1px solid #ccc
				padding: 20px
				.text-icon
					display: inline-block
					vertical-align: top
					i
						color: #44b99c
						font-size: 34px
				.text-wenzi
					margin-left: 15px
					display: inline-block
					p
						font-size: 20px
						color: #333
					a
						font-size: 16px
						color: #f39b77
</style>