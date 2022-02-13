import { headInfoFn, router, store, app } from './entry'
import { renderToString } from 'vue/server-renderer'
import { basename } from 'path'

export async function render(url: string, manifest): Promise<string[]> {
  await router.push(url)
  await router.isReady()

  const to = router.currentRoute
  const matched = to.value.matched

  let title: string = ''
  await Promise.all(headInfoFn(matched)).then(data => {
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

function renderPreloadLinks(modules: string[], manifest): string {
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

function renderPreloadLink(file): string {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else {
    return ''
  }
}