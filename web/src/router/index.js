import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Meta from 'vue-meta'

Vue.use(Router)
Vue.use(VueResource)
Vue.use(Meta)

const HomeView = () => import('../views/HomeView.vue')
const AboutView = () => import('../views/AboutView.vue')
const ArticleListView = () => import('../views/ArticleListView.vue')
const ArticleItemView = () => import('../views/ArticleItemView.vue')
const ArticlePanelView = () => import('../views/AdminPanel/ArticlePanel/ArticleView.vue')
const AddArticle = () => import('../views/AdminPanel/ArticlePanel/component/AddArticle.vue')
const ShowArticles = () => import('../views/AdminPanel/ArticlePanel/component/ShowArticles.vue')

const Gallery = () => import('../views/AdminPanel/ImagesGallery/Gallery.vue')
const AddImage = () => import('../views/AdminPanel/ImagesGallery/components/AddImage.vue')
const ShowImages = () => import('../views/AdminPanel/ImagesGallery/components/ShowImages.vue')

const DBquery = () => import('src/views/AdminPanel/DBquery.vue')
const AdminLogin = () => import('src/views/AdminPanel/Login.vue')
const AdminHome = () => import('src/views/AdminPanel/Home.vue')

const TestApp = () => import('src/views/test/components/App.vue')
const TestHome = () => import('src/views/test/components/Home.vue')
const TestLogin = () => import('src/views/test/components/Login.vue')
const TestSecretQuote = () => import('src/views/test/components/SecretQuote.vue')
const TestSignup = () => import('src/views/test/components/Signup.vue')

const url = VUE_ENV === 'server' ? 'http://zabori_api:6000' : ''

export default function createRouter(store) {
	const router =  new Router({
		mode: 'history',
		fallback: false,
		scrollBehavior: () => ({ y: 0 }),
		routes: [
			{ path: '/test/', component: TestApp },
			{ path: '/test/home', component: TestHome },
			{ path: '/test/login', component: TestLogin },
			{ path: '/dsoroko', component: AdminLogin },
			{ path: '/admin/home', component: AdminHome, meta: { requiresAccess: 'full_access' } },
			{ path: '/query', component: DBquery, meta: { requiresAccess: 'full_access' } },
			{ path: '/panel/article', component: ArticlePanelView, meta: { requiresAccess: 'full_access' },
				children: [
					{ path: 'add', component: AddArticle },
        	{ path: 'show', component: ShowArticles }
      	]
			},
			{ path: '/gallery', component: Gallery, meta: { requiresAccess: 'full_access' },
				children: [
					{ path: 'add', component: AddImage },
					{ path: 'show', component: ShowImages }
				]
			},
			{
				path: '/test/secretquote',
				component: TestSecretQuote,
				meta: { requiresAccess: 'full_access' }
			},
			{ path: '/test/signup', component: TestSignup },

			{ path: '/home', component: HomeView },
			{ path: '/about', component: AboutView },
			{ path: '/articles', component: ArticleListView },
			{ path: '/articles/:id', component: ArticleItemView },
			{ path: '/', redirect: '/home' },
			{ path: '*', redirect: '/home' }
		]
	})

	router.beforeResolve((to, from, next) => {
		const access = to.matched.map(record => record.meta.requiresAccess).find(record => !!record)
		if (access) {
			const token = store.state.items['auth']
			if (token) {
				Vue.http.post(`${url}/api/checkAccess`, { token: token }).then(response => {
		      if (response.data === access) {
						next();
					}
					else {
						next({ path: '/'});
					}
		    })
		    .catch(err => console.log(err))
			}
			else {
				next({ path: '/dsoroko'});
			}
		}
		else {
			next()
		}
	});

	return router
}
