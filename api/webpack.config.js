const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServerPlugin = require('start-server-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const NODE_ENV = process.env.NODE_ENV
const isProd = NODE_ENV === 'production'

module.exports = {
	mode: NODE_ENV,
	entry: isProd ? './server/index' : ['webpack/hot/poll?1000', './server/index'],
	watch: !isProd,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000
	},
	target: 'node',
	externals: nodeExternals(isProd ? {} : { whitelist: ['webpack/hot/poll?1000'] }),
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
		]
	},
	plugins: isProd
		? [
			new webpack.DefinePlugin({
				NODE_ENV: JSON.stringify(NODE_ENV)
			})
		]
		:	[
		  new StartServerPlugin('server.js'),
			new webpack.HotModuleReplacementPlugin(),
			new FriendlyErrorsPlugin(),
			new webpack.DefinePlugin({
				NODE_ENV: JSON.stringify(NODE_ENV)
			})
		],
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'server.js'
	}
}
