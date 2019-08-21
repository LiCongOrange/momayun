<template>
<div class="box">
	<div class="b_center">
		<div class="b_center_top">
			<div class="top_left">
				<img src="">
			</div>
			<div class="top_right" v-for="item in jiadata">
				<div class="webtitle">{{item.title}}</div>
				<div class="webtype">{{item.type}}</div>
				<div class="weburl">{{item.url}}</div>
				<button @click="jumpweb">管理内容</button>
			</div>
		</div>
		<div class="webseetitle"><img src="@/assets/images/login/data.png">网站概况</div>
		<div class="b_center_chart">
			
			<div class="seenumber">浏览次数：</div>
			<div id="myChart" :style="{width: '100%', height: '300px'}"></div>
		</div>
	</div>
</div>
</template>

<script>
import navBus from '@/assets/js/navBus'
import IndexHeader from '@/common/Header'
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')


export default {
	
	components: {
		IndexHeader
	},
	data() {
		return {
			jiadata:[{
				title:"北京XXXXX信息技术有限公司",
				type:"教育培训/好学教育",
				url:"http://momayun.cn"
			}]
		}
	},
	methods: {
		jumpweb(){
			window.location.href = '/index/index/center?'+ 2
		},
		drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        // title: { text: '网站浏览量' },
        tooltip: {
        	trigger: 'axis',
	        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
	            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
	        }
        },
        xAxis: {
          data: ["0点", "1点", "2点", "3点", "4点", "5点", "6点", "7点", "8点", "9点", "10点", "11点", "12点", "13点", "14点", "15点", "16点", "17点", "18点", "19点", "20点", "21点", "22点", "23点"],
          type:'category',
          // dataMax:'23点'
        },
        yAxis: {
        	 minInterval: 1
        },
        series: [{
          name: '访问量',
          type: 'line',
          data: [5, 20, 36, 10, 80,5, 200, 36, 10, 10,5, 20, 36, 10, 10,5, 20, 36, 10,5, 20, 36, 10,10],
          itemStyle:{
          	normal:{
          		lineStyle:{
          			color:'#00AD6B'
          		}
          	}
          }
        }]
      })
    }
	},
	mounted(){
		this.drawLine()
	}
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.box
	background:white
	position:absolute
	top:0
	left:0
	right:0
	bottom:0
	padding-top:50px
	.b_center
		width:1200px
		margin:0 auto
		height:auto
		overflow:hidden
		padding:10px
		padding-bottom:30px
		.b_center_top
			width:98%
			margin:0 auto
			padding:20px
			background:white
			box-shadow:0 4px 20px #eee
			overflow:hidden
			.top_left
				float:left
				width:130px
				height:130px
				background:#F39B77 
				margin-right:20px
			.top_right
				float:left
				.webtitle
					color:#333
					font-size:20px
					line-height:30px
					margin-bottom:10px
				.weburl
					font-size:20px
					color:#666
				button
					display:block
					outline:none
					width:80px
					height:30px
					border-radius:15px
					background:#00AD6B
					border:none
					color:white
					margin-top:10px
		.webseetitle
				font-size:24px
				color:#666
				margin:30px 0
				img
					display:inline-block
					margin-right:10px
		.b_center_chart
			width:100%
			padding:10px
			height:auto
			box-shadow:0 4px 20px #eee
			.seenumber
				font-size:20px
				color:#666
</style>