<template>
	<div class="container">
		<dialog-bar
			v-if="dialogToggle"
			:dialog-option="dialogOption"
			@confirmHandle="dialogCallback1"
		></dialog-bar>
		<div class="site-title">

			<div class="btnAll" v-if="userType == '5' || userType == '6'">
				<el-button type="primary" @click="towork">发布工单</el-button>
				<el-button type="primary" @click="tomywork">查看工单</el-button>
				<el-button type="primary" @click="torecord">去备案</el-button>
			</div>

			<div class="btnAll" v-else-if="typeToggle == '8'">
				<el-dropdown split-button type="primary" @command="handleClick">
					新建站点
					<el-dropdown-menu solt="dropdown">
						<el-dropdown-item command="a">智能向导</el-dropdown-item>
						<el-dropdown-item command="b">模板建站</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<!-- <div class="dropdown">
					<button type="button" class="btn dropdown-toggle" id="dropdownMenus" data-toggle="dropdown">新建站点<span class="caret"></span></button>
					<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenus">
						<li role="presentation">
							<a href="javascript:;" @click="toThirdStep('01')">智能向导</a>
						</li>
						<li role="presentation">
							<a href="javascript:;" @click="toThirdStep('02')">模板建站</a>
						</li>
					</ul>
				</div> -->
			</div>
			<div class="btnAll" v-else>
				<el-button type="primary" @click="toThirdStep('02')" icon="el-icon-circle-plus">新建站点</el-button>
				<!-- <button @click="toThirdStep('02')"><i class="iconfont">&#xe6e0;</i>新建站点</button> -->
				<!-- <button @click="toThirdStep('02')">选择模板</button> -->
				<!-- <div class="dropdown">
					<button type="button" class="btn dropdown-toggle" id="dropdownMenus" data-toggle="dropdown">新建站点<span class="caret"></span></button>
					<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenus">
						<li role="presentation">
							<a href="javascript:;" @click="toThirdStep('01')">智能向导</a>
						</li>
						<li role="presentation">
							<a href="javascript:;" @click="toThirdStep('02')">模板建站</a>
						</li>
					</ul>
				</div> -->
			</div>

			<!-- <router-link to="/step">11111</router-link> -->
			<p>
				<span>站点数：<b>{{ siteNum }}</b>个</span>|
				<span>域名数：<b>{{ domainNum }}</b>个</span>
			</p>
			<div class="account-btn" v-if="userType == '2' || userType == '3' || userType == '4' || userType == '7' || userType == '9'">
				<!-- <button @click="tomyaccountHandel"><i class="iconfont">&#xe645;</i>管理账户</button> -->
				<el-button type="primary" plain @click="tomyaccountHandel" icon="el-icon-menu">管理账户</el-button>
			</div>
		</div>
		<div class="siteList" v-if="this.siteListOnoff">
			<ul>
				<li v-for="(item, index) in sitesList" :id="item.site_id">
					<div class="sitelist-head">
						<div class="img" v-if="item.logo"><img :src="item.logo"></div>
						<div class="img" v-else><img :src="defaultLogo"></div>
						<div class="text">
							<div class="title">
								<div class="sitename">站点名称: <span v-html="item.wsname"></span></div>
								<div class="tobuy" v-if="userType != '8'">
									<div v-if="item.audit == '0'">
										<div v-if="userType != '5'">
											<!-- <button v-if="typeToggle != '5' || typeToggle != '6'" @click="toProductup(item.site_id)">产品购买</button> -->
											<el-button type="warning" v-if="typeToggle != '5' || typeToggle != '6'" @click="toProductup(item.site_id)">产品购买</el-button>
										</div>
									</div>
									<div v-else>
										<div v-if="userType != '5'">
											<!-- <button class="disabledy" v-if="typeToggle != '5' || typeToggle != '6'">已购买</button> -->
											<el-button type="warning" v-if="typeToggle != '5' || typeToggle != '6'" disabled>已购买</el-button>
										</div>
									</div>
								</div>
							</div>
							<div class="title2">
								<a :href=" 'http://' + item.main_domin " target="_blank">{{ item.main_domin }}</a>
								<span @click="domainHandle(item.main_domin, item.site_id)">更换域名</span>
							</div>
							<!-- <div class="spaces">
								<h5>空间剩余</h5>
								<div class="progressWrap"><div></div></div>
								<p>620M / 1000M</p>
							</div> -->

							<div class="btnList" v-if="typeToggle == '5'">
								<el-button @click="topreHandel(item.site_id)">网站预览</el-button>
								<el-button @click="toEdit('03', item.site_id, index, item.ispage)">管理内容</el-button>
							</div>
							<div class="btnList" v-else-if="typeToggle == '6'">
								<el-button @click="toEdit('01', item.site_id, index, item.ispage)">编辑模板</el-button>
								<el-button @click="toEdit('03', item.site_id, index, item.ispage)">管理内容</el-button>
								<el-button v-if="item.isonline == '0'" @click="release(item.site_id, index, '02', item.audit)">发布上线</el-button>
								<el-button v-else-if="item.isonline == '1'" @click="offline(item.site_id, index, '03')">下线</el-button>
								<el-button v-else :loading="true">审核中</el-button>
							</div>
							<div class="btnList" v-else-if="typeToggle == '8' || typeToggle == '10'">
								<el-button @click="toEdit('01', item.site_id, index, item.ispage)">编辑模板</el-button>
								<el-button @click="toEdit('03', item.site_id, index, item.ispage)">管理内容</el-button>
								<el-button v-if="item.isonline == '0'" @click="release(item.site_id, index, '01', item.audit, item.picurl)">发布上线</el-button>
								<el-button v-else-if="item.isonline == '1'" @click="offline(item.site_id, index, '03')">下线</el-button>
								<el-button v-else :loading="true">审核中</el-button>
								<el-button v-if="item.audit == '0'" @click="toEdit('02', item.site_id, index)" type="danger" plain>删除</el-button>
							</div>

							<div class="btnList" v-else-if="typeToggle == '9'">
								<el-button @click="toEdit('01', item.site_id, index, item.ispage)">编辑模板</el-button>
								<el-button @click="toEdit('03', item.site_id, index, item.ispage)">管理内容</el-button>
								<el-button v-if="item.audit == '1' && item.select_host == '1'" @click="hostHandel(item.site_id, item.select_host)">境内主机</el-button>
								<el-button v-if="item.audit == '1' && item.select_host == '2'" @click="hostHandel(item.site_id, item.select_host)">境外主机</el-button>
								<el-button v-if="item.audit == '1' && !item.select_host " @click="hostHandel(item.site_id)">选择主机</el-button>
								<el-button v-if="item.audit == '0'" @click="toEdit('02', item.site_id, index)" type="danger" plain>删除</el-button>
							</div>

							<div class="btnList" v-else>
								<el-button @click="toEdit('01', item.site_id, index, item.ispage)">编辑模板</el-button>
								<el-button @click="toEdit('03', item.site_id, index, item.ispage)">管理内容</el-button>
								<el-button v-if="item.isonline == '0'" @click="release(item.site_id, index, '02', item.audit)">发布上线</el-button>
								<el-button v-else-if="item.isonline == '1'" @click="offline(item.site_id, index, '03')">下线</el-button>
								<el-button v-else :loading="true">审核中</el-button>
								<el-button v-if="item.audit == '1' && item.select_host == '1'" @click="hostHandel(item.site_id, item.select_host)">境内主机</el-button>
								<el-button v-if="item.audit == '1' && item.select_host == '2'" @click="hostHandel(item.site_id, item.select_host)">境外主机</el-button>
								<el-button v-if="item.audit == '1' && !item.select_host " @click="hostHandel(item.site_id)">选择主机</el-button>
								<el-button v-if="item.audit == '0'" @click="toEdit('02', item.site_id, index)" type="danger" plain>删除</el-button>
							</div>
						</div>
						<div class="right" v-if="typeToggle == '8' || typeToggle == '10'">
							<el-button class="btn123" type="success" @click="upimgHandel(index, item.site_id, item.picurl)">查看展示图</el-button>
							<el-button class="btn123" type="success" @click="upimgHandel(index, item.site_id, item.picurl)">上传展示图</el-button>
						</div>
						<div class="right" v-else>
							<div class="visit">
								<a href="javascript:;">{{ item.plainQ || 0 }}</a>
								<p>访问量</p>
							</div>
						</div>
					</div>
					<div class="sitelist-foot">
						<div class="sitelist-foot-inner">
							有效期：
							<p>网站： {{ item.online_time }} --- {{ item.sitdue_time }}</p>|
							<p>域名： {{ item.xinnet_add_time }} --- {{ item.xinnet_end_time }}</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<img-layer 
			v-if="imgReplaceToggle" 
			:imgTu="postImg"
			:widthNum="widthNum"
			:heightNum="heightNum"
			@getImg="getImg"
			@onoff="onoff"
		></img-layer>

		<domaindialog v-if="domiandialogToggle" :content="domiannum" @domainbackHandle="domainbackHandle"></domaindialog>
		<hostdialog v-if="hostdialogToggle" @backhandle="backhandle" :type="hosttype2"></hostdialog>

	<!-- 	<el-dialog
		  title="域名修改"
		  :visible.sync="domiandialogToggle"
		  width="40%"
		  :before-close="handleClose">
		  <domaindialog :content="domiannum" @domainbackHandle="domainbackHandle"></domaindialog>
		</el-dialog>
		<el-dialog
		  title="主机选择"
		  :visible.sync="hostdialogToggle"
		  width="30%"
		  :before-close="handleClose2">
		  <hostdialog @backhandle="backhandle" :type="hosttype2"></hostdialog>
		</el-dialog> -->

	</div>
</template>

<script>
import { mapState } from 'vuex'
import dialogBar from '@/common/Dialog'
import imgLayer from '@/common/Imglayer'
import domaindialog from './Domainnamedialog'
import hostdialog from '@/pages/center/components/Host'
export default {
	components: {
		dialogBar,
		imgLayer,
		domaindialog,
		hostdialog
	},
	data() {
		return {
			hosttype: '',
			hosttype2: '',
			hostdialogToggle: false,
			domiandialogToggle: false,
			domiannum: '',
			count: 0,
			upType: '',
			relordelType: true,
			defaultLogo: '/static/images/site/blogo.png',
			ismmy_model: '',
			imgList: [],
			imgReplaceToggle: false,
			postImg: '',
			widthNum: '530',
			heightNum: '360',
			indexes: '',
			siteNum: 0,
			siteId2: '',
			domainNum: 0,
			sitesList: '',
			siteListOnoff: true,
			dialogToggle: false,
			dialogOption: {
				type: 1,
				content: '此站点删除后无法恢复哦!'
			},
			listoggle:'',
			typeToggle: ''
		}
	},
	computed: {
		...mapState({
			userType: state => state.userType,
      siteId: state => state.threeStep.siteId
		})
	},
	methods: {
		handleClose2() {
			this.hostdialogToggle = false
		},
		handleClose() {
			this.domiandialogToggle = false
		},
		handleClick(command) {
			if(command == 'a') {
				this.toThirdStep('01')
			}else if(command == 'b') {
				this.toThirdStep('02')
			}
		},
		torecord() {
			window.open('/home/ymrecord/index')
		},
		hostHandel(id, type) {
			this.siteId2 = id
			this.hosttype2 = type
			this.hostdialogToggle = true
		},
		backhandle(data) {
			if(data == 'false') {
				this.hostdialogToggle = false
			}else {
				this.hosttype = data
				this.hostdialogToggle = false
				this.$axios({
					method: 'post',
					url: '/api/Usersites/selecthost',
					data: {
						site_id: this.siteId2,
						select_host: this.hosttype
					}
				}).then((res)=> {
					if(res.data.code == '200') {
						alert(res.data.msg)
						for(let i=0; i<this.sitesList.length; i++) {
							if(this.sitesList[i].site_id == this.siteId2) {
								this.sitesList[i].select_host = data
							}
						}
					}else {
						alert(res.data.msg)
					}
				})
			}
		},
		domainbackHandle(data) {
			if(data == 'false') {
				this.domiandialogToggle = false
			}else {
				this.$axios({
					method: 'post',
					url: '/api/Usersites/bangdomin',
					data: {
						site_id: this.siteId2,
						domin: data
					}
				}).then((res)=> {
					if(res.data.code == '200') {
						alert(res.data.msg)
						for(let i=0; i<this.sitesList.length; i++) {
							if(this.sitesList[i].site_id == this.siteId2) {
								this.sitesList[i].main_domin = data
							}
						}
					}else {
						alert(res.data.msg)
					}
				}) 
				this.domiandialogToggle = false
			}
		},
		domainHandle(data, id) {
			console.log(data)
			this.domiandialogToggle = true
			this.domiannum = data
			this.siteId2 = id

		},
		tomyaccountHandel() {
			window.open('/index/index/myacount')
			// window.location.href = '/index/index/myacount'
		},
		topreHandel(siteId) {
			window.open('/index/index/pre?' + siteId)
			// window.location.href = '/index/index/home?' + siteId
		},
		offline(siteId, index, uptype) {
			this.upType = uptype
			this.siteId2 = siteId
			this.indexes = index
			// this.dialogToggle = true
			// this.dialogOption.type = 2
			// this.dialogOption.content = '确定下线此站点？'
			this.$confirm('确定下线此网站？', '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
				type: 'info'
			}).then(()=> {
				if(this.userType == '8') {
					this.$axios({
						method: 'post',
						url: '/api/Usersites/downshowimg',
						data: {
							site_id: siteId
						}
					}).then(()=> {
						this.sitesList = []
						this.getSites()
						this.$message({
							type: 'success',
							message: '操作成功，已下线'
						})
					}).catch(()=> {
						this.$message({
							type: 'error',
							message: '操作失败，请重新操作'
						})
					})
				}else {
					this.$axios({
						method: 'post',
						url: '/api/Usersites/downsite',
						data: {
							site_id: siteId
						}
					}).then(()=> {
						this.sitesList = []
						this.getSites()
						this.$message({
							type: 'success',
							message: '操作成功，已下线'
						})
					}).catch(()=> {
						this.$message({
							type: 'error',
							message: '操作失败，请重新操作'
						})
					})
				}
			}).catch(()=> {
				this.$message({
					type: 'info',
					message: '已取消操作'
				})
			})
		},
		dialogCallback1(data) {
			if(this.upType == '01') {
	      if(data == '0') {
					this.$axios({
						method: 'post',
						url: '/api/Usersites/upshowimg',
						data: {
							site_id: this.siteId2
						}
					}).then((res)=> {
						if(res.data.code == '200') {
								// this.dialogToggle = false
								this.dialogOption.type = 4
								this.dialogOption.content = '发布成功'
								this.sitesList[this.indexes].isshow = '0'
								this.sitesList[this.indexes].isonline = '1'
								// this.timer = setInterval(()=> {
								// 	this.count++
								// 	if(this.count > 5) {
								// 		this.dialogToggle = false
								// 	}
								// }, 1000)
						}else {
							this.dialogToggle = false
							alert(res.data.msg)
						}
					})
	      }else {
	      	this.dialogToggle = false
	      }
			}else if(this.upType == '02') {
				if(data == '0') {
					this.$axios({
						method: 'post',
						url: '/api/Usersites/upsite',
						data: {
							site_id: this.siteId2
						}
					}).then((res)=> {
						if(res.data.code == '200') {
							this.dialogOption.type = 4
							this.dialogOption.content = '发布成功'
							this.sitesList[this.indexes].isshow = '0'
							this.sitesList[this.indexes].isonline = '2'
						}else {
							this.dialogToggle = false
							alert(res.data.msg)
						}
					})
				}else {
					this.dialogToggle = false
				}
			}else if(this.upType == '03') {
				if(data == '0') {

					if(this.userType == '8') {
						this.$axios({
							method: 'post',
							url: '/api/Usersites/downshowimg',
							data: {
								site_id: this.siteId2
							}
						}).then((res)=> {
							if(res.data.code == '200') {
								this.dialogOption.type = 4
								this.dialogOption.content = '成功下线'
								// this.sitesList[this.indexes].isshow = '1'
								// this.sitesList[this.indexes].isonline = '2'
								this.sitesList = []
								this.getSites()
							}else {
								alert(res.data.msg)
							}
						})
					}else {
						this.$axios({
							method: 'post',
							url: '/api/Usersites/downsite',
							data: {
								site_id: this.siteId2
							}
						}).then((res)=> {
							if(res.data.code == '200') {
								this.dialogOption.type = 4
								this.dialogOption.content = '成功下线'
								// this.sitesList[this.indexes].isshow = '1'
								// this.sitesList[this.indexes].isonline = '2'
								this.sitesList = []
								this.getSites()
							}else {
								alert(res.data.msg)
							}
						})
					}
				}else {
					this.dialogToggle = false
				}
			}else {
				this.dialogToggle = false
	      if(data == '0') {
	        this.sitesList.splice(this.indexes, 1)
	        this.siteNum = this.sitesList.length
					this.domainNum = this.sitesList.length
	        var data="site_id="+this.siteId2
	        this.$axios({
	          method: 'post',
	          url: '/api/Usersites/userwebdel',
	          data: data
	        }).then((res) => {
	          if(res.data.code == '200') {
	            alert(res.data.msg)
	          }
	          if(res.data.code == '404')  {
	            alert('删除失败')
	          }
	        })
	      }
			}
		},
		release(siteId, index, uptype, audittype, picurl) {
			this.upType = uptype
			this.relordelType = true
			this.siteId2 = siteId
			this.indexes = index
			// this.dialogToggle = true
			// this.dialogOption.type = 2
			// this.dialogOption.content = '确认发布上线？'

			if(uptype == '01') {
				if(picurl) {
					this.$axios({
						method: 'post',
						url: '/api/Usersites/upshowimg',
						data: {
							site_id: siteId
						}
					}).then(()=> {
						this.$message({
							type: 'success',
							message: '发布成功！'
						})
						this.sitesList[index].isshow = '0'
						this.sitesList[index].isonline = '1'
					}).catch(()=> {
						this.$message({
							type: 'error',
							message: '提交失败，请检查网络是否链接或是否购买此网站！'
						})
					})
				}else {
					this.$message({
						type: 'error',
						message: '请先上传模板展示图后再发布！'
					})
				}
			}else {
				if(audittype == '1') {
					this.$confirm('网站发布需进行审核，确认提交？', '提示', {
						confirmButtonText: '确认',
						cancelButtonText: '取消',
						type: 'info'
					}).then(()=> {
						this.$axios({
							method: 'post',
							url: '/api/Usersites/upsite',
							data: {
								site_id: siteId
							}
						}).then(()=> {
							this.$message({
								type: 'success',
								message: '提交申请已发送，请耐心等待。'
							})
							this.sitesList[index].isshow = '0'
							this.sitesList[index].isonline = '2'
						}).catch(()=> {
							this.$message({
								type: 'error',
								message: '提交失败，请检查网络是否链接或是否购买此网站！'
							})
						})
					}).catch(()=> {
						this.$message({
							type: 'info',
							message: '提交申请已取消'
						})
					})
				}else {
					this.$message({
						type: 'error',
						message: '购买后，才可提交发布！'
					})
				}
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
					this.sitesList[this.indexes].picurl = res.data.data[0].url
					this.$axios({
						method: 'post',
						url: '/api/Usersites/saveshowimg',
						data: {
							site_id: this.siteId2,
							picurl: res.data.data[0].url
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
		upimgHandel(index, siteId, url) {
			this.indexes = index
			this.siteId2 = siteId
			this.imgReplaceToggle = true
			this.postImg = url
		},
		toEdit(type, siteId, index, page) {
			this.indexes = index
			this.siteId2 = siteId
			if(type == '01') {
				this.$axios({
					method: 'post',
					url: '/api/showsite/siteinfo',
					params: { site_id: siteId }
				}).then(() => {
						window.open('/index/index/home?' + siteId)
						// window.location.href = '/index/index/home?' + siteId
				}).catch((res)=> {
					this.$message({
						type: 'error',
						message: res.data.msg
					})
				})
			}else if(type == '02'){
				this.relordelType = false
				this.siteId2 = siteId
				this.indexes = index
				// this.dialogToggle = true
				// this.dialogOption.type = 1
				// this.dialogOption.content = '此站点删除后无法恢复哦!'
				this.$confirm('请注意！此网站删除后将永远无法恢复！', '提示', {
					confirmButtonText: '',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(()=> {
					this.$axios({
						method: 'post',
						url: '/api/Usersites/userwebdel',
						data: {
							site_id: siteId
						}
					}).then(()=> {
						this.sitesList.splice(index, 1)
		        this.siteNum = this.sitesList.length
						this.domainNum = this.sitesList.length
						this.$message({
							type: 'success',
							message: '删除成功'
						})
					}).catch(()=> {
						this.$message({
							type: 'error',
							message: '删除失败，请检查网络是否链接。'
						})
					})
				}).catch(()=> {
					this.$message({
						type: 'info',
						message: '已取消删除'
					})
				})
			}else if(type == '03') {
				window.open('/home/admin/index?wid=' + siteId + '&ispage=' + page)
				// window.location.href = '/home/admin/index?wid=' + siteId + '&ispage=' + page 
			}
		},
		dialogCallback(index) {
			this.dialogToggle = false
      if(index == '0') {
        this.sitesList.splice(this.indexes, 1)
        this.siteNum = this.sitesList.length
				this.domainNum = this.sitesList.length
        var data="site_id="+this.siteId2
        this.$axios({
          method: 'post',
          url: '/api/Usersites/userwebdel',
          data: data
        }).then((res) => {
          if(res.data.code == '200') {
            alert(res.data.msg)
          }
          if(res.data.code == '404')  {
            alert('删除失败')
          }
        })
      }
		},
		toProductup(siteId) {
			window.open('/index/index/center?site=' + siteId)
			// window.location.href = '/index/index/center?site=' + siteId
		},
		toThirdStep(type) {
			if(type == '01') {
				window.location.href = '/index/index/step'
			}else if(type == '02') {
				window.open('/index/index/allset')
				// window.location.href = '/index/index/allset'
			}
		},
		getSites() {
			this.$axios.get('/api/Usersites/sitesList')
			// this.$axios.get('/api/siteslist.json')
				.then((res) => {
					if(res.data.code == '200') {
						let obj = res.data.data.sitesList
						this.ismmy_model = res.data.data.ismmy_model
						this.typeToggle = res.data.data.type
						this.sitesList = obj.reverse()
						this.siteNum = this.sitesList.length
						this.domainNum = this.sitesList.length

					}
					if(res.data.code == '404') {
						alert(res.data.msg)
						this.siteListOnoff = false
					}
				})
		},
		dltogglehandel() {
	      var urlSearch = window.location.search
				this.listoggle = urlSearch.split("?")[1]
		},
		towork() {
			window.open('/index/index/center?site=' + 'user')
		},
		tomywork() {
			window.open('/index/index/center?site=' + 'user')
		}
	},
	mounted() {
		this.getSites()
		// this.dltogglehandel()
		this.$store.state.navigationOnoff = true
		this.$store.state.navigation1 = '产品中心'
		this.$store.state.navigation2 = '智能建站'
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.container
	.site-title
		padding: 27px 0 20px
		clear: both
		border-bottom: 1px solid #dedede
		&:after
			content: ''
			display: block
			clear: both
		.btnAll
			float: left
		p
			float: left
			margin-left: 40px
			// padding: 0 15px
			border-radius: 10px
			background: #EEEEEE
			line-height: 46px
			font-size: 17px
			span
				margin: 0 20px 0 15px
		.account-btn
			float: right
	.siteList
		margin-top: 20px
		overflow: hidden
		li
			// border-bottom: 1px solid #dedede
			// background: #fff
			padding: 10px 0
			overflow: hidden
			margin-bottom: 20px
			transition: all .3s
			&:hover
				background: #dddada
				padding: 10px
			.img
				max-width: 130px
				width: 130px
				height: 130px
				float: left
				display: flex
				justify-content: center
				align-items: center
				background: #fff
				img
					width: 100%
					height: auto
			.text
				float: left
				margin-left: 30px
				.title
					margin: 0
					border: none
					font-size: 28px
					line-height: 40px
					.sitename
						display: inline-block
						font-size: 23px
					.tobuy
						margin-left: 30px
						display: inline-block
						position: relative
						top: -4px
						// button
						// 	background: #ef966e
						// 	border: none
						// 	border-radius: 2px
						// 	padding: 0 21px
						// 	color: #fff
						// 	line-height: 36px
						// 	font-size: 16px
						// 	&:hover
						// 		background: #835744
						.disabledy
							background: #bcb8b8
							&:hover
								background: #bcb8b8
								cursor: auto
					span
						color: #333 !important
						display: inline-block
						>>> span
							font-size: 22px !important
							color: #333 !important
				.title2
					margin-bottom: 13px
					line-height: 38px
					a
						margin-right: 30px
						color: #F09A73
						font-size: 16px
						white-space: nowrap
					span
						color: #fd0009
						font-size: 14px
						white-space: nowrap
						cursor: pointer
						&:before
							content: ''
							display: inline-block
							width: 8px
							height: 8px
							margin-right: 5px
							background: #fd0009
							border-radius: 50%
							font-size: 8px
							vertical-align: unset
				.spaces
					overflow: hidden
					h5
						float: left
						font-size: 16px
					.progressWrap
						margin: 10px 15px
						float: left
						width: 200px
						height: 20px
						background: #9c31ef
						border-radius: 15px
						div
							height: 20px
							width: 50%
							background: #9753f6
							border-radius: 15px
							box-shadow: 3px 0 5px #8329c7
					p
						float: left
						line-height: 40px
				.btnList
					// button
					// 	margin-right: 14px
					// 	border: 1px solid #ccc
					// 	background: #f6f6f6
					// 	padding: 7px 16px
					// 	border-radius: 2px
					// 	transition: all .3s
					// 	font-size: 13px
					// 	&:hover
					// 		background: $bgColor
					// 		color: #fff
					// 		border-color: $bgColor
			.right
				max-width: 120px
				float: right
				text-align: center
				.visit
					border: 1px solid #7d7d7d
					border-radius: 5px
					padding: 20px 35px
					a
						width: 100%
						line-height: 50px
						display: block
						text-align: center
						font-size: 45px
						color: #333
					p
						margin: 0
						color: #8d8d8d
						font-size: 12px
						text-align: center
						line-height: 24px
				.btn123
					display: block
					margin: 0
					margin-top: 20px
				.disabledy
					background: #CACACA !important
			.sitelist-head
				padding: 15px 0
				overflow: hidden
			.sitelist-foot
				border-top: 1px solid #e2e4e7
				padding-left: 160px
				font-size: 16px
				&:before
					content: ''
					display: block
					clear: both
				p
					margin: 0 25px
					line-height: 44px
					display: inline-block
					font-size: 14px
</style>