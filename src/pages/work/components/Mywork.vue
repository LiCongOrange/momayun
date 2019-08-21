<template>
	<div class="my-work">
		<dialog-bar
			v-if="dialogToggle"
			:dialog-option="dialogOption"
			@confirmHandle="dialogCallback"
		></dialog-bar>

		<div class="title">
			<div class="">
				<ul>
					<li 
						v-for="(item, index) in navList" 
						:class="{ active: item.isActive }"
						@click="tabLi(index)"
					>{{ item.name }}</li>
				</ul>
				<div class="search" v-if="userType != '5'">
					<el-button type="info" icon="el-icon-arrow-left" @click="tocenter">返回控制面板</el-button>
				</div>
			</div>
		</div>

		<div v-if="detailToggle" class="work-main">
			<div class="title">
				<div class="">
					<!-- <ul>
						<li 
							v-for="(item, index) in navList" 
							:class="{ active: item.isActive }"
							@click="tabLi(index)"
						>{{ item.name }}</li>
					</ul> -->
					<div class="search">
						<!-- <button @click="releaseHandle('0')">发布工单</button> -->
						<el-button type="primary" @click="dialogVisible = true">发布工单</el-button>
						<!-- <el-button type="primary" @click="releaseHandle('0')">发布工单</el-button> -->
						<!-- <input type="text" name="" placeholder="输入关键字搜索文章">
						<button>搜索</button> -->
					</div>
				</div>
			</div>
			<div class="mainTab">
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
						<li v-for="(item, index) in allwork2[pagesIndex]">
							<span v-text="item.gongdan"></span>
							<span v-text="item.iscom"></span>
							<span v-text="item.type"></span>
							<span v-text="item.title" style="flex:2"></span>
							<span v-text="item.time"></span>
							<span style="flex: 2">
								<!-- <button @click='detail(item,index)'>查看详情</button>
								<button @click='ifchange(index,item.id)' :class="{btnactive:item.iscom == '已解决'}">已解决</button>
								<button @click='deleteByID(index, item.id)'>删除</button> -->
								<el-button type="primary" size="small" @click='detail(item,index)'>查看详情</el-button>
								<el-button type="primary" size="small" @click='ifchange(index,item.id)' :class="{btnactive:item.iscom == '已解决'}">已解决</el-button>
								<el-button type="primary" size="small" @click='deleteByID(index, item.id)'>删除</el-button>
							</span>
						</li>
					</ul>
					<pages 
						:total="total"
						:current-page="current"
						:display="display"
						@pagechange='pagechange'
					></pages>
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
						<li v-for="(item, index) in unwork2[pagesIndex1]">
							<span v-text="item.gongdan"></span>
							<span v-text="item.iscom" v-model="item.iscom"></span>
							<span v-text="item.type"></span>
							<span v-text="item.title" style="flex: 2"></span>
							<span v-text="item.time"></span>
							<span style="flex: 2">
								<!-- <button @click='detail(item,index)'>查看详情</button>
								<button @click='ifchange(index, item.id)' :class="{btnactive:item.iscom == '已解决'}">已解决</button>
								<button @click='deleteByID(index, item.id)'>删除</button> -->
								<el-button type="primary" size="small" @click='detail(item,index)'>查看详情</el-button>
								<el-button type="primary" size="small" @click='ifchange(index, item.id)' :class="{btnactive:item.iscom == '已解决'}">已解决</el-button>
								<el-button type="primary" size="small" @click='deleteByID(index, item.id)'>删除</el-button>
							</span>
						</li>
					</ul>
					<pages 
						:total="total1"
						:current-page="current"
						:display="display"
						@pagechange='pagechange1'
					></pages>
				</div>
				<div class="all" v-if="this.typeNum == 'C'">
					<ul>
						<li>
							<span>编号</span>
							<span v-if=''>状态</span>
							<span>工单类别</span>
							<span style="flex: 2">标题</span>
							<span>发布时间</span>
							<span style="flex: 2">处理</span>
						</li>
						<li v-for="(item, index) in beenwork2[pagesIndex2]" v-if="item.iscom == '已解决'">
							<span v-text="item.gongdan"></span>
							<span v-text="item.iscom"></span>
							<span v-text="item.type"></span>
							<span v-text="item.title" style="flex: 2"></span>
							<span v-text="item.time"></span>
							<span style="flex: 2">
								<!-- <button @click='detail(item,index)'>查看详情</button>
								<button @click='ifchange(index, item.id)' :class="{btnactive:item.iscom == '已解决'}">已解决</button>
								<button @click='deleteByID(index, item.id)'>删除</button> -->
								<el-button type="primary" size="small" @click='detail(item,index)'>查看详情</el-button>
								<el-button type="primary" size="small" @click='ifchange(index, item.id)' :class="{btnactive:item.iscom == '已解决'}">已解决</el-button>
								<el-button type="primary" size="small" @click='deleteByID(index, item.id)'>删除</el-button>
							</span>
						</li>
					</ul>
					<pages 
						:total="total2"
						:current-page="current"
						:display="display"
						@pagechange='pagechange2'
					></pages>
				</div>
				<!-- <layer ref=layer></layer> -->
			</div>
		</div>
		<workdetail v-else></workdetail>
		<div v-if="releaseToggle" class="masking"></div>
		<!-- <release v-if="releaseToggle" @releaseHandle="releaseHandle"></release> -->
		<el-dialog
		  title="发布工单"
		  lock-scroll="true"
		  :visible.sync="dialogVisible"
		  width="50%"
		  :before-close="releaseHandle">
		  <!-- <span>这是一段信息</span> -->
		  <release @releaseHandle="releaseHandle"></release>
		</el-dialog>
	</div>
</template>
<script>
import Workdetail from '../components/Workdetail'
import Vue from 'vue'
import { mapState } from 'vuex'
import layer from 'vue-layer'
Vue.prototype.$layer = layer(Vue)
import IndexHeader from '@/common/Header'
import Crumbs from '@/common/Crumbs'
import pages from '@/common/Pages'
import dialogBar from '@/common/Dialog'
import release from '@/pages/work/components/Release'
export default {
	components: {
		IndexHeader,
		Crumbs,
		pages,
		dialogBar,
		Workdetail,
		release
	},
	data() {
		return {
			dialogVisible: false,
			releaseToggle: false,
			dialogToggle: false,
			deleteid:'',
			deleteindex:'',
			dialogOption: {
				type: 1,
				content: '删除后无法恢复'
			},
			allwork: [],
			allwork2: [],
			beenwork: [],
			unwork: [],
			beenwork2: [],
			unwork2: [],
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
			total: 10,   //记录总条数
			display: 10,  //每页显示条数
			current: 1,   //当前的页数
			total1: 10,
			total2: 10,
			pagesIndex: 0,
			pagesIndex1: 0,
			pagesIndex2: 0
		}
	},
	computed: {
		...mapState({
			detailToggle: state => state.detailToggle,
			userType: state => state.userType
		})
	},
	methods: {
		tocenter() {
			window.location.href = '/index/index/center?site=' + 'cen'
			// this.$store.commit('userToggleHandel', true)
		},
		releaseHandle(type) {
			if(type == '0') {
				this.dialogVisible = true
			}else {
				this.dialogVisible = false
				this.getdata()
			}
		},
		pagechange(currentPage) {
			this.pagesIndex = currentPage - 1
		},
		pagechange1(currentPage) {
			this.pagesIndex1 = currentPage - 1
		},
		pagechange2(currentPage) {
			this.pagesIndex2 = currentPage - 1
		},
		dialogCallback(index) {
			this.dialogToggle = false
			if(index == '0') {
	      // this.allwork.splice(this.deleteindex, 1)
	      var data="id="+this.deleteid;
	      this.$axios({
					method: 'post',
					url: '/home/Content/repairdel',
					data:data
				}).then((res) => {
					if(res.data.code == '200') {
						alert(res.data.msg)
						this.beenwork = []
						this.unwork = []
						this.beenwork2 = []
						this.unwork2 = []
						this.allwork2 = []
						for(let i=0; i<this.allwork.length; i++) {
							if(this.allwork[i].id == this.deleteid) {
								this.allwork.splice(i, 1)
							}
						}
						// this.allwork.splice(this.deleteindex, 1)
						for(let i=0; i<this.allwork.length; i++) {
							if(this.allwork[i].iscom == '已解决') {
								this.beenwork.push(this.allwork[i])
							}else {
								this.unwork.push(this.allwork[i])
							}
						}
						for(let i=0,len=this.allwork.length;i<len;i+=this.display) {
							this.allwork2.push(this.allwork.slice(i,i+this.display))
						}
						this.total = this.allwork.length
						for(let i=0,len=this.beenwork.length;i<len;i+=this.display) {
							this.beenwork2.push(this.beenwork.slice(i,i+this.display))
						}
						this.total2 = this.beenwork.length
						for(let i=0,len=this.unwork.length;i<len;i+=this.display) {
							this.unwork2.push(this.unwork.slice(i,i+this.display))
						}
						this.total1 = this.unwork.length
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
			// this.$axios.get('/api/repairlist.json')
			.then(this.thengetdata)
		},
		thengetdata(res){
			if(res.data.code == '200'){
				this.allwork = []
				this.allwork2 = []
				this.beenwork = []
				this.beenwork2 = []
				this.unwork = []
				this.unwork2 = []

				this.allwork=res.data.data
				for(let i=0; i<this.allwork.length; i++) {
					if(this.allwork[i].iscom == '已解决') {
						this.beenwork.push(this.allwork[i])
					}else {
						this.unwork.push(this.allwork[i])
					}
				}
				for(let i=0,len=this.allwork.length;i<len;i+=this.display) {
					this.allwork2.push(this.allwork.slice(i,i+this.display))
				}
				this.total = this.allwork.length
				for(let i=0,len=this.beenwork.length;i<len;i+=this.display) {
					this.beenwork2.push(this.beenwork.slice(i,i+this.display))
				}
				this.total2 = this.beenwork.length
				for(let i=0,len=this.unwork.length;i<len;i+=this.display) {
					this.unwork2.push(this.unwork.slice(i,i+this.display))
				}
				this.total1 = this.unwork.length
			}
		},
		deleteByID(index, id) {
			// this.dialogToggle = true
			this.deleteid = id
			this.deleteindex = index
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(()=> {
	      this.$axios({
					method: 'post',
					url: '/home/Content/repairdel',
					data: {
						id: id
					}
				}).then(() => {
						// alert(res.data.msg)
						this.beenwork = []
						this.unwork = []
						this.beenwork2 = []
						this.unwork2 = []
						this.allwork2 = []
						for(let i=0; i<this.allwork.length; i++) {
							if(this.allwork[i].id == this.deleteid) {
								this.allwork.splice(i, 1)
							}
						}
						// this.allwork.splice(this.deleteindex, 1)
						for(let i=0; i<this.allwork.length; i++) {
							if(this.allwork[i].iscom == '已解决') {
								this.beenwork.push(this.allwork[i])
							}else {
								this.unwork.push(this.allwork[i])
							}
						}
						for(let i=0,len=this.allwork.length;i<len;i+=this.display) {
							this.allwork2.push(this.allwork.slice(i,i+this.display))
						}
						this.total = this.allwork.length
						for(let i=0,len=this.beenwork.length;i<len;i+=this.display) {
							this.beenwork2.push(this.beenwork.slice(i,i+this.display))
						}
						this.total2 = this.beenwork.length
						for(let i=0,len=this.unwork.length;i<len;i+=this.display) {
							this.unwork2.push(this.unwork.slice(i,i+this.display))
						}
						this.total1 = this.unwork.length
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
			}).catch(()=> {
				this.$message({
					type: 'info',
					message: '已取消此次操作。'
				})
			})
	  },
    ifchange(index,id){
    	// this.allwork[index].iscom="已解决"
    	var data="id="+id;
    	this.$axios({
				method: 'post',
				url: '/home/Content/repairso',
				data: data
			}).then((res) => {
					this.$message({
						type: 'success',
						message: '工单已解决。'
					})
					this.allwork[index].iscom="已解决"
					this.beenwork = []
					this.unwork = []
					this.beenwork2 = []
					this.unwork2 = []
					for(let i=0; i<this.allwork.length; i++) {
						if(this.allwork[i].iscom == '已解决') {
							this.beenwork.push(this.allwork[i])
						}else {
							this.unwork.push(this.allwork[i])
						}
					}
					this.total = this.allwork.length
					for(let i=0,len=this.beenwork.length;i<len;i+=this.display) {
						this.beenwork2.push(this.beenwork.slice(i,i+this.display))
					}
					this.total2 = this.beenwork.length
					for(let i=0,len=this.unwork.length;i<len;i+=this.display) {
						this.unwork2.push(this.unwork.slice(i,i+this.display))
					}
					this.total1 = this.unwork.length
			}).catch(()=> {
				this.$message({
					type: 'error',
					message: '操作失败！'
				})
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
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.my-work
	width: 100%
	height: 100%
	overflow: hidden
	.masking
		position: fixed
		top: 0
		left: 0
		bottom: 0
		right: 0
		background: rgba(0, 0, 0, .45)
		z-index: 150
	.title
		height: 50px
		border-bottom: 1px solid #ebebeb
		background: #fff
		padding: 0 20px
		line-height: 50px
		ul
			float: left
			margin-bottom: 0
			li
				float: left
				margin-right: 20px
				cursor: pointer
			.active
				border-bottom: 2px solid $bgColor
		.search
			float: right
			// padding-top: 15px
			input
				border: 1px solid #c0c0c0
				border-radius: 15px
				line-height: 34px
				text-indent: 12px
			button
				padding: 8px 15px
	.work-main
		padding: 20px
	.mainTab
		background: #fff
		padding: 0
		// min-height: 552px
		ul
			min-height: 496px
			margin: 0
			li
				border-bottom: 1px solid #ebebeb
				display: flex
				width: 100%
				line-height: 44px
				transition: all .3s
				&:hover
					background: #f1f2f1
					// transform: scale(1.02, 1)
					box-shadow: 0 3px 3px #f1f2f1
				&:nth-of-type(1)
					span
						font-size: 16px
					&:hover
						transform: scale(1, 1)
						background: none
						box-shadow: none
				span
					flex: 1
					text-align: center
					font-size: 14px
					color: $fontColor
					white-space: nowrap
					button
						padding: 7px
					.btnactive
						border-color:  #ccc
						pointer-events:none
						background: #ccc
</style>