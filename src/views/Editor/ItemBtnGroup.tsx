import { Vue, Component, Prop } from 'vue-property-decorator';
import Test from './Test';

interface Item {
  name: string;
  click: (e: Event, id: string) => void;
  disabled: boolean;
}

@Component({
  components: { Test },
})
export default class ItemBtnGroup extends Vue {
  @Prop()
  items?: Item[] | null;
  @Prop()
  id?: string;
  private show: boolean = false;
  clickHandle(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }
  render() {
    // if (this.show) {
    //   return <div></div>;
    // }
    // return null;
    return (
      <div on-click={() => console.log('dfdf')}>
        <el-button on-click={this.clickHandle} icon="el-icon-setting" circle size="medium" type="text" />
      </div>
    );
  }
}
