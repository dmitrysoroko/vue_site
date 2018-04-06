<template lang="pug">
div
  h2 Show images
  p Image list
  div(
    v-if="images && images.length"
  )
    div.article(
      v-for="(image, index) in images"
    )
      a( :href="image" )
        img(
          :src="image + '?w=100'",
          :title="image",
          :alt="image"
        )
</template>

<script>
  const API_URL = VUE_ENV === 'server' ? 'http://zabori_api:6000' : ''
	export default {

		components: {

		},



		asyncData({ store }) {
			return store.dispatch('getImages')
		},

		data() {
			return {
				content: []
			}
		},

		computed: {
			images() {
        return this.$store.state.items['images'].map(el => {
          return `/api/getImage/${el.name}`
        })
			}
		}
	}
</script>

<style lang="sass" scoped>
  a
    color: blue
</style>
