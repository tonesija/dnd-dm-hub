import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/treasure-generator',
    name: 'Treasure generator',
    component: () => import(/* webpackChunkName: "about" */ '../views/TreasureGenerator.vue')
  },
  {
    path: '/monsters',
    name: 'Monsters',
    component: () => import(/* webpackChunkName: "about" */ '../views/Monsters.vue')
  },
  {
    path: '/monsters/:slug',
    name: 'Monster',
    component: () => import(/* webpackChunkName: "about" */ '../views/Monster.vue')
  },
  {
    path: '/combat-tracker',
    name: 'Combat tracker',
    component: () => import(/* webpackChunkName: "about" */ '../views/CombatTracker.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
