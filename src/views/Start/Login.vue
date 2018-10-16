
<template>
  <div class="start">
    <el-row class="wrap">
      <el-col :span="16" class="left">
        <div class="logoWrap">
          <LogoIcon size="128" class="logo" color="#fff" />
        </div>
      </el-col>
      <el-col :span="8" class="right">
        <div class="form">
          <el-form :model="ruleForm" :rules="rules" ref="loginForm">
            <el-form-item prop="username">
              <el-input placeholder="请输入用户名" v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input placeholder="请输入密码" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="submitForm()">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <router-link to="/registe">registe</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import LogoIcon from '@/components/Logo/index.vue';

@Component({
  components: { LogoIcon },
})
export default class Login extends Vue {
  public $refs!: {
    loginForm: HTMLFormElement;
  };
  private ruleForm: object = {
    username: '',
    password: '',
  };
  private rules: object = {
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
}
</script>
<style lang="less">
.start {
  height: 100%;
  background-color: #ccc;
  .wrap {
    background: #ccc;
    height: 100%;
    .left {
      background-color: #f66;
      font-size: 10px;
      height: 100%;
      .logoWrap {
        height: 100%;
        .logo {
          position: relative;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
    .right {
      background-color: #fff;
      height: 100%;
      .form {
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 0 1rem;
      }
    }
  }
}
</style>
