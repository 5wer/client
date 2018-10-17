<template>
  <el-container class="layout">
    <el-header class="headWrap" height="3rem">

      <Head height="3rem" />
    </el-header>
    <el-main>
      <Menu />
      <router-link to="/main/home">home</router-link>
      <router-link to="/main/home2">home2</router-link>
      <router-view />
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

