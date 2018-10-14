<template>
  <div class="start">
    <el-row class="wrap">
      <el-col :span="16" class="left">
        <div class="logoWrap">
          <LogoIcon v-bind:size="128" class="logo"/>
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
import LogoIcon from '@/components/Logo.vue';

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
      color: #fff;
      font-size: 10px;
      height: 100%;
      .logoWrap {
        position: relative;
        height: 100%;
        .logo {
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
