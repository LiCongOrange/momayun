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
              :pid="item.pid"
              :is="item.section[item.indexes]"
            ></component>
          </li>
          <li>
            <component 
              :is="columnList[columnList.length-1].section[columnList[columnList.length-1].indexes]"
              :pid="columnList[columnList.length-1].pid"
              v-if="columnList[columnList.length-1].type == 'footer'"
            ></component>
          </li>
<!--           <li>
            <support></support>
          </li> -->
        </ul>
        <ul v-else>
          <li>
            <component 
              :is="columnList2[0].section[columnList2[0].indexes]"
              :pid="columnList2[0].id"
            ></component>
          </li>
          <li v-for="(item, index) in columnList2[this.pageIndex].sonColumn" :key="index">
            <component 
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
<!--           <li>
            <support></support>
          </li> -->
        </ul>
      </keep-alive>
    </div>
    <div class="allMask"></div>
  </div>
</template>

<script>
import Header1 from '@/sections/section01/Header'
import Header2 from '@/sections/section01/Header2'
import Header3 from '@/sections/section01/Header3'

import Banner from '@/sections/section02/Banner'
import Banner2 from '@/sections/section02/Banner2'
import Banner3 from '@/sections/section02/Banner3'
import Broadcast from '@/sections/section02/Broadcast'
import Broadcast02 from '@/sections/section02/Broadcast02'

import Product from '@/sections/section03/Product'
import Product2 from '@/sections/section03/Product2'
import ProductType from '@/sections/section03/ProductType'
import Introduce from '@/sections/section03/Introduce'
import Product3 from '@/sections/section03/Product3'
import Product6 from '@/sections/section03/Product6'
import Product7 from '@/sections/section03/Product7'

import News from '@/sections/section04/News'
import News2 from '@/sections/section04/News2'
import News3 from '@/sections/section04/News3'
import News4 from '@/sections/section04/News4'
import News5 from '@/sections/section04/News5'
import News6 from '@/sections/section04/News6'
import News7 from '@/sections/section04/News7'

import Team from '@/sections/section05/Team'
import Team2 from '@/sections/section05/Team2'
import Team3 from '@/sections/section05/Team3'
import Team4 from '@/sections/section05/Team4'
import Team5 from '@/sections/section05/Team5'
import Team6 from '@/sections/section05/Team6'
import Team7 from '@/sections/section05/Team7'

import recruit1 from '@/sections/section06/Recruit01'
import recruit2 from '@/sections/section06/Recruit02'
import recruit3 from '@/sections/section06/Recruit03'
import recruit4 from '@/sections/section06/Recruit04'
import recruit5 from '@/sections/section06/Recruit05'
import recruit6 from '@/sections/section06/Recruit06'
import recruit7 from '@/sections/section06/Recruit07'

import Contact from '@/sections/section10/Contact'
import Contact2 from '@/sections/section10/Contact2'

import Support from '@/common/Support'

export default {
  components: {

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

    'support': Support
  },
  computed: {
    pageToggle() {
      return this.$store.state.pageToggle
    },
    columnList() {
      return this.$store.state.threeStep.columnList
    },
    columnList2() {
      return this.$store.state.threeStep.columnList2
    },
    pageIndex() {
      return this.$store.state.pageIndex
    }
  },
  mounted() {
    setTimeout(()=> {
      this.$store.commit('pageIndexHandel', 1)
    }, 300)
    // this.$store.commit('pageIndexHandel', 1)
  }
}
</script>

<style lang="stylus" scoped>
  .wrapSection
    margin-left: 220px
    transition: all 0.3s
    background:#fff
    position: relative
    ul
      margin: 0
    .allMask
      // position: absolute
      left: 0
      top: 0
      right: 0
      bottom: 0
      background: rgba(0, 0, 0, .1)
      z-index: 1000000000000
      opacity: 0
  .paved
    margin-left: 0
</style>
