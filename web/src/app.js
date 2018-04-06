import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import createRouter from './router'
import createStore from './store'
import VueLocalStorage from 'vue-localstorage'
import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'
import auth from './auth'
import $ from 'jquery'

Vue.prototype.$jquery = $
Vue.prototype.$auth = auth
Vue.use(VueResource)

export default function createApp() {
	const store = createStore()
	const router = createRouter(store)

	Vue.http.interceptors.push(function(request) {
		const token = store.state.items['auth']
		if (token) {
			console.log('header set')
			request.headers.set('Authorization', `Bearer ${token}`)
		}
	});

	sync(store, router)

	const app = new Vue({
		router,
		store,
		render: h => h(App)
	})

	return { app, router, store }
}
