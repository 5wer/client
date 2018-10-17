<template>
    <div>{{hello}}</div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import LogoIcon from '@/components/Logo/index.vue';
import router from '../../../router';

@Component
export default class Right extends Vue {
  hello = this.$store.state.user;
  private created() {
    console.log('created');
  }
  @Watch('hello')
  helloHandle(val: {}, old: {}) {
    console.log(val, old);
  }
}
</script>

