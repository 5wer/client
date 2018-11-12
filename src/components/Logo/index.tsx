import { Component, Prop, Vue } from 'vue-property-decorator';
import './logo.less';

@Component
export default class LogoIcon extends Vue {
  // 如果prop没有非空校验符就需要要有默认值, 在修饰符@Propde option中加入default属性定义的初始值不行
  // 必须给成员直接赋值, 这个值就是默认值
  @Prop({ default: 256 })
  private size!: number;
  @Prop({ default: '#333' })
  private color!: string;
  public getFontSize(size: number, rate: number): string {
    const base = 16; // 基础字体尺寸
    const maxSize = size / base;
    return `${maxSize * rate}rem`;
  }
  get fontColor(): string {
    return this.color;
  }
  get fontSize1(): object {
    const fontSize = this.getFontSize(this.size, 0.5);
    return { fontSize, lineHeight: fontSize };
  }
  get fontSize2(): object {
    const fontSize = this.getFontSize(this.size, 0.22);
    return { fontSize, lineHeight: fontSize };
  }
  get fontSize3(): object {
    const fontSize = this.getFontSize(this.size, 0.24);
    return { fontSize, lineHeight: fontSize, bottom: `${this.size / 32}px` };
  }
  get width(): string {
    return this.getFontSize(this.size, 1);
  }
  get height(): string {
    return this.getFontSize(this.size, 0.5);
  }
  render() {
    return (
      <div
        class="__logo__"
        style={{ height: this.height, width: this.width, color: this.fontColor }}
      >
        <div class="name" style={this.fontSize2}>
          5wer
        </div>
        <div class="wu" style={this.fontSize1}>
          五
        </div>
        <div class="wer" style={this.fontSize3}>
          味儿
        </div>
      </div>
    );
  }
}
