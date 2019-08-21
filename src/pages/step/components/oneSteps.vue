<template>
	<div class="oneSteps">
		<div class="content">
			<div class="basic">
				<div class="basic-title">填写基本资料</div>
				<ul>
					<li class="company-name">
						<h6>公司名称:</h6>
						<div class="center">
							<el-input placeholder="北京XXXX信息技术有限公司" v-model="companyName" clearable></el-input>
						</div>
						<div class="warning required"><span>请填写公司全称，个人请任意填写</span></div>
					</li>
					<li class="region">
						<h6>所属地域:</h6>
						<div class="center">

							<div class="prowrap">


							  <!-- <el-select v-model="province" multiple placeholder="请选择">
							    <el-option
							      v-for="(item, index) in provinceList"
							      :key="index"
							      :label="item.areaName"
							      :value="item.areaName">
							    </el-option>
							  </el-select>

							  <el-select
							    v-model="city"
							    multiple
							    collapse-tags
							    style="margin-left: 20px;"
							    placeholder="请选择">
							    <el-option
							      v-for="(item, index) in cityList"
							      :key="index"
							      :label="item.areaName"
							      :value="item.areaName">
							    </el-option>
							  </el-select>

							  <el-select
							    v-model="county"
							    multiple
							    collapse-tags
							    style="margin-left: 20px;"
							    placeholder="请选择">
							    <el-option
							      v-for="(item, index) in countyList"
							      :key="index"
							      :label="item.areaName"
							      :value="item.areaName">
							    </el-option>
							  </el-select> -->

								<select v-model="province">
									<option v-for="(item, index) in provinceList">{{item.areaName}}</option>
								</select>
								<select v-model="city">
									<option v-for="item in cityList">{{item.areaName}}</option>
								</select>
								<select v-model="county">
									<option v-for="item in countyList">{{item.areaName}}</option>
								</select>

							</div>

<!-- 							<v-distpicker 
									:province="province" 
									:city="city" 
									hide-area 
									@province="onChangeProvince"
									@city="onChangeCity"
							></v-distpicker> -->
							<!-- <label class="marLeft">
								<input type="radio" name="city" id="name1" @click="classify">细分城市
							</label>
							<label>
								<input type="radio" name="city" id="name2" @click="classify2">全国市场
							</label> -->
						</div>
						<div class="warning required"><span>选择业务主营市场</span></div>
					</li>
					<li class="industry">
						<h6>所属行业:</h6>
						<div class="center">
						  <el-select v-model="selected" placeholder="请选择" @change="getVal('01', selected)">
						    <el-option
						      v-for="item in hangye"
						      :key="item.id"
						      :label="item.name"
						      :value="item.name"
						     >
						      <span style="float: left">{{ item.name }}</span>
						    </el-option>
						  </el-select>
							<!-- <select v-model="selected" @change="getVal('01', selected)">
								<option v-for="item in hangye">{{ item.name }}</option>
							</select> -->
							<!-- <select v-model="selected2" @change="getVal('02', selected2)">
								<option v-for="item in hangye[hangyeIndex].son">{{ item.name }}</option>
							</select> -->
						</div>
						<div class="warning required"><span>选择公司所属行业</span></div>
					</li>
					<li class="website-name">
						<h6>网站名称:</h6>
						<div class="center">
							<!-- <input type="text" placeholder="魔码云" v-model="siteName"> -->
							<el-input placeholder="魔码云" v-model="siteName" clearable></el-input>
						</div>
						<div class="warning"><span>请填入网站名称，名称将显示在网站标题处</span></div>
					</li>
					<li class="contact last-child">
						<h6>联系方式:</h6>
						<div class="center">
							<div class="centerAdd-list">
								<div class="centerAdd-list-left">
								  <el-input 
								  	placeholder="请输入..." 
								  	v-model="address"
								  >
								    <template slot="prepend">地址:</template>
								  </el-input>
									<!-- <span>地址：</span>
									<input 
										type="text" 
										v-model="address"
										name="address"
										maxlength="50" 
										:class="{ isErrors: errorsToggle5 }"
										@focus="focusToggle4 = true"
										@blur="focusToggle4 = false"
										:input="getAddress(address)"
									> -->
								</div>
							</div>
							<div class="centerAdd-list">
								<div class="centerAdd-list-left">
									<el-input 
								  	placeholder="请输入..." 
								  	v-model="telephone"
								  	maxlength="11"
								  	show-word-limit
								  >
								    <template slot="prepend">电话:</template>
								  </el-input>

									<!-- <span>电话：</span>
									<input 
										type="text" 
										v-model="telephone"
										maxlength="11" 
										name="telephone"
										@focus="focusToggle = true"
										@blur="focusToggle = false"
										:class="{ isErrors: errorsToggle1 }"
										:input="getPhone(telephone)"
									> -->
								</div>
							</div>
							<div class="centerAdd-list">
								<div class="centerAdd-list-left">
									<el-input 
								  	placeholder="请输入..." 
								  	v-model="email"
								  >
								    <template slot="prepend">邮箱:</template>
								  </el-input>
									<!-- <span>邮箱：</span>
									<input 
										type="text" 
										v-model="email" 
										maxlength="35" 
										:class="{ isErrors: errorsToggle2 }"
										name="email"
										@focus="focusToggle1 = true"
										@blur="focusToggle1 = false"
										:input="getEmail(email)"
									> -->
								</div>
							</div>
							<div class="centerAdd-list">
								<div class="centerAdd-list-left">
									<el-button @click="wechatHandel" v-if="wechatbtnToggle" type="primary" size="medium" plain>上传微信二维码</el-button>
									<font v-if="!wechatbtnToggle">上传成功</font>
									<el-button @click="wechatHandel" v-if="!wechatbtnToggle" type="primary" size="medium" plain>重新上传</el-button>
								</div>
							</div>
						</div>
						<div class="warning">
								<div class="centerAdd-list-right">请填写主要联系方式，可增加多项联系方式</div>
						</div>
					</li>
				</ul>
			</div>
			<div class="key-word">
				<div class="title">关键词搜索</div>
				<ul>
					<li>
						<h6>优化标题:</h6>
						<div class="center">
							<!-- <input type="text" v-model="seoTitle" :input="getSeotitle(seoTitle)"> -->
							<el-input v-model="seoTitle" :input="getSeotitle(seoTitle)" clearable></el-input>
						</div>
						<div class="warning"></div>
					</li>
					<li>
						<h6>关键词:</h6>
						<div class="center">
							<!-- <input type="text" v-model="keywords" :input="getKeywords(keywords)"> -->
							<el-input v-model="keywords" :input="getKeywords(keywords)" clearable></el-input>
						</div>
						<div class="warning"></div>
					</li>
					<li>
						<h6>站点描述:</h6>
						<div class="center">
							<!-- <input type="text" v-model="description" :input="getDescription(description)"> -->
							<el-input v-model="description" :input="getDescription(description)" clearable></el-input>
						</div>
						<div class="warning"></div>
					</li>
				</ul>
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
import { mapState } from 'vuex'
import imgLayer from '@/common/Imglayer'
import VDistpicker from 'v-distpicker'
export default {
	components: {
		VDistpicker,
		imgLayer
	},
	data() {
			return {
				province: '北京市',
				provinceId: '1',
				provinceList: [],
				provinceCode: '110',
				city: '北京城区',
				cityId: '2',
				cityList: [],
				cityCode: '',
				county: '东城区',
				countyId: '3',
				countyList: [],
				hideit: false,
				wechatbtnToggle: true,
				imgList: [],
				imgReplaceToggle: false,
				postImg: '',
				widthNum: '',
				heightNum: '',
				selected: '',
				// selected2: '',
				hangyeIndex: 0,
				seoTitle: '',
				keywords: '',
				description: '',
				companyName: '',
				siteName: '',
				address: '',
				telephone: '',
				email: '',
				penguin: '',
				wechat: '',
				errorsToggle1: false,
				errorsToggle2: false,
				errorsToggle3: false,
				errorsToggle4: false,
				errorsToggle5: false,
				focusToggle: false,
				focusToggle1: false,
				focusToggle2: false,
				focusToggle3: false,
				focusToggle4: false
			}
	},
	mounted() {
		this.getareaInfo()
		this.getHangye()
	},
	computed: {
		...mapState({
			hangye: state => state.industry.hangye,
			hyid: state => state.threeStep.yhid,
			wechatUrl: state => state.threeStep.wechatUrl,
			areaList: state => state.provinces.areaList,
			headText: state => state.stepPages.head
		})
	},
	watch: {
		province(val) {
			this.cityList = []
			this.countyList = []
			for(let i=0; i<this.areaList.length; i++) {
				if(this.areaList[i].areaName == val) {
					this.provinceId = this.areaList[i].areaId
					this.provinceCode = this.areaList[i].areaCode.substring(0,3)
					this.$store.state.threeStep.provinceId = this.areaList[i].areaId +","+ val
				}
			}
			for(let i=0; i<this.areaList.length; i++) {
				if(this.areaList[i].areaCode.substring(0,3) == this.provinceCode && this.areaList[i].level == '2') {
					this.cityList.push(this.areaList[i])
				}
			}
			this.city = this.cityList[0].areaName
		},
		city(val) {
			this.countyList = []
			for(let i=0; i<this.cityList.length; i++) {
				if(this.cityList[i].areaName == val) {
					this.cityId = this.cityList[i].areaId
					this.$store.state.threeStep.cityId = this.cityList[i].areaId +","+ val
					this.cityCode = this.cityList[i].cityCode
				}
			}
			for(let i=0; i<this.areaList.length; i++) {
				if(this.areaList[i].cityCode == this.cityCode && this.areaList[i].level == '3') {
					this.countyList.push(this.areaList[i])
				}
			}
			this.county = this.countyList[0].areaName
		},
		county(val) {
			for(let i=0; i<this.countyList.length; i++) {
				if(this.countyList[i].areaName == val) {
					this.countyId = this.countyList[i].areaId
					this.$store.state.threeStep.countyId = this.countyList[i].areaId +","+ val
				}
			}
		},
		companyName(val) {
			this.$store.state.threeStep.companyName = val
		},
		siteName(val) {
			this.$store.state.threeStep.siteName = val
			for(let i=0; i<this.headText.length; i++) {
				this.headText[i].wsname = val
			}
		},
		address(val) {
			this.$store.state.threeStep.address = val
		},
		telephone(val) {
			this.$store.state.threeStep.telephone = val
		},
		email(val) {
			this.$store.state.threeStep.email = val
		},
		penguin(val) {
			this.$store.state.threeStep.penguin = val
		},
		wechat(val) {
			this.$store.state.threeStep.wechat = val
		}
	},
	methods: {
		getareaInfo() {
			this.$axios({
				method: 'get',
				url: '/home/Content/mmyarea'
				// url: '/api/arealist.json'
			}).then((res)=> {
				if(res.data.code == '200') {
					this.$store.commit('getArea', res.data.data)
					for(let i=0; i<res.data.data.length; i++) {
						if(res.data.data[i].level == '1') {
							this.provinceList.push(res.data.data[i])
						}
						if(res.data.data[i].areaCode.substring(0,3) == this.provinceCode && res.data.data[i].level == '2') {
							this.cityList.push(res.data.data[i])
						}
						if(res.data.data[i].areaCode.substring(0,3) == this.provinceCode && res.data.data[i].level == '3') {
							this.countyList.push(res.data.data[i])
						}
					}
				}else {
					alert(res.data.msg)
				}
			})
		},
		getImg(val) {
			this.imgList = []
			let obj = {
				url: val
			}
			this.imgList.push(obj)

			this.$axios({
				method: 'post',
				url: '/api/upload/imgsUpload',
				data: this.imgList
			}).then((res)=> {
				if(res.data.code == '200') {
					this.$store.state.threeStep.wechatUrl = res.data.data[0].url
					this.wechatbtnToggle = false
				}else {
					alert(res.data.msg)
				}
			})
		},
		onoff(val) {
			this.imgReplaceToggle = false
		},
		wechatHandel() {
			this.imgReplaceToggle = true
		},
		getHangye() {
			this.$axios({
				method: 'get',
				url: '/api/Ctstation/hangye'
			}).then((res)=> {
				if(res.data.code == '200') {
					// console.log(res.data.data)
					this.$store.commit('hangyeHandel', res.data.data)
					this.selected = res.data.data[0].name
				}
			})
		},
		getVal(type, val) {
			for(let i=0; i<this.hangye.length; i++) {
				if(this.hangye[i].name == val) {
					this.$store.state.threeStep.yhid = this.hangye[i].id
				}
			}
			if(type == '01') {
				this.$store.state.threeStep.companyType = val
				for(let i=0; i<this.hangye.length; i++) {
					if(this.hangye[i].name == val) {
						this.hangyeIndex = i
						// this.selected2 = this.hangye[i].son[0].name
					}
				}
			}else {
				this.$store.state.threeStep.companyType2 = val
			}
		},
		getDescription(val) {
			this.$store.state.threeStep.description = val
		},
		getKeywords(val) {
			this.$store.state.threeStep.keywords = val
		},
		getSeotitle(val) {
			this.$store.state.threeStep.seoTitle = val
		},
		getAddress(val) {
			if(this.focusToggle4) {
				let reg = /([^\x00-\xff]|[A-Za-z0-9_])+/
				if(!reg.test(val)) {
					this.errorsToggle5 = true
				}else {
					this.errorsToggle5 = false
				}
			}
		},
		getWechat(val) {
			if(this.focusToggle3) {
				let reg = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/
				if(!reg.test(val)) {
					this.errorsToggle4 = true
				}else {
					this.errorsToggle4 = false
				}
			}
		},
		getPenguin(val) {
			if(this.focusToggle2) {
				let reg = /^[1-9][0-9]{4,10}$/gim
				if(!reg.test(val)) {
					this.errorsToggle3 = true
				}else {
					this.errorsToggle3 = false
				}
			}
		},
		getEmail(val) {
			if(this.focusToggle1) {
				let reg =  /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{3,6})+$/
				if(!reg.test(val)) {
					this.errorsToggle2 = true
				}else {
					this.errorsToggle2 = false
				}
			}
		},
		getPhone(val) {
			if(this.focusToggle) {
				// let reg = /^((13|14|15|17|18)[0-9]{1}\d{8})$/
				let reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/
				if(!reg.test(val)) {
					this.errorsToggle1 = true
				}else {
					this.errorsToggle1 = false
				}
			}
		},
		classify() {
			this.$store.state.threeStep.classifyName = "2" 
		},
		classify2() {
			this.$store.state.threeStep.classifyName = "1" 
		},
		onChangeProvince(val) {
				this.$store.state.threeStep.province = val.value
		},
		onChangeCity(val) {
				this.$store.state.threeStep.city = val.value
		},
		nextStep() {
			this.$store.state.stepIndex = 1
		}
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.oneSteps
	// padding: 20px 40px
	box-sizing: border-box
	min-height: 650px
	>>> .el-input__inner
		border-color: #dcdfe6
	.content
		background: #fff
		min-height: 600px
		box-sizing: border-box
		.key-word
			margin-top: 20px
			padding-bottom: 15px
			.title
				text-align: center
				font-size: 18px
				font-weight: bold
				line-height: 40px
			ul
				li
					display: flex
					justify-content: center
					margin-bottom 10px
					h6
						margin: 0
						padding-right: 13px
						min-width: 93px
						line-height: 44px
						font-size: 14px
						font-weight: bold
						text-align: left
					.center
						width: 431px
						input
							width: 100%
							height: 32px
							border: 1px solid #d2d2d2
					.warning
						min-width: 320px
		.basic
			.basic-title
				text-align: center
				font-size: 18px
				font-weight: bold
				line-height: 50px
			ul
				.industry
					select
						width: 100%
						border: 1px solid #d2d2d2 !important
						// box-shadow: 0 0 5px #ccc inset
				li
					display: flex
					justify-content: center 
					margin-bottom 10px
					h6
						margin: 0
						min-width: 93px
						text-align: left
						font-size: 14px
						font-weight: bold
						line-height: 40px
					.center
						min-width: 431px
						vertical-align: middle
						.centerAdd-list
							margin-bottom: 13px
							&:last-child
								border: none
								.centerAdd-list-left
									border: none
						.prowrap
							position: relative
							width: 100%
							select
								border: 1px solid #dcdfe6
								float: left
								width: 33.333%
								height: 40px
								line-height: 40px
								text-indent 10px
								&:first-child
									border-radius 4px 0 0 4px
								&:last-child
									border-radius 0 4px 4px 0
						.distpicker-address-wrapper
							float: left
							>>> select
								padding: 0
								height: 28px
						input[type=text]
							height: 32px
							width: 100%
							border: 1px solid #d2d2d2
							line-height: 32px
							font-size: 14px
							text-indent: 14px
						select
							height: 32px
							border: none
						.marLeft
							margin-left: 15px
						label
							margin-right: 15px
							input
								margin-right: 5px
						.isErrors
							border: 1px solid red
						.centerAdd-list-left
							line-height: 28px
							>>> .el-input 
								input
									border-color #DCDFE6
							&:after
								content: ''
								display: block
								clear: both
							span
								float: left
								display: inline-block
								width: 50px
								text-align: right
								line-height: 32px
							input
								float: right
								width: 375px
								border: none 
								text-indent: 0
								border-bottom: 1px solid #fff
							.isErrors
								border-bottom: 1px solid red
							font
								background: #666
								border-radius: 15px
								padding: 5px 10px
								color: #fff
								line-height: 26px
					.warning
						min-width: 320px
						line-height: 40px
						span
							margin-left: 40px
						i
							padding: 15px 5px 0
							color: red
							font-size: 18px
					.required
						&:before
							// margin: 8px 10px 0 20px
							// clear: both
							// display: inline-block
							// content: '*'
							// text-align: left
							// color: red
							font-size: 24px
							font-weight: bold
							vertical-align: middle
					&:last-child
						margin-top: 7px
				.website-name
					.warning
						span
							margin-left: 40px
				.last-child
					h6
						border-bottom: none
					.center
						border-bottom: none
					.warning
						line-height: 36px
						.centerAdd-list-right
							margin-left: 40px
							
							

</style>