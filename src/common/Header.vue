<template>
	<div class="header">
		<div class="container">
			<div class="center">
				<!-- <p>Hello,欢迎来到魔码云！</p> -->
			</div>


			<div class="logo" v-if="userType == '5'">
				
			</div>
			<div class="logo" @click="userHandel('2')" v-else-if="userType == '6'">
				<img src="@/assets/images/header/logo22.jpg">
			</div>
			<div class="logo" @click="userHandel('0')" v-else>
				<img src="@/assets/images/header/logo22.jpg">
			</div>

			<div class="nav-right" v-if="this.onOff">
				<a href="/index/index/dllogin">登录</a>
			</div>
			<div class="nav-right" v-else>
				<ul>
					<!-- <li>
						<button class="btn btn-default">代理审核</button>
					</li> -->
					<li v-if="userType != '6' && userType != '5'">
						<label title="个人中心" @click="userHandel('1')">
							个人中心<i class="iconfont geren">&#xe623;</i>
						</label>
					</li>
					<li v-if="userType == '5'">
						<button @click="userHandel('1')">修改密码</button>
					</li>
					<!-- <li>
						<button>帮助中心</button>
					</li> -->
					<li @click="logout">
						<button>退出</button>
						<i class="iconfont out">&#xe67b;</i>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import navBus from '@/assets/js/navBus'
export default {
	data() {
		return {
			onOff: false
		}
	},
	computed: {
		...mapState({
			userType: state => state.userType
		})
	},
	methods: {
		getuserInfo() {
			this.$axios({
				method: 'post',
				url: '/api/Usersites/userint'
				// method: 'get',
				// url: '/api/userint.json'
			}).then((res)=> {
				if(res.data.code == '200') {
					this.$store.commit('nickNameHandel', res.data.data.nick_name)
					this.$store.commit('userPhoneHandel', res.data.data.mobile)
					this.$store.commit('userTypeHandel', res.data.data.type)
					this.$store.commit('useridHandel', res.data.data.member_id)
					this.$store.commit('usernicknameHandel', res.data.data.nick_name)
					this.$store.commit('userbalanceHandel', res.data.data.money)
					if(res.data.data.type == 2) {
						this.$store.commit('userNameHandel', '创业用户')
					}else if(res.data.data.type == 3) {
						this.$store.commit('userNameHandel', '金牌代理商')
					}else if(res.data.data.type == 4) {
						this.$store.commit('userNameHandel', '合作伙伴')
					}else if(res.data.data.type == 5) {
						this.$store.commit('userNameHandel', '代理最终用户')
					}else if(res.data.data.type == 6) {
						this.$store.commit('userNameHandel', '代理员工')
					}else if(res.data.data.type == 7) {
						this.$store.commit('userNameHandel', '钻石代理商')
					}else if(res.data.data.type == 8) {
						this.$store.commit('userNameHandel', '建站员工')
					}else if(res.data.data.type == 9) {
						this.$store.commit('userNameHandel', '推广员工')
					}
				}else {
					this.$message({
						type: 'error',
						message: '个人信息获取失败！'
					})
				}
			})
		},
		userHandel(type) {
			if(type == '0') {
				window.location.href = '/index/index/center?site=' + 'cen'
				// this.$store.commit('userToggleHandel', true)
			}else if(type == '1') {
				window.location.href = '/index/index/center?site=' + 'user'
				// this.$store.commit('userToggleHandel', false)
			}else {
				window.location.href = '/index/index/site'
			}
		},
		logout() {
			this.$axios({
				method: 'get',
				url: '/home/passport/logout'
			}).then((res)=> {
				if(res.data.code == '200') {
					this.$message({
						type: 'success',
						message: '退出成功'
					})
					this.onOff = true
					if(res.data.data.type == '5') {
						window.location.href = '/index/index/userlogin'
					}else if(res.data.data.type == '8' || res.data.data.type == '9') {
						window.location.href = '/index/index/stafflogin'
					}else {
						window.location.href = '/index/index/dllogin'
					}
				}else {
					this.$message({
						type:'error',
						message: '退出失败！'
					})
					this.onOff = false
				}
			})
		}
	},
	mounted() {
		this.getuserInfo()
		this.$axios({
			method: 'get',
			url: '/home/passport/islogin'
		}).then((res)=> {
			if(res.data.code == '200') {
				this.onOff = false
			}else {
				this.$message({
					type: 'error',
					message: res.data.msg
				})
				this.onOff = true
				window.location.href = '/index/index/dllogin'
			}
		})
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.header
	padding: 5px 0
	height: 50px
	box-shadow: 0 5px 5px #d0d0d0
	background: #fff
	border-bottom: 2px solid #f0f0f0
	&:after
		content: ''
		clear: both
		display: block
	.logo
		position: relative
		z-index: 10
		float: left
		height: 40px
		overflow: hidden
		margin-left: -100%
		font-size: 22px
		img
			width: auto
			max-height: 40px
			cursor: pointer
	.center
		width: 100%
		float: left
		text-align: center
		line-height: 40px
		height: 40px
		p
			margin-bottom: 0
	.nav-right
		position: relative
		z-index: 10
		float: right
		margin-left: -300px
		line-height: 40px
		ul
			margin: 0
		li
			display: inline-block
			margin: 0 8px
			.iconfont
				cursor: pointer
			.out
				vertical-align: middle
				font-size: 14px
				color: #82848a
			.geren
				margin-left: 5px
			label
				font-weight: normal
				cursor: pointer
		.btn
			background: $bgColor
			color: #fff
			border-radius: 15px
			padding: 3px 12px
		button
			border: none
			background: none
		a
			color: $bgColor
</style>