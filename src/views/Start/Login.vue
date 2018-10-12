<template>
  <div class="start">
    <el-row class="wrap">
      <el-col :span="12">
        <div class="left">
          <h1>logo</h1>
        </div>
      </el-col>
      <el-col :span="12">
        <div>
          <h1>login form</h1>
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

@Component({
  components: {},
})
export default class Home extends Vue {}
</script>
<style lang="less" scoped>
.start {
  height: 100%;
  background-color: '#ccc';
}
.wrap {
  background: '#ccc';
  height: 100%;
}
.left {
  color: '#f00';
  font-size: 10px;
}
</style>
