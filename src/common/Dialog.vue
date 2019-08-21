<template>
	<div class="dialog">
		<div class="mask"></div>
		<div class="dialogWrap">
			<div class="dialog-title">
				<a href="javascript:;" class="iconfont" @click="cancel">&#xe625;</a>
			</div>
			<div class="dialog-content">
				<p v-if="modal.type == '1'">
					<i class="iconfont">&#xe64f;</i>
					<span>{{ modal.content }}</span>
				</p>
				<p class="cancel" v-else>
					<i class="iconfont">&#xe72d;</i>
					<span>{{ modal.content }}</span>
				</p>
			</div>
			<div class="dialog-btn">
				<div v-if="modal.type == '1'">
					<button @click="danger">删除</button>
					<button @click="cancel">取消</button>
				</div>
				<div v-else-if="modal.type == '2'">
					<button @click="confirm('0')">确认</button>
					<button @click="cancel">取消</button>
				</div>
				<div v-else-if="modal.type == '3'">
					<button @click="confirm('1')">返回站点页</button>
					<button @click="confirm('2')">去往订单信息页</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		dialogOption: Object
	},
	data() {
		return {
			dialogToggle: false
		}
	},
	methods: {
		danger() {
			this.$emit('confirmHandle', 0)
		},
		confirm(type) {
			if(type == '0') {
				this.$emit('confirmHandle', 0)
			}else if(type == '1') {
				// this.$emit('confirmHandle', 1)
				window.location.href = '/index/index/site'
			}else if(type == '2') {
				window.location.href = '/index/index/center?site=' + 'user'
				// window.location.href = '/index/index/account?' + 'center'
			}
		},
		cancel() {
			this.$emit('confirmHandle', 1)
		}
	},
	computed: {
		modal: function() {
			let options = this.dialogOption
			return {
				content: options.content,
				type: options.type
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.dialog
	position: inherit
	z-index: 1000000000000
	.mask
		position: fixed
		left: 0
		right: 0
		top: 0
		bottom: 0
		background: rgba(0, 0, 0, 0.3)
		z-index: 10
	.dialogWrap
		position: fixed
		background: #fff
		left: 50%
		top: 50%
		transform: translate(-50%, -50%)
		min-width: 324px
		min-height: 172px
		z-index: 100
		.dialog-title
			padding-right: 10px
			line-height: 34px
			text-align: right
			color: $fontColor
		.dialog-content
			text-align: center
			p
				padding: 0 20px
				line-height: 44px
				font-size: 17px
				color: #000
				i
					display: block
					color: $warnColor
					font-size: 28px
				span
					display: block
			.cancel
				i
					color: $bgColor
					font-size: 38px
		.dialog-btn
			position: absolute
			bottom: 10px
			width: 100%
			text-align: center
			button
				border: 1px solid $bgColor
				background: none
				color: $bgColor
				border-radius: $editradius
				padding: 5px 15px
				margin: 0 5px
				font-size: 13px
				&:hover
					background: $bgColor
					color: #fff
				&:active
					background: #04915a
</style>