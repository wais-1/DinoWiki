import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import DinoPage from '@/views/DinoPage.vue'
import Login from '@/views/Login.vue'
import CreateAcc from '@/views/CreateAcc.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import Account from '@/views/Account.vue'
import Admin from '@/views/Admin.vue'
import AddCard from '@/views/AddCard.vue'
import AddPage from '@/views/AddPage.vue'
import { useAuthStore } from '@/stores/auth'
import updateCard from '@/views/updateCard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomePage },
    { path: '/dino/:id', component: DinoPage },
    { path: '/login', component: Login },
    { path: '/createAccount', component: CreateAcc },
    { path: '/forgotPassword', component: ForgotPassword },
    { path: '/account', component: Account },
    { path: '/addCard', component: AddCard },
    { path: '/addPage', component: AddPage },
    { path: '/updateCard', component: updateCard },
    { 
      path: '/admin', 
      component: Admin,
      beforeEnter: (to, from, next) => {
        const authStore = useAuthStore()
        if (authStore.isAdmin) next()
        else next('/')
      }
    }
  ]
})

export default router