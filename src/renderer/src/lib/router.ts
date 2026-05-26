import { writable } from 'svelte/store'

export type Route = '/' | '/audio' | '/video'

export const currentRoute = writable<Route>('/')

export function navigate(to: Route): void {
  currentRoute.set(to)
}
