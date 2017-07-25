<template lang="pug">
  .page
    .blocks-wrapper(v-for="(block, blockIndex) in currentPage.blocks" :block="block" :blockIndex="blockIndex" :pageIndex="pageIndex" :key="blockIndex" ref="blockEditors")
      <component :is="block.type" v-bind:key="blockIndex" v-bind:blockIndex="blockIndex" :data="block" :submitted="isSubmitted"></component>
    .footer(v-show="currentPage.blocks.length > 0")
      a(href="javascript:;" class="submitButton" @click="submitPage") 提交
</template>

<script type="text/ecmascript-6">
  import radio from '@/components/choice/radio/radio';
  import checkbox from '@/components/choice/checkbox/checkbox';
  import selectsingle from '@/components/choice/selectsingle/selectsingle';

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
        console.log(this.$route.params);
        return this.$store.state.course.pages[this.$route.params.pageIndex];
      }
    },
    components: {
      radio,
      checkbox,
      selectsingle
    },
    methods: {
      clone (json) {
        return JSON.parse(JSON.stringify(json));
      },
      submitPage () {
//        this.$refs.blockEditors.forEach((blockEditor) => {
//          blockEditor.submitted = true;
//        });
        this.isSubmitted = true;
      }
    },
    data () {
      return {
        isSubmitted: false
      };
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
  .footer
    background-color: #eee
    padding: 20px 0
    text-align: center
    .submitButton
      display: block
      padding: 5px 30px
      height: 24px
      line-height: 24px
      color: black
      font-weight: 700

.left
  display: none
.right
  display: none
</style>
