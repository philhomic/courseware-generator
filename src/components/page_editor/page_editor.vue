<template>
  <div class="page">
    <div v-for="(question, index) in data.questions">
      <component  :is="question.type + 'Editor'" v-bind:key="index" v-bind:index="index" :data="question" v-on:cancelUpdateQuestion="cancelUpdateQuestion"></component>
      <idx :idx="index + 1"></idx>
      <component :is="question.type" v-bind:key="index" v-bind:index="index" :data="question" :colNum="1" :submitted="true"></component>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import radio from '@/components/radio/radio';
  import checkbox from '@/components/checkbox/checkbox';
  import checkboxEditor from '@/components/checkbox_editor/checkbox_editor';
  import idx from '@/components/question_number/question_number';
  import Hashids from 'hashids';

  const pageGuid = new Hashids('page', 5);

  let pageId = pageGuid.encode(this.index);

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
      cancelUpdateQuestion: function (idx, data) {
        let oldPage = JSON.parse(JSON.stringify(this.data));
        oldPage.questions.splice(idx, 1, data);
        this.$emit('cancelUpdatePage', this.index, oldPage);
      }
    },
    data () {
      return {
        page: {
          id: pageId,
          questions: []
        }
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
