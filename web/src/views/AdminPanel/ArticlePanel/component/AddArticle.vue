<template lang="pug">
div
  h2 Add Article
  label( for="title" ) Title:
  input#title( v-model="article.title" )
  button( @click="addArticle" ) save
  label( for="preview" ) Preview:
  textarea#preview(
		v-model="article.preview"
	)
  label( for="content" ) Content:
  textarea#content(
		v-model="article.content"
	)
</template>

<script>
	export default {
		components: {

		},

    methods: {
      addArticle() {
        this.$http.post('/api/addArticle', this.article)
        .then(response => {

        })
        .catch(e => {
          console.log(e)
        })
      }
    },

		asyncData({ store }) {
			return store.dispatch('fetchItem', 1)
		},

		data() {
			return {
        article: {
          content: '',
          title: '',
          preview: ''
        }
			}
		},

		computed: {
			pets() {
				return this.$store.state.items[1]
			}
		}
	}
</script>

<style lang="sass" scoped>
  textarea
    width: 800px
    height: 500px
</style>
