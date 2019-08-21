<template>
	<div class="upImg"
		@mouseover="fnEditimg(1)"
		@mouseout="fnEditimg(2)">
		<div class="mask" v-if="switchToggle">
			<div class="content">
				<div class="main">
					<span @click="upImgHandel">编辑</span>
					<!-- <i class="iconfont" @click="upImgHandel">&#xe660;</i> -->
					<!-- <i class="iconfont">&#xe625;</i> -->
				</div>
			</div>
		</div>
		<img-layer 
			v-if="imgReplaceToggle" 
			:imgTu="postImg"
			:widthNum="widthNum"
			:heightNum="heightNum"
			@getImg="getImg"
			@onoff="onoff"
		></img-layer>
	</div>
</template>

<script>
import imgLayer from '@/common/Imglayer'
export default {
	props: ['postImg', 'widthNum', 'heightNum'],
	components: {
		imgLayer
	},
	data() {
		return {
			switchToggle: false,
			imgReplaceToggle: false,
			imgUrl: ''
		}
	},
	methods: {
		fnEditimg(type) {
			if(type == 1) {
				this.switchToggle = true
			}else {
				this.switchToggle = false
			}
		},
		onoff(val) {
			this.imgReplaceToggle = false
			this.switchToggle = false
		},
		getImg(val) {
			this.imgUrl = val
			this.$emit('getImg', this.imgUrl)
		},
		upImgHandel() {
			this.imgReplaceToggle = true
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.upImg
	width: 100%
	height: 100%
	position: absolute
	left: 0
	top: 0
	.mask
		position: absolute
		left: 0
		right: 0
		top: 0
		bottom: 0
		background: $maskbg
		border: $maskborder
		border-radius: $maskradius
		width: 100%
		height: 100%
		transition: all .3s
		// cursor: move
	.main
		position: absolute
		left: 50%
		top: 50%
		display: inline-flex
		margin: -16px 0 0 -25px
		span
			background: $addbtnbg
			padding: $addbtnpadding
			border-radius: $addbtnradius
			font-size: $addbtnfontsize
			color: #fff
			cursor: pointer
		i
			margin: 0 10px
			border: 2px solid #fff
			border-radius: 15px
			padding: 3px 5px
			color: #fff
			cursor: pointer
</style>