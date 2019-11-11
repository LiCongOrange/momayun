<template>
  <div id="app">
    <div v-if="switchToggle">
      <router-view />
    </div>
    <div v-else>
      <user :dataer="dataer"></user>
    </div>
  </div>
</template>

<script>
import user from '@/pages/model/Model'
export default {
  name: 'App',
  data() {
    return {
      switchToggle: true,
      dataer: '',
    }
  },
  components: {
    user
  },
  methods: {
    getSiteinfo() {
      var urlSearch = window.location.pathname
      // var siteArr = urlSearch.split("&")
      var pageNamelist = urlSearch.split("/")
      var pageName = pageNamelist[pageNamelist.length-1]
      console.log(pageNamelist +":"+ pageName)
      if(pageName == 'home') {
        this.$router.push({path: '/home'})
      }

    },
    getModelInfo() {
      this.$axios({
        method: 'get',
        url: '/api/showsite'
        // url: '/api/siteinfo.json',
      }).then(this.getModelInfoSucc)
    },
    getModelInfoSucc(res) {
      if(res.data.code == '200') {
        this.switchToggle = false
        this.dataer = res.data.data[0]
      }else {
        this.switchToggle = true
      }
    }
  },
  mounted() {
    // this.getSiteinfo()
    // this.getModelInfo()
  }
}
</script>
