import { Component, Vue, Prop } from 'vue-property-decorator';
import LogoIcon from '@/components/Logo';
import UserTitle from './Right';
import './head.less';

@Component({
  components: { LogoIcon, UserTitle },
})
export default class MainHead extends Vue {
  @Prop()
  private height?: string;
  render() {
    return (
      <el-row class="_headWrap">
        <el-col span={8} class="headLeft">
          <div class="colInner" style={{ lineHeight: this.height }}>
            list
          </div>
        </el-col>
        <el-col span={8} class="headCenter" style={{ lineHeight: this.height }}>
          <logo-icon size="64" color="#f8c" class="colInner" />
        </el-col>
        <el-col span={8} class="headRight">
          <div class="colInner" style={{ lineHeight: this.height }}>
            <user-title />
          </div>
        </el-col>
      </el-row>
    );
  }
}
