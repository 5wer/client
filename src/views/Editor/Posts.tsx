import { Vue, Component, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import moment from 'moment';
import ItemBtnGroup, { Item } from './Components/ItemBtnGroup';
import './books.less';

export interface PostItem {
  title: string;
  id: string;
  bookId?: string;
  status?: number;
  isPublish?: number;
  summary?: string;
}
export interface Post extends PostItem {
  content: string;
  authorId?: string;
  createTime?: string;
  lastModifyTime?: string;
  authoerId: string;
  type?: string;
  tags?: string;
  color?: string;
}
interface FormData {
  [key: string]: number | string | null;
}

@Component({
  components: { ItemBtnGroup },
})
export default class Posts extends Vue {
  private activeArticle: string = '';
  private newArticle() {
    const bookId = this.$store.state.books.active;
    if (bookId) {
      this.$store.dispatch('posts/createPost', {
        bookId,
        title: moment().format('YYYY-MM-DD HH:mm:ss'),
      });
    } else {
      throw new Error('文集不存在, 请先创建文集');
    }
  }
  @Watch('$store.state.posts.active')
  private activeChange(val: string) {
    this.activeArticle = val;
  }

  private changeArticle(id: string, e?: MouseEvent): void {
    e && e.stopPropagation();
    this.$store.dispatch('posts/getPost', id);
  }
  private showBooks() {

  }
  private removePost() {

  }
  private items: Item[] = [
    {
      name: '移动到...',
      click: this.showBooks,
    },
    {
      name: '删除',
      click: this.removePost,
    },
    {
      name: '发布',
      click: this.removePost,
    },
  ];
  private data: Post[] = [];

  @Watch('$store.state.posts.data')
  private storeChange(val: Post[], old: Post[]) {
    this.data = val;
    if (val.length > 0) {
      if (!this.activeArticle) {
        this.changeArticle(val[0].id);
      }
      if (!_.some(val, ({ id }) => id === this.activeArticle)) {
        this.changeArticle(val[0].id);
      }
    } else {
      this.$store.commit('posts/setActive', false);
    }
  }
  private renderItems(data: Post[]) {
    if (data.length > 0) {
      return _.map(data, (d) => {
        return (
          <li
            key={d.id}
            class={[this.activeArticle === d.id ? 'active' : '', 'article']}
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
            size="small"
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
