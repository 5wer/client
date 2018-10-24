import { Vue, Component } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class PostEditor extends Vue {
  mounted() {}
  check() {
    const selection = window.getSelection();
    const range = selection.toString() && selection.getRangeAt(0);
    console.log(selection,  range);
  }
  render() {
    return (
      <div
        class="editbox"
        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        id="richtext"
      >
        <el-input />
        <el-button onClick={this.check}>check</el-button>
        <div
          style={{ flex: 1, padding: '10px', overflow: 'auto' }}
          contenteditable
          value="hello world"
        />
      </div>
    );
  }
}
