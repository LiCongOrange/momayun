<template>
	<div class="navWrapper">
	  	<div 
	  		class="iconfont nav-open" 
	  		:class="{ openActive : this.$store.state.isNavToggle }"
	  		@click="navToggleOpen"
	  	>&#xe6df;</div>
	  <div 
	  	class="nav" 
	  	ref="nav" 
	  	:class="{ active : this.$store.state.isNavToggle, scaleclass: this.scrollregionToggle }"
	  >
		  	
			<div class="nav-main">

				<div class="title">
					<div class="title-h">智能建站</div>
					<div class="iconfont" @click="colseNav">&#xe625;</div>
					<p>网站编辑后，自动保存</p>
				</div>

				<div class="funcList">
					<!-- <p class="list-h">高级</p> -->
					<div class="seniorBtn">
						<a href="javascript:;" v-for="(item, index) in seniorList" @click="toFunc(item.id)" :key="item.id">
							<input type="type" name="">
							<i class="iconfont" :class="item.class" v-html="item.icon"></i>
							{{ item.name }}
						</a>
					</div>
				</div>

				<div class="scroll-region" @scroll="onscrollHandle">
				<div class="region-inner">
				<div class="controller">
					<div class="controllerView" v-if="controllerToggle">
						<div class="list" v-if="pageToggle">
							<div class="list-ul">
								<p class="list-h">版块</p>
								<draggable v-model="columnList[0]" :options="{animation: 300, handle: '.list-complete-item'}" @update="fnend">
									<transition-group name="list-complete" tag="ul">
										<li
											v-for="(ite, index) in columnList[0]"
											:key="index" 
											class="list-item"
											:class="tabClass"
											:data-index="index"
											@click="handleTextClick(index)"
											v-if="ite.type != 'outerchain'"
										>
											<div 
												class="move list-complete-item" 
												v-if="ite.plus" 
												@mousedown="moveHandle('01', index, ite.pid)"
												@mouseup="moveHandle('02', index)"
											>
												<input type="text" name="">
												<i class="iconfont">&#xe63e;</i>
											</div>
											<div class="textDiv" v-if="ite.plus">
												<div class="text" v-if="ite.editOnoff1">
													<a 
														:href=" '#'+index " 
														:class="{ checked : ite.checked }"
														@click="goAnchor(index)"
													>{{ ite.name }}</a>
													<div class="button" v-if="ite.checked">
														<!-- <el-tooltip
															class="item"
															effect="dark"
															content="删除？"
															placement="right"
														>
															<el-button round icon="el-icon-close" size="mini"></el-button>
														</el-tooltip> -->
														<i class="iconfont" title="删除" @click="deleteHandle('01', index, ite.pageType, ite.pid)">&#xe6e9;</i>
														<i class="iconfont" title="修改" @click="editHandle('01', index, ite.name)">&#xe6f5;</i>
													</div>
												</div>
												<div class="editInput" v-else>
													<input  
														type="text" 
														name="ite.name"
														v-model="ite.name" 
														@blur="onBlur('01', ite.name, ite.pid, ite.pageType)"
														autofocus="autofocus"
														:input="editName(ite.name, ite.pid, ite.pageType)"
													>
													<i class="iconfont" @click="onBlur('01', ite.name, ite.pid, ite.pageType)">&#xe721;</i>
												</div>
											</div>
										</li>
									</transition-group>
								</draggable>
								<div class="addModular">
									<span class="iconfont">&#xe6df;</span>
									<!-- <a href="javascript:;">添加新模块</a> -->
									<button @click="addHandelClick">添加新模块</button>
								</div>
							</div>
						</div>
						<div class="list" v-else>
							<div class="list-title">
								<h5>页面</h5>
								<p @click="controllerHandel('01')">
									<i class="iconfont">&#xe64c;</i>管理
								</p>
							</div>
							<div class="list-pages">
								<div class="pages-title" @click="pagesulHandel">
									<i class="iconfont">&#xe617;</i>
									<span v-text="pageName"></span>
									<i class="iconfont right">&#xe62f;</i>
								</div>
								<div class="pages-ul">
									<ul v-if="pagesulToggle">
										<li v-for="(item, index) in columnList2" v-if="item.plus" :key="item.id">
											<h5 :class="{ checked: item.checked }" @click="getHandel(index, item.name, $event)">{{item.name}}</h5>
										</li>
									</ul>
								</div>
							</div>
							<div class="list-ul">
								<p class="list-h">版块</p>
								<draggable v-model="columnList2[pageIndex].sonColumn" :options="{animation: 300, handle: '.list-complete-item'}" @update="fnend1">
									<transition-group name="list-complete" tag="ul">
										<li 
											v-for="(ite, index) in columnList2[pageIndex].sonColumn"
											class="list-item"
											:class="tabClass"
											:data-index="index"
											@click="handleTextClick(index)"
											:key="index"
										>
											<div 
												class="move list-complete-item" 
												v-if="ite.plus"
												@mousedown="moveHandle('01', index, ite.pid)"
												@mouseup="moveHandle('02', index)"
											>
												<input type="text" name="">
												<i class="iconfont">&#xe63e;</i>
											</div>
											<div class="textDiv" v-if="ite.plus">
												<div class="text" v-if="ite.editOnoff1">
													<a 
														:href=" '#'+index " 
														:class="{ checked : ite.checked }"
														@click="goAnchor(index)"
													>{{ ite.name }}</a>
													<div class="button" v-if="ite.checked">
														<i class="iconfont" title="删除" @click="deleteHandle('02', index, ite.pageType, ite.pid)">&#xe6e9;</i>
														<i class="iconfont" title="修改" @click="editHandle('02', index)">&#xe6f5;</i>
														<i class="iconfont" title="更多操作" v-if="pageIndex != '1'" @click="moreopretionHandel('01' ,index, ite.pid, $event)">&#xe672;</i>
														<!-- <div class="more-operation" v-if="ite.moreopretionToggle">
															<div class="more-operation-arrow"></div>
															<ul>
																<li>
																	<label @click.self="moreopretionHandel('02', index, ite.pid, ite.name, ite.pageType, ite.isguan)">
																		<input type="checkbox" :checked="ite.isguan">是否可管理
																	</label>
																</li>
															</ul>
														</div> -->
													</div>
												</div>
												<div class="editInput" v-else>
													<input  
														type="text" 
														v-model="ite.name" 
														v-focus   
														@blur="onBlur('02', ite.name, ite.pid, ite.pageType)"
														autofocus="autofocus"
													>
													<i class="iconfont" @click="onBlur('02', ite.name, ite.pid, ite.pageType)">&#xe721;</i>
												</div>
											</div>
										</li>
									</transition-group>
								</draggable>
								<div class="addModular">
									<span class="iconfont">&#xe6df;</span>
									<button @click="addHandelClick">添加新模块</button>
								</div>
							</div>
						</div>
					</div>
					<div class="controllerView" v-else>
						<div class="controllerView-title">
							<button @click="controllerHandel('02')" class="btn btn-default">
								<i class="iconfont">&#xe739;</i>返回
							</button>
						</div>
						<div class="controllerView-ul">
							<h5>页面</h5>
							<draggable v-model="columnList[1]" :options="{animation: 300, handle: '.list-complete-item'}" @update="fnend2">
								<transition-group name="list-complete" tag="ul">
									<li 
										:class="{ controllerActive: ite.checked }"
										v-for="(ite, index) in columnList[1]" 
										v-if="ite.plus"
										:key="index"
									>
										<div class="move list-complete-item"><i class="iconfont">&#xe63e;</i></div>
										<div class="text" @click="getHandel(index, ite.name, $event)">
											<a href="javascript:;" v-if="ite.inputOnoff">{{ ite.name }}</a>
	                    <input 
	                    	v-else 
	                    	type="text" 
	                    	v-model="ite.name"
	                    	v-focus
	                    	autofocus="autofocus" 
	                    	@blur="onBlur('03', ite.name, ite.id, ite.pageType)"
	                    >
										</div>
										<div class="setUp" >
											<i 
												v-if="ite.inputOnoff" 
												title="页面设置" 
												class="iconfont" 
												@click.prevent="setHandel(index, ite.operation, $event)"
											>&#xe64c;</i>
	                    <i 
	                    	v-else 
	                    	class="iconfont" 
	                    	@click="onBlur('03', ite.name, ite.id, ite.pageType)"
	                    >&#xe721;</i>
										</div>
										<!-- <div class="setList" v-if="ite.operation">
	                    <div class="arrow"></div>
											<div class="inner">
												<p class="iconfont" @click="pageHandel('01', index)">
	                        &#xe60c;<a href="javascript:;">重命名</a>
	                      </p>
												<p class="iconfont">&#xe6b0;<a href="javascript:;">更改网址</a></p>
												<p class="iconfont" @click="pageHandel('03', index, ite.id)">
	                        &#xe6e9;<a href="javascript:;">删除页面</a>
	                      </p>
											</div>
										</div> -->
									</li>
								</transition-group>
							</draggable>
							<p>
								<button @click="addPage" class="btn btn-default iconfont">&#xe6df;添加新页面</button>
							</p>
						</div>
					</div>
				</div>

				<div class="addlink">
					<div class="addlink-title">外部链接</div>
					<div class="addlink-ul">
						<draggable 
							v-model="columnList[0]" 
							:options="{animation: 300, handle: '.list-complete-item2'}" 
							v-if="pageToggle"
							@update="fnend"
						>
							<transition-group name="list-complete" tag="ul">
								<li v-for="(item, index) in columnList[0]" v-if="item.type == 'outerchain'" :key="index">
									<div class="move list-complete-item2">
										<input type="text">
										<i class="iconfont">&#xe63e;</i>
									</div>
									<div class="text-wrap">
										<a 
											href="javascript:;" 
											v-if="item.editOnoff" 
											@click="outerHandle('01', index, '000', $event)"
										>{{ item.name }}</a>
										<input type="text" v-model="item.name" @blur="outerHandle('02', index)" v-else>
									</div>
									<div class="set-up" v-if="!item.editOnoff">
										<i class="iconfont" @click="deleteHandle('03', index, item.type, item.id, item.name)" title="删除">&#xe6e9;</i>
										<i class="iconfont" @click.stop="outerHandle('03', index, '000', $event)">&#xe64c;</i>
									</div>
									<!-- <div class="set-list" v-if="item.operation">
										<div class="arrow"></div>
										<div class="inner">
											<h4><i class="iconfont">&#xe6b0;</i>链接地址</h4>
											<input type="text" v-model="item.link" @input="outerHandle('04', index, item.link)">
											<label @click.prevent="outerHandle('05', index, item.openmode)">
												<input type="checkbox" :checked="item.openmode != '_self'">
												<span>在新标签页中打开</span>
											</label>
										</div>
									</div> -->
								</li>
							</transition-group>
						</draggable>

						<draggable 
							v-model="columnList[1]" 
							:options="{animation: 300, handle: '.list-complete-item2'}" 
							v-else
							@update="fnend2"
						>
							<transition-group name="list-complete" tag="ul">
								<li v-for="(item, index) in columnList[1]" v-if="item.type == 'outerchain'" :key="index">
									<div class="move list-complete-item2">
										<input type="text">
										<i class="iconfont">&#xe63e;</i>
									</div>
									<div class="text-wrap">
										<a 
											href="javascript:;" 
											v-if="item.editOnoff" 
											@click="outerHandle('01', index, '000', $event)"
										>{{ item.name }}</a>
										<input type="text" v-model="item.name" @blur="outerHandle('02', index)" v-else>
									</div>
									<div class="set-up" v-if="!item.editOnoff">
										<i class="iconfont" @click="deleteHandle('03', index, item.type, item.id, item.name)" title="删除">&#xe6e9;</i>
										<i class="iconfont" @click.stop="outerHandle('03', index, '000', $event)">&#xe64c;</i>
									</div>
									<div class="set-list" v-if="item.operation">
										<div class="arrow"></div>
										<div class="inner">
											<h4><i class="iconfont">&#xe6b0;</i>链接地址</h4>
											<input type="text" v-model="item.link" @input="outerHandle('04', index, item.link)">
											<label @click.prevent="outerHandle('05', index, item.openmode)">
												<input type="checkbox" :checked="item.openmode != '_self'">
												<span>在新标签页中打开</span>
											</label>
										</div>
									</div>
								</li>
							</transition-group>
						</draggable>

					</div>
					<div class="addlink-btn">
						<span class="iconfont">&#xe6df;</span>
						<button @click="addlinkHandle">添加新链接</button>
					</div>
				</div>
				</div>
				</div>

				<div class="head-tab">
					<p class="list-h">导航栏编辑</p>
					<ul>
						<li>
							<span>布局：</span>
							<select v-model="headlayout" @change="getval('01', headlayout)">
								<option>图文布局</option>
								<option>标题布局</option>
								<option>图片布局</option>
								<option>按钮布局</option>
								<option>三列布局</option>
							</select>
						</li>
						<li>
							<span>背景色：</span>
							<select v-model="headbg" @change="getval('02', headbg)">
								<option>无</option>
								<option>白色</option>
								<option>浅色</option>
								<option>深色</option>
								<option>绿色</option>
								<option>蓝色</option>
								<option>紫色</option>
								<option>黄色</option>
								<option>橙色</option>
							</select>
						</li>
						<li>
							<span>间距：</span>
							<select v-model="headspace" @change="getval('03', headspace)">
								<option>小</option>
								<option>中</option>
								<option>大</option>
							</select>
						</li>
						<li>
							<span>字号：</span>
							<select v-model="headfont" @change="getval('04', headfont)">
								<option>小</option>
								<option>中</option>
								<option>大</option>
							</select>
						</li>
						<li>
							<span>字色：</span>
							<select v-model="headfontcolor" @change="getval('05', headfontcolor)">
								<option>白色</option>
								<option>浅色</option>
								<option>深色</option>
								<option>绿色</option>
								<option>蓝色</option>
								<option>紫色</option>
								<option>黄色</option>
								<option>橙色</option>
							</select>
						</li>
						<li>
							<span>&nbsp</span>
							<button class="btn" @click="toimgHandel">上传背景图</button>
						</li>
					</ul>
				</div>

			<!-- 	<div class="phoneorpc">
					<div class="pps-t">
						<div class="tablist" :class="{defaultclass:mobilepcToggle}" @click="ppstabHandle">
							<i class="iconfont">&#xe62b;</i>
							<i class="iconfont">&#xe634;</i>
						</div>
						<div class="tab-description">
							<span>切换视图</span>
						</div>
					</div>
				</div> -->

			</div>
	  	<add-section></add-section>
	  </div>
	  <dialog-bar
	  	v-if="dialogToggle"
	  	:dialog-option="dialogOption"
	  	@confirmHandle="dialogHandel"
	  ></dialog-bar>
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
import AddSection from './AddSection'
import dialogBar from '@/common/Dialog'
import draggable from 'vuedraggable'
import imgLayer from '@/common/Imglayer'
import navBus from '@/assets/js/navBus.js'
export default {
  components: {
  	AddSection,
  	dialogBar,
  	draggable,
  	imgLayer
  },
  data () {
  	return {
  		movedownId: '',
  		scrollregionToggle: false,
  		imgList: [],
  		postImg: '',
  		imgReplaceToggle: false,
  		widthNum: '1920',
  		heightNum: '1080',
  		mobilepcToggle: false,
  		headModel: '',
  		headlayout: '',
  		headbg: '',
  		headspace: '',
  		headfont: '',
  		headfontcolor: '深色',
  		columnList: [],
  		modelName: '',
  		pageToggle2: true,
  		page2: false,
  		controllerToggle: true,
  		pagesulToggle: false,
  		isActive: false,
  		dblclick: false,
  		editOnoff: true,
  		type: 'A',
  		tabClass: '',
  		seniorList:  [{
				"id": "03",
				"name": "预览",
				"icon": "&#xe60b;"
			}, {
				"id": "04",
				"name": "保存",
				"icon": "&#xe608;"
			}, {
				"id": "05",
				"name": "退出",
				"icon": "&#xe616;"
			}],
			dialogToggle: false,
			dialogOption: {
				content: '删除后无法恢复！',
				type: 1
			},
			delOption: {},
			delList: [],
			bannerText: [],
			newText: [],
			productText: [],
			teamText: [],
			recruitText: [],
			atlasText: [],
			contactText: []
  	}
  },
  watch: {
  	columnList1(val) {
  		this.columnList = []
  		this.columnList.push(val)
  		this.columnList.push(this.columnList2)
  	},
  	columnList2(val) {
  		this.columnList = []
  		this.columnList.push(this.columnList1)
  		this.columnList.push(val)
  	}
  },
  mounted () {
  	this.columnList.push(this.columnList1)
  	this.columnList.push(this.columnList2)
  	for(let i=0; i<this.columnList2.length; i++) {
      this.$store.state.threeStep.columnList2[i].operation = false
  	}
  	this.postImg = this.headText[0].bgImg
  	this.$dragging.$on('dragged', ({value}) => {
        // console.log(value.item)
        // console.log(value.list)
        // console.log(value.group)
  	})
  	if(this.pageToggle) {
  		if(this.columnList1[0].indexes == '0') {
  			this.headlayout = '图文布局'
  		}else if(this.columnList1[0].indexes == '1') {
  			this.headlayout = '标题布局'
  		}else if(this.columnList1[0].indexes == '2') {
  			this.headlayout = '图片布局'
  		}else if(this.columnList1[0].indexes == '3') {
  			this.headlayout = '按钮布局'
  		}else if(this.columnList1[0].indexes == '4') {
  			this.headlayout = '三列布局'
  		}
  	}else {
  		if(this.columnList2[0].indexes == '0') {
  			this.headlayout = '图文布局'
  		}else if(this.columnList2[0].indexes == '1') {
  			this.headlayout = '标题布局'
  		}else if(this.columnList2[0].indexes == '2') {
  			this.headlayout = '图片布局'
  		}else if(this.columnList2[0].indexes == '3') {
  			this.headlayout = '按钮布局'
  		}else if(this.columnList2[0].indexes == '4') {
  			this.headlayout = '三列布局'
  		}
  	}
  	if(this.headText[0].bgColor == '') {
  		this.headbg = '无'
  	}else if(this.headText[0].bgColor == 'white') {
  		this.headbg = '白色'
  	}else if(this.headText[0].bgColor == '#DEDEDE') {
  		this.headbg = '浅色'
  	}else if(this.headText[0].bgColor == '#161515') {
  		this.headbg = '深色'
  	}else if(this.headText[0].bgColor == '#00bB473') {
  		this.headbg = '绿色'
  	}else if(this.headText[0].bgColor == '#096EFA') {
  		this.headbg = '蓝色'
  	}else if(this.headText[0].bgColor == '#41289E') {
  		this.headbg = '紫色'
  	}else if(this.headText[0].bgColor == '#F0BE27') {
  		this.headbg = '黄色'
  	}else if(this.headText[0].bgColor == '#E46343') {
  		this.headbg = '橙色'
  	}else {
  		this.headbg = '白色'
  	}
  	if(this.headText[0].paddingNum == '0 7px') {
  		this.headspace = '小'
  	}else if(this.headText[0].paddingNum == '0 15px') {
  		this.headspace = '中'
  	}else if(this.headText[0].paddingNum == '0 25px') {
  		this.headspace = '大'
  	}
  	if(this.headText[0].fontSize == '12px') {
  		this.headfont = '小'
  	}else if(this.headText[0].fontSize == '15px') {
  		this.headfont = '中'
  	}else if(this.headText[0].fontSize == '20px') {
  		this.headfont = '大'
  	}else {
  		this.headfont = '中'
  	}
  	if(this.headText[0].fontColor == 'white') {
  		this.headfontcolor = '白色'
  	}else if(this.headText[0].fontColor == 'gray') {
  		this.headfontcolor = '浅色'
  	}else if(this.headText[0].fontColor == 'black') {
  		this.headfontcolor = '深色'
  	}else if(this.headText[0].fontColor == 'green') {
  		this.headfontcolor = '绿色'
  	}else if(this.headText[0].fontColor == 'blue') {
  		this.headfontcolor = '蓝色'
  	}else if(this.headText[0].fontColor == 'violet') {
  		this.headfontcolor = '紫色'
  	}else if(this.headText[0].fontColor == 'yellow') {
  		this.headfontcolor = '黄色'
  	}else if(this.headText[0].fontColor == 'orange') {
  		this.headfontcolor = '橙色'
  	}else {
  		this.headfontcolor = '深色'
  	}
  },
  updated() {
  	this.$nextTick(function() {
	  	if(!this.pageToggle) {
	  		for(let i=0; i<this.columnList2.length; i++) {
	  			if(this.columnList2[i].name == this.pageName) {
	  				this.columnList2[i].checked = true
	  				this.$store.state.pageIndex = i
	  			}
	  		}
	  	}
  	})
  },
  computed: {
  	...mapState({
  		addmodelToggle: state => state.addmodelToggle,
  		pageName: state => state.pageName,
  		pageIndex: state => state.pageIndex,
  		pageToggle: state => state.pageToggle,
  		columnList1: state => state.threeStep.columnList,
  		columnList2: state => state.threeStep.columnList2,
  		siteId: state => state.threeStep.siteId,
  		modelToggle: state => state.threeStep.modelToggle,
  		modelId: state => state.threeStep.modelId,
  		allsiteid: state => state.threeStep.allsiteid,
  		headText: state => state.stepPages.head,
  		tooltipToggle: state => state.tooltipToggle,
  		tooltipType: state => state.tooltipType,
			tooltipToggle: state => state.tooltipToggle,
			tooltipTop: state => state.tooltipTop
  	})
  },
  methods: {
  	onscrollHandle() {
  		// this.scrollregionToggle = true
  	},
  	outerHandle(type, index, openmode, $event) {
  		if(type == '01') {
  			this.$store.commit('tooltiptypeHandle', '01')
  			this.$store.commit('tooltipindexHandle', index)
  			this.$store.commit('tooltiptoggleHandle', true)
  			this.$store.commit('tooltiptopHandle', $event.currentTarget.getBoundingClientRect().top)
  			if(this.pageToggle) {
  				for(let i=0; i<this.columnList1.length; i++) {
  					if(this.columnList1[i].type == 'outerchain') {
  						this.columnList1[i].editOnoff = true
  					}
  				}
  				this.columnList1[index].editOnoff = false
  				this.$store.commit('tooltipoptionHandle', this.columnList1[index])
  			}else {
  				for(let i=0; i<this.columnList2.length; i++) {
  					if(this.columnList2[i].type == 'outerchain') {
  						this.columnList2[i].editOnoff = true
  					}
  				}
  				this.columnList2[index].editOnoff = false
  				this.$store.commit('tooltipoptionHandle', this.columnList2[index])
  			}
  		}else if(type == '02') {
  			if(this.pageToggle) {
  				for(let i=0; i<this.columnList1.length; i++) {
  					if(this.columnList1[i].type == 'outerchain') {
  						// this.columnList1[i].editOnoff = true
  					}
  				}
  			}else {

  			}
  		}else if(type == '03') {
  			if(this.tooltipType == '02') {
  				this.$store.commit('tooltiptypeHandle', '01')
  				this.$store.commit('tooltipindexHandle', index)
  				this.$store.commit('tooltiptopHandle', $event.currentTarget.getBoundingClientRect().top)
  			}else {
  				if(this.tooltipTop != $event.currentTarget.getBoundingClientRect().top) {
	  				this.$store.commit('tooltiptypeHandle', '01')
	  				this.$store.commit('tooltipindexHandle', index)
  					this.$store.commit('tooltiptoggleHandle', true)
	  				this.$store.commit('tooltiptopHandle', $event.currentTarget.getBoundingClientRect().top)
  				}else {
  					if(this.tooltipToggle) {
  						this.$store.commit('tooltiptoggleHandle', false)
  					}else {
  						this.$store.commit('tooltiptoggleHandle', true)
  					}
  				}
  			}
  		}else if(type == '04') {
  			if(this.pageToggle) {
	  			if(openmode.substr(0, 7).toLowerCase() != 'http://' && openmode.substr(0, 8).toLowerCase() != 'https://') {
	  				this.columnList1[index].link = 'http://' + openmode
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
							this.$message({
								type: 'error',
								message: res.data.msg
							})
						}
					})
  			}else {
	  			if(openmode.substr(0, 7).toLowerCase() != 'http://' && openmode.substr(0, 8).toLowerCase() != 'https://') {
	  				this.columnList2[index].link = 'http://' + openmode
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
							this.$message({
								type: 'error',
								message: res.data.msg
							})
						}
					})
  			}
  		}else if(type == '05') {
  			if(this.pageToggle) {
  				if(this.columnList1[index].openmode == '_self') {
  					this.columnList1[index].openmode = '_blank'
  				}else {
  					this.columnList1[index].openmode = '_self'
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
							this.$message({
								type: 'error',
								message: res.data.msg
							})
						}
					})
  			}else {
  				if(this.columnList2[index].openmode == '_self') {
  					this.columnList2[index].openmode = '_blank'
  				}else {
  					this.columnList2[index].openmode = '_self'
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
							this.$message({
								type: 'error',
								message: res.data.msg
							})
						}
					})
  			}
  		}
  	},
  	addlinkHandle() {
  		this.$store.commit('passtoggleHandle', false)
  		this.$store.commit('tooltiptoggleHandle', false)
  		if(this.pageToggle) {
				for(let i=0; i<this.columnList1.length; i++) {
					if(this.columnList1[i].type == 'outerchain') {
						this.columnList1[i].editOnoff = true
					}
				}
  		}else {
				for(let i=0; i<this.columnList2.length; i++) {
					if(this.columnList2[i].type == 'outerchain') {
						this.columnList2[i].editOnoff = true
					}
				}
  		}

  		if(this.pageToggle) {
	  		let obj = {
	  			id: this.columnList1.length,
					type: 'outerchain',
					name: '魔码云官网',
					link: 'https://www.momayun.cn/',
					editOnoff: true,
					operation: false,
					openmode: '_blank'
	  		}
  			this.columnList1.splice(this.columnList1.length-1, 0, obj)
				this.$axios({
					method: 'post',
					url: '/api/Ctstation/savecolumnList',
					data: {
						site_id: this.siteId,
						columnList: this.columnList1
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						this.$message({
							type: 'error',
							message: res.data.msg
						})
					}
				})
  		}else {
	  		let obj = {
	  			id: this.columnList2.length,
					type: 'outerchain',
					name: '魔码云官网',
					link: 'https://www.momayun.cn/',
					editOnoff: true,
					operation: false,
					openmode: '_blank'
	  		}
  			this.columnList2.splice(this.columnList2.length-2, 0, obj)
				this.$axios({
					method: 'post',
					url: '/api/Ctstation/savecolumnList',
					data: {
						site_id: this.siteId,
						columnList: this.columnList2
					}
				}).then((res)=> {
					if(res.data.code == '404') {
						this.$message({
							type: 'error',
							message: res.data.msg
						})
					}
				})
  		}
  	},
  	moveHandle(type, index, id) {
  		this.$store.commit('passtoggleHandle', false)
  		if(type == '01') {
  			this.movedownId = id
  			// this.goAnchor(index)
  		}else if(type == '02') {
				// this.goAnchor(index)
				// console.log(index)
  		}
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
        	for(let i=0; i<this.headText.length; i++) {
        		this.headbg = '无'
        		this.headText[i].bgColor = ''
        		this.headText[i].bgImg = res.data.data[0].url
        	}
          this.$axios({
            method: 'post',
            url: '/api/Senior/savemodule',
            data: {
              site_id: this.siteId,
              type: 'head',
              module: {
              	bgImg: res.data.data[0].url
              }
            }
          }).then((res)=> {
            if(res.data.code == '404') {
              this.$message({
								type: 'error',
								message: res.data.msg
							})
            }
          })
        }else {
          this.$message({
						type: 'error',
						message: res.data.msg
					})
        }
      })
  	},
  	toimgHandel() {
  		this.imgReplaceToggle = true
  	},
  	onoff() {
  		this.imgReplaceToggle = false
  	},
  	ppstabHandle() {
  		this.mobilepcToggle = !this.mobilepcToggle
  		if(this.mobilepcToggle) {
  			this.$store.commit('phonetoggleHandle', false)
  			this.$store.commit('browserHandel', false)
  			this.$store.state.mobileright = 'auto'
  			// this.columnList1[0].indexes = '3'
  			// this.columnList1[0].indexes = '3'
  		}else {
  			this.$store.commit('phonetoggleHandle', true)
  			this.$store.commit('browserHandel', true)
  			this.$store.state.mobileright = '0'
  		}
  	},
  	moreopretionHandel(type, index, pid, $event) {
  		if(type == '01') {
  			if(this.tooltipType == '03') {
  				if(this.tooltipToggle) {
  					this.$store.commit('tooltiptoggleHandle', false)
  				}else {
	  				this.$store.commit('tooltipindexHandle', index)
  					this.$store.commit('tooltiptoggleHandle', true)
	  				this.$store.commit('tooltiptopHandle', $event.currentTarget.getBoundingClientRect().top)
  					this.$store.commit('tooltipoptionHandle', this.columnList2[this.pageIndex].sonColumn[index])
  				}
  			}else {
	  			this.$store.commit('tooltiptypeHandle', '03')
	  			this.$store.commit('tooltipindexHandle', index)
	  			this.$store.commit('tooltiptoggleHandle', true)
	  			this.$store.commit('tooltiptopHandle', $event.currentTarget.getBoundingClientRect().top)
  				this.$store.commit('tooltipoptionHandle', this.columnList2[this.pageIndex].sonColumn[index])
  			}
  		}else if(type == '02') {
  			if(this.columnList2[this.pageIndex].sonColumn[index].isguan == '1') {
  				this.columnList2[this.pageIndex].sonColumn[index].isguan = 0
  			}else {
  				this.columnList2[this.pageIndex].sonColumn[index].isguan = 1
  			}
  			if(guan == '0') {
		  		this.$axios({
		  			method: 'post',
		  			url: '/api/Senior/savelanmu',
		  			data: {
		  				isguan: '1',
		  				pagetype: pagetype,
		  				lmname: name,
		  				lmid: pid
		  			}
		  		}).then((res)=> {
		  			if(res.data.code == '200') {
		  				if(this.pageToggle) {
			  				this.$axios({
			  					method: 'post',
			  					url: '/api/Ctstation/savecolumnList',
			  					data: {
			  						columnList: this.columnList1,
			  						site_id: this.siteId
			  					}
			  				}).then((res)=> {
			  					if(res.data.code == '404') {
			  						this.$message({
											type: 'error',
											message: res.data.msg
										})
			  					}
			  				})
		  				}else {
			  				this.$axios({
			  					method: 'post',
			  					url: '/api/Ctstation/savecolumnList',
			  					data: {
			  						columnList: this.columnList2,
			  						site_id: this.siteId
			  					}
			  				}).then((res)=> {
			  					if(res.data.code == '404') {
			  						this.$message({
											type: 'error',
											message: res.data.msg
										})
			  					}
			  				})
		  				}
		  			}else {
		  				this.$message({
								type: 'error',
								message: res.data.msg
							})
		  			}
		  		})
  			}else {
		  		this.$axios({
		  			method: 'post',
		  			url: '/api/Senior/savelanmu',
		  			data: {
		  				isguan: '0',
		  				pagetype: pagetype,
		  				lmname: name,
		  				lmid: pid
		  			}
		  		}).then((res)=> {
		  			if(res.data.code == '200') {
		  				if(this.pageToggle) {
			  				this.$axios({
			  					method: 'post',
			  					url: '/api/Ctstation/savecolumnList',
			  					data: {
			  						columnList: this.columnList1,
			  						site_id: this.siteId
			  					}
			  				}).then((res)=> {
			  					if(res.data.code == '404') {
			  						this.$message({
											type: 'error',
											message: res.data.msg
										})
			  					}
			  				})
		  				}else {
			  				this.$axios({
			  					method: 'post',
			  					url: '/api/Ctstation/savecolumnList',
			  					data: {
			  						columnList: this.columnList2,
			  						site_id: this.siteId
			  					}
			  				}).then((res)=> {
			  					if(res.data.code == '404') {
			  						this.$message({
											type: 'error',
											message: res.data.msg
										})
			  					}
			  				})
		  				}
		  			}else {
		  				this.$message({
								type: 'error',
								message: res.data.msg
							})
		  			}
		  		})
  			}
  		}
  	},
  	getval(type, val) {
  		if(type == '01') {
	  		if(this.pageToggle) {
		  		if(val == '图文布局') {
		  			this.columnList1[0].indexes = 0
		  			// this.columnList2[0].indexes = 0
		  		}else if(val == '标题布局') {
		  			this.columnList1[0].indexes = 1
		  			// this.columnList2[0].indexes = 1
		  		}else if(val == '图片布局') {
		  			this.columnList1[0].indexes = 2
		  			// this.columnList2[0].indexes = 2
		  		}else if(val == '按钮布局') {
		  			this.columnList1[0].indexes = 3
		  		}else if(val == '三列布局') {
		  			this.columnList1[0].indexes = 4
		  		}
		  		this.$axios({
		  			method: 'post',
		  			url: '/api/Ctstation/savecolumnList',
		  			data: {
		  				columnList: this.columnList1,
		  				site_id: this.siteId
		  			}
		  		}).then((res)=> {
		  			if(res.data.code == '404') {
		  				this.$message({
								type: 'error',
								message: res.data.msg
							})
		  			}
		  		})
	  		}else {
		  		if(val == '图文布局') {
		  			// this.columnList1[0].indexes = 0
		  			this.columnList2[0].indexes = 0
		  		}else if(val == '标题布局') {
		  			// this.columnList1[0].indexes = 1
		  			this.columnList2[0].indexes = 1
		  		}else if(val == '图片布局') {
		  			// this.columnList1[0].indexes = 2
		  			this.columnList2[0].indexes = 2
		  		}else if(val == '按钮布局') {
		  			this.columnList2[0].indexes = 3
		  		}else if(val == '三列布局') {
		  			this.columnList2[0].indexes = 4
		  		}
		  		this.$axios({
		  			method: 'post',
		  			url: '/api/Ctstation/savecolumnList',
		  			data: {
		  				columnList: this.columnList2,
		  				site_id: this.siteId
		  			}
		  		}).then((res)=> {
		  			if(res.data.code == '404') {
		  				this.$message({
								type: 'error',
								message: res.data.msg
							})
		  			}
		  		})
	  		}
  		}else if(type == '02') {
	  		for(let i=0; i<this.headText.length; i++) {
	  			this.postImg = ''
	  			this.headText[i].bgImg = ''
	  			if(val == '无') {
	  				this.headText[i].bgColor = ''
	  			}else if(val == '白色') {
	  				this.headText[i].bgColor = 'white'
	  			}else if(val == '浅色') {
	  				this.headText[i].bgColor = '#DEDEDE'
	  			}else if(val == '深色') {
	  				this.headText[i].bgColor = '#161515'
	  			}else if(val == '绿色') {
	  				this.headText[i].bgColor = '#00B473'
	  			}else if(val == '蓝色') {
	  				this.headText[i].bgColor = '#096EFA'
	  			}else if(val == '紫色') {
	  				this.headText[i].bgColor = '#41289E'
	  			}else if(val == '黄色') {
	  				this.headText[i].bgColor = '#F0BE27'
	  			}else if(val == '橙色') {
	  				this.headText[i].bgColor = '#E46343'
	  			}
	  		}
	  		if(this.pageToggle) {
	  			for(let i=0; i<this.headText.length; i++) {
	  				if(this.columnList1[0].pid == this.headText[i].lmid) {
	  					this.headModel = this.headText[i]
	  				}
	  			}
	  		}else {
	  			for(let i=0; i<this.headText.length; i++) {
	  				if(this.columnList2[0].id == this.headText[i].lmid) {
	  					this.headModel = this.headText[i]
	  				}
	  			}
	  		}
	      this.$axios({
	        method: 'post',
	        url: '/api/Senior/savemodule',
	        data: {
	          site_id: this.siteId,
	          type: 'head',
	          module: this.headModel
	        }
	      }).then((res)=> {
	        if(res.data.code == '404') {
	          this.$message({
							type: 'error',
							message: res.data.msg
						})
	        }
	      })
  		}else if(type == '03') {
	  		for(let i=0; i<this.headText.length; i++) {
	  			if(val == '小') {
	  				this.headText[i].paddingNum = '0 7px'
	  			}else if(val == '中') {
	  				this.headText[i].paddingNum = '0 15px'
	  			}else if(val == '大') {
	  				this.headText[i].paddingNum = '0 25px'
	  			}
	  		}
	  		if(this.pageToggle) {
	  			for(let i=0; i<this.headText.length; i++) {
	  				if(this.columnList1[0].pid == this.headText[i].lmid) {
	  					this.headModel = this.headText[i]
	  				}
	  			}
	  		}else {
	  			for(let i=0; i<this.headText.length; i++) {
	  				if(this.columnList2[0].id == this.headText[i].lmid) {
	  					this.headModel = this.headText[i]
	  				}
	  			}
	  		}
	      this.$axios({
	        method: 'post',
	        url: '/api/Senior/savemodule',
	        data: {
	          site_id: this.siteId,
	          type: 'head',
	          module: this.headModel
	        }
	      }).then((res)=> {
	        if(res.data.code == '404') {
	          this.$message({
							type: 'error',
							message: res.data.msg
						})
	        }
	      })
  		}else if(type == '04') {
	  		for(let i=0; i<this.headText.length; i++) {
	  			if(val == '小') {
	  				this.headText[i].fontSize = '12px'
	  			}else if(val == '中') {
	  				this.headText[i].fontSize = '15px'
	  			}else if(val == '大') {
	  				this.headText[i].fontSize = '20px'
	  			}
	  		}
	  		if(this.pageToggle) {
	  			for(let i=0; i<this.headText.length; i++) {
	  				if(this.columnList1[0].pid == this.headText[i].lmid) {
	  					this.headModel = this.headText[i]
	  				}
	  			}
	  		}else {
	  			for(let i=0; i<this.headText.length; i++) {
	  				if(this.columnList2[0].id == this.headText[i].lmid) {
	  					this.headModel = this.headText[i]
	  				}
	  			}
	  		}
	      this.$axios({
	        method: 'post',
	        url: '/api/Senior/savemodule',
	        data: {
	          site_id: this.siteId,
	          type: 'head',
	          module: this.headModel
	        }
	      }).then((res)=> {
	        if(res.data.code == '404') {
	          this.$message({
							type: 'error',
							message: res.data.msg
						})
	        }
	      })
  		}else if(type == '05') {
  			for(let i=0; i<this.headText.length; i++) {
  				if(val == '白色') {
  					this.headText[i].fontColor = 'white'
  					this.$store.commit('headfontcolorHandel', 'white')
  				}else if(val == '浅色') {
  					this.headText[i].fontColor = 'gray'
  					this.$store.commit('headfontcolorHandel', 'gray')
  				}else if(val == '深色') {
  					this.headText[i].fontColor = 'black'
  					this.$store.commit('headfontcolorHandel', 'black')
  				}else if(val == '绿色') {
  					this.headText[i].fontColor = 'green'
  					this.$store.commit('headfontcolorHandel', 'green')
  				}else if(val == '蓝色') {
  					this.headText[i].fontColor = 'blue'
  					this.$store.commit('headfontcolorHandel', 'blue')
  				}else if(val == '紫色') {
  					this.headText[i].fontColor = 'violet'
  					this.$store.commit('headfontcolorHandel', 'violet')
  				}else if(val == '黄色') {
  					this.headText[i].fontColor = 'yellow'
  					this.$store.commit('headfontcolorHandel', 'yellow')
  				}else if(val == '橙色') {
  					this.headText[i].fontColor = 'orange'
  					this.$store.commit('headfontcolorHandel', 'orange')
  				}
  			}
	  		if(this.pageToggle) {
	  			for(let i=0; i<this.headText.length; i++) {
	  				if(this.columnList1[0].pid == this.headText[i].lmid) {
	  					this.headModel = this.headText[i]
	  				}
	  			}
	  		}else {
	  			for(let i=0; i<this.headText.length; i++) {
	  				if(this.columnList2[0].id == this.headText[i].lmid) {
	  					this.headModel = this.headText[i]
	  				}
	  			}
	  		}
	      this.$axios({
	        method: 'post',
	        url: '/api/Senior/savemodule',
	        data: {
	          site_id: this.siteId,
	          type: 'head',
	          module: this.headModel
	        }
	      }).then((res)=> {
	        if(res.data.code == '404') {
	          this.$message({
							type: 'error',
							message: res.data.msg
						})
	        }
	      })
  		}
  	},
  	fnend2() {
  		this.$store.commit('tooltiptoggleHandle', false)
  		this.$store.commit('columnListHandel2', this.columnList[1])
  		this.$axios({
  			method: 'post',
  			url: '/api/Ctstation/savecolumnList',
  			data: {
  				columnList: this.columnList2,
  				site_id: this.siteId
  			}
  		}).then((res)=> {
  			if(res.data.code == '404') {
  				this.$message({
						type: 'error',
						message: res.data.msg
					})
  			}
  		})
  	},
  	fnend1() {
  		this.$axios({
  			method: 'post',
  			url: '/api/Ctstation/savecolumnList',
  			data: {
  				columnList: this.columnList2,
  				site_id: this.siteId
  			}
  		}).then((res)=> {
  			if(res.data.code == '404') {
  				this.$message({
						type: 'error',
						message: res.data.msg
					})
  			}
  		})
  		this.moveto(this.movedownId)
  	},
  	fnend() {
  		this.$store.commit('tooltiptoggleHandle', false)
  		this.$store.commit('columnListHandel', this.columnList[0])
  		this.$axios({
  			method: 'post',
  			url: '/api/Ctstation/savecolumnList',
  			data: {
  				columnList: this.columnList1,
  				site_id: this.siteId
  			}
  		}).then((res)=> {
  			if(res.data.code == '404') {
  				this.$message({
						type: 'error',
						message: res.data.msg
					})
  			}
  		})
  		this.moveto(this.movedownId)
  	},
  	moveto(id) {
  		if(this.pageToggle) {
  			for(let i=0; i<this.columnList1.length; i++) {
  				this.columnList1[i].checked = false
  				if(this.columnList1[i].pid == id) {
  					this.columnList1[i].checked = true
  					this.goAnchor(i)
  				}
  			}
  		}else {
  			for(let i=0; i<this.columnList2[this.pageIndex].sonColumn.length; i++) {
  				this.columnList2[this.pageIndex].sonColumn[i].checked = false
  				if(this.columnList2[this.pageIndex].sonColumn[i].pid == id) {
  					this.columnList2[this.pageIndex].sonColumn[i].checked = true
  					this.goAnchor(i)
  				}
  			}
  		}
  	},
  	onBlur(type, name, id, pagetype) {
  		if(type == '01' || type == '02') {
  			if(this.pageToggle) {
  				for(let i=0; i<this.$store.state.threeStep.columnList.length; i++) {
  					this.$store.state.threeStep.columnList[i].editOnoff1 = true
  				}
  			}else {
  				for(let i=0; i<this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn.length; i++) {
  					this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn[i].editOnoff1 = true
  				}
  			}
	  		if(name !== this.modelName) {
		  		this.$axios({
		  			method: 'post',
		  			url: '/api/Senior/savelanmu',
		  			data: {
		  				pid: 0,
		  				pagetype: pagetype,
		  				lmname: name,
		  				lmid: id
		  			}
		  		}).then((res)=> {
		  			if(res.data.code == '200') {
		  				if(this.pageToggle) {
			  				this.$axios({
			  					method: 'post',
			  					url: '/api/Ctstation/savecolumnList',
			  					data: this.$store.state,
			  					transformRequest: [function(data) {
			  						let ret = {}
			  						for(let i=0; i<data.threeStep.columnList.length; i++) {
			  							data.threeStep.columnList[i].editOnoff1 = true
			  						}
			  						ret = {
			  							columnList: data.threeStep.columnList,
			  							site_id: data.threeStep.siteId
			  						}
			  						return JSON.stringify(ret)
			  					}],
									headers: {
										'Content-Type': 'application/json;charset=UTF-8'
									}
			  				}).then((res)=> {
			  					if(res.data.code == '404') {
			  						this.$message({
											type: 'error',
											message: res.data.msg
										})
			  					}
			  				})
		  				}else {
			  				this.$axios({
			  					method: 'post',
			  					url: '/api/Ctstation/savecolumnList',
			  					data: this.$store.state,
			  					transformRequest: [function(data) {
			  						let ret = {}
			  						for(let i=0; i<data.threeStep.columnList2.length; i++) {
			  							if(data.threeStep.columnList2[i].sonColumn) {
			  								for(let j=0; j<data.threeStep.columnList2[i].sonColumn.length; j++) {
			  									data.threeStep.columnList2[i].sonColumn[j].editOnoff1 = true
			  								}
			  							}
			  						}
			  						ret = {
			  							columnList: data.threeStep.columnList2,
			  							site_id: data.threeStep.siteId
			  						}
			  						return JSON.stringify(ret)
			  					}],
									headers: {
										'Content-Type': 'application/json;charset=UTF-8'
									}
			  				}).then((res)=> {
			  					if(res.data.code == '404') {
			  						this.$message({
											type: 'error',
											message: res.data.msg
										})
			  					}
			  				})
		  				}
		  			}
		  			if(res.data.code == '404') {
		  				this.$message({
								type: 'error',
								message: res.data.msg
							})
		  			}
		  		})
	  		}
  		}else {
  			for(let i=0; i<this.columnList2.length; i++) {
  				this.columnList2[i].inputOnoff = true
  			}
  			if(name !== this.modelName) {
  				this.$axios({
  					method: 'post',
  					url: '/api/Senior/savelanmu',
  					data: {
  						pid: 0,
		  				pagetype: pagetype,
		  				lmname: name,
		  				lmid: id
  					}
  				}).then((res)=> {
  					if(res.data.code == '200') {
  						this.$axios({
  							method: 'post',
  							url: '/api/Ctstation/savecolumnList',
  							data: this.$store.state,
		  					transformRequest: [function(data) {
		  						let ret = {}
		  						for(let i=0; i<data.threeStep.columnList2.length; i++) {
		  							data.threeStep.columnList2[i].editOnoff1 = true
		  						}
		  						ret = {
		  							columnList: data.threeStep.columnList2,
		  							site_id: data.threeStep.siteId
		  						}
		  						return JSON.stringify(ret)
		  					}],
								headers: {
									'Content-Type': 'application/json;charset=UTF-8'
								}
  						})
  					}else {
  						this.$message({
								type: 'error',
								message: res.data.msg
							})
  					}
  				})
  			}
  		}
  	},
  	editName(name, id, type) {
  	},
    editHandel() {
      for(let i=0; i<this.columnList2.length; i++) {
        this.columnList2[i].inputOnoff = true
        this.columnList2[i].operation = false
      }
    },
    pageHandel(type, index, ppid) {
			this.bannerText = []
			this.newText = []
			this.productText = []
			this.teamText = []
			this.recruitText = []
			this.atlasText = []
			this.contactText = []

      if(type == '01') {
        for(let i=0; i<this.columnList2.length; i++) {
          this.columnList2[i].inputOnoff = true
        }
        this.columnList2[index].inputOnoff = false
      }else if(type == '02') {

      }else if(type == '03') {
        let obj = {}
        for(let i=1; i<this.columnList2.length; i++) {
        	if(this.columnList2[i].id == ppid) {
	        		for(let j=0; j<this.columnList2[i].sonColumn.length; j++) {
	        			if(this.columnList2[i].sonColumn[j].type == 'banner') {
			        		obj = {
			        			lmid: this.columnList2[i].sonColumn[j].pid
			        		}
			        		this.bannerText.push(obj)
	        			}else if(this.columnList2[i].sonColumn[j].type == 'product') {
			        		obj = {
			        			lmid: this.columnList2[i].sonColumn[j].pid
			        		}
			        		this.productText.push(obj)
	        			}else if(this.columnList2[i].sonColumn[j].type == 'new') {
			        		obj = {
			        			lmid: this.columnList2[i].sonColumn[j].pid
			        		}
			        		this.newText.push(obj)
	        			}else if(this.columnList2[i].sonColumn[j].type == 'team') {
			        		obj = {
			        			lmid: this.columnList2[i].sonColumn[j].pid
			        		}
			        		this.teamText.push(obj)
	        			}else if(this.columnList2[i].sonColumn[j].type == 'recruit') {
			        		obj = {
			        			lmid: this.columnList2[i].sonColumn[j].pid
			        		}
			        		this.recruitText.push(obj)
	        			}else if(this.columnList2[i].sonColumn[j].type == 'atlas') {
			        		obj = {
			        			lmid: this.columnList2[i].sonColumn[j].pid
			        		}
			        		this.atlasText.push(obj)
	        			}else if(this.columnList2[i].sonColumn[j].type == 'contact') {
	        				obj = {
			        			lmid: this.columnList2[i].sonColumn[j].pid
			        		}
			        		this.contactText.push(obj)
	        			}
	        		}
        	}
        }
        this.columnList2.splice(index, 1)
        if(index > 1) {
        	this.$store.commit('pageIndexHandel', index-1)
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
        }).then((res)=> {
        	if(res.data.code == '200') {
    				this.$axios({
    					method: 'post',
    					url: '/api/Ctstation/savecolumnList',
    					data: {
    						site_id: this.siteId,
    						columnList: this.columnList2
    					}
    				}).then((res)=> {
    					if(res.data.code == '404') {
    						this.$message({
									type: 'error',
									message: res.data.msg
								})
    					}
    				})
        	}else {
        		this.$message({
							type: 'error',
							message: res.data.msg
						})
        	}
        })
      }
      for(let i=0; i<this.columnList2.length; i++) {
        this.columnList2[i].operation = false
      }
    },
    setHandel(index, onoff, $event) {
  		for(let i=0; i<this.columnList2.length; i++) {
  			if(this.columnList2[i].type == 'outerchain') {
  				this.columnList2[i].editOnoff = true
  			}
  		}
    	if(this.tooltipType == '01') {
    		this.$store.commit('tooltiptypeHandle', '02')
  			this.$store.commit('tooltipindexHandle', index)
  			this.$store.commit('tooltiptoggleHandle', true)
  			this.$store.commit('tooltipoptionHandle', this.columnList2[index])
  			this.$store.commit('tooltiptopHandle', $event.currentTarget.getBoundingClientRect().top)
    	}else {
    		if(this.tooltipTop != $event.currentTarget.getBoundingClientRect().top) {
    			this.$store.commit('tooltipoptionHandle', this.columnList2[index])
	    		this.$store.commit('tooltiptypeHandle', '02')
	  			this.$store.commit('tooltipindexHandle', index)
	  			this.$store.commit('tooltiptoggleHandle', true)
	  			this.$store.commit('tooltiptopHandle', $event.currentTarget.getBoundingClientRect().top)
    		}else {
    			if(this.tooltipToggle) {
    				this.$store.commit('tooltiptoggleHandle', false)
    			}else {
    				this.$store.commit('tooltipoptionHandle', this.columnList2[index])
    				this.$store.commit('tooltiptoggleHandle', true)
    			}
    		}

    	}
    },
  	addPage() {
  		let pagelist = []
  		let pagelist2 = []
  		for(let i=0; i<this.columnList2.length; i++) {
  			if(this.columnList2[i].type != 'footer' && this.columnList2[i].type != 'details' && this.columnList2[i].type != 'outerchain' && this.columnList2[i].type != 'header') {
  				pagelist.push(this.columnList2[i])
  			}else {
  				pagelist2.push(this.columnList2[i])
  			}
  		}
			let obj = {
				id: this.columnList2.length,
				name: '页面' + (pagelist.length + 1),
				type: 'homepage',
				pagetype: 0,
				typeName: '自定义页面',
				editOnoff: true,
				onOff: true,
				operation: false,
				plus: true,
				inputOnoff: true,
				checked: false,
				editOnoff1: false,
				sonColumn: []
			}
			if(pagelist.length<10) {
				this.$axios({
					method: 'post',
					url: '/api/Senior/newlanmu',
					data: {
						site_id: this.siteId,
						lanmuid: obj.id,
						pid: 0,
						pagetype: 0,
						lmname: obj.name,
						isindex: 0
					}
				}).then((res)=> {
					if(res.data.code == '200') {
						if(pagelist2.length > 3) {
							for(let i=0; i<this.columnList2.length; i++) {
								if(this.columnList2[i].type == 'outerchain') {
									this.columnList2.splice(i, 0, obj)
									break;
								}
							}
						}else {
							this.columnList2.splice(this.columnList2.length-2, 0, obj)
						}
						for(let i=0; i<this.columnList2.length; i++) {
							if(this.columnList2[i].id == res.data.data.lanmuid) {
								this.columnList2[i].id = res.data.data.lmid
							}
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
								this.$message({
									type: 'error',
									message: res.data.msg
								})
							}
						})
					}
				})
			}else {
				this.$message({
					type: 'error',
					message: '不能超过10个页面'
				})
			}
  	},
  	controllerHandel(type) {
  		this.$store.commit('tooltiptoggleHandle', false)
  		if(type == '01') {
  			this.controllerToggle = false
  		}else {
  			this.controllerToggle = true
  		}
  	},
  	getHandel(index, name, $event) {
  		this.$store.commit('tooltiptypeHandle', '02')
  		this.$store.commit('tooltipindexHandle', index)
  		this.$store.commit('tooltiptoggleHandle', false)
  		this.$store.commit('tooltiptopHandle', $event.currentTarget.getBoundingClientRect().top)

  		this.$store.commit('pageNameHandel', name)
  		this.$store.commit('pageIndexHandel', index)
  		this.pagesulToggle = false
  		for(let i=0; i<this.columnList2.length; i++) {
  			this.columnList2[i].checked = false
  			if(this.columnList2[i].type == 'outerchain') {
  				this.columnList2[i].editOnoff = true
  			}
  		}
  		this.columnList2[index].checked = true
  		 window.pageYOffset = document.documentElement.scrollTop = document.body.scrollTop = 0
  	},
  	pagesulHandel() {
  		this.pagesulToggle = !this.pagesulToggle
  	},
  	toFunc(id) {
  		if(id == '03') {
  			window.open('/index/index/pre?' + this.siteId)
  		}else if(id == '04') {
  			this.$axios({
  				method: 'post',
  				url: '/api/Senior/editSite',
  				data: this.$store.state,
  				transformRequest: [function(data) {
            let ret = {}
            if(data.pageToggle) {
              ret = {
                site_id: data.threeStep.siteId
              }
            }else {
              ret = {
                site_id: data.threeStep.siteId
              }
            }
            return JSON.stringify(ret)
  				}],
					headers: {
						'Content-Type': 'application/json;charset=UTF-8'
					}
  			}).then(()=> {
  				this.$message({
  					type: 'success',
  					message: '保存成功！'
  				})
  			}).catch(()=> {
  				this.$message({
  					type: 'error',
  					message: '保存失败！'
  				})
  			})
  		}else if(id == '05') {
  			// window.open('/index/index/site')
  			window.location.href = '/index/index/site'
  		}
  	},
  	dialogHandel(index) {
  		this.dialogToggle = false
  		if(index == '0') {
  			if(this.delOption.type == '01' || this.delOption.type == '02') {
		  		this.$axios({
		  			method: 'post',
		  			url: '/api/Senior/delmodule',
		  			data: {
		  				site_id: this.siteId,
		  				lmid: this.delOption.pid,
		  				type: this.delOption.pagetype
		  			}
		  		}).then((res)=> {
		  			if(res.data.code == '200') {
		  				this.$axios({
		  					method: 'post',
		  					url: '/api/Senior/dellanmu',
		  					data: {
		  						site_id: this.siteId,
		  						lmid: this.delOption.pid
		  					}
		  				}).then((res)=> {
		  					if(res.data.code == '200') {
					  			if(this.delOption.type == '01') {
					  				for(let i=0; i<this.$store.state.threeStep.columnList.length; i++) {
					  					if(this.$store.state.threeStep.columnList[i].pid == this.delOption.pid) {
					  						this.$store.state.threeStep.columnList.splice(i,1)
					  					}
					  				}
					  				// this.$store.state.threeStep.columnList.splice(this.delOption.index,1)
					  				if(this.delOption.index == '1') {
					  					this.$store.state.threeStep.columnList[this.delOption.index].checked = true
					  					this.goAnchor(this.delOption.index)
					  				}else {
					  					this.$store.state.threeStep.columnList[this.delOption.index-1].checked = true
					  					this.goAnchor(this.delOption.index-1)
					  				}
					  				this.$axios({
					  					method: 'post',
					  					url: '/api/Ctstation/savecolumnList',
					  					data: this.$store.state,
					  					transformRequest: [function(data) {
					  						let ret = {}
					  						for(let i=0; i<data.threeStep.columnList.length; i++) {
					  							data.threeStep.columnList[i].editOnoff1 = true
					  						}
					  						ret = {
					  							columnList: data.threeStep.columnList,
					  							site_id: data.threeStep.siteId
					  						}
					  						return JSON.stringify(ret)
					  					}],
											headers: {
												'Content-Type': 'application/json;charset=UTF-8'
											}
					  				}).then((res)=> {
					  					if(res.data.code == '404') {
					  						this.$message({
													type: 'error',
													message: res.data.msg
												})
					  					}
					  				})
					  			}else if(this.delOption.type == '02') {
					  				for(let i=0; i<this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn.length; i++) {
					  					if(this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn[i].pid == this.delOption.pid) {
					  						this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn.splice(i,1)
					  					}
					  				}
					  				if(this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn.length>0) {
						  				if(this.delOption.index == '0') {
						  					this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn[this.delOption.index].checked = true
					  						this.goAnchor(this.delOption.index)
						  				}else {
						  					this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn[this.delOption.index-1].checked = true
					  						this.goAnchor(this.delOption.index-1)
						  				}
					  				}
					  				this.$axios({
					  					method: 'post',
					  					url: '/api/Ctstation/savecolumnList',
					  					data: this.$store.state,
					  					transformRequest: [function(data) {
					  						let ret = {}
					  						for(let i=0; i<data.threeStep.columnList2.length; i++) {
					  							if(data.threeStep.columnList2[i].sonColumn) {
					  								for(let j=0; j<data.threeStep.columnList2[i].sonColumn.length; j++) {
					  									data.threeStep.columnList2[i].sonColumn[j].editOnoff1 = true
					  								}
					  							}
					  						}
					  						ret = {
					  							columnList: data.threeStep.columnList2,
					  							site_id: data.threeStep.siteId
					  						}
					  						return JSON.stringify(ret)
					  					}],
											headers: {
												'Content-Type': 'application/json;charset=UTF-8'
											}
					  				}).then((res)=> {
					  					if(res.data.code == '404') {
					  						this.$message({
													type: 'error',
													message: res.data.msg
												})
					  					}
					  				})
					  			}
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
								message: res.data.msg
							})
		  			}
		  		})
  			}else if(this.delOption.type == '03') {
  				this.$store.commit('tooltiptoggleHandle', false)
  				if(this.pageToggle) {
  					for(let i=0; i<this.columnList1.length; i++) {
  						if(this.columnList1[i].id == this.delOption.pid && this.columnList1[i].type == 'outerchain') {
  							this.columnList1.splice(this.delOption.index, 1)
  						}
  					}
	  				this.$axios({
	  					method: 'post',
	  					url: '/api/Ctstation/savecolumnList',
	  					data: {
	  						site_id: this.siteId,
	  						columnList: this.columnList1
	  					}
	  				}).then((res)=> {
	  					if(res.data.code == '200') {
	  						this.$store.commit('tooltiptoggleHandle', false)
	  					}else {
	  						this.$message({
									type: 'error',
									message: res.data.msg
								})
	  					}
	  				})
  				}else {
  					for(let i=0; i<this.columnList2.length; i++) {
  						if(this.columnList2[i].id == this.delOption.pid && this.columnList2[i].type == 'outerchain') {
  							this.columnList2.splice(this.delOption.index, 1)
  						}
  					}
	  				this.$axios({
	  					method: 'post',
	  					url: '/api/Ctstation/savecolumnList',
	  					data: {
	  						site_id: this.siteId,
	  						columnList: this.columnList2
	  					}
	  				}).then((res)=> {
	  					if(res.data.code == '200') {
	  						this.$store.commit('tooltiptoggleHandle', false)
	  					}else {
	  						this.$message({
									type: 'error',
									message: res.data.msg
								})
	  					}
	  				})
  				}
  			}
  		}
  	},
  	deleteHandle(type, index, pagetype, pid, name) {
  		// this.dialogToggle = true
  		this.delOption = {
  			type: type,
  			index: index,
  			pagetype: pagetype,
  			pid: pid,
  			name: name
  		}
  		this.$confirm('请确认是否删除此版块？', '提示', {
  			confirmButtonText: '确定',
  			cancelButtonText: '取消',
  			type: 'warning',
  			lockScroll: false
  		}).then(()=> {
  			if(type === '01' || type === '02') {
  				this.$axios({
  					method: 'post',
  					url: '/api/Senior/delmodule',
  					data: {
  						siteId: this.siteId,
  						lmid: pid,
  						type: pagetype
  					}
  				}).then(()=> {
  					this.$axios({
  						method: 'post',
  						url: '/api/Senior/dellanmu',
  						data: {
  							site_id: this.siteId,
  							lmid: pid
  						}
  					}).then(()=> {
			  			if(type === '01') {
			  				for(let i=0; i<this.$store.state.threeStep.columnList.length; i++) {
			  					if(this.$store.state.threeStep.columnList[i].pid == this.delOption.pid) {
			  						this.$store.state.threeStep.columnList.splice(i,1)
			  					}
			  				}
			  				// this.$store.state.threeStep.columnList.splice(this.delOption.index,1)
			  				if(index === '1') {
			  					this.$store.state.threeStep.columnList[index].checked = true
			  					this.goAnchor(index)
			  				}else {
			  					this.$store.state.threeStep.columnList[index-1].checked = true
			  					this.goAnchor(index-1)
			  				}
			  				this.$axios({
			  					method: 'post',
			  					url: '/api/Ctstation/savecolumnList',
			  					data: this.$store.state,
			  					transformRequest: [function(data) {
			  						let ret = {}
			  						for(let i=0; i<data.threeStep.columnList.length; i++) {
			  							data.threeStep.columnList[i].editOnoff1 = true
			  						}
			  						ret = {
			  							columnList: data.threeStep.columnList,
			  							site_id: data.threeStep.siteId
			  						}
			  						return JSON.stringify(ret)
			  					}],
									headers: {
										'Content-Type': 'application/json;charset=UTF-8'
									}
			  				}).catch(()=> {
			  					this.$message({
			  						type: 'error',
			  						message: '删除失败！'
			  					})
			  				})
			  			}else if(type === '02') {
				  				for(let i=0; i<this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn.length; i++) {
				  					if(this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn[i].pid == this.delOption.pid) {
				  						this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn.splice(i,1)
				  					}
				  				}
				  				if(this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn.length>0) {
					  				if(index == '0') {
					  					this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn[index].checked = true
				  						this.goAnchor(index)
					  				}else {
					  					this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn[index-1].checked = true
				  						this.goAnchor(index-1)
					  				}
				  				}
				  				this.$axios({
				  					method: 'post',
				  					url: '/api/Ctstation/savecolumnList',
				  					data: this.$store.state,
				  					transformRequest: [function(data) {
				  						let ret = {}
				  						for(let i=0; i<data.threeStep.columnList2.length; i++) {
				  							if(data.threeStep.columnList2[i].sonColumn) {
				  								for(let j=0; j<data.threeStep.columnList2[i].sonColumn.length; j++) {
				  									data.threeStep.columnList2[i].sonColumn[j].editOnoff1 = true
				  								}
				  							}
				  						}
				  						ret = {
				  							columnList: data.threeStep.columnList2,
				  							site_id: data.threeStep.siteId
				  						}
				  						return JSON.stringify(ret)
				  					}],
										headers: {
											'Content-Type': 'application/json;charset=UTF-8'
										}
				  				}).catch(()=> {
				  					this.$message({
				  						type: 'error',
				  						message: '删除失败！'
				  					})
				  				})
			  			}
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
  			}else if(type === '03') {
  				this.$store.commit('tooltiptoggleHandle', false)
  				if(this.pageToggle) {
  					for(let i=0; i<this.columnList1.length; i++) {
  						if(this.columnList1[i].id == pid && this.columnList1[i].type == 'outerchain') {
  							this.columnList1.splice(index, 1)
  						}
  					}
	  				this.$axios({
	  					method: 'post',
	  					url: '/api/Ctstation/savecolumnList',
	  					data: {
	  						site_id: this.siteId,
	  						columnList: this.columnList1
	  					}
	  				}).then(()=> {
	  					this.$store.commit('tooltiptoggleHandle', false)
	  				}).catch(()=> {
	  					this.$message({
			  				type: 'error',
			  				message: '删除失败！'
			  			})
	  				})
  				}else {
  					for(let i=0; i<this.columnList2.length; i++) {
  						if(this.columnList2[i].id == pid && this.columnList2[i].type == 'outerchain') {
  							this.columnList2.splice(index, 1)
  						}
  					}
	  				this.$axios({
	  					method: 'post',
	  					url: '/api/Ctstation/savecolumnList',
	  					data: {
	  						site_id: this.siteId,
	  						columnList: this.columnList2
	  					}
	  				}).then(()=> {
	  					this.$store.commit('tooltiptoggleHandle', false)
	  				}).catch(()=> {
	  					this.$message({
			  				type: 'error',
			  				message: '删除失败！'
			  			})
	  				})
  				}
  			}
  		}).catch(()=> {
  			this.$message({
  				type: 'info',
  				message: '已放弃此次操作。'
  			})
  		})
  	},
  	editHandle(type, index, name) {
  		this.modelName = name
  		if(type == '01') {
				for(let i=0; i<this.$store.state.threeStep.columnList.length; i++) {
					this.$store.state.threeStep.columnList[i].editOnoff1 = true
				}
				this.$store.state.threeStep.columnList[index].editOnoff1 = false
  		}else {
  			for(let i=0; i<this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn.length; i++) {
  				this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn[i].editOnoff1 = true
  			}
  			this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn[index].editOnoff1 = false
  		}
  	},
		goAnchor(index) {
  		this.$store.commit('tooltiptoggleHandle', false)
	  	this.$store.commit('tooltipindexHandle', index)
			if(index == 'undefined') {
				index = 1
			}
			this.$store.state.homeHash = index
			if(this.pageToggle) {
				for(let i=0; i<this.$store.state.threeStep.columnList.length; i++) {
					this.$store.state.threeStep.columnList[i].checked = false
					this.$store.state.threeStep.columnList[i].editOnoff1 = true
				}
				this.$store.state.threeStep.columnList[index].checked = true
			}else {
				for(let i=0; i<this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn.length; i++) {
					this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn[i].checked = false
					this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn[i].editOnoff1 = true
					this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn[i].moreopretionToggle = false
				}
				this.$store.state.threeStep.columnList2[this.pageIndex].sonColumn[index].checked = true
			}

			const jumpItem = document.querySelectorAll('.jump')
			let jumpTop = jumpItem[index].offsetTop - 50 + 'px'
			$("html,body").animate({ scrollTop: jumpTop}, 1200, 'swing')
		},
  	addHandelClick() {
  		if(this.addmodelToggle) {
  			this.$store.commit('addmodeltoggleHandle', false)
  		}else {
  			this.$store.commit('addmodeltoggleHandle', true)
  		}
  	},
  	handleTextClick(index) {
  		// console.log(index)
  	},
  	colseNav() {
  		this.$store.state.isNavToggle = true
  		// this.$store.state.isAddModularToggle = false
  		this.$store.commit('addmodeltoggleHandle', false)
  		navBus.$emit('navToggle2', this.$store.state.isNavToggle)
  	},
  	navToggleOpen() {
  		this.$store.state.isNavToggle = false
  		navBus.$emit('navToggle2', this.$store.state.isNavToggle)
  	}
  }
}
</script>

<style lang='stylus' scoped>
@import '~styles/public.styl'
  .nav
    position: fixed
    top: 0
    left: 0
    bottom: 0
    height: 100%
    width: 220px
    background-color: #313131
    transition: all 0.3s
    .scroll-region
    	overflow: auto
    	overflow-x: hidden
    	flex: 1
    .controller
    	.controllerView-title
    		margin: 0 10px
    		button
    			width: 100%
    			&:hover
    				background: #666
    				color: #f1f2f1
    	.controllerView-ul
    		margin: 0 10px
    		h5
    			margin: 10px 0 5px
    			color: #999
    			font-size: 12px
    		ul
    			li
    				background: #555
    				padding: 0 5px
    				margin-bottom: 2px
    				border-radius: 3px
    				height: 30px
    				line-height: 30px
    				transition: all .3s
    				position: relative
    				&:hover
    					background: #464545
    				&:after
    					clear: both
    					content: ''
    					display: block
    					height: 0
    					overflow: hidden
    				.move
    					float: left
    					color: #fff
    					cursor: move
    					margin-right: 5px
    					i
    						font-size: 14px
    				.text
    					float: left
         width: 140px    
         input
           height: 22px
           width: 100% 
    					a
    						color: #fff    
    				.setUp
    					float: right
    					color: #fff
    					i
    						color: #B2B2B2
    						cursor: pointer
    						&:hover
    							color: #fff
    				.setList
    					position: absolute
    					top: 0
    					right: 0
    					transform: translateX(110%)
    					.inner
    						background: #777575
    						overflow: hidden
    						padding: 10px 15px
    						border-radius: 5px     
  				.controllerActive
  					background: #777575
  					&:hover
  						background: #777575
    		p
    			button
    				width: 100%
    				&:hover
    					background: #666
    					color: #f1f2f1
    		.marginT
    			margin-top: 20px
    .title
    	padding: 10px 10px 0
    	font-size: 24px
    	color: #fff
    	text-align: left
    	height: 50px
    	position: relative
    	.title-h
    		font-size: 18px
    		line-height: 30px
    	p
    		font-size: 12px
    		color: #999
    	.iconfont
    		position: absolute
    		right: 5px
    		top: 5px
    		font-size: 12px
    		transition: all 0.3s
    		cursor: pointer
    		color: #999
    		&:hover
    			color: #fff
    			transform: rotate(90deg)
    .list
    	.list-title
    		overflow: hidden
    		line-height: 24px
    		padding: 0 10px
    		color: #fff
    		h5
    			float: left
    			margin: 0
    			line-height: 24px
    			color: #999
    			font-size: 12px
    		p
    			float: right
    			margin: 0
    			cursor: pointer
    			color: #999
    			font-size: 12px
    			transition: all .3s
    			&:hover
    				color: #fff
    			i
    				font-size: 12px
    	.list-pages
    		position: relative
    		margin: 0 10px
    		color: #fff		
    		.el-dropdown
    			width: 100%
    			text-align: center
    			color: #fff
    			.el-dropdown-menu
    				width: 100%
    		.pages-title
    			background: #555
    			padding: 5px 7px
    			border-radius: 3px
    			cursor: pointer
    			&:hover
    				background: #6c6b6b
    			span
    				margin-left: 10px
    			.right
    				float: right
    		.pages-ul
    			position: absolute
    			left: 0 
    			top: 38px
    			background: #555
    			border-radius: 3px
    			width: 100%
    			z-index: 10
    			ul
    				margin: 0
    				padding: 0
    				h5
    					margin: 0
    					line-height: 28px
    					font-size: 14px
    					text-indent: 24px
    					cursor: pointer
    					&:hover
    						background: #999
    				.checked
    					background: #999
    	.list-ul
    		margin-top: 10px
	    	.list-h
	    		margin: 0
	    		color: #999
	    		font-size: 12px
	    		text-indent: 14px
	    	.addModular
	    		padding: 0 8px
	    		line-height: 24px
	    		span
	    			font-size: 18px
	    			vertical-align: bottom
	    			color: #999
	    		a
	    			background: $bgColor2
	    			padding: 5px 10px
	    			color: #fff
	    		button
	    			width: 110px
	    			border: none
	    			border-radius: 5px
	    			background: linear-gradient(#718521,#54701c)
	    			color: #fff
	    			text-align: left
	    			text-indent: 6px
	    			&:hover
	    				background: linear-gradient(#92ba00,#77b30c)
	    	ul
	    		margin-top: 6px
	    		padding:0 10px
	    		line-height: 24px
	    		.list-item
	    			// overflow: hidden
	    			margin-bottom: 5px
	    			&:after
	    				content: ''
	    				display: block
	    				clear: both
		    		.move
		    			float: left
		    			cursor: move
		    			margin-right: 5px
		    			position: relative
		    			input
		    				position: absolute
		    				width: 100%
		    				height: 100%
		    				visibility: hidden
		    			i
		    				font-size: 14px
		    				color: #999
		    		.textDiv
		    			float: left
			    		.text
			    			min-width: 160px
			    			float: left
			    			color: $textColor
			    			// cursor: pointer
			    			transition: all 0.3s
			    			a
			    				float: left
			    				width: 110px
			    				display: inline-block
			    				color: #fff
			    				transition: all .3s
			    				text-decoration: none
			    				border-radius:5px
			    				overflow: hidden
			    				padding: 0 5px
			    				min-height: 24px
			    				&:hover
			    					background: #000
			    					// text-indent: 8px
				    		.button
				    			width: 30%
				    			float: right
				    			transition: all 0.3s
				    			text-align: right
				    			display: flex
				    			position: relative
				    			i
				    				flex: 1
				    				padding: 0 1px
				    				color: #B2B2B2
				    				cursor: pointer
				    				&:hover
				    					color: #fff
				    			.more-operation
				    				position: absolute
				    				right: 0
				    				top: 0
				    				min-width: 120px
				    				transform: translateX(110%)
				    				background: #777575
				    				padding: 10px
				    				border-radius: 5px
				    				.more-operation-arrow
				    					position: absolute
				    					left: -6px
				    					top: 5px
				    					width: 0
				    					height: 0
				    					border-top: 7px solid transparent
				    					border-bottom: 7px solid transparent
				    					border-right: 7px solid #777575
				    				ul
				    					padding: 0
				    					margin: 0
				    					li
				    						text-align: left
				    						line-height: 24px
				    						label
				    							margin: 0
				    							font-size: 13px
				    							position:relative
				    							&:after
				    								content: ''
				    								display: block
				    								position: absolute
				    								left: 0
				    								right: 0
				    								top: 0
				    								bottom: 0
				    								background: rgba(255, 255, 255, 0.1)
				    							input
				    								margin: 0 5px
				    								vertical-align: middle

			    			.checked
			    				background: linear-gradient(#ffeb12, #ffbe21)
			    				border-radius:5px
			    				color: #000
			    				font-weight: 600
			    				&:hover
			    					background: linear-gradient(#ffeb12, #ffbe21)
			    		.editInput	
			    			display: block
			    			overflow: hidden
			    			width: 100%	
				    		input
				    			border: 1px solid
				    			margin-right: 5px
				    			float: left
				    			width: 140px
				    			background: rgba(0, 0, 0, 0.7)
				    			border-color: #333 #000 #444
				    			border-radius: 3px
				    			overflow: hidden 
				    			text-indent: 8px
				    			color: #fff
					    		.edit 
					    			height: 30px
					    			line-height: 30px
					    			font-size: 16px
					    			padding: 0 10px
					    			width: 150px
					    	i
					    		float: right
					    		color: #96bd13
					    		font-size: 18px
					    		font-weight: bold
					    		cursor: pointer
					    		transition: all .3s
					    		&:hover
					    			color: #fff
			    		.btnThree
			    			width: 120px
			    			float: left
			    		.buttonActive
			    			display: block
			    			opacity: 1
			    		.textActive
			    			background: $bgColorGray
			    			border-radius: 5px
			    			&:hover
			    				background: $bgColorGray
			    				border-radius: 5px
	  .addlink
	  	padding-left: 10px
	  	margin-top: 15px
	  	.addlink-title
	  		color: #999
	  		font-size: 12px
	  	.addlink-btn
	  		span
	  			font-size: 18px
	  			color: #999
	  		button
	  			width: 110px
	  			border: none
	  			background: none
	  			color: #fff
	  			text-align: left
	  			text-indent: 6px
	  			border-radius: 5px
	  			line-height: 26px
	  			&:hover
	  				background: linear-gradient(#92ba00,#77b30c)
	  	.addlink-ul
	  		margin-top: 5px
	  		&:after
	  			content: ''
	  			display: block
	  			clear: both
	  		ul
	  			margin: 0
	  			li
	  				position: relative
	  				margin-bottom: 5px
	  				display: flex
	  				&:after
	  					content: ''
	  					display: block
	  					clear: both
	  				.move
	  					margin-right: 5px
	  					position: relative
	  					float: left
	  					line-height: 24px
	  					input
	  						position: absolute
	  						width: 100%
	  						height: 100%
	  						visibility: hidden
	  					i
	  						color: #999
	  						font-size: 14px
	  						cursor: move
	  				.text-wrap
	  					float: left
	  					a
	  						width: 140px
	  						display: inline-block
	  						padding: 0 5px
	  						font-size: 14px
	  						text-decoration: none
	  						border-radius: 3px
	  						color: #fff
	  						line-height: 24px
	  						transition: all .3s
	  						&:hover
	  							background: #000
	  					input
	  						width: 140px
	  						height: 24px
	  						background: #000
	  						border: 1px solid
	  						border-color: #333 #000 #444
	  						border-radius: 3px
	  						color: #fff
	  						text-indent: 5px
	  				.set-up
	  					float: left
	  					display: flex
	  					i
	  						margin: 0 0 0 5px
	  						color: #B2B2B2
	  						font-size: 14px
	  						cursor: pointer
	  						display: inline-block
	  						line-height: 24px
	  						&:hover
	  							color: #fff
	  				.set-list
	  					position: absolute
	  					top: 0
	  					right: 0
	  					transform: translateX(104%)
	  					background: #000
	  					border-radius: 5px
	  					padding: 0 10px
	  					.arrow
	  						position: absolute
	  						left: 0
	  						top: 4px
	  						transform: translateX(-100%)
	  						border-top: 6px solid transparent
	  						border-bottom: 6px solid transparent
	  						border-right: 6px solid #000
	  					h4
	  						color: #fff
	  						font-size: 12px
	  						i
	  							margin-right: 5px
	  							font-size: 12px
	  					input
	  						width: 100%
	  						height: 24px
	  						background: #2f2f2f
	  						border: 1px solid #555
	  						border-radius: 5px
	  						color: #fff
	  						text-indent: 10px
	  						font-size: 12px
	  						&:active
	  							border-color: green
	  					label
	  						position: relative
	  						color: #fff
	  						font-size: 12px
	  						line-height: 24px
	  						&:after
	  							background: rgba(255, 255, 255, .1)
	  							content: ''
	  							display: block
	  							position: absolute
	  							width: 100%
	  							height: 100%
	  							top: 0
	  							left: 0
	  						input
	  							width: auto
	  							height: auto
	  							margin: 0
	  							vertical-align: middle
	  						span
	  							vertical-align: middle
	  							font-weight: normal
	  							font-size: 12px
	  							
	  .funcList
	  	overflow: hidden
	  	margin-top: 5px
	  	.list-h
	  		color: $textColor
	  		text-indent: 14px
	  		margin:0
	  	.seniorBtn
	  		padding: 0 10px
	  		margin-top:16px
	  		a
	  			background: #5b5b5b
	  			border-radius: 5px
	  			padding: 4px 0
	  			width: 95px
	  			margin-right: 10px
	  			margin-bottom: 10px
	  			float: left
	  			line-height: 34px
	  			text-align: center
	  			color: white
	  			transition:all .5s
	  			background-size:cover
	  			position: relative
	  			&:nth-of-type(even)
	  				margin-right: 0
	  			&:hover
	  				background: #9d9a9a
	  				text-decoration:none
	  			&:nth-child(1)
	  				&:hover
	  					background: linear-gradient(#5282e7, #815bf7)
	  			&:nth-child(2)
	  				&:hover
	  					background: linear-gradient(#ff9638, #fe6a7d)
	  			&:nth-child(3)
	  				&:hover
	  					background: linear-gradient(#26eda3, #0fbed9) 
	  			&:nth-child(4)
	  				&:hover
	  					background: url('../../../assets/images/nav/bg5.png') 0 0 repeat-x  
	  			i
	  				color: white
	  				font-size: 16px
	  				vertical-align: middle
	  				margin-right: 3px
	  			.small
	  				font-size: 14px
	  			.big
	  				font-size: 24px
	  				margin-right: 0
	  			input
	  				display: block
	  				width: 100%
	  				height: 100%
	  				position: absolute
	  				visibility: hidden
		.head-tab
			margin-top: 11px
			padding-left: 10px
			p
				margin-bottom: 8px
				color: #999
				font-size: 12px
			ul
				li
					display: flex
					margin: 10px 0
					button
						width: 110px
						border-radius: 5px
						padding: 3px 8px
						font-size: 13px
						transition: all .3s
						&:hover
							background: #666
							color: #fff
					span
						width: 70px
						text-align: right
						color: #fff
						font-size: 13px
						line-height: 26px
					select
						width: 110px
						height: 26px
						border: none
						line-height: 26px
						font-size: 12px
						border-radius: 3px
						&:active
							border: 1px solid $bgColor
						option
							text-align: center
		.phoneorpc
			position: absolute
			left: 0
			bottom: 10px
			right: 0
			padding: 0 10px
			.pps-t
				.tablist
					background: #121010
					display: inline-block
					i
						display: inline-block
						width: 25px
						height: 25px
						text-align: center
						color: #f1f2f1
						cursor: pointer
						&:first-child
							background: #666
							border-radius: 3px
				.defaultclass
					i
						&:first-child
							background: none
						&:last-child
							background: #666
							border-radius: 3px
				.tab-description
					display: inline-block
					span
						font-size: 13px
						color: #f1f2f1
	div.active
		transform:translateX(-220px) 
	.navWrapper
		position: relative
		z-index: 1800
		.nav-open
			width: 36px
			height: 36px
			position: fixed
			font-size: 30px
			background: $addbtnbg
			padding: 0
			top: 50px
			left: 0px
			transition: all 0.2s
			opacity: 0 
			text-align: center
			line-height: 36px
			color: #747474
			cursor: pointer
			&:hover
				color: #fff
		.openActive
			left: 0
			opacity: 1
			z-index: 10
.nav-main
	position: relative
	z-index: 10000000
	background: #313131
	height: 100%
	display: flex
	flex-direction: column
.nav
  .controller
    .controllerView-ul
      ul
        li
          .setList
            .arrow
              position: absolute
              width: 0
              height: 0
              border-top: 7px solid transparent
              border-bottom: 7px solid transparent
              border-right: 7px solid #777575
              top:7px
              left: -6px
            .inner
              p
                margin: 0
                color: #fff
                font-size: 14px
                a
                  color: #fff
                  font-size: 12px
                  padding-left: 5px
.list-complete-item 
	transition: all 1s
.list-complete-enter, list-complete-active 
	opacity: 0
	height: 0
	margin-top: 0
	padding: 0
	border: solid 0px
.list-complete-sortable-chosen,.list-complete-sortable-ghost
	opacity: 0
	height: 0
	margin-top: 0
	padding: 0
	border: solid 0                  
                  
</style>
