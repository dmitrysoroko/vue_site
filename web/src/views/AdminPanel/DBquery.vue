<template lang="pug">
div
  h2 Database query
  label( for="title" ) Query:
  textarea#title( v-model="query" )
  button( @click="doQuery" ) Query
  p {{ response }}
</template>

<script>

	export default {
    methods: {
      doQuery() {
        this.$http.post('/api/query', { query: this.query })
        .then(response => {
          this.response = response.data
        })
        .catch(e => {
          console.log(e)
        })
      }
    },

		data() {
			return {
				query: '',
        response: ''
			}
		}
	}
</script>

<style lang="sass" scoped>
  textarea
    width: 500px
    height: 300px
</style>
