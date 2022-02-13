import { headInfoFn, router, store, app } from './entry'

router.beforeResolve((to, from, next) => {
  const matched = router.resolve(to).matched

  try{
    Promise.all(headInfoFn(matched)).then((data: any[]) => {
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