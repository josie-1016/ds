import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      headerClass: "transparent-header" // 主页的导航栏透明
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUp.vue'),
  },
  {
    path: '/allfiles',
    name: 'allfiles',
    component: () => import('../views/AllFiles.vue'),
  },
  {
<<<<<<< HEAD
=======
    path: '/certificates',
    name: 'certificates',
    component: () => import('../views/certificates/Certificates.vue'),
    children: [
      {
        path: '',
        name: 'list',
        component: () => import('../views/certificates/_List.vue'),
      },
      {
        path: 'search',
        name: 'search',
        component: () => import('../views/certificates/_Search.vue'),
      },
      {
        path: 'apply',
        name: 'apply',
        component: () => import('../views/certificates/_Apply.vue'),
      },
    ]
  },
  {
>>>>>>> dabe
    path: '/user',
    name: 'user',
    component: () => import('../views/user/User.vue'),
    // rendered inside User's <router-view>
    children: [
      {
        path: '',
        name: 'attributes',
        component: () => import('../views/user/attributes/Attributes.vue'),
      },
      {
        path: 'files',
        name: 'files',
        component: () => import('../views/user/files/Files.vue'),
      },
      {
<<<<<<< HEAD
=======
        path: 'numbers',
        name: 'numbers',
        component: () => import('../views/user/numbers/Numbers.vue'),
      },
      {
>>>>>>> dabe
        path: 'organizations',
        name: 'organizations',
        component: () => import('../views/user/organizations/Organizations.vue'),
      },
      {
        path: 'organization/:org',
        name: 'organization',
        component: () => import('../views/user/organization/Organization.vue'),
      },
<<<<<<< HEAD
=======
      {
        path: 'SM2files',
        name: 'SM2files',
        component: () => import('../views/user/SM2files/SM2files.vue'),
      },
>>>>>>> dabe
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
