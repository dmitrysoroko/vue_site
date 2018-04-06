<template lang="pug">
div
  nav
    div.container
      ul
        li
          router-link( to="/test/home" ) Home
        li( v-if="!authenticated" )
          router-link( to="/test/login" ) Login
        li( v-if="!authenticated" )
          router-link( to="/test/signup" ) Sign Up
        li( v-if="authenticated" )
          router-link( to="/test/secretquote" ) Secret Quote
        li( v-if="authenticated" )
          button( @click="logout" ) Logout
  div.container
    router-view
</template>

<script>
import auth from '../auth'
export default {
  data() {
    return {
      user: {
        authenticated: null
      },
      test: null
    }
  },

  created () {
    console.log('Create')
    this.user.authenticated = !!this.$store.state.items['auth']
  },

  computed: {
    authenticated() {
      return !!this.$store.state.items['auth']
    }
  },

  methods: {
    logout() {
      console.log("YOU LOGOUT")
      auth.logout(this)
    }
  }
}
</script>
