<template>
	<div class="honor">
		<div class="mask" v-if="this.$store.state.honorEditToggle">
			<honor-edit></honor-edit>
		</div>
		<div class="title">
			<button @click="addList">添加展示</button>
		</div>
		<div class="honorList container">
			<ul>
				<li 
					class="col-md-3 col-sm-6" 
					v-for="(item, index) in imgList"
					v-if="item.title"
				>
					<div>
						<img :src="item.imgUrl">
						<p>
							<span>{{item.title}}</span>
						</p>
						<p>
							<a href="javascript:;" @click="editHandle(index)">编辑</a>
							<a href="javascript:;" @click="deleteHandle(index)">删除</a>
						</p>
					</div>
				</li>
			</ul>
		</div>
		<div class="finish">
			<button>保存</button>
		</div>
	</div>
</template>

<script>
import HonorEdit from './HonorEdit'
export default {
	components: {
		HonorEdit
	},
	data() {
		return {
			imgList: [{
				imgUrl: '../../../../static/images/contentAdmin/honor.png',
				title: '案例案例老师老老师老师例老师老师雷神11111111'
			}, {
				imgUrl: '../../../../static/images/contentAdmin/honor1.png',
				title: '案例老师老师案例老师老师雷神3师雷神3案222222'
			}, {
				imgUrl: '../../../../static/images/contentAdmin/honor2.png',
				title: '案例老师老师雷神3老案例老师老师雷神3333333'
			}, {
				imgUrl: '../../../../static/images/contentAdmin/honor3.png',
				title: '案例例老师老师雷神44444444'
			}]
		}
	},
	methods: {
		editHandle(val) {
			this.$store.state.honorEditToggle = true
			this.$store.state.honorImg = this.imgList[val].imgUrl
			this.$store.state.honorText = this.imgList[val].title
		},
		deleteHandle(val) {
			// this.imgList[val].title = ''
			this.imgList.splice(val, 1)
		},
		addList() {
			if(this.imgList.length < 8) {
				var obj = {
					imgUrl: '../../../../static/images/contentAdmin/honor4.png',
					title: '案例案例老师老老师老师雷神3案例老师老师雷神3'
				}
				this.imgList.push(obj)
				console.log(this.imgList)
			}else {
				alert('123')
			}

		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.honor
	margin: 20px
	overflow: hidden
	background: #fff
	.mask
		position: fixed
		left: 0
		right: 0
		top: 0
		bottom: 0
		background: rgba(0, 0, 0, 0.7)
		z-index: 100
	.title
		padding: 20px 22px
		border-bottom: 1px solid $inputBorder
		button
			background: $bgColor
			padding: 5px 15px
			border: none
			border-radius: 15px
			color: #fff
			font-size: 16px
			line-height: 28px
	.honorList
		padding-top: 20px
		padding-bottom: 20px
		overflow: hidden
		margin: 0
		ul
			width: 90%
		li
			margin-bottom: 10px
			text-align: center
			div
				width: 90%
				margin: 0 auto
			img
				width: 100%
				height: auto
			p
				padding: 10px 10px 0
				margin: 0
				text-align: center
				&:nth-of-type(1)
					min-height: 60px
				&:nth-of-type(2)
					padding: 10px 20px 0
				span
					display: block
				a
					border: 1px solid $inputBorder
					border-radius: 8px
					padding: 0 15px
					float: right
					font-size: 14px
					line-height: 26px
					&:nth-of-type(1)
						float: left
						background: #f89d7e
						border-color: #f89d7e
						color: #fff
	.finish
		padding: 20px 0
		text-align: center
		button
			background: $bgColor
			border: none
			border-radius: 15px
			padding: 5px 25px
			color: #fff
			font-size: 18px
</style>