import { Vue, Component, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import ItemBtnGroup, { Item } from './Components/ItemBtnGroup';
import './books.less';

export interface PostItem {
  title: string;
  id: string;
  status?: number;
  length?: number;
  summary?: string;
}
export interface Post extends PostItem {
  content: string;
  createTime?: string;
  lastModifyTime?: string;
  authoerId: string;
}
interface FormData {
  [key: string]: number | string | null;
}

@Component({
  components: { ItemBtnGroup },
})
export default class Posts extends Vue {
  private activeArticle: string = '';
  private newArticle() {}
  private changeArticle(id: string) {}
  private items: Item[] = [];
  private data: Post[] = [];

  @Watch('$store.state.posts.data')
  private storeChange(val: Post[], old: Post[]) {
    this.data = val;
    if (val.length > 0 && !this.activeArticle) {
      this.changeArticle(val[0].id);
    }
    if (!_.some(val, ({ id }) => id === this.activeArticle)) {
      this.changeArticle(val[0].id);
    }
  }

  private renderItems(data: Post[]) {
    if (data.length > 0) {
      return _.map(data, (d) => {
        return (
          <li
            key={d.id}
            class={this.activeArticle === d.id ? 'active' : ''}
            onClick={this.changeArticle.bind(null, d.id)}
          >
            {d.title}
            <div class="itemBtnGroup">
              <item-btn-group items={this.items} />
            </div>
          </li>
        );
      });
    }
    return '暂无文章';
  }
  render() {
    return (
      <div>
        <div class="buttonWrap">
          <el-button
            icon="el-icon-circle-plus"
            onClick={this.newArticle}
            type="danger"
            size="mini"
            class="addBookBtn"
          >
            新增文章
          </el-button>
        </div>
        <ul class="books">{this.renderItems(this.data)}</ul>
      </div>
    );
  }
}
