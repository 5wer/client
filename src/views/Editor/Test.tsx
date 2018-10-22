import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Test extends Vue {
  render() {
    return (<div>{this.$slots.default}</div>);
  }
}
