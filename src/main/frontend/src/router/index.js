import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useLoginStore } from '../stores/loginStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/user",
      name: "userLayout",
      component: () => import("../layouts/UserLayout.vue"),
      meta: { requiresAuth: true },
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: () => import("../views/DashboardView.vue"),
          meta: { requiresAuth: true },
        },
        {
          path: "details",
          name: "userDetails",
          component: () => import("../views/UserDetails.vue"),
          meta: { requiresAuth: true },
        },
      ],
    },
  ],
});
router.beforeEach((to, from) => {
  const store = useLoginStore();

  if(to.meta.requiresAuth && !store.isAuthenticate) return {name: 'home'}
  if(to.meta.requiresAuth && !store.isAuthenticate && store.roleLogin==='ROLE_USER') return {name: 'userLayout'}
})
export default router
