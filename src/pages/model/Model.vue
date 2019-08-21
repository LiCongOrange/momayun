<template>
  <div class="model" id="model" :class="{ paved : this.$store.state.isNavToggle }">
    <div class="moveWrap">
      <keep-alive>
         <transition-group name="list" tag="ul">
          <li 
            v-for="(item, index) in columnList" 
            class="jump"
            id="index"
            :key="item.pid" 
          >
            <component 
              :navFixed="navFixed"
              v-if="item.onOff"
              :is="item.section[item.indexes]"
            ></component>
          </li>
        </transition-group>
      </keep-alive>
    </div>
    <support></support>
  </div>
</template>

<script>
import Header1 from '@/demos/demo01/Header'
import Header2 from '@/demos/demo01/Header2'
import Header3 from '@/demos/demo01/Header3'

import Banner from '@/demos/demo02/Banner'
import Banner2 from '@/demos/demo02/Banner2'
import Broadcast from '@/demos/demo02/Broadcast'
import Broadcast02 from '@/demos/demo02/Broadcast02'

import Product from '@/demos/demo03/Product'
import Product2 from '@/demos/demo03/Product2'
import ProductType from '@/demos/demo03/ProductType'
import Introduce from '@/demos/demo03/Introduce'
import Product3 from '@/demos/demo03/Product3'

import News from '@/demos/demo04/News'
import Team from '@/demos/demo05/Team'
import News2 from '@/demos/demo04/News2'
import Team2 from '@/demos/demo05/Team2'
import Team3 from '@/demos/demo05/Team3'

import Contact from '@/demos/demo10/Contact'
import Contact2 from '@/demos/demo10/Contact2'

import Support from '@/common/Support'
export default {
  name: 'WrapSection',
  props: ['navList', 'dataer'],
  components: {
    'header1': Header1,
    'header2': Header2,
    'header3': Header3,

    'banner1': Banner,
    'banner2': Banner2,
    'broadcast': Broadcast,
    'broadcast02': Broadcast02,

    'product1': Product,
    'product-type': ProductType,
    'product2': Product2,
    'introduce': Introduce,
    'product3': Product3,

    'news': News,
    'team': Team,
    'news2': News2,
    'team2': Team2,
    'team3': Team3,

    'contact': Contact,
    'contact2': Contact2,

    'support': Support
  },
  data() {
    return {
      navFixed: false,
      columnList: ''
    }
  },
  methods: {
    getData() {
      this.columnList = this.dataer.columnList
      this.$store.state.threeStep.columnList = this.dataer.columnList
      this.$store.state.storage = this.dataer.storage
      this.$store.state.threeStep.siteName = this.dataer.siteName
      this.$store.state.threeStep.address = this.dataer.address
      this.$store.state.threeStep.telephone = this.dataer.telephone

      // this.$store.state.demo1[0] = this.dataer.headText
      // this.$store.state.demo2[this.dataer.storage.banner.index] = this.dataer.bannerText
      // this.$store.state.demo3[this.dataer.storage.product.index] = this.dataer.productText
      // this.$store.state.demo4[this.dataer.storage.new.index] = this.dataer.newText
      // this.$store.state.demo5[this.dataer.storage.team.index] = this.dataer.teamText
    },
    onScroll: function () {
      let scrollT = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset
      // console.log('EditSection'+ '' +scrollT)
      if(scrollT > 30) {
        this.navFixed = true
      }else {
        this.navFixed = false
      }
    }
  },
  mounted() {
    this.getData()
    this.$nextTick(function(){
      window.addEventListener('scroll', this.onScroll);
      this.onScroll();
    })
  }
}
</script>

<style lang="stylus" scoped>
  .model
    margin-left: 220px
    transition: all 0.3s
    background:#fff
    ul
      margin: 0
  .paved
    margin-left: 0
</style>
