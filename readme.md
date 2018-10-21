用vue/cli生成的工程,需要使用(j/t)sx时,babel.config.js不需要配置,如果手动添加transform-vue-jsx的插件会出现重复声明'h'的error

如果使用vscode作为IDE,安装vuter和peritter,并且把workspaceSetting.json的内容添加到工作区配置文件里,跟html格式化代码有关,更多的格式化配置都在.prettierrc里面

vscode安装prettier now和prettier两个插件,另外在workspaceseting里增加对jsx的格式化配置

### tsx 组件定义和引用的坑
```
// 定义
export default MyComponent extends Vue {
    @Prop()
    hello!: string;
    render(){
        return this.hello;
    }
}

// 以下引用时ts会报错, MyComponent中不存在hello属性, 此时MyComponent指向上述定义
<MyComponent hello="world" />

// 这种引用就没问题了, my-component指向shim-tsx.d.ts文件中的interface IntrinsicElements
<my-component hello="world" />
```
### 原来.vue文件里<script lang="tsx">标签也可以使用tsx语法, 并不必须使用.tsx文件

# 今天早上开箱子除了Crow, 爽!!(2018-10-21)

### prettier now插件有个问题(2018-10-21)
对于vue-property-decorator导出的@Prop装饰器不支持, 会做个语法检查
```
// 认为这应该是个赋值语句, 类型声明的':'必须是'='
@Prop someProps: String;

```
还是停用prettier-now了, 仅使用prettier, 继续使用tsx格式的文件