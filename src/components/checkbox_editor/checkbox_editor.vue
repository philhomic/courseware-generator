<template>
  <div class="checkbox-editor">
    <div class="inner">
      <div class="row editor_title">
        <label class="row_title">题目</label>
        <div class="row_content">
          <div contenteditable="true" class="inline_editor" ref="title">
            {{unescapeHTML(data.title)}}
          </div>
        </div>
      </div>
      <div class="row editor_description">
        <label class="row_title">备注</label>
        <div class="row_content">
          <div contenteditable="true" class="inline_editor" ref="description">
            {{unescapeHTML(data.description)}}
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
                  {{unescapeHTML(option.text)}}
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
            {{unescapeHTML(data.explanation)}}
          </div>
        </div>
      </div>
      <div class="row row_split">
        <div class="split"></div>
        <a class="toggle_adv_setting" href="javascript:;" @click="toggleAdvSetting">
          <span class="txt">{{showAdvSetting ? '收起高级设置' : '展开高级设置'}}</span>
          <i class="icon-circle-down" :class="{up: showAdvSetting}"></i>
        </a>
      </div>
      <transition name="slide">
        <div class="row editor-adv" v-show="showAdvSetting">
          <div class="row">
            <label>每行显示
              <select name="maxRow" ref="columnCount" v-on:change="changeColumnCount">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
          </div>
        </div>
      </transition>
      <div class="row editor_control">
        <a class="editor_confirm_btn" href="javascript:;" @click="updateCheckbox">确定</a>
        <a class="editor_cancel_btn" href="javascript:;" @click="cancelUpdateBlock">取消</a>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {clone, escapeHTML, unescapeHTML} from '@/assets/js/util';
  // import manaoEditor from '@/components/manao_editor/manao_editor';

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
    data () {
      return {
        showAdvSetting: false
      };
    },
    components: {
      // manaoEditor
    },
    mounted () {
      oldData = clone(this.data);
      this.$refs.columnCount.options[this.data.columnCount - 1].selected = true;
    },
    methods: {
      unescapeHTML (string) {
        return unescapeHTML(string);
      },
      addAnswer (optionId) {
        this.$store.commit('addAnswer', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          optionId: optionId
        });
      },
      changeColumnCount () {
        this.$store.commit('changeColumnCount', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          columnCount: parseInt(this.$refs.columnCount.value)
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
        let newData = clone(this.data);
        let title = this.$refs.title;
        let description = this.$refs.description;
        let explanation = this.$refs.explanation;
        let options = this.$refs.options;
        let columnCount = parseInt(this.$refs.columnCount.value);

        newData.title = escapeHTML(title.innerHTML);
        newData.description = escapeHTML(description.innerHTML);
        newData.explanation = escapeHTML(explanation.innerHTML);
        newData.options.forEach((option, index) => {
          option.text = escapeHTML(options[index].innerHTML);
        });
        newData.columnCount = columnCount;

        this.$store.commit('updateCheckbox', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          newData: newData
        });
        oldData = JSON.parse(JSON.stringify(newData));
        this.$emit('stopEditing');
      },
      cancelUpdateBlock () {
        this.$store.commit('cancelUpdateBlock', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          oldData: oldData
        });
        this.$emit('stopEditing');
      },
      isChecked (option) {
        let assessOption = this.data.assess.options[option.id];
        if (assessOption && assessOption.flag === true) {
          return true;
        } else {
          return false;
        }
      },
      toggleAdvSetting () {
        this.showAdvSetting = !this.showAdvSetting;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "styleA.styl"
</style>
