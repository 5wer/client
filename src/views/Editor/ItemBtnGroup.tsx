import { Vue, Component, Prop } from 'vue-property-decorator';
import { Item } from './Books';
import './styles.less';

@Component({})
export class ItemDom extends Vue {
  @Prop() item!: Item;
  render() {
    console.log('--------------', this.item);
    return <div>{this.item.name}</div>;
  }
}

@Component({
  components: { ItemDom },
})
export default class ItemBtnGroup extends Vue {
  @Prop({ default: [] })
  items!: Item[];
  @Prop() itemId?: string;
  private show: boolean = false;
  private point: number[] | null = null;
  trigger(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!this.point) {
      this.point = [e.clientX, e.clientY];
    } else {
      this.point = null;
    }
    this.show = !this.show;
  }
  render() {
    return (
      <div>
        <el-button
          on-click={this.trigger}
          icon="el-icon-setting"
          circle
          size="medium"
          type="text"
        />
        {this.show ? (
          <div class="btnGroup" on-click={this.trigger}>
            <div
              class="btnsWrap"
              style={this.point ? { left: `${this.point[0]}px`, top: `${this.point[1]}px` } : null}
            >
              {this.items.map(item => <item-dom item={item} />)}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
