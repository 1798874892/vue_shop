module.exports = {
    lintOnSave: false,
    // 项目优化通过chainWebpack自定义打包入口
    chainWebpack: config => {
        // 发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')

            // externals加载外部CDN资源 能够排除某些包不被打包到最终的文件中去
            config.set('externals', {
                'vue': 'Vue',
                'vue-router': 'VueRouter',
                'axios': 'axios',
                'lodash': '_',
                'echarts': 'echarts',
                'nprogress': 'NProgress',
                'vue-quill-editor': 'VueQuillEditor',
                'element-ui': 'ELEMENT'
            })
        })
        
        // 开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')
        })
    }
}