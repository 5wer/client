import { Vue } from 'vue-property-decorator';

export default class Register extends Vue {
  render() {
    return (
      <div class="about">
        <h1>registe </h1>
        <router-link to="/">login</router-link>
      </div>
    );
  }
}
