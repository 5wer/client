<template>
    <el-container class="editorWrap">
        <el-aside width="480px" class="editorAside">
            <el-row>
                <el-col :span="12">
                    <div class="editorList">

                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="editorList"></div>
                </el-col>
            </el-row>
        </el-aside>
        <el-main class="editor">
            <router-link to="/main">/main/home</router-link>
        </el-main>
    </el-container>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class Editor extends Vue {
  private notebooks = [];
  private articles = [];
}
</script>

<style lang="less" scoped>
.editorWrap {
  height: 100%;
  .editor {
    padding: 0;
    background-color: #eee;
  }
}
.editorAside {
  background-color: #ddd;
}
</style>

