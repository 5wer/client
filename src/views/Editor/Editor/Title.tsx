import { Prop, Component, Vue } from 'vue-property-decorator';

let timer: number = 0;

@Component
export default class ArticleTitle extends Vue {
  @Prop()
  value!: string;
  @Prop()
  change!: (value: string) => void;
  onChange(value: string) {
    if (timer !== 0) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      this.change(value);
    }, 500);
  }
  render() {
    return (
      <el-input
        value={this.value}
        style={{ marginRight: '1rem' }}
        onInput={this.onChange}
        placeholder="请输入文章的题目"
      >
        <template slot="prepend">标题</template>
      </el-input>
    );
  }
}
