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
				<li>
					<div class="li_top">
						<div class="li_title"><fn-editor :content="prodata.title"></fn-editor></div>
						<div class="li_text"><fn-editor :content="prodata.con"></fn-editor></div>
					</div>
					<div class="li_bot"><img :src="prodata.imgurl"></div>
				</li>
				<li style="margin:0 5%">
					<div class="li_bot"><img :src="prodata2.imgurl"></div>
					<div class="li_top">
						<div class="li_title"><fn-editor :content="prodata2.title"></fn-editor></div>
						<div class="li_text"><fn-editor :content="prodata2.con"></fn-editor></div>
					</div>
				</li>
				<li>
					<div class="li_top">
						<div class="li_title"><fn-editor :content="prodata3.title"></fn-editor></div>
						<div class="li_text"><fn-editor :content="prodata3.con"></fn-editor></div>
					</div>
					<div class="li_bot"><img :src="prodata3.imgurl"></div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import FnAssembly from '@/pages/function/Assembly'
import FnEditor from '@/pages/function/Editor'
	export default{
		name:'Prolist2',
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
				title:{title:'热门产品'},
				prodata:{
					title:'运动健身',
					imgurl:'/static/images/bann_06.png',
					con:'健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明'
				},
				prodata2:{
					title:'运动健身',
					imgurl:'/static/images/bann_06.png',
					con:'健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明'
				},
				prodata3:{
					title:'运动健身',
					imgurl:'/static/images/bann_06.png',
					con:'健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明健身动作说明'
				},
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
		.prolist
			max-width:1200px
			margin:0 auto
			height:auto
			overflow:hidden
			padding:0 5px
			li
				float:left
				width:30%
				min-height:300px
				text-align:center
				box-shadow:0 0 10px #888
				.li_top
					padding:20px
					.li_title
						text-align:center
						font-size:20px
						>>> .ql-editor
									text-align: center
									font-size: $titleFontsize
									color: #333
									padding: 0
									p
										font-size: 18px
										color: #333
										font-weight:bold
										>>> .ql-editor
											text-align: center
											padding: 0
					.li_text
						font-size:14px
						text-align:left
						>>> .ql-editor
									text-align: center
									font-size: $titleFontsize
									color: #333
									padding: 0
									p
										font-size: 14px
										color: #333
										>>> .ql-editor
											text-align: center
											padding: 0
				.li_bot
					width:100%
					height:230px
					img
						width:100%
						height:100%
</style>