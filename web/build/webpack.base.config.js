const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const SyntaxDynamicImport = require('babel-plugin-syntax-dynamic-import')

const NODE_ENV = process.env.NODE_ENV
const isProd = NODE_ENV === 'production'

module.exports = function(env) {
	let plugins
	isProd
	? plugins = [
		new ExtractTextPlugin({
			filename: 'styles.css',
			allChunks: true
		})
	]
	: plugins = [
		new FriendlyErrorsPlugin()
	]

	let config = {
		mode: NODE_ENV,
		output: {
			path: path.resolve(__dirname, '../dist'),
			publicPath: '/dist/',
			filename: '[name].js'
		},
		resolve: {
	    extensions: ['.js', '.vue', '.json'],
	    alias: {
	      'src': path.resolve(__dirname, '../src'),
	      'components': path.resolve(__dirname, '../src/components')
	    }
	  },
		module: {
			rules: [
				{
					test: /\.vue$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'vue-loader',
							options: {
								loaders: {
									sass: isProd
										? ExtractTextPlugin.extract({
											use: 'css-loader?minimize!sass-loader?indentedSyntax',
											fallback: 'vue-style-loader'
										})
										: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
								}
							}
						}
					]
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'babel-loader',
							options: {
								plugins: [SyntaxDynamicImport]
							}
						}
					]
				},
				{
					test: /\.(png|jpg|gif|svg)$/,
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: '[name].[ext]?[hash]'
					}
				},
			]
		},
		plugins: [
			new webpack.DefinePlugin({
				NODE_ENV: JSON.stringify(NODE_ENV),
				VUE_ENV: JSON.stringify(env)
			})
		]
	}

	config = merge(config, {
		plugins: plugins
	})

	return config
}
