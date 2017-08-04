<template lang="pug">
  extends ../../block/editor/editor_without_toolbar.pug

  block editorContent
    div 这里是内容区
</template>

<script type="text/ecmascript-6">
  import editorWithoutToolbar from '../../block/editor/editor_without_toolbar.vue';
  import {clone, cleanHTML} from '@/assets/js/util';

  let oldData;
  export default {
    extends: editorWithoutToolbar,
    props: {
      data: {
        type: Object
      },
      blockIndex: {
        type: Number
      }
    },
    components: {
      editorWithoutToolbar
    },
    mounted () {
      oldData = clone(this.data);
    },
    methods: {
      cleanHTML (string) {
        return cleanHTML(string);
      },
      updateBlock () {
//        let assessOptions = this.data.assess.options;
//        let hasAnswer = false;
//        if (this.data.isScored === true) {
//          for (let op in assessOptions) {
//            if (assessOptions.hasOwnProperty(op) && assessOptions[op].flag === true) {
//              hasAnswer = true;
//            }
//          }
//          if (!hasAnswer) {
//            alert('本题为计分题，不要忘记设置答案。');
//            return;
//          }
//        }
//
//        let newData = clone(this.data);
//        let title = this.$refs.title;
//        let description = this.$refs.description;
//        let explanation = this.$refs.explanation;
//        let options = this.$refs.options;
//        if (this.data.type !== 'selectsingle') {
//          columnCount = parseInt(this.$refs.columnCount.value);
//        }
//        newData.title = escapeHTML(title.innerHTML);
//        newData.description = escapeHTML(description.innerHTML);
//        newData.explanation = escapeHTML(explanation.innerHTML);
//        newData.options.forEach((option, index) => {
//          option.text = escapeHTML(options[index].innerHTML);
//        });
//
//        if (this.data.type !== 'selectsingle') {
//          newData.columnCount = columnCount;
//        }
//
//        this.$store.commit('updateBlock', {
//          pageIndex: this.$parent.pageIndex,
//          blockIndex: this.blockIndex,
//          newData: newData
//        });
//        oldData = JSON.parse(JSON.stringify(newData));
//        this.$emit('stopEditing');
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
