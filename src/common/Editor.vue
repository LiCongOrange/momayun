<template>
  <quill-editor 
  	class="editor-example bubble"
  	:class="{active : isActive }"
    style="position: relative;"
    ref="myTextEditor"
    :content="content"
    :options="editorOption"
    @focus="onEditorFocus($event)"
    @blur="onEditorBlur($event)"
    @change="onEditorChange($event)"
   >
  </quill-editor>
</template>

<script>
import { mapState } from 'vuex'
export default {
	props: ['content', 'type1', 'type2', 'lmid', 'sonid', 'type3'],
  data() {
    return {
      headinfo: '',
      defaultText: '',
      pageToggle: false,
      callbackText: '',
    	isActive: false,
    	contenter: '',
      editorOption: {
        theme: 'bubble',
        placeholder: '标题',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'color': [] }],
            [{ 'align': [] }],
            ['link'],
            [{ 'script': 'sub' }, { 'script': 'super' }]
          ]
        }
      }
    }
  },
  computed: {
    ...mapState({
      passToggle: state => state.passToggle,
      stepPages: state => state.stepPages,
      siteId: state => state.threeStep.siteId
    })
  },
  methods: {
    onEditorFocus(editor) {
      this.defaultText = this.contenter
      this.$store.commit('passtoggleHandle', true)
    	this.isActive = true
    },
    onEditorBlur(editor) {
    	this.isActive = false
    },
    onEditorChange({ editor, html, text }) {
      this.contenter = html
      // this.$emit('fnEdit', html)

      if(this.defaultText != this.contenter && this.passToggle) {
        if(this.type1 == '5') {
          for(let i=0; i<this.stepPages.banner.length; i++) {
            
            if(this.stepPages.banner[i].lmid == this.lmid && this.type2 == '1') {
              this.stepPages.banner[i].title = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemessage',
                data: {
                  id: this.stepPages.banner[i].bid,
                  type: 5,
                  text: {
                    title: this.contenter
                  }
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.banner[i].lmid == this.lmid && this.type2 == '2') {
              this.stepPages.banner[i].titleFn = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemessage',
                data: {
                  id: this.stepPages.banner[i].bid,
                  type: 5,
                  text: {
                    titleFn: this.contenter
                  }
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.banner[i].lmid == this.lmid && this.type2 == '11' && this.sonid) {
              for(let j=0; j<this.stepPages.banner[i].broadcastImg.length; j++) {
                if(this.stepPages.banner[i].broadcastImg[j].bid == this.sonid) {
                  this.stepPages.banner[i].broadcastImg[j].title = this.contenter
                  this.$axios({
                    method: 'post',
                    url: '/api/Senior/savemessage',
                    data: {
                      id: this.sonid,
                      type: 5,
                      text: this.stepPages.banner[i].broadcastImg[j]
                    }
                  }).then((res)=> {
                    if(res.data.code == '200') {
                      // this.$store.commit('passtoggleHandle', false)
                    }else {
                      // alert(res.data.msg)
                    }
                  })
                }
              }
            }else if(this.stepPages.banner[i].lmid == this.lmid && this.type2 == '3' && this.sonid) {
              for(let j=0; j<this.stepPages.banner[i].broadcastImg.length; j++) {
                if(this.stepPages.banner[i].broadcastImg[j].bid == this.sonid) {
                  this.stepPages.banner[i].broadcastImg[j].content = this.contenter
                  this.$axios({
                    method: 'post',
                    url: '/api/Senior/savemessage',
                    data: {
                      id: this.sonid,
                      type: 5,
                      text: this.stepPages.banner[i].broadcastImg[j]
                    }
                  }).then((res)=> {
                    if(res.data.code == '200') {
                      // this.$store.commit('passtoggleHandle', false)
                    }else {
                      // alert(res.data.msg)
                    }
                  })
                }
              }
            }else if(this.stepPages.banner[i].lmid == this.lmid && this.type2 == '4' && this.sonid) {
              for(let j=0; j<this.stepPages.banner[i].broadcastImg.length; j++) {
                if(this.stepPages.banner[i].broadcastImg[j].bid == this.sonid) {
                  this.stepPages.banner[i].broadcastImg[j].nameFn = this.contenter
                  this.$axios({
                    method: 'post',
                    url: '/api/Senior/savemessage',
                    data: {
                      id: this.sonid,
                      type: 5,
                      text: this.stepPages.banner[i].broadcastImg[j]
                    }
                  }).then((res)=> {
                    if(res.data.code == '200') {
                      // this.$store.commit('passtoggleHandle', false)
                    }else {
                      // alert(res.data.msg)
                    }
                  })
                }
              }
            }
          }
        }else if(this.type1 == '3') {
          for(let i=0; i<this.stepPages.product.length; i++) {
            if(this.stepPages.product[i].lmid == this.lmid && this.type2 == '1') {
              this.stepPages.product[i].modularName = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemodule',
                data: {
                site_id: this.siteId,
                lmid: this.lmid,
                type: 3,
                module: this.stepPages.product[i]
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.product[i].lmid == this.lmid && this.type2 == '2') {
              this.stepPages.product[i].modularNameLetter = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemodule',
                data: {
                site_id: this.siteId,
                lmid: this.lmid,
                type: 3,
                module: this.stepPages.product[i]
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.product[i].lmid == this.lmid && this.type2 == '3') {
              for(let j=0; j<this.stepPages.product[i].productList.length; j++) {
                if(this.stepPages.product[i].productList[j].pid == this.sonid) {
                  this.stepPages.product[i].productList[j].title = this.contenter
                  this.$axios({
                    method: 'post',
                    url: '/api/Senior/savemessage',
                    data: {
                      id: this.sonid,
                      type: 3,
                      text: this.stepPages.product[i].productList[j]
                    }
                  }).then((res)=> {
                    if(res.data.code == '200') {
                      // this.$store.commit('passtoggleHandle', false)
                    }else {
                      // alert(res.data.msg)
                    }
                  })
                }
              }
            }else if(this.stepPages.product[i].lmid == this.lmid && this.type2 == '4') {
              for(let j=0; j<this.stepPages.product[i].productList.length; j++) {
                if(this.stepPages.product[i].productList[j].pid == this.sonid) {
                  this.stepPages.product[i].productList[j].nameFn = this.contenter
                  this.$axios({
                    method: 'post',
                    url: '/api/Senior/savemessage',
                    data: {
                      id: this.sonid,
                      type: 3,
                      text: this.stepPages.product[i].productList[j]
                    }
                  }).then((res)=> {
                    if(res.data.code == '200') {
                      // this.$store.commit('passtoggleHandle', false)
                    }else {
                      // alert(res.data.msg)
                    }
                  })
                }
              }
            }else if(this.stepPages.product[i].lmid == this.lmid && this.type2 == '5') {
              for(let j=0; j<this.stepPages.product[i].productList.length; j++) {
                if(this.stepPages.product[i].productList[j].pid == this.sonid) {
                  this.stepPages.product[i].productList[j].past = this.contenter
                  this.$axios({
                    method: 'post',
                    url: '/api/Senior/savemessage',
                    data: {
                      id: this.sonid,
                      type: 3,
                      text: this.stepPages.product[i].productList[j]
                    }
                  }).then((res)=> {
                    if(res.data.code == '200') {
                      // this.$store.commit('passtoggleHandle', false)
                    }else {
                      // alert(res.data.msg)
                    }
                  })
                }
              }
            }
          }
        }else if(this.type1 == '2') {
          for(let i=0; i<this.stepPages.article.length; i++) {
            if(this.stepPages.article[i].lmid == this.lmid && this.type2 == '1') {
              this.stepPages.article[i].modularName = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemodule',
                data: {
                  site_id: this.siteId,
                  lmid: this.lmid,
                  type: 2,
                  module: this.stepPages.article[i]
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.article[i].lmid == this.lmid && this.type2 == '2') {
              this.stepPages.article[i].modularNameLetter = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemodule',
                data: {
                  site_id: this.siteId,
                  lmid: this.lmid,
                  type: 2,
                  module: this.stepPages.article[i]
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.article[i].lmid == this.lmid && this.type2 == '3') {
              for(let j=0; j<this.stepPages.article[i].newList.length; j++) {
                if(this.stepPages.article[i].newList[j].nid == this.sonid) {
                  this.stepPages.article[i].newList[j].title = this.contenter
                  this.$axios({
                    method: 'post',
                    url: '/api/Senior/savemessage',
                    data: {
                      id: this.sonid,
                      type: 2,
                      text: this.stepPages.article[i].newList[j]
                    }
                  }).then((res)=> {
                    if(res.data.code == '200') {
                      // this.$store.commit('passtoggleHandle', false)
                    }else {
                      // alert(res.data.msg)
                    }
                  })
                }
              }
            }else if(this.stepPages.article[i].lmid == this.lmid && this.type2 == '4') {
              for(let j=0; j<this.stepPages.article[i].newList.length; j++) {
                if(this.stepPages.article[i].newList[j].nid == this.sonid) {
                  this.stepPages.article[i].newList[j].timer = this.contenter
                  this.$axios({
                    method: 'post',
                    url: '/api/Senior/savemessage',
                    data: {
                      id: this.sonid,
                      type: 2,
                      text: this.stepPages.article[i].newList[j]
                    }
                  }).then((res)=> {
                    if(res.data.code == '200') {
                      // this.$store.commit('passtoggleHandle', false)
                    }else {
                      // alert(res.data.msg)
                    }
                  })
                }
              }
            }else if(this.stepPages.article[i].lmid == this.lmid && this.type2 == '5') {
              for(let j=0; j<this.stepPages.article[i].newList.length; j++) {
                if(this.stepPages.article[i].newList[j].nid == this.sonid) {
                  this.stepPages.article[i].newList[j].past = this.contenter
                  this.$axios({
                    method: 'post',
                    url: '/api/Senior/savemessage',
                    data: {
                      id: this.sonid,
                      type: 2,
                      text: this.stepPages.article[i].newList[j]
                    }
                  }).then((res)=> {
                    if(res.data.code == '200') {
                      // this.$store.commit('passtoggleHandle', false)
                    }else {
                      // alert(res.data.msg)
                    }
                  })
                }
              }
            }else if(this.stepPages.article[i].lmid == this.lmid && this.type2 == '6') {
              this.stepPages.article[i].content = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemodule',
                data: {
                  site_id: this.siteId,
                  lmid: this.lmid,
                  type: 2,
                  module: this.stepPages.article[i]
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }
          }
        }else if(this.type1 == '1') {
          for(let i=0; i<this.stepPages.single.length; i++) {
            if(this.stepPages.single[i].lmid == this.lmid && this.type2 == '1') {
              this.stepPages.single[i].modularName = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemessage',
                data: {
                  id: this.sonid,
                  type: 1,
                  text: {
                    title: this.contenter,
                  }
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.single[i].lmid == this.lmid && this.type2 == '2') {
              this.stepPages.single[i].modularNameLetter = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemessage',
                data: {
                  id: this.sonid,
                  type: 1,
                  text: {
                    titleFn: this.contenter,
                  }
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.single[i].lmid == this.lmid && this.type2 == '3') {
              this.stepPages.single[i].content = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemessage',
                data: {
                  id: this.sonid,
                  type: 1,
                  text: {
                    past: this.contenter,
                  }
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }
          }
        }else if(this.type1 == '4') {
          for(let i=0; i<this.stepPages.recruit.length; i++) {
            if(this.stepPages.recruit[i].lmid == this.lmid && this.type2 == '1') {
              this.stepPages.recruit[i].modularName = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemodule',
                data: {
                  site_id: this.siteId,
                  lmid: this.lmid,
                  type: 4,
                  module: this.stepPages.recruit[i]
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.recruit[i].lmid == this.lmid && this.type2 == '2') {
              this.stepPages.recruit[i].modularNameLetter = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemodule',
                data: {
                  site_id: this.siteId,
                  lmid: this.lmid,
                  type: 4,
                  module: this.stepPages.recruit[i]
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.recruit[i].lmid == this.lmid && this.type2 == '3') {
              for(let j=0; j<this.stepPages.recruit[i].recruitList.length; j++) {
                if(this.stepPages.recruit[i].recruitList[j].jid == this.sonid) {
                  this.stepPages.recruit[i].recruitList[j].title = this.contenter
                  this.$axios({
                    method: 'post',
                    url: '/api/Senior/savemessage',
                    data: {
                      id: this.sonid,
                      type: 4,
                      text: this.stepPages.recruit[i].recruitList[j]
                    }
                  }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
                  })
                }
              }
            }else if(this.stepPages.recruit[i].lmid == this.lmid && this.type2 == '4') {
              for(let j=0; j<this.stepPages.recruit[i].recruitList.length; j++) {
                if(this.stepPages.recruit[i].recruitList[j].jid == this.sonid) {
                  this.stepPages.recruit[i].recruitList[j].titleFn = this.contenter
                  this.$axios({
                    method: 'post',
                    url: '/api/Senior/savemessage',
                    data: {
                      id: this.sonid,
                      type: 4,
                      text: this.stepPages.recruit[i].recruitList[j]
                    }
                  }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
                  })
                }
              }
            }else if(this.stepPages.recruit[i].lmid == this.lmid && this.type2 == '5') {
              for(let j=0; j<this.stepPages.recruit[i].recruitList.length; j++) {
                if(this.stepPages.recruit[i].recruitList[j].jid == this.sonid) {
                  this.stepPages.recruit[i].recruitList[j].past = this.contenter
                  this.$axios({
                    method: 'post',
                    url: '/api/Senior/savemessage',
                    data: {
                      id: this.sonid,
                      type: 4,
                      text: this.stepPages.recruit[i].recruitList[j]
                    }
                  }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
                  })
                }
              }
            }
          }
        }else if(this.type1 == '6') {
          for(let i=0; i<this.stepPages.atlas.length; i++) {
            if(this.stepPages.atlas[i].lmid == this.lmid && this.type2 == '1') {
              this.stepPages.atlas[i].title = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemodule',
                data: {
                    site_id: this.siteId,
                    lmid: this.lmid,
                    type: 6,
                    module: this.stepPages.atlas[i]
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.atlas[i].lmid == this.lmid && this.type2 == '2') {
              this.stepPages.atlas[i].titleFn = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemodule',
                data: {
                    site_id: this.siteId,
                    lmid: this.lmid,
                    type: 6,
                    module: this.stepPages.atlas[i]
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.atlas[i].lmid == this.lmid && this.type2 == '3') {
              for(let j=0; j<this.stepPages.atlas[i].broadcastImg.length; j++) {
                if(this.stepPages.atlas[i].broadcastImg[j].bid == this.sonid) {
                  this.stepPages.atlas[i].broadcastImg[j].title = this.contenter
                  this.$axios({
                    method: 'post',
                    url: '/api/Senior/savemessage',
                    data: {
                      id: this.sonid,
                      type: 6,
                      text: this.stepPages.atlas[i].broadcastImg[j]
                    }
                  }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
                  })
                }
              }
            }else if(this.stepPages.atlas[i].lmid == this.lmid && this.type2 == '4') {
              for(let j=0; j<this.stepPages.atlas[i].broadcastImg.length; j++) {
                if(this.stepPages.atlas[i].broadcastImg[j].bid == this.sonid) {
                  this.stepPages.atlas[i].broadcastImg[j].content = this.contenter
                  this.$axios({
                    method: 'post',
                    url: '/api/Senior/savemessage',
                    data: {
                      id: this.sonid,
                      type: 6,
                      text: this.stepPages.atlas[i].broadcastImg[j]
                    }
                  }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
                  })
                }
              }
            }
          }
        }else if(this.type1 == '7') {
          for(let i=0; i<this.stepPages.contact.length; i++) {
            if(this.stepPages.contact[i].lmid == this.lmid && this.type2 == '1') {
              this.stepPages.contact[i].modularName = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemodule',
                data: {
                  site_id: this.siteId,
                  lmid: this.lmid,
                  type: 7,
                  module: this.stepPages.contact[i]
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.contact[i].lmid == this.lmid && this.type2 == '2') {
              this.stepPages.contact[i].modularNameFu = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemodule',
                data: {
                  site_id: this.siteId,
                  lmid: this.lmid,
                  type: 7,
                  module: this.stepPages.contact[i]
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }
          }
        }else if(this.type1 == '0') {
          if(this.type2 == '2') {
            for(let i=0; i<this.stepPages.head.length; i++) {
              this.stepPages.head[i].telephone = this.contenter
              this.headinfo = this.stepPages.head[i]
            }
            if(this.defaultText != this.contenter) {
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemodule',
                data: {
                  site_id: this.siteId,
                  type: 'head',
                  module: this.headinfo
                }
              }).then((res)=> {
                    if(res.data.code == '200') {
                      // this.$store.commit('passtoggleHandle', false)
                    }else {
                      // alert(res.data.msg)
                    }
              })
            }
          }else {
            for(let i=0; i<this.stepPages.head.length; i++) {
              this.stepPages.head[i].wsname = this.contenter
            }
            this.$axios({
              method: 'post',
              url: '/api/Senior/savemodule',
              data: {
                site_id: this.siteId,
                type: 'head',
                module: {
                  wsname: this.contenter
                }
              }
            }).then((res)=> {
                  if(res.data.code == '200') {
                    // this.$store.commit('passtoggleHandle', false)
                  }else {
                    // alert(res.data.msg)
                  }
            })
          }
        }else if(this.type1 == '10') {
          for(let i=0; i<this.stepPages.foot.length; i++) {
            if(this.stepPages.foot[i].lmid == this.lmid && this.type2 == '1') {
              this.stepPages.foot[i].title = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemessage',
                data: {
                  id: this.siteId,
                  type: 'foot',
                  text: {
                    title: this.contenter
                  }
                }
              }).then((res)=> {
                if(res.data.code == '404') {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.foot[i].lmid == this.lmid && this.type2 == '2') {
              this.stepPages.foot[i].titleFn = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemodule',
                data: {
                  site_id: this.siteId,
                  type: 'footer',
                  module: this.stepPages.foot[i]
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.foot[i].lmid == this.lmid && this.type2 == '3') {
              this.stepPages.foot[i].classList[this.type3].val = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemodule',
                data: {
                  site_id: this.siteId,
                  type: 'footer',
                  module: this.stepPages.foot[i]
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }else if(this.stepPages.foot[i].lmid == this.lmid && this.type2 == '4') {
              this.stepPages.foot[i].telephone = this.contenter
              this.$axios({
                method: 'post',
                url: '/api/Senior/savemodule',
                data: {
                  site_id: this.siteId,
                  type: 'footer',
                  module: this.stepPages.foot[i]
                }
              }).then((res)=> {
                if(res.data.code == '200') {
                  // this.$store.commit('passtoggleHandle', false)
                }else {
                  // alert(res.data.msg)
                }
              })
            }
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~styles/public'
  .quill-editor 
    border: 1px solid rgba(255, 255, 255, 0) 
    transition: all 0.3s
    &:hover
    	border-color: $borderColorGray
    >>> .ql-tooltip
      width: 415px !important
      z-index: 1000000000000000000
      .ql-tooltip-editor
        input
          left: 0
    >>> .ql-formats
      margin: 5px 5px 5px 0 !important
  .active
  	border: 1px solid $borderColorGray
</style>