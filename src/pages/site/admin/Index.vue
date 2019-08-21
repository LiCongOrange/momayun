<template>
	<div class="contentAdmin">
		<index-header></index-header>
		<div class="floatNav">
				<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
				  <el-radio-button :label="false">展开</el-radio-button>
				  <el-radio-button :label="true">收起</el-radio-button>
				</el-radio-group>
				<el-menu 
					default-active="1-4-1" 
					class="el-menu-vertical-demo" 
					@open="handleOpen" 
					@close="handleClose" 
					:collapse="isCollapse"
					background-color="#34302F"
					text-color="#fff"
					active-text-color="#ffd04b"
					active-background-color="#fff"
				>
				  <el-submenu index="1">
				    <template slot="title">
				      <i class="el-icon-document"></i>
				      <span slot="title">内容管理</span>
				    </template>
				    <el-menu-item-group>
				      <el-menu-item index="1-1" @click="sectionsNum = 0">导航管理</el-menu-item>
				      <el-menu-item index="1-2" @click="sectionsNum = 1">幻灯片管理</el-menu-item>
				      <el-menu-item index="1-3" @click="sectionsNum = 2">公司简介</el-menu-item>
				    </el-menu-item-group>
				  </el-submenu>
				  <el-submenu index="2">
				    <template slot="title">
				      <i class="iconfont">&#xe640;</i>
				      <span slot="title">会员管理</span>
				    </template>
				    <el-menu-item-group>
				      <el-menu-item index="2-1">导航管理</el-menu-item>
				      <el-menu-item index="2-2">幻灯片管理</el-menu-item>
				    </el-menu-item-group>
				  </el-submenu>
		      <el-menu-item index="3" disabled>
		      	<i class="iconfont" style="color: #fff">&#xe9e2;</i>
		      	<span slot="title">插件中心</span>
		      </el-menu-item>
		      <el-menu-item index="4">
		      	<i class="iconfont" style="font-size: 22px">&#xe6e0;</i>
		      	<span slot="title">其他</span>
		      </el-menu-item>
				</el-menu>
	    </div>
	    <div class="container">
	    	<transition name="fade" mode="out-in">
		    	<component :is="sections[sectionsNum]"></component>
		    </transition>
	    </div>
	</div>
</template>

<script>
import IndexHeader from '@/common/Header'
import Honor from './components/Honor'
import New from './components/CompanyNews'
import Profile from './components/CompanyProfile'
export default {
	components: {
		IndexHeader,
		'site1': Honor,
		'site2': New,
		'site3': Profile
	},
	data() {
		return {
			sectionsNum: 0,
			sections: ['site1', 'site2', 'site3'],
			isCollapse: true,
			navList: [{
				name: '网站建设',
				isActive: false
			}, {
				name: '内容管理',
				isActive: true
			}, {
				name: '会员管理',
				isActive: false
			}, {
				name: '插件中心',
				isActive: false
			}]
		}
	},
	wacth: {
		sectionsNum(val) {
			console.log(val)
		}
	},
	methods: {
		handleOpen(key, keypath) {
			console.log(key, keypath)
		},
		handleClose(key, keypath) {
			console.log(key, keypath)
		},
		tabHandle(val) {
			// for(let i=0; i<this.navList.length; i++) {
			// 	this.navList[i].isActive = false
			// }
			// this.navList[val].isActive = true
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.contentAdmin
	overflow: hidden
	.el-menu-vertical-demo:not(.el-menu--collapse)
		width: 200px
		min-height: 400px
		overflow: hidden
	.floatNav
		position: fixed
		top: 50px
		left: 0
		margin-top: 10px
		.el-radio-group
			margin-bottom: 0 !important
		.el-radio-button__inner
			&:hover
				color: $bgColor !important
		.is-active
			.el-radio-button__orig-radio:checked+.el-radio-button__inner
				background-color: $bgColor !important
		.el-menu-item.is-active
			color: $bgColor
		.el-radio-button__inner
			color: $bgColor
		.el-submenu__title 
			color: #fff
		.el-submenu__title i
			color: #fff
			width: auto
		.el-menu-item.is-disabled
			opacity: .65
.fade-enter-active, .fade-leave-active
	transition: opacity .3s ease
.fade-enter, .fade-leave-to
	opacity: 0

</style>