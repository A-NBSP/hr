// import PageTools from './PageTools'
import * as directives from '@/directive'
import * as filters from '@/filters'
// Object.keys(directives).forEach(ele => {
//   Vue.directive(ele, directives[ele])
// })
// 全局自动注册组件
// 参数1：寻找的路径，参数2：是否查找子目录，参数3：匹配的文件名
const fn = require.context('./', true, /\.vue$/)
// const components = [PageTools]
const components = fn.keys().map(ele => {
  return fn(ele)
})
export default {
  install(Vue) {
    components.forEach(ele => {
      Vue.component(ele.default.name, ele)
    })
    Object.keys(directives).forEach(ele => {
      Vue.directive(ele, directives[ele])
    })
    Object.keys(filters).forEach(key => {
      Vue.filter(key, filters[key])
    })
  }
}
