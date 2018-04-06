<template lang="pug">
div
  nav
    div
      ul
        li
          router-link( to="/query" ) DB query
        li
          router-link( to="/panel/article" ) Article panel
        li
          router-link( to="/gallery" ) Gallery
</template>

<script>
export default {
  data() {
    return {

    }
  },

}
</script>

<style lang="sass" scoped>

</style>
