# 代码编辑器

编辑器用的 [monaco-react](https://github.com/suren-atoyan/monaco-react#readme)

# 代码编译

编译用的 [@babel/standalone](https://babeljs.io/docs/babel-standalone) babel 的浏览器版本,可以把 tsx 编译成 js

编译过程中用自己写的 babel 插件实现 import 的 source 的修改，变为 URL.createObjectURL + Blob 生成的 [blob url](https://developer.mozilla.org/en-US/docs/Web/API/Blob#creating_a_url_representing_the_contents_of_a_typed_array)，把模块内容内联进去。

对于 react、react-dom 这种包，用 import maps 配合 esm.sh 网站来引入。

对于动态导入的文件例如: import App from './App.tsx';

## blob url 示例:

简单来说就是将js文件变成url使用

```js
const code1 = `
function add(a, b) {
    return a + b;
}
export { add };
`;

const url = URL.createObjectURL(new Blob([code1], { type: 'application/javascript' }));
// url = `blob:https://developer.mozilla.org/968ee7ac-87df-4566-8890-e388d67fed8d`

const code2 = `import { add } from "${url}"; console.log(add(2, 3));`;
// code2 = 'import { add } from "blob:https://developer.mozilla.org/968ee7ac-87df-4566-8890-e388d67fed8d"; console.log(add(2, 3));'

const script = document.createElement('script');
script.type = 'module';
script.textContent = code2;
document.body.appendChild(script);
```

在浏览器控制台跑下这段代码如下: ![](https://png.zjiaxiang.cn/blog/202410010102112.png)
