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