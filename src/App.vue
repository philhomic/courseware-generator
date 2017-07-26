<template>
  <div id="app">
    <div class="left">
      <div id="menu" class="question_type">
        <ul>
          <li class="type_item radio">
            <a href="javascript:;" @click="addBlock('radio')">单选题</a>
          </li>
          <li class="type_item checkbox">
            <a href="javascript:;" @click="addBlock('checkbox')">多选题</a>
          </li>
          <li class="type_item select">
            <a href="javascript:;" @click="addBlock('selectsingle')">下拉题</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div v-for="(page, pageIndex) in pages">
        <pageEditor :data="page" :pageIndex="pageIndex"></pageEditor>
      </div>
    </div>
    <router-view></router-view>
    <editorToolbar></editorToolbar>
  </div>
</template>

<script type="text/ecmascript-6">
  import pageEditor from '@/components/page_editor/page_editor';
  import editorToolbar from '@/components/editor_toolbar/editor_toolbar';

 export default {
    name: 'app',
    components: {
      pageEditor,
      editorToolbar
    },
   computed: {
      pages () {
        return this.$store.state.course.pages;
      }
   },
    methods: {
      addBlock (type) {
        this.$store.commit('addBlock', {
          type: type
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  $app-bgcolor = #fff

  #app
    .left
      position: absolute
      top: 0
      left: 0
      bottom: 0
      box-sizing: border-box
      width: 250px
      padding: 20px
      background-color: rgb(251,251,251)
      #menu
        position: fixed
        width: 210px
        overflow-y: auto
        .type_item
          cursor: pointer
          height: 38px
          line-height: 38px
          border: 1px solid #e0e0e0
          background-color: #fff
          margin-bottom: 3px
          a
            display: block
            height: 100%
            font-size: 14px
            color: #333
            padding-left: 20px
    .right
      margin-left: 250px
      border-left: 1px solid #e0e0e0
</style>
