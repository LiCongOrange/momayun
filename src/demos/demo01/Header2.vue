<template>
	<div 
		class="header" 
		id="header2" 
		:class="{mleft:this.$store.state.isNavToggle}" 
		:style="{ background: modelInfo.bgColor, backgroundImage: 'url(' + modelInfo.bgImg + ')' }"
	>
<!-- 		<fn-assembly
			:btnChoice="btnChoice"
			:hzLetter="headlayout" 
			@getHeadlayout="getHeadlayout"
			v-if="allEditToggle"
		></fn-assembly> -->
		<div class="container">
		  	<nav 
		  		class="navbar navbar-default"
		  		:class="{ 'navbar-fixed-top': this.navFixed,  active: this.$store.state.isNavToggle, opacityStyle: isOpacity}"
		  	>
		  		<div class="navWrap">
			  		<div class="navbar-header">
			  			<button 
			  				class="navbar-toggle" 
			  				type="button" 
			  				data-toggle="collapse"
			  				data-target="#example-navbar-collapse"
			  			>
			  				<span class="sr-only">切换导航</span>
			  				<span class="icon-bar"></span>
			  				<span class="icon-bar"></span>
			  				<span class="icon-bar"></span>
			  			</button>
			  			<div class="nav-logo">
			  				<!-- <a :href="modelInfo.link" :target="modelInfo.target">{{modelInfo.text || modelInfo.default}}</a>
			  				<div v-if="this.$store.state.allEditToggle" class="mask"><span @click="toEditor">编辑</span></div>
			  				<btn-editor
									v-if="btnEditorToggle"
									:content="modelInfo.text || modelInfo.default"
									@getContent="getContent"
								></btn-editor> -->
			  				<div class="text-wrap" v-if="allEditToggle">
			  					<h5>
			  						<fn-editor :content="modelInfo.wsname || '站点名称'" :type1="0"></fn-editor>
			  					</h5>
			  				</div>
			  				<div class="text-wrap" v-else>
			  					<h5 v-if="modelInfo.wsname != ''" v-html="modelInfo.wsname"></h5>
			  				</div>
			  			</div>
			  		</div>
			  		<div class="collapse navbar-collapse" id="example-navbar-collapse">
			  			<ul class="nav navbar-nav" v-if="pageToggle">
			  				<li 
			  					v-for="(item, index) in columnList1" 
			  					:style="{ padding: modelInfo.paddingNum }"
			  					v-if="item.type !== 'header' && item.type != 'details' && item.type != 'footer'"
									:key="index"
			  				>
			  					<div v-if="jumpToggle">
				  					<a 
				  						v-if="item.type != 'outerchain'" 
				  						:href="'#'+index"
				  						@click="goAnchor(index)"
				  						:class="{acolor:isOpacity}"
				  						:style="{ color: headfontcolor, fontSize: modelInfo.fontSize}"
				  					>{{item.name}}</a>	
				  					<a 
				  						v-if="item.type == 'outerchain'"
				  						:href="item.link"
				  						:target="item.openmode"
				  						:class="{acolor:isOpacity}"
				  						:style="{ color: headfontcolor, fontSize: modelInfo.fontSize }"
				  					>{{item.name}}</a>
			  					</div>
			  				</li>
			  			</ul>
			  			<ul class="nav navbar-nav" v-else> 
			  				<li 
			  					v-for="(item, index) in columnList2" 
			  					:style="{ padding: modelInfo.paddingNum }"
			  					v-if="item.type !== 'header' && item.type != 'details' && item.type != 'footer'" 
									:key="index"
			  				>
			  					<div>
			  						<a 
			  							v-if="item.type != 'outerchain'" 
			  							href="javascript:;"
			  							@click="toPageHandel(index, item.name)"
			  							:class="{acolor:isOpacity}"
				  						:style="{ color: headfontcolor, fontSize: modelInfo.fontSize}"
			  						>{{ item.name }}</a>
				  					<a 
				  						v-if="item.type == 'outerchain'"
				  						:href="item.link"
				  						:target="item.openmode"
				  						:class="{acolor:isOpacity}"
				  						:style="{ color: headfontcolor, fontSize: modelInfo.fontSize }"
				  					>{{item.name}}</a>
			  					</div>
			  				</li>
			  			</ul>
			  		</div>
		  		</div>
				  <div class="footbg" :style="{ background: modelInfo.bgColor }">
				  	<img :src="modelInfo.picurl">
				  	<div class="logo-mask" v-if="allEditToggle">
				  		<span @click="upImgHandel">编辑</span>
				  	</div>
				  </div>
		  	</nav>
	  </div>
		<img-layer 
			v-if="imgReplaceToggle" 
			:imgTu="modelInfo.picurl"
			:widthNum="widthNum"
			:heightNum="heightNum"
			@getImg="getImg"
			@onoff="onoff"
		></img-layer>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import FnAssembly from '@/common/Assembly'
import btnEditor from '@/common/BtnEditor'
import FnEditor from '@/common/Editor'
import imgLayer from '@/common/Imglayer'
export default {
	props: ['navFixed', 'pid'],
	components: {
		btnEditor,
		FnEditor,
		FnAssembly,
		imgLayer
	},
	data () {
		return {
			imgList: [],
			widthNum: '80',
			heightNum: '80',
			imgReplaceToggle: false,
			btnChoice: '6',
			columnList: '',
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
    this.$nextTick(function(){
      window.addEventListener('scroll', this.onScroll);
      this.onScroll();
    })
  	if(!this.browserToggle) {
  		$('#header2').find('div#example-navbar-collapse').addClass('ullist-bg')
  		$('#header2').find('div.navbar-header').css('display', 'block')
  	}
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			jumpToggle: state => state.jumpToggle,
			pageToggle: state => state.pageToggle,
			columnList1: state => state.threeStep.columnList,
			columnList2: state => state.threeStep.columnList2,
			browserToggle: state => state.browserToggle,
			siteId: state => state.threeStep.siteId,
			headfontcolor: state => state.headfontcolor,
			headlayout: state => state.headlayout,
			headText: state => state.stepPages.head
		})
	},
	methods: {
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
        		this.headText[i].bgColor = ''
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
		onoff() {
			this.imgReplaceToggle = false
		},
		upImgHandel() {
			this.imgReplaceToggle = true
		},
		fnEdit(val) {
			for(let i=0; i<this.headText.length; i++) {
    		this.headText[i].wsname = val
    	}
			// this.modelInfo.wsname = val
      this.$axios({
        method: 'post',
        url: '/api/Senior/savemodule',
        // url: '/api/Senior/saveHead',
        data: {
          site_id: this.siteId,
          type: 'head',
          module: {
          	wsname: val
          }
        }
      }).then((res)=> {
        if(res.data.code == '404') {
          alert(res.data.msg)
        }
      })
		},
		toPageHandel(index, name) {
			this.$store.state.sonPagetoggle = true
			this.$store.commit('pageIndexHandel', index)
			this.$store.commit('pageNameHandel', name)
  		for(let i=0; i<this.columnList2.length; i++) {
  			this.columnList2[i].checked = false
  		}
  		this.columnList2[index].checked = true
		},
		goAnchor(index) {
			for(let i=0; i<this.$store.state.threeStep.columnList.length; i++) {
				this.$store.state.threeStep.columnList[i].checked = false
				this.$store.state.threeStep.columnList[i].editOnoff1 = true
			}
			this.$store.state.threeStep.columnList[index].checked = true
			const jumpItem = document.querySelectorAll('.jump')
			let jumpTop = jumpItem[index].offsetTop - 40 + 'px'
			$("html,body").animate({ scrollTop: jumpTop}, 400, 'linear');
		},
		onScroll: function () {
			let scrollT = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset
			if(scrollT > 50) {
				this.isOpacity = true
			}else {
				this.isOpacity = false
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.header
	// position:absolute
	position: relative
	background: transparent
	// left:220px
	left: 0
	right:0
	// min-height: 106px
	display: flex
	z-index: 1500
	border-bottom: 1px solid #ccc
	transition: all .3s
	background-size: cover
	background-attachment: fixed
	.container
		flex: 1
	.footbg
		width: 50px
		height: 50px
		position: absolute
		left: 50%
		bottom: 0
		transform: translate(-50%, 50%)
		background: #fff
		padding: 7px
		border-radius: 50%
		display: flex
		border-bottom: 2px solid #ccc
		// background: url('/static/images/head/headbg.png') no-repeat
		// background-size: cover
		// background-position: left bottom
		text-align: center
		&:hover
			.logo-mask
				opacity: 1
		.logo-mask
			background: rgba(0, 0, 0, 0.7)
			position: absolute
			left: 0
			top: 0
			width: 100%
			height: 100%
			border-radius: 50%
			display: flex
			align-items: center
			justify-content: center
			transition: all .3s
			opacity: 0
			span
				color: #fff
				cursor: pointer
		img
			flex: 1
			width: 51%
	.ullist-bg
		background: rgba(0, 0, 0, 0.35) !important
		ul
			li
				a
					color: #fff !important
	.navWrap
		// height: 50px
		transition: all .3s
		background: transparent
	.navbar
		background: none
		border: none
		transition: all .3s
		z-index: 1
		padding: 0 0 14px
		.navbar-header
			text-align: center
			float:none
			.nav-logo
				position: relative
				font-size: 22px
				display: inline-block
				.text-wrap
					h5
						margin-bottom: 0
						min-width: 150px
						font-size: 40px
						color: #333
						>>> .ql-editor
							font-size: 40px
							padding: 0
							line-height: 1.1
							overflow-y: hidden
				a
					color: white
					text-decoration:none
					font-size:40px
					display:block
				&:hover
					.mask
						opacity: 1
				.mask
					position: absolute
					left: 0
					top: 0
					height: 100%
					width: 100%
					background: rgba(0, 0, 0, .5)
					opacity: 0
					transition: all .3s
					span
						background: #000
						padding: 5px
						color: #fff
						font-size: 14px
						cursor: pointer
				>>> .btnEditor
					left: 0
					transform: translateX(0)
					line-height: 0
					.editorWrap
						transform: translateY(0)
						.editor-btn
							button
								&:nth-of-type(2)
									display: none
								
		.navbar-collapse
			overflow: hidden
			background:transparent
			text-align:center
			.navbar-nav
				display:inline-block
				float:none
				margin:0 auto
				li
					position: relative
					padding: 0 18px
					line-height: 30px
					
					&:hover
						p
							opacity: 1
					a
						color: #333
						text-decoration:none
						transition: all .5s
						font-size:16px
						font-family:'微软雅黑'
						&:hover
							color:$fontColorhover
							opacity:1
							font-size:16px
					.acolor
						color:#333 !important
					p
						background: #f2f2f2
						position: absolute
						width: 100%
						left: 0
						top: 40px
						margin: 0
						text-align: center
						opacity: 0
						transition: all .3s
						border-radius: 5px
						overflow: hidden
						box-shadow: 0 0 5px #666 inset
						a
							display: block
							line-height: 26px
					.navbar-btn
						margin: 0
						a
							float: left
							border: 1px solid #ccc
							padding: 3px 15px
							margin: 10px 10px 0 5px 
							color: $fontColor
							border-radius: 5px	
	.active
		left: 0
	.opacityStyle
		.navWrap
			background: rgba(255, 255, 255, 1)
			.nav-logo
				a
					color:#333
.mleft
	left:0
.navbar-fixed-top
	left: 220px
	box-shadow: 0 1px 5px rgba(0, 0, 0, .4)
	background: #fff !important
	.footbg
		background: #fff !important
		box-shadow: 0 1px 4px rgba(0, 0, 0, .6)
	.navbar-header
		display: none
	.navbar-collapse
		ul 
			li
				line-height: 30px !important
</style>