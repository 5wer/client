import { Prop, Component, Vue } from 'vue-property-decorator';
import _ from 'lodash';

@Component({})
export default class Tags extends Vue {
  $refs!: {
    saveTagInput: HTMLFormElement;
  };
  @Prop({
    default: [],
  })
  data?: string[];
  @Prop()
  removeTag!: (index: number, e: MouseEvent) => void;
  @Prop()
  addTag!: (e: KeyboardEvent) => void;
  tagInputVisible: boolean = false;
  hideInput() {
    this.tagInputVisible = false;
  }
  showInput() {
    this.tagInputVisible = true;
    const daley = setTimeout(() => {
      this.$refs.saveTagInput.$refs.input.focus();
      clearTimeout(daley);
    }, 0);
  }
  render() {
    return (
      <div>
        {_.map(this.data, (tag, i) => (
          <el-tag closable onClose={this.removeTag.bind(null, i)} key={i}>
            {tag}
          </el-tag>
        ))}
        {this.tagInputVisible ? (
          <el-input
            class="input-new-tag"
            ref="saveTagInput"
            size="small"
            nativeOn-keyup={this.addTag}
            onBlur={this.hideInput}
            placeholder="按Enter键提交"
            style={{ width: '5rem' }}
          />
        ) : (
          <el-button class="button-new-tag" size="small" onClick={this.showInput}>
            +添加标签
          </el-button>
        )}
      </div>
    );
  }
}
