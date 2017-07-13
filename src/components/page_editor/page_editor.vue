<template>
  <div class="page">
    <div v-for="(block, blockIndex) in currentPage.blocks">
      <component  :is="block.type + 'Editor'" v-bind:key="blockIndex" v-bind:blockIndex="blockIndex" :data="block"></component>
      <idx :idx="currentPage.questionCount"></idx>
      <component :is="block.type" v-bind:key="blockIndex" v-bind:blockIndex="blockIndex" :data="block" :colNum="1" :submitted="true"></component>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import radio from '@/components/radio/radio';
  import checkbox from '@/components/checkbox/checkbox';
  import checkboxEditor from '@/components/checkbox_editor/checkbox_editor';
  import idx from '@/components/question_number/question_number';

  export default {
    props: {
      data: {
        type: Object
      },
      pageIndex: {
        type: Number
      }
    },
    computed: {
      currentPage () {
        return this.$store.state.course.pages[this.pageIndex];
      }
    },
    components: {
      radio,
      checkbox,
      checkboxEditor,
      idx
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.page
  width: 100%
  max-width: 1000px
  min-width: 320px
  margin-left: auto
  margin-right: auto
  border-left: 1px solid #e0e0e0
  border-right: 1px solid #e0e0e0
  background-color: $app-bgcolor
</style>
