<template>
  <div>
    <div class="_logo">
      <div class="name">5wer</div>
      <div class="wu">五</div>
      <div class="wer">味儿{{height}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Logo extends Vue {
  @Prop(Number) private size!: number;
  get height(): number {
    return this.size * 0.7;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
._logo {
  position: relative;
  .name {
    width: 100%;
  }
}
</style>
