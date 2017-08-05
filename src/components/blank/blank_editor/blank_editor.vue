<template lang="pug">
  extends ../../block/editor/editor_titleTextOnly.pug

  block editorContent
    div 这里是内容区
</template>

<script type="text/ecmascript-6">
  import editorTitleTextOnly from '../../block/editor/editor_titleTextOnly.vue';
  import {clone, cleanHTML, escapeHTML} from '@/assets/js/util';

  let oldData;
  export default {
    extends: editorTitleTextOnly,
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
      cleanHTML (string) {
        return cleanHTML(string);
      },
      updateBlock () {
        let newData = clone(this.data);
        let title = this.$refs.title;
        let description = this.$refs.description;
        let explanation = this.$refs.explanation;

        newData.title = escapeHTML(title.innerText);
        newData.description = escapeHTML(description.innerHTML);
        newData.explanation = escapeHTML(explanation.innerHTML);

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
