<template>
	<div 
		class="header" 
		:class="{ 'fixed-top': this.navFixed, 'active': this.isNavToggle }"
		:style="{ background: modelInfo.bgColor, backgroundImage: 'url('+ modelInfo.bgImg +')' }"
	>
		<div class="container" :class="{ width96: allEditToggle }" v-if="browserToggle">
			<div class="login-wrap">

				<div class="text-wrap">
					<ul v-if="pageToggle">
						<li 
							v-for="(item, index) in columnList1" 
							v-if="item.type != 'header' && item.type != 'footer'"
							:style="{ padding: modelInfo.paddingNum }"
							:key="item.id"
							:class="{ actionClass: item.checked }"
						>
							<a 
								v-if="item.type != 'outerchain'"
								:href=" '#' + index " 
								v-text="item.name"
								@click="goAnchor(index)"
								:style="{ fontSize: modelInfo.fontSize, color: modelInfo.fontColor }"
							></a>
	  					<a 
	  						v-if="item.type == 'outerchain'"
	  						:href="item.link"
	  						:target="item.openmode"
	  						:class="{acolor:isOpacity}"
	  						:style="{ color: modelInfo.fontColor, fontSize: modelInfo.fontSize }"
	  					>{{item.name}}</a>
						</li>
					</ul>
					<ul v-else>
						<li 
							v-for="(item, index) in columnList2"
							v-if="item.type != 'header' && item.type != 'footer' && item.type != 'details'"
							:style="{ padding: modelInfo.paddingNum }"
							:key="item.id"
							:class="{ actionClass: item.checked }"
						>
							<a 
								v-if="item.type != 'outerchain'"
								href="javascript:;" 
								:style="{ fontSize: modelInfo.fontSize, color: modelInfo.fontColor }"
								@click="toPageHandel(index, item.name)"
							>{{ item.name }}</a>
	  					<a 
	  						v-if="item.type == 'outerchain'"
	  						:href="item.link"
	  						:target="item.openmode"
	  						:class="{acolor:isOpacity}"
	  						:style="{ color: headfontcolor, fontSize: modelInfo.fontSize }"
	  					>{{item.name}}</a>
						</li>
					</ul>
				</div>

				<div 
					class="btn-wrap" 
					:class="{ activeBorder: editToggle }" 
					v-if="modelInfo.btnToggle" 
					@mouseover="handleEditHover('01')" 
					@mouseleave="handleEditHover('02')"
				>
					<a 
						v-for="(item, index) in modelInfo.btnInfo"
						:href="item.link" 
						:target="item.target == '新页面' ? '_blank' : '_self' "
						:style="{ borderRight: index == modelInfo.btnInfo.length-1 ? 'none' : '1px solid #a9a9a9'}"
					>{{ item.text }}</a>
					<el-button 
						v-if="editToggle" 
						@click="handleEditBtn" 
						class="editBtn" 
						size="mini" 
						icon="el-icon-edit" 
						plain
					>编辑</el-button>

				</div>
				<div class="addbtn" v-else>
					<span @click="addbtnHandel" v-if="allEditToggle">添加按钮</span>
				</div>

			</div>
	  </div>

	  <div v-else class="phone-warp">
	  	<div class="phone-toggle">
	  		<div class="iconfont" @click="phonenavHandle">&#xe653;</div>
	  	</div>
	  	<div class="phone-title" v-if="modelInfo.picurl">
	  		<img :src="modelInfo.picurl">
	  	</div>
	  	<div class="phone-nav" :class="{ 'phoneshow': phonenavToggle }">
	  	<!-- <transition name="fade" :class="{ 'phoneshow': phonenavToggle }"> -->
	  		<ul v-if="pageToggle">
	  			<li v-for="(item, index) in columnList1" v-if="item.type != 'header' && item.type != 'footer'" :key="index">
	  				<a :href=" '#' + index " @click="goAnchor(index)">{{ item.name }}</a>
	  			</li>
	  			<li class="btninfo">
	  				<a :href="modelInfo.btnInfo.link" :target="modelInfo.btnInfo.target">{{ modelInfo.btnInfo.text }}</a>
	  			</li>
	  		</ul>
	  		<ul v-else>
					<li 
						v-for="(item, index) in columnList2"
						v-if="item.type != 'header' && item.type != 'footer' && item.type != 'details'"
						:key="index"
					>
						<a 
							href="javascript:;" 
							@click="toPageHandel(index, item.name)"
						>{{ item.name }}</a>
					</li>
					<li class="btninfo">
						<a 
							v-for="(item, index) in modelInfo.btnInfo"
							:href="item.link" 
							:target="item.target == '新页面' ? '_blank' : '_self' "
							:style="{ borderRight: index == modelInfo.btnInfo.length-1 ? 'none' : '1px solid #a9a9a9'}"
						>{{ item.text }}</a>
						<!-- <a :href="modelInfo.btnInfo.link" :target="modelInfo.btnInfo.target">{{ modelInfo.btnInfo.text }}</a> -->
					</li>
	  		</ul>
	  	<!-- </transition> -->
	  	</div>
	  </div>

	</div>
</template>

<script>
import { mapState } from 'vuex'
import upImg from '@/common/UpImg'	
import EditBtn from '@/common/EditBtn'

export default {
	props: ['pid', 'navFixed'],
	components: {
		upImg,
		EditBtn
	},
	data () {
		return {
			editToggle: false,
			dialogVisible: false,
			phonenavToggle: false,
			imgList: [],
			widthNum: '160',
			heightNum: '80',
			imgReplaceToggle: false,
			activeToggle: '',
			pageToggle2: true,
			modelInfo: '',
			btnEditorToggle: false,
			isActive: false,
			isOpacity: false,
			editValue: this.navList
		}
	},
	mounted () {
		for(let i=0; i<this.$store.state.stepPages.head.length; i++) {
			if(this.$store.state.stepPages.head[i].lmid == this.pid) {
				this.modelInfo = this.$store.state.stepPages.head[i]
			}
		}
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			isNavToggle: state => state.isNavToggle,
			jumpToggle: state => state.jumpToggle,
			pageToggle: state => state.pageToggle,
			columnList1: state => state.threeStep.columnList,
			columnList2: state => state.threeStep.columnList2,
			browserToggle: state => state.browserToggle,
			siteId: state => state.threeStep.siteId,
			headfontcolor: state => state.headfontcolor,
			phoneToggle: state => state.phoneToggle,
			headText: state => state.stepPages.head
		})
	},
	methods: {
		handleEditBtn() {
			this.$store.commit('dialogVisibleHandle', true)
			let obj = {
				content: this.modelInfo.btnInfo,
				pid: this.pid,
				pageType: '0'
			}
			this.$store.commit('dialogVisibleBtnDataHandle', obj)
		},
		handleEditHover(type) {
			if(this.allEditToggle) {
				if(type == '01') {
					this.editToggle = true
				}else {
					this.editToggle = false
				}
			}
		},
		phonenavHandle() {
			this.phonenavToggle = !this.phonenavToggle
		},
		toPageHandel(index, name) {
			this.$store.state.sonPagetoggle = true
			this.phonenavToggle = false
			this.$store.commit('pageIndexHandel', index)
			this.$store.commit('pageNameHandel', name)
	  		for(let i=0; i<this.columnList2.length; i++) {
	  			this.columnList2[i].checked = false
	  		}
	  		this.columnList2[index].checked = true
		},
		addbtnHandel() {
			this.modelInfo.btnToggle = true
      this.$axios({
        method: 'post',
        url: '/api/Senior/savemodule',
        data: {
          site_id: this.siteId,
          type: 'head',
          module: this.modelInfo
        }
      }).then((res)=> {
        if(res.data.code == '404') {
          alert(res.data.msg)
        }
      })
		},
		getContent(val) {
			if(val == 'true') {
				this.dialogVisible = true
			}else if(val == 'delete') {
				this.modelInfo.btnToggle = false
	      this.$axios({
	        method: 'post',
	        url: '/api/Senior/savemodule',
	        data: {
	          site_id: this.siteId,
	          type: 'head',
	          module: this.modelInfo
	        }
	      }).then((res)=> {
	        if(res.data.code == '404') {
	          alert(res.data.msg)
	        }
	      })
			}else {
				this.modelInfo.btnInfo.link = val.link
				this.modelInfo.btnInfo.text = val.text
				if(val.onOff) {
					this.modelInfo.btnInfo.target = "_blank"
				}else {
					this.modelInfo.btnInfo.target = "_self"
				}
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.siteId,
  					type: 'head',
  					module: this.modelInfo
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}
		},
		getImg(val) {
      this.imgList = []
      let obj = {
        url: val
      }
      this.imgList.push(obj)
      this.$axios({
        method: 'post',
        url: '/api/upload/imgsUpload',
        data: this.imgList
      }).then((res)=> {
        if(res.data.code == '200') {
        	for(let i=0; i<this.headText.length; i++) {
        		this.headText[i].picurl = res.data.data[0].url
        	}
          this.$axios({
            method: 'post',
            url: '/api/Senior/saveHead',
            data: {
              site_id: this.siteId,
              headText: {
              	logo: res.data.data[0].url
              }
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
		},
		goAnchor(index) {
			this.phonenavToggle = false
			for(let i=0; i<this.$store.state.threeStep.columnList.length; i++) {
				this.$store.state.threeStep.columnList[i].checked = false
				this.$store.state.threeStep.columnList[i].editOnoff1 = true
			}
			this.$store.state.threeStep.columnList[index].checked = true
			const jumpItem = document.querySelectorAll('.jump')
			let jumpTop = jumpItem[index].offsetTop - 40 + 'px'
			$("html,body").animate({ scrollTop: jumpTop}, 400, 'linear');
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.header
	transition: all .3s
	z-index: 1500
	position: relative
	.width96
		width: 96%
		max-width: 1170px
	.login-wrap
		display: flex
		align-items: center
		justify-content: space-between
		.text-wrap
			display: flex
			justify-content: space-around
			li
				display: inline-block
				line-height: 34px
				&:hover
					background: #0096E0
				a
					color: #333
			.actionClass
				background: #0096E0
		.btn-wrap
			display: flex
			position: relative
			padding: 3px 0
			border: 1px solid rgba(0, 0, 0, 0)
			.editBtn
				position: absolute
				left: 0
				top: 100%
			a
				border-right: 1px solid rgb(169, 169, 169)
				padding: 0 15px
				color: #fff
				font-size: 14px
				letter-spacing: 1px
				line-height: 14px
				overflow: hidden
				&:last-child
					border: none
				&:hover
					background: #000
					color: #fff
			>>> .btnEditor
				.editorWrap
					right: 0
					left: auto
		
		.activeBorder
			border-color: $maskeditbordercolor
		.addbtn
			span
				background: $addbtnbg
				padding: $addbtnpadding
				border-radius: $addbtnradius
				font-size: $addbtnfontsize
				color: $addbtncolor
				cursor: pointer
.fixed-top
	position: fixed
	right: 0
	top: 0
	left: 220px
.active
	left: 0
.phone-warp
	height: 60px
	padding: 10px
	.phone-toggle
		position: fixed
		left: 10px
		top: 10px
		text-align: center
		z-index: 10
		.iconfont
			width: 40px
			height: 40px
			background: rgba(34, 35, 36, .9)
			color: #fff
			font-size: 28px
	.phone-title
		text-align: center
		img
			max-height: 40px
	.phone-nav
		position: fixed
		top: 0
		left: 0
		right: 0
		max-height: 100%
		background: #fff
		padding-top: 50px
		transform: translateY(-100%)
		transition: all .3s
		ul
			padding: 0 24px
			overflow: auto
		li
			border-bottom: 1px solid #eee
			line-height: 47px
			text-indent: 32px
			a
				font-size: 16px
				color: #666
		.btninfo
			padding: 10px 0
			border: none
			text-indent: 0
			text-align: center
			a
				display: inline-block
				width: 50%
				border-right: 1px solid rgb(169, 169, 169)
				color: #000
				font-size: 16px
				&:last-child
					border: none
				&:hover
					background: #000
					color: #fff
	.phoneshow
		transform: translateZ(0)	
.fade-enter-active, .fade-leave-active
	transition: opacity .5s
.fade-enter, .fade-leave-to
	opacity: 0		
</style>