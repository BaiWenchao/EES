import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../view/Admin.vue'
import Staff from '../view/Staff.vue'
import Login from '../view/Login.vue'
import Expert from '../view/Expert.vue'
import Commander from '../view/Commander.vue'
// import store from '../store/index'

import ReportHandle from '../component/commander/ReportHandle.vue'
import EmergencyHandle from '../component/commander/EmergencyHandle.vue'
import Approval from '../component/commander/Approval.vue'

const routes = [
  {
    name: 'login',
    path: '/',
    component: Login
  },
  {
    name: 'admin',
    path: '/admin',
    component: Admin
  },
  {
    name: 'staff',
    path: '/staff',
    component: Staff
  },
  {
    name: 'expert',
    path: '/expert',
    component: Expert
  },
  {
    name: 'commander',
    path: '/commander',
    component: Commander,
    children: [
      {
        path: 'reporthandle',
        component: ReportHandle
      },
      {
        path: 'emergencyhandle',
        component: EmergencyHandle
      },
      {
        path: 'approval',
        component: Approval
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to) => {
//   let allow = false

//   switch (store.state.userInformation.type) {
//     case 'admin':
//       // 可以去的路由
//       to.name === 'admin' || to.name === 'login' ? allow = true : allow = '/'
//       break
//     case 'staff':
//       // 可以去的路由

//       break
//     case 'commander':

//       break
//     case 'expert':

//       break
//     default:
//       to.name === 'login' ? allow = true : allow = '/'
//   }

//   return allow
// })

export default router
