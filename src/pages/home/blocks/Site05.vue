<template>
	<div 
		class="contact" 
		ref="site05" 
		:class="[modelInfo.bgClass, {masking: modelInfo.maskingToggle}]" 
		:style="{backgroundImage: 'url(' + modelInfo.bgImg + ')', padding: modelInfo.updownspace }"
	>
		<fn-assembly
			:btnChoice="btnChoice"
			:zBg="zBg"
			:zImg="this.zImg"
			:postbg="modelInfo.bgClass"
			:postImg="modelInfo.bgImg"
			:updownSpace="modelInfo.updownspace"
			:maskingToggle="modelInfo.maskingToggle"
			:widthNum="widthNum1"
			:heightNum="heightNum1"
			@getDataBg="getDataBg"
			@getUpdownspace="getUpdownspace"
			@getMasking="getMasking"
			v-if="allEditToggle"
		></fn-assembly>
		<div class="title container" v-if="allEditToggle" :class="{ width96: allEditToggle }">
			<div>
				<h3 @click="getIndex('t')" :style="{ opacity: opacityNum }">
					<fn-editor :content="modelInfo.modularName" :type1="7" :type2="1" :lmid="pid"></fn-editor>
				</h3>
				<h6  @click="getIndex('c')" :style="{ opacity: opacityNum }">
					<fn-editor :content="modelInfo.modularNameFu" :type1="7" :type2="2" :lmid="pid"></fn-editor>
				</h6>
			</div>
		</div>		
		<div class="title container" v-else>
			<div>
				<h3 v-if="modelInfo.modularName" v-html="modelInfo.modularName" :class="{animated: isanimated1, fadeInUp: isfade1}"></h3>
				<h6 v-if="modelInfo.modularNameFu" v-html="modelInfo.modularNameFu" :class="{animated: isanimated1, fadeInUp: isfade1}"></h6>
			</div>
		</div>
		<div class="content container layout1" :class="{ phoneClass: phoneToggle, width96: allEditToggle }">
			<div class="user" :style="{ opacity: opacityNum }" :class="{animated: isanimated2, fadeInLeft: isfade2}">
				<ul class="inner">
					<li v-for="(item, index) in modelInfo.userList" v-if="item.onoff">
						<input type="text" :placeholder="item.bindName" v-model="item.bindName" v-if="item.name != '留言' && item.name != '提交'">
						<textarea v-else-if="item.name == '留言' && item.name != '提交'" v-model="item.bindName" :placeholder="item.bindName"></textarea>
						<button v-else @click="submit">{{ item.bindName }}</button>
					</li>
				</ul>
				<div class="edit-overlay" v-if="allEditToggle">
					<div class="mask" v-if="userToggle">
						<span @click="userHandel('1')">编辑</span>
					</div>
					<div class="editBox" v-else>
						<h3>表单字段</h3>
						<ul>
							<li v-for="item in modelInfo.userList">
								<label v-if="item.name !='提交'">
									<input type="checkbox" v-model="item.onoff">
									<span>{{item.name}}</span>
								</label>
								<label v-else>
									<input type="checkbox" disabled v-model="item.onoff">
									<span>{{item.name}}</span>
								</label>
								<input v-if="item.onoff" v-model="item.bindName" type="text" :placeholder="item.name">
							</li>
						</ul>
						<div class="btnWrap">
							<button @click="userHandel('0')">确定</button>
						</div>
					</div>
				</div>
			</div>
			<div class="addUser" v-if="modelInfo.addUserToggle" :style="{ opacity: opacityNum }" :class="{animated: isanimated2, fadeInRight: isfade2}">
				<ul class="content">
					<li v-for="(item, index) in modelInfo.classList">
						<i class="iconfont" v-html="item.icon"></i>
						<span>{{ item.val || '请填写' + item.name }}</span>
					</li>
				</ul>
				<div class="add-overlay" v-if="allEditToggle">
					<div class="mask" v-if="addUserEditToggle">
						<span @click="addUserEditHandle('1')">编辑</span>
						<i class="iconfont" @click="addList('0')">&#xe6e9;</i>
					</div>
					<div class="add-overlay-main" v-else>
						<h3>联系方式</h3>
						<ul>
							<li v-for="(item, index) in modelInfo.classList">
								<span>{{item.name}} : </span>
								<textarea v-model="item.val" v-if="item.name == '地址'"></textarea>
								<input type="text" v-model="item.val" v-else>
							</li>
							<li>
								<button @click="ensure">保存</button>
								<button @click="addUserEditHandle('0')">取消</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="addList" v-if="!modelInfo.addUserToggle">
			<span v-if="allEditToggle" @click="addList('1')">添加联系方式</span>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import FnEditor from '@/common/Editor'
import FnAssembly from '@/common/Assembly'
export default {
	props: ['pid'],
	components: {
		FnEditor,
		FnAssembly
	},
	data() {
		return {
			phoneToggle: false,
			isanimated1: false,
			isfade1: false,
			isanimated2: false,
			isfade2: false,
			opacityNum: 0,
			opacityToggle: false,
			userArr: [],
			imgList: [],
			classBg: '',
			btnChoice: 4,
			indexes: '',
			address: '',
			phone: '',
			email: '',
			wechat: '',
			widthNum1: '1600',
			heightNum1: '900',
			userToggle: true,
			addUserToggle: false,
			addUserEditToggle: true,
			classLayout: 'layout1',
			modelInfo: '',
			zBg: ["bgOne", "bgTwo", "bgThree"]
		}
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			zImg: state => state.stepPages.bannerList,
			browserToggle: state => state.browserToggle,
			stepPages: state => state.stepPages
		})
	},
	mounted() {
		if(!this.pid) {
			for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
				if(this.$store.state.blocks.modeltextList[i].lmid == 'add04') {
					this.modelInfo = this.$store.state.blocks.modeltextList[i]
				}
			}
		}else {
			for(let i=0; i<this.stepPages.contact.length; i++) {
				if(this.stepPages.contact[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.contact[i]
					this.classBg = this.stepPages.contact[i].bgClass
				}
			}
		}
		if(!this.browserToggle) {
			this.phoneToggle = true
		}
    this.$nextTick(function(){
      this.handleScroll()
    })
    window.addEventListener('scroll', this.handleScroll)
	},
	watch: {
		pid(val) {
			if(!this.pid) {
				for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
					if(this.$store.state.blocks.modeltextList[i].lmid == 'add04') {
						this.modelInfo = this.$store.state.blocks.modeltextList[i]
					}
				}
			}else {
				for(let i=0; i<this.stepPages.contact.length; i++) {
					if(this.stepPages.contact[i].lmid == this.pid) {
						this.modelInfo = this.stepPages.contact[i]
						this.classBg = this.stepPages.contact[i].bgClass
					}
				}
			}
		}
	},
	methods: {
		getMasking(data) {
			if(data) {
				this.modelInfo.maskingToggle = true
			}else {
				this.modelInfo.maskingToggle = false
			}
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemodule',
				data: {
					site_id: this.siteId,
					lmid: this.pid,
					type: 7,
					module: this.modelInfo
				}
			}).then((res)=> {
				if(res.data.code == '404') {
					alert(res.data.msg)
				}
			})
		},
		getUpdownspace(data) {
			if(data == '无') {
				this.modelInfo.updownspace = '10px 0'
			}else if(data == '小') {
				this.modelInfo.updownspace = '100px 0'
			}else if(data == '中') {
				this.modelInfo.updownspace = '180px 0'
			}else if(data == '大') {
				this.modelInfo.updownspace = '250px 0'
			}
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemodule',
				data: {
					site_id: this.siteId,
					lmid: this.pid,
					type: 7,
					module: this.modelInfo
				}
			}).then((res)=> {
				if(res.data.code == '404') {
					alert(res.data.msg)
				}
			})
		},
    handleScroll() {
      if(this.allEditToggle) {
      	this.opacityNum = 1
      }else {
      	let htmlT = this.$refs.site05.getBoundingClientRect().top
	      if(htmlT <= 560) {
	      	this.isanimated1 = true
	      	this.isfade1 = true
	      }
	      if(htmlT <= 450) {
	      	this.isanimated2 = true
	      	this.isfade2 = true
	      }
      }
    },
		submit() {
			this.$axios({
				method: 'post',
				url: '/api/upload/contactus',
				data: {
					lmid: this.pid,
					wid: this.$store.state.threeStep.siteId,
					name: this.modelInfo.userList[0].bindName,
					tel: this.modelInfo.userList[2].bindName,
					email: this.modelInfo.userList[1].bindName,
					leave: this.modelInfo.userList[3].bindName
				}
			}).then((res)=> {
				if(res.data.code == '200') {
					alert(res.data.msg)
				}else {
					alert(res.data.msg)
				}
			})
		},
		getDataBg(data) {
			this.classBg = data
			if(data[0] == '0') {
				this.modelInfo.bgClass = data[1]
				this.modelInfo.bgImg = ''
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.$store.state.threeStep.siteId,
						lmid: this.pid,
						type: 7,
						module: this.modelInfo
					}
				}).then((res)=> {
					if(res.data.code == '200') {
						this.modelInfo.bgClass = data[1]
					}else {
						alert(res.data.msg)
					}
				})
			}else {
				this.modelInfo.bgClass = ''
				this.modelInfo.bgImg = data[1]
				if(data[1].indexOf('data:image')>-1) {
					this.imgList = []
					let obj = {
						url: data[1]
					}
					this.imgList.push(obj)
					this.$axios({
						method: 'post',
						url: '/api/upload/imgsUpload',
						data: this.imgList
					}).then((res)=> {
						if(res.data.code == '200') {
							this.modelInfo.bgImg = res.data.data[0].url
							this.$axios({
								method: 'post',
								url: '/api/Senior/savemodule',
								data: {
									site_id: this.$store.state.threeStep.siteId,
									lmid: this.pid,
									type: 7,
									module: this.modelInfo
								}
							}).then((res)=> {
								if(res.data.code == '404') {
									alert(res.data.msg)
								}
							})
						}else {
							alert(res.data.msg)
						}
					})
				}else {
					this.$axios({
						method: 'post',
						url: '/api/Senior/savemodule',
						data: {
							site_id: this.$store.state.threeStep.siteId,
							lmid: this.pid,
							type: 7,
							module: this.modelInfo
						}
					}).then((res)=> {
						if(res.data.code == '404') {
							alert(res.data.msg)
						}
					})
				}
			}
		},
		getIndex(index) {
			this.indexes = index
		},
		fnEdit(val) {
					if(this.indexes == 't') {
						this.modelInfo.modularName = val
					}else if(this.indexes == 'c') {
						this.modelInfo.modularNameFu = val
					}
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemodule',
				data: {
					site_id: this.$store.state.threeStep.siteId,
          lmid: this.pid,
          type: 7,
          module: this.modelInfo
				}
			}).then((res)=> {
				if(res.data.code == '404') {
					alert(res.data.msg)
				}
			})
		},
		userHandel(val) {
			if(val == '1') {
				this.userToggle = false
			}else if(val == '0') {
				this.userToggle = true
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.$store.state.threeStep.siteId,
  					lmid: this.pid,
  					type: 7,
  					module: this.modelInfo
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						// alert(res.data.msg)
					}
				})
			}
			for(let i=0; i<this.$store.state.stepPages.contact.length; i++) {
				if(this.$store.state.stepPages.contact[i].lmid == this.pid) {
					this.$store.state.stepPages.contact[i].userList = this.modelInfo.userList
				}
			}
		},
		ensure() {
			this.userArr = []
			let obj = {
				address: '',
				phone: '',
				email: '',
				penguin: '',
				wechat: ''
			}
			for(let i=0; i<this.modelInfo.classList.length; i++) {
				if(this.modelInfo.classList[i].name == '地址') {
					obj.address = this.modelInfo.classList[i].val
				}else if(this.modelInfo.classList[i].name == '电话') {
					obj.phone = this.modelInfo.classList[i].val
				}else if(this.modelInfo.classList[i].name == '邮箱') {
					obj.email = this.modelInfo.classList[i].val
				}else if(this.modelInfo.classList[i].name == 'QQ') {
					obj.penguin = this.modelInfo.classList[i].val
				}else if(this.modelInfo.classList[i].name == '微信') {
					obj.wechat = this.modelInfo.classList[i].val
				}
			}
			this.userArr.push(obj)

			this.$axios({
				method: 'post',
				url: '/api/Senior/savemessage',
				data: {
					id: this.$store.state.threeStep.siteId,
					text: this.userArr,
					type: 7
				}
			}).then((res)=> {
				if(res.data.code == '404') {
					// alert(res.data.msg)
				}
			})
			
			this.addUserEditToggle = true
		},
		addUserEditHandle(val) {
			if(val =='1') {
				this.addUserEditToggle = false
			}else{
				this.addUserEditToggle = true
			}
		},
		addList(val) {
			if(val == '1') {
				this.modelInfo.addUserToggle = true
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
							site_id: this.$store.state.threeStep.siteId,
              lmid: this.pid,
              type: 7,
              module: this.modelInfo
					}
				}).then((res)=> {
						if(res.data.code == '404') {
							alert(res.data.msg)
						}
				})
			}else {
				this.modelInfo.addUserToggle = false
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
							site_id: this.$store.state.threeStep.siteId,
              lmid: this.pid,
              type: 7,
              module: this.modelInfo
					}
				}).then((res)=> {
						if(res.data.code == '404') {
							alert(res.data.msg)
						}
				})
			}
		}
	}
}
</script>
 
<style lang="stylus" scoped>
@import '~styles/public'
.contact
	position: relative	
	transition: all .3s
	background-size: cover
	padding: 75px 0
	&:hover
		.addList
			opacity: 1
	.addList
		padding: 5px 0
		text-align: center
		opacity: 0
		transition: all .3s
		position: relative
		span
			background: $addbtnbg
			padding: $addbtnpadding
			border-radius: $addbtnradius
			font-size: $addbtnfontsize
			color: #fff
	.title
		margin: 0 auto 40px
		margin-top: 3px
		text-align: center
		.width96
			width: 96%
			max-width: 1170px
		h3
			margin: 0
			font-size: $fontsize1
			opacity: 0
			>>> .ql-editor
				padding: 5px
				font-size: $fontsize1
		h6
			margin: 0
			font-size: $fontsize2
			line-height: 24px
			opacity: 0
			>>> .ql-editor
				padding: 5px 
				font-size: $fontsize2
		.animated
			opacity: 1
	.addList
		span
			cursor: pointer
	.container
		.user
			position: relative
			flex: 1
			// min-height: 320px
			overflow: hidden
			opacity: 0
			// text-align: right
			max-width: 380px
			&:hover
				.edit-overlay
					.mask
						opacity: 1
			.inner
				width: 380px
				display: inline-block
				padding: 5px
				li
					margin-bottom: 10px
					&:last-child
						text-align: center
					input, textarea
						width: 100%
						height: 48px
						border: 1px solid $inputBorder
						// border: 1px solid #000
						border-radius: 5px
						text-indent: 12px
						font-size: 16px
					textarea
						padding: 5px
						height: 150px
						line-height: 24px
						text-indent: 7px
					button
						border: $allbtnborder
						background: $allbtnbg
						border-radius: $allbtnradius
						padding: $allbtnpadding
						font-size: $allbtnfontsize
						font-weight: bold
						color: $allbtnfontcolor
						white-space: nowrap
						&:hover
							background: $allbtnbghover
							border-color: $allbtnborderhover
							color: $allbtnfontcolorhover
			.edit-overlay
				position: absolute
				top: 0
				width: 100%
				height: 100%
				.mask
					background: $maskbg
					border: $maskborder
					border-radius: $maskradius
					height: 100%
					opacity: 0
					transition: all .3s
					span
						position: absolute
						left: 50%
						top: 50%
						transform: translate(-50%, -50%)
						background: $addbtnbg
						padding: $addbtnpadding
						border-radius: $addbtnradius
						color: #fff
						cursor: pointer
						font-size: $addbtnfontsize
				.editBox
					position: absolute
					left: 0 
					top: 0
					background: #2f2f2f
					border-radius: 3px
					width: 100%
					height: 100%
					h3
						margin: 10px 0 0
						line-height: 34px
						font-size: 22px
						color: #fff
						text-indent: 12px
					ul
						margin-top: 10px
						padding: 0 10px 0
						li
							margin-bottom: 10px
							display: flex
							input
								border: 1px solid 
								border-color: rgb(0, 0, 0) rgb(51, 51, 51) rgb(68, 68, 68)
								border-radius: 3px
								background: rgba(0, 0, 0, .45)
								width: 230px
								border: none
								height: 30px
								text-indent: 8px
								font-size: 12px
								color: #fff
							label
								width: 60px
								margin: 0
								color: #fff
								vertical-align: middle
								font-weight: normal
								line-height: 30px
								input
									width: auto
									height: inherit
									vertical-align: sub
								span
									vertical-align: middle
									font-size: 12px
					.btnWrap
						padding-left: 10px
						text-align: left
						button
							border: none
							background: #93b719
							border-radius: 5px
							padding: 6px 24px
							font-size: 12px
							font-weight: bold
							color: #fff
							white-space: nowrap
							&:hover
								background: #b3db2d
		.animated
			opacity: 1
	.width96
		width: 96%
		max-width: 1170px
	.layout1
		display: flex
		justify-content: space-around
		.addUser
			max-width: 390px
			width: 380px
			height: 90%
			min-height: 320px
			padding: 10px
			position: relative
			flex: 1
			opacity: 0
			&:hover
				.add-overlay
					.mask
						opacity: 1
			.content
				li
					display: flex
					margin-bottom: 10px
					line-height: 30px
					i
						flex: 1
						width: 25px
						max-width: 25px
						color: #fff
						font-size: 15px
						vertical-align: middle
					span
						flex: 1
						word-break: break-all
						line-height: 2
						color: #fff
						vertical-align: middle
						font-size: 15px
			.add-overlay
				.mask
					position: absolute
					background: $maskbg
					border: $maskborder
					border-radius: $maskradius
					left: 0 
					top: 0
					height: 100%
					width: 100%
					opacity: 0
					transition: all .3s
					i
						position: absolute
						right: 5px
						top: 5px
						background: $iconbg
						border-radius: $iconradius
						width: $iconwidth
						height: $iconheight
						font-size: $iconfontsize
						color: $iconcolor
						cursor: pointer
						text-align: center
					span
						position: absolute
						left: 50%
						top: 50%
						transform: translate(-50%, -50%)
						background: $addbtnbg
						padding: $addbtnpadding
						border-radius: $addbtnradius
						color: #fff
						cursor: pointer
						font-size: $addbtnfontsize
				.add-overlay-main
					position: absolute
					left: 0
					top: 0
					width: 100%
					background: #2f2f2f
					border-radius: 3px
					h3
						margin: 10px 0 0
						line-height: 36px
						color: #fff
						font-size: 20px
						text-indent: 12px
					ul
						margin-top: 10px
					li
						margin-bottom: 10px
						padding: 0 10px
						display: flex
						&:nth-of-type(1)
							input
								height: 52px
								line-height: 22px
						&:last-child
							margin-top: 10px
							text-align: center
						span
							width: 80px
							text-align: right
							color: #fff
							display: flex
							justify-content: center
							align-items: center
							background: rgb(80, 80, 80)
						input
							border: 1px solid rgb(80, 80, 80)
							background: rgba(0, 0, 0, .45)
							height: 36px
							text-indent: 8px
							width: 250px
							color: #fff
						textarea
							width: 250px !important
							height: 52px !important
							border: 1px solid rgb(80, 80, 80)
							background: rgba(0, 0, 0, .45)
							vertical-align: middle
							resize: none
							line-height: 26px
							text-indent: 12px
							color: #fff
						button
							border: none
							background: $editbtnbg
							border-radius: $editradius
							padding: $editbtnpadding
							margin-right: 5px
							font-size: $editbtnfontsize
							font-weight: bold
							color: $editbtnfontcolor
							white-space: nowrap
							&:hover
								background: $editbtnbghover
							&:last-child
								background: $editbtnbg2
								border: 1px solid 
								border-color: $editbtnbg2border
								position: relative
								&:hover
									background: $editbtnbghover2
		.animated
			opacity: 1
	.phoneClass
		display: block
		.user
			.inner
				width: 100%
		.addUser
			width: 100%
			padding: 5px
			margin-left: 0
.masking
	&:before
		content: ''
		display: block
		position: absolute
		background: rgba(65, 60, 60, 0.6)
		left: 0
		top: 0
		width: 100%
		height: 100%
.bgOne
	background: $modelBg02
	.container
		.user
			.inner
				li
					button
						border-color: rgba(80, 85, 92, 1)
						color: rgba(80, 85, 92, 1)
						&:hover
							background: rgba(80, 85, 92, 1)
							border-color: rgba(80, 85, 92, 1)
							color: #fff
	.layout1
		.addUser
			.content
				li
					i
						color: rgba(80, 85, 92, 1)
					span
						color: rgba(80, 85, 92, 1)
.bgTwo
	background: $modelBg03
	.title
		h3
			color: #fff
			.ql-editor
				color: #fff
		h6
			color: #fff
			.ql-editor
				color: #fff
.bgThree
	background: $modelBg01
	.container
		.user
			.inner
				li
					button
						border-color: rgba(80, 85, 92, 1)
						color: rgba(80, 85, 92, 1)
						&:hover
							background: rgba(80, 85, 92, 1)
							border-color: rgba(80, 85, 92, 1)
							color: #fff
	.layout1
		.addUser
			.content
				li
					i
						color: rgba(80, 85, 92, 1)
					span
						color: rgba(80, 85, 92, 1)
</style>