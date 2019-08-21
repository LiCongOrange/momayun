<template>
<div 
	class="broadWrap" 
	ref="site08" 
	:class="{ phoneClass: phoneToggle }"
>
	<div class="container">
		<div class="left">
			<div class="title" v-if="allEditToggle">
				<h4>
					<fn-editor :content="modelInfo.modularName" :type1="2" :type2="1" :lmid="pid"></fn-editor>
				</h4>
				<p>
					<fn-editor :content="modelInfo.content" :type1="2" :type2="6" :lmid="pid"></fn-editor>
				</p>
			</div>
			<div class="title" v-else>
				<h4 v-html="modelInfo.modularName"></h4>
				<p v-html="modelInfo.content"></p>
			</div>
			<div class="swiper-wrap">
			  <swiper :options="swiperOption" ref="myswiper">
			      <swiper-slide v-for="item in modelInfo.broadcastImg" :key="item.bid">
			      	<img :src="item.picurl">
			      	<span>{{ item.title }}</span>
			      </swiper-slide>
			      <div class="swiper-pagination" slot="pagination"></div>
				</swiper>
				<div class="masking-edit" v-if="allEditToggle">
					<span @click="handleWheelClick">编辑</span>
				</div>
			</div>
		</div>
		<div class="right">
			<div class="title">
				<h4 v-if="allEditToggle">
					<fn-editor :content="modelInfo.modularNameLetter" :type1="2" :type2="2" :lmid="pid"></fn-editor>
				</h4>
				<h4 v-else v-html="modelInfo.modularNameLetter"></h4>
			</div>
			<div class="new-list" :class="{ activeBorder: editToggle }" @mouseover="handleEditNews('01')" @mouseleave="handleEditNews('02')">
				<div class="new-list-title">
					<h6 v-html="modelInfo.newlistTitle"></h6>
					<span @click="handleToNew" v-html="modelInfo.newlistTitleFn"></span>
				</div>
				<ul>
					<li v-for="(item, index) in modelInfo.newList" @click="todetailHandel(item)">
						<span v-html="item.title"></span>
						<time v-html="item.timer"></time>
					</li>
				</ul>
				<el-button class="editBtn" size="small" icon="el-icon-edit" @click="dialogVisibleNews = true" plain>编辑</el-button>
				<!-- <div class="editBtn" @click="dialogVisibleNews = true">编辑</div> -->
			</div>
		</div>
	</div>

	<el-dialog
	  title="编辑模块（轮播多图）"
	  top="8vh"
	  :visible.sync="dialogVisible"
	  :close-on-click-moda="true"
	  width="80%"
	  :before-close="handleClose">
	  <wheel-planting
	  	:pid="this.pid"
	  	:pageType="5"
	  	:content="modelInfo.broadcastImg"
	  ></wheel-planting>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisible = false">关 闭</el-button>
	  </span>
	</el-dialog>

	<el-dialog
	  title="编辑模块（文章列表）"
	  :visible.sync="dialogVisibleNews"
	  :close-on-click-moda="true"
	  top="8vh"
	  width="90%"
	  :before-close="handleNewsClose">
	  <edit-new
	  	:pid="this.pid"
	  	:pageType="2"
	  	:content="modelInfo.newList"
	  	:titleToggle="true"
	  	:newListTitle="modelInfo.newlistTitle"
	  	:newListTitleFn="modelInfo.newlistTitleFn"
	  	@handleTitleEdit="handleTitleEdit"
	  ></edit-new>
	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisibleNews = false">关 闭</el-button>
	  </span>
	</el-dialog>


</div>
</template>

<script>
import { mapState } from 'vuex'
import FnEditor from '@/common/Editor'
import imgLayer from '@/common/Imglayer'
import wheelPlanting from '@/common/WheelPlanting'
import EditNew from '@/common/EditNew'
export default {
	props: ['pid'],
	components: {
		imgLayer,
		FnEditor,
		wheelPlanting,
		EditNew
	},
	data() {
		return {
			dialogVisibleNews: false,
			editToggle: false,
			dialogVisible: false,
			phoneToggle: false,
			modelInfo: '',
			isActive: '',
		 	swiperOption: {
		 		speed: 8000,
		 		autoplay: true,
		 		loop: true,
        slidesPerView: 3,
        pagination: {
          el: '.swiper-pagination',
          type: 'progressbar'
        }
      }
		}
	},
	computed: {
		mySwiper() {
			return this.$refs.myswiper.swiper
		},
		...mapState({
			pageIndex: state => state.pageIndex,
			allEditToggle: state => state.allEditToggle,
			browserToggle: state => state.browserToggle,
			stepPages: state => state.stepPages,
			columnList2: state => state.threeStep.columnList2,
			siteId: state => state.threeStep.siteId
		})
	},
	mounted () {
		if(!this.pid) {
			for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
				if(this.$store.state.blocks.modeltextList[i].lmid == 'add07') {
					this.modelInfo = this.$store.state.blocks.modeltextList[i]
				}
			}
		}else {
			for(let i=0; i<this.stepPages.article.length; i++) {
				if(this.stepPages.article[i].lmid == this.pid) {
					this.modelInfo = this.stepPages.article[i]
				}
			}
		}
		for(let i=0; i<this.modelInfo.broadcastImg.length; i++) {
			if(this.modelInfo.broadcastImg[i].title.length>14) {
				// this.modelInfo.broadcastImg[i].title = this.modelInfo.broadcastImg[i].title.substring(0, 14) + '...'
			}
		}
		for(let i=0; i<this.modelInfo.newList.length; i++) {
				this.modelInfo.newList[i].timer = this.modelInfo.newList[i].timer.split(' ')[0]
		}
		this.$nextTick(function(){
			if(!this.browserToggle) {
				this.phoneToggle = true
				this.swiperOption.slidesPerView = 2
			}
			this.handleScroll()
		})
    window.addEventListener('scroll', this.handleScroll)
	},
	watch: {
		pid(val) {
			if(!this.pid) {
				for(let i=0; i<this.$store.state.blocks.modeltextList.length; i++) {
					if(this.$store.state.blocks.modeltextList[i].lmid == 'add07') {
						this.modelInfo = this.$store.state.blocks.modeltextList[i]
					}
				}
			}else {
				for(let i=0; i<this.stepPages.banner.length; i++) {
					if(this.stepPages.banner[i].lmid == this.pid) {
						this.modelInfo = this.stepPages.banner[i]
					}
				}
			}
		}
	},
	methods: {
		todetailHandel(data) {
			let obj = {
				lmid: this.pid,
				type: '2',
				id: data.nid
			}
			this.$store.state.sonPagetoggle = false
			this.$store.commit('sonPageHandle', obj)
			this.$store.commit('pageIndexHandel', this.columnList2.length-2)
		},
		handleToNew() {
			let pageindex = ''
			let pagename = ''
			for(let i=0; i<this.columnList2.length; i++) {
				if(this.columnList2[i].id == 335) {
					pageindex = i
					pagename = this.columnList2[i].name
				}
			}
			this.$store.commit('pageIndexHandel', pageindex)
			this.$store.commit('pageNameHandel', pagename)
  		for(let i=0; i<this.columnList2.length; i++) {
  			this.columnList2[i].checked = false
  		}
  		this.columnList2[pageindex].checked = true
		},
		handleTitleEdit(data) {
			if(data[0] == '01') {
				this.modelInfo.newlistTitle = data[1]
			}else {
				this.modelInfo.newlistTitleFn = data[1]
			}
		},
		handleNewsClose() {
			this.dialogVisibleNews = false
		},
		handleEditNews(type) {
			if(this.allEditToggle) {
				if(type === '01') {
					this.editToggle = true
				}else {
					this.editToggle = false
				}
			}
		},
		handleClose() {
			this.dialogVisible = false
		},
		handleWheelClick() {
			this.dialogVisible = true
		},
		handleEnter() {
			// this.$refs.mySwiper.stop()
		},
		handleLeave() {
			// this.$refs.mySwiper.start()
		},
    handleScroll() {
      if(this.allEditToggle) {
      	this.opacityNum = 1
      }else {
      	let htmlT = this.$refs.site08.getBoundingClientRect().top
	      if(htmlT <= 450) {
	      	this.isanimated1 = true
	        this.isfade1 = true
	      }
      }
    },
		deleteList(index, bid) {
			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
					if(this.$store.state.stepPages.banner[i].broadcastImg.length>0) {
						this.$store.state.stepPages.banner[i].broadcastImg.splice(index, 1)
						this.$axios({
							method: 'post',
							url: '/api/Senior/delmessage',
							data: {
								id: bid,
								type: 5
							}
						}).then((res)=> {
							if(res.data.code == '404') {
								alert(res.data.msg)
							}
						})
					}else {
						alert('这是最后一个了')
					}
				}
			}
		},
		addList() {
			let obj = {
		      	spanOnoff: true,
				    title: '',
				    content: '',
		      	picslurl: '/static/images/banner/hides/bro03.png',
		        picurl: '/static/images/banner/broadcast/broadcast12.jpg'
		      }
			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {
					// this.$store.state.stepPages.banner[i].broadcastImg.push(obj)
					for(let j=0; j<this.$store.state.stepPages.banner[i].broadcastImg.length; j++) {
						this.$store.state.stepPages.banner[i].broadcastImg[j].spanOnoff = false
					}
					this.$axios({
						method: 'post',
						url: '/api/Senior/newcmessage',
						data: {
							wid: this.$store.state.threeStep.siteId,
							type: 5,
							text: obj,
							lmid: this.pid
						}
					}).then((res)=> {
						if(res.data.code == '200') {
							let obj = {
								bid: res.data.data,
								spanOnoff: true,
				      	title: '',
				      	content: '',
				      	picslurl: '/static/images/banner/hides/bro03.png',
								picurl: '/static/images/banner/broadcast/broadcast12.jpg'
							}
							this.$store.state.stepPages.banner[i].broadcastImg.push(obj)
						}
						if(res.data.code == '404') {
							alert(res.data.msg)
						}
					})
				}
			}
		},
		handelClick(index) {
			for(let i=0; i<this.modelInfo.broadcastImg.length; i++) {
				this.modelInfo.broadcastImg[i].spanOnoff = false
			}
			this.modelInfo.broadcastImg[index].spanOnoff = true
		},
		dropHandel() {
			this.activeToggle = !this.activeToggle
		},
		onoff(val) {
			this.imgReplaceToggle = false
		},
		getImg(val) {
			this.imgList = []
			let obj = {
				url: val
			}
			this.imgList.push(obj)
			for(let i=0; i<this.$store.state.stepPages.banner.length; i++) {
				if(this.$store.state.stepPages.banner[i].lmid == this.pid) {	
					this.$store.state.stepPages.banner[i].broadcastImg[this.indexes].picslurl = val
					this.$store.state.stepPages.banner[i].broadcastImg[this.indexes].picurl = val
					this.$axios({
						method: 'post',
						url: '/api/upload/imgsUpload',
						data: this.imgList
					}).then((res)=> {
						if(res.data.code == '200') {
							this.$store.state.stepPages.banner[i].broadcastImg[this.indexes].picurl = res.data.data[0].url
							this.$store.state.stepPages.banner[i].broadcastImg[this.indexes].picslurl = res.data.data[0].url
							this.$axios({
								method: 'post',
								url: '/api/Senior/savemessage',
								data: {
									id: this.bid,
									type: 5,
									text: this.$store.state.stepPages.banner[i].broadcastImg[this.indexes]
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
				}
			}
		},
		upImgHandel(index, val, id) {
			this.bid = id
			this.indexes = index
			this.postImg = val
			this.imgReplaceToggle = true
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.broadWrap
	padding: 50px 0
	.container
		.left
			float: left
			width: 60%
			.swiper-wrap
				position: relative
				&:hover
					.masking-edit
						opacity: 1
				.masking-edit
					position: absolute
					left: 0
					top: 0
					width: 100%
					height: 100%
					background-color: $maskbg
					border: $maskborder
					border-radius: $maskradius
					display: flex
					justify-content: center
					align-items: center
					z-index: 1
					opacity: 0
					transition: all .3s
					span
						border-radius: $addbtnradius
						padding: $addbtnpadding
						background-color: $addbtnbg
						font-size: $addbtnfontsize
						color: $addbtncolor
						cursor: pointer
			.title
				margin-bottom: 20px
				h4
					font-size: 18px
					color: rgb(0, 150, 224)
					>>> .ql-editor
						padding: 1px 3px
						font-size: 18px
						color: inherit
				p
					margin-top: 18px
					font-size: 16px
					line-height: 24px
					>>> .ql-editor
						padding: 1px 3px
						font-size: 16px
						color: inherit
						line-height: inherit
		.right
			float: right
			width: 40%
			.new-list
				border: 1px dashed rgba(0, 0, 0, 0)
				margin-left: 15px
				transition: all .3s
				.editBtn
					margin-top: 2px
					position: absolute
					top: 100%
					left: 0
					box-shadow: $maskeditbtnshadow
					opacity: 0
				.new-list-title
					border-bottom: 1px solid #ccc
					display: flex
					justify-content: space-between
					align-items: center
					h6
						font-size: 15px
					span
						cursor: pointer
				ul
					margin-top: 15px
					li
						border-bottom: 1px dashed #ccc
						display: flex
						justify-content: space-between
						line-height: 46px
						cursor: pointer
						color: #666
						&:hover
							>>> span
								color: #444
							time
								color: #444
						span
							display: block
							overflow: hidden
							text-overflow: ellipsis
							white-space: nowrap
							font-size: 14px
							width: 80%
							>>> span
								display: block
								overflow: hidden
								text-overflow: ellipsis
								white-space: nowrap
								color: inherit
						time
							font-size: 14px
							text-align: right
							color: inherit
			.activeBorder
				border-color: $maskeditbordercolor
				position: relative
				.editBtn
					opacity: 1
			.title
				padding-left: 15px
				h4
					font-size: 18px
					color: rgb(0, 150, 224)
					>>> .ql-editor
						padding: 1px 3px
						color: inherit
						font-size: 18px
	>>> .swiper-slide
		margin-right: 20px
		background-color: #fff
		text-align: center
		img
			width: 100%
			height: 150px
		span
			display: block
			width: 100%
			text-overflow: ellipsis
			white-space: nowrap
			overflow: hidden
			line-height: 28px
.phoneClass
	padding: 30px 0
	.container
		.left
			width: 100%
			float: none
		.right
			width: 100%
			float: none
			margin-top: 20px
			.new-list
				ul
					li
						display: block
						span
							width: 100%
							line-height: 24px
						time
							padding-left: 5px
							text-align: left
							text-indent: 8px
</style>