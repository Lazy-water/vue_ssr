# Vue 3 + Typescript + Vite + SSR

安装依赖
```
npm install
```

本地启动
```
npm run dev
```
## 生产构建
```
# 打包生产生产环境
npm run build

# 预览打包后的生产环境
npm run serve

# 首次构建生产环境
npm run release
```

## 页面标题及其他
每个页面都有一个head对象，可以在 `ssr/entry.ts` 中修改
```
head: {
  title: 'index'
}
```
目前只加了页面标题，如果要加关键词、描述需要在 `head` 对象里面自定义，然后在 `ssr/` 里面设置及导出
最后在 `server.ts` 和 `index.html`里面设置
```
// server.ts
const html = template
      .replace(`<!--ssr-outlet-->`, appHtml)
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`'<vuex-state>'`, state)
      .replace(`<!--ssr-title-->`, title)

// index.html
<div id="app"><!--ssr-outlet--></div>
```

## 样式
本项目用的是 `scss` ，公共样式文件是 `src/style/toot.scss` ，公共样式变量文件是 `src/style/variable.scss`

## 端口号
```
// server.ts
let port = isProd ? 5000 : 3000
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
```
