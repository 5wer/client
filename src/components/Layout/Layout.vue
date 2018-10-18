<template>
  <el-container class="layout">
    <el-header class="headWrap" height="3rem">
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :xs="24" :sm="24" :md="22" :lg="20" :xl="16">

          <Head height="3rem" />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :xs="24" :sm="24" :md="22" :lg="20" :xl="16">
          <Menu />
          <router-view />
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import Menu from './Menu.vue';
import Head from './Header/index.vue';
import { Route } from 'vue-router';

@Component({
  components: {
    Menu,
    Head,
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
}
</script>

<style lang="less" scoped>
.headWrap {
  border-bottom: 1px solid #ddd;
  height: 3rem;
}
</style>

