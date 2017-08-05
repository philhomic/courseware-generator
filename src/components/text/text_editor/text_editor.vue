<template lang="pug">
  extends ../../block/editor/editor.pug

  block editorContent
    .row.editor_answer
      label.row_title 答案
      .row_content
        div(contenteditable="true" class="inline_editor" ref="answer") {{data.assess.answers.join(' | ')}}
</template>

<script type="text/ecmascript-6">
  import {clone, escapeHTML, unescapeHTML} from '@/assets/js/util';
  import questionNumber from '@/components/question_number/question_number';
  import editor from '@/components/block/editor/editor';

  let oldData;

  export default {
    extends: editor,
    props: {
      data: {
        type: Object
      },
      blockIndex: {
        type: Number
      }
    },
    components: {
      questionNumber
    },
    mounted () {
      oldData = clone(this.data);
    },
    methods: {
      unescapeHTML (string) {
        return unescapeHTML(string);
      },
      updateBlock () {
        let newData = clone(this.data);
        let title = this.$refs.title;
        let description = this.$refs.description;
        let explanation = this.$refs.explanation;
        let answer = this.$refs.answer;

        newData.title = escapeHTML(title.innerHTML);
        newData.description = escapeHTML(description.innerHTML);
        newData.explanation = escapeHTML(explanation.innerHTML);
        newData.assess.answers = answer.innerText.split('|').map(function (a) { return a.trim(); });

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
