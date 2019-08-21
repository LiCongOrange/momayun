<template>
	<div class="detail">
		<div class="inner container">
			<div class="title">
				<h2 v-html="modelInfo.title"></h2>
				<p v-html="modelInfo.time"></p>
			</div>
			<div class="content">
				<p v-html="modelInfo.past"></p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			modelInfo: ''
		}
	},
	mounted() {
		this.modelInfo = this.$store.state.sonPagetext
	}
}
</script>

<style lang="stylus" scoped>
.detail
	position: relative
	padding: 50px 0 80px
	.title
		text-align: center
		h2
			font-size: 32px
		p
			font-size: 20px
			color: #666
	.content
		margin-top: 20px
		font-size: 18px
		text-indent: 36px
		line-height: 32px
</style>