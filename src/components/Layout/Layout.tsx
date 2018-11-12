
import { Component, Vue, Watch } from 'vue-property-decorator';
import MainHead from './Header';
import { Route } from 'vue-router';
import './Layout.less';

@Component({
  components: {
    MainHead,
  },
})
export default class Home extends Vue {
  private created() {
    this.getUserInfo();
  }
  @Watch('$route')
  private routerChange(val: Route, old: Route) {
    this.getUserInfo();
  }

  private getUserInfo(): void {
    this.$store.dispatch('user/getUserInfo');
  }
  render() {
    return (
      <el-container class="layout">
        <el-header class="headWrap" height="3rem">
          <el-row type="flex" class="row-bg" justify="center">
            <el-col xs={24} sm={24} md={22} lg={20} xl={16}>
              <main-head height="3rem" />
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col xs={24} sm={24} md={22} lg={20} xl={16}>
              <router-view />
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    );
  }
}
