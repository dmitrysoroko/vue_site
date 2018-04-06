<template lang="pug">
  div.main
    li( v-if="authenticated" )
      button( @click="logout" ) Logout
    li( v-if="authenticated" )
      router-link( to="/admin/home" ) Admin Home
    div.overlay
      nav.overlayMenu
        ul.accordion-menu
          li
            router-link.link( to="/panel/article", role="menuitem" ) PanelArticle
              i.fa.fa-road( aria-hidden="true" )
          li
            router-link.link( to="/home", role="menuitem" ) Home
              i.fa.fa-road( aria-hidden="true" )
          li
            router-link.link( to="/about", role="menuitem" ) About
              i.fa.fa-road( aria-hidden="true" )
          li
            router-link.link( to="/articles", role="menuitem" ) Articles
              i.fa.fa-road( aria-hidden="true" )
          li
            div.dropdownlink Action
              i.fa.fa-motorcycle( aria-hidden="true" )
              i.fa.fa-chevron-down( aria-hidden="true" )
            ul.submenuItems
              li
                router-link.link( to="/home", role="menuitem" ) Home
              li
                router-link.link( to="/home", role="menuitem" ) Home
              li
                router-link.link( to="/home", role="menuitem" ) Home
          li
            div.dropdownlink Action
              i.fa.fa-motorcycle( aria-hidden="true" )
              i.fa.fa-chevron-down( aria-hidden="true" )
            ul.submenuItems
              li
                router-link.link( to="/home", role="menuitem" ) Home
              li
                router-link.link( to="/home", role="menuitem" ) Home
              li
                router-link.link( to="/home", role="menuitem" ) Home
          li
            div.dropdownlink Action
              i.fa.fa-motorcycle( aria-hidden="true" )
              i.fa.fa-chevron-down( aria-hidden="true" )
            ul.submenuItems
              li
                router-link.link( to="/home", role="menuitem" ) Home
              li
                router-link.link( to="/home", role="menuitem" ) Home
              li
                router-link.link( to="/home", role="menuitem" ) Home
          li
            div.dropdownlink Action
              i.fa.fa-motorcycle( aria-hidden="true" )
              i.fa.fa-chevron-down( aria-hidden="true" )
            ul.submenuItems
              li
                router-link.link( to="/home", role="menuitem" ) Home
              li
                router-link.link( to="/home", role="menuitem" ) Home
              li
                router-link.link( to="/home", role="menuitem" ) Home
          li
            div.dropdownlink Action
              i.fa.fa-motorcycle( aria-hidden="true" )
              i.fa.fa-chevron-down( aria-hidden="true" )
            ul.submenuItems
              li
                router-link.link( to="/home", role="menuitem" ) Home
              li
                router-link.link( to="/home", role="menuitem" ) Home
              li
                router-link.link( to="/home", role="menuitem" ) Home
          li
            div.dropdownlink Action
              i.fa.fa-motorcycle( aria-hidden="true" )
              i.fa.fa-chevron-down( aria-hidden="true" )
            ul.submenuItems
              li
                router-link.link( to="/home", role="menuitem" ) Home
              li
                router-link.link( to="/home", role="menuitem" ) Home
              li
                router-link.link( to="/home", role="menuitem" ) Home
    div#navToggle.navBurger( role="navigation", @click="toggleMenu" )
</template>

<script>
	export default {
    computed: {
      authenticated() {
        return !!this.$store.state.items['auth']
      }
    },

    mounted () {
      const $ = this.$jquery

      const menu = $('.accordion-menu')
      menu[0].style.paddingRight = menu[0].offsetWidth - menu[0].clientWidth + 'px'

      let dropdownlink = menu.find('.dropdownlink')
      dropdownlink.on('click', function() {
        const $this = $(this)
        const $next = $this.next()
        $next.slideToggle()
        $this.parent().toggleClass('openSubmenu')
        menu.find('.submenuItems').not($next).slideUp().parent().removeClass('openSubmenu')
      });

      let link = menu.find('.link')
      link.on('click', function() {
        $('.openSubmenu').toggleClass('openSubmenu')
        $('.overlay').toggleClass('open')
        $('#navToggle').toggleClass('active')
        menu.find('.submenuItems').slideUp()
      })
    },

    methods: {
      toggleMenu () {
        this.$jquery('#navToggle').toggleClass('active')
        this.$jquery('.overlay').toggleClass('open')
      },

      logout() {
        this.$auth.logout(this)
        this.$router.push('/dsoroko')
      }
    }
	}
</script>

<style lang="sass" scoped>
.main
  top: 0
  width: 100%
  height: 50px
  background-color: orange
  position: fixed
  z-index: 1

.navBurger
  z-index: 3
  position: fixed
  right: 10px
  top: 10px
  cursor: pointer
  background: #111
  box-sizing: border-box
  background-clip: content-box
  width: 30px
  height: 24px
  border-top: 11px solid transparent
  border-bottom: 11px solid transparent
  -webkit-transform: rotate(0deg)
  transform: rotate(0deg)
  -webkit-transition: all 0.25s ease-in-out
  transition: all 0.25s ease-in-out
  &:before, &:after
    content: ""
    position: absolute
    background: #111
    height: 2px
    width: 100%
    right: 0
    will-change: rotate
    -webkit-transform: rotate(0deg)
    transform: rotate(0deg)
    -webkit-transition: all 0.5s ease
    transition: all 0.5s ease
  &:before
    top: -10px
  &:after
    bottom: -10px
    width: 90%
  &.active
    background: transparent
    background-clip: content-box
  &.active:before
    -webkit-transform: rotate(135deg)
    transform: rotate(135deg)
    top: 0
    background: #eee
    width: 110%
  &.active:after
    bottom: 0
    -webkit-transform: rotate(-135deg)
    transform: rotate(-135deg)
    background: #eee
    width: 110%

.overlay
  z-index: 2
  position: fixed
  background: #2a3140
  top: 50px
  right: -12px
  width: 200px
  height: 100%
  opacity: 0
  transform-origin: right top
  transform: scale(0)
  visibility: hidden
  transition: all 0.4s ease-in-out
  &.open
    opacity: 0.99
    visibility: visible
    transform: scale(1)

@media all and (max-width: 768px)
  .overlay
    width: calc(100% + 12px)

.overlayMenu
  overflow: hidden
  height: 100%
  width: 100%

.accordion-menu
  width: 100%
  height: calc(100vh - 50px)
  overflow-y: auto
  background: #fff
  padding-right: 0px

.accordion-menu li.openSubmenu .dropdownlink
  color: #CDDC39
  .fa-chevron-down
    transform: rotate(180deg)

.accordion-menu li:last-child .dropdownlink
  border-bottom: 0

.dropdownlink, .link
  &:hover
    color: #CDDC39
  cursor: pointer
  display: block
  margin-right: 0px
  padding: 15px 15px 15px 45px
  font-size: 18px
  border-bottom: 1px solid #ccc
  border-right: 1px solid #ccc
  color: #212121
  position: relative
  transition: all 0.4s ease-out
  i
    position: absolute
    top: 17px
    left: 16px
  .fa-chevron-down
    right: 20px
    left: auto

.submenuItems
  display: none
  background: #C8E6C9
  li
    border-bottom: 1px solid #B6B6B6

.submenuItems a
  display: block
  color: #727272
  padding: 12px 12px 12px 45px
  transition: all 0.4s ease-out
  &:hover
    background-color: #CDDC39
    color: #fff
</style>
