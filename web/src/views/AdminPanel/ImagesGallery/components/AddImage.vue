<template lang="pug">
div
  h2 Add image
  label( for="name" ) Name:
  input#name( v-model="image.name" )
  label( for="file" ) File:
  input#file( type="file" @change="processFile($event)" )
  button( @click="addImage" ) save
</template>

<script>
	export default {
		components: {

		},

    methods: {
      addImage() {
        const formData = new FormData()
        formData.append('image', this.image.img)
        formData.append('name', this.image.name)
        this.$http.post('/api/addImage', formData)
        .then(response => {
          console.log(response.data);
        })
        .catch(e => {
          console.log(e)
        })
      },

      processFile(event) {
        this.image.img = event.target.files[0]
        console.log(this.image.img);
      }
    },

		asyncData({ store }) {
			return store.dispatch('fetchItem', 1)
		},

		data() {
			return {
        image: {
          name: '',
          img: undefined
        }
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
