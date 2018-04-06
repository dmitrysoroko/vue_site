<template lang="pug">
  div.rightblock
    p {{ context }}
</template>

<script>
	export default {
    data () {
      return {
        context: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    }
	}
</script>

<style lang="sass" scoped>
.rightblock
  margin: 1vh
  padding: 1%
  width: 30%
  background: white
  box-shadow: 0 0 10px rgba(0,0,0,0.9)
  border-radius: 2px
  float: right
  box-sizing: border-box

@media all and (max-width: 768px)
  .rightblock
    width: auto
    margin: 1%

</style>
