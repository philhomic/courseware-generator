<template>
  <div class="checkbox-editor">
    <div class="inner">
      <div class="row editor_title">
        <label class="row_title">题目</label>
        <div class="row_content">
          <div contenteditable="true" class="inline_editor">
            <p>单选题</p>
          </div>
        </div>
      </div>
      <div class="row editor_description">
        <label class="row_title">备注</label>
        <div class="row_content">
          <div contenteditable="true" class="inline_editor">
            <p>单选题备注</p>
          </div>
        </div>
      </div>
      <div class="row editor_options">
        <ul class="options_list">
          <div class="additional_setting_title">
            <span class="correct_answer">正确答案</span>
          </div>
          <ul class="normal_options_list">
            <li class="option_item">
              <div class="option_input_wrap">
                <div class="inline_editor option_text" contenteditable="true">
                  <p>选项1</p>
                </div>
              </div>
              <a class="btn_del_option" href="javascript:;">×</a>
              <div class="additional_setting">
                <input class="correct_answer" type="checkbox">
              </div>
            </li>
            <li class="option_item">
              <div class="option_input_wrap">
                <div class="inline_editor option_text" contenteditable="true">
                  <p>选项2</p>
                </div>
              </div>
              <a class="btn_del_option" href="javascript:;">×</a>
              <div class="additional_setting">
                <input class="correct_answer" type="checkbox">
              </div>
            </li>
          </ul>
          <li class="option_item option_create">
            <div class="option_input_wrap">
              <span class="add_option">新建选项</span>
            </div>
          </li>
        </ul>
        <div class="options_control">
          <a class="add_options" href="javascript:;">批量修改</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "styleA.styl"
</style>
