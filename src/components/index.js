// 自定义组件
import Loading from './plugins/loading'
import SysHeader from './plugins/sys-header'
import SysFooter from './plugins/sys-footer'
import NavMenu from './plugins/nav-menu'
import Page from './plugins/page'
import PagePath from './plugins/page-path'
import SearchBar from './plugins/search-bar'
import ButtonBar from './plugins/button-bar'
// 自定义指令
import Scrollbar from './directives/scrollbar'
import LoadingDirective from './directives/loading'
// 扩展组件
import LinkButton from './extend/link-button'
import MenuButton from './extend/menu-button'
import Dialog from './extend/dialog'
import DataGrid from './extend/data-grid'
import TreeGrid from './extend/tree-grid'
import ComboBox from './extend/combo-box'
import ComboTree from './extend/combo-tree'
import Form from './extend/form'
import Label from './extend/label'
import TextBox from './extend/text-box'

const custom = {
  install (Vue) {
    // 注册组件
    [
      Loading,
      SysHeader,
      SysFooter,
      NavMenu,
      Page,
      ButtonBar,
      PagePath,
      SearchBar
    ].forEach(item => {
      Vue.component(item.name, item)
    });
    // 注册指令
    [
      Scrollbar,
      LoadingDirective
    ].forEach(item => {
      Vue.directive(item.name, item)
    });
    [
      LinkButton,
      MenuButton,
      Dialog,
      DataGrid,
      TreeGrid,
      ComboBox,
      ComboTree,
      Form,
      Label,
      TextBox
    ].forEach(item => {
      Vue.component(item.name, item)
    })
  }
}

export default custom
