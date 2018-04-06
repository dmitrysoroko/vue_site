<template lang="pug">
div
  div.leftblock( v-html="article.content" )
  RightBlock
</template>

<script>
	import RightBlock from '../components/RightBlock.vue'

  export default {
    components: {
      RightBlock
    },

    metaInfo() {
      return {
        title: this.article.title,
        meta: [
          { name: 'hello', content: this.article.title }
        ]
      }
    },

    data() {
      return {
      }
    },

    asyncData({ store }) {
			return store.dispatch('getArticleList')
		},

    computed: {
			article() {
				return this.$store.state.items['articleList'].find((el) => el.id == this.$route.params.id)
			}
		}
  }
</script>

<style lang="sass" scoped>
  .leftblock /deep/ h1
    padding: 0px
    margin: 0px
</style>
