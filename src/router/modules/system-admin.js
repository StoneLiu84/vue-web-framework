export default [
  { path: 'system/info', component: resolve => require(['@/pages/system-admin/system-info-list'], resolve) },
  { path: 'system/menu', component: resolve => require(['@/pages/system-admin/system-menu-list'], resolve) }
]
