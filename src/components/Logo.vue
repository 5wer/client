<template>
  <div class="__logo__" v-bind:style="{height: `${height}px`, width: `${width}px`,fontSize: `${height}px`}">
    <div class="name">5wer</div>
    <div class="wu" v-bind:style="{height:`${height}px`}">五</div>
    <div class="wer" v-bind:style="{height:`${size}px`}">味儿{{height}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Logo extends Vue {
  // 如果prop没有非空校验符就需要要有默认值, 在修饰符@Propde option中加入default属性定义的初始值不行
  // 必须给成员直接赋值, 这个值就是默认值
  @Prop({ default: 128 })
  private size!: number;
  get height(): number {
    return this.size * 0.4;
  }
  get width(): number {
    return this.size;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.__logo__ {
  position: relative;
  overflow: hidden;
  div {
    position: absolute;
  }
  .name {
    width: 100%;
  }
}
</style>
