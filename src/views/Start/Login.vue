<template>
  <div class="start">
    <el-row class="wrap">
      <el-col :span="16" class="left">
        <div class="logoWrap">
          <LogoIcon size="128" class="logo" color="#fff"/>
        </div>
      </el-col>
      <el-col :span="8" class="right">
        <div>
          <h1>login</h1>
          <el-form>
            <el-form-item>
              <el-input placeholder="请输入用户名"></el-input>
              <el-input placeholder="请输入密码"></el-input>
              <el-button>登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <router-link to="/registe">registe</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LogoIcon from '@/components/Logo/index.vue';

@Component({
  components: { LogoIcon },
})
export default class Login extends Vue {
  private data() {
    return {
      style: {
        margin: '0 auto',
        height: '256px',
        verticalAlign: 'middle',
      },
    };
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
          transform: translate(-50%, -50%)
        }
      }
    }
    .right {
      background-color: #fff;
      height: 100%;
    }
  }
}
</style>
