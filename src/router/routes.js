
const routes = [
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
  },
  {
    path: '/app',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/app/IndexPage.vue') }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
