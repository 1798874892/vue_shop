// 这是项目发布阶段需要用到的babel插件
// 在项目上线时console.log要全部移除 而在开发式是需要用到console.log来观察数据的
const prodPlugins = []
if(process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 发布产品时候的插件数组
    ...prodPlugins,
    // 路由懒加载插件
    '@babel/plugin-syntax-dynamic-import'
  ]
}
