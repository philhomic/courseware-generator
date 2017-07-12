<template>
  <div id="app">
    <div class="left">
      <div id="menu" class="question_type">
        <ul>
          <li class="type_item radio">
            <a href="javascript:;" @click="addRadio">单选题</a>
          </li>
          <li class="type_item checkbox">
            <a href="javascript:;" @click="addCheckbox">多选题</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div v-for="(page, index) in data.pages">
        <pageEditor :data="page" :index="index" v-on:updatePage="updatePage"></pageEditor>
      </div>

    </div>
    <!--<router-view></router-view>-->
  </div>
</template>

<script type="text/ecmascript-6">
  // import radio from '@/components/radio/radio';
  // import checkbox from '@/components/checkbox/checkbox';
  // import checkboxEditor from '@/components/checkbox_editor/checkbox_editor';
  // import idx from '@/components/question_number/question_number';
  import pageEditor from '@/components/page_editor/page_editor';
  import Hashids from 'hashids';
  const questionnaireGuid = new Hashids('questionnaire', 8);
  const pageGuid = new Hashids('page', 5);

  import radioData from '@/assets/data_structure/radio.js';
  import checkboxData from '@/assets/data_structure/checkbox.js';

  const questionGuid = new Hashids('question', 8);
  // const pageGuid = new Hashids('page', 5);

  // let index = 0;
  // let pageId = pageGuid.encode(index);

 export default {
    name: 'app',
    components: {
      // radio,
      // checkbox,
      // checkboxEditor,
      pageEditor
      // idx
    },
    methods: {
      updatePage: function (index, data) {
        this.data.pages.splice(index, 1, data);
        // console.log(this.page.questions);
      },
      questionGuid: function (i) {
        return questionGuid.encode(i);
      },
      addRadio: function () {
        radioData.id = questionGuid.encode(this.count);
        radioData.options.forEach((option, index) => {
          option.id = questionGuid.encode(this.count, index);
        });
        this.count++;
        this.data.pages[this.currentPageIndex].questions.push(radioData);
      },
      addCheckbox: function () {
        checkboxData.id = questionGuid.encode(this.count);
        checkboxData.options.forEach((option, index) => {
          option.id = questionGuid.encode(this.count, index);
        });
        this.count++;
        this.data.pages[this.currentPageIndex].questions.push(checkboxData);
      }
    },
    data () {
      return {
        data: {
          id: questionnaireGuid.encode(0),
          title: '课件生成器',
          pages: [{
            id: pageGuid.encode(0),
            questions: []
          }]
        },
        currentPageIndex: 0,
        count: 0
      };
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
      background-color: #fafafa
      #menu
        position: fixed
        width: 210px
        /*left: 20px*/
        /*top: 20px*/
        /*right: 20px*/
        /*bottom: 20px*/
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
      background: #eee
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
