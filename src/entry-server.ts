import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'
import { basename } from 'path'

export async function render(url: any, manifest: any) {
  const { app, router, store } = createApp()

  await router.push(url)
  await router.isReady()

  const to = router.currentRoute
  const matchedRoute = to.value.matched
  const matchedComponents: any = []
  await matchedRoute.map(async route => {
    await matchedComponents.push(...Object.values(route.components))
  })
  const asyncDataFuncs = await matchedComponents.map(async (component: any) => {
    const asyncData = await component.asyncData || null;
    if(asyncData) {
      const config = {
        store,
        route: to
      }
      if((typeof asyncData === 'function') === false) {
        return await Promise.resolve(asyncData(config))
      }
      return await asyncData(config)
    }
  })
  let title: string = ''
  await Promise.all(asyncDataFuncs).then(data => {
    let info = data[data.length - 1]
    title = info?.title ? info.title : 'vue_ssr'
  })

  const ctx = {
    modules: null
  }
  const html = await renderToString(app, ctx)
  const preloadLinks = await renderPreloadLinks(ctx.modules, manifest)
  const state = await JSON.stringify(store.state);

  return await [html, preloadLinks, state, title]
}

function renderPreloadLinks(modules: any, manifest: any) {
  let links = ''
  const seen = new Set()
  modules.forEach((id: any) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file: any) => {
        if (!seen.has(file)) {
          seen.add(file)
          const filename = basename(file)
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile)
              seen.add(depFile)
            }
          }
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(file: any) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else {
    return ''
  }
}