import Vue from 'vue'
import VueCookie from 'vue-cookie'
import createApp from './app'

const { app, router, store } = createApp()

Vue.use(VueCookie);

Vue.mixin({
	beforeRouteUpdate(to, from, next) {
		const { asyncData } = this.$options
		if (asyncData) {
			asyncData({
				store: this.$store,
				route: to
			}).then(next).catch(next)
		} else {
			next()
		}
	}
})

if (window.__INITIAL_STATE__) {
	store.replaceState(window.__INITIAL_STATE__)
}

router.onReady(() => {
	router.beforeResolve((to, from, next) => {
		const matched = router.getMatchedComponents(to)
		const prevMatched = router.getMatchedComponents(from)
		Promise.all(matched
			.filter((c, i) => prevMatched[i] !== c && c.asyncData)
			.map(c => c.asyncData({ store, route: to })))
			.then(() => next())
			.catch(next)
	})
	app.$mount('#app')
})
