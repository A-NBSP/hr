import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)
// require.context（'导入文件的路径'，是否查找子目录，'匹配文件的正则'）:批量导入文件，返回一个方法
// req.keys():导入文件的所有文件名数组
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
  requireContext.keys().map(requireContext)
}
requireAll(req)
