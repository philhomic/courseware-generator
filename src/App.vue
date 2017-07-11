<template>
  <div id="app">
    <div class="page">
      <checkboxEditor></checkboxEditor>
      <idx idx="1"></idx>
      <component :is="radioData.type" :data="radioData" v-bind:colNum="2" v-bind:submitted="false"></component>
      <idx idx="2"></idx>
      <component :is="radioData2.type" :data="radioData2" v-bind:submitted="false"></component>
      <idx idx="3"></idx>
      <component :is="radioData3.type" :data="radioData3" v-bind:colNum="3" v-bind:submitted="false"></component>
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
    .page
      width: 100%
      max-width: 1000px
      min-width: 320px
      margin-left: auto
      margin-right: auto
      background-color: $app-bgcolor
</style>
