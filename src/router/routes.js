import Home from './modules/home'
import SystemAdmin from './modules/system-admin'

let desktop = {
  path: '/',
  component: resolve => require(['@/pages/home/desktop'], resolve),
  children: []
}
let defaultRoute = [
  { path: 'error', component: resolve => require(['@/pages/home/error'], resolve) },
  { path: '404', component: resolve => require(['@/pages/home/404'], resolve) }
]

desktop.children = desktop.children.concat(Home, defaultRoute, SystemAdmin)

let routes = [
  desktop,
  { path: '/login', component: resolve => require(['@/pages/home/login'], resolve) }
]

export default routes
