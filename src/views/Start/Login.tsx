import { Component, Vue, Prop } from 'vue-property-decorator';
import LogoIcon from '@/components/Logo';
import './start.less';

@Component({
  components: { LogoIcon },
})
export default class Login extends Vue {
  public $refs!: {
    loginForm: HTMLFormElement;
  };
  private ruleForm = {
    username: '',
    password: '',
  };
  private rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      {
        min: 1,
        max: 32,
        message: '长度在 1 到 32 个字符',
        trigger: 'blur',
      },
    ],
    password: [{ required: true, message: '请输入密码', trigger: 'change' }],
  };

  private submitForm(): void {
    this.$refs.loginForm.validate((valid: boolean) => {
      if (valid) {
        this.$store.dispatch('user/login', this.ruleForm);
      }
    });
  }
  private registe(): void {
    this.$router.push('/registe');
  }
  render() {
    return (
      <div class="start">
        <el-row class="wrap">
          <el-col span={16} class="left">
            <div class="logoWrap">
              <logo-icon size="128" class="logo" color="#fff" />
            </div>
          </el-col>
          <el-col span={8} class="right">
            <div class="form">
              <el-form model={this.ruleForm} rules={this.rules} ref="loginForm">
                <el-form-item prop="username">
                  <el-input placeholder="请输入用户名" v-model={this.ruleForm.username} />
                </el-form-item>
                <el-form-item prop="password">
                  <el-input placeholder="请输入密码" type="password" v-model={this.ruleForm.password} />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" style={{ width: '100%' }} onClick={this.submitForm}>
                    登录
                  </el-button>
                  <div style={{ height: '10px' }} />
                  <el-button type="danger" style={{ width: '100%' }} onClick={this.registe}>
                    免费注册
                  </el-button>
                </el-form-item>
                <el-form-item />
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
    );
  }
}
