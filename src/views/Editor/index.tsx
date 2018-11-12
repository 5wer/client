import { Vue, Component, Watch } from 'vue-property-decorator';
import Books from './Books';
import Posts from './Posts';
import PostEditor from './Editor';
import './styles.less';
@Component({
  components: { Books, Posts, PostEditor },
})
export default class ArticleManage extends Vue {
  private show: boolean = false;
  @Watch('$store.state.posts.active')
  private changeState(val: string) {
    if (val) {
      this.show = true;
    } else {
      this.show = false;
    }
  }
  mounted() {
    this.changeState(this.$store.state.posts.active);
  }
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
          {this.show ? null : <div id="disibled">暂时没有可编辑文章</div>}
          <PostEditor />
        </el-main>
      </el-container>
    );
  }
}
