import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import LogoIcon from '@/components/Logo/index';
import router from '../../router';
import { Route } from 'vue-router';

@Component
export default class Home extends Vue {
  render() {
    return (
      <el-row gutter={20}>
        <el-col span={16}>
          <router-view name="test" />
        </el-col>
        <el-col span={8}>
          <router-view name="test" />
        </el-col>
      </el-row>
    );
  }
}
