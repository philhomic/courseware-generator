<template>
  <div class="page">
    <blockEditor v-for="(block, blockIndex) in currentPage.blocks" :block="block" :blockIndex="blockIndex" :pageIndex="pageIndex" :key="blockIndex"></blockEditor>
  </div>
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
        return this.$store.state.course.pages[this.pageIndex];
      }
    },
    components: {
      blockEditor
    },
    methods: {
      clone (json) {
        return JSON.parse(JSON.stringify(json));
      }
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
