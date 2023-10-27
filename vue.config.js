const defaultDocumentTitle = '数据大屏' //默认html页面 title 值

// vue.config.js
module.exports = {
	lintOnSave: false,
	chainWebpack: (config) => {
		config.plugin('html').tap((args) => {
			args[0].title = defaultDocumentTitle
			return args
		})
	},
	publicPath: './',
	assetsDir: 'static',
	productionSourceMap: false,
	devServer: {
		proxy: {
			'/api':{
				target:'http://192.168.1.20:7904/',
				pathRewrite:{
						'^/api':'api'
					}
			}
		}
	}
}