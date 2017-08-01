<template lang="pug">
  extends ../choiceEditor_base.pug

  block append advSetting
    .row
      label 每行显示
        select(name="maxRow" ref="columnCount" v-on:change="changeColumnCount")
          option(value="1") 1
          option(value="2") 2
          option(value="3") 3
          option(value="4") 4
          option(value="5") 5
      label 显隐ABCD序号
        select(name="toggleOptionIndex" ref="toggleOptionIndex" v-on:change="toggleOptionIndex")
          option(value="1") 显示
          option(value="0") 隐藏

  block input
    input.correct_answer(type="radio" @click="addOptionAnswer(option.id, 'single')" name="data.id" :checked = "isChecked(option)")
</template>

<script type="text/ecmascript-6">
  import choiceEditorBase from '../choiceEditor_base.vue';

  export default {
    extends: choiceEditorBase,
    mounted () {
      this.$refs.columnCount.options[this.data.columnCount - 1].selected = true;
      if (this.data.showOptionIndex) {
        this.$refs.toggleOptionIndex.options[0].selected = true;
      } else {
        this.$refs.toggleOptionIndex.options[1].selected = true;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
