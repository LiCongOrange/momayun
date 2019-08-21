<template>
	<div class="priceWrap container">
		<div class="box-inner">
			<!-- <h2>产品报价</h2> -->
			<div class="titleTab row">
				<ul>
					<li 
						v-for="(item, index) in productList" 
						@click="tabClick(index)"
						:class="{ active: item.isActive }"
					>
						<span>{{ item.name }}</span>
					</li>
				</ul>
			</div>
			<transition name="fade" mode="out-in">
				<keep-alive>
					<component :is="section[sectionNum]" :sendata="alldata"></component>
				</keep-alive>
			</transition>
		</div>
	</div>
</template>

<script>
import webSite from './Website'
import domainName from './Domain'
import smallProgram from './SmallProgram'
import subScription from './Subscription'
import leaflet from './Leaflet'
export default {
	data() {
		return {
			section: ['site1', 'site2', 'site3', 'site4'],
			sectionNum: 0,
			productList: [{
				name: '智能网站',
				isActive: true
			}, {
				name: '小程序',
				isActive: false
			}, {
				name: '微传单',
				isActive: false
			}, {
				name: '公众号管家',
				isActive: false
			}],
			alldata:''
		}
	},
	components: {
		'site1': webSite,
		'site2': smallProgram,
		'site3': leaflet,
		'site4': subScription
	},
	methods: {
		tabClick(val) {
			for(let i=0; i<this.productList.length; i++) {
				this.productList[i].isActive = false
			}
			this.productList[val].isActive = true
			this.sectionNum = val
		},
		getdata(){
			this.$axios.get('/home/Content/prolist')
			// this.$axios.get('/api/prolist.json')
			.then(this.thengetdata)
		},
		thengetdata(res){
			if(res.data.code == '200'){
				this.alldata=res.data.data;
			}else {
				alert(res.data.msg)
			}
		}
		
	},
	mounted(){
		this.getdata()
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.priceWrap
	.box-inner
		// padding: 20px
		// background: #fff
		// box-shadow: $boxshadow
	h2
		margin: 0
		border-left: 3px solid $bgColor
		font-size: 22px
		line-height: 22px
		text-indent: 22px
	.titleTab
		margin: 20px 0
		ul
			width: 80%
			margin: 0 auto
			display: flex
			justify-content: space-evenly
			li
				margin-bottom: 10px
				text-align: center
				cursor: pointer
				span
					background: none
					padding: 7px 0
					transition: all 0.3s
					font-size: 16px
					white-space: nowrap
			.active
				span
					border-bottom: 2px solid $bgColor
.fade-enter-active, .fade-leave-active
	transition: opacity .3s ease
.fade-enter, .fade-leave-to
	opacity: 0
</style>