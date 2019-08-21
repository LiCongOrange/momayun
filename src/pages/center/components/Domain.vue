<template>
	<div class="domain">
		<h2><i class="iconfont">&#xe631;</i>域名</h2>
		<div class="search">
			<h6>www.</h6>
			<input 
				type="text" 
				name="" 
				placeholder="请输入您要查询的域名"
				:class="{ getFocus: isToggle }"
				@focus="onFocus"
				@blur="onBlur"
			>
			<button>查询</button>
		</div>
		<div class="domainList">
			<label>
				<input type="radio" name="ming">.com
			</label>
			<label>
				<input type="radio" name="ming" id="a">.net
			</label>
			<label>
				<input type="radio" name="ming" id="b">.cn
			</label>
			<label>
				<input type="radio" name="ming" id="c">.com.cn
			</label>
			<label>
				<input type="radio" name="ming" id="d">.info
			</label>
			<label>
				<input type="radio" name="ming" id="e">.biz
			</label>
		</div>
		<div class="domainTable">
			<ul>
				<li>
					<span>域名</span>
					<span>价格（元/年）</span>
					<span>说明</span>
				</li>
				<li v-for="item in domainTableList">
					<span v-text="item.name"></span>
					<span v-text="item.price"></span>
					<span v-text="item.introduce"></span>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isToggle: false,
			domainTableList: [{
				name: '.com',
				price: '1000',
				introduce: '域名说明域名说明域名说明'
			}, {
				name: '.net',
				price: '10000',
				introduce: '域名说明域名说明域名说明'
			}, {
				name: '.cn',
				price: '5000',
				introduce: '域名说明域名说明域名说明'
			}, {
				name: '.com.cn',
				price: '10500',
				introduce: '域名说明域名说明域名说明'
			}, {
				name: '.info',
				price: '10050',
				introduce: '域名说明域名说明域名说明'
			}, {
				name: '.biz',
				price: '10200',
				introduce: '域名说明域名说明域名说明'
			}]
		}
	},
	methods: {
		onFocus() {
			this.isToggle = true
		},
		onBlur() {
			this.isToggle = false
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.domain
	overflow: hidden
	h2
		display: inline-block
		border-bottom: 1px solid $fontColor
		line-height:  32px
		font-size: 16px
		i
			margin-right: 5px
			color: $warnColor
			font-size: 20px
			vertical-align: bottom
	.search
		&:after
			clear: both
			content: ''
			display: block
		h6
			float: left
			line-height: 36px
			margin: 0 20px
			font-size: 18px
		input
			width: 50%
			float: left
			border: 1px solid $inputBorder
			border-radius: 15px
			height: 34px
			line-height: 34px
			font-size: 16px
			text-indent: 16px
		.getFocus
			border: 1px solid $bgColor
		button
			float: left
			border: none
			background: none
			margin-left: 10px
			line-height: 34px
			font-size: 20px
			color: $bgColor
	.domainList
		padding-left: 75px
		width: 90%
		line-height: 34px
		label
			margin: 0 15px
			font-size: 16px
			color: #676767
	.domainTable
		margin-top: 20px
		ul
			li
				display: flex
				line-height: 32px
				&:nth-of-type(even)
					background: #ccc
				span
					flex: 1
					text-align: center
					font-size: 14px
					&:nth-of-type(1)
						color: $bgColor
				&:nth-of-type(1)
					span
						font-size: 18px
						&:nth-of-type(1)
							color: $fontColor
				
</style>