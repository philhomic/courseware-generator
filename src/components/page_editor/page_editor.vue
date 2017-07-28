<template lang="pug">
  .page-editor
    blockEditor(v-for="(block, blockIndex) in currentPage.blocks" :block="block" :blockIndex="blockIndex" :pageIndex="pageIndex" :key="blockIndex" ref="blockEditors")
</template>

<script type="text/ecmascript-6">
  import blockEditor from '@/components/block_editor/block_editor';

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
        return this.$store.state.course.units[this.$store.state.currentUnitIndex].pages[this.pageIndex];
      }
    },
    components: {
      blockEditor
    },
    methods: {
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../assets/stylus/base'

.page-editor
  width: 100%
  max-width: 1000px
  min-width: 320px
  margin-left: auto
  margin-right: auto
  background-color: $app-bgcolor
  .block
    min-height: 200px
</style>
