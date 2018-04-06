<template lang="pug">
div
  h1 Image gallery
  router-link.link( to="/gallery/add" ) Add image
  router-link.link( to="/gallery/show" ) Show images
  router-view.imageview
</template>

<script>
	export default {
		components: {

		},

		asyncData({ store }) {
			return store.dispatch('fetchItem', 1)
		},

		data() {
			return {
				content: 'hello'
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
.link
  border: 1px solid black
  padding: 5px
  margin: 5px

.imageview
  margin: 5px
</style>
