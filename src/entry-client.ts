import { createApp } from './main'

const { app, router } = createApp()


router.beforeResolve((to, from, next) => {
  const matched = router.resolve(to).matched
  const matchedComponents: any = []
  matched.map((route) => {
    matchedComponents.push(...Object.values(route.components))
  })
  const headInfo = matchedComponents.map((component: any) => {
    const head = component.head || null;
    if(head) {
      if((typeof head === 'function') === false) {
        return Promise.resolve(head)
      }
      return head()
    }
  })
  try{
    Promise.all(headInfo).then((data: any) => {
      let info = data[data.length - 1]
      document.title = info?.title ? info.title : 'vue_ssr'
      next()
    })
  } catch(err) {
    console.log(err)
    next()
  }
})


router.isReady().then(() => {
  app.mount('#app')
})