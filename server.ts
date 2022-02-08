const fs = require('fs')
const path = require('path')
const express = require('express')

const expandRoute = routes => {
  let newRoutes = []
  routes.forEach(item => {
    newRoutes.push(item)
    if(item.children) {
      newRoutes.push.apply(newRoutes, expandRoute(item.children))
    }
  })
  return newRoutes
}

const setPageHead = (routes, url) => {
  let route = expandRoute(routes).find(item => item.path === url)
  return {
    title: route.meta.title
  }
}

async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === 'production') {
  const resolve = (p) => path.resolve(__dirname, p)

  const manifest = isProd ? require('./dist/client/ssr-manifest.json') : {}
  const indexProd = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : ''

  const app = express()

  let vite
  if (isProd) {
    app.use(require('compression')())
    app.use(
      require('serve-static')(resolve('dist/client'), {
        index: false
      })
    )
  } else {
    vite = await require('vite').createServer({
      root,
      logLevel: 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          usePolling: true,
          interval: 100
        }
      }
    })
    app.use(vite.middlewares)
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl
      let template, render
      if (isProd) {
        template = indexProd
        render = require('./dist/server/entry-server.js').render
      } else {
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      }
      
      const [appHtml, preloadLinks, routes] = await render(url, manifest);
      const { title } =  setPageHead(routes, url)
      const html = template.replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--ssr-outlet-->`, appHtml)
      .replace(`<!--ssr-title-->`, title)
      
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite.ssrFixStacktrace(e)
      console.error(e)
      res.status(500).end(e.message)
    }
  })

  let port = isProd ? 5000 : 3000
  app.listen(port, () => {
    console.log(`http://localhost:${port}`)
  })
}

createServer()