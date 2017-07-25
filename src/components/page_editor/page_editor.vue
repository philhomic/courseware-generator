<template lang="pug">
  .page-editor
    blockEditor(v-for="(block, blockIndex) in currentPage.blocks" :block="block" :blockIndex="blockIndex" :pageIndex="pageIndex" :key="blockIndex" ref="blockEditors")
    //.footer(v-show="currentPage.blocks.length > 0")
    //  a(href="javascript:;" class="submitButton" @click="submitPage") 提交
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
//      submitPage () {
//        this.$refs.blockEditors.forEach((blockEditor) => {
//          blockEditor.submitted = true;
//        });
//      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.page-editor
  width: 100%
  max-width: 1000px
  min-width: 320px
  margin-left: auto
  margin-right: auto
  border-left: 1px solid #e0e0e0
  border-right: 1px solid #e0e0e0
  background-color: $app-bgcolor
  /*.footer*/
    /*background-color: #eee*/
    /*padding: 20px 0*/
    /*text-align: center*/
    /*.submitButton*/
      /*display: block*/
      /*padding: 5px 30px*/
      /*height: 24px*/
      /*line-height: 24px*/
      /*color: black*/
      /*font-weight: 700*/
</style>
