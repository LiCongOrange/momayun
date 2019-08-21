<template>
	<div class="right-setup">
		<div class="set-box" v-if="modifyToggle">
			<div class="title">
				<h3>设置</h3>
				<el-button type="info" icon="el-icon-arrow-left" @click="tocenter">返回控制面板</el-button>
			</div>
			<ul>
				<!-- <li>
					<div class="li-left">
						<h5>手机绑定</h5>
						<p>您已绑定了手机<span>{{ userPhone }}</span></p>
					</div>
					<div class="li-right">
						<a href="javascript:;">已设置</a>
						<a href="javascript:;" @click="modifyHandel('01')">修改</a>
					</div>
				</li> -->
				<li>
					<div class="li-left">
						<h5>登陆密码</h5>
						<p>安全性高的密码可以使账号更安全</p>
					</div>
					<div class="li-right">
						<a href="javascript:;">已设置</a>
						<a href="javascript:;" @click="modifyHandel('02')">修改</a>
					</div>
				</li>
			</ul>
		</div>
		<div v-else>
			<modify></modify>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import modify from './Modify'
export default {
	components: {
		modify
	},
	data() {
		return {
			modifyToggle: true
		}
	},
	computed: {
		...mapState({
			userPhone: state => state.userPhone
		})
	},
	methods: {
		tocenter() {
			window.location.href = '/index/index/center?site=' + 'cen'
		},
		modifyHandel(type) {
			if(type == '01') {
				this.modifyToggle = false
			}else {
				this.modifyToggle = false
			}
		},
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.right-setup
	.title
		background: #fff
		padding: 0 20px
		line-height: 50px
		overflow: hidden
		h3
			float: left
			margin: 0
			font-size: 15px
			line-height: 50px
		button
			margin-top: 8px
			float: right
			padding: 8px 15px
	ul
		margin: 20px
		background: #fff
		padding: 20px
		min-height: 455px
		margin-bottom: 0
		box-shadow: $boxshadow
	li
		border-bottom: 1px solid #e8e8e8
		margin-bottom: 15px
		line-height: 46px
		&:after
			content: ''
			display: block
			clear: both
		.li-left
			float: left
			// line-height: 80px
			h5
				margin: 0
				display: inline-block
				color: #333
				font-weight: 700
				font-size: 16px
			p
				margin: 0
				margin-left: 40px
				display: inline-block
				color: #666465
				font-size: 16px
				span
					margin: 0 5px
					color: $bgColor
		.li-right
			float: right
			a
				padding: 0 15px
				color: $bgColor
				font-size: 16px
				&:nth-of-type(2)
					border-left: 1px solid #ccc
					color: #f29d78	
</style>