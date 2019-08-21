<template>
	<div class="company">
		<div class="warp">
			<div class="text">
				<h3>内容：</h3>
				<textarea v-model="contenter"></textarea>
			</div>
			<div class="img">
				<!-- <h3>图片：</h3>
				<button @click="getFile">上传图片</button>
				
				 <input type="file" value=""  id="file"  @change='onUpload'> -->
				 <!-- <div id=""></div> -->
				 <img-up></img-up>
			</div>
			<div class="finish">
				<button>保存11</button>
			</div>
		</div>
	</div> 
</template>

<script>
import ImgUp from '@/common/ImgUp'
export default {
	components: {
		ImgUp
	},
	data() {
		return {
			contenter: '',
			imgUrl: '',
			file: ''
		}
	},
	methods: {
		getFile() {

		},
		onUpload(e){
		        var formData = new FormData(); 
		        formData.append('file', e.target.files[0]);
		        formData.append('type', 'test');
		           $.ajax({
		                url: '/ShopApi/util/upload.weixun', //这里是后台接口需要换掉
		                type: 'POST',
		                dataType: 'json',
		                cache: false,
		                data: formData,
		                processData: false,
		                contentType: false,
		                success: (res) => {                
		                    if (res.code === 200) {
		                        var img_tpl =`<div class="picture" style="width:108px;float:left;"><img id="preview" src="'+后台返回的tu'pian路径+'" style="width:48px;height:48px;float:left;background-size:cover;"/><span class="r-span" onclick = "onDeletePicture()" style="color:#49BDCC;display:block;float:left;margin-left:10px;line-height:48px;">删除</span></div>`
		                        $("#refund_img").after(img_tpl);
		                    }
		                },
		                error: function(err) {
		                alert("网络错误");
		                }
		            });
		} 
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.company
	margin: 20px
	background: #fff
	.warp
		width: 94%
		padding: 20px
		.text
			h3
				margin: 0
				float: left
				font-size: 18px
			textarea
				width: 70%
				min-height: 200px
				resize: none
				line-height: 24px
				text-indent: 14px
				font-size: 14px
				color: $fontColor
		.img
			overflow: hidden
			margin-top: 15px
			h3
				margin: 0
				font-size: 18px
				float: left
				line-height: 24px
			button
				margin-left: 15px
				float: left
				background: #F39871
				border: none
				border-radius: 10px
				padding: 2px 15px
				color: #fff
		.finish
			margin-top: 30px
			text-align: center
			button
				border: none
				border-radius: 15px
				background: $bgColor
				padding: 7px 30px
				color: #fff
</style>