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
              <a class="btn_del_option" href="javascript:;" @click="deleteOption(index)">×</a>
              <div class="additional_setting">
                <input class="correct_answer" type="checkbox" @click="addAnswer(option.id)" :checked = "isChecked(option)">
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
        <a class="editor_confirm_btn" href="javascript:;" @click="updateCheckbox">确定</a>
        <a class="editor_cancel_btn" href="javascript:;" @click="cancelUpdateBlock">取消</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

  let oldData;

  export default {
    props: {
      data: {
        type: Object
      },
      blockIndex: {
        type: Number
      }
    },
    mounted () {
      oldData = JSON.parse(JSON.stringify(this.data));
    },
    methods: {
      addAnswer (optionId) {
        this.$store.commit('addAnswer', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          optionId: optionId
        });
      },
      addOption (optionIndex) {
        this.$store.commit('addOption', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          optionIndex: optionIndex
        });
      },
      deleteOption (optionIndex) {
        this.$store.commit('deleteOption', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          optionIndex: optionIndex
        });
      },
      updateCheckbox () {
        let newData = JSON.parse(JSON.stringify(this.data));
        let title = this.$refs.title;
        let description = this.$refs.description;
        let explanation = this.$refs.explanation;
        let options = this.$refs.options;

        newData.title = title.innerHTML;
        newData.description = description.innerHTML;
        newData.explanation = explanation.innerHTML;
        newData.options.forEach((option, index) => {
          option.text = options[index].innerHTML;
        });

        this.$store.commit('updateCheckbox', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          newData: newData
        });
        oldData = JSON.parse(JSON.stringify(newData));
      },
      cancelUpdateBlock () {
        this.$store.commit('cancelUpdateBlock', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          oldData: oldData
        });
      },
      isChecked (option) {
        let assessOption = this.data.assess.options[option.id];
        if (assessOption && assessOption.flag === true) {
          return true;
        } else {
          return false;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "styleA.styl"
</style>
