<template>
  <div id="app">
    <div class="page">
      <idx idx="1"></idx>
      <radio :data="radioData" colNum="2"></radio>
      <idx idx="2"></idx>
      <radio :data="radioData"></radio>
    </div>
    <!--<router-view></router-view>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import radio from '@/components/radio/radio';
  import idx from '@/components/question_number/question_number';

  export default {
    name: 'app',
    components: {
      radio,
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
        explanation: '这里是题目解析',
        id: 'q-1-Ddbn'
      };
      this.radioData = radioData;
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
