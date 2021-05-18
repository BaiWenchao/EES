import { createRouter, createWebHistory } from 'vue-router'
import Admin from '../view/Admin.vue'
import Staff from '../view/Staff.vue'
import Login from '../view/Login.vue'
import Expert from '../view/Expert.vue'
import Commander from '../view/Commander.vue'
import store from '../store/index'

import ReportHandle from '../component/commander/ReportHandle.vue'
import EmergencyHandle from '../component/commander/EmergencyHandle.vue'
import Approval from '../component/commander/Approval.vue'

import ExpertReportHandle from '../component/expert/ReportHandle.vue'
import ExpertApproval from '../component/expert/Approval.vue'

import EventMaintain from '../component/staff/EventMaintain.vue'
import ProcessMaintain from '../component/staff/ProcessMaintain.vue'
import EnterpriseMaintain from '../component/staff/EnterpriseMaintain.vue'
import MateriaLocation from '../component/staff/MaterialLocation.vue'
import MateriaMaintain from '../component/staff/MaterialMaintain.vue'
import ReportMaintain from '../component/staff/ReportMaintain.vue'
import CityMaintain from '../component/staff/CityMaintain.vue'
import TransportMaintain from '../component/staff/TransportMaintain.vue'

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
    component: Staff,
    children: [
      {
        path: 'eventmaintain',
        component: EventMaintain
      },
      {
        path: 'processmaintain',
        component: ProcessMaintain
      },
      {
        path: 'enterprisemaintain',
        component: EnterpriseMaintain
      },
      {
        path: 'materialLocation',
        component: MateriaLocation
      },
      {
        path: 'materialmaintain',
        component: MateriaMaintain
      },
      {
        path: 'reportmaintain',
        component: ReportMaintain
      },
      {
        path: 'citymaintain',
        component: CityMaintain
      },
      {
        path: 'transportmaintain',
        component: TransportMaintain
      }
    ]
  },
  {
    name: 'expert',
    path: '/expert',
    component: Expert,
    children: [
      {
        path: 'reporthandle',
        component: ExpertReportHandle
      },
      {
        path: 'approval',
        component: ExpertApproval
      }
    ]
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

router.beforeEach((to) => {
  if (store.state.userInformation.type !== 'visitor' || to.path === '/') {
    return true
  }

  return '/'
})

export default router
