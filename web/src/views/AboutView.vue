<template lang="pug">
div
	div.leftblock
		h1 ABOUT
		div {{ content }}
		ArticleEditor(
			v-model="content"
		)
	RightBlock
</template>

<script>
	import ArticleEditor from '../components/AdminPanel/ArticleDashboard/ArticleEditor.vue'
	import RightBlock from '../components/RightBlock.vue'

	export default {
		components: {
			ArticleEditor,
			RightBlock
		},

		data() {
			return {
				content: ''
			}
		}
	}
</script>

<style lang="sass" scoped>
	h1
		background: green
	h2
		background: red
</style>
