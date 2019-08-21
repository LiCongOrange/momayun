<template>
	<div class="box">

	  <el-table
	    :data="content"
	    border
	    style="width: 100%">
	    <el-table-column
	    	type="index"
	      width="50">
	    </el-table-column>
	    <el-table-column
	      prop="title"
	      label="标题">
	    </el-table-column>
	    <el-table-column
	      label="操作"
	      width="100">
	      <template slot-scope="scope">
	        <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
	        <el-button type="text" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <el-button class="add-pic" @click="handelAdd" icon="el-icon-plus">添加图片</el-button>

		<el-dialog
		  title="编辑图片"
		  :visible.sync="dialogVisible"
		  width="60%"
		  :modal="false"
		  :before-close="handleClose">
		  <div class="son-content">
		  	<div>
		  		<h5>标题文本：</h5> 
		  		<div class="son-content-title">
			  		<el-input v-model="currentName" clearable></el-input>
			  		<el-button type="primary" plain @click="handleClassifySava">确 定</el-button>
		  		</div>
		  	</div>
		  	<el-divider></el-divider>

		  	<h5>编辑图片</h5>
				<el-upload
				  class="upload-demo"
				  drag
				  action="/api/upload/imgsUpload"
				  :http-request="httpRequest"
				  :multiple="false">
				  <i class="el-icon-upload"></i>
				  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
				  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>

		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="handleClose('01')">保 存</el-button>
		  </span>
		</el-dialog>
		<!-- <img :src="currrentUrl"> -->
	</div>
</template>

<script>
export default {
	props: {
		pid: Number,
		pageType: Number,
		content: Array
	},
	data() {
		return {
			imgList: [],
			param: '',
			currentName: '',
			currrentUrl: '',
			fileList: [],
			info: '',
			dialogVisible: false
		}
	},
	methods: {
		handleClassifySava() {
			let obj = {
				bid: '',
				content: '',
				listToggle: true,
				picurl: this.info.picurl,
				spanOnoff: true,
				title: this.currentName
			}
			this.$axios({
				method: 'post',
				url: '/api/Senior/savemessage',
				data: {
					id: this.info.bid,
					text: obj,
					type: 5
				}
			}).then((res)=> {
				if(res.data.code == '200') {
					this.$message({
						type: 'success',
						message: res.data.msg
					})
				}
				this.info.title = this.currentName
				if(res.data.code == '404') {
					this.$message({
						type: 'error',
						message: res.data.msg
					})
				}
			})
		},
		handelAdd() {
			let obj = this.content[0]
			this.$axios({
				method: 'post',
				url: '/api/Senior/newcmessage',
				data: {
					wid: this.siteId,
					type: 5,
					text: obj,
					lmid: this.pid
				}
			}).then((res)=> {
				if(res.data.code == '200') {
					obj.bid = res.data.data
					this.content.push(obj)
					this.$message({
						type: 'success',
						message: res.data.msg
					})
				}else {
					this.$message({
						type: 'error',
						message: res.data.msg
					})
				}
			})
		},
		handleDel(index, row) {
			this.$axios({
				method: 'post',
				url: '/api/Senior/delmessage',
				data: {
					id: row.bid,
					type: 5
				}
			}).then((res)=> {
				if(res.data.code == '200') {
					for(let i=0; i<this.content.length; i++) {
						if(this.content[i].bid == row.bid) {
							this.content.splice(i, 1)
						}
					}
					this.$message({
						type: 'success',
						message: res.data.msg
					})
				}else {
					this.$message({
						type: 'error',
						message: res.data.msg
					})
				}
			})
		},
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
				  this.info.picurl = res.data.data[0].url
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
		handleEdit(index, row) {
			this.currentName = row.title
			this.dialogVisible = true
			this.info = row
			let obj = {
				url: row.picurl
			}
			this.fileList.push()
		},
		handleClose(type) {
			if(type == '01') {
				if(this.pageType == '5') {
					this.$axios({
						method: 'post',
						url: '/api/Senior/savemessage',
						data: {
							id: this.info.bid,
							text: this.info,
							type: 5
						}
					}).then((res)=> {
						if(res.data.code == '200') {
							this.$message({
								type: 'success',
								message: res.data.msg
							})
							this.dialogVisible = false
						}else {
							this.$message({
								type: 'error',
								message: res.data.msg
							})
						}
					})
				}else if(this.pageType == '3') {

				}
			}else {
				this.dialogVisible = false
			}
		}
	}
}
</script>

<style scoped lang="stylus">
.box
	>>> .add-pic
		margin-top: 10px
		width: 100%
	>>> .el-upload__input
		display: none
	>>> .el-dialog__wrapper
		.son-content-title
			display: flex
			.el-input
				margin-right: 10px
		h5
			line-height: 24px
		
</style>