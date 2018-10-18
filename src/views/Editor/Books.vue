<template>
  <div>
    <div class="buttonWrap">
      <el-button
        size="small"
        icon="el-icon-back"
        type="danger"
        plain
        round
        class="backBtn"
      >返回</el-button>
    </div>

    <el-button
      icon="el-icon-circle-plus-outline"
      type="text"
      class="addBookBtn"
    >新增文集</el-button>
    <ul
      v-if="data.length > 0"
      class="books"
    >
      <li
        v-for="d in data"
        :key="d.id"
        :class="current === d.id ? 'active' : ''"
        @click="changeBook(d.id)"
      >
        {{d.name}}
        <div class="itemBtnGroup">
          <ItemBtnGroup :id="d.id">wokao</ItemBtnGroup>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import ItemBtnGroup from './ItemBtnGroup';

interface Book {
  name: string;
  id: string;
  status?: number;
}

/* TODO
这里可以从上层将数据通过prop传进来, 也可以监听$store变化重新赋值组件内数据
选择后者, 省的传递, 之前react项目中即便有redux(dva)也还是逐级传递props,因为懒得connect;
现在vue的全局绑定过了, 试试直接watch会不会有好处(书写简单, 维护时不用切换多文件)
*/
@Component({
  components: { ItemBtnGroup },
})
export default class Books extends Vue {
  private data: Book[] = [
    { id: '00001', name: '文集0', status: 1 },
    { id: '00002', name: '文集1', status: 1 },
    { id: '00003', name: '文集2', status: 1 },
  ];
  private current: string = '00001';

  private changeBook(id: string): void {
    this.current = id;
  }

  @Watch('$store.state.editoer.nodebooks')
  private storeChange(val: Book[], old: Book[]) {
    this.data = val;
  }
}
</script>
<style lang="less" scoped>
@height: 2.5rem;
.buttonWrap {
  padding: 0.5rem 0;
  background-color: #eee;
  .backBtn {
    margin: 0 auto;
    display: block;
    width: 128px;
  }
}
.addBookBtn {
  display: block;
  margin: 0 0 0 10px;
}
.books {
  padding: 0;
  margin: 0;
  list-style: none;
  li {
    position: relative;
    padding: 0 0.5rem;
    border-left: 0.25rem solid transparent;
    color: #666;
    height: @height;
    line-height: @height;
    cursor: pointer;
    &:hover {
      color: #000;
      background-color: #e5e5e5;
    }
    &.active,
    &.active:hover {
      border-left-color: #f56c6c;
      background-color: #eee;
      color: #000;
    }
    .itemBtnGroup {
      position: absolute;
      right: 0;
      top: 0;
      height: @height;
      line-height: @height;
      width: @height;
      text-align: center
    }
  }
}
</style>
