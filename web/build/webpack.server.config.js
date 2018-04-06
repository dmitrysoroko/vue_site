const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const NODE_ENV = process.env.NODE_ENV

module.exports = merge(base('server'), {
	target: 'node',
	entry: './src/entry-server.js',
	output: {
		filename: 'server-bundle.js',
		libraryTarget: 'commonjs2'
	},
	externals: nodeExternals(),
	plugins: [
		new VueSSRServerPlugin()
	]
})
