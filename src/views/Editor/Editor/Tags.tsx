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
  removeTag!: (index: number) => void;
  @Prop()
  addTag!: (value: string) => void;
  private tagInputVisible: boolean = false;
  private beforeAddTag(e: KeyboardEvent) {
    e.preventDefault();
    if (e.code === 'Enter') {
      const value: string = _.trim((e.target as HTMLInputElement).value) || '';
      if (value !== null) {
        this.addTag(value);
        this.hideInput();
      }
    }
  }
  private beforeRemoveTag(index: number, e: MouseEvent) {
    e.preventDefault();
    this.removeTag(index);
  }
  private hideInput() {
    this.tagInputVisible = false;
  }
  private showInput() {
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
          <el-tag closable onClose={this.beforeRemoveTag.bind(null, i)} key={i}>
            {tag}
          </el-tag>
        ))}
        {this.tagInputVisible ? (
          <el-input
            class="input-new-tag"
            ref="saveTagInput"
            size="small"
            nativeOn-keyup={this.beforeAddTag}
            onBlur={this.hideInput}
            placeholder="按Enter键提交"
            style={{ width: '6rem' }}
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
