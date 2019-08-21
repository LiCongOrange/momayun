<template>
	<div class="tooltip-wrap" :style="{ top: tooltipTop + 'px' }" v-if="tooltipToggle">
		<div class="tool01" v-if="tooltipType == '01'">
			<div class="inner">
				<h4>
					<i class="iconfont">&#xe6b0;</i>链接地址
				</h4>
				<input class="input" type="text" v-model="tooltipOption.link" @input="regHandel('01', tooltipOption.link)">
				<label @click.prevent="openmodeHandle">
					<input type="checkbox" :checked="tooltipOption.openmode == '_blank'">
					<span>在新标签页中打开</span>
				</label>
			</div>
		</div>
		<div class="tool02" v-else-if="tooltipType == '02'">
			<div class="inner">
				<h4>
					<i class="iconfont">&#xe60c;</i>重命名
				</h4>
				<p>
					<input type="text" v-model="tooltipOption.name" @input="regHandel('02', tooltipOption.name)">
				</p>
				<h5 @click="delpage">
					<i class="iconfont">&#xe625;</i>删除页面
				</h5>
			</div>
		</div>
		<div class="tool03" v-else-if="tooltipType == '03'">
			<div class="inner">
				<label @click.prevent="guanHandle">
					<input type="checkbox" :checked="tooltipOption.isguan == '1'">
					<span>是否可管理</span>
				</label>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			bannerText: [],
			newText: [],
			productText: [],
			teamText: [],
			recruitText: [],
			atlasText: [],
			contactText: []
		}
	},
	computed: {
		...mapState({
  		pageIndex: state => state.pageIndex,
  		pageToggle: state => state.pageToggle,
  		columnList1: state => state.threeStep.columnList,
  		columnList2: state => state.threeStep.columnList2,
  		siteId: state => state.threeStep.siteId,
  		tooltipType: state => state.tooltipType,
			tooltipIndex: state => state.tooltipIndex,
			tooltipOption: state => state.tooltipOption,
			tooltipToggle: state => state.tooltipToggle,
			tooltipTop: state => state.tooltipTop
		})
	},
	methods: {
		guanHandle() {
			if(this.columnList2[this.pageIndex].sonColumn[this.tooltipIndex].isguan == 0) {
				this.columnList2[this.pageIndex].sonColumn[this.tooltipIndex].isguan = 1
			}else {
				this.columnList2[this.pageIndex].sonColumn[this.tooltipIndex].isguan = 0
			}
  		this.$axios({
  			method: 'post',
  			url: '/api/Senior/savelanmu',
  			data: {
  				isguan: this.tooltipOption.isguan,
  				pagetype: this.tooltipOption.pageType,
  				lmname: this.tooltipOption.name,
  				lmid: this.tooltipOption.pid
  			}
  		}).then((res)=> {
  			if(res.data.code == '200') {
  				this.$axios({
  					method: 'post',
  					url: '/api/Ctstation/savecolumnList',
  					data: {
  						columnList: this.columnList2,
  						site_id: this.siteId
  					}
  				}).then((res)=> {
  					if(res.data.code == '404') {
  						alert(res.data.msg)
  					}
  				})
  			}else {
  				alert(res.data.msg)
  			}
  		})
		},
		delpage() {
			this.$confirm('此操作将删除该页面，是否继续？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(()=> {
				this.bannerText = []
				this.productText = []
				this.newText = []
				this.teamText = []
				this.recruitText = []
				this.atlasText = []
				this.contactText = []
	      let obj = {}
	      for(let i=0; i<this.columnList2[this.tooltipIndex].sonColumn.length; i++) {
	      	if(this.columnList2[this.tooltipIndex].sonColumn[i].type == 'banner') {
	      		obj = {
	      			lmid: this.columnList2[this.tooltipIndex].sonColumn[i].pid
	      		}
	      		this.bannerText.push(obj)
	      	}else if(this.columnList2[this.tooltipIndex].sonColumn[i].type == 'product') {
	      		obj = {
	      			lmid: this.columnList2[this.tooltipIndex].sonColumn[i].pid
	      		}
	      		this.productText.push(obj)
	      	}else if(this.columnList2[this.tooltipIndex].sonColumn[i].type == 'new') {
	      		obj = {
	      			lmid: this.columnList2[this.tooltipIndex].sonColumn[i].pid
	      		}
	      		this.newText.push(obj)
	      	}else if(this.columnList2[this.tooltipIndex].sonColumn[i].type == 'team') {
	      		obj = {
	      			lmid: this.columnList2[this.tooltipIndex].sonColumn[i].pid
	      		}
	      		this.teamText.push(obj)
	      	}else if(this.columnList2[this.tooltipIndex].sonColumn[i].type == 'recruit') {
	      		obj = {
	      			lmid: this.columnList2[this.tooltipIndex].sonColumn[i].pid
	      		}
	      		this.recruitText.push(obj)
	      	}else if(this.columnList2[this.tooltipIndex].sonColumn[i].type == 'atlas') {
	      		obj = {
	      			lmid: this.columnList2[this.tooltipIndex].sonColumn[i].pid
	      		}
	      		this.atlasText.push(obj)
	      	}else if(this.columnList2[this.tooltipIndex].sonColumn[i].type == 'contact') {
	      		obj = {
	      			lmid: this.columnList2[this.tooltipIndex].sonColumn[i].pid
	      		}
	      		this.contactText.push(obj)
	      	}
	      }
	      this.$axios({
	      	method: 'post',
	      	url: '/api/Senior/delpage',
	      	data: {
	      		site_id: this.siteId,
	      		bannerText: this.bannerText,
	      		newText: this.newText,
	      		productText: this.productText,
	      		teamText: this.teamText,
	      		recruitText: this.recruitText,
	      		atlasText: this.atlasText
	      	}
	      }).then(()=> {
		        this.columnList2.splice(this.tooltipIndex, 1)
		        this.$store.commit('tooltiptoggleHandle', false)
		        if(this.tooltipIndex > 1) {
		        	this.$store.commit('pageIndexHandel', this.tooltipIndex-1)
		        }
	  				this.$axios({
	  					method: 'post',
	  					url: '/api/Ctstation/savecolumnList',
	  					data: {
	  						site_id: this.siteId,
	  						columnList: this.columnList2
	  					}
	  				}).then(()=> {
	  					this.$message({
		  					type: 'success',
		  					message: '删除成功！'
		  				})
	  				}).catch(()=> {
	  					this.$message({
		      			type: 'error',
		      			message: '删除失败！'
		      		})
	  				})
	      }).catch(()=> {
	      	this.$message({
      			type: 'error',
      			message: '删除失败！'
      		})
	      })
			})
		},
		regHandel(type, val) {
			if(type == '01') {
				if(this.pageToggle) {
					if(val.substr(0, 7).toLowerCase() != 'http://' && val.substr(0, 8).toLowerCase() != 'https://') {
		  			this.columnList1[this.tooltipIndex].link = 'http://' + val
		  		}
					this.$axios({
						method: 'post',
						url: '/api/Ctstation/savecolumnList',
						data: {
							site_id: this.siteId,
							columnList: this.columnList1
						}
					}).then((res)=> {
						if(res.data.code == '404') {
							alert(res.data.msg)
						}
					})
				}else {
					if(val.substr(0, 7).toLowerCase() != 'http://' && val.substr(0, 8).toLowerCase() != 'https://') {
		  			this.columnList2[this.tooltipIndex].link = 'http://' + val
		  		}
					this.$axios({
						method: 'post',
						url: '/api/Ctstation/savecolumnList',
						data: {
							site_id: this.siteId,
							columnList: this.columnList2
						}
					}).then((res)=> {
						if(res.data.code == '404') {
							alert(res.data.msg)
						}
					})
				}
			}else {
				this.$axios({
					method: 'post',
					url: '/api/Ctstation/savecolumnList',
					data: {
						site_id: this.siteId,
						columnList: this.columnList2
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}
		},
		openmodeHandle() {
			if(this.pageToggle) {
				if(this.columnList1[this.tooltipIndex].openmode == '_blank') {
					this.columnList1[this.tooltipIndex].openmode = '_self'
				}else {
					this.columnList1[this.tooltipIndex].openmode = '_blank'
				}
				this.$axios({
					method: 'post',
					url: '/api/Ctstation/savecolumnList',
					data: {
						site_id: this.siteId,
						columnList: this.columnList1
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}else {
				if(this.columnList2[this.tooltipIndex].openmode == '_blank') {
					this.columnList2[this.tooltipIndex].openmode = '_self'
				}else {
					this.columnList2[this.tooltipIndex].openmode = '_blank'
				}
				this.$axios({
					method: 'post',
					url: '/api/Ctstation/savecolumnList',
					data: {
						site_id: this.siteId,
						columnList: this.columnList2
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						alert(res.data.msg)
					}
				})
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
.tooltip-wrap
	position: fixed
	left: 227px
	top: 20px
	z-index: 1000000000
	background: #000
	border-radius: 5px
	&:before
		content: ''
		display: block
		position: absolute
		top: 4px
		left: 0
		border-top: 6px solid transparent
		border-bottom: 6px solid transparent
		border-right: 6px solid #000
		transform: translateX(-100%)
		
	.tool01
		padding: 0 10px
		.inner
			h4
				color: #fff
				font-size: 12px
				i
					margin-right: 5px
			.input
				display: block
				width: 180px
				height: 24px
				background: #2f2f2f
				border-radius: 5px
				border: 1px solid #555
				color: #fff
				text-indent: 10px
				font-size: 12px
				&:hover
					border-color: #fff
				&:focus
					border-color: #fff
			label
				position: relative
				margin: 0
				color: #fff
				font-size: 12px
				line-height: 28px
				&:after
					content: ''
					display: block
					background: rgba(255, 255, 255, 0)
					position: absolute
					left: 0
					top: 0
					width: 100%
					height: 100%
				input
					margin: 0
					vertical-align: middle
				span
					vertical-align: middle
					font-weight: normal
	.tool02
		padding-bottom: 5px
		.inner
			h4
				margin-bottom: 5px
				padding: 0 10px
				color: #fff
				font-size: 12px
				i
					margin-right: 5px
					font-size: 10px
			h5
				margin: 0
				padding: 0 10px
				color: #fff
				font-size: 12px
				cursor: pointer
				line-height: 24px
				transition: all .3s
				&:hover
					background: #555
				i
					margin-right: 5px
					font-size: 10px
			p
				margin-bottom: 5px
				padding: 0 10px
				input
					width: 180px
					height: 24px
					border-radius: 5px
					background: #2f2f2f
					border: 1px solid #555
					color: #fff
					font-size: 12px
					text-indent: 10px
					&:hover
						border-color: #fff
					&:focus
						border-color: #fff
	.tool03
		.inner
			padding: 10px
			label
				margin: 0
				position: relative
				color: #fff
				&:after
					position: absolute
					left: 0
					top: 0
					width: 100%
					height: 100%
					content: ''
					display: block
					background: rgba(255, 255, 255, 0)
</style>