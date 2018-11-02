import { Vue, Component, Watch } from 'vue-property-decorator';
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
import { Post } from '../Posts';
import './editorFix.less';

function splitStr(str: string | undefined, separator: string): any[] {
  if (str) {
    return str.split(separator);
  }
  return [];
}

@Component({
  components: { Editor, Tags, AttrabutesBox, ArticleTitle },
})
export default class PostEditor extends Vue {
  tinymceHtml: string = '请输入内容';
  private showArticleAttrabutes: boolean = false;
  private articleAttrabuts: Attrabutes = {
    summary: '',
    color: [],
    tags: [],
    title: '',
    type: '',
  };
  @Watch('$store.state.posts.current')
  private activeChange(val: Post) {
    const { summary, color, tags, title, type, content } = val;
    this.articleAttrabuts = {
      summary,
      type,
      color: splitStr(color, ','),
      tags: splitStr(tags, ','),
      title: title || '',
    };
    this.tinymceHtml = content;
  }
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
    const res = { ...this.$store.state.posts.current, ...value, content: this.tinymceHtml };
    if (res.tags.length > 0) {
      res.tags = res.tags.join(',');
    } else {
      delete res.tags;
    }
    if (res.color.length > 0) {
      res.color = res.color.join(',');
    } else {
      delete res.color;
    }
    console.log(res);
    this.$store.dispatch('posts/updatePost', res);
  }
  updateTitle(value: string) {
    this.articleAttrabuts.title = value;
  }
  render() {
    return (
      <el-container>
        <el-header id="title-editor">
          <article-title value={this.articleAttrabuts.title} change={this.updateTitle} />
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
