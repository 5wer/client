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
import 'element-ui/lib/theme-chalk/base.css';
import './editorFix.less';

const COLORS = [
  {
    key: 'red',
    label: '红',
  },
  {
    key: 'orange',
    label: '橙',
  },
  {
    key: 'yellow',
    label: '黄',
  },
  {
    key: 'green',
    label: '绿',
  },
  {
    key: 'blue',
    label: '蓝',
  },
  {
    key: 'indigo',
    label: '靛',
  },
  {
    key: 'purple',
    label: '紫',
  },
  {
    key: 'dark',
    label: '暗',
  },
  {
    key: 'bright',
    label: '亮',
  },
  {
    key: 'gray',
    label: '灰',
  },
];
@Component({
  components: { Editor },
})
export default class PostEditor extends Vue {
  tinymceHtml: string = '请输入内容';
  private showArticleAttrabutes: boolean = false;
  private tagInputVisible: boolean = false;
  private articleAttrabuts = {
    summary: 'hello',
    colors: [],
    tags: [],
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
  showInput() {
    this.tagInputVisible = true;
  }
  addTag() {}
  removeTag() {}
  submit() {}
  render() {
    return (
      <el-container>
        <el-header>Header</el-header>
        <el-main id="tinymce-wrap">
          <editor id="tinymce" v-model={this.tinymceHtml} init={this.init()} />
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
              <el-form
                model={this.articleAttrabuts}
                ref="bookEditor"
                nativeOn-submit={this.submit}
                label-position="top"
              >
                <el-form-item label="摘要" prop="summary">
                  <el-input type="textarea" v-model={this.articleAttrabuts.summary} row="3" />
                </el-form-item>
                <el-form-item label="色调" prop="colors">
                  <el-checkbox-group v-model={this.articleAttrabuts.colors} min={0} max={3}>
                    {_.map(COLORS, (color, i) => (
                      <el-checkbox label={color.label} key={color.key}>
                        {color.label}
                      </el-checkbox>
                    ))}
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="标签" prop="tags">
                  <el-tag closable onClose={this.addTag} />
                  {this.tagInputVisible ? (
                    <el-input
                      class="input-new-tag"
                      ref="saveTagInput"
                      size="small"
                      nativeOn-keyup={this.addTag}
                      onBlur={this.addTag}
                    />
                  ) : (
                    <el-button class="button-new-tag" size="small" onClick={this.showInput}>
                      +添加标签
                    </el-button>
                  )}
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-main>
      </el-container>
    );
  }
}
