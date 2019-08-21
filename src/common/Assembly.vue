<template>
	<div class="layout-btn">
		<div class="btn-layout" @click="tabLayout" v-if="show01">
			布局<span>{{zLetter}}</span>
		</div>
		<div class="btn-bg" @click="tabBg" v-if="show02"></div>
		<div class="beijing-btn dropdown" v-if="show03">
			<button
				type="button"
				class="btn dropdown-toggle"
				id="dropdownMenu1"
				data-toggle="dropdown"
			>
				背景<span class="iconfont">&#xe6fb;</span>
			</button>
			<ul
				class="dropdown-menu"
				role="menu"
				aria-lablledby="dropdownMenu1"
			>
				<li role="presentation">
					<p class="bgColor">
						<span v-for="(item, index) in zBg" @click="bgtabHandle(index)"></span>
					</p>
				</li>
				<li role="presentation">
					<p class="bgImg">
						<span v-for="(item, index) in zImg" @click="imgtabHandle(item)">
							<img :src="item">
						</span>
					</p>
				</li>
				<!-- <li class="mask-toggle">
					<label>
						<input type="checkbox" >遮罩蒙板
					</label>
				</li> -->
				<!-- <li role="presentation">
					<div class="iconfont"></div>
					<select v-model="updownspace">
						<option>无</option>
						<option>小</option>
						<option>中</option>
						<option>大</option>
					</select>
				</li> -->
				<li role="presentation">
					<button @click="toEditor">上传图片</button>
					<button @click="resetHandleClick">重置</button>
					<!-- <button>保存</button> -->
				</li>
			</ul>
		</div>
		<div class="grid-layout" v-if="show04">
			<button
				type="button"
				class="btn dropdown-toggle"
				@click="menuHandel"
			>
				网格布局<span class="iconfont">&#xe6fb;</span>
			</button>
			<ul class="dropdown-menu" v-if="menuToggle">
				<li>
					<div class="menu01">
						<button class="btn" :class="{ action : actionToggle01 }" @click="selectFn('01')">
							<div class="btn-wrap">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						</button>
						<button class="btn" :class="{ action : actionToggle02 }" @click="selectFn('02')">
							<div class="btn-wrap btn-wrap01">
								<div></div>
								<div></div>
								<div></div>
								<div></div>
								<div></div>
							</div>
						</button>
						<button class="btn" :class="{ action : actionToggle03 }" @click="selectFn('03')">
							<div class="btn-wrap03">
								<div>
									<div></div>
									<div></div>
								</div>
								<div></div>
							</div>
						</button>
						<button class="btn" :class="{ action : actionToggle04 }" @click="selectFn('04')">
							<div class="btn-wrap04">
								<div></div>
								<div>
									<div></div>
									<div></div>
								</div>
							</div>
						</button>
					</div>
					<div class="menu02">
						<h6>高度</h6>
						<select v-model="heightNumber" @change="getVal('01', heightNumber)">
							<option>小</option>
							<option>中</option>
							<option>大</option>
						</select>
						<h6>间距</h6>
						<select v-model="spacingNumber" @change="getVal('02', spacingNumber)">
							<option>无</option>
							<option>小</option>
							<option>大</option>
						</select>
						<h6>内容宽度</h6>
						<select v-model="widthNumber" @change="getVal('03', widthNumber)">
							<option>正常</option>
							<option>全幅</option>
						</select>
					</div>
				</li>
			</ul>
		</div>
		<div class="space-bg" v-if="show05">
			<button class="btn btn-default btn-toggle" @click="spacebgHandel">背景<i class="iconfont">&#xe6fb;</i></button>
			<ul v-if="spacebgulToggle">
				<li>
					<p class="bgColor">
						<span v-for="(item, index) in zBg" @click="bgtabHandle(index)"></span>
					</p>
				</li>
				<li>
					<p class="bgImg">
						<span v-for="(item, index) in zImg" @click="imgtabHandle(item)">
							<img :src="item">
						</span>
					</p>
				</li>
				<li class="li-space">
					<div class="iconfont">&#xe626;</div>
					<select v-model="updownspace" @change="updownspaceHandel(updownspace)">
						<option>无</option>
						<option>小</option>
						<option>中</option>
						<option>大</option>
					</select>
				</li>
				<li class="mask-toggle">
					<label @click.self="maskHandel">
						<input type="checkbox" :checked="maskingToggle" >遮罩蒙板
					</label>
				</li>
				<li>
					<button @click="toEditor">上传图片</button>
					<button @click="resetHandleClick">重置</button>
				</li>
			</ul>
		</div>
		<div class="head-layout" v-if="show06">
			<button @click="headlayoutHandle">布<br />局<span>{{ hzLetter }}</span></button>
		</div>

		<img-layer
			v-if="imgReplaceToggle" 
			:widthNum="this.widthNum"
			:heightNum="this.heightNum"
			:imgTu="postImg"
			:lunbo="this.lunbo"
			@getImg="getImg"
			@onoff="onoff"
		></img-layer>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import ImgLayer from '@/common/Imglayer'
export default {
	props:[
		'btnChoice', 
		'zLetter', 
		'zLayout', 
		'bgNum', 
		'zBg', 
		'bgColorNum',
		'gridlayoutClass',
		'heightNumber11',
		'paddingNumber11',
		'widthNumber11',
		'postImg',
		'postbg',
		'updownSpace',
		'maskingToggle',
		'widthNum',
		'heightNum',
		'hzLetter',
		'lunbo'
	],
	components: {
		ImgLayer
	},
	data() {
		return {
			dialogVisible: false,
			headlayoutNum: '',
			spacebgulToggle: false,    // 背景下的间距ul开关
			updownspace: '无',
			actionToggle01: true,
			actionToggle02: false,
			actionToggle03: false,
			actionToggle04: false,
			heightNumber: '大',
			spacingNumber: '无',
			widthNumber: '全幅',
			menuToggle: false,
			// widthNum: 1440,
			// heightNum: 800,
			imgReplaceToggle: false,
			show01: false,
			show02: false,
			show03: false,
			show04: false,
			show05: false,
			show06: false,
			znum1: '',
			classBg: '',
			layoutNum: '',
			classLayout: '',
			bgColor: this.bgColorNum,
			zLetterNum: this.zLetter,
			postH: '',
			postS: '',
			postW: ''
		}
	},
	computed: {
		...mapState({
			pageToggle: state => state.pageToggle,
  		columnList1: state => state.threeStep.columnList,
  		columnList2: state => state.threeStep.columnList2,
			headText: state => state.stepPages.head,
      zImg: state => state.stepPages.bannerList
		})
	},
	mounted() {
		this.$nextTick(function(){
			if(this.hzLetter == 'A') {
				this.headlayoutNum = 0
			}else if(this.hzLetter == 'B') {
				this.headlayoutNum = 1
			}else if(this.hzLetter == 'C') {
				this.headlayoutNum = 2
			}
			if(this.updownSpace == '10px 0') {
				this.updownspace = '无'
			}else if(this.updownSpace == '100px 0px') {
				this.updownspace = '小'
			}else if(this.updownSpace == '180px 0px') {
				this.updownspace = '中'
			}else if(this.updownSpace == '250px 0px') {
				this.updownspace = '大'
			}else {
				this.updownspace = '无'
			}
			if(this.zLetter == "A") {
				this.layoutNum = 0
			}else if(this.zLetter == "B") {
				this.layoutNum = 1
			}else if(this.zLetter == "C") {
				this.layoutNum = 2
			}
			if(this.btnChoice == 0) {
				this.show01 = true
				this.show02 = true
				this.show03 = false
				this.show04 = false
			}else if(this.btnChoice == 1) {
				this.show01 = false
				this.show02 = false
				this.show03 = true
				this.show04 = false
			}else if(this.btnChoice == 2) {
				this.show01 = true
				this.show02 = false
				this.show03 = true
				this.show04 = false
			}else if(this.btnChoice == 3) {
				this.show01 = false
				this.show02 = false
				this.show03 = false
				this.show04 = true
			}else if(this.btnChoice == 4) {
				this.show01 = false
				this.show02 = false
				this.show03 = false
				this.show04 = false
				this.show05 = true
			}else if(this.btnChoice == 5) {
				this.show01 = true
				this.show02 = false
				this.show03 = false
				this.show04 = false
				this.show05 = true
			}else if(this.btnChoice == 6) {
				this.show01 = false
				this.show02 = false
				this.show03 = false
				this.show04 = false
				this.show05 = false
				this.show06 = true
			}
			if(this.gridlayoutClass == 'layout01') {
				this.actionToggle01 = true
				this.actionToggle02 = false
				this.actionToggle03 = false
				this.actionToggle04 = false
			}else if(this.gridlayoutClass == 'layout02') {
				this.actionToggle01 = false
				this.actionToggle02 = true
				this.actionToggle03 = false
				this.actionToggle04 = false
			}else if(this.gridlayoutClass == 'layout03') {
				this.actionToggle01 = false
				this.actionToggle02 = false
				this.actionToggle03 = true
				this.actionToggle04 = false
			}else if(this.gridlayoutClass == 'layout04') {
				this.actionToggle01 = false
				this.actionToggle02 = false
				this.actionToggle03 = false
				this.actionToggle04 = true
			}else {
				this.actionToggle01 = true
				this.actionToggle02 = false
				this.actionToggle03 = false
				this.actionToggle04 = false
			}
			if(this.heightNumber11 == '168px') {
				this.heightNumber = '小'
			}else if(this.heightNumber11 == '250px') {
				this.heightNumber = '中'
			}else if(this.heightNumber11 == '350px') {
				this.heightNumber = '大'
			}
			if(this.paddingNumber11 == '0px') {
				this.spacingNumber = '无'
			}else if(this.paddingNumber11 == '5px') {
				this.spacingNumber = '小'
			}else if(this.paddingNumber11 == '15px') {
				this.spacingNumber = '大'
			}
			if(this.widthNumber11 == '') {
				this.widthNumber = '全幅'
			}else{
				this.widthNumber = '正常'
			}
		})
	},
	methods: {
		handleClose() {

		},
		headlayoutHandle() {
			let hn = ''
			this.headlayoutNum ++
			hn = this.headlayoutNum%this.headText.length
			if(this.pageToggle) {
				this.columnList1[0].indexes = hn
			}else {
				this.columnList2[0].indexes = hn
			}
			if(hn == '0') {
				this.$store.commit('headlayoutHandel', 'A')
			}else if(hn == '1') {
				this.$store.commit('headlayoutHandel', 'B')
			}else if(hn == '2') {
				this.$store.commit('headlayoutHandel', 'C')
			}
		},
		maskHandel() {
			this.maskingToggle = !this.maskingToggle
			this.$emit('getMasking', this.maskingToggle)
		},
		spacebgHandel() {
			this.spacebgulToggle = !this.spacebgulToggle
		},
		updownspaceHandel(val) {
			// console.log(val)
			this.$emit('getUpdownspace', val)
		},
		getVal(typer, val) {
			// console.log(val)
			if(typer == '01') {
				if(val == '小') {
					this.postH = '168px'
				}else if(val == '中') {
					this.postH = '250px'
				}else if(val == '大') {
					this.postH = '350px'
				}
				this.$emit('getAuxiliary', [typer, this.postH])
			}else if(typer == '02') {
				if(val == '无') {
					this.postS = '0px'
				}else if(val == '小') {
					this.postS = '5px'
				}else if(val == '大') {
					this.postS = '15px'
				}
				this.$emit('getAuxiliary', [typer, this.postS])
			}else if(typer == '03') {
				if(val == '正常') {
					this.postW = 'container'
				}else if(val == '全幅') {
					this.postW = ''
				}
				this.$emit('getAuxiliary', [typer, this.postW])
			}
		},
		selectFn(typer) {
			if(typer == '01' && this.gridlayoutClass !='layout01') {
				this.actionToggle01 = true
				this.actionToggle02 = false
				this.actionToggle03 = false
				this.actionToggle04 = false
				this.$emit('getDataLayout', typer)
			}else if(typer == '02' && this.gridlayoutClass !='layout02') {
				this.actionToggle01 = false
				this.actionToggle02 = true
				this.actionToggle03 = false
				this.actionToggle04 = false
				this.$emit('getDataLayout', typer)
			}else if(typer == '03' && this.gridlayoutClass !='layout03') {
				this.actionToggle01 = false
				this.actionToggle02 = false
				this.actionToggle03 = true
				this.actionToggle04 = false
				this.$emit('getDataLayout', typer)
			}else if(typer == '04' && this.gridlayoutClass !='layout04') {
				this.actionToggle01 = false
				this.actionToggle02 = false
				this.actionToggle03 = false
				this.actionToggle04 = true
				this.$emit('getDataLayout', typer)
			}
		},
		menuHandel() {
			this.menuToggle = !this.menuToggle
		},
		getImg(val) {
			this.classBg = val
			this.$emit('getDataBg', ['1' ,this.classBg])
		},
		onoff(val) {
			this.imgReplaceToggle = val
		},
		toEditor() {
			this.$emit('getDataBg2', '0')
			this.imgReplaceToggle = true
			// this.$store.commit('dialogImgupHandle', true)
		},
		bgtabHandle(index) {
			if(index == '0') {
				this.classBg = "bgThree"
			}else if(index == '1') {
				this.classBg = "bgOne"
			}else if(index == '2') {
				this.classBg = "bgTwo"
			}
			if(this.postbg != this.classBg) {
				this.$emit('getDataBg', ['0', this.classBg])
			}
		},
		imgtabHandle(item) {
			// this.classBg = item
			// this.$emit('getDataBg', ['1', this.classBg])
			if(this.postImg != item) {
				this.$emit('getDataBg', ['1', item])
			}
		},
		resetHandleClick() {
			this.classBg = ""
			this.$emit('getDataBg', ['2' ,this.classBg])
		},
		tabBg () {
			this.bgColor ++
			this.classBg = this.zBg[this.bgColor%this.zBg.length]
			this.$emit('getDataBg', this.classBg)
		},
		tabLayout() {
			// console.log(this.layoutNum)
			// if(this.zLetterNum == "A") {
			// 	this.layoutNum = 0
			// }else if(this.zLetterNum == "B") {
			// 	this.layoutNum = 1
			// }else if(this.zLetterNum == "C") {
			// 	this.layoutNum = 2
			// }
			this.layoutNum ++
			this.classLayout = this.zLayout[this.layoutNum%this.zLayout.length].name
			this.zLetterNum = this.zLayout[this.layoutNum%this.zLayout.length].letter
			this.$emit('getDataLayout', [this.classLayout, this.zLetterNum])
		}
	},
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.layout-btn
	position: absolute
	right: 10px
	top: 10px
	z-index: 1000
	.btn-layout
		width: $asswidth
		background: $assbg
		padding: 7px 15px
		margin-right: 10px
		float: left
		border-radius: $assradius
		color: $textColor
		cursor: pointer
		text-align: center
		&:hover
			background: $assbghover
		span
			background: $assiconbg
			margin-left: 5px
			border-radius: $assiconradius
			padding: 1px 3px
			font-size: $assiconfontsize
	.btn-bg
		float: left
		border: 6px solid $assbg
		border-radius: 5px
		padding: 11px
		cursor: pointer
	.beijing-btn
		// position: absolute
		// right:10px
		// top: 10px
		float: left
		min-width: 120px
		.dropdown-toggle
			background-color: $bgColor
			color: $textColor
			width: 100%
			padding: 4px 0
			span
				border: none
				vertical-align: initial
		.dropdown-menu
			right: 0
			margin: 0
			width: 100%
			min-width: 120px
			transition: all 0.5s
			background: $bgColor
			padding-top: 10px
			box-sizing: border-box
			li
				text-align: center
				.bgColor
					height: 25px
					padding: 0 5px
					margin: 0
					span
						height: inherit
						float: left
						width: 33.33333333%
						background-color: #fff
						transition: all 0.3s
						cursor: pointer
						&:hover
							transform: scale(1.1)
						&:nth-of-type(2)
							background: #ccc
						&:nth-of-type(3)
							background: #333
				.bgImg
					padding: 0 5px
					height: 25px
					margin-bottom: 0
					span
						float: left
						width: 33.333333%
						height: inherit
						transition: all 0.3s
						cursor: pointer
						&:hover
							transform: scale(1.1)
					img
						width: 100%	
						height: inherit
				button
					width: 90%
					border: none
					border-radius: 5px
					margin-top: 5px
			.mask-toggle
				padding: 0 5px
				text-align: left
				label
					max-width: inherit
					font-size: 12px
					margin-bottom: 0
				input
					background: none
					vertical-align: sub
	.grid-layout	
		.dropdown-toggle
			background-color: $assbg
			width: $asswidth
			padding: 4px 30px
			border-radius: $assradius
			color: $textColor
			&:hover
				background: $assbghover
			span
				border: none
				vertical-align: initial		
		.dropdown-menu
			right: 0
			margin-top: -2px
			width: 100%
			min-width: 114px
			border-radius: $backgroundborder2
			transition: all 0.5s
			background: $assbg
			padding: 10px 0
			box-sizing: border-box
			display: block
			li
				.menu01
					padding: 0 5px
					overflow: hidden
					button
						width: 50%
						background: none
						border: none
						padding: 0 3px
						float: left
						margin-bottom: 7px
						position: relative
						opacity: 0.5
					.action
						opacity: 1
					.btn-wrap
						border: 1px solid #e2e4e7
						overflow: hidden
						div
							float: left
							width: 37.5%
							height: 15px
							border: 1px solid #fff
							&:first-child
								width: 62.5%
							&:last-child
								width: 62.5%
					.btn-wrap01
						div
							width: 33.333%
							&:first-child
								width: 50%
							&:nth-of-type(2)
								width: 50%
							&:last-child
								width: 33.333%
					.btn-wrap03
						border: 1px solid #e2e4e7
						overflow: hidden
						div
							float: left
							width: 37.5%
							border: 1px solid #fff
							height: 30px
							&:first-child
								div
									width: 100%
									height: 15px
									border: none
									&:first-child
										border-bottom: 2px solid #fff
							&:last-child
								width: 62.5%
					.btn-wrap04
						border: 1px solid #e2e4e7
						overflow: hidden
						div
							float: left
							width: 62.5%
							border: 1px solid #fff
							height: 30px
							&:last-child
								div
									width: 100%
									height: 15px
									border: none
									&:first-child
										border-bottom: 2px solid #fff
							&:last-child
								width: 37.5%								
				.menu02
					overflow: hidden
					padding: 0 10px
					h6
						margin-top: 7px
						margin-bottom: 3px
						font-size: 11px
						color: #aaa
					select
						width: 100%
						height: 23px
						border: 1px solid #444
						background: rgba(0, 0, 0, .6)
						font-size: 12px
						line-height: 26px
						color: #fff
	.space-bg
		float: left
		width: $asswidth
		.btn-toggle
			border: $assborder
			border-radius: $backgroundborder1
			background: $assbg
			width: 100%
			padding: 5px 0
			font-size: 14px
			color: #fff
			&:hover
				background: $assbghover
		ul
			margin-top: -2px
			border-radius: $backgroundborder2
			background: $assbg
			padding: 8px 0
			li
				text-align: center
				p
					height: 25px
					padding: 0 5px
					margin: 0
					span
						display: inline-block
						width: 38px
						height: inherit
						cursor: pointer
						transition: all .3s
						margin-right: 1px
						&:last-child
							margin-right: 0
						&:hover
							transform: scale(1.1)
				.bgColor
					span
						background: #fff
						&:nth-of-type(2)
								background: #ccc
						&:last-child
							background: $modelBg03
				.bgImg
					img
						width: 100%
						height: inherit
				button
					display: inline-block
					width: 90%
					border: none
					border-radius: $assbtnradius
					margin-top: 5px
					background: $assbtnbg1
					padding: $assbtnpadding
					border-top: 1px solid rgba(255, 255, 255, .35)
					color: #fff
					font-size: 12px
					word-spacing: 2px
					&:hover
						background: $assbtnbg1hover
			.li-space
				position: relative
				margin: 5px 6px 0
				div.iconfont
					position: absolute
					left: 3px
					top: 2.5px
					color: #fff
					font-size: 12px
				select
					background: rgba(0, 0, 0, .6)
					border: 1px solid #444
					border-radius: $assradius
					width: 100%
					height: 23px
					color: #fff
					font-size: 12px
					text-indent: 45px
			.mask-toggle
				margin: 0 7px
				line-height: 24px
				text-align: left
				position: relative
				label
					margin: 0
					letter-spacing: 2px
					font-size: 12px
					color: #fff
					vertical-align: middle
					font-weight: normal
					&:after
						content: ''
						display: block
						position: absolute
						left: 0
						top: 0
						right: 0
						bottom: 0
						background: rgba(255, 255, 255, 0)
					input
						margin: 0 5px 0 0
						vertical-align: middle
						margin-top: -2px
	.head-layout
		button
			border: none
			background: $bgColor
			padding: 2px 6px
			border-radius: 5px
			color: #fff
			display: flex
			flex-direction: column
			text-align: center
			align-items: center
			font-size: 13px
			span
				background: #666
				border-radius: 15px
				padding: 1px 5px
				font-size: 12px
</style>