
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
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('pages/admin/IndexPage.vue') },
      { path: 'tags', component: () => import('pages/admin/TagsPage.vue') },
      { path: 'novo-form', component: () => import('pages/admin/NewFormTemplatePage.vue') },
      { path: 'clientes', component: () => import('pages/admin/ClientesPage.vue') }
    ]
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
