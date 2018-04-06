<template lang="pug">
	div#app
		HidenMenu
		router-view.mainview
</template>

<script>
	import HidenMenu from './components/HidenMenu.vue'

	export default {
		computed: {
      authenticated() {
        return !!this.$store.state.items['auth']
      }
    },

		components: {
			HidenMenu
		},

		data() {
			return {
				content: ''
			}
		}
	}
</script>

<style lang="sass">
	body
		background-color: #e5e6e6
	ul
		list-style: none
	a
		text-decoration: none
		color: black
	*
		margin: 0
		padding: 0

	.mainview
		margin-top: 50px

	.leftblock
		float: left
		width: calc(70% - 2vh)

	@media all and (max-width: 768px)
		.leftblock
			width: 100%
</style>
