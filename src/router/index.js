import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '../views/user/UserView.vue'
import CategoryView from '../views/category/CategoryView.vue'
import PeriodView from '../views/period/PeriodView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/category',
    name: 'category',
    component: CategoryView
  },
  {
    path: '/period',
    name: 'period',
    component: PeriodView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
