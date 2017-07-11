<template>
  <div id="app">
    <div class="left">
      <div id="menu" class="question_type">
        <ul>
          <li class="type_item radio">
            <a href="javascript:;">单选题</a>
          </li>
          <li class="type_item checkbox">
            <a href="javascript:;">多选题</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <div class="page">
        <checkboxEditor></checkboxEditor>
        <idx idx="1"></idx>
        <component :is="radioData.type" :data="radioData" v-bind:colNum="2" v-bind:submitted="false"></component>
        <idx idx="2"></idx>
        <component :is="radioData2.type" :data="radioData2" v-bind:submitted="false"></component>
        <idx idx="3"></idx>
        <component :is="radioData3.type" :data="radioData3" v-bind:colNum="3" v-bind:submitted="false"></component>
      </div>
    </div>

    <!--<router-view></router-view>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import radio from '@/components/radio/radio';
  import checkbox from '@/components/checkbox/checkbox';
  import checkboxEditor from '@/components/checkbox_editor/checkbox_editor';
  import idx from '@/components/question_number/question_number';

  export default {
    name: 'app',
    components: {
      radio,
      checkbox,
      checkboxEditor,
      idx
    },
    created () {
      let radioData = {
        type: 'radio',
        title: '这里输入题干',
        description: '这里是题目备注',
        required: true,
        goto: '',
        assess: {
          // type: 0,
          // score: 1,
          options: {
            'o-101-EFGH': {
              flag: true
            }
          }
        },
        options: [{
          id: 'o-100-ABCD',
          // goto: '',
          // display: [],
          // noRandom: false,
          text: '&lt;p&gt;选项A&lt;/p&gt;'
        }, {
          id: 'o-101-EFGH',
          // goto: '',
          // display: [],
          // noRandom: false,
          text: '选项B'
        }, {
          id: 'o-2-dpDK',
          // goto: '',
          // display: [],
          // noRandom: false,
          text: '选项C'
        }, {
          id: 'o-3-1Mw2',
          // goto: '',
          // display: [],
          // noRandom: false,
          text: '选项D'
        }],
        explanation: '这里是题目解析这里是题目解析这里是题目解析这里是题目解析这里是题目解析这里是题目解析这里是题目解析这里是题目解析',
        id: 'q-1-Ddbn'
      };
      let radioData2 = {
        type: 'radio',
        title: '这里输入题干',
        description: '这里是题目备注',
        required: true,
        goto: '',
        assess: {
          // type: 0,
          // score: 1,
          options: {
            'o-101-EFGH2': {
              flag: true
            }
          }
        },
        options: [{
          id: 'o-100-ABCD2',
          // goto: '',
          // display: [],
          // noRandom: false,
          text: '&lt;p&gt;选项A&lt;/p&gt;'
        }, {
          id: 'o-101-EFGH2',
          // goto: '',
          // display: [],
          // noRandom: false,
          text: '选项B'
        }, {
          id: 'o-2-dpDK2',
          // goto: '',
          // display: [],
          // noRandom: false,
          text: '选项C'
        }, {
          id: 'o-3-1Mw22',
          // goto: '',
          // display: [],
          // noRandom: false,
          text: '选项D'
        }],
        explanation: '这里是题目解析',
        id: 'q-1-Ddbn2'
      };
      let radioData3 = {
        type: 'checkbox',
        title: '这里输入题干',
        description: '这里是题目备注',
        required: true,
        goto: '',
        assess: {
          // type: 0,
          // score: 1,
          options: {
            'o-101-EFGH3': {
              flag: true
            },
            'o-100-ABCD3': {
                flag: true
            }
          }
        },
        options: [{
          id: 'o-100-ABCD3',
          // goto: '',
          // display: [],
          // noRandom: false,
          text: '&lt;p&gt;选项A&lt;/p&gt;'
        }, {
          id: 'o-101-EFGH3',
          // goto: '',
          // display: [],
          // noRandom: false,
          text: '选项B'
        }, {
          id: 'o-2-dpDK3',
          // goto: '',
          // display: [],
          // noRandom: false,
          text: '选项C'
        }, {
          id: 'o-3-1Mw23',
          // goto: '',
          // display: [],
          // noRandom: false,
          text: '选项D'
        }],
        explanation: '这里是题目解析',
        id: 'q-1-Ddbn3'
      };
      this.radioData = radioData;
      this.radioData2 = radioData2;
      this.radioData3 = radioData3;
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
        position: absolute
        left: 20px
        top: 20px
        right: 20px
        bottom: 20px
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
