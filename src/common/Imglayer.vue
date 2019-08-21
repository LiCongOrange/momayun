<template>
	<div class="laybox">
		<div class="imgup">
			<div class="imgup_head">
				<div class="img_close" @click="closelayer()"><i class="iconfont">&#xe625;</i></div>
			</div>
			<div class="imgup_body">
				<div class="body_border">
            <div class="toup">
            	<img 
            		id="image" 
            		v-if="this.files[this.files.length-1].src || imgTu" 
            		:src="this.files[this.files.length-1].src || imgTu"
            	>
            	<span class="fileBtn">
            		<span>在本地文件中浏览</span>
								<input 
									type="file" 
									ref="file" 
									class="upload" 
									@change='add_img' 
									value="上传微信二维码">
            	</span>
							<button @click="fnNm">上传图片</button>
						</div>
						<div class="explain" v-if="this.widthNum">
							<p v-if="!this.lunbo">小提示： 请确保您的图片尺寸适中，建议图片尺寸{{widthNum}} &#215; {{heightNum}}</p>
							<p v-else>小提示： 上传宽幅图像，建议图片尺寸{{widthNum}} &#215; {{heightNum}}，请确保所有图片尺寸保持一致！</p>
						</div>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	export default{
		props: ['imgTu', 'widthNum', 'heightNum', 'lunbo'],
		data (){
			return{
				file:'',
				files: [{
					name: '',
					size: '',
					src: ''
				}],
        imgData: {
            accept: 'image/gif, image/jpeg, image/png, image/jpg',
        },
			}
		},
		methods:{
			closelayer(){
				this.$emit('onoff', false)
			},
			fnNm() {
				if(this.files[this.files.length-1].src !== "") {
					this.$emit('getImg', this.files[this.files.length-1].src)
					this.$emit('onoff', false)
				}else {
					this.$emit('getImg', this.imgTu)
					this.$emit('onoff', false)
				}
			},
			html5Reader(file, item) {
				const reader = new FileReader()
				reader.onload = (e) => {
					this.$set(item, 'src', e.target.result)
				}
				reader.readAsDataURL(file)
			},
			isContain(file) {
				return this.files.find( (item) => item.name === file.name && item.size === file.size )
			},
			add_img(){  
				const list = this.$refs.file.files
				for(let i = 0; i < list.length; i++) {
					let formart = list[i].name.split(".")[1]
					if(formart == "jpg" || formart == "png" || formart == "gif" || formart == "jpeg") {
						if(!this.isContain(list[i])) {
							const item = {
								name: list[i].name,
								size: list[i].size,
								file: list[i]
							}
							this.html5Reader(list[i], item)
							this.files.push(item)
						}
					}else {
						alert("文件格式不支持上传")
					}
				}
			}
		}
	}
</script>
<style lang="stylus" scoped>
	.laybox
		width: 100%
		height: 100%
		background: rgba(0,0,0,.5)
		position: fixed
		z-index: 1500000000
		left:0
		top:0
		right:0
		bottom:0
		transition: all 0.3s;
		.imgup
			width:60%
			background:white
			position:fixed
			left: 50%
			top: 50%
			transform: translate(-50%, -50%)
			min-width:900px
			border-radius: 4px
			overflow: hidden
			transition: all 0.3s;
			.imgup_head
				padding:0 10px
				height:50px
				line-height:50px
				background:#F5F5F5
				.img_close
					float:right
					width:50px
					height:50px
					text-align:center
					cursor:pointer
					color: rgb(99, 105, 114)
			.imgup_body
				padding:20px
				// height:550px
				.body_border
					width:100%
					border: 4px dashed #e2e4e7
					position: relative
					padding: 20px 0
					.toup
						text-align: center
						img
							margin: 0 auto
							// width: 500px
							height: auto
							max-height: 350px
							max-width: 100%
							padding: 30px
						.fileBtn
							position: relative
							display: block
							margin: 10px 0
							font-size: 16px
							input
								position: absolute
								top: 0
								right: 0
								left: 0
								cursor:pointer
								margin: 0 auto
								display: inline
								width: 300px
								opacity: 0
							span
								display: inline-block
								background: rgb(238, 238, 238)
								border: 1px solid #ccc
								border-radius: 4px
								padding: 10px 15px
								font-weight: 700
								font-size: 14px
								color: #919394
						button
							padding: 6px 15px
							background:#f1f1f1
							border: 1px solid #ccc
							border-radius: 4px
							font-size: 14px
							color: #919394
							font-weight: 700
					.explain
						margin-top: 40px
						text-align: center
						font-size: 14px
						color: #636972
						line-height: 1.4
</style>		