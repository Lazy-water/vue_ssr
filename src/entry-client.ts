import { createApp } from './main'

const { app, router, store } = createApp()


router.beforeResolve((to, from, next) => {
  const matched = router.resolve(to).matched
  const matchedComponents: any = []
  matched.map((route) => {
    matchedComponents.push(...Object.values(route.components))
  })
  const asyncDataFuncs = matchedComponents.map((component: any) => {
    const asyncData = component.asyncData || null;
    if(asyncData) {
      const config = {
        store,
        route: to
      }
      if((typeof asyncData === 'function') === false) {
        return Promise.resolve(asyncData(config))
      }
      return asyncData(config)
    }
  })
  try{
    Promise.all(asyncDataFuncs).then((data: any) => {
      let info = data[data.length - 1]
      document.title = info?.title ? info.title : 'vue_ssr'
      next()
    })
  } catch(err) {
    console.log(err)
    next()
  }
})

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.isReady().then(() => {
  app.mount('#app')
})