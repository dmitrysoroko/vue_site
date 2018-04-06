import createApp from './app'

export default context =>
	new Promise((resolve, reject) => {
		const { app, router, store } = createApp()
		const meta = app.$meta()
		if (context.cookies.access_token) {
			store.commit('setAuthUser', context.cookies.access_token)
		}
		else {
			store.commit('deleteAuthUser')
		}
		router.push(context.url)
		context.meta = meta
		console.log('entry server')
		console.log(context.meta)
		router.onReady(() => {
			const matchedComponents = router.getMatchedComponents()
			if (!matchedComponents.length) {
				return reject(new Error('404'))
			}
			Promise.all(matchedComponents.map((Component) => {
				if (Component.asyncData) {
					return Component.asyncData({
						store,
						route: router.currentRoute
					})
				}
				return undefined
			})).then(() => {
				context.state = store.state
				resolve(app)
			}).catch(reject)
			return undefined
		}, reject)
	})
