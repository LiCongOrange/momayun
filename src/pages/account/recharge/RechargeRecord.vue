<template>
	<div class="monerBox">
		<div class="box-title"><h1>充值记录</h1><i class="iconfont" @click="closeHandle">&#xe625;</i></div>
		<div class="box-content">
			<ul>
				<li>
					<span>支付方式</span>
					<span>充值时间</span>
					<span>充值金额</span>
					<span>状态</span>
				</li>
				<li v-for="item in paymoneyList[pagesIndex]">
					<span>{{ item.pay_type }}</span>
					<span>{{ item.time }}</span>
					<span>{{ item.money }}</span>
					<span>{{ item.status }}</span>
				</li>
			</ul>
			<!-- <div class="title">本月</div> -->
			<!-- <ul>
				<li v-for="item in paymoneyList[pagesIndex]">
					<div class="img">
						<i class="iconfont">&#xe649;</i>
					</div>
					<div class="text">
						<h3 v-text="item.pay_type"></h3>
						<p v-text="item.time"></p>
					</div>
					<div class="right">
						<h3>{{item.money}}元</h3>
						<p>{{item.status}}</p>
					</div>
				</li>
			</ul> -->
		</div>
		<pages
			:total="total"
			:current-page="current"
			:display="display"
			@pagechange='pagechange'
		></pages>
	</div>
</template>

<script>
import pages from '@/common/Pages'
export default {
	data() {
		return {
			total: 10,   //记录总条数
			display: 15,  //每页显示条数
			current: 1,   //当前的页数
			pagesIndex: '0',
			paymoneyList: [],
			paymoneyList2: []
		}
	},
	components: {
		pages
	},
	mounted() {
		this.getpaymoneyList()
	},
	methods: {
		getpaymoneyList() {
			this.$axios({
				method: 'get',
				url: '/home/Content/paymoneylist'
				// url: '/api/paymoneylist.json'
			}).then((res)=> {
				if(res.data.code == '200') {
					this.paymoneyList2 = res.data.data
					this.total = res.data.data.length
					for(let i=0;i<this.paymoneyList2.length;i++) {
						if(this.paymoneyList2[i].pay_type == '1') {
							this.paymoneyList2[i].pay_type = '微信支付'
						}else if(this.paymoneyList2[i].pay_type == '2') {
							this.paymoneyList2[i].pay_type = '支付宝支付'
						}else if(this.paymoneyList2[i].pay_type == '3') {
							this.paymoneyList2[i].pay_type = '余额支付'
						}else if(this.paymoneyList2[i].pay_type == '4') {
							this.paymoneyList2[i].pay_type = '官方充值'
						}
						if(this.paymoneyList2[i].status == '1') {
							this.paymoneyList2[i].status = '未付款'
						}else if(this.paymoneyList2[i].status == '2') {
							this.paymoneyList2[i].status = '交易成功'
						}else if(this.paymoneyList2[i].status == '3') {
							this.paymoneyList2[i].status = '交易关闭'
						}
					}
					for(let i=0,len=this.paymoneyList2.length;i<len;i+=this.display) {
						this.paymoneyList.push(this.paymoneyList2.slice(i,i+this.display))
					}
				}else {
					alert(res.data.msg)
				}
			})
		},
		pagechange(currentPage) {
			this.pagesIndex = currentPage - 1
		},
		closeHandle() {
			this.$store.state.moneyRecordToggle = false
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.monerBox
	position: relative
	height: 100%
	>>> nav
		position:absolute
		bottom: 0px
		margin-top: 50px
		width: 100%
	.box-title
		position: relative
		background: #f1f2f1
		padding: 13px 15px
		h1
			margin: 0
			font-size: 22px
		i
			position: absolute
			right: 20px
			top: 10px
			font-size: 22px
			cursor: pointer
	.box-content
		overflow: auto
		.title
			background: #f2f2f2
			padding: 0 20px
			line-height: 66px	
			font-size: 22px
		ul
			margin: 20px
			border: 1px solid #f1f2f1
			li
				overflow: hidden
				border-bottom: 1px solid #f2f2f2
				transition: all .3s
				display: flex
				line-height: 36px
				&:first-child
					background: #ccc
					&:hover
						background: #ccc
				&:hover
					background: #f1f2f1
				span
					border-right: 1px solid #f1f2f1
					flex: 1
					text-indent: 24px
				.img
					float: left
					background: $bgColor
					border-radius: 50%
					padding: 5px 15px
					i
						font-size: 44px
						color: #fff
				.text
					float: left
					padding-left: 30px
					margin-top: 10px
					h3
						margin: 0
						font-size: 18px
						line-height: 28px
					h6
						margin: 0
						font-size: 14px
						line-height: 20px
					p
						font-size: 14px
						color: #5d5d5d
						line-height: 24px
				.right
					float: right
					text-align: right
					h3
						margin: 10px 0 5px
						font-size: 24px
					p
						margin: 0
						font-size: 16px
</style>