<template>
  <el-row class="_headWrap">
    <el-col :span="8" class="headLeft">
      <div class="colInner" :style="{lineHeight: height}">list</div>
    </el-col>
    <el-col :span="8" class="headCenter" :style="{lineHeight: height}">
      <logo-icon :size="64" color="#f8c" class="colInner" />
    </el-col>
    <el-col :span="8" class="headRight">
      <div class="colInner" :style="{lineHeight: height}">
        <user-title />
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import LogoIcon from '@/components/Logo/index.vue';
import UserTitle from './Right.vue';
import router from '../../../router';

@Component({
  components: { LogoIcon, UserTitle },
})
export default class Head extends Vue {
  @Prop()
  private height!: string;
}
</script>

<style lang="less" scoped>
._headWrap {
  height: 100%;
  text-align: center;
  .el-col {
    height: 100%;
    .colInner {
      height: 100%;
      margin: 0 auto;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .headLeft {
    text-align: left;
  }
  .headCenter {
  }
  .headRight {
    text-align: right;
  }
}
</style>
