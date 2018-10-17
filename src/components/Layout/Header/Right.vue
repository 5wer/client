<template>
    <div class="right">
        <div class="add">
            <el-button @click="editor()" icon="el-icon-plus" size="small" type="primary">写文章</el-button>
        </div>
        <img class="avatar" v-bind:src="avatar" />
        <el-dropdown split-button type="text">
            {{username}}
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>安全退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { router } from '../../../utils/requestRemote';

@Component({})
export default class UserTitle extends Vue {
  public data = this.$store.state.user.user;
  private get avatar() {
    return this.data.avatar || require('../../../assets/logo.png');
  }
  private get username() {
    return this.data.username;
  }
  private editor() {
      console.log('00000')
      router.push('/main/editor')
  }
  @Watch('$store.state.user.user')
  private storeChange(val: any, old: any) {
    this.data = val;
  }
}
</script>
<style lang="less" scoped>
.right {
}
.avatar {
  width: 1.5rem;
  display: inline-block;
  vertical-align: middle;
  height: 1.5rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  background-color: #ccc;
}
.add {
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}
</style>

