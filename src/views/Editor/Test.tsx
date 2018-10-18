import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class Test extends Vue {
  render() {
    console.log(this.$children, this.$slots);
    return (<div>{this.$slots.default}</div>);
  }
}
