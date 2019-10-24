export default [
  { path: 'system/info', component: resolve => require(['@/pages/system-admin/system-info-list'], resolve) },
  { path: 'system/menu', component: resolve => require(['@/pages/system-admin/system-menu-list'], resolve) },
  { path: 'system/params', component: resolve => require(['@/pages/system-admin/system-params-list'], resolve) },
  { path: 'system/log', component: resolve => require(['@/pages/system-admin/operation-log-list'], resolve) },
  { path: 'system/dictionary', component: resolve => require(['@/pages/system-admin/data-dictionary-list'], resolve) },
  { path: 'system/ou', component: resolve => require(['@/pages/system-admin/org-ou-list'], resolve) }
]
