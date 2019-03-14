<template>
  <div>
    <List />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import List from './List';
import Test from './Test.vue';
@Component({
  components: { List, Test },
})
export default class ListWrap extends Vue {}
</script>

