<template lang="pug">
  div
    ul( v-if="articles && articles.length" )
      ArticlePreview(
    			v-for="article in articles",
    			:key="article.id",
    			:article="article"
      )
    template {{articles}}
</template>

<script>
  import ArticlePreview from './ArticlePreview.vue'

	export default {
    asyncData({ store }) {
      return store.dispatch('getArticleList')
    },

    computed: {
			articles() {
				return this.$store.state.items['articleList']
			}
		},

    components: {
	    ArticlePreview
	  },

    data () {
      return {
      }
    }
  }
</script>

<style lang="sass" scoped>
ul
  -o-column-count: 2
  -o-column-gap: 0px
  -moz-column-count: 2
  -moz-column-gap: 0px
  -webkit-column-count: 2
  -webkit-column-gap: 0px
  column-count: 2
  column-gap: 0px

@media all and (max-width: 768px)
  ul
    -o-column-count: 1
    -moz-column-count: 1
    -webkit-column-count: 1
    column-count: 1
</style>
