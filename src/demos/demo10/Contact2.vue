<template>
	<div 
		class="contact" 
		:class="modelInfo.bgClass" 
		v-bind:style="{backgroundImage: 'url(' + modelInfo.bgImg + ')' }"
		ref="contact2" 
	>
		<fn-assembly
			:btnChoice="btnChoice"
			:zBg="zBg"
			:zImg="zImg"
			:widthNum="widthNum"
			:heightNum="heightNum"
			:postbg="modelInfo.bgClass"
			:postImg="modelInfo.bgImg"
			:updownSpace="modelInfo.updownspace"
			:maskingToggle="modelInfo.maskingToggle"
			@getDataBg="getDataBg"
			@getUpdownspace="getUpdownspace"
			@getMasking="getMasking"
			v-if="allEditToggle"
		></fn-assembly>
		<div 
			class="contact-inner" 
			:class="{ masking: modelInfo.maskingToggle }"
			:style="{ padding: modelInfo.updownspace }"
		>
		<div class="title" v-if="allEditToggle">
			<div class="container" :class="{ width96: allEditToggle }">
				<h3 @click="getIndex('t')" :style="{ opacity: opacityNum }">
					<fn-editor :content="modelInfo.modularName" :type1="7" :type2="1" :lmid="pid"></fn-editor>
				</h3>
				<h6  @click="getIndex('c')" :style="{ opacity: opacityNum }">
					<fn-editor :content="modelInfo.modularNameFu" :type1="7" :type2="2" :lmid="pid"></fn-editor>
				</h6>
			</div>
		</div>		
		<div class="title" v-else>
			<div class="container">
				<h3 :class="{animated: isanimated1, bounceInUp: isfade1}" v-html="modelInfo.modularName"></h3>
				<h6 :class="{animated: isanimated1, bounceInUp: isfade1}" v-html="modelInfo.modularNameFu"></h6>
			</div>
		</div>
		<div class="content container layout1" :class="{phoneClass: phoneToggle, width96: allEditToggle}">
			<div :class="{animated: isanimated2, slideInLeft: isfade2}" class="user" :style="{ opacity: opacityNum }">
				<ul class="inner">
					<li v-for="(item, index) in modelInfo.userList" v-if="item.onoff">
						<input 
							type="text" 
							:placeholder="item.bindName" 
							v-model="item.bindName"
							v-if="item.name != '留言' && item.name != '提交'"
						>
						<textarea 
							v-else-if="item.name == '留言' && item.name != '提交'" 
							:placeholder="item.bindName"
							v-model="item.bindName"
						></textarea>
						<button @click="submit" v-else>{{ item.bindName }}</button>
					</li>
					<!-- <li><button>{{ modelInfo.userList[4].bindName }}</button></li> -->
				</ul>
				<div class="edit-overlay" v-if="allEditToggle">
					<div v-if="userToggle" class="mask">
						<div>
							<div class="mask" >
								<span @click="userHandel('1')">编辑</span>
							</div>
						</div>
					</div>
					<div class="editBox" v-else>
						<h3>表单字段</h3>
						<ul>
							<li v-for="item in modelInfo.userList">
								<label v-if="item.name != '提交'">
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
							<!-- <button>保存</button> -->
							<button @click="userHandel('0')">确定</button>
						</div>
					</div>
				</div>
			</div>
			<div :class="{animated: isanimated2, slideInRight: isfade2}" class="addUser" v-if="modelInfo.addUserToggle" :style="{ opacity: opacityNum }">
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
			isanimated1: false,
			isfade1: false,
			isanimated2: false,
			isfade2: false,
			phoneToggle: false,
			widthNum: '1920',
			heightNum: '1080',
			userArr: [],
			opacityNum: 0,
			imgList: [],
			displayToggle: false,
			classBg: '',
			btnChoice: 4,
			indexes: '',
			address: '',
			phone: '',
			email: '',
			penguin: '',
			wechat: '',
			userToggle: true,
			addUserToggle: false,
			addUserEditToggle: true,
			modelInfo: '',
			zBg: ["bgOne", "bgTwo", "bgThree"]
		}
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			zImg: state => state.stepPages.bannerList,
			browserToggle: state => state.browserToggle
		})
	},
	mounted() {
		for(let i=0; i<this.$store.state.stepPages.contact.length; i++) {
			if(this.$store.state.stepPages.contact[i].lmid == this.pid) {
				this.modelInfo = this.$store.state.stepPages.contact[i]
				this.classBg = this.$store.state.stepPages.contact[i].bgClass
			}
		}
		this.fromemailFn()
		// window.addEventListener('scroll', this.handleScroll2);
    if(!this.browserToggle) {
      this.phoneToggle = true
    }
    this.$nextTick(function(){
      this.handleScroll()
    })
    window.addEventListener('scroll', this.handleScroll)
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
      	let htmlT = this.$refs.contact2.getBoundingClientRect().top
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
		handleScroll2 () {
			let oldscrollY2 = $(".b_contact").offset().top;
		    let scrollY2 = window.scrollY;
		    let cha2 = scrollY2 - oldscrollY2
		    $(".b_contact").css("background-position",'0 '+(-cha2/5)+'px')
		    // console.log(oldscrollY2)
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
		fromemailFn() {
			if(this.$store.state.threeStep.address != "" || this.$store.state.threeStep.telephone != "" || this.$store.state.threeStep.email != "" || this.$store.state.threeStep.penguin != "" || this.$store.state.threeStep.wechat != "") {
				this.addUserToggle = false
			}else {
				this.addUserToggle = true
			}
		},
		getDataBg(data) {
			// this.classBg = data
			for(let i=0; i<this.$store.state.stepPages.contact.length; i++) {
				if(this.$store.state.stepPages.contact[i].lmid == this.pid) {
					// this.$store.state.stepPages.contact[i].bgClass = val
					if(data[0] == '0') {
						this.$store.state.stepPages.contact[i].bgClass = data[1]
  					this.$store.state.stepPages.contact[i].bgImg = ''
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
  							this.$store.state.stepPages.contact[i].bgClass = data[1]
  						}else {
  							alert(res.data.msg)
  						}
  					})
					}else {
						this.$store.state.stepPages.contact[i].bgClass = ''
  					this.$store.state.stepPages.contact[i].bgImg = data[1]
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
  								this.$store.state.stepPages.contact[i].bgImg = res.data.data[0].url
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
			}else {
				this.userToggle = true
				for(let i=0; i<this.$store.state.stepPages.contact.length; i++) {
					if(this.$store.state.stepPages.contact[i].lmid == this.pid) {
						this.$store.state.stepPages.contact[i].userList = this.modelInfo.userList
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
			this.addUserEditToggle = true
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
					alert(res.data.msg)
				}
			})
		},
		addUserEditHandle(val) {
			if(val == '1') {
				this.addUserEditToggle = false
			}else{
				this.addUserEditToggle = true
			}
		},
		addList(val) {
			if(val == '1') {
				// this.addUserToggle = true
				for(let i=0; i<this.$store.state.stepPages.contact.length; i++) {
					if(this.$store.state.stepPages.contact[i].lmid == this.pid) {
						this.$store.state.stepPages.contact[i].addUserToggle = true
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
			}else {
				// this.addUserToggle = false
				for(let i=0; i<this.$store.state.stepPages.contact.length; i++) {
					if(this.$store.state.stepPages.contact[i].lmid == this.pid) {
						this.$store.state.stepPages.contact[i].addUserToggle = false
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
	}
}
</script>
 
<style lang="stylus" scoped>
@import '~styles/public'
.contact
	position: relative	
	transition: all .3s
	background-size: cover
	background-attachment:fixed
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
		z-index: 10000
		span
			background: $addbtnbg
			padding: $addbtnpadding
			border-radius: $addbtnradius
			font-size: $addbtnfontsize
			color: #fff
	.title
		margin: 0 auto 25px
		margin-top: 3px
		.width96
			width: 96%
			max-width: 1170px
		h3
			margin: 0
			font-size: $fontsize1
			opacity: 0
			>>> .ql-editor
				padding: 0px
				font-size: $fontsize1
		h6
			margin: 0
			font-size: $fontsize2
			line-height: 24px
			opacity: 0
			>>> .ql-editor
				padding: 0px 
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
			max-width: 394px
			padding: 7px
			text-align: center
			&:hover
				.edit-overlay
					.mask
						opacity: 1
			.inner
				width: 380px
				padding: 0 5px 5px
				display: inline-block
				li
					// margin-bottom: 10px
					padding: 5px 0
					input, textarea
						width: 100%
						height: 48px
						border: 1px solid rgb(187, 187, 187)
						// border: 1px solid #000
						border-radius: 5px
						border: none
						text-indent: 12px
						font-size: 16px
					textarea
						padding: 5px
						height: 150px
						line-height: 24px
						text-indent: 7px
					button
						border: $allbtnborder2
						background: none
						border-radius: $allbtnradius
						padding: $allbtnpadding
						font-size: $allbtnfontsize
						font-weight: $allbtnfontweight
						color: $allbtnfontcolor2
						white-space: nowrap
						margin:0 auto
						display:block
						&:hover
							background: $allbtnbghover2
							border-color: $allbtnborderhover2
							color: $allbtnfontcolorhover2
			.edit-overlay
				position: absolute
				top: 0
				left: 0
				width: 100%
				height: 100%
				text-align: left
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
						font-size: $addbtnfontsize
						color: #fff
						cursor: pointer
				.editBox
					position: absolute
					left: 0 
					top: 0
					background: rgb(47, 47, 47)
					width: 100%
					height: 100%
					border-radius: 3px
					h3
						margin: 10px 0 0
						line-height: 46px
						font-size: 22px
						color: #fff
						text-indent: 12px
					ul
						margin-top: 10px
						padding: 0 10px 0
						li
							margin-bottom: 8px
							display: flex
							input
								border: 1px solid
								border-color: rgb(0, 0, 0) rgb(51, 51, 51) rgb(68, 68, 68)
								background: rgba(0, 0, 0, .45)
								border-radius: 3px
								height: 30px
								text-indent: 8px
								color: #fff
								font-size: 12px
								line-height: 30px
							label
								width: 60px
								line-height: 28px
								margin: 0
								color: #fff
								vertical-align: middle
								font-weight: normal
								input
									height: inherit
									vertical-align: sub
									margin: 0
								span
									vertical-align: middle
									font-size: 12px
					.btnWrap
						margin-top: 15px
						padding-left: 10px
						text-align: left
						button
							border: none
							background: #93b719
							border-radius: 5px
							padding: 6px 20px
							font-size: 13px
							font-weight: bold
							color: #fff
							white-space: nowrap
							margin:0 auto
							&:hover
								background: #b3db2d
		.animated
			opacity: 1 !important
	.width96
		width: 96%
		max-width: 1170px
	.layout1
		display: flex
		justify-content: space-around
		.addUser
			max-width: 400px
			max-height: 340px
			padding: 7px
			position: relative
			flex: 1
			opacity: 0
			&:hover
				.add-overlay
					.mask
						opacity: 1
			.content
				min-height: 324px
				padding: 7px
				background: rgba(255, 255, 255, .7)
				margin: 0 auto
				li
					margin-bottom: 10px
					line-height: 32px
					display: flex
					i
						flex: 1
						width: 30px
						max-width: 30px
						color: #000
						font-size: 16px
						vertical-align: middle
					span
						flex: 1
						word-break: break-all
						line-height: 2.2
						color: #333
						vertical-align: middle
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
						font-size: $addbtnfontsize
						color: #fff
						cursor: pointer
				.add-overlay-main
					position: absolute
					left: 0
					top: 0
					height: 100%
					width: 100%
					background: #2f2f2f
					border-radius: 3px
					h3
						margin: 10px 0 0
						line-height: 46px
						color: #fff
						font-size: 22px
						text-indent: 12px
					ul
						margin-top: 10px
					li
						padding: 0 10px
						margin-bottom: 10px
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
							background: rgb(80, 80, 80)
							border-radius: 2px 0 0 2px
							text-align: right
							color: #fff
							display: flex
							justify-content: center
							align-items: center
							font-size: 12px
						input
							border: 1px solid rgb(80, 80, 80)
							border-radius: 0 2px 2px 0
							height: 30px
							text-indent: 6px
							width: 250px
							background: rgba(0, 0, 0, .45)
							color: #fff
						textarea
							width: 250px !important
							height: 52px !important
							border: none
							vertical-align: middle
							resize: none
							line-height: 26px
							text-indent: 6px
							border: 1px solid rgb(80, 80, 80)
							background: rgba(0, 0, 0, .45)
							color: #fff
						button
							margin-right: 5px
							border: none
							background: $bgColor
							border-radius: 3px
							padding: 6px 20px
							font-size: 12px
							font-weight: bold
							color: #fff
							white-space: nowrap
							background: #93b719
							&:hover
								background: #b3db2d
							&:last-child
								border: 1px solid
								background: #525252
								border-color: rgba(255, 255, 255, .25) rgb(82, 82, 82) rgb(82, 82, 82)
								position: relative
								&:hover
									background: #747272
		.animated
			opacity: 1 !important
	.phoneClass
		display: block
		.user
			.inner
				width: 100%
		.addUser
			width: 100%
			padding: 5px
			margin-left: 0
.contact-inner
	padding: 30px 0
.masking
	&:before
		content: ''
		display: block
		background: rgba(65, 60, 60, .6)
		position: absolute
		left: 0
		top: 0
		width: 100%
		height: 100%
.bgOne
	background: #ccc
.bgTwo
	background: #383f48
	.container
		.user
			.inner
				li
					button
						border: $allbtnborder
						color: $allbtnfontcolor
						&:hover
							background: $allbtnbghover
							color: $allbtnfontcolorhover
	.title
		h3
			color: #fff
			>>> .ql-editor
				color: #fff
		h6
			color: #fff
			>>> .ql-editor
				color: #fff
.bgThree
	background: #fff
</style>