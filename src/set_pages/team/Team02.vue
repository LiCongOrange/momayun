<template>
	<div :class="[phoneClass]">
		<div class="banner">
			<div class="banner-inner">
				<img :src="modelInfo.picurl">
				<div class="masking-edit" v-if="allEditToggle">
					<span @click="handleWheelClick">编辑</span>
				</div>
			</div>
		</div>
		<div class="main-text container">
			<div v-if="allEditToggle">
				<fn-editor :content="modelInfo.content" :type1="1" :type2="3" :lmid="pid" :sonid="modelInfo.pagid"></fn-editor>
			</div>
			<div v-else v-html="modelInfo.content"></div>
		</div>
		<el-dialog
		  title="提示"
		  :visible.sync="dialogVisible"
		  width="60%"
		  :before-close="handleClose"
		 >
		  <edit-pic
		  	:pageType="3"
		  	:id="this.pagid"
		  	:pid="this.pid"
		  	:content="this.picdesc"
		  	@handleBack="handleBack"
		  ></edit-pic>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="HandleSave">保 存</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import FnEditor from '@/common/Editor'
import EditPic from '@/common/EditPic'
export default {
	props: ['pid'],
	components: {
		FnEditor,
		EditPic
	},
	data() {
		return {
			phoneClass: '',
			picdesc: '，图片尺寸自行选取。',
			dialogVisible: false,
			modelInfo: '',
			currentPic: ''
		}
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			zImg: state => state.stepPages.bannerList,
			stepPages: state => state.stepPages,
			browserToggle: state => state.browserToggle
		})
	},
	mounted() {
		if(!this.browserToggle) {
			this.phoneClass = 'phoneClass'
		}
		for(let i=0; i<this.stepPages.single.length; i++) {
			if(this.stepPages.single[i].lmid == this.pid) {
				this.modelInfo = this.stepPages.single[i]
			}
		}

	},
	methods: {
		HandleSave() {
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemessage',
				data: {
					id: this.modelInfo.pagid,
          type: 1,
          text: {
          	title: this.modelInfo.modularName,
          	titleFn: this.modelInfo.modularNameLetter,
          	picurl: this.currentPic
          }
				}
			}).then((res)=> {
				if(res.data.code == '200') {
					this.$message({
						type: 'success',
						message: res.data.msg
					})
					this.modelInfo.picurl = this.currentPic
					this.dialogVisible = false
				}else {
					this.$message({
						type: 'error',
						message: res.data.msg
					})
				}
			})
		},
		handleBack(data) {
			this.currentPic = data
		},
		handleWheelClick() {
			this.dialogVisible = true
		},
		handleClose() {
			this.dialogVisible = false
		}
	}
}
</script>

<style scoped lang="stylus">
@import '~styles/public'
.banner
	text-align: center
	.banner-inner
		display: inline-block
		position: relative
		&:hover
			.masking-edit
				opacity: 1
	img
		max-width: 100%
	.masking-edit
		position: absolute
		left: 0
		top: 0
		width: 100%
		height: 100%
		z-index: 10
		background-color: $maskbg
		border: $maskborder
		border-radius: $maskradius
		display: flex
		align-items: center
		justify-content: center
		opacity: 0
		transition: all .3s
		span
			border-radius: $addbtnradius
			padding: $addbtnpadding
			background-color: $addbtnbg
			font-size: $addbtnfontsize
			color: $addbtncolor
			cursor: pointer
.main-text
	padding: 10px 0
	>>> .ql-editor
		padding: 1px 3px
	>>> p
		text-indent: 28px
		font-size: 14px
		line-height: 28px
.phoneClass
	.main-text
		padding: 10px
</style>