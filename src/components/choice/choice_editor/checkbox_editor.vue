<template lang="pug">
  extends ../choiceEditor_base.pug
  block input
    input.correct_answer(type="checkbox" @click="addAnswer(option.id, 'multiple')" :checked = "isChecked(option)")
</template>

<script type="text/ecmascript-6">
  import choiceEditorBase from '../choiceEditor_base.vue';
  export default {
    extends: choiceEditorBase
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
