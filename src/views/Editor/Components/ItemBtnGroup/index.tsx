import { Vue, Component, Prop } from 'vue-property-decorator';
import _ from 'lodash';
import './index.less';

/**
 * @param name 按钮的名称
 *
 */
export interface Item {
  name: string | Function;
  click?: (record: any, e: MouseEvent) => void | boolean;
  disabled?: boolean;
  children?: Item[] | Function;
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
  private items!: Item[];
  @Prop()
  private record!: object;
  private show: boolean = false;
  private point: number[] | null = null;
  private trigger(c: number, e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
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
      const shut = fn(this.record, e);
      if (shut) {
        this.shutDown();
      }
    }
  }
  private renderItems(items: Item[]): any {
    return _.map(items, (item, index) => {
      let name: string = '';
      if (_.isString(item.name)) {
        name = item.name;
      } else if (_.isFunction(item.name)) {
        name = item.name(this.record);
      }
      if (_.isArray(item.children) && item.children.length > 0) {
        return (
          <item-dom
            key={`options_${index}`}
            name={name}
            clickHandle={this.proxyClick.bind(null, item.click)}
            disabled={item.disabled}
          >
            {this.renderItems(item.children)}
          </item-dom>
        );
      }
      if (_.isFunction(item.children)) {
        const children = item.children(this.record);
        return (
          <item-dom
            key={`options_${index}`}
            name={name}
            clickHandle={this.proxyClick.bind(null, item.click)}
            disabled={item.disabled}
          >
            {this.renderItems(children)}
          </item-dom>
        );
      }

      return (
        <item-dom
          key={`options_${index}`}
          name={name}
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
