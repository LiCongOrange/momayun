<template>
	<div 
		class="header" 
		:class="activeToggle" 
		id="header1" 
		ref="header1" 
		:style="{ right: mobileright, background: modelInfo.bgColor, backgroundImage: 'url(' + modelInfo.bgImg + ')' }"
	>
		<div class="container" v-if="phoneToggle" :class="{ width96: allEditToggle }">
		  	<nav 
		  		class="navbar navbar-default"
		  		:class="{ 'navbar-fixed-top': this.navFixed, active: this.$store.state.isNavToggle }"
		  	>
		  		<div class="navWrap" :class="{ width96: allEditToggle, width1170: !allEditToggle }">
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
			  				<div class="img-wrap" v-if="allEditToggle">
			  					<div class="inner" v-if="modelInfo.picurl">
					  				<img :src="modelInfo.picurl">
					  				<div class="mask" v-if="allEditToggle">
					  					<span @click="upImgHandel">编辑</span>
					  				</div>
			  					</div>
			  					<div class="inner" v-else>
					  				<p>添加图片</p>
					  				<div class="mask" v-if="allEditToggle">
					  					<span @click="upImgHandel">编辑</span>
					  				</div>
			  					</div>
			  				</div>
			  				<div class="img-wrap" v-else>
			  					<div class="inner" v-if="modelInfo.picurl">
					  				<img :src="modelInfo.picurl">
			  					</div>
			  				</div>

			  				<div class="text-wrap" v-if="allEditToggle">
			  					<h5>
			  						<fn-editor :content="modelInfo.wsname || '站点名称'" :type1="0"></fn-editor>
			  					</h5>
			  				</div>
			  				<div class="text-wrap" v-else>
			  					<h5 v-html="modelInfo.wsname"></h5>
			  					<!-- <h5 v-else v-html="modelInfo.default"></h5> -->
			  				</div>
			  			</div>
			  		</div>
			  		<div class="collapse navbar-collapse" id="example-navbar-collapse">
			  			<ul class="nav navbar-nav" v-if="pageToggle">
			  				<li 
			  					v-for="(item, index) in columnList1" 
			  					v-if="item.type != 'header' && item.type != 'details' && item.type != 'footer'"
			  					:style="{ padding: modelInfo.paddingNum }"
									:key="index"
			  				>
			  					<div>
				  					<a 
				  						v-if="item.type != 'outerchain'"
				  						:href="'#'+index"
				  						@click="goAnchor(index)"
				  						:style="{ color: headfontcolor, fontSize: modelInfo.fontSize }"
				  					>{{item.name}}</a>	
				  					<a 
				  						v-if="item.type == 'outerchain'"
				  						:href="item.link"
				  						:target="item.openmode"
				  						:style="{ color: headfontcolor, fontSize: modelInfo.fontSize }"
				  					>{{item.name}}</a>	
			  					</div>
			  				</li>
			  			</ul>
			  			<ul class="nav navbar-nav" v-else> 
			  				<li 
			  					v-for="(item, index) in columnList2" 
			  					v-if=" item.type != 'header' && item.type != 'details' && item.type != 'footer'"
			  					:style="{ padding: modelInfo.paddingNum }"
									:key="index"
			  				>
			  					<div>
			  						<a 
			  							v-if="item.type != 'outerchain'"
			  							href="javascript:;"
			  							@click="toPageHandel(index, item.name)"
			  							:style="{ color: headfontcolor, fontSize: modelInfo.fontSize}"
			  						>{{ item.name }}</a>
				  					<a 
				  						v-if="item.type == 'outerchain'"
				  						:href="item.link"
				  						:target="item.openmode"
				  						:style="{ color: headfontcolor, fontSize: modelInfo.fontSize }"
				  					>{{item.name}}</a>
			  					</div>
			  				</li>
			  			</ul>
			  		</div>
		  		</div>
		  	</nav>
	  </div>
		
		<div class="mobile-wrap" v-else>
			<div class="btn-toggle">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>

		<img-layer 
			v-if="imgReplaceToggle" 
			:imgTu="modelInfo.picurl"
			:widthNum="widthNum"
			:heightNum="heightNum"
			@getImg="getImg"
			@onoff="onoff"
		></img-layer>
		<!-- <fn-assembly
			:btnChoice="btnChoice"
			:hzLetter="headlayout" 
			@getHeadlayout="getHeadlayout"
			v-if="allEditToggle"
		></fn-assembly> -->

	</div>
</template>

<script>
import { mapState } from 'vuex'
import FnAssembly from '@/common/Assembly'
import btnEditor from '@/common/BtnEditor'
import navBus from '@/assets/js/navBus.js'
import imgLayer from '@/common/Imglayer'
import FnEditor from '@/common/Editor'
export default {
	props: ['pid', 'navFixed'],
	components: {
		btnEditor,
		imgLayer,
		FnEditor,
		FnAssembly
	},
	data () {
		return {
			btnChoice: 6,
			imgList: [],
			widthNum: '160',
			heightNum: '80',
			imgReplaceToggle: false,
			columnList: '',
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
    this.$nextTick(function(){
      window.addEventListener('scroll', this.onScroll)
      this.onScroll()
    })
    if(this.isNavToggle) {
    	this.activeToggle = ''
    }else {
    	this.activeToggle = 'activer'
    }
    navBus.$on('navToggle2', (val)=> {
    	if(val) {
    		this.activeToggle = ''
    	}else {
    		this.activeToggle = 'activer'
    	}
    })
  	if(!this.browserToggle) {
  		$('#header1').find('div#example-navbar-collapse').addClass('ullist-bg')
  	}
  	if(!this.allEditToggle && !this.modelInfo.picurl) {
  		$('#header1').find('div.nav-logo').find('div.text-wrap').css('vertical-align', 'middle')
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
			mobileright: state => state.mobileright,
			headlayout: state => state.headlayout,
			headText: state => state.stepPages.head
		})
	},
	methods: {
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
          // this.modelInfo.picurl = res.data.data[0].url
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
		onScroll() {
			let scrollT = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset
			if(scrollT > 20) {
				$('#header1').addClass('backgroundWhite')
			}else {
				$('#header1').removeClass('backgroundWhite')
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.header
	position: relative
	z-index: 10
	right: 0
	left: 0
	transition: all .3s
	z-index: 1500
	padding: 10px 0
	transition: all .3s
	background-attachment: fixed
	background-size: cover
	// overflow-x: hidden
	>>> .layout-btn
		right: 5px
	.ullist-bg
		background: rgba(0, 0, 0, 0.35)
		ul
			li
				a
					color: #fff !important
	.container
		margin: 0 auto
		padding: 0
		// width: 100%
		.navWrap
			// height: 50px
			// width: 1170px
			margin: 0 auto
			transition: all .3s
			// width: auto
		.navbar
			border: none
			transition: all .3s
			z-index: 1
			background: none
			.navbar-header
				text-align: center
				.nav-logo
					padding: 0
					display: flex
					height: 50px
					align-items: center
					line-height: 50px
					font-size: 24px
					.img-wrap
						position: relative
						display: inline-block
						vertical-align: bottom
						.inner
							min-width: 150px
							&:hover
								.mask
									opacity: 1
							p
								margin: 0
								font-size: 20px
								color: #7e867e
					.text-wrap
						display: inline-block
						vertical-align: middle
						text-align: left
						h5
							margin: 0
							min-width: 120px
							font-size: 18px
							>>> .ql-editor
								font-size: 18px
								padding: 0px 3px
					img
						max-height: 50px
						width: auto
					.mask
						position: absolute
						left: 0
						top: 0
						width: 100%
						height: 100%
						background: rgba(0, 0, 0, 0.7)
						opacity: 0
						transition: all .3s
						span
							position: absolute
							left: 50%
							top: 50%
							line-height: initial
							background: #000
							padding: 5px 
							color: #fff
							font-size: 12px
							transform: translate(-50%, -50%)
							cursor: pointer
				.navbar-toggle
					z-index: 100
			.navbar-collapse
				overflow: hidden
				padding:0
				.navbar-nav
					float: right
					li
						position: relative
						padding: 0 20px
						line-height: 52px
						&:hover
							p
								opacity: 1
						a
							color: #333
							font-size: 16px
							&:hover
								color:$fontColorhover
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
	.width96
		// width: 96%
		max-width: 1170px
	.width1170
		max-width: 1170px
.navbar-fixed-top
	left: 220px
	background: #fff !important
	box-shadow: 0 1px 5px rgba(0, 0, 0, .4)
	.navbar-collapse
		ul
			li
				a
					color: #666 !important
	.navbar-header
		.nav-logo
			.text-wrap
				h5
					>>> .ql-editor
						color: #666
						.ql-font-serif
							color: #666 !important
.active
	left: 0
.activer
	left: 0
.backgroundWhite
	background: rgba(255, 255, 255, 1) !important
	.container
		.navbar
			.navbar-collapse
				.navbar-nav
					li
						a
							color: #666
.mobile-wrap
	display: inline-block
	.btn-toggle
		margin: 15px 0 0 15px
		width: 40px
		height: 40px
		background: #333
		display: flex
		flex-direction: column
		align-items: center
		padding: 9px 7px
		span
			height: 3px
			width: 100%
			background: #fff
			margin-bottom: 6px
			&:last-child
				margin: 0
</style>