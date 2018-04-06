<template lang="pug">
  div
    h2 Log In
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
      this.$auth.login(this, credentials)
    }
  }

}
</script>
