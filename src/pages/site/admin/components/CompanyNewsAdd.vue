<template>
	<div class="addContent">
		<button class="closeThis iconfont" @click="closeThis">&#xe625;</button>
		<h3>添加文章</h3>
		<ul>
			<li>
				<h5>文章标题</h5>
				<div><input type="text" v-model="title"></div>
			</li>
			<li>
				<h5>文章内容</h5>
				<div>
					<p><button>上传图片</button></p>
					<textarea v-model="content"></textarea>
				</div>
			</li>
			<li>
				<button @click="conserve">保存</button>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: ['childtitle', 'childcontent', 'childindexes'],
	data() {
		return {
			title: this.childtitle,
			content: this.childcontent,
			indexes: this.childindexes
		}
	},
	methods: {
		conserve() {
			var date = new Date()
			var sign = "."
			var year = date.getFullYear()  //年
			var month = date.getMonth()   //月
			var day = date.getDate()    //日
			let obj = {
				title: this.title,
				content: this.content,
				delete: true,
				time: year + sign + month + sign + day
			}

			if(this.$store.state.companyEditToggle) {
				this.$store.state.companyNewsList.unshift(obj)
				this.$store.state.companyNewsToggle = false
			}else {
				this.$store.state.companyNewsList.splice(this.indexes, 1, obj)
				this.$store.state.companyNewsToggle = false
			}

			this.title = ''
			this.content = ''
		},
		closeThis() {
			this.$store.state.companyNewsToggle = false
			this.title = ''
			this.content = ''
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.addContent	
	position: absolute
	left: 50%
	top: 50%
	width: 50%
	background: #fff
	transform: translate(-50%, -50%)
	padding: 20px
	.closeThis
		position: absolute
		right: 10px
		top: 5px
		border: none
		background: none
		font-size: 22px
	h3
		text-align: center
		font-size: 20px
	ul
		li
			padding: 10px 0
			&:after
				clear: both
				content: ''
				display: block
			h5
				margin: 0
				float: left
				font-size: 18px
				line-height: 36px
			div
				float: left
				margin-left: 37px
				width: 70%
				input, textarea
					border: 1px solid $inputBorder
					width: 80%
					text-indent: 14px
					line-height: 34px
				textarea
					width: 100%
					min-height: 150px
					resize: none
				p
					margin-top: 10px
					text-align: right
					button
						border: none
						background: #f19c77
						padding: 2px 5px
						border-radius: 10px
						color: #fff
			&:last-child
				text-align: center
				button
					border: none
					border-radius: 15px
					background: $bgColor
					padding: 5px 25px
					color: #fff
</style>