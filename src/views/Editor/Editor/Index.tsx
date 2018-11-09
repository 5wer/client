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
  private showArticleAttrabutes: boolean = false;
  private articleAttrabuts: Attrabutes = {
    summary: '',
    color: [],
    tags: [],
    title: '',
    type: '',
    content: '请输入内容',
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
      content: content || '',
    };
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
  updateTitle(value: string) {
    this.articleAttrabuts.title = value;
  }
  press(publish: boolean, e: MouseEvent) {
    e.preventDefault();
    const data = {
      ...this.$store.state.posts.current,
      ...this.articleAttrabuts,
    };
    if (publish) {
      data.isPublish = 1;
    }
    if (data.tags.length > 0) {
      data.tags = data.tags.join(',');
    } else {
      data.tags = '';
    }
    if (data.color.length > 0) {
      data.color = data.color.join(',');
    } else {
      data.color = '';
    }
    this.$store.dispatch('posts/updatePost', { data, publish });
  }
  get isPublished() {
    return this.$store.state.posts.current.isPublish;
  }
  render() {
    return (
      <el-container>
        <el-header id="title-editor">
          <article-title value={this.articleAttrabuts.title} change={this.updateTitle} />
          {this.isPublished === 1 ? null : (
            <el-button onClick={this.press.bind(this, false)}>保存</el-button>
          )}
          <el-button onClick={this.press.bind(this, true)} type="primary">
            保存并发布
          </el-button>
        </el-header>
        <el-main id="editor-wrap">
          <div id="tinymce-wrap">
            <editor id="tinymce" v-model={this.articleAttrabuts.content} init={this.init()} />
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
