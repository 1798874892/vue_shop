module.exports = {
    lintOnSave: false,
    // "/shop": {
    //     target: "http://127.0.0.1:8888/api/private/v1/",
    //     changeOrigin: true,
    //     pathRewrite: {
    //         "^/shop": ""
    //     }
    // },
     // 项目优化通过chainWebpack自定义打包入口
     chainWebpack: config => {
        // 发布模式
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')

            // externals加载外部CDN资源 能够排除某些包不被打包到最终的文件中去
            config.set('externals', {
                vue: 'Vue',
                'vue-router': 'VueRouter',
                axios: 'axios',
                lodash: '_',
                echarts: 'echarts',
                nprogress: 'NProgress',
                'vue-quill-editor': 'VueQuillEditor',
                "ElementUI": "element-ui"
            })

            config.plugin('html').tap(args => {
                args[0].isProd = true
                return args
            })
        })
        
        // 开发模式
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')

            config.plugin('html').tap(args => {
                args[0].isProd = false
                return args
            })
        })
    }
}