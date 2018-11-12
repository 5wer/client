import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { router } from '../../../utils/requestRemote';
import './head.less';

@Component
export default class UserTitle extends Vue {
  public data = this.$store.state.user.user;
  private get avatar() {
    return this.data.avatar || require('../../../assets/logo.png');
  }
  private get username() {
    return this.data.username;
  }
  private goEdit() {
    router.push('/editor');
  }
  @Watch('$store.state.user.user')
  private storeChange(val: any, old: any) {
    this.data = val;
  }
  render() {
    return (
      <div class="right">
        <div class="add">
          <el-button onClick={this.goEdit} icon="el-icon-plus" size="small" type="primary">
            写文章
          </el-button>
        </div>
        <img class="avatar" src={this.avatar} />
        <el-dropdown split-button type="text">
          {this.username}
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    );
  }
}
