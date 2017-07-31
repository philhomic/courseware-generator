<template lang="pug">
  .page
    .dec
    .blocks-wrapper(v-for="(block, blockIndex) in currentPage.blocks" :block="block" :blockIndex="blockIndex" :pageIndex="pageIndex" :key="blockIndex" ref="blockEditors")
      <component :is="block.type" v-bind:key="blockIndex" v-bind:blockIndex="blockIndex" :data="block" :submitted="isSubmitted"></component>
    .footer(v-show="currentPage.blocks.length > 0")
      a(href="javascript:;" class="submitButton" @click="submitPage") 提 交
</template>

<script type="text/ecmascript-6">
  import radio from '@/components/choice/radio/radio';
  import checkbox from '@/components/choice/checkbox/checkbox';
  import selectsingle from '@/components/choice/selectsingle/selectsingle';
  import description from '@/components/description/description/description';
  import textQuestion from '@/components/text/text/text';

  export default {
    props: {
      data: {
        type: Object
      },
      pageIndex: {
        type: Number
      }
    },
    computed: {
      currentPage () {
        return this.$store.state.course.units[this.$route.params.unitIndex - 1].pages[this.$route.params.pageIndex - 1];
      }
    },
    components: {
      radio,
      checkbox,
      selectsingle,
      description,
      textQuestion
    },
    methods: {
      clone (json) {
        return JSON.parse(JSON.stringify(json));
      },
      submitPage () {
        this.isSubmitted = true;
      }
    },
    data () {
      return {
        isSubmitted: false
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/base'
@import '../../../assets/stylus/mixin'

.page
  position: relative
  width: 100%
  max-width: 1000px
  min-width: 320px
  margin: 60px auto
  background-color: $app-bgcolor
  border-radius: 2px
  box-shadow: 0 2px 5px rgba(0,0,0,.2)
  .dec
    position: fixed
    z-index: -1
    top: 0
    left: 0
    width: 100%
    height:120px
    background: rgb(10, 125, 192)
  //block的通用样式 title, description, explanation --start
  .block-wrapper
    width: 100%
    &.border-1px
      border-1px(rgba(7, 17, 27, 0.1))
    .block
      width: 100%
      max-width: $question-max-width
      min-width: 320px
      margin-left: auto
      margin-right: auto
      padding: 10px 0
      .inner
        position: relative
        margin-left: 20px
        margin-right: 20px
        font-family: $question-text-font-family
        .title
          margin: 5px 0
          font-size: 16px
          line-height: 28px
        .description
          margin: 10px 0
          line-height: 20px
          font-size: 14px
          font-style: italic
        .explanation
          position: relative
          padding: 12px 12px 12px 5px
          margin: 20px 0 10px 0
          line-height: 20px
          font-size: 14px
          border-radius: 3px
          color: $question-explanation-text-color
          background-color: $question-explanation-bgcolor
          border: $question-explanation-border
          &:before
            content: ''
            display: block
            position: absolute
            top: -10px
            left: 10px
            border-bottom: 10px solid $question-explanation-bgcolor
            border-left: 5px solid transparent
            border-right: 5px solid transparent
            width: 0
            height: 0
          &.slide-enter-active
            transition: all .1s ease
          &.slide-enter
            padding: 0 12px 0px 5px
            line-height: 0
          i
            display: block
            float: left
            width: 20px
            height: 20px
            line-height: 20px
            text-align: center
            color: $question-explanation-icon-color
          .explanation-text
            margin-left: 25px
            line-height: 20px
  //block的通用样式 --end
  .footer
    background-color: rgb(248, 248, 248)
    text-align: right
    .submitButton
      display: inline-block
      background: rgb(213, 247, 251)
      padding: 15px 30px
      height: 24px
      line-height: 24px
      color: rgb(10, 125, 192);
      font-weight: 700
      transition: color .5s
      &:hover
        color: #fff
        background-color: rgb(10, 125, 192)
</style>
