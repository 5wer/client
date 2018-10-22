import { Vue, Component } from 'vue-property-decorator';
import Books from './Books';
import Test from './Test';
import './styles.less';

@Component({
  components: { Books },
})
export default class Editor extends Vue {
  private notebooks = [];
  private articles = [];
  render() {
    return (
      <el-container class="editorWrap">
        <el-aside width="30%" class="editorAside">
          <el-row>
            <el-col span={12} class="editorList">
              <div class="books">
                <Books />
              </div>
            </el-col>
            <el-col span={12} class="editorList">
              <div>list2</div>
            </el-col>
          </el-row>
        </el-aside>
        <el-main class="editor">
          <router-link to="/main">/main/home</router-link>
        </el-main>
      </el-container>
    );
  }
}
