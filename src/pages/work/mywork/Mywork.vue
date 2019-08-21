<template>
	<div class="my-work">
		<dialog-bar
			v-if="dialogToggle"
			:dialog-option="dialogOption"
			@confirmHandle="dialogCallback"
		></dialog-bar>
		<index-header></index-header>
		<crumbs></crumbs>
		<div v-if="detailToggle">
			<div class="title">
				<div class="container">
					<ul>
						<li 
							v-for="(item, index) in navList" 
							:class="{ active: item.isActive }"
							@click="tabLi(index)"
						>{{ item.name }}</li>
					</ul>
					<!-- <div class="search">
						<input type="text" name="" placeholder="输入关键字搜索文章">
						<button>搜索</button>
					</div> -->
				</div>
			</div>
			<div class="container mainTab">
				<div class="all" v-if="this.typeNum == 'A'">
					<ul>
						<li>
							<span>编号</span>
							<span>状态</span>
							<span>工单类别</span>
							<span style="flex: 2">标题</span>
							<span>发布时间</span>
							<span style="flex: 2">处理</span>
						</li>
						<li v-for="(item, index) in allwork">
							<span v-text="item.gongdan"></span>
							<span v-text="item.iscom"></span>
							<span v-text="item.type"></span>
							<span v-text="item.title" style="flex:2"></span>
							<span v-text="item.time"></span>
							<span style="flex: 2">
								<button @click='detail(item,index)'>查看详情</button>
								<button @click='ifchange(index,item.id)' :class="{btnactive:item.iscom == '已解决'}">已解决</button>
								<button @click='deleteByID(index, item.id)'>删除</button>
							</span>
						</li>
						<pages></pages>
					</ul>
				</div>
				<div class="all" v-if="this.typeNum == 'B'">
					<ul>
						<li>
							<span>编号</span>
							<span>状态</span>
							<span>工单类别</span>
							<span style="flex: 2">标题</span>
							<span>发布时间</span>
							<span style="flex: 2">处理</span>
						</li>
						<li v-for="(item, index) in allwork" v-if="item.iscom == '未解决'">
							<span v-text="item.gongdan"></span>
							<span v-text="item.iscom" v-model="item.iscom"></span>
							<span v-text="item.type"></span>
							<span v-text="item.title" style="flex: 2"></span>
							<span v-text="item.time"></span>
							<span style="flex: 2">
								<button @click='detail(item,index)'>查看详情</button>
								<button @click='ifchange(index, item.id)' :class="{btnactive:item.iscom == '已解决'}">已解决</button>
								<button @click='deleteByID(index, item.id)'>删除</button>
							</span>
						</li>
					</ul>
				</div>
				<div class="all" v-if="this.typeNum == 'C'">
					<ul>
						<ul>
						<li>
							<span>编号</span>
							<span v-if=''>状态</span>
							<span>工单类别</span>
							<span style="flex: 2">标题</span>
							<span>发布时间</span>
							<span style="flex: 2">处理</span>
						</li>
						<li v-for="(item, index) in allwork" v-if="item.iscom == '已解决'">
							<span v-text="item.gongdan"></span>
							<span v-text="item.iscom"></span>
							<span v-text="item.type"></span>
							<span v-text="item.title" style="flex: 2"></span>
							<span v-text="item.time"></span>
							<span style="flex: 2">
								<button @click='detail(item,index)'>查看详情</button>
								<button @click='ifchange(index, item.id)' :class="{btnactive:item.iscom == '已解决'}">已解决</button>
								<button @click='deleteByID(index, item.id)'>删除</button>
							</span>
						</li>
					</ul>
					</ul>
				</div>
				<!-- <layer ref=layer></layer> -->
			</div>
		</div>
		<workdetail v-else></workdetail>
	</div>
</template>
<script>
import Workdetail from '../components/Workdetail'
import Vue from 'vue'
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue)
import IndexHeader from '@/common/Header'
import Crumbs from '@/common/Crumbs'
import pages from '@/common/Pages'
import dialogBar from '@/common/Dialog'
export default {
	components: {
		IndexHeader,
		Crumbs,
		pages,
		dialogBar,
		Workdetail
	},
	data() {
		return {
			dialogToggle: false,
			deleteid:'',
			deleteindex:'',
			dialogOption: {
				type: 1,
				content: '删除后无法恢复'
			},
			allwork: '',
			typeNum: 'A',
			typestate:'0',
			isbtnactive:false,
			navList: [{
				name: '全部',
				isActive: true
			}, { 
				name: '未处理',
				isActive: false
			}, {
				name: '已解决',
				isActive: false
			}],
			total: 150,   //记录总条数
			display: 1,  //每页显示条数
			current: 1,   //当前的页数
			workList: [{
				iscom: '未解决',
				type: '插件问题',
				title: '标题内容1',
				gongdan: '1',
				desc:[{
						"name":"\u7528\u62379667",
						"time":1534399679,
						"usedesc":"sdfsdfs",
						"url":[{"url":"\/upload\/images\/20180816\/5b7514bfa5d1c.jpeg"}]
					},{
						"name":"\u7528\u62379667",
						"time":1534399679,
						"usedesc":"sdfsdfs",
						"url":[{"url":"\/upload\/images\/20180816\/5b7514bfa5d1c.jpeg"}]
					},{
						"name":"\u7528\u62379667",
						"time":1534399679,
						"usedesc":"345343",
						"url":[{"url":"\/upload\/images\/20180816\/5b7514bfa5d1c.jpeg"}]
					}],
				time: '2018-07-01',
				// desc:'今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪'
			}, {
				iscom: '已解决',
				type: '插件问题',
				title: '标题内容2',
				gongdan: '2',
				time: '2018-07-01',
				desc:'今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪'
			}, {
				iscom: '已解决',
				type: '插件问题',
				title: '标题内容',
				gongdan: '112210',
				time: '2018-07-01',
				desc:'今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪 今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪'
			},{
				iscom: '未解决',
				type: '插件问题',
				title: '标题内容',
				gongdan: '113310',
				time: '2018-07-01',
				desc:'今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪今夜的星星已早睡露出了欣慰的余微歌声穿过这夜空穿过了你我的心扉风儿吹动了帆船儿推开了岸桨啊叫醒了鱼儿歌声唱醉了人哪'
			}]
		}
	},
	computed: {
		detailToggle() {
			return this.$store.state.detailToggle
		}
	},
	methods: {
		dialogCallback(index) {
			console.log(index)
			this.dialogToggle = false
			if(index == '0') {
	      this.allwork.splice(this.deleteindex, 1)
	       var data="id="+this.deleteid;
	      this.$axios({
					method: 'post',
					url: '/home/Content/repairdel',
					data:data
				}).then((res) => {
					if(res.data.code == '200') {
						alert(res.data.msg)
						// this.$store.iscom.toLoginType = 'E'
						// this.$store.iscom.funcType = 'B'
					}
					if(res.data.code == '404')  {
						alert('删除失败')
					}
				})
			}
		},
		backRelease(val) {
			window.location.href = '/index/index/work'
			// this.$router.push({path: '/work'})
			// this.$store.iscom.workNum = 0
			this.$store.iscom.navigation2 = '发布工单'
		},
		tabLi(val) {
			for(let i=0; i<this.navList.length; i++) {
				this.navList[i].isActive = false
			}
			this.navList[val].isActive = true
			if(val == '0') {
				this.typeNum = 'A'
			}else if(val == '1') {
				this.typeNum = 'B'
			}else if(val == '2') {
				this.typeNum = 'C'
			}
		},
		getdata(){
			this.$axios.get('/home/Content/repairlist')
			.then(this.thengetdata)
		},
		thengetdata(res){
			if(res.data.code == '200'){
				this.allwork=res.data.data;
			}
		},
		deleteByID(index, id) {
			this.dialogToggle = true
			this.deleteid = id
			this.deleteindex = index
	   },
	    ifchange(index,id){
	    	this.allwork[index].iscom="已解决"
	    	var data="id="+id;
	    	this.$axios({
					method: 'post',
					url: '/home/Content/repairso',
					data:data
				}).then((res) => {
					if(res.data.code == '200') {
						alert(res.data.msg)
						// this.$store.iscom.toLoginType = 'E'
						// this.$store.iscom.funcType = 'B'
					}
					if(res.data.code == '404')  {
						alert('修改失败')
					}
				})
	    },
	    detail(item,index){
	    	this.$store.state.navigation3 = '工单详情'
	    	this.$store.state.workdetail=item
	    	this.$store.commit('detailToggleHandel', false)
	    }
	},
	created() {
		this.getdata()
		this.$store.state.navigation1 = '个人中心'
		this.$store.state.navigation2 = '我的工单'
	},
	mounted() {
		this.$axios({
			method: 'get',
			url: '/home/passport/islogin'
		}).then((res)=> {
			if(res.data.code == '404') {
				alert('未登录用户，请先登录')
        		window.location.href = '/index/index/login'
			}
		})
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.my-work
	// overflow: hidden
	width: 100%
	height: 100%
	background: #f1f1f1
	margin-top: 25px
	.title
		height: 66px
		background: #fff
		ul
			float: left
			li
				float: left
				margin-right: 20px
				line-height: 66px
				cursor: pointer
			.active
				border-bottom: 2px solid $bgColor
				color: $bgColor
		.search
			float: right
			padding-top: 15px
			input
				border: 1px solid #c0c0c0
				border-radius: 15px
				line-height: 34px
				text-indent: 12px
			button
				border: none
				background: $bgColor
				border-radius: 15px
				padding: 5px 15px
				margin-left: 10px
				color: #fff
				font-size: 16px
	.mainTab
		background: #fff
		margin-top: 20px
		padding: 0
		min-height: 500px
		ul
			margin: 0
			li
				display: flex
				width: 100%
				line-height: 44px
				&:nth-of-type(even)
					background: #ebebeb
				&:nth-of-type(1)
					span
						font-weight: bold
						font-size: 18px
				span
					flex: 1
					text-align: center
					font-size: 14px
					color: $fontColor
					button
						border:1px solid #ccc
						padding:5px 10px
						background:#318641
						color:white
						font-size: 14px
						border-radius:5px
						cursor:pointer
						border:none
						line-height:20px
					.btnactive
						pointer-events:none
						background:#ccc
</style>