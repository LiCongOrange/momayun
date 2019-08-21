<template>
	<div class="host-box">
		<div class="inner">
			<font class="iconfont" @click="backHandle('0')">&#xe6e9;</font>
			<h2>请选择境内或境外主机</h2>
			<p>
				<span 
					v-for="(item, index) in hostlist" 
					:class="{ active: item.isActive }"
					@click="hostHandle(index)"
				>
					<i>{{ item.name }}</i>
					<strong v-html="item.text"></strong>
				</span>
			</p>
			<ul>
				<!-- <li><i class="iconfont">&#xe64b;</i>注意：</li>
				<li>1, 境内线路：必须备案，未取得备案号前网站不可上线（备案周期：20-28天工作日）</li>
				<li>2, 境外线路：无需备案，但网站访问速度相较境内服务器稍慢</li> -->
				<li> 如需购买.cn/.com.cn/.net.cn/.org.cn等中国后缀的域名，必须要选择境内线路并进行备案；</li>
				<li> 如百度推广等营销平台会要求企业网站取得备案号码才能开户。</li>
			</ul>
			<div class="btnwrap">
				<!-- <button @click="backHandle('1')">确认</button> -->
				<el-button @click="backHandle('1')" type="primary">确认</el-button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['type'],
	data() {
		return {
			hosttype: 1,
			hostlist: [{
				name: '境内主机',
				text: '<p>必须备案，未取得备案号前网站不可上线</p><p>（备案周期：20-28个工作日）</p>',
				isActive: true
			}, {
				name: '境外主机',
				text: '<p>无需备案，但网站访问速度相较境内服务器稍慢。</p>',
				isActive: false
			}]
		}
	},
	mounted() {
		this.$nextTick(()=> {
			if(this.type == '2') {
				for(let i=0; i<this.hostlist.length; i++ ) {
					this.hostlist[i].isActive = false
				}
				this.hostlist[1].isActive = true
				this.hosttype = 2
			}
		})
	},
	methods: {
		backHandle(type) {
			if(type == '1') {
				this.$emit('backhandle', this.hosttype)
			}else {
				this.$emit('backhandle', 'false')
			}
		},
		hostHandle(index) {
			for(let i=0; i<this.hostlist.length; i++) {
				this.hostlist[i].isActive = false
			}
			this.hostlist[index].isActive = true
			if(index == '0') {
				this.hosttype = 1
			}else {
				this.hosttype = 2
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.host-box
	position: fixed
	left: 0
	top: 0
	width: 100%
	height: 100%
	background: rgba(0, 0, 0, .85)
	z-index: 1500000
	.inner
		position: absolute
		left: 50%
		top: 50%
		transform: translate(-50%, -50%)
		background: #fff
		max-width: 400px
		border-radius: 5px
		padding: 20px
		font
			position: absolute
			right: 10px
			top: 5px
			font-size: 20px
			cursor: pointer
		h2
			border-bottom: 1px solid #ccc
			margin: 0
			line-height: 50px
			text-align: center
			font-size: 18px
		p
			margin-top: 20px
			display: flex
			flex-direction: column
			span
				padding: 10px 20px
				border: 1px solid #c3bebe
				border-radius: 5px
				margin: 0 5px 15px
				cursor: pointer
				display: flex
				flex-direction: column
				flex: 1
				min-height: 96px
				i
					font-style: normal
					font-size: 14px
				strong
					margin-top: 10px
					font-style: normal
					font-weight: normal
					font-size: 12px
					line-height: 20px
					text-align: left
			.active
				border-color: $bgColor
				background: $bgColor
				color: #fff
		ul
			li
				padding-left: 8px
				margin-bottom: 5px
				font-size: 13px
				line-height: 24px
				&:before
					content: ''
					display: inline-block
					background: $bgColor
					width: 8px
					height: 8px
					border-radius: 50%
					margin-right: 5px
				span
					color: red
		.btnwrap
			text-align: center
			button
				width: 100%
</style>