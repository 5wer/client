<template>
  <div>test</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import List from './List';
@Component({
  components: { List },
})
export default class ListWrap extends Vue {}
</script>
