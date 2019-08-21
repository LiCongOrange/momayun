<template>
<div>
	<div class="release">
		<!-- <div class="title">
			<h2>发布工单</h2>
			<i class="iconfont" @click="releaseHandleclick">&#xe6e9;</i>
		</div> -->
		<ul class="">
			<li>
				<div class="typetitle">工单类型</div>
				<div class="typelist">
					<label 
						v-for="(item,index) in typelist" 
						@click="getdata(item,index)" 
						class="typelist_box" for="item.id" 
						:class="{check:item.check}"
					> 
						<input type="radio" name="typelist" :id="item.id">{{ item.name }}
					</label>
					<!-- <input type="button" name="" @click='getdata()' v-for="item in typelist" > -->
				</div>
			</li>
			<li>
				<div class="typetitle">工单标题</div>
				<div class="typelist">
					<input type="text" name="" v-model="title" class="b_title">
				</div>
			</li>
			<li>
				<div class="typetitle">工单信息</div>
				<div class="typelist">
					<textarea v-model="information" class="b_content"></textarea>
					<!-- <input type="text" name="" v-model="title"> -->
				</div>
			</li>
			<li>
				<div class="typetitle">
					<!-- <img id="image" :src="this.files[this.files.length-1].src"> -->
					<label>
						<input type="file" ref="file" :disabled="disabledToggle" @change='add_img' id="file" >
					</label>
					<label for="file" class="forinput" :disabled="disabledToggle">上传附件</label>
					<p>最多上传5张，仅支持上传png、jpg、gif、jpeg格式的图片</p>
					<!-- <input type="text" v-for="item in files" :value="item.name" class="imgsrc"> -->
				</div>	
				<div class="imglist-wrap">
					<div class="imglist-li" v-for="(item, index) in files">
						<img :src="item.src">
						<div class="imglist-li-mask">
							<h4>{{ item.name }}</h4>
							<span class="iconfont" @click="deleteimg(index)">&#xe625;</span>
						</div>
					</div>
				</div>
			</li>
			<li>
				<div class="typelist">
				<button @click="releaseClick">发布</button>
			</div> 
			</li>
		</ul>
	</div>
</div>
</template>

<script>
export default {
	data() {
		return { 
			disabledToggle: false,
			category: '财务类问题',
			title: '',
			information: '',
			typelist:[{
				name:'财务类问题',
				id:'1',
				check:true
			}, {
				name:'售前类问题',
				id:'2',
				check:false
			}, { 
				name:'售后类问题',
				id:'3',
				check:false
			}],
			file:'',
			files:[],
      imgData: {
          accept: 'image/gif, image/jpeg, image/png, image/jpg',
      },
      imglist:[],
      imgUrl:[]

		}
	},
	watch: {
		files(data) {
			if(data.length >= 5) {
				this.disabledToggle = true
			}else {
				this.disabledToggle = false
			}
		}
	},
	methods: {
		releaseHandleclick() {
			this.$emit('releaseHandle', '1')
		},
		deleteimg(index) {
			this.files.splice(index, 1)
		},
		releaseClick() {
			this.$store.state.workNum=1

			if(this.title && this.information) {
		    if(this.files==''){
		    	this.$axios({
						method: 'post',
						url: '/home/Content/repair',
						data: {
								title:this.title,
								type:this.category,
								desc:this.information,
								imgurl:''
							},
						transformRequest: [function(data) { 
							return JSON.stringify(data)
						}],
						headers: {
							'Content-Type': 'application/json;charset=UTF-8'
						}, 
					}).then(() => {
						this.$message({
							type: 'success',
							message: '发布成功！'
						})
						this.$emit('releaseHandle', '1')
					}).catch(()=> {
						this.$message({
							type: 'error',
							message: '发布失败！'
						})
					})
		    }else{
					for(var n=0;n<this.files.length;n++){
						let obj = {
							url: this.files[n].src
						}
						this.imglist.push(obj)
					}

		    	this.$axios({
						method: 'post',
						url: '/api/upload/imgsUpload',
						data: this.imglist,
					 
					}).then((res) => {
						if(res.data.code == '200') {
							this.imgurl=res.data.data
							this.$axios({
								method: 'post',
								url: '/home/Content/repair',
								data: {
										title:this.title,
										type:this.category,
										desc:this.information,
										imgurl:this.imgurl
									},
								transformRequest: [function(data) { 
									return JSON.stringify(data)
								}],
								headers: {
									'Content-Type': 'application/json;charset=UTF-8'
								}, 
							}).then(() => {
								this.$message({
									type: 'success',
									message: '发布成功！'
								})
								this.$emit('releaseHandle', '1')
							}).catch(()=> {
								this.$message({
									type: 'error',
									message: '发布失败！'
								})
							})
						}
						if(res.data.code == '404') {
							alert(res.data.msg)
						}
					})
		    }
			}else {
				this.$message({
					type: 'error',
					message: '标题和描述不能为空！'
				})
			}


    
		},
		getSelect(event) {
			this.category = event.target.value
		},
		getdata(item,index){
			// console.log(item.name)
			this.category =item.name
			for(var i=0;i<this.typelist.length;i++){
				this.typelist[i].check=false
			}
			this.typelist[index].check=true
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
						// this.imglist.push(list[i])
						this.html5Reader(list[i], item)
						this.files.push(item)
						// this.files.splice(0,1)
						
					}
				}else {
					alert("文件格式不支持上传")
				}
			}	
		
		}
	},
	mounted() {
		this.$store.state.navigation1 = '个人中心'
		this.$store.state.navigation2 = '发布工单'
	}
}
</script>
<style lang="stylus" scoped>
@import '~styles/public'
.release
	// box-shadow: 0 1px 15px #ccc
	// position: fixed
	// left: 50%
	// top: 50%
	// transform: translate(-50%, -50%)
	z-index: 15000
	max-height: 100%
	overflow: auto
	.title
		height: 66px
		line-height: 66px
		background: #fff
		position: relative
		h2
			margin: 0
			line-height: 66px
			text-align: center
		i
			position: absolute
			top: 10px
			right: 10px
			font-size: 26px
			line-height: normal
			cursor: pointer
	ul
		margin-bottom: 0
		// padding: 30px 24px 20px
		background: #fff
		text-align:center
		li
			margin-top: 25px
			overflow: hidden
			text-align:center
			&:first-child
				margin-top: 0
			&:nth-of-type(4)
				.typetitle
					border: none !important
			&:last-child
				.typelist
					margin-top: 0
			div
				text-align:left
				line-height:30px
			.imglist-wrap
				margin: 10px auto
				display: flex
				.imglist-li
					margin: 0 5px
					width: 50%
					position: relative
					text-align: center
					flex: 1
					&:hover
						.imglist-li-mask
							opacity: 1
					img
						width: auto
						max-height: 200px
						max-width: 250px
					.imglist-li-mask
						position: absolute
						left: 0
						top: 0
						width: 100%
						height: 100%
						background: rgba(0, 0, 0, .5)
						opacity: 0
						transition: all .3s
						display: flex
						justify-content: center
						align-items: center
						span
							position: absolute
							right: 10px
							top: 5px
							font-size: 18px
							cursor: pointer
							color: #fff
						h4
							color: #fff
							font-size: 16px
			.typetitle
				border-left: 2px solid #f29b76
				padding-left: 15px
				text-align:left
				line-height: 18px
				font-size:16px
				label
					width: 75px
					display: block
					overflow: hidden
					// border: 1px solid #ccc
					font-size: 14px
					line-height: 22px
					input
						border: none
						text-indent: 0
						vertical-align: middle
				.imglist
					display:block
					min-width:100px
					line-height:30px
					border-radius:5px
					border:1px solid #bfbfbf
					text-indent:8px
					padding:0 10px
				.forinput
					display: none
					width: 100px
					line-height:25px
					border: 1px solid #bfbfbf
					text-align: center
					font-size: 14px
					cursor: pointer
					transition: all .3s
					&:hover
						background: #f1f2f1
				#file
					// display:none
			.typelist
				margin-top: 17px
				padding-left: 15px
				text-align: left
				.typelist_box
					display: inline-block
					border: 1px solid #bfbfbf
					padding: 5px 10px
					margin-right: 20px
					cursor: pointer
					border-radius:5px
					transition: all .3s
					&:hover
						border: 1px solid $bgColor
				.check
					border: 1px solid $bgColor
					background: $bgColor
					color: #fff
				.b_title
					display:inline-block
					width:500px
					border:1px solid #ccc
					outline:none
					border-radius: 3px
					padding:5px 10px
					&:focus
						border-color: $bgColor
				.b_content
					border: 1px solid #ccc
					border-radius: 3px
					display:inline-block
					width:500px
					min-height:180px
					outline:none
					text-indent:8px
					&:focus
						border-color: $bgColor
				input
					width:500px
					background:white
					outline:none
					border:1px solid #bfbfbf
					padding:5px 10px
					display:inline-block
					height:auto
					border-radius:5px
					display:none
			h6
				float: left
				margin: 0
				width: 100px
				text-align: right
				line-height: 24px
				font-size: 14px
				color: $fontColor
			select
				float: left
				height: 26px
				width: 180px
				line-height: 26px
			input
				 text-indent: 8px
			button
				border: 1px solid $bgColor
				border-radius: 3px
				padding: 5px 15px
				color:$bgColor
				display:inline-block
				width:200px
				height:40px
				display:block
				background:none
				&:hover
					background: $bgColor
					color: #fff
</style>