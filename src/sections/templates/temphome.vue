<template>
	<div class="box" :class="{ paved : this.$store.state.isNavToggle }">
		<ul>
			<li><temp-header></temp-header></li>
		</ul>
	</div>
</template>
<script>
	import TempHeader from "@/pages/templates/temp1/Header"
	export default{
		name:'Temphome',
		components:{
			TempHeader
		}
	}
</script>
<style lang="stylus" scoped>
.box
    margin-left: 220px
    transition: all 0.3s
    background:#fff
    ul
      margin: 0
.paved
	margin-left: 0
</style>