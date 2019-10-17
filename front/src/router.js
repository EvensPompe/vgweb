import Vue from 'vue'
import Router from 'vue-router'
import Connexion from './views/connexion'
import Inscription from './views/inscription'
import Result from './views/result'
import InterAdmin from './views/interface/interAdmin'
import InterUser from './views/interface/interUser'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:'/connexion',
      name:"connexion",
      component: Connexion
    },
    {
      path:'/inscription',
      name:'inscription',
      component: Inscription
    },
    {
      path:'/result',
      name:'result',
      component: Result
    },
    {
      path:'/admin',
      name:'admin',
      component: InterAdmin
    },
    {
      path:'/utilisateur',
      name:'utilisateur',
      component: InterUser
    }
  ]
})
