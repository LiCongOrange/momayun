<template>
	<div>
		<index-header></index-header>
		<!-- <crumbs></crumbs> -->
		<div class="recharge container">
			<div class="recharge-left">
				<div class="back-btn">
					<a href="/index/index/site">&lt;返回</a>
				</div>
				<div class="recharge-left-tab">
					<p v-for="( item, index ) in headlist"  :class="{ active: item.isActive }" @click="changetab(index)">{{ item.name }}</p>
				</div>
			</div>
			<div class="recharge-right">
				<dialog-bar
					v-if="dialogToggle"
					:dialog-option="dialogOption"
					@confirmHandle="dialogCallback"
				></dialog-bar>
				<!-- <div class="ac_head">
					<div 
						class="head_left" 
						:class="{active: item.isActive}"
						v-for='(item,index) in headlist' 
						@click="changetab(index)"
					>{{item.name}}</div>
				</div> -->



				<div class="ac_body_g" v-if="tabtoggle==1">
					<!-- <button class="add_g" @click='addyg'><i class="iconfont">&#xe6e0;</i>添加员工</button> -->
					<div class="ac_body_g_title">
						<p>员工登录地址：<a target="_blank" href="https://site.momayun.cn/index/index/dllogin">site.momayun.cn/index/index/dllogin</a></p>
						<el-button class="add_g" type="primary" icon="el-icon-circle-plus" @click='addyg'>添加员工</el-button>
					</div>
					<div class="yg_list">
						<ul>
							<li class="yg_list_li">
								<p class="li_id">序号</p>
								<p class="li_name">手机</p>
								<p class="li_password">密码</p>
								<p class="li_do">操作</p>
							</li>
							<li v-for="(item,index) in yglist2[pageindex1]">
								<p class="li_id">{{index+1}}</p>
								<p class="li_name">{{item.mobile}}</p>
								<p class="li_password">{{item.suipass}}</p>
								<p class="li_do">
									<button @click="addweblist(item.member_id,item.type)">绑定</button>
									<button  @click='deleteByID(index, item.member_id)'>删除</button>
									<button @click="changepassword(index,item.member_id,item.type)">修改密码</button>
								</p>
							</li>
						</ul>
					</div>
					<pages
						:total="total"
						:current-page="current"
						:display="display"
						@pagechange='pagechange1'
					></pages>
				</div>
				<div class="ac_body_g" v-if="tabtoggle==2">
					<!-- <button class="add_g" @click='addyg'><i class="iconfont">&#xe6e0;</i>添加用户</button> -->
					<div class="ac_body_g_title">
						<p>用户登录地址：<a target="_blank" href="https://site.momayun.cn/index/index/userlogin">site.momayun.cn/index/index/userlogin</a></p>
						<el-button class="add_g" type="primary" icon="el-icon-circle-plus" @click='addyg'>添加用户</el-button>
					</div>
					<div class="yg_list">
						<ul>
							<li class="yg_list_li">
								<p class="li_id">序号</p>
								<p class="li_name">手机</p>
								<p class="li_password">密码</p>
								<p class="li_do">操作</p>
							</li>
							<li v-for="(item,index) in yhlist2[pageindex2]">
								<p class="li_id">{{index+1}}</p>
								<p class="li_name">{{item.mobile}}</p>
								<p class="li_password">{{item.suipass}}</p>
								<p class="li_do">
									<button @click="addweblist(item.member_id,item.type)">绑定</button>
									<button  @click='deleteByID(index, item.member_id)'>删除</button>
									<button @click="changepassword(index,item.member_id,item.type)">重置密码</button>
								</p>
							</li>
						</ul>
					</div>
					<pages
						:total="total1"
						:current-page="current"
						:display="display"
						@pagechange='pagechange2'
					></pages>
				</div>



				<!-- <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination> -->

				<div class="dislog" v-if="dislogtoggle">
					<div class="addygbox">
						<div class="addclose iconfont" @click="closelog()">&#xe625;</div>
						<div class="title" v-if="tabtoggle == 1">添加员工</div>
						<div class="title" v-if="tabtoggle == 2">添加用户</div>
						<input 
							type="text" 
							class="addphone" 
							placeholder="请输入手机号" 
							v-if="tabtoggle == 1" 
							v-model="yphone" 
							maxlength="11"
							name="mobile"
							:class="{'isDanger': warn1 }"
							:input="getMobile(yphone)"
							>
						<input 
							type="text" 
							class="addyh" 
							placeholder="请输入手机号" 
							v-if="tabtoggle == 2" 
							v-model="hphone" 
							maxlength="11"
							:class="{'isDanger2': warn2 }"
							:input="getMobile2(hphone)"
							>
							 
						<input type="text" class="addyh2" placeholder="请输入账号" v-if="tabtoggle == 2" v-model="hnumber">
						<button class="toadd" @click="toadd" :class="{'noclick':noclick}">确认添加</button>
					</div>
				</div>
				<div class="dislog2" v-if="dislogtoggle2">
					<div class="wablist">
						<div class="addclose iconfont" @click="closelog()">&#xe625;</div>
						<div class="title">网站绑定</div>
						<div>
							<ul>
								<li v-for="(item,index) in weblistarr[pageindex3]">
									<div class="leftimg"></div>
									<div class="rightmessage">
										<div class="webname">{{item.wsname}}</div> 
										<div class="weburl">{{item.main_domin}}</div>
										<div class="webdo">
											<button class="do_yes" @click="webdohandele(index,item.id)" v-if="item.isbang == 0">绑定</button>
											<button class="do_yes" v-if="item.isbang == 1">已绑定</button>
											<button class="do_no" v-if="item.isbang == 1" @click="noweb(index,item.id)">解绑</button> 
										</div>
									</div>
								</li>
							</ul>
							<pages
								:total="total2"
								:current-page="current"
								:display="display"
								@pagechange='pagechange3'
							></pages>
						</div>
						<!-- <v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination> -->
					</div>
				</div>
			</div>
		</div>
</div>
</template>
<script>
	import { mapState } from 'vuex'
	import IndexHeader from '@/common/Header'
	import crumbs from '@/common/Crumbs'
	import dialogBar from '@/common/Dialog'
	import pagination from '@/common/pagination'
	import pages from '@/common/Pages'
	export default{
		components: {
			dialogBar,
			IndexHeader,
			crumbs,
			'v-pagination': pagination,
			pages
		},
		data(){
			return{
				pageindex1: 0,
				pageindex2: 0,
				pageindex3: 0,
				webdotoggle:false,
				tabtoggle:1,
				deleteid:'',
				deleteindex:'',
				userlist:'',
				yhweblist:'',
				dislogtoggle:false,
				dislogtoggle2:false, 
				yphone:'',
				hphone:'',
				hnumber:'',
				uid:'',
				noclick:true,
				warn1: false,
				warn2: false,
				before:false,
				total: '',     // 记录总条数
				total1: '',
				total2: '',
        display: 10,   // 每页显示条数
        current: 1,   // 当前的页数
        newdata:'',
        neweblist:'',
				weblist:'',
        weblistarr: [],
        yglist:[],
        yhlist:[],
        yglist2:[],
        yhlist2:[],
				headlist:[{
					name:'我的员工',
					isActive: true
				},{
					name:'我的用户',
					isActive: false
				}],
				listdata:'',
				dialogToggle: false,
				dialogOption: {
					type: 1,
					content: '删除后无法恢复'
				}
			}
		},
		computed: {
			...mapState({
				userType: state => state.userType
			})
		},
		mounted(){
			if(this.userType == '5' || this.userType == '6') {
				window.location.href = '/index/index/site'
			}
			this.getdata()
			this.$store.state.navigationOnoff = true
			// this.$store.state.navigation1 = '产品中心'
			// this.$store.state.navigation2 = '智能建站'
			// this.$store.state.navigation3 = '管理账户'
		},
		methods:{
			closelog() {
				this.dislogtoggle = false
				this.dislogtoggle2 = false
			},
			pagechange3(index) {
				this.pageindex3 = index - 1
			},
			pagechange2(index) {
				this.pageindex2 = index - 1
			},
			pagechange1(index) {
				this.pageindex1 = index - 1
			},
			changetab(val){
				for(let i=0; i<this.headlist.length; i++) {
					this.headlist[i].isActive = false
				}
				this.headlist[val].isActive = true
				if(val == 1){
					this.tabtoggle = 2
				}else{
					this.tabtoggle = 1
				}
				this.datasplice()
			},
			deleteByID(index, id) {
				// this.dialogToggle = true
				this.deleteid = id
				this.deleteindex = index
				this.$confirm('此操作将删除该条信息，是否继续？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(()=> {
			      this.$axios({
							method: 'post',
							url: '/api/Agent/deluser',
							data: {
								uid: id
							}
						}).then(() => {
								if(this.tabtoggle == 1){
									this.yglist2 = []
									for(let i=0; i<this.yglist.length; i++) {
										if(this.yglist[i].member_id == this.deleteid) {
											this.yglist.splice(i,1)
										}
									}
									for(let i=0; i<this.yglist.length; i+=this.display) {
										this.yglist2.push(this.yglist.slice(i,i+this.display))
									}
									this.total = this.yglist.length
								}else{
									this.yhlist2 = []
									for(let i=0; i<this.yhlist.length; i++) {
										if(this.yhlist[i].member_id == this.deleteid) {
											this.yhlist.splice(i,1)
										}
									}
									for(let i=0; i<this.yhlist.length; i+=this.display) {
										this.yhlist2.push(this.yhlist.slice(i,i+this.display))
									}
									this.total1 = this.yhlist.length
								}
								this.$message({
									type: 'success',
									message: '删除成功！'
								})
					  }).catch(()=> {
					  	this.$message({
					  		type: 'error',
					  		message: '删除失败！'
					  	})
					  })
				})
		  },
		  dialogCallback(index) {
				this.dialogToggle = false
				if(index == '0') {
		       	var data="uid="+this.deleteid;
			      this.$axios({
							method: 'post',
							url: '/api/Agent/deluser',
							data:data
						}).then((res) => {
							if(res.data.code == '200') {
								if(this.tabtoggle == 1){
									this.yglist2 = []
									for(let i=0; i<this.yglist.length; i++) {
										if(this.yglist[i].member_id == this.deleteid) {
											this.yglist.splice(i,1)
										}
									}
									for(let i=0; i<this.yglist.length; i+=this.display) {
										this.yglist2.push(this.yglist.slice(i,i+this.display))
									}
									this.total = this.yglist.length
								}else{
									this.yhlist2 = []
									for(let i=0; i<this.yhlist.length; i++) {
										if(this.yhlist[i].member_id == this.deleteid) {
											this.yhlist.splice(i,1)
										}
									}
									for(let i=0; i<this.yhlist.length; i+=this.display) {
										this.yhlist2.push(this.yhlist.slice(i,i+this.display))
									}
									this.total1 = this.yhlist.length
								}
								alert(res.data.msg)
							}
					  })
				}
			},
		  webdohandele(index,id){
		  	if(this.weblist[index].isbang == 0){
		  		this.$axios({
							method: 'post',
							url: '/api/Agent/webuser',
							data:{
								 webid: id,
								 uid: this.uid
							}
						}).then((res) => {
							if(res.data.code == '200') {
								this.weblist[index].isbang = 1
							}
							if(res.data.code == '404')  {
								alert(res.data.msg)
							}
					})
		  		
		  	}else{
		  		this.weblist[index].isbang = 1
		  	}
		  },
		  noweb(index,id){
				if(this.weblist[index].isbang == 1){
					this.$axios({
							method: 'post',
							url: '/api/Agent/webcancel',
							data:{
								 webid:id,
								 uid:this.uid
							}
						}).then((res) => {
							if(res.data.code == '200') {
								this.weblist[index].isbang = 0
							}
							if(res.data.code == '404')  {
								alert(res.data.msg)
							}
					})
			  	}else{
			  		this.weblist[index].isbang = 0}

			  			  },
		  
			getdata(){
				this.$axios({
							method: 'get',
							url: '/api/Agent/userlist'
							// url: '/api/userlist.json'
						}).then((res) => {
							if(res.data.code == '200') {
								for(var i=0;i<res.data.data.length;i++){
									if(res.data.data[i].type == 6){
										this.yglist.push(res.data.data[i])
									}else{
										this.yhlist.push(res.data.data[i])
									}
								}
								for(let i=0; i<this.yglist.length; i+=this.display) {
									this.yglist2.push(this.yglist.slice(i,i+this.display))
								}
								this.total = this.yglist.length
								for(let i=0; i<this.yhlist.length; i+=this.display) {
									this.yhlist2.push(this.yhlist.slice(i,i+this.display))
								}
								this.total1 = this.yhlist.length
								// this.datasplice()
							}
							if(res.data.code == '404')  {
								alert(res.data.msg)
							}
					})
			},
			addyg(){
				this.dislogtoggle = true
			},
			changepassword(index,id,type){
				 this.$axios({
							method: 'post',
							url: '/api/Agent/passchage',
							data:{
								 member_id:id
							}
						}).then((res) => {
							if(res.data.code == '200') {
								if(type == 5){
									this.yhlist[index].suipass=res.data.data
								}else{
									this.yglist[index].suipass=res.data.data
								}
								
							}
							if(res.data.code == '404')  {
								alert(res.data.msg)
							}
					})
			},
			getMobile(val) {
				if(this.yphone) {
					let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
					if(!reg.test(val)) {
						this.warn1 = true
						this.noclick = true
					}else {
						this.warn1 = false
						this.noclick = false
					}
				}
			},
			getMobile2(val) {
				if(this.hphone) {
					let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
					if(!reg.test(val)) {
						this.warn2 = true
						this.noclick = true
					}else {
						this.warn2 = false
						if(this.hnumber!=""){
							this.noclick = false
						}
						
					}
				}
			},
			addweblist(id,type){
				this.uid = id
				this.pageindex3 = 0
				this.weblist = []
				this.weblistarr = []
				this.$axios({
						method: 'post',
						url: '/api/Agent/bangweblist',
						// method: 'get',
						// url:'/api/bangweblist.json',
						data:{
							 id: id,
							 type: type
						}
					}).then((res) => {
						if(res.data.code == '200') {
							this.weblist = res.data.data
							this.dislogtoggle2 = true
							for(let i=0; i<this.weblist.length; i+=this.display) {
								this.weblistarr.push(this.weblist.slice(i,i+this.display))
							}
							this.total2 = this.weblist.length
						}
						if(res.data.code == '404')  {
							alert(res.data.msg)
						}
				})
			},
			toadd(){
				if(this.tabtoggle == 1){
					 this.$axios({
							method: 'post',
							url: '/api/Agent/newwork',  
							data:{
								mobile:this.yphone
							}
						}).then((res) => {
							if(res.data.code == '200') {
								// alert(res.data.msg)
								this.dislogtoggle = false
								// var newworker={
								// 	type:'6',
								// 	mobile:this.yphone,
								// 	suipass: res.data.data
								// }
								// this.yglist.push(newworker)
								// this.yglist2 = []
								// for(let i=0; i<this.yglist.length; i+=this.display) {
								// 	this.yglist2.push(this.yglist.slice(i,i+this.display))
								// }
								// this.total = this.yglist.length

								this.$message({
									type: 'success',
									message: '注册成功！'
								})
								this.yglist = []
								this.yglist2 = []
								this.yhlist = []
								this.yhlist2 = []
								this.getdata()
							}
							if(res.data.code == '404')  {
								this.$message({
									type: 'error',
									message: '注册失败！'
								})
							}
					})
				}else{
					this.$axios({
							method: 'post',
							url: '/api/Agent/newuser',
							data:{
								mobile:this.hphone,
								name:this.hnumber
							}
						}).then((res) => {
							if(res.data.code == '200') {
								// alert(res.data.msg)
								this.dislogtoggle = false
								// var newworker={
								// 	type:'5',
								// 	mobile:this.hphone,
								// 	suipass:res.data.data,
								// 	name:this.hnumber
								// }
								// this.yhlist.push(newworker)
								// this.yhlist2 = []
								// for(let i=0; i<this.yhlist.length; i+=this.display) {
								// 	this.yhlist2.push(this.yhlist.slice(i,i+this.display))
								// }
								// this.total1 = this.yhlist.length
								this.$message({
									type: 'success',
									message: '注册成功！'
								})
								this.yglist = []
								this.yglist2 = []
								this.yhlist = []
								this.yhlist2 = []
								this.getdata()
							} 
							if(res.data.code == '404')  {
								this.$message({
									type: 'error',
									message: '注册失败！'
								})
							}
					})
				}
			},
			pagechange(currentPage){
       if(this.dislogtoggle2 == true){
       	this.weblistarr=this.neweblist[currentPage-1]
       }else{
       	this.listdata=this.newdata[currentPage-1]
       }
      },
     split_array(arr,len){
			let arr_length = arr.length;
			let newArr = [];
			for(let i=0;i<arr_length;i+=len){
					newArr.push(arr.slice(i,i+len));
				}
				return newArr;
			},
     datasplice(){
	     if(this.tabtoggle == 1){
	     	this.newdata = this.split_array(this.yglist, 10);
	     	this.total= this.yglist.length
	     }else{
	     	this.newdata = this.split_array(this.yhlist, 10);
	     	this.total= this.yhlist.length
	     }
     	this.listdata=this.newdata[0]
     }
		}
	}
</script>
<style lang="stylus" scoped>
@import '~styles/public'
	.recharge
		// height: 690px
		margin: 45px auto 0
		// overflow: hidden
		// background:white
		padding: 0
		display: flex
		justify-content: space-between
		.recharge-left
			background: #fff
			width: 210px
			box-shadow: 0 1px 15px #ccc
			.back-btn
				padding: 27px 0
				text-align: center
				a
					border: 1px solid #ccc
					border-radius: 3px
					background: #f6f6f6
					padding: 12px 21px
					color: #666
					font-size: 17px
					text-decoration: none
					&:hover
						background: #dbd7d7
			.recharge-left-tab
				p
					font-size: 16px
					line-height: 60px
					text-align: center
					cursor: pointer
				.active
					background: #eee
		.recharge-right
			padding: 0 20px
			width: 76%
			background: #fff
			box-shadow: 0 1px 15px #ccc
		.ac_head
			width:390px
			height:40px
			line-height:40px
			border:1px solid #00AD6B
			margin: 25px auto
			color:#00AD6B
			.head_left
				width:50%
				float:left
				text-align:center
				cursor:pointer
				transition: all .3s
				&:nth-child(1)
					border-right:1px solid #00AD6B
			.active
				background: #00AD6B
				color: #fff
		.ac_body_g
			width:100%
			min-height:200px
			.ac_body_g_title
				margin-top: 10px
				display: flex
				justify-content: space-between
				align-items: center
				p
					display: inline-block
					font-size: 13px
					a
						font-size: 14px
			.add_g
				float: right
				font-size: 16px
			.yg_list
				width:100%
				height:auto
				overflow:hidden
				padding-top:10px
				min-height: 691px
				.yg_list_li
					width:100%
					line-height:60px
					margin:0 auto
					font-size:16px
					display: flex
					&:hover
						transform: scale(1)
					p
						flex: 1
						padding:0
						padding-left: 15px
						margin:0
						color:#666
				li
					line-height:60px
					margin:0 auto
					border-bottom:1px solid #ccc
					display: flex
					transition: all .1s
					&:hover
						background:#F7F7F9
						// transform: scale(1.02)
						// box-shadow: 0 3px 3px #f1f2f1
					&:nth-child(1)
						background: #DEDEDE
					p
						flex: 1
						margin:0
						padding-left: 15px
						color:#666
						button
							background:none
							border:none
							margin-right:15px
							color:#666
							&:nth-child(1)
								color: $bgColor
							&:nth-child(3)
								color: $bgColor
		.dislog
			position:fixed
			width:100%
			height:100%
			top:0
			left:0
			right:0
			bottom:0
			background:rgba(0,0,0,.3)
			z-index: 10000
			.addygbox
				width:420px
				min-height:270px
				background:white
				position:absolute
				left:40%
				top:40%
				padding:20px
				.addclose
					float:right
					padding:5px
					height:30px
					text-align:right
					cursor:pointer
					font-size:18px
					margin-top:-10px
				.title
					text-align: center
					font-size: 24px
					font-family:'微软雅黑'
				.addphone
					display:block
					width:80%
					margin:60px auto
					outline:none
					line-height:35px
					padding:0 10px
					border:1px solid #ccc
					&:focus
						border-color: $bgColor
				.isDanger
					border-color: red
				.toadd
					display:block
					width: 55%
					margin:0 auto
					background:#00AD6B
					color:white
					border:none
					font-size:18px
					height:40px
					line-height:40px
					border-radius: 4px
				.addyh
					display:block
					width:80%
					margin:30px auto
					outline:none
					line-height:35px
					padding:0 10px
					border:1px solid #999
					border-radius: 4px
					&:focus
						border-color: $bgColor
				.noclick
					pointer-events: none
					background:#DDDDDD
				.isDanger2
					border-color: red
				.addyh2
					display:block
					width:80%
					margin:0px auto
					margin-bottom:30px
					outline:none
					line-height:35px
					padding:0 10px
					border:1px solid #999
					border-radius: 4px
					&:focus
						border-color: $bgColor
		.dislog2
			position:fixed
			width:100%
			height:100%
			top:0
			left:0
			right:0
			bottom:0
			background:rgba(0,0,0,.3)
			z-index: 100
			.wablist
				width:770px
				min-height:270px
				background:white
				position:absolute
				left:50%
				top:50%
				transform: translate(-50%, -50%)
				padding:20px
				min-height:530px
				.addclose
					float:right
					padding:5px
					height:30px
					text-align:right 
					cursor:pointer
					font-size:18px
					margin-top:-10px
				.title
					text-align:center
					font-size:20px
					font-family:'微软雅黑'
				ul
					height:auto
					overflow:hidden
					margin-top: 20px
					min-height: 500px
					li
						float:left
						width:50%
						padding:10px
						padding-left:32px
						&:nth-child(odd)
							border-right:1px solid #ccc
						.leftimg
							float:left
							width:80px
							height:80px
							background:#FF9A66
							margin-right:20px
						.rightmessage
							float:left
							width:215px
							.webname
								line-height:25px
								height:25px
								overflow:hidden
								font-size:16px
							.weburl
								width:100%
								line-height:25px
								height:25px
								// overflow:hidden
								font-size:15px
								white-space: nowrap
							.webdo
								width:100%
								button
									border:none
									width:60px
									height:30px
									border-radius: 5px
									color:white
									margin-right:20px
								.do_yes
									background:$bgColor
								.before
									background:#FF9B67
								.do_no
									background:#FF9B67
</style>