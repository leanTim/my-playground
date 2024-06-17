# vue-project

This template should help get you started developing with Vue 3 in Vite.

## 踩的一些坑

### el-menu组件

`element-plus`的`el-menu`组件如果设置为`router`模式，组件默认的`background-color`,` active-text-color`会失效

解决办法就是设置组件属性`:default-active="route.path"`

### 不要把monaco的editor对象ref，否则监听Editor.onDidChangeModelContent()页面会卡死

```js
type IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
// wrong
const editor = ref<IStandaloneCodeEditor>()
// right
const Editor: IStandaloneCodeEditor
// ...then init
```

## 参考文章

[在vue中使用monaco-editor](https://juejin.cn/post/7095994149753028615?searchId=20240612142854B73AF38C9DCFFE410B4F)
[elementPlus-issue](https://github.com/element-plus/element-plus/issues/2534)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
