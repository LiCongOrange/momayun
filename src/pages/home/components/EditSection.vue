<template>
  <div class="wrapSection" :class="{ paved : this.$store.state.isNavToggle }">
    <div class="phone-wrap" v-if="phoneToggle">
      <div class="moveWrap">
        <keep-alive>

<!--           <ul v-if="pageToggle"> 
            <li 
              v-for="(item, index) in columnList" 
              class="jump"
              :id="index"
              :key="index" 
            >
              <component 
                :navFixed="navFixed"
                :pid="item.pid"
                :is="item.section[item.indexes]"
                v-if="item.type != 'outerchain'"
              ></component>
            </li>
          </ul> -->

          <transition-group tag="ul" name="list" v-if="pageToggle">
            <li 
              v-for="(item, index) in columnList" 
              class="jump"
              :id="index"
              :key="item.pid" 
            >
              <component 
                :navFixed="navFixed"
                :pid="item.pid"
                :is="item.section[item.indexes]"
                v-if="item.type != 'outerchain'"
              ></component>
            </li>
          </transition-group>

          <div v-else>
            <div class="duo-title">
              <ul>
                <li>
                  <component 
                    :is="columnList2[0].section[columnList2[0].indexes]"
                    :pid="columnList2[0].id"
                    :navFixed="navFixed"
                  ></component>
                </li>
              </ul>
            </div>
            <div class="duo-main" v-if="sonPagetoggle">
              <transition-group tag="ul" name="list">
                <li
                  v-for="(item, index) in columnList2[pageIndex].sonColumn" 
                  class="jump"
                  :id="item.pid"
                  :key="item.pid" 
                >
                  <component 
                    v-if="item.type != 'detail' && item.type != 'outerchain'"
                    :is="item.section[item.indexes]"
                    :pid="item.pid"
                  ></component>
                </li>
              </transition-group>
            </div>
            <div class="duo-main" v-else>
              <transition-group tag="ul" name="list">
                <li
                  v-for="(item, index) in columnList2[columnList2.length-2].sonColumn" 
                  class="jump"
                  :id="item.pid"
                  :key="index" 
                >
                  <component 
                    v-if="item.detailType == 'detail'"
                    :is="item.section[item.indexes]"
                    :pid="item.pid"
                  ></component> 
                </li>
              </transition-group>
            </div>
            <div class="duo-foot">
              <ul>
                <li>
                  <component 
                    :is="columnList2[columnList2.length-1].section[columnList2[columnList2.length-1].indexes]"
                    :pid="columnList2[columnList2.length-1].pageid"
                    v-if="columnList2[columnList2.length-1].type == 'footer'"
                  ></component>
                </li>
              </ul>
            </div>
          </div>

        </keep-alive>
      </div>
    </div>
    <div class="phoneview" v-else>
      <div class="moveWrap">
        <keep-alive>
          <ul v-if="pageToggle"> 
            <li 
              v-for="(item, index) in columnList" 
              class="jump"
              :id="index"
              :key="item.pid" 
            >
              <component 
                :navFixed="navFixed"
                :pid="item.pid"
                :is="item.section[item.indexes]"
              ></component>
            </li>
          </ul>
          <ul v-else>
            <li>
              <component 
                :is="columnList2[0].section[columnList2[0].indexes]"
                :pid="columnList2[0].pageid"
                :navFixed="navFixed"
              ></component>
            </li>

            <li 
              v-if="sonPagetoggle"
              v-for="(item, index) in columnList2[pageIndex].sonColumn" 
              class="jump"
              :id="index"
              :key="item.pid" 
            >
              <component 
                v-if="item.detailType != 'detail'"
                :is="item.section[item.indexes]"
                :pid="item.pid"
              ></component>
            </li>
            <li
              v-else
              v-for="(item, index) in columnList2[pageIndex].sonColumn" 
              class="jump"
              :id="index"
              :key="item.pid" 
            >
              <component 
                v-if="item.detailType == 'detail'"
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
        <!-- <support></support> -->
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

import Site01 from '../blocks/Site01'
import Site02 from '../blocks/Site02'
import Site03 from '../blocks/Site03'
import Site04 from '../blocks/Site04'
import Site05 from '../blocks/Site05'
import Site06 from '../blocks/Site06'
import Site07 from '../blocks/Site07'
import Site08 from '../blocks/Site08'
import Site09 from '../blocks/Site09'
import Site10 from '../blocks/Site10'
import Site11 from '../blocks/Site11'
import Site12 from '../blocks/Site12'
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
      pageToggle2: true,
      page2: false,
      navFixed: false
    }
  },
  mounted() {
    this.browserRedirect()
    this.$store.state.allEditToggle = true
    this.$nextTick(function(){
      window.addEventListener('scroll', this.onScroll)
      this.onScroll();
      document.body.scrollTop = document.documentElement.scrollTop = window.pageYOffset = 0
    })
    setTimeout(()=> {
      this.$store.commit('pageIndexHandel', 1)
    }, 300)
  },
  computed: {
    ...mapState({
      sonPagetoggle: state => state.sonPagetoggle,
      pageIndex: state => state.pageIndex,
      pageToggle: state => state.pageToggle,
      columnList: state => state.threeStep.columnList,
      columnList2: state => state.threeStep.columnList2,
      stepPages: state => state.stepPages,
      phoneToggle: state => state.phoneToggle
    })
  },
  methods: {
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
    onScroll() {
      let scrollT = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset
      if(scrollT > 20) {
        this.navFixed = true
      }else {
        this.navFixed = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapSection
    margin-left: 220px
    transition: all 0.3s
    background: #333
    position: relative
    height: 100%
    display: flex
    flex-direction: column
    .phone-wrap
      background: #fff
    ul
      margin: 0
      overflow-y: hidden
      li
        transition: all 1s
    .moveWrap
      .duo-title
        ul
          overflow-y: inherit
    .phoneview
      position: fixed
      left: 50%
      top: 50%
      transform: translate(-40%, -50%)
      .moveWrap
        width: 400px
        height: 800px
        overflow-y: auto
  .paved
    margin-left: 0
  .list-enter-active, .list-leave-active
    opacity: 1
    transition: all .3s
  .list-enter, .list-leave-to
    height: 0
    opacity: 0
</style>
