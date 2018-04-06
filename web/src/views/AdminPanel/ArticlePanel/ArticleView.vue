<template lang="pug">
div
  h1 Article Panel
  button( @click="addArticle" ) Add article
  ModalArticle( v-if="showModal", @close="showModal = false", :article="article" )
  div(
    v-if="articleList && articleList.length"
  )
    div.article(
      v-for="article in articleList"
    )
      template {{ article.title }}
      button( @click="editArticle(article)" ) edit
      button( @click="removeArticle(article)" ) remove
  router-link.link( to="/panel/article/add" ) Add article
  router-link.link( to="/panel/article/show" ) Show article
  router-view.articleview
</template>

<script>
  import ModalArticle from './component/ModalAdd.vue'

	export default {
		components: {
      ModalArticle
		},

    methods: {
      addArticle() {
        this.article = undefined
        this.showModal = true
      },

      editArticle(article) {
        console.log(`edit ${article.id}`)
        this.article = article
        this.showModal = true
      },

      removeArticle(article) {
        console.log(`remove ${article.id}`)
      },
    },

    asyncData({ store }) {
			return store.dispatch('getArticleList')
		},

    data() {
			return {
        showModal: false
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
.link
  border: 1px solid black
  padding: 5px
  margin: 5px

.articleview
  margin: 5px

.article
  border: 1px solid black
  margin: 5px
</style>
