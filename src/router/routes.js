const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', name: 'listarPage', component: () => import('pages/Listar/IndexPage.vue') },
      { path: '/endereco/buscar', name: 'buscarPage', component: () => import('pages/Buscar/IndexPage.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
