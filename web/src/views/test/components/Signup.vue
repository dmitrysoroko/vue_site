<template lang="pug">
  div
    h2 Sign Up
    p Sign up for a free account to get some great quotes.
    div( v-if="error" )
      p {{ error }}
    div
      input(
        type="text",
        class="form-control",
        placeholder="Enter your username",
        v-model="credentials.username"
      )
    div
      input(
        type="password",
        class="form-control",
        placeholder="Enter your password",
        v-model="credentials.password"
      )
    button( @click="submit" ) Access
</template>

<script>
import auth from '../auth'
export default {
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      error: ''
    }
  },
  methods: {
    submit() {
      var credentials = {
        username: this.credentials.username,
        password: this.credentials.password
      }
      auth.signup(this, credentials)
    }
  }
}
</script>
