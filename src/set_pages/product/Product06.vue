<template>
	<div 
			class="container" 
			:class="[phoneClass, { borderActive: editBtnToggle }]"
			@mouseover=" allEditToggle ?  editBtnToggle = true : editBtnToggle = false " 
			@mouseleave="editBtnToggle = false"
		>
		<el-button 
			v-if="editBtnToggle" 
			class="editBtn" 
			size="small" 
			icon="el-icon-edit" 
			@click="dialogVisible = true" 
			plain
		>编辑</el-button>
		<!-- <div class="editBtn" v-if="editBtnToggle" @click=" dialogVisible = true ">编辑</div> -->
		<el-tabs 
			:tab-position="tabPosition" 
			v-model="editableTabsValue" 
			type="border-card"  
			@tab-click="handleTabsEdit"
		>
		  <el-tab-pane
		    :key="item.id"
		    v-for="(item, index) in modelInfo.editableTabs"
		    :label="item.title"
		    :name="item.id"
		  >
		  	<ul>
		    	<li v-for="(item, index) in tablist">
		    		<div class="list-inner">
			    		<img :src="item.picurl">
			    		<p v-html="item.title" @click="todetailHandel(item)"></p>
		    		</div>
		    	</li>
		    </ul>
		  </el-tab-pane>
		</el-tabs>

		<el-dialog
			top="8vh"
		  title="产品分类管理"
		  :visible.sync="dialogVisible"
		  width="80%"
		  :before-close="handleClose">
		  <edit-tabs
		  	:pid="this.pid"
		  	:tabslist="modelInfo.editableTabs"
		  	:content="modelInfo.productList"
		  ></edit-tabs>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>

	</div>
</template>

<script>
import { mapState } from 'vuex'
import editTabs from '@/common/EditTabs'
export default {
	props: ['pid'],
	components: {
		editTabs
	},
	data() {
		return {
			phoneClass: '',
			dialogVisible: false,
			editBtnToggle: false,
			editableTabsValue: '0',
      tabIndex: 1,
			tabPosition: 'left',
			modelInfo: '',
			tabid: '',
			tablist: []
		}
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
      pageToggle: state => state.pageToggle,
			browserToggle: state => state.browserToggle,
      columnList2: state => state.threeStep.columnList2,
      siteId: state => state.threeStep.siteId,
			stepPages: state => state.stepPages,
		})
	},
	watch: {
		tabid(id) {
			this.tablist = []
			for(let i=0; i<this.modelInfo.productList.length; i++) {
				if(this.modelInfo.productList[i].tabsid == this.tabid) {
					this.tablist.push(this.modelInfo.productList[i])
				}
			}
		}
	},
	mounted() {
		for(let i=0; i<this.stepPages.product.length; i++) {
			if(this.stepPages.product[i].lmid == this.pid) {
				this.modelInfo = this.stepPages.product[i]
			}
		}
		if(!this.browserToggle) {
			this.tabPosition = 'top'
			this.phoneClass = 'phoneClass'
		}
		this.tabid = this.modelInfo.editableTabs[0].tabsid
	},
	methods: {
		todetailHandel(data) {
			let obj = {
				lmid: this.pid,
				type: '3',
				id: data.pid
			}
			this.$store.state.sonPagetoggle = false
			this.$store.commit('sonPageHandle', obj)
			this.$store.commit('pageIndexHandel', this.columnList2.length-2)
		},
		handleClose() {
			this.dialogVisible = false
		},
    handleTabsEdit(tab, event) {
    	for(let i=0; i<this.modelInfo.editableTabs.length; i++) {
    		if(this.modelInfo.editableTabs[i].title == tab.label) {
    			this.tabid = this.modelInfo.editableTabs[i].tabsid
    		}
    	}
    }
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.container
	margin: 15px auto
	padding: 5px
	border: 1px dashed rgba(0, 0, 0, 0)
	transition: all .3s
	position: relative
	.editBtn
		position: absolute
		left: 0
		top: 0
		box-shadow: $maskeditbtnshadow
		transform: translateY(-100%)
		z-index: 10
		transition: all .3s
	>>> .el-tabs
		.el-tabs__header
			min-width: 170px
			.el-tabs__item
				height: 50px
				line-height: 50px
		.el-tabs__new-tab
			display: none
		.el-tabs__content
			li
				width: 25%
				display: inline-block
				vertical-align: top
				margin-bottom: 10px
				.list-inner
					padding: 0 10px 10px
					p
						line-height: 24px
						cursor: pointer
						&:hover
							text-decoration: underline 
					span
						overflow: hidden
						text-overflow: ellipsis
						white-space: nowrap
						display: block
						width: 100%
				img
					width: 100%
.borderActive
	border-color: $maskeditbordercolor
.phoneClass
	.el-tabs
		.el-tabs__content
			li
				width: 50%
</style>