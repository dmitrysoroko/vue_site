<template lang="pug">
	div
		div.leftblock
			ul( v-if="articles && articles.length" )
				ArticlePreview(
						v-for="article in articles",
						:key="article.id",
						:article="article"
				)
		RightBlock
</template>

<script>
	import ArticlePreview from '../components/Article/ArticlePreview.vue'
	import RightBlock from '../components/RightBlock.vue'

	export default {
		metaInfo() {
      return {
        title: 'ARTICLE LIST'
      }
    },

		components: {
			ArticlePreview,
			RightBlock
		},

		asyncData({ store }) {
      return store.dispatch('getArticleList')
    },

    computed: {
			articles() {
				return this.$store.state.items['articleList']
			}
		}
	}
</script>

<style lang="sass" scoped>
	.leftblock
		display: inline-block
	ul
	  -moz-column-count: 2
	  -moz-column-gap: 0px
	  -webkit-column-count: 2
	  -webkit-column-gap: 0px
	  column-count: 2
	  column-gap: 0px

	@media all and (max-width: 768px)
	  ul
	    -moz-column-count: 1
	    -webkit-column-count: 1
	    column-count: 1
</style>
