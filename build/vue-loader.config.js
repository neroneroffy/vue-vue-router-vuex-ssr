module.exports = isDev => {
    return {
        preserveWhiteSpace: true,//减少template中的空格影响
        extractCss:isDev,
        cssModules:{},
        //hotReload:false //可关闭vue组件的热重载

    }
}