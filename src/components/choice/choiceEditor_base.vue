<template lang="pug">
  include choiceEditor_base.pug
</template>

<script type='text/ecmascript-6'>
  import {clone, escapeHTML, cleanHTML} from '@/assets/js/util';
  import questionNumber from '@/components/question_number/question_number';
  import editor from '@/components/block/editor/editor';

  let oldData;
  let columnCount;

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
      questionNumber,
      editor
    },
    mounted () {
      oldData = clone(this.data);
    },
    methods: {
      cleanHTML (string) {
        return cleanHTML(string);
      },
      addOptionAnswer (optionId, type) {
        this.$store.commit('addOptionAnswer', {
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
      updateBlock () {
        let assessOptions = this.data.assess.options;
        let hasAnswer = false;
        if (this.data.isScored === true) {
          for (let op in assessOptions) {
            if (assessOptions.hasOwnProperty(op) && assessOptions[op].flag === true) {
              hasAnswer = true;
            }
          }
          if (!hasAnswer) {
            alert('本题为计分题，不要忘记设置答案。');
            return;
          }
        }

        let newData = clone(this.data);
        let title = this.$refs.title;
        let description = this.$refs.description;
        let explanation = this.$refs.explanation;
        let options = this.$refs.options;
        if (this.data.type !== 'selectsingle') {
          columnCount = parseInt(this.$refs.columnCount.value);
        }
        newData.title = escapeHTML(title.innerHTML);
        newData.description = escapeHTML(description.innerHTML);
        newData.explanation = escapeHTML(explanation.innerHTML);
        newData.options.forEach((option, index) => {
          option.text = escapeHTML(options[index].innerHTML);
        });

        if (this.data.type !== 'selectsingle') {
          newData.columnCount = columnCount;
        }

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
      },
      isChecked (option) {
        let assessOption = this.data.assess.options[option.id];
        if (assessOption && assessOption.flag === true) {
          return true;
        } else {
          return false;
        }
      },
      toggleOptionIndex () {
        this.$store.commit('toggleOptionIndex', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          showOptionIndex: !!parseInt(this.$refs.toggleOptionIndex.value)
        });
      }
    }
  };
</script>

<style lang='stylus' rel='stylesheet/stylus'>
</style>
