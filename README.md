# 分析

参考[Vue SFC Playground](https://play.vuejs.org/) 实现效果,我们用 react 实现一个 react playground

# 代码编辑器

编辑器用的 [monaco-react](https://github.com/suren-atoyan/monaco-react#readme)

# 代码编译

编译用的 [@babel/standalone](https://babeljs.io/docs/babel-standalone) babel 的浏览器版本,可以把 tsx 编译成 js

编译过程中用自己写的 babel 插件实现 import 的 source 的修改，变为 URL.createObjectURL + Blob 生成的 [blob url](https://developer.mozilla.org/en-US/docs/Web/API/Blob#creating_a_url_representing_the_contents_of_a_typed_array)，把模块内容内联进去。

对于 react、react-dom 这种包，用 import maps 配合 esm.sh 网站来引入。

## babel/standalone 示例

code类似咱们写的react代码:

```js
import { transform } from '@babel/standalone';

const code = `import { useEffect, useState } from "react";

  function App() {
    const [num, setNum] = useState(0);
  
    return (
      <div onClick={() => setNum((prevNum) => prevNum + 1)}>{num}</div>
    );
  }
  
  export default App;
  `;

const res = transform(code, {
  presets: ['react', 'typescript'],
  filename: 'test.tsx',
});
// 指定他的presets为react和typescript。
console.warn(res.code);
```

把这一段放到代码里面去跑,可以看到控制台输出:

```js
import { useState } from 'react';
function App() {
  const [num, setNum] = useState(0);
  return /*#__PURE__*/ React.createElement(
    'div',
    {
      onClick: () => setNum((prevNum) => prevNum + 1),
    },
    num,
  );
}
export default App;
```

对于 `import { useState } from 'react';` 这样的引入我们可以采用 blob url.

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
// 可以看到code1这段代码被转换成了blob url
// 这里因为是在mdn控制台跑的,所以地址前缀是mdn网站的.

const code2 = `import { add } from "${url}"; console.log(add(2, 3));`;
// code2 = 'import { add } from "blob:https://developer.mozilla.org/968ee7ac-87df-4566-8890-e388d67fed8d"; console.log(add(2, 3));'

const script = document.createElement('script');
script.type = 'module';
script.textContent = code2;
document.body.appendChild(script);
```

在浏览器控制台跑下这段代码如下: 可以看到输出了5 ![](https://png.zjiaxiang.cn/blog/202410010102112.png)

对于动态导入的文件例如: `import App from './App.tsx';` 我们可以将`./App.tsx` 内容转换成blob url替换import.

这个替换过程我们可以利用 babel 自[定义插件](https://babeljs.io/docs/babel-standalone#custom-plugins)来完成

只要在对 ImportDeclaration 的 AST 做处理，把 source.value 替换为对应文件的 blob url 就行了。

```

```
