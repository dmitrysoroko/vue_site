<template lang="pug">
  li
    router-link.article( :to="/articles/ + article.id", v-html="article.preview" )
      //- h1 {{ article.title }}
      //- div
      //-   p.a( v-html="article.preview" )
</template>

<script>
  export default {
    props: {
      article: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style lang="sass" scoped>
  h1
    margin: 0
  .article /deep/ img
    float: left
    margin: 7px 7px 7px 0
    width: 40%
    height: 40%
  .article /deep/ h1
    padding: 0px
    margin: 0px
  li
    margin: 1vh
    padding: 1%
    &:hover
      -webkit-animation: select 1s
      -moz-animation: select 1s
      animation: select 1s
      -o-animation: select 1s
      -webkit-animation-fill-mode: forwards
      -moz-animation-fill-mode: forwards
      animation-fill-mode: forwards
      -o-animation-fill-mode: forwards
      box-shadow: 0 0 20px rgba(0,0,0,0.9)
    width: auto
    display: inline-flex
    background: white
    opacity: 1
    box-shadow: 0 0 10px rgba(0,0,0,0.9)
    border-radius: 2px

  @keyframes select
    from
      opacity: 1
    to
      opacity: 0.7

  @-webkit-keyframes select
    from
      opacity: 1
    to
      opacity: 0.7

  @media all and (max-width: 768px)
    li
      margin: 1%
      padding: 1%
</style>
