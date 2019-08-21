<template>
<div class="textEditorbox">
	<div class="textEditor" :class="{ phoneClass: phoneclassToggle }">
		<div class="textEditor-title">
			<i class="iconfont" @click="callback('0')">&#xe625;</i>
		</div>
		<div class="textEditor-body" v-if="allEditToggle">
			<h2>
				部门：<input type="text" v-model="contenter.title">
			</h2>
			<h4>
				职位：<input type="text" v-model="contenter.titleFn">
			</h4>
			<p>职位需求：</p>
			<div class="area">
				<!-- <p v-html="contenter.past"></p> -->
				<fn-editor :content="contenter.past"></fn-editor>
			</div>
		</div>
		<div class="textEditor-body" v-else>
			<h2>
				部门： <span v-html="contenter.title"></span>
			</h2>
			<h4>
				职位： <span v-html="contenter.titleFn"></span>
			</h4>
			<div class="area" style="border: none">
				<p><span>招聘需求：</span></p>
				<p v-html="contenter.past"></p>
			</div>
		</div>
		<div class="textEditor-btn" v-if="allEditToggle">
			<button class="btn btn-default" @click="callback('1')">确定</button>
			<!-- <button class="btn btn-default" @click="callback('cancel')">取消</button> -->
		</div>
	</div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import FnEditor from '@/common/Editor'
export default {
	props: ['content'],
	components: {
		FnEditor
	},
	data() {
		return {
			phoneclassToggle: false,
			contenter: this.content
		}
	},
	computed: {
		...mapState({
			allEditToggle: state => state.allEditToggle,
			browserToggle: state => state.browserToggle
		})
	},
	mounted() {
    if(!this.browserToggle) {
      this.phoneclassToggle = true
    }else {
    	this.phoneclassToggle = false
    }
	},
	methods: {
		editorHandel(index, val) {
			// this.contenter.past[index] = val
			// console.log(this.contenter)
			// this.contenter.past = val
		},
		callback(val, index) {
			if(val == '0') {
				this.$emit('callback', ['0', false])
			}else if(val == '1') {
				this.$emit('callback', ['1', index])
			}else if(val == '2') {
				this.$emit('callback', ['2', true])
			}
			
		},
		deleteHandel(index) {
			this.contenter.past.splice(index, 1)
		},
		addHandel() {
			let obj = this.contenter.past[this.contenter.past.length-1]
			this.contenter.past.push(obj)
		}
	}
}
</script>

<style lang="stylus" scoped>

.textEditorbox
	position: fixed
	left: 0
	right: 0
	top: 0
	bottom: 0
	width: 100%
	height: 100%
	background: rgba(0, 0, 0, 0.5)
	z-index: 1000000
	.textEditor
		position: absolute
		left: 50%
		top: 50%
		background: #fff
		transform: translate(-50%, -50%)
		min-width: 740px
		.textEditor-btn
			padding: 10px 0
			text-align: center
		.textEditor-title
			background: #f1f2f1
			height: 50px
			line-height: 50px
			i
				float: right
				margin-right: 20px
				font-size: 22px
				cursor: pointer
		.textEditor-body
			padding: 20px
			h2
				font-size: 20px
				input
					line-height: 28px
					font-size: 14px
					text-indent: 14px
					border: none
					box-shadow: 0 0 5px #ccc inset
			h4
				font-size: 20px
				input
					border: none
					box-shadow: 0 0 5px #ccc inset
					line-height: 28px
					font-size: 14px
					text-indent: 14px
			p
				font-size: 18px
			.area
				width: 100%
				height: 300px
				border: 2px solid #666
				padding: 5px
				>>> .quill-editor
					border: none
					height: 100%
				textarea
					width: 100%
					height: 100%
					border: none
			ul
				padding-left: 15px
				li
					margin-bottom: 10px
					line-height: 24px
					input
						border: none
						box-shadow: 0 0 5px #ccc inset
						width: 90%
						line-height: 32px
						text-indent: 14px
						font-size: 14px
					i
						font-size: 16px
						font-weight: bold
						cursor: pointer
	.phoneClass
		min-width: auto
		left: 10%
		right: 10%
		top: 50%
		transform: translate(0, -50%)
</style>