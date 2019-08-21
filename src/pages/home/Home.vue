<template>
  <div class="zContainer" ref="zContainer" v-if="reloadToggle">
    <home-nav v-if="pageToggle2"></home-nav>
    <edit-section v-if="pageToggle2"></edit-section>
    <tooltip-dialog></tooltip-dialog>


    <el-dialog
      title="编辑按钮样式"
      :visible.sync="dialogVisibleBtn"
      width="80%"
      :before-close="handleClose">
      <edit-btn></edit-btn>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose('01')">取 消</el-button>
        <el-button type="primary" @click="handleClose('02')">保 存</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import ImgLayer from '@/common/Imglayer'
import HomeNav from './components/Nav'
import EditSection from './components/EditSection'
import TooltipDialog from '@/common/TooltipDialog'
import EditBtn from '@/common/EditBtn'
export default {
  components: {
    HomeNav,
    EditSection,
    TooltipDialog,
    ImgLayer,
    EditBtn
  },
  data () {
  	return {
      pageToggle2: false,
  		isActive: false,
      modelInfo: ''
  	}
  },
  computed: {
    ...mapState({
      dialogVisibleBtnData: state => state.dialogVisibleBtnData,
      dialogVisibleBtn: state => state.dialogVisibleBtn,
      dialogImgup: state => state.dialogImgup,
      reloadToggle: state => state.reloadToggle,
      pageToggle: state => state.pageToggle,
      setData: state => state.content,
      datalist: state=> state.content.datalist,
      modelText: state => state.common,
      stepPages: state => state.stepPages,
      siteId: state => state.threeStep.siteId,
      bannerimg: state => state.stepPages.bannerList
    })
  },
  mounted() {
    // this.$store.state.threeStep.columnList = []
    // this.$store.state.threeStep.columnList2 = []
    // this.$axios({
    //   method: 'get',
    //   url: '/home/passport/islogin'
    // }).then((res)=> {
    //   if(res.data.code == '404') {
    //     this.$message({
    //       type: 'error',
    //       message: res.data.msg
    //     })
    //     window.location.href = '/index/index/dllogin'
    //   }else {
    //     this.$store.state.isNavToggle = false
    //     this.$store.commit('allEditOpen', true)
    //     this.getSiteinfo()
    //   }
    // })

     this.$store.state.isNavToggle = false          // 测试专用
     this.$store.commit('allEditOpen', true)        // 测试专用
     this.getSiteinfo()                             // 测试专用
    $('.zContainer').animate({scrollTop:'0'},500)
  },
  methods: {
    handleClose(type) {
      if(type === '01') {
        this.$store.commit('dialogVisibleHandle', false)
      }else if(type === '02') {
        if(this.dialogVisibleBtnData.pageType == 0) {
          for(let i=0; i<this.stepPages.head.length; i++) {
            if(this.stepPages.head[i].lmid == this.dialogVisibleBtnData.pid) {
              this.modelInfo = this.stepPages.head[i]
            }
          }
          this.$axios({
            method: 'post',
            url: '/api/Senior/savemodule',
            data: {
              site_id: this.siteId,
              type: 'head',
              module: this.modelInfo
            }
          }).then((res)=> {
            if(res.data.code == '200') {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              this.$store.commit('dialogVisibleHandle', false)
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
        this.$store.commit('dialogVisibleHandle', false)
      }
    },
  	navToggle(data) {
  		this.isActive = data
  	},
  	openNav() {
  		this.isActive = false
  	},
    getSiteinfo() {
      // let urlSearch = window.location.search
      // let allurl = urlSearch.split("?")[1]
      // this.$store.commit('siteidHandel', allurl)
      // this.$axios({
      //   method: 'get',
      //   url: '/api/showsite/siteinfo',
      //   params: {
      //     site_id: this.siteId
      //   }
      // }).then(this.getSiteinfoSucc)

       this.$axios({      // 测试专用
         method: 'get', 
         url: '/api/showsite.json'
       }).then(this.getSiteinfoSucc)
    },
    getSiteinfoSucc(res) {
      if(res.data.code == '200') {
        this.$store.commit('siteidHandel', res.data.data.site_id)
        if(res.data.data.pageToggle == 'true') {
          let obj = res.data.data.columnList
          for(let i=0; i<obj.length; i++) {
            obj[i].checked = false
          }
          obj[1].checked = true
          this.$store.commit('pageToggleHandel', true)
          this.$store.commit('columnListHandel', obj)
        }else {
          let obj = res.data.data.columnList
          for(let i=0; i<obj.length; i++) {
            obj[i].checked = false
            if(obj[i].sonColumn) {
              if(obj[i].sonColumn.length >= 1) {
                for(let j=0; j<obj[i].sonColumn.length; j++) {
                  obj[i].sonColumn[j].checked = false
                }
                obj[i].sonColumn[0].checked = true
              }
            }

          }
          obj[1].checked = true
          this.$store.commit('pageToggleHandel', false)
          this.$store.commit('columnListHandel2', obj)
        }
        if(res.data.data.columnList[0].indexes == '0') {
          this.$store.commit('headlayoutHandel', 'A')
        }else if(res.data.data.columnList[0].indexes == '1') {
          this.$store.commit('headlayoutHandel', 'B')
        }else if(res.data.data.columnList[0].indexes == '2') {
          this.$store.commit('headlayoutHandel', 'C')
        }

        this.$store.commit('headfontcolorHandel', res.data.data.websites.headfontcolor)
        this.$store.state.threeStep.companyName = res.data.data.websites.companyName
        this.$store.state.threeStep.siteName = res.data.data.websites.siteName
        this.$store.state.threeStep.yhid = res.data.data.websites.yhid
        if(res.data.data.headerText) {
          this.$store.commit('All_Head', res.data.data.headerText)
        }
        if(res.data.data.bannerText) {
          this.$store.commit('All_Banner', res.data.data.bannerText)
        }
        if(res.data.data.productText) {
          this.$store.commit('All_Product', res.data.data.productText)
        }
        if(res.data.data.newText) {
          this.$store.commit('All_Article', res.data.data.newText)
        }
        if(res.data.data.teamText) {
          this.$store.commit('All_Single', res.data.data.teamText)
        }
        if(res.data.data.recruitText) {
          this.$store.commit('All_Recruit', res.data.data.recruitText)
        }
        if(res.data.data.atlasText) {
          this.$store.commit('All_Atlas', res.data.data.atlasText)
        }
        if(res.data.data.contactText) {
          this.$store.commit('All_Contact', res.data.data.contactText)
        }
        if(res.data.data.footText) {
          this.$store.commit('All_Footer', res.data.data.footText)
        }
        for(let i=0; i<this.stepPages.head.length; i++) {
          this.stepPages.head[i].wsname = res.data.data.websites.wsname
          this.stepPages.head[i].picurl = res.data.data.websites.logo
          this.stepPages.head[i].paddingNum = res.data.data.websites.headspace
          this.stepPages.head[i].fontSize = res.data.data.websites.headfont
          this.stepPages.head[i].bgColor = res.data.data.websites.headbg
          this.stepPages.head[i].fontColor = res.data.data.websites.headfontcolor
          this.stepPages.head[i].bgImg = res.data.data.websites.headbgimg
        }
        for(let i=0; i<this.stepPages.contact.length; i++) {
          if(this.stepPages.contact[i].classList) {
            for(let j=0; j<this.stepPages.contact[i].classList.length; j++) {
              if(this.stepPages.contact[i].classList[j].name == '地址') {
                this.stepPages.contact[i].classList[j].val = res.data.data.websites.address
              }else if(this.stepPages.contact[i].classList[j].name == '电话') {
                this.stepPages.contact[i].classList[j].val = res.data.data.websites.telephone
              }else if(this.stepPages.contact[i].classList[j].name == '邮箱') {
                this.stepPages.contact[i].classList[j].val = res.data.data.websites.email
              }else if(this.stepPages.contact[i].classList[j].name == 'QQ') {
                this.stepPages.contact[i].classList[j].val = res.data.data.websites.penguin
              }else if(this.stepPages.contact[i].classList[j].name == '微信') {
                this.stepPages.contact[i].classList[j].val = res.data.data.websites.wechat
              }
            }
          }
        }
        this.pageToggle2 = true
        this.$axios({
          // method: 'get',
          // url: '/api/bannerimg.json'
          method: 'post',
          url: '/api/Infordatabase/bannerimg',
          data: {
            hangye: res.data.data.websites.yhid
          }
        }).then((res)=> {
          if(res.data.code == '200') {
            this.$store.state.stepPages.bannerList2 = res.data.data
            for(let i=0; i<res.data.data.length; i++) {
              let url = res.data.data[i].picurl
              if(this.$store.state.stepPages.bannerList.length<=2) {
                this.$store.state.stepPages.bannerList.push(url)
              }
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.zContainer
  overflow-x: hidden
  overflow-y: hidden
  background: #333
</style>
