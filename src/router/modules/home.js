module.exports = [
  {
    path: '/',
    component: resolve => require(['@/pages/home/desktop'], resolve),
    children: [
      { path: '', name: 'default', component: resolve => require(['@/pages/home/index'], resolve) }
    ]
  },
  { path: '/error', component: resolve => require(['@/pages/home/error'], resolve) },
  { path: '/404', component: resolve => require(['@/pages/home/404'], resolve) },
  { path: '/login', component: resolve => require(['@/pages/home/login'], resolve) }
]
