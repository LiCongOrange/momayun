<template>
	<div class="box_b paddingT">
		<fn-assembly
				:btnChoice="btnChoice"
				:zLayout="zLayout"
				:zLetter="zLetter"
				:zBg="zBg"
				:bgColorNum="bgColorNum"
				@getDataLayout="getDataLayout"
				@getDataBg="getDataBg"
			></fn-assembly>
		<div class="boxinner">
			<div class="title"><fn-editor :content="title.title"></fn-editor></div>
			<ul class="prolist">
				<li v-for="item of prodata">
					<div class="li_top">
						<div class="li_title"><fn-editor :content="item.title"></fn-editor></div>
						<div class="li_text"><fn-editor :content="item.con"></fn-editor></div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import FnAssembly from '@/pages/function/Assembly'
import FnEditor from '@/pages/function/Editor'
	export default{
		name:'conlist',
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
				title:{title:'XXX分店'},
				prodata:[
					{'title':'北京总店','con':'北京朝阳区38号'},
					{'title':'北京总店','con':'北京朝阳区38号'},
					{'title':'北京总店','con':'北京朝阳区38号'}
				]
			}
		},
		components: {
			FnAssembly,
			FnEditor
		},
	}
</script>
<style lang="stylus" scoped>
.box_b
	width:100%
	height:auto
	// overflow:hidden
	position:relative
	.boxinner
		max-width:1200px
		margin:0 auto
		height:auto
		.title
			text-align:center
			font-size:30px
			color:#333
			padding-bottom:10px
			>>> .ql-editor
				font-size: $titleFontsize
				color: #333
				padding: 0
				p
					text-align:center
					font-size: 22px
					color: #333
					font-weight:bold
					>>> .ql-editor
						text-align: center
						padding: 0
		.prolist
			max-width:1200px
			margin:0 auto
			height:auto
			overflow:hidden
			padding:0 5px
			li
				float:left
				width:33%
				text-align:center
				// border:1px solid red
				.li_top
					padding:20px
					.li_title
						text-align:center
						font-size:20px
						>>> .ql-editor
									font-size: $titleFontsize
									color: #333
									padding: 0
									p
										font-size: 18px
										color: #333
										font-weight:bold
										>>> .ql-editor
											padding: 0
					.li_text
						font-size:14px
						text-align:left
						>>> .ql-editor
									font-size: $titleFontsize
									color: #333
									padding: 0
									p
										font-size: 14px
										color: #333
										>>> .ql-editor
											padding: 0
				.li_bot
					width:100%
					height:230px
					img
						width:100%
						height:100%
</style>