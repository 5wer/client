import { Vue, Component } from 'vue-property-decorator';
import tinymce from 'tinymce';
import 'tinymce/themes/modern/theme';
import 'tinymce/plugins/image';
import 'tinymce/plugins/link';
import 'tinymce/plugins/code';
import 'tinymce/plugins/table';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/contextmenu';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/colorpicker';
import 'tinymce/plugins/textcolor';
import Editor from '@tinymce/tinymce-vue';

@Component({
  components: { Editor },
})
export default class PostEditor extends Vue {
  tinymceHtml: string = '请输入内容';
  init = {
    language_url: '/tinymce/zh_CN.js',
    language: 'zh_CN',
    skin_url: '/tinymce/skins/lightgray',
    height: 300,
    plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
    toolbar: `bold italic underline strikethrough |
      fontsizeselect | forecolor backcolor |
      alignleft aligncenter alignright alignjustify |
      bullist numlist |
      outdent indent blockquote |
      undo redo |
      link unlink image code |
      removeformat`,
    branding: false,
  };
  mounted() {
    tinymce.init({});
  }
  check() {
    const selection = window.getSelection();
    const range = selection.toString() && selection.getRangeAt(0);
  }
  render() {
    return (
      <div
        class="editbox"
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        id="richtext"
      >
        <editor id="tinymce" v-model={this.tinymceHtml} init={this.init} />
      </div>
    );
  }
}
