<template>
	<div 
		class="support" 
		ref="footer1" 
		:class="[modelInfo.bgClass, { masking: modelInfo.maskingToggle }]"
		:style="{backgroundImage: 'url(' + modelInfo.bgImg + ')' }"
	>
		<fn-assembly
			:btnChoice="btnChoice"
			:zLetter="zLetter"
			:zLayout="zLayout"
			:zBg="zBg"
			:zImg="zImg"
			:postbg="modelInfo.bgClass"
			:postImg="modelInfo.bgImg"
			:widthNum="widthNum"
			:heightNum="heightNum"
			:updownSpace="modelInfo.updownspace"
			:maskingToggle="modelInfo.maskingToggle"
			@getDataLayout="getDataLayout"
			@getDataBg="getDataBg"
			@getUpdownspace="getUpdownspace"
			@getMasking="getMasking"
			v-if="allEditToggle"
		></fn-assembly>
		<div 
			class="container" 
			:class="{ phoneClass:  phoneToggle}"
			:style="{ padding: modelInfo.updownspace }"
			v-if="modelInfo.layoutClass == 'layout1'"
		>
			<div class="footer-main">
				<div 
					v-if="modelInfo.classList"
					class="inner" :style="{ opacity: opacityNum }"
					:class="{animated: isanimated1, fadeInLeft: isfade1}"
				>
					<div class="class-wrap">
						<ul>
							<li v-for="(item, index) in modelInfo.classList">
								<p>
									<font>{{ item.name }}</font>:
									<span>{{ item.val }}</span>
									<!-- <input type="text" v-model="item.val" @change="contactwayHandle(item.val)"> -->
								</p>
							</li>
						</ul>
						<div class="edit-wrap" v-if="allEditToggle">
							<span @click="editHandle('0')">编辑</span>
						</div>
						<div class="edit-box" v-if="editToggle">
							<h2>联系方式</h2>
							<ul>
								<li v-for="item in modelInfo.classList">
									<span>{{ item.name }}:</span>
									<textarea v-model="item.val" v-if="item.name == '地址'"></textarea>
									<input v-else type="text" v-model="item.val">
								</li>
							</ul>
							<div class="btn-list">
								<button @click="editHandle('2')">保存</button>
								<button @click="editHandle('1')">取消</button>
							</div>
						</div>
					</div>
					<p class="btn-wrap" v-if="!modelInfo.wechatcodeToggle && allEditToggle" :style="{ opacity: opacityNum }">
						<button @click="delcodeHandle('02')">添加二维码</button>
					</p>
				</div>

				<div class="code-wrap" v-if="modelInfo.wechatcodeToggle">
					<img 
						:src="modelInfo.wechatcode" 
						:style="{ opacity: opacityNum }"
						:class="{animated: isanimated1, fadeInRight: isfade1}"
					>
					<div class="code-mask" v-if="allEditToggle">
						<span @click="upcodeHandle">编辑</span>
						<i class="iconfont" @click="delcodeHandle('01')">&#xe6e9;</i>
					</div>
				</div>
			</div>
			<div class="footer-nav">
				<ul v-if="pageToggle">
					<li v-for="(item, index) in columnList1" v-if="item.type != 'header' && item.type != 'footer'">
						<div class="li-text">
							<a :href="'#'+index" v-text="item.name" @click="goAnchor(index)"></a>
						</div>
					</li>
				</ul>
				<ul v-else>
					<li v-for="(item, index) in columnList2" v-if="item.type != 'header' && item.type != 'footer' && item.type != 'details'">
						<div class="li-text">
							<a href="javascript:;" v-text="item.name" @click="toPageHandel(index, item.name)"></a>
						</div>
					</li>
				</ul>
				<div class="record">
					<p v-if="allEditToggle">
						<fn-editor :content="modelInfo.title || '©2019 网站样板-互联网 版权所有'" :type1="10" :type2="1" :lmid="pid"></fn-editor>
					</p>
					<p v-else v-html="modelInfo.title"></p>
				</div>
			</div>
		</div>

		<div 
			class="container" 
			:class="{ phoneClass:  phoneToggle }" 
			:style="{ padding: modelInfo.updownspace }"
			v-if="modelInfo.layoutClass == 'layout2'"
		>
			<div class="colunm-inner">
				<div class="column-left">
					<div class="co-inner">
						<h3>联系我们</h3>
						<p>
							<font class="iconfont">&#xe686;</font>
							<input 
								v-if="allEditToggle" 
								type="text" 
								v-model="modelInfo.telephone" 
								@change="contactHandle(modelInfo.telephone)"
							>
								<!-- <fn-editor :content="modelInfo.telephone" :type1="10" :type2="4" :lmid="pid"></fn-editor> -->
							
							<span v-else v-html="modelInfo.telephone"></span>
						</p>
					</div>
				</div>

				<div class="column-cen">
					<div class="column-cen-title">
						<h3>合作伙伴</h3>
					</div>
					<ul>
						<li v-for="(item, index) in modelInfo.partnerlist" @click="getindex(index)">
							<img :src="item.picurl">
							<div class="btnWrap" v-if="allEditToggle">
								<i class="iconfont" title="删除？" @click="deletepartner(index)">&#xe6e9;</i>
							</div>
							<up-img
	        			v-if="allEditToggle"
								:postImg="item.picurl"
								@getImg="getImg1"
	        		></up-img>
						</li>
					</ul>
					<div class="addList" v-if="allEditToggle">
						<span @click="addpartner">添加伙伴</span>
					</div>
				</div>

				<div class="column-right">
					<div class="co-inner">
						<div class="column-right-title">
							<h3>友情链接</h3>
						</div>
						<div class="column-right-inner">
							<ul>
								<li v-for="(item, index) in modelInfo.friendlink">
									<a :href="item.link" target="_blank">{{ item.name }}</a>
								</li>
							</ul>
							<div class="mask-column" v-if="allEditToggle">
								<span @click="partnerhandel('01')">编辑</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="record">
				<p v-if="allEditToggle">
					<fn-editor :content="modelInfo.title || '©2019 网站样板-互联网 版权所有'" :type1="10" :type2="1" :lmid="pid"></fn-editor>
				</p>
				<p v-else v-html="modelInfo.title"></p>
			</div>
		</div>
		<div class="partner-mask" v-if="partnerToggle">
			<div class="partner-mask-inner">
				<h2>友情链接</h2>
				<ul>
					<li v-for="(item, index) in modelInfo.friendlink">
						<input type="text" v-model="item.name">
						<input type="text" v-model="item.link">
						<i class="iconfont" @click="deletelink(index)">&#xe6e9;</i>
					</li>
					<li>
						<button @click="partnerhandel('02')">确定</button>
						<button @click="partnerhandel('03')">取消</button>
						<button @click="partnerhandel('04')">增加</button>
					</li>
				</ul>
			</div>
		</div>
		<img-layer 
			v-if="imgReplaceToggle" 
			:imgTu="modelInfo.wechatcode"
			:widthNum="widthNum"
			:heightNum="heightNum"
			@getImg="getImg"
			@onoff="onoff"
		></img-layer>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import FnEditor from '@/common/Editor'
import imgLayer from '@/common/Imglayer'
import FnAssembly from '@/common/Assembly'
import upImg from '@/common/UpImg'	
export default {
	props: ['pid'],
	data() {
		return {
			editToggle: false,
			partnerToggle: false,
			partnerindex: '',
			btnChoice: 5,
			zLetter: "A",
			zBg: ["bgOne", "bgTwo", "bgThree"],
			bgColorNum: '',
			zLayout: [{
				"letter": "A",
				"name": "layout1"
			}, {
				"letter": "B",
				"name": "layout2"
			}],
			opacityNum: 0,
			isanimated1: false,
			isfade1: false,
			phoneToggle: false,
			imgList: [],
			widthNum: '150',
			heightNum: '150',
			imgReplaceToggle: false,
			indexes: '',
			modelInfo: ''
		}
	},
	components: {
		FnEditor,
		imgLayer,
		FnAssembly,
		upImg
	},
	computed: {
		...mapState({
  		pageToggle: state => state.pageToggle,
  		columnList1: state => state.threeStep.columnList,
  		columnList2: state => state.threeStep.columnList2,
			zImg: state => state.stepPages.bannerList,
			allEditToggle: state => state.allEditToggle,
			stepPages: state => state.stepPages,
			siteId: state => state.threeStep.siteId,
			browserToggle: state => state.browserToggle
		})
	},
	mounted() {
  	window.addEventListener('scroll', this.handleScroll)
  	this.$nextTick(function() {
  		this.handleScroll()
  	})
		if(!this.browserToggle) {
			this.phoneToggle = true
		}
		for(let i=0; i<this.stepPages.foot.length; i++) {
			if(this.stepPages.foot[i].lmid == this.pid) {
				this.modelInfo = this.stepPages.foot[i]
				if(this.modelInfo.layoutClass == 'layout1') {
					this.zLetter = 'A'
				}else {
					this.zLetter = 'B'
				}
			}
		}
	},
	methods: {
		editHandle(type) {
			if(type == '0') {
				this.editToggle = true
			}else if(type == '1') {
				this.editToggle = false
			}else {
	      this.$axios({
	        method: 'post',
	        url: '/api/Senior/savemessage',
	        data: {
	          id: this.siteId,
	          type: 'footer',
	          text: this.modelInfo.classList
	        }
	      }).then((res)=> {
	        if(res.data.code == '404') {
	          alert(res.data.msg)
	        }
	      })
				this.editToggle = false
			}
		},
		toPageHandel(index, name) {
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
		contactHandle(val) {
      this.$axios({
        method: 'post',
        url: '/api/Senior/savemessage',
        data: {
          id: this.siteId,
          type: 'footer',
          text: {
          	tel: val
          }
        }
      }).then((res)=> {
        if(res.data.code == '404') {
          alert(res.data.msg)
        }
      })
		},
		deletelink(index) {
			this.modelInfo.friendlink.splice(index, 1)
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemodule',
				data: {
					site_id: this.siteId,
					lmid: this.pid,
					type: 'footer',
					module: this.modelInfo
				}
			}).then((res)=> {
				if(res.data.code == '404') {
					alert(res.data.msg)
				}
			})
		},
		addpartner() {
			let obj = {
				picurl: '/static/images/login/record01.png'
			}
			this.modelInfo.partnerlist.push(obj)
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemodule',
				data: {
					site_id: this.siteId,
					lmid: this.pid,
					type: 'footer',
					module: this.modelInfo
				}
			}).then((res)=> {
				if(res.data.code == '404') {
					alert(res.data.msg)
				}
			})
		},
		deletepartner(index) {
			this.modelInfo.partnerlist.splice(index, 1)
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemodule',
				data: {
					site_id: this.siteId,
					lmid: this.pid,
					type: 'footer',
					module: this.modelInfo
				}
			}).then((res)=> {
				if(res.data.code == '404') {
					alert(res.data.msg)
				}
			})
		},
		partnerhandel(type) {
			if(type == '01') {
				this.partnerToggle = true
			}else if(type == '02') {
				this.partnerToggle = false
				for(let i=0; i<this.modelInfo.friendlink.length; i++) {
					let httpobj = this.modelInfo.friendlink[i].link.split('//')[0]
					if(httpobj != 'http:' && httpobj != 'https:') {
						this.modelInfo.friendlink[i].link = 'http://' + this.modelInfo.friendlink[i].link
					}else {
						this.modelInfo.friendlink[i].link = this.modelInfo.friendlink[i].link
					}
				}
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.siteId,
						lmid: this.pid,
						type: 'footer',
						module: this.modelInfo
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}else if(type == '03') {
				this.partnerToggle = false
			}else if(type == '04') {
				let obj = {
					name: '百度',
					link: 'https://www.baidu.com'
				}
				this.modelInfo.friendlink.push(obj)
				this.$axios({
					method: 'post',
					url: '/api/Senior/savemodule',
					data: {
						site_id: this.siteId,
						lmid: this.pid,
						type: 'footer',
						module: this.modelInfo
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}
		},
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
					type: 'footer',
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
				this.modelInfo.updownspace = '40px 0'
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
					type: 'footer',
					module: this.modelInfo
				}
			}).then((res)=> {
				if(res.data.code == '404') {
					alert(res.data.msg)
				}
			})
		},
		getDataLayout(data) {
			// console.log(data)
			this.classLayout = data[0]
			this.zLetter = data[1]
			this.modelInfo.layoutClass = data[0]
      this.$axios({
        method: 'post',
        url: '/api/Senior/savemodule',
        data: {
          site_id: this.siteId,
          lmid: this.pid,
          type: 'footer',
          module: this.modelInfo
        }
      }).then((res)=> {
        if(res.data.code == '404') {
          alert(res.data.msg)
        }
      })
		},
		getDataBg(data) {
			this.classBg = data
			if(data[0] == '0') {
				this.modelInfo.bgImg = ''
				this.modelInfo.bgClass = data[1]
        this.$axios({
          method: 'post',
          url: '/api/Senior/savemodule',
          data: {
            site_id: this.siteId,
            lmid: this.pid,
            type: 'footer',
            module: this.modelInfo
          }
        }).then((res)=> {
          if(res.data.code == '404') {
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
									site_id: this.siteId,
				  				lmid: this.pid,
				  				type: 'footer',
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
							site_id: this.siteId,
				  				lmid: this.pid,
				  				type: 'footer',
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
    handleScroll() {
      if(this.allEditToggle) {
        this.opacityNum = 1
      }else {
      	let htmlT = this.$refs.footer1.getBoundingClientRect().top
        if(htmlT <= 850) {
         this.isanimated1 = true
         this.isfade1 = true
        }
      }
    },
		delcodeHandle(type) {
			if(type == '01') {
				this.modelInfo.wechatcodeToggle = false
			}else if(type == '02') {
				this.modelInfo.wechatcodeToggle = true
			}
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemodule',
				data: {
					site_id: this.siteId,
					type: 'footer',
					module: this.modelInfo
				}
			}).then((res)=> {
				if(res.data.code == '404') {
					alert(res.data.msg)
				}
			})
		},
		getindex(index) {
			this.partnerindex = index
		},
		getImg1(val) {
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
        	this.modelInfo.partnerlist[this.partnerindex].picurl = res.data.data[0].url
          this.$axios({
		        method: 'post',
		        url: '/api/Senior/savemodule',
		        data: {
		          site_id: this.siteId,
		          lmid: this.pid,
		          type: 'footer',
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
        	this.modelInfo.wechatcode = res.data.data[0].url
          this.$axios({
            method: 'post',
            url: '/api/Senior/savemessage',
            data: {
              id: this.siteId,
              type: 'footer',
              text: {
              	weixinpic: this.modelInfo.wechatcode
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
		upcodeHandle() {
			this.imgReplaceToggle = true
		},
		onoff() {
			this.imgReplaceToggle = false
		},
		getIndex(index) {
			this.indexes = index
		},
		fnEdit(val) {
			if(this.indexes == 't') {
				this.modelInfo.title = val
        this.$axios({
          method: 'post',
          url: '/api/Senior/savemodule',
          data: {
            site_id: this.siteId,
            type: 'footer',
            module: this.modelInfo
          }
        }).then((res)=> {
          if(res.data.code == '404') {
            alert(res.data.msg)
          }
        })
			}else if(this.indexes == 'c') {
				this.modelInfo.titleFn = val
        this.$axios({
          method: 'post',
          url: '/api/Senior/savemodule',
          data: {
            site_id: this.siteId,
            type: 'footer',
            tmodule: this.modelInfo
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
.support
	min-height: 100px
	position: relative
	background-size: cover
	.container
		padding: 10px 0
		border-top: 2px solid #666
		max-width: 96%
		position: relative
		z-index: 10
		.footer-main
			display: flex
			justify-content: space-around
			align-items: center
		.inner
			// width: 400px
			opacity: 0
			.class-wrap
				padding: 7px
				position: relative
				z-index: 150
				&:hover
					.edit-wrap
						opacity: 1
				.edit-wrap
					position: absolute
					left: 0
					top: 0
					width: 100%
					height: 100%
					background: $maskbg
					border: $maskborder
					border-radius: $maskradius
					display: flex
					justify-content: center
					align-items: center
					opacity: 0
					transition: all .3s
					span
						background: $addbtnbg
						padding: $addbtnpadding
						border-radius: $addbtnradius
						color: $addbtncolor
						font-size: $addbtnfontsize
						cursor: pointer
				.edit-box
					position: absolute
					left: 0
					top: -20px
					// width: 150%
					// height: 210%
					background: $editbg
					border-radius: $editradius
					padding: 10px
					color: #fff
					h2
						margin: 0
						font-size: 20px
					ul
						margin-top: 10px
						li
							margin-bottom: 10px
							display: flex
							line-height: 30px
							span
								background: #505050
								display: flex
								width: 60px
								justify-content: center
								align-items: center
							input
								width: 250px
								border: 1px solid #505050
								background: rgba(0, 0, 0, .45)
								text-indent: 8px
							textarea
								width: 250px
								border: 1px solid #505050
								background: rgba(0, 0, 0, .45)
								text-indent: 8px
								resize: none
					.btn-list
						button
							background: $editbtnbg
							border: none
							border-radius: $editradius
							padding: $editbtnpadding
							color: $editbtnfontcolor
							font-size: $editbtnfontsize
							&:hover
								background: $editbtnbghover
							&:last-child
								border: 1px solid
								background: $editbtnbg2
								border-color: $editbtnbg2border
								&:hover
									background: $editbtnbghover2
			.btn-wrap
				padding-left: 7px
			p
				margin: 0
				line-height: 28px
				color: #444
				font-size: 14px
				input
					background: none
					border: 1px solid #a7a7a7
					text-indent: 8px
					&:focus
						border-color: $bgColor
				button
					margin-top: 10px
					padding: 0 5px
					border: none
					background: #000
					color: #fff
				>>> .ql-editor
					padding: 1px 3px
					font-size: 14px
			.animated
				opacity: 1 !important
		.code-wrap
			position: relative
			padding: 7px
			&:hover
				.code-mask
					opacity: 1
			.code-mask
				position: absolute
				left: 0
				top: 0
				width: 100%
				height: 100%
				background: $maskbg
				border: $maskborder
				border-radius: $maskradius
				display: flex
				align-items: center
				justify-content: center
				opacity: 0
				transition: all .3s
				span
					background: $addbtnbg
					padding: $addbtnpadding
					border-radius: $addbtnradius
					color: #fff
					cursor: pointer
					font-size: $addbtnfontsize
				i
					position: absolute
					right: 0
					top: 0
					width: $iconwidth
					height: $iconheight
					background: $iconbg
					border-radius: $iconradius
					color: $iconcolor
					cursor: pointer
					font-size: $iconfontsize
					text-align: center
			img
				max-width: 120px
				height: auto
				opacity: 0
		.animated
			opacity: 1 !important
	.footer-nav
		margin-top: 30px
		border: none
		ul
			text-align: center
			li
				display: inline-block
				padding: 0 15px
				border-right: 1px solid #444
				line-height: 18px
				&:last-child
					border: none
				a
					color: #444
		.record
			margin-top: 15px
			text-align: center
			p
				line-height: 32px
				color: #444
				>>> .ql-editor
					padding: 1px 3px
					text-align: center
	.colunm-inner
		display: flex
		justify-content: space-around
		align-items: center
		h3
			margin: 0 0 20px
			font-size: 16px
			color: #444
		.column-left
			padding: 0 5%
			.co-inner
				min-width: 150px
			p
				display: flex
				font
					margin-right: 5px
				input
					background: none
					border: 1px solid #a7a7a7
					color: #a7a7a7
					text-indent: 5px
					&:focus
						border-color: $bgColor
				span
					display: inline-block
					vertical-align: middle
					>>> .ql-editor
						padding: 1px 3px
		.column-cen
			border-left: 1px solid #A7A7A7
			border-right: 1px solid #A7A7A7
			padding: 0 5%
			&:hover
				.addList
					opacity: 1
			.column-cen-title
				text-align: center
			ul
				text-align: center
				li
					display: inline-block
					border: 1px solid #444
					border-radius: 5px
					height: 60px
					max-width: 300px
					padding: 5px
					margin: 0 15px 15px 0
					position: relative
					&:hover
						.btnWrap
							opacity: 1
					img
						max-height: 50px
						width: auto
					.btnWrap
						position: absolute
						right: 5px
						top: 5px
						z-index: 100
						transition: all .3s
						opacity: 0
						i
							width: $iconwidth
							height: $iconheight
							border-radius: $iconradius
							background: $iconbg
							color: $iconcolor
							font-size: $iconfontsize
							cursor: pointer
			.addList
				padding: 5px 0
				text-align: center
				transition: all .3s
				opacity: 0
				span
					background: $addbtnbg
					padding: $addbtnpadding
					border-radius: $addbtnradius
					color: $addbtncolor
					font-size: $addbtnfontsize
					cursor: pointer
		.column-right
			padding: 0 5%
			.co-inner
				min-width: 150px
				h3
					text-align: center
				.column-right-inner
					position: relative
					&:hover
						.mask-column
							opacity: 1
					ul
						li
							margin: 0 10px 10px
							display: inline-block
							a
								color: #444
					.mask-column
						position: absolute
						width: 100%
						height: 100%
						top: 0
						left: 0
						border: $maskborder
						background: $maskbg
						border-radius: $maskradius
						display: flex
						justify-content: center
						align-items: center
						opacity: 0
						transition: all .3s
						span
							background: $addbtnbg
							padding: $addbtnpadding
							border-radius: $addbtnradius
							color: $addbtncolor
							font-size: $addbtnfontsize
							cursor: pointer
	.phoneClass
		display: flex
		flex-direction: column
		.colunm-inner
			flex-direction: column
			.column-cen
				margin: 20px 0
		.footer-main
			flex-direction: column
		.code-wrap
			margin-top: 10px
	.record
		margin-top: 10px
		p
			color: #a7a7a7
			text-align: center
			>>> .ql-editor
				padding: 1px 3px
				color: #a7a7a7
				text-align: center
.bgOne
	background-color: $modelBg02
	.title
		h2
			color: $fontColor
		p
			color: $fontColor
	.container
		.list
			.text
				h3
					color: $fontColor
				h4
					color: $fontColor
				p
					color: $fontColor
.bgTwo
	background-color: $modelBg03
	.container
		.inner
			p
				color: #A7A7A7
	.footer-nav
		ul 
			li
				border-color: #A7A7A7
				a
					color: #A7A7A7
		.record
			p
				color: #A7A7A7
	.colunm-inner
		h3
			color: #A7A7A7
		.column-left
			p
				font
					color: #A7A7A7
				span
					color: #A7A7A7
		.column-cen
			ul
				li
					border-color: #A7A7A7
		.column-right
			.co-inner
				.column-right-inner
					ul
						li
							a
								color: #A7A7A7
.bgThree
	background-color: $modelBg01	
	.title
		h2
			color: $fontColor
		p
			color: $fontColor
	.container
		.list
			.text
				h3
					color: $fontColor
				h4
					color: $fontColor
				p
					color: $fontColor	
.masking
	&:before
		content: ''
		display: block
		position: absolute
		left: 0
		top: 0
		width: 100%
		height: 100%
		background: $allmasking
.partner-mask
	position: fixed
	left: 0
	top: 0
	width: 100%
	height: 100%
	background: rgba(0, 0, 0, 0.4)
	z-index: 10000000000000000
	.partner-mask-inner
		position: absolute
		left: 50%
		top: 50%
		background: $editbg
		border-radius: $editradius
		padding: 10px
		transform: translate(-50%, -50%)
	h2
		margin: 0
		line-height: 36px
		font-size: 20px
		color: #fff
	ul
		margin-top: 10px
		li
			margin-bottom: 10px
			display: flex
			justify-content: space-around
			&:last-child
				margin-bottom: 0
				display: block
				button
					background: $editbtnbg
					border-radius: $editradius
					padding: $editbtnpadding
					border: none
					font-size: $editbtnfontsize
					color: $editbtnfontcolor
					&:hover
						background: $editbtnbghover
					&:nth-of-type(2)
						border: 1px solid
						background: $editbtnbg2
						border-color: $editbtnbg2border
						&:hover
							background: $editbtnbghover2
			input
				width: 60%
				border: 1px solid #505050
				background-color: rgba(0, 0, 0, 0.45)
				text-indent: 12px
				color: #fff
				line-height: 28px
				font-size: 13px
				&:first-child
					width: 30%
			i
				width: $iconwidth
				height: $iconheight
				border-radius: $iconradius
				background: $iconbg
				color: $iconcolor
				font-size: $iconfontsize
				text-align: center
				cursor: pointer
</style>