<template lang="pug">
div
  h2 Show articles
  p Article list
  div(
    v-if="articleList && articleList.length"
  )
    div.article(
      v-for="article in articleList"
    )
      template {{ article.title }}
      button( @click="editArticle(article)" ) edit
      button( @click="removeArticle(article)" ) remove
</template>

<script>
	// import HidenMenu from '../components/HidenMenu.vue'

	export default {
    methods: {
      editArticle(article) {
        console.log(`edit ${article.id}`)
      },

      removeArticle(article) {
        console.log(`remove ${article.id}`)
      },
    },

		components: {

		},

		asyncData({ store }) {
			return store.dispatch('getArticleList')
		},

		data() {
			return {
				content: 'hello'
			}
		},

		computed: {
			articleList() {
				return this.$store.state.items['articleList']
			}
		}
	}
</script>

<style lang="sass" scoped>
  .article
    border: 1px solid black
    margin: 5px
</style>
