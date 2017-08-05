<template lang="pug">
  .page-editor
    blockEditor(v-for="(block, blockIndex) in currentPage.blocks" :block="block" :blockIndex="blockIndex" :pageIndex="pageIndex" :key="blockIndex" ref="blockEditors")
</template>

<script type="text/ecmascript-6">
  import blockEditor from '@/components/block/block_editor/block_editor';

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
@import '../../../assets/stylus/base'
@import '../../../assets/stylus/mixin'

.page-editor
  width: 100%
  max-width: 1000px
  min-width: 320px
  margin-left: auto
  margin-right: auto
  background-color: $app-bgcolor
  .block-editor
    //block editor的统一样式 --start
    @import '../../../assets/stylus/block_editor.styl'
    //block editor的统一样式 --end
    .preview-wrapper
      .inner
        //block的通用样式 title, description, explanation --start
        @import '../../../assets/stylus/block.styl'
        //block的通用样式 --end
        // 保证在编辑的preview下，block有足够的高度来显示右侧的工具栏
        .block-wrapper
          min-height: 200px
</style>
