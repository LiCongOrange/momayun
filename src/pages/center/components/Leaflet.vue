<template>
	<div class="website">
		<dialog-bar
			v-if="dialogToggle"
			:dialog-option="dialogOption"
			@confirmHandle="dialogCallback"
		></dialog-bar>
		<!-- <h2><i class="iconfont">&#xe619;</i>微传单</h2> -->
		<div class="siteTab">
			<ul>
				<li 
					class="col-md-4 col-sm-6 col-xs-12" 
					v-for="(item, index) in needdata"
					@click="checkLi(item.proid,index)"
				>
					<div :class="{ active:item.proid==isActive }">
						<h3>
							<span>{{ item.title }}</span>
							<span><strong>{{ item.type[0].price }}</strong>元/个/年</span>
						</h3>
						<p>
							<span>空间容量无限制</span>
							<span>带宽流量无限制</span>
							<span>全功能使用</span>
							<span>7&times;24小时安全监控</span>
						</p>
						<p v-if="buyToggle">
							<button @click="toAccount">点击购买</button>
						</p>
					</div>
				</li>
			</ul>
		</div>
		<hostdialog v-if="hostdialogToggle" @backhandle="backhandle"></hostdialog>

		<!-- <el-dialog
		  title="主机选择"
		  :visible.sync="hostdialogToggle"
		  width="30%"
		  :before-close="handleClose2">
		  <hostdialog @backhandle="backhandle"></hostdialog>
		</el-dialog> -->

		
	</div>
</template>

<script>
import { mapState } from 'vuex'
import dialogBar from '@/common/Dialog'
import hostdialog from './Host'
export default {
	props:["sendata"],
	data() {
		return {
			hostdialogToggle: false,
			hosttype: 1,
			alldata:'',
			priceindex:0,
			xlindex:0,
			needdata:[],
			bottomdata:'',
			bottomprice:'',
			isActive:4,	
			isActive2:0,
			goodid:1,
			typeid:1,
			goodarray:'',
			amount:'',
			acitamount:'',
			guige:'',
			sptitle:'',
			arr:[],
			dialogToggle: false,
			dialogOption: {
				type: 2,
				content: '是否立即付款!'
			}
		}	
	},
	components:{
		dialogBar,
		hostdialog
	},
	computed: {
		...mapState({
			buyToggle: state => state.buyToggle,
      siteId: state => state.threeStep.siteId
		})
	},
	methods: {
		yearHandle(index) {
			this.priceindex=index
			this.isActive2=index
			this.typeid=this.bottomdata[this.priceindex].id
			this.amount=this.bottomdata[this.priceindex].price
			this.acitamount=this.bottomdata[this.priceindex].actprice
			this.guige=this.bottomdata[this.priceindex].guige
		},
		dialogCallback(val) {
			if(val == '0') {
				this.$axios({
					method: 'post',
					url: '/home/Content/propayture',
					data: {
						orderid: this.$store.state.payid,
						pay_type: 3
					}
				}).then((res)=> {
					if(res.data.code == '200') {
						this.dialogOption.type = 3
						this.dialogOption.content = res.data.data.msg
					}else {
						this.dialogOption.type = 3
						this.dialogOption.content = res.data.data.msg
					}
				})
			}else {
				this.dialogToggle = false
			}
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
						site_id: this.siteId,
						select_host: this.hosttype
					}
				}).then((res)=> {
					if(res.data.code == '200') {
						this.toAccount2()
					}else {
						alert(res.data.msg)
					}
				})
			}
		},
		toAccount() {
			this.hostdialogToggle = true
		},
		toAccount2() {
			var obj={
				'title':this.sptitle,
				'guige':this.guige
			}
			this.arr=[]
			this.arr.push(obj)
			this.goodarray=JSON.stringify(this.arr)
			this.$axios({
				method: 'get',
				url: '/home/passport/islogin'
			}).then((res)=> {
				this.$axios({
					method: 'post',
					url: '/home/Content/propay',
					data: {
							goodid:this.goodid,
							typeid:this.typeid,
							goodarray:this.goodarray,
							amount:this.amount,
							acitamount:this.acitamount,
							site_id: this.siteId,
							product: '3'
						},
					transformRequest: [function(data) { 
						return JSON.stringify(data)
					}],
					headers: {
						'Content-Type': 'application/json;charset=UTF-8'
					}, 
				}).then((res) => {
					if(res.data.code == '200') {
						this.$store.state.payid = res.data.data
						this.dialogToggle = true
						this.dialogOption.type = 2
					}
					if(res.data.code == '404') {
							this.dialogToggle = true
							this.dialogOption.type = 1
							this.dialogOption.content = res.data.msg
					}
				})
			})
		},
		checkLi(id,index){
			for(var i=0;i<this.needdata.length;i++){
				if(this.needdata[i].proid==id){
					this.bottomdata=this.needdata[i].type
					this.priceindex=0
					this.isActive2=0
					this.isActive=this.needdata[i].proid
					this.goodid=this.needdata[i].proid
					this.amount=this.bottomdata[0].price
					this.acitamount=this.bottomdata[0].actprice
					this.sptitle=this.needdata[i].title
					this.typeid=this.bottomdata[0].id
					this.xlindex=index
				}
			}
		},
		dosomething(){
			this.bottomdata=this.needdata[0].type
			this.amount=this.bottomdata[this.priceindex].price
			this.acitamount=this.bottomdata[this.priceindex].actprice
			this.sptitle=this.needdata[this.priceindex].title
			this.typeid=this.bottomdata[this.priceindex].id 
			this.guige=this.bottomdata[this.priceindex].guige
		}
	},
	mounted(){
		for(var i=0;i<this.sendata.length;i++){
			if(this.sendata[i].product == 5){
				this.needdata.push(this.sendata[i])
				this.bottomdata=this.needdata[0].type
				this.amount=this.bottomdata[0].price
				}
		}
		this.dosomething()
	}	
}
</script>

<style lang="stylus" scoped> 
@import '~styles/public'
.website
	overflow: hidden
	h2
		display: inline-block
		border-bottom: 1px solid $fontColor
		line-height:  32px
		font-size: 16px
		i
			margin-right: 5px
			color: #046dff
			font-size: 20px
			vertical-align: bottom
	.siteChoice
		background: #fff
		margin: 0 20px
		overflow: hidden
		.left
			float: left
			li
				padding: 0 15px
				&:after
					clear: both
					content: ''
					display: block
				h6
					margin: 0
					float: left
					font-size: 16px
					line-height: 34px
				p
					margin: 0
					float: left
					line-height: 34px
					strong
						color: #c2382e
						font-size: 22px
					span
						color: #797979
						text-decoration: line-through
					button
						line-height: 24px
						background: none
						border: 1px solid #a1a1a1
						padding: 0 15px
						margin-right: 10px
						transition: all .3s
					.active
						border-color: $bgColor
						background: $bgColor
						color: #fff
					.btnAction
						border-color: $bgColor
				a
					background: $bgColor
					padding: 5px 15px
					color: #fff
					border-radius: 15px
					margin-top: 20px
				.yellow
					span
						&:before
							content: ''
							display: inline-block
							width: 8px
							height: 8px
							background: #ff9801
							border-radius: 15px
							margin: 0 10px 0 20px
						text-decoration: inherit
						color: #ff9801
		.right
			float: right
			padding: 0 20px
			p
				margin: 0
				text-align: right
				line-height: 36px
				i
					color: #62a35f
					font-size: 18px
					vertical-align: middle
	.siteTab
		margin-top: 30px
		&:after
			content: ''
			display: block
			clear: both
		ul
			li
				margin-bottom: 30px
				div
					background: #fff url('/static/images/productCenter/weichuandan.png') no-repeat
					background-size: 100% auto
					min-height: 200px
					width: 80%
					margin: 0 auto
					text-align: center
					transition: all 0.3s
					max-width: 260px
					h3
						display: inline-block
						margin: 0 auto 30px
						padding-top: 15px
						color: #fff
						line-height: 34px
						span
							display: block
							font-size: 16px
							line-height: 38px
							strong
								margin: 5px 5px 0
								font-size: 30px
								font-weight: 500
					p
						padding: 0 20px 10px
						margin-bottom: 0
						text-align: left
						span
							display: block
							line-height: 32px
							&:before
								content: ''
								display: inline-block
								width: 8px
								height: 8px
								background: $bgColor
								border-radius: 10px
								margin: 0 10px
								vertical-align: middle
						button
							width: 100%
							background: linear-gradient(left, #0098de, #00d3d7)
							background: -webkit-linear-gradient(left, #0098de, #00d3d7)
							border: none
							border-radius: 5px
							color: #fff
							font-size: 18px
							line-height: 38px
							&:hover
								background: #0098de
</style>