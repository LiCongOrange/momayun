<template>
	<div class="box">

		<div v-if="titleToggle">
			<h5>头部信息</h5>
			<el-form ref="form" label-width="80px">
				<el-form-item label="标题文本">
			    <el-input v-model="listTitle" clearable></el-input>
			  </el-form-item>
				<el-form-item label="更多按钮">
			    <el-input v-model="listTitleFn" clearable></el-input>
			  </el-form-item>
			</el-form>
			<el-divider></el-divider>
		</div>
		<h5>可添加文章</h5>
	  <el-table
	    :data="tableData"
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
	      width="100">
	      <template slot-scope="scope">
	        <el-button @click="handleClick(scope.row, '01')" type="text" size="small">查看</el-button>
	        <el-button @click="handleAddItem(scope.row)" type="text" size="small">添加</el-button>
	      </template>
	    </el-table-column>
	  </el-table>

	  <el-divider></el-divider>
	  <h5>原有文章</h5>
	  <el-table
	    :data="newlist"
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
	      width="100">
	      <template slot-scope="scope">
	        <el-button @click="handleClick(scope.row, '02')" type="text" size="small">编辑</el-button>
	        <el-button @click="handleDelItem(scope.row)" type="text" size="small">删除</el-button>
	      </template>
	    </el-table-column>
	  </el-table>

	<el-dialog
	  title="文章详情"
	  :modal="false"
	  :visible.sync="dialogVisibleItem"
	  :close-on-click-moda="true"
	  width="60%"
	  :before-close="handleNewsClose">

		<el-form ref="form" :model="newitem" label-width="80px">
		  <el-form-item label="标题">
		    <el-input v-model="newitem.title" :disabled="itemDisabled" clearable></el-input>
		  </el-form-item>
		  <el-form-item label="时间">
		    <el-input v-model="newitem.timer" :disabled="itemDisabled" clearable></el-input>
		  </el-form-item>
		  <el-form-item label="内容">
		  	<el-input type="textarea" :autosize="{ minRows: 15 }" :disabled="itemDisabled" v-model="newitem.past"></el-input>
		  </el-form-item>
		</el-form>

	  <span slot="footer" class="dialog-footer">
	    <el-button @click="dialogVisibleItem = false">关 闭</el-button>
	    <el-button v-if="!itemDisabled" type="primary" @click="handleSaveItem">保存</el-button>
	  </span>
	</el-dialog>

	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	props: {
		pid: Number,
		pageType: Number,
		content: Array,
		newListTitle: String,
		newListTitleFn: String,
		titleToggle: Boolean
	},
	data() {
    return {
    	listTitle: this.newListTitle,
    	listTitleFn: this.newListTitleFn,
    	dialogVisibleItem: false,
    	newlist: this.content,
    	tableData: [],
    	itemDisabled: false,
    	newitem: {
    		title: '',
    		timer: '',
    		past: ''
    	}
    };
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			browserToggle: state => state.browserToggle,
			stepPages: state => state.stepPages,
      siteId: state => state.threeStep.siteId,
      yhid: state => state.threeStep.yhid
		})
	},
	watch: {
		listTitle(val) {
			this.$emit('handleTitleEdit', ['01', val])
		},
		listTitleFn(val) {
			this.$emit('handleTitleEdit', ['02', val])
		}
	},
	mounted() {
		for(let i=0; i<this.newlist.length; i++) {
			this.newlist[i].title = this.newlist[i].title.replace(/<[^>]+>/g,"")
			this.newlist[i].past = this.newlist[i].past.replace(/<[^>]+>/g,"")
		}
		this.$axios({
			method: 'post',
			url: '/api/Senior/seenewNews',
			data: {
				hyid: this.yhid
			}
		}).then((res)=> {
			if(res.data.code == '200') {
				for(let i=0; i<res.data.data.length; i++) {
					let obj = {
						nid: res.data.data[i].id,
						title: res.data.data[i].title,
						timer: res.data.data[i].timer,
						past: res.data.data[i].past
					}
					// res.data.data[i].title = res.data.data[i].title.replace(/<[^<>]+?>/g, '')
					this.tableData.push(obj)
				}
			}else {
				// this.$message({
				// 	type: 'error',
				// 	message: res.data.msg
				// })
			}
		})
	},
	methods: {
		handleDelItem(data) {
      this.$axios({
        method: 'post',
        url: '/api/Senior/delmessage',
        data: {
          id: data.nid,
          type: 2
        }
      }).then((res)=> {
      	if(res.data.code == '200') {
      		for(let i=0; i<this.newlist.length; i++) {
      			if(this.newlist[i].nid == data.nid) {
      				this.newlist.splice(i, 1)
      			}
      		}
      		this.$message({
      			type: 'success',
      			message: res.data.msg
      		})
      	}
        if(res.data.code == '404') {
          this.$message({
          	type: 'error',
          	message: res.data.msg
          })
        }
      })
		},
		handleAddItem(data) {
			let newItemData = {
				title: data.title,
				time: data.timer,
				content: data.past
			}
			if(this.newlist.length < 6) {
	      this.$axios({
	        method: 'post',
	        url: '/api/Senior/newcmessage',
	        data: {
	          wid: this.siteId,
	          type: 2,
	          text: newItemData,
	          lmid: this.pid
	        }
	      }).then((res)=> {
	        if(res.data.code == '200') {
	        	let newItemData = {
	        		nid: res.data.data,
	        		title: data.title,
	        		timer: data.timer.split(' ')[0],
							past: data.past
	        	}
	        	// newItemData.nid = res.data.data
	          this.newlist.push(newItemData)
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
			}else {
				this.$message({
					type: 'error',
					message: '最多显示6条，请删除后再添加。'
				})
			}
		},
		handleSaveItem() {
        this.$axios({
          method: 'post',
          url: '/api/Senior/savemessage',
          data: {
            id: this.newitem.nid,
            type: 2,
            text: this.newitem
          }
        }).then((res)=> {
          if(res.data.code == '200') {
            this.dialogVisibleItem = false
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
		handleNewsClose() {
			this.dialogVisibleItem = false
		},
		handleClick(data, type) {
			if(type == '01') {
				this.itemDisabled = true
			}else {
				this.itemDisabled = false
			}
			this.dialogVisibleItem = true
			this.newitem = data
		}
	}
}
</script>

<style scoped lang="stylus">

</style>