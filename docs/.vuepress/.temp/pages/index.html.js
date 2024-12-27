import comp from "G:/react/前端编码规范工程化/demo/docs/.vuepress/.temp/pages/index.html.vue"
const data = JSON.parse("{\"path\":\"/\",\"title\":\"前端编码规范工程化\",\"lang\":\"zh-CN\",\"frontmatter\":{\"lang\":\"zh-CN\",\"title\":\"前端编码规范工程化\",\"description\":\"页面的描述\",\"home\":true,\"heroText\":\"我的项目\",\"tagline\":\"前端编码规范工程化\",\"actionText\":\"立刻进入 →\",\"actionLink\":\"/coding/html.md\",\"features\":[{\"title\":\"完善的规范生态\",\"details\":\"支持对全部前端配置实现一键接入、一键扫描、一键修复、一键升级\"},{\"title\":\"支持 Typescript\",\"details\":\"提供完整的类型注释，帮助您从 0~1 掌握完整的前端规范化\"},{\"title\":\"完整的测试用例\",\"details\":\"配套完整的测试用例，帮助您提升项目健壮性\"}]},\"headers\":[{\"level\":2,\"title\":\"⭐ 设计目的\",\"slug\":\"设计目的\",\"link\":\"#设计目的\",\"children\":[]},{\"level\":2,\"title\":\"💡 为什要学习前端工程化\",\"slug\":\"为什要学习前端工程化\",\"link\":\"#为什要学习前端工程化\",\"children\":[]},{\"level\":2,\"title\":\"🛋️ 配套工具\",\"slug\":\"配套工具\",\"link\":\"#配套工具\",\"children\":[]},{\"level\":2,\"title\":\"📧 联系\",\"slug\":\"联系\",\"link\":\"#联系\",\"children\":[]}],\"git\":{},\"filePathRelative\":\"index.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
