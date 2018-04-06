<template lang="pug">
  div
    h1 Get a Free Chuck Norris Quote!
    button( @click="getQuote()" ) Get a Quote
    div( v-if="quote" )
      h2
        blockquote {{ quote }}
</template>

<script>
const url = VUE_ENV === 'server' ? 'http://zabori_api:6000' : ''

export default {
  data() {
    return {
      quote: ''
    }
  },
  methods: {
    getQuote() {
      this.$http.get(`${url}/api/random-quote`).then(response => {
          this.quote = response.data;
      })
      .catch(err => console.log(err))
    }
  }
}
</script>
