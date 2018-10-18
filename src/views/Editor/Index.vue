<template>
  <el-container class="editorWrap">
    <el-aside
      width="30%"
      class="editorAside"
    >
      <el-row>
        <el-col
          :span="12"
          class="editorList"
        >
          <div class="books">
            <Books />
          </div>
        </el-col>
        <el-col
          :span="12"
          class="editorList"
        >
          <div>list2</div>
        </el-col>
      </el-row>
    </el-aside>
    <el-main class="editor">
      <router-link to="/main">/main/home</router-link>
      <Test>oooo<div>hello</div><div>hi</div></Test>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import Books from './Books.vue';
import Test from './Test';

@Component({
  components: { Test, Books },
})
export default class Editor extends Vue {
  private notebooks = [];
  private articles = [];
}
</script>

<style lang="less" scoped>
.editorWrap {
  height: 100%;
  .books {
    background-color: #f5f5f5;
    height: 100%;
  }
  .editorAside {
    background-color: #ddd;
    min-width: 320px;
    .el-row {
      height: 100%;
    }
    .editorList {
      overflow: auto;
      height: 100%;
    }
  }
  .editor {
    padding: 0;
    background-color: #eee;
  }
}
</style>

