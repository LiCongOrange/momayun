<template>
  <div class="model" id="model" :class="{ paved : this.$store.state.isNavToggle }">
    <div class="moveWrap" v-if="pageToggle2 == 'A'">
      <keep-alive>
        <transition-group name="list" tag="ul" v-if="pageToggle">
          <li 
            v-for="(item, index) in columnList" 
            class="jump"
            :id="index"
            :key="index" 
          >
            <component 
              :navFixed="navFixed"
              :is="item.section[item.indexes]"
              :pid="item.pid"
            ></component>
          </li>
        </transition-group>
        <ul v-else>
          <li>
            <component 
              :is="columnList2[0].section[columnList2[0].indexes]"
              :pid="columnList2[0].id"
            ></component>
          </li>

          <li
            v-if="!sonPagetoggle"
            v-for="(item, index) in columnList2[pageIndex].sonColumn" 
            class="jump"
            :id="index"
            :key="index" 
          >
            <component 
              v-if="item.detailType == 'detail'"
              :is="item.section[item.indexes]"
              :pid="item.pid"
            ></component>
          </li>
          <li 
            v-if="sonPagetoggle"
            v-for="(item, index) in columnList2[pageIndex].sonColumn" 
            class="jump"
            :id="index"
            :key="index" 
          >
            <component 
              v-if="item.detailType != 'detail'"
              :navFixed="navFixed"
              :is="item.section[item.indexes]"
              :pid="item.pid"
            ></component>
          </li>

          <li>
            <component 
              :is="columnList2[columnList2.length-1].section[columnList2[columnList2.length-1].indexes]"
              :pid="columnList2[columnList2.length-1].pageid"
              v-if="columnList2[columnList2.length-1].type == 'footer'"
            ></component>
          </li>
        </ul>
      </keep-alive>
    </div>
    <div class="buildimg" v-else-if="pageToggle2 == 'B'">
      <div class="inner">
       <h3>本网站正在建设中</h3>
       <p>网站管理员可以在编辑器中使其上线</p>
      </div>
    </div>
    <div class="not-found" v-else-if="pageToggle2 == 'C'">
      <div class="inner">
        <h1>页面不存在</h1>
        <p>不过如果您需要搭建自己的网站的话，您算是找对地方了。</p>
        <label>
          <button @click="tosite">即刻创建我的网站</button>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Head01 from '@/set_pages/head/Header01'
import Head02 from '@/set_pages/head/Header02'
import Bann01 from '@/set_pages/banner/Banner01'
import Bann02 from '@/set_pages/banner/Banner02'
import Bann03 from '@/set_pages/banner/Banner03'
import Bann04 from '@/set_pages/banner/Banner04'
import Bann05 from '@/set_pages/banner/Banner05'
import Bann06 from '@/set_pages/banner/Banner06'
import Bann07 from '@/set_pages/banner/Banner07'
import Pro01 from '@/set_pages/product/Product01'
import Pro02 from '@/set_pages/product/Product02'
import Pro03 from '@/set_pages/product/Product03'
import Pro04 from '@/set_pages/product/Product04'
import Pro05 from '@/set_pages/product/Product05'
import Pro06 from '@/set_pages/product/Product06'
import Pro07 from '@/set_pages/product/Product07'
import New01 from '@/set_pages/new/New01'
import New02 from '@/set_pages/new/New02'
import New03 from '@/set_pages/new/New03'
import New04 from '@/set_pages/new/New04'
import Team01 from '@/set_pages/team/Team01'
import Team02 from '@/set_pages/team/Team02'
import Recru01 from '@/set_pages/recruit/Recru01'
import Con01 from '@/set_pages/contact/Contact01'
import Con02 from '@/set_pages/contact/Contact02'
import Atlas01 from '@/set_pages/atlas/Atlas01'
import Details01 from '@/set_pages/details/Details01'


import Header1 from '@/demos/demo01/Header'
import Header2 from '@/demos/demo01/Header2'
import Header3 from '@/demos/demo01/Header3'
import Header4 from '@/demos/demo01/Header4'
import Header5 from '@/demos/demo01/Header5'

import Banner from '@/demos/demo02/Banner'
import Banner2 from '@/demos/demo02/Banner2'
import Banner3 from '@/demos/demo02/Banner3'
import Broadcast from '@/demos/demo02/Broadcast'
import Broadcast02 from '@/demos/demo02/Broadcast02'

import Product from '@/demos/demo03/Product'
import Product2 from '@/demos/demo03/Product2'
import ProductType from '@/demos/demo03/ProductType'
import Introduce from '@/demos/demo03/Introduce'
import Product3 from '@/demos/demo03/Product3'
import Product6 from '@/demos/demo03/Product6'
import Product7 from '@/demos/demo03/Product7'

import News from '@/demos/demo04/News'
import News2 from '@/demos/demo04/News2'
import News3 from '@/demos/demo04/News3'
import News4 from '@/demos/demo04/News4'
import News5 from '@/demos/demo04/News5'
import News6 from '@/demos/demo04/News6'
import News7 from '@/demos/demo04/News7'

import Team from '@/demos/demo05/Team'
import Team2 from '@/demos/demo05/Team2'
import Team3 from '@/demos/demo05/Team3'
import Team4 from '@/demos/demo05/Team4'
import Team5 from '@/demos/demo05/Team5'
import Team6 from '@/demos/demo05/Team6'
import Team7 from '@/demos/demo05/Team7'

import recruit1 from '@/demos/demo06/Recruit01'
import recruit2 from '@/demos/demo06/Recruit02'
import recruit3 from '@/demos/demo06/Recruit03'
import recruit4 from '@/demos/demo06/Recruit04'
import recruit5 from '@/demos/demo06/Recruit05'
import recruit6 from '@/demos/demo06/Recruit06'
import recruit7 from '@/demos/demo06/Recruit07'

import Contact from '@/demos/demo10/Contact'
import Contact2 from '@/demos/demo10/Contact2'

import Support from '@/common/Support'

import Site01 from '@/pages/home/blocks/Site01'
import Site02 from '@/pages/home/blocks/Site02'
import Site03 from '@/pages/home/blocks/Site03'
import Site04 from '@/pages/home/blocks/Site04'
import Site05 from '@/pages/home/blocks/Site05'
import Site06 from '@/pages/home/blocks/Site06'
import Site07 from '@/pages/home/blocks/Site07'
import Site08 from '@/pages/home/blocks/Site08'
import Site09 from '@/pages/home/blocks/Site09'
import Site10 from '@/pages/home/blocks/Site10'
import Site11 from '@/pages/home/blocks/Site11'
import Site12 from '@/pages/home/blocks/Site12'
import Detail from '@/demos/sonDemo/Detail'
export default {
  components: {
    'head01': Head01,
    'head02': Head02,
    'bann01': Bann01,
    'bann02': Bann02,
    'bann03': Bann03,
    'bann04': Bann04,
    'bann05': Bann05,
    'bann06': Bann06,
    'bann07': Bann07,
    'pro01': Pro01,
    'pro02': Pro02,
    'pro03': Pro03,
    'pro04': Pro04,
    'pro05': Pro05,
    'pro06': Pro06,
    'pro07': Pro07,
    'new01': New01,
    'new02': New02,
    'new03': New03,
    'new04': New04,
    'team01': Team01,
    'team02': Team02,
    'recru01': Recru01,
    'con01': Con01,
    'con02': Con02,
    'atlas01': Atlas01,
    'details01': Details01,
    
    'header1': Header1,
    'header2': Header2,
    'header3': Header3,
    'header4': Header4,
    'header5': Header5,
    'banner1': Banner,
    'banner2': Banner2,
    'banner3': Banner3,
    'broadcast': Broadcast,
    'broadcast02': Broadcast02,
    'product1': Product,
    'product-type': ProductType,
    'product2': Product2,
    'introduce': Introduce,
    'product3': Product3,
    'product6': Product6,
    'product7': Product7,
    'news': News,
    'news2': News2,
    'news3': News3,
    'news4': News4,
    'news5': News5,
    'news6': News6,
    'news7': News7,
    'team': Team,
    'team2': Team2,
    'team3': Team3,
    'team4': Team4,
    'team5': Team5,
    'team6': Team6,
    'team7': Team7,
    'recruit1': recruit1,
    'recruit2': recruit2,
    'recruit3': recruit3,
    'recruit4': recruit4,
    'recruit5': recruit5,
    'recruit6': recruit6,
    'recruit7': recruit7,
    'contact': Contact,
    'contact2': Contact2,
    'support': Support,
    'site1': Site01,
    'site2': Site02,
    'site3': Site03,
    'site4': Site04,
    'site5': Site05,
    'site6': Site06,
    'site7': Site07,
    'site8': Site08,
    'site9': Site09,
    'site10': Site10,
    'site11': Site11,
    'site12': Site12,
    'detail': Detail
  },
  data() {
    return {
      pageToggle2: '',
      navFixed: false,
      urldefault: 'https://site.momayun.cn'
    }
  },
  computed: {
    ...mapState({
      sonPagetoggle: state => state.sonPagetoggle,
      pageIndex: state => state.pageIndex,
      pageToggle: state => state.pageToggle,
      columnList: state => state.threeStep.columnList,
      columnList2: state => state.threeStep.columnList2,
      setData: state => state.content,
      modelText: state => state.common,
      stepPages: state => state.stepPages,
      siteId: state => state.threeStep.siteId,
      allEditToggle: state => state.allEditToggle
    })
  },
  mounted() {
    this.$store.state.threeStep.columnList = []
    this.$store.state.threeStep.columnList2 = []
    
    this.browserRedirect()
    this.getInfo()
    this.$store.state.isNavToggle = true
    this.$store.state.isAddModularToggle = false
    this.$store.commit('allEditOpen', false)
    this.$nextTick(function(){
      window.addEventListener('scroll', this.onScroll);
      this.onScroll();
    })
    setTimeout(()=> {
      this.$store.commit('pageIndexHandel', 1)
    }, 300)
  },
  methods: {
    tosite() {
      window.open('https://www.momayun.cn/')
    },
    browserRedirect() {
      var sUserAgent = navigator.userAgent.toLowerCase();       
      var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";        
      var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";        
      var bIsMidp = sUserAgent.match(/midp/i) == "midp";        
      var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";       
      var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";        
      var bIsAndroid = sUserAgent.match(/android/i) == "android";       
      var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";        
      var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";  
      if(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        this.$store.commit('browserHandel', false)
      }else {
        this.$store.commit('browserHandel', true)
      }
    },
    getInfo() {
      let url1 = window.location.href
      let url2 = url1.split('//')
      let url3 = url2[1].split('.')

       this.$store.commit('siteidHandel', url3[0]) 
        this.$axios({
          method: 'get',
          // url: '/api/block.json'
          url: 'https://site.momayun.cn/api/showsite/siteinfo',
          params: {
            main_domin:url1
          },
          headers: {
            'Content-Type':'application/x-www-form-urlencoded'
          }
        }).then(this.getSiteinfoSucc)
    },
    getSiteinfoSucc(res) {
      if(res.data.code == '200') {
        document.title = res.data.data.websites.title || res.data.data.websites.siteName
        document.querySelector('meta[name="keywords"]').setAttribute('content', res.data.data.websites.keywords)
        document.querySelector('meta[name="description"]').setAttribute('content', res.data.data.websites.description)
        if(res.data.data.pageToggle == 'true') {
          this.$store.commit('pageToggleHandel', true)
          this.$store.commit('columnListHandel', res.data.data.columnList)
        }else {
          this.$store.commit('pageToggleHandel', false)
          this.$store.commit('columnListHandel2', res.data.data.columnList)
        }
        if(res.data.data.headText) {
          for(let i=0; i<this.stepPages.head.length; i++) {
            if(res.data.data.columnList[0].pid == this.stepPages.head[i].lmid) {
              this.stepPages.head[i] = res.data.data.headText
            }
          }
        }
        this.$store.commit('headfontcolorHandel', res.data.data.websites.headfontcolor)
        this.$store.state.threeStep.companyName = res.data.data.websites.companyName
        this.$store.state.threeStep.siteName = res.data.data.websites.siteName
        this.$store.state.threeStep.yhid = res.data.data.websites.yhid
        for(let i=0; i<this.stepPages.head.length; i++) {
          this.stepPages.head[i].wsname = res.data.data.websites.siteName
          this.stepPages.head[i].paddingNum = res.data.data.websites.headspace
          this.stepPages.head[i].fontSize = res.data.data.websites.headfont
          this.stepPages.head[i].bgColor = res.data.data.websites.headbg
          this.stepPages.head[i].fontColor = res.data.data.websites.headfontcolor
          if(res.data.data.websites.logo) {
            this.stepPages.head[i].picurl = this.urldefault + res.data.data.websites.logo
          }
          if(res.data.data.websites.headbgimg) {
            this.stepPages.head[i].bgImg = this.urldefault + res.data.data.websites.headbgimg
          }
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
        for(let i=0; i<this.stepPages.banner.length; i++) {
          if(this.stepPages.banner[i].bgImg) {
            this.stepPages.banner[i].bgImg = this.urldefault + this.stepPages.banner[i].bgImg
          }
          if(this.stepPages.banner[i].picurl) {
            // this.stepPages.banner[i].picurl = this.urldefault + this.stepPages.banner[i].bgImg
            this.stepPages.banner[i].picurl = this.urldefault + this.stepPages.banner[i].picurl

          }
          if(this.stepPages.banner[i].broadcastImg) {
            for(let j=0; j<this.stepPages.banner[i].broadcastImg.length; j++) {
              this.stepPages.banner[i].broadcastImg[j].picurl = this.urldefault + this.stepPages.banner[i].broadcastImg[j].picurl
              if(this.stepPages.banner[i].broadcastImg[j].picslurl) {
                this.stepPages.banner[i].broadcastImg[j].picslurl = this.urldefault + this.stepPages.banner[i].broadcastImg[j].picslurl
              }
              if(this.stepPages.banner[i].broadcastImg[j].bgImg) {
                this.stepPages.banner[i].broadcastImg[j].bgImg = this.urldefault + this.stepPages.banner[i].broadcastImg[j].bgImg
              }
            }
          }
        }
        for(let i=0; i<this.stepPages.product.length; i++) {
          for(let j=0; j<this.stepPages.product[i].productList.length; j++) {
            this.stepPages.product[i].productList[j].picurl = this.urldefault + this.stepPages.product[i].productList[j].picurl
          }
        }
        for(let i=0; i<this.stepPages.article.length; i++) {
          if(this.stepPages.article[i].bgImg) {
            this.stepPages.article[i].bgImg = this.urldefault + this.stepPages.article[i].bgImg
          }
        }
        for(let i=0; i<this.stepPages.single.length; i++) {
          this.stepPages.single[i].picurl = this.urldefault + this.stepPages.single[i].picurl
          if(this.stepPages.single[i].bgImg) {
            this.stepPages.single[i].bgImg = this.urldefault + this.stepPages.single[i].bgImg
          }
        }
        for(let i=0; i<this.stepPages.recruit.length; i++) {
          this.stepPages.recruit[i].bgImg = this.urldefault + this.stepPages.recruit[i].bgImg
        }
        for(let i=0; i<this.stepPages.contact.length; i++) {
          this.stepPages.contact[i].bgImg = this.urldefault + this.stepPages.contact[i].bgImg
        }
        for(let i=0; i<this.stepPages.atlas.length; i++) {
          if(this.stepPages.atlas[i].bgImg) {
            this.stepPages.atlas[i].bgImg = this.urldefault + this.stepPages.atlas[i].bgImg
          }
          for(let j=0; j<this.stepPages.atlas[i].broadcastImg.length; j++) {
            this.stepPages.atlas[i].broadcastImg[j].picurl = this.urldefault + this.stepPages.atlas[i].broadcastImg[j].picurl
          }
        }
        this.pageToggle2 = 'A'
      }else if(res.data.code == '300') {
        this.pageToggle2 = 'B'
      }else if(res.data.code == '404') {
        this.pageToggle2 = 'C'
      }
      console.log(this.pageToggle2)
    },
    onScroll() {
      let scrollT = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset
      if(scrollT > 30) {
        this.navFixed = true
      }else {
        this.navFixed = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
  .model
    margin-left: 220px
    transition: all 0.3s
    ul
      margin: 0
    .buildimg
      position: fixed
      left: 0
      top: 0
      width: 100%
      height: 100%
      background: #ebeef1
      display: flex
      align-items: center
      justify-content: center
      flex-direction: column
      .inner
        transform: translateY(-100%)
        text-align: center
        h3
          color: #868e9a
        p
          color: #636972
    .not-found
      position: fixed
      left: 0
      top: 0
      width: 100%
      height: 100%
      background: #484271
      display: flex
      align-items: center
      justify-content: center
      .inner
        max-width: 275px
        color: #fff
        text-align: center
        transform: translateY(-25%)
        h1
          margin-bottom: 25px
        p
          margin-bottom: 25px !important
          font-size: 16px
          line-height: 28px
        label
          width: 100%
          button
            width: 100%
            border: none
            border-radius: $editradius
            background: $editbtnbg
            padding: 10px 24px
            font-size: 16px
            &:hover
              background: $editbtnbghover
  .paved
    margin-left: 0
</style>
