<template>
  <div class="unit-editor-wrapper">
    <div class="unit-list">
      <ul class="unit-tabs">
        <li class="unit-tab" v-for="(unit, unitIndex) in units" :class="{'selectedUnit': unitIndex === currentUnitIndex}" @click="selectThisUnit(unitIndex)">第 {{unitIndex + 1}} 单元 <i class="icon-cross" @click.prevent.stop="deleteUnit(unitIndex)"></i></li>
        <li class="unit-tab unit-tab-plus" @click="addUnit">+</li>
      </ul>
    </div>
    <div class="unit-content">
      <div class="left">
        <div class="menu question_type">
          <ul>
            <li class="type_item">
              <a href="javascript:;" @click="addBlock('radio')">单选题</a>
            </li>
            <li class="type_item">
              <a href="javascript:;" @click="addBlock('checkbox')">多选题</a>
            </li>
            <li class="type_item">
              <a href="javascript:;" @click="addBlock('selectsingle')">下拉题</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="page-tabs-wrapper">
          <ul class="page-tabs">
            <li class="page-tab" v-for="(page, pageIndex) in pages" :class="{'selectedTab': pageIndex === currentPageIndex}" @click="selectThisTab(pageIndex)">第 {{pageIndex + 1}} 页 <i class="icon-cross" @click.prevent.stop="deletePage(pageIndex)"></i></li>
            <li class="page-tab page-tab-plus" @click="addPage">+</li>
          </ul>
          <div class="page-editor-wrapper">
            <pageEditor :data="page" :pageIndex="currentPageIndex"></pageEditor>
          </div>
        </div>
      </div>
    </div>
    <editorToolbar></editorToolbar>
  </div>
</template>

<script type="text/ecmascript-6">
  import pageEditor from '@/components/page/page_editor/page_editor';
  import editorToolbar from '@/components/editor_toolbar/editor_toolbar';

  export default {
    components: {
      pageEditor,
      editorToolbar
    },
    computed: {
      units () {
        return this.$store.state.course.units;
      },
      pages () {
        return this.units[this.$store.state.currentUnitIndex].pages;
      },
      currentUnitIndex () {
        return this.$store.state.currentUnitIndex;
      },
      currentPageIndex () {
        return this.$store.state.currentPageIndex;
      },
      page () {
        return this.pages[this.currentPageIndex];
      }
    },
    methods: {
      addBlock (type) {
        this.$store.commit('addBlock', {
          type: type
        });
      },
      addPage () {
        this.$store.commit('addPage');
      },
      addUnit () {
        this.$store.commit('addUnit');
      },
      selectThisTab (pageIndex) {
        this.$store.state.currentPageIndex = pageIndex;
      },
      selectThisUnit (unitIndex) {
        this.$store.state.currentUnitIndex = unitIndex;
        this.$store.state.currentPageIndex = 0;
      },
      deletePage (pageIndex) {
        this.$store.commit('deletePage', {
          pageIndex: pageIndex
        });
      },
      deleteUnit (unitIndex) {
        this.$store.commit('deleteUnit', {
          unitIndex: unitIndex
        });
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .unit-editor-wrapper
    .unit-list
      width: 100%
      border-bottom: 1px solid #e0e0e0
      background: #fff
      ul
        li
          display: inline-block
          font-size: 18px
          height: 20px
          line-height: 20px
          margin: 20px 20px
          margin-right: 0
          border: 1px solid #e0e0e0
          border-radius: 2px
          padding: 10px
          cursor: pointer
          &:hover, &.selectedUnit
            box-shadow: inset 0 0 10px #e0e0e0
          i
            font-size: 14px
            padding: 6px
            margin-left: 10px
            border-radius: 50%
            background: #e0e0e0
            color: #fff
            cursor: pointer
            &:hover
              background: red
    .unit-content
      position: relative
      .left
        position: absolute
        top: 0
        left: 0
        bottom: 0
        box-sizing: border-box
        width: 250px
        padding: 20px
        background-color: rgb(251,251,251)
        .menu
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
        min-height: 1000px
        padding-top: 30px
        .page-tabs-wrapper
          max-width: 1000px
          min-width: 320px
          margin-left: auto
          margin-right: auto
          .page-tabs
            width: 100%
            font-size: 0
            .page-tab
              display: inline-block
              background: #fff
              width: 100px
              height: 40px
              line-height: 40px
              text-align: center
              font-size: 16px
              border: 1px solid #e0e0e0
              border-bottom: 1px solid rgba(224, 224, 224, 1)
              border-right: none
              cursor: pointer
              .icon-cross
                font-size: 10px
                border-radius: 50%
                padding: 4px
                background: #e0e0e0
                color: #fff
                &:hover
                  background: red
            .page-tab-plus
              border-right: 1px solid #e0e0e0
            .page-tab.selectedTab
              border-bottom: 1px solid rgba(224, 224, 224, 0)
          .page-editor-wrapper
            margin-top: -1px
            border: 1px solid #e0e0e0
            min-height: 200px
            background-color: #fff
</style>
