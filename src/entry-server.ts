import { createApp } from './main'
import { renderToString } from 'vue/server-renderer'
import { basename } from 'path'

export async function render(url: any, manifest: any) {
  const { app, router, routes } = createApp()

  router.push(url)
  await router.isReady()

  const ctx = {
    modules: null
  }
  const html = await renderToString(app, ctx)
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
  return [html, preloadLinks, routes]
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