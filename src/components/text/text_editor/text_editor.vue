<template lang="pug">
  .editor-wrapper
    .inner
      questionNumber(:idx="data.questionNumber")
      .row.editor_title
        label.row_title 题目
        .row_content
          div(contenteditable="true" class="inline_editor" ref="title" v-html="unescapeHTML(data.title)" v-edit="")
      .row.editor_description
        label.row_title 备注
        .row_content
          div(contenteditable="true" class="inline_editor" ref="description" v-html="unescapeHTML(data.description)" v-edit="")
      .row.editor_answer
        label.row_title 答案
        .row_content
          div(contenteditable="true" class="inline_editor" ref="answer") {{data.assess.answer}}
      .row.editor_explanation
        label.row_title 解析
        .row_content
          div(contenteditable="true" class="inline_editor" ref="explanation" v-html="unescapeHTML(data.explanation)" v-edit="")
      .row.editor_control
        a.editor_confirm_btn(href="javascript:;" @click="updateBlock") 确定
        a.editor_cancel_btn(href="javascript:;" @click="cancelUpdateBlock") 取消
</template>

<script type="text/ecmascript-6">
  import {clone, escapeHTML, unescapeHTML} from '@/assets/js/util';
  import questionNumber from '@/components/question_number/question_number';

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
        newData.assess.answer = answer.innerText;

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
