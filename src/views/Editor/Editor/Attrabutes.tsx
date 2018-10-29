import { Vue, Prop, Component } from 'vue-property-decorator';
import _ from 'lodash';
import Tags from './Tags';

const COLORS = [
  {
    key: 'red',
    label: '红',
  },
  {
    key: 'orange',
    label: '橙',
  },
  {
    key: 'yellow',
    label: '黄',
  },
  {
    key: 'green',
    label: '绿',
  },
  {
    key: 'blue',
    label: '蓝',
  },
  {
    key: 'indigo',
    label: '靛',
  },
  {
    key: 'purple',
    label: '紫',
  },
  {
    key: 'dark',
    label: '暗',
  },
  {
    key: 'bright',
    label: '亮',
  },
  {
    key: 'gray',
    label: '灰',
  },
];
export interface Attrabutes {
  summary: string;
  colors: string[];
  tags: string[];
}

@Component({
  components: { Tags },
})
export default class AttrabutesBox extends Vue {
  @Prop()
  model!: Attrabutes;
  @Prop()
  submit!: () => void;
  @Prop()
  addTag!: () => void;
  @Prop()
  removeTag!: () => void;

  render() {
    console.log('Attrabutes');
    return (
      <el-form model={this.model} nativeOn-submit={this.submit} label-position="top">
        <el-form-item label="摘要" prop="summary">
          <el-input type="textarea" v-model={this.model.summary} row="3" />
        </el-form-item>
        <el-form-item label="色调" prop="colors">
          <el-checkbox-group v-model={this.model.colors} min={0} max={3}>
            {_.map(COLORS, (color, i) => (
              <el-checkbox label={color.label} key={color.key}>
                {color.label}
              </el-checkbox>
            ))}
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="标签" prop="tags">
          <tags data={this.model.tags} removeTag={this.removeTag} addTag={this.addTag} />
        </el-form-item>
      </el-form>
    );
  }
}
