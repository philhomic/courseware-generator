<template lang="pug">
  .page-editor
    blockEditor(v-for="(block, blockIndex) in currentPage.blocks" :block="block" :blockIndex="blockIndex" :pageIndex="pageIndex" :key="blockIndex" ref="blockEditors")
</template>

<script type="text/ecmascript-6">
  import blockEditor from '@/components/block/block_editor/block_editor';

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
        return this.$store.state.course.units[this.$store.state.currentUnitIndex].pages[this.pageIndex];
      }
    },
    components: {
      blockEditor
    },
    methods: {
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../assets/stylus/base'
@import '../../../assets/stylus/mixin'

.page-editor
  width: 100%
  max-width: 1000px
  min-width: 320px
  margin-left: auto
  margin-right: auto
  background-color: $app-bgcolor
  .block-editor
    //block editor的统一样式 --start
    .editor-wrapper
      width: 100%
      min-width: 320px
      margin-left: auto
      margin-right: auto
      background-color: #fafafa
      border-top: 1px solid #e0e0e0
      border-bottom: 1px solid #e0e0e0
      .inner
        max-width: $question-max-width
        position: relative
        margin-left: auto
        margin-right: auto
        padding: 10px 20px
        font-family: $question-text-font-family
        font-size: 14px
        .row
          margin-top: 10px
          margin-bottom: 10px
          .row_title
            float: left
            width: 40px
            height: 36px
            line-height: 36px
          .row_content
            margin-left: 40px
            min-height: 36px
            line-height: 36px
            .inline_editor
              padding: 0 10px
              min-height: 36px
              line-height: 36px
              background: #fff
              border: 1px solid #e0e0e0
          &.editor_options
            position: relative
            margin-top: 40px
            .options_list
              .additional_setting_title
                font-size: 12px
                top: -27px
                position: absolute
                right: 0px
                width: 60px
                text-align: center
                color: #888
            .normal_options_list
              .option_item
                position: relative;
                overflow: hidden
                margin: 3px 0 3px -3px
                padding: 3px 0 3px 3px
                font-size: 14px
                line-height: 36px
                .option_input_wrap
                  margin-left: 40px
                  margin-right: 90px
                  .inline_editor.option_text
                    padding: 0 10px
                    min-height: 36px
                    line-height: 36px
                    background: #fff
                    border: 1px solid #e0e0e0
                .btn_del_option
                  color: #999999
                  position: absolute
                  top: 0
                  right: 60px
                  height: 42px
                  line-height: 42px
                  padding-left: 10px
                  padding-right: 10px
                .additional_setting
                  position: absolute
                  top: 0
                  right: 0
                  width: 60px
                  height: 42px
                  line-height: 42px
                  text-align: center
                  vertical-align: middle
            .option_create
              margin: 3px 0 3px -3px
              padding: 3px 0 3px 3px
              font-size: 14px
              line-height: 36px
              .option_input_wrap
                margin-left: 40px
                margin-right: 90px
                .add_option
                  display: inline-block
                  width: 100%
                  height: 36px
                  line-height: 36px
                  padding: 0 10px
                  box-sizing: border-box
                  border: 1px dashed #e0e0e0
                  background: #fafafa
                  color: #b2b2b2
                  cursor: pointer
            .options_control
              padding-left: 40px
              line-height: 36px
              .add_options
                color: #2f8ddc
                font-size: 14px
          &.row_split
            position: relative
            margin-top: 30px
            margin-bottom: 20px
            .split
              margin-top: 8px
              border-top: 1px solid #e0e0e0
            a
              position: relative
              display: block
              width: 124px
              margin: -7px auto 0
              text-align: center
              background-color: #fafafa
              padding-right: 30px
              color: #000
              font-size: 14px
              .icon-circle-down
                position: absolute
                width: 30px
                transition: all .2s ease
                transform: rotate(0deg)
                &.up
                  transition: all .2s ease
                  transform: rotate(180deg)
          &.editor-adv
            padding: 5px
            .row
              margin-top: 20px
              margin-bottom: 20px
              label
                margin-right: 50px
                min-width: 150px
                display: inline-block
                select
                  background-color: #fff
                  border: 1px solid #e0e0e0
                  box-sizing: border-box
                  margin-right: 20px
            &.slide-enter-active
              transition: all .1s
              height: 30px
            &.slide-leave-active
              transition: all .1s
            &.slide-enter, .slide-leave-to
              height: 0
          &.editor_control
            text-align: center
            .editor_confirm_btn, .editor_cancel_btn
              display: inline-block
              background-color: #479de6
              color: #fff
              border: 1px solid #479de6
              padding: 0 20px
              margin: 0 5px
              border-radius: 4px
              font-size: 14px
              height: 34px
              line-height: 34px
              &:visited, &:active
                box-shadow: inset 0 2px 10px rgba(50, 50, 50, 0.1)
            .editor_cancel_btn
              background-color: #fff
              color: #333
              border: 1px solid #ccc
    //block editor的统一样式 --end
    .preview-wrapper
      .inner
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
            min-height: 200px
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
                margin: 10px 0
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
</style>
