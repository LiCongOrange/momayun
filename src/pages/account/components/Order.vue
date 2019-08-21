<template>
	<div class="account">

		<dialog-bar
			v-if="dialogToggle"
			:dialog-option="dialogOption"
			@confirmHandle="dialogCallback"
		></dialog-bar>

		<div class="title">
			<el-radio v-model="radioType" label="1">待支付</el-radio>
			<el-radio v-model="radioType" label="2">已支付</el-radio>
		</div>

		<div>

			<div class="tabList">
				<div class="list01" v-if="typeNum == 'A'">
					<ul>
						<li>
							<h5>商品名称</h5>
							<h5>价格</h5>
							<h5>小计</h5>
							<!-- <h5>优惠</h5> -->
							<h5>操作</h5>
						</li>
						<li v-for="(item, index) in unfinishedlist2[pagesIndex1]" v-if="item.status =='1' " :key="item.id">
							<p v-html="item.good_array[0].title"></p>
							<p>{{ item.order_amount }}元</p>
							<p>{{ item.pay_amount }}元</p>
							<!-- <p>{{ item.prefer }}元</p> -->
							<p>
								<a href="javascript:;" @click="deleteHandel(index, item.id, '0')">删除订单</a>
								<a href="javascript:;" @click="toPay(item, index, '1', item.id)">立即付款</a>
							</p>
						</li>
					</ul>
					<pages
						:total="total1"
						:current-page="current"
						:display="display"
						@pagechange='pagechange1'
					></pages>
				</div>
				<div class="list03" v-if="typeNum == 'C'">
					<ul>
						<li>
							<h5>商品名称</h5>
							<h5>价格</h5>
							<h5>小计</h5>
							<!-- <h5>优惠</h5> -->
							<h5>操作</h5>
						</li>
						<li v-for="(item, index) in completedlist2[pagesIndex2]" :key="item.id">
							<p v-html="item.good_array[0].title"></p>
							<p>{{ item.order_amount }}元</p>
							<p>{{ item.pay_amount }}元</p>
							<!-- <p>{{ item.prefer }}元</p> -->
							<p>
								<a href="javascript:;" @click="orderdetailsHandel('0', item)">查看详情</a>
								<!-- <a href="javascript:;" @click="deleteHandel(index, item.id, '1')">删除订单</a> -->
							</p>
						</li>
					</ul>
					<pages
						:total="total2"
						:current-page="current"
						:display="display"
						@pagechange='pagechange2'
					></pages>
				</div>
			</div>
		</div>
		<!-- <div class="orderdetails" v-if="detailToggle">
			<div class="detail-title">
				<h2>订单详情</h2>
				<span class="iconfont" @click="orderdetailsHandel('1')">&#xe625;</span>
			</div>
			<div class="detail-content">
				<ul>
					<li>
						<div class="dcleft">
							<span>商品名称:</span>
						</div>
						<div class="dcright">
							<h3>{{this.detailsText.good_array[0].title}}</h3>
						</div>
					</li>
					<li>
						<div class="dcleft">
							<span>价格:</span>
						</div>
						<div class="dcright">
							<h3>{{this.detailsText.order_amount}}元</h3>
						</div>
					</li>
					<li>
						<div class="dcleft">
							<span>优惠:</span>
						</div>
						<div class="dcright">
							<h3>{{this.detailsText.prefer}}元</h3>
						</div>
					</li>
					<li>
						<div class="dcleft">
							<span>小计:</span>
						</div>
						<div class="dcright">
							<h3>{{this.detailsText.pay_amount}}元</h3>
						</div>
					</li>
					<li>
						<div class="dcleft">
							<span>下单时间:</span>
						</div>
						<div class="dcright">
							<h3>{{this.detailsText.pay_time}}</h3>
						</div>
					</li>
				</ul>
			</div>
		</div> -->

		<el-dialog
		  title="订单详情"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		  <div class="dialog-main">
		  	<ul>
		  		<li><font>商品名称：</font> <span>{{ this.detailsText.good_array }}</span></li>
		  		<li><font>价格：</font> <span>{{ this.detailsText.order_amount }}元</span></li>
		  		<li><font>优惠：</font> <span>{{ this.detailsText.prefer }}元</span></li>
		  		<li><font>小计：</font> <span>{{ this.detailsText.pay_amount }}元</span></li>
		  		<li><font>下单时间：</font> <span>{{ this.detailsText.pay_time }}</span></li>
		  	</ul>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>

<script>
import dialogBar from '@/common/Dialog'
import pages from '@/common/Pages'
export default {
	data() {
		return {
			dialogVisible: false,
			radioType: '1',
			delIndex: '',
			delType: '',
			detailToggle: false,
			pagesIndex1: 0,
			pagesIndex2: 0,
			alllist: [],
			alllist2: [],
			unfinishedlist: [],    // 待支付列表过滤
			completedlist: [],     // 已支付列表过滤
			unfinishedlist2: [],    // 待支付列表
			completedlist2: [],     // 已支付列表
			total: 150,   //记录总条数
			total1: 10,
			total2: 10,
			display: 10,  //每页显示条数
			current: 1,   //当前的页数
			typeNum: 'A',
			dialogToggle: false,
			dialogOption: {
				type: 1,     //确认、删除和跳转状态
				content: '删除后将无法恢复'
			},
			orderList: [{
				name: '待支付',
				isActive: true
			}, {
				name: '已支付',
				isActive: false
			}],
			jiaid:'',
			detailsText: {
				good_array: [],
				order_amount: '',
				prefer: '',
				pay_amount: '',
				pay_time: ''
			}
		}
	},
	components: {
		pages,
		dialogBar
	},
	mounted() {
		this.getdata()
		// this.$store.state.navigation1 = '个人中心'
		// this.$store.state.navigation2 = '我的订单'
		// var urlSearch = window.location.search
		// let centername = urlSearch.split("?")[1]
		// if(sitename == 'center') {
		//   this.typeNum = 'C'
		// }else {
		// 	this.typeNum = 'A'
		// }
	},
	watch: {
		radioType(val) {
			if(val === '1') {
				this.typeNum = 'A'
			}else {
				this.typeNum = 'C'
			}
		}
	},
	methods: {
		handleClose() {
			this.dialogVisible = false
		},	
		orderdetailsHandel(type, data) {
			if(type == '0') {
				// this.detailToggle = false
				this.detailsText.good_array = data.good_array[0].title
				this.detailsText.order_amount = data.order_amount
				this.detailsText.prefer = data.prefer
				this.detailsText.pay_amount = data.pay_amount
				this.detailsText.pay_time = data.pay_time
				this.dialogVisible = true
			}else {
				this.detailToggle = true
			}
		},
		dialogCallback(val) {
			if(this.dialogOption.type == '1') {
				if(val == '0') {
		      this.$axios({
						method: 'post',
						url: '/home/Content/orderdel',
						data: {
							orderid: this.jiaid
						}
					}).then((res) => {
						if(res.data.code == '200') {
							this.dialogOption.type = 4
							this.dialogOption.content = res.data.msg
							this.completedlist = []
							this.completedlist2 = []
							this.unfinishedlist = []
							this.unfinishedlist2 = []
							for(let i=0; i<this.alllist2.length; i++) {
								if(this.alllist2[i].id == this.jiaid) {
									this.alllist2.splice(i, 1)
								}
							}
							for(let i=0; i<this.alllist2.length; i++) {
								if(this.alllist2[i].status == '1') {
									this.unfinishedlist.push(this.alllist2[i])
								}else {
									this.completedlist.push(this.alllist2[i])
								}
							}
							for(let i=0,len=this.unfinishedlist.length;i<len;i+=this.display) {
								this.unfinishedlist2.push(this.unfinishedlist.slice(i,i+this.display))
							}
							this.total1 = this.unfinishedlist.length
							for(let i=0,len=this.completedlist.length;i<len;i+=this.display) {
								this.completedlist2.push(this.completedlist.slice(i,i+this.display))
							}
							this.total2 = this.completedlist.length
						}else {
							this.dialogOption.type = 4
							this.dialogOption.content = res.data.msg
						}
					})
				}else {
					this.dialogToggle = false
				}
			}else if(this.dialogOption.type == '2') {
				if(val == 0) {
					this.$axios({
						method: 'post',
						url: '/home/Content/propayture',
						data: {
							orderid: this.jiaid,
							pay_type: 3
						}
					}).then((res)=> {
						if(res.data.code == '200') {
							this.dialogOption.type = 4
							this.dialogOption.content = res.data.msg
							this.unfinishedlist = []
							this.completedlist = []
							this.unfinishedlist2 = []
							this.completedlist2 = []
							this.getdata()
						}else {
							this.dialogOption.type = 4
							this.dialogOption.content = res.data.msg
						}
					})
				}else {
					this.dialogToggle = false
				}
			}else {
				this.dialogToggle = false
			}
		},
		deleteHandel(index, id, type) {
			// this.dialogOption.type = 1
			// this.dialogOption.content = '删除后将无法恢复!'
			// this.dialogToggle = true
			this.jiaid=id
			this.delType = type
			this.delIndex = index
			this.$confirm('删除后将无法恢复', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(()=> {
	      this.$axios({
					method: 'post',
					url: '/home/Content/orderdel',
					data: {
						orderid: this.jiaid
					}
				}).then(() => {
						this.$message({
							type: 'success',
							message: '删除成功！'
						})
						this.completedlist = []
						this.completedlist2 = []
						this.unfinishedlist = []
						this.unfinishedlist2 = []
						for(let i=0; i<this.alllist2.length; i++) {
							if(this.alllist2[i].id == this.jiaid) {
								this.alllist2.splice(i, 1)
							}
						}
						for(let i=0; i<this.alllist2.length; i++) {
							if(this.alllist2[i].status == '1') {
								this.unfinishedlist.push(this.alllist2[i])
							}else {
								this.completedlist.push(this.alllist2[i])
							}
						}
						for(let i=0,len=this.unfinishedlist.length;i<len;i+=this.display) {
							this.unfinishedlist2.push(this.unfinishedlist.slice(i,i+this.display))
						}
						this.total1 = this.unfinishedlist.length
						for(let i=0,len=this.completedlist.length;i<len;i+=this.display) {
							this.completedlist2.push(this.completedlist.slice(i,i+this.display))
						}
						this.total2 = this.completedlist.length
				}).catch(()=> {
					this.$message({
						type: 'error',
						message: '删除失败！'
					})
				})
			}).catch(()=> {

			})
		},
		onClick(val) {
			for(let i=0; i<this.orderList.length; i++) {
				this.orderList[i].isActive = false
			}
			this.orderList[val].isActive = true
			if(val == 0) {
				this.typeNum = 'A'
			}else if(val == 1) {
				this.typeNum = 'C'
			}else if(val == 2) {
				this.typeNum = 'C'
			}
		},
		pagechange1(currentPage) {
			this.pagesIndex1 = currentPage - 1
		},
		pagechange2(currentPage) {
			this.pagesIndex2 = currentPage - 1
		},
		toPay(val, index, type, id) {
			// this.dialogToggle = true
			// this.dialogOption.type = 2
			// this.dialogOption.content = '是否立即付款？'
			this.delType = type
			this.delIndex = index
			this.jiaid=id
			this.$confirm('是否立即付款？', '提示', {
				confirmButtonText: '立即支付',
				cancelButtonText: '取消',
				type: 'success'
			}).then(()=> {
				this.$axios({
					method: 'post',
					url: '/home/Content/propayture',
					data: {
						orderid: id,
						pay_type: 3
					}
				}).then((res)=> {
					// this.dialogOption.type = 4
					// this.dialogOption.content = res.data.msg
					this.unfinishedlist = []
					this.completedlist = []
					this.unfinishedlist2 = []
					this.completedlist2 = []
					this.getdata()
					this.$notify({
						title: '成功',
						message: res.data.msg,
						type:'success',
						position: 'bottom-right'
					})
				}).catch((res)=> {
					this.$notify.error({
						title: '错误',
						message: res.data.msg,
						position: 'bottom-right'
					})
				})
			}).catch(()=> {
				this.$message({
					type: 'info',
					message: '取消订单支付!'
				})
			})
		},
		getdata(){
			this.$axios.get('/home/Content/orderlist').then(this.thendata)
			// this.$axios.get('/api/orderlist.json').then(this.thendata)
		},
		thendata(res){
			if(res.data.code == 200){
				this.alllist2 = res.data.data
				this.total = res.data.data.length
				for(let i=0;i<this.alllist2.length;i++){
					let jiarr=''
					jiarr=JSON.parse(this.alllist2[i].good_array)
					this.alllist2[i].good_array=jiarr
				}
				for(let i=0; i<this.alllist2.length; i++) {
					if(this.alllist2[i].status == '1') {
						this.unfinishedlist.push(this.alllist2[i])
					}else {
						this.completedlist.push(this.alllist2[i])
					}
				}
				for(let i=0,len=this.unfinishedlist.length;i<len;i+=this.display) {
					this.unfinishedlist2.push(this.unfinishedlist.slice(i,i+this.display))
				}
				this.total1 = this.unfinishedlist.length
				for(let i=0,len=this.completedlist.length;i<len;i+=this.display) {
					this.completedlist2.push(this.completedlist.slice(i,i+this.display))
				}
				this.total2 = this.completedlist.length

			}else {
				alert(res.data.msg)
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.account
	padding: 0 15px
	.el-dialog
		.dialog-main
			display: flex
			justify-content: center
			li
				line-height: 34px
				font
					display: inline-block
					width: 70px
					text-align: right
	.title
		line-height: 32px
		ul
			display: inline-block
			padding: 0 3px
			margin: 0
		li
			display: inline-block
			padding: 0 4px
			margin: 0 23px
			line-height: 44px
			font-size: 16px
			cursor: pointer
			color: #666
		.active
			border-bottom: 2px solid #f29b76
			color: #333
	.tabList
		background: #fff
		ul
			border-top: 1px solid #dedede
			min-height: 520px
		li
			display: flex
			border-bottom: 1px solid #dedede
			transition: all .3s
			&:first-child
				&:hover
					transform: scale(1, 1)
					background: none
					box-shadow: none
			&:last-child
				border: none
			&:hover
				background: #f1f2f1
				// transform: scale(1.02, 1)
				box-shadow: 0 3px 3px #f1f2f1
			h5
				margin: 0
				flex: 1
				line-height: 46px	
				text-align: center
				font-size: 16px
				font-weight: bold
			p
				flex: 1
				margin: 0
				text-align: center
				line-height: 44px
				&:last-child
					a
						color: #d19066
						&:last-child
							color: $bgColor
			// &:nth-of-type(even)
			// 	background: #ebebeb
	.orderdetails
		.detail-title
			background: #bababa
			text-align: center
			position: relative
			h2
				margin: 0
				font-size: 22px
				line-height: 50px
			span
				position: absolute
				top: 5px
				right: 8px
				cursor: pointer
		.detail-content
			padding: 40px 0
			li
				overflow: hidden
				line-height: 34px
				.dcleft
					float: left
					width: 50%
					text-align: right
					span
						font-size: 14px
						padding-right: 5px
				.dcright
					float: left
					width: 50%
					h3
						margin: 0
						padding-left: 5px
						font-size: 18px
						line-height: 34px
</style>