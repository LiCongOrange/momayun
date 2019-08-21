<template>
	<div class="companyNew">
		<div class="mask" v-if="this.$store.state.companyNewsToggle">
			<add-content
				:childtitle="title"
				:childcontent="content"
				:childindexes="indexes"
			></add-content>
		</div>
		<div class="title">
			<h3>企业动态</h3>
		</div>
		<div class="search">
			<button @click="addContent">
				<i class="iconfont">&#xe6df;</i> 增加文章
			</button>
			<button><i class="iconfont">&#xe61e;</i> 批量修改</button>
			<div>
				<i class="iconfont">&#xe72b;</i>
				<input type="text" name="" placeholder="输入关键字搜索文章">
			</div>
		</div>
		<ul>
			<li>
				<span><label><input type="checkbox" name="">全选</label></span>
				<span>标题</span>
				<span>操作</span>
				<span>日期</span>
			</li>
			<li v-for="(item, index) in this.$store.state.companyNewsList" v-if="item.delete">
				<span><input type="checkbox" name=""></span>
				<span>{{ item.title }}</span>
				<span>
					<i class="iconfont" @click="editHandle(index)">&#xe6f5;</i>
					<i class="iconfont" @click="delateHandle(index)">&#xe6e9;</i>
				</span>
				<span>{{ item.time }}</span>
			</li>
		</ul>
		<pages
			:total="total"
			:current-page="current"
			@pagechange='pagechange'
		></pages>
	</div>
</template>

<script>
import Pages from '@/common/Pages'
import AddContent from './CompanyNewsAdd'
export default {
	components: {
		Pages,
		AddContent
	},
	data() {
		return {
			title: '',
			content: '',
			indexes: '',
			total: 50,   //记录总条数
			display: 10,  //每页显示条数
			current: 1   //当前的页数
		}
	},
	methods: {
		editHandle(index) {
			this.$store.state.companyEditToggle = false
			this.$store.state.companyNewsToggle = true
			this.title = this.$store.state.companyNewsList[index].title
			this.content = this.$store.state.companyNewsList[index].content
			this.indexes = index
			// console.log(this.title)
		},
		addContent() {
			this.title = ''
			this.content = ''
			this.$store.state.companyEditToggle = true
			this.$store.state.companyNewsToggle = true
		},
		delateHandle(val) {
			this.$store.state.companyNewsList.splice(val, 1)
		},
		pagechange(val) {

		}
	}
}
</script>

<style lang='stylus' scoped>
@import '~styles/public'
.companyNew
	margin: 20px
	background: #fff
	padding-bottom: 20px
	.mask
		position: fixed
		left: 0
		right: 0
		top: 0
		bottom: 0
		background: rgba(0, 0, 0, 0.7)
		z-index: 100
	.title
		background: #e8e8e8
		padding-left: 27px
		line-height: 46px
		h3
			margin: 0
			font-size: 16px
			color: $fontColor
			line-height: 46px
	.search
		padding: 14px 44px
		border-bottom: 1px solid #dfdfdf
		overflow: hidden
		button
			float: left
			margin-right: 24px
			padding: 0 5px
			border: none
			background: $bgColor
			color: #fff
			line-height: 36px
			i
				vertical-align: middle
				font-size: 18px
		div
			float: left
			position: relative
			i
				position: absolute
				left: 5px
				top: 3px
				color: #000
				font-size: 22px
			input
				text-indent: 32px
				border-radius: 15px
				border: 1px solid $inputBorder
				line-height: 34px
	ul
		min-height: 300px
		li
			display: flex
			line-height: 46px
			&:nth-of-type(even)
				background: #e8e8e8
			span
				flex: 1
				text-align: center
				font-size: 16px
				input
					vertical-align: middle
				i
					font-size: 22px
					cursor: pointer
</style>