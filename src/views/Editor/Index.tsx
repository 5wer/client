import { Vue, Component } from 'vue-property-decorator';
import Books from './Books';
import Posts from './Posts';
import PostEditor from './PostEditor';
import './styles.less';

@Component({
  components: { Books, Posts, PostEditor },
})
export default class ArticleManage extends Vue {
  render() {
    return (
      <el-container class="editorWrap">
        <el-aside width="30%" class="editorAside">
          <el-row>
            <el-col span={12} class="editorList">
              <div class="books">
                <books />
              </div>
            </el-col>
            <el-col span={12} class="editorList">
              <div>
                <posts />
              </div>
            </el-col>
          </el-row>
        </el-aside>
        <el-main class="editor">
          <PostEditor />
        </el-main>
      </el-container>
    );
  }
}
