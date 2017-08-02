<template>
  <div class="block-editor" draggable="true" @dragleave="dragLeave(blockIndex, $event)" @dragstart="dragStart(blockIndex, $event)" @dragover.stop="allowDrop($event)" @drop="drop(blockIndex, $event)">
    <div class="editor-wrapper" v-if="isEditing">
      <component  :is="block.type + 'Editor'" v-bind:key="blockIndex" v-bind:blockIndex="blockIndex" :data="block"  v-on:stopEditing="stopEditing"></component>
    </div>
    <div class="preview-wrapper" v-if="!isEditing">
      <div class="control">
        <ul>
          <li class="control_btn edit" @click="startEditing"><i class="icon-edit"></i></li>
          <li class="control_btn copy" @click="copyBlock"><i class="icon-copy"></i></li>
          <li class="control_btn delete" @click="deleteBlock"><i class="icon-delete"></i></li>
        </ul>
      </div>
      <div class="inner">
        <component :is="block.type" v-bind:key="blockIndex" v-bind:blockIndex="blockIndex" :data="block"></component>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import radio from '@/components/choice/radio/radio';
  import radioEditor from '@/components/choice/choice_editor/radio_editor';
  import checkbox from '@/components/choice/checkbox/checkbox';
  import checkboxEditor from '@/components/choice/choice_editor/checkbox_editor';
  import selectsingle from '@/components/choice/selectsingle/selectsingle';
  import selectsingleEditor from '@/components/choice/choice_editor/selectsingle_editor';
  import description from '@/components/description/description/description';
  import descriptionEditor from '@/components/description/description_editor/description_editor';
  import textQuestion from '@/components/text/text/text';
  import textQuestionEditor from '@/components/text/text_editor/text_editor';

  export default {
    props: {
      block: {
        type: Object
      },
      blockIndex: {
        type: Number
      },
      pageIndex: {
        type: Number
      },
      submitted: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      currentPage () {
        return this.$store.state.course.pages[this.pageIndex];
      }
    },
    components: {
      radio,
      checkbox,
      selectsingle,
      checkboxEditor,
      radioEditor,
      selectsingleEditor,
      description,
      descriptionEditor,
      textQuestion,
      textQuestionEditor
    },
    methods: {
      startEditing () {
        this.isEditing = true;
      },
      stopEditing () {
        this.isEditing = false;
      },
      copyBlock () {
        this.$store.commit('copyBlock', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex,
          data: this.block
        });
      },
      deleteBlock () {
        this.$store.commit('deleteBlock', {
          pageIndex: this.$parent.pageIndex,
          blockIndex: this.blockIndex
        });
      },
      dragLeave (blockIndex, ev) {
      },
      dragStart (blockIndex, ev) {
        ev.dataTransfer.setData('Text', blockIndex);
      },
      allowDrop (ev) {
        ev.preventDefault();
      },
      drop (blockIndex, ev) {
        this.allowDrop(ev);
        let initialIndex = ev.dataTransfer.getData('Text');
        let targetIndex = blockIndex;
        this.$store.commit('resortBlock', {
          initialIndex,
          targetIndex,
          pageIndex: this.$parent.pageIndex
        });
      }
    },
    data () {
      return {
        isEditing: false
      };
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .block-editor
    .editor-wrapper
    .preview-wrapper
      position: relative
      overflow: hidden
      cursor: move
      .control
        z-index: 2000
        position: absolute
        top: 0
        right: -60px
        bottom: 0
        width: 58px
        background-color: #f5f5f5
        border-left: 1px solid #e0e0e0
        border-bottom: 1px solid #e0e0e0
        transition: right 0.2s ease
        ul
          display: flex
          box-orient: vertical
          box-direction: normal
          min-height: 0
          flex-direction: column
          box-pack: center
          justify-content: center
          height: 100%
          li
            display: block
            width: 58px
            height: 58px
            line-height: 58px
            text-align: center
            font-size: 22px
            cursor: pointer
            &:hover
              background-color: rgb(71, 157, 230)
              color: #fff
              cursor: pointer
      &.preview-wrapper:hover
        .control
          right: 0
</style>
