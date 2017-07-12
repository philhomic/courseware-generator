<template>
  <div class="checkbox-editor">
    <div class="inner">
      <div class="row editor_title">
        <label class="row_title">题目</label>
        <div class="row_content">
          <div contenteditable="true" class="inline_editor" ref="title">
            {{data.title}}
          </div>
        </div>
      </div>
      <div class="row editor_description">
        <label class="row_title">备注</label>
        <div class="row_content">
          <div contenteditable="true" class="inline_editor" ref="description">
            {{data.description}}
          </div>
        </div>
      </div>
      <div class="row editor_options">
        <ul class="options_list">
          <div class="additional_setting_title">
            <span class="correct_answer">正确答案</span>
          </div>
          <ul class="normal_options_list">
            <li class="option_item" v-for="(option, index) in data.options">
              <div class="option_input_wrap">
                <div class="inline_editor option_text" contenteditable="true" ref="options">
                  {{option.text}}
                </div>
              </div>
              <a class="btn_del_option" href="javascript:;">×</a>
              <div class="additional_setting">
                <input class="correct_answer" type="checkbox" @click="addAnswer(option.id)">
              </div>
            </li>
          </ul>
          <li class="option_item option_create">
            <div class="option_input_wrap" @click="addOption(data.options.length)">
              <span class="add_option">新建选项</span>
            </div>
          </li>
        </ul>
        <div class="options_control">
          <a class="add_options" href="javascript:;">批量修改</a>
        </div>
      </div>
      <div class="row editor_explanation">
        <label class="row_title">解析</label>
        <div class="row_content">
          <div contenteditable="true" class="inline_editor" ref="explanation">
            {{data.explanation}}
          </div>
        </div>
      </div>
      <div class="row row_split">
        <div class="split"></div>
      </div>
      <div class="row editor_control">
        <a class="editor_confirm_btn" href="javascript:;" @click="updateQuestion">确定</a>
        <a class="editor_cancel_btn" href="javascript:;">取消</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  let newData;
  import Hashids from 'hashids';
  const questionGuid = new Hashids('question', 8);

  export default {
    props: {
      data: {
        type: Object
      },
      index: {
        type: Number
      }
    },
    methods: {
      addAnswer: function (id) {
        newData = JSON.parse(JSON.stringify(this.data));
        if (!newData.assess.options[id] || newData.assess.options[id].flag === false) {
          newData.assess.options[id] = { flag: true };
        } else {
          newData.assess.options[id].flag = false;
        }
      },
      addOption: function (idx) {
        newData.options.push({
          id: questionGuid.encode(this.index, idx),
          text: '选项' + idx
        });
      },
      updateQuestion: function () {
        newData.title = this.$refs.title.innerHTML;
        newData.description = this.$refs.description.innerHTML;
        newData.explanation = this.$refs.explanation.innerHTML;
        newData.options.forEach((option, index) => {
          option.text = this.$refs.options[index].innerHTML;
        });
        this.$emit('updateQuestion', this.index, newData);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "styleA.styl"
</style>
