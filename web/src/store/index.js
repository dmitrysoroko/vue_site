import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const url = VUE_ENV === 'server' ? 'http://zabori_api:6000' : ''

function fetchItem() {
	return new Promise((resolve, reject) => {
		Vue.http.get(`${url}/api/1`)
			.then((response) => {
				resolve(response.data)
			}, (e) => { throw e })
			.catch((err) => {
				reject(err)
			})
	})
}

function addArticle(article) {
	return new Promise((resolve, reject) => {
		Vue.http.post('/api/addArticle', article)
			.then((response) => {
				resolve(response.data)
			}, (e) => { throw e })
			.catch((err) => {
				reject(err)
			})
	})
}

function getArticleList() {
	return new Promise((resolve, reject) => {
		Vue.http.get(`${url}/api/getArticleList`)
			.then((response) => {
				resolve(response.data)
			}, (e) => { throw e })
			.catch((err) => {
				reject(err)
			})
	})
}

function getImages() {
	return new Promise((resolve, reject) => {
		Vue.http.get(`${url}/api/getImages`)
			.then((response) => {
				resolve(response.data)
			}, (e) => { throw e })
			.catch((err) => {
				reject(err)
			})
	})
}

export default function createStore() {
	return new Vuex.Store({
		state: {
			items: {}
		},
		actions: {
			fetchItem({ commit }, id) {
				// возвращаем Promise через `store.dispatch()`
				// чтобы мы могли понять когда данные будут загружены
				return fetchItem(1).then((item) => {
					commit('setItem', { id, item })
				})
			},

			addArticle({ commit }, article) {
				return addArticle(article).then(() => {
					commit('addArticle', { article })
				})
			},

			getArticleList({ commit }) {
				let id = 'articleList'
				// возвращаем Promise через `store.dispatch()`
				// чтобы мы могли понять когда данные будут загружены
				return getArticleList().then((item) => {
					commit('setItem', { id, item })
				})
			},

			getImages({ commit }) {
				let id = 'images'
				return getImages().then((item) => {
					commit('setItem', { id, item })
				})
			}
		},
		mutations: {
			addArticle(state, { article }) {
				if (article.id) {
					const index = state.items.articleList.findIndex(el => el.id == article.id)
					state.items.articleList[index] = article
				}
				else {
					state.items.articleList.push(article)
				}
			},

			setItem(state, { id, item }) {
				Vue.set(state.items, id, item)
			},

			setAuthUser(state, item) {
				Vue.set(state.items, 'auth', item)
			},

			deleteAuthUser(state) {
				Vue.delete(state.items, 'auth')
			}
		}
	})
}
