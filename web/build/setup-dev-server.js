const fs = require('fs')
const path = require('path')
const MFS = require('memory-fs')
const webpack = require('webpack')
const clientConfig = require('./webpack.client.config')
const serverConfig = require('./webpack.server.config')
const HotMiddleware = require('webpack-hot-middleware')
const DevMiddleware = require('webpack-dev-middleware')

const readFile = (fs, file) => fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')

module.exports = function setupDevServer(app, templatePath, cb) {
	let bundle
	let template
	let clientManifest

	let ready
	const readyPromise = new Promise((r) => { ready = r })
	const update = () => {
		if (bundle && clientManifest) {
			ready()
			cb(bundle, { template, clientManifest })
		}
	}

	// template = fs.readFileSync(templatePath, 'utf-8')
	// fs.watchFile(templatePath, () => {
	// 	template = fs.readFileSync(templatePath, 'utf-8')
	// 	console.log('index.html template updated.')
	// 	update()
	// });

	const mfs = new MFS()

	const clientCompiler = webpack(clientConfig)
	const serverCompiler = webpack(serverConfig)
	clientCompiler.outputFileSystem = mfs
	serverCompiler.outputFileSystem = mfs

	const devMiddleware = DevMiddleware(clientCompiler, {
		publicPath: clientConfig.output.publicPath,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		}
	})

	clientCompiler.plugin('done', (stats) => {
		const info = stats.toJson()
		info.errors.forEach(err => console.error(err))
		info.warnings.forEach(err => console.warn(err))
		if (info.errors.length) return
		clientManifest = JSON.parse(readFile(mfs, 'vue-ssr-client-manifest.json'))
		template = readFile(mfs, 'index.html')
		update()
	})

	const hotMiddleware = HotMiddleware(clientCompiler)

	serverCompiler.watch(
		{
			aggregateTimeout: 300,
			poll: 1000
		},
		(err, stats) => {
			const info = stats.toJson()
			if (err) throw err
			if (info.errors.length) return
			bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
			update()
		}
	)

	app.use(devMiddleware)
	app.use(hotMiddleware)

	return readyPromise
}
