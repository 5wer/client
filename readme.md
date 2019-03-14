用 vue/cli 生成的工程,需要使用(j/t)sx 时,babel.config.js 不需要配置,如果手动添加 transform-vue-jsx 的插件会出现重复声明'h'的 error

如果使用 vscode 作为 IDE,安装 vuter 和 peritter,并且把 workspaceSetting.json 的内容添加到工作区配置文件里,跟 html 格式化代码有关,更多的格式化配置都在.prettierrc 里面

vscode 安装 prettier now 和 prettier 两个插件,另外在 workspaceseting 里增加对 jsx 的格式化配置

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

### 原来.vue 文件里 \<script lang="tsx"\>标签也可以使用 tsx 语法, 并不必须使用.tsx 文件

# 今天早上开箱子出了 Crow, 爽!!(2018-10-21)

### prettier now 插件有个问题(2018-10-21)

对于 vue-property-decorator 导出的@Prop 装饰器不支持, 会做个语法检查

```
// 认为这应该是个赋值语句, 类型声明的':'必须是'='
@Prop someProps: String;
```

还是停用 prettier-now 了, 仅使用 prettier, 继续使用 tsx 格式的文件

### jsx 里使用 el-form(2018-10-23)

```
// 在.vue里的template里这样写
// 如果表单里就一个输入框,点击Enter键会触发表单的原生事件(onSubmit),还会刷新页面啊,真tm诡异
<el-form :model="form" rules="rules" ref="form" @submit.native.prevent>
  <el-form-item label="表单名" prop="name" label-width="100px">
    <el-input v-model="fieldname" autocomplete="off" />
  </el-form-item>
</el-from>

// 在jsx里需要这样写
// 安装babel-plugin-jsx-v-model, 解析标签里的v-model属性
// .babelrc(或者babel.config.js) 添加配置"plugins": ["jsx-v-model"]
// @submit.native.prevent 不再需要了
// 原生事件的回调都可使用nativeOn-前缀加上事件名称注册

private submitHandle = () => {
    this.$refs.form.validate((valid: boolean) => {
      if (valid) {
        // do somthing fetch
      }
    });
}
private pressEnter = (e: Event) => {
    e.preventDefault(); // 屏蔽原生的事件, 不再刷新页面了, -_-!
    this.submitHandle();
}
render(){
    return (
        <el-form
            model={this.form}
            rules={this.rules}
            ref="form"
            nativeOn-submit={this.pressEnter}
            nativeOn-keyup={(e: KeyboardEvent) => {}}
        >
            <el-form-item
                label="表单名"
                prop="name"
                label-width="100px"
            >
                <el-input
                    v-model={this.editor.name}
                    autocomplete="off"
                />
            </el-form-item>
        </el-from>
    );
}
// 题外话:
// 本来还装了nickmessing/babel-plugin-jsx-event-modifiers
// 用来在jsx里用@语法绑定事件,可惜过不了ts的语法检测
// 而且用nativeOn-之后这玩意儿也不是必须的,还是放弃了
```

### 表单问题(2018-10-23)

获取表单数据后, 向服务端提交, 在此执行 vuex.dispatch(...);
之后手动将表单重置, 通过修改 data 属性的方式 ;

```
interface FormData {
  [key: string]: number | string | null;
}
class MyForm extends Vue {
    private form: FormData = {
        name: null;
        id: null
    }
    private clearForm() {
        this.$refs.form.resetFields();
        this.editor.name = null;
        this.editor.id = null;
    }
    submit(){
        this.$refs.form.validate((valid: boolean) => {
            if(valid) {
                // this.$store.dispatch('ns/api', this.form);
                // 浅拷贝
                this.$store.dispatch('ns/api', { ...this.form });
                this.clearForm();
            }
        })
    }
    render() {
        return ...;
    }

}
```
调用api的操作是异步的, 提交到服务端的数据(this.form)是个引用变量, 如果提交操作后紧接着清空表单值, 那么提交到服务端的数据也是清过空表单值;
#### 提交数据的时候浅拷贝一下

##### Crow升不了级, 薄得跟纸一样, 摸一下就跪, 好吧,我手残!!!
# 输成狗!!!(2018-10-27)
### 貌似目录下的索引文件的的文件名需要是小写的, 比如./Editor/Index.tsx, 引用是写成import('./Editor/Index)会造成找不到模块的导致编译失败(2018-10-27)
# 命名视图的问题(2018-11-13)
视图组件貌似需要使用.vue,而.tsx文件是无法识别
```
// 路由配置
...
{
    path: '',
    components: {
        test4vue: () => import('./Test.vue'), // .vue文件
        test4tsx: () => import('./Test'), // .tsx文件
    },
},
...
```
```
// 调用
...
<router-view name="test4vue" /> // 能显示
<router-view name="test4tsx" /> // 不能显示
// Failed to mount component: template or render function not defined.
...
```
设计上是否需要视图路由需要再考虑:
1. 在路由配置文件里引入组件(命名视图)
    * 需要时.vue文件;
    * 传入属性(参数)是静态的,有利于统一修改
    * 在路由配置中导入一次,调用时使用\<router-view name="xx" \/\>即可
2. 在组件里直接引入子组件
    * 可以是.t|jsx
    * 动态传参数
    * 调用时比较麻烦,需要先引入再调用

~~入口文件为.vue文件, 然后子组件使用tsx~~\
上述这种处理好像不行
