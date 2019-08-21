<template>
	<div class="materiel container">
		<div class="backbtn">
			<!-- <button @click="backhandle">返回</button> -->
			<crumbs></crumbs>
		</div>
		<div class="title">
			<h2>印刷物料下载：</h2>
			<ul>
				<li v-for="(item, index) in navlist">
					<span :class="{ active: item.classToggle }" @click="navHandle(index, item.id)">{{ item.title }}</span>
				</li>
			</ul>
		</div>
		<div class="modellist">
			<ul v-if="typeToggle">
				<li v-for="(item, index) in alllist" class="col-md-4 col-sm-3">
					<div class="inner">
						<img :src="item.imgurl">
						<div class="mask">
							<h3>{{ item.title }}</h3>
							<!-- <button>立即下载</button> -->
							<a :href="item.downurl">立即下载</a>
						</div>
					</div>
				</li>
			</ul>
			<ul v-else class="contract-box">
				<li v-for="(item, index) in contractlist" class="col-md-3">
					<i class="iconfont">&#xe652;</i>
					<span>{{ item.title }}</span>
					<a :href="item.downurl">立即下载</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import crumbs from '@/common/Crumbs'
	export default {
		data() {
			return {
				typeToggle: true,
				navlist: [{
					id: '001',
					title: '全部',
					classToggle: true
				}, {
					id: '007',
					title: '合同素材',
					classToggle: false
				}, {
					id: '002',
					title: '海报',
					classToggle: false
				}, {
					id: '003',
					title: '易拉宝',
					classToggle: false
				}],
				navlist1: [{
					id: '001',
					title: '全部',
					classToggle: true
				}, {
					id: '002',
					title: '海报',
					classToggle: false
				}, {
					id: '003',
					title: '易拉宝',
					classToggle: false
				}, {
					id: '004',
					title: 'X展架',
					classToggle: false
				}, {
					id: '005',
					title: 'DM宣传单',
					classToggle: false
				}, {
					id: '006',
					title: '名片',
					classToggle: false
				}, {
					id: '007',
					title: '合同素材',
					classToggle: false
				}],	
				alllist: [{
					id: '001',
					type: 'poster',
					title: '海报01',
					imgurl: '/static/images/files/poster/demo01/pic.jpg',
					downurl: '/static/images/files/poster/demo01/demo.rar'
				}, {
					id: '002',
					type: 'poster',
					title: '海报02',
					imgurl: '/static/images/files/poster/demo02/pic.jpg',
					downurl: '/static/images/files/poster/demo02/demo.rar'
				}, {
					id: '003',
					type: 'poster',
					title: '海报03',
					imgurl: '/static/images/files/poster/demo03/pic.jpg',
					downurl: '/static/images/files/poster/demo03/demo.rar'
				}, {
					id: '004',
					type: 'poster',
					title: '海报04',
					imgurl: '/static/images/files/poster/demo04/pic.jpg',
					downurl: '/static/images/files/poster/demo04/demo.rar'
				}, {
					id: '005',
					type: 'poster',
					title: '海报05',
					imgurl: '/static/images/files/poster/demo05/pic.jpg',
					downurl: '/static/images/files/poster/demo05/demo.rar'
				}, {
					id: '006',
					type: 'poster',
					title: '海报06',
					imgurl: '/static/images/files/poster/demo06/pic.jpg',
					downurl: '/static/images/files/poster/demo06/demo.rar'
				}, {
					id: '007',
					type: 'poster',
					title: '海报07',
					imgurl: '/static/images/files/poster/demo07/pic.jpg',
					downurl: '/static/images/files/poster/demo07/demo.rar'
				}, {
					id: '008',
					type: 'poster',
					title: '海报08',
					imgurl: '/static/images/files/poster/demo08/pic.jpg',
					downurl: '/static/images/files/poster/demo08/demo.rar'
				}, {
					id: '009',
					type: 'rollscreen',
					title: '易拉宝01',
					imgurl: '/static/images/files/rollScreen/demo01/pic.jpg',
					downurl: '/static/images/files/rollScreen/demo01/demo.rar'
				}, {
					id: '010',
					type: 'rollscreen',
					title: '易拉宝02',
					imgurl: '/static/images/files/rollScreen/demo02/pic.jpg',
					downurl: '/static/images/files/rollScreen/demo02/demo.rar'
				}, {
					id: '011',
					type: 'rollscreen',
					title: '易拉宝03',
					imgurl: '/static/images/files/rollScreen/demo03/pic.jpg',
					downurl: '/static/images/files/rollScreen/demo03/demo.rar'
				}],	
				alllist1: [{
					id: '001',
					type: 'poster',
					title: '海报01',
					imgurl: '/static/images/files/poster/demo01/pic.jpg',
					downurl: '/static/images/files/poster/demo01/demo.rar'
				}, {
					id: '002',
					type: 'poster',
					title: '海报02',
					imgurl: '/static/images/files/poster/demo02/pic.jpg',
					downurl: '/static/images/files/poster/demo02/demo.rar'
				}, {
					id: '003',
					type: 'poster',
					title: '海报03',
					imgurl: '/static/images/files/poster/demo03/pic.jpg',
					downurl: '/static/images/files/poster/demo03/demo.rar'
				}, {
					id: '004',
					type: 'poster',
					title: '海报04',
					imgurl: '/static/images/files/poster/demo04/pic.jpg',
					downurl: '/static/images/files/poster/demo04/demo.rar'
				}, {
					id: '005',
					type: 'poster',
					title: '海报05',
					imgurl: '/static/images/files/poster/demo05/pic.jpg',
					downurl: '/static/images/files/poster/demo05/demo.rar'
				}, {
					id: '006',
					type: 'poster',
					title: '海报06',
					imgurl: '/static/images/files/poster/demo06/pic.jpg',
					downurl: '/static/images/files/poster/demo06/demo.rar'
				}, {
					id: '007',
					type: 'poster',
					title: '海报07',
					imgurl: '/static/images/files/poster/demo07/pic.jpg',
					downurl: '/static/images/files/poster/demo07/demo.rar'
				}, {
					id: '008',
					type: 'poster',
					title: '海报08',
					imgurl: '/static/images/files/poster/demo08/pic.jpg',
					downurl: '/static/images/files/poster/demo08/demo.rar'
				}, {
					id: '009',
					type: 'rollscreen',
					title: '易拉宝01',
					imgurl: '/static/images/files/rollScreen/demo01/pic.jpg',
					downurl: '/static/images/files/rollScreen/demo01/demo.rar'
				}, {
					id: '010',
					type: 'rollscreen',
					title: '易拉宝02',
					imgurl: '/static/images/files/rollScreen/demo02/pic.jpg',
					downurl: '/static/images/files/rollScreen/demo02/demo.rar'
				}, {
					id: '011',
					type: 'rollscreen',
					title: '易拉宝03',
					imgurl: '/static/images/files/rollScreen/demo03/pic.jpg',
					downurl: '/static/images/files/rollScreen/demo03/demo.rar'
				}],
				contractlist: [{
					id: '001',
					type: 'cantract',
					title: '程序维护协议',
					downurl: '/static/images/files/contract/demo01.rar'
				}, {
					id: '002',
					type: 'cantract',
					title: '程序制作合同',
					downurl: '/static/images/files/contract/demo02.rar'
				}]
			}
		},
		components: {
			crumbs
		},
		computed: {
			...mapState({
				priceListToggle: state => state.priceListToggle,
				userToggle: state => state.userToggle,
				userType: state => state.userType,
				userPhone: state => state.userPhone,
				userName: state => state.userName
			})
		},
		methods: {
			backhandle() {
				this.$store.commit('userToggleHandel', 'A')
			},
			navHandle(index, id) {
				this.alllist = []
				for(let i=0; i<this.navlist.length; i++) {
					this.navlist[i].classToggle = false
				}
				this.navlist[index].classToggle = true
				if(id == '001') {
					this.typeToggle = true
					this.alllist = this.alllist1
				}else if(id == '002') {
					this.typeToggle = true
					for(let i=0; i<this.alllist1.length; i++) {
						if(this.alllist1[i].type == 'poster') {
							this.alllist.push(this.alllist1[i])
						}
					}
				}else if(id == '003') {
					this.typeToggle = true
					for(let i=0; i<this.alllist1.length; i++) {
						if(this.alllist1[i].type == 'rollscreen') {
							this.alllist.push(this.alllist1[i])
						}
					}
				}else if(id == '007') {
					this.typeToggle = false
				}
			}
		}
	}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.materiel
	.backbtn
		margin-top: 25px
		button
			background: #f6f6f6
			padding: 8px 21px
			border: 1px solid #ccc
			color: #666
			font-size: 17px
			&:hover
				background: #dbd7d7
	.title
		margin-top: 15px
		text-align: center
		h2
			margin: 0
			font-size: 23px
		ul
			margin-top: 25px
			li
				display: inline-block
				margin: 0 7px
				span
					display: block
					padding: 0 17px
					border: 1px solid #ccc
					border-radius: 3px
					background: #f6f6f6
					height: 34px
					line-height: 34px
					font-size: 14px
					cursor: pointer
				.active
					background: $bgColor
					border-color: $bgColor
					color: #fff
	.modellist
			margin-top: 20px
			li
				margin-bottom: 15px
				.inner
					position: relative
					text-align: center
					img
						width: auto
						max-height: 400px
				&:hover
					.mask
						opacity: 1
						h3
							opacity: 1
							transform: translateY(0)
						a
							opacity: 1
							transform: translate(-50%, 0)
				.mask
					position: absolute
					left: 0
					top: 0
					width: 100%
					height: 100%
					background: rgba(0, 0, 0, .3)
					opacity: 0
					transition: all .3s
					h3
						text-indent: 20px
						color: #fff
						font-size: 18px
						transform: translateY(-100%)
						opacity: 0
						transition: all .3s
					a
						position: absolute
						bottom: 20px
						left: 50%
						width: 60%
						border: none
						border-radius: 10px
						background: linear-gradient(to right, #2bc2fa, #6458e6)
						color: #fff
						font-size: 16px
						line-height: 40px
						transform: translate(-50%, 100%)
						opacity: 0
						transition: all .3s
						&:hover
							background: $bgColor
	.contract-box
		display: flex
		li
			display: flex
			flex-direction: column
			padding: 20px
			text-align: center
			i
				font-size: 34px
				color: $bgColor
			span
				font-size: 14px
				line-height: 26px
			a
				width: 60%
				background: $allbtnbg
				border: 1px solid #ccc
				color: #333
				padding: 7px 17px
				font-size: 14px
				margin: 0 auto
				transition: all .3s
				&:hover
					background: $bgColor
					color: #fff
</style>