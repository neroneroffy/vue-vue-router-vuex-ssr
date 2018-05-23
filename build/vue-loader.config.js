module.exports = isDev => {
    return {
        preserveWhiteSpace: true,//减少template中的空格影响
        extractCss:isDev,
        cssModules:{
            localIdentName:isDev? '[path]-[name]-[hash:base64:5]':'[hash:base64:5]',
            camelCase:true//将用横杠链接的类名转换为驼峰命名
        },
        //hotReload:false //可关闭vue组件的热重载

    }
}