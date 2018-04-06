<template lang="pug">
  div
    router-link( to="/test/" ) TEST APP
    h1 Get a Secret Chuck Norris Quote!
    button( @click="getQuote" ) Get a Quote
    div( v-if="quote" )
      h2
        blockquote {{ quote }}
</template>

<script>
const url = VUE_ENV === 'server' ? 'http://zabori_api:6000' : ''
import auth from '../auth'
export default {
  data() {
    return {
      quote: ''
    }
  },
  methods: {
    getQuote() {
      this.$http.get(`${url}/api/protected/random-quote`/*, { headers: auth.getAuthHeader(this) }*/).then(response => {
          this.quote = response.data;
      })
      .catch(err => console.log(err))
    }
  },
  route: {
    canActivate() {
      return auth.user.authenticated
    }
  }
}
</script>
