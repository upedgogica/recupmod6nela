import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/',
    name: 'about',
    component: () => import("../views/AboutView.vue")
  },
  {
    path: '/areas',
    name: 'areas',
    component: () => import("../views/areas/AreaView")
  },
  {
    path: '/empleados',
    name: 'empleados',
    component: () => import("../views/empleados/EmpleadoView")
  },
  {
    path: '/add-empleados',
    name: 'Add empleado',
    component: () => import("../views/empleados/AddEmpleado.vue")
  },
  {
    path: '/edit-empleados/:id',
    name: 'Edit empleados',
    component: () => import("../views/empleados/EditEmpleado.vue")
  },
  {
    path: '/tipos',
    name: 'tipos',
    component: () => import("../views/tipos/TipoView")
  },
  {
    path: '/add-tipos',
    name: 'Add tipo',
    component: () => import("../views/tipos/AddTipo.vue")
  },
  {
    path: '/edit-tipos/:id',
    name: 'Edit tipos',
    component: () => import("../views/tipos/EditTipo.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
