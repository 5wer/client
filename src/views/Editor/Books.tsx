import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import ItemBtnGroup, { Item } from './Components/ItemBtnGroup';
import './books.less';

export interface Book {
  name: string;
  id: string;
  status?: number;
}
interface FormData {
  [key: string]: number | string | null;
}
/* TODO
这里可以从上层将数据通过prop传进来, 也可以监听$store变化重新赋值组件内数据
选择后者, 省的传递, 之前react项目中即便有redux(dva)也还是逐级传递props,因为懒得connect;
现在vue的全局绑定过了, 试试直接watch会不会有好处(书写简单, 维护时不用切换多文件)
*/
@Component({
  components: { ItemBtnGroup },
})
export default class Books extends Vue {
  editor: FormData = { name: null };
  rules = {
    name: [
      { required: true, message: '请输入文集名称', trigger: 'blur' },
      {
        min: 1,
        max: 16,
        message: '长度在 1 到 16 个字符',
        trigger: 'blur',
      },
    ],
  };
  $refs!: {
    bookEditor: HTMLFormElement;
  };
  private data: Book[] = [];
  items: Item[] = [
    {
      name: '修改',
      click: this.editBook,
    },
    {
      name: '删除',
      click: this.clearBook,
    },
  ];
  private activeBook: string = '';

  private changeBook(id: string, e?: MouseEvent): void {
    e && e.stopPropagation();
    this.activeBook = id;
    // todo: fetch posts with the new bookId
  }
  @Watch('$store.state.books.books')
  private storeChange(val: Book[], old: Book[]) {
    this.data = val;
    if (val.length > 0 && (!this.activeBook || !_.some(val, ({ id }) => id === this.activeBook))) {
      this.changeBook(val[0].id);
    } else if (val.length < 1) {
      this.changeBook('');
    }
  }
  private renderItems(data: Book[]) {
    if (data.length > 0) {
      return _.map(data, (d) => {
        return (
          <li
            key={d.id}
            class={this.activeBook === d.id ? 'active' : ''}
            onClick={this.changeBook.bind(null, d.id)}
          >
            {d.name}
            <div class="itemBtnGroup">
              <item-btn-group items={this.items} record={d} />
            </div>
          </li>
        );
      });
    }
    return '暂无文集';
  }
  mounted() {
    this.$store.dispatch('books/getBooks');
  }
  showDialog(e: MouseEvent, name: string = '') {
    e.preventDefault();
    this.editor.name = name;
  }
  hideAddBook() {
    this.editor.name = null;
    this.editor.id = null;
    const timer = setTimeout(() => {
      this.$refs.bookEditor.clearValidate();
      clearTimeout(timer);
    }, 0);
  }
  addBook() {
    this.$refs.bookEditor.validate((valid: boolean) => {
      if (valid) {
        this.$store.dispatch('books/createBook', { ...this.editor });
        this.hideAddBook();
      }
    });
  }
  updateBook() {
    this.$refs.bookEditor.validate((valid: boolean) => {
      if (valid) {
        this.$store.dispatch('books/updateBook', { ...this.editor });
        this.hideAddBook();
      }
    });
  }
  clearBook(data: any) {
    this.$store.dispatch('books/clearBook', data.id);
    return true;
  }
  editBook(data: any, e: MouseEvent) {
    this.showDialog(e, data.name);
    this.editor.id = data.id;
    return true;
  }
  submit(e: Event) {
    e.preventDefault();
    if (this.editor.id) {
      this.updateBook();
    } else {
      this.addBook();
    }
  }
  render() {
    return (
      <div>
        <div class="buttonWrap">
          <el-button
            onClick={this.hideAddBook}
            size="small"
            icon="el-icon-back"
            type="danger"
            plain
            round
            class="backBtn"
          >
            返回
          </el-button>
        </div>

        <el-button
          icon="el-icon-circle-plus-outline"
          onClick={this.showDialog}
          type="text"
          class="addBookBtn"
        >
          新增文集
        </el-button>
        <el-dialog
          visible={this.editor.name !== null}
          title={`${this.editor.id ? '更新' : '新增'}文集`}
          close={this.hideAddBook}
          show-close={false}
          width="400px"
        >
          <div>
            <el-form
              rules={this.rules}
              model={this.editor}
              ref="bookEditor"
              nativeOn-submit={this.submit}
            >
              <el-form-item label="活动名称" prop="name" label-width="100px">
                <el-input
                  v-model={this.editor.name}
                  autocomplete="off"
                  placeholder="请输入文集名称"
                />
              </el-form-item>
            </el-form>
          </div>
          <div slot="footer">
            <el-button onClick={this.hideAddBook}>取消</el-button>
            <el-button onClick={this.submit} type="primary">
              {`${this.editor.id ? '更新' : '新增'}文集`}
            </el-button>
          </div>
        </el-dialog>
        <ul class="books">{this.renderItems(this.data)}</ul>
      </div>
    );
  }
}
