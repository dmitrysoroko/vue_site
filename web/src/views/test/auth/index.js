const API_URL = VUE_ENV === 'server' ? 'http://zabori_api:6000' : ''
const LOGIN_URL = API_URL + '/api/sessions/create'
const SIGNUP_URL = API_URL + '/api/users'

export default {

  user: {
    authenticated: false
  },

  login(context, creds) {
    context.$http.post(LOGIN_URL, creds).then(response => {
      context.$cookie.set('id_token', response.data.id_token, '5h')
      context.$cookie.set('access_token', response.data.access_token, '5h')
      context.$store.commit('setAuthUser', response.data.access_token)
      this.user.authenticated = true
      context.$router.push('/test/secretquote')
    })
    .catch(err => context.error = err)
  },

  signup(context, creds) {
    context.$http.post(SIGNUP_URL, creds).then(response => {
      context.$cookie.set('id_token', response.data.id_token, '5h')
      context.$cookie.set('access_token', response.data.access_token, '5h')
      context.$store.commit('setAuthUser', response.data.access_token)
      this.user.authenticated = true
      context.$router.push('/test/secretquote')
    })
    .catch(err => context.error = err)
  },

  logout(context) {
    console.log('LOGOUT')
    context.$cookie.delete('id_token')
    context.$cookie.delete('access_token')
    context.$store.commit('deleteAuthUser')
    this.user.authenticated = false
    // context.$router.push('/test/login')
  },

  checkAuth(context) {
    var jwt = context.$cookie.get('id_token')
    if(jwt) {
      return true
    }
    else {
      return false
    }
  },


  getAuthHeader(context) {
    return {
      'Authorization': 'Bearer ' + context.$cookie.get('access_token')
    }
  }
}
