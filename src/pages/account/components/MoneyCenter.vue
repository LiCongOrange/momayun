<template>
	<div class="money-center">
		<div class="mask" v-if="this.$store.state.moneyRecordToggle">
			<div class="maskNei">
				<money-record></money-record>
			</div>
		</div>
		<div class="title">
			<div class="container">
				<i class="iconfont">&#xe604;</i>
				<a href="javascript:;" @click="moneyRecordToggle">充值记录</a>	
			</div>
		</div>
		<div class="content container">
			<div class="balance">
				当前账户余额： <strong>288元</strong>
			</div>
			<div class="choiceMoney">
				<h5>请选择充值金额：</h5>
				<ul>
					<li 
						v-for="(item, index) in moneyList" 
						:class="{ active: item.classActive }"
						@click="getMoney(index, item.name)"
					>{{item.name}}元</li>
				</ul>
				<button @click="toAccount">立即充值</button>
			</div>
		</div>
	</div>
</template>

<script>
import moneyRecord from './MoneyRecord'
export default {
	data() {
		return {
			monerNum: '',
			moneyList: [{
				name: '200',
				classActive: false
			}, {
				name: '500',
				classActive: false
			}, {
				name: '1000',
				classActive: false
			}, {
				name: '2000',
				classActive: false
			}, {
				name: '5000',
				classActive: false
			}, {
				name: '10000',
				classActive: false
			}, {
				name: '20000',
				classActive: false
			}]
		}
	},
	components: {
		moneyRecord
	},
	methods: {
		toAccount() {
			console.log(this.monerNum)
			this.$router.push({path: "/account/topay"})
			this.$store.state.navigation2 = '充值中心'
			this.$store.state.navigation3 = '支付方式'
		},
		moneyRecordToggle() {
			this.$store.state.moneyRecordToggle = true
		},
		getMoney(val, monerNun) {
			this.monerNum = monerNun
			for(let i=0; i<this.moneyList.length; i++) {
				this.moneyList[i].classActive = false
			}
			this.moneyList[val].classActive = true
		}
	},
	mounted() {
		this.$store.state.navigation1 = '账户信息'
		this.$store.state.navigation2 = '充值中心'
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.money-center
	.mask
		position: fixed
		left: 0
		right: 0
		top: 0
		bottom: 0
		background: rgba(0, 0, 0, 0.7)
		z-index: 100
		.maskNei
			background: rgba(255, 255, 255, 1)
			box-shadow: 0 5px 5px #eeeeee
			position: fixed
			left: 12%
			right: 12%
			top: 100px
			bottom: 4%
			>>> .box-title
					h1
						margin: 0
						line-height: 66px
						color: #fff
						background: #FF9A66
					i
						top: 10px
						color: #fff
	.title
		background: #fff
		padding-right: 15px
		line-height: 60px
		text-align: right
		a
			color: #357b3f
			vertical-align: middle
		i
			margin-right: 5px
			color: #606060
			vertical-align: middle
			font-size: 18px
	.content
		margin-top: 20px
		background: #fff
		padding: 0 20px 50px
		.balance
			overflow: hidden
			line-height: 60px
			strong
				font-size: 22px
		.choiceMoney
			h5
				font-size: 14px
			ul
				padding-left: 50px
				overflow: hidden
				margin: 20px 0
				li
					float: left
					margin: 0 42px 20px 0
					border: 1px solid #8f8f8f
					background: #eeeeee
					color: #5a5a5a
					padding: 5px 15px
					border-radius: 10px
					cursor: pointer
					transition: all 0.3s
					&:hover
						border-color: $bgColor
				.active
					background: $bgColor
					border-color: $bgColor
					color: #fff
			button
				margin-left: 40%
				border: none
				background: $bgColor
				border-radius: 15px
				padding: 5px 25px
				color: #fff
</style>