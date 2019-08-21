<template>
	<div class="b_box">
		<div class="b_box_inner">
			<div class="work_title">工单详情</div>
			<div class="work_iscom">
				<div class="is_li" :class="{is_active:this.$store.state.workdetail.iscom == '未解决'}">
					<span>工单受理</span>
					<i class="iconfont iconcolor" >&#xe72d;</i>
				</div>
				<div class="is_li" :class="{is_active:this.$store.state.workdetail.iscom == '处理中'}">
					<span>工单处理中</span>
					<i class="iconfont iconcolor" >&#xe629;</i>
				</div>
				<div class="is_li" :class="{is_active:this.$store.state.workdetail.iscom == '已解决'}">
					<span>工单完成确认</span>
				</div>
			</div>
			<div class="work_desc">
				<ul>
					<li>
						<div class="li_left">工单编号:</div>
						<div class="li_right">{{this.$store.state.workdetail.gongdan}}</div>
					</li> 
					<li>
						<div class="li_left">工单类型:</div>
						<div class="li_right">{{this.$store.state.workdetail.type}}</div>
					</li>
					<li>
						<div class="li_left">工单标题:</div>
						<div class="li_right">{{this.$store.state.workdetail.title}}</div>
					</li>
					<li>
						<div class="li_left">发布时间:</div>
						<div class="li_right">{{this.$store.state.workdetail.time}}</div>
					</li>
				</ul>
			</div>
			<div class="work_talk">
				<div class="talk_title">沟通记录</div>
				<div class="talk_con">
					<ul>
						<li 
							v-for="item in newdetail"
							:class="{ 'self': item.type == '1' || item.type == '2' || item.type == '3' || item.type == '4' || item.type == '5' || item.type == '6' || item.type == '7' || item.type == '9', 'user': item.type != '1' && item.type != '2' && item.type != '3' && item.type != '4' && item.type != '5' && item.type != '6' && item.type != '7' && item.type != '9'}"
						>
							<i v-if="item.type != '1' && item.type != '2' && item.type != '3' && item.type != '4' && item.type != '5' && item.type != '6' && item.type != '7' && item.type != '9'" class="iconfont">&#xe60d;</i>
							<i v-else class="iconfont">&#xe61d;</i>
							<span class="li_span">
								<span>{{item.usedesc}}</span><br />
								<p v-for="(ite, index) in item.url">
									<img :src="ite.url">
								</p>
							</span>
						</li>
						<!-- <li 
							v-for="item in newdetail" 
							class="self" 
							v-if="item.type == '1' || item.type == '2' || item.type == '3' || item.type == '4' || item.type == '5' || item.type == '6' || item.type == '7' || item.type == '9'">
							<i class="iconfont">&#xe61d;</i>
							<span class="li_span">
								<span>{{item.usedesc}}</span><br />
								<p v-for="(ite, index) in item.url">
									<img :src="ite.url">
								</p>
							</span>
						</li>
						<li 
							v-for="item in newdetail" 
							class='user'
							v-if="item.type != '1' && item.type != '2' && item.type != '3' && item.type != '4' && item.type != '5' && item.type != '6' && item.type != '7' && item.type != '9'">
							<i class="iconfont">&#xe60d;</i>
							<span class="li_span">
								<span>{{item.usedesc}}</span><br />
								<p v-for="(ite, index) in item.url">
									<img :src="ite.url">
								</p>
							</span>
						</li> -->
					</ul>
					
				</div>
				<div class="talk_return">
				 	<div class="talk_title">发表回复</div>
					<div class="return_con">
						<div class="return_con_l">
							<textarea placeholder="发表你的回复" v-model="newdes">
								<!-- <img :src="item.src" v-for="item in files" class="newimg"> -->
							</textarea>
						</div>
					</div>
					<div class="return_con_r">
						<div class="title_box">
							<i class="iconfont icon_upimg">&#xe61b;</i>
							<span class="upspan">上传图片</span>
							<span style="color:#AEAEAE">(最多上传5张)</span>
						</div>
						<div class="imgbox">
							<div class="imglist-ul">
								<div class="imglist-ul-li" v-for="(item, index) in files">
									<img :src="item.src" class="newimg">
									<!-- <h5>{{ item.name }}</h5> -->
									<i class="iconfont" @click="deleteimgHandle(index)">&#xe6e9;</i>
								</div>
							</div>
							
							<input type="file" name="" class="upimg" id="upimg"  @change='add_img' ref="file">
							<label v-if="upimgToggle" for="upimg" class="lab_upimg">上传图片</label>
						</div> 
					</div> 

					<div class="send">
						<button @click="send">发表</button>
						<button @click="back">返回</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'	
	export default {
		data(){
			return{
				upimgToggle: true,
				is_active:false,
				is_active2:false,
				is_active3:false,
				detail:'',
				newdetail:'',
				desc:[{
					who:'user',
					usedesc:'sdlfjsldflsdkj',
					url:[{url:'https://bpic.588ku.com/illus_water_img/18/08/19/a9d1ceb6adaff63911edcf13364775c7.jpg!/watermark/url/L3dhdGVyL3dhdGVyX2JhY2tfNDAwXzIwMC5wbmc=/repeat/true'},{url:'https://bpic.588ku.com/illus_water_img/18/08/19/a9d1ceb6adaff63911edcf13364775c7.jpg!/watermark/url/L3dhdGVyL3dhdGVyX2JhY2tfNDAwXzIwMC5wbmc=/repeat/true'}]
				},{
					who:'self',
					usedesc:'13246843543545',
					url:[{url:'https://bpic.588ku.com/illus_water_img/18/08/19/a9d1ceb6adaff63911edcf13364775c7.jpg!/watermark/url/L3dhdGVyL3dhdGVyX2JhY2tfNDAwXzIwMC5wbmc=/repeat/true'}]
				},{
					who:'self',
					usedesc:'13246843543545',
				},{
					who:'self',
					usedesc:'13246843543545',
				},{
					who:'self',
					usedesc:'13246843543545',
				},{
					who:'self',
					usedesc:'13246843543545',
				},{
					who:'self',
					usedesc:'13246843543545',
				},{
					who:'self',
					usedesc:'13246843543545',
				}],
				newdes:'',
				files:[],
				imgs:[],
				lsimgs:[]
			}
		},
		watch: {
			files(data) {
				if(data.length >= 5) {
					this.upimgToggle = false
				}else {
					this.upimgToggle = true
				}
			}
		},
		computed: {
			...mapState({
				userType: state => state.userType
			})
		},
		methods:{
			deleteimgHandle(index) {
				this.files.splice(index, 1)
			},
			back() {
				this.$store.state.detailToggle = true
			},
			html5Reader(file, item) {
				const reader = new FileReader()
				reader.onload = (e) => {
					this.$set(item, 'src', e.target.result)
				}
				reader.readAsDataURL(file)
			},
			isContain(file) {
				return this.files.find( (item) => item.name === file.name && item.size === file.size )
			},
			add_img(){  
				const list = this.$refs.file.files
				for(let i = 0; i < list.length; i++) {
					let formart = list[i].name.split(".")[1]
					if(formart == "jpg" || formart == "png" || formart == "gif" || formart == "jpeg") {
						if(!this.isContain(list[i])) {
							const item = {
								name: list[i].name,
								size: list[i].size,
								file: list[i]
							}
							// this.imglist.push(list[i])
							this.html5Reader(list[i], item)
							this.files.push(item)
							// this.files.(0,1)
							// console.log(this.files.src)
							// this.newdes.push(this.files.name)
							
						}
					}else {
						alert("文件格式不支持上传")
					}
				}	
			},
			send(){
				if(this.newdes=='' && this.files==''){
					alert("输入内容不能为空")
				}else if(this.files==''){
					let obj= {
							// who:'self',
							type: this.userType,
							name:'',
							time:'',
							url: '',
							usedesc: this.newdes,
							completime:''
						}	
						this.newdetail.push(obj)

						this.$axios({
							method: 'post',
							url: '/home/Content/repairhui',
							data: {
									id:this.$store.state.workdetail.id,
									desc:this.newdes,
									imgurl:''
								},
							transformRequest: [function(data) { 
								return JSON.stringify(data)
							}],
							headers: {
								'Content-Type': 'application/json;charset=UTF-8'
							}, 
						}).then((res) => {
								if(res.data.code == '200') {
									this.newdes=''
									this.files=[]
									this.imgs=[]
								}
								if(res.data.code == '404') {
									alert(res.data.msg)
								}
						})
					}else{
						// 循环获取需要上传的图片
						for(var i=0;i<$('.newimg').length;i++){
							let imgobj={
								url:$('.newimg')[i].src
							}
							this.imgs.push(imgobj)
						}
						// 循环获取需要上传的图片结束
						let obj= {
							type: this.userType,
							name:'',
							time:'',
							url: this.imgs,
							usedesc: this.newdes,
							completime:''
						}	
						this.newdetail.push(obj)
						$(".talk_con").scrollTop($(".talk_con")[0].scrollHeight);
						this.$axios({
							method: 'post',
							url: '/api/upload/imgsUpload',
							data: this.imgs
						}).then((res) => {
							if(res.data.code == '200') {
								this.imgurl=res.data.data
								// 接口二
								this.$axios({
									method: 'post',
									url: '/home/Content/repairhui',
									data: {
										id:this.$store.state.workdetail.id,
										desc:this.newdes,
										imgurl:this.imgurl
										},
									transformRequest: [function(data) { 
										// return encodeURI(encodeURI(JSON.stringify(ret)))
										return JSON.stringify(data)
									}],
									headers: {
										'Content-Type': 'application/json;charset=UTF-8'
									}, 
								}).then((res) => {
									if(res.data.code == '200') {
										this.newdes=''
										this.files=[]
										this.imgs=[]
									}
									if(res.data.code == '404') {
										alert(res.data.msg)
									}
								})
								// 接口二
							}
							if(res.data.code == '404') {
								alert(res.data.msg)
							}
						})
				}
			}
		},
		mounted() {
			$(".talk_con").scrollTop($(".talk_con")[0].scrollHeight)
			this.detail=this.$store.state.workdetail.desc
			this.newdetail=JSON.parse( this.detail )
		},
		updated:function(){
			$(".talk_con").scrollTop($(".talk_con")[0].scrollHeight);
		}
	}
</script>
<style lang="stylus" scoped>
@import '~styles/public'
	.b_box
		// width:100%
		background:white
		height:auto
		overflow:hidden
		height:auto
		margin: 20px
		.b_box_inner
			padding: 0 15px
		.work_title
			font-size:24px
			border-bottom:1px solid #eee
			width:100%
			padding:5px 0
		.work_iscom
			line-height:50px
			.is_li
				float:left
				margin-right:20px
			.is_active
				color:#B2E5D2
				.iconcolor
					color:#3CC741	
			span
				font-weight:bold
			.iconcolor
				font-size:18px
				vertical-align:middle
		.work_desc
			width:100%
			height:auto
			overflow:hidden
			background:#F2F2F2
			ul
				padding:10px
				overflow:hidden
				li
					width:50%
					float:left
					line-height:30px
					font-size:14px
					color:#ABABAB
					.li_left
						float:left
						min-width:80px
						text-align:right
					.li_right
						float:left
						padding-left:10px
						color:#474747
		.work_talk
			width:100%
			height:auto
			overflow:hidden
			margin-top:30px
			.talk_title
				padding:5px 10px
				line-height:40px
				background:#F2F2F2
				color:#474747
				font-size:16px
			.talk_con
				padding:10px
				margin-top:20px
				background:white
				height:300px
				border:1px solid #eee
				overflow:auto
				ul
					width:100%
					height:auto
					overflow:hidden
					li
						width:100%
						height:auto
						overflow:hidden
						margin-bottom:10px
						i
							display:inline-block
							// width:50px
							// height:50px
							// border-radius:50%
							// background:red
							font-size:40px
						.li_span
							display:inline-block
							padding:5px
							background:#B2E5D2
							border-radius: 10px
							max-width: 900px
							span
								padding: 0
								border-radius: 10px
							img
								max-width: 250px
								height: auto
					.user
						text-align:left
						i
							float:left
						.li_span
							background: #9ec1b4	    
						span
							margin-top:10px
							margin-left:10px
					.self
						text-align:right
						i
							float:right
							font-size:35px
						span
							margin-top:10px
							margin-right:10px
				.mysend
					float
			.talk_return
				width:100%
				height:auto
				overflow:hidden
				.return_title
					padding:10px
					background:#F2F2F2
					color:#474747
					font-size:16px
				.return_con
					width:100%
					height:150px
					border:1px solid #eee
					.return_con_l
						float:left
						width:100%
						height:98%
						border-right:1px solid #eee
						textarea
							display:block
							width:100%
							height:100%
							padding:1%
							border:none
							.newimg
								width:100px
								height:100px
								display:inline-block
				.return_con_r
					display:block
					width:100%
					height:100%
					overflow:hidden
					.title_box
						line-height:40px
						.icon_upimg
							display:inline-block
							font-size:20px
							color:#FB965E
						.upspan
							font-size:16px
							color:#4C4C4C
				.imgbox
					.imglist-ul
						display: flex
						float: left
						flex-wrap: wrap
						.imglist-ul-li
							position: relative
							padding: 10px
							min-width: 180px
							text-align: center
							img
								width: auto
								max-height: 150px
							i
								position: absolute
								right: 5px 
								top: 5px
								font-size: 22px
								cursor: pointer
					.upimg
							display:none
					.lab_upimg
						float:left
						width:100px
						height:100px
						background:url('../../../../static/images/a11.png')
						background-size:cover
						color:white
						line-height:30px
						cursor:pointer
				.send
					float: left
					margin: 50px 0
					cursor:pointer
					color:white
					text-align:center
					line-height: 40px
					transition: all .3s
					button
						border: none
						background: $bgColor
						border-radius: 3px
						padding: 0 35px
						font-size: 16px
						&:hover
							background: $btnhoverbg
</style>