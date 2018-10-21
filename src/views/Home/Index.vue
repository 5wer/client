<script lang="tsx">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import LogoIcon from '@/components/Logo/index.vue';
import router from '../../router';
import { Route } from 'vue-router';

@Component
export default class Home extends Vue {
  render() {
    return (
      <div class="about">
        <h1>Home</h1>
        <router-view name="slider" />
        <router-view name="tweet" />
        <router-view name="list" />
      </div>
    );
  }
}
</script>

<style lang="less" scoped>
h1 {
  background-color: #ff0
}
</style>
