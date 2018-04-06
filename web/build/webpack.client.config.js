const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const isProd = NODE_ENV === 'production'

let config = merge(base('client'), {
	entry: {
		app: isProd ? './src/entry-client.js' : ['webpack-hot-middleware/client', './src/entry-client.js']
	},
	plugins: [
		new VueSSRClientPlugin(),
		new HtmlWebpackPlugin({
    	template: './src/index.html',
			inject: false,
			favicon: './src/favicon.png',
			minify: !isProd ? false : {
    		removeAttributeQuotes: true,
    		collapseWhitespace: true,
    		html5: true,
    		removeEmptyAttributes: true,
  		},
  		hash: true
    })
	]
})

if (!isProd) {
	config = merge(config, {
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	})
}
module.exports = config
