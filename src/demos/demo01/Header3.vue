<template>
	<div 
		class="header" 
		id="header3" 
		:class="{mleft:this.$store.state.isNavToggle, phoneclass: !browserToggle}" 
		:style="{ background: modelInfo.bgColor, backgroundImage: 'url(' + modelInfo.bgImg + ')' }"
	>
		<!-- <fn-assembly
			:btnChoice="btnChoice"
			:hzLetter="headlayout" 
			@getHeadlayout="getHeadlayout"
			v-if="allEditToggle"
		></fn-assembly> -->
		<div class="container">
		  	<nav 
		  		class="navbar navbar-default"
		  		:class="{'navbar-fixed-top': this.navFixed,'opacityStyle': isOpacity,active:this.$store.state.isNavToggle}"
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
			  			<div class="nav-logo" :class="{dis: this.navFixed}">
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
				  						@click="goAnchor(index)"
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
import imgLayer from '@/common/Imglayer'
export default {
	props: ['navFixed', 'pid'],
	components: {
		btnEditor,
		imgLayer,
		FnAssembly
	},
	data () {
		return {
			navlist: [],
			btnChoice: '6',
			imgList: [],
			widthNum: '160',
			heightNum: '80',
			imgReplaceToggle: false,
			columnList: '',
			pageToggle2: true,
			modelInfo: '',
			btnEditorToggle: false,
			isActive: false,
			isOpacity: false,
			editValue: this.navList
		}
	},
	mounted () {
		if(this.pageToggle) {
			this.columnList = this.columnList1
		}else {
			this.columnList = this.columnList2
		}
		for(let i=0; i<this.$store.state.stepPages.head.length; i++) {
			if(this.$store.state.stepPages.head[i].lmid == this.pid) {
				this.modelInfo = this.$store.state.stepPages.head[i]
			}
		}
	    this.$nextTick(function(){
	      window.addEventListener('scroll', this.onScroll);
	      this.onScroll();
	      if(this.pageToggle) {
	      	let nnn = this.columnList1.length/2
	      	// console.log(Math.floor(nnn))
	      	for(let i=0,len=this.columnList1.length;i<this.columnList1.length;i+=nnn) {
						this.navlist.push(this.columnList1.slice(i,i+nnn))
					}
	      }else {

	      }
	    })
	    // this.getSiteinfo()
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
		upImgHandel() {
			this.imgReplaceToggle = true
		},
		onoff() {
			this.imgReplaceToggle = false
		},
		getSiteinfo() {
      var urlSearch = window.location.search
      // var siteArr = urlSearch.split("&")
      var siteArr = urlSearch.split("?")[1].split("&")
      var siteId = siteArr[0]
      var pageId = siteArr[1]
      if(pageId == '2') {
        this.pageToggle2 = false
      }else {
        this.pageToggle2 = true
      }
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
		getContent(val) {
			if(val == 'false') {
				this.btnEditorToggle = false
			}else {
				for(let i=0; i<this.$store.state.stepPages.head.length; i++) {
					if(this.$store.state.stepPages.head[i].lmid == this.pid) {
						this.$store.state.stepPages.head[i].text = val.text
						this.$store.state.stepPages.head[i].link = val.link
						if(val.onOff) {
							this.$store.state.stepPages.head[i].target = '_blank'
						}else {
							this.$store.state.stepPages.head[i].target = '_self'
						}
					}
				}
				this.btnEditorToggle = false
			}
		},
		toEditor() {
			this.btnEditorToggle = true
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
	position: relative
	// position:absolute
	background: transparent
	// left:220px
	left: 0
	right:0
	transition: all .3s
	min-height: 106px
	display: flex
	z-index: 1500
	transition: all .3s
	background-size: cover
	background-attachment: fixed
	.navWrap
		height: 50px
		// background: rgba(255, 255, 255, 0.3) 
		transition: all .3s
		background: transparent
	.navbar
		// background: rgba(255, 255, 255, 0.3) 
		background: transparent
		border: none
		// left: 220px
		transition: all .3s
		z-index: 1
		.navbar-header
			// background: #fff
			text-align: center
			float:none
			.nav-logo
				position: relative
				font-size: 24px
				display: inline-block
				max-width: 150px
				.inner
					min-width: 150px
					min-height: 60px
					position: relative
					p
						display: flex
						justify-content: center
						align-items: center
						width: 100%
						height: 60px
						margin: 0
						font-size: 20px
						color: #7e867e
				img
					margin-top:10px
					width: auto
					max-height: 50px
					max-width: 150px
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
						position: absolute
						left: 50%
						top: 50%
						background: #000
						padding: 5px
						color: #fff
						font-size: 14px
						cursor: pointer
						display: inline-block
						transform: translate(-50%, -50%)
						
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
			.dis
				// display:none
		.navbar-collapse
			overflow: hidden
			background:transparent
			text-align:center
			padding: 0
			.navbar-nav
				display:inline-block
				float:none
				margin:0 auto
				li
					position: relative
					padding: 0 20px
					line-height: 50px
					&:hover
						p
							opacity: 1
					a
						font-size: 16px
						color: #333
						text-decoration:none
						opacity:.8
						&:hover
							color:$fontColorhover
							opacity:1
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
	.opacityStyle
		// background: black
		.navWrap
			background: white
			overflow:hidden
			height:auto
			transition:all 1s
	.navbar-fixed-top
		left:220px
		box-shadow: 0 1px 5px rgba(0, 0, 0, .4)
		.navbar-header
			display: none
	.active
		left: 0px
.mleft
	left:0
.phoneclass
	min-height: auto
	.container
		width: 100%
		.navbar
			.navbar-collapse
				background: #fff
				max-height: inherit
			.navbar-header
				display: flex
				align-items: center
				justify-content: space-between
				.nav-logo
					.inner
						min-height: auto
						img
							margin-top: 0
							max-height: 40px
</style>