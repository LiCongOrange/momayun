<template>
	<div class="detail">
		<div class="inner container">
			<ul>
				<li>
					<div class="title">
						<h2 v-html="datainfo.title"></h2>
						<p v-if="datainfo.time" v-html="datainfo.time"></p>
						<p v-if="datainfo.titleFn" v-html="datainfo.titleFn"></p>
						<div class="lines"></div>
					</div>
					<div class="content">
						<p v-html="datainfo.content"></p>
						<div class="img" v-if="datainfo.picurl">
							<img :src="datainfo.picurl">
						</div>
					</div>
				</li>
				<!-- <li v-for="(item, index) of modelInfo" v-if="item.nid == sonPagetext.id">
					<div class="title">
						<h2 v-html="item.title"></h2>
						<div class="lines"></div>
						<p v-if="item.time" v-html="item.time"></p>
						<p v-if="item.titleFn" v-html="item.titleFn"></p>
					</div>
					<div class="content">
						<p v-html="item.past"></p>
						<div class="img" v-if="item.picurl">
							<img :src="item.picurl">
						</div>
					</div>
				</li> -->
			</ul>
			<div class="lines"></div>
			<div class="foot-nav">
				<div class="left">
					<label v-if="prevbtnToggle" @click="prevHandle">
						上一篇：
						<span v-html="modelInfo[pindex-1].title"></span>
					</label>
					<label v-if="nextbtnToggle" @click="nextHandle">
						下一篇：
						<span v-html="modelInfo[pindex+1].title"></span>
					</label>
				</div>
				<div class="right">
	       <div class="bdsharebuttonbox bdshare-button-style0-16">
	           <a href="#" class="bds_more" data-cmd="more"></a>
	           <a href="#" class="bds_qzone" data-cmd="qzone"></a>
	           <a href="#" class="bds_tsina" data-cmd="tsina"></a>
	           <a href="#" class="bds_tqq" data-cmd="tqq"></a>
	           <a href="#" class="bds_renren" data-cmd="renren"></a>
	           <a href="#" class="bds_weixin" data-cmd="weixin"></a>
	        </div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			prevbtnToggle: false,
			nextbtnToggle: false,
			pindex: '',
			id: '',
			modelInfo: '',
			datainfo: ''
		}
	},
	computed: {
		...mapState({
			zImg: state => state.stepPages.bannerList,
			allEditToggle: state => state.allEditToggle,
			browserToggle: state => state.browserToggle,
			columnList2: state => state.threeStep.columnList2,
			stepPages: state => state.stepPages,
      siteId: state => state.threeStep.siteId,
      sonPagetext: state => state.sonPagetext,
      sonInterfaceToggle: state => state.sonInterfaceToggle
		})
	},
  beforeCreate(){
      const _this=this;
      setTimeout(()=>{
          _this.setup()
      },0)
  },
	watch: {
		pindex(val) {
			if(val > 0) {
				this.prevbtnToggle = true
			}else {
				this.prevbtnToggle = false
			}
			if(val == this.modelInfo.length-1) {
				this.nextbtnToggle = false
			}else {
				this.nextbtnToggle = true
			}
			$('.homePage').animate({scrollTop:'0'},500)
		},
		modelInfo(data) {
			if(this.sonInterfaceToggle) {
				if(this.sonPagetext.type == '2') {
					for(let i=0; i<data.length; i++) {
						if(data[i].nid == this.sonPagetext.id) {
							this.pindex = i
						}
					}
				}else if(this.sonPagetext.type == '3') {
					for(let i=0; i<data.length; i++) {
						if(data[i].pid == this.sonPagetext.id) {
							this.pindex = i
						}
					}
				}
			}else {
				if(this.sonPagetext.type == '2') {
					for(let i=0; i<data.length; i++) {
						if(data[i].nid == this.sonPagetext.id) {
							this.pindex = i
							let obj = {
								picurl: data[i].picurl,
								content: data[i].past,
								time: data[i].timer,
								title: data[i].title
							}
							this.datainfo = obj
						}
					}
					console.log(this.datainfo)
				}else if(this.sonPagetext.type == '3') {
					for(let i=0; i<data.length; i++) {
						if(data[i].pid == this.sonPagetext.id) {
							this.pindex = i
							let obj = {
								picurl: data[i].picurl,
								content: data[i].past,
								time: data[i].timer,
								title: data[i].title
							}
							this.datainfo = obj
						}
					}
				}
			}
		}
	},
	mounted() {
		this.getData()
	},
	methods: {
   setup(){      
      window._bd_share_config={
          "common":{
              "bdSnsKey":{},
              "bdText":"",
              "bdMini":"2",
              "bdPic":"",
              "bdStyle":"0",
              "bdSize":"16"
          },
          "share":{},
          "image":{
              "viewList":["qzone","tsina","tqq","renren","weixin"],
              "viewText":"分享到：","viewSize":"16"
          },
          "selectShare":{
              "bdContainerClass":null,
              "bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]
          }
      };
      const s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
      document.body.appendChild(s);
    },
		nextHandle() {
			if(this.sonInterfaceToggle) {
				let obj = {
					lmid: '',
					type: '',
					id: ''
				}
				if(this.sonPagetext.type == '2') {
						obj.lmid = this.sonPagetext.lmid,
						obj.type = this.sonPagetext.type,
						obj.id = this.modelInfo[this.pindex+1].nid
				}else {
						obj.lmid = this.sonPagetext.lmid,
						obj.type = this.sonPagetext.type,
						obj.id = this.modelInfo[this.pindex+1].pid
				}
				this.pindex = this.pindex+1
				this.$store.commit('sonPageHandle', obj)
				this.getData()
			}else {
				let obj = {
					picurl: this.modelInfo[this.pindex+1].picurl,
					content: this.modelInfo[this.pindex+1].past,
					time: this.modelInfo[this.pindex+1].timer,
					title: this.modelInfo[this.pindex+1].title
				}
				this.datainfo = obj
				this.pindex = this.pindex+1
			}
		},
		prevHandle() {
			if(this.sonInterfaceToggle) {
				let obj = {
					lmid: '',
					type: '',
					id: ''
				}
				if(this.sonPagetext.type == '2') {
						obj.lmid = this.sonPagetext.lmid,
						obj.type = this.sonPagetext.type,
						obj.id = this.modelInfo[this.pindex-1].nid
				}else {
						obj.lmid = this.sonPagetext.lmid,
						obj.type = this.sonPagetext.type,
						obj.id = this.modelInfo[this.pindex-1].pid
				}
				this.pindex = this.pindex-1
				this.$store.commit('sonPageHandle', obj)
				this.getData()
			}else {
				let obj = {
					picurl: this.modelInfo[this.pindex-1].picurl,
					content: this.modelInfo[this.pindex-1].past,
					time: this.modelInfo[this.pindex-1].timer,
					title: this.modelInfo[this.pindex-1].title
				}
				this.datainfo = obj
				this.pindex = this.pindex-1
			}
		},
		getData() {
			if(this.sonInterfaceToggle) {
	      this.$axios({
	        // method: 'get',
	        // url: '/api/details.json'
	        method: 'post',
	        url: '/api/Ctstation/details',
	        data: {
	        	id: this.sonPagetext.id,
	        	type: this.sonPagetext.type
	        }
	      }).then(this.getSiteinfoSucc)
			}else {
				if(this.sonPagetext.type == '2') {
					for(let i=0; i<this.stepPages.article.length; i++) {
						if(this.stepPages.article[i].lmid == this.sonPagetext.lmid) {
							this.modelInfo = this.stepPages.article[i].newList
						}
					}
				}else if(this.sonPagetext.type == '3') {
					for(let i=0; i<this.stepPages.product.length; i++) {
						if(this.stepPages.product[i].lmid == this.sonPagetext.lmid) {
							this.modelInfo = this.stepPages.product[i].productList
						}
					}
				}
			}
		},
		getSiteinfoSucc(res) {
			if(res.data.code == '200') {
				this.datainfo = res.data.data
				if(this.sonPagetext.type == '2') {
					for(let i=0; i<this.stepPages.article.length; i++) {
						if(this.stepPages.article[i].lmid == this.sonPagetext.lmid) {
							this.modelInfo = this.stepPages.article[i].newList
						}
					}
				}else if(this.sonPagetext.type == '3') {
					for(let i=0; i<this.stepPages.product.length; i++) {
						if(this.stepPages.product[i].lmid == this.sonPagetext.lmid) {
							this.modelInfo = this.stepPages.product[i].productList
						}
					}
				}
			}else {
				this.$message({
					type: 'error',
					message: '数据获取失败，请刷新页面或关闭重新打开！'
				})
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
.detail
	position: relative
	background: #fff
	.title
		margin: 30px 0 30px
		text-align: center
		h2
			margin: 0
			font-size: 25px
			color: #333
			font-weight: 400
		p
			font-size: 15px
			line-height: 48px
			text-align: left
	.content
		font-size: 18px
		line-height: 32px
		.img
			margin-top: 20px
			margin-bottom: 10px
			img
				max-height: 100%
		p
			text-indent: 14px
			color: #676767
	.foot-nav
		padding: 20px 0 50px
		display: flex
		justify-content: space-between
		.left
			label
				margin-bottom: 20px
				display: flex
				font-size: 14px
				color: #666
				font-weight: normal
				span
					&:hover
						color: #ff6637
						cursor: pointer
		.right
			.bdshare-button-style0-16
				a
					margin: 0
					margin-left: 10px
.lines
	margin-top: 60px
	border: 1px solid #f0efef
</style>