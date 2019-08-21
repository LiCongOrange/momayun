<template>
	<div class="box">

	  <el-table
	    :data="navlist"
	    border
	    style="width: 100%">
	    <el-table-column
	      fixed
	      type="index"
	      width="50">
	    </el-table-column>
	    <el-table-column
	      prop="title"
	      label="标题">
	    </el-table-column>
	    <el-table-column
	      fixed="right"
	      label="操作"
	      width="150">
	      <template slot-scope="scope">
	      	<el-button
	          @click.native.prevent="editRow(scope.$index, scope.row)"
	          type="text"
	          size="small">
	          编辑
	        </el-button>
	        <el-button
	          @click.native.prevent="deleteRow(scope.$index, scope.row)"
	          type="text"
	          size="small">
	          移除
	        </el-button>
	      </template>
	    </el-table-column>
	  </el-table>
	  <el-button class="add-pic" @click="handleAddClass" icon="el-icon-plus">添加分类</el-button>

		<el-dialog
			top="8vh"
		  title="分类编辑"
		  :visible.sync="dialogVisible"
		  :modal="false"
		  width="70%"
		  :before-close="handleClose">
		  <div class="item-box">
		  	<el-form ref="form" :model="list" label-width="80px">
		  		<el-form-item label="分类标题"> 
				    <el-input v-model="currentName" clearable></el-input>
				    <el-button type="primary" plain @click="handleClassifySava">确 定</el-button>
				  </el-form-item>
		  	</el-form>
		  	<el-divider></el-divider>
		  	<h5>分类列表</h5>
			  <el-table
			    :data="currentList"
			    border
			    style="width: 100%">
			    <el-table-column
			      fixed
			      type="index"
			      width="50">
			    </el-table-column>
			    <el-table-column
			      label="标题">
			      <template slot-scope="scope">
			      	<span v-html="scope.row.title"></span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      fixed="right"
			      label="操作"
			      width="150">
			      <template slot-scope="scope">
			      	<el-button
			          @click.native.prevent="editItem(scope.$index, scope.row)"
			          type="text"
			          size="small">
			          编辑
			        </el-button>
			        <el-button
			          @click.native.prevent="deleteItem(scope.$index, scope.row)"
			          type="text"
			          size="small">
			          移除
			        </el-button>
			      </template>
			    </el-table-column>
			  </el-table>
		  	<el-button class="add-pic" @click="handleAddItem" icon="el-icon-plus">添加产品</el-button>
		  </div>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">关 闭</el-button>
		  </span>
		</el-dialog>

		<el-dialog
			top="8vh"
		  title="产品管理"
		  :modal="false"
		  :visible.sync="dialogVisibleItem"
		  width="60%"
		  :before-close="handleCloseItem">
		  <div class="son-content">
		  	<div>
		  		<h5>标题文本：</h5> <el-input v-model="itemInfo.title" clearable></el-input>
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
		    <el-button @click="dialogVisibleItem = false">取 消</el-button>
		    <el-button type="primary" @click="handleItemSave">保 存</el-button>
		  </span>
		</el-dialog>

	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	props: {
		pid: Number,
		tabslist: Array,
		content: Array
	},
	data() {
		return {
			modelInfo: '',
			dialogVisibleItem: false,
			itemInfo: {},
			dialogVisible: false,
			currentName: '',
			currentId: '',
			currentList: [],
			list: this.content,
			navlist: this.tabslist,
			editableTabsValue: 1,
			tabIndex: 1
		}
	},
	computed: {
		...mapState({
      siteId: state => state.threeStep.siteId,
			stepPages: state => state.stepPages,
		})
	},
	watch: {
		currentList(data) {
			for(let i=0; i<data.length; i++) {
				data[i].title = data[i].title.replace(/<[^>]+>/g,"")
			}
		},
		currentId(id) {
			this.currentList = []
			for(let i=0; i<this.content.length; i++) {
				if(this.content[i].tabsid == id) {
					this.currentList.push(this.content[i])
				}
			}
		}
	},
	methods: {
		handleAddClass() {
			let randowNum = parseInt(Math.random()*10000)
			this.$axios({
				method: 'post',
				url: '/api/Senior/newlanmu',
				data: {
					site_id: this.siteId,
					lanmuid: randowNum,
					pid: this.pid,
					pagetype: 3,
					lmname: '新加分类',
					isindex: 0
				}
			}).then((res)=> {
				if(res.data.code === 200) {
					let obj = {
						title: '新加分类',
						tabsid: res.data.data.lmid
					}
					this.navlist.push(obj)
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
		deleteRow(index, row) {
			this.$confirm('此操作将删除此分类下所有产品信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
				this.$axios({
					method: 'post',
					url: '/api/Senior/dellanmu',
					data: {
						site_id: this.siteId,
						lmid: row.tabsid
					}
				}).then((res)=> {
					if(res.data.code === 200) {
						for(let i=0; i<this.navlist.length; i++) {
							if(this.navlist[i].tabsid == row.tabsid) {
								this.navlist.splice(i, 1)
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
		},
		handleAddItem() {
			let obj = {
				title: "<p class='ql-align-center'><span class='ql-font-serif'>产品标题</span></p>",
				nameFn: "",
				past: "<p class='ql-align-center'><span class='ql-font-serif'>产品描述</span></p>",
				picurl: "/static/images/product/shows/pro27.jpg"
			}
		  this.$axios({
				method: 'post',
				url: '/api/Senior/newcmessage',
				data: {
				  wid: this.siteId,
				  type: 3,
				  text: obj,
				  lmid: this.currentId
				}
		  }).then((res)=> {
				if(res.data.code == '200') {
					let obj = {
						pid: res.data.data,
						tabsid: this.currentId,
						title: "<p class='ql-align-center'><span class='ql-font-serif'>产品标题</span></p>",
						nameFn: "",
						past: "<p class='ql-align-center'><span class='ql-font-serif'>产品描述</span></p>",
						picurl: "/static/images/product/shows/pro27.jpg"
					}
					this.list.push(obj)
					this.currentList.push(obj)
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
		handleClassifySava() {
			this.$axios({
				method: 'post',
  			url: '/api/Senior/savelanmu',
  			data: {
  				pagetype: 3,
  				lmname: this.currentName,
  				lmid: this.currentId
  			}
			}).then((res)=> {
				if(res.data.code === 200) {
					for(let i=0; i<this.navlist.length; i++) {
						if(this.navlist[i].tabsid === this.currentId) {
							this.navlist[i].title = this.currentName
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
			// this.$emit('backClassifyTitle', [ this.currentId, this.currentName ] )
		},
		handleItemSave() {
		  this.$axios({
				method: 'post',
				url: '/api/Senior/savemessage',
				data: {
				  id: this.itemInfo.pid,
				  type: 3,
				  text: this.itemInfo
				}
		  }).then((res)=> {
		  	if(res.data.code == '200') {
		  		this.$message({
		  			type: 'success',
		  			message: res.data.msg
		  		})
		  		this.dialogVisibleItem = false
		  	}else {
				  this.$message({
				  	type: 'error',
				  	message: res.data.msg
				  })
				}
		  })	
		},
		editItem(index, row) {
			this.itemInfo = row
			this.dialogVisibleItem = true
		},
		deleteItem(index, row) {
		  this.$axios({
				method: 'post',
				url: '/api/Senior/delmessage',
				data: {
				  id: row.pid,
				  type: 3
				}
		  }).then((res)=> {
				if(res.data.code == '200') {
					this.$message({
						type: 'success',
						message: res.data.msg
					})
					for(let i=0; i<this.list.length; i++) {
						if(this.list[i].pid == row.pid) {
							this.list.splice(i, 1)
						}
					}
					for(let i=0; i<this.currentList.length; i++) {
						if(this.currentList[i].pid == row.pid) {
							this.currentList.splice(i, 1)
						}
					}
				}else {
					this.$message({
						type: 'error',
						message: res.data.msg
					})
				}
		  })
		},
		handleCloseItem() {
			this.dialogVisibleItem = false
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
				  this.itemInfo.picurl = res.data.data[0].url
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
		handleClose() {
			this.dialogVisible = false
		},
		editRow(index, row) {
			this.dialogVisible = true
			this.currentId = row.tabsid
			this.currentName = row.title
		}
	}
}
</script>

<style lang="stylus" scoped>
.box
	>>> .el-form
		.el-form-item__content
			display: flex
			.el-button--primary.is-plain
				margin-left: 10px
	>>> .el-upload__input
		display: none
	.add-pic
		width: 100%
		margin-top: 10px
</style>