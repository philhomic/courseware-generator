<template>
  <div class="manao-editor-wrapper" :class="this.mClass">
    <div class="manao-editor clearfix" ref="editorDiv" spellcheck="false" contenteditable="true" @change="emitHTML"  @focus="isEditing=true" @blur="stopEdit" v-html="unescapeHTML(this.data)"></div>
    <div class="toolbar" v-show="isEditing">
      <ul class="tools">
        <li class="editor-button" v-for="(tool, index) in this.tools">
          <i :class="'icon-' + tool" @click="edit(tool)" @mousedown.prevent="dummyFunction"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {unescapeHTML, escapeHTML} from '@/assets/js/util';

  export default {
    props: {
      data: {
        type: String
      },
      mClass: {
        type: String
      },
      tools: {
        type: Array,
        default: function () { return ['bold', 'italic', 'underline', 'superscript', 'subscript', 'H1', 'H2', 'H3', 'image']; }
      }
    },
    data () {
      return {
        isEditing: false
      };
    },
    methods: {
      unescapeHTML: function (string) {
        return unescapeHTML(string);
      },
      dummyFunction: function () {},
      emitHTML: function () {
        this.$emit('htmlChanged', escapeHTML(this.$refs.editorDiv.innerHTML));
      },
      edit: function (tool) {
        console.log(tool);
        switch (tool) {
          case 'bold':
          case 'italic':
          case 'underline':
          case 'superscript':
          case 'subscript':
            document.execCommand(tool, false);
            break;
          case 'H1':
          case 'H2':
          case 'H3':
            document.execCommand('formatBlock', false, tool.toLowerCase());
            break;
          case 'image':
            let url = prompt('请在此输入图片链接地址：', 'http://');
            document.execCommand('insertImage', false, url);
        };
      },
      stopEdit: function () {
        let timer = setTimeout(function () {
          this.isEditing = false;
          clearTimeout(timer);
        }.bind(this), 500);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .manao-editor-wrapper
    position: relative
    overflow: visible
    .manao-editor
      b, strong
        font-weight: 700
      i
        font-style: italic
      u
        text-decoration: underline
    .toolbar
      position: absolute
      top: 100%
      .tools
        margin-top: 15px
        z-index: 3000
        background-color: rgb(63, 63, 63)
        border: 1px solid rgb(63, 63, 63)
        border-radius: 5px
        &:before
          content: ''
          position: absolute
          display: block
          left: 10px
          top: 5px
          border-left: 10px solid transparent
          border-right: 10px solid transparent
          border-bottom: 15px solid rgb(63, 63, 63)
        .editor-button
          display: inline-block
          width: 40px
          height: 40px
          line-height: 40px
          text-align: center
          color: #fff
          border-right: 1px solid #e0e0e0
          &:hover
            cursor: pointer
          &:last-child
            border-right: none
          i
            display: block
            width: 100%
            height: 100%
            line-height: 40px
</style>
