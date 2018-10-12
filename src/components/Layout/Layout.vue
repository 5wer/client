<template>
  <div class="layout">
    <Header />
    <Menu />
    <router-link to="/main/home">home</router-link>
    <router-link to="/main/other">other</router-link>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Menu from './Menu.vue';
import Header from './Header.vue';

@Component({
  components: {
    Menu,
    Header,
  },
})
export default class Home extends Vue {}
</script>
