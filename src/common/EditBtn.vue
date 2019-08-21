<template>
	<div class="btnEditor">
		<div class="editorWrap">
			<ul>
				<li v-for="(item, index) in dialogVisibleBtnData.content">
					<div class="item-inner">
						<div class="demo-input-suffix">
							<span>文本内容：</span> <el-input v-model="item.text" clearable />
						</div>
						<div class="demo-input-suffix">
							<span>链接网址：</span> <el-input v-model="item.link" clearable />
						</div>
						<div class="demo-input-suffix">
							<span>打开方式：</span> 
							<el-radio-group v-model="item.target">
					      <el-radio label="新页面"></el-radio>
					      <el-radio label="当前页"></el-radio>
					    </el-radio-group>
						</div>
						<el-button type="danger" plain @click="HandleDelete(index)">删除</el-button>
						<el-divider><i class="el-icon-mobile-phone"></i></el-divider>
					</div>
				</li>
			</ul>
			<el-button type="primary" @click="HandleAddBtn">添加按钮</el-button>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			resource: '',
			type: [],
			radio: '1',
			checked: true,
			btnToggle: true,
			textContent: this.content
		}
	},
  computed: {
    ...mapState({
      dialogVisibleBtnData: state => state.dialogVisibleBtnData
    })
  },
	methods: {
		HandleDelete(index) {
			this.dialogVisibleBtnData.content.splice(index, 1)
		},
		HandleAddBtn() {
			let obj = {
				text: '新加按钮',
				link: 'https://www.baidu.com',
				target: '新页面'
			}
			this.dialogVisibleBtnData.content.push(obj)
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.btnEditor
	ul
		li
			display: inline-block
			width: 50%
			.item-inner
				padding: 0 10px
			.demo-input-suffix
				display: flex
				margin-bottom: 15px
				span
					display: block
					width: 90px
					line-height: 40px
				>>> .el-radio-group
					margin-top: 12px
</style>