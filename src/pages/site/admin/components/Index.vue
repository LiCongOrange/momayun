<template>
	<div class="substance">
		<div class="meun-s">
			<ul>
				<li v-for="(item, index) in meunList" @click="tabClick(item.name)">
					<h3><span>{{ item.name }}</span><i class="iconfont">&#xe6f9;</i></h3>
				</li>
			</ul>
		</div>
		<div class="tabList">
			<component :is="section[sectionNum]"></component>
		</div>
	</div>
</template>

<script>
import Profile from './CompanyProfile' 
import Honor from './Honor'
import News from './CompanyNews'
export default {
	components: {
		'site1': Profile,
		'site2': Honor,
		'site3': News
	},
	data() {
		return {
			sectionNum: 0,
			section: ['site1', 'site2', 'site3'],
			meunList: [{
				name: '公司简介',
				isActive: false
			}, {
				name: '企业文化',
				isActive: false
			}, {
				name: '荣誉展示',
				isActive: false
			}, {
				name: '产品服务',
				isActive: false
			}, {
				name: '网络设备',
				isActive: false
			}, {
				name: '机框机架',
				isActive: false
			}, {
				name: '新闻中心',
				isActive: false
			}, {
				name: '企业动态',
				isActive: false
			}, {
				name: '行业资讯',
				isActive: false
			}, {
				name: '留言反馈',
				isActive: false
			}, {
				name: '联系方式',
				isActive: false
			}, {
				name: '总部地址',
				isActive: false
			}, {
				name: '分支机构',
				isActive: false
			}]
		}
	},
	methods: {
		tabClick(val) {
			if(val == '公司简介') {
				this.sectionNum = 0
			}else if(val == '荣誉展示') {
				this.sectionNum = 1
			}else if(val == '企业动态') {
				this.sectionNum = 2
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
.substance
	.meun-s
		width: 200px
		height: 100%
		position: fixed
		left: 0
		top: 110px
		bottom: 0
		background: #4d4948
		li
			padding: 0 33px
			border-bottom: 1px solid #726e6d
			cursor: pointer
			h3
				&:after
					display: block
					content: ''
					clear: both
				line-height: 44px
				margin: 0
				span
					float: left
					font-size: 14px
					color: #fff
				i
					float: right
					color: #fff
	.tabList
		margin-left: 200px
</style>