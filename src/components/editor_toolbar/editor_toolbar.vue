<template>
  <div class="toolbar">
    <ul class="tools">
      <li class="editor-button" v-for="(tool, index) in this.tools">
        <i :class="'icon-' + tool" @click="edit(tool)" @mousedown.prevent="dummyFunction"></i>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      tools: {
        type: Array,
        default: function () { return ['bold', 'italic', 'underline', 'strikethrough', 'paragraph-left', 'paragraph-center', 'paragraph-right', 'superscript', 'subscript', 'image']; }
      }
    },
    methods: {
      dummyFunction: function () {},
      edit: function (tool) {
        switch (tool) {
          case 'bold':
          case 'italic':
          case 'underline':
          case 'superscript':
          case 'subscript':
            document.execCommand(tool, false);
            break;
          case 'paragraph-left':
          case 'paragraph-center':
          case 'paragraph-right':
            let dir = tool.split('-')[1];
            let cmd = 'justify' + dir[0].toUpperCase() + dir.substring(1);
            document.execCommand(cmd, false);
            break;
          case 'strikethrough':
            document.execCommand('strikeThrough', false);
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
  .toolbar
    display: none
    position: absolute
    top: 0
    left: 0
    .tools
      margin-top: 15px
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
