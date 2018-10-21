import { Vue, Component, Prop } from 'vue-property-decorator';
import { Item } from './Books';

@Component
export class ItemDom extends Vue {
  @Prop()
  item!: Item;
  @Prop()
  id!: string;
  @Prop()
  click?: (id: string, e: MouseEvent) => void;
  proxyClick(id: string, e: MouseEvent): void {
    if (this.click) {
      return this.click(id, e);
    }
  }
  render() {
    return (
      <div
        on-click={
          this.proxyClick ? this.proxyClick.bind(null, this.id) : () => null
        }
      >
        {this.item.name}
      </div>
    );
  }
}

@Component({
  components: { ItemDom },
})
export default class ItemBtnGroup extends Vue {
  @Prop()
  items!: Item[];
  @Prop()
  itemId?: string;
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
              style={
                this.point
                  ? { left: `${this.point[0]}px`, top: `${this.point[1]}px` }
                  : null
              }
            >
              {this.items.map((item, index) => (
                <item-dom key={`options_${index}`} item={item} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
