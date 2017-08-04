<template lang="pug">
  .editor-wrapper
    .inner
      .row.editor_title
        label.row_title 说明
        .row_content
          div(contenteditable="true" class="inline_editor" ref="title" v-html="sanitize(unescapeHTML(data.title))" v-edit="")
      .row.editor_description
        label.row_title 备注
        .row_content
          div(contenteditable="true" class="inline_editor" ref="description" v-html="sanitize(unescapeHTML(data.description))" v-edit="")
      .row.editor_control
        a.editor_confirm_btn(href="javascript:;" @click="updateBlock") 确定
        a.editor_cancel_btn(href="javascript:;" @click="cancelUpdateBlock") 取消
</template>

<script type="text/ecmascript-6">
  import {clone, escapeHTML, unescapeHTML, sanitize} from '@/assets/js/util';

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
    mounted () {
      oldData = clone(this.data);
    },
    methods: {
      unescapeHTML (string) {
        return unescapeHTML(string);
      },
      sanitize (htmlstring) {
        return sanitize(htmlstring);
      },
      updateBlock () {
        let newData = clone(this.data);
        let title = this.$refs.title;
        let description = this.$refs.description;

        newData.title = escapeHTML(title.innerHTML);
        newData.description = escapeHTML(description.innerHTML);

        this.$store.commit('updateBlock', {
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
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
