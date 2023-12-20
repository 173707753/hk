const defaultDocumentTitle = '电力碳中和智能化调度' //默认html页面 title 值

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
			'/api': {
				target: 'http://10.13.65.232:8000/',
				// pathRewrite: {
				// 	'^/api': 'api'
				// }

			}
		}
	}
}