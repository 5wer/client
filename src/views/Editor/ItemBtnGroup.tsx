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
  items?: Item[] | null = [];
  @Prop()
  id?: string = '';
  render() {
    return <div>{this.$slots.default}</div>;
  }
}
