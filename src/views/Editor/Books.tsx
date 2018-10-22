import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import _ from 'lodash';
import ItemBtnGroup, { Item } from './ItemBtnGroup';
import './books.less';

export interface Book {
  name: string;
  id: string;
  status?: number;
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
  private data: Book[] = [
    { id: '00001', name: '文集0', status: 1 },
    { id: '00002', name: '文集1', status: 1 },
    { id: '00003', name: '文集2', status: 1 },
  ];
  items: Item[] = [
    {
      name: '修改',
      click: (id, e) => {
        console.log(id, e);
        return true;
      },
    },
    {
      name: '删除',
      click: (id) => {
        console.log(id);
      },
    },
    {
      name: '其他',
      disabled: true,
      children: [
        {
          name: 'hello',
          children: [
            {
              name: 'the 3dr',
            },
            {
              name: '9999999',
            },
          ],
        },
        {
          name: 'world',
          click: (id) => {
            console.log('world');
            return true;
          },
        },
      ],
    },
  ];
  private activeBook: string = '00001';

  private changeBook(id: string, e: MouseEvent): void {
    e.stopPropagation();
    this.activeBook = id;
  }
  @Watch('$store.state.editoer.nodebooks')
  private storeChange(val: Book[], old: Book[]) {
    this.data = val;
  }
  private renderItems(data: Book[]) {
    if (data.length > 0) {
      return _.map(data, (d) => {
        return (
          <li
            key={d.id}
            class={this.activeBook === d.id ? 'active' : ''}
            on-click={this.changeBook.bind(null, d.id)}
          >
            {d.name}
            <div class="itemBtnGroup">
              <item-btn-group items={this.items} id={d.id} />
            </div>
          </li>
        );
      });
    }
    return '暂无文集';
  }
  render() {
    return (
      <div>
        <div class="buttonWrap">
          <el-button size="small" icon="el-icon-back" type="danger" plain round class="backBtn">
            返回
          </el-button>
        </div>

        <el-button icon="el-icon-circle-plus-outline" type="text" class="addBookBtn">
          新增文集
        </el-button>
        <ul class="books">{this.renderItems(this.data)}</ul>
      </div>
    );
  }
}
