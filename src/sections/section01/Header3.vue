<template>
	<div class="header">
		<div class="logo"><img src="/static/images/head/clogo3.png"></div>
		<div class="nav">
			<ul>
				<li v-for='item of this.$store.state.threeStep.columnList' v-if="item.onOff">
					<a v-if="item.type !== 'header' && item.type != 'details' && item.type != 'footer'" >{{item.name}}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<style lang="stylus" scoped>
	.header
		width:100%
		height:auto
		overflow:hidden
		// box-shadow: 0px 0px 5px #888888;
		// position:absolute
		z-index:2
		.logo
			width:500px
			min-height:70px
			margin:0 auto
			padding-top:15px
			font-size:40px
			text-align:center
		.nav
			width:1200px
			min-height:30px
			text-align:center
			margin:0 auto
			li
				display:inline-block
				margin:0 10px
				line-height:40px
				a
					color: #666
					font-size:16px
					text-decoration:none
</style>