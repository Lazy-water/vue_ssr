import { createApp } from '../src/main'

export const { app, router, store } = createApp()

export const headInfoFn = (matched?: any) => {
  const matchedComponents: any[] = []
  matched.map(async (route: any) => {
    await matchedComponents.push(...Object.values(route.components))
  })
  const headInfo = matchedComponents.map(async (component: any) => {
    const head = await component.head || null;
    if(head) {
      if((typeof head === 'object') === false) {
        return await Promise.resolve(head)
      }
      return await head
    }
  })
  return headInfo
}