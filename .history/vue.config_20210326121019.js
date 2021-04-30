module.exports = {
    lintOnSave: false,
    chainWebpack: config => {
        config.when(process.env.NODE.ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')
        })

        config.when(process.env.NODE.ENV === 'development', config => {
            config.entry('app').clear().add('./src/main-dev.js')
        })
    }
}