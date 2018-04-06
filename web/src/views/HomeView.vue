<template lang="pug">
	div
		div.leftblock
			h1 HOME
			div(
				v-if="pets && pets.length"
			)
				div(
					v-for="pet in pets"
				)
					p {{ pet.name }}
		RightBlock
</template>

<script>
	import HidenMenu from '../components/HidenMenu.vue'
	import RightBlock from '../components/RightBlock.vue'

	export default {
		components: {
			RightBlock
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

</style>
