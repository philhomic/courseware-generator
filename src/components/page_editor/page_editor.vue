<template>
  <div class="page">
    <div v-for="(question, index) in data.questions">
      <component  :is="question.type + 'Editor'" v-bind:key="index" v-bind:index="index" :data="question" v-on:updateQuestion="updateQuestion"></component>
      <idx :idx="index + 1"></idx>
      <component :is="question.type" v-bind:key="index" v-bind:index="index" :data="question" :colNum="1" :submitted="false"></component>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import radio from '@/components/radio/radio';
  import checkbox from '@/components/checkbox/checkbox';
  import checkboxEditor from '@/components/checkbox_editor/checkbox_editor';
  import idx from '@/components/question_number/question_number';
  import Hashids from 'hashids';

  import radioData from '@/assets/data_structure/radio.js';
  import checkboxData from '@/assets/data_structure/checkbox.js';

  const questionGuid = new Hashids('question', 8);
  const pageGuid = new Hashids('page', 5);

  let index = 0;
  let pageId = pageGuid.encode(index);

  export default {
    props: {
      data: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    components: {
      radio,
      checkbox,
      checkboxEditor,
      idx
    },
    methods: {
      updateQuestion: function (idx, data) {
        let newPage = JSON.parse(JSON.stringify(this.data));
        newPage.questions.splice(idx, 1, data);
        this.$emit('updatePage', index, newPage);
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
        this.page.questions.push(radioData);
      },
      addCheckbox: function () {
        checkboxData.id = questionGuid.encode(this.count);
        checkboxData.options.forEach((option, index) => {
          option.id = questionGuid.encode(this.count, index);
        });
        this.count++;
        this.page.questions.push(checkboxData);
      }
    },
    data () {
      return {
        page: {
          id: pageId,
          questions: []
        },
        count: 0
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
</style>
