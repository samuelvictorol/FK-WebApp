
const routes = [
  {
    path: '/',
    component: () => import('layouts/LandingLayout.vue'),
  },
  {
    path: '/app',
    component: () => import('layouts/AppLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/app/IndexPage.vue') },
      { path: 'forms', component: () => import('src/pages/app/forms/FormsPage.vue') },
      { path: 'form/cronotipo', component: () => import('src/pages/app/forms/CronotipoPage.vue') },
      { path: 'form/forma-aprendizado', component: () => import('src/pages/app/forms/FormaAprendizadoPage.vue') },
      { path: 'form/estilo-aprendizado', component: () => import('src/pages/app/forms/EstiloAprendizadoPage.vue') },
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/admin/IndexPage.vue') },
      { path: 'forms', component: () => import('src/pages/admin/FormsPage.vue') },
      { path: 'vendas', component: () => import('src/pages/admin/VendasPage.vue') },
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
