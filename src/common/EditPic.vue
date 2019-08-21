<template>
	<div class="laybox">
		<el-upload
		  class="upload-demo"
		  drag
		  action="/api/upload/imgsUpload"
			:http-request="httpRequest"
		  :multiple="false"
		 >
		  <i class="el-icon-upload"></i>
		  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
		  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb{{ this.content }}</div>
		</el-upload>
	</div>
</template>
<script>
export default{
	props: {
		id: String,
		pageType: Number,
		content: String,
		pid: Number
	},
	data() {
		return{
			imgList: []
		}
	},
	methods: {
  	httpRequest (options) {
      let file = options.file
      this.getBase64(file).then((res)=> {
      	this.HandleImgUp(res)
      })
    },
    HandleImgUp(url) {
		  this.imgList = []
			  let obj = {
				url: url
		  }
	  	this.imgList.push(obj)
		  this.$axios({
				method: 'post',
				url: '/api/upload/imgsUpload',
				data: this.imgList
		  }).then((res)=> {
				if(res.data.code == '200') {
					this.$message({
	      		type: 'success',
	      		message: '上传成功'
	      	})
	      	this.$emit('handleBack', res.data.data[0].url)
				}else {
				  this.$message({
				  	type: 'error',
				  	message: res.data.msg
				  })
				}
		  })
    },
 		getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
    },
	}
}
</script>
<style lang="stylus" scoped>
.laybox
	>>> .el-upload__input
		display: none
	>>> .el-upload
		display: block
		.el-upload-dragger
			width: 100%
</style>		