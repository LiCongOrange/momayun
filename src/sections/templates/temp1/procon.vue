<template>
	<div class="con_box paddingT" :class="zarr1">
		<fn-assembly
				:btnChoice="btnChoice"
				:zLayout="zLayout"
				:zLetter="zLetter"
				:zBg="zBg"
				:bgColorNum="bgColorNum"
				@getDataLayout="getDataLayout"
				@getDataBg="getDataBg"
			></fn-assembly>
		<div>
			<div class="title"><fn-editor :content="prodata.title"></fn-editor></div>
			<div class="con">
				<p><fn-editor :content="prodata.con"></fn-editor></p>
			</div>
		</div>
	</div>
</template>
<script>
import FnAssembly from '@/pages/function/Assembly'
import FnEditor from '@/pages/function/Editor'
	export default{
		name:'Porcon',
		data () {
			return {
				btnChoice: 0,
				isActive: false,
				zBg: ['bgOne'],
				classLayout:'pro_box',
				zLetter: 'A',
				zarr1: '',
				znum: null,
				bgColorNum: '',
				zLayout: [
					{letter:'A',name:''}
				],
				maxwidth:"",
				maxwidth1:"",
				minpro:"",
				prodata:{
					title:'品牌介绍',
					con:'健身俱乐部创始于1997年，由健身业前慧yang与第十届世界健美冠军qiang共同带领，两个人一起在加州的威尼斯海难旁，创立了第一间xo健身房!由于0吸引了无教爱好者的目光。000备在美国其他地区扩展健身中心，于00o《现任总周来活助他达成这项扩展的目标，从1997年代至2001年代期间，成功由于oo吸引了无数要好者的目光，000备在美国其他地区扩展健身中心，于00现任总周来帮助他达成这项扩展的目标，从1997年代至2001年代期间，0成功健身俱乐部创始于1997年，由健身业前墅yang与第十属世界健美冠qiang共同带领，两个人一起在加州的。健身俱乐部创始于1997年，由健身业前yang与第十届世界健美冠军qiang共同带领，两个人起在加州的威尼斯海难旁，创立了第一间ox健身房由于xg吸引了无数爱好者的目光，xx准备在美国其他地区扩展健身中心，于00《现任总机来帮助他达成这项扩展的目标，从1997年代至2001年代期间， 0成功健身俱乐部创始于997年，由健身业前慧yang与第十届世界健美冠军qiang共同带领，两个人一起在加州的。'
				},
				
			}
		},
		components: {
			FnAssembly,
			FnEditor
		},
		methods: {
			getDataLayout(data) {
				this.classLayout = data[0]
				this.zLetter = data[1]
			},
			getDataBg(data) {
				this.zarr1 = data
			}
		},
		watch: {
			classLayout(val) {
				if(val == "class1") {
					this.zLetter = "B"
				}else {
					this.zLetter = "A"
				}
			}
		}
	}
</script>
<style lang="stylus" scoped>
@import '~styles/public.styl'
	.con_box
		width:100%
		height:auto
		overflow:hidden
		position: relative;
		.title
			text-align:center
			font-size:30px
			color:#333
			>>> .ql-editor
				text-align: center
				font-size: $titleFontsize
				color: #333
				padding: 0
				p
					font-size: 22px
					color: #333
					font-weight:bold
					>>> .ql-editor
						text-align: center
						padding: 0
		.con
			max-width:1200px
			margin:0 auto
			padding:10px
			font-size:16px
			line-height:25px
			>>> .ql-editor
				text-align: center
				font-size: $titleFontsize
				color: #333
				padding: 0
				p
					font-size: 16px
					color: #333
					line-height:25px
.bgOne
	background:white

</style>
