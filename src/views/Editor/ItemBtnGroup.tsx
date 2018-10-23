import { Vue, Component, Prop } from 'vue-property-decorator';
import _ from 'lodash';

/**
 * @param name 按钮的名称
 *
 */
export interface Item {
  name: string;
  click?: (id: string, name: string, e: MouseEvent) => void | boolean;
  disabled?: boolean;
  children?: Item[];
}
@Component
class ItemDom extends Vue {
  @Prop()
  name!: string;
  @Prop()
  disabled?: boolean;
  @Prop()
  clickHandle!: Function;
  private onClick(e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    if (!this.disabled) {
      this.clickHandle(e);
    }
  }
  render() {
    return (
      <div class="item" onClick={this.onClick}>
        {this.name}
        {this.$slots.default ? <div class="itemChildren">{this.$slots.default}</div> : null}
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
  id?: string;
  @Prop()
  name?: string;
  private show: boolean = false;
  private point: number[] | null = null;
  private trigger(c: number, e: MouseEvent) {
    if (!this.point) {
      this.open([e.clientX, e.clientY]);
    } else {
      this.shutDown();
    }
  }
  private open(point: number[]) {
    this.point = point;
    this.show = true;
  }
  private shutDown() {
    this.show = false;
    this.point = null;
  }
  private proxyClick(fn: null | Function, e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (fn) {
      const shut = fn(this.id, this.name, e);
      if (shut) {
        this.shutDown();
      }
    }
  }
  private renderItems(items: Item[]): any {
    return _.map(items, (item, index) => {
      if (_.isArray(item.children) && item.children.length > 0) {
        return (
          <item-dom
            key={`options_${index}`}
            name={item.name}
            clickHandle={this.proxyClick.bind(null, item.click)}
            disabled={item.disabled}
          >
            {this.renderItems(item.children)}
          </item-dom>
        );
      }
      return (
        <item-dom
          key={`options_${index}`}
          name={item.name}
          clickHandle={this.proxyClick.bind(null, item.click)}
          disabled={item.disabled}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <el-button
          onClick={this.trigger.bind(null, 2)}
          icon="el-icon-setting"
          circle
          size="medium"
          type="text"
        />
        {this.show ? (
          <div class="btnGroup" onClick={this.trigger.bind(null, 1)}>
            <div
              class="btnsWrap"
              style={this.point ? { left: `${this.point[0]}px`, top: `${this.point[1]}px` } : null}
            >
              {this.renderItems(this.items)}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
