<template>
  <div class="wrapSection" :class="{ paved : this.$store.state.isNavToggle }">
    <div class="moveWrap">
      <keep-alive>
        <ul v-if="pageToggle">
          <li 
            v-for="(item, index) in columnList" 
            class="jump"
            :id="index"
            :key="index" 
          >
            <component 
              v-if="item.onOff"
              :is="item.section[item.indexes]"
              :pid="item.pid"
            ></component>
          </li>
          <li>
            <component 
              :is="columnList[columnList.length-1].section[columnList[columnList.length-1].indexes]"
              :pid="columnList[columnList.length-1].id"
              v-if="columnList[columnList.length-1].type == 'footer'"
            ></component>
          </li>
        </ul>
        <ul v-else>
          <li>
            <component 
              :navFixed="navFixed"
              :is="columnList2[0].section[columnList2[0].indexes]"
              :pid="columnList2[0].id" 
            ></component>
          </li>
          <li v-for="(item, index) in columnList2[pageIndex].sonColumn" :key="index">
            <component :is="item.section[item.indexes]" :pid="item.pid"></component>
          </li>
          <li>
            <component 
              :is="columnList2[columnList2.length-1].section[columnList2[columnList2.length-1].indexes]"
              :pid="columnList2[columnList2.length-1].id"
              v-if="columnList2[columnList2.length-1].type == 'footer'"
            ></component>
          </li>
        </ul>
      </keep-alive>
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
import New01 from '@/set_pages/new/New01'
import New02 from '@/set_pages/new/New02'
import New03 from '@/set_pages/new/New03'
import Team01 from '@/set_pages/team/Team01'
import Con01 from '@/set_pages/contact/Contact01'
import Con02 from '@/set_pages/contact/Contact02'
import Atlas01 from '@/set_pages/atlas/Atlas01'
import Details01 from '@/set_pages/details/Details01'

import Header1 from '@/demos/demo01/Header'
import Header2 from '@/demos/demo01/Header2'
import Header3 from '@/demos/demo01/Header3'

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
    'new01': New01,
    'new02': New02,
    'new03': New03,
    'team01': Team01,
    'con01': Con01,
    'con02': Con02,
    'atlas01': Atlas01,
    'details01': Details01,
    
  	'header1': Header1,
  	'header2': Header2,
    'header3': Header3,

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
    'detail': Detail
  },
  data() {
    return {
      navFixed: false
    }
  },
  mounted() {
    // this.jumpHandle()
  },
  computed: {
    ...mapState({
      pageIndex: state => state.pageIndex,
      pageToggle: state => state.pageToggle,
      columnList: state => state.threeStep.columnList,
      columnList2: state => state.threeStep.columnList2
    })
  },
  methods: {
    onScroll() {
      let scrollT = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset
      if(scrollT > 30) {
        this.navFixed = true
      }else {
        this.navFixed = false
      }
    },
    jumpHandle() {
      for(let i=0; i<this.$store.state.threeStep.columnList.length; i++) {
        if(this.$store.state.threeStep.columnList[i].sonColumn.length>0) {
          this.$store.commit('jumpHandle', false)
        }else {
          this.$store.commit('jumpHandle', true)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapSection
    margin-left: 220px
    transition: all 0.3s
    background:#fff
    ul
      margin: 0
  .paved
    margin-left: 0
</style>
