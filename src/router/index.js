import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index/Index'
import Home from '@/pages/home/Home'
import IndexLogin from '@/pages/login/Login'
import IndexdlLogin from '@/pages/dllogin/DlLogin'
import IndexuserLogin from '@/pages/userlogin/UserLogin'
import Stafflogin from '@/pages/stafflogin/Stafflogin'
import IndexRegister from '@/pages/register/Register'
import IndexPasswrod from '@/pages/password/Password'
import IndexProductCenter from '@/pages/center/Center'
import IndexUserCenter from '@/pages/usercenter/UserCenter'

// 站点新建与三步建站
import NewSite from '@/pages/site/Site'
import stepIndex from '@/pages/step/Step'
import setIndex from '@/pages/allset/Allset'
// 账户信息
import Account from '@/pages/account/Account'
import Recharge from '@/pages/account/recharge/Recharge'
import Myaccount from '@/pages/account/myacount/Myacount'
// 支付页
import PayIndex from '@/pages/pay/Pay'
//工单管理
import Work from '@/pages/work/Work'
import myWork from '@/pages/work/mywork/Mywork'
//管理内容
import cIndex from '@/pages/site/admin/Index'

import Model from '@/pages/model/Model'
import Pre from '@/pages/home/preview/Pre'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
  	{
  		path: '/',
  		name: 'Index',
  		component: Index,
      meta: {keepAlive: true, title: '魔码云-智能应用品台|网站建设|微信小程序开发|H5营销|微信公众号|H5网站|响应式网站|微信网站|小程序制作|H5海报|企业建站|自助建站', keyword: '智能建站，自助建站，网站建设，网站制作，网站设计，网页设计，网站模板，网页模板，企业建站，公众号，做网站，微信小程序，微信小程序开发，H5，微传单，海报，微站，微网站，摇一摇，大转盘，手机网站', description: '魔码云是一个智能应用平台，无需任何编程和设计经验，即可在短时间内快速制作网站、小程序、H5传单及微信公众号，并可自动适配各种电脑、平板和手机移动设备。'},
      children: [
        {
          path: '/pre',
          component: Pre
        },
        {
          path: '/model',
          component: Model
        },
        {
          path: '/login',
          component: IndexLogin
        },
        {
          path: '/register',
          component: IndexRegister
        },
        {
          path: '/password',
          component: IndexPasswrod
        },
        {
          path: '/center',
          component: IndexProductCenter
        },
        {
          path: '/site',
          component: NewSite
        },
        {
          path: '/admin',
          component: cIndex
        },
        {
          path: '/step',
          component: stepIndex
        },
        {
          path: '/allset',
          component: setIndex
        },
        {
          path: '/account',
          component: Account
        },
        {
          path: '/myaccount',
          component: Myaccount
        },
        {
          path: '/recharge',
          component: Recharge
        },
        {
          path: '/work',
          component: Work,
          children: [
            {
              path: '/work/mywork',
              component: myWork
            }
          ]
        },
        {
          path: '/pay',
          component: PayIndex
        },
        {
          path: '/dllogin',
          component: IndexdlLogin
        },
        {
          path: '/userlogin',
          component: IndexuserLogin
        },
        {
          path: '/usercenter',
          component: IndexUserCenter
        },
        {
          path: '/stafflogin',
          component: Stafflogin
        }
      ]
  	},
    {
      path: '/home',
      component: Home
    }
  ]
})
