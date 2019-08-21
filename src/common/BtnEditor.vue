<template>
	<div class="btnEditor">
		<div class="btn-overlay" v-if="btnToggle">
			<span @click="toEditor">编辑</span>
		</div>
		<div class="editorWrap" v-else>
			<div class="editor-main">
				<div class="editor-main-left">
					<h3 class="iconfont">链接网址&#xe6b0;</h3>
					<input type="text" v-model="textContent.link">
					<p>跳转至此链接</p>
				</div>
				<div class="editor-main-right">
					<h3>文本内容</h3>
					<input type="text" v-model="textContent.text">
					<label>
						<input type="checkbox" @click="checkedToggle" :checked="textContent.onOff">
						在新标签页中打开
					</label>
				</div>
			</div>
			<div class="editor-btn">
				<button @click="callback('ensure')" class="btn btn-default">保存</button>
				<button @click="callback('delete')" class="btn btn-default">移除</button>
				<button @click="callback('cancel')" class="btn btn-default">取消</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['content'],
	data() {
		return {
			checked: true,
			btnToggle: true,
			textContent: this.content
		}
	},
	methods: {
		checkedToggle() {
			this.textContent.onOff = !this.textContent.onOff
		},
		toEditor() {
			this.btnToggle = false
		},
		callback(val) {
			this.btnToggle = true
			let httpobj = this.textContent.link.split('//')[0]
			// console.log(httpobj)
			if(httpobj != 'http:' && httpobj != 'https:') {
				this.textContent.link = 'http://' + this.textContent.link
			}
			if(val == 'ensure') {
				this.$emit('getContent', this.textContent)
			}else if(val == 'delete') {
				this.$emit('getContent', 'delete')
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.btnEditor
	position: absolute
	left: 0
	top: 0
	right: 0
	bottom: 0
	z-index: 1000
	&:hover
		.btn-overlay
			opacity: 1
	.btn-overlay
		position: absolute
		width: 100%
		height: 100%
		left: 0
		top: 0
		opacity: 0
		transition: all .3s
		border: $maskeditborder
		border-radius: $maskradius
		span
			padding: $addbtnpadding
			position: absolute
			left: 0
			top: 100%
			margin-top: 3px
			background: $maskeditbtnbg
			border-radius: $maskeditbtnradius
			box-shadow: $maskeditbtnshadow
			color: $maskeditbtncolor
			font-size: $addbtnfontsize
			cursor: pointer
			transition: all .3s ease-in
			&:hover
				color: #63aaf5
	.editorWrap
		width: 400px
		background: $editbg
		border-radius: $editradius
		padding-bottom: 10px
		position: absolute
		left: 0
		top: 0
		.editor-main
			overflow: hidden
			.editor-main-left, .editor-main-right
				float: left
				width: 50%
				color: #fff
				text-align: left
				h3
					font-size: 12px
					text-indent: 12px
				input
					background: $editinputbg
					margin: 0
					height: 26px
					width: 90%
					border: 1px solid 
					border-color: $editinputborder
					margin-left: 12px
					text-indent: 8px
					color: #fff
					font-size: $editinputfontsize
				p
					line-height: 24px
					text-indent: 12px
					font-size: 12px
				label
					height: 24px
					overflow: hidden
					line-height: 24px
					font-weight: normal
					font-size: 12px
					input
						width: auto
						margin-top: 0
						height: auto
						vertical-align: middle
		.editor-btn
			padding-left: 10px
			text-align: left
			button
				border: 1px solid
				border-color: $editbtnbg2border
				background: $editbtnbg2
				padding: $editbtnpadding
				font-size: $editbtnfontsize
				color: $editbtnfontcolor
				&:hover
					background: $editbtnbghover2
				&:first-child
					border: 1px solid $editbtnbgborder
					background: $editbtnbg
					&:hover
						background: $editbtnbghover
</style>