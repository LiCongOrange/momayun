<template>
  <div class="product" ref="product7" :class="modelInfo.bgClass">
    <fn-assembly 
      :btnChoice="btnChoice"
      :zLetter="zLetter" 
      :zLayout="zLayout"
      :zBg="zBg"
      :bgColorNum="bgColorNum"
      @getDataBg="getDataBg"
      @getDataLayout="getDataLayout"
      v-if="allEditToggle"
    ></fn-assembly>
    <div class="container" :class="{ width96: allEditToggle }">
      <div class="title">
        <h3 v-if="allEditToggle" @click="getIndex('t')" :style="{ opacity: opacityNum }">
          <fn-editor :content="modelInfo.modularName" :type1="3" :type2="1" :lmid="pid"></fn-editor>
        </h3>
        <h3 v-else v-html="modelInfo.modularName" :class="{animated: isanimated1, bounceInUp: isfade1}"></h3>
      </div>
      <div class="row">

        <draggable v-model="modelInfo.productList" :options="{animation: 300, handle: '.list-complete-item'}" v-if="allEditToggle">
          <transition-group name="list-complete" tag="ul">
            <li 
              class="col-md-3 col-sm-6 col-xs-12" 
              v-for="(ite, index) in modelInfo.productList"
              :key="ite.pid"
              :class="modelInfo.layoutClass"
              @click="quTu(index, ite.picurl, ite.pid)"
            >
              <div class="mask" v-if="maskToggle"></div>
              <div class="btnList">
                <div class="inner">
                  <button 
                    type="button"
                    class="iconfont btn btn-default" 
                    title="删除？"
                    @click="deleteLi(index, ite.pid)"
                  >&#xe6e9;</button>
                  <button 
                    class="iconfont btn btn-default list-complete-item"
                    @mousedown="moveHandel('01')"
                    @mouseup="moveHandel('02')"
                    @mouseout="moveHandel('02')"
                    title="排序请拖动" 
                    :key="index"
                  >&#xe653;</button>
                </div>
              </div>
              <div class="imgWrap" :style="{ opacity: opacityNum }">
                <img :src="ite.picurl">
                <up-img
                  v-if="allEditToggle"
                  :postImg="textImg"
                  :widthNum="widthNum"
                  :heightNum="heightNum"
                  @getImg="getImg"
                ></up-img>
              </div>
              <div class="text" :style="{ opacity: opacityNum }">
                <h6 @click="getIndex(index, 't1')">
                  <fn-editor :content="ite.title" :type1="3" :type2="3" :lmid="pid" :sonid="ite.pid"></fn-editor>
                </h6> 
                <p @click="getIndex(index, 'c1')">
                  <fn-editor :content="ite.past" :type1="3" :type2="5" :lmid="pid" :sonid="ite.pid"></fn-editor>
                </p>
              </div>
            </li>
          </transition-group>
        </draggable>

        <ul v-else>
          <li 
            class="col-md-3 col-sm-6 col-xs-12"
            v-for="item in modelInfo.productList"
            :class="modelInfo.layoutClass"
          >
            <div class="imgWrap" :class="{animated: isanimated2, fadeInLeft: isfade2}"><img :src="item.picurl"></div>
            <div class="text" :class="{animated: isanimated2, fadeInRight: isfade2}">
              <h6 v-html="item.title"></h6>
              <p v-html="item.past"></p>
            </div>
          </li>
        </ul>
      </div>
      <div class="addList" v-if="allEditToggle">
        <span @click="addListHandel">添加产品</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import upImg from '@/common/UpImg'
import FnAssembly from '@/common/Assembly'
import FnEditor from '@/common/Editor'
import draggable from 'vuedraggable'
export default {
  props: ['pid'],
  data() {
    return {
      isanimated1: false,
      isfade1: false,
      isanimated2: false,
      isfade2: false,
      opacityNum: 0,
      cid: '',
      imgList: [],
      maskToggle: false,
      widthNum: '420',
      heightNum: '300',
      suoyin: '',
      textImg: '',
      btnChoice: 0,
      modelInfo: '',
      indexes: '',
      indexes2: '',
      zBg: ["bgOne", "bgTwo", "bgThree"],
      zLetter: 'A',
      layoutNum: 0,
      classLayout: '',
      classBg: '',
      bgColorNum: '',
      zLayout: [{
        "letter": "A",
        "name": "layout1"
      }, {
        "letter": "B",
        "name": "layout3"
      }, {
        "letter": "C",
        "name": "layout2"
      }],
    }
  },
  components: {
    FnAssembly,
    FnEditor,
    upImg,
    draggable
  },
  computed: {
    ...mapState({
      allEditToggle: state => state.allEditToggle,
      browserToggle: state => state.browserToggle
    })
  },
  mounted() {
    // this.$dragging.$on('dragged', ({value}) => {
    //     // console.log(value.item)
    //     // console.log(value.list)
    //     // console.log(value.group)
    //     this.modelInfo.productList = value.list
    //     for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
    //       if(this.$store.state.stepPages.product[i].lmid == this.pid) {
    //         this.$store.state.stepPages.product[i].productList = value.list
    //       }
    //     }
    // })
    $(function() {$("[data-toggle='tooltip']").tooltip()})
    for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
      if(this.$store.state.stepPages.product[i].lmid == this.pid) {
        this.modelInfo = this.$store.state.stepPages.product[i]
        this.classLayout = this.$store.state.stepPages.product[i].layoutClass
      }
    }
    if(!this.browserToggle) {
      this.modelInfo.layoutClass = 'phoneclass'
    }
    this.$nextTick(function(){
      this.handleScroll()
    })
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if(this.allEditToggle) {
        this.opacityNum = 1
      }else {
        let htmlT = this.$refs.product7.getBoundingClientRect().top
        if(htmlT <= 560) {
          this.isanimated1 = true
          this.isfade1 = true
        }
        if(htmlT <= 450) {
          this.isanimated2 = true
          this.isfade2 = true
        }
      }

    },
    addListHandel() {
      let obj = {
        "title": "新加产品",
        "past": "我们的使命是解决各种行业的重要问题以及建立社会信任。这是我们在提供专业服务及作出商业决定时的重中之重。",
        "nameFn": "",
        "picurl": "/static/images/product/shows/pro01.jpg"
      }
      for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
        if(this.$store.state.stepPages.product[i].lmid == this.pid) {
          // this.$store.state.stepPages.product[i].productList.push(obj)
          this.$axios({
            method: 'post',
            url: '/api/Senior/newcmessage',
            data: {
              wid: this.$store.state.threeStep.siteId,
              type: 3,
              text: obj,
              lmid: this.pid
            }
          }).then((res)=> {
            if(res.data.code == '200') {
              let obj = {
                pid: res.data.data,
                title: '新加产品',
                nameFn: '',
                past: '我们的使命是解决各种行业的重要问题以及建立社会信任。这是我们在提供专业服务及作出商业决定时的重中之重。',
                picurl: '/static/images/product/shows/pro01.jpg'
              }
              this.$store.state.stepPages.product[i].productList.push(obj)
            }
            if(res.data.code == '404') {
              alert(res.data.msg)
            }
          })
        }
      }
    },
    moveHandel(type) {
      if(type == '01') {
        this.maskToggle = true
      }else {
        this.maskToggle = false
      }
    },
    deleteLi(index, pid) {
      this.$axios({
        method: 'post',
        url: '/api/Senior/delmessage',
        data: {
          id: pid,
          type: 3
        }
      }).then((res)=> {
        if(res.data.code == '200') {
          this.modelInfo.productList.splice(index, 1)
        }else {
          alert(res.data.msg)
        }
      })
    },
    quTu(index, img, pid) {
      this.suoyin = index
      this.textImg = img
      this.cid = pid
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
          this.modelInfo.productList[this.suoyin].picurl = res.data.data[0].url
          this.$axios({
            method: 'post',
            url: '/api/Senior/savemessage',
            data: {
              id: this.cid,
              type: 3,
              text: this.modelInfo.productList[this.suoyin]
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
    fnEdit(val) {
      for(let i=0; i<this.$store.state.stepPages.product.length; i++) {
        if(this.$store.state.stepPages.product[i].lmid == this.pid) {
          if(this.indexes == 't') {
            this.$store.state.stepPages.product[i].modularName = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemodule',
              data: {
                site_id: this.$store.state.threeStep.siteId,
                lmid: this.pid,
                type: 3,
                module: this.modelInfo
              }
            }).then((res)=> {
              if(res.data.code == '404') {
                alert(res.data.msg)
              }
            })
          }else if(this.indexes2 == 't1') {
            this.$store.state.stepPages.product[i].productList[this.indexes].title = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemessage',
              data: {
                id: this.cid,
                type: 3,
                text: {
                  title: this.$store.state.stepPages.product[i].productList[this.indexes].title,
                  past: this.$store.state.stepPages.product[i].productList[this.indexes].past,
                  nameFn: '',
                  picurl: this.$store.state.stepPages.product[i].productList[this.indexes].picurl,
                }
              }
            }).then((res)=> {
              if(res.data.code == '404') {
                alert(res.data.msg)
              }
            })
          }else if(this.indexes2 == 'c1') {
            this.$store.state.stepPages.product[i].productList[this.indexes].past = val
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemessage',
              data: {
                id: this.cid,
                type: 3,
                text: {
                  title: this.$store.state.stepPages.product[i].productList[this.indexes].title,
                  past: this.$store.state.stepPages.product[i].productList[this.indexes].past,
                  nameFn: '',
                  picurl: this.$store.state.stepPages.product[i].productList[this.indexes].picurl,
                }
              }
            }).then((res)=> {
              if(res.data.code == '404') {
                alert(res.data.msg)
              }
            })
          }
        }
      }
      // console.log(this.$store.state.stepPages.product)
    },
    getIndex(index, index2) {
      this.indexes = index
      this.indexes2 = index2
    },
    getDataBg(data) {
        this.modelInfo.bgClass = data
        this.$axios({
          method: 'post',
          url: '/api/Senior/savemodule',
          data: {
            site_id: this.$store.state.threeStep.siteId,
            lmid: this.pid,
            type: 3,
            module: this.modelInfo
          }
        }).then((res)=> {
          if(res.data.code == '404') {
            alert(res.data.msg)
          }
        })
    },
    getDataLayout(data) {
      this.zLetter = data[1]
      this.modelInfo.layoutClass = data[0]
      this.$axios({
        method: 'post',
        url: '/api/Senior/savemodule',
        data: {
          site_id: this.$store.state.threeStep.siteId,
          lmid: this.pid,
          type: 3,
          module: this.modelInfo
        }
      }).then((res)=> {
        if(res.data.code == '404') {
          alert(res.data.msg)
        }
      }) 
    }
  },
  watch: {
    classLayout(val) {
      if(val == "layout1") {
        this.zLetter = "A"
      }else if(val == "layout2") {
        this.zLetter = "C"
      }else if(val == "layout3") {
        this.zLetter = "B"
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
.product
  position: relative
  padding: 30px 0
  &:hover
    .container
      .addList
        opacity: 1
  .title
    margin-bottom: $marginb
    h3
      font-size: $fontsize1 
      opacity: 0
      >>> .ql-editor
        padding: 0
        font-size: $fontsize1
    .animated
      opacity: 1
  .container
    .addList
      padding: 5px 0
      text-align: center
      opacity: 0
      transition: all .3s
      span
        background: $addbtnbg
        padding: $addbtnpadding
        border-radius: $addbtnradius
        color: #fff
        cursor: pointer
        font-size: $addbtnfontsize
    li
      position: relative
      &:hover
        .btnList
          opacity: 1
      .mask
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        background: rgba(255, 255, 255, 0)
        z-index: 10
      .btnList
        position: absolute
        top: 0
        right: 0
        z-index: 10
        opacity: 0
        transition: all .3s
        button
          display: block
          background: $iconbg
          padding: 0
          width: $iconwidth
          height: $iconheight
          border: none
          border-radius: $iconradius
          margin-bottom: 5px
          color: $iconcolor
          font-size: $iconfontsize
          &:nth-of-type(2)
            cursor: move
            display: $display
      img
        width: 100%
      h6
        font-size: $fontsize3
        font-weight: 500
        >>> .ql-editor
          padding: 0
          font-size: $fontsize3
      p
        font-size: $fontsize5
        >>> .ql-editor
          padding: 0
          font-size: $fontsize5
      .imgWrap
        position: relative
        opacity: 0
      .text
        opacity: 0
    .layout1
      width: 50%
      margin-bottom:30px
      .text
        border:1px solid #ccc
        margin-top:20px
        padding:10px
        height:150px
        margin-bottom:30p
    .layout2
      float: left
      width: 33.3%
      overflow: hidden
      margin-bottom: 30px
      img
        width: 100%
    .layout3
      width:20%
      margin-bottom:30px
      .text
        width:100%
        // overflow:hidden
    .phoneclass
      padding: 10px
    .animated
      opacity: 1
  .width96
    width: 96%
    max-width: 1170px
.bgOne
  background: $modelBg02
.bgTwo
  background: $modelBg03
  .title
    h3
      color: $textColor
  .container
    color: $textColor
    .row
      color: #fff
      .text
        color: $textColor
        h3
          color: $textColor
        p
          color: $textColor
.bgThree
  background: $modelBg01
.fade-enter-active, .fade-leave-active
  transition: opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0
.list-complete-item
  transition: all 1s
.list-complete-enter, .list-complete-active
  opacity: 0
  height: 0
  margin-top: 0
  padding: 0
  border: solid 0
.list-complete-sortable-chosen, .list-complete-sortable-ghost
  opacity: 0
  height: 0
  margin-top: 0
  padding: 0
  border: solid 0
</style>