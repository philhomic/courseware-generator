<template lang="pug">
  extends ../choiceEditor_base.pug
  block input
    input.correct_answer(type="radio" @click="addAnswer(option.id, 'single')" name="data.id" :checked = "isChecked(option)")
</template>

<script type="text/ecmascript-6">
  import radioEditor from './radio_editor';
  export default {
    extends: radioEditor
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../choiceEditor_base'
</style>
