<template lang="pug">
  .checkbox-editor
    .inner
      .row.editor_title
        label.row_title 题目
        .row_content
          div(contenteditable="true" class="inline_editor" ref="title" v-html="unescapeHTML(data.title)" v-edit)
      .row.editor_description
        label.row_title 备注
        .row_content
          div(contenteditable="true" class="inline_editor" ref="description" v-html="unescapeHTML(data.description)" v-edit)
      .row.editor_options
        ul.options_list
          .additional_setting_title
            span.correct_answer 正确答案
          ul.normal_options_list
            li.option_item(v-for="(option, index) in data.options")
              .option_input_wrap
                .inline_editor.option_text(contenteditable="true" ref="options" v-html="unescapeHTML(option.text)" v-edit)
              a.btn_del_option(href="javascript:;" @click="deleteOption(index)") ×
              .additional_setting
                input.correct_answer(type="checkbox" @click="addAnswer(option.id, 'multiple')" :checked = "isChecked(option)")
          li.option_item.option_create
            .option_input_wrap(@click="addOption(data.options.length)")
              span.add_option 新建选项
        .options_control
          a.add_options(href="javascript:;") 批量修改
      .row.editor_explanation
        label.row_title 解析
        .row_content
          div(contenteditable="true" class="inline_editor" ref="explanation" v-html="unescapeHTML(data.explanation)" v-edit)
      .row.row_split
        .split"
        a.toggle_adv_setting(href="javascript:;" @click="toggleAdvSetting")
          span.txt {{showAdvSetting ? '收起高级设置' : '展开高级设置'}}
          i.icon-circle-down(:class="{up: showAdvSetting}")
      transition(name="slide")
        .row.editor-adv(v-show="showAdvSetting")
          .row
            label 每行显示
              select(name="maxRow" ref="columnCount" v-on:change="changeColumnCount"
                option(value="1") 1
                option(value="2") 2
                option(value="3") 3
                option(value="4") 4
                option(value="5") 5
      .row.editor_control
        a.editor_confirm_btn(href="javascript:;" @click="updateCheckbox") 确定
        a.editor_cancel_btn(href="javascript:;" @click="cancelUpdateBlock") 取消
</template>

<script type="text/ecmascript-6">
  import {clone, escapeHTML, unescapeHTML} from '@/assets/js/util';

  let oldData;

  export default {
    props: {
      data: {
        type: Object
      },
      blockIndex: {
        type: Number
      }
    },
    data () {
      return {
        showAdvSetting: false
      };
    },
    mounted () {
      oldData = clone(this.data);
      this.$refs.columnCount.options[this.data.columnCount - 1].selected = true;
    },
    methods: {
      unescapeHTML (string) {
        return unescapeHTML(string);
      },
      addAnswer (optionId, type) {
        this.$store.commit('addAnswer', {
          type: type,
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          optionId: optionId
        });
      },
      changeColumnCount () {
        this.$store.commit('changeColumnCount', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          columnCount: parseInt(this.$refs.columnCount.value)
        });
      },
      addOption (optionIndex) {
        this.$store.commit('addOption', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          optionIndex: optionIndex
        });
      },
      deleteOption (optionIndex) {
        this.$store.commit('deleteOption', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          optionIndex: optionIndex
        });
      },
      updateCheckbox () {
        let newData = clone(this.data);
        let title = this.$refs.title;
        let description = this.$refs.description;
        let explanation = this.$refs.explanation;
        let options = this.$refs.options;
        let columnCount = parseInt(this.$refs.columnCount.value);

        newData.title = escapeHTML(title.innerHTML);
        newData.description = escapeHTML(description.innerHTML);
        newData.explanation = escapeHTML(explanation.innerHTML);
        newData.options.forEach((option, index) => {
          option.text = escapeHTML(options[index].innerHTML);
        });
        newData.columnCount = columnCount;

        this.$store.commit('updateCheckbox', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          newData: newData
        });
        oldData = JSON.parse(JSON.stringify(newData));
        this.$emit('stopEditing');
      },
      cancelUpdateBlock () {
        this.$store.commit('cancelUpdateBlock', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          oldData: oldData
        });
        this.$emit('stopEditing');
      },
      isChecked (option) {
        let assessOption = this.data.assess.options[option.id];
        if (assessOption && assessOption.flag === true) {
          return true;
        } else {
          return false;
        }
      },
      toggleAdvSetting () {
        this.showAdvSetting = !this.showAdvSetting;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../assets/stylus/base'

  .checkbox-editor
    width: 100%
    min-width: 320px
    margin-left: auto
    margin-right: auto
    padding: 10px 0
    background-color: #fafafa
    border-top: 1px solid #e0e0e0
    border-bottom: 1px solid #e0e0e0
    .inner
      max-width: $question-max-width
      position: relative
      margin-left: auto
      margin-right: auto
      padding-left: 20px
      padding-right: 20px
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
            margin-top: 10px
            margin-bottom: 10px
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
            transition: all .2s ease
            height: 30px
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
</style>