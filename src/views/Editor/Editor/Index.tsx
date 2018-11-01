import { Vue, Component } from 'vue-property-decorator';
import _ from 'lodash';
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
import Tags from './Tags';
import ArticleTitle from './Title';
import AttrabutesBox, { Attrabutes } from './Attrabutes';
import './editorFix.less';

@Component({
  components: { Editor, Tags, AttrabutesBox, ArticleTitle },
})
export default class PostEditor extends Vue {
  tinymceHtml: string = '请输入内容';
  private showArticleAttrabutes: boolean = false;
  private articleAttrabuts: Attrabutes = {
    summary: 'hello',
    colors: [],
    tags: [],
    title: '',
  };
  $refs!: {
    saveTagInput: HTMLFormElement;
  };
  init() {
    return {
      language_url: '/tinymce/zh_CN.js',
      language: 'zh_CN',
      skin_url: '/tinymce/skins/lightgray',
      resize: false,
      width: 'auto',
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
  }
  mounted() {
    tinymce.init({});
  }
  triggerArticleAttrabutes() {
    this.showArticleAttrabutes = !this.showArticleAttrabutes;
  }
  addTag(value: string) {
    this.articleAttrabuts.tags.push(value);
  }
  removeTag(index: number) {
    this.articleAttrabuts.tags.splice(index, 1);
  }
  submit(value: Attrabutes) {
    console.log({ ...value, cont: this.tinymceHtml });
  }
  updateTitle(value: string) {
    this.articleAttrabuts.title = value;
  }
  render() {
    return (
      <el-container>
        <el-header id="title-editor">
          <article-title change={this.updateTitle} />
        </el-header>
        <el-main id="editor-wrap">
          <div id="tinymce-wrap">
            <editor id="tinymce" v-model={this.tinymceHtml} init={this.init()} />
          </div>
          <div id="artcle-attrabutes">
            <el-button
              onClick={this.triggerArticleAttrabutes}
              circle
              icon={`el-icon-d-arrow-${this.showArticleAttrabutes ? 'right' : 'left'}`}
              style={{
                left: `${this.showArticleAttrabutes ? '-20px' : '-30px'}`,
              }}
              type="primary"
              id="trigger-btn"
            />
            <div id="form-wrap" v-show={this.showArticleAttrabutes}>
              <attrabutes-box
                model={this.articleAttrabuts}
                submit={this.submit}
                removeTag={this.removeTag}
                addTag={this.addTag}
              />
            </div>
          </div>
        </el-main>
      </el-container>
    );
  }
}
