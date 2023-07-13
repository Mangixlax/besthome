<template lang="pug">
  div(:class="$style['likes']")
    button(
      :class="$style['likes__btn']"
      title="Set like for article"
    )
      svg(xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24")
        path(
          fill="#191F2E"
          fill-opacity=".8"
          stroke="#fff"
          stroke-width=".5"
          d="M11.023 3.028h0a.77.77 0 01.678-.597.741.741 0 01.321.04h0c.404.146.835.38 1.165.754.325.37.563.89.563 1.638 0 .845-.24 1.85-.489 2.657a17.5 17.5 0 01-.481 1.358l-.008.019-.002.005h0l-.147.348H20c.962 0 1.75.788 1.75 1.75v.941c0 .375-.08.746-.232 1.088h0l-3.002 6.756c-.261.587-.843.965-1.485.965H9A1.75 1.75 0 017.25 19V9.768c0-.433.16-.85.45-1.17v-.001l2.71-3.012.044-.048.014-.064.555-2.445zM2.25 10.5a1.25 1.25 0 012.5 0v9a1.25 1.25 0 01-2.5 0v-9z"
        )
    button(
      :class="$style['likes__btn']"
      title="Set dislike for article"
    )
      svg(xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24")
        path(
          fill="#191F2E"
          fill-opacity=".8"
          stroke="#fff"
          stroke-width=".5"
          d="M12.977 20.972h0a.77.77 0 01-.678.597.743.743 0 01-.321-.04h0c-.404-.146-.835-.38-1.165-.755-.325-.37-.563-.89-.563-1.637 0-.845.24-1.85.489-2.657a17.472 17.472 0 01.481-1.358l.008-.019.002-.005h0l.147-.348H4c-.962 0-1.75-.788-1.75-1.75v-.941c0-.375.08-.746.232-1.088h0l3.002-6.756c.261-.587.843-.965 1.485-.965H15c.967 0 1.75.783 1.75 1.75v9.232c0 .433-.16.85-.45 1.17v.001l-2.71 3.012-.044.048-.014.064-.555 2.445zM21.75 13.5a1.25 1.25 0 01-2.5 0v-9a1.25 1.25 0 012.5 0v9z"
        )
</template>

<script>
export default {
  name: 'ArticleAsideLikes',
  data() {
    return {
      // isMinus
    }
  },
}
</script>

<style lang="sass" module>
.likes
  &__btn:first-child
    border-radius: 10px 10px 0 0

  &__btn:last-child
    border-radius: 0 0 10px 10px

  &__btn
    background-color: #fff
    padding: 12px 16px

    path
      transition: fill-opacity .25s ease

    &:hover path
      fill-opacity: 1

    & + &
      margin-top: 2px
</style>
