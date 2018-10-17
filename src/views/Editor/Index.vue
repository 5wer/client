<template>
    <div class="about">
        <h1>editor</h1>
        <router-link to="/main">/main/home</router-link>
        
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import tinymce from 'tinymce';
import Editor from '@tinymce/tinymce-vue/lib/es2015';

console.log(Editor);
@Component({
  components: { Editor },
})
export default class Home extends Vue {
  private content: string = '请输入内容';
  private editorInit = {
    language_url: '/tinymce/zh_CN.js',
    language: 'zh_CN',
    skin_url: '/tinymce/skins/lightgray',
    height: 300,
  };
  private mounted() {
    tinymce.init(this.editorInit);
  }
}
</script>
